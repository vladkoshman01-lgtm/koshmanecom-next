import { renderOg, ogContentType, ogSize } from '@/og/render';
import { PROFIT_CALC_COPY } from '@/data/etsyProfitCalculator';

export const dynamic = 'force-static';
export const alt = PROFIT_CALC_COPY.en.meta.ogTitle;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export default function Image() {
  const c = PROFIT_CALC_COPY.en;
  return renderOg({ eyebrow: c.crumbs.tools, title: c.meta.ogTitle, subtitle: c.meta.ogSubtitle });
}
