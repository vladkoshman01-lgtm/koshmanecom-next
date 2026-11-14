/**
 * Власний архів даних дашбордів: cabinetDashboards/{id}/periods/{from}_{to}.
 *
 * Джерела (Pinterest API, Windsor) пам'ятають обмежений час — Pinterest
 * віддає лише 90 днів, пробний Windsor — 30. Тому кабінет складає дані собі,
 * і звіт за весь час будується з архіву, а не з джерела.
 */
import { firestore } from '../db';
import { COL } from './access';
import type { AdsReport, DateRange, FactRow, PeriodDoc } from './types';

const DAY = 86400000;

export const isoDay = (t: number) => new Date(t).toISOString().slice(0, 10);
export const addDays = (day: string, n: number) => isoDay(Date.parse(day) + n * DAY);
export const today = () => isoDay(Date.now());
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / DAY);

function periodsCol(dashboardId: string) {
  return firestore().collection(COL.dashboards).doc(dashboardId).collection('periods');
}

/** Періоди, що починаються в межах діапазону. */
export async function readPeriods(dashboardId: string, range: DateRange): Promise<PeriodDoc[]> {
  const snap = await periodsCol(dashboardId).where('from', '>=', range.from).where('from', '<=', range.to).get();
  return snap.docs.map((d) => d.data() as PeriodDoc);
}

/**
 * Пише періоди з merge: рядки реклами замінюються, а вже збережені цілі GA4
 * (поле goals) лишаються — їх синхронізує окреме джерело.
 */
export async function writePeriods(dashboardId: string, periods: PeriodDoc[], deleteKeys: string[] = []) {
  const col = periodsCol(dashboardId);
  // Перший день із показами — старт реклами; порожні дні до нього не рахуються
  const earliest = periods.filter((p) => p.rows.length > 0).map((p) => p.from).sort()[0];
  if (earliest) {
    const ref = firestore().collection(COL.dashboards).doc(dashboardId);
    await firestore().runTransaction(async (tx) => {
      const current = (await tx.get(ref)).get('dataStart') as string | undefined;
      if (!current || earliest < current) tx.update(ref, { dataStart: earliest });
    });
  }
  for (let i = 0; i < Math.max(periods.length, deleteKeys.length); i += 400) {
    const batch = firestore().batch();
    periods.slice(i, i + 400).forEach((p) => batch.set(col.doc(`${p.from}_${p.to}`), p, { merge: true }));
    deleteKeys.slice(i, i + 400).forEach((k) => batch.delete(col.doc(k)));
    await batch.commit();
  }
}

/** Записує цілі GA4 у дні архіву, не чіпаючи рядків реклами. */
export async function writeGoals(dashboardId: string, days: { day: string; goals: Record<string, number> }[]) {
  const col = periodsCol(dashboardId);
  for (let i = 0; i < days.length; i += 400) {
    const batch = firestore().batch();
    for (const { day, goals } of days.slice(i, i + 400)) {
      // Поле goals замінюємо цілком: інакше merge лишив би мітки, яких у свіжих даних уже немає
      batch.set(col.doc(`${day}_${day}`), { from: day, to: day }, { merge: true });
      batch.update(col.doc(`${day}_${day}`), { goals });
    }
    await batch.commit();
  }
}

/**
 * Межі синхронізації з урахуванням імпортованих тижнів.
 *
 * Тиждень зі старого звіту не можна поділити на дні. Якщо джерело ще пам'ятає
 * його початок — розширюємо синхронізацію на весь тиждень і замінюємо його
 * точними днями; якщо ні — починаємо після нього, щоб не порахувати двічі.
 */
export async function planSync(
  dashboardId: string,
  wanted: DateRange,
  sourceEarliest: string,
): Promise<{ range: DateRange | null; replaceKeys: string[] }> {
  const snap = await periodsCol(dashboardId).where('to', '>=', wanted.from).get();
  const coarse = snap.docs
    .map((d) => ({ key: d.id, ...(d.data() as PeriodDoc) }))
    .filter((p) => p.from !== p.to && p.from <= wanted.to)
    .sort((a, b) => a.from.localeCompare(b.from));

  let from = wanted.from < sourceEarliest ? sourceEarliest : wanted.from;
  const replaceKeys: string[] = [];
  for (const p of coarse) {
    if (p.to < from) continue;
    if (p.from >= sourceEarliest) {
      if (p.from < from) from = p.from;
      replaceKeys.push(p.key);
    } else if (p.to >= from) {
      from = addDays(p.to, 1);
    }
  }
  return { range: from <= wanted.to ? { from, to: wanted.to } : null, replaceKeys };
}

