import type { Dictionary } from './uk';

/**
 * Slovenské texty. Čiernopis od Claude — potrebuje kontrolu rodeného hovorcu.
 * Чернетка: словацьку має вичитати носій мови перед публікацією.
 */
const sk: Dictionary = {
  nav: {
    home: 'Domov',
    services: 'Služby',
    cases: 'Prípadové štúdie',
    about: 'O nás',
    reviews: 'Referencie',
    blog: 'Blog',
    tools: 'Nástroje',
    contacts: 'Kontakty',
    career: 'Kariéra',
    process: 'Ako pracujeme',
    contactCta: 'Kontaktujte nás',
    menu: 'Menu',
    closeMenu: 'Zavrieť menu',
  },

  footer: {
    about:
      'Marketingová agentúra pre e-commerce firmy B2C a B2B. Celý cyklus, ktorý pomáha predávať doma aj v zahraničí.',
    columns: {
      navigation: 'Navigácia',
      company: 'Spoločnosť',
      tools: 'Nástroje',
      contacts: 'Kontakty',
    },
    tools: {
      profitCalculator: 'Kalkulačka zisku na Etsy',
      pricingCalculator: 'Kalkulačka cien na Etsy',
      comparison: 'Etsy vs Amazon vs Shopify',
      resizer: 'Zmena veľkosti obrázkov',
      financeDashboard: 'Finančný dashboard pre Etsy',
      seogenie: 'SEOgenie',
    },
    rights: 'Všetky práva vyhradené.',
    privacy: 'Zásady ochrany osobných údajov',
    terms: 'Podmienky používania',
    petMars: 'Pohladkať mačku Mars',
  },

  common: {
    more: 'Viac',
    openTool: 'Otvoriť',
    freeConsultation: 'Bezplatná konzultácia',
    discussProject: 'Prebrať projekt',
    discussTask: 'Prebrať zadanie',
    writeTelegram: 'Napíšte nám na Telegram',
    viewTelegram: 'Pozrieť kanál',
    backToAll: '← Všetky služby',
    all: 'Všetky',
  },

  lead: {
    eyebrow: 'Dopyt',
    title: 'Pošlite nám dopyt',
    subtitle: 'Opíšte zadanie — vyberieme služby a vypočítame cenu.',
    name: 'Meno',
    namePlaceholder: 'Ako vás máme oslovovať',
    contact: 'Telefón alebo Telegram',
    contactPlaceholder: '+421 alebo @username',
    interest: 'Čo vás zaujíma',
    dontKnow: 'Neviem, kde začať',
    comment: 'Poznámka',
    commentPlaceholder: 'Krátko o zadaní alebo odkaz na váš obchod',
    submit: 'Odoslať dopyt',
    sending: 'Odosielame…',
    consent: 'Kliknutím na tlačidlo súhlasíte so spracovaním osobných údajov.',
    error: 'Uveďte meno a kontakt, aby sme sa vám mohli ozvať.',
    sendError: 'Dopyt sa nepodarilo odoslať. Skúste to znova alebo nám napíšte na Telegram.',
    sentTitle: 'Dopyt sme prijali',
    sentText: 'Ďakujeme, {name}! Manažér sa vám ozve počas pracovného dňa.',
    sendAnother: 'Poslať ďalší',
    managerName: 'Lara Kyrylova',
    managerRole: 'Manažérka pre klientov',
    optional: 'nepovinné',
    popupText:
      'Nechajte kontakt — manažér sa ozve počas pracovného dňa, spresní zadanie a povie cenu.',
    popupSentText: 'Ďakujeme, {name}! Ozveme sa k službe „{service}“ počas pracovného dňa.',
    close: 'Zavrieť',
    closeAria: 'Zavrieť',
  },

  home: {
    hero: {
      // Рядки першої частини заголовка — на десктопі розбиваємо саме так
      titleLines: ['Marketingová agentúra', 'pre e-commerce —', 'garantujeme, že zákazníci'],
      titleAccent: 'vás nájdu všade',
      subtitle:
        'Pomáhame vám byť všade, kde zákazníci hľadajú, scrollujú, sledujú a nakupujú.',
      ourServices: 'Naše služby',
    },
    clients: {
      title: 'Dôverujú nám',
    },
    forWhom: {
      title: '3 veci, vďaka ktorým vyrastiete v predaji — a ako neklesnúť mimo sezóny',
      text: 'Sľúbiť vám môžu +30 %, +50 % či dokonca +100 % predaja. Oveľa dôležitejšia je otázka, vďaka čomu presne budete rásť. Tu sú 3 veci, ktoré by sme preverili ako prvé.',
      videoTitle: '3 veci, vďaka ktorým vyrastiete v predaji',
    },
    services: {
      title: 'Čím vám vieme pomôcť?',
      subtitle: 'Vyberte si zadanie — ukážeme, kde začať.',
    },
    lostSales: {
      eyebrow: 'Stratené predaje',
      title: 'Výskum ukazuje, že 7 z 10 ľudí vloží tovar do košíka a odíde',
      text: 'Reklama privedie návštevnosť, ale väčšina obchodov ju stratí priamo na webe. Rozobrali sme, vďaka čomu značky naozaj rastú v predaji — a ako neklesnúť, keď sa skončí sezóna.',
      ctaShort: 'Pozrieť výskum',
      cta: 'Pozrieť výskum a získať bezplatný audit',
    },
    telegram: {
      eyebrow: 'Telegram kanál',
      title: 'Praktické rozbory prípadov a novinky z marketplaceov každý týždeň',
    },
    results: {
      title: 'Výsledok, nie proces',
      text: 'Pred štartom si zafixujeme ciele v biznise aj v predaji — a stratégiu postavíme tak, aby sme ich v dohodnutom termíne dosiahli',
    },
    cases: {
      eyebrow: 'Prípadové štúdie',
      title: 'Výsledky, ktoré dosahujú naši klienti',
    },
    reviews: {
      eyebrow: 'Referencie',
      title: 'Čo hovoria klienti',
      cta: 'Chcem prebrať svoj projekt',
    },
    resources: {
      eyebrow: 'Naše zdroje',
      title: 'Staviame vlastné produkty, nielen poskytujeme služby',
      text: 'Väčšina nástrojov je zadarmo.',
      all: 'Pozrieť všetky nástroje',
    },
    blog: {
      eyebrow: 'Blog',
      title: 'Zastavte sa v našej redakcii',
      text: 'Píšeme o novinkách v biznise a medzinárodnom e-commerce.',
      all: 'Všetky články',
      read: 'Čítať článok',
    },
    faq: {
      eyebrow: 'Otázky',
      title: 'Časté otázky o online predaji',
      text: 'Nenašli ste odpoveď? Napíšte nám — odpovieme počas pracovného dňa.',
      cta: 'Položiť otázku',
    },
    finalCta: {
      title: 'Nájdime na hovore body rastu vášho biznisu',
    },
  },
  easter: {
    compassEyebrow: 'Roztočili ste kompas',
    marsEyebrow: 'Našli ste Marsa',
    discountFor: 'na prvú službu agentúry',
    allServices: 'na všetky služby agentúry',
    copy: 'Kopírovať',
    copied: 'Skopírované',
    bookCall: 'Objednať konzultáciu',
    compassControl: 'Ovládať kompas',
    compassDone: 'Hotovo',
    petMars: 'Pohladkať mačku Mars',
    marsPhrases: [
      'Mňau!',
      'Volám sa Mars!',
      'Bývam tu',
      'Len kontrolujem, ako sa máš',
      'Hľadám tlačidlo „Objednať“',
      'Nikomu nehovor, že si ma videl',
    ],
    pagePhrases: {
      '': ['Ahoj! Som Mars', 'Scrolluj ďalej, tam sú prípadové štúdie', 'Strážim tento web'],
      services: ['54 služieb a poznám ich všetky', 'Etsy je moje obľúbené', 'Neviete, čo vybrať? Napíšte nám'],
      cases: ['Tento prípad mám najradšej', 'Výsledky som počítal labkami'],
      blog: ['Aj ja občas čítam', 'Začnite článkom o Etsy'],
      tools: ['Kalkulačka počíta lepšie ako ja', 'Testujem nástroje'],
      career: ['Mačky zatiaľ neberieme', 'Ja tu pracujem za granule'],
      contacts: ['Napíšte na Telegram, odovzdám to', 'Manažéri odpovedajú rýchlejšie ako ja'],
      about: ['Aj ja som súčasť tímu', 'Tu je o nás — a trochu o mne'],
      privacy: ['Tu je nuda, idem preč', 'Všetko som prečítal. Skoro'],
      terms: ['Tu je nuda, idem preč', 'Všetko som prečítal. Skoro'],
      thanks: ['Váš dopyt som už oňuchal', 'Manažér už beží'],
    },
    marsAgain: 'Ešte raz a niečo bude',
    marsCopy: 'Zober si to, nevadí. Ale radšej nám napíš',
    marsRage: 'Ó, koľko pozornosti! Vrr!',
    footerPhrases: [
      'Mňau!',
      'Volám sa Mars!',
      'Mrr-r-r…',
      'Mám tu na starosti konverziu',
      'Labky hore — a predaj tiež',
      'Pohladkáš ma ešte?',
      'Napíš manažérovi, mám prácu',
    ],
  },
  funnel: {
    traffic: 'Návštevnosť webu',
    slow: 'Pomalý web',
    checkout: 'Zložitá objednávka',
    trust: 'Chýba dôvera',
    purchase: 'Nákup na webe',
    aria: 'Animácia: z desiatich návštevníkov webu nakúpia len traja',
  },
  cookie: {
    eyebrow: 'Cookies',
    text: 'Nevyhnutné cookies používame na fungovanie webu, analytické a reklamné len s vaším súhlasom, aby sme vedeli web zlepšovať. Viac v',
    policy: 'Zásadách ochrany osobných údajov',
    acceptAll: 'Prijať všetky',
    necessaryOnly: 'Len nevyhnutné',
    settings: 'Nastavenia cookies',
    aria: 'Súhlas s cookies',
  },
  notFound: {
    eyebrow: 'Chyba 404',
    bubble: 'Stratil som stránku…',
    title: 'Takáto stránka neexistuje',
    text: 'Odkaz je možno zastaraný alebo je v adrese chyba. Vráťte sa na domovskú stránku alebo si vyberte potrebnú sekciu.',
    helpMars: 'Pomôcť Marsovi',
    contact: 'Kontaktujte nás',
    popular: 'Populárne sekcie',
    metaTitle: 'Stránka sa nenašla — Koshman Ecom',
  },
  blog: {
    search: 'Hľadať články',
    more: 'Zobraziť viac',
    all: 'Všetky',
    featured: 'Hlavný',
    read: 'Čítať',
    minutes: '{n} min čítania',
    empty: 'Články čoskoro pribudnú — na prvom už pracujeme.',
    nothing: 'Nič sa nenašlo. Skúste iný výraz alebo kategóriu.',
    toc: 'Obsah',
    telegramEyebrow: 'Telegram kanál',
    telegramText: 'Praktické rozbory prípadových štúdií a novinky z marketplaceov každý týždeň',
    subscribe: 'Odoberať',
    ctaTitle: 'Plánujete vstup na nový trh?',
    ctaText: 'Na bezplatnej konzultácii prejdeme váš produkt a trh a ukážeme, kde začať.',
    ctaButton: 'Bezplatná konzultácia',
    share: 'Zdieľať:',
    copy: 'Kopírovať odkaz',
    copied: 'Odkaz skopírovaný',
    related: 'Prečítajte si aj',
    allArticles: 'Všetky články',
    aboutAuthor: 'O autorovi',
    updated: 'Aktualizované',
  },
  meta: {
    home: {
      title: 'Koshman Ecom — marketingová agentúra pre e-commerce',
      description:
        'Marketingová agentúra s plným cyklom pre e-commerce: Shopify a weby, Etsy a Amazon, SEO a AI vyhľadávanie, reklama a branding. Kancelárie v Kyjeve a Košiciach.',
    },
    services: {
      title: 'Služby e-commerce agentúry: Shopify, Etsy, SEO, reklama',
      description:
        'Služby pre online predaj: e-shopy na Shopify a weby, spustenie na Etsy, Amazone a eBayi, SEO a AI vyhľadávanie, Google a Meta Ads, branding a poradenstvo.',
    },
    about: {
      title: 'O Koshman Ecom: tím, prístup a skúsenosti',
      description:
        'Koshman Ecom je agentúra s plným cyklom pre B2C a B2B e-commerce: weby, marketplace, reklama, branding a AI automatizácia pre domáce i zahraničné trhy.',
    },
    contacts: {
      title: 'Kontakty Koshman Ecom: Telegram, WhatsApp, telefón, e-mail',
      description:
        'Kontaktujte Koshman Ecom cez Telegram, WhatsApp, telefón či e-mail. Kancelárie v Kyjeve a Košiciach. Odpovedáme v pracovný deň, prvá konzultácia je zadarmo.',
    },
    career: {
      title: 'Kariéra v Koshman Ecom: práca v e-commerce agentúre',
      description:
        'Voľné pozície v Koshman Ecom: marketplace, reklama, tvorba webov a AI automatizácia. Práca s medzinárodnými značkami, aj na diaľku.',
    },
    tools: {
      title: 'Bezplatné nástroje pre predajcov na Etsy, Amazone a Shopify',
      description:
        'Bezplatné nástroje Koshman Ecom: kalkulačky zisku a cien na Etsy, porovnanie platforiem, zmena veľkosti obrázkov, finančný dashboard a SEOgenie.',
    },
    terms: {
      title: 'Podmienky používania — Koshman Ecom',
      description:
        'Pravidlá používania webu Koshman Ecom, bezplatných nástrojov a materiálov: autorské práva, dopyty a služby, obmedzenie zodpovednosti a rozhodné právo.',
    },
    privacy: {
      title: 'Zásady ochrany osobných údajov — Koshman Ecom',
      description:
        'Ako Koshman Ecom zbiera, používa a chráni osobné údaje návštevníkov webu a klientov: GDPR, cookies, doba uchovávania a vaše práva.',
    },
    blog: {
      title: 'Blog o e-commerce, Etsy, Amazone a Shopify — Koshman Ecom',
      description:
        'Články o online predaji: stratégia rastu e-shopu, vstup na nové trhy, Etsy, Amazon, Shopify, SEO, AI vyhľadávanie a reklama.',
    },
    thanks: {
      title: 'Ďakujeme za dopyt — Koshman Ecom',
      description: 'Dopyt sme prijali. Manažér sa vám ozve počas pracovného dňa.',
    },
    vacancy: '{role} — práca v Koshman Ecom',
  },
  og: {
    homeEyebrow: 'Marketingová agentúra',
    homeTitle: 'Garantujeme, že vás zákazníci nájdu všade',
    homeSubtitle: 'Shopify a weby, Etsy a Amazon, SEO a AI vyhľadávanie, reklama a branding',
    documents: 'Dokumenty',
  },
  pages: {
    career: {
      subtitle: 'Voľné pozície v Koshman Ecom: marketplace, reklama, tvorba webov a AI automatizácia.',
    },
    thanks: {
      title: 'Ďakujeme za dopyt',
      subtitle: 'Dopyt sme prijali. Manažér sa vám ozve počas pracovného dňa.',
    },
    terms: {
      subtitle: 'Pravidlá používania webu Koshman Ecom, jeho bezplatných nástrojov a materiálov.',
    },
    home: {
      metaTitle: 'Koshman Ecom — marketingová agentúra pre e-commerce',
      metaDescription:
        'Pomáhame značkám predávať viac: Shopify a weby, Etsy a Amazon, SEO a AI vyhľadávanie, reklama a branding.',
    },
    tools: {
      eyebrow: 'Nástroje',
      title: 'Nástroje pre predajcov na Etsy, Amazone a Shopify',
      subtitle: 'Staviame vlastné produkty, nielen poskytujeme služby. Väčšina nástrojov je zadarmo.',
      metaTitle: 'Nástroje pre predajcov na Etsy, Amazone a Shopify — Koshman Ecom',
      metaDescription:
        'Bezplatné nástroje Koshman Ecom: kalkulačky zisku a cien na Etsy, porovnanie platforiem, zmena veľkosti obrázkov, finančný dashboard a SEOgenie.',
      filterAll: 'Všetky',
    },
    about: {
      eyebrow: 'O nás',
      title: 'Marketingová agentúra pre e-commerce',
      intro:
        'Koshman Ecom je tím s plným cyklom pre online predaj. Tvoríme weby a e-shopy, spúšťame reklamu na akejkoľvek platforme, privádzame značky na marketplace a automatizujeme procesy pomocou AI. Pracujeme s B2C aj B2B firmami na domácich i zahraničných trhoch.',
      focusLabel: 'Náš fokus',
      focusTitle: 'Zameriavame sa na stabilný predaj, nie jednorazové spustenia',
      focusText:
        'Spájame stratégiu, prevádzkovú podporu a AI automatizáciu do jedného procesu, aby firma rástla stabilne.',
      yearsExperience: 'rokov skúseností',
      yearsExperienceNote: 'Medzinárodné platformy a trhy.',
      yearsDev: 'rokov tvorby webov',
      aiTitle: 'Zavádzame AI do biznisu',
      aiText: 'Automatizujeme obsah, rutinu a analytiku, aby tím pracoval rýchlejšie.',
      missionLabel: 'Naša misia',
      missionText:
        'Našou misiou je pomáhať značkám a výrobcom z ktorejkoľvek krajiny predávať po celom svete. Veríme, že lokálna firma sa môže stať globálnou, ak správne postaví produkt, marketing a predajný systém.',
      approachTitle: 'Náš prístup',
      approachText:
        'Nepracujeme ako klasická marketingová agentúra. Našou úlohou je postaviť fungujúci predajný systém, nielen web alebo reklamu.',
      directionsLabel: 'Smery',
      directionsTitle: 'Čo robíme',
      teamLabel: 'Tím',
      teamTitle: 'Kto stojí za agentúrou',
      teamText:
        'Sme tím zakladateľov, ktorý spája strategický e-commerce a systematický marketing. Nižšie je krátko o kľúčových ľuďoch zodpovedných za výsledok.',
      careerLabel: 'Kariéra',
      careerTitle: 'Staňte sa súčasťou Koshman Ecom',
      careerText:
        'Hľadáme ľudí, ktorých baví spúšťať značky na zahraničných trhoch a rásť s nami. Ste pripravení na ďalší krok v kariére?',
      careerCta: 'Pozrieť voľné pozície',
    },
    contacts: {
      eyebrow: 'Kontakty',
      title: 'Kontaktujte nás',
      subtitle: 'Odpovedáme počas pracovného dňa. Vyberte si kanál alebo pošlite dopyt nižšie.',
      writeManager: 'Napísať manažérovi',
      phone: 'Telefón',
      email: 'E-mail',
      offices: 'Kancelárie',
      socials: 'Sme na sociálnych sieťach',
    },
    services: {
      title: 'Spúšťame, vedieme a škálujeme online predaj',
      subtitle: 'Marketplace, weby, reklama, obsah a AI automatizácia pre B2C a B2B značky.',
      pickTask: 'Vyberte si zadanie',
      approachLabel: 'Náš prístup',
      approachText: 'Jeden tím zodpovedá za celú cestu — od stratégie po predaj.',
      directions: 'Naše kľúčové smery',
      metaTitle: 'Služby e-commerce agentúry: Shopify, Etsy, Amazon, SEO, reklama — Koshman Ecom',
      metaDescription:
        'Služby pre online predaj: e-shopy na Shopify a weby, spustenie na Etsy, Amazone a eBayi, SEO a AI vyhľadávanie, Google a Meta Ads, branding a poradenstvo.',
    },
  },
};

export default sk;
