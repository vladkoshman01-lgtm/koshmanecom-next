import React from 'react';
import Link from '@/components/ui/LocaleLink';
import type { ArticleSummary } from '@/lib/blog';
import type { Locale } from '@/lib/i18n';

/**
 * Картка статті з макета Blog.dc.html: обкладинка, рубрика, заголовок,
 * опис, дата й час читання. У макеті обкладинка 4:3, але наші обкладинки —
 * банери 1200×630 з текстом, тож тримаємо їхню пропорцію, щоб нічого не обрізати.
 * Спільна для списку і блоку «Читайте також».
 */

const DATE_LOCALE: Record<Locale, string> = { uk: 'uk-UA', en: 'en-GB', sk: 'sk-SK' };

export function formatArticleDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

export function formatMinutes(template: string, minutes: number) {
  return template.replace('{n}', String(minutes));
}

export default function ArticleCard({
  article,
  locale,
  minutesLabel,
  showExcerpt = true,
  headingLevel = 'h2',
}: {
  article: ArticleSummary;
  locale: Locale;
  minutesLabel: string;
  showExcerpt?: boolean;
  /** Заголовок картки — справжній h2/h3, щоб Google бачив структуру списку */
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded bg-white text-[#222222] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,.14)]"
    >
      <div className="relative aspect-[40/21] overflow-hidden bg-[#D9D9D9]">
        {article.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {article.category?.name ? (
          <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
            {article.category.name}
          </span>
        ) : null}
        <Heading className="mt-3 text-lg font-semibold leading-[1.3] md:text-xl">{article.title}</Heading>
        {showExcerpt && article.excerpt ? (
          <span className="mt-2.5 text-[0.9375rem] leading-[1.45] text-[#444444] md:text-base">
            {article.excerpt}
          </span>
        ) : null}
        <span className="mt-auto pt-5 text-[0.8125rem] text-[#8A8A8A]">
          {formatArticleDate(article.publishedAt, locale)} ·{' '}
          {formatMinutes(minutesLabel, article.readingTimeMinutes)}
        </span>
      </div>
    </Link>
  );
}
