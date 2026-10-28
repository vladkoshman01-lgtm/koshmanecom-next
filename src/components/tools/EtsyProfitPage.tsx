import React from 'react';
import type { Metadata } from 'next';
import EtsyProfitCalculator from '@/components/tools/EtsyProfitCalculator';
import ToolPage, { toolMetadata } from '@/components/tools/ToolPage';
import { PROFIT_CALC_COPY, PROFIT_CALC_PATHS } from '@/data/etsyProfitCalculator';
import type { Locale } from '@/lib/i18n';

/** Сторінка «Калькулятор прибутку Etsy» для будь-якої мови. */

export function profitCalcMetadata(locale: Locale): Metadata {
  return toolMetadata(locale, PROFIT_CALC_COPY[locale], PROFIT_CALC_PATHS);
}

export default function EtsyProfitPage({ locale }: { locale: Locale }) {
  return (
    <ToolPage locale={locale} copy={PROFIT_CALC_COPY[locale]} paths={PROFIT_CALC_PATHS}>
      <EtsyProfitCalculator />
    </ToolPage>
  );
}
