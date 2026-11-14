/**
 * Перевірка прав доступу кабінету проти емуляторів (npm run cabinet:emulators).
 * Запуск: node functions/test/cabinet-access.test.mjs <email адміна з сіду>
 * Тест спирається на демо-дані — якщо їх видалили в адмінці, спершу:
 *   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/cabinet-seed.mjs
  */
const A = 'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1';
const F = 'http://127.0.0.1:5001/demo-koshman/us-central1/cabinet';
const j = (r) => r.json();
async function user(email, verified = true) {
  const pw = 'pw-123456';
  let r = await fetch(`${A}/accounts:signUp?key=demo-key`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password: pw, returnSecureToken: true }) }).then(j);
  if (r.error) r = await fetch(`${A}/accounts:signInWithPassword?key=demo-key`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password: pw, returnSecureToken: true }) }).then(j);
  if (verified) await fetch(`${A}/projects/demo-koshman/accounts:update`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer owner' }, body: JSON.stringify({ localId: r.localId, emailVerified: true }) });
  const s = await fetch(`${A}/accounts:signInWithPassword?key=demo-key`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password: pw, returnSecureToken: true }) }).then(j);
  return s.idToken;
}
async function call(token, data) {
  const r = await fetch(F, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ data }) }).then(j);
  return r.error ? { err: r.error.status + ':' + r.error.message } : r.result;
}
let fails = 0;
function expect(label, got, pred) { const ok = pred(got); if (!ok) fails++; console.log(ok ? 'PASS' : 'FAIL', label, ok ? '' : JSON.stringify(got).slice(0, 200)); }
const errIs = (s) => (g) => g?.err?.startsWith(s);

const admin = await user(process.argv[2]);
const client = await user('client@example.com');
const other = await user('other@example.com');
const unverified = await user('nobody@example.com', false);
const stranger = await user('stranger@example.com');

expect('no token → unauthenticated', await call(null, { action: 'me' }), errIs('UNAUTHENTICATED'));
expect('unverified email → denied', await call(unverified, { action: 'me' }), errIs('PERMISSION_DENIED'));
expect('stranger sees no dashboards', await call(stranger, { action: 'listDashboards' }), (g) => g.dashboards?.length === 0);
expect('client me', await call(client, { action: 'me' }), (g) => g.isAdmin === false && g.clients.length === 1 && g.clients[0].id === 'demo-client');
expect('client lists own 2 dashboards', await call(client, { action: 'listDashboards' }), (g) => g.dashboards.length === 2 && g.dashboards.every((d) => d.clientId === 'demo-client'));
const own = await call(client, { action: 'getDashboard', id: 'demo-pinterest' });
expect('client opens own dashboard', own, (g) => g.report?.series?.points?.length === 30 && g.report.currency === 'PLN' && !('config' in g.dashboard) && !('syncError' in g.dashboard));
expect('client cannot open other client dashboard', await call(client, { action: 'getDashboard', id: 'other-google' }), errIs('NOT_FOUND'));
expect('other cannot open demo dashboard', await call(other, { action: 'getDashboard', id: 'demo-pinterest' }), errIs('NOT_FOUND'));
expect('client cannot scope to other client', await call(client, { action: 'listDashboards', clientId: 'other-client' }), errIs('NOT_FOUND'));
for (const a of ['adminOverview', 'saveClient', 'deleteClient', 'saveDashboard', 'deleteDashboard', 'setAdmin', 'auditLog']) {
  expect(`client blocked from ${a}`, await call(client, { action: a, id: 'demo-client', name: 'x', email: 'client@example.com', admin: true }), errIs('PERMISSION_DENIED'));
}
expect('prototype action rejected', await call(client, { action: 'constructor' }), errIs('INVALID_ARGUMENT'));
expect('bad range rejected', await call(client, { action: 'getDashboard', id: 'demo-pinterest', from: '2020-01-01', to: '2026-01-01' }), errIs('INVALID_ARGUMENT'));
expect('bad id rejected', await call(client, { action: 'getDashboard', id: '../cabinetAdmins/x' }), errIs('INVALID_ARGUMENT'));

expect('admin me', await call(admin, { action: 'me' }), (g) => g.isAdmin === true);
const ov = await call(admin, { action: 'adminOverview' });
expect('admin overview', ov, (g) => g.clients.length >= 2 && g.dashboards.length >= 3 && g.types.length === 4);
expect('admin opens any dashboard', await call(admin, { action: 'getDashboard', id: 'other-google' }), (g) => g.report?.currency === 'EUR');
expect('admin preview as client', await call(admin, { action: 'listDashboards', clientId: 'demo-client' }), (g) => g.dashboards.length === 2);
expect('admin cannot remove self', await call(admin, { action: 'setAdmin', email: process.argv[2], admin: false }), errIs('FAILED_PRECONDITION'));
expect('bad member email rejected', await call(admin, { action: 'saveClient', name: 'X', members: ['not-an-email'] }), errIs('INVALID_ARGUMENT'));
expect('windsor without account rejected', await call(admin, { action: 'saveDashboard', clientId: 'demo-client', type: 'pinterest_ads', source: 'windsor', config: {} }), errIs('INVALID_ARGUMENT'));
expect('unsupported source rejected', await call(admin, { action: 'saveDashboard', clientId: 'demo-client', type: 'chatgpt_ads', source: 'bizmap', config: { accountId: '1' } }), errIs('INVALID_ARGUMENT'));

// відкликання доступу діє одразу
await call(admin, { action: 'saveClient', id: 'demo-client', name: 'Демо-клієнт', members: [] });
expect('revoked client loses access immediately', await call(client, { action: 'getDashboard', id: 'demo-pinterest' }), errIs('NOT_FOUND'));
await call(admin, { action: 'saveClient', id: 'demo-client', name: 'Демо-клієнт', members: ['client@example.com'] });
expect('restored client regains access', await call(client, { action: 'getDashboard', id: 'demo-pinterest' }), (g) => !!g.report);
// новий адмін діє одразу і видаляється
await call(admin, { action: 'setAdmin', email: 'stranger@example.com', admin: true });
expect('granted admin works', await call(stranger, { action: 'adminOverview' }), (g) => Array.isArray(g.clients));
await call(admin, { action: 'setAdmin', email: 'stranger@example.com', admin: false });
expect('removed admin blocked', await call(stranger, { action: 'adminOverview' }), errIs('PERMISSION_DENIED'));
expect('client blocked from syncNow', await call(client, { action: 'syncNow', id: 'demo-pinterest' }), errIs('PERMISSION_DENIED'));
expect('client blocked from sourceAccounts', await call(client, { action: 'sourceAccounts', type: 'pinterest_ads', source: 'pinterest' }), errIs('PERMISSION_DENIED'));
expect('client cannot open Anna dashboard', await call(client, { action: 'getDashboard', id: 'anna-pinterest', all: true }), errIs('NOT_FOUND'));
expect('admin sees sync state', await call(admin, { action: 'getDashboard', id: 'demo-pinterest' }), (g) => 'syncError' in g.dashboard);
expect('audit log records actions', await call(admin, { action: 'auditLog' }), (g) => g.entries.some((e) => e.action === 'add_admin') && g.entries.some((e) => e.action === 'view_dashboard'));
console.log(fails ? `${fails} FAILED` : 'ALL ACCESS TESTS PASSED');
process.exit(fails ? 1 : 0);
