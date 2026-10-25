'use client';

import React from 'react';
import { useContactModal } from '@/components/ContactModalProvider';
import { useT } from '@/i18n/LocaleProvider';
import AnimatedButton from '@/components/ui/AnimatedButton';
import FunnelAnimation from './FunnelAnimation';

/**
 * «7 з 10 кладуть товар у кошик і йдуть».
 *
 * Десктоп: анімація ліворуч, текст праворуч.
 * Телефон: напис і заголовок, потім анімація, далі текст і кнопка —
 * саме такий порядок у мобільному макеті.
 *
 * Елементи лежать прямо в контейнері: на телефоні це колонка, на десктопі
 * вони розкладаються по комірках сітки.
 */
export default function LostSales() {
  const { openModal } = useContactModal();
  const t = useT();

  return (
    <section className="sec-y bg-white">
      <div className="shell flex flex-col md:grid md:grid-cols-[minmax(0,32.9375rem)_minmax(0,1fr)] md:items-center md:gap-x-14">
        {/* Анімація: на телефоні третім блоком, на десктопі — ліва колонка */}
        <div className="order-3 mt-5 w-full md:order-none md:col-start-1 md:row-span-4 md:row-start-1 md:mt-0">
          <div className="relative aspect-[1530/1020] w-full overflow-hidden rounded bg-[#141414] md:aspect-[527/351]">
            <FunnelAnimation stroke={4} />
          </div>
        </div>

        <div className="order-1 text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-brand-orange md:order-none md:col-start-2 md:row-start-1 md:ml-[2.625rem] md:text-sm md:tracking-[0.02em]">
          {t.home.lostSales.eyebrow}
        </div>

        <div className="order-2 mt-3 flex items-start gap-4 md:order-none md:col-start-2 md:row-start-2 md:mt-[1.375rem]">
          <span
            aria-hidden
            className="mt-2.5 hidden h-5 w-5 flex-none items-center justify-center rounded-full border-[2.5px] border-brand-orange md:flex"
          >
            <span className="h-2 w-2 rounded-full border-2 border-brand-orange" />
          </span>
          <h2 className="fs-43 mob-27 font-bold text-[#222222]">
            {t.home.lostSales.title}
          </h2>
        </div>

        <p className="mob-16 order-4 mt-5 max-w-[42.5rem] text-base text-[#222222] md:order-none md:col-start-2 md:row-start-3 md:mt-7 md:text-[1.0625rem] md:leading-[1.22]">
          {t.home.lostSales.text}
        </p>

        <div className="order-5 mt-6 flex md:order-none md:col-start-2 md:row-start-4 md:mt-7">
          <AnimatedButton variant="primary" onClick={openModal}>
            {/* На телефоні коротка мітка — довга в макеті не вміщається */}
            <span className="md:hidden">{t.home.lostSales.ctaShort}</span>
            <span className="hidden md:inline">{t.home.lostSales.cta}</span>
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
