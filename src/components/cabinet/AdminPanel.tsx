'use client';

/**
 * Адмінка кабінету: клієнти, їхні люди, дашборди, адміни, журнал дій.
 * Усі зміни йдуть через функцію `cabinet`, яка сама перевіряє, що ви адмін.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Eye, History, Pencil, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import { cabinetCall, errorMessage, type AdminOverview, type AuditEntry, type Me, type SourceAccount } from '@/lib/cabinet/api';
import { Spinner } from './CabinetShell';
import PlatformLogo from './PlatformLogo';

const inputClass =
  'h-11 w-full border-[1.5px] border-[#D9D9D9] bg-white px-3 text-[0.9375rem] text-[#141414] outline-none focus:border-[#141414]';
const primaryBtn =
  'inline-flex h-11 items-center justify-center gap-2 bg-brand-orange px-5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60';
const secondaryBtn =
  'inline-flex h-11 items-center justify-center gap-2 border-[1.5px] border-[#141414] px-4 text-sm font-semibold text-[#141414] transition hover:bg-[#F4F4F4] disabled:opacity-60';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Client = AdminOverview['clients'][number];
type Dashboard = AdminOverview['dashboards'][number];

function Card({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="border-[1.5px] border-[#E5E5E5] bg-white p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold text-[#141414]">{title}</h2>
        <div className="ml-auto flex gap-2">{actions}</div>
      </div>
      {children}
    </section>
  );
}

function EmailChips({ emails, onChange, placeholder }: { emails: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const add = () => {
    const email = draft.trim().toLowerCase();
    if (!email) return;
    if (!EMAIL_RE.test(email)) return setError('Схоже, в email помилка.');
    if (!emails.includes(email)) onChange([...emails, email]);
    setDraft('');
    setError(null);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {emails.map((e) => (
          <span key={e} className="inline-flex items-center gap-1.5 border border-[#D9D9D9] bg-[#F4F4F4] py-1 pl-3 pr-1.5 text-sm text-[#141414]">
            {e}
            <button type="button" aria-label={`Прибрати ${e}`} onClick={() => onChange(emails.filter((x) => x !== e))} className="p-0.5 hover:text-brand-orange">
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </span>
        ))}
        {emails.length === 0 ? <span className="text-sm text-[#8A8A8A]">Поки нікого.</span> : null}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          value={draft}
          maxLength={200}
          placeholder={placeholder}
          onChange={(e) => {
            setDraft(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          className={inputClass}
        />
        <button type="button" onClick={add} className={secondaryBtn}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Додати
        </button>
      </div>
      {error ? <p className="mt-2 text-sm font-semibold text-brand-orange">{error}</p> : null}
    </div>
  );
}

function DashboardForm({
  types,
  clientId,
  initial,
  onSaved,
  onCancel,
}: {
  types: AdminOverview['types'];
  clientId: string;
  initial?: Dashboard;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState(initial?.type ?? types[0]?.id ?? '');
  const typeDef = types.find((t) => t.id === type);
  const [source, setSource] = useState(initial?.source ?? typeDef?.sources[0]?.id ?? '');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [config, setConfig] = useState<Record<string, string>>(initial?.config ?? {});
  const [apiKey, setApiKey] = useState('');
  const keyBased = source === 'openai';
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeDef && !typeDef.sources.some((s) => s.id === source)) setSource(typeDef.sources[0]?.id ?? '');
  }, [typeDef, source]);

  // Акаунти з джерела — щоб вибрати зі списку, а не вводити ID вручну
  const [accounts, setAccounts] = useState<SourceAccount[] | null>(null);
  const [accountsError, setAccountsError] = useState<string | null>(null);
  useEffect(() => {
    if (source !== 'pinterest' && source !== 'windsor') return;
    let cancelled = false;
    cabinetCall<{ accounts: SourceAccount[] }>('sourceAccounts', { type, source })
      .then((r) => {
        if (cancelled) return;
        setAccounts(r.accounts);
        setAccountsError(null);
      })
      .catch((e) => !cancelled && setAccountsError(errorMessage(e)));
    return () => {
      cancelled = true;
    };
  }, [type, source]);
  const pickAccounts = (source === 'pinterest' || source === 'windsor') && accounts && accounts.length > 0;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await cabinetCall('saveDashboard', { id: initial?.id, clientId, type, source, title, config, ...(apiKey ? { apiKey } : {}) });
      onSaved();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="mt-4 grid gap-4 border-[1.5px] border-dashed border-[#D9D9D9] p-4 md:grid-cols-2">
      <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
        Тип звіту
        <select value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
          {types.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
        Джерело даних
        <select value={source} onChange={(e) => setSource(e.target.value)} className={inputClass}>
          {typeDef?.sources.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414] md:col-span-2">
        Назва для клієнта
        <input value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} placeholder={typeDef?.label} className={inputClass} />
      </label>
      {keyBased ? (
        <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414] md:col-span-2">
          API-ключ ChatGPT Ads
          <input
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={apiKey}
            maxLength={500}
            onChange={(e) => setApiKey(e.target.value.trim())}
            placeholder={initial?.keyHint ? `Збережено ••••${initial.keyHint} — залиште порожнім, щоб не міняти` : 'Вставте ключ з ChatGPT Ads Manager'}
            className={inputClass}
          />
          <span className="font-normal text-[#8A8A8A]">
            Ключ зберігається зашифрованим і більше ніде не показується. Акаунт і валюту кабінет визначить сам.
            {initial?.config.accountName ? ` Зараз підключено: ${initial.config.accountName}.` : ''}
          </span>
        </label>
      ) : null}
      {typeDef?.config.filter((f) => !(keyBased && (f.key === 'accountId' || f.key === 'currency'))).map((f) =>
        f.key === 'accountId' && pickAccounts ? (
          <label key={f.key} className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
            {f.label}
            <select
              value={config.accountId ?? ''}
              onChange={(e) => {
                const acc = accounts!.find((a) => a.id === e.target.value);
                setConfig({ ...config, accountId: e.target.value, ...(acc?.currency ? { currency: acc.currency } : {}) });
              }}
              className={inputClass}
            >
              <option value="">Виберіть акаунт</option>
              {accounts!.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} · {a.id}
                  {a.currency ? ` · ${a.currency}` : ''}
                </option>
              ))}
            </select>
          </label>
        ) : (
        <label key={f.key} className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
          {f.label}
          {f.required ? '' : <span className="font-normal text-[#8A8A8A]">необов&apos;язково</span>}
          <input
            value={config[f.key] ?? ''}
            maxLength={200}
            onChange={(e) => setConfig({ ...config, [f.key]: e.target.value })}
            placeholder={f.key === 'currency' ? 'USD' : ''}
            className={inputClass}
          />
        </label>
        ),
      )}
      {accountsError ? <p className="text-sm text-[#5A5A5A] md:col-span-2">Не вдалося отримати список акаунтів: {accountsError} Введіть ID вручну.</p> : null}
      {source === 'pinterest' || source === 'windsor' || source === 'openai' ? (
        <p className="text-xs text-[#8A8A8A] md:col-span-2">Після збереження кабінет одразу забере всю історію, яку пам&apos;ятає джерело.</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 md:col-span-2">
        <button type="submit" disabled={saving} className={primaryBtn}>
          {saving ? 'Зберігаємо…' : initial ? 'Зберегти' : 'Додати дашборд'}
        </button>
        <button type="button" onClick={onCancel} className="text-sm font-semibold text-[#5A5A5A] hover:text-[#141414]">
          Скасувати
        </button>
        {error ? <span className="text-sm font-semibold text-brand-orange">{error}</span> : null}
      </div>
    </form>
  );
}

function ClientEditor({
  client,
  dashboards,
  types,
  onChanged,
  onDeleted,
}: {
  client: Client | null;
  dashboards: Dashboard[];
  types: AdminOverview['types'];
  onChanged: (selectId?: string) => void;
  onDeleted: () => void;
}) {
  const [name, setName] = useState(client?.name ?? '');
  const [members, setMembers] = useState<string[]>(client?.members ?? []);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | 'new' | null>(null);

  const dirty = !client || name !== client.name || members.join() !== client.members.join();

  const save = async () => {
    if (!name.trim()) return setMessage('Вкажіть назву клієнта.');
    setSaving(true);
    setMessage(null);
    try {
      const r = await cabinetCall<{ id: string }>('saveClient', { id: client?.id, name, members });
      setMessage('Збережено.');
      onChanged(r.id);
    } catch (e) {
      setMessage(errorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!client) return;
    if (!window.confirm(`Видалити клієнта «${client.name}» і всі його дашборди? Люди клієнта одразу втратять доступ.`)) return;
    try {
      await cabinetCall('deleteClient', { id: client.id });
      onDeleted();
    } catch (e) {
      setMessage(errorMessage(e));
    }
  };

  const [syncingId, setSyncingId] = useState<string | null>(null);
  const syncDashboard = async (d: Dashboard) => {
    setSyncingId(d.id);
    try {
      await cabinetCall('syncNow', { id: d.id });
    } catch (e) {
      setMessage(errorMessage(e));
    } finally {
      setSyncingId(null);
      onChanged(client?.id);
    }
  };

  const importHistory = async (d: Dashboard, file: File) => {
    setMessage(null);
    try {
      const periods = JSON.parse(await file.text());
      const r = await cabinetCall<{ written: number; replacedDays: number }>('importHistory', { id: d.id, periods });
      setMessage(`Історію імпортовано: ${r.written} періодів. Свіжі дні узгоджено з джерелом.`);
      onChanged(client?.id);
    } catch (e) {
      setMessage(e instanceof SyntaxError ? 'Файл пошкоджений — це не JSON.' : errorMessage(e));
    }
  };

  const removeDashboard = async (d: Dashboard) => {
    if (!window.confirm(`Видалити дашборд «${d.title}»?`)) return;
    try {
      await cabinetCall('deleteDashboard', { id: d.id });
      onChanged(client?.id);
    } catch (e) {
      setMessage(errorMessage(e));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card
        title={client ? client.name : 'Новий клієнт'}
        actions={
          client ? (
            <>
              <Link href={`/cabinet?as=${encodeURIComponent(client.id)}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141414] hover:text-brand-orange">
                <Eye className="h-4 w-4" aria-hidden="true" /> Як бачить клієнт
              </Link>
              <button type="button" onClick={remove} className="ml-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5A5A5A] hover:text-brand-orange">
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Видалити
              </button>
            </>
          ) : null
        }
      >
        <label className="flex flex-col gap-1.5 text-[0.8125rem] font-semibold text-[#141414]">
          Назва
          <input value={name} maxLength={120} onChange={(e) => setName(e.target.value)} placeholder="Назва магазину чи компанії" className={inputClass} />
        </label>
        <div className="mt-5 text-[0.8125rem] font-semibold text-[#141414]">Хто має доступ</div>
        <p className="mb-3 mt-1 text-sm text-[#5A5A5A]">
          Ці люди зможуть увійти через Google або посилання на email і побачать лише звіти цього клієнта.
        </p>
        <EmailChips emails={members} onChange={setMembers} placeholder="email людини клієнта" />
        <div className="mt-5 flex items-center gap-3">
          <button type="button" onClick={save} disabled={saving || !dirty} className={primaryBtn}>
            {saving ? 'Зберігаємо…' : client ? 'Зберегти зміни' : 'Створити клієнта'}
          </button>
          {message ? <span className="text-sm font-semibold text-[#141414]">{message}</span> : null}
        </div>
      </Card>

      {client ? (
        <Card
          title="Дашборди"
          actions={
            editing === null ? (
              <button type="button" onClick={() => setEditing('new')} className={secondaryBtn}>
                <Plus className="h-4 w-4" aria-hidden="true" /> Додати дашборд
              </button>
            ) : null
          }
        >
          {dashboards.length === 0 && editing !== 'new' ? (
            <p className="text-sm text-[#5A5A5A]">Дашбордів ще немає.</p>
          ) : null}
          <ul className="divide-y divide-[#F0F0F0]">
            {dashboards.map((d) => (
              <li key={d.id} className="py-3">
                <div className="flex flex-wrap items-center gap-3">
                  <PlatformLogo type={d.type} size="sm" />
                  <div className="min-w-0">
                    <div className="font-semibold text-[#141414]">{d.title}</div>
                    <div className="text-xs text-[#8A8A8A]">
                      {d.typeLabel} · {d.sourceLabel}
                      {d.config.accountName ? ` · ${d.config.accountName}` : d.config.accountId ? ` · акаунт ${d.config.accountId}` : ''}
                      {d.keyHint ? ` · ключ ••••${d.keyHint}` : ''}
                      {d.dataStart ? ` · дані з ${d.dataStart.split('-').reverse().join('.')}` : ''}
                    </div>
                    {d.lastSyncError ? (
                      <div className="mt-0.5 text-xs font-semibold text-brand-orange">Синхронізація не вдалась: {d.lastSyncError}</div>
                    ) : d.lastSyncAt ? (
                      <div className="mt-0.5 text-xs text-[#8A8A8A]">
                        Оновлено {new Date(d.lastSyncAt).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' })}
                      </div>
                    ) : null}
                  </div>
                  <div className="ml-auto flex items-center gap-3 text-[#5A5A5A]">
                    <Link href={`/cabinet/d?id=${encodeURIComponent(d.id)}`} aria-label={`Відкрити ${d.title}`} className="hover:text-brand-orange">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {d.source === 'pinterest' || d.source === 'windsor' || d.source === 'openai' ? (
                      <button
                        type="button"
                        aria-label={`Оновити дані ${d.title}`}
                        title="Забрати свіжі дані з джерела"
                        onClick={() => void syncDashboard(d)}
                        className="hover:text-brand-orange"
                      >
                        <RefreshCw className={`h-4 w-4 ${syncingId === d.id ? 'animate-spin' : ''}`} aria-hidden="true" />
                      </button>
                    ) : null}
                    <label title="Імпорт історії зі старого звіту (JSON)" className="cursor-pointer hover:text-brand-orange">
                      <History className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">Імпорт історії для {d.title}</span>
                      <input
                        type="file"
                        accept="application/json,.json"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          e.target.value = '';
                          if (file) void importHistory(d, file);
                        }}
                      />
                    </label>
                    <button type="button" aria-label={`Змінити ${d.title}`} onClick={() => setEditing(d.id)} className="hover:text-brand-orange">
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button type="button" aria-label={`Видалити ${d.title}`} onClick={() => void removeDashboard(d)} className="hover:text-brand-orange">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {editing === d.id ? (
                  <DashboardForm
                    types={types}
                    clientId={client.id}
                    initial={d}
                    onCancel={() => setEditing(null)}
                    onSaved={() => {
                      setEditing(null);
                      onChanged(client.id);
                    }}
                  />
                ) : null}
              </li>
            ))}
          </ul>
          {editing === 'new' ? (
            <DashboardForm
              types={types}
              clientId={client.id}
              onCancel={() => setEditing(null)}
              onSaved={() => {
                setEditing(null);
                onChanged(client.id);
              }}
            />
          ) : null}
        </Card>
      ) : null}
    </div>
  );
}


type PinterestStatus = {
  connected: boolean;
  manualToken: boolean;
  connectedBy?: string | null;
  accessExpiresAt?: string | null;
  refreshExpiresAt?: string | null;
  lastRefreshAt?: string | null;
  lastError?: string | null;
};

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' }) : '—';

/** Підключення джерел, яким потрібен вхід: зараз — Pinterest через OAuth. */
function Connections() {
  const [status, setStatus] = useState<PinterestStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Повернення зі сторінки дозволу Pinterest
    const result = new URLSearchParams(window.location.search).get('pinterest');
    const texts: Record<string, string> = {
      connected: 'Pinterest підключено. Далі кабінет оновлюватиме ключ сам.',
      denied: 'Доступ у Pinterest не надано.',
      error: 'Pinterest не прийняв підключення. Спробуйте ще раз.',
    };
    if (result) {
      window.history.replaceState(null, '', window.location.pathname);
      void Promise.resolve().then(() => setMessage(texts[result] ?? null));
    }
    cabinetCall<{ pinterest: PinterestStatus }>('connections')
      .then((r) => setStatus(r.pinterest))
      .catch((e) => setMessage(errorMessage(e)));
  }, []);

  const connect = async () => {
    setBusy(true);
    try {
      const { url } = await cabinetCall<{ url: string }>('connectPinterest', { origin: window.location.origin });
      window.location.assign(url);
    } catch (e) {
      setMessage(errorMessage(e));
      setBusy(false);
    }
  };

  return (
    <Card
      title="Підключення"
      actions={
        <button type="button" onClick={() => void connect()} disabled={busy} className={status?.connected ? secondaryBtn : primaryBtn}>
          {busy ? 'Відкриваємо Pinterest…' : status?.connected ? 'Перепідключити Pinterest' : 'Підключити Pinterest'}
        </button>
      }
    >
      {status === null ? (
        <p className="text-sm text-[#5A5A5A]">Перевіряємо…</p>
      ) : status.connected ? (
        <div className="text-sm text-[#141414]">
          <p>
            <span className="font-semibold">Pinterest підключено</span>
            {status.connectedBy ? ` (${status.connectedBy})` : ''}. Ключ оновлюється автоматично.
          </p>
          <p className="mt-1 text-xs text-[#8A8A8A]">
            Ключ доступу дійсний до {fmtDate(status.accessExpiresAt)} · ключ оновлення — до {fmtDate(status.refreshExpiresAt)} · останнє
            оновлення {fmtDate(status.lastRefreshAt)}
          </p>
          {status.lastError ? <p className="mt-1 text-xs font-semibold text-brand-orange">Останнє оновлення не вдалось: {status.lastError}</p> : null}
        </div>
      ) : (
        <p className="text-sm text-[#5A5A5A]">
          {status.manualToken
            ? 'Зараз працює тимчасовий ключ, введений вручну, — він скоро протухне. Підключіть Pinterest, щоб ключ оновлювався сам.'
            : 'Pinterest не підключено — дашборди Pinterest не оновлюються.'}
        </p>
      )}
      {message ? <p className="mt-3 text-sm font-semibold text-[#141414]">{message}</p> : null}
    </Card>
  );
}

