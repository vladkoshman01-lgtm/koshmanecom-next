import { localeFromPath, localePath } from './i18n';

/**
 * Перехід до форми заявки.
 *
 * У макеті кнопка хедера веде на якір `#lead` — форму внизу сторінки.
 * Якщо на цій сторінці форми немає (службові сторінки, інструменти),
 * відправляємо людину на «Контакти», щоб кнопка ніколи не була мертвою.
 *
 * Прокручуємо вручну: `behavior: 'smooth'` у Chrome на цій сторінці
 * скасовується (та сама історія, що й у каруселі кейсів), тож анімуємо самі.
 */

export function scrollToLead(fallback: (href: string) => void) {
  const target = document.getElementById('lead');
  if (!target) {
    // «Контакти» тією ж мовою, якою людина зараз дивиться сайт
    fallback(localePath(localeFromPath(window.location.pathname), '/contacts'));
    return;
  }

  const header = document.querySelector('header');
  const offset = header ? header.getBoundingClientRect().height : 0;
  const from = window.scrollY;
  const to = Math.max(0, from + target.getBoundingClientRect().top - offset);
  const duration = 650;
  const start = performance.now();

  const focusName = () => {
    target.querySelector<HTMLInputElement>('input')?.focus({ preventScroll: true });
  };

  // Поважаємо системне налаштування «менше руху»
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, to);
    focusName();
    return;
  }

  // Якщо кадри не йдуть (вкладка у фоні — браузер присипляє rAF), просто
  // переставляємо сторінку, щоб кнопка спрацювала в будь-якому разі.
  let started = false;
  window.setTimeout(() => {
    if (started) return;
    window.scrollTo(0, to);
    focusName();
  }, 300);

  const tick = (now: number) => {
    started = true;
    const p = Math.min(1, (now - start) / duration);
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    window.scrollTo(0, from + (to - from) * eased);
    if (p < 1) {
      requestAnimationFrame(tick);
      return;
    }
    // Підсвічуємо поле імені, щоб одразу можна було друкувати
    focusName();
  };
  requestAnimationFrame(tick);
}
