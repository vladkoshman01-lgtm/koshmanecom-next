import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import ThanksContent from '@/components/thanks/ThanksContent';
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
  return pageMeta(locale as Locale, 'thanks');
}

export default function Page() {
  return (
    <ThanksContent />
  );
}
