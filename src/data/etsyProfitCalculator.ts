import { localizedSlugs, type Locale } from '@/lib/i18n';
import type { Country } from '@/lib/etsyProfit';
import type { ToolPageCopy } from './toolPage';

/**
 * Тексти сторінки «Калькулятор прибутку Etsy» трьома мовами.
 * Адреси різні для кожної мови — так кожна версія збирає пошук своєю мовою.
 */

export const PROFIT_CALC_PATHS = localizedSlugs['/kalkulyator-prybutku-etsy'];

export type ProfitCalcCopy = ToolPageCopy & {
  defaultCountry: Country;
  /** Комісія за обробку платежу у форматі мови сторінки */
  processingFee: string;
  countries: Record<Country, string>;
  form: {
    country: string;
    countryHint: string;
    countrySummary: string;
    countryNoVat: string;
    otherCountries: string;
    order: string;
    price: string;
    shippingCharged: string;
    shippingChargedHint: string;
    costs: string;
    itemCost: string;
    itemCostHint: string;
    packaging: string;
    shippingCost: string;
    shippingCostHint: string;
    extras: string;
    offsiteAds: string;
    offsiteAdsHint: string;
    adsOff: string;
    adsSmall: string;
    adsLarge: string;
    vat: string;
    vatHint: string;
    conversion: string;
    conversionHint: string;
    tax: string;
    taxHint: string;
    withdrawal: string;
    withdrawalHint: string;
    volume: string;
    monthlySales: string;
    reset: string;
  };
  result: {
    profit: string;
    loss: string;
    margin: string;
    monthly: string;
    breakEven: string;
    breakEvenHint: string;
    etsyShare: string;
    split: { fees: string; costs: string; taxes: string; profit: string };
    breakdown: string;
    orderTotal: string;
    etsyFees: string;
    listing: string;
    transaction: string;
    processing: string;
    offsiteAds: string;
    conversion: string;
    vat: string;
    yourCosts: string;
    itemCost: string;
    packaging: string;
    shippingCost: string;
    taxes: string;
    tax: string;
    withdrawal: string;
    net: string;
    cta: string;
  };
};

