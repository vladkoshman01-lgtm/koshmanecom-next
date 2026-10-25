'use client';

import React from 'react';
import {
  CATEGORY_CARDS,
  CATEGORY_KEYS,
  CATEGORY_NAMES,
  categoryCardStyle,
  ICONS,
  SERVICES,
} from '@/data/services';
import { useServiceLead } from '@/components/ServiceLeadProvider';
import { scrollToLead } from '@/lib/leadAnchor';
import { useRouter } from 'next/navigation';
import { useLocale, useT, useTr } from '@/i18n/LocaleProvider';
import { serviceCount } from '@/i18n/plural';
import AnimatedButton from '@/components/ui/AnimatedButton';

/**
 * Каталог послуг сторінки /services за прототипом Services.dc.html:
 * перший екран із чипами-якорями, картки ключових напрямків і далі
 * по секції на кожну категорію — ліворуч липкий заголовок, праворуч
 * список послуг. Клік по послузі відкриває попап заявки.
 */

const LOGOS: Record<string, string | undefined> = {
  'shopify-dev': 'https://cdn.simpleicons.org/shopify/ffffff',
  pinterest: 'https://cdn.simpleicons.org/pinterest/ffffff',
  youtube: 'https://cdn.simpleicons.org/youtube/ffffff',
};

/** Чипи «Оберіть свою задачу» — кожен веде до своєї секції. */
const TASKS: [string, string | null][] = [
  ['Не знаю, з чого почати', null],
  ['Хочу вийти на міжнародний ринок', 'Міжнародні маркетплейси'],
  ['Хочу продавати на Etsy', 'Міжнародні маркетплейси'],
  ['Хочу сайт на Shopify', 'Розробка Shopify'],
  ['Хочу оновити бренд', 'Брендинг та дизайн'],
  ['Хочу сайт', 'Розробка сайтів'],
  ['Хочу зʼявлятися в AI-пошуку', 'SEO'],
  ['Хочу запустити рекламу', 'Реклама'],
];

/** Структура категорій; тексти підставляються за мовою в компоненті. */
const categories = CATEGORY_NAMES.map((title, i) => {
  const key = CATEGORY_KEYS[i];
  const items = SERVICES.filter(([k]) => k === key);
  return {
    key,
    title,
    n: String(i + 1).padStart(2, '0'),
    itemCount: items.length,
    ...categoryCardStyle(i),
    icon: ICONS[CATEGORY_CARDS[i][2]],
    logo: LOGOS[key],
    items,
  };
});

