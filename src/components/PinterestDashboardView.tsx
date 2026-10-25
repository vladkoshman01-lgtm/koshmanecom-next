'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import {
  ChartNoAxesCombined,
  MousePointer2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Info,
} from 'lucide-react';
import { pinterestDashboardData, type PinterestDashboardRow } from '@/lib/pinterest-dashboard-data';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Tooltip, Legend);

type Currency = 'PLN' | 'USD' | 'UAH';

type Summary = {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  saves: number;
  ads: number;
  rows: number;
};

const FX_FALLBACK: Record<Currency, number> = {
  PLN: 1,
  USD: 0.25,
  UAH: 10.5,
};

const formatMoney = (value: number, currency: Currency) =>
  new Intl.NumberFormat(currency === 'PLN' ? 'pl-PL' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const convertAmount = (value: number, currency: Currency, rates: Record<Currency, number>) => value * rates[currency];

const normalizeLabel = (label: string) => {
  const clean = label.replace(/\s+/g, ' ').trim();
  return clean.length > 34 ? `${clean.slice(0, 34)}…` : clean;
};

const currencyLabel: Record<Currency, string> = {
  PLN: 'Польські злоти',
  USD: 'Долари США',
  UAH: 'Гривні',
};

function summarizeRows(rows: PinterestDashboardRow[]): Summary {
  const spend = rows.reduce((sum, row) => sum + row.spend, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const saves = rows.reduce((sum, row) => sum + row.saves, 0);
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const cpc = clicks > 0 ? spend / clicks : 0;
  const ads = new Set(rows.map((row) => row.adId || row.adName)).size;
  return { spend, impressions, clicks, ctr, cpc, saves, ads, rows: rows.length };
}

// Aggregate rows by adId — sum across all periods, keep latest status
function aggregateByAd(rows: PinterestDashboardRow[]): PinterestDashboardRow[] {
  const map = new Map<string, PinterestDashboardRow>();
  for (const row of rows) {
    const key = row.adId || row.adName;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...row });
    } else {
      map.set(key, {
        ...existing,
        impressions: existing.impressions + row.impressions,
        clicks: existing.clicks + row.clicks,
        spend: existing.spend + row.spend,
        saves: existing.saves + row.saves,
        ctr: 0, // recalculated below
        cpc: 0, // recalculated below
        status: row.status, // latest status
        date: row.date,     // latest date
      });
    }
  }
  return Array.from(map.values()).map((r) => ({
    ...r,
    ctr: r.impressions > 0 ? (r.clicks / r.impressions) * 100 : 0,
    cpc: r.clicks > 0 ? r.spend / r.clicks : 0,
  }));
}

const ALL_PERIODS = '__all__';
const MONTH_PREFIX = 'MONTH:';

// weekLabel format: 'DD.MM–DD.MM.YYYY'. Groups by the month the week starts in.
function getMonthInfo(weekLabel: string): { key: string; label: string } {
  const [, endPart] = weekLabel.split('–');
  const endMatch = endPart?.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  const year = endMatch ? endMatch[3] : '0000';
  const month = endMatch ? endMatch[2] : '01';
  const key = `${year}-${month}`;
  const date = new Date(Number(year), Number(month) - 1, 1);
  const raw = date.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' });
  return { key, label: raw.charAt(0).toUpperCase() + raw.slice(1) };
}

// Groups weeks by month; only the most recent (still in-progress) month keeps
// per-week granularity, earlier completed months collapse into one option.
function buildPeriodOptions(weeks: { weekLabel: string }[]): { id: string; label: string }[] {
  const groups = new Map<string, { key: string; label: string; weekLabels: string[] }>();
  for (const w of weeks) {
    const { key, label } = getMonthInfo(w.weekLabel);
    if (!groups.has(key)) groups.set(key, { key, label, weekLabels: [] });
    groups.get(key)!.weekLabels.push(w.weekLabel);
  }
  const groupArr = Array.from(groups.values());
  const options: { id: string; label: string }[] = [];
  groupArr.forEach((g, idx) => {
    const isLast = idx === groupArr.length - 1;
    if (isLast) {
      g.weekLabels.forEach((wl) => options.push({ id: wl, label: wl }));
    } else {
      options.push({ id: `${MONTH_PREFIX}${g.key}`, label: g.label });
    }
  });
  return options;
}

function MetricTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex items-center">
      <Info className="h-3 w-3 cursor-help text-slate-300 hover:text-slate-500 transition" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl bg-slate-900 px-3 py-2 text-[11px] leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {text}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
}

export default function PinterestDashboardView() {
  const [currency, setCurrency] = useState<Currency>(pinterestDashboardData.baseCurrency);
  const [fx, setFx] = useState<Record<Currency, number>>(FX_FALLBACK);
  const [fxLoading, setFxLoading] = useState(true);
  const [activeCampaignId, setActiveCampaignId] = useState(pinterestDashboardData.campaigns[0]?.id ?? '');
  const [activePeriod, setActivePeriod] = useState<string>(ALL_PERIODS);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/PLN')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates) {
          setFx({
            PLN: 1,
            USD: data.rates.USD ?? FX_FALLBACK.USD,
            UAH: data.rates.UAH ?? FX_FALLBACK.UAH,
          });
        }
      })
      .catch(() => {}) // fallback залишається
      .finally(() => setFxLoading(false));
  }, []);

  const { campaigns } = pinterestDashboardData;
  const campaign = campaigns.find((c) => c.id === activeCampaignId) ?? campaigns[0];
  const weeks = campaign?.weeks ?? [];

  // Reset period when campaign changes
  const handleCampaignSwitch = (id: string) => {
    setActiveCampaignId(id);
    setActivePeriod(ALL_PERIODS);
  };

  const periodOptions = useMemo(() => buildPeriodOptions(weeks), [weeks]);
  const isAggregateView = activePeriod === ALL_PERIODS || activePeriod.startsWith(MONTH_PREFIX);

  // Rows for the selected period (or all)
  const periodRows = useMemo(() => {
    if (activePeriod === ALL_PERIODS) return weeks.flatMap((w) => w.rows);
    if (activePeriod.startsWith(MONTH_PREFIX)) {
      const key = activePeriod.slice(MONTH_PREFIX.length);
      return weeks.filter((w) => getMonthInfo(w.weekLabel).key === key).flatMap((w) => w.rows);
    }
    const week = weeks.find((w) => w.weekLabel === activePeriod);
    return week ? week.rows : [];
  }, [weeks, activePeriod]);

  // All rows always (for KPI totals)
  const allRows = useMemo(() => weeks.flatMap((w) => w.rows), [weeks]);
  const summary = useMemo(() => summarizeRows(allRows), [allRows]);

  // For charts and table: aggregate by ad when showing all periods or a whole month
  const chartRows = useMemo(
    () => isAggregateView ? aggregateByAd(periodRows) : periodRows,
    [periodRows, isAggregateView]
  );

  // Same collapse rule as the period filter: completed months become one point,
  // only the current (last) month keeps per-week points.
  const weekSummaries = useMemo(
    () =>
      periodOptions.map((opt) => {
        const rows = opt.id.startsWith(MONTH_PREFIX)
          ? weeks.filter((w) => getMonthInfo(w.weekLabel).key === opt.id.slice(MONTH_PREFIX.length)).flatMap((w) => w.rows)
          : weeks.find((w) => w.weekLabel === opt.id)?.rows ?? [];
        return { weekLabel: opt.label, ...summarizeRows(rows) };
      }),
    [weeks, periodOptions]
  );

  const topClickAds = useMemo(
    () => [...chartRows].sort((a, b) => b.clicks - a.clicks).slice(0, 10).reverse(),
    [chartRows]
  );

  const topCtrAds = useMemo(
    () => [...chartRows].sort((a, b) => b.ctr - a.ctr).slice(0, 10).reverse(),
    [chartRows]
  );

  const scatterPoints = useMemo(
    () => chartRows.map((row) => ({ x: convertAmount(row.spend, currency, fx), y: row.clicks, label: row.adName })),
    [chartRows, currency, fx]
  );

  const sortedRows = useMemo(
    () => [...chartRows].sort((a, b) => b.spend - a.spend || b.clicks - a.clicks),
    [chartRows]
  );

  const displaySpend = convertAmount(summary.spend, currency, fx);
  const displayCpc = summary.clicks > 0 ? displaySpend / summary.clicks : 0;
  const hasData = allRows.length > 0;
  const showPeriodFilter = weeks.length > 1;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:p-7">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <ChartNoAxesCombined className="h-3.5 w-3.5" />
            Pinterest Ads
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-[2rem]">
            {pinterestDashboardData.reportTitle}
          </h1>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Весь період · оновлено {pinterestDashboardData.updatedAt}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <div>
            <div className="font-medium text-slate-900">Швидкий огляд</div>
            <div className="mt-1">
              {summary.ads} оголошень · {weeks.length} {weeks.length === 1 ? 'звіт' : 'звіти'} · ручне оновлення
            </div>
          </div>
          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            Валюта
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none transition focus:border-brand-orange"
            >
              <option value="PLN">PLN</option>
              <option value="USD">USD</option>
              <option value="UAH">UAH</option>
            </select>
          </label>
          <p className="text-xs text-slate-500">
            Базова валюта звіту: {currencyLabel[pinterestDashboardData.baseCurrency]}. Покази/кліки не конвертуються.
          </p>
          {currency !== 'PLN' && (
            <p className="text-xs text-slate-400">
              {fxLoading ? 'Завантаження курсу…' : `1 PLN = ${fx[currency].toFixed(4)} ${currency} · live`}
            </p>
          )}
        </div>
      </div>

      {/* Зведена таблиця витрат по кампаніях */}
      {(() => {
        // Збираємо всі унікальні тижні з усіх кампаній (зберігаємо порядок) і групуємо
        // по місяцях — завершені місяці згортаються в одну колонку, лише останній
        // (поточний) місяць лишається розбитим по тижнях.
        const allWeeks = Array.from(
          new Set(campaigns.flatMap((c) => c.weeks.map((w) => w.weekLabel)))
        ).map((weekLabel) => ({ weekLabel }));
        const columns = buildPeriodOptions(allWeeks);
        if (columns.length === 0) return null;

        const spendForColumn = (c: (typeof campaigns)[number], col: { id: string }) => {
          if (col.id.startsWith(MONTH_PREFIX)) {
            const key = col.id.slice(MONTH_PREFIX.length);
            const relevant = c.weeks.filter((w) => getMonthInfo(w.weekLabel).key === key);
            if (relevant.length === 0) return null;
            return relevant.reduce((s, w) => s + w.rows.reduce((rs, r) => rs + r.spend, 0), 0);
          }
          const week = c.weeks.find((w) => w.weekLabel === col.id);
          return week ? week.rows.reduce((s, r) => s + r.spend, 0) : null;
        };

        return (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200">
              <h2 className="text-sm font-semibold text-slate-900">Витрати по кампаніях</h2>
              <p className="mt-0.5 text-xs text-slate-500">Загальна сума витрат за кожен звітний період — завершені місяці показані підсумком, поточний місяць по тижнях. <span className="text-slate-400">Кампанія 1 — основна реклама на широку аудиторію. Actalike — реклама на аудиторію схожу на тих, хто вже взаємодіяв з вашим контентом.</span></p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-[11px] uppercase tracking-[0.08em] text-slate-400">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Кампанія</th>
                    {columns.map((col) => (
                      <th key={col.id} className="px-4 py-3 text-right font-medium whitespace-nowrap">{col.label}</th>
                    ))}
                    <th className="px-4 py-3 text-right font-medium">Всього</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => {
                    const spendByColumn = columns.map((col) => spendForColumn(c, col));
                    const total = spendByColumn.reduce<number>((s, v) => s + (v !== null ? v : 0), 0);
                    return (
                      <tr key={c.id} className="border-t border-slate-200 bg-white">
                        <td className="px-5 py-3 font-medium text-slate-800 whitespace-nowrap">{c.name}</td>
                        {spendByColumn.map((v, i) => (
                          <td key={i} className="px-4 py-3 text-right text-slate-600 whitespace-nowrap">
                            {v !== null ? formatMoney(convertAmount(v, currency, fx), currency) : <span className="text-slate-300">—</span>}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right font-semibold text-slate-900 whitespace-nowrap">
                          {formatMoney(convertAmount(total, currency, fx), currency)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                  <tr>
                    <td className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Разом</td>
                    {columns.map((col) => {
                      const columnTotal = campaigns.reduce((s, c) => s + (spendForColumn(c, col) ?? 0), 0);
                      return (
                        <td key={col.id} className="px-4 py-3 text-right font-bold text-slate-900 whitespace-nowrap">
                          {formatMoney(convertAmount(columnTotal, currency, fx), currency)}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatMoney(convertAmount(
                        campaigns.reduce((s, c) => s + c.weeks.reduce((ws, w) => ws + w.rows.reduce((rs, r) => rs + r.spend, 0), 0), 0),
                        currency, fx
                      ), currency)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        );
      })()}

      {/* Перемикач кампаній */}
      {campaigns.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {campaigns.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCampaignSwitch(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCampaignId === c.id
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {!hasData ? (
        <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8">
          <div className="mx-auto max-w-2xl text-center">
            <Sparkles className="mx-auto h-10 w-10 text-brand-orange" />
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Дані ще не завантажені</h2>
            <p className="mt-2 text-slate-600">
              Щойно ми підставимо новий Pinterest CSV у джерело даних, тут з'являться KPI, графіки та таблиця звіту.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* KPI — завжди весь період */}
          <section className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Витрачено', value: displaySpend, sub: 'весь період', money: true, icon: TrendingUp, hint: 'Загальна сума витрат на рекламу за весь звітний період по обраній кампанії.' },
              { label: 'Кліків на сайт', value: summary.clicks, sub: 'усі оголошення', money: false, icon: MousePointer2, hint: 'Кількість людей, які натиснули на оголошення і перейшли на сайт або сторінку товару.' },
              { label: 'Покази', value: summary.impressions, sub: 'охоплення', money: false, icon: Sparkles, hint: 'Скільки разів оголошення було показано користувачам Pinterest. Не означає що вони клікнули.' },
              { label: 'Середній CPC', value: displayCpc, sub: 'ціна за один клік', money: true, icon: ShieldCheck, hint: 'Cost Per Click — скільки в середньому коштує один перехід на сайт. Чим нижче — тим ефективніше витрачається бюджет.' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-slate-500">{metric.label}</p>
                      <MetricTooltip text={metric.hint} />
                    </div>
                    <p className="mt-1 text-[24px] font-medium text-slate-900">
                      {metric.money
                        ? formatMoney(Number(metric.value), currency)
                        : Number(metric.value).toLocaleString('uk-UA')}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">{metric.sub}</p>
                  </div>
                  <metric.icon className="mt-1 h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
          </section>

          {/* Динаміка по місяцях */}
          {weeks.length > 1 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Динаміка по місяцях</h2>
              <p className="mt-1 text-sm text-slate-500">Порівняння результатів кожного місяця.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-600">
                  <thead className="border-b border-slate-200 text-[12px] uppercase tracking-[0.08em] text-slate-500">
                    <tr>
                      <th className="px-3 py-3">Місяць</th>
                      <th className="px-3 py-3">Покази</th>
                      <th className="px-3 py-3">Кліки</th>
                      <th className="px-3 py-3">CTR</th>
                      <th className="px-3 py-3">Витрати</th>
                      <th className="px-3 py-3">CPC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weekSummaries.map((w) => {
                      const wSpend = convertAmount(w.spend, currency, fx);
                      const wCpc = w.clicks > 0 ? wSpend / w.clicks : 0;
                      return (
                        <tr key={w.weekLabel} className="border-b border-slate-100">
                          <td className="px-3 py-3 font-medium text-slate-900 whitespace-nowrap">{w.weekLabel}</td>
                          <td className="px-3 py-3">{w.impressions.toLocaleString('uk-UA')}</td>
                          <td className="px-3 py-3">{w.clicks.toLocaleString('uk-UA')}</td>
                          <td className="px-3 py-3">{w.ctr.toFixed(2)}%</td>
                          <td className="px-3 py-3">{formatMoney(wSpend, currency)}</td>
                          <td className="px-3 py-3">{formatMoney(wCpc, currency)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="border-t-2 border-slate-200 bg-slate-50 font-semibold text-slate-800">
                    <tr>
                      <td className="px-3 py-3">Всього</td>
                      <td className="px-3 py-3">{summary.impressions.toLocaleString('uk-UA')}</td>
                      <td className="px-3 py-3">{summary.clicks.toLocaleString('uk-UA')}</td>
                      <td className="px-3 py-3">{summary.ctr.toFixed(2)}%</td>
                      <td className="px-3 py-3">{formatMoney(displaySpend, currency)}</td>
                      <td className="px-3 py-3">{formatMoney(displayCpc, currency)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 h-[220px]">
                <p className="mb-2 text-[13px] font-medium text-slate-500">CPC по місяцях</p>
                <Line
                  data={{
                    labels: weekSummaries.map((w) => w.weekLabel),
                    datasets: [
                      {
                        label: 'CPC',
                        data: weekSummaries.map((w) => {
                          const s = convertAmount(w.spend, currency, fx);
                          return w.clicks > 0 ? s / w.clicks : 0;
                        }),
                        borderColor: '#185FA5',
                        backgroundColor: 'rgba(24,95,165,0.1)',
                        tension: 0.3,
                        pointRadius: 5,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { display: false }, ticks: { color: '#888' } },
                      y: {
                        grid: { color: 'rgba(128,128,128,0.1)' },
                        ticks: { color: '#888', callback: (v) => formatMoney(Number(v), currency) },
                      },
                    },
                  }}
                />
              </div>
            </section>
          )}

          {/* Фільтр по місяцю для графіків */}
          {showPeriodFilter && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-slate-400">Період:</span>
              <button
                type="button"
                onClick={() => setActivePeriod(ALL_PERIODS)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activePeriod === ALL_PERIODS
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                Весь період
              </button>
              {periodOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActivePeriod(opt.id)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    activePeriod === opt.id
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Графіки */}
          <div className={`${showPeriodFilter ? 'mt-4' : 'mt-8'} space-y-5`}>
            <div>
              <h2 className="text-[13px] font-medium tracking-[0.03em] text-slate-500">Кліки по сукнях</h2>
              <p className="mt-0.5 text-[12px] text-slate-400">Які оголошення привели найбільше людей на сайт. Синій — лідери, зелений — добрий результат, сірий — є куди рости.</p>
              <div className="mt-2 h-[340px] rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <Bar
                  data={{
                    labels: topClickAds.map((row) => normalizeLabel(row.adName)),
                    datasets: [
                      {
                        data: topClickAds.map((row) => row.clicks),
                        backgroundColor: topClickAds.map((row) =>
                          row.clicks >= 700 ? '#185FA5' : row.clicks >= 400 ? '#1D9E75' : '#888780'
                        ),
                        borderRadius: 4,
                      },
                    ],
                  }}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { color: 'rgba(128,128,128,0.1)' }, ticks: { color: '#888' } },
                      y: { grid: { display: false }, ticks: { color: '#888', font: { size: 12 } } },
                    },
                  }}
                />
              </div>
            </div>

            <div>
              <h2 className="text-[13px] font-medium tracking-[0.03em] text-slate-500">CTR — клікабельність по сукнях</h2>
              <p className="mt-0.5 text-[12px] text-slate-400">Відсоток людей, які клікнули на оголошення після того як побачили його. Показує наскільки оголошення зацікавило аудиторію. Норма для Pinterest — від 0.5% до 2%.</p>
              <div className="mt-2 h-[340px] rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <Bar
                  data={{
                    labels: topCtrAds.map((row) => normalizeLabel(row.adName)),
                    datasets: [
                      {
                        data: topCtrAds.map((row) => row.ctr),
                        backgroundColor: topCtrAds.map((row) =>
                          row.ctr >= 2 ? '#185FA5' : row.ctr >= 1.5 ? '#1D9E75' : '#888780'
                        ),
                        borderRadius: 4,
                      },
                    ],
                  }}
                  options={{
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: {
                        grid: { color: 'rgba(128,128,128,0.1)' },
                        ticks: { color: '#888', callback: (v) => `${v}%` },
                      },
                      y: { grid: { display: false }, ticks: { color: '#888', font: { size: 12 } } },
                    },
                  }}
                />
              </div>
            </div>

            <div>
              <h2 className="text-[13px] font-medium tracking-[0.03em] text-slate-500">Витрати vs кліки — ефективність бюджету</h2>
              <p className="mt-0.5 text-[12px] text-slate-400">Кожна точка — одне оголошення. Ідеальне оголошення: мало витрат (ліворуч) і багато кліків (вгорі). Наведіть на точку щоб побачити назву сукні.</p>
              <div className="mt-2 h-[300px] rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <Scatter
                  data={{
                    datasets: [
                      {
                        label: 'Pinterest',
                        data: scatterPoints,
                        backgroundColor: '#185FA5',
                        pointRadius: 6,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => {
                            const point = scatterPoints[ctx.dataIndex];
                            return `${point.label}: ${formatMoney(Number(ctx.parsed.x), currency)} → ${ctx.parsed.y} кліків`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: {
                        title: { display: true, text: 'Витрати', color: '#888', font: { size: 12 } },
                        grid: { color: 'rgba(128,128,128,0.1)' },
                        ticks: { color: '#888', callback: (v) => formatMoney(Number(v), currency) },
                      },
                      y: {
                        title: { display: true, text: 'Кліки', color: '#888', font: { size: 12 } },
                        grid: { color: 'rgba(128,128,128,0.1)' },
                        ticks: { color: '#888' },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Детальна таблиця */}
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Таблиця звіту</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {activePeriod === ALL_PERIODS
                    ? 'Всі оголошення за весь період, агреговано по сукні.'
                    : activePeriod.startsWith(MONTH_PREFIX)
                    ? `Оголошення за ${periodOptions.find((o) => o.id === activePeriod)?.label ?? ''}, агреговано по сукні.`
                    : `Оголошення за ${activePeriod}, сортування за витратами.`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-orange hover:text-brand-orange"
              >
                <RefreshCw className="h-4 w-4" />
                Оновити
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 text-[12px] uppercase tracking-[0.08em] text-slate-500">
                  <tr>
                    <th className="px-3 py-3">Оголошення</th>
                    <th className="px-3 py-3">Статус</th>
                    <th className="px-3 py-3">Покази</th>
                    <th className="px-3 py-3">Кліки</th>
                    <th className="px-3 py-3">CTR</th>
                    <th className="px-3 py-3">Витрати</th>
                    <th className="px-3 py-3">CPC</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((row, index) => (
                    <tr key={`${row.adId}-${index}`} className="border-b border-slate-100">
                      <td className="px-3 py-3 min-w-[240px] max-w-[360px]">{row.adName}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{row.status || '—'}</td>
                      <td className="px-3 py-3">{row.impressions.toLocaleString('uk-UA')}</td>
                      <td className="px-3 py-3">{row.clicks.toLocaleString('uk-UA')}</td>
                      <td className="px-3 py-3">{row.ctr.toFixed(2)}%</td>
                      <td className="px-3 py-3">{formatMoney(convertAmount(row.spend, currency, fx), currency)}</td>
                      <td className="px-3 py-3">
                        {formatMoney(
                          row.clicks > 0 ? convertAmount(row.spend, currency, fx) / row.clicks : 0,
                          currency
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
