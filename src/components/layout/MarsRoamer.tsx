'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@/components/ui/LocaleLink';
import { usePathname } from 'next/navigation';
import { useT } from '@/i18n/LocaleProvider';
import { locales, type Locale } from '@/lib/i18n';
import MarsCat from './MarsCat';

/**
 * Кіт Марс — пасхалка сайту.
 *
 * Поводження з прототипу MarsRoamer.dc.html:
 * • випадкові появи лише на десктопі: перша через 12–20с, далі кожні 60–90с,
 *   максимум 4 на сторінку; не виходить, поки людина друкує або скролить;
 *   на кожній новій сторінці відлік починається заново, щоб у футері він
 *   поводився однаково скрізь, а не тільки на першій відкритій сторінці;
 * • п'ять видів появи: знизу, справа, зліва, звисає згори та проходжається
 *   по футеру (останнє — лише коли футер у полі зору);
 * • три кліки за сесію відкривають промокод MARS15;
 * • на копіювання тексту від 12 символів визирає зменшений кіт із фразою;
 *   не частіше разу на 20 секунд, працює і на телефоні.
 *
 * Розмір кота фіксований у пікселях і не залежить від масштабу сторінки.
 */

type Kind = 'bottom' | 'right' | 'left' | 'hang' | 'walk';

const COPY_PHRASE = 'Бери, не шкода. Але краще напиши нам';

const session = {
  get(key: string): number {
    try {
      return Number(sessionStorage.getItem(key) || 0);
    } catch {
      return 0;
    }
  },
  set(key: string, value: number) {
    try {
      sessionStorage.setItem(key, String(value));
    } catch {
      // приватний режим — лічильник просто не збережеться
    }
  },
};

