'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Стрічка логотипів клієнтів: безшовний цикл на 30 секунд.
 *
 * Логотипи лежать окремими файлами (раніше це була одна склеєна смужка,
 * у якій останній логотип був обрізаний): так кожен має власну висоту
 * з макета, свій alt і нічого не ріжеться.
 */

/**
 * [файл, назва, висота в одиницях макета].
 *
 * Усі файли перефарбовані в один сірий. Висоти підібрані за однаковою
 * площею логотипа: широкі (Anna Sposa) нижчі, квадратні (flid) вищі —
 * так рядок виглядає рівним, а не «стрибає».
 */
const LOGOS: [string, string, number][] = [
  ['logo-kan.png', 'KAN Development', 60],
  ['logo-herbalife.png', 'Herbalife', 37],
  ['logo-flid.png', 'flid', 56],
  ['logo-natabelz.png', 'Nata Belz', 45],
  ['logo-michael-graves.png', 'Michael Graves Design', 56],
  ['logo-anna-sposa.png', 'Anna Sposa Group', 26],
  ['logo-beauty-brand.png', 'Beauty Brand Pro', 36],
];

export default function ClientsMarquee() {
  const t = useT();

  const strip = (hidden = false) => (
    <div className="flex flex-none items-center gap-12 pr-12 md:gap-16 md:pr-16">
      {LOGOS.map(([file, name, height]) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={file}
          src={`/clients/${file}`}
          alt={hidden ? '' : name}
          aria-hidden={hidden || undefined}
          className="block w-auto flex-none object-contain"
          style={{ height: `calc(${height} * var(--u))` }}
        />
      ))}
    </div>
  );

  return (
    <section className="pb-10 pt-12 md:pt-[4.75rem]">
      <div className="shell">
        <div className="text-base font-medium text-[#222222] md:text-[1.0625rem]">
          {t.home.clients.title}
        </div>
        <div className="mt-7 -ml-1.5 overflow-hidden">
          <div className="logos-marquee flex w-max">
            {strip()}
            {strip(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
