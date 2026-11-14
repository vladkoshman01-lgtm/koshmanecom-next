/**
 * Підключення Pinterest через OAuth і автоматичне оновлення ключа.
 *
 * Ключ доступу Pinterest живе 30 днів, ключ оновлення — 60 і продовжується
 * безкінечно, але при КОЖНОМУ оновленні видається нова пара, а старий ключ
 * оновлення згорає. Тому нову пару зберігаємо одразу, а одночасні оновлення
 * не допускаємо (оренда на хвилину), інакше дві функції спалили б ключ одна одній.
 *
 * Токени лежать у cabinetSecrets/pinterest зашифрованими (crypto.ts).
 */
import { HttpsError, onRequest } from 'firebase-functions/v2/https';
import { randomBytes } from 'node:crypto';
import { firestore } from '../db';
import { cabinetEncryptionKey, pinterestAppSecret, pinterestToken } from '../secrets';
import { decrypt, encrypt } from './crypto';
import type { Viewer } from './access';

export const PINTEREST_APP_ID = '1584168';
const SCOPES = 'ads:read,user_accounts:read';
const SECRET_DOC = () => firestore().collection('cabinetSecrets').doc('pinterest');
const STATES = () => firestore().collection('cabinetOAuthStates');
/** Оновлюємо заздалегідь, щоб ключ ніколи не встиг протухнути між щоденними синхронізаціями. */
const REFRESH_BEFORE_MS = 7 * 86400000;

/** Куди можна повернути людину після дозволу — лише наші адреси. */
const RETURN_ORIGINS = ['https://koshmanecom.com', 'https://koshman-ecom-staging.web.app', 'http://localhost:3000'];

function callbackUrl() {
  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    return `http://localhost:5001/${process.env.GCLOUD_PROJECT}/us-central1/cabinetPinterestCallback`;
  }
  return `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/cabinetPinterestCallback`;
}

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  refresh_token_expires_at?: number;
  scope?: string;
};

async function tokenRequest(body: Record<string, string>): Promise<TokenResponse> {
  const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${PINTEREST_APP_ID}:${pinterestAppSecret.value()}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(body),
  });
  const json = (await res.json().catch(() => ({}))) as TokenResponse & { message?: string };
  if (!res.ok || !json.access_token) throw new Error(`pinterest oauth ${res.status}: ${String(json.message ?? '').slice(0, 200)}`);
  return json;
}

function toStored(t: TokenResponse, previousRefresh?: { enc: string; expiresAt: Date }) {
  const now = Date.now();
  const refreshExpiresAt = t.refresh_token_expires_at
    ? new Date(t.refresh_token_expires_at * 1000)
    : t.refresh_token_expires_in
      ? new Date(now + t.refresh_token_expires_in * 1000)
      : previousRefresh?.expiresAt;
  return {
    accessTokenEnc: encrypt(t.access_token),
    accessExpiresAt: new Date(now + t.expires_in * 1000),
    refreshTokenEnc: t.refresh_token ? encrypt(t.refresh_token) : previousRefresh?.enc,
    refreshExpiresAt: refreshExpiresAt ?? null,
    scope: t.scope ?? SCOPES,
    refreshingUntil: null,
    lastRefreshAt: new Date(),
    lastError: null,
  };
}

/* ---------------------------- старт і callback ---------------------------- */

/** Адмінська дія: посилання на сторінку дозволу Pinterest. */
export async function pinterestAuthStart(viewer: Viewer, returnOrigin: string) {
  const origin = RETURN_ORIGINS.includes(returnOrigin) ? returnOrigin : RETURN_ORIGINS[0];
  const state = randomBytes(24).toString('hex');
  await STATES().doc(state).set({ email: viewer.email, origin, expiresAt: new Date(Date.now() + 10 * 60000) });
  const url = new URL('https://www.pinterest.com/oauth/');
  url.search = new URLSearchParams({
    client_id: PINTEREST_APP_ID,
    redirect_uri: callbackUrl(),
    response_type: 'code',
    scope: SCOPES,
    state,
  }).toString();
  return { url: url.toString() };
}

