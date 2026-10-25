'use client';

import React, { useMemo, useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import ArticleCard, { formatArticleDate, formatMinutes } from '@/components/blog/ArticleCard';
import { useLocale, useT } from '@/i18n/LocaleProvider';
import type { ArticleSummary } from '@/lib/blog';

/**
 * Список статей за макетом Blog.dc.html: заголовок із пошуком, рубрики
 * з лічильниками, велика темна «головна» картка і сітка по три.
 *
 * Пошук і фільтр живуть у стані компонента, а не в URL: сайт збирається
 * статично, тож серверних query-параметрів тут бути не може.
 */

const PER_PAGE = 9;

export default function BlogList({ articles }: { articles: ArticleSummary[] }) {
  const t = useT();
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) {
      if (a.category?.name) counts.set(a.category.name, (counts.get(a.category.name) ?? 0) + 1);
    }
    return [...counts.entries()].map(([name, count]) => ({ name, count }));
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (activeCategory && a.category?.name !== activeCategory) return false;
      if (!q) return true;
      return [a.title, a.excerpt ?? '', ...a.tags].join(' ').toLowerCase().includes(q);
    });
  }, [articles, activeCategory, query]);

  // Головна картка — лише в «чистому» списку, без пошуку й фільтра
  const showFeatured = !activeCategory && !query.trim() && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const pool = showFeatured ? filtered.slice(1) : filtered;
  const visible = pool.slice(0, page * PER_PAGE);
  const hasMore = pool.length > visible.length;

  const pick = (category: string | null) => {
    setActiveCategory(category);
    setPage(1);
  };

  const chip = (active: boolean) =>
    `flex h-11 flex-none items-center gap-2 whitespace-nowrap border-[1.5px] px-5 text-[0.9375rem] font-medium transition-colors ${
      active
        ? 'border-brand-orange bg-brand-orange text-white'
        : 'border-[#CFCFCF] bg-transparent text-[#222222] hover:border-brand-orange hover:text-brand-orange'
    }`;

  return (
    <>
      <section className="shell pb-8 pt-12 md:pb-10 md:pt-[5.125rem]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
              {t.home.blog.eyebrow}
            </div>
            <h1 className="fs-56 mob-30 mt-4 font-bold text-[#222222] md:mt-5">{t.home.blog.title}</h1>
            <p className="mob-16 mt-3.5 text-lg leading-[1.4] text-[#222222]">{t.home.blog.text}</p>
          </div>
          {articles.length > 0 ? (
            <label className="flex h-[3.25rem] w-full flex-none items-center gap-2.5 bg-white px-[1.125rem] md:w-[21.25rem]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 20l-4-4" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={t.blog.search}
                aria-label={t.blog.search}
                className="min-w-0 flex-1 border-none bg-transparent text-base text-[#222222] outline-none placeholder:text-[#8A8A8A]"
              />
            </label>
          ) : null}
        </div>

        {categories.length > 0 ? (
          <div className="-mx-5 mt-8 flex gap-2.5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:mt-10 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
            <button type="button" onClick={() => pick(null)} className={chip(activeCategory === null)}>
              {t.blog.all}
              <span className="text-xs opacity-60">{articles.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c.name} type="button" onClick={() => pick(c.name)} className={chip(activeCategory === c.name)}>
                {c.name}
                <span className="text-xs opacity-60">{c.count}</span>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {articles.length === 0 ? (
        <section className="shell pb-20 md:pb-[6.25rem]">
          <div className="bg-white p-8 text-center text-lg text-[#555555] md:p-[3.75rem]">{t.blog.empty}</div>
        </section>
      ) : (
        <>
          {featured ? (
            <section className="shell">
              <Link
                href={`/blog/${featured.slug}`}
                className="grid overflow-hidden rounded bg-[#141414] text-white transition-colors hover:bg-[#1E1E1E] md:min-h-[27.5rem] md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
              >
                {/* Обкладинки — банери 1200×630 з текстом, тож показуємо їх цілими:
                    фон колонки збігається з фоном банера, поля не видно */}
                <div className="relative aspect-[40/21] bg-[#141414] md:aspect-auto">
                  {featured.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.cover.url}
                      alt={featured.cover.alternativeText ?? featured.title}
                      fetchPriority="high"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col p-6 md:px-12 md:pb-11 md:pt-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-brand-orange px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white">
                      {t.blog.featured}
                    </span>
                    {featured.category?.name ? (
                      <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
                        {featured.category.name}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mob-23 mt-5 text-[2.25rem] font-bold leading-[1.12] md:mt-6">{featured.title}</h2>
                  {featured.excerpt ? (
                    <span className="mob-15 mt-4 text-[1.0625rem] leading-[1.5] text-[#DADADA]">{featured.excerpt}</span>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <span className="text-sm text-[#9A9A9A]">
                      {formatArticleDate(featured.publishedAt, locale)} ·{' '}
                      {formatMinutes(t.blog.minutes, featured.readingTimeMinutes)}
                    </span>
                    <span className="flex items-center gap-2.5 text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-brand-orange">
                      {t.blog.read} <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          ) : null}

          <section className="shell pb-20 pt-6 md:pb-[6.25rem] md:pt-10">
            {visible.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {visible.map((article) => (
                  <ArticleCard key={article.slug} article={article} locale={locale} minutesLabel={t.blog.minutes} />
                ))}
              </div>
            ) : !featured ? (
              <div className="bg-white p-8 text-center text-lg text-[#555555] md:p-[3.75rem]">{t.blog.nothing}</div>
            ) : null}

            {hasMore ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="flex h-[3.25rem] items-center border-[1.5px] border-[#222222] px-7 text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-[#222222] transition-colors hover:bg-[#222222] hover:text-white"
                >
                  {t.blog.more}
                </button>
              </div>
            ) : null}
          </section>
        </>
      )}
    </>
  );
}
