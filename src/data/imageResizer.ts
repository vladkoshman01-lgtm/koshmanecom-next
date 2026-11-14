import { localizedSlugs, type Locale } from '@/lib/i18n';
import type { ToolPageCopy } from './toolPage';

/**
 * Ресайзер зображень: пресети розмірів і тексти сторінки трьома мовами.
 * Таблиця розмірів у гайді будується з тих самих пресетів, що й інструмент,
 * тож цифри на сторінці й у файлах завжди однакові.
 */

export const RESIZER_PATHS = localizedSlugs['/tools/image-resizer'];

/** Коли розміри востаннє звіряли з довідками платформ. */
export const SIZES_CHECKED = '2026-11-14';

type L10n = Record<Locale, string>;

/** Безпечна зона у частках кадру: туди не залазять кнопки й підписи платформи. */
export type SafeZone = { x: number; y: number; w: number; h: number; label: L10n };

export type Preset = {
  id: string;
  name: L10n;
  width: number;
  height: number;
  note: L10n;
  safe?: SafeZone;
  /** Платформа вимагає білий фон (головне фото Amazon). */
  whiteBg?: boolean;
};

export type Platform = { id: string; name: string; presets: Preset[] };

// Кнопки, ніки й підписи у вертикальному відео: ~14% зверху, ~20% знизу
const VERTICAL_SAFE: SafeZone = {
  x: 0.06,
  y: 0.14,
  w: 0.88,
  h: 0.66,
  label: { uk: 'Безпечна зона', en: 'Safe zone', sk: 'Bezpečná zóna' },
};

