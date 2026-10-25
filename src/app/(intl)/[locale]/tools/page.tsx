import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import ToolsGrid from '@/components/tools/ToolsGrid';
import LeadForm from '@/components/LeadForm';
import { getDictionary } from '@/i18n/getDictionary';
import { intlLocales, type Locale } from '@/lib/i18n';
import { alternatesFor } from '@/lib/seo';

export function generateStaticParams() {
  return intlLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale as Locale, 'tools');
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="bg-white">
      <JsonLd data={pageJsonLd(locale as Locale, 'tools')} />
      <section className="bg-[#141414]">
        <div className="shell py-14 md:pb-[7.5rem] md:pt-[6.875rem]">
          <ToolsGrid withHeader />
        </div>
      </section>
      <LeadForm theme="dark" />
    </div>
  );
}
