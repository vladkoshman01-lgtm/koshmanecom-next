import type { ServicePage } from './types';

/** English copy for single-service pages. Draft — worth a native read-through. */
const shopify: ServicePage = {
  slug: 'shopify',
  category: 'Shopify development',
  categoryKey: 'shopify-dev',
  short: 'Shopify store development',
  metaTitle: 'Shopify Store Development Agency — Koshman Ecom',
  metaDescription:
    'Full-service Shopify store development: catalogue, custom theme, payments, shipping, integrations and launch. For brands in the EU, the UK and the US.',
  h1: 'Shopify store development, end to end',
  lead: 'Koshman Ecom builds Shopify stores for brands across Europe, the UK and the US: catalogue structure, custom theme design, payments, shipping, integrations and analytics. You get a store ready to take orders and a team that knows what comes next.',
  facts: [
    ['Format', 'End to end'],
    ['Launch time', 'from 4 weeks'],
    ['Platform', 'Shopify and Shopify Plus'],
    ['Markets', 'EU, UK, US'],
    ['After launch', 'support and growth'],
  ],
  areaServed: ['EU', 'GB', 'US'],
  updated: '28 October 2026',
  tldr: [
    'Shopify is a hosted e-commerce platform: hosting, security, payments and updates are handled by the platform.',
    'We take care of catalogue structure, theme design and build, payments, shipping, integrations and launch.',
    'The store is built for conversion: speed, a clear path to the cart and a proper mobile experience.',
    'After launch you can run the store yourself in the Shopify admin, or leave growth to us.',
  ],
  forTitle: 'Who a Shopify store fits',
  forWhom: [
    [
      'Brands with their own product',
      'When you need a store that looks like your brand, not like a marketplace template.',
    ],
    [
      'Marketplace sellers',
      'Etsy or Amazon sales already work, and it is time to own a channel without platform fees.',
    ],
    [
      'Stores on an old platform',
      'The site is slow, hard to update and loses traffic — we move the catalogue and orders to Shopify.',
    ],
    [
      'Wholesale companies',
      'A B2B store with a gated catalogue, customer-specific pricing and payment by invoice.',
    ],
  ],
  includedTitle: 'What store development includes',
  included: [
    ['Structure and catalogue', 'Categories, filters, product variants, collections and navigation for your range.'],
    ['Store design', 'Design in your brand style: home, catalogue, product page, cart and checkout.'],
    ['Theme development', 'A Shopify theme with custom sections you can edit later without a developer.'],
    ['Payments', 'Shopify Payments, Stripe, PayPal, local acquiring and cash on delivery.'],
    ['Shipping', 'Shipping zones and rates, carriers, live cost calculation in the cart.'],
    ['Integrations', 'CRM, inventory, ERP, carriers, email platforms, Pinterest and Google Merchant Center.'],
    ['Speed and mobile', 'Image and script optimisation, Core Web Vitals, testing on real phones.'],
    ['Analytics and launch', 'GA4, Consent Mode, cart and purchase events, domain transfer, final QA.'],
  ],
  stepsTitle: 'How we build a Shopify store',
  steps: [
    ['Week 1', 'Brief and structure', 'We study the product, the buyers and competitors, then map the catalogue.'],
    ['Week 2', 'Design', 'We design the key pages and agree on how the store will look.'],
    ['Weeks 3–4', 'Development', 'We build the theme, fill the catalogue, set up payments and shipping.'],
    ['Week 5', 'Integrations and QA', 'Services are connected, orders tested end to end, details polished.'],
    ['Launch', 'Go live', 'Domain transfer, analytics switched on, store handed over with instructions.'],
  ],
  compareTitle: 'A template on your own, or a store with an agency',
  compareColumns: ['On your own, on a template', 'With Koshman Ecom'],
  compare: [
    [
      'Time to launch',
      'Months of learning the platform and apps',
      'A clear plan and a working store in a few weeks',
    ],
    [
      'How the store looks',
      'A stock theme that looks like hundreds of others',
      'Brand design and a theme built around it',
    ],
    [
      'Conversion',
      'A path to the cart that just happened',
      'Product page, cart and checkout built for buying',
    ],
    [
      'Apps and running costs',
      'A dozen paid apps bought just in case',
      'Only the services you need; the rest lives in the theme code',
    ],
    [
      'SEO and AI search',
      'Duplicate pages, empty meta tags, no structured data',
      'Structure, meta tags, Schema.org and a sitemap from day one',
    ],
  ],
  priceTitle: 'How much a Shopify store costs',
  priceText:
    'The price depends on the number of products, the complexity of the design and the set of integrations. We quote after a short brief, usually within one working day. The first consultation is free.',
  priceFactorsTitle: 'What the price depends on',
  priceFactors: [
    'Number of products, variants and categories',
    'Design from scratch or an adapted theme',
    'Integrations: CRM, inventory, carriers, payments',
    'Number of store languages and currencies',
    'Support and growth after launch',
  ],
  expert: {
    name: 'Liza Koshman',
    role: 'Head of Shopify',
    bio: 'Co-owner of Koshman Ecom and head of the Shopify practice. Leads store development and growth projects for brands across Europe and the US.',
    image: '/team/Liza.png',
  },
  faqTitle: 'Shopify FAQ',
  faq: [
    [
      'How much does Shopify itself cost per month?',
      'Shopify is a subscription with several plans, from the basic one up to Shopify Plus for large stores. Current prices are on the Shopify pricing page and depend on your country and billing period. That fee goes to the platform and is not part of development — we help pick a plan that matches your order volume.',
    ],
    [
      'Which payment methods can you connect?',
      'Shopify Payments where your country supports it, plus Apple Pay, Google Pay, Stripe, PayPal, Klarna and local acquiring or bank transfer. The mix depends on where the business is registered and where your buyers are — we set it up during development.',
    ],
    [
      'How long does development take?',
      'Usually from four weeks. It depends on the number of products, whether photos and copy are ready, and how many integrations are needed. We give an exact date after the brief.',
    ],
    [
      'Can you migrate a store from another platform?',
      'Yes. We move products, categories, customers and orders from WooCommerce, Magento, PrestaShop, BigCommerce or a custom site, and keep old URLs with redirects so you do not lose Google rankings.',
    ],
    [
      'Will I be able to edit the store myself?',
      'Yes, that is the main reason to choose Shopify. Products, prices, copy and homepage blocks are edited in the admin without a developer — we make theme sections editable and hand over a short video guide.',
    ],
    [
      'Do you build multilingual stores?',
      'Yes. Shopify Markets gives you several languages and currencies in one store: buyers see prices in their currency, and each language gets its own URLs and hreflang for Google.',
    ],
    [
      'Does Shopify work for wholesale B2B?',
      'Yes. We set up a gated catalogue for approved customers, customer-specific price lists, minimum order quantities and payment by invoice. Shopify Plus also has dedicated B2B features.',
    ],
    [
      'Do you handle SEO and ads after launch?',
      'Yes. The store ships with a technical SEO foundation, and from there we can take on SEO, AI-search optimisation, Google Ads and Meta Ads — separate services that often follow development directly.',
    ],
  ],
  relatedTitle: 'Related services',
  related: [
    [
      'Shopify development',
      'Shopify improvements',
      'New sections, integrations, speed and bug fixes for an existing store.',
      '/services#shopify-dev',
    ],
    [
      'Strategy and growth plan',
      'Shopify CRO audit',
      'We find where the store loses buyers and build a plan to grow conversion.',
      '/services#strategy',
    ],
    [
      'SEO',
      'SEO services',
      'Growing organic traffic in Google and visibility in AI search.',
      '/services#seo',
    ],
    [
      'Advertising',
      'Google Ads and Meta Ads',
      'Traffic to the new store with a focus on return on ad spend.',
      '/services#ads',
    ],
  ],
  leadTitle: 'Let us build your Shopify store',
  leadText:
    'Tell us about the product and the market — we will propose a structure, a timeline and a price.',
};

