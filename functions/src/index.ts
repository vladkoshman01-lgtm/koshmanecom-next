import { onRequest } from 'firebase-functions/v2/https';
import { createHash } from 'node:crypto';
import { firestore } from './db';
import { pinterestToken, telegramChat, telegramToken, windsorToken } from './secrets';
import {
  FLOOD_PER_HOUR,
  IP_DAY_MS,
  checkIpLimit,
  clientIp,
  hourKey,
  isDuplicate,
  normalizeContact,
  parseLead,
  type CleanLead,
  type IpCounter,
} from './leadGuard';

export { cabinet, cabinetPinterestCallback, cabinetSync } from './cabinet';

const AD_ACCOUNT_ID = '549766804372';
const BASE_URL = 'https://api.pinterest.com/v5';
const WINDSOR_URL = 'https://connectors.windsor.ai/googleanalytics4';

function pFetch(path: string, token: string) {
  return fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
}

export const pinterestAnalytics = onRequest(
  {
    secrets: [pinterestToken, windsorToken],
    cors: ['https://koshmanecom.com', 'https://koshman-ecom-staging.web.app', 'http://localhost:3000'],
    timeoutSeconds: 60,
  },
  async (req, res) => {
    const token = pinterestToken.value();
    const startDate = (req.query['start_date'] as string) || getFirstOfMonth();
    const endDate = (req.query['end_date'] as string) || getToday();

    try {
      // 1. Campaigns
      const campRes = await pFetch(`/ad_accounts/${AD_ACCOUNT_ID}/campaigns?page_size=25`, token);
      if (!campRes.ok) {
        const txt = await campRes.text();
        res.status(campRes.status).json({ error: 'Pinterest campaigns error', detail: txt });
        return;
      }
      const campData = (await campRes.json()) as { items: { id: string; name: string; status: string }[] };
      const campaigns = campData.items ?? [];

      // 2. All ads for the account (Pinterest ignores campaign_id filter, so fetch once and group client-side)
      const adsRes = await pFetch(`/ad_accounts/${AD_ACCOUNT_ID}/ads?page_size=100`, token);
      const adsData = adsRes.ok
        ? ((await adsRes.json()) as { items: { id: string; name: string; status: string; campaign_id: string }[] })
        : { items: [] };
      const allAds = adsData.items ?? [];

      // 3. Analytics for all ads in one call
      const anlMap: Record<string, Record<string, number | string>> = {};
      if (allAds.length > 0) {
        const params = new URLSearchParams({
          start_date: startDate,
          end_date: endDate,
          granularity: 'TOTAL',
          columns: 'IMPRESSION_1,CLICKTHROUGH_1,SPEND_IN_DOLLAR,CTR,ECPC_IN_DOLLAR',
          ad_ids: allAds.map((a) => a.id).join(','),
        });
        const anlRes = await pFetch(`/ad_accounts/${AD_ACCOUNT_ID}/ads/analytics?${params}`, token);
        if (anlRes.ok) {
          const anlData = (await anlRes.json()) as Record<string, number | string>[];
          for (const item of anlData) {
            anlMap[String(item['AD_ID'])] = item;
          }
        }
      }

      // 4. Group ads by campaign and attach metrics
      const results = campaigns.map((campaign) => {
        const campaignAds = allAds.filter((ad) => ad.campaign_id === campaign.id);
        const enrichedAds = campaignAds.map((ad) => {
          const m = anlMap[ad.id] ?? {};
          return {
            adId: ad.id,
            adName: ad.name,
            status: ad.status,
            impressions: m['IMPRESSION_1'] ?? 0,
            // CLICKTHROUGH_1 = outbound clicks (what the client report counts).
            // ENGAGEMENT_1 is wider (clicks + saves + closeups) and must not be used here.
            clicks: m['CLICKTHROUGH_1'] ?? 0,
            spend: m['SPEND_IN_DOLLAR'] ?? 0,
            // Pinterest returns CTR as a fraction; the UI expects a percentage.
            ctr: Number(m['CTR'] ?? 0) * 100,
            cpc: m['ECPC_IN_DOLLAR'] ?? 0,
          };
        });
        return { campaign, ads: enrichedAds };
      });

      // 5. Monthly trend across the whole account (aggregated by month)
      let monthly: { month: string; impressions: number; clicks: number; spend: number }[] = [];
      if (allAds.length > 0) {
        const monthParams = new URLSearchParams({
          start_date: startDate,
          end_date: endDate,
          granularity: 'MONTH',
          columns: 'IMPRESSION_1,CLICKTHROUGH_1,SPEND_IN_DOLLAR',
          ad_ids: allAds.map((a) => a.id).join(','),
        });
        const monthRes = await pFetch(`/ad_accounts/${AD_ACCOUNT_ID}/ads/analytics?${monthParams}`, token);
        if (monthRes.ok) {
          const monthData = (await monthRes.json()) as Record<string, number | string>[];
          const byMonth: Record<string, { impressions: number; clicks: number; spend: number }> = {};
          for (const item of monthData) {
            const month = String(item['DATE']).slice(0, 7);
            if (!byMonth[month]) byMonth[month] = { impressions: 0, clicks: 0, spend: 0 };
            byMonth[month].impressions += Number(item['IMPRESSION_1'] ?? 0);
            byMonth[month].clicks += Number(item['CLICKTHROUGH_1'] ?? 0);
            byMonth[month].spend += Number(item['SPEND_IN_DOLLAR'] ?? 0);
          }
          monthly = Object.entries(byMonth)
            .sort(([a], [b]) => (a < b ? -1 : 1))
            .map(([month, v]) => ({ month, ...v }));
        }
      }

      // 6. GA4 "Де придбати" conversions per ad (UTM content), Pinterest traffic only
      let whereToBuy: { content: string; visits: number }[] = [];
      try {
        const wKey = windsorToken.value();
        if (wKey) {
          const gaParams = new URLSearchParams({
            date_from: startDate,
            date_to: endDate,
            fields: 'source,session_manual_ad_content,event_name,event_count',
            api_key: wKey,
          });
          const gaRes = await fetch(`${WINDSOR_URL}?${gaParams}`);
          if (gaRes.ok) {
            const gaData = (await gaRes.json()) as {
              data: { source?: string; session_manual_ad_content?: string; event_name?: string; event_count?: number }[];
            };
            const byContent: Record<string, number> = {};
            for (const row of gaData.data ?? []) {
              if (row.event_name !== 'where_to_buy_visit') continue;
              if (String(row.source ?? '').toLowerCase() !== 'pinterest') continue;
              const content = row.session_manual_ad_content || '(not set)';
              byContent[content] = (byContent[content] ?? 0) + Number(row.event_count ?? 0);
            }
            whereToBuy = Object.entries(byContent)
              .map(([content, visits]) => ({ content, visits }))
              .sort((a, b) => b.visits - a.visits);
          }
        }
      } catch {
        // GA4 is best-effort; Pinterest data must still render if this fails
      }

      res.json({ startDate, endDate, campaigns: results, monthly, whereToBuy });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      res.status(500).json({ error: msg });
    }
  }
);

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getFirstOfMonth() {
  const d = new Date();
  d.setDate(1);
  return d.toISOString().slice(0, 10);
}


