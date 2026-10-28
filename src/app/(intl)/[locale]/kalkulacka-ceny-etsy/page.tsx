import type { Metadata } from 'next';
import EtsyPricingPage, { pricingCalcMetadata } from '@/components/tools/EtsyPricingPage';

// Адреса інструмента своя для кожної мови — ця існує лише в sk
export function generateStaticParams() {
  return [{ locale: 'sk' }];
}
export const dynamicParams = false;

export const metadata: Metadata = pricingCalcMetadata('sk');

export default function Page() {
  return <EtsyPricingPage locale="sk" />;
}
