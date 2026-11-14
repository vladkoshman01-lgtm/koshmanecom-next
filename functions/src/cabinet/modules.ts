/**
 * Реєстр типів дашбордів і джерел даних, синхронізація в архів і побудова звіту.
 *
 * Тип — платформа (Pinterest Ads, ChatGPT Ads…), джерело — звідки беремо
 * цифри. Джерело наповнює архів, а звіт завжди будується з архіву.
 */
import { HttpsError } from 'firebase-functions/v2/https';
import { firestore } from '../db';
import { windsorToken } from '../secrets';
import { getPinterestToken } from './pinterestAuth';
import { getDashboardKey } from './dashboardKeys';
import { fetchOpenAiDays, openaiEarliest } from './sources/openai';
import { COL, type DashboardRecord } from './access';
import { addDays, aggregate, daysBetween, planSync, readPeriods, today, totalsOf, writeGoals, writePeriods } from './archive';
import { SourceError, fetchPinterestDays, listPinterestAccounts, pinterestEarliest } from './sources/pinterest';
import { fetchWindsorDays, fetchWindsorGoals, listWindsorAccounts, windsorEarliest, windsorSupports } from './sources/windsor';
import type { AdsReport, DashboardDoc, DashboardSource, DashboardType, DateRange, FactRow, PeriodDoc } from './types';

type ConfigField = { key: string; label: string; required: boolean };

const accountField = (required = true): ConfigField => ({ key: 'accountId', label: 'Рекламний акаунт', required });
const currencyField: ConfigField = { key: 'currency', label: 'Валюта акаунта', required: false };
/** Цільова дія з сайту з GA4 (напр. переходи в «Де придбати»), прив'язана до оголошень через utm_content. */
const goalFields: ConfigField[] = [
  { key: 'ga4PropertyId', label: 'GA4: ID властивості', required: false },
  { key: 'goalEvent', label: 'GA4: назва події', required: false },
  { key: 'goalLabel', label: 'Як назвати дію для клієнта', required: false },
  { key: 'goalUtmSource', label: 'GA4: utm_source реклами', required: false },
];

export const DASHBOARD_TYPES: Record<DashboardType, { label: string; sources: DashboardSource[]; config: ConfigField[] }> = {
  pinterest_ads: { label: 'Pinterest Ads', sources: ['pinterest', 'windsor'], config: [accountField(), currencyField, ...goalFields] },
  chatgpt_ads: { label: 'ChatGPT Ads', sources: ['openai', 'windsor'], config: [accountField(), currencyField, ...goalFields] },
  google_ads: { label: 'Google Ads', sources: ['bizmap', 'windsor'], config: [accountField(false), currencyField] },
  meta_ads: { label: 'Meta Ads', sources: ['bizmap', 'windsor'], config: [accountField(false), currencyField] },
};

export const SOURCE_LABELS: Record<DashboardSource, string> = {
  pinterest: 'Pinterest API',
  openai: 'ChatGPT Ads API',
  windsor: 'Windsor',
  bizmap: 'BizMap',
  demo: 'Демо-дані',
};

/** Демо-джерело існує лише в емуляторі — у проді фейкові цифри не з'являться. */
export function isEmulator() {
  return process.env.FUNCTIONS_EMULATOR === 'true';
}

export function availableSources(type: DashboardType): DashboardSource[] {
  const base = DASHBOARD_TYPES[type].sources;
  return isEmulator() ? [...base, 'demo'] : base;
}

/* ---------------------------- синхронізація ---------------------------- */

const SYNC_STALE_MS = 6 * 60 * 60 * 1000;
/** Pinterest догружає останню добу ще ~2 дні — щодня перечитуємо тиждень. */
const RESYNC_DAYS = 7;

function earliestFor(source: DashboardSource) {
  if (source === 'pinterest') return pinterestEarliest();
  if (source === 'openai') return openaiEarliest();
  return windsorEarliest();
}

