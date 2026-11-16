import type { CaseStudy } from '@/data/caseStudies';
import { getDictionary } from '@/i18n/getDictionary';
import { localePath, type Locale } from './i18n';
import { breadcrumbs, faq } from './jsonld';
import { siteUrl } from './seo';

/**
 * Розмітка сторінки кейсу мовою сторінки: Article (кейс як матеріал
 * агенції з картинкою і датами) + BreadcrumbList + FAQPage.
 */
export function caseStudyJsonLd(locale: Locale, study: CaseStudy) {
  const t = getDictionary(locale);
  const path = `/cases/${study.slug}`;
  const url = `${siteUrl}${localePath(locale, path)}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: study.h1,
      name: study.metaTitle,
      description: study.metaDescription,
      abstract: study.summary,
      url,
      mainEntityOfPage: url,
      inLanguage: locale,
      ...(study.cover.image ? { image: `${siteUrl}${study.cover.image}` } : {}),
      datePublished: study.published,
      dateModified: study.updated,
      author: { '@id': `${siteUrl}/#organization` },
      publisher: { '@id': `${siteUrl}/#organization` },
      about: [
        { '@type': 'Thing', name: study.channel },
        { '@type': 'Organization', name: study.client },
      ],
      keywords: study.keywords,
      contentLocation: study.countries.map((name) => ({ '@type': name === 'Europe' ? 'Continent' : 'Country', name })),
    },
    breadcrumbs(locale, [
      [t.nav.home, '/'],
      [t.nav.cases, '/#cases'],
      [study.breadcrumb, path],
    ]),
    faq(study.faq),
  ];
}
