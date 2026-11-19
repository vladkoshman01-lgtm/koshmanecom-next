import type { ServicePage } from './types';

/**
 * Slovenské texty stránok jednotlivých služieb.
 *
 * Tvorba Shopify e-shopu — slovenská verzia UA stránky (rovnaké poradie a id sekcií,
 * aby ikony v icons.ts sedeli). Bez prípadových štúdií, cien, termínov a záruk;
 * konkrétnych poskytovateľov platieb, dopravy a CRM nemenujeme.
 */
const shopify: ServicePage = {
  slug: 'shopify',
  category: 'Vývoj na Shopify',
  categoryKey: 'shopify-dev',
  short: 'Tvorba Shopify e-shopu',
  metaTitle: 'Tvorba Shopify e-shopu | Koshman Ecom',
  metaDescription:
    'Tvorba a vývoj Shopify e-shopu pre značky a firmy. Dizajn, nastavenie, témy na mieru, integrácie, migrácia a spustenie.',
  h1: 'Tvorba Shopify e-shopu pre e-commerce značky',
  lead: 'Vytvoríme e-shop na Shopify podľa vašich produktov, zákazníkov a spôsobu predaja. Od štruktúry a dizajnu až po nastavenie objednávok a prípravu na spustenie.',
  leadExtra:
    'Navrhneme navigáciu, upravíme tému, usporiadame produktový katalóg, nastavíme vhodné platobné možnosti a dopravu, prepojíme potrebné systémy a otestujeme nákupný proces. Koshman Ecom je medzinárodná e-commerce agentúra s pôsobením v Košiciach. Pracujeme s klientmi v Európe a USA a pomáhame e-shopom, D2C značkám, výrobcom a B2B firmám spúšťať, zlepšovať a rozvíjať online predaj.',
  sectionLabels: false,
  stepsAccent: true,
  stepsCta: 'Prebrať váš Shopify projekt',
  heroCta: { primary: 'Prebrať váš Shopify projekt', secondary: 'Dohodnúť konzultáciu' },
  facts: [
    ['Realizácia', 'Od návrhu po spustenie v dohodnutom rozsahu'],
    ['Platforma', 'Shopify'],
    ['Pre koho', 'B2C, B2B a D2C firmy'],
    ['Základné nastavenie', 'Produktový katalóg, platby, doprava, analytika a integrácie'],
  ],
  areaServed: ['SK', 'CZ', 'EU'],
  updated: '18. novembra 2026',
  forTitle: 'Pre koho je tvorba Shopify e-shopu vhodná?',
  forWhom: [
    [
      'Nové značky',
      'Pre firmy, ktoré chcú spustiť prvý e-shop s prehľadnou štruktúrou, usporiadaným katalógom a základom pre ďalší marketing.',
    ],
    [
      'Existujúce e-shopy',
      'Pre e-shopy, ktoré plánujú prechod na Shopify, nový dizajn, lepší nákupný zážitok alebo rozvoj existujúceho riešenia bez kompletnej prestavby.',
    ],
    [
      'Výrobcovia a D2C značky',
      'Pre značky, ktoré chcú predávať priamo zákazníkom, budovať vlastné zákaznícke vzťahy a znížiť závislosť od online trhovísk.',
    ],
    [
      'B2B firmy a distribútori',
      'Pre firmy, ktoré potrebujú veľkoobchodné objednávky, individuálne katalógy a ceny, firemné účty alebo prepojenie s internými systémami. Vhodné riešenie pre B2B Shopify e-shop závisí od požiadaviek, programu Shopify a dostupných možností.',
    ],
    [
      'Firmy vstupujúce na nové trhy',
      'Pre podniky, ktoré pripravujú predaj na Slovensku, v ďalších krajinách EÚ alebo mimo nej. Posúdime jazykové verzie, meny, obsah a prevádzkové nastavenia vrátane možností Shopify Markets. Vhodnosť riešenia overíme podľa cieľových krajín, sídla firmy, platieb a logistiky.',
    ],
    [
      'Firmy pripravujúce ďalší rast',
      'Pre e-shopy, ktoré potrebujú základ pre reklamu, SEO, opakované nákupy, meranie výsledkov a ďalší vývoj.',
    ],
  ],
  forWhomNote:
    'Shopify nenahrádza kvalitný produkt, jasnú ponuku ani marketingovú stratégiu. Pred začiatkom projektu si preto prejdeme váš sortiment, trhy, logistiku a ciele, aby sme navrhli funkcie, ktoré skutočne potrebujete.',
  includedTitle: 'Čo zahŕňa tvorba a vývoj Shopify e-shopu?',
  includedIntro:
    'Prepájame zákaznícku časť e-shopu s nastaveniami a systémami potrebnými na jeho prevádzku. Konkrétne výstupy a rozsah prác dohodneme v rámci projektu.',
  included: [
    [
      'Analýza podnikania a požiadaviek',
      'Prejdeme si vaše produkty, zákazníkov, katalóg, predajný model, cieľové trhy, konkurenciu a priority.',
    ],
    [
      'Štruktúra e-shopu',
      'Navrhneme navigáciu, úvodnú stránku, kolekcie, produktové a informačné stránky aj cestu od výberu produktu po dokončenie objednávky.',
    ],
    [
      'Shopify dizajn a úprava témy',
      'Vyberieme a nastavíme vhodnú tému, prispôsobíme ju vašej značke alebo vyvinieme potrebné prvky na mieru. Postup závisí od požiadaviek, rozpočtu a náročnosti projektu.',
    ],
    [
      'Produktový katalóg a dáta',
      'Nastavíme produkty, varianty, kolekcie, filtre, ceny a skladové údaje. Podľa dohody môžeme zahrnúť aj import produktov a naplnenie e-shopu obsahom.',
    ],
    [
      'Produktové stránky',
      'Usporiadame informácie tak, aby zákazník rozumel ponuke, parametrom a dostupným variantom. Podmienky nákupu, dopravy a vrátenia tovaru umiestnime tak, aby ich vedel ľahko nájsť.',
    ],
    [
      'Platby a doprava',
      'Posúdime vhodné platobné služby, spôsoby dopravy, sadzby a nastavenia pokladne. Pre predaj na Slovensku a v EÚ overíme dostupnosť konkrétnych riešení podľa sídla firmy, programu Shopify a podmienok poskytovateľov.',
    ],
    [
      'Aplikácie a integrácie',
      'Posúdime a zrealizujeme dohodnuté Shopify integrácie, napríklad prepojenia s CRM, ERP, skladom, účtovníctvom alebo marketingovými nástrojmi. Pred implementáciou overíme kompatibilitu, dátové toky a technické obmedzenia.',
    ],
    [
      'Analytika',
      'Nastavíme dohodnuté nástroje a udalosti, napríklad zobrazenie produktu, pridanie do košíka, začatie objednávky a nákup. Rozsah merania závisí od technického riešenia, súhlasov používateľov a možností platformy.',
    ],
    [
      'Použiteľnosť na mobile',
      'Skontrolujeme navigáciu, kolekcie, produktové stránky, košík, formuláre a pokladňu na relevantných veľkostiach obrazoviek mobilov a tabletov.',
    ],
    [
      'Testovanie a spustenie',
      'Pred spustením otestujeme produkty, ceny, navigáciu, dohodnuté scenáre platieb a dopravy, formuláre, analytiku a spracovanie objednávok.',
    ],
    [
      'Odovzdanie a zaškolenie',
      'Odovzdáme dohodnuté prístupy, vysvetlíme základnú správu produktov a objednávok a odporučíme priority pre ďalší rozvoj.',
    ],
  ],
  // Sedem etáp tvorby je samostatná sekcia vyššie; tu je krátky začiatok spolupráce
  stepsTitle: 'Ako začať spoluprácu s Koshman Ecom?',
  steps: [
    [
      'Krok 1',
      'Predstavte nám svoj projekt',
      'Napíšte nám o vašej firme, produktoch, trhoch a o tom, s čím potrebujete pomôcť.',
    ],
    [
      'Krok 2',
      'Dohodnite si krátku konzultáciu',
      'Spresníme, či je prioritou nový e-shop, migrácia, úpravy existujúceho riešenia, B2B predaj alebo audit.',
    ],
    [
      'Krok 3',
      'Prejdite si odhad a plán',
      'Navrhneme rozsah, etapy realizácie, priority, predpokladaný harmonogram a odhad nákladov.',
    ],
    [
      'Krok 4',
      'Vývoj a spustenie',
      'Vytvoríme alebo upravíme e-shop, otestujeme dohodnuté nákupné scenáre a pripravíme ho na prevádzku.',
    ],
  ],
  priceTitle: 'Koľko stojí tvorba Shopify e-shopu?',
  priceText:
    'Cena závisí od spôsobu realizácie dizajnu, počtu stránok a produktov, zložitosti katalógu, integrácií, cieľových trhov, migrácie a funkcií na mieru. Práce agentúry oddeľujeme od nákladov na platformu a externé služby, aby ste mali prehľad o celkovom rozpočte. Po úvodnom zadaní pripravíme odhad podľa konkrétnych požiadaviek, nie podľa univerzálnej štartovacej ceny.',
  priceCta: 'Získať odhad projektu',
  priceFactorsTitle: 'Z čoho sa skladá rozpočet',
  priceFactors: [
    'Program Shopify: predplatné sa platí samostatne, mimo ceny našich služieb; zohľadnite aj poplatky platformy, spracovania platieb a transakcií',
    'Služby agentúry: dohodnutá analýza, plánovanie, dizajn, vývoj, nastavenie, integrácie, testovanie a spustenie',
    'Platené témy a aplikácie: jednorazové či pravidelné poplatky, ktoré identifikujeme pri plánovaní',
    'Integrácie a technická náročnosť: CRM, ERP, externé API, migrácia, B2B procesy a úpravy pokladne môžu rozšíriť rozsah prác',
    'Práce po spustení: ďalší vývoj, údržbu, CRO, SEO a správu reklamy si môžete objednať samostatne',
  ],
  expert: {
    name: 'Liza Koshman',
    role: 'Spolumajiteľka Koshman Ecom',
    bio: 'Strategická manažérka pre prácu so značkami v e-commerce a vedúca tímu pre ekosystém Shopify. Pomáha určiť, čo váš e-shop potrebuje, a vedie projekt od zadania po spustenie.',
    image: '/team/Liza.png',
  },
  faqTitle: 'Často kladené otázky',
  faq: [
    [
      'Koľko stojí tvorba Shopify e-shopu?',
      'Cena závisí od dizajnu, katalógu, integrácií, migrácie, trhov a funkcií. Odhad pripravíme po posúdení zadania. Predplatné Shopify, platené témy, aplikácie a externé služby sa platia samostatne, mimo služieb agentúry.',
    ],
    [
      'Ako dlho trvá vytvorenie Shopify e-shopu?',
      'Termín závisí od rozsahu, pripravenosti obsahu a produktových dát, integrácií a schvaľovania. Realistický plán dohodneme po úvodnej konzultácii.',
    ],
    [
      'Viete vytvoriť Shopify e-shop od nuly?',
      'Áno. V dohodnutom rozsahu zabezpečíme návrh, dizajn, nastavenie témy alebo vývoj na mieru, katalóg, vhodné platby a dopravu, analytiku, testovanie a spustenie.',
    ],
    [
      'Viete migrovať existujúci e-shop na Shopify?',
      'Áno, po posúdení pôvodnej platformy a dát. Preveríme produkty, zákazníkov, objednávky, obsah, URL adresy, SEO požiadavky a integrácie. Následne určíme, čo sa dá preniesť a akým spôsobom.',
    ],
    [
      'Je Shopify vhodný na predaj na Slovensku a v EÚ?',
      'Môže byť. Vhodnosť závisí od sídla firmy, cieľových krajín, platobných služieb, logistiky a lokalizácie. Pre konkrétny projekt posúdime Shopify Markets, jazyky, meny a potrebné prepojenia. Dostupnosť platieb a dopravy overujeme individuálne.',
    ],
    [
      'Viete vytvoriť B2B Shopify e-shop?',
      'Áno. Posúdime firemné účty, individuálne katalógy a ceny, veľkoobchodné podmienky, pravidlá objednávania a integrácie. Dostupné funkcie závisia od programu Shopify a zvoleného riešenia.',
    ],
    [
      'Potrebujem Shopify tému na mieru?',
      'Nie vždy. Správne nastavená existujúca téma môže pokryť vaše potreby. Vývoj na mieru odporúčame, keď štandardné možnosti nestačia na dôležité požiadavky značky alebo predaja.',
    ],
    [
      'Viete upraviť existujúci Shopify e-shop?',
      'Áno. Môžeme dohodnúť úpravy témy, nové funkcie, integrácie, opravy chýb, zlepšenie rýchlosti alebo údržbu bez kompletnej prestavby.',
    ],
    [
      'Pripravujete Shopify e-shopy na reklamu a SEO?',
      'Pri vývoji riešime štruktúru katalógu, produktové stránky, používanie na mobile, dohodnutú analytiku a základné technické SEO. Prípravu feedov možno zahrnúť do zadania. Priebežné SEO a správa reklamy sú samostatné služby.',
    ],
    [
      'Dostanem po spustení prístupy a zaškolenie?',
      'Áno. Odovzdáme dohodnuté prístupy a vysvetlíme základnú správu e-shopu, produktov a objednávok. Rozšírené školenie alebo ďalšiu podporu dohodneme v rozsahu projektu.',
    ],
  ],
  relatedTitle: 'Súvisiace služby',
  related: [
    [
      'Reklama',
      'Google Ads pre e-shopy',
      'Search, Shopping a Performance Max pre e-shop s nastaveným meraním nákupov.',
      '/services/google-ads',
    ],
    [
      'Vývoj na Shopify',
      'Úpravy Shopify e-shopu',
      'Nové sekcie, integrácie, rýchlosť a opravy chýb v e-shope, ktorý už funguje.',
      '/services#shopify-dev',
    ],
    [
      'Vývoj na Shopify',
      'B2B Shopify',
      'Veľkoobchodný predaj: firemné katalógy, individuálne ceny a pravidlá objednávania.',
      '/services#shopify-dev',
    ],
    [
      'Stratégia a plán rastu',
      'Shopify CRO audit',
      'Posúdenie nákupného procesu, UX a pokladne: kde e-shop stráca zákazníkov.',
      '/services#strategy',
    ],
    [
      'SEO',
      'SEO pre e-shopy',
      'Organická viditeľnosť katalógu, kolekcií a produktov v Google.',
      '/services#seo',
    ],
    [
      'Kontakty',
      'Kontaktujte nás',
      'Telegram, WhatsApp, telefón alebo e-mail — vyberte si, ako vám to vyhovuje.',
      '/contacts',
    ],
  ],
  extraSections: [
    {
      id: 'what-is-shopify',
      tone: 'light',
      placement: 'after-tldr',
      title: 'Čo je e-shop na Shopify?',
      intro:
        'Shopify je e-commerce platforma na tvorbu e-shopu a správu produktov, objednávok, zákazníkov a predaja z jedného administračného rozhrania.\n\nPlatforma poskytuje technický základ. Konkrétny Shopify e-shop však potrebuje štruktúru, produktový katalóg, dizajn a prevádzkové nastavenia prispôsobené vášmu podnikaniu. Zákazník musí vedieť nájsť produkt, pochopiť ponuku a dokončiť objednávku s dostupnou platbou a dopravou.\n\nPri tvorbe e-shopu na Shopify tieto časti prepájame: od obchodných požiadaviek a návrhu cez vývoj až po testovanie, spustenie a dohodnuté ďalšie kroky.',
      variant: 'cards',
    },
    {
      id: 'ready-to-sell',
      tone: 'grey',
      placement: 'after-tldr',
      title: 'Čo potrebuje Shopify e-shop, aby bol pripravený predávať?',
      variant: 'cards',
      items: [
        [
          'Správne nastavenú platformu',
          'Shopify obsahuje nástroje na správu produktov, kolekcií, objednávok a zákazníkov. Nastavíme ich podľa vášho predajného modelu, cieľových trhov a každodennej prevádzky.',
        ],
        [
          'E-shop prispôsobený vášmu podnikaniu',
          'Téma, navigácia, obsah, filtre, produktové stránky a integrácie majú vychádzať z vašej ponuky a spôsobu, akým zákazníci nakupujú. Možnosti nastavenia a úprav pokladne závisia od programu Shopify a dostupných funkcií.',
        ],
        [
          'Ucelený nákupný proces',
          'Zákazník potrebuje pohodlne prehliadať produkty aj na mobile, rozumieť cenám a doprave a dokončiť objednávku bez zbytočných prekážok. Analytika a správne technické nastavenie vám pomôžu nákupný proces po spustení vyhodnocovať a zlepšovať.',
        ],
      ],
    },
    {
      id: 'process',
      marker: 'numbered',
      tone: 'light',
      placement: 'after-included',
      title: 'Ako prebieha tvorba e-shopu na Shopify?',
      intro:
        'Sedem etáp od prvého dopytu po spustenie. Každá sa končí dohodnutým výsledkom, takže viete, čo je hotové a čo nasleduje.',
      variant: 'list',
      items: [
        [
          'Úvodný dopyt',
          'Napíšte nám o vašej firme, produktoch, cieľových trhoch, aktuálnom webe alebo platforme a o tom, čo chcete dosiahnuť.',
        ],
        [
          'Konzultácia a zadanie',
          'Spresníme katalóg, požadované funkcie, integrácie, rozpočet, termíny a vhodný spôsob realizácie.',
        ],
        [
          'Štruktúra a plán projektu',
          'Dohodneme architektúru e-shopu, výstupy, prioritné stránky, technický postup a kroky potrebné na spustenie.',
        ],
        [
          'Dizajn a nastavenie témy',
          'Pripravíme vizuálny štýl, rozloženie stránok, navigáciu, prezentáciu produktov a hlavné nákupné scenáre.',
        ],
        [
          'Vývoj a integrácie',
          'Nastavíme Shopify, produkty, kolekcie, platby, dopravu, aplikácie, analytiku a dohodnuté prepojenia so systémami.',
        ],
        [
          'Testovanie',
          'Overíme nákupný proces na relevantných zariadeniach. Otestujeme objednávky, platby, dopravu a prenos dát.',
        ],
        [
          'Spustenie a ďalšie kroky',
          'Spustíme e-shop, vykonáme dohodnuté kontroly a odovzdanie. Následne určíme priority, napríklad reklamu, SEO, optimalizáciu konverzií, e-mail marketing, CRM alebo rozšírenie na ďalšie trhy.',
        ],
      ],
      cta: 'Prebrať váš Shopify projekt',
    },
    {
      id: 'variants',
      tone: 'grey',
      placement: 'after-included',
      title: 'Možnosti realizácie Shopify e-shopu',
      variant: 'cards',
      items: [
        [
          'E-shop na existujúcej téme',
          'Praktická možnosť pre jednoduchší katalóg alebo menší rozpočet. Nastavíme farby, typografiu, sekcie, stránky a prezentáciu produktov tak, aby zodpovedali vašej značke.',
        ],
        [
          'Úpravy Shopify témy',
          'Riešenie pre e-shopy, ktorým nestačia štandardné možnosti témy. Môžeme doplniť sekcie, upraviť rozloženie, zlepšiť ovládanie na mobile a vyvinúť konkrétne prvky rozhrania.',
        ],
        [
          'Shopify e-shop na mieru',
          'Pre náročnejšie požiadavky, napríklad špecifický nákupný proces, produktový konfigurátor, rozsiahlejší katalóg alebo vlastné integrácie. Pred návrhom riešenia posúdime realizovateľnosť a obmedzenia platformy.',
        ],
      ],
      outro:
        'Nie každý projekt potrebuje tému vyvinutú od základu. Zároveň nemusí hotová téma pokryť všetky vaše požiadavky. Vhodný postup odporučíme po posúdení zadania.',
    },
    {
      id: 'ecommerce',
      marker: 'check',
      tone: 'dark',
      placement: 'after-included',
      title: 'Shopify pre každodenný predaj a prevádzku e-shopu',
      intro:
        'Dobrý Shopify web potrebuje viac než kvalitne navrhnutú úvodnú stránku.\n\nKatalóg, produktové stránky, skladové údaje, doprava, platby a objednávky musia fungovať spoločne.',
      variant: 'list',
      items: [
        [
          'Katalóg a kolekcie',
          'Produkty usporiadame podľa toho, ako ich zákazníci hľadajú a vyberajú. Cieľom je jednoduchšia orientácia v kategóriách, variantoch a konkrétnych produktoch.',
        ],
        [
          'Produktové feedy a príprava na reklamu',
          'Ak sú súčasťou zadania, pripravíme produktové dáta a posúdime požiadavky na feedy pre kanály, ako sú Google Shopping a Meta. Nastavenie predajných kanálov a schválenie produktov závisia od pravidiel platforiem a podmienok účtov.',
        ],
        [
          'Meranie nákupov a tržieb',
          'Nastavíme dohodnuté e-commerce udalosti, aby ste mohli vyhodnocovať objednávky a tržby spolu s návštevnosťou. Zohľadníme nastavenie súhlasov aj technické obmedzenia.',
        ],
        [
          'Zrozumiteľné informácie o doprave a platbách',
          'Spôsoby doručenia, náklady, termíny a platobné možnosti sprístupníme tak, aby sa zákazník vedel rozhodnúť ešte pred dokončením objednávky.',
        ],
        [
          'Nakupovanie na mobile',
          'Skontrolujeme menu, vyhľadávanie, filtre, produktové stránky, košík a pokladňu na mobilných zariadeniach, nielen vzhľad na počítači.',
        ],
        [
          'Základ pre optimalizáciu konverzií',
          'Navrhneme štruktúru, ktorú môžete po spustení merať a postupne zlepšovať — od nájdenia produktu až po dokončený nákup.',
        ],
      ],
      cta: 'Prebrať váš Shopify projekt',
      actions: [{ label: 'Google Ads pre e-shopy', href: '/services/google-ads' }],
    },
    {
      id: 'b2b',
      marker: 'check',
      tone: 'light',
      placement: 'after-included',
      title: 'Shopify pre B2B a veľkoobchod',
      intro:
        'Shopify môže slúžiť aj na veľkoobchodný predaj a firemné nákupy, nielen na predaj koncovým zákazníkom.\n\nPre výrobcov, distribútorov a veľkoobchodné firmy posúdime požiadavky, ako sú tieto.',
      variant: 'list',
      items: [
        ['Katalógy prispôsobené konkrétnym zákazníkom', ''],
        ['Individuálne alebo zmluvné ceny', ''],
        ['Veľkoobchodné cenníky', ''],
        ['Firemné účty', ''],
        ['Viacerí nákupcovia v rámci jednej firmy', ''],
        ['Minimálne odberné množstvá a množstevné pravidlá', ''],
        ['Platobné podmienky a splatnosť', ''],
        ['Rýchle opakovanie objednávok', ''],
        ['Prepojenia s CRM a ERP', ''],
      ],
      outro:
        'Tieto funkcie nie sú dostupné rovnakým spôsobom v každom programe Shopify. Riešenie môže využívať vstavané B2B funkcie, aplikácie alebo vývoj na mieru podľa konkrétnych požiadaviek.\n\nAk plánujete samostatný veľkoobchodný e-shop alebo spoločný predaj pre B2C a B2B zákazníkov, preberieme s vami špecializované B2B riešenie na Shopify.',
      actions: [{ label: 'Prebrať B2B Shopify e-shop', service: 'B2B Shopify' }],
    },
    {
      id: 'existing-store',
      marker: 'check',
      tone: 'grey',
      placement: 'after-included',
      title: 'Už máte Shopify e-shop?',
      intro:
        'Nový e-shop nemusí byť potrebný.\n\nPosúdime existujúce riešenie a navrhneme konkrétne úpravy podľa vašich priorít. Môže ísť napríklad o tieto.',
      variant: 'list',
      items: [
        ['Doplnenie nových funkcií', ''],
        ['Aktualizáciu alebo výmenu témy', ''],
        ['Pridanie nových sekcií', ''],
        ['Zapojenie ďalšej integrácie', ''],
        ['Odstránenie technických chýb', ''],
        ['Zlepšenie používania na mobile', ''],
        ['Riešenie problémov s rýchlosťou načítania', ''],
        ['Redizajn dôležitých stránok alebo celého e-shopu', ''],
        ['Prípravu na reklamné kampane', ''],
        ['Identifikáciu prekážok v nákupnom procese', ''],
      ],
      outro:
        'Samostatný Shopify CRO audit môže podrobnejšie zhodnotiť nákupný proces, používateľský zážitok a pokladňu.',
      actions: [
        { label: 'Prebrať úpravy Shopify e-shopu', service: 'Úpravy Shopify e-shopu' },
        { label: 'Požiadať o Shopify CRO audit', service: 'Shopify CRO audit' },
      ],
    },
    {
      id: 'migration',
      marker: 'check',
      tone: 'light',
      placement: 'after-included',
      title: 'Migrácia e-shopu na Shopify',
      intro:
        'Ak používate inú platformu, posúdime, či je prechod na Shopify vhodným ďalším krokom, a pripravíme plán migrácie.\n\nShopify migrácia nezahŕňa iba presun produktov. Môže sa týkať aj zákazníkov, objednávok, obsahu, URL adries, metadát, integrácií, analytiky a existujúcej SEO štruktúry. Podľa pôvodnej platformy a dohodnutého rozsahu môžeme zabezpečiť nasledovné.',
      variant: 'list',
      items: [
        ['Posúdenie súčasnej platformy a dát', ''],
        ['Prípravu migračného plánu', ''],
        ['Presun produktov a katalógových údajov', ''],
        ['Prenos zákazníkov a objednávok', 'Ak ho dostupné riešenie podporuje.'],
        ['Priradenie pôvodných URL adries k novým', ''],
        ['Nastavenie vhodných presmerovaní 301', ''],
        ['Prenos metadát a obsahu stránok', ''],
        ['Nastavenie novej témy alebo redizajn', ''],
        ['Testovanie platieb a dopravy', ''],
        ['Kontrolu analytiky', ''],
        ['Spustenie a dohodnuté kontroly po migrácii', ''],
      ],
      outro:
        'Pred migráciou identifikujeme obmedzenia vrátane údajov, ktoré sa nedajú preniesť priamo alebo si vyžadujú iný postup.\n\nPríprava migrácie môže znížiť SEO riziká, nezaručuje však zachovanie všetkých pozícií ani nezmenenú návštevnosť. Výsledok závisí od pôvodného webu, kvality dát, mapovania URL, technickej realizácie a spracovania zmien vyhľadávačmi.',
      cta: 'Prebrať migráciu na Shopify',
    },
    {
      id: 'integrations',
      marker: 'dot',
      tone: 'grey',
      placement: 'after-included',
      title: 'Shopify integrácie',
      intro:
        'E-shop často potrebuje spolupracovať s ďalšími firemnými systémami. Pri návrhu integrácií preto riešime nielen samotné prepojenie, ale aj to, aké dáta sa majú prenášať a ako ich budete používať.\n\nPosúdime možnosti prepojenia s týmito systémami.',
      variant: 'list',
      items: [
        ['CRM platformy', ''],
        ['ERP systémy', ''],
        ['Účtovné programy', ''],
        ['Skladové systémy', ''],
        ['Systémy na správu produktových informácií (PIM)', ''],
        ['E-mail marketingové nástroje', ''],
        ['Platobné služby', ''],
        ['Dopravné a fulfillment služby', ''],
        ['Analytické nástroje', ''],
        ['Externé API', ''],
      ],
      outro:
        'Spôsob implementácie závisí od konkrétnej služby, krajiny, dokumentácie, prístupu k API, predplatného a obmedzení platformy.\n\nPred vývojom preveríme kompatibilitu, potrebné dátové toky, pravidlá synchronizácie a riešenie chýb. Dostupnosť konkrétnych platobných či dopravných služieb pre Slovensko a ďalšie trhy overujeme pri každom projekte.',
    },
    {
      id: 'readiness',
      marker: 'tiles',
      tone: 'light',
      placement: 'after-included',
      title: 'Ako overujeme pripravenosť na spustenie?',
      intro:
        'Nestačí, aby sa stránky správne načítali.\n\nPred spustením kontrolujeme dohodnutý rozsah z pohľadu zákazníka aj každodennej prevádzky.',
      variant: 'list',
      items: [
        ['Produktový katalóg', 'Overíme zobrazenie produktov, variantov, cien, skladových údajov, obrázkov a kolekcií.'],
        [
          'Navigácia',
          'Skontrolujeme, či zákazník dokáže nájsť relevantné produkty bez zbytočných krokov a neprehľadného členenia.',
        ],
        [
          'Produktové stránky',
          'Overíme dostupnosť dôležitých informácií o produkte, podmienkach nákupu, doprave a vrátení tovaru.',
        ],
        [
          'Košík a pokladňa',
          'Otestujeme pridanie produktov, zmenu množstva a dostupné kroky dokončenia objednávky. Kontrolujeme polia a nastavenia relevantné pre projekt.',
        ],
        ['Platby a doprava', 'V dohodnutých scenároch preveríme zobrazenie dostupných metód, sadzieb a podmienok.'],
        [
          'Použiteľnosť na mobile',
          'Skontrolujeme katalóg, produktové stránky, košík a formuláre na zariadeniach a veľkostiach obrazoviek zahrnutých do testovania.',
        ],
        [
          'Analytika',
          'Overíme dohodnuté udalosti a údaje o nákupoch vrátane správania pri relevantných nastaveniach súhlasov.',
        ],
        [
          'Základné SEO nastavenia',
          'Skontrolujeme dostupnosť kľúčových stránok, základné metadáta, nastavenia indexácie a zjavné technické problémy. Pri migrácii aj dohodnuté presmerovania.',
        ],
      ],
    },
    {
      id: 'after-launch',
      marker: 'check',
      tone: 'grey',
      placement: 'after-included',
      title: 'Čo nasleduje po spustení?',
      intro: 'Ďalší rozvoj e-shopu sa môže zamerať na tieto oblasti.',
      variant: 'list',
      items: [
        ['Google Ads', ''],
        ['Meta Ads', ''],
        ['SEO', ''],
        ['E-mail marketing', ''],
        ['CRM', ''],
        ['Shopify CRO audit', ''],
        ['Opakované nákupy a dlhodobá hodnota zákazníka', ''],
        ['Vstup na ďalšie trhy', ''],
        ['B2B predaj', ''],
        ['Analytika a optimalizácia konverzií', ''],
      ],
      outro:
        'Spustenie vytvorí funkčný základ pre predaj. Získavanie zákazníkov, marketing a zlepšovanie e-shopu sú ďalšou etapou, nie automatickým výsledkom vývoja.\n\nPriebežnú podporu, správu, údržbu a rozvojové služby môžeme dohodnúť samostatne podľa vašich priorít.',
      actions: [
        { label: 'Google Ads pre e-shopy', href: '/services/google-ads' },
        { label: 'E-commerce služby', href: '/services' },
      ],
    },
    {
      id: 'why-no-sales',
      marker: 'problem',
      tone: 'dark',
      placement: 'after-included',
      title: 'Prečo Shopify e-shop nemusí premieňať návštevy na objednávky?',
      intro:
        'Aj technicky funkčný e-shop môže strácať zákazníkov medzi prvou návštevou a dokončením nákupu.\n\nPri plánovaní a konzultácii sa zameriavame napríklad na tieto problémy.',
      variant: 'list',
      items: [
        ['Štruktúra katalógu nezodpovedá spôsobu vyhľadávania zákazníkov', ''],
        ['Produktové stránky nevysvetľujú ponuku a jej hodnotu', ''],
        ['Náročná orientácia na mobile', ''],
        ['Nejasné ceny, náklady na dopravu alebo podmienky vrátenia', ''],
        ['Zbytočné prekážky pri dokončení objednávky', ''],
        ['Reklama smeruje na nevhodnú stránku', ''],
        ['Chýbajúce alebo nepresné meranie nákupov', ''],
        ['Produktové dáta nie sú pripravené na produktové kampane', ''],
        ['Pomalé načítanie stránok', ''],
        ['Dizajn alebo obsah oslabuje dôveru', ''],
        ['Chýba podpora opakovaných nákupov', ''],
        ['B2B zákazníci nevidia svoje ceny alebo podmienky', ''],
      ],
      outro:
        'Ako Shopify agentúra vnímame e-shop ako súčasť celého predajného procesu — od príchodu zákazníka až po objednávku a ďalší nákup.',
      cta: 'Prebrať váš Shopify projekt',
    },
  ],
  schema: {
    name: 'Tvorba Shopify e-shopu pre e-commerce značky',
    serviceType: 'Shopify store development',
    // Na stránke nie je potvrdená cena — bez Offer a hasOfferCatalog
    offers: false,
  },
  leadTitle: 'Pripravme váš Shopify e-shop na prijímanie objednávok',
  leadText:
    'Napíšte nám o vašich produktoch, cieľových trhoch a plánoch. Pomôžeme vám vybrať vhodný spôsob realizácie, určiť rozsah a navrhnúť praktický prvý krok.',
  leadSubmit: 'Prebrať váš Shopify projekt',
};

