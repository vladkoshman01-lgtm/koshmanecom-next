'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import {
  ChartNoAxesCombined,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  MousePointerClick,
  DollarSign,
  Eye,
  ArrowUpDown,
  Search,
  LayoutGrid,
  ThumbsUp,
  ThumbsDown,
  Download,
} from 'lucide-react';
import DashboardGate from '@/components/DashboardGate';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Tooltip, Legend);

type AdRow = {
  adId: string;
  adName: string;
  status: string;
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
};

type CampaignResult = {
  campaign: { id: string; name: string; status: string };
  ads: AdRow[];
};

type MonthlyPoint = { month: string; impressions: number; clicks: number; spend: number };
type WhereToBuyPoint = { content: string; visits: number };

type ApiResponse = {
  startDate: string;
  endDate: string;
  campaigns: CampaignResult[];
  monthly?: MonthlyPoint[];
  whereToBuy?: WhereToBuyPoint[];
  error?: string;
  detail?: string;
};

// Matches a GA4 utm_content slug (e.g. "milanora-remarketing") to a dashboard
// ad name (e.g. "Milanora | Remarketing | Франція") by first-word comparison.
function matchesAdName(content: string, adName: string): boolean {
  const base = content.replace(/-remarketing$/, '').toLowerCase();
  const firstWord = adName.split('|')[0].trim().toLowerCase();
  return firstWord === base || firstWord.startsWith(base) || base.startsWith(firstWord);
}

const CURRENCY_LABELS = ['PLN', 'USD', 'EUR', 'UAH'] as const;
type Currency = (typeof CURRENCY_LABELS)[number];

const FX_FALLBACK: Record<Currency, number> = { PLN: 1, USD: 0.25, EUR: 0.23, UAH: 10.5 };
const CURRENCY_SYMBOLS: Record<Currency, string> = { PLN: 'zł', USD: '$', EUR: '€', UAH: '₴' };

const ALL_CAMPAIGNS = '__all__';

type SortKey = 'adName' | 'impressions' | 'clicks' | 'ctr' | 'spend' | 'cpc';

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('uk-UA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function convertAmount(pln: number, currency: Currency, rates: Record<Currency, number>) {
  return pln * rates[currency];
}

export default function PinterestLivePage() {
  return (
    <DashboardGate slug="pinterest-live" password={process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || ''}>
      <PinterestLiveContent />
    </DashboardGate>
  );
}

