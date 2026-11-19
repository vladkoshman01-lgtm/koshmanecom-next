'use client';

import React from 'react';
import { CARD_GRADIENTS } from '@/data/services';
import { contacts } from '@/lib/nav';
import { useLocale, useT, useTr } from '@/i18n/LocaleProvider';
import { companyDetailsRows } from '@/components/legal/LegalText';

/** Сторінка «Контакти» за прототипом Contacts.dc.html. */

type Card = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: string;
  gradient?: string;
  arrow: string;
  wide?: boolean;
};

const MAIN: Card[] = [
  {
    label: 'Telegram',
    value: 'Написати менеджеру',
    href: contacts.telegramManager,
    external: true,
    icon: 'M21 3L3 10.5l7 3 3 7.5L21 3zM10 13.5L21 3',
    gradient: CARD_GRADIENTS.blue,
    arrow: '↗',
  },
  {
    label: 'WhatsApp',
    value: 'Написати менеджеру',
    href: contacts.whatsapp,
    external: true,
    icon: 'M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z',
    gradient: CARD_GRADIENTS.orange,
    arrow: '↗',
  },
];

const REST: Card[] = [
  {
    label: 'Телефон · Україна',
    value: contacts.phone,
    href: `tel:${contacts.phoneRaw}`,
    icon: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    arrow: '→',
  },
  {
    label: 'Телефон · Словаччина',
    value: contacts.phoneSk,
    href: `tel:${contacts.phoneSkRaw}`,
    icon: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
    arrow: '→',
  },
  {
    label: 'Email',
    value: contacts.email,
    href: `mailto:${contacts.email}`,
    icon: 'M3 5h18v14H3zM3 6l9 7 9-7',
    arrow: '→',
  },
  {
    label: 'Офіси',
    value: contacts.offices,
    href: '#lead',
    icon: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5',
    arrow: '',
  },
];

const SOCIALS: [string, string][] = [
  ['Telegram', contacts.telegram],
  ['Instagram', contacts.instagram],
  ['LinkedIn', contacts.linkedin],
  ['YouTube', contacts.youtube],
];

function Icon({ d, size = 24 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export default function ContactsContent() {
  const t = useT();
  const tr = useTr();
  const locale = useLocale();
  return (
    <section className="bg-[#141414]">
      <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
        <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">{tr('Контакти')}</div>

        <div className="mt-4 grid gap-4 md:mt-[1.125rem] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20">
          <h1 className="fs-64 mob-32 font-bold text-white">{tr('Звʼяжіться з нами')}</h1>
          <p className="mob-16 text-base leading-[1.55] text-[#CFCFCF] md:text-[1.125rem]">{tr('Відповідаємо протягом робочого дня. Оберіть зручний спосіб або залиште заявку нижче.')}</p>
        </div>

        {/* Два головні канали */}
        <div className="mt-8 grid gap-2.5 md:mt-16 md:grid-cols-2 md:gap-[0.9375rem]">
          {MAIN.map((card) => (
            <a
              key={tr(card.label)}
              href={card.href}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noreferrer' : undefined}
              className="flow-card flex min-h-[11.25rem] flex-col justify-between p-6 text-white md:min-h-[18.75rem] md:p-8"
              style={{ background: card.gradient, backgroundSize: '135% 100%' }}
            >
              <span className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/20 md:h-[3.25rem] md:w-[3.25rem]">
                  <Icon d={card.icon} />
                </span>
                <span className="text-xl md:text-[1.75rem]" aria-hidden>
                  {card.arrow}
                </span>
              </span>
              <span className="flex flex-col gap-2.5">
                <span className="text-[2rem] font-bold leading-[1] tracking-[-0.015em] md:text-[3.5rem]">
                  {tr(card.label)}
                </span>
                <span className="text-[0.9375rem] text-white/85 md:text-[1.0625rem]">
                  {tr(card.value)}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* Решта контактів */}
        <div className="mt-2.5 grid gap-2.5 md:grid-cols-2 md:gap-[0.9375rem] xl:grid-cols-4">
          {REST.map((card) => (
            <a
              key={tr(card.label)}
              href={card.href}
              className="flex flex-col gap-2 bg-[#1F1F1F] px-5 py-5 text-white transition-colors hover:bg-[#2A2A2A] md:px-[1.625rem] md:py-6"
            >
              <span className="flex items-center gap-2.5 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A]">
                <Icon d={card.icon} size={16} />
                {tr(card.label)}
              </span>
              <span className="text-[1.0625rem] font-semibold leading-[1.3] md:text-xl">
                {tr(card.value)}
              </span>
            </a>
          ))}
        </div>

        {/* Реквізити s. r. o. — лише на словацькій і англійській версіях */}
        {locale === 'sk' || locale === 'en' ? (
          <div className="mt-2.5 bg-[#1F1F1F] px-5 py-5 text-white md:mt-[0.9375rem] md:px-[1.625rem] md:py-6">
            <h2 className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A]">
              {locale === 'sk' ? 'Fakturačné údaje' : 'Company details'}
            </h2>
            <dl className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
              {companyDetailsRows(locale).map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt className="text-[0.8125rem] text-[#8A8A8A]">{label}</dt>
                  <dd className="text-[0.9375rem] font-semibold leading-[1.35] md:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {/* Соцмережі */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#2C2C2C] pt-7 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-8 md:pt-8">
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A] md:text-sm">{tr('Ми в соцмережах')}</span>
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {SOCIALS.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center gap-2.5 border-[1.5px] border-[#3A3A3A] px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:border-brand-orange hover:bg-brand-orange md:h-[3.25rem] md:px-[1.375rem]"
              >
                {tr(name)}
                <span className="text-sm" aria-hidden>
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
