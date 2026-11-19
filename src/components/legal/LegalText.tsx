'use client';

import React from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useLocale } from '@/i18n/LocaleProvider';
import { CONTACT_EMAIL, fop, fopDetailsSuffix, sro } from '@/lib/legal-entities';

/**
 * Юридичні тексти, що залежать від реквізитів: блок у футері, «Fakturačné
 * údaje» на контактах і рядок під формами. Тексти затверджені — не
 * перефразовувати; дані підставляються з `lib/legal-entities`.
 */

/** Реквізити у футері — під кожну мову свій текст. */
export function FooterLegal({ className = '' }: { className?: string }) {
  const locale = useLocale();

  if (locale === 'uk') {
    return (
      <div className={className}>
        <p>
          Послуги під брендом Koshman Ecom в Україні надає ФОП {fop.name}
          {fopDetailsSuffix()}.
        </p>
        <p>
          Послуги для клієнтів з ЄС та інших країн надає {sro.name}, IČO {sro.companyId} (Словаччина).
        </p>
      </div>
    );
  }

  if (locale === 'sk') {
    return (
      <div className={className}>
        <p>
          Prevádzkovateľ: {sro.name}, {sro.street}, {sro.postalCode} {sro.cityFull}
        </p>
        <p>
          IČO: {sro.companyId} · DIČ: {sro.taxId} · IČ DPH: {sro.vatId}
        </p>
        <p>Zapísaná v Obchodnom registri Mestského súdu Bratislava III, oddiel {sro.registerSection}, vložka č. {sro.registerFile}</p>
        <p>
          Kancelária: {sro.office} · <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a> ·{' '}
          <a href={`tel:${sro.phoneRaw}`} className="hover:text-white">{sro.phone}</a>
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <p>
        Koshman Ecom is a brand of {sro.name}, {sro.street}, {sro.postalCode} {sro.city}, Slovakia
      </p>
      <p>
        Company ID (IČO): {sro.companyId} · Tax ID (DIČ): {sro.taxId} · EU VAT ID: {sro.vatId}
      </p>
      <p>
        Registered in the Commercial Register of the Bratislava III Municipal Court, Section {sro.registerSection}, File No.{' '}
        {sro.registerFile}
      </p>
      <p>
        Office: {sro.office} · <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">{CONTACT_EMAIL}</a> ·{' '}
        <a href={`tel:${sro.phoneRaw}`} className="hover:text-white">{sro.phone}</a>
      </p>
    </div>
  );
}

/** Рядки реквізитів s. r. o. для сторінки контактів (SK / EN). */
export function companyDetailsRows(locale: 'sk' | 'en'): [string, string][] {
  if (locale === 'sk') {
    return [
      ['Obchodné meno', sro.name],
      ['Sídlo', `${sro.street}, ${sro.postalCode} ${sro.cityFull}`],
      ['IČO', sro.companyId],
      ['DIČ', sro.taxId],
      ['IČ DPH', sro.vatId],
      ['Zápis', sro.registerSk],
      ['Kancelária', sro.office],
    ];
  }
  return [
    ['Company name', sro.name],
    ['Registered office', `${sro.street}, ${sro.postalCode} ${sro.city}, Slovakia`],
    ['Company ID (IČO)', sro.companyId],
    ['Tax ID (DIČ)', sro.taxId],
    ['EU VAT ID', sro.vatId],
    [
      'Registration',
      `Commercial Register of the Bratislava III Municipal Court, Section ${sro.registerSection}, File No. ${sro.registerFile}`,
    ],
    ['Office', sro.office],
  ];
}

/** Рядок під формами заявки з посиланням на політику тієї ж мови. */
export function FormConsentNote({
  className = '',
  linkClassName = 'underline underline-offset-2 hover:text-brand-orange',
}: {
  className?: string;
  linkClassName?: string;
}) {
  const locale = useLocale();
  // LocaleLink сам додає префікс мови: /privacy → /sk/privacy, /en/privacy
  const link = (text: string) => (
    <LocaleLink href="/privacy" className={linkClassName}>
      {text}
    </LocaleLink>
  );

  if (locale === 'sk') {
    return (
      <span className={className}>
        Odoslaním dopytu potvrdzujete, že ste sa oboznámili so {link('Zásadami ochrany osobných údajov')}. Vaše
        údaje použijeme len na odpoveď na dopyt.
      </span>
    );
  }
  if (locale === 'en') {
    return (
      <span className={className}>
        By sending this request you confirm that you have read our {link('Privacy Policy')}. We use your details
        only to reply to your request.
      </span>
    );
  }
  return (
    <span className={className}>
      Надсилаючи заявку, ви підтверджуєте, що ознайомилися з {link('Політикою конфіденційності')}. Ми
      використовуємо ваші дані лише, щоб відповісти на запит.
    </span>
  );
}
