/**
 * API кабінету клієнтських дашбордів — одна callable-функція `cabinet`.
 *
 * Браузер шле { action, ...параметри }; Firebase SDK сам додає ID token,
 * а getViewer перевіряє його і підтверджений email. Дії адмінки окремо
 * перевіряють, що людина — адмін.
 */
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { firestore } from '../db';
import { cabinetEncryptionKey, pinterestAppSecret, pinterestToken, windsorToken } from '../secrets';
import { pinterestAuthStart, pinterestConnectionStatus } from './pinterestAuth';
import { deleteDashboardKey, keyHints, setOpenAiKey } from './dashboardKeys';
import { openaiAccount } from './sources/openai';
import {
  COL,
  audit,
  clientsForViewer,
  dashboardForViewer,
  getViewer,
  normalizeEmail,
  requireAdmin,
  type Viewer,
} from './access';
import { importPeriods } from './archive';
import {
  DASHBOARD_TYPES,
  SOURCE_LABELS,
  availableSources,
  buildReport,
  listSourceAccounts,
  syncDashboard,
  syncs,
} from './modules';
import type { ClientDoc, DashboardDoc, DashboardSource, DashboardType, DateRange, FactRow, PeriodDoc } from './types';

const MAX_RANGE_DAYS = 1100;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = Record<string, unknown>;

function str(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (trimmed.length > max) throw new HttpsError('invalid-argument', 'value_too_long');
  return trimmed;
}

function docId(value: unknown): string {
  const id = str(value, 64);
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) throw new HttpsError('invalid-argument', 'bad_id');
  return id;
}

/** Діапазон дат YYYY-MM-DD, не в майбутньому відносно from≤to і не довший за MAX_RANGE_DAYS. */
export function parseRange(payload: Payload): DateRange {
  const today = new Date().toISOString().slice(0, 10);
  const monthAgo = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
  const from = typeof payload.from === 'string' ? payload.from : monthAgo;
  const to = typeof payload.to === 'string' ? payload.to : today;
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(from) || !re.test(to) || Number.isNaN(Date.parse(from)) || Number.isNaN(Date.parse(to))) {
    throw new HttpsError('invalid-argument', 'bad_date');
  }
  const days = (Date.parse(to) - Date.parse(from)) / 86400000;
  if (days < 0 || days > MAX_RANGE_DAYS) throw new HttpsError('invalid-argument', 'bad_range');
  return { from, to };
}

function parseMembers(value: unknown): string[] {
  if (!Array.isArray(value) || value.length > 50) throw new HttpsError('invalid-argument', 'bad_members');
  const emails = [...new Set(value.map(normalizeEmail))].filter(Boolean);
  if (emails.some((e) => e.length > 200 || !EMAIL_RE.test(e))) {
    throw new HttpsError('invalid-argument', 'bad_email');
  }
  return emails;
}

function publicDashboard(id: string, d: DashboardDoc, clientName?: string) {
  return {
    id,
    clientId: d.clientId,
    clientName,
    title: d.title,
    type: d.type,
    typeLabel: DASHBOARD_TYPES[d.type]?.label ?? d.type,
    source: d.source,
    sourceLabel: SOURCE_LABELS[d.source] ?? d.source,
  };
}

/* ---------------------------- дії клієнта ---------------------------- */

async function me(viewer: Viewer) {
  const clients = await clientsForViewer(viewer);
  return {
    email: viewer.email,
    isAdmin: viewer.isAdmin,
    clients: viewer.isAdmin ? [] : clients.map((c) => ({ id: c.id, name: c.name })),
  };
}

