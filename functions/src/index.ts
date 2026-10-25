import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

const pinterestToken = defineSecret('PINTEREST_ACCESS_TOKEN');
const telegramToken = defineSecret('TELEGRAM_BOT_TOKEN');
const telegramChat = defineSecret('TELEGRAM_CHAT_ID');
const windsorToken = defineSecret('WINDSOR_API_KEY');

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

type Lead = {
  name?: string;
  phone?: string;
  telegram?: string;
  siteOrNiche?: string;
  page?: string;
};

/** Екранування під parse_mode=HTML, щоб імʼя з «<» не ламало повідомлення. */
function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export const contact = onRequest(
  {
    secrets: [telegramToken, telegramChat],
    cors: ['https://koshmanecom.com', 'https://koshman-ecom-staging.web.app', 'http://localhost:3000'],
    timeoutSeconds: 30,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'method_not_allowed' });
      return;
    }

    const body = (req.body ?? {}) as Lead;
    const name = (body.name ?? '').trim();
    const contactValue = (body.phone ?? body.telegram ?? '').trim();

    if (!name || !contactValue) {
      res.status(400).json({ ok: false, error: 'name_and_contact_required' });
      return;
    }

    const lines = [
      '<b>Нова заявка з сайту</b>',
      `Імʼя: ${escapeHtml(name)}`,
      `Контакт: ${escapeHtml(contactValue)}`,
    ];
    if (body.siteOrNiche) lines.push(`Задача: ${escapeHtml(body.siteOrNiche)}`);
    if (body.page) lines.push(`Сторінка: ${escapeHtml(body.page)}`);

    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${telegramToken.value()}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChat.value(),
            text: lines.join('\n'),
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        },
      );

      if (!tgRes.ok) {
        // Не ковтаємо помилку: краще показати людині «спробуйте ще раз»,
        // ніж втратити заявку з написом «дякуємо».
        console.error('telegram error', tgRes.status, await tgRes.text());
        res.status(502).json({ ok: false, error: 'telegram_failed' });
        return;
      }

      res.json({ ok: true });
    } catch (error) {
      console.error('contact error', error);
      res.status(500).json({ ok: false, error: 'send_failed' });
    }
  },
);
