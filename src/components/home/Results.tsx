'use client';

import React from 'react';
import { useContactModal } from '@/components/ContactModalProvider';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useT, useTr } from '@/i18n/LocaleProvider';

/** «Результат, а не процес» — чотири принципи роботи списком. */

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#FF5B2B',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ROWS = [
  {
    n: '01',
    title: 'Чіткі цілі',
    text: 'Перед стартом визначаємо цілі бізнесу, ключові ринки та KPI — щоб кожен етап роботи наближав вас до зростання продажів.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
  },
  {
    n: '02',
    title: 'Фокус на дохід',
    text: 'Оцінюємо успіх за реальним зростанням продажів, прибутку та масштабуванням бізнесу, а не кількістю виконаних завдань.',
    icon: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  },
  {
    n: '03',
    title: 'Прозорий процес',
    text: 'Аналіз → Стратегія → Запуск → Масштабування — на кожному етапі ви розумієте, що робимо і навіщо.',
    icon: <path d="M6 20V10M12 20V4M18 20v-7" />,
  },
  {
    n: '04',
    title: 'Регулярна звітність',
    text: 'Регулярно показуємо результати, ключові показники та наступні кроки, щоб ви завжди бачили розвиток проєкту.',
    icon: <path d="M4 12l5 5L20 6" />,
  },
];

export default function Results() {
  const { openModal } = useContactModal();
  const t = useT();
  const tr = useTr();

  return (
    <section id="about" className="sec-y bg-[#EEEEEE]">
      <div className="shell">
      <div className="grid items-center gap-4 grid-results">
        <h2 className="fs-46 mob-30 font-bold text-[#222222]">
          {t.home.results.title}
        </h2>
        <p className="mob-15 max-w-[20.625rem] text-[0.9375rem] leading-[1.42] text-[#222222]">
          {t.home.results.text}
        </p>
      </div>

      <div className="mt-10 flex flex-col md:mt-[3.75rem]">
        {ROWS.map((row) => (
          <div
            key={row.n}
            className="grid-results grid items-center gap-3 border-b border-[#D2D2D2] pb-6 pt-[1.375rem] md:h-[11.0625rem] md:pb-0 md:pt-0"
          >
            <div className="flex items-center">
              <span className="mob-30 w-12 flex-none text-[2.125rem] font-bold tracking-[-0.01em] text-[#222222] md:w-[7rem] md:text-[3.3125rem]">
                {row.n}
              </span>
              <svg {...ICON_PROPS} aria-hidden className="flex-none">
                {row.icon}
              </svg>
              {/* У макеті назва рядка — 48px/700, а не дрібний підзаголовок */}
              <span className="fs-48 mob-23 ml-3 font-bold tracking-[-0.005em] text-[#222222] md:ml-4">
                {tr(row.title)}
              </span>
            </div>
            <p className="mob-15 mt-3 text-[0.9375rem] leading-[1.42] text-[#222222] md:mt-0">{tr(row.text)}</p>
          </div>
        ))}
      </div>

      {/* У макеті кнопка по центру, відступ зверху 50px */}
      <div className="mt-8 flex md:mt-[3.125rem] md:justify-center">
        <AnimatedButton variant="primary" onClick={openModal}>
          {t.common.discussProject}
        </AnimatedButton>
      </div>
      </div>
    </section>
  );
}
