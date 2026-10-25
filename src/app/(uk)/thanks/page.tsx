import type { Metadata } from 'next';
import { pageMeta } from '@/lib/pageMeta';
import ThanksContent from '@/components/thanks/ThanksContent';

export const metadata: Metadata = pageMeta('uk', 'thanks');

export default function Page() {
  return <ThanksContent />;
}