const AUDIT_LABELS: Record<string, string> = {
  create_client: 'створив клієнта',
  update_client: 'змінив клієнта',
  delete_client: 'видалив клієнта',
  create_dashboard: 'додав дашборд',
  update_dashboard: 'змінив дашборд',
  delete_dashboard: 'видалив дашборд',
  add_admin: 'додав адміна',
  remove_admin: 'прибрав адміна',
  view_dashboard: 'відкрив дашборд',
  sync_dashboard: 'оновив дані дашборда',
  connect_pinterest_start: 'почав підключення Pinterest',
  connect_pinterest_done: 'підключив Pinterest',
  import_history: 'імпортував історію',
};

function AdminsAndAudit({ me, admins, onChanged }: { me: Me; admins: string[]; onChanged: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [audit, setAudit] = useState<AuditEntry[] | null>(null);

  const setAdmins = async (next: string[]) => {
    setError(null);
    const added = next.filter((e) => !admins.includes(e));
    const removed = admins.filter((e) => !next.includes(e));
    if (removed.length && !window.confirm(`Прибрати адміна ${removed.join(', ')}?`)) return;
    try {
      for (const email of added) await cabinetCall('setAdmin', { email, admin: true });
      for (const email of removed) await cabinetCall('setAdmin', { email, admin: false });
      onChanged();
    } catch (e) {
      setError(errorMessage(e));
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Адміни">
        <p className="mb-3 text-sm text-[#5A5A5A]">Бачать усіх клієнтів і можуть усе змінювати. Себе прибрати не можна.</p>
        <EmailChips emails={admins} onChange={setAdmins} placeholder="email колеги" />
        {error ? <p className="mt-2 text-sm font-semibold text-brand-orange">{error}</p> : null}
        <p className="mt-3 text-xs text-[#8A8A8A]">Ви: {me.email}</p>
      </Card>
      <Card
        title="Журнал дій"
        actions={
          <button
            type="button"
            className={secondaryBtn}
            onClick={() =>
              cabinetCall<{ entries: AuditEntry[] }>('auditLog')
                .then((r) => setAudit(r.entries))
                .catch((e) => setError(errorMessage(e)))
            }
          >
            {audit ? 'Оновити' : 'Показати'}
          </button>
        }
      >
        {audit === null ? (
          <p className="text-sm text-[#5A5A5A]">Хто що змінював в адмінці і хто з клієнтів відкривав звіти.</p>
        ) : audit.length === 0 ? (
          <p className="text-sm text-[#5A5A5A]">Записів поки немає.</p>
        ) : (
          <ul className="max-h-[22rem] divide-y divide-[#F0F0F0] overflow-y-auto text-sm">
            {audit.map((a, i) => (
              <li key={i} className="py-2">
                <span className="font-semibold text-[#141414]">{a.email}</span> {AUDIT_LABELS[a.action] ?? a.action}
                <span className="block text-xs text-[#8A8A8A]">
                  {a.at ? new Date(a.at).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                  {a.target ? ` · ${a.target}` : ''}
                  {a.details?.keyChanged ? ' · змінено ключ' : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

export default function AdminPanel({ me }: { me: Me }) {
  const router = useRouter();
  // Клієнт міг потрапити сюди, увійшовши з вкладки, де була адмінка, — ведемо до його звітів
  useEffect(() => {
    if (!me.isAdmin) router.replace('/cabinet');
  }, [me.isAdmin, router]);
  const [data, setData] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | 'new' | null>(null);

  const reload = useCallback(
    (selectId?: string) =>
      cabinetCall<AdminOverview>('adminOverview')
        .then((overview) => {
          setData(overview);
          setSelected((current) => selectId ?? (current && current !== 'new' ? current : overview.clients[0]?.id ?? 'new'));
        })
        .catch((e) => setError(errorMessage(e))),
    [],
  );

  useEffect(() => {
    if (me.isAdmin) void reload();
  }, [me.isAdmin, reload]);

  const client = useMemo(() => data?.clients.find((c) => c.id === selected) ?? null, [data, selected]);
  const clientDashboards = useMemo(() => data?.dashboards.filter((d) => d.clientId === selected) ?? [], [data, selected]);

  if (!me.isAdmin) return <Spinner label="Відкриваємо ваші звіти…" />;
  if (error) return <p className="py-16 text-center font-semibold text-[#141414]">{error}</p>;
  if (!data) return <Spinner />;

  return (
    <div className="py-8 md:py-10">
      <h1 className="text-[1.75rem] font-bold text-[#141414]">Адмінка</h1>
      <div className="mt-6">
        <Connections />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <nav aria-label="Клієнти" className="border-[1.5px] border-[#E5E5E5] bg-white p-3 lg:self-start">
          <div className="px-2 pb-2 text-xs font-semibold text-[#8A8A8A]">Клієнти · {data.clients.length}</div>
          <ul className="flex flex-col">
            {data.clients.map((c) => {
              const count = data.dashboards.filter((d) => d.clientId === c.id).length;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(c.id)}
                    aria-current={selected === c.id}
                    className={`flex w-full items-center gap-2 px-2 py-2 text-left text-sm transition ${
                      selected === c.id ? 'bg-[#FDE3D8] font-semibold text-[#141414]' : 'text-[#141414] hover:bg-[#F4F4F4]'
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-[#8A8A8A]">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => setSelected('new')}
            className="mt-2 flex w-full items-center gap-2 px-2 py-2 text-sm font-semibold text-brand-orange hover:bg-[#F4F4F4]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" /> Новий клієнт
          </button>
        </nav>
        <ClientEditor
          key={selected ?? 'none'}
          client={selected === 'new' ? null : client}
          dashboards={clientDashboards}
          types={data.types}
          onChanged={(id) => void reload(id)}
          onDeleted={() => {
            setSelected(null);
            void reload();
          }}
        />
      </div>
      <div className="mt-6">
        <AdminsAndAudit me={me} admins={data.admins} onChanged={() => void reload()} />
      </div>
    </div>
  );
}
