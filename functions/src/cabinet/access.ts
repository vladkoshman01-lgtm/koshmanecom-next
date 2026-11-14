/**
 * Хто прийшов і що йому можна. Уся перевірка доступу кабінету — тут.
 *
 * Браузер до Firestore не ходить (правила забороняють усе), тож ці функції —
 * єдине, що вирішує, чиї дані людина побачить.
 */
import { HttpsError, type CallableRequest } from 'firebase-functions/v2/https';
import { firestore } from '../db';
import type { ClientDoc, DashboardDoc } from './types';

export const COL = {
  admins: 'cabinetAdmins',
  clients: 'cabinetClients',
  dashboards: 'cabinetDashboards',
  cache: 'cabinetCache',
  audit: 'cabinetAudit',
} as const;

export type Viewer = { uid: string; email: string; isAdmin: boolean };

export function normalizeEmail(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

/**
 * Головні адміни — зі змінної CABINET_SUPERADMINS (через кому), задається при
 * деплої з functions/.env.<project>. Потрібні, щоб у новій базі хтось міг зайти
 * в адмінку й додати решту; інших адмінів додають уже з адмінки.
 */
function superAdmins(): string[] {
  return (process.env.CABINET_SUPERADMINS ?? '').split(',').map(normalizeEmail).filter(Boolean);
}

/** Пускаємо лише з підтвердженим email: саме за ним видається доступ. */
export async function getViewer(auth: CallableRequest['auth']): Promise<Viewer> {
  if (!auth) throw new HttpsError('unauthenticated', 'sign_in_required');
  const email = normalizeEmail(auth.token.email);
  if (!email || auth.token.email_verified !== true) {
    throw new HttpsError('permission-denied', 'email_not_verified');
  }
  if (superAdmins().includes(email)) return { uid: auth.uid, email, isAdmin: true };
  const adminSnap = await firestore().collection(COL.admins).doc(email).get();
  return { uid: auth.uid, email, isAdmin: adminSnap.exists };
}

export function requireAdmin(viewer: Viewer) {
  if (!viewer.isAdmin) throw new HttpsError('permission-denied', 'admin_only');
}

export type ClientRecord = ClientDoc & { id: string };
export type DashboardRecord = DashboardDoc & { id: string };

/** Клієнти, яких бачить людина: адмін — усіх, інші — лише ті, де вони в members. */
export async function clientsForViewer(viewer: Viewer): Promise<ClientRecord[]> {
  const col = firestore().collection(COL.clients);
  const snap = viewer.isAdmin
    ? await col.get()
    : await col.where('members', 'array-contains', viewer.email).get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ClientDoc) }));
}

/** Дашборд і його клієнт — або «не знайдено», якщо доступу немає. */
export async function dashboardForViewer(viewer: Viewer, dashboardId: string): Promise<{
  dashboard: DashboardRecord;
  client: ClientRecord;
}> {
  const db = firestore();
  const dashSnap = await db.collection(COL.dashboards).doc(dashboardId).get();
  if (!dashSnap.exists) throw new HttpsError('not-found', 'dashboard_not_found');
  const dashboard = { id: dashSnap.id, ...(dashSnap.data() as DashboardDoc) };

  const clientSnap = await db.collection(COL.clients).doc(dashboard.clientId).get();
  const client = clientSnap.exists ? { id: clientSnap.id, ...(clientSnap.data() as ClientDoc) } : null;

  const allowed = viewer.isAdmin || (client?.members ?? []).includes(viewer.email);
  // Ту саму відповідь, що й для неіснуючого: не підказуємо, що такий дашборд є
  if (!allowed || !client) throw new HttpsError('not-found', 'dashboard_not_found');
  return { dashboard, client };
}

export async function audit(viewer: Viewer, action: string, details: Record<string, unknown>) {
  await firestore()
    .collection(COL.audit)
    .add({ email: viewer.email, action, details, at: new Date() })
    .catch((error) => console.error('audit write failed', error));
}
