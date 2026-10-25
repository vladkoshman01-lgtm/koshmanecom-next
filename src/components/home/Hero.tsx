'use client';

import React from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useContactModal } from '@/components/ContactModalProvider';
import { useT } from '@/i18n/LocaleProvider';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Compass from './Compass';

/**
 * Перший екран.
 *
 * Телефон: заголовок → підзаголовок → компас → широка кнопка і текстове
 * посилання (окремий мобільний дизайн із хендоффу).
 * Десктоп: текст у лівій колонці, компас праворуч на всю висоту.
 *
 * Елементи лежать прямо в контейнері без обгортки — на мобільному це колонка,
 * на десктопі вони розкладаються по комірках сітки.
 */
export default function Hero() {
  const { openModal } = useContactModal();
  const t = useT();

  return (
    <section className="shell flex flex-col pb-10 pt-4 md:grid md:grid-cols-[minmax(0,1fr)_max-content] md:grid-rows-[auto_auto_1fr] md:items-start md:gap-x-5 md:pb-0 md:pt-0">
      <h1 className="fs-48 mob-30 font-bold text-[#222222] md:col-start-1 md:row-start-1 md:pt-[6.75rem]">
        {/* Десктоп: жорсткі переноси як у макеті, текст однотонний.
            Телефон: рядки переносяться самі, а останній — помаранчевий
            (лише max-md, щоб на десктопі колір успадковувався від заголовка). */}
        {t.home.hero.titleLines.map((line) => (
          <React.Fragment key={line}>
            {line} <br className="hidden md:inline" />
          </React.Fragment>
        ))}
        <span className="max-md:text-brand-orange">{t.home.hero.titleAccent}</span>
      </h1>

      <p className="text-lead mob-15 mt-3.5 max-w-[37.5rem] text-[#444444] md:col-start-1 md:row-start-2 md:mt-[1.625rem] md:leading-[1.6] md:text-[#222222]">
        {t.home.hero.subtitle}
      </p>

      <div className="compass-box mx-auto mt-5 aspect-square w-[92%] max-w-[21.25rem] md:col-start-2 md:row-span-3 md:row-start-1 md:mx-0 md:mt-12 md:w-full md:max-w-none">
        <Compass />
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-4 md:col-start-1 md:row-start-3 md:mt-10 md:flex-row md:flex-wrap md:items-start md:gap-3">
        {/* Телефон: одна широка кнопка і текстове посилання під нею */}
        <button
          type="button"
          onClick={openModal}
          className="flex h-14 items-center justify-center gap-2.5 bg-brand-orange text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white md:hidden"
        >
          {t.common.freeConsultation} <span aria-hidden>→</span>
        </button>
        <LocaleLink
          href="/services"
          className="self-center px-1 py-1.5 text-[0.9375rem] font-semibold text-[#222222] underline decoration-brand-orange decoration-2 underline-offset-[5px] md:hidden"
        >
          {t.home.hero.ourServices}
        </LocaleLink>

        {/* Десктоп: дві анімовані кнопки */}
        <div className="hidden md:flex md:flex-wrap md:gap-3">
          <AnimatedButton variant="primary" onClick={openModal}>
            {t.common.freeConsultation}
          </AnimatedButton>
          <AnimatedButton variant="outline" href="/services">
            {t.home.hero.ourServices}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
