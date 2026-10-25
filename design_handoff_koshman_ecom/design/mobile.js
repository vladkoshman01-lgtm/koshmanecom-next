/* Koshman Ecom — mobile layer for desktop-built pages (<768px). Sets html[data-m] and overrides the fixed 1440 layout. */
(() => {
  if (window.__kMobile) return; window.__kMobile = true;
  const set = () => { const m = window.__forceM || window.innerWidth < 768; document.documentElement.toggleAttribute('data-m', !!m); };
  set(); window.addEventListener('resize', set);
  const css = `
html:not([data-m]) [data-mob]{display:none!important}
html[data-m] [data-desk]{display:none!important}
html[data-m] body{overflow-x:hidden}
html[data-m] [data-page]{width:100%!important;zoom:1!important;overflow-x:hidden!important}
html[data-m] [data-page] [data-mob-head]{position:sticky;top:0;z-index:60}
html[data-m] [data-page] section{padding:48px 20px!important;box-sizing:border-box}
html[data-m] [data-page] [style*="grid-template-columns"]:not([data-m-keep]):not(button):not([data-mob] *):not([data-m-cmp]):not([data-m-t5]):not([data-m-2]){grid-template-columns:minmax(0,1fr)!important;gap:14px!important}
html[data-m] [data-page] [data-m-2]{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
html[data-m] [data-page] h1{font-size:34px!important;line-height:1.08!important;max-width:100%!important}
html[data-m] [data-page] h2{font-size:27px!important;line-height:1.15!important}
html[data-m] [data-page] h3{font-size:20px!important}
html[data-m] [data-page] p:not([data-mob] *){font-size:16px!important;max-width:100%!important}
html[data-m] [data-page] section *{max-width:100%}
html[data-m] [data-page] [style*="width: 200px"][style*="height: 200px"],html[data-m] [data-page] [data-m-sm]{width:96px!important;height:96px!important}
html[data-m] [data-page] [style*="margin-top: 64px"],html[data-m] [data-page] [style*="margin-top: 56px"],html[data-m] [data-page] [style*="margin-top: 54px"]{margin-top:32px!important}
html[data-m] [data-page] [style*="gap: 80px"],html[data-m] [data-page] [style*="gap: 96px"],html[data-m] [data-page] [style*="gap: 56px"]{gap:24px!important}
html[data-m] [data-page] [style*="font-size: 72px"],html[data-m] [data-page] [style*="font-size: 64px"],html[data-m] [data-page] [style*="font-size: 56px"]{font-size:34px!important}
html[data-m] [data-page] [style*="font-size: 48px"],html[data-m] [data-page] [style*="font-size: 44px"]{font-size:28px!important}
html[data-m] [data-page] [style*="min-height: 300px"]{min-height:220px!important}
html[data-m] [data-page] [data-m-scroll]{flex-wrap:wrap!important;gap:8px!important}
html[data-m] [data-page] [data-m-scroll]>*{height:40px!important;padding:0 14px!important;font-size:13px!important}
html[data-m] [data-page] section [style*="position: sticky"]{position:static!important}
html[data-m] [data-page] section div[style*="display: flex"]:has(> a + a),html[data-m] [data-page] section div[style*="display: flex"]:has(> button + a),html[data-m] [data-page] section div[style*="display: flex"]:has(> a + button){flex-wrap:wrap!important}
html[data-m] [data-page] [data-m-cmp]{grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr)!important;gap:0!important;font-size:13px!important}
html[data-m] [data-page] [data-m-cmp]>*{padding:12px 10px!important;letter-spacing:0!important}
html[data-m] [data-page] [data-m-t5]{grid-template-columns:minmax(0,1.6fr) repeat(4,minmax(0,1fr))!important;gap:0!important;font-size:12px!important}
html[data-m] [data-page] [data-m-t5]>*{padding:10px 6px!important;letter-spacing:0!important}
html[data-m] [data-page] form div[style*="display: flex"]:has(> button[type="submit"]){flex-direction:column!important;align-items:stretch!important;gap:12px!important}
html[data-m] [data-page] form button[type="submit"]{width:100%!important;justify-content:flex-start}
html[data-m] [data-page] section[style*="display: flex"],html[data-m] [data-page] section > div[style*="justify-content: space-between"],html[data-m] [data-page] section > div > div[style*="justify-content: space-between"][style*="align-items: flex-end"]{flex-direction:column!important;align-items:flex-start!important;gap:20px!important}
html[data-m] [data-page] section[style*="display: flex"] > *{max-width:100%!important}
html[data-m] [data-page] [style*="font-size: 40px"],html[data-m] [data-page] [style*="font-size: 39px"],html[data-m] [data-page] [style*="font-size: 36px"],html[data-m] [data-page] [style*="font-size: 52px"]{font-size:26px!important}
html[data-m] [data-page] [data-m-photo]{aspect-ratio:1/1;width:100%}
html[data-m] [data-page] [data-m-photo] [role="img"]{background-position:center top!important}
html[data-m] [data-page] [data-m-team]{min-height:0!important;gap:0!important}
html[data-m] [data-page] [style*="font-size: 340px"]{font-size:150px!important}
html[data-m] [data-page] [data-m-mars]{width:160px!important;margin-top:48px}
html[data-m] [data-page] [data-m-mars] svg{width:160px;height:136px}
html[data-m] [data-page] [data-m-hide]{display:none!important}
html[data-m] [data-page] [data-m-wrap]{flex-wrap:wrap!important}
html[data-m] [data-page] [data-m-col]{flex-direction:column!important;align-items:stretch!important}
`;
  const st = document.createElement('style'); st.id = 'k-mobile'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
})();
