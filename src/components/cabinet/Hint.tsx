'use client';

/**
 * Значок «i» з поясненням простими словами. Відкривається наведенням,
 * фокусом з клавіатури або дотиком на телефоні; закривається Esc чи дотиком поза ним.
 */
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';

export default function Hint({ text, label, align = 'start' }: { text: string; label: string; align?: 'start' | 'end' }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  // Біля краю екрана підказку зсуваємо всередину, щоб не з'являвся горизонтальний скрол
  useLayoutEffect(() => {
    const tip = tipRef.current;
    if (!open || !tip) return;
    tip.style.transform = '';
    const rect = tip.getBoundingClientRect();
    const margin = 12;
    let dx = 0;
    if (rect.right > window.innerWidth - margin) dx = window.innerWidth - margin - rect.right;
    if (rect.left + dx < margin) dx = margin - rect.left;
    if (dx) tip.style.transform = `translateX(${dx}px)`;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-flex align-middle" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label={`Що таке «${label}»`}
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-5 w-5 items-center justify-center text-[#A0A0A0] hover:text-[#141414] focus-visible:text-[#141414]"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      {open ? (
        <span
          id={id}
          ref={tipRef}
          role="tooltip"
          className={`absolute top-full z-20 mt-1 w-[15rem] max-w-[calc(100vw-2rem)] ${align === 'end' ? 'right-0' : 'left-0'} bg-[#141414] px-3 py-2 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-white`}
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}