/**
 * Google Ads, slovenčina — primárne trh Slovensko, sekundárne EÚ.
 * Bez cien v eurách (cenník nie je schválený) a bez Google Partner tvrdení.
 */
const googleAds: ServicePage = {
  slug: 'google-ads',
  category: 'Reklama',
  categoryKey: 'ads',
  short: 'Google Ads',
  metaTitle: 'Google Ads agentúra pre e-shopy a firmy | Koshman Ecom',
  metaDescription:
    'Nastavenie a správa Google Ads pre e-shopy, B2B a služby. Vyhľadávanie, Google Shopping, Performance Max, meranie konverzií a optimalizácia podľa predaja a ROAS. Dohodnite si konzultáciu.',
  h1: 'Google Ads pre e-shopy a firmy',
  lead: 'Nastavujeme, spravujeme a optimalizujeme Google Ads tak, aby reklama prinášala objednávky, kvalitné dopyty a merateľný rast.',
  leadExtra:
    'Od vyhľadávacích a produktových kampaní cez Performance Max až po remarketing a meranie konverzií. Reklamu prepájame s vaším webom, analytikou a obchodnými cieľmi.',
  sectionLabels: false,
  stepsAccent: true,
  stepsCta: 'Prebrať projekt',
  leadPosition: 'after-price',
  heroCta: { primary: 'Prebrať projekt', secondary: 'Dohodnúť konzultáciu' },
  facts: [
    ['Formát', 'Nastavenie a správa'],
    ['Kampane', 'Search, Shopping, PMax'],
    ['Meranie', 'GA4, GTM, konverzie'],
    ['Reporty', 'Klientsky dashboard'],
    ['Trhy', 'Slovensko, EÚ a ďalšie'],
  ],
  areaServed: ['SK'],
  updated: '13. novembra 2026',
  forTitle: 'Pre koho je Google Ads vhodný?',
  forWhom: [
    ['E-shopy', 'Predaj produktov cez vyhľadávanie, Shopping a Performance Max.'],
    ['B2B firmy', 'Relevantné dopyty a lead generation cez vyhľadávacie kampane.'],
    ['Služby', 'Formuláre, telefonáty, rezervácie a konzultácie.'],
    ['Výrobcovia a značky', 'Získavanie dopytu na Slovensku aj v zahraničí.'],
    ['Firmy, ktoré už inzerujú', 'Audit účtu, oprava merania a optimalizácia výkonu.'],
    ['Firmy expandujúce do zahraničia', 'Kampane prispôsobené jazyku, trhu, mene, dopytu a logistike.'],
  ],
  forWhomNote:
    'Google Ads nenahradí nejasnú ponuku, nefunkčný checkout, slabý web ani chýbajúce meranie. Pred spustením overíme, či sú web, landing pages, platba, doprava a spracovanie dopytov pripravené na platenú návštevnosť.',
  includedTitle: 'Čo zahŕňa nastavenie Google Ads?',
  includedIntro:
    'Nastavenie je postupný proces, nie jedno kliknutie. Dobrý štart sa začína biznisom, webom a tým, ako budeme merať výsledok.',
  included: [
    ['Analýza biznisu a cieľov', 'Ponuka, marža, trh, zákazník, sezónnosť a KPI.'],
    ['Analýza dopytu a konkurencie', 'Ako ľudia hľadajú a aké ponuky vidia.'],
    ['Kontrola landing pages', 'Relevantnosť, mobilná použiteľnosť, ponuka, formulár, dôvera a checkout.'],
    ['Kľúčové slová a vylučujúce výrazy', 'Komerčné dopyty, zámer a negatívne kľúčové slová.'],
    ['Štruktúra kampaní', 'Kampane, reklamné skupiny alebo asset groups, lokality, jazyky, publiká a rozpočty.'],
    ['Texty reklám a assety', 'Nadpisy, popisy, rozšírenia, obrázky a výzvy k akcii.'],
    [
      'Meranie a e-commerce nastavenie',
      'GA4 (Google Analytics 4), Google Tag Manager, Google Ads conversion tracking a hodnota konverzií; pri e-shope Merchant Center, produktový feed a meranie nákupov.',
    ],
    ['Kontrola pred spustením', 'Odkazy, tracking, feed, rozpočty, schválenie reklám a prvé signály.'],
  ],
  stepsTitle: 'Ako začať spoluprácu s Koshman Ecom',
  steps: [
    ['Krok 1', 'Pošlete dopyt', 'Opíšete produkt, trh, web a hlavný problém.'],
    ['Krok 2', 'Bezplatná konzultácia', 'Prejdeme ciele, rozpočet, meranie a aktuálne kampane.'],
    ['Krok 3', 'Audit a plán', 'Určíme priority, rozsah, KPI a ďalšie kroky.'],
    ['Krok 4', 'Nastavenie alebo optimalizácia', 'Pripravíme kampane, opravíme meranie a pravidelne zlepšujeme výkon.'],
  ],
  priceTitle: 'Koľko stojí Google Ads a jeho správa?',
  priceText:
    'Jedna cena neplatí pre každý projekt. Rozsah závisí od počtu kampaní, trhov, produktov alebo služieb, stavu účtu, náročnosti merania a cieľov biznisu. Po krátkej konzultácii odporučíme vhodný ďalší krok a pripravíme rozsah spolupráce.',
  priceFactorsTitle: 'Z čoho sa skladá rozsah',
  priceFactors: [
    'Mediálny rozpočet platený priamo Googlu za kliky a zobrazenia',
    'Úvodné nastavenie alebo audit',
    'Mesačná správa a optimalizácia kampaní',
    'Dodatočné práce s webom, analytikou, CRM, Merchant Center alebo feedom — ak sú potrebné',
  ],
  expert: {
    name: 'Vlad Koshman',
    role: 'Zakladateľ Koshman Ecom',
    bio: 'Špecialista na medzinárodný e-commerce. Zodpovedá za stratégiu, spúšťanie predaja a zavádzanie AI do procesov. Vysvetľuje, ako má Google Ads fungovať spolu s webom, analytikou a obchodnými cieľmi.',
    image: '/team/Vlad.png',
  },
  faqTitle: 'Časté otázky o Google Ads',
  faq: [
    [
      'Spravujete Google Ads pre e-shopy?',
      'Áno. Podľa projektu pracujeme s vyhľadávacími, Shopping a Performance Max kampaňami, Merchant Center, produktovými feedmi, meraním nákupov a optimalizáciou podľa tržieb a ROAS.',
    ],
    [
      'Aký je rozdiel medzi Search, Shopping a Performance Max?',
      'Search pracuje najmä s vyhľadávacími dopytmi, Shopping zobrazuje produkty a Performance Max využíva automatizáciu a viac plôch Googlu. Správna kombinácia závisí od typu biznisu a cieľa kampane.',
    ],
    [
      'Koľko stojí správa Google Ads?',
      'Cena závisí od počtu kampaní a trhov, veľkosti katalógu, stavu reklamného účtu, náročnosti merania a cieľov. Po konzultácii odporučíme rozsah a pripravíme cenovú ponuku.',
    ],
    [
      'Aký rozpočet potrebujem na reklamu v Google?',
      'Univerzálny minimálny rozpočet neexistuje. Závisí od konkurencie, ceny za klik, marže, lokality, dopytu a predajného cyklu. Rozpočet má zodpovedať ekonomike produktu alebo služby a množstvu dát potrebných na vyhodnotenie.',
    ],
    [
      'Ako rýchlo uvidím výsledky Google Ads?',
      'Prvé kliky a konverzie sa môžu objaviť krátko po spustení, ale spoľahlivé vyhodnotenie potrebuje dostatok dát. Rýchlosť závisí od dopytu, konkurencie, rozpočtu, webu, ponuky a správne nastaveného merania.',
    ],
    [
      'Garantujete konkrétny ROAS alebo počet objednávok?',
      'Nie. Výsledok ovplyvňuje produkt, ponuka, konkurencia, dopyt, rozpočet, web, sezónnosť, skladová dostupnosť a spracovanie dopytov. Ciele a meranie nastavujeme tak, aby sa kampane dali optimalizovať podľa dát.',
    ],
    [
      'Pracujete aj s klientmi mimo Slovenska?',
      'Áno. Koshman Ecom pracuje s lokálnymi aj medzinárodnými e-commerce projektmi. Kampane pre každý trh prispôsobujeme jazyku, lokalite, mene, dopytu, logistike a obchodným podmienkam.',
    ],
  ],
  relatedTitle: 'Súvisiace služby',
  related: [
    ['Reklama', 'Meta, TikTok, Pinterest a YouTube', 'Reklama v ďalších kanáloch: spustenie kampaní, kreatívy a optimalizácia pre váš produkt.', '/services#ads'],
    ['Vývoj na Shopify', 'E-shop na Shopify', 'Technický základ pre reklamu: katalóg, rýchlosť, platby a doprava.', '/services#shopify-dev'],
    ['Blog', 'Opustené košíky a stratená návštevnosť', 'Kde e-shop stráca návštevníkov, za ktorých už zaplatil, a čo opraviť ako prvé.', '/blog/opustene-kosiky-stratena-reklamna-navstevnost'],
    ['O nás', 'Ako pracujeme', 'Tím, prístup a prehľadný proces pri e-commerce projektoch.', '/about'],
  ],
  leadTitle: 'Prebereme Google Ads pre váš biznis',
  leadText:
    'Napíšte nám o produkte, trhu a aktuálnych kampaniach — pripravíme odporúčania, plán a odhad rozsahu.',
  extraSections: [
    {
      id: 'what-is-google-ads',
      tone: 'light',
      placement: 'after-tldr',
      title: 'Čo je Google Ads?',
      intro:
        'Google Ads je reklamná platforma Google, ktorá umožňuje firmám zobrazovať produkty a služby ľuďom, ktorí ich vyhľadávajú, porovnávajú alebo objavujú online.\n\nPodľa typu kampane sa reklama môže zobrazovať vo Vyhľadávaní Google, v Google Shopping, na YouTube, v Mapách, v obsahovej sieti a na ďalších plochách Googlu.',
      variant: 'cards',
      items: [
        [
          'Rozpočet platený Googlu',
          'Peniaze za kliky a zobrazenia v reklamnom účte. Určuje ich dopyt, konkurencia a to, koľko pre vás môže stáť objednávka alebo dopyt — nie agentúra.',
        ],
        [
          'Odmena za nastavenie a správu',
          'Samostatná platba za prácu: analýza, štruktúra kampaní, reklamy, meranie, kontrola dát a pravidelná optimalizácia.',
        ],
        [
          'Obchodný výsledok',
          'Objednávky, leady, tržby, zisk a noví zákazníci. Reklama privedie relevantnú návštevu, no výsledok ovplyvňuje aj ponuka, web, cena, doprava, platba, checkout a spracovanie dopytov.',
        ],
      ],
      actions: [{ label: 'Ako funguje reklama Google Ads', href: '/blog/google-ads-pre-firmy' }],
    },
    {
      id: 'management',
      marker: 'check',
      placement: 'after-included',
      title: 'Čo zahŕňa správa Google Ads?',
      intro:
        'Nastavenie vytvorí základ.\n\nPravidelná správa pracuje s reálnymi dátami a postupne zlepšuje zacielenie, rozpočty, reklamy, meranie a obchodný výsledok.',
      variant: 'list',
      items: [
        ['Kontrola rozpočtov a čerpania', 'Rozpočet ide tam, kam má, a nemíňajú ho drahé dopyty bez výsledku.'],
        ['Analýza vyhľadávacích dopytov', 'Za čo reálne platíte a ktoré dopyty prinášajú objednávky a dopyty.'],
        ['Vylučujúce kľúčové slová', 'Odstraňujeme dopyty, ktoré prinášajú kliky, ale nie zákazníkov.'],
        ['Optimalizácia ponúk a rozpočtov', 'Stratégie ponúk nastavené podľa cieľov biznisu a reálnych dát.'],
        ['Testovanie textov reklám a assetov', 'Hľadáme silnejšie nadpisy, popisy a podklady.'],
        ['Kontrola kvality konverzií', 'Overujeme, že účet počíta akcie, ktoré naozaj prinášajú peniaze.'],
        ['Typy kampaní podľa projektu', 'Search, Shopping, Performance Max, Display a remarketing — tam, kde dávajú zmysel.'],
        ['Merchant Center a feed', 'Pri e-shopoch kontrolujeme názvy, ceny, dostupnosť a stav produktov.'],
        ['Odporúčania na landing pages a CRO', 'Kde stránka stráca kupujúcich a čo na webe opraviť (CRO = optimalizácia konverzného pomeru).'],
        ['Reportovací dashboard pre klienta', 'Aktuálna situácia v prehľadnom dashboarde, bez čakania na samostatný report.'],
        ['Pravidelné reporty a ďalšie kroky', 'Čo sa zmenilo, čo sme rozhodli a čo robíme ďalej.'],
      ],
      outro:
        'Rozsah práce závisí od počtu kampaní, trhov, veľkosti katalógu a cieľov biznisu. Výsledky ovplyvňuje aj sezónnosť, konkurencia, dopyt, ceny, skladová dostupnosť, web a obchodný proces.',
    },
    {
      id: 'campaign-types',
      tone: 'grey',
      placement: 'after-included',
      title: 'Aké typy Google Ads kampaní využívame?',
      intro:
        'Typ kampane sa riadi cieľom: predaj, dopyty, dosah alebo návrat návštevníkov. Toto sú formáty, s ktorými pracujeme najčastejšie.',
      variant: 'cards',
      items: [
        [
          'Vyhľadávacie kampane',
          'Vyhľadávacie kampane oslovujú ľudí, ktorí aktívne hľadajú produkt alebo službu. Hodia sa najmä na dopyty s jasným nákupným alebo kontaktným zámerom, lead generation, lokálne služby a vybrané e-commerce kategórie.',
        ],
        [
          'Google Shopping',
          'Google Shopping zobrazuje produkty s obrázkom, cenou a informáciami o obchode. Pre e-shop je dôležitý kvalitný Merchant Center, aktuálny produktový feed a správne meranie nákupov.',
        ],
        [
          'Performance Max',
          'Performance Max využíva automatizáciu Googlu a môže zobrazovať reklamy na viacerých plochách. Najlepšie funguje vtedy, keď má jasné ciele, správne konverzné signály, kvalitné podklady, feed a meranie hodnoty.',
        ],
        [
          'Remarketing',
          'Remarketing pomáha znovu osloviť ľudí, ktorí navštívili web, pozerali si produkt alebo nedokončili požadovanú akciu. Nenahrádza však opravu problémov s webom, cenou, dopravou alebo checkoutom.',
        ],
        [
          'Display a YouTube',
          'Doplnkové formáty na dosah a budovanie dopytu. Využívame ich podľa cieľa projektu — nie sú automaticky súčasťou každej spolupráce.',
        ],
      ],
    },
    {
      id: 'ecommerce',
      marker: 'check',
      tone: 'dark',
      placement: 'after-included',
      title: 'Google Ads pre e-shop',
      intro:
        'Pri e-shope reklama nezačína iba v reklamnom účte.\n\nSúvisí s katalógom, produktovým feedom, Merchant Center, cenami, skladom, dopravou, checkoutom, meraním nákupov a ekonomikou produktov.',
      variant: 'list',
      items: [
        ['Stav Merchant Center', 'Stav účtu, overenie domény a nastavenia, bez ktorých Shopping nefunguje.'],
        ['Kvalita produktového feedu', 'Názvy, popisy, obrázky, ceny a dostupnosť, ktoré zodpovedajú katalógu.'],
        ['Prioritné produkty a kategórie', 'Ktoré kategórie a produkty propagovať ako prvé.'],
        ['Udalosti v e-shope', 'Product view, add to cart, checkout a purchase sa správne prenášajú do reklamného účtu.'],
        ['Tržby a hodnota objednávky', 'Prenášame hodnotu nákupu, aby optimalizácia sledovala peniaze, nie kliky.'],
        ['ROAS v kontexte marže', 'ROAS (návratnosť výdavkov na reklamu) hodnotíme spolu s maržou a ziskom, nie ako jedno číslo za účet.'],
        ['Platforma e-shopu', 'Shopify, WooCommerce alebo iná platforma — pracujeme s tou, ktorú konkrétny klient používa.'],
        ['Doprava a platba', 'Jasné podmienky dopravy, vrátenia a platby, aby platená návštevnosť neodchádzala pred nákupom.'],
      ],
      cta: 'Prebrať reklamu pre váš e-shop',
    },
    {
      id: 'measurement',
      marker: 'tiles',
      outroTitle: 'Reportovací dashboard pre klienta',
      placement: 'after-included',
      title: 'Ako meriame výkon Google Ads',
      intro:
        'Kliknutie nie je obchodný výsledok.\n\nPodľa typu biznisu môže byť výsledkom kvalifikovaný dopyt, telefonát, rezervácia, nákup, tržba alebo nový zákazník.',
      variant: 'list',
      items: [
        ['GA4', 'Google Analytics 4: správanie používateľov a udalosti na webe.'],
        ['GTM', 'Google Tag Manager: správa tagov a udalostí bez zásahov do kódu webu.'],
        ['Google Ads conversion tracking', 'Prenos dohodnutých akcií do reklamného účtu.'],
        ['CRM a call tracking', 'Kvalita leadov a uzatvorený obchod — podľa potreby a technických možností.'],
        ['ROAS', 'Tržby v pomere k výdavkom na reklamu.'],
        ['CAC a cena za zákazníka', 'Koľko stojí získanie zákazníka a či to marža unesie.'],
        ['Marža', 'Prečo rovnaký ROAS nemusí znamenať rovnaký zisk.'],
        ['PNO', 'Podiel nákladov na obrat: koľko percent z tržieb tvorí reklama — ak ho klient používa ako KPI.'],
      ],
      outro:
        'Klient získava prístup k prehľadnému reportovaciemu dashboardu, v ktorom môže sledovať aktuálnu alebo pravidelne aktualizovanú situáciu: výdavky, návštevnosť, dopyty alebo nákupy, tržby, cenu za výsledok a ROAS podľa nastavenia konkrétneho projektu.\n\nPresné metriky a frekvencia aktualizácie závisia od zdrojov dát, merania a dohodnutých cieľov.',
    },
    {
      id: 'why-no-sales',
      marker: 'dot',
      tone: 'grey',
      placement: 'after-included',
      title: 'Prečo Google Ads prináša kliky, ale nie predaje?',
      intro:
        'Keď reklama prináša kliky, ale nie predaje, príčina býva zvyčajne v reťazci: dopyt → stránka → ponuka → checkout.\n\nToto kontrolujeme pri audite — skôr, než odporučíme navýšiť rozpočet.',
      variant: 'list',
      items: [
        ['Príliš široké alebo informačné dopyty', 'Rozpočet ide na návštevnosť, ktorá zriedka nakupuje.'],
        ['Chýbajúce vylučujúce kľúčové slová', 'Nerelevantné vyhľadávania míňajú rozpočet bez zákazníkov.'],
        ['Nesúlad reklamy a landing page', 'Stránka neponúka to, čo sľúbila reklama.'],
        ['Chybné alebo neúplné meranie konverzií', 'Účet sa optimalizuje na nesprávne akcie.'],
        ['Zamietnuté produkty v Merchant Center', 'Časť katalógu sa v Shoppingu vôbec nezobrazuje.'],
        ['Pomalý alebo nepohodlný web na mobile', 'Návštevníci odídu skôr, než uvidia ponuku.'],
        ['Nejasná cena, doprava alebo vrátenie tovaru', 'Kupujúci nevie, koľko zaplatí a kedy tovar príde.'],
        ['Problém s platbou alebo checkoutom', 'Návštevníci sa dostanú do checkoutu a tam odpadnú.'],
        ['Optimalizácia na kliky', 'Biznis potrebuje predaje alebo kvalitné leady, nie najlacnejšie kliky.'],
        ['Rozpočet nezodpovedá trhu', 'Výdavky nezodpovedajú konkurencii ani dĺžke predajného cyklu.'],
      ],
      outroTitle: 'Jednoduchý postup kontroly',
      outroSteps: [
        'Chodí na web správne publikum?',
        'Sú vyhľadávacie dopyty komerčne relevantné?',
        'Zaznamenáva meranie skutočné konverzie?',
        'Nestráca web používateľov na produktovej stránke alebo v checkoute?',
        'Zodpovedá výsledok marži a ekonomike biznisu?',
      ],
      cta: 'Začať auditom Google Ads',
    },
  ],
  schema: {
    name: 'Google Ads pre e-shopy a firmy',
    serviceType: 'Google Ads management and PPC advertising',
    offers: false,
  },
};

export const skServicePages: Record<string, ServicePage> = {
  [shopify.slug]: shopify,
  [googleAds.slug]: googleAds,
};

export default skServicePages;