async function fetchDays(d: DashboardRecord, range: DateRange): Promise<PeriodDoc[]> {
  if (d.source === 'openai') {
    return fetchOpenAiDays(await getDashboardKey(d.id), range.from, range.to, d.config.timezone ?? '');
  }
  const accountId = d.config.accountId ?? '';
  if (!accountId) throw new SourceError('account not set');
  if (d.source === 'pinterest') return fetchPinterestDays(accountId, range.from, range.to, await getPinterestToken());
  if (d.source === 'windsor') return fetchWindsorDays(d.type, accountId, range.from, range.to, windsorToken.value());
  throw new SourceError(`source ${d.source} has no sync`);
}

export function syncs(source: DashboardSource) {
  return source === 'pinterest' || source === 'openai' || source === 'windsor';
}

/**
 * Забирає дні з джерела в архів. Без діапазону — останній тиждень,
 * а для нового дашборда — усе, що джерело ще пам'ятає.
 */
export async function syncDashboard(d: DashboardRecord, full = false): Promise<{ synced: DateRange | null }> {
  if (!syncs(d.source)) return { synced: null };
  if (d.source === 'windsor' && !windsorSupports(d.type)) return { synced: null };
  const ref = firestore().collection(COL.dashboards).doc(d.id);
  const earliest = earliestFor(d.source);
  const wanted: DateRange = {
    from: full || !d.lastSyncAt ? earliest : addDays(today(), -RESYNC_DAYS),
    to: today(),
  };
  try {
    const plan = await planSync(d.id, wanted, earliest);
    if (plan.range) await writePeriods(d.id, await fetchDays(d, plan.range), plan.replaceKeys);
    // Ціль GA4 — окремо: її збій не має ламати цифри реклами
    const goalError = await syncGoals(d, wanted).then(
      () => null,
      (error) => {
        console.error('goal sync failed', d.id, error);
        return `GA4: ${error instanceof SourceError ? error.message : 'internal error'}`.slice(0, 300);
      },
    );
    await ref.update({ lastSyncAt: new Date(), lastSyncError: goalError });
    return { synced: plan.range };
  } catch (error) {
    console.error('sync failed', d.id, d.source, error);
    const message = error instanceof SourceError ? error.message : 'internal error';
    await ref.update({ lastSyncError: message.slice(0, 300) }).catch(() => undefined);
    throw error;
  }
}

function goalConfigured(d: DashboardDoc) {
  return Boolean(d.config.ga4PropertyId && d.config.goalEvent);
}

async function syncGoals(d: DashboardRecord, wanted: DateRange) {
  if (!goalConfigured(d)) return;
  const earliest = windsorEarliest();
  const from = wanted.from < earliest ? earliest : wanted.from;
  if (from > wanted.to) return;
  const days = await fetchWindsorGoals(
    d.config.ga4PropertyId,
    d.config.goalEvent,
    d.config.goalUtmSource || 'pinterest',
    from,
    wanted.to,
    windsorToken.value(),
  );
  await writeGoals(d.id, days);
}

/* ------------------------------- звіт ------------------------------- */

/**
 * З чим порівнювати. Період з 1-го числа — з тими самими днями попереднього
 * місяця (жовтень → вересень, «1–14 листопада» → «1–14 жовтня»); інакше —
 * такий самий за довжиною період одразу перед вибраним.
 */
export function previousRange(range: DateRange): DateRange {
  const span = daysBetween(range.from, range.to) + 1;
  if (range.from.endsWith('-01') && span <= 31) {
    const [y, m] = range.from.split('-').map(Number);
    const prevStart = new Date(Date.UTC(y, m - 2, 1)).toISOString().slice(0, 10);
    const prevEnd = new Date(Date.UTC(y, m - 1, 0)).toISOString().slice(0, 10);
    // Повний місяць — з повним попереднім; неповний («цей місяць») — з тими самими днями
    const monthEnd = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    if (range.to === monthEnd) return { from: prevStart, to: prevEnd };
    const to = addDays(prevStart, span - 1);
    return { from: prevStart, to: to < prevEnd ? to : prevEnd };
  }
  return { from: addDays(range.from, -span), to: addDays(range.from, -1) };
}

