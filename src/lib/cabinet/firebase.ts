/**
 * Firebase для кабінету. Підключається лише на сторінках /cabinet — решта
 * сайту SDK не тягне.
 *
 * У `next dev` з NEXT_PUBLIC_CABINET_EMULATORS=1 усе йде в локальні емулятори
 * (проєкт demo-koshman), у проді — у справжній проєкт.
 */
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions, type Functions } from 'firebase/functions';

const useEmulators = process.env.NEXT_PUBLIC_CABINET_EMULATORS === '1';

/** Без конфігу Firebase (прод до запуску кабінету) показуємо заглушку замість падіння. */
export const cabinetConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

let auth: Auth | null = null;
let functions: Functions | null = null;

function app(): FirebaseApp {
  if (getApps().length) return getApp();
  return initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export function cabinetAuth(): Auth {
  if (!auth) {
    auth = getAuth(app());
    auth.languageCode = 'uk';
    if (useEmulators) connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  }
  return auth;
}

export function cabinetFunctions(): Functions {
  if (!functions) {
    functions = getFunctions(app(), 'us-central1');
    if (useEmulators) connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  }
  return functions;
}