/**
 * Google Ads, English — international page. No single country, currency or
 * local legal claims: country pages (/en/services/google-ads/uk, /us) come later.
 */
const googleAds: ServicePage = {
  slug: 'google-ads',
  category: 'Advertising',
  categoryKey: 'ads',
  short: 'Google Ads',
  metaTitle: 'Google Ads Agency for E-commerce & Growth | Koshman Ecom',
  metaDescription:
    'Google Ads setup and management for e-commerce, B2B and service businesses. Search, Shopping, Performance Max, tracking and ROAS-focused optimization. Book a consultation.',
  h1: 'Google Ads management for e-commerce and growth',
  lead: 'We set up, manage and optimize Google Ads to turn qualified search demand into sales, leads and measurable growth.',
  leadExtra:
    'From Search and Shopping to Performance Max, remarketing and conversion tracking, we connect paid media with your website, analytics and commercial goals.',
  sectionLabels: false,
  stepsAccent: true,
  stepsCta: 'Discuss your project',
  leadPosition: 'after-price',
  heroCta: { primary: 'Discuss your project', secondary: 'Book a consultation' },
  facts: [
    ['Format', 'Setup and ongoing management'],
    ['Campaigns', 'Search, Shopping, PMax'],
    ['Measurement', 'GA4, GTM, conversions'],
    ['Reporting', 'Client dashboard'],
    ['Markets', 'Local and international'],
  ],
  areaServed: ['EU', 'GB', 'US'],
  updated: '13 November 2026',
  forTitle: 'Who can benefit from Google Ads management?',
  forWhom: [
    ['E-commerce brands', 'Product sales through Search, Shopping and Performance Max.'],
    ['B2B companies', 'Qualified enquiries and lead generation through Search.'],
    ['Service businesses', 'Calls, forms, bookings and consultations.'],
    ['Manufacturers and brands', 'Controlled demand generation in selected markets.'],
    ['Businesses already running ads', 'Account audits, tracking fixes and performance optimization.'],
    ['International businesses', 'Campaigns adapted to country, language, currency, search behaviour and fulfilment.'],
  ],
  forWhomNote:
    'Google Ads cannot compensate for an unclear offer, a broken checkout, poor product-market fit or missing conversion data. Before launch, we check whether the website, landing pages and sales process are ready to convert paid traffic.',
  includedTitle: 'What is included in Google Ads setup?',
  includedIntro:
    'Setup is a structured process, not a one-click launch. A good start begins with the business, the website and how results will be measured.',
  included: [
    ['Business and goal analysis', 'Offer, margins, markets, customer journey and KPIs.'],
    ['Search and competitor research', 'How customers search and what alternatives they see.'],
    ['Landing-page review', 'Relevance, mobile usability, offer clarity, forms, checkout and trust.'],
    ['Keyword and search-term planning', 'Commercial queries, exclusions and intent groups.'],
    ['Campaign architecture', 'Campaigns, ad groups or asset groups, locations, languages, audiences and budgets.'],
    ['Ad and asset creation', 'Headlines, descriptions, extensions, assets and calls to action.'],
    [
      'Measurement and e-commerce setup',
      'GA4, GTM, Google Ads conversion tracking and value-based measurement; Merchant Center, product feeds and purchase tracking where required.',
    ],
    ['Launch QA', 'Policy review, links, tracking, feed status, budgets and first signals.'],
  ],
  stepsTitle: 'How to start working with Koshman Ecom',
  steps: [
    ['Step 1', 'Tell us about the business', 'Product, market, website and current challenge.'],
    ['Step 2', 'Initial consultation', 'Goals, budget, tracking, website and existing campaigns.'],
    ['Step 3', 'Audit and plan', 'Priorities, scope, measurement and recommended next steps.'],
    ['Step 4', 'Launch or optimize', 'Setup, fixes, testing and ongoing improvement.'],
  ],
  priceTitle: 'How much does Google Ads management cost?',
  priceText:
    'There is no single price that fits every account. Scope depends on the number of campaigns, markets, products or services, the current account structure, measurement requirements and business goals. Contact us with a short brief and we will recommend the right next step.',
  priceFactorsTitle: 'What the total scope may include',
  priceFactors: [
    'Google media spend — paid directly to Google for clicks and impressions',
    'Initial account setup or audit',
    'Ongoing management and optimization',
    'Additional website, analytics, CRM, feed or Merchant Center work, if needed',
  ],
  expert: {
    name: 'Vlad Koshman',
    role: 'Founder, Koshman Ecom',
    bio: 'An international e-commerce specialist. Owns strategy, sales launches and bringing AI into business processes. Explains how Google Ads should work together with the website, analytics and commercial goals.',
    image: '/team/Vlad.png',
  },
  faqTitle: 'Google Ads FAQ',
  faq: [
    [
      'What is Google Ads management?',
      'Google Ads management is the ongoing work of planning, monitoring, optimizing and reporting on Google Ads campaigns. It goes beyond creating ads once and includes budgets, search terms, conversions, landing pages and business outcomes.',
    ],
    [
      'Do you manage Google Ads for e-commerce stores?',
      'Yes. For e-commerce projects we can work with Search, Shopping, Performance Max, Merchant Center, product feeds, purchase tracking and revenue-focused optimization, depending on the store and goals.',
    ],
    [
      'Do you work with B2B and lead-generation campaigns?',
      'Yes. Search campaigns can be structured around relevant commercial queries, lead quality and the sales process. Where technically available, CRM or offline conversion data can help evaluate leads beyond form submissions.',
    ],
    [
      'How much budget do I need for Google Ads?',
      'There is no universal minimum. Budget depends on competition, market, cost per click, margins, sales cycle and the amount of data needed to evaluate performance. We recommend assessing the budget against the economics of the business.',
    ],
    [
      'How quickly will Google Ads produce results?',
      'Clicks and early conversions may appear soon after launch, but reliable evaluation requires enough data. Timing depends on demand, competition, budget, website quality, offer and tracking.',
    ],
    [
      'Do you guarantee a specific ROAS or number of sales?',
      'No. Results depend on the offer, market, demand, competition, budget, website, seasonality, stock and sales process. We define goals, improve measurement and optimize based on evidence.',
    ],
    [
      'Do you work with international clients?',
      'Yes. Koshman Ecom works with local and international e-commerce projects. Market-specific campaigns should be adapted to language, currency, location, search behaviour, fulfilment and local commercial conditions.',
    ],
  ],
  relatedTitle: 'Related services',
  related: [
    ['Advertising', 'Meta, TikTok, Pinterest and YouTube', 'Paid social and video: campaign launch, creatives and optimization for your product.', '/services#ads'],
    ['Shopify development', 'Shopify store', 'The technical base for paid traffic: catalogue, speed, payments and delivery.', '/services#shopify-dev'],
    ['Blog', 'Abandoned carts and lost paid traffic', 'Where stores lose visitors they already paid for — and what to fix first.', '/blog/abandoned-carts-lost-paid-traffic'],
    ['About us', 'How we work', 'The team, our approach and a transparent process for e-commerce projects.', '/about'],
  ],
  leadTitle: "Let's discuss Google Ads for your business",
  leadText:
    'Tell us about your product, market and current campaigns — we will prepare recommendations, a plan and a project estimate.',
  extraSections: [
    {
      id: 'what-is-google-ads',
      tone: 'light',
      placement: 'after-tldr',
      title: 'What is Google Ads?',
      intro:
        'Google Ads is Google’s advertising platform for reaching people who are searching, comparing, watching and shopping online.\n\nBusinesses use it to generate sales, leads, calls, bookings or brand demand across Google Search, Shopping, YouTube, Maps, Display and other Google surfaces, depending on the campaign type.',
      variant: 'cards',
      items: [
        [
          'Media spend',
          'The money paid to Google for clicks and impressions. It is set by demand, competition and what a sale or lead is worth to you — not by the agency.',
        ],
        [
          'Agency fees',
          'A separate fee for setup and ongoing management: research, campaign structure, ads, tracking, data checks and regular optimization.',
        ],
        [
          'Business outcomes',
          'Sales, qualified leads, revenue and profit. Ads can bring a qualified visit, but the result also depends on the offer, website, pricing, checkout, delivery, sales process and measurement.',
        ],
      ],
    },
    {
      id: 'management',
      marker: 'check',
      placement: 'after-included',
      title: 'What is included in ongoing Google Ads management?',
      intro:
        'Setup creates the foundation.\n\nOngoing management uses real campaign data to improve targeting, budgets, ads, tracking and commercial outcomes over time.',
      variant: 'list',
      items: [
        ['Budget and pacing checks', 'Spend goes where it should, and expensive queries without results do not eat the budget.'],
        ['Search-term analysis', 'What you actually pay for and which queries bring enquiries and purchases.'],
        ['Negative keyword management', 'Cutting queries that bring clicks but no customers.'],
        ['Bid and budget optimization', 'Bidding strategies tuned to business goals and real project data.'],
        ['Ad and asset testing', 'Headlines, descriptions and assets tested to find stronger versions.'],
        ['Conversion quality checks', 'Making sure the account counts the actions that actually make money.'],
        ['Campaign types as relevant', 'Search, Shopping, Performance Max, Display and remarketing — where they fit the goal.'],
        ['Merchant Center and feed checks', 'For e-commerce: titles, prices, availability and product statuses.'],
        ['Landing-page and CRO recommendations', 'Where a page loses buyers and what is worth fixing on the website.'],
        ['Client reporting dashboard', 'The current picture in a clear dashboard, without waiting for a separate report.'],
        ['Regular reporting with next steps', 'What changed, what we decided and what happens next.'],
      ],
      outro:
        'The scope depends on the number of campaigns, markets, catalogue size and business goals. Results are also shaped by seasonality, demand, competition, pricing, stock, website quality and sales follow-up.',
    },
    {
      id: 'campaign-types',
      tone: 'grey',
      placement: 'after-included',
      title: 'Which Google Ads campaigns do we manage?',
      intro:
        'The campaign type follows the goal: sales, leads, reach or bringing visitors back. These are the formats we work with most.',
      variant: 'cards',
      items: [
        [
          'Search campaigns',
          'Search campaigns connect your business with people actively looking for a product or service. They are often used for high-intent queries, lead generation, local services and selected e-commerce categories.',
        ],
        [
          'Shopping ads',
          'Shopping ads show products with images, prices and store information. They are important for retailers and depend on a healthy Merchant Center account, accurate product data and purchase tracking.',
        ],
        [
          'Performance Max',
          'Performance Max uses Google automation to access multiple Google surfaces. It works best when goals, conversion signals, creative assets, product data and value tracking are properly prepared.',
        ],
        [
          'Remarketing',
          'Remarketing helps re-engage people who have already visited your website, viewed products or started but did not complete an action. It supports the customer journey but does not replace fixing website or checkout problems.',
        ],
        [
          'Display and YouTube',
          'Additional formats for reach and demand generation. We use them where they fit the business goal — not every format is part of every project.',
        ],
      ],
    },
    {
      id: 'ecommerce',
      marker: 'check',
      tone: 'dark',
      placement: 'after-included',
      title: 'Google Ads for e-commerce',
      intro:
        'For an online store, Google Ads is connected to the catalogue, product feed, Merchant Center, prices, stock, delivery, checkout, purchase tracking and product economics.\n\nIncreasing spend before these elements are reliable can simply increase the cost of losing visitors.',
      variant: 'list',
      items: [
        ['Merchant Center status', 'Account health, domain verification and settings Shopping ads depend on.'],
        ['Product feed quality', 'Titles, descriptions, images, prices and availability that match the real catalogue.'],
        ['Category and product priorities', 'Which categories and products to push first.'],
        ['Product view, cart and purchase events', 'Key store events passed correctly to the ad account.'],
        ['Revenue and order value', 'Purchase value sent back, so optimization follows money, not clicks.'],
        ['ROAS in the context of margin', 'Profitability by category, not just one account-level number.'],
        ['Your store platform', 'Shopify, WooCommerce or another platform — we work with the stack the project actually uses.'],
        ['Delivery and checkout', 'Clear shipping, returns and payment terms, so paid traffic does not drop off before buying.'],
      ],
      cta: 'Discuss Google Ads for your store',
    },
    {
      id: 'measurement',
      marker: 'tiles',
      outroTitle: 'Client reporting dashboard',
      placement: 'after-included',
      title: 'How we measure Google Ads performance',
      intro:
        'A click is not a business outcome.\n\nDepending on the business model, the useful outcome may be a qualified lead, phone call, booking, purchase, revenue or new customer.',
      variant: 'list',
      items: [
        ['GA4', 'Website behaviour and events before and after the ad click.'],
        ['GTM', 'Tag and event management without messy changes to the site code.'],
        ['Google Ads conversion tracking', 'Sends agreed actions back to the advertising platform.'],
        ['CRM and call tracking', 'Lead quality and closed revenue — where needed and technically available.'],
        ['ROAS', 'Revenue generated in relation to advertising spend.'],
        ['CAC and cost per customer', 'How efficiently you acquire customers, and whether the margin can carry it.'],
        ['Margin', 'Why the same ROAS can have different value across products.'],
      ],
      outro:
        'Clients get access to a clear reporting dashboard where they can review the current or regularly updated picture: spend, traffic, leads or purchases, revenue, cost per result and ROAS, depending on the project’s measurement setup.\n\nThe exact metrics and update frequency depend on the data sources and agreed goals.',
    },
    {
      id: 'why-no-sales',
      marker: 'dot',
      tone: 'grey',
      placement: 'after-included',
      title: 'Why Google Ads may bring clicks but not sales',
      intro:
        'When ads bring clicks but not sales, the cause usually sits somewhere in the chain: query → page → offer → checkout.\n\nThese are the issues we check during an audit — before suggesting any budget increase.',
      variant: 'list',
      items: [
        ['Broad or low-intent queries', 'Budget goes to traffic that rarely buys.'],
        ['Missing negative keywords', 'Irrelevant searches take spend without bringing customers.'],
        ['Ad-to-landing-page mismatch', 'The page does not deliver what the ad promised.'],
        ['Broken or incomplete conversion tracking', 'The account optimizes for the wrong actions.'],
        ['Rejected products in Merchant Center', 'Part of the catalogue simply does not show in Shopping.'],
        ['Slow or difficult mobile experience', 'Visitors leave before they see the offer.'],
        ['Unclear pricing, shipping or returns', 'Buyers cannot tell the full cost or delivery time.'],
        ['Checkout or payment friction', 'Visitors reach checkout and drop off there.'],
        ['Optimizing for clicks', 'The business needs sales or qualified leads, not the cheapest clicks.'],
        ['Budget that does not fit the market', 'Spend does not match competition and the length of the sales cycle.'],
      ],
      outroTitle: 'A simple diagnostic sequence',
      outroSteps: [
        'Is the right audience arriving?',
        'Are search terms commercially relevant?',
        'Is tracking recording the intended actions?',
        'Is the landing page or checkout losing users?',
        'Does the result make sense for the business margin and sales model?',
      ],
      cta: 'Start with a Google Ads audit',
    },
  ],
  schema: {
    name: 'Google Ads management for e-commerce and growth',
    serviceType: 'Google Ads management and PPC advertising',
    offers: false,
  },
};

/**
 * Сторінку Shopify знято з сайту (рішення від 13.11.2026). Текст лишається тут
 * чернеткою: щоб повернути — додати `[draftShopify.slug]: draftShopify` у мапу нижче
 * і `'shopify-dev|Shopify': 'shopify'` у SERVICE_PAGE_BY_ITEM (index.ts).
 */
export const draftShopify = shopify;

export const enServicePages: Record<string, ServicePage> = {
  [googleAds.slug]: googleAds,
};

export default enServicePages;
