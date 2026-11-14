'use client';

/**
 * Стан входу в кабінет: Google або посилання на email, без паролів.
 * Після входу підтягуємо `me` з сервера — саме сервер вирішує, хто адмін
 * і яких клієнтів людина бачить.
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut as fbSignOut,
  type User,
} from 'firebase/auth';
import { cabinetAuth, cabinetConfigured } from '@/lib/cabinet/firebase';
import { cabinetCall, errorMessage, type Me } from '@/lib/cabinet/api';

const EMAIL_KEY = 'cabinet-email-for-link';

type State =
  | { status: 'loading' }
  | { status: 'signedOut'; error?: string; needEmailForLink?: boolean }
  | { status: 'signedIn'; user: User; me: Me | null; error?: string };

type Ctx = {
  state: State;
  signInWithGoogle: () => Promise<void>;
  sendLink: (email: string) => Promise<void>;
  completeLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<Ctx | null>(null);

export function useCabinetAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useCabinetAuth outside CabinetAuthProvider');
  return ctx;
}

function readStoredEmail() {
  try {
    return window.localStorage.getItem(EMAIL_KEY);
  } catch {
    return null;
  }
}

function authErrorText(error: unknown) {
  const code = (error as { code?: string })?.code ?? '';
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return undefined;
  if (code === 'auth/invalid-action-code' || code === 'auth/expired-action-code') {
    return 'Посилання застаріло або вже використане. Запросіть нове.';
  }
  if (code === 'auth/invalid-email') return 'Перевірте email — схоже, в ньому помилка.';
  if (code === 'auth/too-many-requests') return 'Забагато спроб. Спробуйте за кілька хвилин.';
  if (code === 'auth/popup-blocked') return 'Браузер заблокував вікно входу. Дозвольте спливні вікна для цього сайту.';
  return 'Не вдалося увійти. Спробуйте ще раз.';
}

export function CabinetAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({ status: 'loading' });

  const completeLink = useCallback(async (email: string) => {
    const auth = cabinetAuth();
    try {
      await signInWithEmailLink(auth, email.trim(), window.location.href);
      try {
        window.localStorage.removeItem(EMAIL_KEY);
      } catch {}
      // Одноразовий код не має лишатися в адресі й історії браузера; решту параметрів (id звіту) лишаємо
      const url = new URL(window.location.href);
      ['mode', 'oobCode', 'apiKey', 'lang', 'continueUrl', 'tenantId'].forEach((k) => url.searchParams.delete(k));
      window.history.replaceState(null, '', url.pathname + url.search);
    } catch (error) {
      setState({ status: 'signedOut', error: authErrorText(error) });
    }
  }, []);

  useEffect(() => {
    if (!cabinetConfigured) return;
    const auth = cabinetAuth();
    let linkPending = false;
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const stored = readStoredEmail();
      linkPending = Boolean(stored);
      // Мікрозадача: стан оновлюємо після ефекту, а не синхронно в ньому
      void Promise.resolve().then(() =>
        stored
          ? completeLink(stored)
          : // Посилання відкрили на іншому пристрої — просимо email ще раз
            setState({ status: 'signedOut', needEmailForLink: true }),
      );
    }
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (!linkPending) setState((s) => (s.status === 'signedOut' ? s : { status: 'signedOut' }));
        linkPending = false;
        return;
      }
      setState({ status: 'signedIn', user, me: null });
      try {
        const me = await cabinetCall<Me>('me');
        setState({ status: 'signedIn', user, me });
      } catch (error) {
        setState({ status: 'signedIn', user, me: null, error: errorMessage(error) });
      }
    });
  }, [completeLink]);

  const signInWithGoogle = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(cabinetAuth(), provider);
    } catch (error) {
      const text = authErrorText(error);
      if (text) setState({ status: 'signedOut', error: text });
    }
  }, []);

  const sendLink = useCallback(async (email: string) => {
    const clean = email.trim();
    await sendSignInLinkToEmail(cabinetAuth(), clean, {
      // Повертаємо туди, звідки людина просила посилання (наприклад, на конкретний звіт)
      url: `${window.location.origin}${window.location.pathname}${window.location.search}`,
      handleCodeInApp: true,
    }).catch((error) => {
      throw new Error(authErrorText(error));
    });
    try {
      window.localStorage.setItem(EMAIL_KEY, clean);
    } catch {}
  }, []);

  const signOut = useCallback(async () => {
    await fbSignOut(cabinetAuth());
  }, []);

  return (
    <AuthContext.Provider value={{ state, signInWithGoogle, sendLink, completeLink, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
