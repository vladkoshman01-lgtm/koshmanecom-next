import { localizedSlugs, type Locale } from '@/lib/i18n';
import type { Platform } from '@/lib/platformFees';
import type { ToolPageCopy } from './toolPage';

/**
 * Тексти сторінки «Etsy vs Amazon vs eBay vs Shopify» трьома мовами.
 * Плашку ставок і назви країн бере з калькулятора прибутку.
 */

export const COMPARISON_PATHS = localizedSlugs['/porivnyannya-platform-etsy-amazon-shopify'];

export type ComparisonCopy = ToolPageCopy & {
  form: {
    note: string;
    product: string;
    price: string;
    shippingCharged: string;
    shippingChargedHint: string;
    costs: string;
    shopify: string;
    shopifyAds: string;
    shopifyAdsHint: string;
    vat: string;
    vatHint: string;
    monthlySales: string;
    monthlySalesHint: string;
  };
  result: {
    best: string;
    bestText: string;
    fees: string;
    profit: string;
    margin: string;
    monthly: string;
    ads: string;
    parts: Record<string, string>;
    platformNotes: Record<Platform, string>;
  };
};

const uk: ComparisonCopy = {
  meta: {
    title: 'Etsy vs Amazon vs eBay vs Shopify 2026 — де вигідніше продавати',
    description:
      'Порівняйте комісії та чистий прибуток на Etsy, Amazon Handmade, eBay і Shopify для продавців з України: ПДВ на комісії, international fee eBay, підписка й реклама Shopify. Введіть ціну й собівартість — побачите, де заробите більше.',
    ogTitle: 'Etsy vs Amazon vs eBay vs Shopify',
    ogSubtitle: 'Де ваш товар принесе більше прибутку після всіх комісій',
  },
  crumbs: { home: 'Головна', tools: 'Інструменти', page: 'Порівняння платформ' },
  hero: {
    eyebrow: 'Інструмент · Маркетплейси',
    title: 'Etsy vs Amazon vs eBay vs Shopify',
    subtitle:
      'Введіть ціну й собівартість — калькулятор порахує чистий прибуток з одного продажу на кожній платформі після всіх комісій і покаже, де вигідніше. Ставки для продавців з України.',
    checked: 'Ставки звірено з довідками майданчиків: жовтень 2026',
  },
  chips: [
    ['Etsy', '≈ 12.5% + $0.50'],
    ['Amazon Handmade', '15%'],
    ['eBay', '13.6% + $0.40'],
    ['Shopify', '$39/міс + оплата'],
  ],
  cta: {
    calculate: 'Порівняти платформи',
    bandTitle: 'Обрали платформу? Запустимо магазин',
    bandText:
      'Відкриваємо й ведемо магазини на Etsy, Amazon, eBay і Shopify: реєстрація, лістинги з SEO, реклама. Допоможемо поєднати кілька майданчиків, щоб не залежати від одного.',
  },
  guide: {
    eyebrow: 'Комісії платформ у 2026',
    title: 'Скільки беруть Etsy, Amazon, eBay і Shopify',
    intro:
      'Маркетплейси беруть більший відсоток, але приводять покупців. Власний сайт на Shopify дешевший у комісіях, проте за кожного покупця ви платите рекламою. Тому порівнювати треба чистий прибуток, а не лише ставки.',
    table: {
      head: ['Платформа', 'Комісії', 'Що важливо знати'],
      rows: [
        ['Etsy', '6.5% + 6% + $0.30 + $0.20 лістинг', 'Найпростіший старт для handmade, вінтажу й дизайну. Можливі Offsite Ads 12–15%'],
        ['Amazon Handmade', '15%, мінімум $0.30', 'Підписка $39.99/міс скасовується для схвалених майстрів. Потрібна модерація'],
        ['eBay', '13.6% + $0.40 за замовлення', 'Для продавців не з США — ще 1.65% international fee'],
        ['Shopify', '$39/міс + платіжна система', 'Shopify Payments в Україні недоступний: сторонній шлюз ≈3.5% + $0.30 і 2% Shopify. Трафік — за ваш рахунок'],
        ['ПДВ на комісії', '20%', 'Для українських ФОП без VAT ID нараховується на послуги всіх іноземних майданчиків'],
      ],
    },
    formulaTitle: 'Як рахуємо',
    formula:
      'Прибуток = (ціна + доставка) − комісії платформи − ПДВ на комісії − собівартість − пакування − відправка − реклама (для Shopify)',
    exampleTitle: 'Приклад для продавця з України',
    example: [
      'Товар за $80, собівартість $20, пакування $3, 30 продажів на місяць.',
      'Etsy — $44.40 з продажу, Amazon Handmade — $42.60, eBay — $41.88.',
      'Shopify з рекламою $10 на продаж — $39.80.',
      'Найвигідніше тут Etsy, але різниця з Amazon — лише $1.80.',
    ],
    tipsTitle: 'Як обрати',
    tips: [
      'Handmade, вінтаж, персоналізація — починайте з Etsy: там шукають саме це.',
      'Масові товари й великі обсяги — Amazon.',
      'Shopify має сенс, коли є бренд, база клієнтів і бюджет на рекламу.',
      'Найстійкіша модель — кілька каналів: маркетплейс для трафіку й власний сайт для повторних покупок.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Часті запитання про вибір платформи',
    text: 'Не впевнені, з чого почати? Розберемо ваш товар і порадимо платформу.',
    cta: 'Поставити запитання',
    items: [
      [
        'Що вигідніше для продавця з України: Etsy чи Amazon?',
        'Для handmade і дизайнерських товарів зазвичай Etsy: комісії нижчі, старт простіший. Amazon Handmade бере 15%, зате дає доступ до величезної аудиторії Amazon. Порахуйте свій товар у калькуляторі — різниця часто лише кілька доларів.',
      ],
      [
        'Чи можна продавати на eBay з України?',
        'Так. Для продавців не з США eBay додає 1.65% international fee до основної комісії 13.6% + $0.40 за замовлення.',
      ],
      [
        'Чому Shopify виходить невигідним, якщо комісії нижчі?',
        'Бо власний сайт не приводить покупців. Кожен продаж на Shopify потребує реклами. Якщо ваша реклама коштує менше, ніж різниця в комісіях, Shopify вигідніший — змініть поле «реклама на продаж» і перевірте.',
      ],
      [
        'Чи доступний Shopify Payments в Україні?',
        'Ні. Українські продавці підключають сторонні платіжні системи, і Shopify бере за це додаткові 2% на тарифі Basic.',
      ],
      [
        'Чи можна продавати на кількох платформах одночасно?',
        'Так, і це найстійкіша модель: маркетплейси дають трафік, а власний сайт — повторні покупки без комісії за кожного клієнта.',
      ],
    ],
  },
  lead: {
    title: 'Допоможемо обрати платформу й запуститися',
    subtitle: 'Розберемо ваш товар, порахуємо економіку на кожному майданчику й запустимо магазин там, де він заробить більше. Перша консультація безкоштовна.',
  },
  app: {
    name: 'Порівняння Etsy, Amazon, eBay і Shopify',
    features: [
      'Чистий прибуток на чотирьох платформах',
      'Комісії 2026 і ПДВ на комісії',
      'International fee eBay і сторонній шлюз Shopify',
      'Реклама для власного сайту та місячний прибуток',
    ],
  },
  form: {
    note: 'Усі суми в доларах США — платформи продають переважно американським покупцям.',
    product: 'Товар',
    price: 'Ціна продажу',
    shippingCharged: 'Доставка, яку платить покупець',
    shippingChargedHint: 'Безкоштовна доставка — 0',
    costs: 'Ваші витрати',
    shopify: 'Shopify і обсяг',
    shopifyAds: 'Реклама на один продаж (Shopify)',
    shopifyAdsHint: 'Маркетплейси самі приводять покупців, на власний сайт трафік доводиться купувати.',
    vat: 'ПДВ на комісії платформ',
    vatHint: 'Нараховується на послуги іноземних майданчиків, якщо у вас немає VAT ID.',
    monthlySales: 'Продажів на місяць',
    monthlySalesHint: 'Підписка Shopify ділиться на кількість продажів.',
  },
  result: {
    best: 'Найвигідніше для вашого товару',
    bestText: 'на {diff} більше з продажу, ніж на {second}',
    fees: 'Комісії',
    profit: 'Прибуток з продажу',
    margin: 'Маржа',
    monthly: 'За місяць',
    ads: 'Реклама',
    parts: {
      listing: 'Лістинг',
      transaction: 'Транзакція',
      processing: 'Обробка платежу',
      referral: 'Комісія з продажу',
      finalValue: 'Final value fee',
      international: 'International fee',
      plan: 'Підписка на продаж',
      payments: 'Платіжна система',
      vat: 'ПДВ на комісії',
    },
    platformNotes: {
      etsy: 'Без Offsite Ads',
      amazon: 'Для схвалених майстрів',
      ebay: 'Більшість категорій',
      shopify: 'Тариф Basic',
    },
  },
};

const en: ComparisonCopy = {
  meta: {
    title: 'Etsy vs Amazon vs eBay vs Shopify 2026 — Where to Sell for More Profit',
    description:
      'Compare fees and net profit on Etsy, Amazon Handmade, eBay and Shopify: 2026 rates, the Shopify subscription and the ad spend a store needs. Enter your price and costs to see where you earn more per sale.',
    ogTitle: 'Etsy vs Amazon vs eBay vs Shopify',
    ogSubtitle: 'Where your product earns more after every fee',
  },
  crumbs: { home: 'Home', tools: 'Tools', page: 'Platform comparison' },
  hero: {
    eyebrow: 'Tool · Marketplaces',
    title: 'Etsy vs Amazon vs eBay vs Shopify',
    subtitle:
      'Enter your price and costs — the calculator works out net profit per sale on each platform after every fee and shows which one pays more. Rates for US sellers.',
    checked: 'Rates checked against each platform’s help pages: October 2026',
  },
  chips: [
    ['Etsy', '≈ 9.5% + $0.45'],
    ['Amazon Handmade', '15%'],
    ['eBay', '13.6% + $0.40'],
    ['Shopify', '$39/mo + 2.9% + $0.30'],
  ],
  cta: {
    calculate: 'Compare platforms',
    bandTitle: 'Picked a platform? We will launch your shop',
    bandText:
      'We open and run shops on Etsy, Amazon, eBay and Shopify: setup, SEO listings and ads. We can also combine several channels so you never depend on just one.',
  },
  guide: {
    eyebrow: 'Platform fees in 2026',
    title: 'What Etsy, Amazon, eBay and Shopify charge',
    intro:
      'Marketplaces take a bigger cut but bring you buyers. A Shopify store has lower fees, yet you pay for every customer with ads. That is why you should compare net profit, not just fee rates.',
    table: {
      head: ['Platform', 'Fees', 'What to know'],
      rows: [
        ['Etsy', '6.5% + 3% + $0.25 + $0.20 listing', 'The easiest start for handmade, vintage and design. Offsite Ads of 12–15% may apply'],
        ['Amazon Handmade', '15%, min $0.30', 'The $39.99/mo Professional plan is waived for approved artisans. Requires an application'],
        ['eBay', '13.6% + $0.40 per order', 'Non-US sellers also pay a 1.65% international fee'],
        ['Shopify', '$39/mo + 2.9% + $0.30', 'Lowest fees, but you bring your own traffic. Third-party gateways cost an extra 2%'],
      ],
    },
    formulaTitle: 'How we calculate',
    formula:
      'Profit = (price + shipping) − platform fees − cost of goods − packaging − shipping cost − ad spend (Shopify)',
    exampleTitle: 'Example for a US seller',
    example: [
      'An $80 item, $20 cost of goods, $3 packaging, 30 sales a month.',
      'Etsy — $48.95 per sale, eBay — $45.72, Amazon Handmade — $45.00.',
      'Shopify with $10 ad spend per sale — $43.08.',
      'Etsy wins here by $3.23 per sale over eBay.',
    ],
    tipsTitle: 'How to choose',
    tips: [
      'Handmade, vintage and personalised items — start with Etsy, that is what buyers search for there.',
      'Mass-market products and high volumes — Amazon.',
      'Shopify makes sense once you have a brand, a customer list and an ad budget.',
      'The most resilient model is several channels: a marketplace for traffic and your own store for repeat buyers.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Choosing a platform: common questions',
    text: 'Not sure where to start? We will look at your product and recommend a platform.',
    cta: 'Ask a question',
    items: [
      [
        'Is Etsy or Amazon better for sellers?',
        'For handmade and design-led products Etsy usually wins: lower fees and an easier start. Amazon Handmade takes 15% but opens up Amazon’s huge audience. Run your product through the calculator — the gap is often just a few dollars.',
      ],
      [
        'What fees does eBay charge in 2026?',
        'For most categories 13.6% of the total sale including shipping, plus $0.40 per order ($0.30 on orders of $10 or less). Sellers outside the US pay an extra 1.65% international fee.',
      ],
      [
        'Why does Shopify come out lower if its fees are cheaper?',
        'Because your own store does not bring buyers. Every Shopify sale needs ad spend. If your cost per sale is lower than the fee difference, Shopify wins — change the ad spend field and check.',
      ],
      [
        'Does Amazon Handmade charge a monthly fee?',
        'The Professional plan costs $39.99/month, but Amazon waives it for approved Handmade artisans, so the main cost is the 15% referral fee.',
      ],
      [
        'Can I sell on several platforms at once?',
        'Yes, and it is the most resilient setup: marketplaces bring traffic, your own store brings repeat purchases with no per-order commission.',
      ],
    ],
  },
  lead: {
    title: 'Let us help you choose and launch',
    subtitle: 'We will review your product, model the numbers on every platform and launch where it earns the most. The first consultation is free.',
  },
  app: {
    name: 'Etsy vs Amazon vs eBay vs Shopify comparison',
    features: [
      'Net profit on four platforms',
      '2026 platform fees',
      'Shopify subscription and payment fees',
      'Ad spend for your own store and monthly profit',
    ],
  },
  form: {
    note: 'All amounts in US dollars — these platforms sell mostly to US buyers.',
    product: 'Product',
    price: 'Sale price',
    shippingCharged: 'Shipping charged to buyer',
    shippingChargedHint: 'Free shipping — enter 0',
    costs: 'Your costs',
    shopify: 'Shopify and volume',
    shopifyAds: 'Ad spend per sale (Shopify)',
    shopifyAdsHint: 'Marketplaces bring buyers; for your own store you have to buy the traffic.',
    vat: 'VAT on platform fees',
    vatHint: 'Charged on services from foreign platforms when you have no VAT ID.',
    monthlySales: 'Sales per month',
    monthlySalesHint: 'The Shopify subscription is spread across your sales.',
  },
  result: {
    best: 'Best platform for your product',
    bestText: '{diff} more per sale than {second}',
    fees: 'Fees',
    profit: 'Profit per sale',
    margin: 'Margin',
    monthly: 'Per month',
    ads: 'Ads',
    parts: {
      listing: 'Listing',
      transaction: 'Transaction',
      processing: 'Payment processing',
      referral: 'Referral fee',
      finalValue: 'Final value fee',
      international: 'International fee',
      plan: 'Subscription per sale',
      payments: 'Payments',
      vat: 'VAT on fees',
    },
    platformNotes: {
      etsy: 'Without Offsite Ads',
      amazon: 'For approved artisans',
      ebay: 'Most categories',
      shopify: 'Basic plan',
    },
  },
};

const sk: ComparisonCopy = {
  meta: {
    title: 'Etsy vs Amazon vs eBay vs Shopify 2026 — kde sa oplatí predávať',
    description:
      'Porovnajte poplatky a čistý zisk na Etsy, Amazon Handmade, eBay a Shopify pre predajcov zo Slovenska: DPH 23 % na poplatky, international fee na eBay, predplatné a reklama na Shopify. Zadajte cenu a náklady a uvidíte, kde zarobíte viac.',
    ogTitle: 'Etsy vs Amazon vs eBay vs Shopify',
    ogSubtitle: 'Kde váš produkt zarobí viac po všetkých poplatkoch',
  },
  crumbs: { home: 'Domov', tools: 'Nástroje', page: 'Porovnanie platforiem' },
  hero: {
    eyebrow: 'Nástroj · Marketplacy',
    title: 'Etsy vs Amazon vs eBay vs Shopify',
    subtitle:
      'Zadajte cenu a náklady — kalkulačka vypočíta čistý zisk z jedného predaja na každej platforme po všetkých poplatkoch a ukáže, kde sa to oplatí viac. Sadzby pre predajcov zo Slovenska.',
    checked: 'Sadzby overené v pomocníkoch platforiem: október 2026',
  },
  chips: [
    ['Etsy', '≈ 10,5 % + 0,50 $'],
    ['Amazon Handmade', '15 %'],
    ['eBay', '13,6 % + 0,40 $'],
    ['Shopify', '39 $/mes. + platby'],
  ],
  cta: {
    calculate: 'Porovnať platformy',
    bandTitle: 'Vybrali ste platformu? Spustíme obchod',
    bandText:
      'Otvárame a spravujeme obchody na Etsy, Amazone, eBay a Shopify: registrácia, listingy so SEO, reklama. Pomôžeme skombinovať viac kanálov, aby ste nezáviseli od jedného.',
  },
  guide: {
    eyebrow: 'Poplatky platforiem v roku 2026',
    title: 'Koľko si berú Etsy, Amazon, eBay a Shopify',
    intro:
      'Marketplacy si berú väčšie percento, ale privedú kupujúcich. Vlastný e-shop na Shopify má nižšie poplatky, no za každého zákazníka platíte reklamou. Preto treba porovnávať čistý zisk, nie len sadzby.',
    table: {
      head: ['Platforma', 'Poplatky', 'Čo treba vedieť'],
      rows: [
        ['Etsy', '6,5 % + 4 % + 0,30 € + 0,20 $ listing', 'Najjednoduchší štart pre ručnú výrobu, vintage a dizajn. Možné Offsite Ads 12–15 %'],
        ['Amazon Handmade', '15 %, min. 0,30 $', 'Predplatné 39,99 $/mes. sa schváleným remeselníkom odpúšťa. Vyžaduje schválenie'],
        ['eBay', '13,6 % + 0,40 $ za objednávku', 'Predajcovia mimo USA platia navyše 1,65 % international fee'],
        ['Shopify', '39 $/mes. + platobná brána', 'Rátame s externou bránou ≈3,5 % + 0,30 $ a 2 % pre Shopify. Návštevnosť si platíte sami'],
        ['DPH na poplatky', '23 %', 'Bez IČ DPH sa uplatňuje na služby zahraničných platforiem'],
      ],
    },
    formulaTitle: 'Ako počítame',
    formula:
      'Zisk = (cena + poštovné) − poplatky platformy − DPH na poplatky − výrobné náklady − balenie − doprava − reklama (pri Shopify)',
    exampleTitle: 'Príklad pre predajcu zo Slovenska',
    example: [
      'Produkt za 80 $, náklady 20 $, balenie 3 $, 30 predajov mesačne.',
      'Etsy — 46,07 $ z predaja, Amazon Handmade — 42,24 $, eBay — 41,50 $.',
      'Shopify s reklamou 10 $ na predaj — 39,62 $.',
      'Najvýhodnejšie je tu Etsy, o 3,83 $ na predaj viac ako Amazon.',
    ],
    tipsTitle: 'Ako si vybrať',
    tips: [
      'Ručná výroba, vintage, personalizácia — začnite na Etsy, tam ľudia hľadajú práve toto.',
      'Masové produkty a veľké objemy — Amazon.',
      'Shopify dáva zmysel, keď máte značku, databázu zákazníkov a rozpočet na reklamu.',
      'Najodolnejší model je viac kanálov: marketplace pre návštevnosť a vlastný e-shop pre opakované nákupy.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Časté otázky o výbere platformy',
    text: 'Neviete, kde začať? Pozrieme sa na váš produkt a odporučíme platformu.',
    cta: 'Opýtať sa',
    items: [
      [
        'Čo je výhodnejšie: Etsy alebo Amazon?',
        'Pri ručne vyrábaných a dizajnových produktoch zvyčajne Etsy: nižšie poplatky a jednoduchší štart. Amazon Handmade si berie 15 %, no otvára obrovské publikum Amazonu. Prepočítajte si svoj produkt — rozdiel býva len pár dolárov.',
      ],
      [
        'Môžem predávať na eBay zo Slovenska?',
        'Áno. Predajcovia mimo USA platia k základnému poplatku 13,6 % + 0,40 $ za objednávku ešte 1,65 % international fee.',
      ],
      [
        'Prečo Shopify vychádza horšie, keď má nižšie poplatky?',
        'Pretože vlastný e-shop neprivedie kupujúcich. Každý predaj na Shopify potrebuje reklamu. Ak vás predaj stojí menej, ako je rozdiel v poplatkoch, Shopify vyhrá — zmeňte pole reklamy a overte si to.',
      ],
      [
        'Platí sa DPH aj z poplatkov Amazonu a eBay?',
        'Ak nemáte IČ DPH, zahraničné platformy účtujú slovenskú DPH 23 % na svoje služby. Kalkulačka ju preto počíta pri všetkých platformách rovnako.',
      ],
      [
        'Dá sa predávať na viacerých platformách naraz?',
        'Áno a je to najodolnejší model: marketplacy prinášajú návštevnosť, vlastný e-shop opakované nákupy bez provízie za každého zákazníka.',
      ],
    ],
  },
  lead: {
    title: 'Pomôžeme vybrať platformu a spustiť sa',
    subtitle: 'Rozoberieme váš produkt, prepočítame ekonomiku na každej platforme a spustíme obchod tam, kde zarobí najviac. Prvá konzultácia je zadarmo.',
  },
  app: {
    name: 'Porovnanie Etsy, Amazon, eBay a Shopify',
    features: [
      'Čistý zisk na štyroch platformách',
      'Poplatky 2026 a DPH na poplatky',
      'International fee na eBay a externá brána na Shopify',
      'Reklama pre vlastný e-shop a mesačný zisk',
    ],
  },
  form: {
    note: 'Všetky sumy v amerických dolároch — platformy predávajú hlavne kupujúcim z USA.',
    product: 'Produkt',
    price: 'Predajná cena',
    shippingCharged: 'Poštovné, ktoré platí kupujúci',
    shippingChargedHint: 'Doprava zadarmo — 0',
    costs: 'Vaše náklady',
    shopify: 'Shopify a objem',
    shopifyAds: 'Reklama na jeden predaj (Shopify)',
    shopifyAdsHint: 'Marketplacy privedú kupujúcich samy, na vlastný e-shop treba návštevnosť kúpiť.',
    vat: 'DPH na poplatky platforiem',
    vatHint: 'Uplatňuje sa na služby zahraničných platforiem, ak nemáte IČ DPH.',
    monthlySales: 'Predajov za mesiac',
    monthlySalesHint: 'Predplatné Shopify sa delí počtom predajov.',
  },
  result: {
    best: 'Najvýhodnejšie pre váš produkt',
    bestText: 'o {diff} viac z predaja ako {second}',
    fees: 'Poplatky',
    profit: 'Zisk z predaja',
    margin: 'Marža',
    monthly: 'Za mesiac',
    ads: 'Reklama',
    parts: {
      listing: 'Listing',
      transaction: 'Transakcia',
      processing: 'Spracovanie platby',
      referral: 'Provízia z predaja',
      finalValue: 'Final value fee',
      international: 'International fee',
      plan: 'Predplatné na predaj',
      payments: 'Platobná brána',
      vat: 'DPH na poplatky',
    },
    platformNotes: {
      etsy: 'Bez Offsite Ads',
      amazon: 'Pre schválených remeselníkov',
      ebay: 'Väčšina kategórií',
      shopify: 'Tarif Basic',
    },
  },
};

export const COMPARISON_COPY: Record<Locale, ComparisonCopy> = { uk, en, sk };
