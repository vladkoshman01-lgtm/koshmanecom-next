'use client';

import React, { useState } from 'react';
import { useContactModal } from '@/components/ContactModalProvider';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useT, useTr } from '@/i18n/LocaleProvider';

/**
 * Відгуки: три картки, активна виступає вперед і переставляється в центр
 * (через CSS `order`, як у макеті). Клік по картці або стрілки міняють активну.
 *
 * Перша картка світла — скріншот листування з текстом під ним.
 * Дві інші темні — фото на всю картку, текст поверх градієнта, кнопка відео.
 */

type Review = {
  id: string;
  image: string;
  imageAlt: string;
  /** Рядок або [звичайний, помаранчевий, хвіст] — усі частини перекладні. */
  metric: string | string[];
  text: string;
  author: string;
  role: string;
  /** Посилання на відео-відгук. Поки порожнє — кнопка показується, але не клікається. */
  video: string | null;
};

const REVIEWS: Review[] = [
  {
    id: 'iryna',
    image: '/reviews/review-irina-chat.webp',
    imageAlt: 'Повідомлення від Ірини',
    metric: '+320% конверсія',
    text: 'Розробка висококонверсійного інтернет-магазину для продукту в ніші краси',
    author: 'Ірина',
    role: 'Засновниця · Проект під NDA, але відгук ні',
    video: null,
  },
  {
    id: 'natalia-beauty',
    image: '/reviews/review-natalia-beauty.webp',
    imageAlt: 'Наталія, Beauty Brand Pro',
    // Перший рядок звичайний, другий помаранчевий — обидва перекладні
    metric: ['Зекономлено', '+20 000$ / рік'],
    text: '«Ви зекономили мені більше 20 тисяч доларів на рік завдяки альтернативній платформі замість Shopify B2B пакету»',
    author: 'Наталія',
    role: 'Засновниця · Beauty Brand Pro',
    video: null,
  },
  {
    id: 'natalia-natabelz',
    image: '/reviews/review-natalia-natabelz.webp',
    imageAlt: 'Наталія, NataBelz',
    metric: ['', 'Система продажів', ' на міжнародному ринку'],
    text: '«Людяний, структурний підхід, реалізація зазначених планів, яка дає результат»',
    author: 'Наталія',
    role: 'Засновниця · NataBelz',
    video: null,
  },
];

