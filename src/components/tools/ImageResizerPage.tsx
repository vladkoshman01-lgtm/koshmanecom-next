import React from 'react';
import type { Metadata } from 'next';
import ImageResizer from '@/components/tools/ImageResizer';
import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import { RESIZER_COPY, RESIZER_PATHS } from '@/data/imageResizer';
import type { Locale } from '@/lib/i18n';

/** Сторінка «Зміна розміру зображень для соцмереж» для будь-якої мови. */

export function resizerMetadata(locale: Locale): Metadata {
  return toolMetadata(locale, RESIZER_COPY[locale], RESIZER_PATHS);
}

export default function ImageResizerPage({ locale }: { locale: Locale }) {
  return (
    <ToolPage locale={locale} copy={RESIZER_COPY[locale]} paths={RESIZER_PATHS}>
      <ImageResizer />
    </ToolPage>
  );
}
