import React from 'react';
import Link from '@/components/ui/LocaleLink';

/** Текстовий логотип «KOSHMAN / ECOM» у два рядки, як у макеті. */
export default function Logo({
  className = '',
  size = 'desktop',
}: {
  className?: string;
  size?: 'desktop' | 'mobile';
}) {
  const fs = size === 'desktop' ? 'text-[1.125rem]' : 'text-[0.9375rem]';
  return (
    <Link
      href="/"
      aria-label="Koshman Ecom — на головну"
      className={`flex flex-col font-extrabold uppercase leading-[1.05] tracking-[0.02em] text-white ${fs} ${className}`}
    >
      <span>Koshman</span>
      <span>Ecom</span>
    </Link>
  );
}
