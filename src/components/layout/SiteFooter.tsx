'use client';

import React from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { contacts, footerColumns, legalLinks } from '@/lib/nav';
import { useLocale, useT } from '@/i18n/LocaleProvider';
import { openConsentSettings } from '@/lib/consent';
import FooterLogo from './FooterLogo';
import SocialLinks from './SocialLinks';
import { FooterLegal } from '@/components/legal/LegalText';

/**
 * Футер. Десктоп — п'ять колонок (логотип + Навігація, Компанія,
 * Інструменти, Контакти), мобільний — логотип і сітка посилань у дві колонки.
 */
/**
 * showConsentSettings — кнопка «Налаштування cookies». У кабінеті клієнта
 * банера cookies й аналітики немає, тож там кнопку ховаємо.
 */
export default function SiteFooter({ showConsentSettings = true }: { showConsentSettings?: boolean } = {}) {
  const t = useT();
  const locale = useLocale();

  /** Текст колонки футера: пункти меню й назви інструментів в одному списку. */
  const linkLabel = (key: string) =>
    (t.nav as Record<string, string>)[key] ?? (t.footer.tools as Record<string, string>)[key] ?? key;

  return (
    <footer className="bg-[#141414] pb-7 pt-11 text-white md:pb-12 md:pt-[4.0625rem]">
      <div className="shell">
      {/* --- Десктоп --- */}
      {/* Сітка з макета (420/198/158/319/решта), масштабована тією ж --u */}
      <div className="footer-grid hidden md:grid md:items-start">
        <div className="flex flex-col">
          <FooterLogo />
          <p className="mt-[1.6875rem] max-w-[18.75rem] text-base leading-[1.4] text-[#DADADA]">{t.footer.about}</p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.key} className="flex flex-col gap-7 pt-[0.3125rem]">
            <span className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
              {t.footer.columns[col.key]}
            </span>
            {col.links.filter((l) => !l.locales || l.locales.includes(locale)).map((link) => (
              <LocaleLink
                key={link.key}
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="text-base leading-[1.3] text-white transition-colors hover:text-brand-orange"
              >
                {linkLabel(link.key)}
              </LocaleLink>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-7 pt-[0.3125rem]">
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
            {t.footer.columns.contacts}
          </span>
          <a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-white transition-colors hover:text-brand-orange"
          >
            Telegram
          </a>
          <a
            href={`mailto:${contacts.email}`}
            className="whitespace-nowrap text-base text-white transition-colors hover:text-brand-orange"
          >
            {contacts.email}
          </a>
          <a
            href={`tel:${contacts.phone.replace(/[^+\d]/g, '')}`}
            className="text-base text-white transition-colors hover:text-brand-orange"
          >
            {contacts.phone}
          </a>
          <a
            href={`tel:${contacts.phoneSkRaw}`}
            className="text-base text-white transition-colors hover:text-brand-orange"
          >
            {contacts.phoneSk}
          </a>
          <SocialLinks />
        </div>
      </div>

      {/* --- Мобільний --- */}
      <div className="md:hidden">
        <FooterLogo size={132} />
        <p className="mt-[1.125rem] text-[0.9375rem] leading-[1.45] text-[#DADADA]">{t.footer.about}</p>

        <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8">
          {footerColumns.map((col) => (
            <div key={col.key} className="flex flex-col gap-1">
              <span className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
                {t.footer.columns[col.key]}
              </span>
              {col.links.filter((l) => !l.locales || l.locales.includes(locale)).map((link) => (
                <LocaleLink
                  key={link.key}
                  href={link.href}
                  className="break-words py-1.5 text-[0.9375rem] leading-[1.3] text-white"
                >
                  {linkLabel(link.key)}
                </LocaleLink>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <span className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8A8A8A]">
              {t.footer.columns.contacts}
            </span>
            <a href={contacts.telegram} className="py-1.5 text-[0.9375rem] text-white">
              Telegram
            </a>
            <a href={`mailto:${contacts.email}`} className="break-words py-1.5 text-[0.9375rem] text-white">
              {contacts.email}
            </a>
            <a
              href={`tel:${contacts.phone.replace(/[^+\d]/g, '')}`}
              className="py-1.5 text-[0.9375rem] text-white"
            >
              {contacts.phone}
            </a>
            <a href={`tel:${contacts.phoneSkRaw}`} className="py-1.5 text-[0.9375rem] text-white">
              {contacts.phoneSk}
            </a>
          </div>
        </div>

        <div className="mt-7">
          <SocialLinks />
        </div>
      </div>

      {/* --- Реквізити (тексти й дані — з lib/legal-entities) --- */}
      <FooterLegal className="mt-8 flex flex-col gap-1 border-t border-[#3A3A3A] pt-[1.125rem] text-[0.8125rem] leading-[1.5] text-[#8A8A8A] md:mt-[2.625rem] md:border-[#5A5A5A] md:pt-[1.375rem] md:text-sm" />

      {/* --- Нижній рядок --- */}
      <div className="mt-5 flex flex-col gap-2.5 text-[0.8125rem] text-[#8A8A8A] md:mt-6 md:flex-row md:justify-between md:text-sm">
        <span>© {new Date().getFullYear()} Koshman Ecom</span>
        <div className="flex flex-col gap-2.5 md:flex-row md:gap-7">
          {legalLinks.map((link) => (
            <LocaleLink
              key={link.key}
              href={link.href}
              className="text-[#8A8A8A] hover:text-white"
            >
              {t.footer[link.key]}
            </LocaleLink>
          ))}
          {/* Відкликати чи змінити згоду має бути так само просто, як дати (GDPR) */}
          {showConsentSettings ? (
            <button
              type="button"
              onClick={openConsentSettings}
              className="text-left text-[#8A8A8A] hover:text-white"
            >
              {t.cookie.settings}
            </button>
          ) : null}
        </div>
      </div>
    </div>
    </footer>
  );
}
