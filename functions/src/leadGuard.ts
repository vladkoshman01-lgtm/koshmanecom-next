/**
 * Захист форми заявок від спаму: перевірка полів і чиста логіка лімітів.
 *
 * Тут немає жодних звернень до Firestore чи мережі — лише рішення
 * «пропустити / відкинути» за даними, щоб це можна було перевірити тестом.
 */

export const LIMITS = {
  name: 100,
  contact: 100,
  siteOrNiche: 2000,
  page: 200,
} as const;

/** Швидше за цей час людина форму не заповнить — це бот. */
export const MIN_FILL_MS = 3000;

/** Не більше 5 заявок з одного IP за 10 хвилин і 20 за добу. */
export const IP_WINDOW_MS = 10 * 60 * 1000;
export const IP_WINDOW_MAX = 5;
export const IP_DAY_MS = 24 * 60 * 60 * 1000;
export const IP_DAY_MAX = 20;

/** Повторна заявка з тим самим контактом у цьому вікні в Telegram не йде. */
export const DEDUP_MS = 10 * 60 * 1000;

/** Понад стільки заявок за годину — вважаємо атакою і перестаємо слати в Telegram поштучно. */
export const FLOOD_PER_HOUR = 50;

export type CleanLead = {
  name: string;
  contact: string;
  siteOrNiche: string;
  page: string;
};

export type ParseResult =
  | { kind: 'ok'; lead: CleanLead }
  /** Бот: відповідаємо «успіх», щоб він не пробував інакше, але нікуди не шлемо. */
  | { kind: 'silent_drop'; reason: 'honeypot' | 'too_fast' }
  | { kind: 'invalid'; error: string };

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Телефон (від 7 цифр), email або Telegram-нік — інше на контакт не схоже. */
export function looksLikeContact(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length >= 7) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;
  if (/^(?:https?:\/\/)?(?:t\.me\/)?@?[A-Za-z][A-Za-z0-9_]{3,31}$/.test(value)) return true;
  return false;
}

export function parseLead(raw: unknown): ParseResult {
  const body = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;

  // Приховане поле: людина його не бачить і не заповнює.
  if (str(body.website)) return { kind: 'silent_drop', reason: 'honeypot' };

  // Старі вкладки без цього поля пропускаємо, щоб не загубити живу заявку.
  const elapsed = body.elapsedMs;
  if (typeof elapsed === 'number' && elapsed < MIN_FILL_MS) {
    return { kind: 'silent_drop', reason: 'too_fast' };
  }

  const name = str(body.name);
  const contact = str(body.phone) || str(body.telegram);
  const siteOrNiche = str(body.siteOrNiche);
  const page = str(body.page);

  if (!name || !contact) return { kind: 'invalid', error: 'name_and_contact_required' };
  if (
    name.length > LIMITS.name ||
    contact.length > LIMITS.contact ||
    siteOrNiche.length > LIMITS.siteOrNiche ||
    page.length > LIMITS.page
  ) {
    return { kind: 'invalid', error: 'field_too_long' };
  }
  if (!looksLikeContact(contact)) return { kind: 'invalid', error: 'invalid_contact' };

  return { kind: 'ok', lead: { name, contact, siteOrNiche, page } };
}

/** Однаковий контакт у різному написанні: «+380 67-123» і «+38067123». */
export function normalizeContact(contact: string): string {
  return contact.toLowerCase().replace(/[\s\-()]/g, '').replace(/^https?:\/\/t\.me\//, '@');
}

export type IpCounter = {
  winStart: number;
  winCount: number;
  dayStart: number;
  dayCount: number;
};

/** Рішення по ліміту IP і новий стан лічильника, якщо заявку пропускаємо. */
export function checkIpLimit(
  prev: Partial<IpCounter> | undefined,
  now: number,
): { allowed: false } | { allowed: true; next: IpCounter } {
  let winStart = prev?.winStart ?? 0;
  let winCount = prev?.winCount ?? 0;
  let dayStart = prev?.dayStart ?? 0;
  let dayCount = prev?.dayCount ?? 0;

  if (now - winStart >= IP_WINDOW_MS) {
    winStart = now;
    winCount = 0;
  }
  if (now - dayStart >= IP_DAY_MS) {
    dayStart = now;
    dayCount = 0;
  }
  if (winCount >= IP_WINDOW_MAX || dayCount >= IP_DAY_MAX) return { allowed: false };

  return { allowed: true, next: { winStart, winCount: winCount + 1, dayStart, dayCount: dayCount + 1 } };
}

export function isDuplicate(lastAt: number | undefined, now: number): boolean {
  return typeof lastAt === 'number' && now - lastAt < DEDUP_MS;
}

/** Ключ години в UTC: 2026111418. */
export function hourKey(now: number): string {
  return new Date(now).toISOString().slice(0, 13).replace(/\D/g, '');
}

/**
 * IP клієнта. Cloud Run дописує справжню адресу в кінець X-Forwarded-For,
 * а все, що стоїть перед нею, міг підставити сам клієнт — тому беремо останню.
 */
export function clientIp(forwardedFor: string | string[] | undefined, fallback: string | undefined): string {
  const header = Array.isArray(forwardedFor) ? forwardedFor.join(',') : forwardedFor ?? '';
  const parts = header.split(',').map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] || fallback || 'unknown';
}
