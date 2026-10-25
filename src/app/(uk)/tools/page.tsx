import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import ToolsGrid from '@/components/tools/ToolsGrid';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = pageMeta('uk', 'tools');

export default function Page() {
  return (
    <div className="bg-white">
      <JsonLd data={pageJsonLd('uk', 'tools')} />
      <section className="bg-[#141414]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <ToolsGrid withHeader />
        </div>
      </section>

      <LeadForm theme="dark" />
    </div>
  );
}
