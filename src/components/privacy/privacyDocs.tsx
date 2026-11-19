import React from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { CONTACT_EMAIL, fop, fopDetailsSuffix, sro } from '@/lib/legal-entities';
import { CONSENT_KEY, GEO_KEY } from '@/lib/consent';

/**
 * Тексти політики конфіденційності для кожної мови.
 *
 * Українська версія — від імені ФОП, словацька й англійська — від імені
 * Koshman s. r. o., тож це окремі документи, а не переклади одного тексту.
 * Тексти затверджені — не перефразовувати. Реквізити беруться з
 * `lib/legal-entities`, ключі згоди — з `lib/consent`.
 */

export type Block =
  | { p: React.ReactNode }
  | { ul: React.ReactNode[] }
  | { table: { head: string[]; rows: React.ReactNode[][] } };

export type PrivacySection = { id: string; title: string; blocks: Block[] };

export type PrivacyDoc = { title: string; updated: string; sections: PrivacySection[] };

const linkClass = 'text-brand-orange underline underline-offset-2';

const Mail = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
    {CONTACT_EMAIL}
  </a>
);

/** Посилання на сторінку іншої мови — без LocaleLink, щоб не додавався префікс. */
const SiteLink = ({ path }: { path: string }) => (
  <Link href={path} className={linkClass}>
    koshmanecom.com{path}
  </Link>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="whitespace-nowrap font-mono text-[0.9em]">{children}</code>
);

/* ------------------------------------------------------------------ */
/* Таблиця cookies                                                     */
/* ------------------------------------------------------------------ */

type CookieRow = [React.ReactNode, string, string, string, string];

function cookieRows(locale: Locale): CookieRow[] {
  if (locale === 'sk') {
    return [
      [<>localStorage, kľúč <Code>{CONSENT_KEY}</Code></>, 'koshmanecom.com', 'Nevyhnutné', 'Pamätá si vašu voľbu v cookie lište', 'Bez obmedzenia (do vymazania údajov prehliadača)'],
      [<Code key="ga">_ga</Code>, 'Google Analytics', 'Analytické', 'Rozlišuje návštevníkov', '2 roky'],
      [<Code key="gas">_ga_LEC5E52YML</Code>, 'Google Analytics', 'Analytické', 'Uchováva stav relácie', '2 roky'],
      [<Code key="clck">_clck</Code>, 'Microsoft Clarity', 'Analytické', 'Rozlišuje návštevníkov', '1 rok'],
      [<Code key="clsk">_clsk</Code>, 'Microsoft Clarity', 'Analytické', 'Spája zobrazenia stránok do jedného záznamu relácie', '1 deň'],
      [<Code key="clid">CLID, MUID</Code>, 'Microsoft Clarity', 'Analytické', 'Identifikátor návštevníka pre Clarity', '1 rok'],
      [<Code key="gclau">_gcl_au</Code>, 'Google Ads', 'Reklamné', 'Meria konverzie z reklám', '90 dní'],
      [<Code key="gclaw">_gcl_aw</Code>, 'Google Ads', 'Reklamné', 'Uchováva identifikátor kliknutia na reklamu', '90 dní'],
    ];
  }
  if (locale === 'en') {
    return [
      [<>localStorage, key <Code>{CONSENT_KEY}</Code></>, 'koshmanecom.com', 'Strictly necessary', 'Remembers your choice in the cookie banner', 'No expiry (until you clear your browser data)'],
      [<Code key="ga">_ga</Code>, 'Google Analytics', 'Analytics', 'Distinguishes visitors', '2 years'],
      [<Code key="gas">_ga_LEC5E52YML</Code>, 'Google Analytics', 'Analytics', 'Keeps the session state', '2 years'],
      [<Code key="clck">_clck</Code>, 'Microsoft Clarity', 'Analytics', 'Distinguishes visitors', '1 year'],
      [<Code key="clsk">_clsk</Code>, 'Microsoft Clarity', 'Analytics', 'Combines page views into a single session recording', '1 day'],
      [<Code key="clid">CLID, MUID</Code>, 'Microsoft Clarity', 'Analytics', 'Visitor identifier for Clarity', '1 year'],
      [<Code key="gclau">_gcl_au</Code>, 'Google Ads', 'Advertising', 'Measures conversions from ads', '90 days'],
      [<Code key="gclaw">_gcl_aw</Code>, 'Google Ads', 'Advertising', 'Stores the ad click identifier', '90 days'],
    ];
  }
  return [
    [<>localStorage, ключ <Code>{CONSENT_KEY}</Code></>, 'koshmanecom.com', 'Необхідні', 'Запамʼятовує ваш вибір у cookie-банері', 'Без обмеження строку (до очищення даних браузера)'],
    // Країну визначаємо лише на українській версії — тому рядок є тільки тут
    [<>sessionStorage, ключ <Code>{GEO_KEY}</Code></>, 'koshmanecom.com', 'Необхідні', 'Запамʼятовує країну, визначену за IP-адресою, щоб не визначати її на кожній сторінці', 'До закриття вкладки'],
    [<Code key="ga">_ga</Code>, 'Google Analytics', 'Аналітичні', 'Розрізняє відвідувачів', '2 роки'],
    [<Code key="gas">_ga_LEC5E52YML</Code>, 'Google Analytics', 'Аналітичні', 'Зберігає стан сесії', '2 роки'],
    [<Code key="clck">_clck</Code>, 'Microsoft Clarity', 'Аналітичні', 'Розрізняє відвідувачів', '1 рік'],
    [<Code key="clsk">_clsk</Code>, 'Microsoft Clarity', 'Аналітичні', 'Обʼєднує перегляди сторінок в один запис сеансу', '1 день'],
    [<Code key="clid">CLID, MUID</Code>, 'Microsoft Clarity', 'Аналітичні', 'Ідентифікатор відвідувача для Clarity', '1 рік'],
    [<Code key="gclau">_gcl_au</Code>, 'Google Ads', 'Рекламні', 'Вимірює конверсії з реклами', '90 днів'],
    [<Code key="gclaw">_gcl_aw</Code>, 'Google Ads', 'Рекламні', 'Зберігає ідентифікатор кліку по рекламі', '90 днів'],
  ];
}

