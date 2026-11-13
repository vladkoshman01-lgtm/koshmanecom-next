'use client';

import React, { useMemo, useState } from 'react';
import {
  CATEGORY_CARDS,
  CATEGORY_KEYS,
  CATEGORY_NAMES,
  categoryCardStyle,
  ICONS,
  PLATFORM_COLORS,
  platformGradient,
  SERVICES,
  TASK_CHIPS,
} from '@/data/services';
import { SERVICE_ICONS, SERVICE_LOGOS } from '@/data/service-icons';
import { SERVICE_PAGE_BY_ITEM } from '@/data/servicePages';
import Link from '@/components/ui/LocaleLink';
import { useServiceLead } from '@/components/ServiceLeadProvider';
import { useLocale, useT, useTr } from '@/i18n/LocaleProvider';
import { serviceCount } from '@/i18n/plural';

/** Логотипи платформ для карток категорій (як у прототипі). */
const CATEGORY_LOGOS: Record<string, string | undefined> = {
  'shopify-dev': 'https://cdn.simpleicons.org/shopify/ffffff',
  pinterest: 'https://cdn.simpleicons.org/pinterest/ffffff',
  youtube: 'https://cdn.simpleicons.org/youtube/ffffff',
};

/**
 * «Чим ми можемо бути корисні?» — чипи задач, список категорій ліворуч
 * і сітка карток праворуч. Поки категорію не обрано, показуємо картки
 * категорій; після вибору — конкретні послуги цієї категорії.
 *
 * Послуга з власною сторінкою (мапа `SERVICE_PAGE_BY_ITEM`) — посилання на неї,
 * решта карток відкриває попап заявки, як у каталозі /services.
 */
