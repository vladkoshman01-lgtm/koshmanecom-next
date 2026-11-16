'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import type { CaseCard as CaseCardData } from '@/data/cases';
import { caseHrefForCard } from '@/data/caseStudies';
import { useT, useTr } from '@/i18n/LocaleProvider';

/**
 * Картка кейсу: обкладинка, назва, опис, головна цифра, теги і «Детальніше».
 * Спільна для стрічки кейсів на головній і блоку «Схожі кейси» на сторінці кейсу.
 *
 * duplicate — копія для безшовної каруселі на головній: прихована від
 * скрінрідерів і клавіатури.
 */
export default function CaseCard({
  item,
  duplicate = false,
  className = '',
}: {
  item: CaseCardData;
  duplicate?: boolean;
  className?: string;
}) {
  const t = useT();
  const tr = useTr();
  const href = caseHrefForCard(item.id);

  return (
    <article
      aria-hidden={duplicate || undefined}
      className={`card-case relative h-[34.6875rem] w-[18.75rem] flex-none overflow-hidden rounded md:w-[21.25rem] ${className}`}
      style={{ background: item.background ?? item.tint }}
    >
      <div
        className="absolute left-0 w-full bg-top bg-no-repeat"
        style={{
          // 'cover' — обрізати під рамку; 'contain' — зменшити кадр цілком
          backgroundSize: item.coverFit ?? 'cover',
          // Кадр із макета масштабується разом із карткою, інакше
          // зображення «не дотягується» до низу на широких екранах.
          top: `calc(${item.imageTop} * var(--u))`,
          height: item.imageHeight === null ? '100%' : `calc(${item.imageHeight} * var(--u))`,
          backgroundImage: `url("${item.cover}")`,
        }}
        role="img"
        aria-label={`${t.home.cases.eyebrow}: ${tr(item.name)}`}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${item.tint} 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 45%, rgba(10,10,10,.85) 68%, #0d0d0d 100%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col px-[1.625rem] pb-7 pt-[1.875rem] text-white">
        <div className="text-[1.375rem] font-semibold uppercase leading-[1.15] tracking-[0.01em]">
          {/* Назви-бренди лишаються як є; описові (напр. «ETSY · ПРИКРАСИ») перекладаються */}
          {tr(item.name)}
        </div>
        <div className="mt-3.5 text-[1.0625rem] font-medium leading-[1.3]">{tr(item.description)}</div>

        <div className="mt-auto border-l-2 border-brand-orange pl-3">
          {item.metric === 'Зекономлено' ? (
            <>
              <div className="text-[2rem] font-semibold leading-[1.15] text-white">
                {tr(item.metric)}
              </div>
              <div className="text-[2rem] font-semibold leading-[1.15] text-brand-orange">
                {tr(item.metricSub)}
              </div>
            </>
          ) : (
            <>
              <div className="text-[2rem] font-semibold leading-[1.1] text-brand-orange">
                {tr(item.metric)}
              </div>
              <div className="mt-1.5 text-sm leading-[1.3] text-white">{tr(item.metricSub)}</div>
            </>
          )}
        </div>

        {/* Теги кейсу */}
        <div className="mt-[1.375rem] flex flex-wrap gap-2.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="flex h-8 items-center whitespace-nowrap border border-white/50 px-3.5 text-[0.8125rem]"
            >
              {tr(tag)}
            </span>
          ))}
        </div>

        {/* Кейс із власною сторінкою — посилання, решта поки без переходу */}
        {href ? (
          <Link
            href={href}
            tabIndex={duplicate ? -1 : undefined}
            className="pointer-events-auto mt-[1.875rem] flex h-[2.125rem] items-center gap-2 self-start bg-white px-4 text-sm font-medium text-[#141414] transition-colors hover:bg-brand-orange hover:text-white"
          >
            {t.common.more} <span aria-hidden>→</span>
          </Link>
        ) : (
          <span className="mt-[1.875rem] flex h-[2.125rem] items-center gap-2 self-start bg-white px-4 text-sm font-medium text-[#141414]">
            {t.common.more} <span aria-hidden>→</span>
          </span>
        )}
      </div>
    </article>
  );
}
