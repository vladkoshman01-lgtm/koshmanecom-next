import type { Dictionary } from './uk';

/** English copy. Draft by Claude — to be reviewed by the client. */
const en: Dictionary = {
  nav: {
    home: 'Home',
    services: 'Services',
    cases: 'Case studies',
    about: 'About',
    reviews: 'Reviews',
    blog: 'Blog',
    tools: 'Tools',
    contacts: 'Contacts',
    career: 'Careers',
    process: 'How we work',
    contactCta: 'Get in touch',
    menu: 'Menu',
    closeMenu: 'Close menu',
  },

  footer: {
    about:
      'A marketing agency for B2C and B2B e-commerce businesses. Full cycle that helps you sell at home and abroad.',
    columns: {
      navigation: 'Navigation',
      company: 'Company',
      tools: 'Tools',
      contacts: 'Contacts',
    },
    tools: {
      profitCalculator: 'Etsy profit calculator',
      pricingCalculator: 'Etsy pricing calculator',
      comparison: 'Etsy vs Amazon vs Shopify',
      resizer: 'Image resizer',
      financeDashboard: 'Etsy finance dashboard',
      seogenie: 'SEOgenie',
    },
    rights: 'All rights reserved.',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    petMars: 'Pet Mars the cat',
  },

  common: {
    more: 'Read more',
    openTool: 'Open',
    freeConsultation: 'Free consultation',
    discussProject: 'Discuss a project',
    discussTask: 'Discuss your task',
    writeTelegram: 'Message us on Telegram',
    viewTelegram: 'View channel',
    backToAll: '← All services',
    all: 'All',
  },

  lead: {
    eyebrow: 'Request',
    title: 'Send us a request',
    subtitle: 'Tell us about your task — we will pick the services and quote the cost.',
    name: 'Name',
    namePlaceholder: 'How should we address you',
    contact: 'Phone or Telegram',
    contactPlaceholder: '+380 or @username',
    interest: 'What are you interested in',
    dontKnow: 'Not sure where to start',
    comment: 'Comment',
    commentPlaceholder: 'A few words about your task or a link to your store',
    submit: 'Send request',
    sending: 'Sending…',
    consent: 'By clicking the button you agree to the processing of personal data.',
    error: 'Please add your name and contact so we can get back to you.',
    sendError: 'We could not send your request. Please try again or message us on Telegram.',
    sentTitle: 'Request received',
    sentText: 'Thank you, {name}! A manager will contact you within one business day.',
    sendAnother: 'Send another one',
    managerName: 'Lara Kyrylova',
    managerRole: 'Client relations manager',
    optional: 'optional',
    popupText:
      'Leave your contacts — a manager will reach out within one business day, clarify the task and quote the cost.',
    popupSentText:
      'Thank you, {name}! We will get in touch about “{service}” within one business day.',
    close: 'Close',
    closeAria: 'Close',
  },

  home: {
    hero: {
      // Рядки першої частини заголовка — на десктопі розбиваємо саме так
      titleLines: ['A marketing agency', 'for e-commerce —', 'we make sure customers'],
      titleAccent: 'find you everywhere',
      subtitle:
        'We help you show up everywhere customers search, scroll, stream and buy.',
      ourServices: 'Our services',
    },
    clients: {
      title: 'Trusted by',
    },
    forWhom: {
      title: '3 things that actually grow your sales — and how to hold them off-season',
      text: 'Anyone can promise you +30%, +50% or even +100% in sales. The far more important question is what exactly will drive that growth. Here are the 3 things we would check first.',
      videoTitle: '3 things that actually grow your sales',
    },
    services: {
      title: 'How can we help?',
      subtitle: 'Pick your task — we will show you where to start.',
    },
    lostSales: {
      eyebrow: 'Lost sales',
      title: 'Research shows that 7 out of 10 people add to cart and leave',
      text: 'Ads bring traffic, but most stores lose it on the site itself. We broke down what really grows brand sales — and how not to drop when the season ends.',
      ctaShort: 'See the research',
      cta: 'See the research and get a free audit',
    },
    telegram: {
      eyebrow: 'Telegram channel',
      title: 'Hands-on case breakdowns and marketplace news every week',
    },
    results: {
      title: 'Results, not process',
      text: 'Before we start we fix the business and sales goals — and build a strategy that reaches them within the agreed timeframe',
    },
    cases: {
      eyebrow: 'Case studies',
      title: 'The results our clients get',
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'What clients say',
      cta: 'I want to discuss my project',
    },
    resources: {
      eyebrow: 'Our resources',
      title: 'We build our own products, not just provide services',
      text: 'Most of the tools are free.',
      all: 'See all tools',
    },
    blog: {
      eyebrow: 'Blog',
      title: 'Drop by our newsroom',
      text: 'We write about business news and international e-commerce.',
      all: 'All articles',
      read: 'Read the article',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Frequently asked questions about online sales',
      text: 'Did not find the answer? Write to us — we reply within one business day.',
      cta: 'Ask a question',
    },
    finalCta: {
      title: 'Let’s find the growth points of your business on a call',
    },
  },
  easter: {
    compassEyebrow: 'You spun the compass',
    marsEyebrow: 'You found Mars',
    discountFor: 'off your first service',
    allServices: 'off all agency services',
    copy: 'Copy',
    copied: 'Copied',
    bookCall: 'Book a consultation',
    compassControl: 'Control the compass',
    compassDone: 'Done',
    petMars: 'Pet Mars the cat',
    marsPhrases: [
      'Meow!',
      'My name is Mars!',
      'I live here',
      'Just checking on you',
      'Looking for the “Order” button',
      'Do not tell anyone you saw me',
    ],
    pagePhrases: {
      '': ['Hi! I am Mars', 'Scroll on, the case studies are there', 'I guard this site'],
      services: ['54 services and I know them all', 'Etsy is my favourite', 'Not sure what to pick? Write to us'],
      cases: ['This case is my favourite', 'I counted the results with my paws'],
      blog: ['I read sometimes too', 'Start with the Etsy article'],
      tools: ['The calculator counts better than I do', 'I test the tools'],
      career: ['We are not hiring cats yet', 'I work here for food'],
      contacts: ['Write on Telegram, I will pass it on', 'The managers reply faster than me'],
      about: ['I am part of the team too', 'About us — and a bit about me'],
      privacy: ['Boring here, I am off', 'I read it all. Almost'],
      terms: ['Boring here, I am off', 'I read it all. Almost'],
      thanks: ['I have already sniffed your request', 'The manager is on the way'],
    },
    marsAgain: 'One more time and something happens',
    marsCopy: 'Take it, we do not mind. But better write to us',
    marsRage: 'Wow, so much attention! Purr!',
    footerPhrases: [
      'Meow!',
      'My name is Mars!',
      'Purr-r-r…',
      'I am in charge of conversion here',
      'Paws up — and sales too',
      'Pet me again?',
      'Write to the manager, I am busy',
    ],
  },
  funnel: {
    traffic: 'Traffic to the site',
    slow: 'Slow site',
    checkout: 'Confusing checkout',
    trust: 'No trust',
    purchase: 'Purchase on the site',
    aria: 'Animation: out of ten site visitors only three make a purchase',
  },
  cookie: {
    eyebrow: 'Cookies',
    text: 'We use necessary cookies to run the site, and analytics and advertising cookies only with your consent, to understand how to improve it. More in our',
    policy: 'Privacy Policy',
    acceptAll: 'Accept all',
    necessaryOnly: 'Necessary only',
    settings: 'Cookie settings',
    aria: 'Cookie consent',
  },
  notFound: {
    eyebrow: 'Error 404',
    bubble: 'I lost the page…',
    title: 'This page does not exist',
    text: 'The link may be outdated or the address has a typo. Go back to the home page or pick the section you need.',
    helpMars: 'Help Mars',
    contact: 'Contact us',
    popular: 'Popular sections',
    metaTitle: 'Page not found — Koshman Ecom',
  },
  blog: {
    search: 'Search articles',
    close: 'Close',
    zoomIn: 'Tap to zoom in',
    zoomOut: 'Tap to zoom out',
    more: 'Show more',
    all: 'All',
    featured: 'Featured',
    read: 'Read',
    minutes: '{n} min read',
    empty: 'Articles are coming soon — the first one is already in the works.',
    nothing: 'Nothing found. Try another search or category.',
    toc: 'Contents',
    telegramEyebrow: 'Telegram channel',
    telegramText: 'Practical case breakdowns and marketplace news every week',
    subscribe: 'Subscribe',
    ctaTitle: 'Planning to enter a new market?',
    ctaText: 'We will review your product and market in a free consultation and show you where to start.',
    ctaButton: 'Free consultation',
    share: 'Share:',
    copy: 'Copy link',
    copied: 'Link copied',
    related: 'Read also',
    allArticles: 'All articles',
    aboutAuthor: 'About the author',
    updated: 'Updated',
  },
  meta: {
    home: {
      title: 'Koshman Ecom — E-commerce Marketing Agency',
      description:
        'Full-cycle e-commerce marketing agency: Shopify and websites, Etsy and Amazon, SEO and AI search, ads, branding. Offices in Kyiv and Košice, clients worldwide.',
    },
    services: {
      title: 'E-commerce Agency Services: Shopify, Etsy, SEO, Ads',
      description:
        'Services for online sales: Shopify stores and websites, launches on Etsy, Amazon and eBay, SEO and AI search, Google and Meta Ads, branding and consulting.',
    },
    about: {
      title: 'About Koshman Ecom: Team, Approach and Expertise',
      description:
        'Koshman Ecom is a full-cycle marketing agency for B2C and B2B e-commerce: websites, marketplaces, ads, branding and AI automation for local and global markets.',
    },
    contacts: {
      title: 'Contact Koshman Ecom: Telegram, WhatsApp, Phone, Email',
      description:
        'Contact Koshman Ecom via Telegram, WhatsApp, phone or email. Offices in Kyiv and Košice. We reply within one business day; the first consultation is free.',
    },
    career: {
      title: 'Careers at Koshman Ecom: E-commerce Agency Jobs',
      description:
        'Open roles at Koshman Ecom: marketplaces, advertising, web development and AI automation. Work with international brands, remote-friendly.',
    },
    tools: {
      title: 'Free Tools for Etsy, Amazon and Shopify Sellers',
      description:
        'Free Koshman Ecom tools: Etsy profit and pricing calculators, platform comparison, image resizer, finance dashboard and SEOgenie.',
    },
    terms: {
      title: 'Terms of Use — Koshman Ecom',
      description:
        'Rules for using the Koshman Ecom website, its free tools and materials: copyright, requests and services, limitation of liability and governing law.',
    },
    privacy: {
      title: 'Privacy Policy — Koshman Ecom',
      description:
        'How Koshman Ecom collects, uses and protects the personal data of site visitors and clients: GDPR, cookies, retention periods and your rights.',
    },
    blog: {
      title: 'E-commerce Blog: Etsy, Amazon, Shopify and Growth — Koshman Ecom',
      description:
        'Articles on selling online: e-commerce growth strategy, entering new markets, Etsy, Amazon, Shopify, SEO, AI search and advertising.',
    },
    thanks: {
      title: 'Thank You for Your Request — Koshman Ecom',
      description: 'We have received your request. A manager will contact you within one business day.',
    },
    vacancy: '{role} — Job at Koshman Ecom',
  },
  og: {
    homeEyebrow: 'Marketing agency',
    homeTitle: 'We make sure customers find you everywhere',
    homeSubtitle: 'Shopify and websites, Etsy and Amazon, SEO and AI search, ads and branding',
    documents: 'Documents',
  },
  pages: {
    career: {
      subtitle: 'Open roles at Koshman Ecom: marketplaces, advertising, web development and AI automation.',
    },
    thanks: {
      title: 'Thank you for your request',
      subtitle: 'We have received your request. A manager will contact you within one business day.',
    },
    terms: {
      subtitle: 'Rules for using the Koshman Ecom website, its free tools and materials.',
    },
    home: {
      metaTitle: 'Koshman Ecom — a marketing agency for e-commerce',
      metaDescription:
        'We help brands sell more: Shopify and websites, Etsy and Amazon, SEO and AI search, advertising and branding.',
    },
    tools: {
      eyebrow: 'Tools',
      title: 'Tools for sellers on Etsy, Amazon and Shopify',
      subtitle: 'We build our own products, not just provide services. Most of the tools are free.',
      metaTitle: 'Tools for sellers on Etsy, Amazon and Shopify — Koshman Ecom',
      metaDescription:
        'Free Koshman Ecom tools: Etsy profit and pricing calculators, platform comparison, image resizer, finance dashboard and SEOgenie.',
      filterAll: 'All',
    },
    about: {
      eyebrow: 'About us',
      title: 'A marketing agency for e-commerce business',
      intro:
        'Koshman Ecom is a full-cycle team for online sales. We build websites and online stores, launch ads on any platform, take brands to marketplaces and automate processes with AI. We work with B2C and B2B businesses on local and international markets.',
      focusLabel: 'Our focus',
      focusTitle: 'Focused on steady sales, not one-off launches',
      focusText:
        'We combine strategy, day-to-day support and AI automation into one workflow so the business grows steadily.',
      yearsExperience: 'years of experience',
      yearsExperienceNote: 'International platforms and markets.',
      yearsDev: 'years of web development',
      aiTitle: 'We bring AI into business',
      aiText: 'We automate content, routine work and analytics so the team moves faster.',
      missionLabel: 'Our mission',
      missionText:
        'Our mission is to help brands and manufacturers from any country sell worldwide. We believe a local business can go global if the product, marketing and sales system are built right.',
      approachTitle: 'Our approach',
      approachText:
        'We do not work like a classic marketing agency. Our job is to build a working sales system, not just a website or an ad campaign.',
      directionsLabel: 'Directions',
      directionsTitle: 'What we do',
      teamLabel: 'Team',
      teamTitle: 'Who is behind the agency',
      teamText:
        'We are a team of founders combining strategic e-commerce and systematic marketing. Below is a short introduction to the key people responsible for the result.',
      careerLabel: 'Careers',
      careerTitle: 'Become part of Koshman Ecom',
      careerText:
        'We are looking for people who enjoy launching brands on international markets and growing with us. Ready for the next step in your career?',
      careerCta: 'See open roles',
    },
    contacts: {
      eyebrow: 'Contacts',
      title: 'Get in touch',
      subtitle: 'We reply within one business day. Pick a convenient channel or send a request below.',
      writeManager: 'Message a manager',
      phone: 'Phone',
      email: 'Email',
      offices: 'Offices',
      socials: 'Find us on social media',
    },
    services: {
      title: 'We launch, run and scale online sales',
      subtitle: 'Marketplaces, websites, ads, content and AI automation for B2C and B2B brands.',
      pickTask: 'Pick your task',
      approachLabel: 'Our approach',
      approachText: 'One team owns the whole path — from strategy to sales.',
      directions: 'Our key directions',
      metaTitle: 'E-commerce agency services: Shopify, Etsy, Amazon, SEO, ads — Koshman Ecom',
      metaDescription:
        'Services for online sales: Shopify stores and websites, launches on Etsy, Amazon and eBay, SEO and AI search, Google and Meta Ads, branding and consulting.',
    },
  },
};

export default en;