/* ---------------------------------------------------------------------------
 * Заявки з форм сайту
 *
 * Усі форми (лід-форма, попап послуги, відгук на вакансію) шлють сюди POST,
 * а звідси заявка йде в Telegram-бот. Токен і чат тримаємо в секретах:
 *   firebase functions:secrets:set TELEGRAM_BOT_TOKEN
 *   firebase functions:secrets:set TELEGRAM_CHAT_ID
 * ------------------------------------------------------------------------ */

/* Захист від спаму — див. leadGuard.ts. Ліміти тримаємо у Firestore,
 * бо лічильник у пам'яті в кожного інстансу функції свій. Якщо Firestore
 * недоступний, заявку все одно пропускаємо: втратити ліда гірше, ніж спам. */

/** Екранування під parse_mode=HTML, щоб імʼя з «<» не ламало повідомлення. */
function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sha256(text: string) {
  return createHash('sha256').update(`koshman-leads:${text}`).digest('hex');
}

/** true — ліміт IP вичерпано. */
async function ipLimited(ip: string, now: number): Promise<boolean> {
  const ref = firestore().collection('leadRateLimits').doc(sha256(ip));
  return firestore().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const decision = checkIpLimit(snap.data() as Partial<IpCounter> | undefined, now);
    if (!decision.allowed) return true;
    tx.set(ref, { ...decision.next, expireAt: new Date(now + 2 * IP_DAY_MS) });
    return false;
  });
}

