'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  activeLocales,
  localeFromPath,
  localeNames,
  localePath,
  locales,
  pathWithoutLocale,
  type Locale,
} from '@/lib/i18n';

/**
 * Перемикач мови. EN і SK показуються позначкою «скоро», поки їхніх
 * сторінок немає — щоб не вести в 404.
 */
export default function LanguageSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
  const pathname = usePathname() || '/';
  const current = localeFromPath(pathname);
  const basePath = pathWithoutLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  /**
   * Адреса сторінки іншою мовою. Статті блогу мають свій slug для кожної мови,
   * тож спершу дивимося hreflang-посилання в <head> — їх пише сама сторінка.
   * Викликається лише з відкритого меню, тобто вже в браузері.
   */
  const hrefFor = (loc: Locale) => {
    const alt = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${loc}"]`);
    if (alt) return new URL(alt.href).pathname;
    // Статті цією мовою немає — ведемо на список блогу, а не в 404
    if (basePath.startsWith('/blog/')) return localePath(loc, '/blog');
    return localePath(loc, basePath);
  };

  const btnSize = variant === 'desktop' ? 'h-[2.5625rem] w-[4.5rem]' : 'h-10 min-w-12 px-2.5';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Обрати мову"
        className={`${btnSize} flex items-center justify-center gap-1.5 border-2 border-white bg-transparent text-sm font-bold text-white transition-colors hover:bg-white/10`}
      >
        {localeNames[current].code}
        <svg
          viewBox="0 0 10 6"
          className="h-[0.375rem] w-[0.625rem] shrink-0 fill-current transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          aria-hidden
        >
          <path d="M0 0h10L5 6z" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[3.0625rem] z-[70] flex min-w-[11.5625rem] flex-col bg-white shadow-[0_12px_32px_rgba(0,0,0,.18)]"
        >
          {locales.map((loc: Locale) => {
            const isCurrent = loc === current;
            const isActive = activeLocales.includes(loc);
            const content = (
              <>
                <span>{localeNames[loc].name}</span>
                <span className="text-[0.8125rem] tracking-[0.06em]">
                  {isActive ? localeNames[loc].code : 'скоро'}
                </span>
              </>
            );
            const base =
              'flex h-[2.875rem] items-center justify-between gap-4 px-[1.125rem] text-[0.9375rem] font-semibold';

            if (!isActive) {
              return (
                <span key={loc} className={`${base} cursor-default text-neutral-400`} aria-disabled>
                  {content}
                </span>
              );
            }
            return (
              <a
                key={loc}
                href={hrefFor(loc)}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`${base} hover:bg-orange-100 ${
                  isCurrent ? 'bg-orange-100 text-brand-orange' : 'text-[#222222]'
                }`}
              >
                {content}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
