import type { Metadata } from 'next';
import PlatformComparisonPage, { comparisonMetadata } from '@/components/tools/PlatformComparisonPage';

// Адреса інструмента своя для кожної мови — ця існує лише в en
export function generateStaticParams() {
  return [{ locale: 'en' }];
}
export const dynamicParams = false;

export const metadata: Metadata = comparisonMetadata('en');

export default function Page() {
  return <PlatformComparisonPage locale="en" />;
}
