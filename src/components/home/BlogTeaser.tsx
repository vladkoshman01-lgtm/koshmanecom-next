import React from 'react';
import { getArticles, toSummary } from '@/lib/blog';
import type { Locale } from '@/lib/i18n';
import BlogTeaserView from './BlogTeaserView';

/**
 * Блок блогу на головній: одна велика картка і дві менші.
 * Статті беруться з `content/blog` мовою сторінки; поки їх немає, секція не показується.
 */
export default function BlogTeaser({ locale = 'uk' }: { locale?: Locale }) {
  const articles = getArticles(locale).slice(0, 3).map(toSummary);
  return <BlogTeaserView articles={articles} />;
}
