'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useCabinetAuth } from './CabinetAuth';

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export default function LoginScreen() {
  const { state, signInWithGoogle, sendLink, completeLink } = useCabinetAuth();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const needEmailForLink = state.status === 'signedOut' && state.needEmailForLink;
  const error = localError ?? (state.status === 'signedOut' ? state.error : undefined);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setLocalError('Введіть email, на який вам надали доступ.');
      return;
    }
    setSending(true);
    try {
      if (needEmailForLink) {
        await completeLink(email);
      } else {
        await sendLink(email);
        setSentTo(email.trim());
      }
    } catch (err) {
      setLocalError((err as Error).message || 'Не вдалося надіслати лист. Спробуйте ще раз.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-[25rem]">
        <h1 className="text-[1.75rem] font-bold leading-tight text-[#141414]">Кабінет клієнта</h1>
        <p className="mt-2 text-[0.9375rem] text-[#5A5A5A]">
          Звіти по вашій рекламі. Увійдіть тим email, на який ми надали доступ.
        </p>

        {sentTo ? (
          <div className="mt-8 border-[1.5px] border-[#D9D9D9] p-5">
            <div className="flex items-center gap-2 font-semibold text-[#141414]">
              <Mail className="h-5 w-5 text-brand-orange" aria-hidden="true" /> Перевірте пошту
            </div>
            <p className="mt-2 text-sm text-[#5A5A5A]">
              Ми надіслали посилання для входу на <span className="font-semibold text-[#141414]">{sentTo}</span>.
              Відкрийте його на цьому ж пристрої.
            </p>
            <button type="button" onClick={() => setSentTo(null)} className="mt-4 text-sm font-semibold text-brand-orange">
              Ввести інший email
            </button>
          </div>
        ) : (
          <>
            {!needEmailForLink && (
              <>
                <button
                  type="button"
                  onClick={() => void signInWithGoogle()}
                  className="mt-8 flex h-[3.25rem] w-full items-center justify-center gap-3 border-[1.5px] border-[#141414] text-[0.9375rem] font-semibold text-[#141414] transition hover:bg-[#F4F4F4]"
                >
                  <GoogleMark /> Увійти через Google
                </button>
                <div className="my-6 flex items-center gap-3 text-xs text-[#8A8A8A]">
                  <span className="h-px flex-1 bg-[#E5E5E5]" />
                  або посиланням на email
                  <span className="h-px flex-1 bg-[#E5E5E5]" />
                </div>
              </>
            )}
            {needEmailForLink && (
              <p className="mt-8 text-sm text-[#5A5A5A]">
                Ви відкрили посилання на іншому пристрої. Підтвердіть email, на який його надіслали.
              </p>
            )}
            <form onSubmit={submit} className={`flex flex-col gap-3 ${needEmailForLink ? 'mt-4' : ''}`} noValidate>
              <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
                Email
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  maxLength={200}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError(null);
                  }}
                  placeholder="name@company.com"
                  className="h-[3.25rem] border-[1.5px] border-[#D9D9D9] px-4 text-base font-normal text-[#141414] outline-none focus:border-[#141414]"
                />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="h-[3.25rem] bg-brand-orange text-[0.9375rem] font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {sending ? 'Зачекайте…' : needEmailForLink ? 'Увійти' : 'Надіслати посилання'}
              </button>
            </form>
          </>
        )}

        {error ? (
          <p role="alert" className="mt-4 text-sm font-semibold text-brand-orange">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
