/**
 * Slovenské preklady obsahu zo súborov `src/data/*`.
 *
 * Kľúčom je ukrajinský originál — ak preklad chýba, zobrazí sa ukrajinský text.
 * Čiernopis od Claude: pred publikovaním potrebuje kontrolu rodeného hovorcu.
 */
const sk: Record<string, string> = {
  // --- kategórie služieb ---
  'Стратегія та план розвитку': 'Stratégia a plán rastu',
  'Розробка Shopify': 'Vývoj na Shopify',
  'Інші розробки': 'Ostatný vývoj',
  'Розробка сайтів': 'Tvorba webov',
  'Повторні продажі та LTV': 'Opakované predaje a LTV',
  SEO: 'SEO',
  'Міжнародні маркетплейси': 'Medzinárodné marketplace',
  Pinterest: 'Pinterest',
  YouTube: 'YouTube',
  'Брендинг та дизайн': 'Branding a dizajn',
  Реклама: 'Reklama',
  'E-commerce консалтинг': 'E-commerce poradenstvo',

  // --- „moja úloha“ ---
  'Не знаю, з чого почати': 'Neviem, kde začať',
  'Хочу вийти на міжнародний ринок': 'Chcem ísť na zahraničné trhy',
  'Хочу продавати на Etsy': 'Chcem predávať na Etsy',
  'Хочу сайт на Shopify': 'Chcem obchod na Shopify',
  'Хочу оновити бренд': 'Chcem obnoviť značku',
  'Хочу сайт': 'Chcem web',
  'Хочу зʼявлятися в AI-пошуку': 'Chcem byť vidieť v AI vyhľadávaní',
  'Хочу з’являтися в AI-пошуку': 'Chcem byť vidieť v AI vyhľadávaní',
  'Хочу запустити рекламу': 'Chcem spustiť reklamu',

  // --- názvy služieb ---
  'Аналіз бізнесу': 'Analýza biznisu',
  'Канали продажів': 'Predajné kanály',
  'План розвитку': 'Plán rastu',
  'Shopify CRO аудит': 'CRO audit Shopify',
  'CRO аудит інтернет-магазину': 'CRO audit e-shopu',
  'Аудит Etsy': 'Audit Etsy',
  Консультація: 'Konzultácia',
  Доопрацювання: 'Dopracovanie',
  'B2B Shopify (опт)': 'B2B Shopify (veľkoobchod)',
  'CRO аудит': 'CRO audit',
  'Самописний сайт': 'Web na mieru',
  'Бази даних': 'Databázy',
  Хорошоп: 'Horoshop',
  'Wix / Webflow': 'Wix / Webflow',
  WordPress: 'WordPress',
  CRM: 'CRM',
  'Email-маркетинг': 'E-mailový marketing',
  'SEO аудит': 'SEO audit',
  'SEO просування': 'SEO rast',
  'AI-пошук': 'AI vyhľadávanie',
  'Etsy магазин': 'Obchod na Etsy',
  'Ведення Etsy': 'Správa Etsy',
  'eBay магазин': 'Obchod na eBay',
  'Amazon Handmade': 'Amazon Handmade',
  'Ведення Amazon': 'Správa Amazonu',
  Агрегатори: 'Porovnávače cien',
  'Alibaba магазин': 'Obchod na Alibabe',
  'Ведення Alibaba': 'Správa Alibaby',
  'B2B каталоги': 'B2B katalógy',
  'Ведення акаунта': 'Správa účtu',
  Автоматизація: 'Automatizácia',
  'Pinterest Ads': 'Pinterest Ads',
  'YouTube канал': 'YouTube kanál',
  'Ведення каналу': 'Správa kanála',
  'Брендбук базовий': 'Základný brand book',
  Брендбук: 'Brand book',
  Логотип: 'Logo',
  Ребрендинг: 'Rebranding',
  Виставки: 'Veľtrhy',
  'Google Ads': 'Google Ads',
  'Meta Ads': 'Meta Ads',
  'TikTok Ads': 'TikTok Ads',
  'YouTube Ads': 'YouTube Ads',
  'GPT Ads': 'GPT Ads',
  Маркетплейси: 'Reklama na marketplace',
  Консультації: 'Konzultácie',
  'Аудит процесів': 'Audit procesov',
  Конверсія: 'Konverzia',
  Супровід: 'Priebežná podpora',
  'AI-консультації': 'AI konzultácie',

  // --- popisy služieb ---
  'Аналіз бізнесу, продукту та конкурентів: знаходимо точки росту онлайн-продажів.':
    'Analýza biznisu, produktu a konkurencie: nájdeme body rastu online predaja.',
  'Підбір каналів продажів: сайт, маркетплейси, соцмережі та реклама під ваш продукт.':
    'Výber predajných kanálov: web, marketplace, sociálne siete a reklama pre váš produkt.',
  'Покроковий план розвитку e-commerce напрямку з цілями, бюджетом і метриками.':
    'Krok za krokom plán rozvoja e-commerce s cieľmi, rozpočtom a metrikami.',
  'Аудит Shopify-магазину і план росту продажів без додаткових витрат на рекламу.':
    'Audit Shopify obchodu a plán rastu predaja bez ďalších výdavkov na reklamu.',
  'CRO-аудит інтернет-магазину: знаходимо, де втрачаються покупці, і підвищуємо конверсію.':
    'CRO audit e-shopu: nájdeme, kde strácate zákazníkov, a zvýšime konverziu.',
  'Аудит Etsy-магазину та конкурентів, план системи продажів на Etsy.':
    'Audit obchodu na Etsy a konkurencie plus plán predajného systému na Etsy.',
  'Консультація з розвитку онлайн-продажів для e-commerce бізнесу.':
    'Konzultácia o rozvoji online predaja pre e-commerce firmy.',
  'Розробка інтернет-магазину на Shopify під ключ: дизайн, тема, каталог, оплата й доставка.':
    'E-shop na Shopify na kľúč: dizajn, šablóna, katalóg, platby a doprava.',
  'Доопрацювання Shopify-магазину: нові секції, інтеграції, швидкість і виправлення помилок.':
    'Dopracovanie Shopify obchodu: nové sekcie, integrácie, rýchlosť a oprava chýb.',
  'B2B-магазин на Shopify для оптових продажів: закриті каталоги та індивідуальні ціни.':
    'B2B obchod na Shopify pre veľkoobchod: uzavreté katalógy a individuálne ceny.',
  'CRO-аудит Shopify-магазину і план росту конверсії без збільшення рекламного бюджету.':
    'CRO audit Shopify obchodu a plán rastu konverzie bez zvyšovania rozpočtu na reklamu.',
  'Розробка самописного сайту або інтернет-магазину під нестандартні задачі бізнесу.':
    'Vývoj webu alebo e-shopu na mieru pre neštandardné zadania.',
  'Frontend-розробка на Vue.js: адаптивна верстка, швидкі та зручні інтерфейси.':
    'Frontend vo Vue.js: responzívna šablóna, rýchle a pohodlné rozhrania.',
  'Backend-розробка на PHP (Laravel) та Node.js: API, інтеграції, бізнес-логіка.':
    'Backend v PHP (Laravel) a Node.js: API, integrácie, biznis logika.',
  'Проєктування та підтримка баз даних PostgreSQL, MySQL і MongoDB для e-commerce.':
    'Návrh a správa databáz PostgreSQL, MySQL a MongoDB pre e-commerce.',
  'Розробка інтернет-магазину на Хорошоп: дизайн, налаштування каталогу й оплат.':
    'E-shop na platforme Horoshop: dizajn, nastavenie katalógu a platieb.',
  'Розробка сайту на Wix або Webflow: лендинги та сайти-візитки для бізнесу.':
    'Web na Wixe alebo Webflow: landing pages a firemné vizitky.',
  'Сайт на WordPress і WooCommerce: на шаблоні або з індивідуальним дизайном.':
    'Web na WordPresse a WooCommerce: na šablóne alebo s dizajnom na mieru.',
  'Доопрацювання сайту: нові сторінки, виправлення помилок, швидкість і SEO-основа.':
    'Dopracovanie webu: nové stránky, oprava chýb, rýchlosť a SEO základ.',
  'Впровадження CRM та інтеграція з магазином: автоматизація заявок, замовлень і повторних продажів.':
    'Zavedenie CRM a prepojenie s obchodom: automatizácia dopytov, objednávok a opakovaných predajov.',
  'Email-маркетинг і автоматичні розсилки: покинутий кошик, повторні покупки, ріст LTV.':
    'E-mailový marketing a automatické kampane: opustený košík, opakované nákupy, rast LTV.',
  'SEO-аудит сайту: технічні помилки, контент, структура і план просування в Google.':
    'SEO audit webu: technické chyby, obsah, štruktúra a plán na rast v Google.',
  'SEO-просування інтернет-магазину в Google: ріст органічного трафіку та продажів.':
    'SEO pre e-shop v Google: rast organickej návštevnosti a predaja.',
  'Оптимізація бренду для AI-пошуку, щоб ChatGPT, Perplexity і Gemini рекомендували вас.':
    'Optimalizácia značky pre AI vyhľadávanie, aby vás ChatGPT, Perplexity a Gemini odporúčali.',
  'Відкриття та налаштування магазину на Etsy: лістинги, SEO, оформлення та політики.':
    'Otvorenie a nastavenie obchodu na Etsy: listingy, SEO, vzhľad a pravidlá.',
  'Ведення Etsy-магазину: оптимізація лістингів, Etsy SEO, реклама та аналітика.':
    'Správa obchodu na Etsy: optimalizácia listingov, Etsy SEO, reklama a analytika.',
  'Відкриття та ведення магазину на eBay для продажів у США та Європі.':
    'Otvorenie a správa obchodu na eBay pre predaj v USA a Európe.',
  'Відкриття магазину на Amazon Handmade для виробників товарів ручної роботи.':
    'Otvorenie obchodu na Amazon Handmade pre výrobcov ručných výrobkov.',
  'Ведення Amazon Handmade: лістинги, Amazon SEO, реклама та контроль показників.':
    'Správa Amazon Handmade: listingy, Amazon SEO, reklama a sledovanie výsledkov.',
  'Розміщення товарів на агрегаторах і прайс-площадках для додаткових продажів.':
    'Umiestnenie produktov na porovnávačoch a cenníkových portáloch pre ďalší predaj.',
  'Відкриття та налаштування B2B-магазину на Alibaba для пошуку оптових покупців.':
    'Otvorenie a nastavenie B2B obchodu na Alibabe pre hľadanie veľkoodberateľov.',
  'Ведення Alibaba-магазину: каталог, запити покупців, реклама та аналітика.':
    'Správa obchodu na Alibabe: katalóg, dopyty kupujúcich, reklama a analytika.',
  'Розміщення компанії в міжнародних B2B-каталогах для пошуку оптових клієнтів.':
    'Zápis firmy do medzinárodných B2B katalógov pre hľadanie veľkoodberateľov.',
  'Створення та ведення бізнес-акаунта Pinterest: дошки, піни, трафік на магазин.':
    'Vytvorenie a správa biznis účtu na Pintereste: nástenky, piny, návštevnosť obchodu.',
  'Автоматизація Pinterest: регулярний постинг пінів без ручної роботи.':
    'Automatizácia Pinterestu: pravidelné pridávanie pinov bez ručnej práce.',
  'Реклама в Pinterest для залучення покупців на сайт і маркетплейси.':
    'Reklama na Pintereste, ktorá privádza kupujúcich na web a marketplace.',
  'Створення та налаштування YouTube-каналу бренду для залучення покупців.':
    'Vytvorenie a nastavenie značkového YouTube kanála na získanie zákazníkov.',
  'Ведення YouTube-каналу та підключення YouTube Shopping для продажу товарів.':
    'Správa YouTube kanála a zapojenie YouTube Shopping na predaj produktov.',
  'Базовий брендбук: логотип, кольори, шрифти та правила використання.':
    'Základný brand book: logo, farby, písma a pravidlá použitia.',
  'Повний брендбук для e-commerce бренду: айдентика, носії, гайдлайни.':
    'Kompletný brand book pre e-commerce značku: identita, nosiče, manuál.',
  'Розробка логотипу, який працює на сайті, маркетплейсах і упаковці.':
    'Logo, ktoré funguje na webe, na marketplace aj na obale.',
  'Ребрендинг: оновлення айдентики та позиціонування для нових ринків.':
    'Rebranding: obnova identity a pozicioningu pre nové trhy.',
  'Оформлення стенду та матеріалів для участі у міжнародних виставках.':
    'Príprava stánku a materiálov na medzinárodné veľtrhy.',
  'Google Ads для інтернет-магазину: пошукова, торгова та медійна реклама з фокусом на ROAS.':
    'Google Ads pre e-shop: vyhľadávacie, nákupné a obsahové kampane so zameraním na ROAS.',
  'Реклама в Instagram і Facebook: запуск кампаній, креативи та оптимізація.':
    'Reklama na Instagrame a Facebooku: spustenie kampaní, kreatíva a optimalizácia.',
  'Реклама в TikTok для e-commerce: кампанії та креативи під ваш продукт.':
    'Reklama na TikToku pre e-commerce: kampane a kreatíva pre váš produkt.',
  'Реклама в Pinterest для трафіку на маркетплейси та власний сайт.':
    'Reklama na Pintereste pre návštevnosť marketplace aj vlastného webu.',
  'Відеореклама на YouTube: таргетинг, креативи та аналітика конверсій.':
    'Videoreklama na YouTube: cielenie, kreatíva a analytika konverzií.',
  'Реклама в ChatGPT: показуємо ваш продукт там, де покупці вже питають поради в AI.':
    'Reklama v ChatGPT: ukážeme váš produkt tam, kde si kupujúci už pýtajú radu od AI.',
  'Реклама на маркетплейсах: Etsy Ads та Amazon Ads для росту видимості товарів.':
    'Reklama na marketplace: Etsy Ads a Amazon Ads pre lepšiu viditeľnosť produktov.',
  'Консультації для e-commerce компаній з продажів, маркетингу та маркетплейсів.':
    'Konzultácie pre e-commerce firmy o predaji, marketingu a marketplace.',
  'Аудит e-commerce процесів: знаходимо, де бізнес втрачає час і гроші.':
    'Audit e-commerce procesov: nájdeme, kde firma stráca čas a peniaze.',
  'Покращення конверсії сайту та маркетплейсів для росту продажів.':
    'Zlepšenie konverzie webu a marketplace pre rast predaja.',
  'Погодинний супровід вашої команди з e-commerce та маркетингу.':
    'Hodinová podpora vášho tímu v e-commerce a marketingu.',
  'AI-консультації: впровадження AI-інструментів у маркетинг і продажі.':
    'AI konzultácie: zavedenie AI nástrojov do marketingu a predaja.',

  // --- prípadové štúdie ---
  'Створення Ecommerce бізнесу під ключ. Назва, розробка, дизайн, анімація, B2B та B2C продажі':
    'E-commerce biznis na kľúč: názov, vývoj, dizajn, animácia, B2B aj B2C predaj',
  'Розробка B2B платформи для продажу на Shopify. Принцип, який економить +20 000$/рік.':
    'B2B predajná platforma na Shopify. Riešenie, ktoré ušetrí viac než 20 000 $ ročne.',
  'Висококонверсійні лендінги для перевірки попиту на продукт':
    'Landing pages s vysokou konverziou na overenie dopytu po produkte',
  'Pinterest Ads для B2B-бренду весільних суконь у Франції': 'Pinterest Ads pre B2B značku svadobných šiat vo Francúzsku',
  '17 000': '17 000',
  'переходів на сайт щомісяця': 'návštev webu mesačne',
  Франція: 'Francúzsko',
  'Pinterest Ads для інтернет-магазину декору в Німеччині та Польщі': 'Pinterest Ads pre e-shop s dekoráciami v Nemecku a Poľsku',
  '4,1x': '4,1x',
  'ROAS, 1 050 замовлень за 6 місяців': 'ROAS, 1 050 objednávok za 6 mesiacov',
  'Декор для дому': 'Bytové doplnky',
  'Запуск реклами Pinterest Ads': 'Spustenie reklamy Pinterest Ads',
  'Інтернет-магазин для продажу власних і партнерських продуктів':
    'E-shop na predaj vlastných aj partnerských produktov',
  'Реалізація дизайну, створення бренду для навчального холдингу A+':
    'Realizácia dizajnu a tvorba značky pre vzdelávaciu skupinu A+',
  '+3 роки': '+3 roky',
  'довгостроковий проєкт': 'dlhodobý projekt',
  Зекономлено: 'Ušetrené',
  '+20 000$ / рік': '+20 000 $ / rok',
  'середній чек, за рахунок допродажів': 'priemerná objednávka vďaka doplnkovému predaju',
  ROAS: 'ROAS',
  'середній чек, за рахунок партнерських продажів та правильної побудови магазину':
    'priemerná objednávka vďaka partnerskému predaju a správne postavenému obchodu',
  'маркетинг матеріалів та постійна дизайн підтримка бренду':
    'marketingových materiálov a priebežná dizajnová podpora značky',
  'Продаж овочів': 'Predaj zeleniny',
  Розробка: 'Vývoj',
  'Beauty Дистрибуція': 'Beauty distribúcia',
  Аналітика: 'Analytika',
  'Весільні сукні': 'Svadobné šaty',
  Освіта: 'Vzdelávanie',
  Дизайн: 'Dizajn',
  Брендинг: 'Branding',

  // --- „výsledok, nie proces“ ---
  'Чіткі цілі': 'Jasné ciele',
  'Перед стартом визначаємо цілі бізнесу, ключові ринки та KPI — щоб кожен етап роботи наближав вас до зростання продажів.':
    'Pred štartom určíme ciele firmy, kľúčové trhy a KPI — aby vás každá fáza priblížila k rastu predaja.',
  'Фокус на дохід': 'Zameranie na tržby',
  'Оцінюємо успіх за реальним зростанням продажів, прибутку та масштабуванням бізнесу, а не кількістю виконаних завдань.':
    'Úspech meriame reálnym rastom predaja, zisku a rozsahu firmy, nie počtom splnených úloh.',
  'Прозорий процес': 'Priehľadný proces',
  'Аналіз → Стратегія → Запуск → Масштабування — на кожному етапі ви розумієте, що робимо і навіщо.':
    'Analýza → Stratégia → Spustenie → Škálovanie: v každej fáze viete, čo robíme a prečo.',
  'Регулярна звітність': 'Pravidelné reporty',
  'Регулярно показуємо результати, ключові показники та наступні кроки, щоб ви завжди бачили розвиток проєкту.':
    'Pravidelne ukazujeme výsledky, kľúčové čísla a ďalšie kroky, aby ste videli vývoj projektu.',

  // --- nástroje ---
  'Калькулятор прибутку Etsy': 'Kalkulačka zisku na Etsy',
  'Порахуйте чистий прибуток, комісії Etsy, маржу та місячний дохід за хвилину.':
    'Za minútu vypočítate čistý zisk, poplatky Etsy, maržu a mesačné tržby.',
  'Калькулятор ціноутворення Etsy': 'Kalkulačka cien na Etsy',
  'Введіть витрати і бажану маржу — отримайте мінімальну та рекомендовану ціну продажу з урахуванням всіх комісій.':
    'Zadajte náklady a želanú maržu — dostanete minimálnu a odporúčanú predajnú cenu vrátane všetkých poplatkov.',
  'Etsy vs Amazon vs Shopify': 'Etsy vs Amazon vs Shopify',
  'Порівняйте комісії та прибуток на трьох платформах — введіть параметри товару і дізнайтесь, як вигідніше продавати.':
    'Porovnajte poplatky a zisk na troch platformách — zadajte parametre produktu a zistite, kde sa oplatí predávať.',
  'Ресайзер зображень': 'Zmena veľkosti obrázkov',
  'Змінюйте розмір фото для Instagram, Etsy, Pinterest та інших платформ з пресетами.':
    'Zmeňte veľkosť fotiek pre Instagram, Etsy, Pinterest a ďalšie platformy pomocou predvolieb.',
  SEOgenie: 'SEOgenie',
  'AI-додаток для продавців Etsy: заголовок, 13 тегів і опис за 30 секунд, SEO-аудит лістингів і публікація прямо в магазин. 7 днів безкоштовно.':
    'AI aplikácia pre predajcov na Etsy: názov, 13 tagov a popis za 30 sekúnd, SEO audit listingov a publikovanie priamo do obchodu. 7 dní zadarmo.',

  // --- referencie ---
  'Повідомлення від Ірини': 'Správa od Iryny',
  '+320% конверсія': '+320 % konverzia',
  'Розробка висококонверсійного інтернет-магазину для продукту в ніші краси':
    'Vývoj e-shopu s vysokou konverziou pre produkt v segmente krásy',
  Ірина: 'Iryna',
  'Засновниця · Проект під NDA, але відгук ні': 'Zakladateľka · Projekt pod NDA, referencia nie',
  'Наталія, Beauty Brand Pro': 'Natália, Beauty Brand Pro',
  '«Ви зекономили мені більше 20 тисяч доларів на рік завдяки альтернативній платформі замість Shopify B2B пакету»':
    '„Ušetrili ste mi viac než 20-tisíc dolárov ročne vďaka alternatívnej platforme namiesto balíka Shopify B2B.“',
  Наталія: 'Natália',
  'Засновниця · Beauty Brand Pro': 'Zakladateľka · Beauty Brand Pro',
  'Наталія, NataBelz': 'Natália, NataBelz',
  '«Людяний, структурний підхід, реалізація зазначених планів, яка дає результат»':
    '„Ľudský a štruktúrovaný prístup a plnenie dohodnutých plánov, ktoré prináša výsledok.“',
  'Засновниця · NataBelz': 'Zakladateľka · NataBelz',
  'Попередній відгук': 'Predchádzajúca referencia',
  'Наступний відгук': 'Ďalšia referencia',
  'Дивитись відео-відгук': 'Pozrieť videoreferenciu',
  'Попередній кейс': 'Predchádzajúci prípad',
  'Наступний кейс': 'Ďalší prípad',

  'Система продажів': 'Predajný systém',
  ' на міжнародному ринку': ' na medzinárodnom trhu',

  // --- FAQ ---
  'Як вийти на міжнародні маркетплейси з українським товаром?':
    'Ako sa dostať s produktom na medzinárodné marketplace?',
  'Koshman Ecom супроводжує весь шлях: аналізуємо продукт і попит, обираємо майданчик (Etsy, Amazon, eBay або Alibaba для B2B), реєструємо й налаштовуємо магазин, оформлюємо лістинги з SEO та запускаємо рекламу. Після запуску ведемо магазин і стежимо за продажами.':
    'Koshman Ecom vás sprevádza celou cestou: analyzujeme produkt a dopyt, vyberieme platformu (Etsy, Amazon, eBay alebo Alibaba pre B2B), zaregistrujeme a nastavíme obchod, pripravíme listingy so SEO a spustíme reklamu. Po štarte obchod vedieme a sledujeme predaj.',
  'Що краще для старту: Etsy, Amazon чи власний сайт на Shopify?':
    'Čo je lepšie na štart: Etsy, Amazon alebo vlastný web na Shopify?',
  'Etsy підходить для handmade, вінтажу та дизайнерських товарів і дає покупців з першого дня. Amazon — для масових товарів і більших обсягів. Shopify — для бренду, якому потрібна власна база клієнтів без залежності від комісій майданчика. Часто найкраще працює комбінація. Порівняти платформи можна в нашому безкоштовному інструменті Etsy vs Amazon vs Shopify.':
    'Etsy sa hodí pre handmade, vintage a dizajnové produkty a prináša kupujúcich od prvého dňa. Amazon je pre masové produkty a väčšie objemy. Shopify je pre značku, ktorá chce vlastnú databázu zákazníkov bez závislosti od poplatkov platformy. Často funguje najlepšie kombinácia. Platformy porovnáte v našom bezplatnom nástroji Etsy vs Amazon vs Shopify.',
  'Скільки коштує відкрити магазин на Etsy або Amazon з агенцією?':
    'Koľko stojí otvorenie obchodu na Etsy alebo Amazone s agentúrou?',
  'Вартість залежить від кількості товарів, ринку та обсягу робіт: лише запуск магазину чи запуск разом із веденням і рекламою. Точну ціну називаємо після короткого брифу, перша консультація безкоштовна.':
    'Cena závisí od počtu produktov, trhu a rozsahu prác: iba spustenie obchodu alebo spustenie spolu so správou a reklamou. Presnú cenu povieme po krátkom briefe, prvá konzultácia je zadarmo.',
  'Чи працюєте з малим бізнесом і тими, хто починає з нуля?':
    'Pracujete aj s malými firmami a tými, čo začínajú od nuly?',
  'Так, більшість наших клієнтів запускали онлайн-продажі з нуля. Починаємо з аудиту продукту та плану розвитку, щоб бюджет ішов на канали, які дадуть найшвидшу віддачу.':
    'Áno, väčšina našich klientov spúšťala online predaj od nuly. Začíname auditom produktu a plánom rastu, aby rozpočet išiel do kanálov s najrýchlejšou návratnosťou.',
  'Що таке оптимізація для AI-пошуку і навіщо вона інтернет-магазину?':
    'Čo je optimalizácia pre AI vyhľadávanie a načo je e-shopu?',
  'Дедалі більше покупців шукають товари через ChatGPT, Perplexity і Gemini. Оптимізація для AI-пошуку — це робота з контентом сайту, структурованими даними та згадками бренду, щоб AI-асистенти рекомендували саме вас. Ми поєднуємо її з класичним SEO-просуванням у Google.':
    'Čoraz viac kupujúcich hľadá produkty cez ChatGPT, Perplexity a Gemini. Optimalizácia pre AI vyhľadávanie je práca s obsahom webu, štruktúrovanými dátami a zmienkami o značke, aby vás AI asistenti odporúčali. Spájame ju s klasickým SEO v Google.',
  'Чи можна замовити розробку сайту, SEO і рекламу в одній агенції?':
    'Dá sa objednať vývoj webu, SEO aj reklamu v jednej agentúre?',
  'Так, Koshman Ecom — агенція повного циклу: стратегія, розробка на Shopify, WordPress чи Хорошоп, SEO, реклама в Google, Meta, TikTok і Pinterest, email-маркетинг і CRM. За результат відповідає одна команда, без передачі задач між підрядниками.':
    'Áno, Koshman Ecom je agentúra s plným cyklom: stratégia, vývoj na Shopify, WordPresse či Horoshope, SEO, reklama v Google, Meta, TikToku a Pintereste, e-mailový marketing a CRM. Za výsledok zodpovedá jeden tím, bez odovzdávania úloh medzi dodávateľmi.',
  'З чого почати співпрацю з e-commerce агенцією?':
    'Ako začať spoluprácu s e-commerce agentúrou?',
  'Зі стратегічного аудиту або безкоштовної консультації. Розбираємо бізнес, продукт і конкурентів, радимо, які напрями дадуть найшвидший результат, і готуємо план робіт зі строками та вартістю.':
    'Strategickým auditom alebo bezplatnou konzultáciou. Rozoberieme biznis, produkt a konkurenciu, poradíme, ktoré smery prinesú výsledok najrýchlejšie, a pripravíme plán prác s termínmi a cenou.',
  'Чи працюєте ви з клієнтами з Європи та США?':
    'Pracujete s klientmi z Európy a USA?',
  'Так. Маємо офіси в Києві та Кошицях (Словаччина) і працюємо з клієнтами по всьому світу українською, англійською та словацькою. Допомагаємо виходити на ринки ЄС, США та інші.':
    'Áno. Máme kancelárie v Kyjeve a v Košiciach a pracujeme s klientmi po celom svete v ukrajinčine, angličtine aj slovenčine. Pomáhame vstúpiť na trhy EÚ, USA a ďalšie.',
  // --- stránky: O nás, Kontakty, Kariéra, Ďakujeme, Podmienky ---
  'Про нас': 'O nás',
  Контакти: 'Kontakty',
  Карʼєра: 'Kariéra',
  Команда: 'Tím',
  Напрямки: 'Smery',
  Вакансії: 'Voľné pozície',
  Документи: 'Dokumenty',
  Зміст: 'Obsah',
  Позиція: 'Pozícia',
  Відгук: 'Prihláška',
  'Маркетингова агенція для e-commerce бізнесу': 'Marketingová agentúra pre e-commerce',
  'Koshman Ecom — команда повного циклу для онлайн-продажів. Створюємо сайти та інтернет-магазини, запускаємо рекламу на будь-якому майданчику, виводимо бренди на маркетплейси й автоматизуємо процеси за допомогою AI. Працюємо з B2C та B2B бізнесами на локальних і міжнародних ринках.':
    'Koshman Ecom je tím s plným cyklom pre online predaj. Tvoríme weby a e-shopy, spúšťame reklamu na akejkoľvek platforme, privádzame značky na marketplace a automatizujeme procesy pomocou AI. Pracujeme s B2C aj B2B firmami na domácich i zahraničných trhoch.',
  'Наш фокус': 'Náš fokus',
  'Фокус на стабільні продажі, а не разові запуски':
    'Zameriavame sa na stabilný predaj, nie jednorazové spustenia',
  'Ми обʼєднуємо стратегію, операційну підтримку та AI-автоматизацію в єдиний робочий процес, щоб бізнес зростав стабільно.':
    'Spájame stratégiu, prevádzkovú podporu a AI automatizáciu do jedného procesu, aby firma rástla stabilne.',
  'років досвіду': 'rokov skúseností',
  'Міжнародні платформи та ринки.': 'Medzinárodné platformy a trhy.',
  'років розробки сайтів': 'rokov tvorby webov',
  'Впроваджуємо AI у бізнес': 'Zavádzame AI do biznisu',
  'Автоматизуємо контент, рутину й аналітику, щоб команда працювала швидше.':
    'Automatizujeme obsah, rutinu a analytiku, aby tím pracoval rýchlejšie.',
  'Наша місія': 'Naša misia',
  'Наша місія — допомагати брендам і виробникам з будь-якої країни продавати по всьому світу. Ми віримо, що локальний бізнес може стати глобальним, якщо правильно побудувати продукт, маркетинг і систему продажів.':
    'Našou misiou je pomáhať značkám a výrobcom z ktorejkoľvek krajiny predávať po celom svete. Veríme, že lokálna firma sa môže stať globálnou, ak správne postaví produkt, marketing a predajný systém.',
  'Наш підхід': 'Náš prístup',
  'Ми працюємо не як класична маркетингова агенція. Наша задача — побудувати робочу систему продажів, а не просто зробити сайт або рекламу.':
    'Nepracujeme ako klasická marketingová agentúra. Našou úlohou je postaviť fungujúci predajný systém, nielen web alebo reklamu.',
  'Що ми робимо': 'Čo robíme',
  'Хто стоїть за агенцією': 'Kto stojí za agentúrou',
  'Ми — команда засновників, яка поєднує стратегічний e-commerce та системний маркетинг. Нижче — коротко про ключових людей, які відповідають за результат.':
    'Sme tím zakladateľov, ktorý spája strategický e-commerce a systematický marketing. Nižšie je krátko o kľúčových ľuďoch zodpovedných za výsledok.',
  'Станьте частиною Koshman Ecom': 'Staňte sa súčasťou Koshman Ecom',
  'Шукаємо людей, яким цікаво запускати бренди на міжнародних ринках і рости разом із нами. Готові до нового кроку в карʼєрі?':
    'Hľadáme ľudí, ktorých baví spúšťať značky na zahraničných trhoch a rásť s nami. Ste pripravení na ďalší krok v kariére?',
  'Переглянути вакансії': 'Pozrieť voľné pozície',
  'Обговорити проєкт': 'Prebrať projekt',
  'Звʼяжіться з нами': 'Kontaktujte nás',
  'Відповідаємо протягом робочого дня. Оберіть зручний спосіб або залиште заявку нижче.':
    'Odpovedáme počas pracovného dňa. Vyberte si kanál alebo pošlite dopyt nižšie.',
  'Написати менеджеру': 'Napísať manažérovi',
  'Телефон або Telegram': 'Telefón alebo Telegram',
  Телефон: 'Telefón',
  'Порахувати свій прибуток': 'Vypočítať svoj zisk',
  'Телефон · Україна': 'Telefón · Ukrajina',
  'Телефон · Словаччина': 'Telefón · Slovensko',
  Офіси: 'Kancelárie',
  'Київ, Україна · Кошиці, Словаччина': 'Kyjev, Ukrajina · Košice, Slovensko',
  'Ми в соцмережах': 'Sme na sociálnych sieťach',
  'Будуймо e-commerce разом': 'Budujme e-commerce spoločne',
  'Шукаємо людей, яким цікаво запускати бренди на міжнародних ринках: маркетплейси, реклама, сайти та AI-автоматизація. Працюємо з клієнтами з різних країн.':
    'Hľadáme ľudí, ktorých baví spúšťať značky na zahraničných trhoch: marketplace, reklama, weby a AI automatizácia. Pracujeme s klientmi z rôznych krajín.',
  'Відкриті позиції': 'Otvorené pozície',
  'Надішліть резюме': 'Pošlite životopis',
  'Оберіть позицію та додайте посилання на резюме або портфоліо. Не знайшли свою роль — все одно напишіть, ми переглядаємо кожен відгук.':
    'Vyberte pozíciu a pridajte odkaz na životopis alebo portfólio. Nenašli ste svoju rolu? Napíšte aj tak, čítame každú prihlášku.',
  'Резюме або портфоліо': 'Životopis alebo portfólio',
  'Відгук надіслано': 'Prihláška odoslaná',
  'Надіслати ще один': 'Poslať ďalšiu',
  Імʼя: 'Meno',
  'Вкажіть імʼя та контакт, щоб ми могли звʼязатися.':
    'Uveďte meno a kontakt, aby sme sa vám mohli ozvať.',
  'Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.':
    'Kliknutím na tlačidlo súhlasíte so spracovaním osobných údajov.',
  'Дякуємо за заявку!': 'Ďakujeme za dopyt!',
  'Заявку прийнято': 'Dopyt sme prijali',
  'Менеджер звʼяжеться з вами протягом робочого дня, уточнить задачу й назве вартість.':
    'Manažér sa vám ozve počas pracovného dňa, spresní zadanie a povie cenu.',
  'На головну': 'Na domovskú stránku',
  'Наш Telegram-канал': 'Náš Telegram kanál',
  'Що далі': 'Čo bude ďalej',
  'Умови використання': 'Podmienky používania',
  'Правила користування сайтом Koshman Ecom, безкоштовними інструментами та матеріалами сайту.':
    'Pravidlá používania webu Koshman Ecom, jeho bezplatných nástrojov a materiálov.',
  'Політикою конфіденційності': 'Zásadami ochrany osobných údajov',
  // --- stránka „O nás“ ---
  'Сайти та інтернет-магазини': 'Weby a e-shopy',
  'AI-автоматизація': 'AI automatizácia',
  Продукт: 'Produkt',
  'Позиціонування та цінність.': 'Pozicioning a hodnota.',
  Ринок: 'Trh',
  'Попит і конкурентна стратегія.': 'Dopyt a konkurenčná stratégia.',
  Система: 'Systém',
  'Контент, трафік, AI, операційка.': 'Obsah, návštevnosť, AI, prevádzka.',
  'Запускаємо продажі на маркетплейсах': 'Spúšťame predaj na marketplace',
  'Виходимо на Etsy, Amazon Handmade, eBay та інші платформи.':
    'Vstupujeme na Etsy, Amazon Handmade, eBay a ďalšie platformy.',
  'Створюємо та оптимізуємо магазини на Etsy': 'Tvoríme a optimalizujeme obchody na Etsy',
  'Структура, SEO-листинги, аналітика, регулярне оновлення.':
    'Štruktúra, SEO listingy, analytika a pravidelná aktualizácia.',
  'Окремо розробляємо сайти на Shopify': 'Staviame aj e-shopy na Shopify',
  'Дизайн, UX, інтеграції та готовність до масштабування.':
    'Dizajn, UX, integrácie a pripravenosť na škálovanie.',
  'Знаходимо попит і ніші': 'Hľadáme dopyt a niky',
  'Дані, тренди та аналіз конкурентів перед запуском.':
    'Dáta, trendy a analýza konkurencie pred spustením.',
  'Інтегруємо AI у бізнес-процеси': 'Integrujeme AI do firemných procesov',
  'Автоматизація контенту, рутин та аналітики.': 'Automatizácia obsahu, rutiny a analytiky.',
  'Масштабуємо через рекламу та контент': 'Škálujeme cez reklamu a obsah',
  'Meta, TikTok, Pinterest, SEO та контент-стратегії.':
    'Meta, TikTok, Pinterest, SEO a obsahové stratégie.',
  'Влад Кошман': 'Vlad Koshman',
  Засновник: 'Zakladateľ',
  'Спеціаліст з міжнародного e-commerce. Відповідає за стратегію, запуск продажів та AI-впровадження у бізнес-процеси.':
    'Špecialista na medzinárodný e-commerce. Zodpovedá za stratégiu, spúšťanie predaja a zavádzanie AI do procesov.',
  'Ліза Кошман': 'Liza Koshman',
  Співвласниця: 'Spolumajiteľka',
  'Стратегічна менеджерка в роботі з брендами в Ecommerce. Керівниця відділу роботи з Shopify-екосистемою.':
    'Strategická manažérka pre prácu so značkami v e-commerce. Vedie tím pre ekosystém Shopify.',

  // --- pozície ---
  'Ведення проектів Etsy/Shopify, комунікація з клієнтами та контроль дедлайнів.':
    'Vedenie projektov Etsy/Shopify, komunikácia s klientmi a strážanie termínov.',
  'Налаштування та оптимізація реклами Meta, Google, Pinterest Ads.':
    'Nastavenie a optimalizácia reklamy Meta, Google a Pinterest Ads.',
  'AI‑контент, візуали, описи та автоматизація контент‑процесів.':
    'AI obsah, vizuály, popisy a automatizácia obsahových procesov.',
  'Ведення Etsy‑магазинів: оптимізація лістингів, SEO, аналітика та масштабування.':
    'Vedenie obchodov na Etsy: optimalizácia listingov, SEO, analytika a škálovanie.',
  'Робота з вхідними заявками, комунікація з клієнтами та закриття угод.':
    'Práca s prichádzajúcimi dopytmi, komunikácia s klientmi a uzatváranie obchodov.',
  'Розробка та підтримка Shopify-магазинів, інтеграції та кастомні рішення.':
    'Vývoj a správa e-shopov na Shopify, integrácie a riešenia na mieru.',
  'Remote / Ukraine': 'Remote / Ukrajina',

  // --- „Ďakujeme“ ---
  'Менеджер звʼяжеться з вами': 'Manažér sa vám ozve',
  'Протягом робочого дня, у месенджері або телефоном.':
    'Počas pracovného dňa, cez messenger alebo telefonicky.',
  'Уточнимо задачу': 'Spresníme zadanie',
  'Коротко розпитаємо про продукт, ринок і цілі.':
    'Krátko sa opýtame na produkt, trh a ciele.',
  'Надішлемо пропозицію': 'Pošleme ponuku',
  'План робіт, строки та вартість.': 'Plán prác, termíny a cena.',
  'Оновлено 15 жовтня 2026': 'Aktualizované 15. októbra 2026',
  // --- Podmienky používania ---
  'Загальні положення': 'Všeobecné ustanovenia',
  'Ці умови регулюють користування сайтом Koshman Ecom та безкоштовними інструментами на ньому. Відкриваючи сайт, ви погоджуєтесь з умовами.':
    'Tieto podmienky upravujú používanie webu Koshman Ecom a bezplatných nástrojov na ňom. Otvorením webu s podmienkami súhlasíte.',
  'Якщо ви не згодні з умовами, будь ласка, не користуйтеся сайтом.':
    'Ak s podmienkami nesúhlasíte, web prosím nepoužívajte.',
  'Користування сайтом': 'Používanie webu',
  'Сайт містить інформацію про послуги агенції, кейси, статті блогу та інструменти для e-commerce.':
    'Web obsahuje informácie o službách agentúry, prípadové štúdie, články blogu a nástroje pre e-commerce.',
  'Заборонено втручатися в роботу сайту, автоматично збирати його вміст, намагатися отримати доступ до закритих розділів або використовувати сайт для незаконних дій.':
    'Je zakázané zasahovať do fungovania webu, automaticky sťahovať jeho obsah, pokúšať sa o prístup do uzavretých sekcií alebo web používať na nezákonnú činnosť.',
  Інструменти: 'Nástroje',
  'Калькулятори, порівняння платформ, ресайзер зображень, SEOgenie та інші інструменти надаються безкоштовно і «як є».':
    'Kalkulačky, porovnanie platforiem, zmena veľkosti obrázkov, SEOgenie a ďalšie nástroje sú poskytované zadarmo a „tak, ako sú“.',
  'Результати розрахунків орієнтовні та залежать від введених даних і актуальних тарифів платформ. Вони не є фінансовою, податковою чи юридичною консультацією.':
    'Výsledky výpočtov sú orientačné a závisia od zadaných údajov a aktuálnych poplatkov platforiem. Nie sú finančným, daňovým ani právnym poradenstvom.',
  'Ми можемо змінювати, обмежувати або вимикати інструменти без попередження.':
    'Nástroje môžeme meniť, obmedziť alebo vypnúť bez predchádzajúceho upozornenia.',
  'Авторські права': 'Autorské práva',
  'Тексти, дизайн, логотип, графіка, кейси та код сайту належать Koshman Ecom або використовуються за ліцензією.':
    'Texty, dizajn, logo, grafika, prípadové štúdie a kód webu patria Koshman Ecom alebo sú použité na základe licencie.',
  'Цитування матеріалів дозволене з активним посиланням на сайт. Інше копіювання чи комерційне використання потребує нашої письмової згоди.':
    'Citovanie materiálov je povolené s aktívnym odkazom na web. Iné kopírovanie či komerčné použitie vyžaduje náš písomný súhlas.',
  'Назви та логотипи Etsy, Amazon, Shopify, Pinterest, YouTube та інших платформ належать їхнім власникам.':
    'Názvy a logá Etsy, Amazon, Shopify, Pinterest, YouTube a ďalších platforiem patria ich vlastníkom.',
  'Заявки та послуги': 'Dopyty a služby',
  'Інформація на сайті не є публічною офертою. Вартість, строки та обсяг робіт узгоджуються індивідуально й фіксуються в договорі.':
    'Informácie na webe nie sú verejnou ponukou. Cena, termíny a rozsah prác sa dohodnú individuálne a zafixujú v zmluve.',
  'Обмеження відповідальності': 'Obmedzenie zodpovednosti',
  'Ми докладаємо зусиль, щоб інформація на сайті була точною, але не гарантуємо її повноту й актуальність.':
    'Snažíme sa, aby informácie na webe boli presné, nezaručujeme však ich úplnosť a aktuálnosť.',
  'Ми не відповідаємо за збитки, що виникли через використання сайту, інструментів або рішення, ухвалені на основі їхніх результатів.':
    'Nezodpovedáme za škody vzniknuté používaním webu, nástrojov ani za rozhodnutia prijaté na základe ich výsledkov.',
  'Результати кейсів залежать від продукту, ринку та бюджету клієнта і не гарантують таких самих результатів для інших бізнесів.':
    'Výsledky prípadových štúdií závisia od produktu, trhu a rozpočtu klienta a nezaručujú rovnaké výsledky iným firmám.',
  'Посилання на інші сайти': 'Odkazy na iné weby',
  'Сайт може містити посилання на сторонні ресурси. Ми не контролюємо їхній вміст і не відповідаємо за їхню роботу та політику конфіденційності.':
    'Web môže obsahovať odkazy na externé zdroje. Nekontrolujeme ich obsah a nezodpovedáme za ich fungovanie ani za ich zásady ochrany osobných údajov.',
  'Зміни умов': 'Zmeny podmienok',
  'Ми можемо оновлювати ці умови. Нова редакція діє з моменту публікації на цій сторінці.':
    'Tieto podmienky môžeme aktualizovať. Nové znenie platí od zverejnenia na tejto stránke.',
  'Застосовне право': 'Rozhodné právo',
  'Умови регулюються законодавством України. Для користувачів з ЄС також застосовуються обовʼязкові норми законодавства ЄС.':
    'Podmienky sa riadia právom Ukrajiny. Pre používateľov z EÚ platia aj záväzné ustanovenia práva EÚ.',
  'Спори вирішуємо шляхом переговорів, а якщо домовитися не вдалося — у суді за місцем реєстрації виконавця.':
    'Spory riešime rokovaním a ak sa nedohodneme, na súde podľa sídla dodávateľa.',
  'Надіслати відгук': 'Odoslať prihlášku',
  Контент: 'Obsah',
  'Надсилаючи заявку, ви підтверджуєте, що вказали достовірні дані та погоджуєтесь на їх обробку згідно з':
    'Odoslaním dopytu potvrdzujete, že uvedené údaje sú pravdivé, a súhlasíte s ich spracovaním podľa našich',
  // --- Zásady ochrany osobných údajov ---
  'Політика конфіденційності': 'Zásady ochrany osobných údajov',
  'Як Koshman Ecom збирає, використовує та захищає дані відвідувачів сайту й клієнтів.':
    'Ako Koshman Ecom zbiera, používa a chráni údaje návštevníkov webu a klientov.',
  'Хто ми': 'Kto sme',
  'Koshman Ecom — маркетинг-агенція для e-commerce бізнесів з офісами в Києві (Україна) та Кошицях (Словаччина). Ми є володільцем персональних даних, які ви передаєте через цей сайт.':
    'Koshman Ecom je marketingová agentúra pre e-commerce firmy s kanceláriami v Kyjeve (Ukrajina) a v Košiciach (Slovensko). Sme prevádzkovateľom osobných údajov, ktoré nám posielate cez tento web.',
  'З питань обробки даних пишіть на': 'S otázkami k spracovaniu údajov píšte na',
  'Які дані ми збираємо': 'Aké údaje zbierame',
  'Дані, які ви вказуєте у формах: імʼя, телефон або Telegram, email, коментар до заявки, обрані послуги.':
    'Údaje, ktoré uvádzate vo formulároch: meno, telefón alebo Telegram, e-mail, poznámku k dopytu a vybrané služby.',
  'Технічні дані: IP-адреса, тип браузера й пристрою, сторінки, які ви переглядали, джерело переходу. Їх збирають файли cookie та сервіси аналітики.':
    'Technické údaje: IP adresa, typ prehliadača a zariadenia, zobrazené stránky a zdroj návštevy. Zbierajú ich cookies a analytické služby.',
  'Навіщо ми їх використовуємо': 'Načo ich používame',
  'Щоб звʼязатися з вами щодо заявки, уточнити задачу й підготувати пропозицію.':
    'Aby sme sa vám ozvali k dopytu, spresnili zadanie a pripravili ponuku.',
  'Щоб виконувати договір, якщо ви стали нашим клієнтом.':
    'Aby sme plnili zmluvu, ak ste sa stali naším klientom.',
  'Щоб аналізувати відвідуваність і покращувати сайт.':
    'Aby sme analyzovali návštevnosť a zlepšovali web.',
  'Ми не надсилаємо рекламні розсилки без вашої окремої згоди.':
    'Reklamné e-maily neposielame bez vášho osobitného súhlasu.',
  'Правові підстави': 'Právne základy',
  'Ми обробляємо дані відповідно до Закону України «Про захист персональних даних» та Загального регламенту ЄС про захист даних (GDPR).':
    'Údaje spracúvame podľa ukrajinského zákona „O ochrane osobných údajov“ a Všeobecného nariadenia EÚ o ochrane údajov (GDPR).',
  'Підстави обробки: ваша згода, укладення й виконання договору, наш законний інтерес у роботі та безпеці сайту.':
    'Základy spracovania: váš súhlas, uzavretie a plnenie zmluvy a náš oprávnený záujem na fungovaní a bezpečnosti webu.',
  'Файли cookie': 'Cookies',
  'Сайт використовує необхідні cookie для роботи сторінок і аналітичні cookie для статистики відвідувань.':
    'Web používa nevyhnutné cookies pre fungovanie stránok a analytické cookies pre štatistiku návštev.',
  'Ви можете вимкнути або видалити cookie в налаштуваннях браузера. Частина функцій сайту після цього може працювати некоректно.':
    'Cookies môžete vypnúť alebo vymazať v nastaveniach prehliadača. Niektoré funkcie webu potom nemusia fungovať správne.',
  'Передача третім особам': 'Poskytovanie tretím stranám',
  'Ми не продаємо й не передаємо ваші дані для маркетингу інших компаній.':
    'Vaše údaje nepredávame ani neposkytujeme na marketing iných firiem.',
  'Дані можуть оброблятися нашими підрядниками: хостинг, CRM, сервіси аналітики та месенджери. Вони отримують лише те, що потрібно для їхньої роботи, і зобовʼязані захищати ці дані.':
    'Údaje môžu spracúvať naši dodávatelia: hosting, CRM, analytické služby a messengery. Dostávajú len to, čo potrebujú na svoju prácu, a sú povinní tieto údaje chrániť.',
  'Ми розкриваємо дані державним органам лише у випадках, передбачених законом.':
    'Štátnym orgánom údaje poskytujeme len v prípadoch stanovených zákonom.',
  'Строк зберігання': 'Doba uchovávania',
  'Дані із заявок зберігаємо до 3 років після останнього контакту або до відкликання згоди.':
    'Údaje z dopytov uchovávame do 3 rokov od posledného kontaktu alebo do odvolania súhlasu.',
  'Дані клієнтів зберігаємо протягом строку дії договору та строку, встановленого законодавством для бухгалтерських документів.':
    'Údaje klientov uchovávame počas trvania zmluvy a po dobu stanovenú zákonom pre účtovné doklady.',
  'Ваші права': 'Vaše práva',
  'Ви можете в будь-який момент запросити доступ до своїх даних, їх виправлення, видалення або обмеження обробки, а також відкликати згоду.':
    'Kedykoľvek môžete požiadať o prístup k svojim údajom, ich opravu, vymazanie alebo obmedzenie spracovania a odvolať súhlas.',
  'Щоб скористатися правом, напишіть нам на email. Відповідаємо протягом 30 днів.':
    'Ak si chcete uplatniť právo, napíšte nám e-mail. Odpovedáme do 30 dní.',
  'Ви також маєте право подати скаргу до Уповноваженого Верховної Ради України з прав людини або до наглядового органу країни ЄС.':
    'Máte tiež právo podať sťažnosť ukrajinskému ombudsmanovi pre ľudské práva alebo dozornému orgánu v krajine EÚ.',
  'Зміни до політики': 'Zmeny zásad',
  'Ми можемо оновлювати цю політику. Актуальна версія завжди доступна на цій сторінці, дата оновлення вказана вгорі.':
    'Tieto zásady môžeme aktualizovať. Aktuálna verzia je vždy na tejto stránke, dátum aktualizácie je uvedený hore.',
};

export default sk;
