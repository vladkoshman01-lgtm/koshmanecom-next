// Minimal runtime for funnel-scene.jsx: own looping clock, no timeline UI.
window.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
window.Easing = {
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
};
const FUNNEL_CUES = { Traffic: 0, Journey: 3.5, Purchase: 18.5 };
const FUNNEL_TOTAL = 23;
window.FunnelCtx = React.createContext({ T: 0, CUES: FUNNEL_CUES, authoredTotal: FUNNEL_TOTAL });
window.useComposition = () => React.useContext(window.FunnelCtx);
