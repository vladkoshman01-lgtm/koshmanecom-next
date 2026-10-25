// Traffic → purchase funnel. All motion is a pure function of T.
const ORANGE = '#FF5E29', INK = '#FFFFFF', BG = '#141414';
const H = 22, R = 14; // tube half-width, circle radius
const MOTION = {
  enter: Easing.easeOutCubic,
  draw: Easing.easeInOutCubic,
  pop: Easing.easeOutBack,
};
const deg = (a) => a * Math.PI / 180;

// Centerline: lines + arcs. Arc: theta = th0 + dir*s/r.
const SEGS = (() => {
  const raw = [
    { t: 'line', a: [360, 290], b: [360, 340] },
    { t: 'arc', c: [460, 340], r: 100, th0: deg(180), dir: -1, sweep: deg(90) },
    { t: 'line', a: [460, 440], b: [1500, 440] },
    { t: 'arc', c: [1500, 540], r: 100, th0: deg(-90), dir: 1, sweep: deg(180) },
    { t: 'line', a: [1500, 640], b: [520, 640] },
    { t: 'arc', c: [520, 740], r: 100, th0: deg(-90), dir: -1, sweep: deg(180) },
    { t: 'line', a: [520, 840], b: [1180, 840] },
  ];
  let d = 0;
  return raw.map((s) => {
    s.len = s.t === 'line' ? Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]) : s.r * s.sweep;
    s.d0 = d; d += s.len; return s;
  });
})();
const L = SEGS[SEGS.length - 1].d0 + SEGS[SEGS.length - 1].len;

function at(d) {
  d = clamp(d, 0, L);
  let s = SEGS[0];
  for (const g of SEGS) if (d >= g.d0) s = g;
  const u = d - s.d0;
  if (s.t === 'line') {
    const tx = (s.b[0] - s.a[0]) / s.len, ty = (s.b[1] - s.a[1]) / s.len;
    return { x: s.a[0] + tx * u, y: s.a[1] + ty * u, tx, ty };
  }
  const th = s.th0 + s.dir * u / s.r;
  return { x: s.c[0] + s.r * Math.cos(th), y: s.c[1] + s.r * Math.sin(th),
           tx: -s.dir * Math.sin(th), ty: s.dir * Math.cos(th) };
}
// normal n = (-ty, tx); side +1 = +n
const arcD = (i, a) => SEGS[i].d0 + SEGS[i].r * deg(a);
const lineX = (i, x) => SEGS[i].d0 + Math.abs(x - SEGS[i].a[0]);

// Three unlabeled openings: [side, dFrom, dTo], plus exit point + kick
const HOLES = [
  { side: -1, from: arcD(3, 55), to: arcD(3, 95), exit: arcD(3, 40), kick: 1.0 },  // right bend, outer wall
  { side: 1, from: arcD(5, 55), to: arcD(5, 95), exit: arcD(5, 40), kick: 1.0 },   // left bend, outer wall
  { side: 1, from: lineX(6, 810), to: lineX(6, 900), exit: lineX(6, 770), kick: 0.45 }, // bottom run, floor
];

const WALLS = (() => {
  const out = [];
  for (const side of [1, -1]) {
    let cur = [];
    for (let d = 0; d <= L + 0.01; d += 4) {
      const inGap = HOLES.some((h) => h.side === side && d > h.from && d < h.to);
      if (inGap) { if (cur.length) out.push(cur); cur = []; continue; }
      const p = at(d);
      cur.push({ d, x: p.x - p.ty * H * side, y: p.y + p.tx * H * side });
    }
    if (cur.length) out.push(cur);
  }
  return out;
})();

// Funnel slots (bottom-up release order) and fates
const SLOTS = (() => {
  const rows = [[242, 1], [210, 2], [174, 3], [138, 4], [100, 5], [62, 6], [26, 7]];
  const out = [];
  rows.forEach(([y, n]) => { for (let i = 0; i < n; i++) out.push([360 + (i - (n - 1) / 2) * 38, y]); });
  return out;
})();
const BUY = [4, 14, 24];
const FATE = SLOTS.map((_, k) => (BUY.includes(k) ? 'buy' : k % 3)); // hole index or 'buy'
const REST_X = {}; BUY.forEach((k, i) => { REST_X[k] = 1410 - i * 40; });
const NECK = [360, 290];
const G = 1900;

