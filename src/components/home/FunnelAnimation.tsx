'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useT } from '@/i18n/LocaleProvider';

/**
 * Анімація «втрачені продажі»: кульки-відвідувачі падають з воронки трафіку,
 * більшість витікає в три отвори (повільний сайт, складне оформлення,
 * немає довіри), і рівно троє доходять до покупки.
 *
 * Перенесено з прототипу `funnel-*.jsx`. Увесь рух — чиста функція часу T,
 * тож цикл безшовний. Годинник зупиняється, коли блок поза екраном.
 */

const ORANGE = '#FF5B2B';
const INK = '#FFFFFF';
const BG = '#141414';
const H = 22; // півширина труби
const R = 14; // радіус кульки
const LOOP = 23; // секунд на повний цикл
const CUES = { Traffic: 0, Journey: 3.5 };

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const MOTION = { enter: easeOutCubic, draw: easeInOutCubic, pop: easeOutBack };
const deg = (a: number) => (a * Math.PI) / 180;

type Seg =
  | { t: 'line'; a: [number, number]; b: [number, number]; len: number; d0: number }
  | {
      t: 'arc';
      c: [number, number];
      r: number;
      th0: number;
      dir: number;
      sweep: number;
      len: number;
      d0: number;
    };

/** Осьова лінія труби: відрізки й дуги, виміряні в довжині шляху. */
const SEGS: Seg[] = (() => {
  const raw = [
    { t: 'line', a: [360, 290], b: [360, 340] },
    { t: 'arc', c: [460, 340], r: 100, th0: deg(180), dir: -1, sweep: deg(90) },
    { t: 'line', a: [460, 440], b: [1500, 440] },
    { t: 'arc', c: [1500, 540], r: 100, th0: deg(-90), dir: 1, sweep: deg(180) },
    { t: 'line', a: [1500, 640], b: [520, 640] },
    { t: 'arc', c: [520, 740], r: 100, th0: deg(-90), dir: -1, sweep: deg(180) },
    { t: 'line', a: [520, 840], b: [1180, 840] },
  ] as const;

  let d = 0;
  return raw.map((s) => {
    const len =
      s.t === 'line'
        ? Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1])
        : s.r * s.sweep;
    const seg = { ...s, len, d0: d } as Seg;
    d += len;
    return seg;
  });
})();

const L = SEGS[SEGS.length - 1].d0 + SEGS[SEGS.length - 1].len;

/** Точка і дотична на відстані d уздовж осьової лінії. */
function at(dist: number) {
  const d = clamp(dist, 0, L);
  let s = SEGS[0];
  for (const g of SEGS) if (d >= g.d0) s = g;
  const u = d - s.d0;

  if (s.t === 'line') {
    const tx = (s.b[0] - s.a[0]) / s.len;
    const ty = (s.b[1] - s.a[1]) / s.len;
    return { x: s.a[0] + tx * u, y: s.a[1] + ty * u, tx, ty };
  }

  const th = s.th0 + (s.dir * u) / s.r;
  return {
    x: s.c[0] + s.r * Math.cos(th),
    y: s.c[1] + s.r * Math.sin(th),
    tx: -s.dir * Math.sin(th),
    ty: s.dir * Math.cos(th),
  };
}

const arcD = (i: number, a: number) => {
  const s = SEGS[i];
  return s.d0 + (s.t === 'arc' ? s.r * deg(a) : 0);
};
const lineX = (i: number, x: number) => {
  const s = SEGS[i];
  return s.d0 + (s.t === 'line' ? Math.abs(x - s.a[0]) : 0);
};

/** Три отвори, крізь які витікають відвідувачі. */
const HOLES = [
  { side: -1, from: arcD(3, 55), to: arcD(3, 95), exit: arcD(3, 40), kick: 1.0 },
  { side: 1, from: arcD(5, 55), to: arcD(5, 95), exit: arcD(5, 40), kick: 1.0 },
  { side: 1, from: lineX(6, 810), to: lineX(6, 900), exit: lineX(6, 770), kick: 0.45 },
];

