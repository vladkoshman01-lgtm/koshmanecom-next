import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import PrivacyContent from '@/components/privacy/PrivacyContent';

export const metadata: Metadata = pageMeta('uk', 'privacy');

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd('uk', 'privacy')} />
      <PrivacyContent />
    </>
  );
}
