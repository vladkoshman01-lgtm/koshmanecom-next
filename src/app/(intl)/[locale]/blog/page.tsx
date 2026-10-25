import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import { getArticles, toSummary } from '@/lib/blog';
import { blogListJsonLd } from '@/lib/blogMeta';
import JsonLd from '@/components/JsonLd';
import BlogList from '@/components/BlogList';
import LeadForm from '@/components/LeadForm';
import { intlLocales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale as Locale, 'blog');
}

/**
 * Список статей іншими мовами. Переклади лежать поруч з оригіналом як
 * `slug.en.md` / `slug.sk.md`; якщо цією мовою статей немає — заглушка.
 */
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const articles = getArticles(locale as Locale).map(toSummary);

  return (
    <div className="bg-[#EEEEEE]">
      {articles.length ? <JsonLd data={blogListJsonLd(locale as Locale, articles)} /> : null}
      <BlogList articles={articles} />
      <LeadForm theme="dark" />
    </div>
  );
}
