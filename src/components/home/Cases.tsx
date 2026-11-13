'use client';

import React, { useRef } from 'react';
import { CASES } from '@/data/cases';
import CaseCard from '@/components/cases/CaseCard';
import { useT, useTr } from '@/i18n/LocaleProvider';

/**
 * Кейси: горизонтальна стрічка карток, що рухається по колу.
 *
 * Щоб цикл був безшовним, набір карток рендериться двічі. Коли прокрутка
 * заходить у другий набір, позицію миттєво зсуваємо на ширину одного набору —
 * для ока нічого не змінюється, а стрічку можна крутити нескінченно.
 */
export default function Cases() {
  const trackRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const tr = useTr();

  const animating = useRef(false);

  /** Ширина одного набору карток разом із проміжками. */
  const setWidth = (el: HTMLDivElement) => {
    const cards = [...el.children] as HTMLElement[];
    if (cards.length < 2) return 0;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    return step * CASES.length;
  };

  /**
   * Гортання на одну картку. Крок беремо з реальної геометрії, бо макет
   * масштабується разом із вікном.
   *
   * Прокручуємо вручну: `behavior: 'smooth'` разом зі `scroll-snap-type:
   * mandatory` у Chrome взаємно гасяться — браузер скасовує анімацію.
   */
  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el || animating.current) return;

    const cards = [...el.children] as HTMLElement[];
    if (cards.length < 2) return;

    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const loop = setWidth(el);

    // Ідемо назад з початку — спершу безшовно переносимось у другий набір
    if (direction < 0 && el.scrollLeft < step) {
      el.scrollLeft += loop;
    }

    const from = el.scrollLeft;
    const target = from + direction * step;
    const duration = 420;
    const start = performance.now();

    animating.current = true;
    el.style.scrollSnapType = 'none';

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      el.scrollLeft = from + (target - from) * eased;

      if (p < 1) {
        requestAnimationFrame(tick);
        return;
      }

      // Зайшли у другий набір — повертаємось на еквівалентну позицію першого
      if (el.scrollLeft >= loop) el.scrollLeft -= loop;
      el.style.scrollSnapType = '';
      animating.current = false;
    };
    requestAnimationFrame(tick);
  };

  return (
    <section id="cases" className="sec-y overflow-hidden bg-[#141414]">
      <div className="shell">
      <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
        {t.home.cases.eyebrow}
      </div>

      <div className="mt-4 flex items-end justify-between gap-10 md:pr-[5.375rem]">
        <h2 className="fs-46 mob-26 font-medium tracking-[0.005em] text-white">
          {t.home.cases.title}
        </h2>
        <div className="hidden flex-none gap-2.5 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scroll(dir)}
              aria-label={dir < 0 ? tr('Попередній кейс') : tr('Наступний кейс')}
              className="flex h-[2.875rem] w-[2.875rem] items-center justify-center border border-white text-[1.125rem] text-white transition-colors hover:bg-white hover:text-[#141414]"
            >
              {dir < 0 ? '←' : '→'}
            </button>
          ))}
        </div>
      </div>
      </div>

      <div
        ref={trackRef}
        className="cases-track mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:mt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[...CASES, ...CASES].map((item, cardIndex) => (
          <CaseCard
            key={`${item.id}-${cardIndex}`}
            item={item}
            duplicate={cardIndex >= CASES.length}
            className="snap-start"
          />
        ))}
      </div>
    </section>
  );
}
