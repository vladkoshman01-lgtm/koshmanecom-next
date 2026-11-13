import React from 'react';
import Link from '@/components/ui/LocaleLink';

/**
 * Логотип «KOSHMAN / ECOM» — білий PNG із прозорим фоном (545×190).
 * Звичайний <img>, бо next/image на статичному експорті дає 404.
 * Висота підібрана під два рядки колишнього текстового логотипа.
 */
export default function Logo({
  className = '',
  size = 'desktop',
}: {
  className?: string;
  size?: 'desktop' | 'mobile';
}) {
  const h = size === 'desktop' ? 'h-[2.375rem]' : 'h-[1.875rem]';
  return (
    <Link href="/" aria-label="Koshman Ecom — на головну" className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-koshman-ecom.png"
        alt="Koshman Ecom"
        width={545}
        height={190}
        className={`block w-auto ${h}`}
        fetchPriority="high"
      />
    </Link>
  );
}