function ServiceItem({
  href,
  onClick,
  className,
  children,
}: {
  href?: string;
  onClick: () => void;
  className: string;
  children: React.ReactNode;
}) {
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default function Services() {
  const { openLead } = useServiceLead();
  const t = useT();
  const tr = useTr();
  const locale = useLocale();
  const [activeTask, setActiveTask] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      CATEGORY_NAMES.map((name, i) => ({
        name,
        key: CATEGORY_KEYS[i],
        // Рахуємо самі, щоб число не розʼїжджалося з даними й відмінювалося за мовою
        count: serviceCount(locale, SERVICES.filter(([key]) => key === CATEGORY_KEYS[i]).length),
        ...categoryCardStyle(i),
        // У макеті три категорії показують логотип платформи замість іконки
        logo: CATEGORY_LOGOS[CATEGORY_KEYS[i]],
        icon: ICONS[CATEGORY_CARDS[i][2]],
      })),
    [locale],
  );

  const activeKey = activeCategory;
  const services = useMemo(
    () => (activeKey ? SERVICES.filter(([key]) => key === activeKey) : []),
    [activeKey],
  );

  const pickTask = (index: number) => {
    setActiveTask(index);
    const targetCategory = TASK_CHIPS[index][1];
    if (!targetCategory) {
      setActiveCategory(null);
      return;
    }
    const i = CATEGORY_NAMES.indexOf(targetCategory);
    setActiveCategory(i >= 0 ? CATEGORY_KEYS[i] : null);
  };

  return (
    <section id="services" className="sec-y bg-[#141414]">
      <div className="shell">
      <div className="text-[0.875rem] font-bold uppercase tracking-[0.12em] text-white">
        {t.nav.services}
      </div>
      <h2 className="fs-52 mob-30 mt-3 font-bold text-white">{t.home.services.title}</h2>
      <p className="mt-3 text-base leading-[1.4] text-white md:text-[1.0625rem]">
        {t.home.services.subtitle}
      </p>

      {/* чипи задач */}
      <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2.5 md:mt-9">
        {TASK_CHIPS.map(([label], i) => (
          <button
            key={label}
            type="button"
            onClick={() => pickTask(i)}
            className={`h-10 flex-none whitespace-nowrap border-[1.5px] px-3.5 text-[0.8125rem] text-white transition-colors md:h-[2.9375rem] md:px-5 md:text-base ${
              activeTask === i
                ? 'border-brand-orange bg-brand-orange'
                : 'border-[#D9D9D9] bg-transparent hover:border-brand-orange'
            }`}
          >
            {tr(label)}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 md:mt-[2.5625rem] md:flex-row md:items-start">
        {/* список категорій */}
        <div className="services-aside hidden w-full flex-none flex-col gap-1 md:flex rounded-[0.1875rem] bg-[#212121] px-5 py-6 md:px-[1.375rem] md:pb-[3.125rem] md:pt-[2.1875rem]">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-2.5 text-left text-[0.9375rem] leading-[1.2] text-white transition-colors ${
              activeCategory === null ? 'bg-brand-orange' : 'bg-transparent hover:bg-[#2C2C2C]'
            }`}
          >
            {t.common.all}
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveCategory(c.key)}
              className={`px-3.5 py-2.5 text-left text-[0.9375rem] leading-[1.2] text-white transition-colors ${
                activeCategory === c.key ? 'bg-brand-orange' : 'bg-transparent hover:bg-[#2C2C2C]'
              }`}
            >
              {tr(c.name)}
            </button>
          ))}
        </div>

        {/* На телефоні бічного списку немає — замість нього рядок із назвою
            обраного напрямку та поверненням до всіх */}
        {activeCategory !== null ? (
          <div className="flex min-h-[2.75rem] items-center justify-between gap-3 md:hidden">
            <span className="text-[1.0625rem] font-semibold text-white">
              {tr(categories.find((c) => c.key === activeCategory)?.name ?? '')}
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="h-11 flex-none px-1 text-sm text-brand-orange"
            >
              {t.common.backToAll}
            </button>
          </div>
        ) : null}

        {/* сітка карток */}
        <div className={`grid min-w-0 flex-1 gap-2.5 md:gap-x-[0.9375rem] md:gap-y-3 lg:grid-cols-3 ${
            // На телефоні: категорії — дві колонки, послуги — рядки в одну
            activeCategory === null ? 'grid-cols-2' : 'grid-cols-1'
          } md:grid-cols-2`}>
          {activeCategory === null
            ? categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActiveCategory(c.key)}
                  className="card-category flow-parent flex h-[9.75rem] flex-col md:h-[10.5625rem] overflow-hidden rounded-[0.1875rem] bg-[#232323] text-left text-white transition-transform duration-200 hover:-translate-y-[0.1875rem]"
                >
                  {/* w-full обовʼязковий: Safari на iPhone не розтягує дочірні блоки
                      всередині <button> на всю ширину — градієнт займав лише частину картки */}
                  <div
                    className="flow-card flex w-full flex-1 flex-col justify-between px-3 pb-3 pt-3.5 md:px-5 md:pb-5 md:pt-6"
                    data-grad={c.gradientKey}
                    style={{ background: c.gradient, backgroundSize: c.backgroundSize }}
                  >
                    <span className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-md bg-white/20 md:h-[2.125rem] md:w-[2.125rem]">
                      {c.logo ? (
                        <span
                          role="img"
                          aria-label={c.name}
                          className="block h-[1.125rem] w-[1.125rem] bg-center bg-no-repeat"
                          style={{ backgroundImage: `url("${c.logo}")`, backgroundSize: 'contain' }}
                        />
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d={c.icon} />
                        </svg>
                      )}
                    </span>
                    <span className="text-[0.9375rem] font-semibold leading-[1.2] tracking-[0.01em] md:text-xl md:font-medium">{tr(c.name)}</span>
                  </div>
                  <div className="flex h-10 w-full items-center justify-between px-3 text-xs md:h-[3.1875rem] md:pl-[1.125rem] md:pr-[1.375rem] md:text-sm">
                    <span>{c.count}</span>
                    <span className="text-base" aria-hidden>
                      →
                    </span>
                  </div>
                </button>
              ))
            : services.map(([, title, description, segment]) => {
                const category = categories.find((c) => c.key === activeCategory)!;
                const slug = `${activeCategory}|${title}`;
                const logo = SERVICE_LOGOS[slug];
                const icon = SERVICE_ICONS[slug] ?? category.icon;
                const colors = PLATFORM_COLORS[slug];
                const gradient = colors ? platformGradient(colors) : category.gradient;
                const backgroundSize = colors ? '135% 100%' : category.backgroundSize;
                const pageSlug = SERVICE_PAGE_BY_ITEM[slug];
                const href = pageSlug ? `/services/${pageSlug}` : undefined;
                const open = () => openLead(title, category.name);
                return (
                  <React.Fragment key={title}>
                  {/* Телефон: горизонтальний рядок із кольоровою смужкою зліва */}
                  <ServiceItem
                    href={href}
                    onClick={open}
                    className="flex min-h-24 overflow-hidden rounded-[0.1875rem] bg-[#232323] text-left text-white md:hidden"
                  >
                    <div
                      className="w-1.5 flex-none"
                      style={{ background: gradient, backgroundSize }}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3.5">
                      <span className="flex items-center justify-between gap-2.5">
                        <span className="text-[1rem] font-semibold leading-[1.25]">{tr(title)}</span>
                        {segment ? (
                          <span className="flex-none rounded-[0.1875rem] bg-white/[0.14] px-[7px] py-[3px] text-[0.625rem] font-semibold tracking-[0.12em]">
                            {segment}
                          </span>
                        ) : null}
                      </span>
                      <span className="text-[0.8125rem] leading-[1.45] text-[#CFCFCF]">
                        {tr(description)}
                      </span>
                    </div>
                    <span className="flex-none self-center px-3.5 text-sm" aria-hidden>
                      →
                    </span>
                  </ServiceItem>

                  <ServiceItem
                    href={href}
                    onClick={open}
                    className="card-service flow-parent hidden h-[15.75rem] flex-col overflow-hidden rounded-[0.1875rem] bg-[#232323] text-left text-white transition-transform duration-200 md:flex md:hover:-translate-y-[0.1875rem]"
                  >
                    <div
                      className="card-service-head flow-card flex h-[9.375rem] w-full flex-none flex-col justify-between p-5"
                      style={{ background: gradient, backgroundSize }}
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-md bg-white/20 md:h-[2.125rem] md:w-[2.125rem]">
                          {logo ? (
                            <span
                              role="img"
                              aria-label={title}
                              className="block h-[1.125rem] w-[1.125rem] bg-center bg-no-repeat"
                              style={{ backgroundImage: `url("${logo}")`, backgroundSize: 'contain' }}
                            />
                          ) : (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fff"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d={icon} />
                            </svg>
                          )}
                        </span>
                        {segment ? (
                          <span className="rounded-[0.1875rem] bg-white/20 px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.12em]">
                            {segment}
                          </span>
                        ) : null}
                      </span>
                      <span className="line-clamp-2 text-xl font-medium leading-[1.2] tracking-[0.01em]">
                        {tr(title)}
                      </span>
                    </div>
                    <div className="flex min-h-0 w-full flex-1 items-center justify-between gap-3.5 pb-[1.125rem] pl-[1.125rem] pr-[1.375rem] pt-4 text-sm leading-[1.45]">
                      <span className="text-[#CFCFCF]">{tr(description)}</span>
                      <span className="flex-none text-base" aria-hidden>
                        →
                      </span>
                    </div>
                  </ServiceItem>
                  </React.Fragment>
                );
              })}
        </div>
      </div>

      </div>
    </section>
  );
}
