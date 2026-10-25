'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import { usePathname, useRouter } from 'next/navigation';
import { mainNav } from '@/lib/nav';
import { scrollToLead } from '@/lib/leadAnchor';
import LocaleLink from '@/components/ui/LocaleLink';
import { useLocale, useT } from '@/i18n/LocaleProvider';
import { localePath } from '@/lib/i18n';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Мобільний хедер: 64px, бургер відкриває повноекранне меню на #141414.
 * Поки меню відкрите, скрол сторінки заблокований.
 */
export default function MobileHeader() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const t = useT();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Закриваємо меню при переході на іншу сторінку
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-[60] flex h-16 items-center justify-between bg-brand-orange px-5 md:hidden">
        <Logo size="mobile" />
        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="mobile" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
            aria-expanded={open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5"
          >
            <span
              className="h-0.5 w-6 bg-white transition-transform duration-[250ms]"
              style={{ transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }}
            />
            <span
              className="h-0.5 w-6 bg-white transition-opacity duration-[250ms]"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="h-0.5 w-6 bg-white transition-transform duration-[250ms]"
              style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu-enter fixed inset-x-0 bottom-0 top-16 z-[59] flex flex-col overflow-y-auto bg-[#141414] px-5 pb-8 pt-7 md:hidden">
          <nav className="flex flex-col">
            {mainNav.filter((i) => !i.locales || i.locales.includes(locale)).map((item) => (
              <LocaleLink
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-[#2A2A2A] py-3.5 text-2xl font-semibold ${
                  localePath(locale, item.href) === pathname ? 'text-brand-orange' : 'text-white'
                }`}
              >
                {t.nav[item.key]}
                <span className="text-xl text-brand-orange" aria-hidden>
                  →
                </span>
              </LocaleLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              // Меню закривається миттєво, прокрутка починається після нього
              window.setTimeout(() => scrollToLead((href) => router.push(href)), 60);
            }}
            className="mt-auto flex h-14 shrink-0 items-center justify-center bg-brand-orange text-base font-bold uppercase tracking-[0.02em] text-white"
          >
            {t.nav.contactCta}
          </button>
        </div>
      )}
    </>
  );
}
