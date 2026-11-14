/**
 * Pinterest Ads напряму через API v5.
 *
 * Пастки, на яких уже обпікались:
 *  - SPEND_IN_DOLLAR попри назву — у валюті акаунта (для Anna Sposa — PLN);
 *  - кліки — CLICKTHROUGH_1 (платні кліки на пін), а не ширший ENGAGEMENT_1;
 *  - синхронна аналітика — лише за останні 90 днів;
 *  - дані за останню добу догружаються ще ~2 дні, тому щодня перечитуємо тиждень.
 */
import { addDays, today } from '../archive';
import type { FactRow, PeriodDoc } from '../types';

const API = 'https://api.pinterest.com/v5';
export const PINTEREST_LOOKBACK_DAYS = 89;

export class SourceError extends Error {}

async function get<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new SourceError(`pinterest ${res.status}: ${body.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

async function listAll<T>(path: string, token: string): Promise<T[]> {
  const items: T[] = [];
  let bookmark: string | null = null;
  do {
    const sep = path.includes('?') ? '&' : '?';
    const page: { items: T[]; bookmark?: string | null } = await get(
      `${path}${sep}page_size=250${bookmark ? `&bookmark=${encodeURIComponent(bookmark)}` : ''}`,
      token,
    );
    items.push(...(page.items ?? []));
    bookmark = page.bookmark ?? null;
  } while (bookmark && items.length < 5000);
  return items;
}

export async function listPinterestAccounts(token: string) {
  const items = await listAll<{ id: string; name: string; currency?: string }>('/ad_accounts', token);
  return items.map((a) => ({ id: a.id, name: a.name, currency: a.currency ?? '' }));
}

export function pinterestEarliest() {
  return addDays(today(), -PINTEREST_LOOKBACK_DAYS);
}

/** Щоденні дані по кожному оголошенню за from..to, згруповані в періоди-дні. */
export async function fetchPinterestDays(accountId: string, from: string, to: string, token: string): Promise<PeriodDoc[]> {
  if (!/^\d{1,20}$/.test(accountId)) throw new SourceError('bad pinterest account id');
  const base = `/ad_accounts/${accountId}`;
  const [campaigns, ads] = await Promise.all([
    listAll<{ id: string; name: string }>(`${base}/campaigns`, token),
    listAll<{ id: string; name: string | null; status: string; campaign_id: string }>(`${base}/ads`, token),
  ]);
  const campaignNames = new Map(campaigns.map((c) => [c.id, c.name]));
  const adInfo = new Map(ads.map((a) => [a.id, a]));

  const byDay = new Map<string, FactRow[]>();
  // Pinterest приймає обмежений список оголошень і діапазон — ріжемо на шматки
  for (let start = from; start <= to; start = addDays(start, 30)) {
    const end = addDays(start, 29) < to ? addDays(start, 29) : to;
    for (let i = 0; i < ads.length; i += 100) {
      const params = new URLSearchParams({
        start_date: start,
        end_date: end,
        granularity: 'DAY',
        columns: 'SPEND_IN_DOLLAR,IMPRESSION_1,CLICKTHROUGH_1,TOTAL_CONVERSIONS',
        ad_ids: ads.slice(i, i + 100).map((a) => a.id).join(','),
      });
      const rows = await get<Record<string, number | string>[]>(`${base}/ads/analytics?${params}`, token);
      for (const r of rows) {
        const adId = String(r.AD_ID);
        const ad = adInfo.get(adId);
        const day = String(r.DATE).slice(0, 10);
        const fact: FactRow = {
          campaignId: ad?.campaign_id ?? '',
          campaignName: campaignNames.get(ad?.campaign_id ?? '') ?? 'Без кампанії',
          adId,
          adName: ad?.name || adId,
          status: ad?.status ?? '',
          spend: Number(r.SPEND_IN_DOLLAR ?? 0),
          impressions: Number(r.IMPRESSION_1 ?? 0),
          clicks: Number(r.CLICKTHROUGH_1 ?? 0),
          conversions: Number(r.TOTAL_CONVERSIONS ?? 0),
        };
        if (!fact.spend && !fact.impressions && !fact.clicks) continue;
        byDay.set(day, [...(byDay.get(day) ?? []), fact]);
      }
    }
  }

  // Порожні дні теж записуємо — інакше не відрізнити «реклама стояла» від «ще не синхронізовано»
  const periods: PeriodDoc[] = [];
  for (let d = from; d <= to; d = addDays(d, 1)) {
    periods.push({ from: d, to: d, rows: byDay.get(d) ?? [], origin: 'pinterest' });
  }
  return periods;
}
