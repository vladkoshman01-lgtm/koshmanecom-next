'use client';

import React, { useState } from 'react';
import Link from '@/components/ui/LocaleLink';

/**
 * CTA-кнопка з макета: на ховері з-під стрілки «виростає» заливка,
 * стрілка їде вправо, текст перефарбовується. Еталон — Button Animation.dc.html.
 *
 * primary — помаранчева, заливка біла;
 * outline — прозора з темною рамкою, заливка темна;
 * light — біла, заливка темна;
 * dark — чорна, заливка помаранчева (кнопки секцій на сторінці послуг).
 */
type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'light' | 'dark';
  /** 'arrow' — стрілка (за замовчуванням), 'telegram' — паперовий літачок, 'whatsapp' — хмарка чату. */
  icon?: 'arrow' | 'telegram' | 'whatsapp';
  /** 'submit' — для кнопки у формі. */
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
};

const ICON_PATHS: Record<'arrow' | 'telegram' | 'whatsapp', string> = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  telegram: 'M21 3L3 10.5l7 3 3 7.5L21 3zM10 13.5L21 3',
  whatsapp: 'M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z',
};

const STYLES = {
  primary: {
    base: 'bg-brand-orange border-brand-orange',
    fill: '#ffffff',
    arrow: 'text-brand-orange',
    textIdle: '#ffffff',
    textHover: '#FF5B2B',
  },
  outline: {
    base: 'bg-transparent border-[#222222]',
    fill: '#222222',
    arrow: 'text-white',
    textIdle: '#222222',
    textHover: '#ffffff',
  },
  light: {
    base: 'bg-white border-white',
    fill: '#141414',
    arrow: 'text-white',
    textIdle: '#FF5B2B',
    textHover: '#ffffff',
  },
  dark: {
    base: 'bg-[#141414] border-[#141414]',
    fill: '#FF5B2B',
    arrow: 'text-white',
    textIdle: '#ffffff',
    textHover: '#ffffff',
  },
} as const;

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  icon = 'arrow',
  type = 'button',
  disabled = false,
  className = '',
}: Props) {
  const [hovered, setHovered] = useState(false);
  const s = STYLES[variant];

  const inner = (
    <>
      {/* Телефон: проста кнопка на всю ширину зі стрілкою справа.
          Десктоп: анімована заливка з-під стрілки зліва. */}
      {/* заливка, що виростає */}
      <span
        aria-hidden
        className="btn-cta-fill absolute inset-y-1 left-1 -z-10 hidden transition-[width] duration-[550ms] ease-[cubic-bezier(.65,0,.25,1)] md:block"
        style={{ width: hovered ? 'calc(100% - 8 * var(--u))' : 'calc(46 * var(--u))', background: s.fill }}
      />
      {/* стрілка */}
      <span
        aria-hidden
        className={`btn-cta-fill btn-cta-arrow absolute inset-y-1 left-1 hidden w-[2.875rem] items-center justify-center md:flex ${s.arrow}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-[550ms] ease-[cubic-bezier(.65,0,.25,1)]"
          style={{ transform: hovered ? 'translateX(6px)' : 'none' }}
        >
          <path d={ICON_PATHS[icon]} />
        </svg>
      </span>
      <span
        className="text-center text-[0.875rem] font-bold uppercase leading-[1.25] tracking-[0.02em] md:text-[0.9375rem] transition-colors delay-100 duration-[350ms] md:text-left md:whitespace-nowrap md:text-[length:inherit]"
        style={{ color: hovered ? s.textHover : s.textIdle }}
      >
        {children}
      </span>
      <span className="md:hidden" aria-hidden style={{ color: s.textIdle }}>
        →
      </span>
    </>
  );

  // На вузьких екранах текст переноситься, тож висота росте замість того,
  // щоб кнопка вилазила за межі екрана.
  const classes = `btn-cta relative isolate flex h-14 w-full max-w-full items-center justify-center gap-2.5 overflow-hidden border-[1.5px] px-3 md:inline-flex md:h-auto md:min-h-[3.5625rem] md:w-auto md:justify-start md:gap-0 md:px-0 md:py-3 md:pl-[4.5rem] md:pr-[1.875rem] ${s.base} ${className}`;
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (href) {
    return (
      <Link href={href} className={classes} {...handlers}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-60`}
      {...handlers}
    >
      {inner}
    </button>
  );
}
