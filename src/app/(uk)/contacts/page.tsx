import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import JsonLd from '@/components/JsonLd';
import { pageJsonLd, servicesJsonLd } from '@/lib/pageJsonLd';
import ContactsContent from '@/components/contacts/ContactsContent';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = pageMeta('uk', 'contacts');

export default function Page() {
  return (
    <div className="bg-white">
      <JsonLd data={pageJsonLd('uk', 'contacts')} />
      <ContactsContent />
      <LeadForm
        theme="light"
        subtitle="Розкажіть про задачу — підберемо послуги й порахуємо вартість."
      />
    </div>
  );
}
