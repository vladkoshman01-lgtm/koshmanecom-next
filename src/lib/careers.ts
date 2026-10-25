export type CareerRole = {
  slug: string;
  title: string;
  location: string;
  format: string;
  team: string;
  shortDescription: string;
  about: string[];
  requirements: string[];
  responsibilities: string[];
  offer: string[];
};

export const careerRoles: CareerRole[] = [
  {
    slug: 'ecommerce-project-manager',
    title: 'E-commerce Project Manager',
    location: 'Remote / Ukraine',
    format: 'Full-time',
    team: 'Operations',
    shortDescription:
      'Ведення проектів Etsy/Shopify, комунікація з клієнтами та контроль дедлайнів.',
    about: [
      'Koshman Ecom — команда, яка масштабує e-commerce бренди на Etsy, Shopify та маркетплейсах.',
      'Ви будете керувати проектами, координувати команду та забезпечувати результат для клієнтів.',
    ],
    requirements: [
      'Досвід управління e-commerce або digital‑проектами від 1 року',
      'Сильні комунікаційні навички та структурне мислення',
      'Розуміння процесів Etsy / Shopify / маркетплейсів — буде плюсом',
    ],
    responsibilities: [
      'Ведення клієнтських проектів та контроль виконання задач',
      'Комунікація з клієнтами та внутрішньою командою',
      'Планування спринтів, контроль дедлайнів, звітність',
    ],
    offer: [
      'Робота з міжнародними брендами',
      'Гнучкий формат та швидкий розвиток',
      'Сильна команда і прозорі KPI',
    ],
  },
  {
    slug: 'performance-marketing-specialist',
    title: 'PPC / Performance Specialist',
    location: 'Remote / Ukraine',
    format: 'Full-time',
    team: 'Marketing',
    shortDescription:
      'Налаштування та оптимізація реклами Meta, Google, Pinterest Ads.',
    about: [
      'Ми шукаємо спеціаліста, який зможе масштабувати платний трафік для e-commerce брендів.',
      'Фокус — результат, ROAS, аналітика та системний підхід до кампаній.',
    ],
    requirements: [
      'Досвід роботи з Meta Ads або Google Ads від 1 року',
      'Аналітичне мислення, вміння працювати з цифрами',
      'Досвід з e-commerce буде перевагою',
    ],
    responsibilities: [
      'Запуск та оптимізація рекламних кампаній',
      'Підготовка аналітики, звітів та рекомендацій',
      'Тестування креативів та воронок продажів',
    ],
    offer: [
      'Високий вплив на результат і розвиток',
      'Гнучка модель співпраці',
      'Можливість будувати системи з нуля',
    ],
  },
  {
    slug: 'content-ai-specialist',
    title: 'Content / AI Specialist',
    location: 'Remote / Ukraine',
    format: 'Project / Full-time',
    team: 'Content',
    shortDescription:
      'AI‑контент, візуали, описи та автоматизація контент‑процесів.',
    about: [
      'Ми створюємо AI‑контент, який продає та масштабується.',
      'Ви будете працювати з візуалами, текстами та автоматизацією контенту.',
    ],
    requirements: [
      'Досвід створення контенту для e-commerce',
      'Розуміння AI‑інструментів (Midjourney, ChatGPT, інші)',
      'Відчуття дизайну та структури',
    ],
    responsibilities: [
      'Генерація фото/відео контенту через AI',
      'Написання описів та сценаріїв',
      'Побудова контент‑процесів та шаблонів',
    ],
    offer: [
      'Творчі задачі + практичний бізнес‑ефект',
      'Гнучкий графік',
      'Можливість працювати з міжнародними брендами',
    ],
  },
  {
    slug: 'etsy-manager-middle',
    title: 'Etsy Manager (Middle)',
    location: 'Remote / Ukraine',
    format: 'Full-time',
    team: 'Marketplace',
    shortDescription:
      'Ведення Etsy‑магазинів: оптимізація лістингів, SEO, аналітика та масштабування.',
    about: [
      'Ми шукаємо Middle Etsy Manager, який зможе стабільно вести проекти клієнтів.',
      'Фокус — на системному рості продажів і покращенні показників магазину.',
    ],
    requirements: [
      'Досвід роботи з Etsy від 1 року',
      'Розуміння Etsy SEO та структури лістингів',
      'Навички роботи з аналітикою та ключовими словами',
    ],
    responsibilities: [
      'Оптимізація лістингів та ключових слів',
      'Планування та контроль контенту магазину',
      'Аналіз продажів та коригування стратегії',
    ],
    offer: [
      'Проекти з міжнародними брендами',
      'Гнучкий формат роботи',
      'Підтримка команди та розвиток',
    ],
  },
  {
    slug: 'sales-manager',
    title: 'Sales Manager',
    location: 'Remote / Ukraine',
    format: 'Full-time',
    team: 'Sales',
    shortDescription:
      'Робота з вхідними заявками, комунікація з клієнтами та закриття угод.',
    about: [
      'Шукаємо Sales Manager, який вміє продавати цінність і будувати довіру.',
      'Ви будете працювати з лідами з сайту та рекомендацій.',
    ],
    requirements: [
      'Досвід у продажах B2B або digital‑послуг',
      'Сильні комунікаційні навички',
      'Вміння структурувати продажі та вести CRM',
    ],
    responsibilities: [
      'Комунікація з лідами та закриття угод',
      'Формування комерційних пропозицій',
      'Ведення CRM та звітність',
    ],
    offer: [
      'Гнучка система мотивації',
      'Потік гарячих лідів',
      'Робота з сильним продуктом і командою',
    ],
  },
  {
    slug: 'shopify-developer',
    title: 'Shopify Developer',
    location: 'Remote / Ukraine',
    format: 'Full-time',
    team: 'Development',
    shortDescription:
      'Розробка та підтримка Shopify-магазинів, інтеграції та кастомні рішення.',
    about: [
      'Шукаємо Shopify Developer з практичним досвідом у e-commerce.',
      'Потрібні чистий код, швидкість і увага до деталей у frontend та інтеграціях.',
    ],
    requirements: [
      'Досвід розробки на Shopify (Liquid, Sections, Apps)',
      'Розуміння storefront performance та UX',
      'Досвід інтеграцій платіжних/логістичних сервісів — плюс',
    ],
    responsibilities: [
      'Розробка та доопрацювання Shopify тем',
      'Інтеграції з сервісами та автоматизаціями',
      'Оптимізація швидкості та конверсії',
    ],
    offer: [
      'Цікаві проекти з міжнародними брендами',
      'Гнучкий формат роботи',
      'Розвиток у сильній e-commerce команді',
    ],
  },
];
