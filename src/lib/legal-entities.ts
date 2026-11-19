/**
 * Реквізити осіб, які надають послуги під брендом Koshman Ecom.
 *
 * Єдине джерело для футера, сторінки контактів, політик конфіденційності
 * та умов використання:
 * - українська версія (`/`) — ФОП;
 * - словацька (`/sk`) і англійська (`/en`) — Koshman s. r. o.
 *
 * Порожнє поле означає «ще не заповнено»: фрагмент тексту з ним на сайті
 * не виводиться взагалі.
 */

/** Загальний контактний email сайту (футер, контакти, політики). */
export const CONTACT_EMAIL = 'hello@koshmanecom.com';

export const PHONE_UA = '+380 66 197 09 69';
export const PHONE_UA_RAW = '+380661970969';
export const PHONE_SK = '+421 952 208 617';
export const PHONE_SK_RAW = '+421952208617';

export const sro = {
  name: 'Koshman s. r. o.',
  street: 'Jarabinková 6B',
  postalCode: '821 09',
  city: 'Bratislava',
  /** Повна назва міста з частиною, як у реєстрі. */
  cityFull: 'Bratislava – mestská časť Ružinov',
  /** IČO */
  companyId: '57 727 872',
  /** DIČ */
  taxId: '2122902452',
  /** IČ DPH */
  vatId: 'SK2122902452',
  registerSk: 'Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 201247/B',
  /** Реєстраційні дані без назви реєстру, для перекладів. */
  registerSection: 'Sro',
  registerFile: '201247/B',
  office: 'Košice',
  email: CONTACT_EMAIL,
  phone: PHONE_SK,
  phoneRaw: PHONE_SK_RAW,
} as const;

export const fop = {
  name: 'Кошман Владислав Андрійович',
  nameLatin: 'Vladyslav Koshman',
  /** РНОКПП */
  taxId: '', // TODO: заповнити
  /** Адреса реєстрації ФОП */
  address: '', // TODO: заповнити
  email: CONTACT_EMAIL,
  phone: PHONE_UA,
  phoneRaw: PHONE_UA_RAW,
};

/** «, РНОКПП …, адреса: …» — лише ті частини, що заповнені в конфігу. */
export function fopDetailsSuffix(): string {
  return [fop.taxId && `, РНОКПП ${fop.taxId}`, fop.address && `, адреса: ${fop.address}`]
    .filter(Boolean)
    .join('');
}
