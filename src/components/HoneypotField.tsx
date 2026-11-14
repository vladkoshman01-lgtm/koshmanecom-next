import { HONEYPOT_NAME } from '@/lib/contact';

/**
 * Пастка для ботів: поле поза екраном, без фокусу з клавіатури і без автозаповнення.
 * Людина його не бачить, а бот, що заповнює всі поля підряд, видає себе.
 */
export default function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Website
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