export default function MarsRoamer() {
  const pathname = usePathname();
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [out, setOut] = useState(false);
  const [kind, setKind] = useState<Kind>('bottom');
  const [pos, setPos] = useState({ left: 0, top: 0, scale: 1 });
  const [bubble, setBubble] = useState<string | null>(null);
  const [promo, setPromo] = useState(false);
  const [copied, setCopied] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const [catRect, setCatRect] = useState<{ left: number; top: number; right: number; bottom: number; width: number; height: number } | null>(null);
  const timers = useRef<number[]>([]);
  const lastScroll = useRef(0);
  const lastCopy = useRef(0);
  const lastPhrase = useRef('');
  const hideTimer = useRef<number | undefined>(undefined);
  const state = useRef({ visible: false, promo: false, kind: 'bottom' as Kind });

  state.current = { visible, promo, kind };

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  const hide = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    setOut(false);
    setBubble(null);
    later(() => setVisible(false), 550);
  }, [later]);

  const pagePhrase = useCallback(() => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    // На /en та /sk перший сегмент — код мови, сторінка йде наступною
    const segment = (locales.includes(parts[0] as Locale) ? parts[1] : parts[0]) ?? '';
    // Фрази сторінки й загальні — обидві мовою сторінки
    const pagePhrases: Record<string, string[]> = t.easter.pagePhrases;
    const list = [...(pagePhrases[segment] ?? []), ...t.easter.marsPhrases.slice(0, 2)];
    let phrase = list[0];
    for (let i = 0; i < 6; i++) {
      phrase = list[Math.floor(Math.random() * list.length)];
      if (phrase !== lastPhrase.current) break;
    }
    lastPhrase.current = phrase;
    return phrase;
  }, [t]);

  const appear = useCallback(
    (forced?: Kind, manual = false, say?: string) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const footer = document.querySelector('footer');
      const rect = footer?.getBoundingClientRect();
      const footerVisible = !!rect && rect.top > 120 && rect.top < H - 60;

      // «Прогулянку» по футеру додаємо двічі, щоб вона випадала частіше
      const kinds: Kind[] = ['bottom', 'right', 'left', 'hang'];
      if (footerVisible) kinds.push('walk', 'walk');
      const next = forced ?? kinds[Math.floor(Math.random() * kinds.length)];

      const rnd = (a: number, b: number) => a + Math.random() * (b - a);
      let left = 0;
      let top = 0;
      if (next === 'bottom') {
        left = say ? Math.min(W - 230, Math.max(150, W * 0.6)) : rnd(0.35, 0.85) * W;
        top = H - 78;
      }
      if (next === 'hang') {
        left = rnd(0.2, 0.8) * W;
        top = 82;
      }
      if (next === 'right') {
        left = W - 87;
        top = rnd(0.3, 0.65) * H;
      }
      if (next === 'left') {
        left = -9;
        top = rnd(0.3, 0.65) * H;
      }
      if (next === 'walk') {
        left = -130;
        top = (rect ? rect.top : H) - 64;
      }

      if (!manual) session.set('mars-shown', session.get('mars-shown') + 1);

      // Реакція на копіювання — трохи менший кіт.
      // Коробка завжди прилягає низом до краю екрана, а масштаб рахується
      // від нижнього краю, тож кіт визирає рівно на стільки, скільки треба.
      const scale = say ? 0.72 : 1;

      setKind(next);
      setPos({ left, top, scale });
      setBubble(null);
      setVisible(true);

      // На прогулянці ціль руху зберігаємо в самій позиції (як у прототипі):
      // інакше на зникненні `left` повернувся б до стартового значення
      // і кіт поповз би назад замість того, щоб піти за край екрана.
      later(() => {
        setOut(true);
        if (next === 'walk') setPos((prev) => ({ ...prev, left: W + 30 }));
      }, 60);
      if (next !== 'walk') {
        later(() => setBubble(say ?? pagePhrase()), 500);
      }
      hideTimer.current = later(() => hide(), next === 'walk' ? 8200 : say ? 4200 : 3200);
    },
    [hide, later, pagePhrase],
  );

  // Випадкові появи. Перезапускаємо на кожній сторінці.
  useEffect(() => {
    session.set('mars-shown', 0);

    const tick = () => {
      if (session.get('mars-shown') >= 4) return;

      const active = document.activeElement;
      const typing = !!active && /INPUT|TEXTAREA|SELECT/.test(active.tagName);
      const calm = Date.now() - lastScroll.current > 800;

      if (
        document.visibilityState !== 'visible' ||
        typing ||
        !calm ||
        state.current.promo ||
        state.current.visible
      ) {
        later(tick, 5000);
        return;
      }

      appear();
      later(tick, 60000 + Math.random() * 30000);
    };

    const onScroll = () => {
      lastScroll.current = Date.now();
      if (state.current.visible && state.current.kind === 'walk') hide();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && window.innerWidth >= 768) {
      later(tick, 12000 + Math.random() * 8000);
    }

    const captured = timers.current;
    return () => {
      captured.forEach(window.clearTimeout);
      timers.current = [];
      window.removeEventListener('scroll', onScroll);
      // Йдемо на іншу сторінку — прибираємо кота, щоб він не «завис»
      setOut(false);
      setVisible(false);
      setBubble(null);
    };
  }, [appear, hide, later, pathname]);

  // Реакція на копіювання тексту — працює на всіх пристроях
  useEffect(() => {
    const onCopy = () => {
      const selection = String(window.getSelection() ?? '').trim();
      if (selection.length < 12) return;
      if (state.current.promo || Date.now() - lastCopy.current < 20000) return;

      lastCopy.current = Date.now();
      const wasVisible = state.current.visible;
      if (wasVisible) hide();
      later(() => appear('bottom', true, t.easter.marsCopy), wasVisible ? 600 : 0);
    };

    document.addEventListener('copy', onCopy);
    return () => document.removeEventListener('copy', onCopy);
  }, [appear, hide, later]);

  /** Погладжування: три кліки за сесію відкривають промокод. */
  const pet = () => {
    const clicks = session.get('mars-clicks') + 1;
    session.set('mars-clicks', clicks);

    if (clicks === 3) {
      hide();
      setPromo(true);
      return;
    }

    window.clearTimeout(hideTimer.current);
    setBubble(
      clicks === 2
        ? t.easter.marsAgain
        : t.easter.marsPhrases[Math.floor(Math.random() * t.easter.marsPhrases.length)],
    );
    if (kind !== 'walk') hideTimer.current = later(() => hide(), 2600);
  };

  // Бульбашку ставимо від реального прямокутника кота: у поворотах
  // (кіт звисає згори чи визирає збоку) обчислені «на око» відступи
  // накривали йому морду.
  useEffect(() => {
    if (!visible) {
      setCatRect(null);
      return;
    }
    const measure = () => {
      const el = catRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCatRect({ left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height });
    };
    measure();
    const id = window.setTimeout(measure, 560);
    return () => window.clearTimeout(id);
  }, [visible, out, kind, bubble, pos.left, pos.top]);

  const rotation: Record<Kind, string> = {
    bottom: 'none',
    hang: 'rotate(180deg)',
    right: 'rotate(-90deg)',
    left: 'rotate(90deg)',
    walk: 'none',
  };

  /** Відступ між котом і бульбашкою. */
  const GAP = 12;
  // Запасні координати до першого виміру (DOMRect немає під час рендеру на сервері)
  const box = catRect ?? {
    left: pos.left,
    top: pos.top,
    width: 96,
    height: 78,
    right: pos.left + 96,
    bottom: pos.top + 78,
  };
  const bubbleBox: Record<Kind, [number, number, string]> = {
    bottom: [box.left + box.width / 2, box.top - GAP, 'translate(-50%,-100%)'],
    walk: [box.left + box.width / 2, box.top - GAP, 'translate(-50%,-100%)'],
    hang: [box.left + box.width / 2, box.bottom + GAP, 'translateX(-50%)'],
    right: [box.left - GAP, box.top + box.height / 2, 'translate(-100%,-50%)'],
    left: [box.right + GAP, box.top + box.height / 2, 'translateY(-50%)'],
  };
  const [bubbleLeft, bubbleTop, bubbleTransform] = bubbleBox[kind];

  return (
    <>
      {visible ? (
        <>
          <div
            ref={catRef}
            className="pointer-events-none fixed z-[105] h-[78px] w-[96px]"
            style={{
              left: pos.left,
              top: pos.top,
              transform: `${rotation[kind]} scale(${pos.scale})`,
              transformOrigin: 'bottom center',
              transition: kind === 'walk' ? 'left 8s linear' : 'none',
            }}
          >
            <div className="h-[78px] w-[96px] overflow-hidden">
              <button
                type="button"
                onClick={pet}
                aria-label={t.easter.petMars}
                className="mars-cat pointer-events-auto block cursor-pointer border-0 bg-transparent p-0"
                style={{
                  transform:
                    kind === 'walk' ? 'translateY(8%)' : out ? 'translateY(0)' : 'translateY(100%)',
                  transition: 'transform .5s cubic-bezier(.34,1.4,.5,1)',
                  animation: kind === 'walk' && out ? 'marsBob .45s ease-in-out infinite' : 'none',
                }}
              >
                <MarsCat
                  width={96}
                  height={78}
                  pupilLeft={kind === 'left' ? 63 : 57}
                  pupilRight={kind === 'left' ? 103 : 97}
                />
              </button>
            </div>
          </div>

          {bubble ? (
            <div
              className="pointer-events-none fixed z-[106] whitespace-nowrap bg-white px-4 py-2.5 text-[0.9375rem] font-bold text-[#141414] shadow-[0_10px_28px_rgba(0,0,0,.18)]"
              style={{ left: bubbleLeft, top: bubbleTop, transform: bubbleTransform }}
            >
              {bubble}
            </div>
          ) : null}
        </>
      ) : null}

      {promo ? (
        <div
          className="mars-fade fixed inset-0 z-[130] flex items-center justify-center bg-[rgba(15,15,15,.78)] p-5"
          role="dialog"
          aria-label="Промокод від Марса"
          onClick={() => {
            setPromo(false);
            setCopied(false);
          }}
        >
          <div
            className="mars-rise relative flex w-full max-w-[27.5rem] flex-col gap-[1.125rem] bg-white px-9 pb-9 pt-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                setPromo(false);
                setCopied(false);
              }}
              aria-label={t.lead.closeAria}
              className="absolute right-2.5 top-2.5 h-11 w-11 text-2xl text-[#8A8A8A]"
            >
              ×
            </button>

            <div className="text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-brand-orange">
              {t.easter.marsEyebrow}
            </div>
            <div className="text-[2.75rem] font-bold leading-[1] text-[#141414]">−15%</div>
            <div className="text-base text-[#555555]">{t.easter.discountFor}</div>

            <div className="flex items-center gap-2.5">
              <span className="flex h-12 flex-1 items-center justify-center border-[1.5px] border-dashed border-[#DCDCDC] text-lg font-bold tracking-[0.08em] text-[#141414]">
                MARS15
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('MARS15').catch(() => {});
                  setCopied(true);
                }}
                className="h-12 bg-[#141414] px-5 text-sm font-bold uppercase tracking-[0.02em] text-white"
              >
                {copied ? t.easter.copied : t.easter.copy}
              </button>
            </div>

            <Link
              href="/contacts"
              onClick={() => setPromo(false)}
              className="flex h-14 items-center justify-center bg-brand-orange text-[0.9375rem] font-bold uppercase tracking-[0.02em] text-white"
            >
              {t.easter.bookCall}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
