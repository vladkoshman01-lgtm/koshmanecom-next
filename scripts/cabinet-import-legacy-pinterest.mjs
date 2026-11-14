/**
 * Імпорт старого Pinterest-звіту Anna Sposa (src/lib/pinterest-dashboard-data.ts)
 * в архів дашборда кабінету — щоб клієнтка бачила історію з 1 червня 2026,
 * хоча Pinterest API віддає лише останні 90 днів.
 *
 * Старі дані — тижнями (межі місяців не перетинають), тож місячні суми точні.
 * Дні, які Pinterest ще пам'ятає, синхронізація потім замінить точними днями.
 *
 * Запуск (лише в емулятор, якщо не задано інше):
 *   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 PINTEREST_ACCESS_TOKEN=… \
 *   node --experimental-strip-types scripts/cabinet-import-legacy-pinterest.mjs <dashboardId>
 *
 * Токен потрібен, щоб прив'язати оголошення до справжніх кампаній Pinterest
 * (у старому звіті кампанії перейменовані: «Кампанія 1 — Франція» тощо).
 *
 * Для проду — зберегти у файл і завантажити в адмінці («Імпорт історії»):
 *   PINTEREST_ACCESS_TOKEN=… node --experimental-strip-types scripts/cabinet-import-legacy-pinterest.mjs --out anna-history.json
 */
import { createRequire } from 'node:module';

const require = createRequire(new URL('../functions/package.json', import.meta.url));
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > 0 ? process.argv[outIndex + 1] : null;
const dashboardId = outFile ? null : process.argv[2];
if (!outFile && !dashboardId) {
  console.error('Вкажіть id дашборда (емулятор) або --out <файл.json> (для адмінки).');
  process.exit(1);
}
if (!outFile && !process.env.FIRESTORE_EMULATOR_HOST) {
  console.error('FIRESTORE_EMULATOR_HOST не задано — для проду використовуйте --out і «Імпорт історії» в адмінці.');
  process.exit(1);
}

const { pinterestDashboardData } = await import('../src/lib/pinterest-dashboard-data.ts');
const ACCOUNT = '549766804372';

/** Справжні кампанії й оголошення з Pinterest — для прив'язки старих рядків. */
async function pinterestMaps(token) {
  if (!token) return null;
  const get = async (path) => {
    const items = [];
    let bookmark = '';
    do {
      const res = await fetch(`https://api.pinterest.com/v5/ad_accounts/${ACCOUNT}/${path}?page_size=250${bookmark ? `&bookmark=${bookmark}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`pinterest ${res.status}`);
      const page = await res.json();
      items.push(...page.items);
      bookmark = page.bookmark ?? '';
    } while (bookmark);
    return items;
  };
  const [campaigns, ads] = await Promise.all([get('campaigns'), get('ads')]);
  return { campaigns: new Map(campaigns.map((c) => [c.id, c.name])), ads: new Map(ads.map((a) => [a.id, a])) };
}

/** «01.07–07.07.2026» → { from: '2026-07-01', to: '2026-07-07' } */
function parseWeek(label) {
  const m = label.match(/^(\d{2})\.(\d{2})–(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!m) throw new Error(`Незрозумілий тиждень: ${label}`);
  const [, d1, m1, d2, m2, y] = m;
  return { from: `${y}-${m1}-${d1}`, to: `${y}-${m2}-${d2}` };
}

const maps = await pinterestMaps(process.env.PINTEREST_ACCESS_TOKEN);
if (!maps) console.warn('Без PINTEREST_ACCESS_TOKEN кампанії лишаться зі старими назвами.');

const periods = new Map();
let unmatched = 0;
for (const campaign of pinterestDashboardData.campaigns) {
  for (const week of campaign.weeks) {
    const { from, to } = parseWeek(week.weekLabel);
    const key = `${from}_${to}`;
    const period = periods.get(key) ?? { from, to, rows: [], origin: 'import' };
    for (const r of week.rows) {
      const adId = r.adId.replace(/^PP/, '');
      const ad = maps?.ads.get(adId);
      if (maps && !ad) unmatched++;
      period.rows.push({
        campaignId: ad?.campaign_id ?? campaign.id,
        campaignName: (ad && maps.campaigns.get(ad.campaign_id)) ?? campaign.name,
        adId,
        adName: ad?.name ?? r.adName.replace(/\s+/g, ' ').trim(),
        status: ad?.status ?? r.status,
        spend: r.spend,
        impressions: r.impressions,
        clicks: r.clicks,
        conversions: 0,
      });
    }
    periods.set(key, period);
  }
}

const all = [...periods.values()].sort((a, b) => a.from.localeCompare(b.from));
if (outFile) {
  const { writeFileSync } = await import('node:fs');
  writeFileSync(outFile, JSON.stringify(all));
  const total = all.reduce((s, p) => s + p.rows.reduce((a, r) => a + r.spend, 0), 0);
  console.log(`Збережено ${all.length} періодів (${all[0].from} – ${all.at(-1).to}, ${total.toFixed(2)} PLN) у ${outFile}.`);
  if (unmatched) console.warn(`${unmatched} рядків не знайшли оголошення в Pinterest.`);
  process.exit(0);
}

initializeApp({ projectId: 'demo-koshman' });
const db = getFirestore();
const dashRef = db.collection('cabinetDashboards').doc(dashboardId);
if (!(await dashRef.get()).exists) {
  console.error(`Дашборда ${dashboardId} немає.`);
  process.exit(1);
}
const batch = db.batch();
for (const p of all) batch.set(dashRef.collection('periods').doc(`${p.from}_${p.to}`), p);
const dataStart = all.find((p) => p.rows.length)?.from;
if (dataStart) batch.update(dashRef, { dataStart });
await batch.commit();

const spend = all.reduce((s, p) => s + p.rows.reduce((a, r) => a + r.spend, 0), 0);
console.log(`Імпортовано ${all.length} періодів (${all[0].from} – ${all.at(-1).to}), витрати ${spend.toFixed(2)} PLN.`);
if (unmatched) console.warn(`${unmatched} рядків не знайшли оголошення в Pinterest — лишились зі старими назвами.`);
