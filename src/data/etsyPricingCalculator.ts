import { localizedSlugs, type Locale } from '@/lib/i18n';
import type { ToolPageCopy } from './toolPage';

/**
 * Тексти сторінки «Калькулятор ціноутворення Etsy» трьома мовами.
 * Підписи полів витрат, комісій і плашки ставок спільні з калькулятором
 * прибутку — їх бере компонент з PROFIT_CALC_COPY.
 */

export const PRICING_CALC_PATHS = localizedSlugs['/kalkulyator-tsinoutvorennya-etsy'];

export type PricingCalcCopy = ToolPageCopy & {
  form: {
    target: string;
    byMargin: string;
    byProfit: string;
    margin: string;
    marginHint: string;
    profit: string;
    profitHint: string;
    shippingHint: string;
  };
  result: {
    recommended: string;
    recommendedHint: string;
    target: string;
    breakEven: string;
    breakEvenHint: string;
    profit: string;
    margin: string;
    impossible: string;
    impossibleHint: string;
    breakdown: string;
    copy: string;
    copied: string;
  };
};

const uk: PricingCalcCopy = {
  meta: {
    title: 'Калькулятор ціни для Etsy 2026 — яку ціну ставити на товар',
    description:
      'Розрахуйте ціну для Etsy з урахуванням усіх комісій (6.5% + 6% + $0.30), ПДВ 20% на комісії, Offsite Ads і податку ФОП. Вкажіть собівартість і бажану маржу — отримайте мінімальну та рекомендовану ціну.',
    ogTitle: 'Калькулятор ціноутворення Etsy',
    ogSubtitle: 'Собівартість і бажана маржа → правильна ціна з усіма комісіями',
  },
  crumbs: { home: 'Головна', tools: 'Інструменти', page: 'Калькулятор ціноутворення Etsy' },
  hero: {
    eyebrow: 'Інструмент · Etsy',
    title: 'Калькулятор ціноутворення Etsy',
    subtitle:
      'Вкажіть собівартість і скільки хочете заробити — калькулятор підбере ціну, яка покриє всі комісії Etsy, ПДВ і податок ФОП. Ставки для продавців з України.',
    checked: 'Ставки звірено з довідкою Etsy: жовтень 2026',
  },
  chips: [
    ['Транзакція', '6.5%'],
    ['Обробка платежу', '6% + $0.30'],
    ['ПДВ на комісії', '20%'],
    ['Податок ФОП', '6%'],
    ['Округлення', 'до .99'],
  ],
  cta: {
    calculate: 'Розрахувати ціну',
    bandTitle: 'Не впевнені, що ціна конкурентна?',
    bandText:
      'Проаналізуємо конкурентів у вашій ніші, перевіримо ціни й собівартість і підкажемо, де можна заробляти більше без втрати продажів.',
  },
  guide: {
    eyebrow: 'Ціноутворення на Etsy',
    title: 'Як правильно рахувати ціну на Etsy',
    intro:
      'Помилка новачків — множити собівартість на два й забувати про комісії. Etsy забирає відсоток від усієї суми замовлення, тож кожен долар ціни зменшується ще до податків. Правильна ціна рахується від цільової маржі, а не від собівартості.',
    table: {
      head: ['Підхід', 'Як рахується', 'Коли підходить'],
      rows: [
        ['Від собівартості', 'Собівартість × 2–3', 'Швидка прикидка. Часто не покриває комісії на дешевих товарах'],
        ['Від цільової маржі', 'Ціна, за якої після всіх комісій лишається потрібний %', 'Основний спосіб — саме так рахує цей калькулятор'],
        ['Від прибутку з продажу', 'Ціна, що дає фіксовану суму на руки', 'Коли знаєте, скільки хочете заробити з кожного замовлення'],
        ['Від конкурентів', 'Медіана цін схожих товарів у пошуку Etsy', 'Перевірка: якщо ваша ціна вища — потрібні сильніші фото й бренд'],
      ],
    },
    formulaTitle: 'Формула',
    formula:
      'Ціна = (собівартість + пакування + відправка + фіксовані комісії) ÷ (1 − відсоткові комісії − податок − цільова маржа)',
    exampleTitle: 'Приклад для продавця з України',
    example: [
      'Собівартість $20, пакування $3, доставка безкоштовна, податок ФОП 6%.',
      'Мінімальна ціна, нижче якої збиток, — $29.87.',
      'Для маржі 35% потрібна ціна $53.64, рекомендована — $53.99.',
      'За цієї ціни на руки лишається $19.05 з кожного продажу.',
    ],
    tipsTitle: 'Що ще врахувати',
    tips: [
      'Закладайте Offsite Ads хоча б у частину товарів: 15% з продажу легко зʼїдають усю маржу.',
      'Ціни на .99 сприймаються дешевшими — калькулятор округлює саме так.',
      'Безкоштовна доставка, вбудована в ціну, допомагає ранжуванню в пошуку Etsy.',
      'Залиште запас 5–10% під знижки й розпродажі, щоб не продавати в мінус.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Часті запитання про ціни на Etsy',
    text: 'Хочете, щоб ми перевірили ціни вашого магазину? Напишіть нам.',
    cta: 'Поставити запитання',
    items: [
      [
        'Яку маржу закладати на Etsy?',
        'Для handmade і дизайнерських товарів орієнтуйтесь на 30–50% чистої маржі після всіх комісій. Менше 20% не лишає місця для реклами, знижок і повернень.',
      ],
      [
        'Чому калькулятор радить вищу ціну, ніж собівартість × 2?',
        'Бо враховує комісії Etsy (транзакція 6.5%, обробка платежу 6% + $0.30, лістинг $0.20), ПДВ 20% на ці комісії та податок ФОП. Разом це 20–25% від ціни ще до ваших витрат.',
      ],
      [
        'Що таке ціна беззбитковості?',
        'Це мінімальна ціна, за якої ви нічого не заробляєте, але й не втрачаєте. Продавати дешевше — означає доплачувати за кожне замовлення.',
      ],
      [
        'Як врахувати Offsite Ads у ціні?',
        'Увімкніть Offsite Ads у калькуляторі — ціна підніметься так, щоб навіть продаж з реклами (15% або 12%) давав цільову маржу. Якщо це робить ціну неконкурентною, закладіть рекламу лише в частину асортименту.',
      ],
      [
        'Чому ціна закінчується на .99?',
        'Ціни на .99 покупці сприймають як нижчі, і так виглядає більшість цін на Etsy. Калькулятор завжди округлює вгору, тож маржа не падає.',
      ],
    ],
  },
  lead: {
    title: 'Допоможемо з цінами й запуском на Etsy',
    subtitle: 'Розберемо собівартість, конкурентів і рекламу та запропонуємо ціни, з якими магазин заробляє. Перша консультація безкоштовна.',
  },
  app: {
    name: 'Калькулятор ціноутворення Etsy',
    features: [
      'Ціна за цільовою маржею або сумою прибутку',
      'Комісії Etsy 2026 і ПДВ на комісії',
      'Offsite Ads, податок ФОП і виведення коштів',
      'Ціна беззбитковості та рекомендована ціна на .99',
    ],
  },
  form: {
    target: 'Скільки хочете заробити',
    byMargin: 'Маржа, %',
    byProfit: 'Сума з продажу',
    margin: 'Цільова маржа',
    marginHint: 'Частка суми замовлення, що лишається вам після всіх комісій і витрат.',
    profit: 'Прибуток з одного продажу',
    profitHint: 'Скільки хочете отримати на руки з кожного замовлення.',
    shippingHint: '0 — якщо доставку вбудовано в ціну',
  },
  result: {
    recommended: 'Рекомендована ціна',
    recommendedHint: 'округлено вгору до .99',
    target: 'Точна ціна для цілі',
    breakEven: 'Мінімальна ціна',
    breakEvenHint: 'нижче — кожен продаж у мінус',
    profit: 'Прибуток з продажу',
    margin: 'Маржа',
    impossible: 'Таку маржу не отримати',
    impossibleHint: 'Комісії й податки забирають відсоток від будь-якої ціни, тож маржу вище певної межі не отримати. Зменште цільову маржу або вимкніть зайві витрати.',
    breakdown: 'Розбивка за рекомендованою ціною',
    copy: 'Скопіювати ціну',
    copied: 'Скопійовано',
  },
};

const en: PricingCalcCopy = {
  meta: {
    title: 'Etsy Pricing Calculator 2026 — What to Charge on Etsy',
    description:
      'Find the right Etsy price after every fee: 6.5% transaction, 3% + $0.25 payment processing, $0.20 listing and Offsite Ads. Enter your costs and target margin to get the break-even and recommended price.',
    ogTitle: 'Etsy Pricing Calculator',
    ogSubtitle: 'Your costs and target margin → the right price after every fee',
  },
  crumbs: { home: 'Home', tools: 'Tools', page: 'Etsy Pricing Calculator' },
  hero: {
    eyebrow: 'Tool · Etsy',
    title: 'Etsy Pricing Calculator',
    subtitle:
      'Enter your costs and how much you want to earn — the calculator finds a price that covers every Etsy fee and still hits your margin. Rates for US sellers.',
    checked: 'Rates checked against Etsy Help: October 2026',
  },
  chips: [
    ['Transaction', '6.5%'],
    ['Payment processing', '3% + $0.25'],
    ['Listing', '$0.20'],
    ['Rounding', 'to .99'],
  ],
  cta: {
    calculate: 'Calculate price',
    bandTitle: 'Not sure your price is competitive?',
    bandText:
      'We will review competitors in your niche, check your pricing and costs, and show you where you can earn more without losing sales.',
  },
  guide: {
    eyebrow: 'Etsy pricing',
    title: 'How to price products on Etsy',
    intro:
      'The classic beginner mistake is doubling the cost and forgetting the fees. Etsy takes a percentage of the whole order, so every dollar of price shrinks before taxes. The right price is worked out from your target margin, not from your cost.',
    table: {
      head: ['Method', 'How it works', 'When to use it'],
      rows: [
        ['Cost-plus', 'Cost × 2–3', 'A quick estimate. Often fails to cover fees on cheap items'],
        ['Target margin', 'The price that leaves the desired % after every fee', 'The main method — this is what the calculator does'],
        ['Target profit', 'The price that leaves a fixed amount per order', 'When you know exactly how much you want per sale'],
        ['Competitor-based', 'Median price of similar items in Etsy search', 'A sanity check: if you are higher, you need stronger photos and branding'],
      ],
    },
    formulaTitle: 'Formula',
    formula:
      'Price = (cost + packaging + shipping + fixed fees) ÷ (1 − percentage fees − income tax − target margin)',
    exampleTitle: 'Example for a US seller',
    example: [
      'Cost of goods $20, packaging $3, free shipping.',
      'The break-even price is $25.91.',
      'A 35% margin needs $42.25, so the recommended price is $42.99.',
      'At that price you keep $15.46 per sale.',
    ],
    tipsTitle: 'What else to factor in',
    tips: [
      'Price at least part of your catalogue for Offsite Ads: a 15% fee can wipe out the whole margin.',
      'Prices ending in .99 feel cheaper — the calculator rounds that way.',
      'Free shipping built into the price helps your Etsy search ranking.',
      'Leave 5–10% headroom for sales and coupons so discounts never sell at a loss.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Etsy pricing: common questions',
    text: 'Want us to review your shop pricing? Get in touch.',
    cta: 'Ask a question',
    items: [
      [
        'What profit margin should I aim for on Etsy?',
        'For handmade and design-led products aim for 30–50% net margin after all fees. Below 20% there is no room for ads, discounts or returns.',
      ],
      [
        'Why is the suggested price higher than cost × 2?',
        'Because it includes Etsy fees — 6.5% transaction, 3% + $0.25 payment processing and the $0.20 listing fee — plus any tax and Offsite Ads you switch on.',
      ],
      [
        'What is the break-even price?',
        'The lowest price at which you neither earn nor lose money. Selling below it means paying for every order out of your own pocket.',
      ],
      [
        'How do I account for Offsite Ads in my price?',
        'Switch Offsite Ads on in the calculator and the price rises so that even an ad-driven sale (15% or 12%) still hits your margin. If that makes you uncompetitive, build it into part of your range only.',
      ],
      [
        'Why does the price end in .99?',
        'Shoppers read .99 prices as lower, and most Etsy prices look that way. The calculator always rounds up, so your margin never drops.',
      ],
    ],
  },
  lead: {
    title: 'Let us help with pricing and your Etsy launch',
    subtitle: 'We will review your costs, competitors and ads and suggest prices that make the shop profitable. The first consultation is free.',
  },
  app: {
    name: 'Etsy Pricing Calculator',
    features: [
      'Price from a target margin or profit per sale',
      '2026 Etsy fees',
      'Offsite Ads, income tax and withdrawal fees',
      'Break-even price and a recommended .99 price',
    ],
  },
  form: {
    target: 'How much you want to earn',
    byMargin: 'Margin, %',
    byProfit: 'Amount per sale',
    margin: 'Target margin',
    marginHint: 'The share of the order total you keep after every fee and cost.',
    profit: 'Profit per sale',
    profitHint: 'How much you want to keep from each order.',
    shippingHint: '0 if shipping is built into the price',
  },
  result: {
    recommended: 'Recommended price',
    recommendedHint: 'rounded up to .99',
    target: 'Exact price for your target',
    breakEven: 'Break-even price',
    breakEvenHint: 'below this every sale loses money',
    profit: 'Profit per sale',
    margin: 'Margin',
    impossible: 'This margin is out of reach',
    impossibleHint: 'Fees and taxes take a percentage of any price, so margins above a certain level are impossible. Lower the target or switch off costs that do not apply.',
    breakdown: 'Breakdown at the recommended price',
    copy: 'Copy price',
    copied: 'Copied',
  },
};

const sk: PricingCalcCopy = {
  meta: {
    title: 'Kalkulačka ceny Etsy 2026 — akú cenu nastaviť na produkt',
    description:
      'Vypočítajte cenu na Etsy po všetkých poplatkoch: transakcia 6,5 %, spracovanie platby 4 % + 0,30 €, DPH 23 % na poplatky a Offsite Ads. Zadajte náklady a cieľovú maržu a získajte minimálnu aj odporúčanú cenu.',
    ogTitle: 'Kalkulačka ceny Etsy',
    ogSubtitle: 'Náklady a cieľová marža → správna cena po všetkých poplatkoch',
  },
  crumbs: { home: 'Domov', tools: 'Nástroje', page: 'Kalkulačka ceny Etsy' },
  hero: {
    eyebrow: 'Nástroj · Etsy',
    title: 'Kalkulačka ceny Etsy',
    subtitle:
      'Zadajte náklady a koľko chcete zarobiť — kalkulačka nájde cenu, ktorá pokryje všetky poplatky Etsy aj DPH. Sadzby pre predajcov zo Slovenska.',
    checked: 'Sadzby overené v pomocníkovi Etsy: október 2026',
  },
  chips: [
    ['Transakcia', '6,5 %'],
    ['Spracovanie platby', '4 % + 0,30 €'],
    ['DPH na poplatky', '23 %'],
    ['Zaokrúhlenie', 'na ,99'],
  ],
  cta: {
    calculate: 'Vypočítať cenu',
    bandTitle: 'Nie ste si istí, či je cena konkurencieschopná?',
    bandText:
      'Preveríme konkurenciu vo vašej nike, ceny aj náklady a ukážeme, kde môžete zarobiť viac bez straty predajov.',
  },
  guide: {
    eyebrow: 'Cenotvorba na Etsy',
    title: 'Ako správne stanoviť cenu na Etsy',
    intro:
      'Typická chyba začiatočníkov je vynásobiť náklady dvoma a zabudnúť na poplatky. Etsy si berie percento z celej objednávky, takže každé euro z ceny sa zmenší ešte pred daňami. Správna cena sa počíta z cieľovej marže, nie z nákladov.',
    table: {
      head: ['Prístup', 'Ako sa počíta', 'Kedy sa hodí'],
      rows: [
        ['Z nákladov', 'Náklady × 2–3', 'Rýchly odhad. Pri lacných produktoch často nepokryje poplatky'],
        ['Z cieľovej marže', 'Cena, pri ktorej po všetkých poplatkoch zostane požadované %', 'Hlavná metóda — presne takto počíta táto kalkulačka'],
        ['Z cieľového zisku', 'Cena, ktorá prinesie pevnú sumu z objednávky', 'Keď viete, koľko chcete zarobiť na každom predaji'],
        ['Podľa konkurencie', 'Medián cien podobných produktov vo vyhľadávaní Etsy', 'Kontrola: ak ste drahší, potrebujete silnejšie fotky a značku'],
      ],
    },
    formulaTitle: 'Vzorec',
    formula:
      'Cena = (náklady + balenie + doprava + pevné poplatky) ÷ (1 − percentuálne poplatky − daň − cieľová marža)',
    exampleTitle: 'Príklad pre predajcu zo Slovenska',
    example: [
      'Výrobné náklady 20 €, balenie 3 €, doprava zadarmo.',
      'Cena bez straty je 27,10 €.',
      'Pre maržu 35 % treba 45,32 €, odporúčaná cena je 45,99 €.',
      'Pri tejto cene vám z predaja zostane 16,45 €.',
    ],
    tipsTitle: 'Na čo ešte myslieť',
    tips: [
      'Aspoň pri časti sortimentu počítajte s Offsite Ads: poplatok 15 % ľahko zje celú maržu.',
      'Ceny končiace na ,99 pôsobia lacnejšie — kalkulačka zaokrúhľuje práve tak.',
      'Doprava zadarmo zahrnutá v cene pomáha pri vyhľadávaní na Etsy.',
      'Nechajte si rezervu 5–10 % na zľavy, aby ste pri výpredaji nepredávali v strate.',
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Časté otázky o cenách na Etsy',
    text: 'Chcete, aby sme preverili ceny vášho obchodu? Napíšte nám.',
    cta: 'Opýtať sa',
    items: [
      [
        'Akú maržu si dať na Etsy?',
        'Pri ručne vyrábaných a dizajnových produktoch mierte na 30–50 % čistej marže po všetkých poplatkoch. Pod 20 % nezostáva priestor na reklamu, zľavy ani vratky.',
      ],
      [
        'Prečo kalkulačka odporúča vyššiu cenu ako náklady × 2?',
        'Pretože započítava poplatky Etsy (transakcia 6,5 %, spracovanie platby 4 % + 0,30 €, listing 0,20 $) a 23 % DPH na tieto poplatky, ak nemáte IČ DPH.',
      ],
      [
        'Čo je cena bez straty?',
        'Najnižšia cena, pri ktorej nič nezarobíte, ale ani nestratíte. Predávať lacnejšie znamená doplácať na každú objednávku.',
      ],
      [
        'Ako započítať Offsite Ads do ceny?',
        'Zapnite Offsite Ads v kalkulačke a cena sa zvýši tak, aby aj predaj z reklamy (15 % alebo 12 %) dosiahol cieľovú maržu. Ak to cenu príliš zdvihne, započítajte reklamu len do časti sortimentu.',
      ],
      [
        'Prečo cena končí na ,99?',
        'Ceny na ,99 pôsobia nižšie a takto vyzerá väčšina cien na Etsy. Kalkulačka vždy zaokrúhľuje nahor, takže marža neklesne.',
      ],
    ],
  },
  lead: {
    title: 'Pomôžeme s cenami aj so štartom na Etsy',
    subtitle: 'Rozoberieme náklady, konkurenciu a reklamu a navrhneme ceny, s ktorými obchod zarába. Prvá konzultácia je zadarmo.',
  },
  app: {
    name: 'Kalkulačka ceny Etsy',
    features: [
      'Cena podľa cieľovej marže alebo zisku z predaja',
      'Poplatky Etsy 2026 a DPH na poplatky',
      'Offsite Ads, daň a poplatok za výber',
      'Cena bez straty a odporúčaná cena na ,99',
    ],
  },
  form: {
    target: 'Koľko chcete zarobiť',
    byMargin: 'Marža, %',
    byProfit: 'Suma z predaja',
    margin: 'Cieľová marža',
    marginHint: 'Podiel zo sumy objednávky, ktorý vám zostane po všetkých poplatkoch a nákladoch.',
    profit: 'Zisk z jedného predaja',
    profitHint: 'Koľko chcete mať z každej objednávky.',
    shippingHint: '0 — ak je doprava zahrnutá v cene',
  },
  result: {
    recommended: 'Odporúčaná cena',
    recommendedHint: 'zaokrúhlené nahor na ,99',
    target: 'Presná cena pre cieľ',
    breakEven: 'Cena bez straty',
    breakEvenHint: 'pod ňou je každý predaj v mínuse',
    profit: 'Zisk z predaja',
    margin: 'Marža',
    impossible: 'Takú maržu nedosiahnete',
    impossibleHint: 'Poplatky a dane si berú percento z akejkoľvek ceny, takže maržu nad určitou hranicou dosiahnuť nemožno. Znížte cieľ alebo vypnite náklady, ktoré sa vás netýkajú.',
    breakdown: 'Rozpis pri odporúčanej cene',
    copy: 'Kopírovať cenu',
    copied: 'Skopírované',
  },
};

export const PRICING_CALC_COPY: Record<Locale, PricingCalcCopy> = { uk, en, sk };
