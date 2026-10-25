import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import { getArticles, toSummary } from '@/lib/blog';
import { blogListJsonLd } from '@/lib/blogMeta';
import BlogList from '@/components/BlogList';
import LeadForm from '@/components/LeadForm';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = pageMeta('uk', 'blog');

export default function BlogPage() {
  const articles = getArticles('uk').map(toSummary);

  return (
    <div className="bg-[#EEEEEE]">
      <JsonLd data={blogListJsonLd('uk', articles)} />
      <BlogList articles={articles} />
      <LeadForm theme="dark" />
    </div>
  );
}
