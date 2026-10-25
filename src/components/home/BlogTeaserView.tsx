'use client';

import React from 'react';
import { useT } from '@/i18n/LocaleProvider';
import Link from '@/components/ui/LocaleLink';
import type { ArticleSummary } from '@/lib/blog';

/**
 * Представлення блоку блогу. Статті приходять зверху: їх читає серверний
 * `BlogTeaser`, бо `gray-matter` працює з файлами й у клієнта не збереться.
 */
export default function BlogTeaserView({ articles }: { articles: ArticleSummary[] }) {
  const t = useT();

  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <section id="blog" className="sec-y bg-white max-md:bg-[#EEEEEE]">
      <div className="shell max-md:px-0">
      <div className="flex flex-col gap-6 px-5 md:flex-row md:items-end md:justify-between md:px-0">
        <div>
          <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
            {t.home.blog.eyebrow}
          </div>
          <h2 className="fs-48 mob-26 mt-3 font-bold text-[#222222]">
            {t.home.blog.title}
          </h2>
          <p className="mt-3 text-base leading-[1.4] text-[#222222] md:text-[1.0625rem]">
            {t.home.blog.text}
          </p>
        </div>
        <Link
          href="/blog"
          className="flex-none text-base font-bold uppercase tracking-[0.02em] text-brand-orange"
        >
          {t.home.blog.all} <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10 md:grid md:grid-cols-2 md:gap-[0.9375rem] md:overflow-visible md:px-0">
        {/* велика картка */}
        <Link
          href={`/blog/${lead.slug}`}
          className="group flex w-[17.5rem] flex-none snap-start flex-col overflow-hidden rounded bg-white text-[#222222] transition-colors md:w-auto md:rounded-none md:bg-[#141414] md:text-white md:hover:bg-[#1E1E1E]"
        >
          <div className="relative aspect-square w-full bg-[#d9d9d9] md:aspect-auto md:min-h-[18.75rem] md:flex-1 md:bg-[#2A2A2A]">
            {lead.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lead.cover.url}
                alt={lead.cover.alternativeText ?? lead.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 px-[1.125rem] pb-[1.375rem] pt-[1.125rem] md:gap-3 md:p-7">
            {lead.category?.name ? (
              <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
                {lead.category.name}
              </span>
            ) : null}
            <span className="text-[1.0625rem] font-semibold leading-[1.3] md:text-[1.375rem] md:leading-[1.2]">{lead.title}</span>
            {lead.excerpt ? (
              <span className="text-[0.875rem] leading-[1.4] text-[#555555] md:text-[0.9375rem] md:leading-[1.45] md:text-[#CFCFCF]">{lead.excerpt}</span>
            ) : null}
            <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.02em]">
              {t.home.blog.read}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </div>
        </Link>

        {/* дві менші */}
        <div className="contents md:grid md:grid-rows-2 md:gap-[0.9375rem]">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex w-[17.5rem] flex-none snap-start flex-col overflow-hidden rounded bg-white text-[#222222] transition-colors md:w-auto md:rounded-none md:bg-[#EEEEEE] md:flex-row md:hover:bg-[#E4E4E4]"
            >
              <div className="relative aspect-square w-full bg-[#d9d9d9] md:aspect-auto md:min-h-[11.25rem] md:flex-1">
                {article.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.cover.url}
                    alt={article.cover.alternativeText ?? article.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-2 px-[1.125rem] pb-[1.375rem] pt-[1.125rem] md:p-6">
                {article.category?.name ? (
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-orange">
                    {article.category.name}
                  </span>
                ) : null}
                <span className="text-lg font-semibold leading-[1.25]">{article.title}</span>
                {article.excerpt ? (
                  <span className="text-sm leading-[1.45] text-[#555555]">{article.excerpt}</span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
