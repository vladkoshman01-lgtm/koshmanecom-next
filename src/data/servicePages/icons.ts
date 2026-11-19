/**
 * Графіка сторінок послуг: контури іконок і логотипи платформ.
 *
 * Іконки прив'язані до ПОРЯДКУ пунктів у даних, а не до тексту, —
 * тоді вони однакові в усіх мовах і файли з текстами лишаються чистими.
 * Якщо міняєте порядок пунктів у `uk/en/sk.ts`, міняйте і тут.
 */

export type ServicePageGraphics = {
  /** Логотип платформи в герої (Simple Icons, білий). */
  logo?: string;
  /** Кольори платформи для градієнтів; без них — помаранчевий і сірі сайту. */
  colors?: [string, string];
  forWhom: string[];
  included: string[];
  steps: string[];
  related: string[];
  /** Сервіси, які підключаємо: [назва, логотип]. */
  stack: [string, string][];
  /** Іконки карток додаткових секцій: id секції → контури за порядком пунктів. */
  sections?: Record<string, string[]>;
};

const si = (name: string) => `https://cdn.simpleicons.org/${name}/ffffff`;

const PATHS = {
  search: 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 20l-4-4',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  brush: 'M14 6l4 4-9 9H5v-4zM12 8l4 4',
  code: 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12',
  card: 'M3 6h18v12H3zM3 10h18M7 15h4',
  truck: 'M3 7h11v10H3zM14 10h4l3 3v4h-7M6.5 17a1.5 1.5 0 1 0 .01 0M17.5 17a1.5 1.5 0 1 0 .01 0',
  nodes: 'M5 12h4M15 6h4M15 18h4M9 12l6-6M9 12l6 6',
  gauge: 'M4 18a8 8 0 1 1 16 0M12 14l4-4',
  trend: 'M3 17l6-6 4 4 8-8M15 7h6v6',
  diamond: 'M12 3l8 4.5v9L12 21l-8-4.5v-9z',
  globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18',
  repeat: 'M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4',
  boxes: 'M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10',
  rocket: 'M14 4c3 1 5 3 6 6l-6 6-4-2-2-4zM10 14l-4 4M8 12l-3 1 1 3 3-1',
  store: 'M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0',
  target: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
  mega: 'M4 10v4h3l7 4V6l-7 4zM18 9a4 4 0 0 1 0 6',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 7.5h.01',
  zap: 'M13 3L5 13h6l-1 8 8-10h-6z',
  play: 'M3 5h18v14H3zM10 9v6l5-3z',
  chart: 'M4 20h16M7 16v-5M12 16V6M17 16v-8',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  briefcase: 'M3 8h18v11H3zM8 8V5h8v3M3 13h18',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  factory: 'M3 20V10l5 3V10l5 3V6h4v14zM3 20h18',
  monitor: 'M3 4h18v12H3zM8 20h8M12 16v4',
  list: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  pen: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
  checkCircle: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M8 12l3 3 5-6',
  cart: 'M3 4h3l2 11h11l2-8H7M10 20h.01M17 20h.01',
  pie: 'M12 3v9h9A9 9 0 1 1 12 3zM15 3.5A9 9 0 0 1 20.5 9H15z',
  chat: 'M4 5h16v11H9l-5 4z',
  clipboard: 'M9 4h6v3H9zM7 5H5v15h14V5h-2M9 12l2 2 4-4',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z',
  user: 'M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8M4 21a8 8 0 0 1 16 0',
  percent: 'M19 5L5 19M7 5a2 2 0 1 0 0 4a2 2 0 1 0 0-4M17 15a2 2 0 1 0 0 4a2 2 0 1 0 0-4',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 17l.7 1.8 1.8.7-1.8.7L19 22l-.7-1.8-1.8-.7 1.8-.7z',
  building: 'M4 21V4h10v17M14 9h6v12M2 21h20M7 8h2M7 12h2M7 16h2M17 13h.01M17 17h.01',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  send: 'M21 3L3 10.5l7 3 3 7zM10 13.5L21 3',
  calculator: 'M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01',
} as const;