export async function buildReport(
  d: DashboardRecord,
  range: DateRange,
  compare: boolean,
  campaignId: string | null = null,
): Promise<AdsReport> {
  const currency = d.config.currency || 'USD';
  if (d.source === 'demo') {
    if (!isEmulator()) throw new HttpsError('failed-precondition', 'source_not_available');
    const report = aggregate(demoPeriods(d, range), range, {
      currency,
      dataStart: addDays(today(), -150),
      syncedAt: new Date().toISOString(),
      goalLabel: 'Переходи на сайт (демо)',
      campaignId,
    });
    if (compare) {
      const prev = previousRange(range);
      report.previous = { range: prev, totals: totalsOf(demoPeriods(d, prev), campaignId) };
    }
    return report;
  }
  if (d.source === 'bizmap') throw new HttpsError('unimplemented', 'source_not_ready');

  let current = d;
  const lastSync = (d.lastSyncAt as unknown as { toDate?: () => Date })?.toDate?.() ?? null;
  if (syncs(d.source) && (!lastSync || Date.now() - lastSync.getTime() > SYNC_STALE_MS)) {
    // Свіжість — бажана, але не обов'язкова: якщо джерело лежить, показуємо архів
    await syncDashboard(d).catch(() => undefined);
    const snap = await firestore().collection(COL.dashboards).doc(d.id).get();
    current = { id: d.id, ...(snap.data() as DashboardDoc) };
  }
  const synced = (current.lastSyncAt as unknown as { toDate?: () => Date })?.toDate?.() ?? null;
  const report = aggregate(await readPeriods(d.id, range), range, {
    currency,
    dataStart: current.dataStart ?? null,
    syncedAt: synced?.toISOString() ?? null,
    goalLabel: goalConfigured(current) ? current.config.goalLabel || current.config.goalEvent : null,
    campaignId,
  });
  if (compare) {
    const prev = previousRange(range);
    // Порівнюємо лише з періодом, за який реклама вже йшла
    if (current.dataStart && prev.from >= current.dataStart) {
      report.previous = { range: prev, totals: totalsOf(await readPeriods(d.id, prev), campaignId) };
    }
  }
  return report;
}

export async function listSourceAccounts(type: DashboardType, source: DashboardSource) {
  if (source === 'pinterest' && type === 'pinterest_ads') return listPinterestAccounts(await getPinterestToken());
  if (source === 'windsor') return listWindsorAccounts(type, windsorToken.value());
  return [];
}

/* ------------------------------ демо-дані ------------------------------ */

function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function demoPeriods(d: DashboardRecord, range: DateRange): PeriodDoc[] {
  const start = addDays(today(), -150);
  const campaigns = [
    { id: 'c1', name: 'Remarketing — France', ads: ['Avrora | Фото | Remarketing', 'Bella | Фото | Remarketing'] },
    { id: 'c2', name: 'Трафік | Франція', ads: ['Avrora | Карусель | Франція', 'Kolekcia | Відео | Франція', 'Lira | Фото | Франція'] },
  ];
  const periods: PeriodDoc[] = [];
  for (let day = range.from < start ? start : range.from; day <= range.to; day = addDays(day, 1)) {
    const rows: FactRow[] = [];
    for (const c of campaigns) {
      for (const name of c.ads) {
        const rnd = seeded(`${d.id}:${day}:${name}`);
        const impressions = Math.round(400 + rnd() * 2400);
        const clicks = Math.round(impressions * (0.006 + rnd() * 0.02));
        rows.push({
          campaignId: c.id,
          campaignName: c.name,
          adId: `${c.id}-${name}`,
          adName: name,
          status: name.startsWith('Bella') ? 'PAUSED' : 'ACTIVE',
          impressions,
          clicks,
          spend: Math.round(clicks * (0.2 + rnd() * 0.4) * 100) / 100,
          conversions: Math.round(clicks * rnd() * 0.05),
        });
      }
    }
    // Переходи на сайт за UTM-мітками: назва сукні латиницею, ремаркетинг — із суфіксом
    const rnd = seeded(`${d.id}:${day}:goals`);
    const goals: Record<string, number> = {
      avrora: Math.round(rnd() * 4),
      'avrora-remarketing': Math.round(rnd() * 2),
      lira: Math.round(rnd() * 3),
      '(not set)': Math.round(rnd() * 2),
    };
    periods.push({ from: day, to: day, rows, origin: 'demo', goals });
  }
  return periods;
}
