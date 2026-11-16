'use client';

import React, { useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useServiceLead } from '@/components/ServiceLeadProvider';
import { useLocale, useT } from '@/i18n/LocaleProvider';
import type { Locale } from '@/lib/i18n';
import { relatedCaseCards, type CaseIcon, type CaseStudy, type FeedPinSpec } from '@/data/caseStudies';
import CaseCard from './CaseCard';
import CountUp from './CountUp';
import { useReveal } from './useReveal';

/**
 * Детальна сторінка кейсу. Структура — з блоку «кейс» у Cases.dc.html
 * (герой → задача → рішення → результат → відгук), стилі секцій —
 * як на сторінці послуги, щоб сайт читався однаково.
 * Лід-форма додається самою сторінкою.
 */

const label = 'text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm';

/** Фірмовий помаранчевий сайту (як шапка й кнопки). Власних градієнтів не вигадуємо. */
const PINTEREST_BG = '#FF5B2B';

/** Контурні іконки кроків і висновків (24×24, stroke). */
const ICONS: Record<CaseIcon, string> = {
  pin: 'M6 3h12v18H6zM6 16l3.5-3.5 3 3 2-2L18 17M10 8.5a1.2 1.2 0 1 0 0-.01',
  dress: 'M9.5 3h5l-1 4.5L18 21H6l4.5-13.5z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20.5 20.5l-4.5-4.5',
  store: 'M4 10h16v10H4zM3 10l2-6h14l2 6M10 20v-5h4v5',
  test: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9',
  tune: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M14 4v4M8 10v4M16 16v4',
  stable: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5',
  scale: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  click: 'M9 4l9 9-4 1 3 5-2 1-3-5-3 3z',
  video: 'M4 5h16v14H4zM10 9l5 3-5 3z',
  data: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  settings: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
  key: 'M3 12V4h8l10 10-8 8zM7.5 8.5a1 1 0 1 0 0-.01',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  photo: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9a1 1 0 1 0 0-.01',
  brush: 'M20 4l-9 9M11 13c-2-.5-4 .5-4.5 2.5C6 18 4 19 3 19c2 2 6 2 8-.5 1.2-1.5 1-3.5 0-5.5z',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z',
  handoff: 'M8 7a3 3 0 1 0 0-.01M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 9h6M18 6l3 3-3 3',
};

/** Стиль появи елемента: зсув і прозорість, із затримкою для черговості. */
function revealStyle(state: 'static' | 'hidden' | 'shown', delay: number): React.CSSProperties {
  if (state === 'static') return {};
  return {
    opacity: state === 'shown' ? 1 : 0,
    transform: state === 'shown' ? 'none' : 'translateY(14px)',
    transitionDelay: state === 'shown' ? `${delay}ms` : '0ms',
  };
}

function StepIcon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

