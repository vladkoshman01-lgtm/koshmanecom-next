import React from 'react';
import path from 'node:path';
import sharp from 'sharp';
import Link from '@/components/ui/LocaleLink';
import AnimatedButton from '@/components/ui/AnimatedButton';
import BlogContent from '@/components/BlogContent';
import LeadForm from '@/components/LeadForm';
import JsonLd from '@/components/JsonLd';
import ArticleCard, { formatArticleDate, formatMinutes } from './ArticleCard';
import ShareBar from './ShareBar';
import ArticleToc from './ArticleToc';
import ImageLightbox from './ImageLightbox';
import { getArticles, toSummary, type Article } from '@/lib/blog';
import { getDictionary } from '@/i18n/getDictionary';
import { localePath, type Locale } from '@/lib/i18n';
import { siteUrl } from '@/lib/seo';
import { contacts } from '@/lib/nav';
import { breadcrumbs, faq } from '@/lib/jsonld';

/**
 * Сторінка статті за макетом Blog.dc.html (екран «Blog article»):
 * хлібні крихти, шапка з автором, обкладинка, текст + бічна колонка зі
 * змістом, CTA, «Поділитися», телеграм-канал, «Читайте також», форма.
 *
 * Читабельність: рядок тексту ~65–75 знаків (як у журналах), картинки
 * ширші за текст, у бічній колонці лише зміст — нічого не відволікає.
 */

/** Розміри картинок з тексту статті — читаємо файли з public/ на етапі збірки. */
async function readImageSizes(markdown: string) {
  const sizes: Record<string, { width: number; height: number }> = {};
  for (const [, src] of markdown.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)) {
    try {
      const meta = await sharp(path.join(process.cwd(), 'public', src)).metadata();
      if (meta.width && meta.height) sizes[src] = { width: meta.width, height: meta.height };
    } catch {
      // Файлу немає — картинка просто піде без розмірів
    }
  }
  return sizes;
}

