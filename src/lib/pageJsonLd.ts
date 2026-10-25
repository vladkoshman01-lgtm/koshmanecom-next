import { CATEGORY_KEYS, CATEGORY_NAMES, SERVICES } from '@/data/services';
import { getContent } from '@/i18n/content';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from './i18n';
import { breadcrumbs, organization, webPage } from './jsonld';

/** Переклад рядка з даних мовою сторінки (з відкотом на українську). */
function translator(locale: Locale) {
  const squash = (text: string) => text.replace(/\s+/g, ' ').trim();
  const map: Record<string, string> = {};
  for (const [key, value] of Object.entries(getContent(locale))) map[squash(key)] = value;
  return (uk: string) => map[squash(uk)] ?? uk;
}

type PageKey = 'about' | 'contacts' | 'career' | 'tools' | 'terms' | 'privacy';

/** Хлібні крихти й опис для простих сторінок. */
export function pageJsonLd(locale: Locale, key: PageKey) {
  const t = getDictionary(locale);
  const pages: Record<PageKey, { path: string; name: string; description: string }> = {
    about: { path: '/about', name: t.nav.about, description: t.pages.about.intro },
    contacts: { path: '/contacts', name: t.nav.contacts, description: t.pages.contacts.subtitle },
    career: { path: '/career', name: t.nav.career, description: t.pages.career.subtitle },
    tools: { path: '/tools', name: t.nav.tools, description: t.pages.tools.metaDescription },
    terms: { path: '/terms', name: t.footer.terms, description: t.pages.terms.subtitle },
    privacy: { path: '/privacy', name: t.footer.privacy, description: t.footer.privacy },
  };
  const page = pages[key];

  const blocks: object[] = [
    breadcrumbs(locale, [
      [t.nav.home, '/'],
      [page.name, page.path],
    ]),
    webPage(locale, page.path, page.name, page.description),
  ];
  // На «Контактах» — повна картка агенції з адресами й телефоном
  if (key === 'contacts') blocks.push(organization(locale, t.pages.home.metaDescription));
  return blocks;
}

/** Сторінка послуг: каталог усіх послуг мовою сторінки + крихти. */
export function servicesJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const tr = translator(locale);
  return [
    breadcrumbs(locale, [
      [t.nav.home, '/'],
      [t.nav.services, '/services'],
    ]),
    {
      ...organization(locale, t.pages.services.metaDescription),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.pages.services.directions,
        itemListElement: CATEGORY_NAMES.map((name, i) => ({
          '@type': 'OfferCatalog',
          name: tr(name),
          itemListElement: SERVICES.filter(([k]) => k === CATEGORY_KEYS[i]).map(
            ([, title, description]) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: tr(title), description: tr(description) },
            }),
          ),
        })),
      },
    },
  ];
}