export const PLATFORMS: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    presets: [
      {
        id: 'portrait',
        name: { uk: 'Пост 4:5', en: 'Post 4:5', sk: 'Príspevok 4:5' },
        width: 1080,
        height: 1350,
        note: {
          uk: 'Найбільше місця у стрічці',
          en: 'Takes the most space in the feed',
          sk: 'Zaberá najviac miesta vo feede',
        },
      },
      {
        id: 'grid',
        name: { uk: 'Пост 3:4', en: 'Post 3:4', sk: 'Príspevok 3:4' },
        width: 1080,
        height: 1440,
        note: {
          uk: 'Як показує сітка профілю',
          en: 'Matches the profile grid',
          sk: 'Ako ukazuje mriežka profilu',
        },
      },
      {
        id: 'square',
        name: { uk: 'Квадрат', en: 'Square', sk: 'Štvorec' },
        width: 1080,
        height: 1080,
        note: { uk: 'Класичний пост', en: 'Classic post', sk: 'Klasický príspevok' },
      },
      {
        id: 'story',
        name: { uk: 'Stories і Reels', en: 'Stories & Reels', sk: 'Stories a Reels' },
        width: 1080,
        height: 1920,
        note: { uk: 'На весь екран телефона', en: 'Full phone screen', sk: 'Na celú obrazovku telefónu' },
        safe: VERTICAL_SAFE,
      },
    ],
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    presets: [
      {
        id: 'pin',
        name: { uk: 'Пін 2:3', en: 'Pin 2:3', sk: 'Pin 2:3' },
        width: 1000,
        height: 1500,
        note: {
          uk: 'Стандарт, який рекомендує Pinterest',
          en: 'The standard Pinterest recommends',
          sk: 'Štandard, ktorý odporúča Pinterest',
        },
      },
      {
        id: 'square',
        name: { uk: 'Квадратний пін', en: 'Square pin', sk: 'Štvorcový pin' },
        width: 1000,
        height: 1000,
        note: { uk: 'Для товарів і каруселей', en: 'For products and carousels', sk: 'Pre produkty a karusely' },
      },
      {
        id: 'video',
        name: { uk: 'Відеопін 9:16', en: 'Video pin 9:16', sk: 'Video pin 9:16' },
        width: 1080,
        height: 1920,
        note: { uk: 'Обкладинка вертикального відео', en: 'Vertical video cover', sk: 'Obal vertikálneho videa' },
        safe: VERTICAL_SAFE,
      },
    ],
  },
  {
    id: 'etsy',
    name: 'Etsy',
    presets: [
      {
        id: 'listing',
        name: { uk: 'Фото лістингу', en: 'Listing photo', sk: 'Foto ponuky' },
        width: 3000,
        height: 2250,
        note: {
          uk: 'Мінімум 2000 px по короткій стороні',
          en: 'At least 2000 px on the short side',
          sk: 'Aspoň 2000 px na kratšej strane',
        },
      },
      {
        id: 'square',
        name: { uk: 'Квадратне фото', en: 'Square photo', sk: 'Štvorcové foto' },
        width: 2000,
        height: 2000,
        note: {
          uk: 'Мініатюра не обріже товар',
          en: 'Thumbnails will not crop the product',
          sk: 'Miniatúra neoreže produkt',
        },
      },
      {
        id: 'banner',
        name: { uk: 'Великий банер', en: 'Big banner', sk: 'Veľký banner' },
        width: 3360,
        height: 840,
        note: { uk: 'Обкладинка магазину', en: 'Shop cover', sk: 'Titulka obchodu' },
      },
      {
        id: 'mini-banner',
        name: { uk: 'Міні-банер', en: 'Mini banner', sk: 'Mini banner' },
        width: 1600,
        height: 213,
        note: { uk: 'Вузька смуга над товарами', en: 'Thin strip above listings', sk: 'Úzky pás nad ponukami' },
      },
      {
        id: 'icon',
        name: { uk: 'Іконка магазину', en: 'Shop icon', sk: 'Ikona obchodu' },
        width: 500,
        height: 500,
        note: { uk: 'Логотип, показується в колі', en: 'Logo, shown as a circle', sk: 'Logo, zobrazuje sa v kruhu' },
      },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    presets: [
      {
        id: 'video',
        name: { uk: 'Відео й обкладинка', en: 'Video & cover', sk: 'Video a obal' },
        width: 1080,
        height: 1920,
        note: { uk: 'На весь екран телефона', en: 'Full phone screen', sk: 'Na celú obrazovku telefónu' },
        safe: VERTICAL_SAFE,
      },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    presets: [
      {
        id: 'post',
        name: { uk: 'Пост 4:5', en: 'Post 4:5', sk: 'Príspevok 4:5' },
        width: 1080,
        height: 1350,
        note: { uk: 'Вертикальний пост у стрічці', en: 'Vertical feed post', sk: 'Vertikálny príspevok vo feede' },
      },
      {
        id: 'link',
        name: { uk: 'Картинка посилання', en: 'Link image', sk: 'Obrázok odkazu' },
        width: 1200,
        height: 630,
        note: { uk: 'Прев’ю сайту і статей', en: 'Preview for sites and articles', sk: 'Náhľad webu a článkov' },
      },
      {
        id: 'story',
        name: { uk: 'Stories', en: 'Stories', sk: 'Stories' },
        width: 1080,
        height: 1920,
        note: { uk: 'На весь екран телефона', en: 'Full phone screen', sk: 'Na celú obrazovku telefónu' },
        safe: VERTICAL_SAFE,
      },
      {
        id: 'cover',
        name: { uk: 'Обкладинка сторінки', en: 'Page cover', sk: 'Titulka stránky' },
        width: 851,
        height: 315,
        note: {
          uk: 'На телефоні обрізаються краї',
          en: 'Edges are cropped on mobile',
          sk: 'Na mobile sa orežú okraje',
        },
      },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    presets: [
      {
        id: 'thumbnail',
        name: { uk: 'Прев’ю відео', en: 'Video thumbnail', sk: 'Náhľad videa' },
        width: 1280,
        height: 720,
        note: { uk: 'Файл до 2 МБ', en: 'File up to 2 MB', sk: 'Súbor do 2 MB' },
      },
      {
        id: 'banner',
        name: { uk: 'Банер каналу', en: 'Channel banner', sk: 'Banner kanála' },
        width: 2560,
        height: 1440,
        note: {
          uk: 'Текст і лого — у центрі 1546 × 423',
          en: 'Keep text and logo in the central 1546 × 423',
          sk: 'Text a logo do stredu 1546 × 423',
        },
        // Центральна зона, яку видно на всіх пристроях
        safe: {
          x: (2560 - 1546) / 2 / 2560,
          y: (1440 - 423) / 2 / 1440,
          w: 1546 / 2560,
          h: 423 / 1440,
          label: { uk: 'Видно на всіх пристроях', en: 'Visible on all devices', sk: 'Viditeľné na všetkých zariadeniach' },
        },
      },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    presets: [
      {
        id: 'post',
        name: { uk: 'Пост', en: 'Post', sk: 'Príspevok' },
        width: 1200,
        height: 627,
        note: { uk: 'Горизонтальний пост і посилання', en: 'Landscape post and link', sk: 'Horizontálny príspevok a odkaz' },
      },
      {
        id: 'portrait',
        name: { uk: 'Пост 4:5', en: 'Post 4:5', sk: 'Príspevok 4:5' },
        width: 1080,
        height: 1350,
        note: { uk: 'Більше місця у стрічці', en: 'More space in the feed', sk: 'Viac miesta vo feede' },
      },
      {
        id: 'banner',
        name: { uk: 'Банер профілю', en: 'Profile banner', sk: 'Banner profilu' },
        width: 1584,
        height: 396,
        note: { uk: 'Обкладинка профілю', en: 'Profile cover', sk: 'Titulka profilu' },
      },
    ],
  },
  {
    id: 'x',
    name: 'X',
    presets: [
      {
        id: 'post',
        name: { uk: 'Пост 16:9', en: 'Post 16:9', sk: 'Príspevok 16:9' },
        width: 1600,
        height: 900,
        note: { uk: 'Без обрізання у стрічці', en: 'No cropping in the feed', sk: 'Bez orezania vo feede' },
      },
      {
        id: 'header',
        name: { uk: 'Шапка профілю', en: 'Profile header', sk: 'Hlavička profilu' },
        width: 1500,
        height: 500,
        note: { uk: 'Обкладинка профілю', en: 'Profile cover', sk: 'Titulka profilu' },
      },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    presets: [
      {
        id: 'main',
        name: { uk: 'Головне фото', en: 'Main image', sk: 'Hlavný obrázok' },
        width: 2000,
        height: 2000,
        note: {
          uk: 'Чисто білий фон, товар ≥ 85% кадру',
          en: 'Pure white background, product ≥ 85% of frame',
          sk: 'Čisto biele pozadie, produkt ≥ 85 % záberu',
        },
        whiteBg: true,
      },
    ],
  },
  {
    id: 'shopify',
    name: 'Shopify',
    presets: [
      {
        id: 'product',
        name: { uk: 'Фото товару', en: 'Product photo', sk: 'Foto produktu' },
        width: 2048,
        height: 2048,
        note: {
          uk: 'Квадрат, як рекомендує Shopify',
          en: 'Square, as Shopify recommends',
          sk: 'Štvorec, ako odporúča Shopify',
        },
      },
    ],
  },
];

export const PRESET_COUNT = PLATFORMS.reduce((n, p) => n + p.presets.length, 0);

/** Співвідношення сторін у вигляді «4:5». */
export function ratioOf(w: number, h: number): string {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const g = gcd(w, h);
  const rw = w / g;
  const rh = h / g;
  // 1600×213, 1200×627 тощо не скорочуються красиво — показуємо десяткове
  if (rw > 32 || rh > 32) return w >= h ? `${(w / h).toFixed(2)}:1` : `1:${(h / w).toFixed(2)}`;
  return `${rw}:${rh}`;
}

const sizeRows = (locale: Locale): [string, string, string][] =>
  PLATFORMS.flatMap((platform) =>
    platform.presets.map(
      (p) =>
        [
          `${platform.name} · ${p.name[locale]}`,
          `${p.width} × ${p.height}`,
          `${ratioOf(p.width, p.height)} — ${p.note[locale]}`,
        ] as [string, string, string],
    ),
  );

export type ResizerCopy = ToolPageCopy & {
  ui: {
    drop: string;
    dropHint: string;
    choose: string;
    privacy: string;
    replace: string;
    resetFrame: string;
    dragHint: string;
    source: string;
    upscale: string;
    badFile: string;
    platform: string;
    size: string;
    frame: string;
    cover: string;
    contain: string;
    coverHint: string;
    containHint: string;
    zoom: string;
    background: string;
    bgWhite: string;
    bgBlack: string;
    bgBlur: string;
    bgCustom: string;
    whiteRequired: string;
    overlays: string;
    grid: string;
    safe: string;
    file: string;
    format: string;
    quality: string;
    pngHint: string;
    result: string;
    resultSize: string;
    weight: string;
    download: string;
    zipPlatform: string;
    zipAll: string;
    zipping: string;
    zipHint: string;
    cta: string;
  };
};

const uk: ResizerCopy = {
  meta: {
    title: 'Зміна розміру фото для соцмереж онлайн — Instagram, Etsy, Pinterest',
    description:
      'Безкоштовний ресайзер: 26 актуальних розмірів для Instagram, Pinterest, Etsy, TikTok, Facebook, YouTube, LinkedIn, X, Amazon і Shopify. Кадрування, безпечні зони, JPG/PNG/WebP, ZIP. Фото не покидає браузер.',
    ogTitle: 'Зміна розміру зображень для соцмереж',
    ogSubtitle: '26 розмірів для Instagram, Etsy, Pinterest, TikTok і YouTube — без завантаження на сервер',
  },
  crumbs: { home: 'Головна', tools: 'Інструменти', page: 'Ресайзер зображень' },
  hero: {
    eyebrow: 'Інструмент · Контент',
    title: 'Зміна розміру зображень для соцмереж',
    subtitle:
      'Завантажте фото, оберіть платформу — і отримайте файл точного розміру. Кадр можна посунути й наблизити, а безпечна зона покаже, куди не залізуть кнопки Stories.',
    checked: 'Розміри звірено з довідками платформ: листопад 2026',
  },
  chips: [
    ['Платформ', '10'],
    ['Розмірів', '26'],
    ['Формати', 'JPG · PNG · WebP'],
    ['Обробка', 'у браузері'],
    ['Ціна', 'безкоштовно'],
  ],
  cta: {
    calculate: 'Змінити розмір фото',
    bandTitle: 'Потрібні фото й банери, які продають?',
    bandText:
      'Підготуємо візуал для магазину й соцмереж: фото товарів для Etsy і Amazon, піни, банери й креативи для реклами — під вимоги кожної платформи.',
  },
  guide: {
    eyebrow: 'Шпаргалка розмірів',
    title: 'Розміри зображень для соцмереж і маркетплейсів 2026',
    intro:
      'Платформи стискають і обрізають фото, якщо розмір не збігається. Нижче — усі розміри, які вміє робити ресайзер, з пропорціями й підказками, де їх використовувати.',
    table: { head: ['Платформа і формат', 'Розмір, px', 'Пропорції та примітка'], rows: sizeRows('uk') },
    formulaTitle: 'Обрізати чи вписати?',
    formula:
      '«Обрізати» заповнює весь кадр і зрізає зайве — найкраще для стрічки й Stories. «Вписати» показує фото повністю і додає поля: білі для маркетплейсів, розмиті — для Stories з горизонтального фото.',
    exampleTitle: 'Як підготувати фото за хвилину',
    example: [
      '1. Перетягніть фото у вікно або вставте його з буфера (Ctrl/Cmd + V).',
      '2. Оберіть платформу й формат — прев’ю одразу покаже кадр.',
      '3. Посуньте й наблизьте фото, перевірте безпечну зону.',
      '4. Скачайте файл або ZIP з усіма розмірами платформи.',
    ],
    tipsTitle: 'Поради',
    tips: [
      'Беріть оригінал, а не скріншот: якщо фото менше за потрібний розмір, воно буде розмитим.',
      'Для фото товарів обирайте JPG 85–90% — файл легкий, різниці на око немає.',
      'PNG — для логотипів і графіки з текстом, WebP — для сайту й Shopify.',
      'Текст на Stories і TikTok тримайте в безпечній зоні, інакше його закриють кнопки.',
    ],
  },
  faq: {
    eyebrow: 'Питання',
    title: 'Часті питання',
    text: 'Не знайшли відповіді? Напишіть нам — підкажемо, як підготувати візуал під вашу платформу.',
    cta: 'Поставити питання',
    items: [
      [
        'Чи завантажуються мої фото на сервер?',
        'Ні. Усе відбувається у вашому браузері: фото не передається нам і не зберігається. Після закриття сторінки нічого не лишається.',
      ],
      [
        'Які формати підтримуються?',
        'На вході — JPG, PNG, WebP та інші формати, які відкриває ваш браузер. На виході можна обрати JPG, PNG або WebP і якість стиснення.',
      ],
      [
        'Чим «Обрізати» відрізняється від «Вписати»?',
        '«Обрізати» заповнює кадр повністю і зрізає краї, які не влазять. «Вписати» зберігає фото цілим і додає поля — білі, чорні, розмиті або свого кольору.',
      ],
      [
        'Що таке безпечна зона?',
        'Це частина кадру, яку не закривають кнопки, ніки й підписи у Stories, Reels і TikTok, або центр банера YouTube, видимий на всіх пристроях. Важливий текст і товар тримайте всередині.',
      ],
      [
        'Чи можна отримати всі розміри одразу?',
        'Так. Кнопка ZIP збирає архів з усіма розмірами обраної платформи або всіма 26 розмірами. Кадр, який ви налаштували, застосовується до кожного файлу.',
      ],
      [
        'Який розмір фото потрібен для Etsy у 2026 році?',
        'Etsy радить 3000 × 2250 px (4:3) і щонайменше 2000 px по короткій стороні. Якщо хочете, щоб мініатюра в пошуку не обрізала товар, зробіть квадрат 2000 × 2000.',
      ],
    ],
  },
  lead: {
    title: 'Обговорімо візуал для вашого магазину',
    subtitle: 'Залиште контакти — підкажемо, які фото й креативи підсилять продажі на вашій платформі.',
  },
  app: {
    name: 'Ресайзер зображень для соцмереж',
    features: [
      '26 розмірів для 10 платформ',
      'Кадрування з наближенням',
      'Безпечні зони Stories, Reels, TikTok і YouTube',
      'Поля: білі, чорні, розмиті або свій колір',
      'JPG, PNG, WebP з вибором якості',
      'ZIP з усіма розмірами',
      'Обробка у браузері без завантаження на сервер',
    ],
  },
  checkedDate: SIZES_CHECKED,
  ui: {
    drop: 'Перетягніть фото сюди',
    dropHint: 'або вставте з буфера (Ctrl/Cmd + V) · JPG, PNG, WebP',
    choose: 'Обрати файл',
    privacy: 'Фото не покидає ваш браузер',
    replace: 'Замінити фото',
    resetFrame: 'Скинути кадр',
    dragHint: 'Тягніть фото, щоб змінити кадр',
    source: 'Оригінал',
    upscale: 'Фото менше за потрібний розмір — у файлі воно може бути нечітким.',
    badFile: 'Не вдалося відкрити файл. Спробуйте JPG, PNG або WebP.',
    platform: 'Платформа',
    size: 'Формат',
    frame: 'Кадр',
    cover: 'Обрізати',
    contain: 'Вписати',
    coverHint: 'Фото заповнює весь кадр, краї зрізаються.',
    containHint: 'Фото видно повністю, навколо — поля.',
    zoom: 'Наближення',
    background: 'Поля',
    bgWhite: 'Білі',
    bgBlack: 'Чорні',
    bgBlur: 'Розмиті',
    bgCustom: 'Свій колір',
    whiteRequired: 'Amazon приймає головне фото лише на чисто білому фоні.',
    overlays: 'Підказки на прев’ю',
    grid: 'Сітка третин',
    safe: 'Безпечна зона',
    file: 'Файл',
    format: 'Формат файлу',
    quality: 'Якість',
    pngHint: 'PNG зберігає без втрат — файл буде важчим.',
    result: 'Готовий файл',
    resultSize: 'Розмір',
    weight: 'Вага',
    download: 'Скачати',
    zipPlatform: 'ZIP: усі розміри {platform}',
    zipAll: 'ZIP: усі {count} розмірів',
    zipping: 'Готуємо архів…',
    zipHint: 'Ваш кадр застосується до кожного файлу.',
    cta: 'Потрібен візуал для магазину',
  },
};

const en: ResizerCopy = {
  meta: {
    title: 'Social Media Image Resizer — Instagram, Etsy, Pinterest sizes',
    description:
      'Free image resizer with 26 up-to-date sizes for Instagram, Pinterest, Etsy, TikTok, Facebook, YouTube, LinkedIn, X, Amazon and Shopify. Crop, safe zones, JPG/PNG/WebP, ZIP. Photos never leave your browser.',
    ogTitle: 'Social media image resizer',
    ogSubtitle: '26 sizes for Instagram, Etsy, Pinterest, TikTok and YouTube — no upload to any server',
  },
  crumbs: { home: 'Home', tools: 'Tools', page: 'Image resizer' },
  hero: {
    eyebrow: 'Tool · Content',
    title: 'Social media image resizer',
    subtitle:
      'Upload a photo, pick a platform and get a file in the exact size. Move and zoom the frame, and the safe zone shows where Stories buttons will not cover your content.',
    checked: 'Sizes checked against platform help centres: November 2026',
  },
  chips: [
    ['Platforms', '10'],
    ['Sizes', '26'],
    ['Formats', 'JPG · PNG · WebP'],
    ['Processing', 'in your browser'],
    ['Price', 'free'],
  ],
  cta: {
    calculate: 'Resize a photo',
    bandTitle: 'Need photos and banners that sell?',
    bandText:
      'We create visuals for your shop and social media: product photos for Etsy and Amazon, pins, banners and ad creatives — tailored to each platform’s requirements.',
  },
  guide: {
    eyebrow: 'Size cheat sheet',
    title: 'Social media and marketplace image sizes for 2026',
    intro:
      'Platforms compress and crop images that do not match their size. Here are all the sizes the resizer can produce, with aspect ratios and where to use each one.',
    table: { head: ['Platform and format', 'Size, px', 'Ratio and note'], rows: sizeRows('en') },
    formulaTitle: 'Crop or fit?',
    formula:
      '“Crop” fills the whole frame and trims the rest — best for feeds and Stories. “Fit” shows the full photo and adds borders: white for marketplaces, blurred for Stories made from a landscape shot.',
    exampleTitle: 'Prepare a photo in a minute',
    example: [
      '1. Drop a photo into the window or paste it (Ctrl/Cmd + V).',
      '2. Choose a platform and format — the preview shows the frame instantly.',
      '3. Move and zoom the photo, check the safe zone.',
      '4. Download the file or a ZIP with every size for the platform.',
    ],
    tipsTitle: 'Tips',
    tips: [
      'Start from the original, not a screenshot: a photo smaller than the target size will look blurry.',
      'For product photos use JPG at 85–90% — a light file with no visible difference.',
      'PNG suits logos and graphics with text, WebP suits websites and Shopify.',
      'Keep text on Stories and TikTok inside the safe zone, or the buttons will cover it.',
    ],
  },
  faq: {
    eyebrow: 'Questions',
    title: 'FAQ',
    text: 'Did not find an answer? Message us and we will help you prepare visuals for your platform.',
    cta: 'Ask a question',
    items: [
      [
        'Are my photos uploaded to a server?',
        'No. Everything happens in your browser: the photo is never sent to us or stored anywhere. Nothing is left once you close the page.',
      ],
      [
        'Which formats are supported?',
        'Input: JPG, PNG, WebP and any other format your browser can open. Output: JPG, PNG or WebP with adjustable quality.',
      ],
      [
        'What is the difference between Crop and Fit?',
        '“Crop” fills the frame completely and trims edges that do not fit. “Fit” keeps the whole photo and adds borders — white, black, blurred or a colour of your choice.',
      ],
      [
        'What is a safe zone?',
        'It is the part of the frame not covered by buttons, usernames and captions in Stories, Reels and TikTok, or the centre of a YouTube banner that shows on every device. Keep key text and the product inside it.',
      ],
      [
        'Can I get all sizes at once?',
        'Yes. The ZIP button builds an archive with every size for the selected platform or all 26 sizes. The frame you set is applied to each file.',
      ],
      [
        'What image size does Etsy need in 2026?',
        'Etsy recommends 3000 × 2250 px (4:3) and at least 2000 px on the shortest side. If you want search thumbnails not to crop the product, use a 2000 × 2000 square.',
      ],
    ],
  },
  lead: {
    title: 'Let’s talk about visuals for your shop',
    subtitle: 'Leave your contacts and we will suggest which photos and creatives will lift sales on your platform.',
  },
  app: {
    name: 'Social media image resizer',
    features: [
      '26 sizes for 10 platforms',
      'Crop with zoom',
      'Safe zones for Stories, Reels, TikTok and YouTube',
      'Borders: white, black, blurred or custom colour',
      'JPG, PNG, WebP with quality control',
      'ZIP with every size',
      'In-browser processing, no upload',
    ],
  },
  checkedDate: SIZES_CHECKED,
  ui: {
    drop: 'Drop a photo here',
    dropHint: 'or paste it (Ctrl/Cmd + V) · JPG, PNG, WebP',
    choose: 'Choose file',
    privacy: 'Your photo never leaves the browser',
    replace: 'Replace photo',
    resetFrame: 'Reset frame',
    dragHint: 'Drag the photo to change the frame',
    source: 'Original',
    upscale: 'The photo is smaller than the target size — the file may look blurry.',
    badFile: 'Could not open the file. Try JPG, PNG or WebP.',
    platform: 'Platform',
    size: 'Format',
    frame: 'Frame',
    cover: 'Crop',
    contain: 'Fit',
    coverHint: 'The photo fills the frame, edges are trimmed.',
    containHint: 'The whole photo is visible, with borders around it.',
    zoom: 'Zoom',
    background: 'Borders',
    bgWhite: 'White',
    bgBlack: 'Black',
    bgBlur: 'Blurred',
    bgCustom: 'Custom',
    whiteRequired: 'Amazon only accepts main images on a pure white background.',
    overlays: 'Preview guides',
    grid: 'Rule of thirds',
    safe: 'Safe zone',
    file: 'File',
    format: 'File format',
    quality: 'Quality',
    pngHint: 'PNG is lossless — the file will be heavier.',
    result: 'Ready file',
    resultSize: 'Size',
    weight: 'Weight',
    download: 'Download',
    zipPlatform: 'ZIP: all {platform} sizes',
    zipAll: 'ZIP: all {count} sizes',
    zipping: 'Preparing archive…',
    zipHint: 'Your frame is applied to every file.',
    cta: 'Need visuals for your shop',
  },
};

// SK — чернетка, вичитати носієм
const sk: ResizerCopy = {
  meta: {
    title: 'Zmena veľkosti obrázkov pre sociálne siete — Instagram, Etsy',
    description:
      'Bezplatný nástroj: 26 aktuálnych rozmerov pre Instagram, Pinterest, Etsy, TikTok, Facebook, YouTube, LinkedIn, X, Amazon a Shopify. Orezanie, bezpečné zóny, JPG/PNG/WebP, ZIP. Fotky neopustia prehliadač.',
    ogTitle: 'Zmena veľkosti obrázkov pre sociálne siete',
    ogSubtitle: '26 rozmerov pre Instagram, Etsy, Pinterest, TikTok a YouTube — bez nahrávania na server',
  },
  crumbs: { home: 'Domov', tools: 'Nástroje', page: 'Zmena veľkosti obrázkov' },
  hero: {
    eyebrow: 'Nástroj · Obsah',
    title: 'Zmena veľkosti obrázkov pre sociálne siete',
    subtitle:
      'Nahrajte fotku, vyberte platformu a získajte súbor v presnom rozmere. Záber môžete posunúť a priblížiť a bezpečná zóna ukáže, kam nezasiahnu tlačidlá Stories.',
    checked: 'Rozmery overené v pomocníkoch platforiem: november 2026',
  },
  chips: [
    ['Platformy', '10'],
    ['Rozmery', '26'],
    ['Formáty', 'JPG · PNG · WebP'],
    ['Spracovanie', 'v prehliadači'],
    ['Cena', 'zadarmo'],
  ],
  cta: {
    calculate: 'Zmeniť veľkosť fotky',
    bandTitle: 'Potrebujete fotky a bannery, ktoré predávajú?',
    bandText:
      'Pripravíme vizuály pre obchod a sociálne siete: fotky produktov pre Etsy a Amazon, piny, bannery a reklamné kreatívy — podľa požiadaviek každej platformy.',
  },
  guide: {
    eyebrow: 'Ťahák rozmerov',
    title: 'Rozmery obrázkov pre sociálne siete a marketplacy 2026',
    intro:
      'Platformy komprimujú a orezávajú obrázky, ktoré nesedia s ich rozmerom. Nižšie sú všetky rozmery, ktoré nástroj vie vytvoriť, s pomermi strán a tipmi na použitie.',
    table: { head: ['Platforma a formát', 'Rozmer, px', 'Pomer a poznámka'], rows: sizeRows('sk') },
    formulaTitle: 'Orezať alebo vpasovať?',
    formula:
      '„Orezať“ vyplní celý záber a odstrihne zvyšok — najlepšie pre feed a Stories. „Vpasovať“ ukáže celú fotku a pridá okraje: biele pre marketplacy, rozmazané pre Stories z vodorovnej fotky.',
    exampleTitle: 'Fotka pripravená za minútu',
    example: [
      '1. Pretiahnite fotku do okna alebo ju vložte (Ctrl/Cmd + V).',
      '2. Vyberte platformu a formát — náhľad hneď ukáže záber.',
      '3. Posuňte a priblížte fotku, skontrolujte bezpečnú zónu.',
      '4. Stiahnite súbor alebo ZIP so všetkými rozmermi platformy.',
    ],
    tipsTitle: 'Tipy',
    tips: [
      'Použite originál, nie snímku obrazovky: fotka menšia ako cieľový rozmer bude rozmazaná.',
      'Pre fotky produktov zvoľte JPG 85–90 % — ľahký súbor bez viditeľného rozdielu.',
      'PNG je pre logá a grafiku s textom, WebP pre web a Shopify.',
      'Text v Stories a TikToku držte v bezpečnej zóne, inak ho zakryjú tlačidlá.',
    ],
  },
  faq: {
    eyebrow: 'Otázky',
    title: 'Časté otázky',
    text: 'Nenašli ste odpoveď? Napíšte nám a poradíme, ako pripraviť vizuály pre vašu platformu.',
    cta: 'Položiť otázku',
    items: [
      [
        'Nahrávajú sa moje fotky na server?',
        'Nie. Všetko prebieha vo vašom prehliadači: fotka sa k nám neposiela a nikde sa neukladá. Po zatvorení stránky nič nezostane.',
      ],
      [
        'Aké formáty sú podporované?',
        'Na vstupe JPG, PNG, WebP a ďalšie formáty, ktoré otvorí váš prehliadač. Na výstupe JPG, PNG alebo WebP s nastavením kvality.',
      ],
      [
        'Aký je rozdiel medzi „Orezať“ a „Vpasovať“?',
        '„Orezať“ vyplní záber celý a odstrihne okraje, ktoré sa nezmestia. „Vpasovať“ zachová celú fotku a pridá okraje — biele, čierne, rozmazané alebo vlastnej farby.',
      ],
      [
        'Čo je bezpečná zóna?',
        'Časť záberu, ktorú v Stories, Reels a TikToku nezakrývajú tlačidlá, mená a popisy, alebo stred bannera YouTube viditeľný na všetkých zariadeniach. Dôležitý text a produkt držte vnútri.',
      ],
      [
        'Môžem získať všetky rozmery naraz?',
        'Áno. Tlačidlo ZIP vytvorí archív so všetkými rozmermi zvolenej platformy alebo so všetkými 26 rozmermi. Nastavený záber sa použije na každý súbor.',
      ],
      [
        'Aký rozmer fotky potrebuje Etsy v roku 2026?',
        'Etsy odporúča 3000 × 2250 px (4:3) a aspoň 2000 px na kratšej strane. Ak nechcete, aby miniatúra vo vyhľadávaní orezala produkt, použite štvorec 2000 × 2000.',
      ],
    ],
  },
  lead: {
    title: 'Poďme sa porozprávať o vizuáloch pre váš obchod',
    subtitle: 'Nechajte kontakt a poradíme, ktoré fotky a kreatívy zvýšia predaje na vašej platforme.',
  },
  app: {
    name: 'Zmena veľkosti obrázkov pre sociálne siete',
    features: [
      '26 rozmerov pre 10 platforiem',
      'Orezanie s priblížením',
      'Bezpečné zóny pre Stories, Reels, TikTok a YouTube',
      'Okraje: biele, čierne, rozmazané alebo vlastná farba',
      'JPG, PNG, WebP s nastavením kvality',
      'ZIP so všetkými rozmermi',
      'Spracovanie v prehliadači bez nahrávania',
    ],
  },
  checkedDate: SIZES_CHECKED,
  ui: {
    drop: 'Pretiahnite fotku sem',
    dropHint: 'alebo ju vložte (Ctrl/Cmd + V) · JPG, PNG, WebP',
    choose: 'Vybrať súbor',
    privacy: 'Fotka neopustí váš prehliadač',
    replace: 'Vymeniť fotku',
    resetFrame: 'Obnoviť záber',
    dragHint: 'Ťahajte fotku a zmeňte záber',
    source: 'Originál',
    upscale: 'Fotka je menšia ako cieľový rozmer — v súbore môže byť neostrá.',
    badFile: 'Súbor sa nepodarilo otvoriť. Skúste JPG, PNG alebo WebP.',
    platform: 'Platforma',
    size: 'Formát',
    frame: 'Záber',
    cover: 'Orezať',
    contain: 'Vpasovať',
    coverHint: 'Fotka vyplní celý záber, okraje sa orežú.',
    containHint: 'Fotka je celá viditeľná, okolo sú okraje.',
    zoom: 'Priblíženie',
    background: 'Okraje',
    bgWhite: 'Biele',
    bgBlack: 'Čierne',
    bgBlur: 'Rozmazané',
    bgCustom: 'Vlastná',
    whiteRequired: 'Amazon prijíma hlavný obrázok len na čisto bielom pozadí.',
    overlays: 'Pomôcky v náhľade',
    grid: 'Mriežka tretín',
    safe: 'Bezpečná zóna',
    file: 'Súbor',
    format: 'Formát súboru',
    quality: 'Kvalita',
    pngHint: 'PNG je bezstratový — súbor bude ťažší.',
    result: 'Hotový súbor',
    resultSize: 'Rozmer',
    weight: 'Veľkosť',
    download: 'Stiahnuť',
    zipPlatform: 'ZIP: všetky rozmery {platform}',
    zipAll: 'ZIP: všetkých {count} rozmerov',
    zipping: 'Pripravujeme archív…',
    zipHint: 'Váš záber sa použije na každý súbor.',
    cta: 'Potrebujem vizuály pre obchod',
  },
};

export const RESIZER_COPY: Record<Locale, ResizerCopy> = { uk, en, sk };
