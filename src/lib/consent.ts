/**
 * Згода на cookie: Google Consent Mode v2 + Microsoft Clarity (Consent API v2).
 *
 * За замовчуванням (до вибору) усе аналітичне й рекламне вимкнено — це задає
 * інлайновий скрипт у <head> (див. SiteDocument), ще до завантаження gtag.
 * Clarity вантажиться на всіх сторінках одразу, але до згоди отримує
 * `consentv2` з denied і працює без cookies. Тут — реакція на вибір у банері
 * та відкриття налаштувань з футера.
 *
 * Виняток — українська версія сайту для відвідувачів з України (країна за
 * IP, визначає Firebase Hosting, див. `resolveCountry`): банер не
 * показується, згода передається автоматично. Явний вибір людини завжди
 * важливіший за автоматичну згоду.
 */

/** Явний вибір у банері (localStorage). */
export const CONSENT_KEY = 'kc-cookie-consent';
/** Країна, визначена за IP (sessionStorage) — щоб не питати хостинг на кожній сторінці. */
export const GEO_KEY = 'kc-geo';
export const CLARITY_ID = 'ut3p6kx3xo';

/**
 * Файл, який Firebase Hosting віддає залежно від країни відвідувача
 * (i18n rewrites у firebase.json): `public/geo.json` для всіх,
 * `public/localized-files/ALL_ua/geo.json` — для України.
 */
const GEO_URL = '/geo.json';

export type Consent = 'all' | 'necessary';

type Fn = (...args: unknown[]) => void;

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    return null;
  }
}

/** Українська версія сайту — усе, крім /en і /sk. */
export function isUkrainianPath(pathname: string): boolean {
  return !/^\/(en|sk)(\/|$)/.test(pathname);
}

/** Сигнал згоди для Google (update) і Clarity (consentv2). */
function signal(granted: boolean) {
  const value = granted ? 'granted' : 'denied';
  const w = window as unknown as { gtag?: Fn; clarity?: Fn };
  w.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
  // При denied Clarity сама видаляє свої cookie і переходить у режим без них
  w.clarity?.('consentv2', { ad_Storage: value, analytics_Storage: value });
}

/** Зберігає вибір і одразу застосовує його до Google та Clarity. */
export function applyConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // приватний режим — згода діятиме лише до перезавантаження
  }
  signal(value === 'all');
}

/**
 * Автоматична згода для відвідувачів з України на українській версії.
 * Нічого не записує в CONSENT_KEY — це не вибір людини, і банер через
 * «Налаштування cookie» лишається доступним.
 */
let autoApplied = false;

export function applyAutoConsent() {
  autoApplied = true;
  signal(true);
}

/** Скасувати автоматичну згоду (людина пішла на /en чи /sk без явного вибору). */
export function revokeAutoConsent() {
  if (!autoApplied) return;
  autoApplied = false;
  signal(false);
}

function readGeo(): string | null {
  try {
    return sessionStorage.getItem(GEO_KEY);
  } catch {
    return null;
  }
}

/**
 * Країна відвідувача (ISO-код у верхньому регістрі) або '' — якщо не вдалося
 * визначити. Невідома країна = НЕ Україна.
 *
 * У dev-режимі країну можна емулювати: `?geo=UA` в адресі або
 * NEXT_PUBLIC_GEO_COUNTRY=UA у .env.development.local.
 */
export async function resolveCountry(): Promise<string> {
  if (process.env.NODE_ENV === 'development') {
    const fromQuery = new URLSearchParams(window.location.search).get('geo');
    const emulated = (fromQuery ?? process.env.NEXT_PUBLIC_GEO_COUNTRY ?? '').toUpperCase();
    if (fromQuery !== null || emulated) {
      storeGeo(emulated);
      return emulated;
    }
  }

  const cached = readGeo();
  if (cached !== null) return cached;

  let country = '';
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 2500);
    const res = await fetch(GEO_URL, { cache: 'no-store', signal: controller.signal });
    window.clearTimeout(timer);
    if (res.ok) {
      const data = (await res.json()) as { country?: unknown };
      if (typeof data.country === 'string') country = data.country.toUpperCase();
    }
  } catch {
    // мережа чи таймаут — вважаємо, що країна невідома
  }
  storeGeo(country);
  return country;
}

function storeGeo(country: string) {
  try {
    sessionStorage.setItem(GEO_KEY, country);
  } catch {
    // без sessionStorage просто запитаємо ще раз на наступній сторінці
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
 *
 * Clarity вантажиться завжди, але одразу отримує сигнал згоди: granted —
 * якщо людина прийняла всі cookie або (без явного вибору) це відвідувач
 * з України на українській версії, країна якого вже відома з попередньої
 * сторінки; інакше denied — режим без cookies.
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
(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");
var kcGranted = false;
try {
  var kcChoice = localStorage.getItem('${CONSENT_KEY}');
  if (kcChoice === 'all') {
    kcGranted = true;
  } else if (kcChoice !== 'necessary' && !/^\\/(en|sk)(\\/|$)/.test(location.pathname)) {
    var kcGeo = null;
    try { kcGeo = sessionStorage.getItem('${GEO_KEY}'); } catch (e) {}
    kcGranted = kcGeo === 'UA';
  }
} catch (e) {}
if (kcGranted) {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });
}
window.clarity('consentv2', {
  ad_Storage: kcGranted ? 'granted' : 'denied',
  analytics_Storage: kcGranted ? 'granted' : 'denied'
});
gtag('js', new Date());
gtag('config', 'G-LEC5E52YML', { send_page_view: true });
gtag('config', 'AW-18501303920');
`;
