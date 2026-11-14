/**
 * Виклики API кабінету (callable-функція `cabinet`) і типи відповідей.
 * Типи дзеркалять functions/src/cabinet — змінюєте там, змінюйте й тут.
 */
import { httpsCallable } from 'firebase/functions';
import { cabinetFunctions } from './firebase';

export type Me = { email: string; isAdmin: boolean; clients: { id: string; name: string }[] };

export type SourceAccount = { id: string; name: string; currency: string };

export type DashboardSummary = {
  id: string;
  clientId: string;
  clientName?: string;
  title: string;
  type: string;
  typeLabel: string;
  source: string;
  sourceLabel: string;
  /** Лише для адміна: остання помилка синхронізації. */
  syncError?: string | null;
};

type Metrics = { spend: number; impressions: number; clicks: number; conversions: number; goals: number };

export type AdsReport = {
  currency: string;
  range: { from: string; to: string };
  /** Перший день із даними — старт реклами. */
  dataStart: string | null;
  totals: Metrics;
  series: { granularity: 'day' | 'month'; points: ({ key: string } & Metrics)[] };
  campaigns: ({ id: string; name: string; status: string } & Metrics)[];
  ads: ({ id: string; name: string; campaignName: string; status: string } & Metrics)[];
  hasCoarseData: boolean;
  /** Цільова дія з сайту з GA4 (напр. «Де придбати»), якщо налаштована. */
  goal: { label: string; since: string | null; unattributed: number } | null;
  /** Усі кампанії періоду — для фільтра. */
  campaignOptions: { id: string; name: string }[];
  campaignId: string | null;
  /** Такий самий попередній період — для порівняння; немає для «Увесь час». */
  previous: { range: { from: string; to: string }; totals: Metrics } | null;
  syncedAt: string | null;
};

export type AdminOverview = {
  clients: { id: string; name: string; members: string[] }[];
  dashboards: (DashboardSummary & {
    config: Record<string, string>;
    dataStart: string | null;
    lastSyncAt: string | null;
    lastSyncError: string | null;
    /** Останні 4 символи збереженого ключа джерела (ChatGPT Ads). */
    keyHint: string | null;
  })[];
  admins: string[];
  types: {
    id: string;
    label: string;
    sources: { id: string; label: string }[];
    config: { key: string; label: string; required: boolean }[];
  }[];
};

export type AuditEntry = { email: string; action: string; details: Record<string, unknown>; target: string | null; at: string | null };

export async function cabinetCall<T>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const fn = httpsCallable(cabinetFunctions(), 'cabinet');
  const result = await fn({ ...payload, action });
  return result.data as T;
}

/** Людська причина помилки з коду, який повернула функція. */
export function errorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  const message = (error as { message?: string })?.message ?? '';
  if (code.endsWith('unauthenticated')) return 'Сесія завершилась. Увійдіть ще раз.';
  if (message === 'email_not_verified') return 'Email не підтверджено. Увійдіть через Google або посилання на пошту.';
  if (code.endsWith('permission-denied')) return 'У вас немає доступу до цієї дії.';
  if (code.endsWith('not-found')) return 'Не знайдено або у вас немає доступу.';
  if (message === 'source_not_ready') return 'Це джерело даних ще підключається. Спробуйте пізніше.';
  if (code.endsWith('unavailable')) return 'Джерело даних зараз недоступне. Спробуйте за кілька хвилин.';
  if (message === 'cannot_remove_self') return 'Не можна прибрати адміна з самого себе.';
  if (message === 'bad_email') return 'Перевірте email — схоже, в ньому помилка.';
  if (message === 'bad_import') return 'Файл історії не підходить: перевірте, що це файл зі скрипта імпорту.';
  if (message === 'bad_api_key') return 'Ключ не підійшов: ChatGPT Ads його не прийняв. Перевірте, що скопіювали повністю.';
  if (message === 'api_key_required') return 'Вставте API-ключ ChatGPT Ads.';
  if (message.endsWith('_required')) return 'Заповніть обов’язкові поля.';
  if (code.endsWith('invalid-argument')) return 'Перевірте введені дані.';
  return 'Щось пішло не так. Спробуйте ще раз.';
}