/** Скільки заявок уже було за цю годину (з поточною) і чи треба слати алерт про атаку. */
async function countHour(now: number): Promise<{ count: number; sendAlert: boolean }> {
  const ref = firestore().collection('leadStats').doc(hourKey(now));
  return firestore().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const count = Number(snap.get('count') ?? 0) + 1;
    const alerted = Boolean(snap.get('alerted'));
    const sendAlert = count > FLOOD_PER_HOUR && !alerted;
    tx.set(ref, {
      count,
      alerted: alerted || sendAlert,
      expireAt: new Date(now + 7 * IP_DAY_MS),
    });
    return { count, sendAlert };
  });
}

async function sendTelegram(text: string): Promise<boolean> {
  const tgRes = await fetch(`https://api.telegram.org/bot${telegramToken.value()}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: telegramChat.value(),
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  if (!tgRes.ok) console.error('telegram error', tgRes.status, await tgRes.text());
  return tgRes.ok;
}

/** Заявку, яку не відправили в Telegram (атака або збій), зберігаємо, щоб не загубити. */
async function saveLead(lead: CleanLead, reason: string, now: number) {
  await firestore().collection('leads').add({ ...lead, reason, createdAt: new Date(now) });
}

export const contact = onRequest(
  {
    secrets: [telegramToken, telegramChat],
    cors: ['https://koshmanecom.com', 'https://koshman-ecom-staging.web.app', 'http://localhost:3000'],
    timeoutSeconds: 30,
    // Під атакою функція не розростеться і не накрутить рахунок
    maxInstances: 3,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'method_not_allowed' });
      return;
    }

    const parsed = parseLead(req.body);
    if (parsed.kind === 'invalid') {
      res.status(400).json({ ok: false, error: parsed.error });
      return;
    }
    if (parsed.kind === 'silent_drop') {
      console.warn('lead dropped', parsed.reason);
      res.json({ ok: true });
      return;
    }

    const lead = parsed.lead;
    const now = Date.now();
    const ip = clientIp(req.headers['x-forwarded-for'], req.ip);
    const dedupRef = () => firestore().collection('leadDedup').doc(sha256(normalizeContact(lead.contact)));

    let floodCount = 0;
    let floodAlert = false;
    try {
      if (await ipLimited(ip, now)) {
        res.status(429).json({ ok: false, error: 'too_many_requests' });
        return;
      }
      const dedupSnap = await dedupRef().get();
      if (isDuplicate(dedupSnap.get('lastAt') as number | undefined, now)) {
        // Людина натиснула ще раз — перша заявка вже в Telegram
        res.json({ ok: true });
        return;
      }
      const hour = await countHour(now);
      floodCount = hour.count;
      floodAlert = hour.sendAlert;
    } catch (error) {
      console.error('lead guard unavailable, letting lead through', error);
    }

    try {
      if (floodCount > FLOOD_PER_HOUR) {
        await saveLead(lead, 'flood', now);
        if (floodAlert) {
          await sendTelegram(
            `<b>Схоже на спам-атаку</b>\nЗа годину понад ${FLOOD_PER_HOUR} заявок. ` +
              'Нові заявки до кінця години не приходять сюди, вони збережені у Firestore → leads.',
          );
        }
        res.json({ ok: true });
        return;
      }

      const lines = [
        '<b>Нова заявка з сайту</b>',
        `Імʼя: ${escapeHtml(lead.name)}`,
        `Контакт: ${escapeHtml(lead.contact)}`,
      ];
      if (lead.siteOrNiche) lines.push(`Задача: ${escapeHtml(lead.siteOrNiche)}`);
      if (lead.page) lines.push(`Сторінка: ${escapeHtml(lead.page)}`);

      if (!(await sendTelegram(lines.join('\n')))) {
        // Не ковтаємо помилку: краще показати людині «спробуйте ще раз»,
        // ніж втратити заявку з написом «дякуємо».
        await saveLead(lead, 'telegram_failed', now).catch(() => undefined);
        res.status(502).json({ ok: false, error: 'telegram_failed' });
        return;
      }

      // Дубль відмічаємо лише після успіху, щоб повторна спроба після збою дійшла
      await dedupRef()
        .set({ lastAt: now, expireAt: new Date(now + IP_DAY_MS) })
        .catch((error) => console.error('dedup write failed', error));

      res.json({ ok: true });
    } catch (error) {
      console.error('contact error', error);
      res.status(500).json({ ok: false, error: 'send_failed' });
    }
  },
);
