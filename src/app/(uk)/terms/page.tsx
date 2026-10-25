import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import TermsContent from '@/components/terms/TermsContent';

export const metadata: Metadata = pageMeta('uk', 'terms');

export default function Page() {
  return (
    <>
      <JsonLd data={pageJsonLd('uk', 'terms')} />
      <TermsContent />
    </>
  );
}
