'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { careerRoles } from '@/lib/careers';
import { useT, useTr } from '@/i18n/LocaleProvider';


/** Винесено зі сторінки, щоб ту саму розмітку рендерити всіма мовами. */
export default function CareerList() {
  const t = useT();
  const tr = useTr();
  return (
    <div className="bg-white">
      {/* Перший екран */}
      <section className="bg-[#141414]">
        <div className="shell py-14 md:py-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Карʼєра')}</div>
          <h1 className="fs-64 mob-32 mt-4 max-w-[62.5rem] font-bold text-white md:mt-[1.125rem]">{tr('Будуймо e-commerce разом')}</h1>
          <p className="mob-16 mt-5 max-w-[47.5rem] text-base leading-[1.55] text-[#CFCFCF] md:mt-10 md:text-[1.1875rem]">{tr('Шукаємо людей, яким цікаво запускати бренди на міжнародних ринках: маркетплейси, реклама,\n            сайти та AI-автоматизація. Працюємо з клієнтами з різних країн.')}</p>
          <div className="mt-7 flex md:mt-11">
            <AnimatedButton variant="primary" href="/career#jobs">{tr('Переглянути вакансії')}</AnimatedButton>
          </div>
        </div>
      </section>

      {/* Відкриті позиції */}
      <section id="jobs" className="scroll-mt-16 bg-[#EEEEEE] md:scroll-mt-[5.125rem]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Вакансії')}</div>
          <h2 className="fs-46 mob-26 mt-3 font-bold text-[#222222] md:mt-4">{tr('Відкриті позиції')}</h2>

          <div className="mt-7 flex flex-col border-t-2 border-[#222222] md:mt-11">
            {careerRoles.map((role, i) => (
              <Link
                key={role.slug}
                href={`/career/${role.slug}`}
                className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#CFCFCF] py-5 text-[#222222] transition-[background,padding] duration-[350ms] hover:bg-white md:grid-cols-[3.75rem_minmax(0,1fr)_13.75rem_12.5rem_3.5rem] md:gap-6 md:py-[1.875rem] md:hover:px-5"
              >
                <span className="text-[0.8125rem] font-bold tracking-[0.06em] text-brand-orange md:text-[0.9375rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-col gap-1.5 md:gap-2">
                  <span className="mob-18 text-[1.625rem] font-semibold leading-[1.2]">
                    {tr(role.title)}
                  </span>
                  <span className="mob-14 text-base leading-[1.45] text-[#555555]">
                    {tr(role.shortDescription)}
                  </span>
                  {/* На телефоні формат і локація стоять під описом */}
                  <span className="flex flex-wrap gap-x-3 gap-y-1 text-[0.8125rem] text-[#555555] md:hidden">
                    <span>{tr(role.format)}</span>
                    <span>·</span>
                    <span>{tr(role.location)}</span>
                  </span>
                </span>
                <span className="hidden text-[0.9375rem] text-[#555555] md:block">
                  {tr(role.format)}
                </span>
                <span className="hidden text-[0.9375rem] text-[#555555] md:block">
                  {tr(role.location)}
                </span>
                <span className="flex h-8 w-8 items-center justify-center bg-brand-orange text-white md:h-14 md:w-14">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