export default async function ArticleView({ article, locale }: { article: Article; locale: Locale }) {
  const imageSizes = await readImageSizes(article.content);
  const t = getDictionary(locale);
  const path = `/blog/${article.slug}`;
  const url = `${siteUrl}${localePath(locale, path)}`;

  const related = getArticles(locale)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)
    .map(toSummary);

  const cta = article.cta ?? { title: t.blog.ctaTitle, text: t.blog.ctaText, button: t.blog.ctaButton };
  const date = formatArticleDate(article.publishedAt, locale);
  const minutes = formatMinutes(t.blog.minutes, article.readingTimeMinutes);

  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt ?? '',
      inLanguage: locale,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: url,
      image: article.cover ? [`${siteUrl}${article.cover.url}`] : undefined,
      keywords: article.keywords.length ? article.keywords.join(', ') : undefined,
      // Без посади й фото автор — це команда, а не людина: описуємо як агенцію
      author: article.author && !article.author.role && !article.author.photo
        ? { '@type': 'Organization', name: article.author.name, '@id': `${siteUrl}/#organization` }
        : article.author
        ? {
            '@type': 'Person',
            name: article.author.name,
            jobTitle: article.author.role ?? undefined,
            url: `${siteUrl}${localePath(locale, '/about')}`,
            image: article.author.photo ? `${siteUrl}${article.author.photo}` : undefined,
            worksFor: { '@id': `${siteUrl}/#organization` },
          }
        : undefined,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    breadcrumbs(locale, [
      [t.nav.home, '/'],
      [t.nav.blog, '/blog'],
      [article.title, path],
    ]),
  ];
  if (article.faq.length) {
    jsonLd.push(faq(article.faq.map((f) => [f.question, f.answer])));
  }

  return (
    <div className="bg-white">
      <JsonLd data={jsonLd} />
      <ImageLightbox />

      <section className="shell pb-14 pt-8 md:pb-[4.5rem] md:pt-12">
        <nav aria-label="breadcrumbs" className="flex flex-wrap items-center gap-2.5 text-sm text-[#8A8A8A]">
          <Link href="/blog" className="hover:text-brand-orange">
            {t.nav.blog}
          </Link>
          {article.category?.name ? (
            <>
              <span aria-hidden>/</span>
              <span className="text-brand-orange">{article.category.name}</span>
            </>
          ) : null}
        </nav>

        <header className="mt-7 max-w-[60rem] md:mt-10">
          {article.category?.name ? (
            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
              {article.category.name}
            </div>
          ) : null}
          <h1 className="fs-56 mob-30 mt-4 text-balance font-bold text-[#222222] md:mt-[1.125rem]">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mob-16 mt-5 max-w-[51.25rem] text-xl leading-[1.5] text-[#444444] md:mt-[1.375rem]">
              {article.excerpt}
            </p>
          ) : null}
          {article.author ? (
            <div className="mt-7 flex items-center gap-3.5 md:mt-[1.875rem]">
              {article.author.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.author.photo}
                  alt={article.author.name}
                  className="h-11 w-11 flex-none rounded-full bg-[#EEEEEE] object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-orange text-[0.8125rem] font-extrabold text-white">
                  KE
                </span>
              )}
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.9375rem] font-bold text-[#222222]">
                  {article.author.name}
                  {article.author.role ? (
                    <span className="font-normal text-[#555555]">, {article.author.role}</span>
                  ) : null}
                </span>
                <span className="text-sm text-[#8A8A8A]">
                  {date} · {minutes}
                </span>
              </div>
            </div>
          ) : null}
        </header>

        {article.cover ? (
          <div className="mt-9 overflow-hidden rounded bg-[#D9D9D9] md:mt-11">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover.url}
              alt={article.cover.alternativeText ?? article.title}
              width={article.cover.width ?? undefined}
              height={article.cover.height ?? undefined}
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-[minmax(0,1fr)_21.25rem] md:gap-[6.25rem]">
          <article className="min-w-0">
            <BlogContent content={article.content} imageSizes={imageSizes} />

            {/* Текст і кнопка одне під одним: у ряд кнопка стискала текст у вузьку колонку */}
            <div className="blog-measure mt-12 flex flex-col items-start gap-7 bg-brand-orange px-6 py-8 text-white md:mt-16 md:gap-9 md:px-12 md:py-12">
              <div className="flex flex-col gap-3 md:gap-4">
                <span className="text-2xl font-bold leading-[1.15] tracking-[-0.01em] md:text-[2rem]">{cta.title}</span>
                {cta.text ? (
                  <span className="max-w-[34rem] text-base leading-[1.55] text-white/90 md:text-lg">{cta.text}</span>
                ) : null}
              </div>
              <AnimatedButton variant="light" href="#lead" className="flex-none">
                {cta.button}
              </AnimatedButton>
            </div>

            {article.author?.bio ? (
              <div className="blog-measure mt-10 flex gap-5 bg-[#EEEEEE] p-6 md:p-7">
                {article.author.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.author.photo}
                    alt={article.author.name}
                    loading="lazy"
                    className="h-16 w-16 flex-none rounded-full bg-white object-cover md:h-20 md:w-20"
                  />
                ) : null}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A]">
                    {t.blog.aboutAuthor}
                  </span>
                  <span className="text-lg font-bold text-[#222222]">
                    {article.author.name}
                    {article.author.role ? (
                      <span className="font-normal text-[#555555]"> · {article.author.role}</span>
                    ) : null}
                  </span>
                  <p className="text-[0.9375rem] leading-[1.55] text-[#444444]">{article.author.bio}</p>
                </div>
              </div>
            ) : null}

            <div className="blog-measure">
              <ShareBar url={url} title={article.title} />
            </div>

            <div className="blog-measure mt-10 flex flex-col gap-3 bg-[#141414] p-6 text-white md:flex-row md:items-center md:justify-between md:gap-8 md:p-8">
              <div className="flex flex-col gap-2">
                <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-brand-orange">
                  {t.blog.telegramEyebrow}
                </div>
                <div className="text-lg font-medium leading-[1.35] md:text-[1.1875rem]">{t.blog.telegramText}</div>
              </div>
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[3.125rem] flex-none items-center justify-center gap-2.5 bg-white px-6 text-sm font-bold uppercase tracking-[0.02em] text-brand-orange transition-opacity hover:opacity-90"
              >
                {t.blog.subscribe} <span aria-hidden>→</span>
              </a>
            </div>
          </article>

          {article.toc.length ? (
            <aside className="max-md:hidden">
              <div className="sticky top-28 flex flex-col gap-4">
                <ArticleToc items={article.toc} title={t.blog.toc} />
                {/* Компактний заклик під змістом — завжди під рукою, поки людина читає */}
                <a
                  href="#lead"
                  className="group flex flex-col gap-3 bg-brand-orange p-6 text-white transition-colors hover:bg-[#E64A1C]"
                >
                  <span className="text-lg font-semibold leading-[1.3]">{cta.title}</span>
                  <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.02em]">
                    {cta.button}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      {related.length ? (
        <section className="sec-y bg-[#EEEEEE]">
          <div className="shell">
            <div className="flex items-end justify-between gap-6">
              <h2 className="fs-44 mob-26 font-bold text-[#222222]">{t.blog.related}</h2>
              <Link
                href="/blog"
                className="flex-none text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-brand-orange"
              >
                {t.blog.allArticles} <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:mt-9 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} locale={locale} minutesLabel={t.blog.minutes} showExcerpt={false} headingLevel="h3" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LeadForm theme="dark" subtitle={article.leadSubtitle ?? undefined} />
    </div>
  );
}