function toEmbed(url: string) {
  const yt = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

/** Збирає метрику відгуку з перекладених частин. */
function renderMetric(metric: string | string[], tr: (s: string) => string) {
  if (typeof metric === 'string') return tr(metric);
  const [plain, accent, tail] = metric;
  return (
    <>
      {plain ? (
        <>
          {tr(plain)}
          <br />
        </>
      ) : null}
      {accent ? <span className="text-brand-orange">{tr(accent)}</span> : null}
      {tail ? tr(tail) : null}
    </>
  );
}

export default function Reviews() {
  const t = useT();
  const tr = useTr();
  const { openModal } = useContactModal();
  const [active, setActive] = useState(1);
  const [video, setVideo] = useState<string | null>(null);

  const move = (step: number) => setActive((i) => (i + step + REVIEWS.length) % REVIEWS.length);

  return (
    <section id="reviews" className="sec-y bg-[#EEEEEE]">
      <div className="shell max-md:px-0">
        <div className="px-5 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:px-0">
          {t.home.reviews.eyebrow}
        </div>

        <div className="mt-2.5 flex items-end justify-between gap-10 px-5 md:mt-4 md:px-0">
          <h2 className="fs-48 mob-26 font-bold text-[#222222]">{t.home.reviews.title}</h2>
          <div className="hidden flex-none gap-2.5 md:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => move(dir)}
                aria-label={dir < 0 ? tr('Попередній відгук') : tr('Наступний відгук')}
                className="flex h-[2.875rem] w-[2.875rem] items-center justify-center border border-[#222222] text-[1.125rem] text-[#222222] transition-colors hover:bg-white"
              >
                {dir < 0 ? '←' : '→'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10 md:grid md:grid-cols-3 md:items-center md:gap-6 md:overflow-visible md:px-0">
          {REVIEWS.map((review, i) => {
            const isActive = i === active;
            const common = {
              onClick: () => setActive(i),
              // Збільшення активної картки — лише на десктопі: на телефоні
              // картки гортаються каруселлю
              scaleClass: isActive ? 'md:scale-[1.056]' : '',
              style: {
                boxShadow: isActive ? '0 22px 44px rgba(0,0,0,.28)' : 'none',
                zIndex: isActive ? 2 : 1,
                // Зсув на одиницю ставить активну картку посередині, як у макеті
                order: (i - active + 1 + REVIEWS.length) % REVIEWS.length,
              } as React.CSSProperties,
            };

            // Світла картка зі скріншотом листування
            if (!review.video && review.id === 'iryna') {
              return (
                <article
                  key={review.id}
                  onClick={common.onClick}
                  style={common.style}
                  className={`${common.scaleClass} relative flex h-[27.5rem] w-[18.75rem] flex-none snap-start cursor-pointer flex-col overflow-hidden rounded bg-white transition-[transform,box-shadow] duration-[350ms] md:h-[28.125rem] md:w-auto`}
                >
                  <div className="flex h-[10.625rem] flex-none items-center justify-center bg-[#222] px-2 md:h-[13.25rem] md:px-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={review.image} alt={tr(review.imageAlt)} className="block h-auto w-full" />
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-6 md:px-[1.875rem] md:pb-[1.875rem] md:pt-[2.125rem]">
                    {/* На телефоні метрику ховаємо: у картці 300×440 вона
                        виштовхувала підпис автора за край */}
                    <div className="hidden text-[1.8125rem] font-semibold leading-[1.15] text-brand-orange md:block">
                      {renderMetric(review.metric, tr)}
                    </div>
                    <div className="text-base leading-[1.4] text-[#222222] md:mt-[0.875rem] md:text-[1.0625rem] md:leading-[1.35]">
                      {tr(review.text)}
                    </div>
                    <div className="mt-auto pt-6">
                      <div className="text-[1.125rem] font-semibold text-[#222222]">
                        {tr(review.author)}
                      </div>
                      <div className="mt-1.5 text-[0.9375rem] text-[#8A8A8A]">{tr(review.role)}</div>
                    </div>
                  </div>
                </article>
              );
            }

            // Темна картка: фото на всю площу, текст поверх градієнта
            return (
              <article
                key={review.id}
                onClick={common.onClick}
                style={common.style}
                className={`${common.scaleClass} relative h-[27.5rem] w-[18.75rem] flex-none snap-start cursor-pointer overflow-hidden rounded bg-[#2a2a2a] transition-[transform,box-shadow] duration-[350ms] md:h-[28.125rem] md:w-auto`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.image}
                  alt={tr(review.imageAlt)}
                  className="absolute inset-0 block h-full w-full object-cover object-top"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(20,20,20,.7) 55%, rgba(20,20,20,.95) 80%)',
                  }}
                />

                <span
                  role={review.video ? 'button' : undefined}
                  tabIndex={review.video ? 0 : undefined}
                  onClick={
                    review.video
                      ? (e) => {
                          e.stopPropagation();
                          setVideo(review.video);
                        }
                      : undefined
                  }
                  aria-label={review.video ? tr('Дивитись відео-відгук') : undefined}
                  className="absolute left-1/2 top-[36%] z-[3] flex h-[3.4375rem] w-[3.4375rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-orange transition-transform hover:scale-110"
                >
                  <span
                    className="ml-1 h-0 w-0"
                    style={{
                      borderLeft: '0.9375rem solid #fff',
                      borderTop: '0.5625rem solid transparent',
                      borderBottom: '0.5625rem solid transparent',
                    }}
                  />
                </span>

                <div className="pointer-events-none absolute bottom-6 left-6 right-6 text-white md:bottom-[2.125rem] md:left-[1.9375rem] md:right-[1.9375rem]">
                  {/* На телефоні лише коментар і автор — інакше текст
                      закривав фото клієнта */}
                  <div className="hidden text-[1.8125rem] font-semibold leading-[1.15] md:block">
                    {renderMetric(review.metric, tr)}
                  </div>
                  <div className="text-base leading-[1.4] md:mt-[0.875rem] md:text-[1.0625rem] md:leading-[1.35]">
                    {tr(review.text)}
                  </div>
                  <div className="mt-6">
                    <div className="text-[1.125rem] font-semibold">{tr(review.author)}</div>
                    <div className="mt-1.5 text-[0.9375rem] text-[#CFCFCF]">{tr(review.role)}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Крапки-індикатори */}
        <div className="mt-6 flex justify-center gap-1.5 px-5 md:mt-[2.625rem] md:px-0">
          {REVIEWS.map((review, i) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Відгук ${i + 1}`}
              className="h-[0.4375rem] rounded transition-[width,background] duration-300"
              style={{
                width: i === active ? '1.375rem' : '0.4375rem',
                background: i === active ? '#FF5B2B' : '#D0D0D0',
              }}
            />
          ))}
        </div>

        <div className="mt-6 flex px-5 md:mt-12 md:justify-center md:px-0">
          <AnimatedButton variant="primary" onClick={openModal}>
            {t.home.reviews.cta}
          </AnimatedButton>
        </div>
      </div>

      {video ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-5"
          role="dialog"
          aria-label="Відео-відгук"
          onClick={() => setVideo(null)}
        >
          <div className="aspect-video w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={toEmbed(video)}
              title="Відео-відгук"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
