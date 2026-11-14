'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowDown, ArrowLeft, ArrowUp, ArrowUpDown, Download, RefreshCw, Search } from 'lucide-react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import { cabinetCall, errorMessage, type AdsReport, type DashboardSummary, type Me } from '@/lib/cabinet/api';
import { Spinner } from './CabinetShell';
import Hint from './Hint';
import PlatformLogo from './PlatformLogo';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ORANGE = '#FF5B2B';
const INK = '#141414';

/* ------------------------------- періоди ------------------------------- */

const iso = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => iso(new Date(Date.now() - n * 86400000));

type Preset = { id: string; label: string; payload: () => Record<string, unknown> };

const PRESETS: Preset[] = [
  { id: 'all', label: 'Увесь час', payload: () => ({ all: true }) },
  {
    id: 'month',
    label: 'Цей місяць',
    payload: () => {
      const now = new Date();
      return { from: iso(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))), to: daysAgo(0) };
    },
  },
  {
    id: 'prev',
    label: 'Минулий місяць',
    payload: () => {
      const now = new Date();
      return {
        from: iso(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))),
        to: iso(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0))),
      };
    },
  },
  { id: '7', label: '7 днів', payload: () => ({ from: daysAgo(6), to: daysAgo(0) }) },
  { id: '30', label: '30 днів', payload: () => ({ from: daysAgo(29), to: daysAgo(0) }) },
];

/* ------------------------------- валюти ------------------------------- */

const CURRENCIES = ['PLN', 'USD', 'EUR', 'UAH'] as const;

