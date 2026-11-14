/**
 * AES-256-GCM для токенів джерел у Firestore. Навіть якщо хтось отримає
 * доступ до бази, без ключа з Secret Manager токени не прочитати.
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { cabinetEncryptionKey } from '../secrets';

function key() {
  const k = Buffer.from(cabinetEncryptionKey.value(), 'base64');
  if (k.length !== 32) throw new Error('CABINET_ENCRYPTION_KEY must be 32 bytes in base64');
  return k;
}

export function encrypt(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString('base64')).join('.');
}

export function decrypt(sealed: string): string {
  const [iv, tag, data] = sealed.split('.').map((p) => Buffer.from(p, 'base64'));
  const decipher = createDecipheriv('aes-256-gcm', key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}
