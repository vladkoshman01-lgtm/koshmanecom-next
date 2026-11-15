import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let db: Firestore | null = null;

/** Лінива ініціалізація: функції, яким база не потрібна, її не чіпають. */
export function firestore(): Firestore {
  if (!db) {
    // Саме основний застосунок: firebase-functions створює ще й свій службовий
    // (для перевірки входу), тож «хоч один уже є» не означає, що є наш
    if (!getApps().some((app) => app.name === '[DEFAULT]')) initializeApp();
    db = getFirestore();
  }
  return db;
}