const COOKIE_HEAD: Record<Locale, string[]> = {
  uk: ['Cookie', 'Хто ставить', 'Категорія', 'Навіщо', 'Строк'],
  sk: ['Cookie', 'Kto ju nastavuje', 'Kategória', 'Účel', 'Platnosť'],
  en: ['Cookie', 'Set by', 'Category', 'Purpose', 'Duration'],
};

const cookieTable = (locale: Locale): Block => ({
  table: { head: COOKIE_HEAD[locale], rows: cookieRows(locale) },
});

/* ------------------------------------------------------------------ */
/* UA — ФОП                                                            */
/* ------------------------------------------------------------------ */

const uk: PrivacyDoc = {
  title: 'Політика конфіденційності',
  updated: 'Оновлено 19 листопада 2026',
  sections: [
    {
      id: 'who',
      title: 'Хто ми',
      blocks: [
        {
          p: (
            <>
              Сайт koshmanecom.com (українська версія) та послуги Koshman Ecom в Україні надає фізична
              особа-підприємець {fop.name}
              {fopDetailsSuffix()} (далі — «ми»). Ми є володільцем персональних даних, які ви надаєте через цей
              сайт.
            </>
          ),
        },
        { p: <>Контакт з питань даних: <Mail />.</> },
        {
          p: (
            <>
              Для клієнтів з ЄС та інших країн послуги надає {sro.name} (Словаччина). Її політика розміщена на{' '}
              <SiteLink path="/sk/privacy" /> та <SiteLink path="/en/privacy" />.
            </>
          ),
        },
      ],
    },
    {
      id: 'data',
      title: 'Які дані ми отримуємо',
      blocks: [
        {
          ul: [
            'З форм і месенджерів: імʼя, телефон або нік у Telegram, email, текст заявки, обрані послуги.',
            'Під час співпраці: дані контактних осіб клієнта, реквізити для договору та рахунків.',
            'Автоматично: IP-адреса, тип браузера і пристрою, переглянуті сторінки, джерело переходу. Для відвідувачів з ЄС та інших країн аналітичні та рекламні cookies вмикаються лише після згоди в cookie-банері. Для відвідувачів, які перебувають в Україні, вони працюють одразу (деталі в розділі про cookies).',
          ],
        },
      ],
    },
    {
      id: 'purpose',
      title: 'Навіщо і на якій підставі',
      blocks: [
        {
          table: {
            head: ['Мета', 'Підстава'],
            rows: [
              ['Відповісти на заявку, підготувати пропозицію', 'Дії до укладення договору на ваш запит'],
              ['Виконати договір, виставити рахунки', 'Виконання договору, вимоги податкового законодавства'],
              [
                'Аналізувати відвідуваність і ефективність реклами',
                'Для відвідувачів з України — наш законний інтерес у покращенні сайту; для решти — згода в cookie-банері',
              ],
              ['Захистити сайт від зловживань', 'Наш законний інтерес'],
              ['Надсилати новини та матеріали', 'Окрема згода, яку можна відкликати будь-коли'],
            ],
          },
        },
      ],
    },
    {
      id: 'share',
      title: 'Кому ми передаємо дані',
      blocks: [
        { p: 'Ми не продаємо дані. Доступ мають лише сервіси, які допомагають нам працювати:' },
        {
          ul: [
            'Google Ireland Ltd / Google LLC — Google Analytics 4 та Google Ads (статистика і вимірювання реклами);',
            'Microsoft Ireland Operations Ltd — Microsoft Clarity (аналітика поведінки на сайті);',
            'Firebase Hosting (Google) — робота сайту;',
            'Telegram (бот для заявок) і Google Cloud Firestore — зберігання заявок;',
            'Zoho Mail — листування;',
            'Telegram, WhatsApp — якщо ви пишете нам там;',
            `${sro.name} — якщо ваш запит стосується послуг для ЄС чи інших країн.`,
          ],
        },
        {
          p: 'Частина цих сервісів зберігає дані за межами України, у ЄС та США. Державним органам ми передаємо дані лише у випадках, передбачених законом.',
        },
      ],
    },
    {
      id: 'storage',
      title: 'Скільки зберігаємо',
      blocks: [
        {
          ul: [
            'Заявки, які не стали договором: до 3 років після останнього контакту.',
            'Дані клієнтів: строк договору, потім стільки, скільки вимагає податкове законодавство для первинних документів.',
            'Дані Google Analytics: 14 місяців. Строки cookies вказані в розділі про cookies.',
          ],
        },
      ],
    },
    {
      id: 'rights',
      title: 'Ваші права',
      blocks: [
        { p: 'За статтею 8 Закону України «Про захист персональних даних» ви можете:' },
        {
          ul: [
            'дізнатися, які дані ми маємо, де вони зберігаються і кому передаються;',
            'вимагати виправити або видалити дані;',
            'заперечити проти обробки та відкликати згоду;',
            'подати скаргу Уповноваженому Верховної Ради України з прав людини або до суду.',
          ],
        },
        { p: <>Напишіть на <Mail />. Ми відповідаємо протягом 30 днів.</> },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      blocks: [
        {
          p: 'Необхідні cookies працюють завжди. Аналітичні та рекламні для відвідувачів з ЄС та інших країн — лише після натискання «Прийняти всі». Для відвідувачів, які перебувають в Україні (ми визначаємо це за IP-адресою), вони працюють одразу, без банера. Відмовитися від них або змінити вибір можна будь-коли через «Налаштування cookie» у футері.',
        },
        cookieTable('uk'),
      ],
    },
    {
      id: 'changes',
      title: 'Зміни',
      blocks: [{ p: 'Ми можемо оновлювати політику. Дата останньої редакції вказана вгорі.' }],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* SK — Koshman s. r. o.                                               */
/* ------------------------------------------------------------------ */

const sk: PrivacyDoc = {
  title: 'Zásady ochrany osobných údajov',
  updated: 'Aktualizované 19. novembra 2026',
  sections: [
    {
      id: 'who',
      title: 'Prevádzkovateľ',
      blocks: [
        {
          p: (
            <>
              Prevádzkovateľom osobných údajov je spoločnosť {sro.name}, so sídlom {sro.street}, {sro.postalCode}{' '}
              {sro.cityFull}, IČO: {sro.companyId}, zapísaná v Obchodnom registri Mestského súdu Bratislava III,
              oddiel {sro.registerSection}, vložka č. {sro.registerFile} (ďalej „my“). Prevádzkujeme značku Koshman
              Ecom a web koshmanecom.com v slovenskej a anglickej verzii.
            </>
          ),
        },
        {
          p: (
            <>
              Kontakt vo veciach ochrany údajov: <Mail />. Zodpovednú osobu (DPO) sme neurčili, pretože nám to GDPR
              neukladá.
            </>
          ),
        },
      ],
    },
    {
      id: 'data',
      title: 'Aké údaje spracúvame',
      blocks: [
        {
          ul: [
            'Z formulárov a správ: meno, telefón alebo Telegram, e-mail, text dopytu, vybrané služby.',
            'Pri spolupráci: údaje kontaktných osôb klienta, fakturačné údaje.',
            'Automaticky: IP adresa, typ prehliadača a zariadenia, zobrazené stránky, zdroj návštevy. Analytické a reklamné cookies sa spúšťajú len s vaším súhlasom.',
          ],
        },
      ],
    },
    {
      id: 'purpose',
      title: 'Účely a právne základy',
      blocks: [
        {
          table: {
            head: ['Účel', 'Právny základ (GDPR)', 'Doba uchovania'],
            rows: [
              ['Odpoveď na dopyt, príprava ponuky', 'čl. 6 ods. 1 písm. b) – opatrenia pred uzavretím zmluvy', '3 roky od posledného kontaktu'],
              ['Plnenie zmluvy s klientom', 'čl. 6 ods. 1 písm. b)', 'počas trvania zmluvy'],
              ['Účtovníctvo a dane', 'čl. 6 ods. 1 písm. c) – zákonná povinnosť', '10 rokov (zákon o účtovníctve)'],
              ['Analýza návštevnosti a meranie reklám', 'čl. 6 ods. 1 písm. a) – súhlas', 'podľa tabuľky cookies, údaje GA4 14 mesiacov'],
              ['Bezpečnosť webu', 'čl. 6 ods. 1 písm. f) – oprávnený záujem', 'do 30 dní'],
              ['Novinky a materiály e-mailom', 'čl. 6 ods. 1 písm. a) – súhlas', 'do odvolania súhlasu'],
            ],
          },
        },
        {
          p: 'Poskytnutie údajov vo formulári je dobrovoľné, bez nich však nemôžeme na dopyt odpovedať. Automatizované rozhodovanie ani profilovanie s právnymi účinkami nevykonávame.',
        },
      ],
    },
    {
      id: 'share',
      title: 'Príjemcovia',
      blocks: [
        { p: 'Údaje nepredávame. Sprístupníme ich len sprostredkovateľom, ktorí pre nás pracujú na základe zmluvy:' },
        {
          ul: [
            'Google Ireland Ltd. – Google Analytics 4, Google Ads;',
            'Microsoft Ireland Operations Ltd. – Microsoft Clarity;',
            'Firebase Hosting (Google) – prevádzka webu;',
            'Telegram (bot na dopyty) a Google Cloud Firestore – evidencia dopytov;',
            'Zoho Mail – komunikácia;',
            'Telegram, WhatsApp – ak nás kontaktujete cez tieto aplikácie;',
            'účtovník a orgány verejnej moci, ak to vyžaduje zákon.',
          ],
        },
      ],
    },
    {
      id: 'transfers',
      title: 'Prenos mimo EÚ',
      blocks: [
        {
          ul: ['USA: Google a Microsoft sú certifikované v rámci EU–US Data Privacy Framework.'],
        },
      ],
    },
    {
      id: 'rights',
      title: 'Vaše práva',
      blocks: [
        {
          p: 'Máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania a prenosnosť. Môžete namietať proti spracúvaniu na základe oprávneného záujmu. Súhlas môžete kedykoľvek odvolať, napríklad cez „Nastavenia cookies“ v päte stránky.',
        },
        { p: <>Napíšte nám na <Mail />. Odpovieme do jedného mesiaca.</> },
        {
          p: (
            <>
              Máte právo podať sťažnosť na Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07
              Bratislava 27,{' '}
              <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noreferrer" className={linkClass}>
                www.dataprotection.gov.sk
              </a>
              .
            </>
          ),
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      blocks: [
        {
          p: 'Nevyhnutné cookies používame vždy. Analytické a reklamné cookies len s vaším súhlasom podľa § 109 zákona č. 452/2021 Z. z. o elektronických komunikáciách.',
        },
        cookieTable('sk'),
      ],
    },
    {
      id: 'changes',
      title: 'Zmeny',
      blocks: [{ p: 'Zásady môžeme aktualizovať. Dátum poslednej zmeny je uvedený hore.' }],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* EN — Koshman s. r. o.                                               */
/* ------------------------------------------------------------------ */

const en: PrivacyDoc = {
  title: 'Privacy Policy',
  updated: 'Updated 19 November 2026',
  sections: [
    {
      id: 'who',
      title: 'Who we are',
      blocks: [
        {
          p: (
            <>
              The controller of your personal data is {sro.name}, {sro.street}, {sro.postalCode} {sro.city}, Slovakia,
              Company ID (IČO) {sro.companyId}, registered in the Commercial Register of the Bratislava III Municipal
              Court, Section {sro.registerSection}, File No. {sro.registerFile} (“we”). We operate the Koshman Ecom
              brand and the Slovak and English versions of koshmanecom.com.
            </>
          ),
        },
        {
          p: (
            <>
              Data protection contact: <Mail />. We have not appointed a Data Protection Officer because the GDPR
              does not require it for us.
            </>
          ),
        },
      ],
    },
    {
      id: 'data',
      title: 'What data we process',
      blocks: [
        {
          ul: [
            'From forms and messages: name, phone or Telegram handle, email, the text of your request, selected services.',
            'During cooperation: details of the client’s contact persons, billing details.',
            'Automatically: IP address, browser and device type, pages viewed, referral source. Analytics and advertising cookies run only with your consent.',
          ],
        },
      ],
    },
    {
      id: 'purpose',
      title: 'Purposes and legal bases',
      blocks: [
        {
          table: {
            head: ['Purpose', 'Legal basis (GDPR)', 'Retention'],
            rows: [
              ['Replying to your request, preparing an offer', 'Art. 6(1)(b) – steps prior to a contract', '3 years after last contact'],
              ['Performing a contract with a client', 'Art. 6(1)(b)', 'for the term of the contract'],
              ['Accounting and tax', 'Art. 6(1)(c) – legal obligation', '10 years (Slovak Accounting Act)'],
              ['Traffic analytics and ad measurement', 'Art. 6(1)(a) – consent', 'see cookie table; GA4 data 14 months'],
              ['Website security', 'Art. 6(1)(f) – legitimate interest', 'up to 30 days'],
              ['News and materials by email', 'Art. 6(1)(a) – consent', 'until consent is withdrawn'],
            ],
          },
        },
        {
          p: 'Providing data in the form is voluntary, but we cannot reply without it. We do not carry out automated decision-making or profiling with legal effects.',
        },
      ],
    },
    {
      id: 'share',
      title: 'Recipients',
      blocks: [
        { p: 'We do not sell your data. We share it only with processors working for us under contract:' },
        {
          ul: [
            'Google Ireland Ltd. – Google Analytics 4, Google Ads;',
            'Microsoft Ireland Operations Ltd. – Microsoft Clarity;',
            'Firebase Hosting (Google) – running the website;',
            'Telegram (request bot) and Google Cloud Firestore – managing requests;',
            'Zoho Mail – communication;',
            'Telegram, WhatsApp – if you contact us there;',
            'our accountant and public authorities where the law requires it.',
          ],
        },
      ],
    },
    {
      id: 'transfers',
      title: 'Transfers outside the EU',
      blocks: [
        { ul: ['USA: Google and Microsoft are certified under the EU–US Data Privacy Framework.'] },
      ],
    },
    {
      id: 'rights',
      title: 'Your rights',
      blocks: [
        {
          p: 'You have the right to access, rectify and erase your data, to restrict processing and to data portability. You may object to processing based on legitimate interest. You can withdraw consent at any time, for example via “Cookie settings” in the footer.',
        },
        { p: <>Email <Mail />. We reply within one month.</> },
        {
          p: (
            <>
              You may lodge a complaint with the Office for Personal Data Protection of the Slovak Republic, Hraničná
              12, 820 07 Bratislava 27,{' '}
              <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noreferrer" className={linkClass}>
                www.dataprotection.gov.sk
              </a>
              , or with the authority in your EU country of residence.
            </>
          ),
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      blocks: [
        { p: 'We always use strictly necessary cookies. Analytics and advertising cookies are used only with your consent.' },
        cookieTable('en'),
      ],
    },
    {
      id: 'changes',
      title: 'Changes',
      blocks: [{ p: 'We may update this policy. The date of the latest version is shown at the top.' }],
    },
  ],
};

export const privacyDocs: Record<Locale, PrivacyDoc> = { uk, sk, en };
