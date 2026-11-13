import type { ServicePage } from '@/data/servicePages';
import { getDictionary } from '@/i18n/getDictionary';
import { localePath, type Locale } from './i18n';
import { breadcrumbs, faq } from './jsonld';
import { siteUrl } from './seo';

const ORG_ID = `${siteUrl}/#organization`;

/**
 * Розмітка сторінки окремої послуги: Service, HowTo (етапи), FAQPage
 * і крихти. Саме ці типи читають Google і AI-асистенти, коли вирішують,
 * чи показати нас у відповіді на «хто зробить магазин на Shopify».
 */
export function servicePageJsonLd(locale: Locale, page: ServicePage) {
  const t = getDictionary(locale);
  const url = `${siteUrl}${localePath(locale, `/services/${page.slug}`)}`;
  // Сторінки без підтвердженої ціни не мають ні Offer, ні каталогу пропозицій
  const withOffers = page.schema?.offers !== false;

  return [
    breadcrumbs(locale, [
      [t.nav.home, '/'],
      [t.nav.services, '/services'],
      [page.category, `/services#${page.categoryKey}`],
      [page.short, `/services/${page.slug}`],
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.schema?.name ?? page.short,
      serviceType: page.schema?.serviceType ?? page.short,
      description: page.metaDescription,
      url,
      inLanguage: locale,
      category: page.category,
      areaServed: page.areaServed,
      provider: { '@id': ORG_ID },
      audience: {
        '@type': 'BusinessAudience',
        name: page.forWhom.map(([title]) => title).join(', '),
      },
      ...(withOffers
        ? {
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: page.includedTitle,
              itemListElement: page.included.map(([title, description]) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: title, description },
              })),
            },
            // Ціна залежить від проєкту — чесно віддаємо запит ціни, а не вигадану суму
            offers: {
              '@type': 'Offer',
              url: `${url}#price`,
              availability: 'https://schema.org/InStock',
              priceSpecification: {
                '@type': 'PriceSpecification',
                description: page.priceText,
                valueAddedTaxIncluded: false,
              },
            },
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: page.stepsTitle,
      description: page.lead,
      inLanguage: locale,
      step: page.steps.map(([, title, text], i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: title,
        text,
      })),
    },
    faq(page.faq),
  ];
}
