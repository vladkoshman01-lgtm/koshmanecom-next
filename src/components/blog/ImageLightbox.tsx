'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Перегляд картинок статті поверх сторінки замість нової вкладки.
 *
 * Слухаємо кліки по `.blog-figure-link` усередині тексту (картинки рендерить
 * серверний BlogContent, тож обробник вішаємо делегуванням). Саме посилання
 * лишається — без JS картинка просто відкриється за адресою.
 *
 * Спершу картинка вписана в екран; тап збільшує її до читабельного розміру,
 * і її можна гортати пальцем — інфографіка на телефоні інакше дрібна.
 */
export default function ImageLightbox() {
  const t = useT();
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    setImage(null);
    setZoomed(false);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('.blog-markdown a.blog-figure-link');
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const img = link.querySelector('img');
      e.preventDefault();
      setImage({ src: link.href, alt: img?.alt ?? '' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    // Сторінка під вікном не прокручується
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [image, close]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex flex-col bg-[#141414]"
      onClick={close}
    >
      <div className="flex flex-none items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
        <span className="text-[0.8125rem] text-[#CFCFCF]">{zoomed ? t.blog.zoomOut : t.blog.zoomIn}</span>
        <button
          type="button"
          onClick={close}
          aria-label={t.blog.close}
          className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-brand-orange"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div
        className={`min-h-0 flex-1 overscroll-contain ${
          zoomed ? 'overflow-auto' : 'flex items-center justify-center overflow-hidden px-4 pb-6 md:px-10 md:pb-10'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed((z) => !z);
          }}
          className={
            zoomed
              ? 'block h-auto w-[1200px] max-w-none cursor-zoom-out'
              : 'max-h-full max-w-full cursor-zoom-in rounded object-contain'
          }
        />
      </div>
    </div>
  );
}