function ballState(k, T, CUES) {
  const [sx, sy] = SLOTS[k];
  const popT = CUES.Traffic + 1.4 + k * 0.06;
  const pop = MOTION.pop(clamp((T - popT) / 0.45, 0, 1));
  const release = CUES.Journey + 0.2 + k * 0.36;
  const v = 480 - 4 * (k % 5);
  const bob = Math.sin(T * 2.1 + k * 1.3) * 1.6;
  if (T < release) return { x: sx, y: sy + bob * pop, s: pop, o: 1 };
  const tau = T - release;
  const pre = Math.hypot(NECK[0] - sx, NECK[1] - sy);
  let u = v * (tau < 0.6 ? tau * tau / 1.2 : tau - 0.3) + 14 * Math.sin(1.3 * tau + k) - 14 * Math.sin(k);
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
      // time since crossing the exit distance
      const tExit = (d - h.exit) / v;
      const vx = p.tx * v * h.kick, vy = p.ty * v * h.kick;
      return { x: p.x + vx * tExit, y: p.y + vy * tExit + 0.5 * G * tExit * tExit, s: 1,
               o: 1 - MOTION.draw(clamp((tExit - 0.35) / 0.6, 0, 1)) };
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

function Stroke({ d, p, sw }) {
  return <path d={d} pathLength="1" fill="none" stroke={INK} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round"
    strokeDasharray="1 1" strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />;
}

function Label({ x, y, text, o, anchor = 'start', size = 36 }) {
  return <text x={x} y={y} fill={INK} opacity={o} textAnchor={anchor}
    style={{ font: '300 ' + size + 'px Onest, sans-serif', letterSpacing: '0.01em' }}>{text}</text>;
}

function HoleLabel({ x, y, text, o, anchor = 'start', size = 38 }) {
  return <text x={x} y={y} fill={ORANGE} opacity={o} textAnchor={anchor}
    style={{ font: '400 ' + size + 'px Onest, sans-serif', letterSpacing: '0.01em' }}>{text}</text>;
}

function Piece({ sw = 2, ls = 1 }) {
  const { T, CUES, authoredTotal } = useComposition();
  const funnelP = MOTION.draw(clamp((T - 0.2) / 1.2, 0, 1));
  const pathD = MOTION.draw(clamp((T - 0.9) / 2.1, 0, 1)) * L;
  const boxP = MOTION.draw(clamp((T - 2.7) / 0.9, 0, 1));
  const lab1 = MOTION.enter(clamp((T - 0.9) / 0.9, 0, 1));
  const lab2 = MOTION.enter(clamp((T - 3.2) / 0.9, 0, 1));
  const labH = [0, 1, 2].map((i) => MOTION.enter(clamp((T - (CUES.Journey + 2.2 + i * 0.9)) / 0.9, 0, 1)));
  const fade = 1 - MOTION.draw(clamp((T - (authoredTotal - 0.9)) / 0.8, 0, 1));
  const walls = WALLS.map((w) => w.filter((q) => q.d <= pathD))
    .filter((w) => w.length > 1)
    .map((w) => 'M' + w.map((q) => q.x.toFixed(1) + ',' + q.y.toFixed(1)).join('L'));
  const balls = SLOTS.map((_, k) => ballState(k, T, CUES));
  return (
    <svg width="100%" height="100%" viewBox="160 0 1530 1020"
      style={{ position: 'absolute', inset: 0, background: BG }}>
      <g opacity={fade}>
        <ellipse cx="360" cy="90" rx="120" ry="14" fill="none" stroke={INK} strokeWidth={sw}
          pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - funnelP} opacity={funnelP > 0 ? 1 : 0} />
        <Stroke d="M240,90 L338,250 L338,290" p={funnelP} sw={sw} />
        <Stroke d="M480,90 L382,250 L382,290" p={funnelP} sw={sw} />
        {walls.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <Stroke d="M1180,818 V740 H1440 V920 H1180 V862" p={boxP} sw={sw} />
        <Label x={540} y={172} text="Трафік на сайт" o={lab1} size={36 * ls} />
        <HoleLabel x={1440} y={552} text="Повільний сайт" o={labH[0]} anchor="end" size={38 * ls} />
        <HoleLabel x={580} y={752} text="Складне оформлення" o={labH[1]} size={38 * ls} />
        <HoleLabel x={855} y={955} text="Немає довіри" o={labH[2]} anchor="middle" size={38 * ls} />
        <Label x={1310} y={985} text="Покупка на сайті" o={lab2} anchor="middle" size={36 * ls} />
        {balls.map((b, k) => (
          <circle key={k} cx={b.x} cy={b.y} r={R * Math.max(0, b.s)} fill={ORANGE}
            opacity={b.o * (b.s > 0.01 ? 1 : 0)} />
        ))}
      </g>
    </svg>
  );
}

function FunnelApp() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);
  return (
    <>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES}
        playback={window.OM_PLAYBACK} bg={BG}>
        <Piece sw={t.stroke} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Motion" />
        <TweakToggle label="Motion editor" value={t.motionEditor}
          onChange={(v) => setTweak('motionEditor', v)} />
        <TweakSection label="Line" />
        <TweakSlider label="Stroke weight" value={t.stroke} min={1} max={4} step={0.5} unit="px"
          onChange={(v) => setTweak('stroke', v)} />
      </TweaksPanel>
    </>
  );
}
window.FunnelApp = FunnelApp;
window.Piece = Piece;
