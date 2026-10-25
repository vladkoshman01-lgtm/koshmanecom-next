import type { Locale } from '@/lib/i18n';
import en from './en';
import sk from './sk';

/**
 * Переклади контенту з `src/data/*`. Ключ — український оригінал,
 * тож відсутній переклад просто показується українською.
 */
const packs: Partial<Record<Locale, Record<string, string>>> = { en, sk };

export function getContent(locale: Locale): Record<string, string> {
  return packs[locale] ?? {};
}
