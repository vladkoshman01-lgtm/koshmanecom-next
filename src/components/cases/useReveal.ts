'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Стан появи блоку при прокрутці.
 *
 * 'static' — початковий (SSR і користувачі з prefers-reduced-motion): усе видно
 *   одразу, без анімації. Так текст і цифри завжди є в HTML у кінцевому вигляді.
 * 'hidden' — після гідрації, поки блок не на екрані.
 * 'shown'  — блок зʼявився на екрані, анімація відтворюється один раз.
 */
export type RevealState = 'static' | 'hidden' | 'shown';

/**
 * @param threshold частка блоку на екрані для IntersectionObserver
 * @param startAt запасна перевірка: верх блоку вище цієї частки висоти вікна (1 — щойно зʼявився)
 */
export function useReveal<T extends Element>(threshold = 0.15, startAt = 0.85) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>('static');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setState('hidden');
    const io = new IntersectionObserver(
      ([entry]) => {
        // Видно на екрані — або вже проскролили повз (перехід за якорем): показуємо
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          setState('shown');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);

    // Запасна перевірка: поки вантажаться шрифти й картинки, верстка зсувається,
    // а спостерігач не завжди повідомляє, що блок уже на екрані без прокрутки.
    // Тому перші кілька секунд перевіряємо положення самі.
    let done = false;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      // На екрані або вже проскролили повз (перехід за якорем)
      if (r.top < window.innerHeight * startAt) {
        done = true;
        setState('shown');
        io.disconnect();
      }
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(check));
    const interval = window.setInterval(check, 250);
    const stop = window.setTimeout(() => window.clearInterval(interval), 4000);
    document.fonts?.ready.then(check);
    window.addEventListener('scroll', check, { passive: true });

    return () => {
      done = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearInterval(interval);
      window.clearTimeout(stop);
      window.removeEventListener('scroll', check);
    };
  }, [threshold, startAt]);

  return [ref, state] as const;
}
