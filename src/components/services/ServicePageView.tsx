'use client';

import React, { useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useServiceLead } from '@/components/ServiceLeadProvider';
import { useRouter } from 'next/navigation';
import { scrollToLead } from '@/lib/leadAnchor';
import { fill, useT } from '@/i18n/LocaleProvider';
import { platformGradient } from '@/data/services';
import { SERVICE_PAGE_GRAPHICS, type ServicePage, type ServicePageExtraSection } from '@/data/servicePages';

/**
 * Сторінка окремої послуги за прототипом ServicePage.dc.html:
 * крихти, темний герой із картою фактів, «Коротко», «Для кого»,
 * «Що входить», етапи, порівняння, вартість, експерт, FAQ і пов'язані послуги.
 *
 * Текст приходить готовий мовою сторінки з `src/data/servicePages`,
 * підписи секцій — зі словника, іконки й логотипи — з `servicePages/icons`.
 * Лід-форма додається самою сторінкою.
 */

/** Коротка мітка над заголовком секції — як у сусідніх блоках. */
const LABEL = 'text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm';

/** Контурна іконка в стилі решти сайту. */
function Icon({ d, size = 22, className = '' }: { d: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

/** Тон секції: світлий, сірий чи темний — від нього залежать картки й текст. */
type ExtraTone = 'light' | 'grey' | 'dark';

const TONES: Record<
  ExtraTone,
  { section: string; card: string; title: string; text: string; line: string; badge: string }
> = {
  light: {
    section: 'bg-white',
    card: 'bg-[#F4F4F4]',
    title: 'text-[#222222]',
    text: 'text-[#555555]',
    line: 'border-[#E4E4E4]',
    badge: 'bg-[#FDE3D8] text-brand-orange',
  },
  grey: {
    section: 'bg-[#F4F4F4]',
    card: 'bg-white',
    title: 'text-[#222222]',
    text: 'text-[#555555]',
    line: 'border-[#DCDCDC]',
    badge: 'bg-white text-brand-orange',
  },
  dark: {
    section: 'bg-[#141414]',
    card: 'border border-[#2C2C2C] bg-[#1F1F1F]',
    title: 'text-white',
    text: 'text-[#CFCFCF]',
    line: 'border-[#2C2C2C]',
    badge: 'bg-brand-orange/15 text-brand-orange',
  },
};

/** Маркери пунктів: галочка — що робимо, хрестик — типова проблема, крапка — нейтральний пункт. */
const CHECK = 'M5 12l5 5 9-10';
const CROSS = 'M7 7l10 10M17 7L7 17';

/**
 * Додаткова секція сторінки — блок, який не вкладається в базову схему
 * (визначення послуги, типи кампаній, аналітика, діагностика).
 *
 * Картки — заголовок зверху і сітка під ним. Списки — як на сторінці кейсу:
 * ліворуч липкий заголовок із вступом, праворуч рядки з маркером. Текст
 * лишається звичайним HTML, тож його читають і люди, і пошук.
 */
function ExtraSection({
  section,
  page,
  tone,
  icons,
}: {
  section: ServicePageExtraSection;
  page: ServicePage;
  tone: ExtraTone;
  /** Іконки карток за порядком пунктів; без них — номер у помаранчевому квадраті. */
  icons?: string[];
}) {
  const { openLead } = useServiceLead();
  const t = TONES[tone];
  const dark = tone === 'dark';
  const items = section.items ?? [];
  const marker = section.marker ?? 'check';

  const heading = (
    <>
      {section.eyebrow ? <div className={LABEL}>{section.eyebrow}</div> : null}
      <h2 className={`fs-44 mob-26 m-0 mt-4 font-bold ${t.title}`}>{section.title}</h2>
      {/* Вступ — короткими абзацами (розділені порожнім рядком): суцільний текст важко читати */}
      {section.intro?.split('\n\n').map((p, i) => (
        <p
          key={p}
          className={`m-0 text-base leading-[1.65] md:text-lg ${i ? 'mt-3' : 'mt-5'} ${
            i ? t.text : t.title
          }`}
        >
          {p}
        </p>
      ))}
    </>
  );

  /**
   * Основна кнопка відкриває заявку на послугу сторінки. Додаткові дії ведуть
   * до суміжних послуг, тож це текстові посилання — щоб не відволікати від головної дії.
   */
  const actions = section.actions ?? [];
  const linkClass = `group inline-flex items-center gap-2 text-left text-base font-semibold underline decoration-1 underline-offset-[6px] transition-colors md:text-[1.0625rem] ${
    dark
      ? 'text-white decoration-white/35 hover:text-brand-orange hover:decoration-brand-orange'
      : 'text-[#222222] decoration-[#222222]/30 hover:text-brand-orange hover:decoration-brand-orange'
  }`;
  const arrow = (
    <span className="text-brand-orange transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
      →
    </span>
  );
  const cta = section.cta || actions.length ? (
    <div className="mt-8 flex flex-col gap-6 md:mt-10 md:gap-7">
      {section.cta ? (
        <div className="flex">
          <AnimatedButton variant="primary" onClick={() => openLead(page.short, page.category)}>
            {section.cta}
          </AnimatedButton>
        </div>
      ) : null}
      {actions.length ? (
        <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:gap-x-9 md:gap-y-3">
          {actions.map((action) =>
            action.href ? (
              <Link key={action.label} href={action.href} className={linkClass}>
                {action.label}
                {arrow}
              </Link>
            ) : (
              <button
                key={action.label}
                type="button"
                className={linkClass}
                onClick={() => openLead(action.service ?? page.short, page.category)}
              >
                {action.label}
                {arrow}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  ) : null;

  /** Акцентний блок: помаранчева лінія зліва, без градієнтів. */
  const outro = section.outro || section.outroSteps?.length ? (
    <div
      className={`mt-10 border-l-[3px] border-brand-orange px-6 py-6 md:mt-14 md:px-9 md:py-8 ${
        dark ? 'bg-[#1F1F1F]' : tone === 'grey' ? 'bg-white' : 'bg-[#F4F4F4]'
      }`}
    >
      {section.outroTitle ? (
        <h3 className={`m-0 mb-3 text-[1.25rem] font-bold leading-[1.25] md:text-[1.5rem] ${t.title}`}>
          {section.outroTitle}
        </h3>
      ) : null}
      {(section.outro ?? '').split('\n\n').filter(Boolean).map((p, i) => (
        <p
          key={p}
          className={`m-0 text-base leading-[1.65] md:text-lg ${i ? 'mt-3' : ''} ${
            dark ? 'text-[#DADADA]' : i ? 'text-[#555555]' : 'text-[#333333]'
          }`}
        >
          {p}
        </p>
      ))}
      {section.outroSteps?.length ? (
        <ol className={`m-0 mt-1 flex list-none flex-col gap-3 p-0 ${section.outro ? 'mt-5' : ''}`}>
          {section.outroSteps.map((step, i) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-orange text-[0.75rem] font-bold text-white">
                {i + 1}
              </span>
              <span className={`pt-0.5 text-base leading-[1.5] md:text-lg ${dark ? 'text-[#DADADA]' : 'text-[#333333]'}`}>
                {step}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  ) : null;

  /** Завершальне речення: текст із посиланнями `[текст](/адреса)`. */
  const note = section.note ? (
    <p className={`m-0 mt-8 text-base leading-[1.65] md:mt-10 md:text-lg ${t.text}`}>
      {section.note.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return link ? (
          <Link
            key={i}
            href={link[2]}
            className={`font-semibold underline decoration-1 underline-offset-4 transition-colors hover:text-brand-orange hover:decoration-brand-orange ${t.title}`}
          >
            {link[1]}
          </Link>
        ) : (
          part
        );
      })}
    </p>
  ) : null;

  if (section.variant === 'cards') {
    return (
      <section id={section.id} className={t.section}>
        <div className="shell py-16 md:py-28">
          <div className="max-w-[52rem]">{heading}</div>
          {section.itemsTitle ? (
            <h3 className={`m-0 mt-10 text-[1.25rem] font-bold leading-[1.25] md:mt-14 md:text-[1.75rem] ${t.title}`}>
              {section.itemsTitle}
            </h3>
          ) : null}
          {/* Секція може бути лише текстом — тоді без порожньої сітки карток */}
          {items.length ? (
          <ul
            className={`m-0 grid list-none gap-4 p-0 md:gap-6 ${section.itemsTitle ? 'mt-6 md:mt-8' : 'mt-10 md:mt-14'} ${
              items.length % 3 === 0 || items.length > 4 ? 'md:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            {items.map(([title, text], i) => (
              <li
                key={title}
                className={`flex flex-col gap-4 px-6 py-8 transition-shadow duration-300 md:px-8 md:py-10 ${t.card} ${
                  dark ? 'hover:border-brand-orange' : 'hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]'
                }`}
              >
                {icons?.[i] ? (
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-orange text-white">
                    <Icon d={icons[i]} size={24} />
                  </span>
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-orange text-[0.875rem] font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
                <h3 className={`m-0 mt-2 text-[1.25rem] font-bold leading-[1.25] md:text-[1.5rem] ${t.title}`}>
                  {title}
                </h3>
                {text ? <p className={`m-0 text-[0.9375rem] leading-[1.65] md:text-base ${t.text}`}>{text}</p> : null}
              </li>
            ))}
          </ul>
          ) : null}
          {outro}
          {note}
          {cta}
        </div>
      </section>
    );
  }

  return (
    <section id={section.id} className={t.section}>
      <div className="shell py-16 md:grid md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-24 md:py-28">
        {/* Кнопка — під пунктами, а не в лівій колонці: у 25rem довгий підпис обрізався */}
        <div className="md:sticky md:top-[7.625rem]">{heading}</div>
        <div className="mt-10 md:mt-0">
          {marker === 'tiles' ? (
            /* Компактні плитки по дві в ряд: коротких пунктів багато, рядками сторінка виходила задовгою */
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 md:gap-4">
              {items.map(([title, text], i) => (
                <li key={title} className={`flex gap-4 px-5 py-5 md:px-6 ${t.card}`}>
                  {/* Іконка — у заповненому помаранчевому квадраті, як у картках решти блоків */}
                  <span
                    className={`flex h-11 w-11 flex-none items-center justify-center rounded-md ${
                      icons?.[i] ? 'bg-brand-orange text-white' : t.badge
                    }`}
                    aria-hidden
                  >
                    {icons?.[i] ? <Icon d={icons[i]} size={22} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-col gap-1">
                    <h3 className={`m-0 text-base font-bold leading-[1.3] md:text-[1.0625rem] ${t.title}`}>{title}</h3>
                    <span className={`text-[0.875rem] leading-[1.55] md:text-[0.9375rem] ${t.text}`}>{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : marker === 'numbered' ? (
            <ol className="m-0 flex list-none flex-col p-0">
              {items.map(([title, text], i) => (
                <li
                  key={title}
                  className={`group grid grid-cols-[3rem_minmax(0,1fr)] gap-5 border-t py-6 last:border-b md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-7 md:py-8 ${t.line}`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-md text-[0.875rem] font-bold transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white md:h-14 md:w-14 ${t.badge}`}
                  >
                    {icons?.[i] ? <Icon d={icons[i]} size={24} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className={`m-0 text-[1.125rem] font-bold leading-[1.25] md:text-[1.375rem] ${t.title}`}>
                      {title}
                    </h3>
                    <p className={`m-0 text-[0.9375rem] leading-[1.65] md:text-[1.0625rem] ${t.text}`}>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <ul className={`m-0 grid list-none p-0 ${items.length > 6 ? 'md:grid-cols-2 md:gap-x-10' : ''}`}>
              {items.map(([title, text]) => (
                <li key={title} className={`flex gap-4 border-t py-5 md:py-6 ${t.line}`}>
                  {marker === 'dot' ? (
                    <span className="mt-[0.5625rem] h-2 w-2 flex-none bg-brand-orange md:mt-2.5" aria-hidden />
                  ) : (
                    <span
                      className={`mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full ${
                        marker === 'problem' ? (dark ? 'bg-[#2C2C2C] text-white' : 'bg-[#222222] text-white') : t.badge
                      }`}
                      aria-hidden
                    >
                      <Icon d={marker === 'problem' ? CROSS : CHECK} size={15} />
                    </span>
                  )}
                  <span className="flex flex-col gap-1.5">
                    <span className={`text-base font-semibold leading-[1.35] md:text-lg ${t.title}`}>{title}</span>
                    {text ? <span className={`text-[0.9375rem] leading-[1.6] md:text-base ${t.text}`}>{text}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {outro}
          {note}
          {cta}
        </div>
      </div>
    </section>
  );
}

export default function ServicePageView({
  page,
  lead,
}: {
  page: ServicePage;
  /** Лід-форма сторінки: одразу після вартості або в самому кінці — як задано в даних. */
  lead?: React.ReactNode;
}) {
  const t = useT();
  const { openLead } = useServiceLead();
  const router = useRouter();
  const [open, setOpen] = useState(0);

  const g = SERVICE_PAGE_GRAPHICS[page.slug];
  const label = LABEL;
  /** Короткі мітки над заголовками секцій — сторінка може їх вимкнути. */
  const showLabels = page.sectionLabels !== false;
  const stepsAccent = page.stepsAccent === true;
  const leadAfterPrice = page.leadPosition === 'after-price';
  /** Градієнт у кольорах платформи — той самий, що на картках каталогу. */
  const platformBg = g?.colors ? platformGradient(g.colors) : undefined;

  /** Додаткові секції сторінки — там, де їх треба розмістити. */
  const extras = page.extraSections ?? [];
  const extrasAfterTldr = extras.filter((s) => s.placement === 'after-tldr');
  const extrasAfterIncluded = extras.filter((s) => s.placement !== 'after-tldr');
  /** Шість карток лягають у три колонки, чотири — у чотири. */
  const forWhomCols = page.forWhom.length >= 6 ? 'md:grid-cols-3' : 'md:grid-cols-4';
  const stepsCols = page.steps.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-5';
  /** Шість пов'язаних послуг — у дві лінії по три, чотири — в одну. */
  // П'ять карток — 3 + 2 на планшеті й один ряд на широкому екрані, щоб остання не стояла сама
  const relatedCols =
    page.related.length % 3 === 0
      ? 'md:grid-cols-3'
      : page.related.length === 5
        ? 'md:grid-cols-3 lg:grid-cols-5'
        : 'md:grid-cols-4';

  return (
    <>
      {/* Герой */}
      <section className="bg-[#141414]">
        <div className="shell pb-16 pt-8 md:pb-[6.25rem] md:pt-10">
          <nav
            aria-label={t.servicePage.breadcrumbs}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] text-[#8A8A8A] md:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-white">
              {t.nav.home}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="transition-colors hover:text-white">
              {t.nav.services}
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/services#${page.categoryKey}`}
              className="transition-colors hover:text-white"
            >
              {page.category}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white">{page.short}</span>
          </nav>

          <div className="mt-9 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,1fr)_26.25rem] md:items-start md:gap-20">
            <div className="flex flex-col">
              <div className="flex items-center gap-3.5">
                {g?.logo ? (
                  <span
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-md"
                    style={{ background: platformBg ?? '#FF5B2B', backgroundSize: '135% 100%' }}
                  >
                    <span
                      role="img"
                      aria-label={page.category}
                      className="block h-6 w-6 bg-center bg-no-repeat"
                      style={{ backgroundImage: `url("${g.logo}")`, backgroundSize: 'contain' }}
                    />
                  </span>
                ) : null}
                <div className={label}>{page.category}</div>
              </div>
              <h1 className="fs-64 mob-32 mt-4 font-bold text-white md:mt-[1.125rem]">
                {page.h1}
              </h1>
              <p className="mob-16 mt-5 max-w-[45rem] text-base leading-[1.55] text-[#DADADA] md:mt-6 md:text-xl">
                {page.lead}
              </p>
              {page.leadExtra ? (
                <p className="mt-3 max-w-[45rem] text-base leading-[1.55] text-[#CFCFCF] md:mt-4 md:text-lg">
                  {page.leadExtra}
                </p>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:gap-4">
                <AnimatedButton
                  variant="primary"
                  onClick={() => openLead(page.short, page.category)}
                >
                  {page.heroCta?.primary ?? t.common.freeConsultation}
                </AnimatedButton>
                {page.heroCta ? (
                  <AnimatedButton
                    variant="light"
                    onClick={() => scrollToLead((href) => router.push(href))}
                  >
                    {page.heroCta.secondary}
                  </AnimatedButton>
                ) : (
                  <AnimatedButton variant="light" href={`/services/${page.slug}#price`}>
                    {t.servicePage.priceLink}
                  </AnimatedButton>
                )}
              </div>
            </div>

            {/* Факти послуги — короткий «паспорт» для читача і для AI-пошуку */}
            <div className="overflow-hidden bg-[#1F1F1F]">
              <div
                className="h-1.5 w-full"
                style={{ background: platformBg ?? '#FF5B2B', backgroundSize: '135% 100%' }}
                aria-hidden
              />
              <dl className="m-0 flex flex-col px-7 py-6 md:px-[1.875rem] md:py-7">
                {page.facts.map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex items-baseline justify-between gap-5 py-4 ${i ? 'border-t border-[#2C2C2C]' : ''}`}
                  >
                    <dt className="text-[0.8125rem] text-[#8A8A8A] md:text-sm">{key}</dt>
                    <dd className="m-0 text-right text-[0.9375rem] font-semibold text-white md:text-base">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Що підключаємо — логотипи сервісів, як смужка клієнтів на головній */}
          {g?.stack.length ? (
            <div className="mt-12 border-t border-[#2C2C2C] pt-8 md:mt-16 md:pt-10">
              <span className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A] md:text-sm">
                {t.servicePage.stack}
              </span>
              <div className="mt-5 flex flex-wrap items-center gap-2.5 md:mt-6 md:gap-3">
                {g.stack.map(([name, logo]) => (
                  <span
                    key={name}
                    className="flex items-center gap-2.5 border border-[#2C2C2C] px-3.5 py-2.5 text-[0.8125rem] text-[#CFCFCF] transition-colors hover:border-brand-orange hover:text-white md:px-4 md:text-sm"
                  >
                    <span
                      role="img"
                      aria-label={name}
                      className="block h-[1.125rem] w-[1.125rem] flex-none bg-center bg-no-repeat opacity-80"
                      style={{ backgroundImage: `url("${logo}")`, backgroundSize: 'contain' }}
                    />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Коротко — лише якщо сторінка має TL;DR */}
      {page.tldr?.length ? (
        <section className="bg-white">
          <div className="shell pt-12 md:pt-24">
            <div className="grid gap-6 bg-[#EEEEEE] px-6 py-7 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12 md:px-11 md:py-10">
              <div className="flex flex-col gap-2.5">
                <div className={label}>{t.servicePage.tldr}</div>
                <span className="text-[0.8125rem] text-[#8A8A8A] md:text-sm">
                  {fill(t.servicePage.updated, { date: page.updated })}
                </span>
              </div>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {page.tldr.map((item) => (
                  <li key={item} className="flex gap-3.5 text-base leading-[1.5] text-[#222222] md:text-lg">
                    <span className="mt-2.5 h-2 w-2 flex-none bg-brand-orange" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* Додаткові секції після «Коротко» — визначення послуги та ін. */}
      {extrasAfterTldr.map((section) => (
        <ExtraSection
          key={section.id ?? section.title}
          section={section}
          page={page}
          icons={section.id ? g?.sections?.[section.id] : undefined}
          tone={section.tone ?? 'dark'}
        />
      ))}

      {/* Для кого */}
      <section className="bg-white">
        <div className="shell pb-14 pt-10 md:pb-24 md:pt-14">
          {showLabels ? <div className={label}>{t.servicePage.forWhom}</div> : null}
          <h2 className="fs-44 mob-26 mt-4 font-bold text-[#222222]">{page.forTitle}</h2>
          <div className={`mt-7 grid gap-2.5 md:mt-11 md:gap-[0.9375rem] ${forWhomCols}`}>
            {page.forWhom.map(([title, text], i) => (
              <div
                key={title}
                className="group flex flex-col gap-3 bg-[#F6F6F6] px-6 py-6 transition-colors duration-300 hover:bg-[#141414] md:min-h-[14.5rem] md:px-[1.625rem] md:py-7"
              >
                <span className="flex items-center justify-between">
                  {/* Заповнений помаранчевий квадрат — як іконки в решті блоків, щоб їх було видно */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-orange text-white">
                    <Icon d={g?.forWhom[i] ?? ''} size={24} />
                  </span>
                </span>
                <h3 className="mt-auto text-[1.125rem] font-bold leading-[1.25] text-[#222222] transition-colors duration-300 group-hover:text-white md:text-[1.3125rem]">
                  {title}
                </h3>
                <p className="m-0 text-[0.9375rem] leading-[1.55] text-[#555555] transition-colors duration-300 group-hover:text-[#CFCFCF]">
                  {text}
                </p>
              </div>
            ))}
          </div>
          {page.forWhomNote ? (
            <div className="mt-7 bg-[#F6F6F6] px-6 py-6 md:mt-9 md:px-8 md:py-7">
              <p className="m-0 text-base leading-[1.55] text-[#555555] md:text-lg">
                {page.forWhomNote}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Що входить */}
      <section className="bg-[#141414]">
        <div className="shell py-14 md:grid md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-20 md:py-[6.875rem]">
          <div className="md:sticky md:top-[7.625rem]">
            {showLabels ? <div className={label}>{t.servicePage.included}</div> : null}
            <h2 className="fs-44 mob-26 mt-4 font-bold text-white">{page.includedTitle}</h2>
          </div>
          <div className="mt-7 md:mt-0">
            {page.includedIntro ? (
              <p className="mob-16 m-0 max-w-[48rem] text-base leading-[1.65] text-[#CFCFCF] md:text-lg">
                {page.includedIntro}
              </p>
            ) : null}
            <ul
              className={`m-0 grid list-none gap-2.5 p-0 md:grid-cols-2 md:gap-[0.9375rem] ${
                page.includedIntro ? 'mt-7 md:mt-9' : ''
              }`}
            >
              {page.included.map(([title, text], i) => (
                <li
                  key={title}
                  className="flex flex-col gap-3.5 border border-[#2C2C2C] bg-[#1F1F1F] px-6 py-6 transition-colors duration-300 hover:border-brand-orange md:px-7"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-md text-white"
                    style={{ background: platformBg ?? '#FF5B2B', backgroundSize: '135% 100%' }}
                  >
                    <Icon d={g?.included[i] ?? ''} size={24} />
                  </span>
                  <span className="text-[1.0625rem] font-semibold leading-[1.3] text-white md:text-[1.1875rem]">
                    {title}
                  </span>
                  <span className="text-[0.9375rem] leading-[1.55] text-[#CFCFCF]">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Додаткові секції після «Що входить» — ведення, типи кампаній, аналітика */}
      {extrasAfterIncluded.map((section, i) => (
        <ExtraSection
          key={section.id ?? section.title}
          section={section}
          page={page}
          icons={section.id ? g?.sections?.[section.id] : undefined}
          tone={section.tone ?? (i % 2 === 0 ? 'light' : 'grey')}
        />
      ))}

      {/* Етапи. Акцентний варіант — помаранчева секція з кнопкою, щоб «як почати» було видно */}
      <section className={stepsAccent ? 'bg-brand-orange' : 'bg-[#EEEEEE]'}>
        <div className="shell py-14 md:py-[6.875rem]">
          {showLabels ? <div className={label}>{t.servicePage.process}</div> : null}
          <h2 className={`fs-44 mob-26 mt-4 font-bold ${stepsAccent ? 'text-white' : 'text-[#222222]'}`}>
            {page.stepsTitle}
          </h2>
          <ol
            className={`m-0 mt-8 grid list-none gap-6 p-0 md:mt-14 md:gap-0 md:border-t-2 ${
              stepsAccent ? 'md:border-white/40' : 'md:border-[#D5D5D5]'
            } ${stepsCols}`}
          >
            {page.steps.map(([when, title, text], i) => (
              <li
                key={title}
                className="group relative flex gap-4 md:flex-col md:gap-2.5 md:pr-6 md:pt-10"
              >
                {/* Кружечок на лінії етапів: на телефоні — ліворуч, на десктопі — на осі */}
                <span
                  className={`flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-brand-orange transition-colors duration-300 md:absolute md:-top-6 md:left-0 ${
                    stepsAccent
                      ? 'shadow-[0_0_0_4px_#FF5B2B] group-hover:bg-[#141414] group-hover:text-white'
                      : 'shadow-[0_0_0_4px_#EEEEEE] group-hover:bg-brand-orange group-hover:text-white'
                  }`}
                  aria-hidden
                >
                  <Icon d={g?.steps[i] ?? ''} size={22} />
                </span>
                <div className="flex flex-col gap-2">
                  <span
                    className={`text-[0.8125rem] font-bold uppercase tracking-[0.1em] ${
                      stepsAccent ? 'text-white/75' : 'text-brand-orange'
                    }`}
                  >
                    {when}
                  </span>
                  <h3 className={`m-0 text-lg font-bold leading-[1.2] md:text-xl ${stepsAccent ? 'text-white' : 'text-[#222222]'}`}>
                    {title}
                  </h3>
                  <p className={`m-0 text-[0.9375rem] leading-[1.55] ${stepsAccent ? 'text-white/90' : 'text-[#555555]'}`}>
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {page.stepsCta ? (
            <div className="mt-10 flex md:mt-14">
              <AnimatedButton variant="dark" onClick={() => openLead(page.short, page.category)}>
                {page.stepsCta}
              </AnimatedButton>
            </div>
          ) : null}
        </div>
      </section>

      {/* Порівняння */}
      {page.compare?.length && page.compareColumns ? (
        <section className="bg-white">
          <div className="shell py-14 md:py-[6.875rem]">
            <div className={label}>{t.servicePage.compare}</div>
            <h2 className="fs-44 mob-26 mt-4 font-bold text-[#222222]">{page.compareTitle}</h2>
            {/* Таблиця лишається на трьох колонках і на телефоні — як у макеті */}
            <div className="mt-7 overflow-hidden border border-[#E4E4E4] md:mt-11">
              <div className="grid grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)] bg-[#F6F6F6] text-[0.625rem] font-bold uppercase tracking-[0.1em] md:grid-cols-[17.5rem_minmax(0,1fr)_minmax(0,1fr)] md:text-[0.8125rem]">
                <span className="px-3 py-3.5 md:px-6 md:py-[1.125rem]" />
                <span className="px-3 py-3.5 text-[#8A8A8A] md:px-6 md:py-[1.125rem]">
                  {page.compareColumns[0]}
                </span>
                <span className="bg-[#FDE3D8] px-3 py-3.5 text-brand-orange md:px-6 md:py-[1.125rem]">
                  {page.compareColumns[1]}
                </span>
              </div>
              {page.compare.map(([key, a, b]) => (
                <div
                  key={key}
                  className="grid grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)] border-t border-[#E4E4E4] text-[0.8125rem] leading-[1.45] md:grid-cols-[17.5rem_minmax(0,1fr)_minmax(0,1fr)] md:text-base md:leading-[1.5]"
                >
                  <span className="px-3 py-4 font-semibold text-[#222222] md:px-6 md:py-5">
                    {key}
                  </span>
                  <span className="flex gap-2.5 px-3 py-4 text-[#555555] md:px-6 md:py-5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#B8B8B8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      className="mt-0.5 flex-none"
                      aria-hidden
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                    <span>{a}</span>
                  </span>
                  <span className="flex gap-2.5 bg-[#FFF6F2] px-3 py-4 font-medium text-[#222222] md:px-6 md:py-5">
                    <svg
                      width="18"
                      height="18"
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
                    <span>{b}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Вартість */}
      <section id="price" className="scroll-mt-16 bg-[#141414] md:scroll-mt-[5.125rem]">
        <div className="shell grid gap-10 py-14 text-white md:grid-cols-2 md:items-start md:gap-20 md:py-[6.875rem]">
          <div className="flex flex-col">
            {showLabels ? <div className={label}>{t.servicePage.price}</div> : null}
            <h2 className="fs-44 mob-26 mt-4 font-bold text-white">{page.priceTitle}</h2>
            <p className="mob-16 mt-5 text-base leading-[1.6] text-[#CFCFCF] md:text-lg">
              {page.priceText}
            </p>
            <div className="mt-8 flex md:mt-9">
              <AnimatedButton
                variant="primary"
                onClick={() => openLead(page.short, page.category)}
              >
                {page.priceCta ?? t.servicePage.priceCta}
              </AnimatedButton>
            </div>
          </div>
          {/* Фактори ціни на панелі в кольорах платформи — щоб темна секція не була порожньою */}
          <div
            className="flex flex-col px-6 py-6 md:px-9 md:py-8"
            style={{ background: platformBg ?? '#1F1F1F', backgroundSize: '135% 100%' }}
          >
            <span className="pb-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-white/60 md:text-sm">
              {page.priceFactorsTitle}
            </span>
            {page.priceFactors.map((item, i) => (
              <div key={item} className="flex gap-5 border-t border-white/15 py-4 md:py-5">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-orange text-[0.75rem] font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-base leading-[1.45] md:text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {leadAfterPrice ? <React.Fragment key="lead">{lead}</React.Fragment> : null}

      {/* Експерт послуги */}
      {page.expert ? (
        <section className="border-b border-[#E4E4E4] bg-white">
          <div className="shell grid gap-6 py-12 md:grid-cols-[12.5rem_minmax(0,1fr)_auto] md:items-center md:gap-10 md:py-24">
            {/* Фото фоном, як на сторінці «Про нас»: статичний експорт не має оптимізатора картинок */}
            <div
              role="img"
              aria-label={page.expert.name}
              className="h-[11.25rem] w-[11.25rem] bg-[#D9D9D9] bg-cover bg-top bg-no-repeat md:h-[12.5rem] md:w-[12.5rem]"
              style={{ backgroundImage: `url("${page.expert.image}")` }}
            />
            <div className="flex flex-col gap-2.5">
              {showLabels ? <div className={label}>{t.servicePage.expert}</div> : null}
              <span className="text-[1.375rem] font-bold text-[#222222] md:text-[1.625rem]">
                {page.expert.name}
              </span>
              <span className="text-[0.9375rem] font-semibold text-brand-orange">
                {page.expert.role}
              </span>
              <span className="max-w-[40rem] text-[0.9375rem] leading-[1.55] text-[#555555] md:text-base">
                {page.expert.bio}
              </span>
            </div>
            <div className="flex">
              <AnimatedButton
                variant="outline"
                onClick={() => openLead(page.short, page.category)}
              >
                {t.servicePage.expertCta}
              </AnimatedButton>
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 bg-[#EEEEEE] md:scroll-mt-[5.125rem]">
        <div className="shell py-14 md:grid md:grid-cols-[25rem_minmax(0,1fr)] md:items-start md:gap-20 md:py-[6.875rem]">
          <div className="md:sticky md:top-[7.625rem]">
            {showLabels ? <div className={label}>{t.servicePage.faq}</div> : null}
            <h2 className="fs-44 mob-26 mt-4 font-bold text-[#222222]">{page.faqTitle}</h2>
          </div>
          <div className="mt-7 flex flex-col gap-2.5 md:mt-0">
            {page.faq.map(([question, answer], i) => {
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
                  <div
                    className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.65,0,.25,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="m-0 px-5 pb-6 text-[0.9375rem] leading-[1.65] text-[#555555] md:pb-6 md:pl-[4.5rem] md:pr-[5.75rem] md:text-base">
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

      {/* Пов'язані послуги */}
      <section className="bg-white">
        <div className="shell py-14 md:py-24">
          {showLabels ? <div className={label}>{t.servicePage.related}</div> : null}
          <h2 className="fs-44 mob-26 mt-4 font-bold text-[#222222]">{page.relatedTitle}</h2>
          <div className={`mt-7 grid gap-2.5 md:mt-10 md:gap-[0.9375rem] ${relatedCols}`}>
            {page.related.map(([category, title, text, href], i) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col gap-3 bg-[#F6F6F6] px-6 py-6 text-[#222222] transition-colors duration-200 hover:bg-brand-orange hover:text-white md:min-h-[13.125rem]"
              >
                <span className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-orange text-white transition-colors duration-200 group-hover:bg-white group-hover:text-brand-orange">
                    <Icon d={g?.related[i] ?? ''} />
                  </span>
                  <span className="text-base transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.1em] opacity-60">
                  {category}
                </span>
                <span className="text-[1.125rem] font-bold leading-[1.25] md:text-xl">{title}</span>
                <span className="mt-auto text-[0.9375rem] leading-[1.5] opacity-80">{text}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex md:mt-10">
            <AnimatedButton variant="outline" href="/services">
              {t.servicePage.allServices}
            </AnimatedButton>
          </div>
        </div>
      </section>
      {/* Форма приходить із серверного компонента: в обгортці, щоб React не вимагав для неї key */}
      {leadAfterPrice ? null : <React.Fragment key="lead">{lead}</React.Fragment>}
    </>
  );
}
