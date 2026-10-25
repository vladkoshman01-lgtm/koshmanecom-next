import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import ServicesCatalog from '@/components/services/ServicesCatalog';
import LeadForm from '@/components/LeadForm';
import JsonLd from '@/components/JsonLd';
import { servicesJsonLd } from '@/lib/pageJsonLd';

export const metadata: Metadata = pageMeta('uk', 'services');

export default function Page() {
  return (
    <div className="bg-white">
      <JsonLd data={servicesJsonLd('uk')} />
      <ServicesCatalog />
      <LeadForm theme="dark" subtitle="Розкажіть про задачу — підберемо послуги й порахуємо вартість." />
    </div>
  );
}
