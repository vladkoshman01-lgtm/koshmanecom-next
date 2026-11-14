import type { Metadata, Viewport } from 'next';
import { Onest } from 'next/font/google';
import '../globals.css';
import { CabinetAuthProvider } from '@/components/cabinet/CabinetShell';

const fontDisplay = Onest({
  variable: '--font-display',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = { themeColor: '#FF5B2B' };

export const metadata: Metadata = {
  title: 'Кабінет клієнта — Koshman Ecom',
  description: 'Звіти по рекламі для клієнтів Koshman Ecom.',
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Окремий кореневий layout кабінету: без шапки сайту, кота, банера cookies
 * і Google Analytics — клієнтські звіти не змішуємо з трекінгом сайту.
 */
export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${fontDisplay.variable} min-h-screen bg-[#FAFAFA] antialiased`}>
        <CabinetAuthProvider>{children}</CabinetAuthProvider>
      </body>
    </html>
  );
}