/* ------------------------------ зведення ------------------------------ */

type Metrics = { spend: number; impressions: number; clicks: number; conversions: number; goals: number };
const zero = (): Metrics => ({ spend: 0, impressions: 0, clicks: 0, conversions: 0, goals: 0 });
function add(target: Metrics, row: Partial<Metrics>) {
  target.spend += row.spend ?? 0;
  target.impressions += row.impressions ?? 0;
  target.clicks += row.clicks ?? 0;
  target.conversions += row.conversions ?? 0;
  target.goals += row.goals ?? 0;
}
const round = <T extends Metrics>(m: T): T => ({ ...m, spend: Math.round(m.spend * 100) / 100 });

/** Підсумки без розбивки — для порівняння з попереднім періодом. */
export function totalsOf(periods: PeriodDoc[], campaignId: string | null = null): Metrics {
  const t = zero();
  for (const p of periods) {
    for (const r of p.rows ?? []) if (!campaignId || r.campaignId === campaignId) add(t, r);
    // Цілі прив'язані до оголошень лише в повному зведенні — для однієї кампанії не рахуємо
    if (!campaignId) for (const n of Object.values(p.goals ?? {})) t.goals += n;
  }
  return round(t);
}

const firstWord = (name: string) => name.split('|')[0].trim().toLowerCase();

/**
 * До якого оголошення належить UTM-мітка. Мітки — назва сукні латиницею
 * («emil»), суфікс підказує кампанію: «-remarketing», «-actalike».
 * Серед кандидатів беремо оголошення з найбільшою кількістю кліків.
 */
export function matchGoal<T extends { name: string; campaignName: string; clicks: number }>(content: string, ads: T[]): T | null {
  const slug = content.trim().toLowerCase();
  if (!slug || slug === '(not set)') return null;
  const hint = /remarketing/.test(slug) ? 'remarketing' : /actalike/.test(slug) ? 'actalike' : null;
  const base = slug.replace(/-(remarketing|actalike|wtb)\b.*$/, '');
  const named = ads.filter((a) => {
    const w = firstWord(a.name);
    return w === base || (w.length >= 4 && (w.startsWith(base) || base.startsWith(w)));
  });
  if (named.length === 0) return null;
  const byCampaign = named.filter((a) => {
    const c = a.campaignName.toLowerCase();
    return hint ? c.includes(hint) : !c.includes('remarketing') && !c.includes('actalike');
  });
  const pool = byCampaign.length ? byCampaign : named;
  return pool.reduce((best, a) => (a.clicks > best.clicks ? a : best));
}

