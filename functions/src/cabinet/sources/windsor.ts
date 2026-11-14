/**
 * Windsor.ai — один агентський ключ на всі платформи (ChatGPT Ads, Meta, TikTok…).
 * Пробний тариф пам'ятає лише 30 днів, тому історію тримає наш архів.
 */
import { addDays, today } from '../archive';
import type { DashboardType, FactRow, PeriodDoc } from '../types';
import { SourceError } from './pinterest';

export const WINDSOR_LOOKBACK_DAYS = 29;
const API = 'https://connectors.windsor.ai';

/** Як поля Windsor лягають на наш FactRow — окремо для кожної платформи. */
const MAPPINGS: Partial<Record<DashboardType, { connector: string; fields: Record<keyof FactRow, string> & { date: string } }>> = {
  pinterest_ads: {
    connector: 'pinterest',
    fields: {
      date: 'date',
      campaignId: 'campaign_id',
      campaignName: 'campaign_name',
      adId: 'pin_promotion_id',
      adName: 'pin_promotion_name',
      status: 'pin_promotion_status',
      spend: 'spend',
      impressions: 'impressions_paid',
      clicks: 'clickthrough_paid',
      conversions: 'total_conversions',
    },
  },
};

export function windsorSupports(type: DashboardType) {
  return Boolean(MAPPINGS[type]);
}

export function windsorEarliest() {
  return addDays(today(), -WINDSOR_LOOKBACK_DAYS);
}

export async function listWindsorAccounts(type: DashboardType, apiKey: string) {
  const map = MAPPINGS[type];
  if (!map) return [];
  const res = await fetch(
    `https://onboard.windsor.ai/api/common/ds-accounts?datasource=${map.connector}&api_key=${encodeURIComponent(apiKey)}`,
  );
  if (!res.ok) throw new SourceError(`windsor accounts ${res.status}`);
  const rows = (await res.json()) as { account_id: string; account_name?: string }[];
  return rows.map((r) => ({ id: r.account_id, name: r.account_name ?? r.account_id, currency: '' }));
}

export async function fetchWindsorDays(
  type: DashboardType,
  accountId: string,
  from: string,
  to: string,
  apiKey: string,
): Promise<PeriodDoc[]> {
  const map = MAPPINGS[type];
  if (!map) throw new SourceError(`windsor: no mapping for ${type}`);
  const f = map.fields;
  const params = new URLSearchParams({
    api_key: apiKey,
    date_from: from,
    date_to: to,
    fields: Object.values(f).join(','),
    select_accounts: accountId,
  });
  const res = await fetch(`${API}/${map.connector}?${params}`);
  const body = (await res.json().catch(() => ({}))) as { data?: Record<string, unknown>[]; error?: string };
  if (!res.ok || body.error) throw new SourceError(`windsor ${res.status}: ${String(body.error ?? '').slice(0, 300)}`);

  const byDay = new Map<string, FactRow[]>();
  for (const r of body.data ?? []) {
    const fact: FactRow = {
      campaignId: String(r[f.campaignId] ?? ''),
      campaignName: String(r[f.campaignName] ?? 'Без кампанії'),
      adId: String(r[f.adId] ?? ''),
      adName: String(r[f.adName] ?? r[f.adId] ?? ''),
      status: String(r[f.status] ?? ''),
      spend: Number(r[f.spend] ?? 0),
      impressions: Number(r[f.impressions] ?? 0),
      clicks: Number(r[f.clicks] ?? 0),
      conversions: Number(r[f.conversions] ?? 0),
    };
    if (!fact.spend && !fact.impressions && !fact.clicks) continue;
    const day = String(r[f.date]).slice(0, 10);
    byDay.set(day, [...(byDay.get(day) ?? []), fact]);
  }
  const periods: PeriodDoc[] = [];
  for (let d = from; d <= to; d = addDays(d, 1)) {
    periods.push({ from: d, to: d, rows: byDay.get(d) ?? [], origin: 'windsor' });
  }
  return periods;
}

/**
 * Цільова подія GA4 по днях і UTM-мітках оголошень — через конектор googleanalytics4.
 * Повертає кожен день діапазону (порожній — якщо подій не було), щоб було видно,
 * з якої дати ціль уже рахується.
 */
export async function fetchWindsorGoals(
  propertyId: string,
  eventName: string,
  utmSource: string,
  from: string,
  to: string,
  apiKey: string,
): Promise<{ day: string; goals: Record<string, number> }[]> {
  const params = new URLSearchParams({
    api_key: apiKey,
    date_from: from,
    date_to: to,
    fields: 'date,source,session_manual_ad_content,event_name,event_count',
    select_accounts: propertyId,
    filter: JSON.stringify([['event_name', 'eq', eventName]]),
  });
  const res = await fetch(`${API}/googleanalytics4?${params}`);
  const body = (await res.json().catch(() => ({}))) as { data?: Record<string, unknown>[]; error?: string };
  if (!res.ok || body.error) throw new SourceError(`windsor ga4 ${res.status}: ${String(body.error ?? '').slice(0, 300)}`);

  const wantedSource = utmSource.toLowerCase();
  const byDay = new Map<string, Record<string, number>>();
  for (const r of body.data ?? []) {
    if (String(r.event_name) !== eventName) continue;
    if (String(r.source ?? '').toLowerCase() !== wantedSource) continue;
    const day = String(r.date).slice(0, 10);
    const content = String(r.session_manual_ad_content || '(not set)');
    const goals = byDay.get(day) ?? {};
    goals[content] = (goals[content] ?? 0) + Number(r.event_count ?? 0);
    byDay.set(day, goals);
  }
  const days: { day: string; goals: Record<string, number> }[] = [];
  for (let d = from; d <= to; d = addDays(d, 1)) days.push({ day: d, goals: byDay.get(d) ?? {} });
  return days;
}
