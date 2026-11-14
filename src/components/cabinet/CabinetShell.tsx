'use client';

/**
 * Каркас сторінок кабінету: шапка з email і виходом, а всередині — сторінка,
 * лише коли людина увійшла. Інакше — екран входу.
 */
import React from 'react';
import Link from 'next/link';
import { LogOut, Shield } from 'lucide-react';
import SiteFooter from '@/components/layout/SiteFooter';
import LocaleProvider from '@/i18n/LocaleProvider';
import { CabinetAuthProvider, useCabinetAuth } from './CabinetAuth';
import LoginScreen from './LoginScreen';
import type { Me } from '@/lib/cabinet/api';
import { cabinetConfigured } from '@/lib/cabinet/firebase';

export function Spinner({ label = 'Завантаження…' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-[#8A8A8A]" role="status">
      <span className="mr-3 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#D9D9D9] border-t-brand-orange" />
      {label}
    </div>
  );
}

function Header({ me }: { me: Me | null }) {
  const { state, signOut } = useCabinetAuth();
  const email = state.status === 'signedIn' ? state.user.email : null;
  return (
    <header className="bg-brand-orange text-white">
      <div className="mx-auto flex h-16 max-w-[80rem] items-center gap-4 px-4 md:px-8">
        <div className="flex items-center gap-3">
          {/* Логотип — на головну сайту, як звикли; «Кабінет» поруч — до списку звітів */}
          <Link href="/" aria-label="Koshman Ecom — на головну сайту" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-koshman-ecom.png" alt="Koshman Ecom" className="h-7 w-auto" />
          </Link>
          <Link href="/cabinet" className="border-l border-white/40 pl-3 text-sm font-semibold hover:opacity-80">
            Кабінет
          </Link>
        </div>
        <div className="ml-auto flex min-w-0 items-center gap-2 md:gap-4">
          {me?.isAdmin ? (
            <Link
              href="/cabinet/admin"
              className="flex items-center gap-1.5 text-sm font-semibold text-white hover:opacity-80"
            >
              <Shield className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Адмінка</span>
            </Link>
          ) : null}
          {email ? <span className="hidden truncate text-sm text-white/85 md:inline">{email}</span> : null}
          {email ? (
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex items-center gap-1.5 text-sm font-semibold text-white hover:opacity-80"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> Вийти
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}



function Gate({ children }: { children: (me: Me) => React.ReactNode }) {
  const { state, signOut } = useCabinetAuth();
  const me = state.status === 'signedIn' ? state.me : null;

  let body: React.ReactNode;
  if (!cabinetConfigured) {
    body = <p className="py-20 text-center text-[#5A5A5A]">Кабінет скоро запрацює.</p>;
  } else if (state.status === 'loading') body = <Spinner />;
  else if (state.status === 'signedOut') body = <LoginScreen />;
  else if (state.error) {
    body = (
      <div className="mx-auto max-w-[32rem] px-4 py-20 text-center">
        <p className="font-semibold text-[#141414]">{state.error}</p>
        <button type="button" onClick={() => void signOut()} className="mt-4 text-sm font-semibold text-brand-orange">
          Увійти іншим акаунтом
        </button>
      </div>
    );
  } else if (!me) body = <Spinner />;
  else if (!me.isAdmin && me.clients.length === 0) {
    body = (
      <div className="mx-auto max-w-[32rem] px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-[#141414]">Доступу ще немає</h1>
        <p className="mt-3 text-[0.9375rem] text-[#5A5A5A]">
          Для <span className="font-semibold text-[#141414]">{me.email}</span> ще не відкрито жодного звіту. Якщо ви
          наш клієнт — напишіть вашому менеджеру, і ми додамо цей email.
        </p>
        <button type="button" onClick={() => void signOut()} className="mt-6 text-sm font-semibold text-brand-orange">
          Увійти іншим акаунтом
        </button>
      </div>
    );
  } else body = children(me);

  return (
    <div className="flex min-h-screen flex-col">
      <Header me={me} />
      {/* Біла робоча область — щонайменше на весь екран під шапкою (h-16), футер сайту починається нижче */}
      <main className="mx-auto min-h-[calc(100svh-4rem)] w-full max-w-[80rem] flex-1 px-4 pb-16 md:px-8">{body}</main>
      {/* Той самий чорний футер, що на всіх сторінках сайту */}
      <LocaleProvider locale="uk">
        <SiteFooter showConsentSettings={false} />
      </LocaleProvider>
    </div>
  );
}

/** Провайдер входу живе в layout кабінету, щоб стан не скидався між сторінками. */
export { CabinetAuthProvider };

export default function CabinetShell({ children }: { children: (me: Me) => React.ReactNode }) {
  return <Gate>{children}</Gate>;
}
