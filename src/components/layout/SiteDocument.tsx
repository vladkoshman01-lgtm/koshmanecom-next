import React from 'react';
import { Onest } from 'next/font/google';
import SiteShell from '@/components/SiteShell';
import LocaleProvider from '@/i18n/LocaleProvider';
import PathLocaleProvider from './PathLocaleProvider';
import type { Locale } from '@/lib/i18n';
import { consentBootstrap } from '@/lib/consent';

// Єдиний шрифт сайту — як у хендоффі, де Onest стоїть і на заголовках, і на
// тексті. Тимчасова заміна TT Hoves Pro Expanded (платний, ліцензії поки немає):
// коли зʼявиться — міняється тут на next/font/local, решта коду не чіпається.
const fontDisplay = Onest({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

/**
 * Спільний каркас документа для всіх мов.
 *
 * Кожна мова має власний кореневий layout (групи `(uk)` і `(intl)`), щоб
 * `<html lang>` відповідав мові сторінки. Аби не дублювати шрифт, лічильники
 * й шапку з підвалом, усе це живе тут.
 */
export default function SiteDocument({
  locale,
  detectLocale = false,
  children,
}: {
  locale: Locale;
  /** Визначити мову з адреси в браузері (для глобальної 404). */
  detectLocale?: boolean;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale}>
      <head>
        {/* Згода за замовчуванням має стояти ДО будь-якого тегу Google —
            тому звичайний синхронний скрипт у head, а не next/script */}
        <script dangerouslySetInnerHTML={{ __html: consentBootstrap }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LEC5E52YML" />
      </head>
      <body className={`${fontDisplay.variable} antialiased`}>
        {detectLocale ? (
          <PathLocaleProvider>
            <SiteShell>{children}</SiteShell>
          </PathLocaleProvider>
        ) : (
          <LocaleProvider locale={locale}>
            <SiteShell>{children}</SiteShell>
          </LocaleProvider>
        )}
      </body>
    </html>
  );
}
