/**
 * Реклама в ChatGPT — офіційний Advertiser API OpenAI (api.ads.openai.com).
 *
 * Ключ прив'язаний до одного рекламного акаунта, тож у кожного дашборда свій
 * (лежить зашифрованим у cabinetSecrets/dash_{id}). Історія — до 365 днів.
 * Документація: developers.openai.com/ads/reporting.
 */
import { addDays, today } from '../archive';
import type { FactRow, PeriodDoc } from '../types';
import { SourceError } from './pinterest';

const API = 'https://api.ads.openai.com/v1';
export const OPENAI_LOOKBACK_DAYS = 364;

async function get<T>(path: string, key: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${key}` } });
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } | string };
  if (!res.ok) {
    const msg = typeof body.error === 'string' ? body.error : body.error?.message;
    throw new SourceError(`chatgpt ads ${res.status}: ${String(msg ?? '').slice(0, 300)}`);
  }
  return body;
}

export function openaiEarliest() {
  return addDays(today(), -OPENAI_LOOKBACK_DAYS);
}

export type OpenAiAccount = { id: string; name: string; currency: string; timezone: string };

/** Перевіряє ключ і повертає акаунт, до якого він прив'язаний. */
export async function openaiAccount(key: string): Promise<OpenAiAccount> {
  const a = await get<Record<string, unknown>>('/ad_account', key);
  return {
    id: String(a.id ?? ''),
    name: String(a.name ?? a.display_name ?? a.id ?? ''),
    currency: String(a.currency ?? a.currency_code ?? 'USD'),
    timezone: String(a.timezone ?? a.time_zone ?? ''),
  };
}

const pick = (r: Record<string, unknown>, ...keys: string[]) => {
  for (const k of keys) if (r[k] !== undefined && r[k] !== null) return r[k];
  return undefined;
};

/** Щоденні показники кожного оголошення за from..to, згруповані в періоди-дні. */
export async function fetchOpenAiDays(key: string, from: string, to: string, timezone: string): Promise<PeriodDoc[]> {
  const byDay = new Map<string, FactRow[]>();
  const range = JSON.stringify({ type: 'date_range', since: from, until: to, ...(timezone ? { timezone } : {}) });
  const baseFields = ['metadata.readable_time', 'campaign.id', 'campaign.name', 'ad.id', 'ad.name', 'ad.status', 'ad.impressions', 'ad.clicks', 'ad.spend'];

  const run = async (fields: string[]) => {
    const rows: Record<string, unknown>[] = [];
    let after = '';
    do {
      const params = new URLSearchParams({ aggregation_level: 'ad', time_granularity: 'daily', limit: '2000' });
      params.append('time_ranges[]', range);
      fields.forEach((f) => params.append('fields[]', f));
      if (after) params.set('after', after);
      const page = await get<{ data?: Record<string, unknown>[]; has_more?: boolean; last_id?: string }>(`/ad_account/insights?${params}`, key);
      rows.push(...(page.data ?? []));
      after = page.has_more && page.last_id ? page.last_id : '';
    } while (after && rows.length < 200000);
    return rows;
  };

  // Конверсії є не в кожному акаунті — якщо API їх не прийме, беремо без них
  let rows: Record<string, unknown>[];
  try {
    rows = await run([...baseFields, 'ad.conversions']);
  } catch (error) {
    if (!(error instanceof SourceError) || !error.message.includes(' 400')) throw error;
    rows = await run(baseFields);
  }

  for (const r of rows) {
    const day = String(pick(r, 'readable_time', 'metadata.readable_time') ?? '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) continue;
    const fact: FactRow = {
      campaignId: String(pick(r, 'campaign_id', 'campaign.id') ?? ''),
      campaignName: String(pick(r, 'campaign_name', 'campaign.name') ?? 'Без кампанії'),
      adId: String(pick(r, 'ad_id', 'ad.id') ?? ''),
      adName: String(pick(r, 'ad_name', 'ad.name', 'ad_id') ?? ''),
      status: String(pick(r, 'ad_status', 'ad.status', 'status') ?? '').toUpperCase(),
      spend: Number(pick(r, 'spend', 'ad.spend') ?? 0),
      impressions: Number(pick(r, 'impressions', 'ad.impressions') ?? 0),
      clicks: Number(pick(r, 'clicks', 'ad.clicks') ?? 0),
      conversions: Number(pick(r, 'conversions', 'ad.conversions') ?? 0),
    };
    if (!fact.spend && !fact.impressions && !fact.clicks) continue;
    byDay.set(day, [...(byDay.get(day) ?? []), fact]);
  }

  const periods: PeriodDoc[] = [];
  for (let d = from; d <= to; d = addDays(d, 1)) {
    periods.push({ from: d, to: d, rows: byDay.get(d) ?? [], origin: 'openai' });
  }
  return periods;
}
