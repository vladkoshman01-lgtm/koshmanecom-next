/**
 * Індивідуальні логотипи й іконки окремих послуг.
 * Ключ — `<ключ категорії>|<назва послуги>`.
 * Логотипи платформ тягнуться з Simple Icons, як у прототипі.
 */

export const SERVICE_LOGOS: Record<string, string> = {
      'strategy|Shopify CRO аудит': 'https://cdn.simpleicons.org/shopify/ffffff', 'strategy|Аудит Etsy': 'https://cdn.simpleicons.org/etsy/ffffff',
      'shopify-dev|Shopify': 'https://cdn.simpleicons.org/shopify/ffffff', 'shopify-dev|Доопрацювання': 'https://cdn.simpleicons.org/shopify/ffffff', 'shopify-dev|B2B Shopify (опт)': 'https://cdn.simpleicons.org/shopify/ffffff', 'shopify-dev|CRO аудит': 'https://cdn.simpleicons.org/shopify/ffffff',
      'other-dev|Frontend': 'https://cdn.simpleicons.org/vuedotjs/ffffff', 'other-dev|Backend': 'https://cdn.simpleicons.org/laravel/ffffff', 'other-dev|Бази даних': 'https://cdn.simpleicons.org/postgresql/ffffff',
      'web-dev|Wix / Webflow': 'https://cdn.simpleicons.org/webflow/ffffff', 'web-dev|WordPress': 'https://cdn.simpleicons.org/wordpress/ffffff',
      'seo|SEO аудит': 'https://cdn.simpleicons.org/google/ffffff', 'seo|SEO просування': 'https://cdn.simpleicons.org/google/ffffff', 'seo|AI-пошук': 'https://cdn.simpleicons.org/googlegemini/ffffff',
      'marketplaces|Etsy магазин': 'https://cdn.simpleicons.org/etsy/ffffff', 'marketplaces|Ведення Etsy': 'https://cdn.simpleicons.org/etsy/ffffff', 'marketplaces|eBay магазин': 'https://cdn.simpleicons.org/ebay/ffffff',
      'marketplaces|Amazon Handmade': 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="12" y="14" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="17" fill="#fff">a</text><path d="M3.5 17.2c5 3 12 3 17-0.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><path d="M18 15.4l2.8 1.1-0.9 2.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'), 'marketplaces|Ведення Amazon': 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="12" y="14" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="17" fill="#fff">a</text><path d="M3.5 17.2c5 3 12 3 17-0.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><path d="M18 15.4l2.8 1.1-0.9 2.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
      'marketplaces|Alibaba магазин': 'https://cdn.simpleicons.org/alibabadotcom/ffffff', 'marketplaces|Ведення Alibaba': 'https://cdn.simpleicons.org/alibabadotcom/ffffff',
      'pinterest|Ведення акаунта': 'https://cdn.simpleicons.org/pinterest/ffffff', 'pinterest|Автоматизація': 'https://cdn.simpleicons.org/pinterest/ffffff', 'pinterest|Pinterest Ads': 'https://cdn.simpleicons.org/pinterest/ffffff',
      'youtube|YouTube канал': 'https://cdn.simpleicons.org/youtube/ffffff', 'youtube|Ведення каналу': 'https://cdn.simpleicons.org/youtube/ffffff',
      'ads|Google Ads': 'https://cdn.simpleicons.org/googleads/ffffff', 'ads|Meta Ads': 'https://cdn.simpleicons.org/meta/ffffff', 'ads|TikTok Ads': 'https://cdn.simpleicons.org/tiktok/ffffff', 'ads|Pinterest Ads': 'https://cdn.simpleicons.org/pinterest/ffffff', 'ads|YouTube Ads': 'https://cdn.simpleicons.org/youtube/ffffff', 'ads|Маркетплейси': 'https://cdn.simpleicons.org/etsy/ffffff',
    };

export const SERVICE_ICONS: Record<string, string> = {
      // Бульбашка чату з іскрою AI. Логотип OpenAI на simpleicons більше
      // недоступний (404), тож малюємо нейтральну іконку в стилі решти.
      'ads|GPT Ads': 'M4 5h16v11H9l-5 4zM12 7.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z',
      'strategy|Аналіз бізнесу': 'M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 20l-4-4',
      'strategy|Канали продажів': 'M5 12h4M15 6h4M15 18h4M9 12l6-6M9 12l6 6',
      'strategy|План розвитку': 'M4 20h16M6 16l4-4 3 3 5-6M15 9h3v3',
      'strategy|CRO аудит інтернет-магазину': 'M4 5h16l-6 8v6l-4-2v-4z',
      'strategy|Консультація': 'M4 5h16v11H9l-5 4z',
      'other-dev|Самописний сайт': 'M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12',
      'web-dev|Хорошоп': 'M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0',
      'web-dev|Доопрацювання': 'M14 6l4 4-9 9H5v-4zM12 8l4 4',
      'ltv|CRM': 'M9 8a3 3 0 1 0 0.01 0M3 20a6 6 0 0 1 12 0M17 7a2.5 2.5 0 1 1 0 5M18 14a5 5 0 0 1 3 6',
      'ltv|Email-маркетинг': 'M3 5h18v14H3zM3 6l9 7 9-7',
      'marketplaces|Агрегатори': 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
      'marketplaces|B2B каталоги': 'M5 4h11l3 3v13H5zM9 10h7M9 14h7M9 18h4',
      'branding|Брендбук базовий': 'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12',
      'branding|Брендбук': 'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12M9 8h6',
      'branding|Логотип': 'M12 3l8 4.5v9L12 21l-8-4.5v-9z',
      'branding|Ребрендинг': 'M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4',
      'branding|Виставки': 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6',
      'consulting|Консультації': 'M4 5h16v11H9l-5 4z',
      'consulting|Аудит процесів': 'M9 4h6v3H9zM6 6h3M15 6h3v15H6V6M9 12l2 2 4-4',
      'consulting|Конверсія': 'M3 17l6-6 4 4 8-8M15 7h6v6',
      'consulting|Супровід': 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7v5l3 2',
      'consulting|AI-консультації': 'M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z',
    };
