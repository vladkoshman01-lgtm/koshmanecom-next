'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import { contacts } from '@/lib/nav';
import { useT, useTr } from '@/i18n/LocaleProvider';


const STEPS: [string, string][] = [
  ['Менеджер звʼяжеться з вами', 'Протягом робочого дня, у месенджері або телефоном.'],
  ['Уточнимо задачу', 'Коротко розпитаємо про продукт, ринок і цілі.'],
  ['Надішлемо пропозицію', 'План робіт, строки та вартість.'],
];

/** Винесено зі сторінки, щоб ту саму розмітку рендерити всіма мовами. */
export default function ThanksContent() {
  const t = useT();
  const tr = useTr();
  return (
    <section className="bg-[#141414]">
      <div className="shell grid gap-12 py-14 md:min-h-[calc(100vh-5.125rem)] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20 md:py-[6.875rem]">
        <div className="flex flex-col">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange md:h-[4.5rem] md:w-[4.5rem]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12l5 5 9-10" />
            </svg>
          </div>
          <div className="mt-7 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:mt-10 md:text-sm">{tr('Заявку прийнято')}</div>
          <h1 className="fs-72 mob-34 mt-4 font-bold text-white md:mt-[1.125rem]">{tr('Дякуємо за заявку!')}</h1>
          <p className="mob-16 mt-4 max-w-[37.5rem] text-base leading-[1.55] text-[#CFCFCF] md:mt-[1.375rem] md:text-[1.125rem]">{tr('Менеджер звʼяжеться з вами протягом робочого дня, уточнить задачу й назве вартість.')}</p>

          <div className="mt-8 flex flex-col gap-3 md:mt-11 md:flex-row md:gap-[0.9375rem]">
            <Link
              href="/"
              className="flex h-14 items-center justify-center bg-brand-orange px-8 text-base font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C] md:h-[3.5625rem]"
            >{tr('На головну')}</Link>
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
              className="flex h-14 items-center justify-center gap-2.5 border-2 border-white px-[1.875rem] text-base font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-white hover:text-[#141414] md:h-[3.5625rem]"
            >{tr('Наш Telegram-канал')}<span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="pb-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">{tr('Що далі')}</span>
          {STEPS.map(([title, description], i) => (
            <div key={title} className="flex gap-5 border-t border-[#2C2C2C] py-[1.375rem]">
              <span className="flex-none pt-1 text-[0.8125rem] font-bold tracking-[0.12em] text-brand-orange md:text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-lg font-semibold text-white md:text-xl">{tr(title)}</span>
                <span className="text-[0.9375rem] leading-[1.5] text-[#8A8A8A]">{tr(description)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