/** Дашборди людини. Адмін може попросити дашборди конкретного клієнта — «як бачить клієнт». */
async function listDashboards(viewer: Viewer, payload: Payload) {
  const clients = await clientsForViewer(viewer);
  let scope = clients;
  if (payload.clientId !== undefined) {
    const clientId = docId(payload.clientId);
    scope = clients.filter((c) => c.id === clientId);
    if (scope.length === 0) throw new HttpsError('not-found', 'client_not_found');
  } else if (viewer.isAdmin) {
    // Адмін без clientId бачить адмінку, а не стіну з усіх дашбордів
    return { dashboards: [] };
  }
  const names = new Map(scope.map((c) => [c.id, c.name]));
  const ids = [...names.keys()];
  const dashboards: ReturnType<typeof publicDashboard>[] = [];
  // Firestore 'in' приймає до 30 значень
  for (let i = 0; i < ids.length; i += 30) {
    const snap = await firestore().collection(COL.dashboards).where('clientId', 'in', ids.slice(i, i + 30)).get();
    for (const d of snap.docs) {
      const data = d.data() as DashboardDoc;
      dashboards.push(publicDashboard(d.id, data, names.get(data.clientId)));
    }
  }
  dashboards.sort((a, b) => (a.clientName ?? '').localeCompare(b.clientName ?? '') || a.title.localeCompare(b.title));
  return { dashboards };
}

async function getDashboard(viewer: Viewer, payload: Payload) {
  const { dashboard, client } = await dashboardForViewer(viewer, docId(payload.id));
  // «Увесь час»: від першого дня з даними до сьогодні
  const range =
    payload.all === true
      ? { from: dashboard.dataStart ?? new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10), to: new Date().toISOString().slice(0, 10) }
      : parseRange(payload);
  let report;
  try {
    const campaignId = typeof payload.campaignId === 'string' && payload.campaignId ? str(payload.campaignId, 64) : null;
    report = await buildReport(dashboard, range, payload.all !== true, campaignId);
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    // Сирі помилки джерел лишаються в логах, браузер їх не бачить
    console.error('report failed', dashboard.id, dashboard.source, error);
    throw new HttpsError('unavailable', 'source_unavailable');
  }
  if (!viewer.isAdmin) await audit(viewer, 'view_dashboard', { dashboardId: dashboard.id });
  return {
    dashboard: {
      ...publicDashboard(dashboard.id, dashboard, client.name),
      // Стан синхронізації — лише адміну
      ...(viewer.isAdmin ? { syncError: dashboard.lastSyncError ?? null } : {}),
    },
    report,
  };
}

/* ---------------------------- дії адмінки ---------------------------- */

