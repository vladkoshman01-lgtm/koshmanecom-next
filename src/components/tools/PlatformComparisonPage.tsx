import React from 'react';
import type { Metadata } from 'next';
import PlatformComparison from '@/components/tools/PlatformComparison';
import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import { COMPARISON_COPY, COMPARISON_PATHS } from '@/data/platformComparison';
import type { Locale } from '@/lib/i18n';

/** Сторінка «Etsy vs Amazon vs eBay vs Shopify» для будь-якої мови. */

export function comparisonMetadata(locale: Locale): Metadata {
  return toolMetadata(locale, COMPARISON_COPY[locale], COMPARISON_PATHS);
}

export default function PlatformComparisonPage({ locale }: { locale: Locale }) {
  return (
    <ToolPage locale={locale} copy={COMPARISON_COPY[locale]} paths={COMPARISON_PATHS}>
      <PlatformComparison />
    </ToolPage>
  );
}
