'use client';

import React from 'react';
import Link from '@/components/ui/LocaleLink';
import { usePathname, useRouter } from 'next/navigation';
import { mainNav } from '@/lib/nav';
import { scrollToLead } from '@/lib/leadAnchor';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/LocaleProvider';
import { localePath } from '@/lib/i18n';
import { useLocale } from '@/i18n/LocaleProvider';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import MobileHeader from './MobileHeader';

/**
 * Десктопний хедер: sticky, 82px, брендовий фон, падінги 80px.
 * Підкреслення пункту навігації «виростає» на ховері за .25s.
 * < 768px рендериться MobileHeader.
 */
export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const t = useT();
  const locale = useLocale();

  return (
    <>
      {/* Десктопний хедер — від 768. Нижче працює мобільний із бургером.
          Перебудов між 768 і 1920 немає: макет просто масштабується. */}
      <header className="sticky top-0 z-[60] hidden bg-brand-orange md:block">
        <div className="shell h-header flex h-[5.125rem] items-center justify-between">
        <Logo />

        <nav className="flex gap-[1.4375rem] text-sm font-medium text-white">
          {mainNav.filter((i) => !i.locales || i.locales.includes(locale)).map((item) => {
            const isCurrent = localePath(locale, item.href) === pathname;
            return (
              <LocaleLink
                key={item.key}
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className="group relative py-1 text-white"
              >
                {t.nav[item.key]}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-white transition-[width] duration-[250ms] ${
                    isCurrent ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden
                />
              </LocaleLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-[1.125rem]">
          <button
            type="button"
            onClick={() => scrollToLead((href) => router.push(href))}
            className="flex h-[2.5625rem] items-center bg-white px-6 text-sm font-bold uppercase tracking-[0.02em] text-brand-orange transition-colors hover:bg-orange-50"
          >
            {t.nav.contactCta}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
      </header>

      <MobileHeader />
    </>
  );
}
