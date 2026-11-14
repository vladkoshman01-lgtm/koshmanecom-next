/** Спільні типи кабінету. Дзеркало для браузера — src/lib/cabinet/api.ts. */

export type ClientDoc = {
  name: string;
  /** Email людей клієнта, у нижньому регістрі. */
  members: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type DashboardDoc = {
  clientId: string;
  title: string;
  type: DashboardType;
  source: DashboardSource;
  /** Налаштування джерела: акаунт, валюта тощо. Залежать від типу. */
  config: Record<string, string>;
  /** Остання вдала синхронізація з джерелом і остання помилка (видно лише адміну). */
  lastSyncAt?: Date;
  lastSyncError?: string | null;
  /** Перший день із показами — старт реклами (рахується з архіву). */
  dataStart?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DashboardType = 'pinterest_ads' | 'chatgpt_ads' | 'google_ads' | 'meta_ads';
export type DashboardSource = 'pinterest' | 'openai' | 'windsor' | 'bizmap' | 'demo';

export type DateRange = { from: string; to: string };

/** Один рядок архіву: показники одного оголошення за період. */
export type FactRow = {
  campaignId: string;
  campaignName: string;
  adId: string;
  adName: string;
  status: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
};

/**
 * Документ архіву: усі оголошення за період from..to (включно).
 * Свіжі дані — по одному дню (from === to); імпортовані старі звіти — тижнями.
 */
export type PeriodDoc = {
  from: string;
  to: string;
  rows: FactRow[];
  origin: 'pinterest' | 'openai' | 'windsor' | 'import' | 'demo';
  /**
   * Цільові дії з GA4 за день, по UTM-мітці оголошення (utm_content → кількість).
   * Поле є лише в днях, за які ціль уже синхронізована, — так видно, з якої дати вона рахується.
   */
  goals?: Record<string, number>;
};

type Metrics = { spend: number; impressions: number; clicks: number; conversions: number; goals: number };

/**
 * Єдина форма рекламного звіту для всіх платформ і джерел.
 * Браузер отримує лише це — ніколи сирих відповідей Pinterest чи Windsor.
 */
export type AdsReport = {
  currency: string;
  range: DateRange;
  /** Перший день, за який є дані, — фактично старт реклами. */
  dataStart: string | null;
  totals: Metrics;
  series: { granularity: 'day' | 'month'; points: ({ key: string } & Metrics)[] };
  campaigns: ({ id: string; name: string; status: string } & Metrics)[];
  ads: ({ id: string; name: string; campaignName: string; status: string } & Metrics)[];
  /** У період потрапили старі дані, збережені тижнями, — межі округлено до тижня. */
  hasCoarseData: boolean;
  /**
   * Цільова дія з сайту (напр. переходи в «Де придбати»), якщо налаштована.
   * since — перший день, за який вона є в межах періоду; unattributed — дії з
   * рекламним UTM, які не вдалося прив'язати до конкретного оголошення.
   */
  goal: { label: string; since: string | null; unattributed: number } | null;
  /** Усі кампанії періоду — для фільтра, навіть коли вибрано одну. */
  campaignOptions: { id: string; name: string }[];
  /** Вибрана кампанія, якщо звіт відфільтровано. */
  campaignId: string | null;
  /** Підсумки за такий самий попередній період — для порівняння. Немає для «Увесь час». */
  previous: { range: DateRange; totals: Metrics } | null;
  /** Коли дані востаннє оновлювались із джерела. */
  syncedAt: string | null;
};
