'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MarsCat from './MarsCat';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Логотип у футері — це пасхалка, а не посилання (так у прототипі
 * FooterLogo.dc.html): на ховер з-за плашки визирає кіт Марс, клік дає
 * наступну фразу, а шість кліків за 1.8с трясуть плашку й сиплють конфетті.
 * На головну ведуть логотип у хедері та пункт «Головна» в навігації футера.
 * Анімації вимикаються при prefers-reduced-motion.
 */
export default function FooterLogo({ size = 279 }: { size?: number }) {
  const t = useT();
  const phrases = t.easter.footerPhrases;
  const [hovered, setHovered] = useState(false);
  const [out, setOut] = useState(false);
  const [rage, setRage] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(-1);
  const boxRef = useRef<HTMLButtonElement>(null);
  const clicksRef = useRef<number[]>([]);
  const hideTimer = useRef<number | undefined>(undefined);
  const rageTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(rageTimer.current);
    },
    [],
  );

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const burst = useCallback(() => {
    const box = boxRef.current;
    if (!box || reduced()) return;

    box.animate(
      [
        { transform: 'none' },
        { transform: 'translate(-6px,2px) rotate(-3deg)' },
        { transform: 'translate(6px,-2px) rotate(3deg)' },
        { transform: 'none' },
      ],
      { duration: 420, iterations: 2 },
    );

    const rect = box.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9999',
    });
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const ox = rect.left + rect.width / 2;
    const oy = rect.top + rect.height / 3;
    const balls = Array.from({ length: 70 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
      const v = 500 + Math.random() * 700;
      return {
        x: ox,
        y: oy,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        r: 6 + Math.random() * 10,
        c: Math.random() < 0.8 ? '#FF5B2B' : '#ffffff',
      };
    });

    const start = performance.now();
    let last = start;
    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const age = (now - start) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.max(0, Math.min(1, 4.2 - age));
      for (const b of balls) {
        b.vy += 1900 * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.y > H - b.r) {
          b.y = H - b.r;
          b.vy *= -0.55;
          b.vx *= 0.85;
        }
        if (b.x < b.r || b.x > W - b.r) {
          b.vx *= -0.7;
          b.x = Math.max(b.r, Math.min(W - b.r, b.x));
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.c;
        ctx.fill();
      }
      if (age < 4.2) requestAnimationFrame(tick);
      else canvas.remove();
    };
    requestAnimationFrame(tick);
  }, []);

  const handleClick = () => {
    const now = Date.now();
    clicksRef.current = [...clicksRef.current, now].filter((t) => now - t < 1800);

    // Затискали кліками — кіт «обурюється» і сипле конфетті
    if (clicksRef.current.length >= 6 && !rage) {
      clicksRef.current = [];
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(rageTimer.current);
      setRage(true);
      setOut(true);
      burst();
      rageTimer.current = window.setTimeout(() => {
        setRage(false);
        setOut(false);
      }, 3600);
      return;
    }
    if (rage) return;

    window.clearTimeout(hideTimer.current);
    setOut(true);
    setPhraseIndex((i) => i + 1);
    hideTimer.current = window.setTimeout(() => setOut(false), 3200);
  };

  const phrase = rage ? t.easter.marsRage : phrases[Math.max(0, phraseIndex) % phrases.length];
  const showBubble = out;
  const scale = size / 279;
  /** Розмір із макета в одиницях --u, щоб логотип масштабувався разом зі сторінкою. */
  const u = (px: number) => `calc(${+(px * scale).toFixed(2)} * var(--u))`;

  return (
    <div
      className="relative select-none"
      style={{ width: u(279), height: u(279) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* кіт визирає з-за плашки */}
      <div
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: u(150),
          bottom: `calc(100% - ${u(14)})`,
          width: u(96),
          height: u(78),
        }}
      >
        <MarsCat
          width="100%"
          height="100%"
          style={{
            display: 'block',
            transform: showBubble ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform .45s cubic-bezier(.34,1.4,.5,1)',
          }}
        />
      </div>

      {/* Бульбашка з фразою — праворуч від кота: ліворуч довгі фрази
          вилазили за край футера й обрізалися. На телефоні текст
          переноситься, щоб не виходити за екран. */}
      <div
        className="pointer-events-none absolute w-max max-w-[13rem] bg-white px-3.5 py-2 text-sm font-bold leading-[1.3] text-[#141414] md:max-w-none md:whitespace-nowrap"
        style={{
          left: u(258),
          bottom: `calc(100% + ${u(22)})`,
          opacity: showBubble ? 1 : 0,
          transform: showBubble ? 'scale(1)' : 'scale(.8)',
          transformOrigin: '0% 100%',
          transition: 'opacity .25s, transform .3s cubic-bezier(.34,1.4,.5,1)',
        }}
      >
        {phrase}
        <span
          className="absolute -left-1.5 bottom-2 h-0 w-0"
          style={{
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '7px solid #ffffff',
          }}
          aria-hidden
        />
      </div>

      {/* сама плашка: за макетом це не посилання, а кнопка-пасхалка */}
      <button
        type="button"
        ref={boxRef}
        onClick={handleClick}
        aria-label={t.easter.petMars}
        className="absolute left-0 top-0 flex items-end bg-brand-orange text-left"
        style={{ width: u(279), height: u(279), padding: `0 ${u(23)} ${u(23)}` }}
      >
        <span
          className="font-extrabold uppercase leading-[1.2] tracking-[0.02em] text-white"
          style={{ fontSize: u(39) }}
        >
          Koshman
          <br />
          Ecom
        </span>
      </button>
    </div>
  );
}
