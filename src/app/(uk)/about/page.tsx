import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import AboutContent from '@/components/about/AboutContent';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = pageMeta('uk', 'about');

export default function Page() {
  return (
    <div className="bg-white">
      <JsonLd data={pageJsonLd('uk', 'about')} />
      <AboutContent />
      <LeadForm theme="dark" />
    </div>
  );
}
