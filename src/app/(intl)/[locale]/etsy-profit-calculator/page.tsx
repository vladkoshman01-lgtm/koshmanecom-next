import type { Metadata } from 'next';
import EtsyProfitPage, { profitCalcMetadata } from '@/components/tools/EtsyProfitPage';

// Адреса калькулятора своя для кожної мови — ця існує лише в en
export function generateStaticParams() {
  return [{ locale: 'en' }];
}
export const dynamicParams = false;

export const metadata: Metadata = profitCalcMetadata('en');

export default function Page() {
  return <EtsyProfitPage locale="en" />;
}