/** Пін у стрічці Pinterest: картинка із заокругленням, під нею підпис (необовʼязково). */
function FeedPin({
  src,
  ratio,
  position = 'top',
  title,
  sponsored,
}: FeedPinSpec) {
  return (
    <div className="flex flex-col">
      <div
        className={`w-full rounded-[1rem] bg-[#2C2C2C] bg-cover bg-no-repeat shadow-[0_18px_40px_rgba(0,0,0,0.4)] ${
          position === 'top' ? 'bg-top' : position === 'right' ? 'bg-[right_top]' : 'bg-center'
        }`}
        style={{ aspectRatio: ratio, backgroundImage: `url("${src}")` }}
      />
      {title ? (
        <div className="px-1 pt-2">
          <div className="truncate text-[0.8125rem] font-semibold text-white">{title}</div>
          {sponsored ? (
            <div className="truncate text-[0.6875rem] text-[#8A8A8A]">{sponsored}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Мовні теги для форматування чисел: 17 000 / 17,000; 4,1x / 4.1x. */
const NUMBER_LOCALE: Record<Locale, string> = { uk: 'uk-UA', en: 'en-GB', sk: 'sk-SK' };

/** Значення на графіку: ціле з розділювачем тисяч або «4,1x» — у форматі мови сторінки. */
function formatValue(value: number, format: 'int' | 'x', locale: Locale) {
  const tag = NUMBER_LOCALE[locale];
  return format === 'x'
    ? `${value.toLocaleString(tag, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}x`
    : value.toLocaleString(tag);
}

/** Інфографіка першого екрана, коли фото креативів немає: сума і розподіл за частинами. */
function SplitVisual({
  total,
  label: caption,
  parts,
  alt,
  pin,
  locale,
}: {
  locale: Locale;
  total: string;
  label: string;
  parts: [string, number, string][];
  alt: string;
  pin?: FeedPinSpec;
}) {
  const sum = parts.reduce((acc, [, v]) => acc + v, 0);
  const colors = ['#FF5B2B', '#FDE3D8'];
  return (
    <figure role="img" aria-label={alt} className="m-0 mx-auto w-full max-w-[26rem]">
      {/* Є фото — пін праворуч, картка з цифрами лягає на його низ, як дві картки в стрічці */}
      {pin ? (
        <div className="ml-auto w-[64%]">
          <FeedPin {...pin} />
        </div>
      ) : null}
      <div
        className={`relative border border-[#2C2C2C] bg-[#1F1F1F] ${
          pin ? '-mt-36 w-[80%] px-5 py-6 shadow-[0_24px_50px_rgba(0,0,0,0.5)] md:-mt-48 md:px-7 md:py-7' : 'px-6 py-7 md:px-9 md:py-10'
        }`}
      >
        <div className={`font-bold leading-none text-white ${pin ? 'text-[2.75rem] md:text-[3.25rem]' : 'text-[3.5rem] md:text-[4.5rem]'}`}>{total}</div>
        <div className="mt-3 text-[0.9375rem] text-[#BDBDBD] md:text-base">{caption}</div>
        <div className={`flex h-3 w-full overflow-hidden rounded-full bg-[#2C2C2C] ${pin ? 'mt-6' : 'mt-8'}`}>
          {parts.map(([name, value], i) => (
            <span key={name} style={{ width: `${(value / sum) * 100}%`, background: colors[i % colors.length] }} />
          ))}
        </div>
        <dl className={`m-0 flex flex-col ${pin ? 'mt-4' : 'mt-7'}`}>
          {parts.map(([name, value, note], i) => (
            <div key={name} className={`flex items-start gap-3.5 border-t border-[#2C2C2C] ${pin ? 'py-3' : 'py-4'}`}>
              <span className="mt-1.5 h-3 w-3 flex-none rounded-full" style={{ background: colors[i % colors.length] }} aria-hidden />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <dt className="text-base font-semibold text-white md:text-lg">{name}</dt>
                <dd className="m-0 text-[0.875rem] text-[#A8A8A8]">{note}</dd>
              </div>
              <span className="text-[1.375rem] font-bold leading-none text-white md:text-[1.625rem]">{value.toLocaleString(NUMBER_LOCALE[locale])}</span>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}

/** Картка-дашборд першого екрана: головна цифра, крива зростання і показники під нею. */
function StatsVisual({
  total,
  label: caption,
  badge,
  seriesLabel,
  series,
  approx,
  rows,
  alt,
  locale,
}: Extract<CaseStudy['heroVisual'], { type: 'stats' }> & { alt: string; locale: Locale }) {
  const W = 320;
  const H = 110;
  const pad = 8;
  const max = Math.max(...series.map(([, v]) => v));
  const pts = series.map(([, v], i) => [
    pad + (i * (W - pad * 2)) / (series.length - 1),
    // Вісь від нуля, як у статистиці клієнта: подвоєння видно чесно, без обрізаної шкали
    pad + (1 - v / max) * (H - pad * 2),
  ]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`;
  const fmt = (v: number) => `${approx ? '≈\u00a0' : ''}${v.toLocaleString(NUMBER_LOCALE[locale])}`;
  const [first, last] = [series[0], series[series.length - 1]];
  return (
    <figure role="img" aria-label={alt} className="m-0 mx-auto w-full max-w-[26rem]">
      <div className="border border-[#2C2C2C] bg-[#1F1F1F] px-6 py-7 shadow-[0_24px_50px_rgba(0,0,0,0.45)] md:px-8 md:py-9">
        <div className="text-[3.25rem] font-bold leading-none text-white md:text-[4.25rem]">{total}</div>
        <div className="mt-3 text-[0.9375rem] text-[#BDBDBD] md:text-base">{caption}</div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#8A8A8A]">{seriesLabel}</span>
          <span className="rounded-full px-3 py-1 text-[0.9375rem] font-bold leading-none text-white" style={{ background: PINTEREST_BG }}>
            {badge}
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 block h-auto w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="stats-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PINTEREST_BG} stopOpacity="0.35" />
              <stop offset="100%" stopColor={PINTEREST_BG} stopOpacity="0" />
            </linearGradient>
            <style>{`@keyframes stats-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}@keyframes stats-fade{from{opacity:0}to{opacity:1}}
.stats-line{stroke-dasharray:1;animation:stats-draw 1.4s cubic-bezier(.22,1,.36,1) .2s both}
.stats-fade{animation:stats-fade .8s ease-out .9s both}
@media (prefers-reduced-motion:reduce){.stats-line,.stats-fade{animation:none}}`}</style>
          </defs>
          <path d={area} fill="url(#stats-area)" className="stats-fade" />
          <path d={line} pathLength={1} fill="none" stroke={PINTEREST_BG} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stats-line" />
          {pts.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === pts.length - 1 ? 5 : 2.5}
              fill={i === pts.length - 1 ? '#FFFFFF' : PINTEREST_BG}
              stroke={i === pts.length - 1 ? PINTEREST_BG : 'none'}
              strokeWidth="3"
              className="stats-fade"
            />
          ))}
        </svg>
        <div className="mt-3 flex justify-between text-[0.8125rem] text-[#8A8A8A]">
          <span>
            {first[0]} · <span className="font-semibold text-[#CFCFCF]">{fmt(first[1])}</span>
          </span>
          <span>
            {last[0]} · <span className="font-semibold text-white">{fmt(last[1])}</span>
          </span>
        </div>

        <dl className="m-0 mt-7 grid grid-cols-3 border-t border-[#2C2C2C] pt-5">
          {rows.map(([name, value], i) => (
            <div key={name} className={`flex flex-col gap-1 ${i ? 'border-l border-[#2C2C2C] pl-3 md:pl-4' : ''}`}>
              <dd className="m-0 text-[1.25rem] font-bold leading-none text-white md:text-[1.5rem]">{value}</dd>
              <dt className="text-[0.75rem] leading-[1.3] text-[#A8A8A8] md:text-[0.8125rem]">{name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </figure>
  );
}

/**
 * leadForm — форма заявки від сторінки. Стоїть на місці «Висновку», якщо його немає,
 * інакше одразу після FAQ; в обох випадках — вище «Схожих кейсів».
 */
export default function CaseStudyView({ study, leadForm }: { study: CaseStudy; leadForm?: React.ReactNode }) {
  const { openLead } = useServiceLead();
  const t = useT();
  const locale = useLocale();
  // Анімації появи: цифри, воронка, графік. Без JS і з reduced-motion усе видно одразу.
  // Цифри стартують, щойно смуга виглянула з-під краю екрана, — щоб не стояли на «0»
  const [metricsRef, metricsState] = useReveal<HTMLDivElement>(0.01, 1);
  const [funnelRef, funnelState] = useReveal<HTMLOListElement>(0.15);
  const [chartRef, chartState] = useReveal<HTMLDivElement>(0.2);
  const [open, setOpen] = useState(0);
  const ask = () => openLead(study.channel, study.leadCategory ?? 'Pinterest');
  /** Прокрутка до лід-форми внизу сторінки — без переходу на інші сторінки. */
  const toLead = () => document.getElementById('lead')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const { chart } = study.results;
  const chartMax = Math.max(...chart.months.map(([, v]) => v));
  const { pins = [], pinsCaption, pinsNote, steps, cards } = study.solution;
  const hero = study.heroVisual;

  // Кроки — інфографіка без даних клієнта
  const stepsBlock = (
    <div className="mt-12 md:mt-16">
      <h3 className="m-0 text-xl font-bold text-white md:text-[1.625rem]">{steps.title}</h3>
      {steps.text ? (
        <p className="m-0 mt-4 max-w-[46rem] text-[0.9375rem] leading-[1.7] text-[#BDBDBD] md:text-[1.0625rem]">
          {steps.text}
        </p>
      ) : null}
      {steps.layout === 'grid' ? (
        <ol ref={funnelRef} className="m-0 mt-9 grid list-none gap-3 p-0 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-4">
          {steps.items.map(([title, text, icon], i, all) => {
            const last = i === all.length - 1;
            return (
              <li
                key={title}
                className={`flex flex-col gap-5 rounded-md px-5 py-6 transition-[opacity,transform] duration-500 ease-out md:px-6 md:py-8 ${
                  last ? 'text-white' : 'border border-[#333333] bg-[#1F1F1F] text-white'
                }`}
                style={{ ...(last ? { background: PINTEREST_BG } : {}), ...revealStyle(funnelState, i * 90) }}
              >
                <span className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${
                      last ? 'bg-white text-brand-orange' : 'bg-[#141414] text-brand-orange'
                    }`}
                  >
                    <StepIcon d={ICONS[icon]} />
                  </span>
                  <span className={`text-[0.875rem] font-bold tabular-nums ${last ? 'text-white/70' : 'text-[#5C5C5C]'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="text-[1.0625rem] font-bold leading-[1.25] md:text-xl">{title}</span>
                  <span className={`text-[0.875rem] leading-[1.55] ${last ? 'text-white/85' : 'text-[#A8A8A8]'}`}>{text}</span>
                  {last && steps.badge ? (
                    <span className="mt-1.5 self-start bg-white/20 px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em]">
                      {steps.badge}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
      <ol ref={funnelRef} className="m-0 mt-9 flex list-none flex-col items-stretch gap-3 p-0 md:mt-12 md:flex-row md:items-stretch md:gap-0">
        {steps.items.map(([title, text, icon], i, all) => {
          const last = i === all.length - 1;
          return (
            <React.Fragment key={title}>
              <li
                className={`relative flex flex-1 items-center gap-4 rounded-md px-5 py-6 transition-[opacity,transform] duration-500 ease-out md:flex-col md:items-start md:gap-5 md:px-6 md:py-8 ${
                  last ? 'text-white' : 'border border-[#333333] bg-[#1F1F1F] text-white'
                }`}
                style={{
                  ...(last ? { background: PINTEREST_BG } : {}),
                  ...revealStyle(funnelState, i * 2 * 140),
                }}
              >
                <span
                  className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${
                    last ? 'bg-white text-brand-orange' : 'bg-[#141414] text-brand-orange'
                  }`}
                >
                  <StepIcon d={ICONS[icon]} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[1.0625rem] font-bold leading-[1.25] md:text-xl">{title}</span>
                  <span className={`text-[0.875rem] leading-[1.5] ${last ? 'text-white/85' : 'text-[#A8A8A8]'}`}>{text}</span>
                  {last && steps.badge ? (
                    <span className="mt-1.5 self-start bg-white/20 px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em]">
                      {steps.badge}
                    </span>
                  ) : null}
                </span>
              </li>
              {!last ? (
                <li
                  aria-hidden
                  className="flex flex-none items-center justify-center text-brand-orange transition-[opacity,transform] duration-500 ease-out md:w-12"
                  style={revealStyle(funnelState, (i * 2 + 1) * 140)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="rotate-90 md:rotate-0">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </li>
              ) : null}
            </React.Fragment>
          );
        })}
      </ol>
      )}
    </div>
  );
  // Картки рішення — окремі блоки з повітрям
  const cardsBlock = cards.length ? (
    <div className={`grid gap-5 md:grid-cols-2 md:gap-8 ${study.solution.cardsFirst ? 'mt-12 md:mt-16' : 'mt-16 md:mt-24'}`}>
      {cards.map(([title, text]) => (
        <div key={title} className="flex flex-col border border-[#2C2C2C] bg-[#1F1F1F] px-6 py-8 md:px-10 md:py-10">
          <h3 className="m-0 text-xl font-bold text-white md:text-[1.5rem]">{title}</h3>
          <p className="m-0 mt-4 text-[0.9375rem] leading-[1.7] text-[#BDBDBD] md:text-[1.0625rem]">{text}</p>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <>
      {/* Герой */}
      <section className="bg-[#141414]">
        <div className="shell pb-14 pt-8 md:pb-24 md:pt-10">
          <nav
            aria-label={t.casePage.breadcrumbs}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] text-[#8A8A8A] md:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-white">
              {t.nav.home}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/#cases" className="transition-colors hover:text-white">
              {t.nav.cases}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">{study.breadcrumb}</span>
          </nav>

          {/* Перший екран лише головне: що за кейс, заголовок і дія. Подробиці — нижче */}
          <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[minmax(0,1fr)_26rem] md:items-center md:gap-20">
            <div className="flex flex-col">
              {/* Логотип клієнта для темного фону; немає — назва текстом */}
              {study.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- next/image не працює на статичному експорті
                <img
                  src={study.logo.src}
                  alt={study.client}
                  width={study.logo.width}
                  height={study.logo.height}
                  className="mb-6 h-auto w-[13.5rem] md:mb-8 md:w-[17rem]"
                />
              ) : (
                <span className={`${label} mb-5 md:mb-6`}>{study.client}</span>
              )}
              <div className="flex flex-wrap items-center gap-2.5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/30 px-3 py-1 text-[0.75rem] text-[#CFCFCF] md:text-[0.8125rem]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="fs-56 mob-27 mt-5 max-w-[46rem] font-bold text-white md:mt-6">{study.h1}</h1>
              <p className="mob-16 m-0 mt-6 max-w-[38rem] text-base leading-[1.6] text-[#BDBDBD] md:mt-7 md:text-lg">
                {study.lead}
              </p>
              <div className="mt-9 flex flex-col gap-3 md:mt-11 md:flex-row md:gap-4">
                <AnimatedButton variant="primary" onClick={ask}>
                  {t.casePage.discuss}
                </AnimatedButton>
                <AnimatedButton variant="light" href={`/cases/${study.slug}#results`}>
                  {t.casePage.toResults}
                </AnimatedButton>
              </div>
            </div>

            {/* Обкладинка: колаж пінів, як у стрічці Pinterest, або інфографіка з цифрами */}
            {hero.type === 'pins' ? (
              <figure className="m-0 mx-auto w-full max-w-[26rem]">
                <div role="img" aria-label={study.cover.alt} className="grid grid-cols-3 items-start gap-2.5 md:gap-3">
                  {hero.columns.map((col, ci) => (
                    <div key={ci} className={`flex flex-col gap-2.5 md:gap-3 ${col.offset}`}>
                      {col.pins.map((pin) => (
                        <FeedPin key={pin.src} {...pin} />
                      ))}
                    </div>
                  ))}
                </div>
              </figure>
            ) : hero.type === 'stats' ? (
              <StatsVisual {...hero} alt={study.cover.alt} locale={locale} />
            ) : (
              <SplitVisual locale={locale} total={hero.total} label={hero.label} parts={hero.parts} alt={study.cover.alt} pin={hero.pin} />
            )}
          </div>
        </div>

        {/* Головні цифри */}
        <div style={{ background: PINTEREST_BG }}>
          <div ref={metricsRef} className={`shell grid ${study.metrics.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'md:grid-cols-3'}`}>
            {study.metrics.map(([value, text], i) => (
              <div
                key={value}
                className={
                  study.metrics.length === 4
                    ? `flex flex-col gap-2 py-6 md:py-11 ${i % 2 ? 'border-l border-white/20 pl-5' : ''} ${i > 1 ? 'border-t border-white/20 md:border-t-0' : ''} ${i ? 'md:border-l md:pl-8' : 'md:pl-0'} ${i === 2 ? 'md:border-l' : ''}`
                    : `flex flex-col gap-2 py-7 md:py-11 md:pl-10 ${i ? 'border-t border-white/20 md:border-l md:border-t-0' : 'md:pl-0'}`
                }
              >
                <span
                  className={`font-bold leading-none text-white ${
                    study.metrics.length === 4 ? 'text-[2rem] md:text-[3rem]' : 'text-[2.75rem] md:text-[3.75rem]'
                  }`}
                >
                  <CountUp value={value} state={metricsState} locale={locale} />
                </span>
                <span className="text-[0.9375rem] leading-[1.4] text-white/85 md:text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Коротко: відповідь, яку читач і AI-пошук бачать першою, плюс паспорт проєкту */}
      <section className="bg-white">
        <div className="shell pt-14 md:pt-24">
          <div className="grid gap-8 bg-[#F4F4F4] px-6 py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-16 md:px-12 md:py-12">
            <div className={label}>{t.casePage.tldr}</div>
            <div className="flex flex-col gap-9">
              <p className="m-0 max-w-[48rem] text-[1.0625rem] leading-[1.6] text-[#222222] md:text-[1.375rem] md:leading-[1.55]">
                {study.summary}
              </p>
              <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#DCDCDC] pt-7 md:grid-cols-4 md:gap-x-8">
                {study.facts.map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <dt className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#8A8A8A]">{key}</dt>
                    <dd className="m-0 text-[0.9375rem] font-semibold leading-[1.4] text-[#222222] md:text-base">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Задача */}
      <section className="bg-white">
        <div className="shell py-16 md:grid md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-24 md:py-28">
          <div>
            <h2 className="fs-44 mob-26 m-0 font-bold text-[#222222]">{study.task.title}</h2>
          </div>
          <div className="mt-7 flex max-w-[44rem] flex-col gap-6 md:mt-2">
            {study.task.paragraphs.map((p) => (
              <p key={p} className="m-0 text-base leading-[1.7] text-[#444444] md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Рішення: кроки (воронка чи етапи), картки, креативи — порядок задає кейс */}
      <section className="bg-[#141414]">
        <div className="shell py-16 md:py-28">
          <h2 className="fs-44 mob-26 m-0 max-w-[50rem] font-bold text-white">{study.solution.title}</h2>

          {study.solution.cardsFirst ? (
            <>
              {cardsBlock}
              {stepsBlock}
            </>
          ) : (
            <>
              {stepsBlock}
              {cardsBlock}
            </>
          )}

          {/* Креативи — повна ширина, щоб піни читались як стрічка Pinterest */}
          {pins.length ? (
            <figure className="m-0 mt-16 md:mt-24">
              <div className="flex items-end justify-between gap-6">
                <h3 className="m-0 text-xl font-bold text-white md:text-[1.5rem]">{t.casePage.creatives}</h3>
                {pinsNote ? <span className="hidden text-[0.875rem] text-[#8A8A8A] md:block">{pinsNote}</span> : null}
              </div>
              {/* Колонок стільки, скільки пінів (до 5): три піни не розтягуємо на всю ширину */}
              <div
                className="mt-7 grid grid-cols-2 items-start gap-3 md:mt-9 md:gap-5 md:[grid-template-columns:repeat(var(--pins),minmax(0,1fr))]"
                style={{ '--pins': Math.min(pins.length, 5), maxWidth: pins.length < 5 ? `${pins.length * 15}rem` : undefined } as React.CSSProperties}
              >
                {pins.map((pin, i) => (
                  <div key={pin.src} className={i === pins.length - 1 && pins.length % 2 ? 'hidden md:block' : ''}>
                    <div
                      role="img"
                      aria-label={pin.alt}
                      className="w-full rounded-[1rem] bg-[#2C2C2C] bg-cover bg-center bg-no-repeat"
                      style={{ aspectRatio: pin.ratio ?? '2/3', backgroundImage: `url("${pin.src}")` }}
                    />
                  </div>
                ))}
              </div>
              {pinsCaption ? <figcaption className="mt-4 text-[0.875rem] text-[#8A8A8A]">{pinsCaption}</figcaption> : null}
            </figure>
          ) : null}
        </div>
      </section>

      {/* Типи кампаній — окрема світла секція, щоб темний блок не був суцільним */}
      {study.campaigns ? (
        <section className="bg-[#F4F4F4]">
          <div className="shell py-16 md:py-28">
            <h2 className="fs-44 mob-26 m-0 max-w-[44rem] font-bold text-[#222222]">{study.campaigns.title}</h2>
            <ul className="m-0 mt-10 grid list-none gap-5 p-0 md:mt-14 md:grid-cols-3 md:gap-8">
              {study.campaigns.items.map(([name, text], i) => (
                <li
                  key={name}
                  className="flex flex-col gap-4 bg-white px-6 py-8 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:px-8 md:py-10"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-md text-[0.875rem] font-bold text-white"
                    style={{ background: PINTEREST_BG }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="m-0 mt-2 text-[1.25rem] font-bold text-[#222222] md:text-[1.5rem]">{name}</h3>
                  <p className="m-0 text-[0.9375rem] leading-[1.65] text-[#555555] md:text-base">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Результати */}
      <section id="results" className="scroll-mt-16 bg-[#EEEEEE] md:scroll-mt-[5.125rem]">
        <div className="shell grid gap-12 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-20 md:py-28">
          <div>
            <h2 className="fs-44 mob-26 m-0 font-bold text-[#222222]">{study.results.title}</h2>
            <ul className="m-0 mt-7 flex list-none flex-col p-0 md:mt-10">
              {study.results.items.map(([head, tail]) => (
                <li key={head} className="flex gap-4 border-t border-[#D5D5D5] py-4 md:py-5">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF5B2B"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-none"
                    aria-hidden
                  >
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  <span className="text-base leading-[1.5] text-[#444444] md:text-lg">
                    <strong className="font-semibold text-[#222222]">{head}</strong> {tail}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex md:mt-10">
              <AnimatedButton variant="primary" onClick={toLead}>
                {t.casePage.wantResult}
              </AnimatedButton>
            </div>
          </div>

          {/* Графік результату. Осі Y немає; цифри — на всіх стовпчиках або лише на крайніх
              (як задано в кейсі). Під графіком — та сама інформація таблицею для пошуковиків. */}
          <figure className="m-0 bg-white px-6 py-7 md:px-10 md:py-10">
            {study.results.screenshot ? (
              // eslint-disable-next-line @next/next/no-img-element -- next/image не працює на статичному експорті
              <img
                src={study.results.screenshot.src}
                alt={study.results.screenshot.alt}
                width={study.results.screenshot.width}
                height={study.results.screenshot.height}
                loading="lazy"
                className="block h-auto w-full"
              />
            ) : (
            <div role="img" aria-label={chart.alt}>
              <div className="flex items-start justify-between gap-4">
                <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A]">{chart.label}</span>
                <span
                  className="flex-none rounded-full px-3.5 py-1.5 text-[1.125rem] font-bold leading-none text-white md:text-[1.375rem]"
                  style={{ background: PINTEREST_BG }}
                >
                  {chart.growth}
                </span>
              </div>
              <div ref={chartRef} className="mt-8 flex h-[16rem] items-end gap-2.5 border-b border-[#D5D5D5] md:h-[20rem] md:gap-4">
                {chart.months.map(([month, value], i, all) => {
                  const first = i === 0;
                  const last = i === all.length - 1;
                  const showValue = chart.labels === 'all' || first || last;
                  return (
                    <div key={month} className="flex h-full flex-1 flex-col justify-end">
                      {showValue ? (
                        <span
                          className={`mb-2 whitespace-nowrap text-[1.0625rem] font-bold leading-none transition-opacity duration-500 md:text-[1.5rem] ${
                            last ? 'text-brand-orange' : 'text-[#8A8A8A]'
                          }`}
                          style={{
                            opacity: chartState === 'hidden' ? 0 : 1,
                            transitionDelay: chartState === 'shown' ? `${i * 110 + 700}ms` : '0ms',
                          }}
                        >
                          {(first && chart.approxFirst) || chart.approxAll ? '≈\u00a0' : ''}
                          {formatValue(value, chart.format, locale)}
                        </span>
                      ) : null}
                      <span
                        className="block w-full rounded-t-md transition-[height] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]"
                        style={{
                          height: chartState === 'hidden' ? '0%' : `${(value / chartMax) * 80}%`,
                          transitionDelay: chartState === 'shown' ? `${i * 110}ms` : '0ms',
                          background: last ? PINTEREST_BG : first ? '#D9D9D9' : '#FDE3D8',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex gap-2.5 md:gap-4">
                {chart.months.map(([month, , short]) => (
                  <span key={month} className="flex-1 text-center text-[0.75rem] leading-[1.3] text-[#555555] md:text-[0.875rem]">
                    <span className="md:hidden">{short}</span>
                    <span className="hidden md:inline">{month}</span>
                  </span>
                ))}
              </div>
            </div>
            )}
            {/* Таблиця-дубль графіка для пошуковиків і скрінрідерів. sr-only — на обгортці:
                сама <table> ігнорує ширину 1px і розтягувала сторінку на телефоні */}
            <div className="sr-only">
              <table>
                <caption>{chart.alt}</caption>
                <thead>
                  <tr>
                    <th scope="col">{chart.table[0]}</th>
                    <th scope="col">{chart.table[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {chart.months.map(([month, value], i) => (
                    <tr key={month}>
                      <th scope="row">{month}</th>
                      <td>
                        {(i === 0 && chart.approxFirst) || chart.approxAll ? '≈ ' : ''}
                        {formatValue(value, chart.format, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-6 text-[0.9375rem] font-semibold text-[#222222]">
              {study.results.screenshot?.caption ?? chart.alt}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Що ми з'ясували */}
      <section className="bg-white">
        <div className="shell py-16 md:py-28">
          <div className="md:grid md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-24">
            <div className="md:sticky md:top-[7.625rem]">
              <h2 className="fs-44 mob-26 m-0 font-bold text-[#222222]">{study.insights.title}</h2>
              <p className="m-0 mt-5 max-w-[24rem] text-base leading-[1.65] text-[#555555] md:text-lg">
                {study.insights.intro}
              </p>
            </div>
            <ol className="m-0 mt-10 flex list-none flex-col p-0 md:mt-0">
              {study.insights.items.map(([title, text, icon]) => (
                <li
                  key={title}
                  className="group grid grid-cols-[3.25rem_minmax(0,1fr)] gap-5 border-t border-[#E4E4E4] py-8 last:border-b md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-8 md:py-10"
                >
                  <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-md bg-[#FDE3D8] text-brand-orange transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white md:h-[4.5rem] md:w-[4.5rem]">
                    <StepIcon d={ICONS[icon]} />
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="m-0 text-[1.25rem] font-bold leading-[1.25] text-[#222222] md:text-[1.625rem]">{title}</h3>
                    <p className="m-0 max-w-[40rem] text-[0.9375rem] leading-[1.7] text-[#555555] md:text-[1.0625rem]">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {study.quote ? (
            <blockquote className="m-0 mt-10 border-l-2 border-brand-orange pl-6 md:mt-16 md:pl-10">
              <p className="m-0 text-[1.375rem] font-medium leading-[1.35] text-[#222222] md:text-[2rem]">
                «{study.quote.text}»
              </p>
              <footer className="mt-5 text-[0.9375rem] text-[#555555]">
                <strong className="font-semibold text-[#222222]">{study.quote.author}</strong>,{' '}
                {study.quote.role}, {study.client}
              </footer>
            </blockquote>
          ) : null}
        </div>
      </section>

      {/* Висновок */}
      {study.conclusion ? (
      <section className="bg-[#141414]">
        <div className="shell grid gap-8 py-16 md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-24 md:py-28">
          <div>
            <h2 className="fs-44 mob-26 m-0 font-bold text-white">{study.conclusion.title}</h2>
          </div>
          <div className="flex flex-col items-start gap-8">
            <p className="m-0 text-lg leading-[1.6] text-[#DADADA] md:text-[1.375rem]">{study.conclusion.text}</p>
            <AnimatedButton variant="primary" onClick={toLead}>
              {study.conclusion.ctaLabel}
            </AnimatedButton>
          </div>
        </div>
      </section>
      ) : (
        leadForm
      )}

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 bg-[#EEEEEE] md:scroll-mt-[5.125rem]">
        <div className="shell py-16 md:grid md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-20 md:py-28">
          <div className="md:sticky md:top-[7.625rem]">
            <div className={label}>{t.casePage.faq}</div>
            <h2 className="fs-44 mob-26 mt-4 font-bold text-[#222222]">{study.faqTitle}</h2>
          </div>
          <div className="mt-9 flex flex-col gap-3 md:mt-0">
            {study.faq.map(([question, answer], i) => {
              const isOpen = open === i;
              return (
                <div key={question} className="overflow-hidden rounded-md bg-white">
                  <h3 className="m-0 font-normal">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="grid w-full grid-cols-[2rem_minmax(0,1fr)_2.75rem] items-center gap-3 px-5 py-5 text-left md:gap-4 md:py-[1.375rem] md:pl-7 md:pr-6"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDE3D8] text-[0.8125rem] font-bold text-brand-orange">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base font-semibold leading-[1.35] text-[#222222] md:text-[1.1875rem]">
                        {question}
                      </span>
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors duration-300 ${
                          isOpen ? 'bg-brand-orange text-white' : 'bg-[#F2F2F2] text-[#222222]'
                        }`}
                        aria-hidden
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          className="transition-transform duration-[350ms] ease-[cubic-bezier(.65,0,.25,1)]"
                          style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  {/* Відповідь лишається в DOM і закрита — так її бачать пошуковики */}
                  <div
                    className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.65,0,.25,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="m-0 px-5 pb-6 text-[0.9375rem] leading-[1.65] text-[#555555] md:pl-[4.5rem] md:pr-[5.75rem] md:text-base">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {study.conclusion ? leadForm : null}

      {/* Схожі кейси — ті самі картки, що на головній; ведуть далі по сайту перед формою */}
      <section className="overflow-hidden bg-white">
        <div className="shell pt-16 md:pt-28">
          <div className="flex items-end justify-between gap-6">
            <h2 className="fs-44 mob-26 m-0 font-bold text-[#222222]">{t.casePage.related}</h2>
            <Link
              href="/#cases"
              className="hidden flex-none items-center gap-2 text-[0.9375rem] font-semibold text-[#222222] transition-colors hover:text-brand-orange md:flex"
            >
              {t.casePage.allCases} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
        {/* На телефоні — стрічка з прокруткою, як на головній; на десктопі три картки в ряд */}
        <div className="shell pb-16 md:pb-28">
          <div className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-12 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {relatedCaseCards(study.slug).map((item) => (
              <CaseCard key={item.id} item={item} className="snap-start" />
            ))}
          </div>
          <Link
            href="/#cases"
            className="mt-6 flex items-center gap-2 text-[0.9375rem] font-semibold text-[#222222] md:hidden"
          >
            {t.casePage.allCases} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
