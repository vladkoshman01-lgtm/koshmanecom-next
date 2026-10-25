'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { hasTranslation, localePath } from '@/lib/i18n';

/**
 * Посилання, що тримається поточної мови: '/services' на англійській
 * веде на '/en/services'. Зовнішні адреси й якорі не чіпаємо.
 */
export default function LocaleLink({
  href,
  children,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const locale = useLocale();
  const raw = typeof href === 'string' ? href : '';
  // Префіксуємо лише внутрішні сторінки, які мають переклад
  const shouldPrefix = raw.startsWith('/') && hasTranslation(raw);
  const target = shouldPrefix ? localePath(locale, raw) : href;

  return (
    <Link href={target} {...rest}>
      {children}
    </Link>
  );
}
