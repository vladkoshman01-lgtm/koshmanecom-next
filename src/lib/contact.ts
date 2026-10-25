/**
 * Єдина точка відправки заявок з усіх форм сайту.
 *
 * Cloud Function `contact` пересилає заявку в Telegram-бот. Раніше форми
 * стукали на /api/contact зі старого сайту — цієї функції вже не існувало,
 * і заявки мовчки губилися, бо fetch не кидає помилку на 404.
 */

const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
  'https://us-central1-koshman-ecom-landing-729-54b1a.cloudfunctions.net/contact';

export type LeadPayload = {
  name: string;
  contact: string;
  /** Що саме цікавить: тема, послуга або вакансія. */
  topic?: string;
  comment?: string;
};

/** Кидає помилку, якщо заявка не дійшла — форма має показати це людині. */
export async function sendLead(payload: LeadPayload): Promise<void> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.contact,
      telegram: payload.contact,
      siteOrNiche: [payload.topic, payload.comment].filter(Boolean).join(' — '),
      page: typeof window === 'undefined' ? '' : window.location.pathname,
    }),
  });

  if (!response.ok) {
    throw new Error(`contact endpoint returned ${response.status}`);
  }
}
