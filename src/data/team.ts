/**
 * Ключові люди агенції — для сторінки «Про нас» і розмітки Schema.org
 * (засновники агенції, автори). Тексти українською; переклад — через
 * словники `src/i18n/content`, як і решта сторінки.
 */
export type TeamMember = {
  /** Стабільний ідентифікатор для `@id` у розмітці. */
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
};

export const TEAM: TeamMember[] = [
  {
    id: 'vlad-koshman',
    name: 'Влад Кошман',
    role: 'Засновник',
    image: '/team/Vlad.png',
    description:
      'Спеціаліст з міжнародного e-commerce. Відповідає за стратегію, запуск продажів та AI-впровадження у бізнес-процеси.',
  },
  {
    id: 'liza-koshman',
    name: 'Ліза Кошман',
    role: 'Співвласниця',
    image: '/team/Liza.png',
    description:
      'Стратегічна менеджерка в роботі з брендами в Ecommerce. Керівниця відділу роботи з Shopify-екосистемою.',
  },
];
