import type { CaseStudy } from './types';
import { ukCaseStudies } from './uk';

/**
 * Slovenské prípadové štúdie. Publikum: značky a e-shopy zo Slovenska,
 * Česka a EÚ. Ukrajinu nespomíname. Obrázky, čísla a rozloženie pinov
 * sú z ukrajinského originálu, mení sa len text. Čísla v slovenskom
 * formáte (17 000 · 1,1 mil. · 4,1x).
 */

const wed = ukCaseStudies['pinterest-ads-wedding-dresses'];
const decor = ukCaseStudies['pinterest-ads-home-decor'];

/** Rovnaké piny v rovnakom poradí, s alt textom po slovensky. */
function withAlts(pins: CaseStudy['solution']['pins'], alts: string[]) {
  return pins?.map((pin, i) => ({ ...pin, alt: alts[i] ?? pin.alt }));
}

export const skCaseStudies: Record<string, CaseStudy> = {
  'pinterest-ads-wedding-dresses': {
    ...wed,
    metaTitle: 'Pinterest Ads prípadová štúdia: 17 000 návštev | Koshman Ecom',
    metaDescription:
      'Ako Pinterest Ads priniesli B2B výrobcovi svadobných šiat 17 000 návštev webu a 1,1 mil. zobrazení mesačne vo Francúzsku. Stratégia, výsledky, závery.',
    keywords:
      'reklama na Pintereste, Pinterest Ads prípadová štúdia, nastavenie Pinterest Ads, Pinterest reklama pre B2B, reklama svadobných šiat, Pinterest reklama Francúzsko, agentúra Pinterest Ads',
    breadcrumb: 'Pinterest Ads pre svadobné šaty',
    h1: 'Prípadová štúdia Pinterest Ads: 17 000 neviest mesačne pre B2B výrobcu svadobných šiat',
    lead: 'Ako reklama na Pintereste vytvorila dopyt medzi francúzskymi nevestami a priviedla ich do partnerských salónov značky.',
    tags: ['B2B', 'Svadobné šaty', 'Francúzsko'],
    summary:
      'Za 5 mesiacov sa reklama na Pintereste stala pre európskeho výrobcu svadobných šiat samostatným zdrojom dopytu vo Francúzsku. Kanál mesačne prináša 17 000 návštev webu a 1,1 mil. zobrazení — a všetky tieto výsledky pochádzajú výhradne z Pinterest Ads.',
    facts: [
      ['Klient', 'B2B výrobca svadobných šiat'],
      ['Trh', 'Francúzsko'],
      ['Kanál', 'Pinterest Ads'],
      ['Obdobie', 'jún – október 2026, spolupráca pokračuje'],
    ],
    cover: { ...wed.cover, alt: 'Reklamný pin svadobných šiat v Pinterest Ads, Francúzsko' },
    og: {
      ...wed.og,
      title: '17 000 návštev mesačne',
      subtitle: 'B2B značka svadobných šiat · Francúzsko · 1,1 mil. zobrazení mesačne',
    },
    metrics: [
      ['17 000', 'návštev webu mesačne'],
      ['1,1 mil.', 'zobrazení medzi francúzskymi nevestami'],
      ['×2,2', 'rast návštevnosti za 5 mesiacov'],
    ],
    task: {
      title: 'Ako propagovať B2B značku, ktorá predáva cez salóny',
      paragraphs: [
        'Klient predáva svadobné šaty cez sieť partnerských salónov. Nevesta si šaty vyberá na internete, no skúša a kupuje ich v salóne, takže online predaj neexistuje.',
        'Pred spustením Pinterest nebol reklamným kanálom značky vo Francúzsku. Bolo treba vytvoriť dopyt medzi francúzskymi nevestami a priviesť ich do partnerských salónov. Čím viac neviest príde do salónu kvôli šatám značky, tým viac modelov si salóny od výrobcu objednajú.',
      ],
    },
    solution: {
      ...wed.solution,
      title: 'Stratégia Pinterest Ads pre offline predaj',
      steps: {
        title: 'Lievik pre predaj cez salóny',
        text: 'Nevesta uvidí pin so šatami, otvorí stránku modelu, potom prejde na „Kde kúpiť“ a nájde salón vo svojom meste. Reklamu optimalizujeme podľa toho, koľko ľudí sa dostane k vyhľadávaniu salónu, nie podľa klikov.',
        items: [
          ['Pin', 'nevesta vidí šaty vo feede alebo vo vyhľadávaní', 'pin'],
          ['Stránka šiat', 'fotky a detaily modelu', 'dress'],
          ['„Kde kúpiť“', 'vyhľadanie salónu podľa mesta', 'search'],
          ['Partnerský salón', 'skúška a nákup', 'store'],
        ],
        badge: 'cieľ optimalizácie',
      },
      cards: [
        [
          'Komplexná analytika',
          'Nastavili sme sledovanie akcií na webe a prepojili dáta z Pinterestu s Google Analytics. Vidíme, ktoré konkrétne šaty privádzajú nevesty na skúšku, a rozpočet sa rozdeľuje podľa skutočných výsledkov.',
        ],
        [
          'Priebežné testovanie kreatív',
          'Za 5 mesiacov sme otestovali viac ako 50 modelov šiat v rôznych formátoch: fotky, videá aj karusely. Slabé reklamy nahrádzame a rozpočet presúvame na tie, ktoré privádzajú nevesty do salónov.',
        ],
      ],
      pins: withAlts(wed.solution.pins, [
        'Reklamný pin svadobných šiat v Pinterest Ads, Francúzsko: nadýchané čipkované šaty',
        'Saténové svadobné šaty s čipkovými rukávmi — kreatíva pre Pinterest Ads',
        'Svadobné šaty s dlhou pelerínou — kreatíva pre Pinterest Ads',
        'Nevesta v šatách s odhaleným chrbtom so ženíchom — kreatíva pre Pinterest Ads',
        'Puzdrové svadobné šaty s korzetom a výšivkou — kreatíva pre Pinterest Ads',
      ]),
      pinsCaption: 'Kreatívy pre Pinterest Ads: modely šiat značky',
      pinsNote: '5 z viac ako 50 otestovaných modelov',
    },
    campaigns: {
      title: 'Tri typy kampaní v Pinterest Ads',
      items: [
        ['Traffic', 'Oslovenie nových neviest podľa záujmov a vyhľadávaní vo francúzštine.'],
        ['Remarketing', 'Návrat tých, ktorí si už prezerali šaty na webe.'],
        ['Actalike', 'Podobné publiká vytvorené z ľudí, ktorí už hľadali salón.'],
      ],
    },
    results: {
      title: 'Výsledky reklamy na Pintereste',
      items: [
        ['17 000 návštev webu', 'mesačne.'],
        ['1,1 mil. zobrazení mesačne', 'medzi cieľovým publikom vo Francúzsku.'],
        ['Cena za klik', 'výrazne nižšia, ako bola prognóza.'],
        ['CTR 1,6 %', 'pri priemere Pinterestu 0,5 – 2 %.'],
        ['Stabilný denný prílev', 'neviest na stránku vyhľadávania partnerských salónov.'],
      ],
      chart: {
        ...wed.results.chart,
        label: 'Návštevy webu z Pinterestu po mesiacoch',
        alt: 'Výsledky kampane Pinterest Ads: 17 000 návštev webu mesačne',
        months: [
          ['Jún', 7600, 'Jún'],
          ['Júl', 12400, 'Júl'],
          ['August', 12800, 'Aug'],
          ['September', 16500, 'Sep'],
          ['Október', 17000, 'Okt'],
        ],
        table: ['Mesiac', 'Návštevy webu'],
      },
    },
    insights: {
      title: 'Čo sme zistili',
      intro: 'Tri postrehy z 5 mesiacov kampaní, ktoré teraz uplatňujeme v každom projekte Pinterest Ads.',
      items: [
        [
          'Vysoké CTR neznamená predaj',
          'Najklikateľnejšie reklamy často najmenej privádzali nevesty do salónu. Reklamy s priemerným CTR konvertovali niekoľkonásobne lepšie ako lídri v klikoch. Preto reklamu hodnotíme podľa konverzií, nie klikov.',
          'click',
        ],
        ['Karusely a videá fungujú lepšie ako jedna fotka', 'Najviac je to vidieť na začiatku kampaní.', 'video'],
        [
          'Rozhodnutia robíme na základe dát',
          'Každá reklama dostane dostatok klikov, kým urobíme záver. Tak nevyradíme model, ktorý sa len pomaly rozbiehal.',
          'data',
        ],
      ],
    },
    conclusion: {
      title: 'Záver',
      text: 'Reklama na Pintereste nefunguje len pre e-shopy. Pre B2B značku, ktorá predáva cez salóny alebo distribútorov, vytvára dopyt u koncových zákazníkov. Tento dopyt sa mení na objednávky od partnerov.',
      ctaLabel: 'Prebrať Pinterest Ads',
    },
    faqTitle: 'Časté otázky o reklame na Pintereste',
    faq: [
      [
        'Hodí sa Pinterest Ads pre B2B firmy?',
        'Áno, ak je produkt vizuálny a jeho koncový zákazník hľadá inšpiráciu na Pintereste. Reklama vytvára dopyt u koncových zákazníkov a ten sa mení na objednávky od partnerov: salónov, obchodov a distribútorov.',
      ],
      [
        'Dá sa robiť reklama na Pintereste bez e-shopu?',
        'Áno. V tomto prípade web nemá online platbu. Konverziou je prechod na stránku vyhľadávania salónu a práve na ňu sa reklama optimalizuje.',
      ],
      [
        'Koľko stojí reklama na Pintereste?',
        'Cena za klik závisí od segmentu, krajiny, publika a kvality kreatív. V tomto projekte bola výrazne nižšia ako pôvodná prognóza. Výpočet pre váš biznis pripravíme pred spustením.',
      ],
      [
        'Za aký čas prinesie Pinterest Ads výsledky?',
        'Prvé stabilné dáta sú k dispozícii už v prvom mesiaci. Za 5 mesiacov optimalizácie vzrástla návštevnosť 2,2-násobne.',
      ],
      [
        'Ktoré formáty reklamy na Pintereste fungujú najlepšie?',
        'V móde fungovali na začiatku najlepšie karusely a videá. Konečnú voľbu formátu vždy potvrdzujeme testami.',
      ],
      [
        'Pre ktoré trhy sa reklama na Pintereste hodí?',
        'Pinterest aktívne používajú vo Francúzsku, Nemecku, Taliansku, Poľsku a v ďalších krajinách Európy. Kampane spúšťame v jazyku každého trhu — aj pre Slovensko a Česko.',
      ],
    ],
    leadTitle: 'Chcete získať dopyt z Pinterestu pre svoju značku?',
    leadText: 'Nastavíme Pinterest Ads podľa vášho modelu predaja: e-shop, B2B alebo predaj cez partnerov.',
  },

  'pinterest-ads-home-decor': {
    ...decor,
    metaTitle: 'Pinterest Ads pre bytové doplnky: ROAS 4,1x | Koshman Ecom',
    metaDescription:
      'Ako reklama na Pintereste priniesla e-shopu s bytovými doplnkami za 6 mesiacov 1 050 objednávok a ROAS až 4,1x v Nemecku a Poľsku.',
    keywords:
      'reklama na Pintereste pre e-shop, Pinterest Ads prípadová štúdia, reklama bytových doplnkov, Pinterest reklama Nemecko, Pinterest reklama Poľsko, ROAS Pinterest',
    breadcrumb: 'Pinterest Ads pre e-shop s dekoráciami',
    h1: 'Prípadová štúdia Pinterest Ads: 1 050 objednávok a ROAS 4,1x pre e-shop s dekoráciami',
    lead: 'Ako sa reklama na Pintereste stala samostatným predajným kanálom pre značku škandinávskych dekorácií v Nemecku a Poľsku.',
    tags: ['E-commerce', 'Bytové doplnky', 'Nemecko', 'Poľsko'],
    summary:
      'Za 6 mesiacov sa reklama na Pintereste stala pre značku moderných bytových doplnkov samostatným predajným kanálom v Nemecku a Poľsku. Priniesla 1 050 objednávok a návratnosť vzrástla z 1,6x na začiatku na 4,1x.',
    facts: [
      ['Klient', 'Moderné bytové doplnky v škandinávskom minimalistickom štýle'],
      ['Trhy', 'Nemecko, Poľsko'],
      ['Kanál', 'Pinterest Ads'],
      ['Obdobie', '6 mesiacov'],
    ],
    cover: { ...decor.cover, alt: 'Reklamné piny e-shopu s dekoráciami v Pinterest Ads pre Nemecko a Poľsko' },
    og: {
      ...decor.og,
      title: '1 050 objednávok a ROAS 4,1x',
      subtitle: 'E-shop s dekoráciami · Nemecko a Poľsko · 6 mesiacov',
    },
    metrics: [
      ['1 050', 'objednávok z Pinterestu'],
      ['4,1x', 'ROAS v 4. – 6. mesiaci'],
      ['78 000', 'návštev webu'],
    ],
    task: {
      title: 'Ako urobiť z Pinterestu ziskový kanál na dvoch trhoch naraz',
      paragraphs: [
        'Značka predáva textil, organizéry a estetické osvetlenie v škandinávskom štýle. Zákazníci presne takéhoto tovaru hľadajú inšpiráciu na zariadenie interiéru na Pintereste ešte predtým, ako sú pripravení nakupovať.',
        'Bolo treba spustiť Pinterest ako ziskový predajný kanál naraz na dvoch trhoch s veľmi rozdielnou kúpnou silou aj cenou reklamy.',
      ],
    },
    solution: {
      ...decor.solution,
      title: 'Stratégia Pinterest Ads pre dva trhy',
      cards: [
        [
          'Dva trhy, dve úlohy',
          'Nemecko sa stalo trhom s vyššou priemernou objednávkou a Poľsko trhom objemu objednávok pri nižšej cene reklamy. Rozpočet sme rozdelili tak, aby sa oba trhy vracali rovnako.',
        ],
        [
          'Kreatívy, ktoré vyzerajú ako inšpirácia',
          'Produkty sme ukazovali v interiéri, nie na bielom pozadí. Používali sme vertikálne piny a kompozície viacerých produktov v jednej miestnosti.',
        ],
      ],
      steps: {
        title: 'Postupné škálovanie',
        items: [
          ['1. mesiac — testy', 'Kreatívy, kombinácie a publiká.', 'test'],
          ['2. mesiac — optimalizácia', 'Vypli sme slabé piny a spustili retargeting na tých, ktorí si piny uložili.', 'tune'],
          ['3. mesiac — stabilizácia', 'Pridali sme dynamický retargeting na opustené košíky.', 'stable'],
          ['4. – 6. mesiac — škálovanie', 'Škálovali sme kampane, ktoré sa vracajú.', 'scale'],
        ],
        badge: 'ROAS 4,1x',
      },
      pins: withAlts(decor.solution.pins, [
        'Reklamný pin pre Nemecko: „Wohnkultur zum Verlieben“, zľava 15 % na sety dekorácií',
        'Reklamný pin pre Poľsko: zľava 15 % na sety bytových dekorácií',
        'Reklamný pin v štýle japandi „Shop the look“: dekorácie do obývačky',
        'Reklamný pin pre Nemecko: „Japandi Deko-Set“, nová sezóna v obývačke',
        'Reklamný pin pre Poľsko: „Stwórz ten klimat w swoim domu“, set dekorácií do spálne',
      ]),
      pinsCaption: 'Reklamné piny pre Nemecko a Poľsko: produkty v interiéri namiesto bieleho pozadia',
    },
    results: {
      title: 'Výsledky za 6 mesiacov',
      items: [
        ['1 050 objednávok z Pinterestu:', '480 v Nemecku a 570 v Poľsku.'],
        ['ROAS ≈3,3x za celé obdobie,', 'rovnaký na oboch trhoch.'],
        ['Viac ako 2,8 mil. zobrazení', 'a 78 000 návštev webu.'],
        ['22 500 uložení pinov:', 'budúci zákazníci, ktorí sa k produktom vrátia neskôr.'],
        ['CTR 2,6 %', 'pri priemere Pinterestu 0,5 – 2 %.'],
      ],
      chart: {
        ...decor.results.chart,
        label: 'ROAS podľa etáp kampane',
        alt: 'Rast ROAS v Pinterest Ads: z 1,6x v prvom mesiaci na 4,1x v 4. – 6. mesiaci',
        months: [
          ['1. mesiac — testy', 1.6, 'M1'],
          ['2. mesiac — optimalizácia', 2.3, 'M2'],
          ['3. mesiac — stabilizácia', 3.2, 'M3'],
          ['4. – 6. mesiac — škálovanie', 4.1, 'M4–6'],
        ],
        table: ['Mesiac', 'ROAS'],
      },
    },
    insights: {
      title: 'Čo sme zistili',
      intro: 'Tri postrehy zo 6 mesiacov kampaní, ktoré teraz uplatňujeme v každom projekte Pinterest Ads.',
      items: [
        [
          'Pinterest predáva s oneskorením',
          'Časť zákazníkov objednávala podľa pinov, ktoré si uložili pred 2 – 3 mesiacmi. Preto ROAS rástol každý mesiac, nielen na začiatku.',
          'clock',
        ],
        [
          'Uloženia sú samostatné publikum pre predaj',
          'Retargeting na tých, ktorí si uložili piny, sa stal jedným z hlavných ťahúňov návratnosti.',
          'bookmark',
        ],
        [
          'Rôzne trhy, rôzna ekonomika',
          'Nemecko prináša vyššiu objednávku, Poľsko objem a lacnejšie objednávky. Spolu sa vracajú stabilnejšie ako každý trh zvlášť.',
          'globe',
        ],
      ],
    },
    conclusion: {
      title: 'Záver',
      text: 'Pre značku dekorácií nie je Pinterest len inšpirácia, ale plnohodnotný predajný kanál. Kľúčom k výsledku je trpezlivosť v prvých 2 – 3 mesiacoch a retargeting na uloženia, pretože práve vtedy začne fungovať odložený dopyt.',
      ctaLabel: 'Získať audit e-shopu',
    },
    faqTitle: 'Časté otázky o Pinterest Ads pre e-shopy',
    faq: [
      [
        'Oplatí sa reklama na Pintereste pre e-shop s dekoráciami?',
        'Áno. V tomto prípade vzrástol ROAS z 1,6x v prvom mesiaci na 4,1x v 4. – 6. mesiaci.',
      ],
      [
        'Ako dlho trvá, kým Pinterest Ads začne prinášať zisk?',
        'Zvyčajne 2 – 3 mesiace. Prvý mesiac ide na testy a časť zákazníkov nakúpi až niekoľko týždňov po uložení pinu.',
      ],
      [
        'Čo je lepšie pre Pinterest Ads: Nemecko alebo Poľsko?',
        'V Nemecku je vyššia priemerná objednávka, v Poľsku lacnejšia reklama a viac objednávok. Kombinácia oboch trhov priniesla rovnakú návratnosť na oboch.',
      ],
      [
        'Čo je retargeting na uloženia na Pintereste?',
        'Je to zobrazovanie reklamy ľuďom, ktorí si už váš pin uložili na svoju nástenku. Už majú záujem, preto nakupujú častejšie ako nové publikum.',
      ],
      [
        'Aké kreatívy fungujú pre dekorácie?',
        'Produkt v interiéri, vertikálne piny 2:3 a kompozície viacerých produktov v jednej miestnosti.',
      ],
      [
        'Spustíte Pinterest Ads aj pre slovenský alebo český e-shop?',
        'Áno. Kampane pripravujeme v jazyku každého trhu vrátane slovenčiny a češtiny. Pri expanzii do Nemecka či Poľska rozdelíme rozpočet podľa ekonomiky každého trhu, ako v tomto prípade.',
      ],
    ],
    leadTitle: 'Získajte audit Pinterest Ads pre váš e-shop',
    leadText: 'Pozrieme sa na váš sortiment a trhy a ukážeme, ako sa Pinterest môže stať samostatným predajným kanálom.',
  },
};
