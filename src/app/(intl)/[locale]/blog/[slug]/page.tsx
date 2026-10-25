import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleView from '@/components/blog/ArticleView';
import { getArticleBySlug, getArticles } from '@/lib/blog';
import { articleMetadata } from '@/lib/blogMeta';
import { intlLocales, type Locale } from '@/lib/i18n';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

/** Статті англійською й словацькою — у кожної свій slug мовою читача. */
export function generateStaticParams() {
  return intlLocales.flatMap((locale) =>
    getArticles(locale).map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale as Locale);
  return article ? articleMetadata(article) : {};
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale as Locale);
  if (!article) notFound();

  return <ArticleView article={article} locale={locale as Locale} />;
}
