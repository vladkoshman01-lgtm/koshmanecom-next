'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Вміст сторінки 404 за прототипом 404.dc.html: велика градієнтна цифра,
 * з-за якої визирає кіт Марс із реплікою, і список популярних розділів.
 * Використовується і в глобальній 404 (невідомі адреси), і в notFound().
 */

/** Популярні розділи: ключ меню → адреса (текст береться мовою сторінки). */
const SECTIONS: ['services' | 'cases' | 'about' | 'tools' | 'blog' | 'career', string][] = [
  ['services', '/services'],
  ['cases', '/#cases'],
  ['about', '/about'],
  ['tools', '/tools'],
  ['blog', '/blog'],
  ['career', '/career'],
];

export default function NotFoundContent() {
  const t = useT();

  return (
    <section className="bg-[#141414]">
      <div className="shell grid gap-12 py-14 md:min-h-[calc(100vh-5.125rem)] md:grid-cols-[minmax(0,1fr)_27.5rem] md:items-end md:gap-20 md:pb-[6.875rem] md:pt-[6.25rem]">
        <div className="flex flex-col">
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange md:text-sm">
            {t.notFound.eyebrow}
          </div>

          {/* Цифра задає масштаб котові: він у em, тож росте разом із нею */}
          <div className="relative mt-[0.42em] self-start text-[9rem] leading-[0.9] md:text-[21.25rem]">
            <div className="mars-404-peek absolute bottom-[calc(100%-0.2em)] left-[0.56em] z-0 w-[0.6em]">
              <div className="mars-404-bubble absolute left-full top-[22%] ml-2.5 whitespace-nowrap bg-white px-4 py-2.5 text-[0.9375rem] font-bold leading-[1.2] text-[#141414] shadow-[0_10px_28px_rgba(0,0,0,.25)]">
                {t.notFound.bubble}
              </div>
              <svg viewBox="0 0 160 130" className="block h-auto w-full" aria-hidden>
                <path
                  d="M30 70 L38 12 L72 42 Z M130 70 L122 12 L88 42 Z"
                  fill="#141414"
                  stroke="#3A3A3A"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M40 52 L43 26 L60 42 Z M120 52 L117 26 L100 42 Z" fill="#FF5B2B" />
                <ellipse cx="80" cy="80" rx="54" ry="46" fill="#141414" stroke="#3A3A3A" strokeWidth="2" />
                <g className="mars-404-blink">
                  <ellipse cx="60" cy="76" rx="10" ry="12" fill="#fff" />
                  <ellipse cx="100" cy="76" rx="10" ry="12" fill="#fff" />
                  <g className="mars-404-look">
                    <ellipse cx="60" cy="78" rx="4.5" ry="8" fill="#141414" />
                    <ellipse cx="100" cy="78" rx="4.5" ry="8" fill="#141414" />
                  </g>
                </g>
                <path d="M75 94 L85 94 L80 100 Z" fill="#FF8A5C" />
                <path d="M80 100 Q74 106 68 103 M80 100 Q86 106 92 103" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path
                  d="M48 94 L20 90 M48 100 L22 104 M112 94 L140 90 M112 100 L138 104"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity=".7"
                />
              </svg>
            </div>
            <div className="mars-404-digits relative z-[1] text-[1em] font-extrabold leading-[0.9] tracking-[-0.04em]">
              404
            </div>
          </div>

          <h1 className="fs-56 mob-30 mt-6 font-bold text-white md:mt-7">{t.notFound.title}</h1>
          <p className="mob-16 mt-4 max-w-[35rem] text-base leading-[1.55] text-[#CFCFCF] md:mt-[1.125rem] md:text-[1.125rem]">
            {t.notFound.text}
          </p>

          <div className="mt-7 flex flex-col gap-3 md:mt-10 md:flex-row md:gap-[0.9375rem]">
            <Link
              href="/"
              className="flex h-14 items-center justify-center bg-brand-orange px-8 text-base font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-[#E64A1C] md:h-[3.5625rem]"
            >
              {t.notFound.helpMars} <span className="ml-2.5 font-medium" aria-hidden>→</span>
            </Link>
            <Link
              href="/contacts"
              className="flex h-14 items-center justify-center border-2 border-white px-[1.875rem] text-base font-bold uppercase tracking-[0.02em] text-white transition-colors hover:bg-white hover:text-[#141414] md:h-[3.5625rem]"
            >
              {t.notFound.contact}
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="pb-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
            {t.notFound.popular}
          </span>
          {SECTIONS.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="flex items-center justify-between border-t border-[#2C2C2C] py-[1.125rem] text-lg font-semibold text-white transition-colors hover:text-brand-orange md:text-xl"
            >
              <span>{t.nav[key]}</span>
              <span className="text-[1.125rem]" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