function PinterestLiveContent() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCampaignId, setActiveCampaignId] = useState<string>(ALL_CAMPAIGNS);
  const [currency, setCurrency] = useState<Currency>('PLN');
  const [fx, setFx] = useState<Record<Currency, number>>(FX_FALLBACK);
  const [lastFetched, setLastFetched] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [hideZero, setHideZero] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('spend');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/PLN')
      .then((r) => r.json())
      .then((d) => {
        if (d.rates) {
          setFx({
            PLN: 1,
            USD: d.rates.USD ?? FX_FALLBACK.USD,
            EUR: d.rates.EUR ?? FX_FALLBACK.EUR,
            UAH: d.rates.UAH ?? FX_FALLBACK.UAH,
          });
        }
      })
      .catch(() => {});
  }, []);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://us-central1-koshman-ecom-landing-729-54b1a.cloudfunctions.net/pinterestAnalytics?start_date=${startDate}&end_date=${endDate}`
      );
      const json: ApiResponse = await res.json();
      if (json.error) {
        setError(json.detail ?? json.error);
        setData(null);
      } else {
        setData(json);
        setLastFetched(new Date().toLocaleTimeString('uk-UA'));
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Помилка запиту');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sym = CURRENCY_SYMBOLS[currency];

  // Rows for the currently selected scope (one campaign or all combined)
  const scopedRows: (AdRow & { campaignName: string })[] = useMemo(() => {
    if (!data) return [];
    const campaigns =
      activeCampaignId === ALL_CAMPAIGNS
        ? data.campaigns
        : data.campaigns.filter((c) => c.campaign.id === activeCampaignId);
    return campaigns.flatMap((c) =>
      c.ads.map((ad) => ({ ...ad, campaignName: c.campaign.name }))
    );
  }, [data, activeCampaignId]);

  const filteredRows = useMemo(() => {
    let rows = scopedRows;
    if (hideZero) rows = rows.filter((r) => r.impressions > 0 || r.spend > 0);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((r) => r.adName.toLowerCase().includes(q));
    }
    const sorted = [...rows].sort((a, b) => {
      let av: number | string = a[sortKey];
      let bv: number | string = b[sortKey];
      if (sortKey === 'adName') {
        av = (av as string).toLowerCase();
        bv = (bv as string).toLowerCase();
        return sortDir === 'asc' ? (av < bv ? -1 : 1) : av < bv ? 1 : -1;
      }
      return sortDir === 'asc' ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return sorted;
  }, [scopedRows, hideZero, search, sortKey, sortDir]);

  const totals = filteredRows.reduce(
    (acc, r) => ({
      impressions: acc.impressions + r.impressions,
      clicks: acc.clicks + r.clicks,
      spend: acc.spend + r.spend,
    }),
    { impressions: 0, clicks: 0, spend: 0 }
  );
  const avgCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const avgCpc = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
  const maxSpend = Math.max(1, ...filteredRows.map((r) => r.spend));

  // Cross-campaign summary
  const campaignSummaries = useMemo(() => {
    if (!data) return [];
    return data.campaigns.map(({ campaign, ads }) => {
      const t = ads.reduce(
        (acc, r) => ({
          impressions: acc.impressions + r.impressions,
          clicks: acc.clicks + r.clicks,
          spend: acc.spend + r.spend,
        }),
        { impressions: 0, clicks: 0, spend: 0 }
      );
      const ctr = t.impressions > 0 ? (t.clicks / t.impressions) * 100 : 0;
      const cpc = t.clicks > 0 ? t.spend / t.clicks : 0;
      return { campaign, ...t, ctr, cpc };
    });
  }, [data]);
  const grandTotalSpend = campaignSummaries.reduce((s, c) => s + c.spend, 0);

  // Recommendations: best performers (high CTR, low CPC) vs pause candidates (spend with weak CTR)
  const recommendations = useMemo(() => {
    const withSpend = scopedRows.filter((r) => r.spend > 0 && r.impressions > 0);
    const avgSpend = withSpend.length > 0 ? withSpend.reduce((s, r) => s + r.spend, 0) / withSpend.length : 0;
    const meaningful = withSpend.filter((r) => r.spend >= Math.min(avgSpend * 0.3, 5));

    const scored = meaningful.map((r) => ({
      ...r,
      score: r.cpc > 0 ? (r.ctr * 100) / r.cpc : 0,
    }));

    const best = [...scored].sort((a, b) => b.score - a.score).slice(0, 3);
    const worst = [...scored]
      .filter((r) => r.spend >= avgSpend * 0.5)
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);

    return { best, worst };
  }, [scopedRows]);

  // GA4 "Де придбати" conversions matched to each ad by UTM content
  const whereToBuyRows = useMemo(() => {
    const wtb = data?.whereToBuy ?? [];
    if (wtb.length === 0) return [];
    const usedContents = new Set<string>();
    const rows = scopedRows
      .filter((r) => r.clicks > 0)
      .map((r) => {
        const match = wtb.find((w) => w.content !== '(not set)' && matchesAdName(w.content, r.adName));
        if (match) usedContents.add(match.content);
        const visits = match?.visits ?? 0;
        const rate = r.clicks > 0 ? (visits / r.clicks) * 100 : 0;
        return { adName: r.adName, clicks: r.clicks, visits, rate };
      })
      .filter((r) => r.visits > 0)
      .sort((a, b) => b.visits - a.visits);
    return rows;
  }, [data, scopedRows]);

  const whereToBuyTotal = whereToBuyRows.reduce((s, r) => s + r.visits, 0);
  const notSetVisits = data?.whereToBuy?.find((w) => w.content === '(not set)')?.visits ?? 0;

  const scatterPoints = useMemo(
    () =>
      filteredRows
        .filter((r) => r.spend > 0)
        .map((r) => ({ x: convertAmount(r.spend, currency, fx), y: r.clicks, label: r.adName })),
    [filteredRows, currency, fx]
  );

  const monthlyLabels = (data?.monthly ?? []).map((m) => {
    const [y, mo] = m.month.split('-');
    return new Date(Number(y), Number(mo) - 1, 1).toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' });
  });

  function exportCsv() {
    const headers = ['Кампанія', 'Оголошення', 'Статус', 'Покази', 'Кліки', 'CTR %', `Витрати (${sym})`, `CPC (${sym})`];
    const rows = filteredRows.map((r) => [
      r.campaignName,
      r.adName,
      r.status,
      r.impressions,
      r.clicks,
      fmt(r.ctr * 100, 2),
      fmt(convertAmount(r.spend, currency, fx)),
      r.cpc > 0 ? fmt(convertAmount(r.cpc, currency, fx)) : '0',
    ]);
    const totalsRow = [
      'Разом',
      '',
      '',
      totals.impressions,
      totals.clicks,
      fmt(avgCtr, 2),
      fmt(convertAmount(totals.spend, currency, fx)),
      fmt(convertAmount(avgCpc, currency, fx)),
    ];

    const escape = (v: string | number) => {
      const s = String(v);
      return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [headers, ...rows, totalsRow].map((row) => row.map(escape).join(';')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const scopeLabel =
      activeCampaignId === ALL_CAMPAIGNS
        ? 'all-campaigns'
        : (data?.campaigns.find((c) => c.campaign.id === activeCampaignId)?.campaign.name ?? 'campaign');
    a.href = url;
    a.download = `pinterest-anna-sposa_${scopeLabel}_${startDate}_${endDate}.csv`.replace(/\s+/g, '-');
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  function SortHeader({ label, sortKeyName, align = 'right' }: { label: string; sortKeyName: SortKey; align?: 'left' | 'right' }) {
    const active = sortKey === sortKeyName;
    return (
      <th
        onClick={() => toggleSort(sortKeyName)}
        className={`cursor-pointer select-none px-4 py-3 ${align === 'right' ? 'text-right' : 'text-left'} hover:text-slate-900 transition`}
      >
        <span className={`inline-flex items-center gap-1 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          {label}
          <ArrowUpDown className={`h-3 w-3 ${active ? 'text-red-500' : 'text-slate-300'}`} />
        </span>
      </th>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
              <ChartNoAxesCombined className="h-3.5 w-3.5" />
              Pinterest Ads · Live
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-[2rem]">
              Аналіз Pinterest Ads — Anna Sposa Group
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Дані напряму з Pinterest API
              {lastFetched && <span> · оновлено о {lastFetched}</span>}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-400"
            />
            <span className="text-slate-400">—</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-400"
            />
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Оновити
            </button>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:border-red-400"
            >
              {CURRENCY_LABELS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <div className="font-medium">Помилка Pinterest API</div>
              <div className="mt-1 font-mono text-xs opacity-80 whitespace-pre-wrap">{error}</div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && !data && (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            Завантаження даних з Pinterest...
          </div>
        )}

        {data && (
          <>
            {/* Cross-campaign summary */}
            {campaignSummaries.length > 1 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                      <th className="px-4 py-3">Кампанія</th>
                      <th className="px-4 py-3 text-right">Покази</th>
                      <th className="px-4 py-3 text-right">Кліки</th>
                      <th className="px-4 py-3 text-right">CTR %</th>
                      <th className="px-4 py-3 text-right">Витрати ({sym})</th>
                      <th className="px-4 py-3 text-right">% від бюджету</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignSummaries.map((c) => {
                      const share = grandTotalSpend > 0 ? (c.spend / grandTotalSpend) * 100 : 0;
                      return (
                        <tr
                          key={c.campaign.id}
                          onClick={() => setActiveCampaignId(c.campaign.id)}
                          className="cursor-pointer border-b border-slate-50 hover:bg-slate-50 transition"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">{c.campaign.name}</td>
                          <td className="px-4 py-3 text-right text-slate-700">{fmt(c.impressions, 0)}</td>
                          <td className="px-4 py-3 text-right text-slate-700">{fmt(c.clicks, 0)}</td>
                          <td className="px-4 py-3 text-right text-slate-700">{fmt(c.ctr, 2)}%</td>
                          <td className="px-4 py-3 text-right font-medium text-slate-900">
                            {fmt(convertAmount(c.spend, currency, fx))}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                                <div className="h-full rounded-full bg-red-400" style={{ width: `${share}%` }} />
                              </div>
                              <span className="w-10 text-right text-xs text-slate-400">{fmt(share, 0)}%</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-50 font-semibold text-slate-900">
                      <td className="px-4 py-3">Разом</td>
                      <td className="px-4 py-3 text-right">
                        {fmt(campaignSummaries.reduce((s, c) => s + c.impressions, 0), 0)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {fmt(campaignSummaries.reduce((s, c) => s + c.clicks, 0), 0)}
                      </td>
                      <td className="px-4 py-3 text-right">—</td>
                      <td className="px-4 py-3 text-right">{fmt(convertAmount(grandTotalSpend, currency, fx))}</td>
                      <td className="px-4 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Campaign tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCampaignId(ALL_CAMPAIGNS)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeCampaignId === ALL_CAMPAIGNS
                    ? 'bg-red-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Усі кампанії
              </button>
              {data.campaigns.map(({ campaign }) => (
                <button
                  key={campaign.id}
                  onClick={() => setActiveCampaignId(campaign.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    activeCampaignId === campaign.id
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {campaign.name}
                  <span className={`ml-2 text-xs ${activeCampaignId === campaign.id ? 'opacity-70' : 'text-slate-400'}`}>
                    {campaign.status}
                  </span>
                </button>
              ))}
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { icon: Eye, label: 'Покази', value: fmt(totals.impressions, 0), sub: null },
                { icon: MousePointerClick, label: 'Кліки', value: fmt(totals.clicks, 0), sub: `CTR ${fmt(avgCtr, 2)}%` },
                { icon: DollarSign, label: 'Витрати', value: `${sym} ${fmt(convertAmount(totals.spend, currency, fx))}`, sub: `${fmt(totals.spend)} zł` },
                { icon: TrendingUp, label: 'Сер. CPC', value: `${sym} ${fmt(convertAmount(avgCpc, currency, fx))}`, sub: `${fmt(avgCpc)} zł` },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
                  {sub && <div className="mt-0.5 text-xs text-slate-400">{sub}</div>}
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.monthly && data.monthly.length > 1 && (
                <div>
                  <h2 className="text-[13px] font-medium tracking-[0.03em] text-slate-500">Динаміка по місяцях</h2>
                  <p className="mt-0.5 text-[12px] text-slate-400">Витрати та кліки по акаунту загалом за кожен місяць.</p>
                  <div className="mt-2 h-[280px] rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <Line
                      data={{
                        labels: monthlyLabels,
                        datasets: [
                          {
                            label: `Витрати (${sym})`,
                            data: data.monthly.map((m) => convertAmount(m.spend, currency, fx)),
                            borderColor: '#ef4444',
                            backgroundColor: '#ef4444',
                            yAxisID: 'y',
                            tension: 0.3,
                          },
                          {
                            label: 'Кліки',
                            data: data.monthly.map((m) => m.clicks),
                            borderColor: '#185FA5',
                            backgroundColor: '#185FA5',
                            yAxisID: 'y1',
                            tension: 0.3,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: 'top', labels: { color: '#888', font: { size: 11 } } } },
                        scales: {
                          x: { grid: { display: false }, ticks: { color: '#888', font: { size: 11 } } },
                          y: {
                            position: 'left',
                            title: { display: true, text: `Витрати (${sym})`, color: '#888', font: { size: 11 } },
                            grid: { color: 'rgba(128,128,128,0.1)' },
                            ticks: { color: '#888' },
                          },
                          y1: {
                            position: 'right',
                            title: { display: true, text: 'Кліки', color: '#888', font: { size: 11 } },
                            grid: { display: false },
                            ticks: { color: '#888' },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-[13px] font-medium tracking-[0.03em] text-slate-500">Витрати vs кліки — ефективність бюджету</h2>
                <p className="mt-0.5 text-[12px] text-slate-400">Кожна точка — одне оголошення. Ідеально: мало витрат (ліворуч) і багато кліків (вгорі).</p>
                <div className="mt-2 h-[280px] rounded-2xl border border-slate-100 bg-slate-50 p-4">
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
                              return `${point.label}: ${sym} ${fmt(Number(ctx.parsed.x))} → ${ctx.parsed.y} кліків`;
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: { display: true, text: `Витрати (${sym})`, color: '#888', font: { size: 11 } },
                          grid: { color: 'rgba(128,128,128,0.1)' },
                          ticks: { color: '#888' },
                        },
                        y: {
                          title: { display: true, text: 'Кліки', color: '#888', font: { size: 11 } },
                          grid: { color: 'rgba(128,128,128,0.1)' },
                          ticks: { color: '#888' },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {(recommendations.best.length > 0 || recommendations.worst.length > 0) && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                    <ThumbsUp className="h-4 w-4" />
                    Топ-3 — масштабувати бюджет
                  </div>
                  <p className="mt-1 text-xs text-emerald-600/70">Найкраще співвідношення CTR до CPC.</p>
                  <div className="mt-3 space-y-2">
                    {recommendations.best.map((r) => (
                      <div key={r.adId} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                        <span className="truncate font-medium text-slate-900">{r.adName}</span>
                        <span className="ml-2 shrink-0 text-xs text-slate-500">
                          CTR {fmt(r.ctr * 100, 2)}% · CPC {fmt(convertAmount(r.cpc, currency, fx))} {sym}
                        </span>
                      </div>
                    ))}
                    {recommendations.best.length === 0 && (
                      <p className="text-xs text-slate-400">Недостатньо даних для оцінки.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-red-700">
                    <ThumbsDown className="h-4 w-4" />
                    Топ-3 — кандидати на паузу
                  </div>
                  <p className="mt-1 text-xs text-red-600/70">Помітні витрати при слабкому CTR/CPC.</p>
                  <div className="mt-3 space-y-2">
                    {recommendations.worst.map((r) => (
                      <div key={r.adId} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
                        <span className="truncate font-medium text-slate-900">{r.adName}</span>
                        <span className="ml-2 shrink-0 text-xs text-slate-500">
                          CTR {fmt(r.ctr * 100, 2)}% · {fmt(convertAmount(r.spend, currency, fx))} {sym}
                        </span>
                      </div>
                    ))}
                    {recommendations.worst.length === 0 && (
                      <p className="text-xs text-slate-400">Явних кандидатів на паузу немає.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* GA4 "Де придбати" conversions per ad */}
            {whereToBuyRows.length > 0 && (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h2 className="text-sm font-semibold text-slate-900">Переходи в «Де придбати» — по сукнях</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Дані з GA4 (через Windsor.ai) по UTM-мітці оголошення. Показує скільки людей, що клікнули на конкретну сукню, дійшли до цілі «Де придбати».
                    {notSetVisits > 0 && ` Ще ${notSetVisits} візит(и) без UTM-мітки (не прив'язані до оголошення).`}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-[11px] uppercase tracking-[0.08em] text-slate-400">
                      <tr>
                        <th className="px-5 py-3 text-left font-medium">Оголошення</th>
                        <th className="px-4 py-3 text-right font-medium">Кліки</th>
                        <th className="px-4 py-3 text-right font-medium">Де придбати</th>
                        <th className="px-4 py-3 text-right font-medium">% конверсії</th>
                      </tr>
                    </thead>
                    <tbody>
                      {whereToBuyRows.map((r) => (
                        <tr key={r.adName} className="border-t border-slate-200 bg-white">
                          <td className="px-5 py-3 font-medium text-slate-800 max-w-[260px] truncate">{r.adName}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{fmt(r.clicks, 0)}</td>
                          <td className="px-4 py-3 text-right font-semibold text-slate-900">{fmt(r.visits, 0)}</td>
                          <td className="px-4 py-3 text-right text-slate-600">{fmt(r.rate, 1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                      <tr>
                        <td className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Разом</td>
                        <td className="px-4 py-3 text-right font-bold text-slate-900">
                          {fmt(whereToBuyRows.reduce((s, r) => s + r.clicks, 0), 0)}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-slate-900">{fmt(whereToBuyTotal, 0)}</td>
                        <td className="px-4 py-3"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Table controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Пошук оголошення..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-red-400"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={hideZero}
                  onChange={(e) => setHideZero(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-red-500 focus:ring-red-400"
                />
                Приховати без активності
              </label>
              <span className="text-xs text-slate-400">{filteredRows.length} оголошень</span>
              <button
                onClick={exportCsv}
                disabled={filteredRows.length === 0}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-red-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download className="h-3.5 w-3.5" />
                Експорт CSV
              </button>
            </div>

            {/* Table */}
            {filteredRows.length > 0 ? (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                      <th
                        onClick={() => toggleSort('adName')}
                        className="cursor-pointer select-none px-4 py-3 hover:text-slate-900 transition"
                      >
                        <span className="inline-flex items-center gap-1">
                          Оголошення
                          <ArrowUpDown className={`h-3 w-3 ${sortKey === 'adName' ? 'text-red-500' : 'text-slate-300'}`} />
                        </span>
                      </th>
                      {activeCampaignId === ALL_CAMPAIGNS && <th className="px-4 py-3">Кампанія</th>}
                      <th className="px-4 py-3">Статус</th>
                      <SortHeader label="Покази" sortKeyName="impressions" />
                      <SortHeader label="Кліки" sortKeyName="clicks" />
                      <SortHeader label="CTR %" sortKeyName="ctr" />
                      <SortHeader label={`Витрати (${sym})`} sortKeyName="spend" />
                      <SortHeader label={`CPC (${sym})`} sortKeyName="cpc" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => (
                      <tr key={`${row.campaignName}-${row.adId}`} className="border-b border-slate-50 hover:bg-slate-50 transition">
                        <td className="px-4 py-3 max-w-[220px]">
                          <div className="font-medium text-slate-900 truncate">{row.adName}</div>
                          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-red-400"
                              style={{ width: `${(row.spend / maxSpend) * 100}%` }}
                            />
                          </div>
                        </td>
                        {activeCampaignId === ALL_CAMPAIGNS && (
                          <td className="px-4 py-3 max-w-[160px] truncate text-xs text-slate-400">{row.campaignName}</td>
                        )}
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            row.status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-700">{fmt(row.impressions, 0)}</td>
                        <td className="px-4 py-3 text-right text-slate-700">{fmt(row.clicks, 0)}</td>
                        <td className="px-4 py-3 text-right text-slate-700">{fmt(row.ctr * 100, 2)}%</td>
                        <td className="px-4 py-3 text-right font-medium text-slate-900">
                          {fmt(convertAmount(row.spend, currency, fx))}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-700">
                          {row.cpc > 0 ? fmt(convertAmount(row.cpc, currency, fx)) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-semibold text-slate-900">
                      <td className="px-4 py-3" colSpan={activeCampaignId === ALL_CAMPAIGNS ? 3 : 2}>
                        Разом ({filteredRows.length})
                      </td>
                      <td className="px-4 py-3 text-right">{fmt(totals.impressions, 0)}</td>
                      <td className="px-4 py-3 text-right">{fmt(totals.clicks, 0)}</td>
                      <td className="px-4 py-3 text-right">{fmt(avgCtr, 2)}%</td>
                      <td className="px-4 py-3 text-right">{fmt(convertAmount(totals.spend, currency, fx))}</td>
                      <td className="px-4 py-3 text-right">{fmt(convertAmount(avgCpc, currency, fx))}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 py-12 text-center text-sm text-slate-400">
                Немає даних за вибраними фільтрами
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