const shopify: ServicePageGraphics = {
  logo: si('shopify'),
  // Без зеленого градієнта Shopify — як і на Google Ads, акценти беруть фірмовий помаранчевий сайту
  // Нові бренди, діючі магазини, виробники, B2B, нові ринки, системний розвиток
  forWhom: [PATHS.sparkle, PATHS.cart, PATHS.boxes, PATHS.building, PATHS.map, PATHS.layers],
  // Аналіз, структура, дизайн, каталог, картка товару, оплата й доставка,
  // інтеграції, аналітика, мобільна версія, тести й запуск, передача
  included: [
    PATHS.target,
    PATHS.grid,
    PATHS.brush,
    PATHS.list,
    PATHS.tag,
    PATHS.card,
    PATHS.nodes,
    PATHS.chart,
    PATHS.monitor,
    PATHS.checkCircle,
    PATHS.user,
  ],
  // Заявка, консультація, оцінка й план, розробка і запуск
  steps: [PATHS.send, PATHS.phone, PATHS.calculator, PATHS.rocket],
  // Google Ads, доопрацювання, B2B, CRO-аудит, SEO, контакти
  related: [PATHS.mega, PATHS.code, PATHS.boxes, PATHS.gauge, PATHS.search, PATHS.phone],
  sections: {
    // Платформа, магазин під ваш бізнес, готовність до продажів
    'ready-to-sell': [PATHS.store, PATHS.target, PATHS.checkCircle],
    // Готова тема, кастомізація теми, індивідуальна розробка
    variants: [PATHS.grid, PATHS.brush, PATHS.code],
    // Каталог, навігація, картка товару, кошик, оплата й доставка, мобільна версія, аналітика, SEO
    readiness: [
      PATHS.grid,
      PATHS.list,
      PATHS.tag,
      PATHS.cart,
      PATHS.truck,
      PATHS.monitor,
      PATHS.chart,
      PATHS.search,
    ],
  },
  // Конкретні сервіси оплати, доставки й CRM підбираємо під проєкт — логотипів не показуємо
  stack: [],
};

const googleAds: ServicePageGraphics = {
  logo: si('googleads'),
  // Без кольорів платформи: синьо-жовтий градієнт Google вибивався з палітри сайту,
  // тож акценти беруть фірмовий помаранчевий і сірі
  // Магазини, B2B, сервіси, виробники, ті, хто вже рекламується, нові ринки
  forWhom: [PATHS.cart, PATHS.briefcase, PATHS.calendar, PATHS.factory, PATHS.gauge, PATHS.globe],
  // Бізнес і цілі, конкуренти й попит, посадкові сторінки, семантика, структура,
  // оголошення, аналітика, запуск і перевірка
  included: [
    PATHS.target,
    PATHS.search,
    PATHS.monitor,
    PATHS.list,
    PATHS.grid,
    PATHS.pen,
    PATHS.chart,
    PATHS.checkCircle,
  ],
  // Заявка, консультація, аудит і план, запуск або оптимізація
  steps: [PATHS.mail, PATHS.chat, PATHS.clipboard, PATHS.trend],
  // П'ята — картка статті про кошики (лише UA)
  related: [PATHS.mega, PATHS.store, PATHS.trend, PATHS.target, PATHS.cart],
  sections: {
    // Search, Shopping, Performance Max, ремаркетинг, Display і YouTube
    'campaign-types': [PATHS.search, PATHS.tag, PATHS.zap, PATHS.repeat, PATHS.play],
    // GA4, GTM, conversion tracking, CRM і call tracking, ROAS, CAC, маржа, PNO (лише SK)
    measurement: [PATHS.chart, PATHS.tag, PATHS.target, PATHS.phone, PATHS.trend, PATHS.user, PATHS.percent, PATHS.pie],
  },
  stack: [
    ['Google Ads', si('googleads')],
    ['Google Analytics', si('googleanalytics')],
    ['Google Tag Manager', si('googletagmanager')],
  ],
};

export const SERVICE_PAGE_GRAPHICS: Record<string, ServicePageGraphics> = {
  shopify,
  'google-ads': googleAds,
};
