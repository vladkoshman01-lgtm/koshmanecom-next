import { Metadata } from 'next';
import EtsyFinanceDashboard from '@/components/EtsyFinanceDashboard';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Etsy Фінансовий Дашборд | Koshman Ecom',
  description:
    'Завантажте CSV звіт з Etsy та отримайте фінансову аналітику вашого магазину.',
  alternates: {
    canonical: `${siteUrl}/tools/etsy-finance-dashboard`,
  },
  openGraph: {
    title: 'Etsy Фінансовий Дашборд | Koshman Ecom',
    description:
      'Завантажте CSV звіт з Etsy та отримайте фінансову аналітику вашого магазину.',
    url: `${siteUrl}/tools/etsy-finance-dashboard`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Etsy Фінансовий Дашборд',
      },
    ],
  },
};

export default function EtsyFinanceDashboardPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(239,68,6,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.08),_transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full bg-orange-100 text-brand-orange px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              Etsy
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold text-slate-900">
              Etsy Фінансовий Дашборд
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Завантажте CSV‑звіти з Etsy та отримайте повну фінансову картину вашого магазину.
            </p>
            <p className="mt-4 text-base text-slate-600">
              Дашборд показує, скільки ви реально заробляєте після комісій, реклами та інших витрат,
              а також допомагає знайти сильні товари і слабкі місця у витратах.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="rounded-full border border-slate-200 bg-white px-4 py-2">
                Загальний дохід і чистий прибуток за місяць
              </li>
              <li className="rounded-full border border-slate-200 bg-white px-4 py-2">
                Комісії Etsy, витрати на рекламу та інші списання
              </li>
              <li className="rounded-full border border-slate-200 bg-white px-4 py-2">
                Топ‑товари за доходом і кількістю продажів
              </li>
              <li className="rounded-full border border-slate-200 bg-white px-4 py-2">
                Динаміка доходу по місяцях
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <EtsyFinanceDashboard />
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              Хочете зрозуміти реальну картину фінансів магазину?
            </h3>
            <p className="mt-3 text-slate-600">
              Отримайте короткий розбір ваших показників та рекомендації від команди Koshman Ecom.
            </p>
            <a
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 text-white font-bold shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-700"
            >
              Отримати консультацію
            </a>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Як працює дашборд</h2>
              <p className="mt-3 text-slate-600">
                Ви завантажуєте CSV‑файли з Etsy, а дашборд поєднує замовлення, товари та комісії в
                єдину картину. Дані не передаються на сервер — все рахується у браузері.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-orange" />
                  Отримуєте дохід, прибуток, комісії та інші списання.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-orange" />
                  Бачите окремо рекламу, повернення та коригування.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-orange" />
                  Аналізуєте топ‑товари та динаміку продажів по місяцях.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
              <div className="mt-6 space-y-5 text-sm text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-900">Які CSV потрібні для аналітики?</h3>
                  <p className="mt-2 text-slate-600">
                    Рекомендуємо EtsySoldOrders, EtsySoldOrderItems та Etsy Statement. Так ми
                    поєднуємо замовлення, товари та комісії.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Чи потрібно підключати Etsy API?</h3>
                  <p className="mt-2 text-slate-600">
                    Ні. Усі розрахунки виконуються локально у браузері після завантаження файлів.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Чи враховується реклама?</h3>
                  <p className="mt-2 text-slate-600">
                    Так, Etsy Ads та інші маркетингові списання показуються окремо від комісій.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Чому цифри можуть відрізнятися від Monthly Statement?</h3>
                  <p className="mt-2 text-slate-600">
                    Впливає період вибірки, повернення або додаткові списання. Дашборд дає
                    деталізацію, щоб бачити причину.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Яку фінансову аналітику ви отримуєте
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Дашборд показує реальний дохід, чистий прибуток, комісії Etsy, рекламу, повернення та
              інші списання. Ви бачите, які товари приносять найбільше грошей, як змінюється дохід
              по місяцях і де виникають зайві витрати. Це допомагає приймати рішення швидше та
              точніше.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
