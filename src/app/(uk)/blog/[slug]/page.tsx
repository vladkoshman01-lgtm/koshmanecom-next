import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleView from '@/components/blog/ArticleView';
import { getArticleBySlug, getArticles } from '@/lib/blog';
import { articleMetadata } from '@/lib/blogMeta';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles('uk').map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug, 'uk');
  return article ? articleMetadata(article) : {};
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug, 'uk');
  if (!article) notFound();

  return <ArticleView article={article} locale="uk" />;
}
