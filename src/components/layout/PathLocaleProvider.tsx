'use client';

import React, { useEffect, useState } from 'react';
import LocaleProvider from '@/i18n/LocaleProvider';
import { localeFromPath, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/i18n/getDictionary';

/**
 * Мова за адресою — лише для глобальної 404. Firebase віддає один і той
 * самий 404.html на будь-яку невідому адресу, тож мову дізнаємось уже в
 * браузері: /en/... → англійська, /sk/... → словацька, решта — українська.
 * Статус відповіді лишається справжнім 404.
 */
export default function PathLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('uk');

  useEffect(() => {
    const detected = localeFromPath(window.location.pathname);
    setLocale(detected);
    document.documentElement.lang = detected;
    // Заголовок вкладки теж мовою адреси (статичний HTML — український)
    document.title = getDictionary(detected).notFound.metaTitle;
  }, []);

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
