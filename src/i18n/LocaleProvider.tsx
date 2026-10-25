'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { defaultLocale, type Locale } from '@/lib/i18n';
import { getDictionary, type Dictionary } from './getDictionary';
import { getContent } from './content';

/**
 * Мова та словник для клієнтських компонентів.
 *
 * Провайдер ставиться в layout кожної мови, тож компоненти секцій не знають
 * про маршрути — просто беруть `useT()` і підставляють текст.
 */
type Value = { locale: Locale; t: Dictionary; tr: (ukText: string) => string };

const LocaleContext = createContext<Value | null>(null);

export function useLocale(): Locale {
  return useContext(LocaleContext)?.locale ?? defaultLocale;
}

export function useT(): Dictionary {
  return useContext(LocaleContext)?.t ?? getDictionary(defaultLocale);
}

/**
 * Переклад контенту з файлів даних: `tr('Аналіз бізнесу')`.
 * Якщо перекладу для мови немає — повертає український оригінал.
 */
export function useTr(): (ukText: string) => string {
  return useContext(LocaleContext)?.tr ?? ((x: string) => x);
}

/** Підставляє значення у плейсхолдери: fill('Дякуємо, {name}!', { name }) */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo(() => {
    const content = getContent(locale);
    // Текст у JSX переноситься рядками, тож ключі порівнюємо без зайвих пробілів
    const squash = (text: string) => text.replace(/\s+/g, ' ').trim();
    const normalised: Record<string, string> = {};
    for (const [key, text] of Object.entries(content)) normalised[squash(key)] = text;

    return {
      locale,
      t: getDictionary(locale),
      tr: (ukText: string) => normalised[squash(ukText)] ?? ukText,
    };
  }, [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
