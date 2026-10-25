import React from 'react';
import { getArticles } from '@/lib/blog';
import BlogTeaserView from './BlogTeaserView';

/**
 * Блок блогу на головній: одна велика картка і дві менші.
 * Статті беруться з `content/blog`; поки їх немає, секція не показується.
 */
export default function BlogTeaser() {
  const articles = getArticles().slice(0, 3);
  return <BlogTeaserView articles={articles} />;
}
