/* <koshman-compass> — self-contained hero animation for Koshman Ecom.
   Vanilla SVG + rAF, no deps. Time-based (seamless loop), pauses off-screen,
   respects prefers-reduced-motion, fixed 1:1 aspect (no layout shift).
   Attributes: speed="1"  static (render settled frame)  labels="false"  accent="#FF5F2A"
   Property: el.nodes = [{name, market, bearing, r, logo}]  (logo = URL of a mono SVG/PNG; falls back to initial)  */
(() => {
  if (customElements.get('koshman-compass')) return;
  const NS = 'http://www.w3.org/2000/svg';
  const C = 300, LOOP = 13;
  const DARK = { ink: '#EAEAEA', mute: '#7A7A7A', line: '#2C2D31', line2: '#3A3B40', bg: '#141414', disc: '#191919', node: '#222222', nr: 17, depth: '#1E1E1E', coreLine: '#2C2D31', tw: [1.4, 1], ringW: 1, routeW: 1.2, routeO: 0.3, nodeW: 1.4, fsK: 10.5, wt: 600 };
  const LIGHT = { ink: '#141414', mute: '#6A6A6A', line: '#C4C4C4', line2: '#141414', bg: '#FFFFFF', disc: '#FFFFFF', node: '#FFFFFF', nr: 25, depth: '#F2F2F2', coreLine: '#3A3A3A', tw: [2.6, 1.4], ringW: 2, routeW: 1.8, routeO: 0.35, nodeW: 2.4, fsK: 14, wt: 700 };
  let COL = DARK;
  const AMAZON = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="12" y="14" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="17" fill="#EAEAEA">a</text><path d="M3.5 17.2c5 3 12 3 17-0.4" fill="none" stroke="#EAEAEA" stroke-width="1.8" stroke-linecap="round"/><path d="M18 15.4l2.8 1.1-0.9 2.8" fill="none" stroke="#EAEAEA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  const SI = (s) => `https://cdn.simpleicons.org/${s}/EAEAEA`;
  const DEFAULT_NODES = [
    { name: 'Amazon', market: 'US', bearing: 28, r: 192, logo: AMAZON },
    { name: 'Etsy', market: 'UK', bearing: 82, r: 160, logo: SI('etsy') },
    { name: 'Shopify', market: 'EU', bearing: 140, r: 196, logo: SI('shopify') },
    { name: 'eBay', market: 'DE', bearing: 205, r: 164, logo: SI('ebay') },
    { name: 'Google', market: 'PL', bearing: 262, r: 194, logo: SI('google') },
    { name: 'Pinterest', market: 'CA', bearing: 318, r: 166, logo: SI('pinterest') },
  ];
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const MOTION = {
    enter: (p) => 1 - Math.pow(1 - p, 3),
    turn: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    draw: (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
  };
  const pol = (r, deg) => { const a = (deg * Math.PI) / 180; return [C + r * Math.sin(a), C - r * Math.cos(a)]; };
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); parent && parent.appendChild(n); return n; };
  const pad = (n) => String(Math.round(((n % 360) + 360) % 360)).padStart(3, '0');

  const wrapD = (d) => ((((d + 180) % 360) + 360) % 360) - 180;
  const SEQ = [1, -1, 1]; // secret dial: full turn clockwise, counter-clockwise, clockwise
  class KoshmanCompass extends HTMLElement {
    static get observedAttributes() { return ['speed', 'static', 'labels', 'accent', 'theme']; }
    constructor() {
      super();
      this._nodes = DEFAULT_NODES; this._speed = 1; this._static = false; this._labels = true;
      this._accent = '#FF5F2A'; this._t0 = null; this._acc = 0; this._raf = 0; this._visible = true;
      this._tick = this._tick.bind(this);
    }
    set nodes(v) { if (Array.isArray(v) && v.length) { this._nodes = v; this._build(); } }
    get nodes() { return this._nodes; }
    set speed(v) { this._speed = Math.max(0.1, +v || 1); }
    set static(v) { this._static = v === true || v === '' || v === 'true'; this._sync(); }
    set labels(v) { this._labels = !(v === false || v === 'false'); this._sync(); }
    set accent(v) { if (v) { this._accent = v; this._build(); } }
    set theme(v) { this._theme = v; this._build(); }
    attributeChangedCallback(n, _o, v) {
      if (n === 'speed') this.speed = v;
      if (n === 'static') this.static = v !== null && v !== 'false';
      if (n === 'labels') this.labels = v;
      if (n === 'accent') this.accent = v;
      if (n === 'theme') { this._theme = v; this._build(); }
    }
    connectedCallback() {
      Object.assign(this.style, { display: 'block', position: 'relative', width: this.style.width || '100%', aspectRatio: '1 / 1', contain: 'layout paint' });
      this._build();
      this._mq = matchMedia('(prefers-reduced-motion: reduce)');
      this._onMq = () => this._sync(); this._mq.addEventListener('change', this._onMq);
      this._io = new IntersectionObserver(([e]) => { this._visible = e.isIntersecting; this._sync(); }); this._io.observe(this);
      this._ro = new ResizeObserver(([e]) => this._fit(e.contentRect.width)); this._ro.observe(this);
      this._onVis = () => this._sync(); document.addEventListener('visibilitychange', this._onVis);
      this._mix = 0; this._pp = [0, 0]; this._ppS = [0, 0];
      this.addEventListener('pointermove', (e) => {
        const b = this.getBoundingClientRect(), s = b.width / 680;
        const dx = e.clientX - (b.left + (C + 40) * s), dy = e.clientY - (b.top + (C + 40) * s);
        this._pa = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
        this._pp = [Math.max(-1, Math.min(1, dx / (b.width / 2))), Math.max(-1, Math.min(1, dy / (b.height / 2)))];
        if (!this._hover) { this._hover = true; this._sync(); }
        this._dial(this._pa);
      });
      this.addEventListener('pointerleave', (e) => { this._hover = false; this._pp = [0, 0]; this._prevPa = null; if (!this._unlocked && e.pointerType !== 'touch') { this._si = 0; this._dacc = 0; } this._sync(); });
      this._si = 0; this._dacc = 0; this._wrong = 0;
      this._sync();
    }
    resetDial() { this._unlocked = false; this._si = 0; this._dacc = 0; this._wrong = 0; }
    _dial(pa) {
      if (this._unlocked) return;
      if (this._prevPa == null) { this._prevPa = pa; return; }
      const d = wrapD(pa - this._prevPa); this._prevPa = pa;
      if (Math.abs(d) > 90 || !d) return;
      if (Math.sign(d) === SEQ[this._si]) { this._dacc += Math.abs(d); this._wrong = 0; }
      else if (this._si === 0) this._dacc = Math.max(0, this._dacc - Math.abs(d));
      else if ((this._wrong += Math.abs(d)) > 200) { this._si = 0; this._dacc = 0; this._wrong = 0; }
      if (this._dacc >= 360) {
        this._si++; this._dacc = 0; this._wrong = 0;
        if (this._si >= SEQ.length) {
          this._unlocked = true; this._celebT = performance.now();
          this.dispatchEvent(new CustomEvent('koshman-unlock', { bubbles: true, composed: true }));
        }
      }
    }
    _isStill() { return this._static || (this._mq && this._mq.matches); }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf); this._raf = 0;
      this._io && this._io.disconnect(); this._ro && this._ro.disconnect();
      this._mq && this._mq.removeEventListener('change', this._onMq);
      document.removeEventListener('visibilitychange', this._onVis);
    }
    _fit(w) { // keep labels ≥ ~10px rendered on small screens
      if (!this._svg || !w) return;
      const fs = Math.max(13, Math.min(w < 380 ? 22 : 99, (COL.fsK * 680) / w));
      this._svg.style.setProperty('--kc-fs', fs + 'px');
      this._svg.style.setProperty('--kc-fs2', fs * 0.78 + 'px');
      this._compact = w < 380; this._sync(true);
    }
    _build() {
      if (!this.isConnected) return;
      this.innerHTML = '';
      const A = this._accent;
      const light = (this._theme || this.getAttribute('theme')) === 'light';
      COL = light ? LIGHT : DARK;
      this._we = [];
      const svg = el('svg', { viewBox: '-40 -40 680 680', role: 'img', 'aria-label': 'Compass pointing to international e-commerce channels', style: 'position:absolute;inset:0;width:100%;height:100%;overflow:visible;font-family:inherit' }, this);
      this._svg = svg;
      const defs = el('defs', {}, svg);
      const g = el('radialGradient', { id: 'kc-depth', cx: '50%', cy: '50%', r: '50%' }, defs);
      el('stop', { offset: '0', 'stop-color': COL.depth }, g); el('stop', { offset: '1', 'stop-color': COL.bg, 'stop-opacity': '0' }, g);
      el('circle', { cx: C, cy: C, r: 300, fill: 'url(#kc-depth)' }, svg);

      // outer bearing ring
      this.gOuter = el('g', {}, svg);
      const ticks = el('g', {}, this.gOuter); this.gTicks = ticks;
      for (let i = 0; i < 72; i++) {
        const d = i * 5, major = d % 30 === 0;
        const [x1, y1] = pol(major ? 246 : 252, d), [x2, y2] = pol(260, d);
        el('line', { x1, y1, x2, y2, stroke: major ? COL.line2 : COL.line, 'stroke-width': major ? COL.tw[0] : COL.tw[1] }, ticks);
      }
      el('circle', { cx: C, cy: C, r: 260, fill: 'none', stroke: COL.line2, 'stroke-width': COL.ringW }, this.gOuter);
      [['N', 0], ['E', 90], ['S', 180], ['W', 270]].forEach(([l, d]) => {
        const [x, y] = pol(284, d);
        const t = el('text', { x, y, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: l === 'N' ? A : COL.mute, style: 'font-size:var(--kc-fs,13px);letter-spacing:.12em;font-weight:' + COL.wt }, this.gOuter);
        t.textContent = l; if (l === 'W' || l === 'E') (this._we || (this._we = [])).push(t);
      });
      el('circle', { cx: C, cy: C, r: 180, fill: 'none', stroke: COL.line, 'stroke-dasharray': '2 6' }, this.gOuter);
      this.dialArc = el('circle', { cx: C, cy: C, r: 268, fill: 'none', stroke: A, 'stroke-width': 2, pathLength: 1, 'stroke-dasharray': '0 1', 'stroke-linecap': 'round' }, this.gOuter);

      const front = el('g', {}, svg); this.gFront = front;
      // routes + nodes
      this.routes = []; const gR = el('g', {}, front), gN = el('g', {}, front);
      this._nodes.forEach((n) => {
        const [sx, sy] = pol(100, n.bearing), [ex, ey] = pol(n.r, n.bearing - 2);
        const [cx, cy] = pol((100 + n.r) / 2, n.bearing + 14);
        const d = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`;
        const path = el('path', { d, fill: 'none', stroke: COL.ink, 'stroke-opacity': COL.routeO, 'stroke-width': COL.routeW, 'stroke-dasharray': '0.1 6', 'stroke-linecap': 'round', opacity: 0 }, gR);
        const pk = el('circle', { r: COL.routeW + 2, fill: A, opacity: 0 }, gR);
        const node = el('g', { opacity: 0 }, gN);
        const pulse = el('circle', { cx: ex, cy: ey, r: COL.nr, fill: 'none', stroke: A, opacity: 0 }, node);
        const dot = el('g', {}, node);
        el('circle', { cx: ex, cy: ey, r: COL.nr, fill: COL.node, stroke: A, 'stroke-width': COL.nodeW }, dot);
        const ini = el('text', { x: ex, y: ey, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: COL.ink, style: 'font-size:' + Math.round(COL.nr * 0.8) + 'px;font-weight:700' }, dot);
        ini.textContent = n.name[0];
        if (n.logo) {
          const href = light ? n.logo.replace(/EAEAEA/g, '222222') : n.logo;
          const ls = COL.nr * 1.1; const img = el('image', { x: ex - ls / 2, y: ey - ls / 2, width: ls, height: ls, href, opacity: 0 }, dot);
          img.addEventListener('load', () => { img.setAttribute('opacity', 1); ini.style.display = 'none'; });
          img.addEventListener('error', () => img.remove());
        }
        const right = ex >= C, lx = ex + (right ? COL.nr + 10 : -COL.nr - 10);
        const label = el('g', {}, node);
        const t1 = el('text', { x: lx, y: ey - 4, 'text-anchor': right ? 'start' : 'end', fill: COL.ink, stroke: COL.bg, 'stroke-width': 5, 'paint-order': 'stroke', style: 'font-size:var(--kc-fs,13px);font-weight:' + COL.wt + ';letter-spacing:.01em' }, label);
        t1.textContent = n.name;
        const t2 = el('text', { x: lx, y: ey + 16, 'text-anchor': right ? 'start' : 'end', fill: COL.mute, stroke: COL.bg, 'stroke-width': 4, 'paint-order': 'stroke', style: 'font-size:var(--kc-fs2,10px);letter-spacing:.14em' }, label);
        t2.textContent = n.market;
        this.routes.push({ n, path, pk, node, pulse, dot, label, t2, dir: right ? 1 : -1, len: 0, h: 0 });
      });

      // compass core
      const core = el('g', {}, front);
      el('circle', { cx: C, cy: C, r: 92, fill: COL.disc, stroke: COL.line2, 'stroke-width': COL.ringW }, core);
      el('circle', { cx: C, cy: C, r: 74, fill: 'none', stroke: COL.coreLine, 'stroke-dasharray': '1 4' }, core);
      for (let d = 0; d < 360; d += 90) { const [x, y] = pol(92, d), [x2, y2] = pol(84, d); el('line', { x1: x, y1: y, x2, y2, stroke: COL.mute, 'stroke-width': 1.4 }, core); }
      this.needle = el('g', {}, core);
      el('polygon', { points: `${C},${C - 76} ${C + 7},${C} ${C - 7},${C}`, fill: A }, this.needle);
      el('polygon', { points: `${C},${C + 76} ${C + 7},${C} ${C - 7},${C}`, fill: COL.mute, opacity: 0.55 }, this.needle);
      el('circle', { cx: C, cy: C, r: 5, fill: COL.bg, stroke: COL.ink, 'stroke-width': 1.4 }, core);

      this.readout = el('text', { x: C, y: C + 132, 'text-anchor': 'middle', fill: COL.mute, style: 'font-size:var(--kc-fs2,10px);letter-spacing:.18em;font-variant-numeric:tabular-nums' }, front);
      this.dialDots = el('g', { opacity: 0 }, front);
      this.dots = [-12, 0, 12].map((dx) => el('circle', { cx: C + dx, cy: C + 152, r: 2.6, fill: COL.line2 }, this.dialDots));
      requestAnimationFrame(() => { this.routes.forEach((r) => (r.len = r.path.getTotalLength())); this._render(this._last ?? 0); });
      this._fit(this.getBoundingClientRect().width);
    }
    _sync(redraw) {
      if (!this.isConnected || !this._svg) return;
      const still = this._isStill();
      this._we && this._we.forEach((t) => (t.style.display = this._compact ? 'none' : ''));
      this.routes && this.routes.forEach((r) => (r.label.style.display = this._labels ? '' : 'none', r.t2.style.display = this._compact ? 'none' : ''));
      const run = this._visible && !document.hidden && (!still || this._hover || this._mix > 0.002);
      if (run && !this._raf) { this._t0 = null; this._raf = requestAnimationFrame(this._tick); }
      if (!run && this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
      if (!this._raf && (still || redraw)) this._render(still ? 10.4 : this._last ?? 0);
    }
    _tick(now) {
      const dt = this._t0 == null ? 0 : Math.min(0.1, (now - this._t0) / 1000); this._t0 = now;
      const still = this._isStill();
      if (!still) this._acc += dt * this._speed;
      this._mix += ((this._hover ? 1 : 0) - this._mix) * (1 - Math.exp(-dt * 6));
      const k = 1 - Math.exp(-dt * 5), tp = this._hover && !(this._mq && this._mq.matches) ? this._pp : [0, 0];
      this._ppS = [this._ppS[0] + (tp[0] - this._ppS[0]) * k, this._ppS[1] + (tp[1] - this._ppS[1]) * k];
      this._render(still ? 10.4 : this._acc % LOOP, dt);
      if (still && !this._hover && this._mix < 0.002) { this._mix = 0; this._raf = 0; this._render(10.4); return; }
      this._raf = requestAnimationFrame(this._tick);
    }
    _needle(t) {
      const N = this._nodes, last = 2.8 + (N.length - 1) * 0.95;
      if (t < 1.4) return 0;
      if (t < 2.8) { const p = seg(t, 1.4, 2.6); return 13 * Math.sin(p * Math.PI * 3) * (1 - p); }
      if (t < last + 1.1) {
        let i = Math.min(N.length - 1, Math.floor((t - 2.8) / 0.95));
        const from = i === 0 ? 0 : N[i - 1].bearing;
        return from + (N[i].bearing - from) * MOTION.turn(seg(t, 2.8 + i * 0.95, 3.35 + i * 0.95));
      }
      const b = N[N.length - 1].bearing, to = b > 180 ? 360 : 0;
      return b + (to - b) * MOTION.turn(seg(t, last + 1.1, last + 2.1));
    }
    _render(t, dt) {
      if (!this.routes) return;
      this._last = t;
      const fadeIn = MOTION.enter(seg(t, 0, 1.2)), fadeOut = seg(t, 12.1, 13);
      this.gOuter.setAttribute('opacity', 0.55 + 0.45 * fadeIn * (1 - fadeOut));
      this.gTicks.setAttribute('transform', `rotate(${(-5 * t) / LOOP} ${C} ${C})`);
      const mix = this._mix || 0, wrap = (d) => ((((d + 180) % 360) + 360) % 360) - 180;
      let target = this._needle(t);
      if (mix > 0 && this._pa != null) target += wrap(this._pa - target) * mix;
      this._na = dt && this._na != null ? this._na + wrap(target - this._na) * (1 - Math.exp(-dt * 14)) : target;
      const ang = this._na;
      this.needle.setAttribute('transform', `rotate(${ang} ${C} ${C})`);
      const [px, py] = this._ppS || [0, 0];
      this.gOuter.setAttribute('transform', `translate(${-px * 7} ${-py * 7})`);
      this.gFront.setAttribute('transform', `translate(${px * 5} ${py * 5})`);
      let near = null, best = 28;
      if (this._hover && this._pa != null) this.routes.forEach((r) => { const d = Math.abs(wrap(r.n.bearing - this._pa)); if (d < best) { best = d; near = r; } });
      const hk = dt ? 1 - Math.exp(-dt * 10) : 1;
      let active = null;
      this.routes.forEach((r, i) => {
        const Ti = 2.8 + i * 0.95;
        const draw = Math.max(MOTION.draw(seg(t, Ti + 0.25, Ti + 0.95)), mix);
        const erase = MOTION.draw(seg(t, 11.2 + i * 0.08, 11.9 + i * 0.08)) * (1 - mix);
        r.h += ((r === near ? 1 : 0) - r.h) * hk;
        r.path.setAttribute('stroke', r.h > 0.3 ? this._accent : COL.ink);
        r.path.setAttribute('stroke-opacity', COL.routeO + (1 - COL.routeO) * r.h);
        r.path.setAttribute('stroke-width', COL.routeW + 0.8 * r.h);
        r.path.setAttribute('opacity', draw * (1 - erase));
        const show = Math.max(MOTION.enter(seg(t, Ti + 0.8, Ti + 1.15)) * (1 - seg(t, 11.7 + i * 0.08, 12.3 + i * 0.08)), mix);
        r.node.setAttribute('opacity', show);
        r.label.setAttribute('transform', `translate(${(1 - show) * 8 * r.dir} 0)`);
        const s = (0.6 + 0.4 * show) * (1 + 0.14 * r.h), [nx, ny] = pol(r.n.r, r.n.bearing - 2);
        r.dot.setAttribute('transform', `translate(${nx * (1 - s)} ${ny * (1 - s)}) scale(${s})`);
        const a = 9.6 + i * 0.12, pp = seg(t, a, a + 1.2);
        if (pp > 0 && pp < 1 && r.len) {
          const pt = r.path.getPointAtLength(r.len * MOTION.draw(pp));
          r.pk.setAttribute('cx', pt.x); r.pk.setAttribute('cy', pt.y); r.pk.setAttribute('opacity', Math.sin(pp * Math.PI));
        } else r.pk.setAttribute('opacity', 0);
        const pu = seg(t, a + 1.2, a + 1.9);
        r.pulse.setAttribute('r', COL.nr + 12 * MOTION.enter(pu)); r.pulse.setAttribute('opacity', pu > 0 && pu < 1 ? 0.8 * (1 - pu) : 0);
        if (t >= Ti && t < Ti + 0.95) active = r.n;
      });
      if (near && mix > 0.5) active = near.n;
      const cel = this._celebT ? (performance.now() - this._celebT) / 1000 : 9;
      const p = this._unlocked ? Math.max(0, 1 - Math.max(0, cel - 0.6)) : Math.min(1, (this._dacc || 0) / 360);
      this.dialArc.setAttribute('stroke-dasharray', `${p} 1`);
      this.dialArc.setAttribute('transform', SEQ[Math.min(this._si || 0, 2)] < 0 && !this._unlocked ? `translate(${2 * C} 0) scale(-1 1) rotate(-90 ${C} ${C})` : `rotate(-90 ${C} ${C})`);
      this.dialDots.setAttribute('opacity', (this._si > 0 || this._dacc > 25) && (!this._unlocked || cel < 1.6) ? 1 : 0);
      this.dots.forEach((d, i) => d.setAttribute('fill', i < (this._si || 0) ? this._accent : COL.line2));
      if (cel < 1.6) this.routes.forEach((r, i) => { const e = MOTION.enter(seg(cel, i * 0.06, 1 + i * 0.06)); r.pulse.setAttribute('r', COL.nr + 22 * e); r.pulse.setAttribute('opacity', e > 0 && e < 1 ? 1 - e : 0); });
      if (cel < 1.6) { this.readout.textContent = 'UNLOCKED'; return; }
      this.readout.textContent = active ? `${pad(active.bearing)}°  ${active.name.toUpperCase()} · ${active.market}` : `${pad(ang)}°`;
    }
  }
  customElements.define('koshman-compass', KoshmanCompass);
})();
