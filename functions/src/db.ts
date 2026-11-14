import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let db: Firestore | null = null;

/** Лінива ініціалізація: функції, яким база не потрібна, її не чіпають. */
export function firestore(): Firestore {
  if (!db) {
    if (getApps().length === 0) initializeApp();
    db = getFirestore();
  }
  return db;
}
