import { defineSecret } from 'firebase-functions/params';

/** Усі секрети функцій в одному місці: один секрет не можна оголосити двічі. */
export const pinterestToken = defineSecret('PINTEREST_ACCESS_TOKEN');
export const telegramToken = defineSecret('TELEGRAM_BOT_TOKEN');
export const telegramChat = defineSecret('TELEGRAM_CHAT_ID');
export const windsorToken = defineSecret('WINDSOR_API_KEY');
/** Секрет застосунку Pinterest (developers.pinterest.com → застосунок 1584168) — для OAuth. */
export const pinterestAppSecret = defineSecret('PINTEREST_APP_SECRET');
/** 32 байти в base64: шифрує токени джерел, що лежать у Firestore. */
export const cabinetEncryptionKey = defineSecret('CABINET_ENCRYPTION_KEY');
