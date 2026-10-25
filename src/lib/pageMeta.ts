import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from './i18n';
import { buildMetadata } from './seo';
import { getArticles } from './blog';

export type MetaKey =
  | 'home'
  | 'services'
  | 'about'
  | 'contacts'
  | 'career'
  | 'tools'
  | 'terms'
  | 'privacy'
  | 'blog'
  | 'thanks';

const PATHS: Record<MetaKey, string> = {
  home: '/',
  services: '/services',
  about: '/about',
  contacts: '/contacts',
  career: '/career',
  tools: '/tools',
  terms: '/terms',
  privacy: '/privacy',
  blog: '/blog',
  thanks: '/thanks',
};

/** Метадані сторінки мовою сторінки — тексти зі словника `meta`. */
export function pageMeta(locale: Locale, key: MetaKey): Metadata {
  const m = getDictionary(locale).meta[key];
  return buildMetadata({
    locale,
    path: PATHS[key],
    title: m.title,
    description: m.description,
    // Подяка — службова; список блогу не індексуємо, поки цією мовою немає статей
    noindex: key === 'thanks' || (key === 'blog' && getArticles(locale).length === 0),
  });
}
