import type { Metadata } from 'next';
import { getTranslations, type Article, type ArticleSummary } from './blog';
import { defaultLocale, localePath, type Locale } from './i18n';
import { breadcrumbs } from './jsonld';
import { getDictionary } from '@/i18n/getDictionary';
import { buildMetadata, siteUrl } from './seo';

/**
 * Метадані сторінки статті будь-якою мовою: title, опис, canonical,
 * hreflang лише на ті мови, якими стаття справді існує (у кожної — свій slug),
 * Open Graph для статті та картинка для соцмереж.
 */
export function articleMetadata(article: Article): Metadata {
  const path = `/blog/${article.slug}`;
  const url = `${siteUrl}${localePath(article.locale, path)}`;

  const base = buildMetadata({
    locale: article.locale,
    path,
    // seoTitle уже підібраний під ~60 знаків — бренд не дописуємо, щоб Google не обрізав
    title: article.seoTitle ?? `${article.title} | Koshman Ecom`,
    description: article.excerpt ?? '',
    type: 'article',
  });

  const translations = getTranslations(article);
  const languages: Record<string, string> = {};
  for (const tr of translations) {
    languages[tr.locale] = `${siteUrl}${localePath(tr.locale, `/blog/${tr.slug}`)}`;
  }
  // x-default — українська версія, якщо вона є, інакше сама стаття
  const fallback = translations.find((tr) => tr.locale === defaultLocale);
  languages['x-default'] = fallback ? languages[defaultLocale] : url;

  const image = article.ogImage
    ? [{ url: article.ogImage, width: 1200, height: 630, alt: article.cover?.alternativeText ?? article.title }]
    : undefined;

  return {
    ...base,
    keywords: article.keywords.length ? article.keywords : undefined,
    authors: article.author ? [{ name: article.author.name }] : undefined,
    alternates: { canonical: url, languages },
    openGraph: {
      ...base.openGraph,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author ? [article.author.name] : undefined,
      section: article.category?.name,
      tags: article.tags,
      images: image,
    },
    twitter: { ...base.twitter, images: article.ogImage ? [article.ogImage] : undefined },
  };
}

/** Розмітка списку блогу: Blog зі статтями + хлібні крихти — щоб Google бачив звʼязок. */
export function blogListJsonLd(locale: Locale, articles: ArticleSummary[]): object[] {
  const t = getDictionary(locale);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Koshman Ecom — ${t.nav.blog}`,
      url: `${siteUrl}${localePath(locale, '/blog')}`,
      inLanguage: locale,
      publisher: { '@id': `${siteUrl}/#organization` },
      blogPost: articles.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        url: `${siteUrl}${localePath(locale, `/blog/${a.slug}`)}`,
        datePublished: a.publishedAt,
        image: a.cover ? `${siteUrl}${a.cover.url}` : undefined,
      })),
    },
    breadcrumbs(locale, [
      [t.nav.home, '/'],
      [t.nav.blog, '/blog'],
    ]),
  ];
}
