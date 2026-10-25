import React from 'react';
import Container from './Container';

/**
 * Секція сторінки: вертикальні падінги 48px на мобільному і 100px
 * на десктопі (`size="lg"` — 120px, для ключових блоків).
 */
export default function Section({
  children,
  className = '',
  size = 'md',
  contained = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'md' | 'lg';
  /** false — коли секції потрібен власний контейнер (напр. горизонтальний скрол) */
  contained?: boolean;
  id?: string;
}) {
  const pad = size === 'lg' ? 'py-12 md:py-[7.5rem]' : 'py-12 md:py-[6.25rem]';
  return (
    <section id={id} className={`${pad} ${className}`}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
