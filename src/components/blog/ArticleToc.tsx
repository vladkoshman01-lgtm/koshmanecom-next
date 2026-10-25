'use client';

import React, { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/blog';

/**
 * Зміст статті в бічній колонці. Підсвічує розділ, який зараз читають,
 * і показує тонку смужку прогресу — читач завжди знає, де він і скільки лишилось.
 */
export default function ArticleToc({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      // Активний — останній заголовок, що вже піднявся у верхню третину екрана
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);

      const body = document.querySelector('.blog-markdown');
      if (body) {
        const rect = body.getBoundingClientRect();
        const total = rect.height - window.innerHeight * 0.6;
        setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav aria-label={title} className="bg-[#EEEEEE] p-6 md:p-7">
      <div className="text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#8A8A8A]">{title}</div>
      <div className="mt-4 h-[3px] bg-[#DADADA]" aria-hidden>
        <div className="h-full bg-brand-orange transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="mt-2 flex flex-col">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`flex gap-3 border-b border-[#DADADA] py-[0.6875rem] text-[0.9375rem] leading-[1.35] transition-colors last:border-b-0 hover:text-brand-orange ${
                isActive ? 'font-semibold text-[#222222]' : 'text-[#555555]'
              }`}
            >
              <span className="font-bold text-brand-orange">{String(i + 1).padStart(2, '0')}</span>
              <span>{item.text}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
