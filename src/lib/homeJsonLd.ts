import { FAQ } from '@/data/resources';
import { getContent } from '@/i18n/content';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from './i18n';
import { faq, organization, website } from './jsonld';

/** Розмітка головної: агенція, сайт і FAQ мовою сторінки. */
export function homeJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const content = getContent(locale);
  const squash = (text: string) => text.replace(/\s+/g, ' ').trim();
  const translated: Record<string, string> = {};
  for (const [key, value] of Object.entries(content)) translated[squash(key)] = value;
  const tr = (uk: string) => translated[squash(uk)] ?? uk;

  return [
    organization(locale, t.pages.home.metaDescription),
    website(locale),
    faq(FAQ.map(([question, answer]) => [tr(question), tr(answer)])),
  ];
}
