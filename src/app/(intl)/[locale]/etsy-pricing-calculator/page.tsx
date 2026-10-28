import type { Metadata } from 'next';
import EtsyPricingPage, { pricingCalcMetadata } from '@/components/tools/EtsyPricingPage';

// Адреса інструмента своя для кожної мови — ця існує лише в en
export function generateStaticParams() {
  return [{ locale: 'en' }];
}
export const dynamicParams = false;

export const metadata: Metadata = pricingCalcMetadata('en');

export default function Page() {
  return <EtsyPricingPage locale="en" />;
}
