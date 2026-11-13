import type { ServicePage } from './types';

/**
 * Slovenské texty stránok jednotlivých služieb.
 * Koncept — pred publikovaním treba korektúra od native speakera.
 */
const shopify: ServicePage = {
  slug: 'shopify',
  category: 'Vývoj na Shopify',
  categoryKey: 'shopify-dev',
  short: 'Tvorba e-shopu na Shopify',
  metaTitle: 'Tvorba e-shopu na Shopify na kľúč — Koshman Ecom',
  metaDescription:
    'Tvorba e-shopu na Shopify na kľúč: katalóg, vlastná téma, platby, doprava, integrácie a spustenie. Pre značky zo Slovenska, Česka a celej EÚ.',
  h1: 'Tvorba e-shopu na Shopify na kľúč',
  lead: 'Koshman Ecom stavia e-shopy na Shopify pre značky zo Slovenska, Česka a ďalších trhov EÚ: od štruktúry katalógu a dizajnu témy po platby, dopravu, integrácie a analytiku. Dostanete e-shop pripravený prijímať objednávky a tím, ktorý vie, čo má nasledovať.',
  facts: [
    ['Formát', 'Na kľúč'],
    ['Čas spustenia', 'od 4 týždňov'],
    ['Platforma', 'Shopify a Shopify Plus'],
    ['Trhy', 'Slovensko, Česko, EÚ'],
    ['Po spustení', 'podpora a rozvoj'],
  ],
  areaServed: ['SK', 'CZ', 'EU'],
  updated: '28. októbra 2026',
  tldr: [
    'Shopify je platforma pre e-shop, kde hosting, bezpečnosť, platby aj aktualizácie zabezpečuje služba.',
    'Preberáme štruktúru katalógu, dizajn a vývoj témy, platby, dopravu, integrácie a spustenie.',
    'E-shop staviame s ohľadom na konverziu: rýchlosť, jasná cesta do košíka, mobilná verzia.',
    'Po spustení si e-shop môžete spravovať sami v administrácii Shopify, alebo rozvoj necháte na nás.',
  ],
  forTitle: 'Komu Shopify vyhovuje',
  forWhom: [
    [
      'Značkám s vlastným produktom',
      'Keď potrebujete e-shop, ktorý vyzerá ako značka, nie ako šablóna z marketplace.',
    ],
    [
      'Predajcom z marketplaceov',
      'Predaj na Etsy či Amazone už funguje a je čas mať vlastný kanál bez provízií platformy.',
    ],
    [
      'E-shopom na starej platforme',
      'Web je pomalý, neaktualizuje sa a stráca návštevnosť — katalóg a objednávky prenesieme na Shopify.',
    ],
    [
      'Veľkoobchodným firmám',
      'B2B e-shop so zatvoreným katalógom, individuálnymi cenami a platbou na faktúru.',
    ],
  ],
  includedTitle: 'Čo zahŕňa tvorba e-shopu',
  included: [
    ['Štruktúra a katalóg', 'Kategórie, filtre, varianty produktov, kolekcie a navigácia podľa vášho sortimentu.'],
    ['Dizajn e-shopu', 'Dizajn v štýle značky: domovská stránka, katalóg, produkt, košík a pokladňa.'],
    ['Vývoj témy', 'Téma Shopify s vlastnými sekciami, ktoré neskôr upravíte bez programátora.'],
    ['Platby', 'Shopify Payments, Stripe, PayPal, lokálne platobné brány a platba pri doručení.'],
    ['Doprava', 'Zóny a tarify dopravy, prepravcovia, výpočet ceny priamo v košíku.'],
    ['Integrácie', 'CRM, skladový systém, ERP, prepravcovia, e-mailové nástroje, Pinterest a Google Merchant Center.'],
    ['Rýchlosť a mobil', 'Optimalizácia obrázkov a skriptov, Core Web Vitals, testovanie na telefónoch.'],
    ['Analytika a spustenie', 'GA4, Consent Mode, udalosti košíka a nákupu, prenos domény, finálne testy.'],
  ],
  stepsTitle: 'Etapy tvorby e-shopu na Shopify',
  steps: [
    ['1. týždeň', 'Brief a štruktúra', 'Rozoberieme produkt, zákazníkov a konkurenciu, zostavíme štruktúru katalógu.'],
    ['2. týždeň', 'Dizajn', 'Navrhneme kľúčové stránky a odsúhlasíme vzhľad e-shopu.'],
    ['3.–4. týždeň', 'Vývoj', 'Postavíme tému, naplníme katalóg, nastavíme platby a dopravu.'],
    ['5. týždeň', 'Integrácie a testy', 'Pripojíme služby, otestujeme objednávky od začiatku do konca, doladíme detaily.'],
    ['Spustenie', 'Publikovanie', 'Prenesieme doménu, zapneme analytiku a e-shop odovzdáme s návodom.'],
  ],
  compareTitle: 'Šablóna svojpomocne alebo e-shop s agentúrou',
  compareColumns: ['Svojpomocne na šablóne', 'S Koshman Ecom'],
  compare: [
    [
      'Čas do spustenia',
      'Mesiace učenia platformy a aplikácií',
      'Jasný plán a funkčný e-shop za niekoľko týždňov',
    ],
    [
      'Vzhľad e-shopu',
      'Štandardná téma podobná stovkám iných',
      'Dizajn podľa značky a téma postavená naň',
    ],
    [
      'Konverzia',
      'Cesta do košíka „ako vyšla“',
      'Produkt, košík a pokladňa postavené na nákup',
    ],
    [
      'Aplikácie a náklady',
      'Desiatka platených aplikácií pre každý prípad',
      'Len potrebné služby, ostatné je v kóde témy',
    ],
    [
      'SEO a AI vyhľadávanie',
      'Duplicitné stránky, prázdne meta tagy, žiadne štruktúrované dáta',
      'Štruktúra, meta tagy, Schema.org a sitemap od prvého dňa',
    ],
  ],
  priceTitle: 'Koľko stojí e-shop na Shopify',
  priceText:
    'Cena závisí od počtu produktov, náročnosti dizajnu a rozsahu integrácií. Presnú cenu povieme po krátkom briefe, zvyčajne do jedného pracovného dňa. Prvá konzultácia je bezplatná.',
  priceFactorsTitle: 'Od čoho závisí cena',
  priceFactors: [
    'Počet produktov, variantov a kategórií',
    'Dizajn od nuly alebo úprava témy',
    'Integrácie: CRM, sklad, prepravcovia, platby',
    'Počet jazykov a mien e-shopu',
    'Podpora a rozvoj po spustení',
  ],
  expert: {
    name: 'Liza Koshman',
    role: 'Vedúca oddelenia Shopify',
    bio: 'Spolumajiteľka Koshman Ecom a vedúca oddelenia Shopify. Vedie projekty tvorby a rozvoja e-shopov pre značky zo Slovenska a ďalších trhov EÚ.',
    image: '/team/Liza.png',
  },
  faqTitle: 'Časté otázky o Shopify',
  faq: [
    [
      'Koľko stojí samotné Shopify mesačne?',
      'Shopify je predplatné s niekoľkými tarifmi, od základnej až po Shopify Plus pre veľké e-shopy. Aktuálne ceny sú na stránke taríf Shopify a závisia od krajiny a fakturačného obdobia. Táto platba ide platforme a nie je súčasťou vývoja — pomôžeme vybrať tarif podľa objemu objednávok.',
    ],
    [
      'Aké platobné metódy viete pripojiť?',
      'Na Slovensku pripájame Shopify Payments alebo lokálne platobné brány, k tomu Apple Pay, Google Pay, platbu na dobierku a prevodom. Pre zákazníkov z iných krajín EÚ dopĺňame Stripe a PayPal. Výber závisí od toho, kde je firma registrovaná a kde sú vaši zákazníci.',
    ],
    [
      'Ako dlho trvá tvorba e-shopu?',
      'Zvyčajne od štyroch týždňov. Závisí od počtu produktov, pripravenosti fotiek a textov a od rozsahu integrácií. Presný termín povieme po briefe.',
    ],
    [
      'Dá sa e-shop preniesť z inej platformy?',
      'Áno. Prenesieme produkty, kategórie, zákazníkov a objednávky zo Shoptetu, WooCommerce, PrestaShopu, OpenCartu či vlastného riešenia a staré adresy zachováme presmerovaniami, aby ste nestratili pozície v Google.',
    ],
    [
      'Budem si môcť e-shop upravovať sám?',
      'Áno, to je hlavný dôvod voľby Shopify. Produkty, ceny, texty aj bloky domovskej stránky sa menia v administrácii bez programátora — sekcie témy robíme editovateľné a odovzdáme krátky videonávod.',
    ],
    [
      'Robíte viacjazyčné e-shopy?',
      'Áno. Shopify Markets umožňuje viac jazykov a mien v jednom e-shope: zákazník vidí ceny vo svojej mene a každý jazyk má vlastné adresy a hreflang pre Google.',
    ],
    [
      'Hodí sa Shopify na veľkoobchod B2B?',
      'Áno. Nastavíme zatvorený katalóg pre schválených zákazníkov, individuálne cenníky, minimálne objednávky a platbu na faktúru. Shopify Plus má na B2B aj samostatnú funkcionalitu.',
    ],
    [
      'Riešite po spustení aj SEO a reklamu?',
      'Áno. E-shop odovzdávame s technickým SEO základom a ďalej môžeme prevziať SEO, optimalizáciu pre AI vyhľadávanie, Google Ads a Meta Ads — sú to samostatné služby, ktoré často nasledujú hneď po vývoji.',
    ],
  ],
  relatedTitle: 'Súvisiace služby',
  related: [
    [
      'Vývoj na Shopify',
      'Úpravy Shopify',
      'Nové sekcie, integrácie, rýchlosť a oprava chýb v existujúcom e-shope.',
      '/services#shopify-dev',
    ],
    [
      'Stratégia a plán rozvoja',
      'CRO audit Shopify',
      'Nájdeme, kde e-shop stráca zákazníkov, a zostavíme plán rastu konverzie.',
      '/services#strategy',
    ],
    [
      'SEO',
      'SEO služby',
      'Rast organickej návštevnosti v Google a viditeľnosti v AI vyhľadávaní.',
      '/services#seo',
    ],
    [
      'Reklama',
      'Google Ads a Meta Ads',
      'Návštevnosť nového e-shopu so zameraním na návratnosť rozpočtu.',
      '/services#ads',
    ],
  ],
  leadTitle: 'Postavíme váš e-shop na Shopify',
  leadText:
    'Napíšte nám o produkte a trhu — navrhneme štruktúru e-shopu, termín a cenu.',
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

/**
 * Сторінку Shopify знято з сайту (рішення від 13.11.2026). Текст лишається тут
 * чернеткою: щоб повернути — додати `[draftShopify.slug]: draftShopify` у мапу нижче
 * і `'shopify-dev|Shopify': 'shopify'` у SERVICE_PAGE_BY_ITEM (index.ts).
 */
export const draftShopify = shopify;

export const skServicePages: Record<string, ServicePage> = {
  [googleAds.slug]: googleAds,
};

export default skServicePages;