async function adminOverview(viewer: Viewer) {
  requireAdmin(viewer);
  const db = firestore();
  const [clients, dashboards, admins] = await Promise.all([
    db.collection(COL.clients).get(),
    db.collection(COL.dashboards).get(),
    db.collection(COL.admins).get(),
  ]);
  const hints = await keyHints(dashboards.docs.filter((d) => d.get('source') === 'openai').map((d) => d.id));
  return {
    clients: clients.docs
      .map((d) => ({
        id: d.id,
        name: (d.data() as ClientDoc).name,
        members: (d.data() as ClientDoc).members ?? [],
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    dashboards: dashboards.docs.map((d) => {
      const data = d.data() as DashboardDoc;
      const lastSync = (data.lastSyncAt as unknown as { toDate?: () => Date })?.toDate?.();
      return {
        ...publicDashboard(d.id, data),
        config: data.config ?? {},
        dataStart: data.dataStart ?? null,
        lastSyncAt: lastSync?.toISOString() ?? null,
        lastSyncError: data.lastSyncError ?? null,
        keyHint: hints.get(d.id) ?? null,
      };
    }),
    admins: admins.docs.map((d) => d.id).sort(),
    types: Object.entries(DASHBOARD_TYPES).map(([id, t]) => ({
      id,
      label: t.label,
      sources: availableSources(id as DashboardType).map((s) => ({ id: s, label: SOURCE_LABELS[s] })),
      config: t.config,
    })),
  };
}

async function saveClient(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const name = str(payload.name, 120);
  if (!name) throw new HttpsError('invalid-argument', 'name_required');
  const members = parseMembers(payload.members ?? []);
  const col = firestore().collection(COL.clients);
  const ref = payload.id ? col.doc(docId(payload.id)) : col.doc();
  if (payload.id && !(await ref.get()).exists) throw new HttpsError('not-found', 'client_not_found');
  await ref.set(
    { name, members, updatedAt: new Date(), ...(payload.id ? {} : { createdAt: new Date() }) },
    { merge: true },
  );
  await audit(viewer, payload.id ? 'update_client' : 'create_client', { clientId: ref.id, name, members });
  return { id: ref.id };
}

/** Дашборд разом з архівом даних і ключем джерела — щоб у базі не лишалось сиріт. */
async function removeDashboard(id: string) {
  await firestore().recursiveDelete(firestore().collection(COL.dashboards).doc(id));
  await deleteDashboardKey(id);
}

async function deleteClient(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const id = docId(payload.id);
  const db = firestore();
  const dashboards = await db.collection(COL.dashboards).where('clientId', '==', id).get();
  for (const d of dashboards.docs) await removeDashboard(d.id);
  await db.collection(COL.clients).doc(id).delete();
  await audit(viewer, 'delete_client', { clientId: id, dashboards: dashboards.size });
  return { ok: true };
}

/** Що з налаштувань джерело підставило саме (з ключа) — при редагуванні не губимо. */
const SOURCE_FILLED = ['accountId', 'accountName', 'currency', 'timezone'];

async function saveDashboard(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const db = firestore();
  const clientId = docId(payload.clientId);
  if (!(await db.collection(COL.clients).doc(clientId).get()).exists) {
    throw new HttpsError('not-found', 'client_not_found');
  }
  const type = str(payload.type, 40) as DashboardType;
  const typeDef = DASHBOARD_TYPES[type];
  if (!typeDef) throw new HttpsError('invalid-argument', 'bad_type');
  const source = str(payload.source, 40) as DashboardSource;
  if (!availableSources(type).includes(source)) throw new HttpsError('invalid-argument', 'bad_source');
  const title = str(payload.title, 120) || typeDef.label;
  const apiKey = str(payload.apiKey, 500);

  const col = db.collection(COL.dashboards);
  const ref = payload.id ? col.doc(docId(payload.id)) : col.doc();
  const existing = payload.id ? await ref.get() : null;
  if (payload.id && !existing?.exists) throw new HttpsError('not-found', 'dashboard_not_found');
  const old = existing?.data() as DashboardDoc | undefined;

  // Для ChatGPT Ads акаунт визначає сам ключ: перевіряємо його ДО збереження
  if (source === 'openai') {
    const hasKey = old?.source === 'openai' && (await keyHints([ref.id])).has(ref.id);
    if (!apiKey && !hasKey) throw new HttpsError('invalid-argument', 'api_key_required');
    if (apiKey) {
      await openaiAccount(apiKey).catch((error) => {
        console.error('openai key check failed', error);
        throw new HttpsError('invalid-argument', 'bad_api_key');
      });
    }
  }

  const rawConfig = (payload.config && typeof payload.config === 'object' ? payload.config : {}) as Payload;
  const config: Record<string, string> = {};
  if (old && old.source === source) {
    for (const k of SOURCE_FILLED) if (old.config?.[k]) config[k] = old.config[k];
  }
  for (const field of typeDef.config) {
    const value = str(rawConfig[field.key], 200);
    if (value) config[field.key] = value;
    else if (field.required && source !== 'demo' && source !== 'openai' && !config[field.key]) {
      throw new HttpsError('invalid-argument', `${field.key}_required`);
    }
  }

  if (old) {
    // update, а не set: інакше зникли б дата старту реклами й стан синхронізації
    await ref.update({ clientId, title, type, source, config, updatedAt: new Date() });
  } else {
    const doc: DashboardDoc = { clientId, title, type, source, config, createdAt: new Date(), updatedAt: new Date() };
    await ref.set(doc);
  }
  if (source === 'openai' && apiKey) await setOpenAiKey(ref.id, apiKey, viewer.email);
  await audit(viewer, old ? 'update_dashboard' : 'create_dashboard', { dashboardId: ref.id, clientId, type, source, keyChanged: Boolean(apiKey) });

  // Одразу тягнемо все, що джерело пам'ятає, — щоб клієнт не побачив порожній звіт
  let syncError: string | null = null;
  if (syncs(source)) {
    const saved = await ref.get();
    await syncDashboard({ id: ref.id, ...(saved.data() as DashboardDoc) }, true).catch(() => {
      syncError = 'source_unavailable';
    });
  }
  return { id: ref.id, syncError };
}

async function deleteDashboard(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const id = docId(payload.id);
  await removeDashboard(id);
  await audit(viewer, 'delete_dashboard', { dashboardId: id });
  return { ok: true };
}

async function setAdmin(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const email = normalizeEmail(payload.email);
  if (!EMAIL_RE.test(email) || email.length > 200) throw new HttpsError('invalid-argument', 'bad_email');
  const ref = firestore().collection(COL.admins).doc(email);
  if (payload.admin === true) {
    await ref.set({ addedBy: viewer.email, addedAt: new Date() });
  } else {
    // Інакше можна випадково лишити кабінет без жодного адміна
    if (email === viewer.email) throw new HttpsError('failed-precondition', 'cannot_remove_self');
    await ref.delete();
  }
  await audit(viewer, payload.admin === true ? 'add_admin' : 'remove_admin', { email });
  return { ok: true };
}

async function auditLog(viewer: Viewer) {
  requireAdmin(viewer);
  const db = firestore();
  const [snap, clients, dashboards] = await Promise.all([
    db.collection(COL.audit).orderBy('at', 'desc').limit(100).get(),
    db.collection(COL.clients).get(),
    db.collection(COL.dashboards).get(),
  ]);
  // Назви замість технічних id; для вже видалених лишається id
  const clientNames = new Map(clients.docs.map((d) => [d.id, d.get('name') as string]));
  const dashNames = new Map(
    dashboards.docs.map((d) => [d.id, `${d.get('title')}${clientNames.get(d.get('clientId')) ? ` · ${clientNames.get(d.get('clientId'))}` : ''}`]),
  );
  return {
    entries: snap.docs.map((d) => {
      const details = (d.get('details') ?? {}) as Record<string, unknown>;
      return {
        email: d.get('email') as string,
        action: d.get('action') as string,
        details,
        target:
          (typeof details.dashboardId === 'string' && (dashNames.get(details.dashboardId) ?? details.dashboardId)) ||
          (typeof details.name === 'string' && details.name) ||
          (typeof details.clientId === 'string' && (clientNames.get(details.clientId) ?? details.clientId)) ||
          (typeof details.email === 'string' && details.email) ||
          null,
        at: (d.get('at')?.toDate?.() as Date | undefined)?.toISOString() ?? null,
      };
    }),
  };
}

async function syncNow(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const id = docId(payload.id);
  const snap = await firestore().collection(COL.dashboards).doc(id).get();
  if (!snap.exists) throw new HttpsError('not-found', 'dashboard_not_found');
  const dashboard = { id, ...(snap.data() as DashboardDoc) };
  if (!syncs(dashboard.source)) throw new HttpsError('failed-precondition', 'source_has_no_sync');
  try {
    const result = await syncDashboard(dashboard, payload.full === true);
    await audit(viewer, 'sync_dashboard', { dashboardId: id, full: payload.full === true });
    return result;
  } catch {
    throw new HttpsError('unavailable', 'source_unavailable');
  }
}

async function sourceAccounts(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const type = str(payload.type, 40) as DashboardType;
  const source = str(payload.source, 40) as DashboardSource;
  if (!DASHBOARD_TYPES[type] || !availableSources(type).includes(source)) throw new HttpsError('invalid-argument', 'bad_source');
  try {
    return { accounts: await listSourceAccounts(type, source) };
  } catch (error) {
    console.error('list accounts failed', source, error);
    throw new HttpsError('unavailable', 'source_unavailable');
  }
}

async function connections(viewer: Viewer) {
  requireAdmin(viewer);
  return { pinterest: await pinterestConnectionStatus() };
}

async function connectPinterest(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  await audit(viewer, 'connect_pinterest_start', {});
  return pinterestAuthStart(viewer, str(payload.origin, 100));
}

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Перевіряє файл історії: дати, межі тижня, числа — щоб у архів не потрапило сміття. */
function parseImport(raw: unknown): PeriodDoc[] {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 400) throw new HttpsError('invalid-argument', 'bad_import');
  const num = (v: unknown) => {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0 || n > 1e9) throw new HttpsError('invalid-argument', 'bad_import');
    return n;
  };
  const text = (v: unknown) => (typeof v === 'string' ? v.slice(0, 200) : '');
  return raw.map((p) => {
    const o = (p ?? {}) as Record<string, unknown>;
    const from = String(o.from ?? '');
    const to = String(o.to ?? '');
    if (!DAY_RE.test(from) || !DAY_RE.test(to) || from > to || Date.parse(to) - Date.parse(from) > 31 * 86400000) {
      throw new HttpsError('invalid-argument', 'bad_import');
    }
    if (!Array.isArray(o.rows) || o.rows.length > 1000) throw new HttpsError('invalid-argument', 'bad_import');
    const rows: FactRow[] = o.rows.map((r) => {
      const x = (r ?? {}) as Record<string, unknown>;
      return {
        campaignId: text(x.campaignId),
        campaignName: text(x.campaignName),
        adId: text(x.adId),
        adName: text(x.adName),
        status: text(x.status),
        spend: num(x.spend),
        impressions: num(x.impressions),
        clicks: num(x.clicks),
        conversions: num(x.conversions ?? 0),
      };
    });
    return { from, to, rows, origin: 'import' as const };
  });
}

async function importHistory(viewer: Viewer, payload: Payload) {
  requireAdmin(viewer);
  const id = docId(payload.id);
  const snap = await firestore().collection(COL.dashboards).doc(id).get();
  if (!snap.exists) throw new HttpsError('not-found', 'dashboard_not_found');
  const periods = parseImport(payload.periods);
  const result = await importPeriods(id, periods);
  // Узгоджуємо з джерелом: тижні, які воно ще пам'ятає, стануть точними днями
  const dashboard = { id, ...(snap.data() as DashboardDoc) };
  if (syncs(dashboard.source)) await syncDashboard(dashboard, true).catch(() => undefined);
  await audit(viewer, 'import_history', { dashboardId: id, periods: periods.length });
  return result;
}

/* ------------------------------- роутер ------------------------------- */

const ACTIONS: Record<string, (viewer: Viewer, payload: Payload) => Promise<unknown>> = {
  me,
  listDashboards,
  getDashboard,
  adminOverview,
  saveClient,
  deleteClient,
  saveDashboard,
  deleteDashboard,
  setAdmin,
  auditLog,
  syncNow,
  sourceAccounts,
  connections,
  connectPinterest,
  importHistory,
};

export const cabinet = onCall(
  {
    cors: ['https://koshmanecom.com', 'https://koshman-ecom-staging.web.app', 'http://localhost:3000'],
    secrets: [windsorToken, pinterestToken, pinterestAppSecret, cabinetEncryptionKey],
    maxInstances: 5,
    timeoutSeconds: 60,
  },
  async (request) => {
    const payload = (request.data && typeof request.data === 'object' ? request.data : {}) as Payload;
    // hasOwn: інакше action "constructor" дістав би метод із прототипу об'єкта
    const handler =
      typeof payload.action === 'string' && Object.prototype.hasOwnProperty.call(ACTIONS, payload.action) ? ACTIONS[payload.action] : undefined;
    if (!handler) throw new HttpsError('invalid-argument', 'unknown_action');
    const viewer = await getViewer(request.auth);
    return handler(viewer, payload);
  },
);

/** Щоранку забираємо свіжі дні в архів, щоб клієнт не чекав на синхронізацію. */
export const cabinetSync = onSchedule(
  { schedule: 'every day 06:00', timeZone: 'Europe/Kyiv', secrets: [windsorToken, pinterestToken, pinterestAppSecret, cabinetEncryptionKey], timeoutSeconds: 540 },
  async () => {
    const snap = await firestore().collection(COL.dashboards).get();
    for (const doc of snap.docs) {
      const dashboard = { id: doc.id, ...(doc.data() as DashboardDoc) };
      if (!syncs(dashboard.source)) continue;
      await syncDashboard(dashboard).catch(() => undefined);
    }
  },
);

export { cabinetPinterestCallback } from './pinterestAuth';
