/**
 * Згода на cookie: Google Consent Mode v2 + Microsoft Clarity.
 *
 * За замовчуванням (до вибору) усе аналітичне й рекламне вимкнено — це задає
 * інлайновий скрипт у <head> (див. SiteDocument), ще до завантаження gtag.
 * Тут — реакція на вибір у банері та відкриття налаштувань з футера.
 */

export const CONSENT_KEY = 'kc-cookie-consent';
export const CLARITY_ID = 'ut3p6kx3xo';

export type Consent = 'all' | 'necessary';

type Gtag = (...args: unknown[]) => void;

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    return null;
  }
}

/** Clarity вантажимо лише після згоди — без неї записи сесій не ведуться. */
export function loadClarity() {
  const w = window as unknown as { clarity?: unknown };
  if (w.clarity) return;
  const script = document.createElement('script');
  script.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`;
  document.head.appendChild(script);
}

/** Зберігає вибір і одразу застосовує його до Google та Clarity. */
export function applyConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // приватний режим — згода діятиме лише до перезавантаження
  }

  const granted = value === 'all' ? 'granted' : 'denied';
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.('consent', 'update', {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });

  const clarity = (window as unknown as { clarity?: Gtag }).clarity;
  if (value === 'all') {
    loadClarity();
  } else if (clarity) {
    // Відкликали згоду — Clarity припиняє запис і стирає свої cookie
    clarity('consent', false);
  }
}

/** Відкрити банер знову (посилання «Налаштування cookie» у футері). */
export function openConsentSettings() {
  window.dispatchEvent(new Event('kc-open-consent'));
}

/**
 * Інлайновий скрипт для <head>: задає згоду за замовчуванням ДО будь-якого
 * тегу Google і відновлює збережений вибір. Без цього gtag встиг би
 * поставити cookie ще до банера.
 */
export const consentBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'all') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', 'G-LEC5E52YML', { send_page_view: true });
gtag('config', 'AW-18501303920');
`;