/** Курси від валюти акаунта. Перерахунок — за сьогоднішнім курсом, тож він приблизний. */
function useRates(base: string | undefined) {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  useEffect(() => {
    if (!base) return;
    let cancelled = false;
    fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`)
      .then((r) => r.json())
      .then((d: { rates?: Record<string, number> }) => {
        if (!cancelled && d.rates) setRates(d.rates);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [base]);
  return rates;
}

/* ------------------------------ форматування ------------------------------ */

const num = (n: number, digits = 0) =>
  n.toLocaleString('uk-UA', { minimumFractionDigits: digits, maximumFractionDigits: digits });

function formatMoney(n: number, currency: string) {
  try {
    return n.toLocaleString('uk-UA', { style: 'currency', currency, maximumFractionDigits: 2 });
  } catch {
    return `${num(n, 2)} ${currency}`;
  }
}

const ctr = (clicks: number, impressions: number) => (impressions ? (clicks / impressions) * 100 : 0);
const cpc = (spend: number, clicks: number) => (clicks ? spend / clicks : 0);
const rate = (part: number, whole: number) => (whole ? (part / whole) * 100 : 0);
const humanDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const shortDate = (d: string) => d.split('-').reverse().join('.');
const monthLabel = (key: string) => {
  const [y, m] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('uk-UA', { month: 'short', year: '2-digit', timeZone: 'UTC' });
};

/** «1 червня – 14 листопада 2026», «1–30 вересня 2026». */
function periodLabel(from: string, to: string) {
  const f = new Date(`${from}T00:00:00Z`);
  const t = new Date(`${to}T00:00:00Z`);
  const opts = { timeZone: 'UTC' } as const;
  const sameYear = f.getUTCFullYear() === t.getUTCFullYear();
  const sameMonth = sameYear && f.getUTCMonth() === t.getUTCMonth();
  const month = (d: Date) => d.toLocaleDateString('uk-UA', { ...opts, day: 'numeric', month: 'long' });
  if (sameMonth) return `${f.getUTCDate()}–${month(t)} ${t.getUTCFullYear()}`;
  if (sameYear) return `${month(f)} – ${month(t)} ${t.getUTCFullYear()}`;
  return `${humanDate(from)} – ${humanDate(to)}`;
}

/** Місяці від старту реклами до сьогодні, найсвіжіші першими. */
function monthsSince(start: string | null | undefined) {
  if (!start) return [];
  const out: string[] = [];
  const now = new Date();
  let [y, m] = start.split('-').map(Number);
  while (y < now.getUTCFullYear() || (y === now.getUTCFullYear() && m <= now.getUTCMonth() + 1)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    if (m === 12) {
      y += 1;
      m = 1;
    } else {
      m += 1;
    }
  }
  return out.reverse();
}

function monthRange(key: string) {
  const [y, m] = key.split('-').map(Number);
  const last = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);
  return { from: `${key}-01`, to: last < today ? last : today };
}

const monthName = (key: string) => {
  const [y, m] = key.split('-').map(Number);
  const name = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('uk-UA', { month: 'long', timeZone: 'UTC' });
  return `${name[0].toUpperCase()}${name.slice(1)} ${y}`;
};

/* ------------------------------- підказки ------------------------------- */

const HINTS = {
  spend: 'Скільки грошей списала рекламна платформа за вибраний період.',
  impressions: 'Скільки разів оголошення показали людям. Одна людина може побачити його кілька разів.',
  clicks: 'Скільки разів люди натиснули на оголошення. Рахуємо лише платні кліки.',
  ctr: 'Яка частка показів закінчилась кліком. Що вище — то цікавіше оголошення аудиторії.',
  cpc: 'Скільки в середньому коштував один клік: витрати, поділені на кліки. Що нижче — то краще.',
  conversions: 'Дії на сайті після реклами, які зафіксував тег рекламної платформи (наприклад, перегляд сторінки чи заявка).',
  goals: (label: string) =>
    `«${label}»: скільки разів люди після кліку на рекламу дійшли до цієї дії на сайті. Дані з Google Analytics за UTM-міткою оголошення.`,
  share: 'Яку частину всього бюджету за період витратила кампанія.',
  efficiency:
    'Кожна точка — одне оголошення. Ліворуч угорі — ті, що дають багато кліків за невеликі гроші; праворуч унизу — дорогі й малоефективні.',
};

/* ------------------------------- картки ------------------------------- */

/** Зміна до попереднього періоду. lowerIsBetter — для ціни кліку: зниження — це добре. */
function Delta({ now, before, lowerIsBetter = false }: { now: number; before: number; lowerIsBetter?: boolean }) {
  if (!before) return null;
  const change = ((now - before) / before) * 100;
  if (!Number.isFinite(change) || Math.abs(change) < 0.5) {
    return <div className="mt-1 text-xs text-[#8A8A8A]">без змін</div>;
  }
  const up = change > 0;
  const good = lowerIsBetter ? !up : up;
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <div className={`mt-1 flex flex-wrap items-center gap-x-1 text-xs font-semibold ${good ? 'text-[#141414]' : 'text-[#8A8A8A]'}`}>
      <span className="inline-flex items-center gap-0.5">
        <Icon className={`h-3 w-3 ${good ? 'text-brand-orange' : ''}`} aria-hidden="true" />
        {num(Math.abs(change), Math.abs(change) < 10 ? 1 : 0)}%
      </span>
      <span className="font-normal text-[#8A8A8A]">до попер. періоду</span>
    </div>
  );
}

function Metric({ label, value, hint, delta }: { label: string; value: string; hint: string; delta?: React.ReactNode }) {
  return (
    <div className="border-[1.5px] border-[#E5E5E5] bg-white p-4">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#8A8A8A]">
        <span className="min-w-0 truncate">{label}</span>
        <Hint text={hint} label={label} />
      </div>
      <div className="mt-1.5 text-[1.375rem] font-bold text-[#141414]">{value}</div>
      {delta}
    </div>
  );
}

function StatusPill({ status, neuter = false }: { status: string; neuter?: boolean }) {
  const active = status === 'ACTIVE';
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${active ? 'bg-[#FDE3D8] text-[#141414]' : 'bg-[#F4F4F4] text-[#8A8A8A]'}`}>
      {active ? (neuter ? 'Активне' : 'Активна') : 'На паузі'}
    </span>
  );
}