/** Стінки труби з розривами на місцях отворів. */
const WALLS: { d: number; x: number; y: number }[][] = (() => {
  const out: { d: number; x: number; y: number }[][] = [];
  for (const side of [1, -1]) {
    let cur: { d: number; x: number; y: number }[] = [];
    for (let d = 0; d <= L + 0.01; d += 4) {
      const inGap = HOLES.some((h) => h.side === side && d > h.from && d < h.to);
      if (inGap) {
        if (cur.length) out.push(cur);
        cur = [];
        continue;
      }
      const p = at(d);
      cur.push({ d, x: p.x - p.ty * H * side, y: p.y + p.tx * H * side });
    }
    if (cur.length) out.push(cur);
  }
  return out;
})();

/** Позиції кульок у воронці, знизу вгору. */
const SLOTS: [number, number][] = (() => {
  const rows: [number, number][] = [
    [242, 1],
    [210, 2],
    [174, 3],
    [138, 4],
    [100, 5],
    [62, 6],
    [26, 7],
  ];
  const out: [number, number][] = [];
  rows.forEach(([y, n]) => {
    for (let i = 0; i < n; i++) out.push([360 + (i - (n - 1) / 2) * 38, y]);
  });
  return out;
})();

const BUY = [4, 14, 24]; // рівно три доходять до покупки
const FATE: (number | 'buy')[] = SLOTS.map((_, k) => (BUY.includes(k) ? 'buy' : k % 3));
const REST_X: Record<number, number> = {};
BUY.forEach((k, i) => {
  REST_X[k] = 1410 - i * 40;
});
const NECK: [number, number] = [360, 290];
const G = 1900; // гравітація для тих, хто випав

function ballState(k: number, T: number) {
  const [sx, sy] = SLOTS[k];
  const popT = CUES.Traffic + 1.4 + k * 0.06;
  const pop = MOTION.pop(clamp((T - popT) / 0.45, 0, 1));
  const release = CUES.Journey + 0.2 + k * 0.36;
  const v = 480 - 4 * (k % 5);
  const bob = Math.sin(T * 2.1 + k * 1.3) * 1.6;

  if (T < release) return { x: sx, y: sy + bob * pop, s: pop, o: 1 };

  const tau = T - release;
  const pre = Math.hypot(NECK[0] - sx, NECK[1] - sy);
  let u =
    v * (tau < 0.6 ? (tau * tau) / 1.2 : tau - 0.3) +
    14 * Math.sin(1.3 * tau + k) -
    14 * Math.sin(k);
  u = Math.max(0, u);

  if (u < pre) {
    const f = u / pre;
    return { x: sx + (NECK[0] - sx) * f, y: sy + (NECK[1] - sy) * f, s: 1, o: 1 };
  }

  const d = u - pre;
  const fate = FATE[k];

  if (fate !== 'buy') {
    const h = HOLES[fate];
    if (d >= h.exit) {
      const p = at(h.exit);
      const tExit = (d - h.exit) / v;
      const vx = p.tx * v * h.kick;
      const vy = p.ty * v * h.kick;
      return {
        x: p.x + vx * tExit,
        y: p.y + vy * tExit + 0.5 * G * tExit * tExit,
        s: 1,
        o: 1 - MOTION.draw(clamp((tExit - 0.35) / 0.6, 0, 1)),
      };
    }
  } else if (d >= L) {
    const tIn = (d - L) / v;
    const f = clamp(tIn / 1.1, 0, 1);
    const x = 1180 + (REST_X[k] - 1180) * MOTION.enter(f);
    const fy = clamp(tIn / 0.55, 0, 1);
    let y = 840 + (906 - 840) * fy * fy;
    if (tIn > 0.55) y = 906 - 10 * Math.sin(clamp((tIn - 0.55) / 0.3, 0, 1) * Math.PI);
    return { x, y, s: 1, o: 1 };
  }

  const p = at(d);
  return { x: p.x, y: p.y, s: 1, o: 1 };
}

