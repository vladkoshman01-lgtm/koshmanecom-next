/**
 * Сторінка окремої послуги за прототипом ServicePage.dc.html.
 *
 * Один тип на всі мови: українська — еталон, EN і SK типізуються від неї.
 * Кожна мова тримає свій повний текст, бо тут не короткі підписи, а контент,
 * який пишеться й вичитується окремо.
 */
/**
 * Додаткова секція сторінки — блок, який не вкладається в базову схему
 * (визначення послуги, типи кампаній, аналітика, діагностика).
 *
 * Усі поля опціональні: сторінка сама вирішує, чи їй такий блок потрібен.
 */
export type ServicePageExtraSection = {
  /** Якор секції — на неї можна посилатися зсередини сторінки. */
  id?: string;
  /** Коротка мітка над заголовком. */
  eyebrow?: string;
  /** Заголовок секції (H2). */
  title: string;
  /** Перший абзац після заголовка — відповідає на питання прямо. */
  intro?: string;
  /** Підзаголовок (H3) над картками — коли в пунктів своя тема. */
  itemsTitle?: string;
  /** Пункти секції: [назва, опис]. Порожній опис — пункт-рядок без пояснення. */
  items?: [string, string][];
  /** Як показувати пункти: картками чи списком. */
  variant?: 'cards' | 'list';
  /**
   * Маркер пунктів списку: галочка (що робимо), пронумеровані рядки
   * з терміном (пояснення понять) чи хрестик (типові проблеми).
   */
  marker?: 'check' | 'numbered' | 'problem' | 'dot' | 'tiles';
  /** Тон секції; без поля — чергуються світлий і сірий. */
  tone?: 'light' | 'grey' | 'dark';
  /** Заголовок акцентного блоку (H3), якщо в нього своя тема. */
  outroTitle?: string;
  /** Акцентний блок після пунктів (напр. про клієнтський дашборд). */
  outro?: string;
  /** Нумеровані кроки в акцентному блоці (напр. порядок діагностики). */
  outroSteps?: string[];
  /** Кнопка в секції — відкриває форму заявки. */
  cta?: string;
  /**
   * Додаткові кнопки секції. З `href` — посилання на іншу сторінку;
   * без нього — попап заявки, де `service` підставляється назвою послуги.
   */
  actions?: { label: string; href?: string; service?: string }[];
  /** Де стояти секції на сторінці. */
  placement?: 'after-tldr' | 'after-included';
};

export type ServicePage = {
  /** Адреса: /services/<slug>, однакова в усіх мовах. */
  slug: string;
  /** Категорія послуг і її ключ — для крихт і посилання на /services#key. */
  category: string;
  categoryKey: string;
  /** Коротка назва — у крихтах, картках і Schema.org. */
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** Другий абзац героя — коротке доповнення до основного тексту. */
  leadExtra?: string;
  /**
   * Власні підписи кнопок героя. Основна відкриває попап заявки,
   * другорядна прокручує до форми внизу. Без поля — загальні підписи шаблону.
   */
  /** false — без коротких міток над заголовками секцій («Для кого», «Ведення»…). */
  sectionLabels?: false;
  /** true — етапи на помаранчевому фоні, щоб блок «як почати» було видно. */
  stepsAccent?: true;
  /** Кнопка під етапами — відкриває попап заявки. */
  stepsCta?: string;
  /** Де стоїть лід-форма: після вартості чи в кінці сторінки (за замовчуванням). */
  leadPosition?: 'after-price' | 'end';
  heroCta?: { primary: string; secondary: string };
  /** Факти в темній картці героя: [підпис, значення]. */
  facts: [string, string][];
  /** Країни, на які орієнтована ця мовна версія — для Schema.org areaServed. */
  areaServed: string[];
  /** Дата останнього оновлення тексту — показуємо в блоці «Коротко». */
  updated: string;
  /** TL;DR: головне для читача і для AI-пошуку. */
  tldr?: string[];
  forTitle: string;
  forWhom: [string, string][];
  /** Чесне уточнення під картками «Для кого». */
  forWhomNote?: string;
  includedTitle: string;
  /** Вступ до блоку «Що входить» — перший абзац після H2. */
  includedIntro?: string;
  included: [string, string][];
  stepsTitle: string;
  /** Етапи: [строк, назва, опис]. */
  steps: [string, string, string][];
  compareTitle?: string;
  /** Порівняння: [критерій, самостійно, з агенцією]. */
  compare?: [string, string, string][];
  compareColumns?: [string, string];
  priceTitle: string;
  priceText: string;
  /** Підпис кнопки в блоці вартості; без поля — загальний зі словника. */
  priceCta?: string;
  priceFactorsTitle: string;
  priceFactors: string[];
  expert?: { name: string; role: string; bio: string; image: string };
  faqTitle: string;
  faq: [string, string][];
  relatedTitle: string;
  /** Пов'язані послуги: [категорія, назва, опис, адреса]. */
  related: [string, string, string, string][];
  /** Додаткові секції сторінки — блоки поза базовою схемою. */
  extraSections?: ServicePageExtraSection[];
  /** Тонкі налаштування розмітки Schema.org для цієї сторінки. */
  schema?: {
    /** Назва послуги в Service — за замовчуванням коротка назва сторінки. */
    name?: string;
    /** Тип послуги в Service. */
    serviceType?: string;
    /** false — сторінка без ціни: без Offer і hasOfferCatalog. */
    offers?: boolean;
  };
  leadTitle: string;
  leadText: string;
  /** Підпис кнопки відправки лід-форми; без поля — загальний. */
  leadSubmit?: string;
};
