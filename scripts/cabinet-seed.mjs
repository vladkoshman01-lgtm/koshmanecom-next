/**
 * Наповнює емулятор Firestore стартовими даними кабінету.
 * Повторний запуск безпечний: документи перезаписуються з тими самими id.
 *
 * Адмін береться з CABINET_ADMIN_EMAIL (.env.development.local).
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

const require = createRequire(new URL('../functions/package.json', import.meta.url));
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  console.error('FIRESTORE_EMULATOR_HOST не задано — сід пишеться лише в емулятор.');
  process.exit(1);
}

function envValue(name) {
  if (process.env[name]) return process.env[name];
  try {
    const line = readFileSync(new URL('../.env.development.local', import.meta.url), 'utf8')
      .split('\n')
      .find((l) => l.startsWith(`${name}=`));
    return line?.slice(name.length + 1).trim();
  } catch {
    return undefined;
  }
}

const admin = envValue('CABINET_ADMIN_EMAIL')?.toLowerCase();
if (!admin) {
  console.error('Додайте CABINET_ADMIN_EMAIL у .env.development.local');
  process.exit(1);
}

initializeApp({ projectId: 'demo-koshman' });
const db = getFirestore();
const now = new Date();

await db.collection('cabinetAdmins').doc(admin).set({ addedBy: 'seed', addedAt: now });
await db.collection('cabinetClients').doc('demo-client').set({
  name: 'Демо-клієнт',
  members: ['client@example.com'],
  createdAt: now,
  updatedAt: now,
});
await db.collection('cabinetClients').doc('other-client').set({
  name: 'Інший клієнт',
  members: ['other@example.com'],
  createdAt: now,
  updatedAt: now,
});
await db.collection('cabinetClients').doc('anna-sposa').set({
  name: 'Anna Sposa Group',
  members: ['anna@example.com'],
  createdAt: now,
  updatedAt: now,
}, { merge: true });
const dashboards = {
  'anna-pinterest': { clientId: 'anna-sposa', title: 'Pinterest Ads', type: 'pinterest_ads', source: 'pinterest', config: { accountId: '549766804372', currency: 'PLN' } },
  'demo-pinterest': { clientId: 'demo-client', title: 'Pinterest Ads', type: 'pinterest_ads', source: 'demo', config: { currency: 'PLN' } },
  'demo-chatgpt': { clientId: 'demo-client', title: 'ChatGPT Ads', type: 'chatgpt_ads', source: 'demo', config: { currency: 'USD' } },
  'other-google': { clientId: 'other-client', title: 'Google Ads', type: 'google_ads', source: 'demo', config: { currency: 'EUR' } },
};
for (const [id, d] of Object.entries(dashboards)) {
  await db.collection('cabinetDashboards').doc(id).set({ ...d, createdAt: now, updatedAt: now }, { merge: true });
}
console.log(`Сід готовий: адмін ${admin}, клієнти demo-client (client@example.com) і other-client (other@example.com).`);