function Stroke({ d, p, sw }: { d: string; p: number; sw: number }) {
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke={INK}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="1 1"
      strokeDashoffset={1 - p}
      opacity={p > 0 ? 1 : 0}
    />
  );
}

function Caption({
  x,
  y,
  text,
  o,
  anchor = 'start',
  size = 36,
  color = INK,
  weight = 300,
}: {
  x: number;
  y: number;
  text: string;
  o: number;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  color?: string;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      opacity={o}
      textAnchor={anchor}
      style={{ font: `${weight} ${size}px var(--font-display), sans-serif`, letterSpacing: '0.01em' }}
    >
      {text}
    </text>
  );
}

export default function FunnelAnimation({ stroke = 4 }: { stroke?: number }) {
  const t = useT();
  const [T, setT] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // показуємо «усталений» кадр: воронка порожня, покупки вже в кошику
      setT(18);
      return;
    }

    const host = hostRef.current;
    const io = host
      ? new IntersectionObserver(([e]) => {
          visibleRef.current = e.isIntersecting;
        })
      : null;
    if (io && host) io.observe(host);

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      if (visibleRef.current) setT(((now - t0) / 1000) % LOOP);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  const funnelP = MOTION.draw(clamp((T - 0.2) / 1.2, 0, 1));
  const pathD = MOTION.draw(clamp((T - 0.9) / 2.1, 0, 1)) * L;
  const boxP = MOTION.draw(clamp((T - 2.7) / 0.9, 0, 1));
  const lab1 = MOTION.enter(clamp((T - 0.9) / 0.9, 0, 1));
  const lab2 = MOTION.enter(clamp((T - 3.2) / 0.9, 0, 1));
  const labH = [0, 1, 2].map((i) =>
    MOTION.enter(clamp((T - (CUES.Journey + 2.2 + i * 0.9)) / 0.9, 0, 1)),
  );
  const fade = 1 - MOTION.draw(clamp((T - (LOOP - 0.9)) / 0.8, 0, 1));

  const walls = WALLS.map((w) => w.filter((q) => q.d <= pathD))
    .filter((w) => w.length > 1)
    .map((w) => 'M' + w.map((q) => `${q.x.toFixed(1)},${q.y.toFixed(1)}`).join('L'));

  const balls = SLOTS.map((_, k) => ballState(k, T));

  return (
    <div ref={hostRef} className="absolute inset-0" style={{ background: BG }}>
      <svg
        width="100%"
        height="100%"
        viewBox="160 0 1530 1020"
        className="absolute inset-0"
        role="img"
        aria-label={t.funnel.aria}
      >
        <g opacity={fade}>
          {/* воронка трафіку */}
          <ellipse
            cx="360"
            cy="90"
            rx="120"
            ry="14"
            fill="none"
            stroke={INK}
            strokeWidth={stroke}
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - funnelP}
            opacity={funnelP > 0 ? 1 : 0}
          />
          <Stroke d="M240,90 L338,250 L338,290" p={funnelP} sw={stroke} />
          <Stroke d="M480,90 L382,250 L382,290" p={funnelP} sw={stroke} />

          {/* труба */}
          {walls.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={INK}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* кошик покупок */}
          <Stroke d="M1180,818 V740 H1440 V920 H1180 V862" p={boxP} sw={stroke} />

          <Caption x={540} y={172} text={t.funnel.traffic} o={lab1} />
          <Caption x={1440} y={552} text={t.funnel.slow} o={labH[0]} anchor="end" size={38} color={ORANGE} weight={400} />
          <Caption x={580} y={752} text={t.funnel.checkout} o={labH[1]} size={38} color={ORANGE} weight={400} />
          <Caption x={855} y={955} text={t.funnel.trust} o={labH[2]} anchor="middle" size={38} color={ORANGE} weight={400} />
          <Caption x={1310} y={985} text={t.funnel.purchase} o={lab2} anchor="middle" />

          {balls.map((b, k) => (
            <circle
              key={k}
              cx={b.x}
              cy={b.y}
              r={R * Math.max(0, b.s)}
              fill={ORANGE}
              opacity={b.o * (b.s > 0.01 ? 1 : 0)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