const uk: ProfitCalcCopy = {
  meta: {
    title: 'Калькулятор прибутку Etsy 2026 — комісії, маржа, чистий прибуток',
    description:
      'Безкоштовний калькулятор прибутку Etsy для продавців з України: комісії 6.5% + 6% + $0.30, лістинг, Offsite Ads, ПДВ 20% на комісії, податок ФОП. Чистий прибуток, маржа і ціна беззбитковості за хвилину.',
    ogTitle: 'Калькулятор прибутку Etsy',
    ogSubtitle: 'Усі комісії 2026, ПДВ, ФОП і Offsite Ads — чистий прибуток за хвилину',
  },
  crumbs: { home: 'Головна', tools: 'Інструменти', page: 'Калькулятор прибутку Etsy' },
  hero: {
    eyebrow: 'Інструмент · Etsy',
    title: 'Калькулятор прибутку Etsy',
    subtitle:
      'Скільки реально лишиться вам з продажу після всіх комісій Etsy, ПДВ, реклами, податку ФОП і собівартості — зі ставками для продавців з України.',
    checked: 'Ставки звірено з довідкою Etsy: жовтень 2026',
  },
  chips: [
    ['Транзакція', '6.5%'],
    ['Обробка платежу', '6% + $0.30'],
    ['Лістинг', '$0.20'],
    ['Offsite Ads', '15% / 12%'],
    ['ПДВ на комісії', '20%'],
  ],
  defaultCountry: 'ua',
  processingFee: '6% + $0.30',
  countries: { ua: 'Україна', us: 'США', sk: 'Словаччина / ЄС' },
  form: {
    country: 'Ставки для продавців з України',
    countryHint: 'Etsy бере різну комісію за оплату залежно від країни банку, куди надходять виплати. Тут уже підставлені ставки для українського рахунку.',
    countrySummary: 'Комісія за оплату {fee} · розрахунок у {currency} · ПДВ на комісії Etsy {vat}%',
    countryNoVat: 'Комісія за оплату {fee} · розрахунок у {currency} · без ПДВ на комісії',
    otherCountries: 'Продаєте з іншої країни?',
    order: 'Замовлення',
    price: 'Ціна товару',
    shippingCharged: 'Доставка, яку платить покупець',
    shippingChargedHint: 'Безкоштовна доставка — 0',
    costs: 'Ваші витрати',
    itemCost: 'Собівартість',
    itemCostHint: 'Матеріали, виробництво, закупівля',
    packaging: 'Пакування',
    shippingCost: 'Реальна вартість відправки',
    shippingCostHint: 'Скільки ви платите службі доставки',
    extras: 'Реклама, податки, виведення',
    offsiteAds: 'Offsite Ads',
    offsiteAdsHint: 'Лише якщо продаж прийшов з реклами Etsy на зовнішніх сайтах. Максимум $100 за замовлення.',
    adsOff: 'Немає',
    adsSmall: '15% · до $10k/рік',
    adsLarge: '12% · від $10k/рік',
    vat: 'ПДВ на комісії Etsy',
    vatHint: 'Etsy додає ПДВ до своїх комісій, якщо у вас немає VAT ID (більшість ФОП).',
    conversion: 'Конвертація валюти 2.5%',
    conversionHint: 'Якщо ціни в лістингах не в тій валюті, що й рахунок для виплат.',
    tax: 'Податок з доходу, %',
    taxHint: 'ФОП 3 група: 5% єдиний податок + 1% військовий збір. ЄСВ сплачується окремо.',
    withdrawal: 'Виведення коштів, %',
    withdrawalHint: 'Payoneer ≈ 2%, прямий переказ на банк — 0%.',
    volume: 'Обсяг продажів',
    monthlySales: 'Продажів на місяць',
    reset: 'Скинути',
  },
  result: {
    profit: 'Чистий прибуток з продажу',
    loss: 'Збиток з продажу',
    margin: 'Маржа',
    monthly: 'За місяць',
    breakEven: 'Ціна беззбитковості',
    breakEvenHint: 'нижче цієї ціни товар продається в мінус',
    etsyShare: 'Etsy забирає {share}% замовлення',
    split: { fees: 'Etsy', costs: 'Витрати', taxes: 'Податки', profit: 'Прибуток' },
    breakdown: 'Розбивка',
    orderTotal: 'Сума замовлення',
    etsyFees: 'Комісії Etsy',
    listing: 'Лістинг',
    transaction: 'Транзакція 6.5%',
    processing: 'Обробка платежу',
    offsiteAds: 'Offsite Ads',
    conversion: 'Конвертація 2.5%',
    vat: 'ПДВ на комісії',
    yourCosts: 'Ваші витрати',
    itemCost: 'Собівартість',
    packaging: 'Пакування',
    shippingCost: 'Відправка',
    taxes: 'Податки та виведення',
    tax: 'Податок',
    withdrawal: 'Виведення',
    net: 'Чистий прибуток',
    cta: 'Як підняти маржу',
  },
  guide: {
    eyebrow: 'Комісії Etsy у 2026',
    title: 'Скільки бере Etsy з кожного продажу',
    intro:
      'Etsy рахує комісії не від ціни товару, а від усієї суми замовлення — разом з доставкою. Тому «безкоштовна доставка», вбудована в ціну, і доставка окремим рядком коштують вам однаково. Нижче всі платежі, які зменшують ваш прибуток.',
    table: {
      head: ['Комісія', 'Ставка', 'Від чого рахується'],
      rows: [
        ['Лістинг', '$0.20', 'За публікацію і за кожне автоматичне поновлення після продажу'],
        ['Транзакція', '6.5%', 'Ціна + доставка + подарункове пакування'],
        ['Обробка платежу', '6% + $0.30', 'Уся сума замовлення, включно з податком з продажу'],
        ['Offsite Ads', '15% або 12%, максимум $100', 'Лише замовлення, що прийшли з реклами Etsy на інших сайтах'],
        ['Конвертація валюти', '2.5%', 'Якщо валюта лістингів ≠ валюта рахунку'],
        ['ПДВ на комісії', '20%', 'На комісії Etsy, якщо у продавця немає VAT ID'],
      ],
    },
    formulaTitle: 'Формула',
    formula:
      'Прибуток = (ціна + доставка) − комісії Etsy − ПДВ на комісії − податок − виведення − собівартість − пакування − реальна відправка',
    exampleTitle: 'Приклад для продавця з України',
    example: [
      'Товар за $120, доставка безкоштовна, собівартість $30, пакування $3.',
      'Комісії Etsy: транзакція $7.80 + обробка $7.50 + лістинг $0.20 = $15.50, плюс ПДВ 20% — $3.10.',
      'Податок ФОП 6% — $7.20. Чистий прибуток — $61.20, маржа 51%.',
      'Якщо цей продаж прийшов з Offsite Ads (15%), прибуток падає до $39.60.',
    ],
    tipsTitle: 'Як втримати маржу',
    tips: [
      'Закладайте доставку в ціну: Etsy однаково бере відсоток з неї, а безкоштовна доставка краще ранжується в пошуку.',
      'Рахуйте ціну беззбитковості з урахуванням Offsite Ads — для магазинів від $10k на рік від них не можна відмовитися.',
      'Подайте VAT ID, якщо ви платник ПДВ, — тоді Etsy не додаватиме 20% до своїх комісій.',
      'Ставте ціни в тій самій валюті, що й рахунок для виплат, щоб не платити 2.5% за конвертацію.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Часті запитання про комісії Etsy',
    text: 'Не знайшли відповіді або хочете розібрати фінанси свого магазину? Напишіть нам.',
    cta: 'Поставити запитання',
    items: [
      [
        'Скільки відсотків забирає Etsy з продажу?',
        'Для продавця з України базові комісії — 6.5% за транзакцію і 6% + $0.30 за обробку платежу, плюс $0.20 за лістинг. Без VAT ID Etsy додає ще 20% ПДВ на ці суми. У середньому це 14–16% від замовлення, а з Offsite Ads — до 30%.',
      ],
      [
        'Чи бере Etsy комісію з доставки?',
        'Так. Транзакційна комісія 6.5% і комісія за обробку платежу рахуються від усієї суми, яку платить покупець, тобто від ціни разом з доставкою.',
      ],
      [
        'Що таке Offsite Ads і чи можна від них відмовитися?',
        'Це реклама ваших товарів на Google, Facebook, Instagram та інших сайтах. Платите лише за продаж з реклами: 15%, якщо магазин продав менше ніж на $10 000 за останні 12 місяців, і 12% — якщо більше. Комісія не перевищує $100 за замовлення. Магазини до $10k можуть вимкнути рекламу в налаштуваннях, для більших вона обовʼязкова.',
      ],
      [
        'Чому Etsy нараховує ПДВ на комісії українським продавцям?',
        'Україна оподатковує цифрові послуги нерезидентів, тож Etsy додає 20% ПДВ до своїх комісій, якщо продавець не подав VAT ID. Для більшості ФОП 3 групи без ПДВ це реальна додаткова витрата.',
      ],
      [
        'Який податок платить ФОП з продажів на Etsy?',
        'ФОП 3 групи платить 5% єдиного податку і 1% військового збору з доходу, разом 6%. Окремо сплачується фіксований ЄСВ щомісяця. Калькулятор рахує податок від суми замовлення — це консервативна оцінка.',
      ],
      [
        'Чи зберігаються мої дані?',
        'Ні. Усі розрахунки виконуються у вашому браузері, ми нічого не надсилаємо на сервер.',
      ],
    ],
  },
  cta: {
    calculate: 'Порахувати прибуток',
    bandTitle: 'Хочете, щоб магазин на Etsy заробляв більше?',
    bandText: 'Запускаємо магазини під ключ, переписуємо лістинги під пошук Etsy і налаштовуємо рекламу так, щоб вона окупалась. Покажемо, як підняти маржу саме у вашій ніші.',
    serviceLink: { label: 'Запуск Etsy-магазину під ключ', href: '/services/etsy' },
  },
  lead: {
    title: 'Хочете більше прибутку з Etsy?',
    subtitle: 'Розберемо ціни, комісії та рекламу вашого магазину і покажемо, де ви втрачаєте гроші. Перша консультація безкоштовна.',
  },
  app: {
    name: 'Калькулятор прибутку Etsy',
    features: [
      'Комісії Etsy 2026 для продавців з України',
      'ПДВ на комісії Etsy',
      'Offsite Ads 15% / 12% з лімітом $100',
      'Податок ФОП і виведення коштів',
      'Маржа, місячний прибуток і ціна беззбитковості',
    ],
  },
};

const en: ProfitCalcCopy = {
  meta: {
    title: 'Etsy Profit Calculator 2026 — Fees, Margin & Net Profit',
    description:
      'Free Etsy profit calculator with 2026 fees: 6.5% transaction, 3% + $0.25 payment processing, $0.20 listing, Offsite Ads, VAT on seller fees and income tax. Get net profit, margin and break-even price in a minute.',
    ogTitle: 'Etsy Profit Calculator',
    ogSubtitle: 'Every 2026 fee, VAT and Offsite Ads — your real profit per sale',
  },
  crumbs: { home: 'Home', tools: 'Tools', page: 'Etsy Profit Calculator' },
  hero: {
    eyebrow: 'Tool · Etsy',
    title: 'Etsy Profit Calculator',
    subtitle:
      'See what you actually keep from every sale after Etsy fees, VAT, ads, taxes and cost of goods — with the rates for US sellers.',
    checked: 'Rates checked against Etsy Help: October 2026',
  },
  chips: [
    ['Transaction', '6.5%'],
    ['Payment processing', '3% + $0.25'],
    ['Listing', '$0.20'],
    ['Offsite Ads', '15% / 12%'],
  ],
  defaultCountry: 'us',
  processingFee: '3% + $0.25',
  countries: { ua: 'Ukraine', us: 'United States', sk: 'Slovakia / EU' },
  form: {
    country: 'Rates for US sellers',
    countryHint: 'Etsy charges a different payment fee depending on the country of the bank account it pays you into. This version uses the rates for a US account.',
    countrySummary: 'Payment fee {fee} · amounts in {currency} · VAT on Etsy fees {vat}%',
    countryNoVat: 'Payment fee {fee} · amounts in {currency} · no VAT on fees',
    otherCountries: 'Selling from another country?',
    order: 'Order',
    price: 'Item price',
    shippingCharged: 'Shipping charged to buyer',
    shippingChargedHint: 'Free shipping — enter 0',
    costs: 'Your costs',
    itemCost: 'Cost of goods',
    itemCostHint: 'Materials, production, sourcing',
    packaging: 'Packaging',
    shippingCost: 'Actual shipping cost',
    shippingCostHint: 'What you pay the carrier',
    extras: 'Ads, taxes, withdrawal',
    offsiteAds: 'Offsite Ads',
    offsiteAdsHint: 'Only when the sale came from an Etsy ad on another site. Capped at $100 per order.',
    adsOff: 'None',
    adsSmall: '15% · under $10k/yr',
    adsLarge: '12% · $10k+/yr',
    vat: 'VAT on Etsy fees',
    vatHint: 'Etsy adds VAT to its fees when you have no VAT ID on file (Ukraine, EU, UK).',
    conversion: 'Currency conversion 2.5%',
    conversionHint: 'When listing currency differs from your payment account currency.',
    tax: 'Income tax, %',
    taxHint: 'Your estimated tax on revenue. Ukrainian sole proprietors (group 3): 6%.',
    withdrawal: 'Withdrawal fee, %',
    withdrawalHint: 'Payoneer ≈ 2%, direct bank deposit — 0%.',
    volume: 'Sales volume',
    monthlySales: 'Sales per month',
    reset: 'Reset',
  },
  result: {
    profit: 'Net profit per sale',
    loss: 'Loss per sale',
    margin: 'Margin',
    monthly: 'Per month',
    breakEven: 'Break-even price',
    breakEvenHint: 'below this price every sale loses money',
    etsyShare: 'Etsy takes {share}% of the order',
    split: { fees: 'Etsy', costs: 'Costs', taxes: 'Taxes', profit: 'Profit' },
    breakdown: 'Breakdown',
    orderTotal: 'Order total',
    etsyFees: 'Etsy fees',
    listing: 'Listing',
    transaction: 'Transaction 6.5%',
    processing: 'Payment processing',
    offsiteAds: 'Offsite Ads',
    conversion: 'Conversion 2.5%',
    vat: 'VAT on fees',
    yourCosts: 'Your costs',
    itemCost: 'Cost of goods',
    packaging: 'Packaging',
    shippingCost: 'Shipping',
    taxes: 'Taxes & withdrawal',
    tax: 'Income tax',
    withdrawal: 'Withdrawal',
    net: 'Net profit',
    cta: 'How to raise your margin',
  },
  guide: {
    eyebrow: 'Etsy fees in 2026',
    title: 'How much Etsy takes from every sale',
    intro:
      'Etsy charges its fees on the whole order total, shipping included — not just on the item price. So free shipping built into the price and shipping as a separate line cost you the same. Here is every charge that cuts into your profit.',
    table: {
      head: ['Fee', 'Rate', 'Charged on'],
      rows: [
        ['Listing', '$0.20', 'Each listing and each auto-renewal after a sale'],
        ['Transaction', '6.5%', 'Item price + shipping + gift wrap'],
        ['Payment processing', '3% + $0.25', 'Full order total, including sales tax'],
        ['Offsite Ads', '15% or 12%, max $100', 'Only orders that came from Etsy ads on other sites'],
        ['Currency conversion', '2.5%', 'When listing currency ≠ payment account currency'],
        ['VAT on fees', 'None in the US', 'Added only in countries that tax digital services (Ukraine, EU, UK)'],
      ],
    },
    formulaTitle: 'Formula',
    formula:
      'Profit = (price + shipping) − Etsy fees − VAT on fees − income tax − withdrawal − cost of goods − packaging − actual shipping',
    exampleTitle: 'Example for a US seller',
    example: [
      'An item sells for $120 with free shipping, cost of goods $30, packaging $3.',
      'Etsy fees: transaction $7.80 + processing $3.85 + listing $0.20 = $11.85.',
      'Net profit before income tax — $75.15, a 63% margin.',
      'If the sale came through Offsite Ads (15%), profit drops to $57.15.',
    ],
    tipsTitle: 'How to protect your margin',
    tips: [
      'Build shipping into the price: Etsy takes its cut either way, and free shipping ranks better in search.',
      'Price with Offsite Ads in mind — shops over $10k a year cannot opt out.',
      'Submit a VAT ID if you are VAT-registered so Etsy stops adding VAT to its fees.',
      'List in the same currency as your payment account to avoid the 2.5% conversion fee.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Etsy fees: common questions',
    text: 'Did not find the answer, or want a review of your shop finances? Get in touch.',
    cta: 'Ask a question',
    items: [
      [
        'What percentage does Etsy take from a sale?',
        'For a US seller the core fees are 6.5% transaction and 3% + $0.25 payment processing, plus $0.20 per listing — roughly 10–11% of an order. Sellers in Ukraine pay 6% + $0.30 for processing plus VAT on fees, about 14–16%. With Offsite Ads the total can reach 25–30%.',
      ],
      [
        'Does Etsy charge fees on shipping?',
        'Yes. Both the 6.5% transaction fee and the payment processing fee are calculated on everything the buyer pays, including shipping.',
      ],
      [
        'What are Offsite Ads and can I opt out?',
        'Etsy advertises your listings on Google, Facebook, Instagram and other sites. You pay only when an ad leads to a sale: 15% if your shop made under $10,000 in the last 12 months, 12% above that, capped at $100 per order. Shops under $10k can opt out; above that it is mandatory.',
      ],
      [
        'Why does Etsy charge VAT on its fees?',
        'In countries that tax digital services from foreign companies — Ukraine, the EU, the UK — Etsy adds VAT to its seller fees unless you submit a VAT ID. In Ukraine the rate is 20%, in Slovakia 23%.',
      ],
      [
        'What is a good profit margin on Etsy?',
        'Most healthy handmade and print shops keep 30–50% net margin after all fees and costs. Below 20% there is little room for ads, returns or discounts.',
      ],
      [
        'Is my data stored?',
        'No. Everything is calculated in your browser; nothing is sent to a server.',
      ],
    ],
  },
  cta: {
    calculate: 'Calculate profit',
    bandTitle: 'Want your Etsy shop to earn more?',
    bandText: 'We launch shops end to end, rewrite listings for Etsy search and set up ads that pay for themselves. We will show you how to raise the margin in your niche.',
    serviceLink: { label: 'Etsy shop setup', href: '/services/etsy' },
  },
  lead: {
    title: 'Want more profit from Etsy?',
    subtitle: 'We will review your pricing, fees and ads and show you where the money leaks. The first consultation is free.',
  },
  app: {
    name: 'Etsy Profit Calculator',
    features: [
      '2026 Etsy fees for US sellers',
      'VAT on Etsy seller fees',
      'Offsite Ads at 15% / 12% with the $100 cap',
      'Income tax and withdrawal fees',
      'Margin, monthly profit and break-even price',
    ],
  },
};

const sk: ProfitCalcCopy = {
  meta: {
    title: 'Kalkulačka zisku Etsy 2026 — poplatky, marža, čistý zisk',
    description:
      'Bezplatná kalkulačka zisku Etsy s poplatkami na rok 2026: transakcia 6,5 %, spracovanie platby 4 % + 0,30 €, listing, Offsite Ads, DPH 23 % na poplatky a daň. Čistý zisk, marža a cena bez straty za minútu.',
    ogTitle: 'Kalkulačka zisku Etsy',
    ogSubtitle: 'Všetky poplatky 2026, DPH a Offsite Ads — váš skutočný zisk z predaja',
  },
  crumbs: { home: 'Domov', tools: 'Nástroje', page: 'Kalkulačka zisku Etsy' },
  hero: {
    eyebrow: 'Nástroj · Etsy',
    title: 'Kalkulačka zisku Etsy',
    subtitle:
      'Koľko vám reálne zostane z predaja po všetkých poplatkoch Etsy, DPH, reklame, daniach a nákladoch — so sadzbami pre predajcov zo Slovenska.',
    checked: 'Sadzby overené v pomocníkovi Etsy: október 2026',
  },
  chips: [
    ['Transakcia', '6,5 %'],
    ['Spracovanie platby', '4 % + 0,30 €'],
    ['Listing', '0,20 $'],
    ['Offsite Ads', '15 % / 12 %'],
    ['DPH na poplatky', '23 %'],
  ],
  defaultCountry: 'sk',
  processingFee: '4 % + 0,30 €',
  countries: { ua: 'Ukrajina', us: 'USA', sk: 'Slovensko / EÚ' },
  form: {
    country: 'Sadzby pre predajcov zo Slovenska',
    countryHint: 'Etsy si účtuje iný poplatok za platbu podľa krajiny banky, kam vám posiela výplaty. Táto verzia počíta so sadzbami pre slovenský účet.',
    countrySummary: 'Poplatok za platbu {fee} · sumy v {currency} · DPH na poplatky Etsy {vat} %',
    countryNoVat: 'Poplatok za platbu {fee} · sumy v {currency} · bez DPH na poplatky',
    otherCountries: 'Predávate z inej krajiny?',
    order: 'Objednávka',
    price: 'Cena produktu',
    shippingCharged: 'Poštovné, ktoré platí kupujúci',
    shippingChargedHint: 'Doprava zadarmo — 0',
    costs: 'Vaše náklady',
    itemCost: 'Výrobné náklady',
    itemCostHint: 'Materiál, výroba, nákup',
    packaging: 'Balenie',
    shippingCost: 'Skutočná cena dopravy',
    shippingCostHint: 'Koľko platíte prepravcovi',
    extras: 'Reklama, dane, výber',
    offsiteAds: 'Offsite Ads',
    offsiteAdsHint: 'Len ak predaj prišiel z reklamy Etsy na iných weboch. Maximálne 100 $ za objednávku.',
    adsOff: 'Žiadne',
    adsSmall: '15 % · do 10k $/rok',
    adsLarge: '12 % · od 10k $/rok',
    vat: 'DPH na poplatky Etsy',
    vatHint: 'Etsy pridáva DPH k svojim poplatkom, ak nemáte zadané IČ DPH.',
    conversion: 'Konverzia meny 2,5 %',
    conversionHint: 'Ak je mena listingov iná ako mena účtu na výplaty.',
    tax: 'Daň z príjmu, %',
    taxHint: 'Odhad dane z tržieb. Pri paušálnych výdavkoch živnostníka zadajte svoju efektívnu sadzbu.',
    withdrawal: 'Poplatok za výber, %',
    withdrawalHint: 'Payoneer ≈ 2 %, priamy vklad na účet — 0 %.',
    volume: 'Objem predaja',
    monthlySales: 'Predajov za mesiac',
    reset: 'Obnoviť',
  },
  result: {
    profit: 'Čistý zisk z predaja',
    loss: 'Strata z predaja',
    margin: 'Marža',
    monthly: 'Za mesiac',
    breakEven: 'Cena bez straty',
    breakEvenHint: 'pod touto cenou je každý predaj v mínuse',
    etsyShare: 'Etsy si berie {share} % objednávky',
    split: { fees: 'Etsy', costs: 'Náklady', taxes: 'Dane', profit: 'Zisk' },
    breakdown: 'Rozpis',
    orderTotal: 'Suma objednávky',
    etsyFees: 'Poplatky Etsy',
    listing: 'Listing',
    transaction: 'Transakcia 6,5 %',
    processing: 'Spracovanie platby',
    offsiteAds: 'Offsite Ads',
    conversion: 'Konverzia 2,5 %',
    vat: 'DPH na poplatky',
    yourCosts: 'Vaše náklady',
    itemCost: 'Výrobné náklady',
    packaging: 'Balenie',
    shippingCost: 'Doprava',
    taxes: 'Dane a výber',
    tax: 'Daň',
    withdrawal: 'Výber',
    net: 'Čistý zisk',
    cta: 'Ako zvýšiť maržu',
  },
  guide: {
    eyebrow: 'Poplatky Etsy v roku 2026',
    title: 'Koľko si Etsy berie z každého predaja',
    intro:
      'Etsy počíta poplatky z celej sumy objednávky vrátane poštovného, nie iba z ceny produktu. Doprava zadarmo zahrnutá v cene a poštovné na samostatnom riadku vás teda stoja rovnako. Tu sú všetky platby, ktoré znižujú váš zisk.',
    table: {
      head: ['Poplatok', 'Sadzba', 'Z čoho sa počíta'],
      rows: [
        ['Listing', '0,20 $', 'Za zverejnenie a každé automatické obnovenie po predaji'],
        ['Transakcia', '6,5 %', 'Cena + poštovné + darčekové balenie'],
        ['Spracovanie platby', '4 % + 0,30 €', 'Celá suma objednávky vrátane dane z predaja'],
        ['Offsite Ads', '15 % alebo 12 %, max. 100 $', 'Iba objednávky z reklamy Etsy na iných weboch'],
        ['Konverzia meny', '2,5 %', 'Ak mena listingov ≠ mena účtu'],
        ['DPH na poplatky', '23 %', 'Na poplatky Etsy, ak predajca nemá IČ DPH'],
      ],
    },
    formulaTitle: 'Vzorec',
    formula:
      'Zisk = (cena + poštovné) − poplatky Etsy − DPH na poplatky − daň − výber − výrobné náklady − balenie − skutočná doprava',
    exampleTitle: 'Príklad pre predajcu zo Slovenska',
    example: [
      'Produkt za 100 €, doprava zadarmo, výrobné náklady 25 €, balenie 2 €.',
      'Poplatky Etsy: transakcia 6,50 € + spracovanie 4,30 € + listing 0,19 € = 10,99 €, plus DPH 23 % — 2,53 €.',
      'Čistý zisk pred daňou z príjmu — 59,48 €, marža 59,5 %.',
      'Ak predaj prišiel cez Offsite Ads (15 %), zisk klesne na 41,03 €.',
    ],
    tipsTitle: 'Ako udržať maržu',
    tips: [
      'Započítajte dopravu do ceny: Etsy si percento berie tak či tak a doprava zadarmo sa vo vyhľadávaní radí vyššie.',
      'Pri cenotvorbe počítajte s Offsite Ads — obchody nad 10 000 $ ročne ich nemôžu vypnúť.',
      'Ak ste platiteľ DPH, zadajte IČ DPH a Etsy prestane pridávať 23 % k poplatkom.',
      'Stanovte ceny v rovnakej mene ako účet na výplaty a vyhnete sa 2,5 % za konverziu.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Časté otázky o poplatkoch Etsy',
    text: 'Nenašli ste odpoveď alebo chcete rozobrať financie svojho obchodu? Napíšte nám.',
    cta: 'Opýtať sa',
    items: [
      [
        'Koľko percent si Etsy berie z predaja?',
        'Pre predajcu zo Slovenska sú základné poplatky 6,5 % za transakciu a 4 % + 0,30 € za spracovanie platby, plus listing 0,20 $. Bez IČ DPH k tomu Etsy pridá 23 % DPH. Spolu zvyčajne 13–15 % objednávky, s Offsite Ads až okolo 30 %.',
      ],
      [
        'Berie si Etsy poplatok aj z poštovného?',
        'Áno. Transakčný poplatok 6,5 % aj poplatok za spracovanie platby sa počítajú z celej sumy, ktorú platí kupujúci, teda vrátane poštovného.',
      ],
      [
        'Čo sú Offsite Ads a dajú sa vypnúť?',
        'Etsy propaguje vaše produkty na Google, Facebooku, Instagrame a ďalších weboch. Platíte len za predaj z reklamy: 15 %, ak obchod predal za posledných 12 mesiacov menej ako za 10 000 $, inak 12 %, maximálne 100 $ za objednávku. Obchody pod 10 000 $ ich môžu vypnúť, nad touto hranicou sú povinné.',
      ],
      [
        'Prečo Etsy účtuje DPH na svoje poplatky?',
        'V EÚ Etsy pridáva DPH k poplatkom predajcom, ktorí nezadali IČ DPH. Na Slovensku je sadzba 23 %. Platiteľ DPH so zadaným IČ DPH ju neplatí.',
      ],
      [
        'Aká marža je na Etsy dobrá?',
        'Zdravé obchody s ručnou výrobou alebo potlačou si po všetkých poplatkoch a nákladoch držia 30–50 % čistej marže. Pod 20 % nezostáva priestor na reklamu, vratky ani zľavy.',
      ],
      [
        'Ukladajú sa moje údaje?',
        'Nie. Všetko sa počíta vo vašom prehliadači, na server sa nič neodosiela.',
      ],
    ],
  },
  cta: {
    calculate: 'Vypočítať zisk',
    bandTitle: 'Chcete, aby váš obchod na Etsy zarábal viac?',
    bandText: 'Spúšťame obchody na kľúč, prepisujeme listingy pre vyhľadávanie Etsy a nastavujeme reklamu, ktorá sa zaplatí. Ukážeme, ako zvýšiť maržu práve vo vašej nike.',
    serviceLink: { label: 'Vytvorenie Etsy obchodu na kľúč', href: '/services/etsy' },
  },
  lead: {
    title: 'Chcete z Etsy viac zisku?',
    subtitle: 'Rozoberieme ceny, poplatky a reklamu vášho obchodu a ukážeme, kde strácate peniaze. Prvá konzultácia je zadarmo.',
  },
  app: {
    name: 'Kalkulačka zisku Etsy',
    features: [
      'Poplatky Etsy 2026 pre predajcov zo Slovenska',
      'DPH na poplatky Etsy',
      'Offsite Ads 15 % / 12 % s limitom 100 $',
      'Daň z príjmu a poplatok za výber',
      'Marža, mesačný zisk a cena bez straty',
    ],
  },
};

export const PROFIT_CALC_COPY: Record<Locale, ProfitCalcCopy> = { uk, en, sk };
