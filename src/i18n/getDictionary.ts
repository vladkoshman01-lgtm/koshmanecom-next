import type { Locale } from '@/lib/i18n';
import uk, { type Dictionary } from './dictionaries/uk';
import en from './dictionaries/en';
import sk from './dictionaries/sk';

/**
 * Словники підключені статично: збірка статична, динамічний import()
 * за мовою тут нічого не дав би, а так усе типізовано й потрапляє в бандл
 * лише тієї сторінки, де використовується.
 */
const dictionaries: Record<Locale, Dictionary> = { uk, en, sk };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? uk;
}

export type { Dictionary };
