/** Кейси для головної. Дані з прототипу Hero.dc.html. */

export type CaseCard = {
  id: string;
  name: string;
  description: string;
  /** Головна цифра. 'Зекономлено' означає двоярусний варіант метрики. */
  metric: string;
  metricSub: string;
  tags: string[];
  /** Колір-підкладка під обкладинкою, з нього ж градієнт зверху. */
  tint: string;
  /** Колір картки під обкладинкою, якщо він має відрізнятися від tint
   *  (коли картинка не доходить до низу — інакше видно смугу підкладки). */
  background?: string;
  /** Як вписати обкладинку: 'cover' (за замовчуванням) або 'contain' —
   *  зменшити картинку цілком, не обрізаючи. */
  coverFit?: 'cover' | 'contain';
  cover: string;
  /** Зсув і висота обкладинки в одиницях макета (1440). null = на всю картку. */
  imageTop: number;
  imageHeight: number | null;
};

export const CASES: CaseCard[] = [
  {
    id: 'flid',
    name: 'FLID',
    description:
      'Створення Ecommerce бізнесу під ключ. Назва, розробка, дизайн, анімація, B2B та B2C продажі',
    metric: '+3 роки',
    metricSub: 'довгостроковий проєкт',
    tags: ['B2B', 'B2C', 'eCommerce', 'Розробка', 'Продаж овочів'],
    tint: '#C7350F',
    // Обкладинка — готова композиція картки (340×560): ставимо як намальовано,
    // на всю картку від верху, текст лягає поверх. Так погодив клієнт.
    cover: '/cases/case-flid-cover.webp',
    imageTop: 0,
    imageHeight: null,
  },
  {
    id: 'beauty',
    name: 'BEAUTY BRAND PRO',
    description:
      'Розробка B2B платформи для продажу на Shopify. Принцип, який економить +20 000$/рік.',
    metric: 'Зекономлено',
    metricSub: '+20 000$ / рік',
    tags: ['B2B', 'Beauty Дистрибуція', 'Розробка', 'eCommerce', 'B2C'],
    tint: '#16A3AE',
    cover: '/cases/case-beauty.webp',
    imageTop: 0,
    imageHeight: null,
  },
  {
    id: 'herbalife',
    name: 'HERBALIFE USA',
    description: 'Висококонверсійні лендінги для перевірки попиту на продукт',
    metric: '+30%',
    metricSub: 'середній чек, за рахунок допродажів',
    tags: ['B2C', 'Health', 'eCommerce', 'LTV', 'CRO'],
    tint: '#1E3A1E',
    cover: '/cases/case-herbalife.webp',
    imageTop: 0,
    imageHeight: null,
  },
  {
    id: 'annasposa',
    name: 'ANNA SPOSA GROUP',
    description: 'Pinterest Ads для B2B-бренду весільних суконь у Франції',
    metric: '17 000',
    metricSub: 'переходів на сайт щомісяця',
    tags: ['B2B', 'Весільні сукні', 'Pinterest Ads', 'Франція'],
    tint: '#6A80AE',
    cover: '/cases/case-annasposa.webp',
    imageTop: 0,
    imageHeight: 727,
  },
  {
    id: 'lumina',
    name: 'LUMINA NORDIC',
    description: 'Pinterest Ads для інтернет-магазину декору в Німеччині та Польщі',
    metric: '4,1x',
    metricSub: 'ROAS, 1 050 замовлень за 6 місяців',
    tags: ['B2C', 'Декор для дому', 'Pinterest Ads', 'eCommerce'],
    tint: '#5C4433',
    cover: '/cases/case-lumina.webp',
    imageTop: 0,
    imageHeight: null,
  },
  {
    id: 'etsy',
    name: 'ETSY · ПРИКРАСИ',
    description: 'Просування чинного магазину прикрас на Etsy: SEO, лістинги, автоматизація викладки',
    metric: '$14 300',
    metricSub: 'продажів за 7 місяців, трафік ×2',
    tags: ['B2C', 'Etsy', 'Прикраси', 'SEO'],
    tint: '#6B5536',
    cover: '/cases/case-etsy.webp',
    imageTop: 0,
    imageHeight: null,
  },
  {
    id: 'mgd',
    name: 'MICHAEL GRAVES DESIGN',
    description: 'Інтернет-магазин для продажу власних і партнерських продуктів',
    metric: '+53%',
    metricSub:
      'середній чек, за рахунок партнерських продажів та правильної побудови магазину',
    tags: ['B2C', 'Аналітика', 'CRO', 'eCommerce', 'Health & WELLNESS'],
    tint: '#4A4440',
    cover: '/cases/case-mgd.webp',
    imageTop: 0,
    imageHeight: null,
  },
  {
    id: 'kan',
    name: 'KAN DEVELOPMENT',
    description: 'Реалізація дизайну, створення бренду для навчального холдингу A+',
    metric: '+100',
    metricSub: 'маркетинг матеріалів та постійна дизайн підтримка бренду',
    tags: ['B2C', 'Освіта', 'Дизайн', 'Брендинг'],
    tint: '#2F4A1A',
    cover: '/cases/case-kan.webp',
    imageTop: 0,
    imageHeight: null,
  },
];
