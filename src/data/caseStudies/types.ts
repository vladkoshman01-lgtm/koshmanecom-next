/**
 * Типи детальних сторінок кейсів (`/cases/<slug>`, `/en/cases/<slug>`, `/sk/cases/<slug>`).
 *
 * Шаблон один (`CaseStudyView`), а набір блоків кожен кейс задає сам:
 * колаж пінів або інфографіка на першому екрані, воронка чи етапи,
 * типи кампаній, приклади креативів — усе необовʼязкове.
 *
 * Правила клієнта: назву бренду в тексті згадуємо рідко, нових цифр
 * понад ті, що дав клієнт, не додаємо, кольори — лише фірмові.
 */

/** Іконки кроків і висновків — контури в стилі сайту (`CaseStudyView`). */
export type CaseIcon =
  | 'pin'
  | 'dress'
  | 'search'
  | 'store'
  | 'test'
  | 'tune'
  | 'stable'
  | 'scale'
  | 'click'
  | 'video'
  | 'data'
  | 'clock'
  | 'bookmark'
  | 'globe';

/** Пін у колажі першого екрана. ratio — пропорції фото, щоб нічого не обрізалось. */
export type FeedPinSpec = {
  src: string;
  ratio: string;
  position?: 'top' | 'center' | 'right';
  title?: string;
  /** Підпис «реклама» мовою ринку: Sponsorisé, Gesponsert… */
  sponsored?: string;
};

export type CaseStudy = {
  slug: string;
  /** id картки на головній (`src/data/cases.ts`), щоб «Детальніше» вело сюди. */
  cardId?: string;
  metaTitle: string;
  metaDescription: string;
  /** Ключові запити — у JSON-LD. */
  keywords: string;
  /** Країни кампанії англійською — для contentLocation у JSON-LD. */
  countries: string[];
  /** Дата публікації й оновлення, ISO. */
  published: string;
  updated: string;
  client: string;
  /** Останній пункт хлібних крихт (без назви бренду). */
  breadcrumb: string;
  /** Логотип клієнта для темного фону. Немає — показуємо назву текстом. */
  logo?: { src: string; width: number; height: number };
  channel: string;
  h1: string;
  /** Один рядок під H1 на першому екрані. */
  lead: string;
  tags: string[];
  /** «Коротко» — окремий блок під першим екраном. */
  summary: string;
  facts: [string, string][];
  /** Опис візуалу першого екрана (alt) і картинка для JSON-LD, якщо є. */
  cover: { alt: string; image?: string };
  /** Візуал першого екрана: колаж пінів (є фото) або інфографіка з цифрами. */
  heroVisual:
    | { type: 'pins'; columns: { offset: string; pins: FeedPinSpec[] }[] }
    | {
        type: 'split';
        total: string;
        label: string;
        /** [назва, значення, підпис] — частки рахуються від суми значень. */
        parts: [string, number, string][];
        /** Рекламний пін поруч із цифрами, якщо є фото. */
        pin?: FeedPinSpec;
      };
  /** OG-картинка: з колажем (4 файли з src/og/images) або текстова. */
  /** 4 файли — колаж, 1 файл — один пін праворуч. */
  og: { title: string; subtitle: string; images?: [string, string, string, string] | [string]; tall?: boolean };
  metrics: [string, string][];
  task: { title: string; paragraphs: string[] };
  solution: {
    title: string;
    /** Картки рішення показати перед кроками (за порядком тексту кейсу). */
    cardsFirst?: boolean;
    /** Кроки з іконками: воронка або етапи роботи. Останній крок виділений. */
    steps: { title: string; text?: string; items: [string, string, CaseIcon][]; badge?: string };
    cards: [string, string][];
    /** Приклади рекламних пінів. Немає — блок не показуємо. */
    /** ratio — пропорції фото (за замовчуванням 2/3), щоб текст на піні не обрізався. */
    pins?: { src: string; alt: string; ratio?: string }[];
    pinsCaption?: string;
    pinsNote?: string;
  };
  /** Типи кампаній — окрема світла секція. */
  campaigns?: { title: string; items: [string, string][] };
  results: {
    title: string;
    items: [string, string][];
    chart: {
      /** Підпис над графіком. */
      label: string;
      alt: string;
      /** Плашка праворуч від підпису. */
      growth: string;
      /** [підпис, значення, короткий підпис для телефона]. */
      months: [string, number, string][];
      /** 'ends' — цифри лише на першому й останньому стовпчику; 'all' — на всіх. */
      labels: 'ends' | 'all';
      format: 'int' | 'x';
      /** «≈» перед першим значенням (воно округлене). */
      approxFirst?: boolean;
      /** Заголовки таблиці-дубля графіка (для пошуковиків і скрінрідерів). */
      table: [string, string];
    };
  };
  insights: { title: string; intro: string; items: [string, string, CaseIcon][] };
  /** null — цитати ще немає, блок не показуємо (заглушку на сайт не виносимо). */
  quote: { text: string; author: string; role: string } | null;
  conclusion: { title: string; text: string; ctaLabel: string };
  faqTitle: string;
  faq: [string, string][];
  leadTitle: string;
  leadText: string;
};
