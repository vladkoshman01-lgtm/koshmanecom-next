import React from 'react';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import { headingId } from '@/lib/blog';

/**
 * Тіло статті. Markdown із файлу, стилі — у `.blog-markdown` (globals.css).
 *
 * Заголовкам другого рівня даємо id за порядком — ті самі, що в змісті
 * (`extractToc` у lib/blog), тож посилання зі змісту ведуть точно на них.
 */
export default function BlogContent({
  content,
  imageSizes = {},
}: {
  content: string;
  /** Розміри картинок з тексту — щоб сторінка не «стрибала», поки вони вантажаться */
  imageSizes?: Record<string, { width: number; height: number }>;
}) {
  if (!content?.trim()) {
    return <p className="text-[#555555]">Контент статті поки не додано.</p>;
  }

  // Лічильник живе в межах одного рендера: серверний компонент рендериться
  // один раз і по порядку, тож n-й h2 отримує n-й id.
  let h2Index = 0;

  const components: Components = {
    h2: ({ children }) => <h2 id={headingId(h2Index++)}>{children}</h2>,
    a: ({ href = '', children }) => {
      if (href.startsWith('/') || href.startsWith('#')) {
        return <Link href={href}>{children}</Link>;
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    // Інфографіка на телефоні дрібна — тап відкриває її в повному розмірі
    img: ({ src, alt }) => {
      const url = typeof src === 'string' ? src : '';
      const size = imageSizes[url];
      return (
        <a href={url} target="_blank" rel="noopener" className="blog-figure-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={alt ?? ''} width={size?.width} height={size?.height} loading="lazy" decoding="async" />
        </a>
      );
    },
    // Картинка окремим рядком markdown загортається в <p> — робимо з неї figure
    p: ({ node, children }) => {
      const only = node?.children.length === 1 ? node.children[0] : null;
      if (only && only.type === 'element' && only.tagName === 'img') {
        return <figure>{children}</figure>;
      }
      return <p>{children}</p>;
    },
  };

  return (
    <div className="blog-markdown">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
