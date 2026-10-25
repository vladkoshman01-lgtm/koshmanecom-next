function FunnelLoop({ stroke = 4, labelScale = 1 }) {
  const [T, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, t0 = performance.now();
    const tick = (now) => { setT(((now - t0) / 1000) % 23); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <window.FunnelCtx.Provider value={{ T, CUES: { Traffic: 0, Journey: 3.5, Purchase: 18.5 }, authoredTotal: 23 }}>
      <div style={{ position: 'absolute', inset: 0, background: '#141414' }}>
        <window.Piece sw={stroke} ls={labelScale} />
      </div>
    </window.FunnelCtx.Provider>
  );
}
window.FunnelLoop = FunnelLoop;