/** Сюди Pinterest повертає людину після дозволу. */
export const cabinetPinterestCallback = onRequest(
  { secrets: [pinterestAppSecret, cabinetEncryptionKey], maxInstances: 2 },
  async (req, res) => {
    const state = typeof req.query.state === 'string' ? req.query.state : '';
    const code = typeof req.query.code === 'string' ? req.query.code : '';
    let origin = RETURN_ORIGINS[0];
    const back = (status: string) => res.redirect(302, `${origin}/cabinet/admin?pinterest=${status}`);

    if (!/^[a-f0-9]{48}$/.test(state)) {
      res.status(400).send('Bad request');
      return;
    }
    // Стан одноразовий і живе 10 хвилин — захист від підробленого повернення
    const stateRef = STATES().doc(state);
    const stateSnap = await stateRef.get();
    await stateRef.delete().catch(() => undefined);
    const expiresAt = stateSnap.get('expiresAt')?.toDate?.() as Date | undefined;
    if (!stateSnap.exists || !expiresAt || expiresAt.getTime() < Date.now()) {
      res.status(400).send('Посилання застаріло. Поверніться в адмінку й натисніть «Підключити Pinterest» ще раз.');
      return;
    }
    origin = stateSnap.get('origin') as string;
    if (!code) {
      back('denied');
      return;
    }
    try {
      const tokens = await tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: callbackUrl(), continuous_refresh: 'true' });
      await SECRET_DOC().set({ ...toStored(tokens), connectedBy: stateSnap.get('email'), connectedAt: new Date() });
      await firestore()
        .collection('cabinetAudit')
        .add({ email: stateSnap.get('email'), action: 'connect_pinterest_done', details: {}, at: new Date() })
        .catch(() => undefined);
      back('connected');
    } catch (error) {
      console.error('pinterest oauth failed', error);
      back('error');
    }
  },
);

/* ------------------------------ видача ключа ------------------------------ */

/**
 * Робочий ключ Pinterest. Якщо підключено через OAuth — оновлює його
 * заздалегідь; якщо ні — бере ручний ключ із секрету (перехідний варіант).
 */
export async function getPinterestToken(): Promise<string> {
  const ref = SECRET_DOC();
  for (let attempt = 0; attempt < 3; attempt++) {
    const snap = await ref.get();
    if (!snap.exists) {
      const manual = pinterestToken.value();
      if (!manual || manual === 'local') throw new HttpsError('failed-precondition', 'pinterest_not_connected');
      return manual;
    }
    const accessExpiresAt = snap.get('accessExpiresAt')?.toDate?.() as Date | undefined;
    const fresh = accessExpiresAt && accessExpiresAt.getTime() - Date.now() > REFRESH_BEFORE_MS;
    if (fresh) return decrypt(snap.get('accessTokenEnc') as string);

    // Беремо оренду на оновлення; якщо її тримає інша функція — чекаємо й перечитуємо
    const claimed = await firestore().runTransaction(async (tx) => {
      const s = await tx.get(ref);
      const until = s.get('refreshingUntil')?.toDate?.() as Date | undefined;
      if (until && until.getTime() > Date.now()) return false;
      tx.update(ref, { refreshingUntil: new Date(Date.now() + 60000) });
      return true;
    });
    if (!claimed) {
      await new Promise((r) => setTimeout(r, 3000));
      continue;
    }
    try {
      const refreshEnc = snap.get('refreshTokenEnc') as string | undefined;
      if (!refreshEnc) throw new Error('no refresh token');
      const tokens = await tokenRequest({ grant_type: 'refresh_token', refresh_token: decrypt(refreshEnc) });
      const refreshExpiresAt = (snap.get('refreshExpiresAt')?.toDate?.() as Date | undefined) ?? new Date(0);
      await ref.update(toStored(tokens, { enc: refreshEnc, expiresAt: refreshExpiresAt }));
      return tokens.access_token;
    } catch (error) {
      console.error('pinterest refresh failed', error);
      await ref.update({ refreshingUntil: null, lastError: String((error as Error).message).slice(0, 300) });
      // Старий ключ доступу ще може жити кілька днів — краще ним, ніж нічим
      if (accessExpiresAt && accessExpiresAt.getTime() > Date.now()) return decrypt(snap.get('accessTokenEnc') as string);
      throw error;
    }
  }
  throw new Error('pinterest token refresh is busy');
}

/** Стан підключення для адмінки — без самих токенів. */
export async function pinterestConnectionStatus() {
  const snap = await SECRET_DOC().get();
  const date = (k: string) => (snap.get(k)?.toDate?.() as Date | undefined)?.toISOString() ?? null;
  if (!snap.exists) {
    const manual = pinterestToken.value();
    return { connected: false, manualToken: Boolean(manual && manual !== 'local') };
  }
  return {
    connected: true,
    manualToken: false,
    connectedBy: (snap.get('connectedBy') as string) ?? null,
    connectedAt: date('connectedAt'),
    accessExpiresAt: date('accessExpiresAt'),
    refreshExpiresAt: date('refreshExpiresAt'),
    lastRefreshAt: date('lastRefreshAt'),
    lastError: (snap.get('lastError') as string) ?? null,
  };
}
