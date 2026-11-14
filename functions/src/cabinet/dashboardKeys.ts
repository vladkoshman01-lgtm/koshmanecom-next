/**
 * Ключі джерел, прив'язані до конкретного дашборда (зараз — ChatGPT Ads:
 * ключ OpenAI діє лише на один рекламний акаунт). Лежать зашифрованими в
 * cabinetSecrets/dash_{id}; назовні віддаємо тільки останні 4 символи.
 */
import { firestore } from '../db';
import { COL } from './access';
import { decrypt, encrypt } from './crypto';
import { SourceError } from './sources/pinterest';
import { openaiAccount } from './sources/openai';

const ref = (dashboardId: string) => firestore().collection('cabinetSecrets').doc(`dash_${dashboardId}`);

/** Перевіряє ключ у джерелі, зберігає його і підставляє в дашборд акаунт, валюту й часовий пояс. */
export async function setOpenAiKey(dashboardId: string, key: string, by: string) {
  const account = await openaiAccount(key);
  await ref(dashboardId).set({ keyEnc: encrypt(key), hint: key.slice(-4), setAt: new Date(), setBy: by });
  await firestore()
    .collection(COL.dashboards)
    .doc(dashboardId)
    .update({
      'config.accountId': account.id,
      'config.accountName': account.name,
      'config.currency': account.currency,
      'config.timezone': account.timezone,
    });
  return account;
}

export async function getDashboardKey(dashboardId: string): Promise<string> {
  const snap = await ref(dashboardId).get();
  if (!snap.exists) throw new SourceError('api key not set');
  return decrypt(snap.get('keyEnc') as string);
}

export async function keyHints(dashboardIds: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (dashboardIds.length === 0) return out;
  const snaps = await firestore().getAll(...dashboardIds.map(ref));
  snaps.forEach((s, i) => s.exists && out.set(dashboardIds[i], String(s.get('hint') ?? '')));
  return out;
}

export async function deleteDashboardKey(dashboardId: string) {
  await ref(dashboardId).delete();
}
