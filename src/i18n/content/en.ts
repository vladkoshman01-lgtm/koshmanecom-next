/**
 * Англійські переклади контенту з файлів `src/data/*`.
 *
 * Ключ — український рядок-оригінал: якщо перекладу немає, показуємо
 * українською, а не порожнечу. Чернетка від Claude, чекає вичитки клієнта.
 */
const en: Record<string, string> = {
  // --- категорії послуг ---
  'Стратегія та план розвитку': 'Strategy and growth plan',
  'Розробка Shopify': 'Shopify development',
  'Інші розробки': 'Other development',
  'Розробка сайтів': 'Website development',
  'Повторні продажі та LTV': 'Repeat sales and LTV',
  SEO: 'SEO',
  'Міжнародні маркетплейси': 'International marketplaces',
  Pinterest: 'Pinterest',
  YouTube: 'YouTube',
  'Брендинг та дизайн': 'Branding and design',
  Реклама: 'Advertising',
  'E-commerce консалтинг': 'E-commerce consulting',

  // --- чипи «моя задача» ---
  'Не знаю, з чого почати': 'Not sure where to start',
  'Хочу вийти на міжнародний ринок': 'I want to go international',
  'Хочу продавати на Etsy': 'I want to sell on Etsy',
  'Хочу сайт на Shopify': 'I want a Shopify store',
  'Хочу оновити бренд': 'I want to refresh my brand',
  'Хочу сайт': 'I want a website',
  'Хочу зʼявлятися в AI-пошуку': 'I want to show up in AI search',
  'Хочу з’являтися в AI-пошуку': 'I want to show up in AI search',
  'Хочу запустити рекламу': 'I want to launch ads',

  // --- послуги: назви ---
  'Аналіз бізнесу': 'Business analysis',
  'Канали продажів': 'Sales channels',
  'План розвитку': 'Growth plan',
  'Shopify CRO аудит': 'Shopify CRO audit',
  'CRO аудит інтернет-магазину': 'Online store CRO audit',
  'Аудит Etsy': 'Etsy audit',
  Консультація: 'Consultation',
  Доопрацювання: 'Improvements',
  'B2B Shopify (опт)': 'B2B Shopify (wholesale)',
  'CRO аудит': 'CRO audit',
  'Самописний сайт': 'Custom-built website',
  'Бази даних': 'Databases',
  Хорошоп: 'Horoshop',
  'Wix / Webflow': 'Wix / Webflow',
  WordPress: 'WordPress',
  CRM: 'CRM',
  'Email-маркетинг': 'Email marketing',
  'SEO аудит': 'SEO audit',
  'SEO просування': 'SEO growth',
  'AI-пошук': 'AI search',
  'Etsy магазин': 'Etsy store setup',
  'Ведення Etsy': 'Etsy store management',
  'eBay магазин': 'eBay store setup',
  'Amazon Handmade': 'Amazon Handmade',
  'Ведення Amazon': 'Amazon management',
  Агрегатори: 'Price aggregators',
  'Alibaba магазин': 'Alibaba store setup',
  'Ведення Alibaba': 'Alibaba management',
  'B2B каталоги': 'B2B directories',
  'Ведення акаунта': 'Account management',
  Автоматизація: 'Automation',
  'Pinterest Ads': 'Pinterest Ads',
  'YouTube канал': 'YouTube channel',
  'Ведення каналу': 'Channel management',
  'Брендбук базовий': 'Basic brand book',
  Брендбук: 'Brand book',
  Логотип: 'Logo',
  Ребрендинг: 'Rebranding',
  Виставки: 'Trade shows',
  'Google Ads': 'Google Ads',
  'Meta Ads': 'Meta Ads',
  'TikTok Ads': 'TikTok Ads',
  'YouTube Ads': 'YouTube Ads',
  'GPT Ads': 'GPT Ads',
  Маркетплейси: 'Marketplace ads',
  Консультації: 'Consulting',
  'Аудит процесів': 'Process audit',
  Конверсія: 'Conversion rate',
  Супровід: 'Ongoing support',
  'AI-консультації': 'AI consulting',

  // --- послуги: описи ---
  'Аналіз бізнесу, продукту та конкурентів: знаходимо точки росту онлайн-продажів.':
    'Analysis of your business, product and competitors: we find the growth points for online sales.',
  'Підбір каналів продажів: сайт, маркетплейси, соцмережі та реклама під ваш продукт.':
    'Choosing sales channels: website, marketplaces, social media and ads that fit your product.',
  'Покроковий план розвитку e-commerce напрямку з цілями, бюджетом і метриками.':
    'A step-by-step e-commerce growth plan with goals, budget and metrics.',
  'Аудит Shopify-магазину і план росту продажів без додаткових витрат на рекламу.':
    'A Shopify store audit and a plan to grow sales without extra ad spend.',
  'CRO-аудит інтернет-магазину: знаходимо, де втрачаються покупці, і підвищуємо конверсію.':
    'An online store CRO audit: we find where customers drop off and raise conversion.',
  'Аудит Etsy-магазину та конкурентів, план системи продажів на Etsy.':
    'An audit of your Etsy shop and competitors, plus a plan for a working Etsy sales system.',
  'Консультація з розвитку онлайн-продажів для e-commerce бізнесу.':
    'A consultation on growing online sales for e-commerce businesses.',
  'Розробка інтернет-магазину на Shopify під ключ: дизайн, тема, каталог, оплата й доставка.':
    'Turnkey Shopify store development: design, theme, catalogue, payments and shipping.',
  'Доопрацювання Shopify-магазину: нові секції, інтеграції, швидкість і виправлення помилок.':
    'Shopify store improvements: new sections, integrations, speed and bug fixes.',
  'B2B-магазин на Shopify для оптових продажів: закриті каталоги та індивідуальні ціни.':
    'A B2B Shopify store for wholesale: gated catalogues and custom pricing.',
  'CRO-аудит Shopify-магазину і план росту конверсії без збільшення рекламного бюджету.':
    'A Shopify CRO audit and a plan to grow conversion without raising the ad budget.',
  'Розробка самописного сайту або інтернет-магазину під нестандартні задачі бізнесу.':
    'Custom website or store development for non-standard business needs.',
  'Frontend-розробка на Vue.js: адаптивна верстка, швидкі та зручні інтерфейси.':
    'Frontend development in Vue.js: responsive markup, fast and usable interfaces.',
  'Backend-розробка на PHP (Laravel) та Node.js: API, інтеграції, бізнес-логіка.':
    'Backend development in PHP (Laravel) and Node.js: APIs, integrations, business logic.',
  'Проєктування та підтримка баз даних PostgreSQL, MySQL і MongoDB для e-commerce.':
    'Design and maintenance of PostgreSQL, MySQL and MongoDB databases for e-commerce.',
  'Розробка інтернет-магазину на Хорошоп: дизайн, налаштування каталогу й оплат.':
    'Horoshop store development: design, catalogue and payment setup.',
  'Розробка сайту на Wix або Webflow: лендинги та сайти-візитки для бізнесу.':
    'Wix or Webflow development: landing pages and business card sites.',
  'Сайт на WordPress і WooCommerce: на шаблоні або з індивідуальним дизайном.':
    'A WordPress and WooCommerce site: on a template or with a custom design.',
  'Доопрацювання сайту: нові сторінки, виправлення помилок, швидкість і SEO-основа.':
    'Website improvements: new pages, bug fixes, speed and SEO foundations.',
  'Впровадження CRM та інтеграція з магазином: автоматизація заявок, замовлень і повторних продажів.':
    'CRM rollout and store integration: automating leads, orders and repeat sales.',
  'Email-маркетинг і автоматичні розсилки: покинутий кошик, повторні покупки, ріст LTV.':
    'Email marketing and automated flows: abandoned cart, repeat purchases, higher LTV.',
  'SEO-аудит сайту: технічні помилки, контент, структура і план просування в Google.':
    'A site SEO audit: technical issues, content, structure and a plan to rank in Google.',
  'SEO-просування інтернет-магазину в Google: ріст органічного трафіку та продажів.':
    'SEO growth for online stores in Google: more organic traffic and sales.',
  'Оптимізація бренду для AI-пошуку, щоб ChatGPT, Perplexity і Gemini рекомендували вас.':
    'Optimising your brand for AI search so ChatGPT, Perplexity and Gemini recommend you.',
  'Відкриття та налаштування магазину на Etsy: лістинги, SEO, оформлення та політики.':
    'Opening and setting up an Etsy shop: listings, SEO, branding and policies.',
  'Ведення Etsy-магазину: оптимізація лістингів, Etsy SEO, реклама та аналітика.':
    'Etsy shop management: listing optimisation, Etsy SEO, ads and analytics.',
  'Відкриття та ведення магазину на eBay для продажів у США та Європі.':
    'Opening and running an eBay store for sales in the US and Europe.',
  'Відкриття магазину на Amazon Handmade для виробників товарів ручної роботи.':
    'Opening an Amazon Handmade shop for makers of handmade goods.',
  'Ведення Amazon Handmade: лістинги, Amazon SEO, реклама та контроль показників.':
    'Amazon Handmade management: listings, Amazon SEO, ads and performance tracking.',
  'Розміщення товарів на агрегаторах і прайс-площадках для додаткових продажів.':
    'Listing products on aggregators and price platforms for extra sales.',
  'Відкриття та налаштування B2B-магазину на Alibaba для пошуку оптових покупців.':
    'Opening and setting up a B2B Alibaba store to find wholesale buyers.',
  'Ведення Alibaba-магазину: каталог, запити покупців, реклама та аналітика.':
    'Alibaba store management: catalogue, buyer requests, ads and analytics.',
  'Розміщення компанії в міжнародних B2B-каталогах для пошуку оптових клієнтів.':
    'Listing your company in international B2B directories to find wholesale clients.',
  'Створення та ведення бізнес-акаунта Pinterest: дошки, піни, трафік на магазин.':
    'Creating and running a Pinterest business account: boards, pins, traffic to your store.',
  'Автоматизація Pinterest: регулярний постинг пінів без ручної роботи.':
    'Pinterest automation: regular pin posting without manual work.',
  'Реклама в Pinterest для залучення покупців на сайт і маркетплейси.':
    'Pinterest ads that bring buyers to your site and marketplaces.',
  'Створення та налаштування YouTube-каналу бренду для залучення покупців.':
    'Creating and setting up a brand YouTube channel to attract buyers.',
  'Ведення YouTube-каналу та підключення YouTube Shopping для продажу товарів.':
    'YouTube channel management and YouTube Shopping setup to sell products.',
  'Базовий брендбук: логотип, кольори, шрифти та правила використання.':
    'A basic brand book: logo, colours, fonts and usage rules.',
  'Повний брендбук для e-commerce бренду: айдентика, носії, гайдлайни.':
    'A full brand book for an e-commerce brand: identity, assets, guidelines.',
  'Розробка логотипу, який працює на сайті, маркетплейсах і упаковці.':
    'A logo that works on your site, on marketplaces and on packaging.',
  'Ребрендинг: оновлення айдентики та позиціонування для нових ринків.':
    'Rebranding: refreshing identity and positioning for new markets.',
  'Оформлення стенду та матеріалів для участі у міжнародних виставках.':
    'Booth and collateral design for international trade shows.',
  'Google Ads для інтернет-магазину: пошукова, торгова та медійна реклама з фокусом на ROAS.':
    'Google Ads for online stores: search, shopping and display campaigns focused on ROAS.',
  'Реклама в Instagram і Facebook: запуск кампаній, креативи та оптимізація.':
    'Instagram and Facebook ads: campaign launch, creatives and optimisation.',
  'Реклама в TikTok для e-commerce: кампанії та креативи під ваш продукт.':
    'TikTok ads for e-commerce: campaigns and creatives built around your product.',
  'Реклама в Pinterest для трафіку на маркетплейси та власний сайт.':
    'Pinterest ads driving traffic to marketplaces and your own site.',
  'Відеореклама на YouTube: таргетинг, креативи та аналітика конверсій.':
    'YouTube video ads: targeting, creatives and conversion analytics.',
  'Реклама в ChatGPT: показуємо ваш продукт там, де покупці вже питають поради в AI.':
    'Advertising in ChatGPT: we put your product where buyers already ask AI for advice.',
  'Реклама на маркетплейсах: Etsy Ads та Amazon Ads для росту видимості товарів.':
    'Marketplace advertising: Etsy Ads and Amazon Ads to grow product visibility.',
  'Консультації для e-commerce компаній з продажів, маркетингу та маркетплейсів.':
    'Consulting for e-commerce companies on sales, marketing and marketplaces.',
  'Аудит e-commerce процесів: знаходимо, де бізнес втрачає час і гроші.':
    'An audit of e-commerce processes: we find where the business loses time and money.',
  'Покращення конверсії сайту та маркетплейсів для росту продажів.':
    'Improving site and marketplace conversion to grow sales.',
  'Погодинний супровід вашої команди з e-commerce та маркетингу.':
    'Hourly support for your team on e-commerce and marketing.',
  'AI-консультації: впровадження AI-інструментів у маркетинг і продажі.':
    'AI consulting: bringing AI tools into marketing and sales.',

  // --- кейси ---
  'Створення Ecommerce бізнесу під ключ. Назва, розробка, дизайн, анімація, B2B та B2C продажі':
    'A turnkey e-commerce business: naming, development, design, animation, B2B and B2C sales',
  'Розробка B2B платформи для продажу на Shopify. Принцип, який економить +20 000$/рік.':
    'A B2B sales platform built on Shopify. An approach that saves over $20,000 a year.',
  'Висококонверсійні лендінги для перевірки попиту на продукт':
    'High-converting landing pages to validate product demand',
  'Запуск реклами Pinterest Ads': 'Pinterest Ads launch',
  'Інтернет-магазин для продажу власних і партнерських продуктів':
    'An online store selling own and partner products',
  'Реалізація дизайну, створення бренду для навчального холдингу A+':
    'Design delivery and brand creation for the A+ education group',
  '+3 роки': '+3 years',
  'довгостроковий проєкт': 'long-term project',
  Зекономлено: 'Saved',
  '+20 000$ / рік': '+$20,000 / year',
  'середній чек, за рахунок допродажів': 'average order value, thanks to upsells',
  ROAS: 'ROAS',
  'середній чек, за рахунок партнерських продажів та правильної побудови магазину':
    'average order value, thanks to partner sales and a well-built store',
  'маркетинг матеріалів та постійна дизайн підтримка бренду':
    'marketing assets and ongoing brand design support',
  'Продаж овочів': 'Vegetable sales',
  Розробка: 'Development',
  'Beauty Дистрибуція': 'Beauty distribution',
  Аналітика: 'Analytics',
  'Весільні сукні': 'Wedding dresses',
  Освіта: 'Education',
  Дизайн: 'Design',
  Брендинг: 'Branding',

  // --- «Результат, а не процес» ---
  'Чіткі цілі': 'Clear goals',
  'Перед стартом визначаємо цілі бізнесу, ключові ринки та KPI — щоб кожен етап роботи наближав вас до зростання продажів.':
    'Before we start we define business goals, key markets and KPIs — so every stage moves you closer to sales growth.',
  'Фокус на дохід': 'Revenue focus',
  'Оцінюємо успіх за реальним зростанням продажів, прибутку та масштабуванням бізнесу, а не кількістю виконаних завдань.':
    'We measure success by real growth in sales, profit and scale — not by the number of tasks closed.',
  'Прозорий процес': 'A transparent process',
  'Аналіз → Стратегія → Запуск → Масштабування — на кожному етапі ви розумієте, що робимо і навіщо.':
    'Analysis → Strategy → Launch → Scaling: at every stage you know what we are doing and why.',
  'Регулярна звітність': 'Regular reporting',
  'Регулярно показуємо результати, ключові показники та наступні кроки, щоб ви завжди бачили розвиток проєкту.':
    'We report results, key metrics and next steps regularly, so you always see how the project is moving.',

  // --- ресурси / інструменти ---
  'Калькулятор прибутку Etsy': 'Etsy profit calculator',
  'Порахуйте чистий прибуток, комісії Etsy, маржу та місячний дохід за хвилину.':
    'Calculate net profit, Etsy fees, margin and monthly revenue in a minute.',
  'Калькулятор ціноутворення Etsy': 'Etsy pricing calculator',
  'Введіть витрати і бажану маржу — отримайте мінімальну та рекомендовану ціну продажу з урахуванням всіх комісій.':
    'Enter your costs and target margin — get the minimum and recommended selling price with all fees included.',
  'Etsy vs Amazon vs Shopify': 'Etsy vs Amazon vs Shopify',
  'Порівняйте комісії та прибуток на трьох платформах — введіть параметри товару і дізнайтесь, як вигідніше продавати.':
    'Compare fees and profit across three platforms — enter your product data and see which one pays off.',
  'Ресайзер зображень': 'Image resizer',
  'Змінюйте розмір фото для Instagram, Etsy, Pinterest та інших платформ з пресетами.':
    'Resize photos for Instagram, Etsy, Pinterest and other platforms using presets.',
  SEOgenie: 'SEOgenie',
  'AI-додаток для продавців Etsy: заголовок, 13 тегів і опис за 30 секунд, SEO-аудит лістингів і публікація прямо в магазин. 7 днів безкоштовно.':
    'An AI app for Etsy sellers: a title, 13 tags and a description in 30 seconds, an SEO audit of your listings and publishing straight to your shop. 7-day free trial.',

  // --- відгуки ---
  'Повідомлення від Ірини': 'A message from Iryna',
  '+320% конверсія': '+320% conversion',
  'Розробка висококонверсійного інтернет-магазину для продукту в ніші краси':
    'Building a high-converting online store for a beauty product',
  Ірина: 'Iryna',
  'Засновниця · Проект під NDA, але відгук ні': 'Founder · Project under NDA, the review is not',
  'Наталія, Beauty Brand Pro': 'Nataliia, Beauty Brand Pro',
  '«Ви зекономили мені більше 20 тисяч доларів на рік завдяки альтернативній платформі замість Shopify B2B пакету»':
    '“You saved me more than $20,000 a year with an alternative platform instead of the Shopify B2B package”',
  Наталія: 'Nataliia',
  'Засновниця · Beauty Brand Pro': 'Founder · Beauty Brand Pro',
  'Наталія, NataBelz': 'Nataliia, NataBelz',
  '«Людяний, структурний підхід, реалізація зазначених планів, яка дає результат»':
    '“A human, structured approach and delivery of the agreed plans that brings results”',
  'Засновниця · NataBelz': 'Founder · NataBelz',
  'Попередній відгук': 'Previous review',
  'Наступний відгук': 'Next review',
  'Дивитись відео-відгук': 'Watch the video review',
  'Попередній кейс': 'Previous case study',
  'Наступний кейс': 'Next case study',

  'Система продажів': 'A sales system',
  ' на міжнародному ринку': ' on the international market',

  // --- FAQ ---
  'Як вийти на міжнародні маркетплейси з українським товаром?':
    'How do I take a Ukrainian product to international marketplaces?',
  'Koshman Ecom супроводжує весь шлях: аналізуємо продукт і попит, обираємо майданчик (Etsy, Amazon, eBay або Alibaba для B2B), реєструємо й налаштовуємо магазин, оформлюємо лістинги з SEO та запускаємо рекламу. Після запуску ведемо магазин і стежимо за продажами.':
    'Koshman Ecom guides the whole journey: we analyse the product and demand, pick the platform (Etsy, Amazon, eBay or Alibaba for B2B), register and set up the shop, build SEO-ready listings and launch ads. After launch we run the shop and watch the sales.',
  'Що краще для старту: Etsy, Amazon чи власний сайт на Shopify?':
    'What is better to start with: Etsy, Amazon or your own Shopify store?',
  'Etsy підходить для handmade, вінтажу та дизайнерських товарів і дає покупців з першого дня. Amazon — для масових товарів і більших обсягів. Shopify — для бренду, якому потрібна власна база клієнтів без залежності від комісій майданчика. Часто найкраще працює комбінація. Порівняти платформи можна в нашому безкоштовному інструменті Etsy vs Amazon vs Shopify.':
    'Etsy fits handmade, vintage and designer goods and brings buyers from day one. Amazon suits mass-market products and larger volumes. Shopify is for a brand that wants its own customer base without depending on marketplace fees. A combination often works best. You can compare the platforms in our free Etsy vs Amazon vs Shopify tool.',
  'Скільки коштує відкрити магазин на Etsy або Amazon з агенцією?':
    'How much does it cost to open an Etsy or Amazon shop with an agency?',
  'Вартість залежить від кількості товарів, ринку та обсягу робіт: лише запуск магазину чи запуск разом із веденням і рекламою. Точну ціну називаємо після короткого брифу, перша консультація безкоштовна.':
    'The cost depends on the number of products, the market and the scope: launch only, or launch together with management and ads. We quote an exact price after a short brief; the first consultation is free.',
  'Чи працюєте з малим бізнесом і тими, хто починає з нуля?':
    'Do you work with small businesses and people starting from scratch?',
  'Так, більшість наших клієнтів запускали онлайн-продажі з нуля. Починаємо з аудиту продукту та плану розвитку, щоб бюджет ішов на канали, які дадуть найшвидшу віддачу.':
    'Yes — most of our clients started online sales from zero. We begin with a product audit and a growth plan so the budget goes to the channels that pay off fastest.',
  'Що таке оптимізація для AI-пошуку і навіщо вона інтернет-магазину?':
    'What is AI search optimisation and why does an online store need it?',
  'Дедалі більше покупців шукають товари через ChatGPT, Perplexity і Gemini. Оптимізація для AI-пошуку — це робота з контентом сайту, структурованими даними та згадками бренду, щоб AI-асистенти рекомендували саме вас. Ми поєднуємо її з класичним SEO-просуванням у Google.':
    'More and more buyers look for products through ChatGPT, Perplexity and Gemini. AI search optimisation is work on site content, structured data and brand mentions so that AI assistants recommend you. We combine it with classic SEO in Google.',
  'Чи можна замовити розробку сайту, SEO і рекламу в одній агенції?':
    'Can I get website development, SEO and advertising from one agency?',
  'Так, Koshman Ecom — агенція повного циклу: стратегія, розробка на Shopify, WordPress чи Хорошоп, SEO, реклама в Google, Meta, TikTok і Pinterest, email-маркетинг і CRM. За результат відповідає одна команда, без передачі задач між підрядниками.':
    'Yes. Koshman Ecom is a full-cycle agency: strategy, development on Shopify, WordPress or Horoshop, SEO, ads in Google, Meta, TikTok and Pinterest, email marketing and CRM. One team owns the result, with no handovers between contractors.',
  'З чого почати співпрацю з e-commerce агенцією?':
    'How do we start working with an e-commerce agency?',
  'Зі стратегічного аудиту або безкоштовної консультації. Розбираємо бізнес, продукт і конкурентів, радимо, які напрями дадуть найшвидший результат, і готуємо план робіт зі строками та вартістю.':
    'With a strategic audit or a free consultation. We look into the business, product and competitors, advise which directions pay off fastest and prepare a scope with timelines and pricing.',
  'Чи працюєте ви з клієнтами з Європи та США?':
    'Do you work with clients from Europe and the US?',
  'Так. Маємо офіси в Києві та Кошицях (Словаччина) і працюємо з клієнтами по всьому світу українською, англійською та словацькою. Допомагаємо виходити на ринки ЄС, США та інші.':
    'Yes. We have offices in Kyiv and Košice (Slovakia) and work with clients worldwide in Ukrainian, English and Slovak. We help you enter the EU, US and other markets.',
  // --- сторінки: Про нас, Контакти, Карʼєра, Дякуємо, Умови ---
  'Про нас': 'About us',
  Контакти: 'Contacts',
  Карʼєра: 'Careers',
  Команда: 'Team',
  Напрямки: 'Directions',
  Вакансії: 'Open roles',
  Документи: 'Documents',
  Зміст: 'Contents',
  Позиція: 'Position',
  Відгук: 'Application',
  'Маркетингова агенція для e-commerce бізнесу': 'A marketing agency for e-commerce business',
  'Koshman Ecom — команда повного циклу для онлайн-продажів. Створюємо сайти та інтернет-магазини, запускаємо рекламу на будь-якому майданчику, виводимо бренди на маркетплейси й автоматизуємо процеси за допомогою AI. Працюємо з B2C та B2B бізнесами на локальних і міжнародних ринках.':
    'Koshman Ecom is a full-cycle team for online sales. We build websites and online stores, launch ads on any platform, take brands to marketplaces and automate processes with AI. We work with B2C and B2B businesses on local and international markets.',
  'Наш фокус': 'Our focus',
  'Фокус на стабільні продажі, а не разові запуски': 'Focused on steady sales, not one-off launches',
  'Ми обʼєднуємо стратегію, операційну підтримку та AI-автоматизацію в єдиний робочий процес, щоб бізнес зростав стабільно.':
    'We combine strategy, day-to-day support and AI automation into one workflow so the business grows steadily.',
  'років досвіду': 'years of experience',
  'Міжнародні платформи та ринки.': 'International platforms and markets.',
  'років розробки сайтів': 'years of web development',
  'Впроваджуємо AI у бізнес': 'We bring AI into business',
  'Автоматизуємо контент, рутину й аналітику, щоб команда працювала швидше.':
    'We automate content, routine work and analytics so the team moves faster.',
  'Наша місія': 'Our mission',
  'Наша місія — допомагати брендам і виробникам з будь-якої країни продавати по всьому світу. Ми віримо, що локальний бізнес може стати глобальним, якщо правильно побудувати продукт, маркетинг і систему продажів.':
    'Our mission is to help brands and manufacturers from any country sell worldwide. We believe a local business can go global if the product, marketing and sales system are built right.',
  'Наш підхід': 'Our approach',
  'Ми працюємо не як класична маркетингова агенція. Наша задача — побудувати робочу систему продажів, а не просто зробити сайт або рекламу.':
    'We do not work like a classic marketing agency. Our job is to build a working sales system, not just a website or an ad campaign.',
  'Що ми робимо': 'What we do',
  'Хто стоїть за агенцією': 'Who is behind the agency',
  'Ми — команда засновників, яка поєднує стратегічний e-commerce та системний маркетинг. Нижче — коротко про ключових людей, які відповідають за результат.':
    'We are a team of founders combining strategic e-commerce and systematic marketing. Below is a short introduction to the key people responsible for the result.',
  'Станьте частиною Koshman Ecom': 'Become part of Koshman Ecom',
  'Шукаємо людей, яким цікаво запускати бренди на міжнародних ринках і рости разом із нами. Готові до нового кроку в карʼєрі?':
    'We are looking for people who enjoy launching brands on international markets and growing with us. Ready for the next step in your career?',
  'Переглянути вакансії': 'See open roles',
  'Обговорити проєкт': 'Discuss a project',
  'Звʼяжіться з нами': 'Get in touch',
  'Відповідаємо протягом робочого дня. Оберіть зручний спосіб або залиште заявку нижче.':
    'We reply within one business day. Pick a convenient channel or send a request below.',
  'Написати менеджеру': 'Message a manager',
  'Телефон або Telegram': 'Phone or Telegram',
  Телефон: 'Phone',
  'Порахувати свій прибуток': 'Calculate your profit',
  'Телефон · Україна': 'Phone · Ukraine',
  'Телефон · Словаччина': 'Phone · Slovakia',
  Офіси: 'Offices',
  'Київ, Україна · Кошиці, Словаччина': 'Kyiv, Ukraine · Košice, Slovakia',
  'Ми в соцмережах': 'Find us on social media',
  'Будуймо e-commerce разом': 'Let’s build e-commerce together',
  'Шукаємо людей, яким цікаво запускати бренди на міжнародних ринках: маркетплейси, реклама, сайти та AI-автоматизація. Працюємо з клієнтами з різних країн.':
    'We are looking for people who enjoy launching brands on international markets: marketplaces, advertising, websites and AI automation. We work with clients from many countries.',
  'Відкриті позиції': 'Open positions',
  'Надішліть резюме': 'Send your CV',
  'Оберіть позицію та додайте посилання на резюме або портфоліо. Не знайшли свою роль — все одно напишіть, ми переглядаємо кожен відгук.':
    'Pick a position and add a link to your CV or portfolio. Did not find your role? Write anyway — we read every application.',
  'Резюме або портфоліо': 'CV or portfolio',
  'Відгук надіслано': 'Application sent',
  'Надіслати ще один': 'Send another one',
  Імʼя: 'Name',
  'Вкажіть імʼя та контакт, щоб ми могли звʼязатися.':
    'Please add your name and contact so we can get back to you.',
  'Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.':
    'By clicking the button you agree to the processing of personal data.',
  'Дякуємо за заявку!': 'Thank you for your request!',
  'Заявку прийнято': 'Request received',
  'Менеджер звʼяжеться з вами протягом робочого дня, уточнить задачу й назве вартість.':
    'A manager will contact you within one business day, clarify the task and quote the cost.',
  'На головну': 'Back to home',
  'Наш Telegram-канал': 'Our Telegram channel',
  'Що далі': 'What happens next',
  'Умови використання': 'Terms of use',
  'Правила користування сайтом Koshman Ecom, безкоштовними інструментами та матеріалами сайту.':
    'Rules for using the Koshman Ecom website, its free tools and materials.',
  'Політикою конфіденційності': 'Privacy Policy',
  // --- сторінка «Про нас»: теги, підхід, напрямки, команда ---
  'Сайти та інтернет-магазини': 'Websites and online stores',
  'AI-автоматизація': 'AI automation',
  Продукт: 'Product',
  'Позиціонування та цінність.': 'Positioning and value.',
  Ринок: 'Market',
  'Попит і конкурентна стратегія.': 'Demand and competitive strategy.',
  Система: 'System',
  'Контент, трафік, AI, операційка.': 'Content, traffic, AI, operations.',
  'Запускаємо продажі на маркетплейсах': 'We launch sales on marketplaces',
  'Виходимо на Etsy, Amazon Handmade, eBay та інші платформи.':
    'We go live on Etsy, Amazon Handmade, eBay and other platforms.',
  'Створюємо та оптимізуємо магазини на Etsy': 'We build and optimise Etsy shops',
  'Структура, SEO-листинги, аналітика, регулярне оновлення.':
    'Structure, SEO listings, analytics and regular updates.',
  'Окремо розробляємо сайти на Shopify': 'We also build Shopify stores',
  'Дизайн, UX, інтеграції та готовність до масштабування.':
    'Design, UX, integrations and readiness to scale.',
  'Знаходимо попит і ніші': 'We find demand and niches',
  'Дані, тренди та аналіз конкурентів перед запуском.':
    'Data, trends and competitor analysis before launch.',
  'Інтегруємо AI у бізнес-процеси': 'We integrate AI into business processes',
  'Автоматизація контенту, рутин та аналітики.': 'Automating content, routine work and analytics.',
  'Масштабуємо через рекламу та контент': 'We scale through ads and content',
  'Meta, TikTok, Pinterest, SEO та контент-стратегії.':
    'Meta, TikTok, Pinterest, SEO and content strategies.',
  'Влад Кошман': 'Vlad Koshman',
  Засновник: 'Founder',
  'Спеціаліст з міжнародного e-commerce. Відповідає за стратегію, запуск продажів та AI-впровадження у бізнес-процеси.':
    'An international e-commerce specialist. Owns strategy, sales launches and bringing AI into business processes.',
  'Ліза Кошман': 'Liza Koshman',
  Співвласниця: 'Co-owner',
  'Стратегічна менеджерка в роботі з брендами в Ecommerce. Керівниця відділу роботи з Shopify-екосистемою.':
    'A strategic manager working with e-commerce brands. Heads the Shopify ecosystem team.',

  // --- вакансії ---
  'Ведення проектів Etsy/Shopify, комунікація з клієнтами та контроль дедлайнів.':
    'Running Etsy/Shopify projects, client communication and deadline control.',
  'Налаштування та оптимізація реклами Meta, Google, Pinterest Ads.':
    'Setting up and optimising Meta, Google and Pinterest Ads.',
  'AI‑контент, візуали, описи та автоматизація контент‑процесів.':
    'AI content, visuals, descriptions and content process automation.',
  'Ведення Etsy‑магазинів: оптимізація лістингів, SEO, аналітика та масштабування.':
    'Running Etsy shops: listing optimisation, SEO, analytics and scaling.',
  'Робота з вхідними заявками, комунікація з клієнтами та закриття угод.':
    'Working with inbound requests, client communication and closing deals.',
  'Розробка та підтримка Shopify-магазинів, інтеграції та кастомні рішення.':
    'Building and maintaining Shopify stores, integrations and custom solutions.',
  'Remote / Ukraine': 'Remote / Ukraine',

  // --- «Дякуємо» ---
  'Менеджер звʼяжеться з вами': 'A manager will contact you',
  'Протягом робочого дня, у месенджері або телефоном.':
    'Within one business day, by messenger or phone.',
  'Уточнимо задачу': 'We clarify the task',
  'Коротко розпитаємо про продукт, ринок і цілі.':
    'We ask briefly about the product, market and goals.',
  'Надішлемо пропозицію': 'We send a proposal',
  'План робіт, строки та вартість.': 'Scope of work, timelines and pricing.',
  'Оновлено 15 жовтня 2026': 'Updated 15 October 2026',
  // --- Умови використання ---
  'Загальні положення': 'General provisions',
  'Ці умови регулюють користування сайтом Koshman Ecom та безкоштовними інструментами на ньому. Відкриваючи сайт, ви погоджуєтесь з умовами.':
    'These terms govern the use of the Koshman Ecom website and the free tools on it. By opening the site you agree to the terms.',
  'Якщо ви не згодні з умовами, будь ласка, не користуйтеся сайтом.':
    'If you do not agree with the terms, please do not use the site.',
  'Користування сайтом': 'Using the site',
  'Сайт містить інформацію про послуги агенції, кейси, статті блогу та інструменти для e-commerce.':
    'The site contains information about the agency services, case studies, blog articles and e-commerce tools.',
  'Заборонено втручатися в роботу сайту, автоматично збирати його вміст, намагатися отримати доступ до закритих розділів або використовувати сайт для незаконних дій.':
    'It is prohibited to interfere with the site, scrape its content automatically, attempt to access restricted sections or use the site for unlawful activity.',
  Інструменти: 'Tools',
  'Калькулятори, порівняння платформ, ресайзер зображень, SEOgenie та інші інструменти надаються безкоштовно і «як є».':
    'The calculators, platform comparison, image resizer, SEOgenie and other tools are provided free of charge and “as is”.',
  'Результати розрахунків орієнтовні та залежать від введених даних і актуальних тарифів платформ. Вони не є фінансовою, податковою чи юридичною консультацією.':
    'Calculation results are indicative and depend on the data you enter and the current platform fees. They are not financial, tax or legal advice.',
  'Ми можемо змінювати, обмежувати або вимикати інструменти без попередження.':
    'We may change, limit or switch off the tools without prior notice.',
  'Авторські права': 'Copyright',
  'Тексти, дизайн, логотип, графіка, кейси та код сайту належать Koshman Ecom або використовуються за ліцензією.':
    'The texts, design, logo, graphics, case studies and code of the site belong to Koshman Ecom or are used under licence.',
  'Цитування матеріалів дозволене з активним посиланням на сайт. Інше копіювання чи комерційне використання потребує нашої письмової згоди.':
    'Quoting materials is allowed with an active link to the site. Any other copying or commercial use requires our written consent.',
  'Назви та логотипи Etsy, Amazon, Shopify, Pinterest, YouTube та інших платформ належать їхнім власникам.':
    'The names and logos of Etsy, Amazon, Shopify, Pinterest, YouTube and other platforms belong to their owners.',
  'Заявки та послуги': 'Requests and services',
  'Інформація на сайті не є публічною офертою. Вартість, строки та обсяг робіт узгоджуються індивідуально й фіксуються в договорі.':
    'The information on the site is not a public offer. Pricing, timelines and scope of work are agreed individually and fixed in a contract.',
  'Обмеження відповідальності': 'Limitation of liability',
  'Ми докладаємо зусиль, щоб інформація на сайті була точною, але не гарантуємо її повноту й актуальність.':
    'We make an effort to keep the information on the site accurate, but we do not guarantee that it is complete or up to date.',
  'Ми не відповідаємо за збитки, що виникли через використання сайту, інструментів або рішення, ухвалені на основі їхніх результатів.':
    'We are not liable for losses arising from the use of the site, the tools, or decisions made on the basis of their results.',
  'Результати кейсів залежать від продукту, ринку та бюджету клієнта і не гарантують таких самих результатів для інших бізнесів.':
    'Case study results depend on the client’s product, market and budget and do not guarantee the same results for other businesses.',
  'Посилання на інші сайти': 'Links to other sites',
  'Сайт може містити посилання на сторонні ресурси. Ми не контролюємо їхній вміст і не відповідаємо за їхню роботу та політику конфіденційності.':
    'The site may contain links to third-party resources. We do not control their content and are not responsible for how they work or for their privacy policies.',
  'Зміни умов': 'Changes to the terms',
  'Ми можемо оновлювати ці умови. Нова редакція діє з моменту публікації на цій сторінці.':
    'We may update these terms. A new version takes effect once published on this page.',
  'Застосовне право': 'Governing law',
  'Умови регулюються законодавством України. Для користувачів з ЄС також застосовуються обовʼязкові норми законодавства ЄС.':
    'The terms are governed by the laws of Ukraine. For users in the EU, mandatory provisions of EU law also apply.',
  'Спори вирішуємо шляхом переговорів, а якщо домовитися не вдалося — у суді за місцем реєстрації виконавця.':
    'We resolve disputes through negotiation and, if no agreement is reached, in the court at the contractor’s place of registration.',
  'Надіслати відгук': 'Send application',
  Контент: 'Content',
  'Надсилаючи заявку, ви підтверджуєте, що вказали достовірні дані та погоджуєтесь на їх обробку згідно з':
    'By sending a request you confirm that the data provided is accurate and agree to its processing under our',
  // --- Політика конфіденційності ---
  'Політика конфіденційності': 'Privacy policy',
  'Як Koshman Ecom збирає, використовує та захищає дані відвідувачів сайту й клієнтів.':
    'How Koshman Ecom collects, uses and protects the data of site visitors and clients.',
  'Хто ми': 'Who we are',
  'Koshman Ecom — маркетинг-агенція для e-commerce бізнесів з офісами в Києві (Україна) та Кошицях (Словаччина). Ми є володільцем персональних даних, які ви передаєте через цей сайт.':
    'Koshman Ecom is a marketing agency for e-commerce businesses with offices in Kyiv (Ukraine) and Košice (Slovakia). We are the controller of the personal data you submit through this site.',
  'З питань обробки даних пишіть на': 'For data processing questions write to',
  'Які дані ми збираємо': 'What data we collect',
  'Дані, які ви вказуєте у формах: імʼя, телефон або Telegram, email, коментар до заявки, обрані послуги.':
    'Data you provide in the forms: name, phone or Telegram, email, the comment in your request and the services you selected.',
  'Технічні дані: IP-адреса, тип браузера й пристрою, сторінки, які ви переглядали, джерело переходу. Їх збирають файли cookie та сервіси аналітики.':
    'Technical data: IP address, browser and device type, the pages you viewed and the referral source. These are collected by cookies and analytics services.',
  'Навіщо ми їх використовуємо': 'Why we use it',
  'Щоб звʼязатися з вами щодо заявки, уточнити задачу й підготувати пропозицію.':
    'To contact you about your request, clarify the task and prepare a proposal.',
  'Щоб виконувати договір, якщо ви стали нашим клієнтом.':
    'To perform the contract if you become our client.',
  'Щоб аналізувати відвідуваність і покращувати сайт.':
    'To analyse traffic and improve the website.',
  'Ми не надсилаємо рекламні розсилки без вашої окремої згоди.':
    'We do not send marketing emails without your separate consent.',
  'Правові підстави': 'Legal grounds',
  'Ми обробляємо дані відповідно до Закону України «Про захист персональних даних» та Загального регламенту ЄС про захист даних (GDPR).':
    'We process data under the Ukrainian Law “On Personal Data Protection” and the EU General Data Protection Regulation (GDPR).',
  'Підстави обробки: ваша згода, укладення й виконання договору, наш законний інтерес у роботі та безпеці сайту.':
    'The grounds for processing: your consent, entering into and performing a contract, and our legitimate interest in the operation and security of the site.',
  'Файли cookie': 'Cookies',
  'Сайт використовує необхідні cookie для роботи сторінок і аналітичні cookie для статистики відвідувань.':
    'The site uses necessary cookies to make pages work and analytics cookies for visit statistics.',
  'Ви можете вимкнути або видалити cookie в налаштуваннях браузера. Частина функцій сайту після цього може працювати некоректно.':
    'You can disable or delete cookies in your browser settings. Some site features may then stop working correctly.',
  'Передача третім особам': 'Sharing with third parties',
  'Ми не продаємо й не передаємо ваші дані для маркетингу інших компаній.':
    'We do not sell or share your data for other companies’ marketing.',
  'Дані можуть оброблятися нашими підрядниками: хостинг, CRM, сервіси аналітики та месенджери. Вони отримують лише те, що потрібно для їхньої роботи, і зобовʼязані захищати ці дані.':
    'Data may be processed by our contractors: hosting, CRM, analytics services and messengers. They receive only what they need for their work and are obliged to protect that data.',
  'Ми розкриваємо дані державним органам лише у випадках, передбачених законом.':
    'We disclose data to public authorities only in cases provided for by law.',
  'Строк зберігання': 'Retention period',
  'Дані із заявок зберігаємо до 3 років після останнього контакту або до відкликання згоди.':
    'We keep request data for up to 3 years after the last contact or until consent is withdrawn.',
  'Дані клієнтів зберігаємо протягом строку дії договору та строку, встановленого законодавством для бухгалтерських документів.':
    'We keep client data for the term of the contract and the period required by law for accounting records.',
  'Ваші права': 'Your rights',
  'Ви можете в будь-який момент запросити доступ до своїх даних, їх виправлення, видалення або обмеження обробки, а також відкликати згоду.':
    'At any time you can request access to your data, its correction, deletion or restriction of processing, and withdraw your consent.',
  'Щоб скористатися правом, напишіть нам на email. Відповідаємо протягом 30 днів.':
    'To exercise a right, write to us by email. We reply within 30 days.',
  'Ви також маєте право подати скаргу до Уповноваженого Верховної Ради України з прав людини або до наглядового органу країни ЄС.':
    'You also have the right to lodge a complaint with the Ukrainian Parliament Commissioner for Human Rights or with the supervisory authority of an EU country.',
  'Зміни до політики': 'Changes to this policy',
  'Ми можемо оновлювати цю політику. Актуальна версія завжди доступна на цій сторінці, дата оновлення вказана вгорі.':
    'We may update this policy. The current version is always available on this page and the update date is shown at the top.',
};

export default en;
