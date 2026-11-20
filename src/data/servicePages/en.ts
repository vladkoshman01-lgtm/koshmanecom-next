import type { ServicePage } from './types';

/**
 * English copy for single-service pages.
 *
 * Shopify store development, English version of the UA page (same section order
 * and ids, so icons in icons.ts line up). No case studies, prices, timelines or
 * guarantees; specific payment, shipping and CRM providers are not named.
 */
const shopify: ServicePage = {
  slug: 'shopify',
  category: 'Shopify development',
  categoryKey: 'shopify-dev',
  short: 'Shopify store development',
  metaTitle: 'Shopify Store Development Agency | Koshman Ecom',
  metaDescription:
    'Shopify store design and development for ecommerce brands. Setup, custom themes, integrations, migration, analytics and launch support.',
  h1: 'Shopify Store Development for Ecommerce Brands',
  lead: 'Launch a Shopify store built around your products, customers and sales process—not just its appearance.',
  leadExtra:
    'We plan the store structure, design and customise the theme, organise your catalogue, configure suitable payment and shipping options, connect essential systems, and test the customer journey before launch. Koshman Ecom is an international ecommerce agency working with clients in Europe and the US, helping ecommerce brands, D2C businesses, manufacturers and B2B companies launch, improve and expand their online stores.',
  sectionLabels: false,
  stepsAccent: true,
  stepsCta: 'Discuss your Shopify project',
  heroCta: { primary: 'Discuss your Shopify project', secondary: 'Book a consultation' },
  facts: [
    ['Delivery', 'End-to-end development within an agreed scope'],
    ['Platform', 'Shopify'],
    ['For', 'B2C, B2B and D2C businesses'],
    ['Core setup', 'Catalogue, payments, shipping, analytics and integrations'],
  ],
  areaServed: ['EU', 'GB', 'US'],
  updated: '18 November 2026',
  forTitle: 'Who is Shopify store development for?',
  forWhom: [
    [
      'New brands',
      'Launch your first online store with a clear structure, an organised catalogue and a foundation for future marketing.',
    ],
    [
      'Established ecommerce businesses',
      'Move to Shopify, refresh your design, improve the customer experience or develop an existing store without rebuilding everything.',
    ],
    [
      'Manufacturers and D2C brands',
      'Sell directly to customers, develop your own customer relationships and reduce reliance on marketplaces.',
    ],
    [
      'B2B companies',
      'Explore wholesale ordering, customer-specific catalogues and pricing, company accounts and connections to internal systems. The appropriate Shopify B2B setup depends on your requirements, plan and available solutions.',
    ],
    [
      'Businesses entering new markets',
      'Prepare for international sales with suitable language, currency, content and operational settings. We assess Shopify Markets and other localisation options against your target countries, business entity, payments and logistics.',
    ],
    [
      'Businesses planning their next stage of growth',
      'Build a store that supports advertising, SEO, customer retention, measurement and future development.',
    ],
  ],
  forWhomNote:
    'Shopify does not replace a strong product, a clear offer or a marketing strategy. Before development, we review your business, product range, markets, logistics and goals to identify the features your store actually needs.',
  includedTitle: 'What is included in Shopify store development?',
  includedIntro:
    'Our Shopify ecommerce development service brings together the customer-facing store and the systems needed to operate it. The final deliverables are defined in the project scope.',
  included: [
    [
      'Business and requirements analysis',
      'We review your products, audience, catalogue, sales model, target markets, competitors and priorities.',
    ],
    [
      'Store structure',
      'We plan navigation, the homepage, collections, product pages, information pages and the route from browsing to checkout.',
    ],
    [
      'Shopify design and theme development',
      'We select and configure a suitable theme, customise it to match your brand or develop bespoke components where needed. The approach depends on your requirements, budget and project complexity.',
    ],
    [
      'Catalogue and product data',
      'We configure products, variants, collections, filters, prices and inventory settings. Product imports and content population can be included where required.',
    ],
    [
      'Product pages',
      'We structure product pages to explain the offer clearly, present specifications and options, and make delivery, returns and purchasing conditions easy to find.',
    ],
    [
      'Payments and shipping',
      'We assess and configure suitable payment providers, shipping options, rates and checkout settings. Availability depends on your country, business entity, Shopify plan and third-party services.',
    ],
    [
      'Apps and integrations',
      'We assess and implement the Shopify integrations needed for your operations, such as CRM, ERP, inventory, accounting or marketing connections. Compatibility, data flows and technical limitations are reviewed before implementation.',
    ],
    [
      'Analytics',
      'We configure agreed measurement tools and ecommerce events, such as product views, add-to-cart actions, checkout starts and purchases. Implementation depends on the technical setup, consent requirements and platform capabilities.',
    ],
    [
      'Mobile experience',
      'We check navigation, collections, product pages, the cart, forms and checkout across relevant mobile and tablet screen sizes.',
    ],
    [
      'Testing and launch',
      'We test products, prices, navigation, payment and shipping scenarios, forms, analytics and order flows before launch.',
    ],
    [
      'Handover and training',
      'We provide the agreed access, explain essential product and order management tasks, and share recommendations for the next stage of development.',
    ],
  ],
  // The seven-stage build process is its own section above; this is the short start
  stepsTitle: 'How to start working with Koshman Ecom',
  steps: [
    ['Step 1', 'Tell us about your project', 'Share your business, products, markets and the work you need.'],
    [
      'Step 2',
      'Book a short consultation',
      'We clarify whether the priority is a new store, migration, improvements, a B2B solution or an audit.',
    ],
    [
      'Step 3',
      'Review the estimate and plan',
      'We propose the scope, delivery stages, priorities, expected timeline and estimated cost.',
    ],
    [
      'Step 4',
      'Develop and launch',
      'We build or improve your store, test the agreed customer journeys and prepare it for operation.',
    ],
  ],
  priceTitle: 'How much does Shopify store development cost?',
  priceText:
    'There is no single price for every Shopify project. The cost depends on the design approach, number of pages and products, catalogue complexity, integrations, markets, migration requirements and custom functionality. We separate agency work from platform and third-party costs so you can understand the full project budget. After a short brief, we prepare a project estimate based on the actual requirements rather than an arbitrary starting price.',
  priceCta: 'Get a project estimate',
  priceFactorsTitle: 'What makes up the budget',
  priceFactors: [
    'Shopify plan fees: your subscription, payment processing and transaction charges are paid separately from agency fees',
    'Agency services: the agreed analysis, planning, design, development, configuration, integrations, testing and launch work',
    'Paid themes and apps: one-off or recurring charges, identified during planning',
    'Integrations and technical complexity: CRM or ERP connections, external APIs, migration, B2B workflows and eligible checkout customisations can increase the scope',
    'Post-launch work: additional development, maintenance, CRO, SEO and advertising can be commissioned separately',
  ],
  expert: {
    name: 'Liza Koshman',
    role: 'Co-owner, Koshman Ecom',
    bio: 'A strategic manager working with ecommerce brands and head of the Shopify ecosystem team. Helps define what your store needs and leads it from brief to launch.',
    image: '/team/Liza.png',
  },
  faqTitle: 'Frequently asked questions',
  faq: [
    [
      'How much does Shopify store development cost?',
      'The estimate depends on design, catalogue size, integrations, migration, target markets and functionality. Shopify plan fees, paid themes, apps and third-party services are separate from agency fees. We provide an estimate after reviewing your brief.',
    ],
    [
      'How long does it take to build a Shopify store?',
      'Timing depends on the scope, content readiness, product data, integrations and approval process. We agree on a realistic delivery plan after the initial consultation.',
    ],
    [
      'Can you build a Shopify store from scratch?',
      'Yes. We can handle store planning, design, theme configuration or custom development, catalogue setup, suitable payment and shipping options, analytics, testing and launch within an agreed scope.',
    ],
    [
      'Can you migrate an existing store to Shopify?',
      'Yes, subject to an assessment of your current platform and data. We review products, customers, orders, content, URLs, SEO requirements and integrations, then identify what can be transferred and how.',
    ],
    [
      'Is Shopify suitable for international businesses?',
      'It can be, but suitability depends on your business entity, target countries, payment providers, logistics and localisation needs. We assess Shopify Markets, languages, currencies and relevant integrations for your project. The same applies to businesses operating from Ukraine or other markets with specific local requirements.',
    ],
    [
      'Do you work with Shopify B2B stores?',
      'Yes. We assess company accounts, customer-specific catalogues and pricing, wholesale conditions, ordering rules and internal system integrations. Available features depend on the Shopify plan and chosen implementation.',
    ],
    [
      'Do I need a custom Shopify theme?',
      'Not necessarily. A well-configured existing theme may meet your needs. Custom development is appropriate when the standard options cannot support important brand or business requirements.',
    ],
    [
      'Can I commission improvements to an existing Shopify store?',
      'Yes. We can scope theme updates, additional features, integrations, bug fixes, performance improvements or maintenance without committing you to a full rebuild.',
    ],
    [
      'Do you prepare Shopify stores for advertising and SEO?',
      'We account for catalogue structure, product pages, mobile usability, agreed analytics and basic technical SEO. Feed preparation can be included in the scope. Ongoing SEO and advertising management are separate services.',
    ],
    [
      'Will I receive store access and training after launch?',
      'Yes. We hand over the agreed access and explain essential store, product and order management tasks. Any additional training or support is defined in the project scope.',
    ],
  ],
  relatedTitle: 'Related services',
  related: [
    [
      'Advertising',
      'Google Ads for ecommerce',
      'Search, Shopping and Performance Max for a store with purchase tracking in place.',
      '/services/google-ads',
    ],
    [
      'Shopify development',
      'Shopify improvements',
      'New sections, integrations, performance and bug fixes for a store that is already live.',
      '/services#shopify-dev',
    ],
    [
      'Shopify development',
      'Shopify B2B',
      'Wholesale selling: company catalogues, customer-specific pricing and ordering rules.',
      '/services#shopify-dev',
    ],
    [
      'Strategy and growth plan',
      'Shopify CRO audit',
      'A review of the funnel, UX and checkout: where the store loses customers.',
      '/services#strategy',
    ],
    [
      'SEO',
      'Ecommerce SEO',
      'Organic visibility for your catalogue, collections and products in Google.',
      '/services#seo',
    ],
    [
      'Contacts',
      'Get in touch',
      'Telegram, WhatsApp, phone or email: choose the channel that suits you.',
      '/contacts',
    ],
  ],
  extraSections: [
    {
      id: 'what-is-shopify',
      tone: 'light',
      placement: 'after-tldr',
      title: 'What is a Shopify store?',
      intro:
        'Shopify is an ecommerce platform for building an online store and managing products, orders, customers and sales from one admin area.\n\nThe platform provides the technical foundation. Your store still needs a structure, catalogue, design and operational setup that fit your business. Customers need to find products, understand the offer and complete an order using the payment and delivery options available to them.\n\nOur Shopify website development process connects these elements—from business requirements and store planning to testing, launch and agreed next steps.',
      variant: 'cards',
    },
    {
      id: 'ready-to-sell',
      tone: 'grey',
      placement: 'after-tldr',
      title: 'What does a Shopify store need to be ready to sell?',
      variant: 'cards',
      items: [
        [
          'A configured platform',
          'Shopify provides the core tools for products, collections, orders, customer records and store management. These tools need to be configured for your sales model, market and day-to-day operations.',
        ],
        [
          'A store built around your business',
          'The theme, navigation, content, filters, product pages and integrations should reflect your products and how customers buy them. Checkout configuration and customisation depend on the Shopify plan and available capabilities.',
        ],
        [
          'A complete buying journey',
          'A store needs more than a strong visual identity. Customers should be able to browse comfortably on mobile, understand pricing and delivery, and place an order without avoidable friction. Analytics and a sound technical foundation help you assess and improve that journey after launch.',
        ],
      ],
    },
    {
      id: 'process',
      marker: 'numbered',
      tone: 'light',
      placement: 'after-included',
      title: 'How we build your Shopify store',
      intro:
        'Seven stages from the first enquiry to launch. Each one ends with an agreed result, so you can see what has been done and what comes next.',
      variant: 'list',
      items: [
        [
          'Initial enquiry',
          'Tell us about your business, products, target markets, current website or platform, and what you want to achieve.',
        ],
        [
          'Consultation and brief',
          'We clarify the catalogue, required features, integrations, budget, deadlines and preferred store setup.',
        ],
        [
          'Structure and project plan',
          'We define the store architecture, deliverables, priority pages, technical approach and launch sequence.',
        ],
        [
          'Design and theme configuration',
          'We work on brand styling, page layouts, navigation, catalogue presentation and the main customer journeys.',
        ],
        [
          'Development and integrations',
          'We configure Shopify, products, collections, payments, shipping, apps, analytics and the agreed system connections.',
        ],
        [
          'Testing',
          'We review the buying journey on relevant devices and test ordering, payments, delivery options and data transfer.',
        ],
        [
          'Launch and next steps',
          'We publish the store, complete the agreed launch checks and handover, and identify priorities such as advertising, SEO, conversion optimisation, email marketing, CRM or international expansion.',
        ],
      ],
      cta: 'Discuss your Shopify project',
    },
    {
      id: 'variants',
      tone: 'grey',
      placement: 'after-included',
      title: 'Shopify development options',
      variant: 'cards',
      items: [
        [
          'Theme-based store setup',
          'A practical option for a straightforward catalogue or a more focused budget. We configure an existing theme’s colours, typography, sections, pages and product presentation to suit your brand.',
        ],
        [
          'Shopify theme customization',
          'For stores that need more than the theme’s standard features. We can create additional sections, adjust layouts, improve mobile usability and develop specific interface elements.',
        ],
        [
          'Custom Shopify development',
          'For more complex requirements, such as specialised buying journeys, product configurators, larger catalogues or custom integrations. We assess feasibility and platform constraints before agreeing on a solution.',
        ],
      ],
      outro:
        'Not every business needs a bespoke theme. Equally, an off-the-shelf theme may not meet every requirement. We recommend the approach after reviewing the project.',
    },
    {
      id: 'ecommerce',
      marker: 'check',
      tone: 'dark',
      placement: 'after-included',
      title: 'Shopify for ecommerce stores',
      intro:
        'A successful store needs more than a well-designed homepage.\n\nYour catalogue, product pages, stock information, delivery options, payments and orders need to work together.',
      variant: 'list',
      items: [
        [
          'Catalogue and collections',
          'We organise products around how customers browse and search, helping them find the right category, variant or item.',
        ],
        [
          'Product feeds and advertising readiness',
          'Where included in the scope, we prepare catalogue data and assess feed requirements for channels such as Google Shopping and Meta. Channel setup and product eligibility depend on the relevant platform policies and account requirements.',
        ],
        [
          'Purchase and revenue measurement',
          'We configure agreed ecommerce events so you can analyse orders and revenue alongside traffic, subject to consent settings and technical limitations.',
        ],
        [
          'Clear delivery and payment information',
          'We make delivery options, costs, timing and payment information easier to understand before checkout, helping customers make informed decisions.',
        ],
        [
          'Mobile shopping',
          'We review menus, search, filters, product pages, the cart and checkout on mobile devices—not just the desktop layout.',
        ],
        [
          'A foundation for conversion optimisation',
          'We build a store structure that can be measured and improved after launch, from product discovery through to completed purchases.',
        ],
      ],
      cta: 'Discuss your Shopify project',
      actions: [{ label: 'Google Ads for ecommerce', href: '/services/google-ads' }],
    },
    {
      id: 'b2b',
      marker: 'check',
      tone: 'light',
      placement: 'after-included',
      title: 'Shopify for B2B and wholesale',
      intro:
        'Shopify can support wholesale and business purchasing as well as direct-to-consumer sales.\n\nFor manufacturers, distributors and wholesale businesses, we can assess requirements such as these.',
      variant: 'list',
      items: [
        ['Customer-specific catalogues', ''],
        ['Negotiated or company-specific pricing', ''],
        ['Wholesale price lists', ''],
        ['Company accounts', ''],
        ['Multiple buyers within a company account', ''],
        ['Minimum order quantities and quantity rules', ''],
        ['Payment terms', ''],
        ['Faster repeat ordering', ''],
        ['CRM and ERP connections', ''],
      ],
      outro:
        'These features are not available in the same way on every Shopify plan. The solution may involve native B2B capabilities, apps or custom development, depending on your requirements.\n\nIf you need a dedicated wholesale store or a combined B2C and B2B operation, explore the specialist B2B Shopify service.',
      actions: [
        { label: 'Explore Shopify B2B', href: '/services#shopify-dev' },
        { label: 'Discuss a B2B store', service: 'Shopify B2B' },
      ],
    },
    {
      id: 'existing-store',
      marker: 'check',
      tone: 'grey',
      placement: 'after-included',
      title: 'Already have a Shopify store?',
      intro:
        'You may not need a new build.\n\nWe can assess your existing store and define a focused improvement project. This can include the following.',
      variant: 'list',
      items: [
        ['Developing additional functionality', ''],
        ['Updating or replacing the theme', ''],
        ['Adding new sections', ''],
        ['Connecting a new integration', ''],
        ['Resolving technical issues', ''],
        ['Improving the mobile experience', ''],
        ['Addressing performance bottlenecks', ''],
        ['Redesigning key pages or the wider store', ''],
        ['Preparing the store for advertising', ''],
        ['Investigating conversion barriers', ''],
      ],
      outro: 'A Shopify CRO audit can provide a separate review of the buying journey, user experience and checkout.',
      actions: [
        { label: 'Discuss Shopify improvements', service: 'Shopify improvements' },
        { label: 'Request a Shopify CRO audit', service: 'Shopify CRO audit' },
      ],
    },
    {
      id: 'migration',
      marker: 'check',
      tone: 'light',
      placement: 'after-included',
      title: 'Shopify migration',
      intro:
        'If your store runs on another platform, we can assess whether moving to Shopify is the right next step and plan the migration.\n\nA Shopify migration involves more than transferring products. It may also require customer and order data, content, URLs, metadata, integrations, analytics and the existing SEO structure. Depending on the source platform and agreed scope, we can help with the following.',
      variant: 'list',
      items: [
        ['Reviewing the current platform and data', ''],
        ['Preparing a migration plan', ''],
        ['Moving products and catalogue information', ''],
        ['Transferring customer and order records', 'Where the source platform and scope support it.'],
        ['Mapping existing URLs to their new equivalents', ''],
        ['Implementing appropriate 301 redirects', ''],
        ['Transferring page metadata and content', ''],
        ['Configuring a new theme or redesign', ''],
        ['Testing payment and delivery scenarios', ''],
        ['Checking analytics', ''],
        ['Launching the store and completing agreed post-launch checks', ''],
      ],
      outro:
        'We identify data limitations before migration, including information that cannot be transferred directly or may need a different approach.\n\nMigration planning can reduce SEO risk, but it cannot guarantee that all rankings or traffic will remain unchanged. Results depend on the existing site, data quality, URL mapping, technical implementation and how search engines process the new store.',
      cta: 'Discuss your Shopify migration',
    },
    {
      id: 'integrations',
      marker: 'dot',
      tone: 'grey',
      placement: 'after-included',
      title: 'Shopify integrations',
      intro:
        'Your store may need to work with a wider business system rather than operate as a standalone website.\n\nWe can assess connections with the following.',
      variant: 'list',
      items: [
        ['CRM platforms', ''],
        ['ERP systems', ''],
        ['Accounting software', ''],
        ['Warehouse and inventory systems', ''],
        ['Product information management systems', ''],
        ['Email marketing platforms', ''],
        ['Payment services', ''],
        ['Shipping and fulfilment providers', ''],
        ['Analytics tools', ''],
        ['External APIs', ''],
      ],
      outro:
        'The implementation method depends on the service, country, documentation, API access, subscription plans and platform limitations.\n\nBefore development, we review compatibility, required data flows, synchronisation rules and error handling to determine a suitable approach.',
    },
    {
      id: 'readiness',
      marker: 'tiles',
      tone: 'light',
      placement: 'after-included',
      title: 'How we assess launch readiness',
      intro:
        'A store is not ready simply because its pages load.\n\nBefore launch, we test the agreed scope against practical selling and operational requirements.',
      variant: 'list',
      items: [
        ['Catalogue', 'Products, variants, prices, stock information, images and collections display as expected.'],
        ['Navigation', 'Customers can find relevant products without unnecessary steps or confusing category structures.'],
        [
          'Product pages',
          'Essential product information, purchase conditions, delivery details and returns information are accessible.',
        ],
        [
          'Cart and checkout',
          'Customers can add products, change quantities and complete the available checkout steps. We test the fields and configurations relevant to the project.',
        ],
        ['Payments and shipping', 'Available methods, rates and conditions appear correctly for the tested scenarios.'],
        [
          'Mobile experience',
          'The catalogue, product pages, cart and forms are usable on the devices and screen sizes covered by testing.',
        ],
        [
          'Analytics',
          'Agreed events and purchase data are checked against the measurement configuration, including relevant consent behaviour.',
        ],
        [
          'SEO foundations',
          'We review key page accessibility, basic metadata, indexing settings and obvious technical issues. For migrations, this also includes the agreed redirect checks.',
        ],
      ],
    },
    {
      id: 'after-launch',
      marker: 'check',
      tone: 'grey',
      placement: 'after-included',
      title: 'What happens after launch?',
      intro: 'Once the store is live, further development can focus on these areas.',
      variant: 'list',
      items: [
        ['Google Ads', ''],
        ['Meta Ads', ''],
        ['SEO', ''],
        ['Email marketing', ''],
        ['CRM', ''],
        ['Shopify CRO audits', ''],
        ['Repeat purchases and customer lifetime value', ''],
        ['International expansion', ''],
        ['B2B sales', ''],
        ['Analytics and conversion optimisation', ''],
      ],
      outro:
        'Launch gives your business a working foundation. Marketing, customer acquisition and store improvements are the next stage—not automatic outcomes of development.\n\nOngoing support, maintenance and growth services can be scoped separately according to your priorities.',
      actions: [
        { label: 'Google Ads for ecommerce', href: '/services/google-ads' },
        { label: 'Explore our ecommerce services', href: '/services' },
      ],
    },
    {
      id: 'why-no-sales',
      marker: 'problem',
      tone: 'dark',
      placement: 'after-included',
      title: 'Why might a Shopify store struggle to convert?',
      intro:
        'Even a technically functioning store can lose customers between the first visit and the completed order.\n\nDuring planning and consultation, we look for issues such as these.',
      variant: 'list',
      items: [
        ['A catalogue structure that does not match how customers search', ''],
        ['Product pages that fail to explain the offer or its value', ''],
        ['Difficult mobile navigation', ''],
        ['Unclear pricing, delivery costs or return conditions', ''],
        ['Avoidable friction in the checkout journey', ''],
        ['Advertising that sends visitors to an irrelevant page', ''],
        ['Missing or inaccurate ecommerce measurement', ''],
        ['Product data that is not ready for shopping campaigns', ''],
        ['Slow-loading pages', ''],
        ['Design or content that weakens trust', ''],
        ['No clear route to repeat purchasing', ''],
        ['B2B buyers being unable to access relevant prices or terms', ''],
      ],
      outro:
        'As a Shopify development agency, we consider the store as part of your wider sales funnel—not just a collection of pages.',
      cta: 'Discuss your Shopify project',
    },
  ],
  schema: {
    name: 'Shopify Store Development for Ecommerce Brands',
    serviceType: 'Shopify store development',
    // No confirmed price on the page, so no Offer or hasOfferCatalog
    offers: false,
  },
  leadTitle: 'Let’s build a Shopify store ready to take orders',
  leadText:
    'Tell us about your products, target markets and goals. We’ll help you choose the right development approach, define the scope and identify a practical starting point.',
  leadSubmit: 'Discuss your Shopify project',
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
    ['Shopify development', 'Shopify store', 'The technical base for paid traffic: catalogue, speed, payments and delivery.', '/services/shopify'],
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
      actions: [{ label: 'How Google Ads works for business', href: '/blog/google-ads-for-business' }],
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
      note: 'Often the problem starts after the click — between the cart and payment. Read more in [why shoppers abandon their carts](/blog/abandoned-carts-lost-paid-traffic).',
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
 * Etsy shop setup — English version for international sellers.
 * Same section order and ids as UA/SK so the icons in icons.ts line up.
 * No country in the H1, no guaranteed rankings, sales or account approval, no starting price.
 */
const etsy: ServicePage = {
  slug: 'etsy',
  category: 'International marketplaces',
  categoryKey: 'marketplaces',
  short: 'Etsy store setup',
  metaTitle: 'Etsy Shop Setup and SEO Services | Koshman Ecom',
  metaDescription:
    'Launch and optimize your Etsy shop with professional setup, branding, product listings, Etsy SEO, keyword research, shop policies and growth support for global sellers.',
  ogTitle: 'Etsy Shop Setup and Optimization for Global Sellers',
  ogDescription:
    'Set up your Etsy shop, optimize your listings and prepare your store for international customers with Koshman Ecom.',
  h1: 'Etsy Shop Setup and Optimization',
  lead: 'We help sellers launch and improve Etsy shops with professional storefront setup, product listings, Etsy SEO, branding, shop policies and preparation for international sales.',
  leadExtra: 'We handle the preparation — you get a shop that is ready to sell to buyers worldwide.',
  sectionLabels: false,
  stepsAccent: true,
  stepsCta: 'Discuss your Etsy shop',
  heroCta: { primary: 'Discuss your Etsy shop', secondary: 'Get a consultation' },
  facts: [
    ['Format', 'Setup, optimization and ongoing support'],
    ['Platform', 'Etsy'],
    ['For', 'Handmade, digital products and independent brands'],
    ['Goal', 'A shop ready for international customers'],
  ],
  areaServed: ['EU', 'GB', 'US'],
  updated: '20 November 2026',
  forTitle: 'Who is Etsy shop setup and optimization for?',
  forWhom: [
    ['Handmade sellers', 'For makers of jewelry, home decor, ceramics, textiles, candles, gifts and other original products.'],
    ['Independent brands', 'For brands that want to add Etsy as a sales channel and reach new international customers.'],
    ['Digital product sellers', 'For creators of templates, planners, printables, artwork, illustrations and downloadable files.'],
    ['New Etsy sellers', 'For sellers who want to launch with a clear structure instead of opening an unfinished shop and fixing it later.'],
    ['Existing Etsy shops', 'For shop owners who need better listings, stronger SEO, clearer branding or a structured improvement plan.'],
    ['Global sellers', 'For businesses that need English-language content, international shipping information and a storefront ready for buyers from different markets.'],
  ],
  forWhomNote:
    'Sales on Etsy depend on a strong product, a fair price, good photos and reliable customer service — the shop itself cannot replace them. That is why we review your product range, content readiness, shipping model and business goals before we start.',
  includedTitle: 'What is included in Etsy shop setup and optimization?',
  includedIntro:
    'Setting up an Etsy shop is more than opening an account. We work through a structured process, from product analysis to a final check before the shop goes live.',
  included: [
    ['Business and product analysis', 'We review your product range, target buyers, competitors, pricing logic, product format and intended markets.'],
    ['Positioning and shop structure', 'We define what the shop sells, who it is for, how products should be grouped and how the brand should be presented.'],
    ['Storefront branding', 'We help prepare or refine the shop name, description, banner, logo, About section, visual direction and storefront layout.'],
    ['Shop settings and policies', 'We organize shipping information, processing times, returns, exchanges and buyer-facing policies. Legal and tax requirements depend on your location and business model.'],
    ['Product listings', 'We create or improve an agreed number of listings, including titles, descriptions, tags, categories, attributes, variations and personalization options.'],
    ['Etsy SEO', 'We research keywords and competitors and optimize listing content for Etsy search and for buyers.'],
    ['Product content', 'We structure materials, dimensions, use cases, care instructions, variations and the other details buyers need before ordering.'],
    ['International selling preparation', 'We set up shipping destinations, costs and delivery times, plus buyer-facing information in clear English.'],
    ['Pre-launch review', 'We check the storefront, listings, policies, prices, shipping, mobile display and overall readiness before publication.'],
    ['Handover and next steps', 'We hand over the agreed access, explain the basic shop workflow and recommend what to do next: management, Etsy SEO, Etsy Ads or Pinterest.'],
  ],
  stepsTitle: 'How to start working with Koshman Ecom',
  steps: [
    ['Step 1', 'Enquiry', 'Tell us what you sell, how many products you have and whether you already have an Etsy shop.'],
    ['Step 2', 'Short consultation', 'We clarify what you need: a new shop, listings and SEO, an audit of an existing shop or ongoing management.'],
    ['Step 3', 'Estimate and plan', 'We propose the scope, number of listings, materials needed from you, timeline and an estimated budget.'],
    ['Step 4', 'Setup and launch', 'We prepare the shop, listings and policies, check everything before publication and hand over access.'],
  ],
  priceTitle: 'How much does Etsy shop setup cost?',
  priceText:
    'There is no single price for every Etsy shop. The cost depends on the number of products, content scope, storefront design, number of listings, SEO depth, photography readiness, languages, shipping requirements and the need for ongoing management. We prepare an estimate after a short brief.',
  priceCta: 'Get a project estimate',
  priceFactorsTitle: 'What affects the price',
  priceFactors: [
    'Product, market and competitor analysis',
    'Storefront branding and design direction',
    'Number of new or optimized listings',
    'Copywriting, localization and keyword research',
    'Photography, video and graphic assets — if they need to be created',
    'Policies, shipping and shop settings',
    'Etsy Ads, analytics and ongoing management — separately after launch',
  ],
  expert: {
    name: 'Vlad Koshman',
    role: 'Founder of Koshman Ecom',
    bio: 'International ecommerce specialist responsible for strategy and sales launches. Helps sellers decide what kind of Etsy shop they need, what to prepare before launch and how to connect the marketplace with further promotion.',
    image: '/team/Vlad.png',
  },
  faqTitle: 'Frequently asked questions about Etsy shop setup',
  faq: [
    [
      'How much does it cost to set up an Etsy shop?',
      'The cost depends on the scope of work, number of products, storefront design, listings, SEO, copywriting, localization, images, shipping and ongoing support. After a short consultation, we prepare a clear scope and estimate.',
    ],
    [
      'How long does it take to launch an Etsy shop?',
      'The timeline depends on your product range, how ready your photos and copy are, the design scope, localization needs and how quickly materials are approved. We agree a realistic plan after the brief.',
    ],
    [
      'Can you help sellers from any country?',
      'We work with international sellers and brands. The exact setup depends on your country, Etsy availability, payment options, shipping model and business requirements.',
    ],
    [
      'Do I need products ready before we start?',
      'It is best to have a defined product range, photos, prices, materials, dimensions, variations and production or delivery information. If your range is still being developed, we can start with a consultation and market review.',
    ],
    [
      'Do you provide Etsy SEO services?',
      'Yes. Etsy SEO may include keyword research, competitor analysis and optimization of titles, descriptions, tags, categories and attributes.',
    ],
    [
      'Do you guarantee first-page rankings or sales?',
      'No. Results depend on demand, competition, product quality, pricing, images, shipping, reviews, conversion, customer service and changes to Etsy search. We guarantee the agreed work, not a specific business result.',
    ],
    [
      'Can you manage the shop after launch?',
      'Yes. Ongoing management may include listing optimization, Etsy SEO, performance monitoring, content updates, product recommendations and agreed advertising activities.',
    ],
    [
      'Can I order only an Etsy shop audit?',
      'Yes. An audit can cover the storefront, listings, SEO, competitors, content, shipping information and a prioritized improvement plan.',
    ],
  ],
  relatedTitle: 'What can you add after launching your Etsy shop?',
  related: [
    ['International marketplaces', 'Etsy store management', 'Ongoing listing optimization, Etsy SEO, ads and analytics after launch.', '/services#marketplaces'],
    ['Strategy and growth plan', 'Etsy shop audit', 'Shop and competitor analysis with a plan for further growth.', '/services#strategy'],
    ['Case study', 'Etsy jewelry shop SEO', 'An example of our work with an existing Etsy shop, its listings, SEO and structure.', '/cases/etsy-jewelry-shop-seo'],
    ['Advertising', 'Marketplace advertising', 'Etsy Ads and other marketplace advertising — once your listings are ready.', '/services#ads'],
    ['Pinterest', 'Pinterest for Etsy', 'External traffic to your Etsy shop through pins, boards and ads.', '/services#pinterest'],
    ['Tools', 'Etsy profit calculator', 'What you keep from each sale after Etsy fees, shipping and costs.', '/kalkulyator-prybutku-etsy'],
  ],
  extraSections: [
    {
      id: 'what-is-etsy',
      tone: 'light',
      placement: 'after-tldr',
      title: 'What does it take to launch an Etsy shop?',
      intro:
        'Etsy is a global marketplace for handmade, designed, vintage, personalized and digital products. Opening an account is only the first step.\n\nTo start selling, you need to prepare three things.',
      variant: 'cards',
      items: [
        ['Shop and brand', 'Shop name and positioning, sections, banner, logo, About section and shop policies.'],
        ['Products and listings', 'Product range, photos, titles, descriptions, tags, categories, attributes, prices, variations and personalization.'],
        ['Selling terms for global buyers', 'Shipping and processing times, returns, buyer communication, payment and bank details.'],
      ],
      outro:
        'We help you move from an idea or an unfinished shop to a structured Etsy storefront with prepared listings, an SEO foundation and a clear plan for the next stage of growth.',
    },
    {
      id: 'etsy-seo',
      marker: 'check',
      tone: 'grey',
      placement: 'after-included',
      title: 'Etsy SEO starts with well-prepared listings',
      intro:
        'An attractive shop still needs clear titles, relevant tags, accurate categories, useful attributes, strong descriptions and good images to help buyers find and understand the products.\n\nWhen preparing listings, we work on the following.',
      variant: 'list',
      items: [
        ['Keyword research', 'How buyers search for your product on Etsy and which phrases they use.'],
        ['Competitor and category analysis', 'What already sells in your niche, how strong listings look and where there is room for you.'],
        ['Title structure', 'The title says right away what the product is and matches what buyers are searching for.'],
        ['Relevant tags', 'Specific phrases tied to the product instead of broad, generic words.'],
        ['Categories and attributes', 'Complete fields that help Etsy understand the product and show it in filters.'],
        ['Descriptions that answer questions', 'Materials, dimensions, variations, care, production and delivery times.'],
        ['Primary images and visuals', 'The first photo shows what you sell; the rest show details, scale and use.'],
        ['Variations and personalization', 'Clear options and personalization fields that do not confuse buyers.'],
        ['Content for Etsy and Google search', 'Shop and listing copy that can be found outside Etsy too.'],
      ],
      outro:
        'Etsy SEO can improve relevance and visibility, but it cannot guarantee a specific ranking, amount of traffic or number of sales. Results also depend on demand, competition, pricing, product quality, images, shipping, reviews, conversion and customer service.',
      note: 'See how this works in practice in our [Etsy jewelry shop case study](/cases/etsy-jewelry-shop-seo).',
    },
    {
      id: 'ukrainian-sellers',
      marker: 'check',
      tone: 'dark',
      placement: 'after-included',
      title: 'Prepare your Etsy shop for international customers',
      intro:
        'A buyer from another country should understand straight away what they are buying, what it costs with shipping and when it will arrive.\n\nHere is what we prepare for that.',
      variant: 'list',
      items: [
        ['Shop content in clear English', 'Shop name, description, About section and policies written in natural English, not a word-for-word translation.'],
        ['Localized titles and descriptions', 'Dimensions, materials, care and what is in the box — the details international buyers ask about first.'],
        ['Pricing that covers shipping', 'Prices set so that Etsy fees, currency differences and international shipping do not eat your margin.'],
        ['Shipping by destination', 'Where you ship, how much it costs and how long delivery takes — for Europe and other markets.'],
        ['Returns and timelines', 'Clear return and exchange rules and realistic production and dispatch times.'],
        ['Communication with buyers', 'Ready answers to common questions so international buyers get clear replies.'],
      ],
      outro:
        'Etsy Payments, banking options, shipping services and marketplace features may vary by country, seller type and current Etsy rules. Legal, tax and accounting questions should be checked with a qualified professional.',
      cta: 'Discuss your Etsy shop',
    },
    {
      id: 'process',
      marker: 'numbered',
      tone: 'light',
      placement: 'after-included',
      title: 'Seven steps from idea to a ready-to-sell Etsy shop',
      intro: 'Each stage ends with an agreed deliverable, so you know what has been completed and what happens next.',
      variant: 'list',
      items: [
        ['Enquiry', 'You tell us about your product, product range, current shop and business goal.'],
        ['Consultation and brief', 'We clarify the products, number of listings, photography, languages, shipping, payments, timeline and budget.'],
        ['Analysis and plan', 'We review the niche, competitors, product range, keywords and shop structure and define the work required.'],
        ['Positioning and storefront', 'We prepare the shop structure, description, banner, logo, sections, About content and basic policies.'],
        ['Listings and Etsy SEO', 'We create or optimize the agreed number of listings, including titles, descriptions, tags, categories, attributes and visual recommendations.'],
        ['Setup and quality check', 'We review shipping, payment information, policies, pricing, mobile display, product data and readiness for publication.'],
        ['Launch and next steps', 'We publish or hand over the prepared shop and recommend the next stage: management, Etsy Ads, SEO, Pinterest or external traffic.'],
      ],
      cta: 'Discuss the scope of work',
    },
    {
      id: 'formats',
      tone: 'grey',
      placement: 'after-included',
      title: 'How we can support your Etsy business',
      variant: 'cards',
      items: [
        ['New shop setup', 'For sellers who do not have an Etsy shop yet. Includes analysis, structure, storefront direction, basic settings, policies, agreed listings and launch preparation.'],
        ['Listings and Etsy SEO', 'For existing shops that need new listings or better visibility. Includes keyword research, titles, descriptions, tags, categories, attributes and image recommendations.'],
        ['Etsy shop audit', 'For shops with low visibility, weak listings or stalled performance. Includes storefront, listing, SEO, competitor and content analysis with a prioritized plan.'],
        ['Management and growth', 'For sellers who need recurring work: listing updates, Etsy SEO, performance monitoring, product recommendations, agreed marketing activity and monthly priorities.'],
      ],
      outroTitle: 'What happens after your Etsy shop goes live?',
      outro:
        'Launch is the starting point. Etsy shop setup is a one-time project: structure, storefront, policies, first listings, an SEO foundation, shipping and publication.\n\nEtsy shop management is recurring work after launch: listing optimization, keyword and competitor reviews, testing titles and tags, Etsy Ads support, performance monitoring and monthly priorities. We agree its scope as a separate package.',
      actions: [
        { label: 'Etsy store management', href: '/services#marketplaces' },
        { label: 'Order an Etsy shop audit', service: 'Etsy shop audit' },
      ],
    },
    {
      id: 'client-materials',
      marker: 'dot',
      tone: 'light',
      placement: 'after-included',
      title: 'What we need from you',
      intro:
        'We prepare the shop, but only the seller can provide the facts about the product.\n\nTo get started, we will need the following.',
      variant: 'list',
      items: [
        ['Product photos and videos', ''],
        ['Specifications, materials and dimensions', ''],
        ['Prices and costs', ''],
        ['Production times', ''],
        ['Shipping terms', ''],
        ['Return policy', ''],
        ['Details for Etsy identity and bank verification', ''],
      ],
      outro:
        'Making or sourcing products, packing and shipping orders, customer communication (unless management is included), legal and tax obligations and compliance with Etsy’s rules remain the seller’s responsibility. We do not guarantee Etsy account approval or payment availability in every country. Product photography can be added only as a separately agreed scope.',
    },
    {
      id: 'why-no-sales',
      marker: 'problem',
      tone: 'dark',
      placement: 'after-included',
      title: 'Why an Etsy shop may not be getting views or sales',
      intro: 'A published shop does not mean sales.\n\nDuring audits and setup, we look for these issues.',
      variant: 'list',
      items: [
        ['The shop has no clear positioning', ''],
        ['Titles do not match buyer search intent', ''],
        ['Tags are too broad or irrelevant', ''],
        ['Categories and attributes are incomplete', ''],
        ['The first image does not explain the product', ''],
        ['Descriptions do not answer buyer questions', ''],
        ['Materials, dimensions or variations are missing', ''],
        ['Pricing does not account for fees, shipping and margin', ''],
        ['Shipping and processing times are unclear', ''],
        ['Shop policies are incomplete', ''],
        ['Listings are not adapted for international buyers', ''],
        ['Advertising starts before listings are ready', ''],
        ['There is no regular performance analysis', ''],
        ['The seller expects sales simply because the shop is published', ''],
      ],
      outro:
        'We look at an Etsy shop as a sales system: from the search query and first image to trust, checkout, delivery and the next purchase.',
      note: 'Check whether your price covers Etsy fees with our [Etsy profit calculator](/kalkulyator-prybutku-etsy).',
      cta: 'Discuss your Etsy shop',
    },
  ],
  schema: {
    name: 'Etsy Shop Setup and Optimization',
    serviceType: 'Etsy shop setup and optimization',
    offers: false,
  },
  leadTitle: 'Let’s launch your Etsy shop',
  leadText: 'Tell us what you sell — we’ll suggest where to start.',
  leadSubmit: 'Send request',
  leadTopics: ['Etsy store setup', 'Etsy store management', 'Etsy SEO and listings', 'Etsy shop audit', 'Etsy Ads'],
  leadCommentPlaceholder: 'Tell us what you sell, how many products you have and whether you already have an Etsy shop.',
};

export const enServicePages: Record<string, ServicePage> = {
  [shopify.slug]: shopify,
  [googleAds.slug]: googleAds,
  [etsy.slug]: etsy,
};

export default enServicePages;
