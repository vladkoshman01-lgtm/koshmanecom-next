import React from 'react';
import type { Metadata } from 'next';
import EtsyPricingCalculator from '@/components/tools/EtsyPricingCalculator';
import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import { PRICING_CALC_COPY, PRICING_CALC_PATHS } from '@/data/etsyPricingCalculator';
import type { Locale } from '@/lib/i18n';

/** Сторінка «Калькулятор ціноутворення Etsy» для будь-якої мови. */

export function pricingCalcMetadata(locale: Locale): Metadata {
  return toolMetadata(locale, PRICING_CALC_COPY[locale], PRICING_CALC_PATHS);
}

export default function EtsyPricingPage({ locale }: { locale: Locale }) {
  return (
    <ToolPage locale={locale} copy={PRICING_CALC_COPY[locale]} paths={PRICING_CALC_PATHS}>
      <EtsyPricingCalculator />
    </ToolPage>
  );
}