/** Зводить періоди архіву у звіт. Помісячна динаміка — коли період довгий або є тижневі дані. */
export function aggregate(
  periods: PeriodDoc[],
  range: DateRange,
  opts: { currency: string; dataStart: string | null; syncedAt: string | null; goalLabel: string | null; campaignId?: string | null },
): AdsReport {
  const only = opts.campaignId ?? null;
  // Список кампаній для фільтра — з усіх рядків періоду, до фільтрації
  const options = new Map<string, { name: string; last: string }>();
  for (const p of periods) {
    for (const r of p.rows ?? []) {
      const o = options.get(r.campaignId);
      if (!o || p.from >= o.last) options.set(r.campaignId, { name: r.campaignName, last: p.from });
    }
  }
  const totals = zero();
  type Camp = Metrics & { id: string; name: string; status: string; last: string };
  type Ad = Metrics & { id: string; name: string; campaignName: string; status: string; last: string };
  const campaigns = new Map<string, Camp>();
  const ads = new Map<string, Ad>();
  const byKey = new Map<string, Metrics>();
  const goalsByContent = new Map<string, number>();
  let goalsSince: string | null = null;

  const hasCoarseData = periods.some((p) => p.from !== p.to && (p.rows ?? []).length > 0);
  const spanDays = daysBetween(range.from, range.to) + 1;
  const granularity: 'day' | 'month' = hasCoarseData || spanDays > 62 ? 'month' : 'day';

  for (const p of [...periods].sort((a, b) => a.from.localeCompare(b.from))) {
    const key = granularity === 'month' ? p.from.slice(0, 7) : p.from;
    const bucket = byKey.get(key) ?? zero();
    for (const r of (p.rows ?? []) as FactRow[]) {
      if (only && r.campaignId !== only) continue;
      add(totals, r);
      add(bucket, r);
      const c = campaigns.get(r.campaignId) ?? { id: r.campaignId, name: r.campaignName, status: '', last: '', ...zero() };
      add(c, r);
      // Назва й статус — з найсвіжішого періоду
      if (p.from >= c.last) Object.assign(c, { name: r.campaignName, last: p.from });
      campaigns.set(r.campaignId, c);
      const a = ads.get(r.adId) ?? { id: r.adId, name: r.adName, campaignName: r.campaignName, status: r.status, last: '', ...zero() };
      add(a, r);
      if (p.from >= a.last) Object.assign(a, { name: r.adName, campaignName: r.campaignName, status: r.status, last: p.from });
      ads.set(r.adId, a);
    }
    if (p.goals && !only) {
      if (!goalsSince || p.from < goalsSince) goalsSince = p.from;
      for (const [content, n] of Object.entries(p.goals)) {
        totals.goals += n;
        bucket.goals += n;
        goalsByContent.set(content, (goalsByContent.get(content) ?? 0) + n);
      }
    }
    byKey.set(key, bucket);
  }

  // Цілі по оголошеннях і кампаніях — за UTM-міткою
  let unattributed = 0;
  const adList = [...ads.values()];
  for (const [content, n] of goalsByContent) {
    const ad = matchGoal(content, adList);
    if (!ad) {
      unattributed += n;
      continue;
    }
    ad.goals += n;
    const camp = [...campaigns.values()].find((c) => c.name === ad.campaignName);
    if (camp) camp.goals += n;
  }

  // Дні без показів теж мають бути на графіку — інакше лінія бреше
  const keys: string[] = [];
  if (granularity === 'day') {
    for (let d = range.from; d <= range.to; d = addDays(d, 1)) keys.push(d);
  } else {
    for (let m = range.from.slice(0, 7); m <= range.to.slice(0, 7); ) {
      keys.push(m);
      const [y, mo] = m.split('-').map(Number);
      m = mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`;
    }
  }

  // Статус кампанії — «активна», якщо активне хоч одне її оголошення
  for (const c of campaigns.values()) {
    c.status = adList.some((a) => a.campaignName === c.name && a.status === 'ACTIVE') ? 'ACTIVE' : 'PAUSED';
  }

  const strip = <T extends { last: string }>({ last: _last, ...rest }: T) => rest;
  return {
    currency: opts.currency,
    range,
    dataStart: opts.dataStart,
    totals: round(totals),
    series: { granularity, points: keys.map((key) => ({ key, ...round(byKey.get(key) ?? zero()) })) },
    campaigns: [...campaigns.values()].map((c) => round(strip(c))).sort((a, b) => b.spend - a.spend),
    ads: adList.map((a) => round(strip(a))).sort((a, b) => b.spend - a.spend),
    hasCoarseData,
    goal: opts.goalLabel && !only ? { label: opts.goalLabel, since: goalsSince, unattributed } : null,
    campaignOptions: [...options.entries()].map(([id, o]) => ({ id, name: o.name })).sort((a, b) => a.name.localeCompare(b.name)),
    campaignId: only,
    previous: null,
    syncedAt: opts.syncedAt,
  };
}

/**
 * Імпорт старих звітів (тижні/місяці) в архів. Імпортовані періоди головні для
 * свого часу: дні з джерела всередині них видаляємо, а потім синхронізація
 * (planSync) сама замінить точними днями ті тижні, які джерело ще пам'ятає.
 */
export async function importPeriods(dashboardId: string, periods: PeriodDoc[]) {
  if (periods.length === 0) return { written: 0, replacedDays: 0 };
  const minFrom = periods.map((p) => p.from).sort()[0];
  const maxTo = periods.map((p) => p.to).sort().slice(-1)[0];
  const existing = await periodsCol(dashboardId).where('from', '>=', minFrom).where('from', '<=', maxTo).get();
  const inside = (day: string) => periods.some((p) => p.from <= day && day <= p.to);
  const replace = existing.docs
    .filter((d) => {
      const p = d.data() as PeriodDoc;
      return p.from === p.to && inside(p.from);
    })
    .map((d) => d.id);
  await writePeriods(dashboardId, periods, replace);
  return { written: periods.length, replacedDays: replace.length };
}
