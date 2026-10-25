'use client';

import React, { useRef } from 'react';
import { CASES } from '@/data/cases';
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
          <article
            key={`${item.id}-${cardIndex}`}
            aria-hidden={cardIndex >= CASES.length || undefined}
            className="card-case relative h-[34.6875rem] w-[18.75rem] flex-none snap-start overflow-hidden rounded md:w-[21.25rem]"
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
              aria-label={`${t.home.cases.eyebrow}: ${item.name}`}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${item.tint} 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 45%, rgba(10,10,10,.85) 68%, #0d0d0d 100%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col px-[1.625rem] pb-7 pt-[1.875rem] text-white">
              <div className="text-[1.375rem] font-semibold uppercase leading-[1.15] tracking-[0.01em]">
                {item.name}
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

              {/* Сторінка кейсу зʼявиться на етапі 5 — поки це не посилання */}
              <span className="mt-[1.875rem] flex h-[2.125rem] items-center gap-2 self-start bg-white px-4 text-sm font-medium text-[#141414]">
                {t.common.more} <span aria-hidden>→</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