function Arrow({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ServicesCatalog() {
  const { openLead } = useServiceLead();
  const router = useRouter();
  const t = useT();
  const tr = useTr();
  const locale = useLocale();

  return (
    <>
      {/* Перший екран */}
      <section className="bg-[#141414]">
        <div className="shell pb-16 pt-12 md:pb-24 md:pt-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">
            {t.nav.services}
          </div>
          <h1 className="fs-64 mob-32 mt-4 max-w-[67.5rem] font-bold text-white md:mt-[1.125rem]">
            {t.pages.services.title}
          </h1>
          <p className="mob-16 mt-4 max-w-[45rem] text-base leading-[1.5] text-[#CFCFCF] md:mt-6 md:text-[1.1875rem]">
            {t.pages.services.subtitle}
          </p>

          <div className="mt-7 flex md:mt-10">
            <AnimatedButton
              variant="primary"
              onClick={() => openLead('Безкоштовна консультація', 'Послуги')}
            >
              {t.common.freeConsultation}
            </AnimatedButton>
          </div>

          <div className="mt-10 flex flex-col gap-4 md:mt-14">
            <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] md:text-sm">
              {t.pages.services.pickTask}
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-2.5">
              {TASKS.map(([label, category]) => {
                const i = category ? CATEGORY_NAMES.indexOf(category) : -1;
                const href = i >= 0 ? `#${CATEGORY_KEYS[i]}` : '#lead';
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={
                      i >= 0
                        ? undefined
                        : (e) => {
                            e.preventDefault();
                            scrollToLead((to) => router.push(to));
                          }
                    }
                    className="flex h-10 flex-none items-center gap-2.5 whitespace-nowrap border-[1.5px] border-[#D9D9D9] px-3.5 text-[0.8125rem] text-white transition-colors hover:border-brand-orange hover:bg-brand-orange md:h-[2.9375rem] md:px-5 md:text-[0.9375rem]"
                  >
                    {tr(label)}
                    <span className="text-sm" aria-hidden>
                      ↓
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-5 border-t border-[#2C2C2C] pt-10 md:mt-20 md:grid-cols-[15.625rem_minmax(0,1fr)] md:items-baseline md:gap-10">
            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] md:text-sm">
              {t.pages.services.approachLabel}
            </div>
            <p className="mob-20 max-w-[60rem] text-xl font-medium leading-[1.35] text-white md:text-[1.875rem]">
              {t.pages.services.approachText}
            </p>
          </div>
        </div>
      </section>

      {/* Ключові напрямки */}
      <section className="bg-[#141414]">
        <div className="shell pb-16 md:pb-[7.5rem]">
          <h2 className="fs-46 mob-26 font-bold text-white">{t.pages.services.directions}</h2>
          <div className="mt-7 grid grid-cols-2 gap-2.5 md:mt-10 md:grid-cols-3 md:gap-[0.9375rem]">
            {categories.map((c) => (
              <a
                key={c.key}
                href={`#${c.key}`}
                className="flow-parent flex min-h-[9.75rem] flex-col overflow-hidden rounded-[0.1875rem] bg-[#232323] text-white transition-transform duration-200 hover:-translate-y-[0.1875rem] md:min-h-[11.875rem]"
              >
                <div
                  className="flow-card flex flex-1 flex-col justify-between gap-7 px-3 pb-3 pt-3.5 md:px-6 md:pb-[1.625rem] md:pt-6"
                    data-grad={c.gradientKey}
                  style={{ background: c.gradient, backgroundSize: c.backgroundSize }}
                >
                  <span className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-md bg-white/20 md:h-[2.125rem] md:w-[2.125rem]">
                    {c.logo ? (
                      <span
                        role="img"
                        aria-label={c.title}
                        className="block h-[1.125rem] w-[1.125rem] bg-center bg-no-repeat"
                        style={{ backgroundImage: `url("${c.logo}")`, backgroundSize: 'contain' }}
                      />
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d={c.icon} />
                      </svg>
                    )}
                  </span>
                  <span className="text-[0.9375rem] font-semibold leading-[1.2] tracking-[0.01em] md:text-[1.375rem] md:font-medium">
                    {tr(c.title)}
                  </span>
                </div>
                <div className="flex h-10 items-center justify-between px-3 text-xs font-semibold md:h-[3.375rem] md:px-6 md:text-sm">
                  <span>{serviceCount(locale, c.itemCount)}</span>
                  <span className="text-base" aria-hidden>
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Секція на кожну категорію */}
      {categories.map((c, i) => (
        <section
          key={c.key}
          id={c.key}
          className={`scroll-mt-16 md:scroll-mt-[5.125rem] ${i % 2 ? 'bg-[#EEEEEE]' : 'bg-white'}`}
        >
          <div className="shell py-14 md:grid md:grid-cols-[22.5rem_minmax(0,1fr)] md:items-start md:gap-20 md:pb-[6.5rem] md:pt-24">
            <div className="flex flex-col gap-3 md:sticky md:top-10 md:gap-5">
              <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">
                {c.n} · {serviceCount(locale, c.itemCount)}
              </span>
              <h2 className="fs-44 mob-26 font-bold text-[#222222]">{tr(c.title)}</h2>
              <div className="mt-1 hidden md:mt-3 md:flex">
                <AnimatedButton variant="dark" onClick={() => openLead(c.title, 'Послуги')}>
                  {t.common.discussTask}
                </AnimatedButton>
              </div>
            </div>

            <div className="mt-6 flex flex-col border-t border-[#CFCFCF] md:mt-0">
              {c.items.map(([, title, description, segment], j) => {
                const hasDesc = description.trim() !== title;
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => openLead(title, c.title)}
                    className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#CFCFCF] py-5 text-left text-[#222222] transition-[background,padding,color] duration-[350ms] hover:bg-[#141414] hover:text-white md:grid-cols-[3.5rem_minmax(0,1fr)_auto_3.25rem] md:gap-6 md:py-7 md:pr-5 md:hover:px-6"
                  >
                    <span className="text-[0.8125rem] font-bold tracking-[0.06em] text-brand-orange md:text-[0.9375rem]">
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <span className="flex min-w-0 flex-col gap-1.5 md:gap-2">
                      <span className="mob-18 text-[1.625rem] font-semibold leading-[1.2] text-inherit">
                        {tr(title)}
                      </span>
                      {hasDesc ? (
                        <span className="mob-14 max-w-[38.75rem] text-base leading-[1.45] text-inherit opacity-[0.65]">
                          {tr(description)}
                        </span>
                      ) : null}
                    </span>
                    <span className="flex justify-end">
                      {segment ? (
                        <span className="border border-brand-orange px-2 py-1 text-[0.6875rem] font-bold tracking-[0.12em] text-brand-orange">
                          {segment}
                        </span>
                      ) : null}
                    </span>
                    <span className="hidden h-[3.25rem] w-[3.25rem] items-center justify-center bg-brand-orange text-white md:flex">
                      <Arrow />
                    </span>
                  </button>
                );
              })}

              {/* На телефоні кнопка секції стоїть під списком */}
              <div className="mt-6 md:hidden">
                <AnimatedButton variant="dark" onClick={() => openLead(c.title, 'Послуги')}>
                  {t.common.discussTask}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
