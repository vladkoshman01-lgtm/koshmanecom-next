'use client';

import React, { useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import { CARD_GRADIENTS } from '@/data/services';
import { useT, useTr } from '@/i18n/LocaleProvider';

/**
 * Сітка інструментів за прототипом Tools.dc.html: фільтри за платформою
 * і картки з градієнтним верхом. Посилання ведуть на наші готові сторінки.
 */

type Tool = {
  title: string;
  description: string;
  href: string;
  gradient: string;
  icon: string;
  tags: string[];
};

const TOOLS: Tool[] = [
  {
    title: 'Калькулятор прибутку Etsy',
    description:
      'Порахуйте чистий прибуток, комісії Etsy, маржу та місячний дохід за хвилину.',
    href: '/kalkulyator-prybutku-etsy',
    gradient: 'silver',
    icon: 'M7 3h10v18H7zM9.5 7h5M9.5 11h1M13.5 11h1M9.5 14h1M13.5 14h1M9.5 17h1M13.5 17h1',
    tags: ['Etsy'],
  },
  {
    title: 'Калькулятор ціноутворення Etsy',
    description:
      'Введіть витрати і бажану маржу — отримайте мінімальну та рекомендовану ціну продажу з урахуванням всіх комісій.',
    href: '/kalkulyator-tsinoutvorennya-etsy',
    gradient: 'orange',
    icon: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
    tags: ['Etsy'],
  },
  {
    title: 'Etsy vs Amazon vs Shopify',
    description:
      'Порівняйте комісії та прибуток на трьох платформах — введіть параметри товару і дізнайтесь, як вигідніше продавати.',
    href: '/porivnyannya-platform-etsy-amazon-shopify',
    gradient: 'blue',
    icon: 'M6 20V12M12 20V5M18 20v-9',
    tags: ['Etsy', 'Amazon', 'Shopify'],
  },
  {
    title: 'Ресайзер зображень',
    description:
      'Змінюйте розмір фото для Instagram, Etsy, Pinterest та інших платформ з пресетами.',
    href: '/tools/image-resizer',
    gradient: 'blue',
    icon: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01',
    tags: ['Контент'],
  },
  {
    title: 'SEOgenie',
    description:
      'AI-додаток для продавців Etsy: заголовок, 13 тегів і опис за 30 секунд, SEO-аудит лістингів і публікація прямо в магазин. 7 днів безкоштовно.',
    href: 'https://seogenie.app/',
    gradient: 'orange',
    icon: 'M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z',
    tags: ['Etsy', 'SEO'],
  },
];

const FILTERS = ['Усі', 'Etsy', 'Amazon', 'Shopify', 'SEO', 'Контент'];

export default function ToolsGrid({ withHeader = false }: { withHeader?: boolean } = {}) {
  const t = useT();
  const tr = useTr();
  const [filter, setFilter] = useState('Усі');
  const list = TOOLS.filter((t) => filter === 'Усі' || t.tags.includes(filter));

  return (
    <>
      {withHeader ? (
        <>
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">
            {t.pages.tools.eyebrow}
          </div>
          <div className="mt-4 grid gap-4 md:mt-[1.125rem] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20">
            <h1 className="fs-64 mob-32 font-bold text-white">{t.pages.tools.title}</h1>
            <p className="mob-16 text-base leading-[1.55] text-[#CFCFCF] md:text-[1.125rem]">
              {t.pages.tools.subtitle}
            </p>
          </div>
        </>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2 md:mt-16">
        {FILTERS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setFilter(label)}
            className={`h-10 border-[1.5px] px-3.5 text-[0.8125rem] font-semibold text-white transition-colors md:h-11 md:px-[1.125rem] md:text-sm ${
              filter === label
                ? 'border-brand-orange bg-brand-orange'
                : 'border-[#3A3A3A] bg-transparent hover:border-brand-orange'
            }`}
          >
            {label === 'Усі' ? t.pages.tools.filterAll : tr(label)}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-2.5 md:mt-7 md:grid-cols-3 md:gap-[0.9375rem]">
        {list.map((tool) => {
          const external = tool.href.startsWith('http');
          const Card = external ? 'a' : Link;
          return (
            <Card
              key={tool.title}
              href={tool.href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="flow-parent flex min-h-[16.25rem] flex-col overflow-hidden rounded-[0.1875rem] bg-[#232323] text-white transition-transform duration-200 hover:-translate-y-[0.1875rem] md:h-[21.25rem]"
            >
              <div
                className="flow-card flex h-[8.75rem] flex-none flex-col justify-between p-5 md:h-[10.625rem] md:p-6"
                style={{
                  background: CARD_GRADIENTS[tool.gradient],
                  backgroundSize: tool.gradient === 'silver2' ? '200% 100%' : '135% 100%',
                }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white/20 md:h-11 md:w-11">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={tool.icon} />
                  </svg>
                </span>
                <span className="text-lg font-semibold leading-[1.2] md:text-[1.375rem]">
                  {tr(tool.title)}
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 px-5 pb-5 pt-4 md:px-6 md:pb-5 md:pt-[1.125rem]">
                <span className="line-clamp-3 text-sm leading-[1.45] text-[#CFCFCF] md:text-[0.9375rem]">
                  {tr(tool.description)}
                </span>
                <span className="mt-auto flex items-center justify-between gap-3">
                  <span className="flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex h-[1.625rem] items-center border border-[#3A3A3A] px-2.5 text-xs text-[#CFCFCF]"
                      >
                        {tr(tag)}
                      </span>
                    ))}
                  </span>
                  <span className="flex-none text-[0.9375rem] font-semibold text-brand-orange">
                    {t.common.openTool} →
                  </span>
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