/* --------------------------- таблиця оголошень --------------------------- */

type AdRow = AdsReport['ads'][number];
type SortKey = 'name' | 'spend' | 'impressions' | 'clicks' | 'ctr' | 'cpc' | 'conversions' | 'goals';

function Th({
  label,
  k,
  left = false,
  hint,
  sort,
  onSort,
}: {
  label: string;
  k: SortKey;
  left?: boolean;
  hint?: string;
  sort: { key: SortKey; dir: 1 | -1 };
  onSort: (k: SortKey) => void;
}) {
  return (
    <th className={`whitespace-nowrap px-3 py-2 font-semibold ${left ? 'text-left md:pl-6' : 'text-right'}`}>
      <span className="inline-flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => onSort(k)}
          aria-label={`Сортувати за «${label}»`}
          className={`inline-flex items-center gap-1 hover:text-[#141414] ${sort.key === k ? 'text-[#141414]' : ''}`}
        >
          {label}
          <ArrowUpDown className={`h-3 w-3 ${sort.key === k ? 'text-brand-orange' : ''}`} aria-hidden="true" />
        </button>
        {hint ? <Hint text={hint} label={label} align="end" /> : null}
      </span>
    </th>
  );
}

function AdsTable({
  report,
  money,
  showConversions,
  periodLabel,
}: {
  report: AdsReport;
  money: (n: number) => string;
  showConversions: boolean;
  periodLabel: string;
}) {
  const goal = report.goal;
  const [query, setQuery] = useState('');
  const [hideIdle, setHideIdle] = useState(true);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'spend', dir: -1 });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const value = (r: AdRow, k: SortKey) =>
      k === 'ctr' ? ctr(r.clicks, r.impressions) : k === 'cpc' ? cpc(r.spend, r.clicks) : k === 'name' ? r.name.toLowerCase() : r[k];
    return report.ads
      .filter((r) => !q || r.name.toLowerCase().includes(q))
      .filter((r) => !hideIdle || r.impressions > 0 || r.spend > 0)
      .sort((a, b) => {
        const av = value(a, sort.key);
        const bv = value(b, sort.key);
        return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
      });
  }, [report.ads, query, hideIdle, sort]);

  const totals = rows.reduce(
    (t, r) => ({
      spend: t.spend + r.spend,
      impressions: t.impressions + r.impressions,
      clicks: t.clicks + r.clicks,
      conversions: t.conversions + r.conversions,
      goals: t.goals + r.goals,
    }),
    { spend: 0, impressions: 0, clicks: 0, conversions: 0, goals: 0 },
  );

  const exportCsv = () => {
    const head = [
      'Кампанія',
      'Оголошення',
      'Статус',
      'Витрати',
      'Покази',
      'Кліки',
      'CTR %',
      'Ціна кліку',
      ...(showConversions ? ['Конверсії'] : []),
      ...(goal ? [goal.label] : []),
    ];
    const line = (r: AdRow) => [
      r.campaignName,
      r.name,
      r.status === 'ACTIVE' ? 'Активне' : 'На паузі',
      money(r.spend),
      r.impressions,
      r.clicks,
      num(ctr(r.clicks, r.impressions), 2),
      money(cpc(r.spend, r.clicks)),
      ...(showConversions ? [r.conversions] : []),
      ...(goal ? [r.goals] : []),
    ];
    const esc = (v: string | number) => (/[";\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
    const csv = [head, ...rows.map(line)].map((r) => r.map(esc).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `zvit_${report.range.from}_${report.range.to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSort = (k: SortKey) => setSort((cur) => ({ key: k, dir: cur.key === k ? (cur.dir === 1 ? -1 : 1) : -1 }));
  const th = { sort, onSort };
  const cols = 6 + (showConversions ? 1 : 0) + (goal ? 1 : 0);

  return (
    <div className="mt-6 border-[1.5px] border-[#E5E5E5] bg-white">
      <div className="flex flex-wrap items-center gap-3 px-4 pt-4 md:px-6 md:pt-6">
        <h2 className="mr-auto text-base font-semibold text-[#141414]">
          Оголошення <span className="font-normal text-[#8A8A8A]">· {periodLabel}</span>
        </h2>
        <button type="button" onClick={exportCsv} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141414] hover:text-brand-orange">
          <Download className="h-4 w-4" aria-hidden="true" /> CSV
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 px-4 md:px-6">
        <label className="relative min-w-[12rem] flex-1">
          <span className="sr-only">Пошук оголошення</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A]" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за назвою"
            className="h-10 w-full border-[1.5px] border-[#D9D9D9] pl-9 pr-3 text-sm outline-none focus:border-[#141414]"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-[#5A5A5A]">
          <input type="checkbox" checked={hideIdle} onChange={(e) => setHideIdle(e.target.checked)} />
          Сховати без показів
        </label>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[48rem] text-sm">
          <thead>
            <tr className="border-b border-[#E5E5E5] text-xs text-[#8A8A8A]">
              <Th label="Оголошення" k="name" left {...th} />
              <Th label="Витрати" k="spend" {...th} />
              <Th label="Покази" k="impressions" {...th} />
              <Th label="Кліки" k="clicks" {...th} />
              <Th label="CTR" k="ctr" hint={HINTS.ctr} {...th} />
              <Th label="Ціна кліку" k="cpc" hint={HINTS.cpc} {...th} />
              {showConversions ? <Th label="Конверсії" k="conversions" hint={HINTS.conversions} {...th} /> : null}
              {goal ? <Th label={goal.label} k="goals" hint={HINTS.goals(goal.label)} {...th} /> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[#F0F0F0]">
                <td className="max-w-[22rem] px-3 py-3 md:pl-6">
                  <div className="font-semibold text-[#141414]">{r.name}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#8A8A8A]">
                    <StatusPill status={r.status} neuter />
                    <span className="truncate">{r.campaignName}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-right">{money(r.spend)}</td>
                <td className="px-3 py-3 text-right">{num(r.impressions)}</td>
                <td className="px-3 py-3 text-right">{num(r.clicks)}</td>
                <td className="px-3 py-3 text-right">{num(ctr(r.clicks, r.impressions), 2)}%</td>
                <td className="px-3 py-3 text-right">{money(cpc(r.spend, r.clicks))}</td>
                {showConversions ? <td className="px-3 py-3 text-right">{num(r.conversions)}</td> : null}
                {goal ? (
                  <td className="px-3 py-3 text-right">
                    {num(r.goals)}
                    {r.goals ? <span className="block text-xs text-[#8A8A8A]">{num(rate(r.goals, r.clicks), 1)}% кліків</span> : null}
                  </td>
                ) : null}
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={cols} className="px-6 py-6 text-center text-[#8A8A8A]">
                  Нічого не знайдено.
                </td>
              </tr>
            ) : (
              <tr className="font-semibold text-[#141414]">
                <td className="px-3 py-3 md:pl-6">Разом · {rows.length}</td>
                <td className="px-3 py-3 text-right">{money(totals.spend)}</td>
                <td className="px-3 py-3 text-right">{num(totals.impressions)}</td>
                <td className="px-3 py-3 text-right">{num(totals.clicks)}</td>
                <td className="px-3 py-3 text-right">{num(ctr(totals.clicks, totals.impressions), 2)}%</td>
                <td className="px-3 py-3 text-right">{money(cpc(totals.spend, totals.clicks))}</td>
                {showConversions ? <td className="px-3 py-3 text-right">{num(totals.conversions)}</td> : null}
                {goal ? <td className="px-3 py-3 text-right">{num(totals.goals)}</td> : null}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------- сторінка ------------------------------- */

export default function AdsReportView({ me }: { me: Me }) {
  const id = useSearchParams().get('id') ?? '';
  const [preset, setPreset] = useState('all');
  const [data, setData] = useState<{ dashboard: DashboardSummary; report: AdsReport } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [display, setDisplay] = useState<string | null>(null);
  const [campaign, setCampaign] = useState('');

  const load = useCallback(
    () =>
      cabinetCall<{ dashboard: DashboardSummary; report: AdsReport }>('getDashboard', {
        id,
        ...(preset.startsWith('m:') ? monthRange(preset.slice(2)) : (PRESETS.find((p) => p.id === preset) ?? PRESETS[0]).payload()),
        ...(campaign ? { campaignId: campaign } : {}),
      })
        .then((r) => {
          setData(r);
          setError(null);
        })
        .catch((e) => setError(errorMessage(e)))
        .finally(() => setLoading(false)),
    [id, preset, campaign],
  );

  useEffect(() => {
    if (id) void load();
  }, [id, load]);

  const syncNow = async () => {
    setSyncing(true);
    try {
      await cabinetCall('syncNow', { id });
      await load();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setSyncing(false);
    }
  };

  const r = data?.report;
  const base = r?.currency;
  const rates = useRates(base);
  const shown = display && rates?.[display] ? display : base ?? 'USD';
  const factor = shown !== base && rates?.[shown] ? rates[shown] : 1;
  const money = useCallback((n: number) => formatMoney(n * factor, shown), [factor, shown]);

  const chart = useMemo(() => {
    if (!r) return null;
    const { series } = r;
    const monthly = series.granularity === 'month';
    return {
      labels: series.points.map((p) => (monthly ? monthLabel(p.key) : p.key.slice(5).split('-').reverse().join('.'))),
      datasets: [
        { label: 'Витрати', data: series.points.map((p) => p.spend * factor), borderColor: ORANGE, backgroundColor: ORANGE, yAxisID: 'y', tension: 0.3, pointRadius: monthly ? 3 : 0 },
        { label: 'Кліки', data: series.points.map((p) => p.clicks), borderColor: INK, backgroundColor: INK, yAxisID: 'y1', tension: 0.3, pointRadius: monthly ? 3 : 0 },
      ],
    };
  }, [r, factor]);

  const scatter = useMemo(() => {
    if (!r) return null;
    const points = r.ads.filter((a) => a.spend > 0).map((a) => ({ x: a.spend * factor, y: a.clicks, label: a.name }));
    return points.length >= 3 ? points : null;
  }, [r, factor]);

  if (!id) return <p className="py-16 text-center font-semibold">Звіт не вказано.</p>;

  // У старих тижневих даних конверсій немає — за такий період сума була б неповною
  const showConversions = Boolean(r && r.totals.conversions > 0 && !r.hasCoarseData);
  const goal = r?.goal ?? null;
  const prev = r?.previous?.totals;
  const budget = r?.totals.spend || 1;
  const label = r ? periodLabel(r.range.from, r.range.to) : '';
  const months = monthsSince(r?.dataStart);
  const campaignOptions = r?.campaignOptions ?? [];
  const goalPartial = Boolean(goal?.since && r && goal.since > r.range.from);

  return (
    <div className="py-8 md:py-10">
      <Link href="/cabinet" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5A5A5A] hover:text-brand-orange">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Усі звіти
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {data ? <PlatformLogo type={data.dashboard.type} /> : null}
        <div className="min-w-0">
          {/* Чий це звіт — назву компанії бачить і клієнт */}
          <div className="text-xs font-semibold uppercase tracking-wide text-[#8A8A8A]">
            {data?.dashboard.clientName ? `${data.dashboard.clientName} · ` : ''}
            {data?.dashboard.typeLabel ?? 'Звіт'}
          </div>
          <h1 className="mt-1 text-[1.75rem] font-bold text-[#141414]">{data?.dashboard.title ?? 'Звіт'}</h1>
          {r?.dataStart ? <p className="mt-1 text-sm text-[#5A5A5A]">Реклама з {humanDate(r.dataStart)}</p> : null}
        </div>
      </div>

      {/* Фільтри «прилипають» до верху, щоб під час гортання було видно, за що цифри */}
      <div className="z-10 -mx-4 mt-4 border-b border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 md:sticky md:top-0 md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Фільтри звіту">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setLoading(true);
                setPreset(p.id);
              }}
              aria-pressed={preset === p.id}
              className={`h-9 border-[1.5px] px-3 text-sm font-semibold transition ${
                preset === p.id ? 'border-[#141414] bg-[#141414] text-white' : 'border-[#D9D9D9] bg-white text-[#141414] hover:border-[#141414]'
              }`}
            >
              {p.label}
            </button>
          ))}
          {months.length > 1 ? (
            <select
              value={preset.startsWith('m:') ? preset : ''}
              onChange={(e) => {
                if (!e.target.value) return;
                setLoading(true);
                setPreset(e.target.value);
              }}
              aria-label="Місяць"
              className={`h-9 border-[1.5px] bg-white px-2 text-sm font-semibold outline-none ${
                preset.startsWith('m:') ? 'border-[#141414] text-[#141414]' : 'border-[#D9D9D9] text-[#5A5A5A]'
              }`}
            >
              <option value="">Місяць…</option>
              {months.map((m) => (
                <option key={m} value={`m:${m}`}>
                  {monthName(m)}
                </option>
              ))}
            </select>
          ) : null}
          {campaignOptions.length > 1 ? (
            <select
              value={campaign}
              onChange={(e) => {
                setLoading(true);
                setCampaign(e.target.value);
              }}
              aria-label="Кампанія"
              className={`h-9 max-w-full border-[1.5px] bg-white px-2 text-sm font-semibold outline-none sm:max-w-[18rem] ${
                campaign ? 'border-[#141414] text-[#141414]' : 'border-[#D9D9D9] text-[#5A5A5A]'
              }`}
            >
              <option value="">Усі кампанії</option>
              {campaignOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null}
          <div className="ml-auto flex items-center gap-2">
            {base ? (
              <select
                value={shown}
                onChange={(e) => setDisplay(e.target.value)}
                aria-label="Валюта"
                className="h-9 border-[1.5px] border-[#D9D9D9] bg-white px-2 text-sm font-semibold text-[#141414] outline-none focus:border-[#141414]"
              >
                {[base, ...CURRENCIES.filter((c) => c !== base)].map((c) => (
                  <option key={c} value={c} disabled={c !== base && !rates?.[c]}>
                    {c}
                  </option>
                ))}
              </select>
            ) : null}
            {me.isAdmin ? (
              <button
                type="button"
                onClick={() => void syncNow()}
                title="Забрати свіжі дані з джерела"
                aria-label="Оновити з джерела"
                className="flex h-9 w-9 items-center justify-center border-[1.5px] border-[#D9D9D9] bg-white hover:border-[#141414]"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
        {r ? (
          <p className="mt-2 text-sm text-[#5A5A5A]">
            <span className="font-semibold text-[#141414]">{periodLabel(r.range.from, r.range.to)}</span>
            {r.campaignId ? ` · ${campaignOptions.find((c) => c.id === r.campaignId)?.name ?? ''}` : ' · усі кампанії'}
          </p>
        ) : null}
      </div>

      {me.isAdmin && data?.dashboard.syncError ? (
        <div className="mt-4 flex items-start gap-2 bg-[#FDE3D8] px-4 py-3 text-sm text-[#141414]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
          <span className="min-w-0">
            Остання синхронізація пройшла з помилкою, показуємо збережені дані. Видно лише адмінам.
            <span className="mt-1 block break-all font-mono text-xs text-[#5A5A5A]">{data.dashboard.syncError}</span>
          </span>
        </div>
      ) : null}

      {error ? <p className="mt-10 font-semibold text-[#141414]">{error}</p> : null}
      {!error && loading && !data ? <Spinner label="Завантажуємо звіт…" /> : null}

      {r ? (
        <div className={loading ? 'opacity-60 transition' : 'transition'}>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <Metric label="Витрати" value={money(r.totals.spend)} hint={HINTS.spend} delta={prev ? <Delta now={r.totals.spend} before={prev.spend} /> : null} />
            <Metric label="Покази" value={num(r.totals.impressions)} hint={HINTS.impressions} delta={prev ? <Delta now={r.totals.impressions} before={prev.impressions} /> : null} />
            <Metric label="Кліки" value={num(r.totals.clicks)} hint={HINTS.clicks} delta={prev ? <Delta now={r.totals.clicks} before={prev.clicks} /> : null} />
            <Metric
              label="CTR"
              value={`${num(ctr(r.totals.clicks, r.totals.impressions), 2)}%`}
              hint={HINTS.ctr}
              delta={prev ? <Delta now={ctr(r.totals.clicks, r.totals.impressions)} before={ctr(prev.clicks, prev.impressions)} /> : null}
            />
            <Metric
              label="Ціна кліку"
              value={money(cpc(r.totals.spend, r.totals.clicks))}
              hint={HINTS.cpc}
              delta={prev ? <Delta now={cpc(r.totals.spend, r.totals.clicks)} before={cpc(prev.spend, prev.clicks)} lowerIsBetter /> : null}
            />
            {goal ? (
              <Metric
                label={goal.label}
                value={num(r.totals.goals)}
                hint={`${HINTS.goals(goal.label)}${goalPartial ? ` Рахуються з ${shortDate(goal.since!)}.` : ''}`}
                delta={
                  prev && !goalPartial ? (
                    <Delta now={r.totals.goals} before={prev.goals} />
                  ) : r.totals.clicks ? (
                    <div className="mt-1 text-xs text-[#8A8A8A]">{num(rate(r.totals.goals, r.totals.clicks), 1)}% кліків</div>
                  ) : null
                }
              />
            ) : showConversions ? (
              <Metric label="Конверсії" value={num(r.totals.conversions)} hint={HINTS.conversions} delta={prev ? <Delta now={r.totals.conversions} before={prev.conversions} /> : null} />
            ) : null}
          </div>
          {shown !== base ? <p className="mt-2 text-xs text-[#8A8A8A]">Суми перераховано з {base} в {shown} за сьогоднішнім курсом — приблизно.</p> : null}

          <div className="mt-6 border-[1.5px] border-[#E5E5E5] bg-white p-4 md:p-6">
            <h2 className="text-base font-semibold text-[#141414]">
              {r.series.granularity === 'month' ? 'Динаміка по місяцях' : 'Динаміка по днях'}{' '}
              <span className="font-normal text-[#8A8A8A]">· {label}</span>
            </h2>
            <div className="mt-4 h-[18rem]">
              {chart ? (
                <Line
                  data={chart}
                  options={{
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } },
                    scales: {
                      x: { grid: { display: false }, ticks: { maxTicksLimit: 12 } },
                      y: { position: 'left', beginAtZero: true, title: { display: true, text: shown } },
                      y1: { position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: 'Кліки' } },
                    },
                  }}
                />
              ) : null}
            </div>
          </div>

          <div className="mt-6 border-[1.5px] border-[#E5E5E5] bg-white">
            <h2 className="px-4 pt-4 text-base font-semibold text-[#141414] md:px-6 md:pt-6">
              Кампанії <span className="font-normal text-[#8A8A8A]">· {label}</span>
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[48rem] text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-left text-xs text-[#8A8A8A]">
                    <th className="px-4 py-2 font-semibold md:px-6">Кампанія</th>
                    <th className="px-3 py-2 text-right font-semibold">Витрати</th>
                    <th className="whitespace-nowrap px-3 py-2 text-right font-semibold">
                      <span className="inline-flex items-center gap-0.5">
                        Частка бюджету <Hint text={HINTS.share} label="Частка бюджету" align="end" />
                      </span>
                    </th>
                    <th className="px-3 py-2 text-right font-semibold">Кліки</th>
                    <th className="px-3 py-2 text-right font-semibold">CTR</th>
                    <th className="px-3 py-2 text-right font-semibold">Ціна кліку</th>
                    {goal ? <th className="px-4 py-2 text-right font-semibold md:px-6">{goal.label}</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {r.campaigns.map((c) => (
                    <tr key={c.id} className="border-b border-[#F0F0F0] last:border-0">
                      <td className="px-4 py-3 md:px-6">
                        <div className="font-semibold text-[#141414]">{c.name}</div>
                        <div className="mt-1">
                          <StatusPill status={c.status} />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">{money(c.spend)}</td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="hidden h-1.5 w-16 bg-[#F4F4F4] sm:block">
                            <span className="block h-full bg-brand-orange" style={{ width: `${Math.round((c.spend / budget) * 100)}%` }} />
                          </span>
                          {num((c.spend / budget) * 100, 1)}%
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">{num(c.clicks)}</td>
                      <td className="px-3 py-3 text-right">{num(ctr(c.clicks, c.impressions), 2)}%</td>
                      <td className="px-3 py-3 text-right">{money(cpc(c.spend, c.clicks))}</td>
                      {goal ? <td className="px-4 py-3 text-right md:px-6">{num(c.goals)}</td> : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {scatter ? (
            <div className="mt-6 border-[1.5px] border-[#E5E5E5] bg-white p-4 md:p-6">
              <h2 className="flex items-center gap-1 text-base font-semibold text-[#141414]">
                Ефективність оголошень <span className="font-normal text-[#8A8A8A]">· {label}</span>
                <Hint text={HINTS.efficiency} label="Ефективність оголошень" />
              </h2>
              <p className="mt-1 text-sm text-[#5A5A5A]">Найкращі — ліворуч угорі: багато кліків за невеликі гроші.</p>
              <div className="mt-4 h-[18rem]">
                <Scatter
                  data={{ datasets: [{ label: 'Оголошення', data: scatter, backgroundColor: ORANGE, pointRadius: 5, pointHoverRadius: 7 }] }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => {
                            const p = ctx.raw as { x: number; y: number; label: string };
                            return `${p.label}: ${formatMoney(p.x, shown)}, ${num(p.y)} кліків`;
                          },
                        },
                      },
                    },
                    scales: {
                      x: { beginAtZero: true, title: { display: true, text: `Витрати, ${shown}` } },
                      y: { beginAtZero: true, title: { display: true, text: 'Кліки' } },
                    },
                  }}
                />
              </div>
            </div>
          ) : null}

          <AdsTable report={r} money={money} showConversions={showConversions && !goal} periodLabel={label} />

          <p className="mt-4 text-xs leading-relaxed text-[#8A8A8A]">
            Період: {humanDate(r.range.from)} – {humanDate(r.range.to)}.
            {r.previous ? ` Порівняння — з ${shortDate(r.previous.range.from)}–${shortDate(r.previous.range.to)}.` : ''}
            {r.syncedAt ? ` Дані оновлено ${new Date(r.syncedAt).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' })}.` : ''}{' '}
            За останні два дні платформа ще може дораховувати цифри.
            {r.hasCoarseData ? ' Найстаріші дані зберігаються тижнями, тож межі короткого періоду можуть бути округлені до тижня.' : ''}
            {goal && goalPartial ? ` «${goal.label}» рахуються з ${humanDate(goal.since!)}.` : ''}
            {goal && goal.unattributed ? ` Ще ${num(goal.unattributed)} — з реклами, але без мітки конкретного оголошення.` : ''}
          </p>
        </div>
      ) : null}
    </div>
  );
}
