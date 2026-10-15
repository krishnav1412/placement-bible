import { useMemo, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import type { AppStatus } from '../data/types';
import { CHANNELS, preInterviewChecklist, RESUME_VARIANTS, STATUSES, TIERS } from '../data/applications';
import { type Application, newId, useColl, write } from '../lib/store';
import { fmtDate, todayISO } from '../lib/hooks';
import { Chips, cx, Empty, Field, PageTitle, Sheet } from '../components/ui';

export const STATUS_TONE: Record<AppStatus, string> = {
  Applied: 'bg-accent-soft text-accent',
  OA: 'bg-warn-soft text-warn',
  Interview: 'bg-warn-soft text-warn',
  Offer: 'bg-done-soft text-done',
  Rejected: 'bg-bad-soft text-bad',
  'No Response': 'bg-raised text-muted',
};

const reached = (a: Application, ...s: AppStatus[]) => s.includes(a.status) || (a.history ?? []).some((h) => s.includes(h.s));

export function Applications({ ready }: { ready: boolean }) {
  const apps = useColl('apps');
  const [filter, setFilter] = useState<AppStatus | 'All'>('All');
  const [editing, setEditing] = useState<string | null>(null); // id, or 'new'

  const list = useMemo(
    () => Object.entries(apps).sort(([, a], [, b]) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.company.localeCompare(b.company))),
    [apps],
  );
  const shown = filter === 'All' ? list : list.filter(([, a]) => a.status === filter);
  const total = list.length;
  const heard = list.filter(([, a]) => reached(a, 'OA', 'Interview', 'Offer', 'Rejected')).length;
  const interviews = list.filter(([, a]) => reached(a, 'Interview', 'Offer')).length;
  const offers = list.filter(([, a]) => reached(a, 'Offer')).length;
  const rate = (n: number) => (total ? `${Math.round((n / total) * 100)}%` : '–');

  return (
    <div>
      <PageTitle title="Applications">Log every application. The rates below tell you whether the resume and profile work is paying off.</PageTitle>

      <section className="mb-5 grid grid-cols-3 divide-x divide-line rounded-2xl bg-surface py-4 text-center">
        <Stat value={total} label="Applied" />
        <Stat value={heard} label={`Heard back · ${rate(heard)}`} />
        <Stat value={interviews} label={offers ? `Interviews · ${offers} offer${offers > 1 ? 's' : ''}` : `Interviews · ${rate(interviews)}`} />
      </section>

      <button type="button" className="btn btn-primary mb-5 w-full" disabled={!ready} onClick={() => setEditing('new')}>
        <Plus className="h-5 w-5" /> Add application
      </button>

      {total > 0 && (
        <div className="mb-4">
          <Chips
            value={filter}
            onChange={setFilter}
            options={[{ value: 'All' as const, label: 'All', count: total }, ...STATUSES.map((s) => ({ value: s, label: s, count: list.filter(([, a]) => a.status === s).length }))].filter(
              (o) => o.value === 'All' || o.count > 0 || o.value === filter,
            )}
          />
        </div>
      )}

      {!ready ? (
        <Empty title="Loading your applications…" />
      ) : total === 0 ? (
        <Empty title="No applications yet">Tap “Add application” after you apply somewhere.</Empty>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
          {shown.map(([id, a]) => (
            <li key={id}>
              <button type="button" onClick={() => setEditing(id)} className="flex w-full items-start gap-3 px-4 py-3.5 text-left hover:bg-raised/60 active:bg-raised">
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{a.company || 'Untitled'}</div>
                  <div className="truncate text-sm text-muted">{a.role || '—'}</div>
                  {a.next && <div className="mt-1 truncate text-sm text-accent">Next: {a.next}</div>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className={cx('rounded-full px-2.5 py-0.5 text-xs font-semibold', STATUS_TONE[a.status])}>{a.status}</span>
                  <span className="num font-mono text-xs text-faint">{fmtDate(a.date)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {editing && <Editor id={editing === 'new' ? null : editing} app={editing === 'new' ? null : apps[editing]} onClose={() => setEditing(null)} />}
    </div>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="px-2">
      <div className="num font-display text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

const blank = (): Application => ({
  company: '', role: '', tier: '', channel: 'Company site', date: todayISO(), resume: 'Analyst', contact: '', status: 'Applied', next: '', notes: '', history: [], checklist: {},
});

function Editor({ id, app, onClose }: { id: string | null; app: Application | null; onClose: () => void }) {
  const [d, setD] = useState<Application>(() => ({ ...blank(), ...(app ?? {}) }));
  const [showChecklist, setShowChecklist] = useState(app?.status === 'OA' || app?.status === 'Interview');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (p: Partial<Application>) => setD((x) => ({ ...x, ...p }));
  const ticked = preInterviewChecklist.filter((c) => d.checklist?.[c.id]).length;

  const save = () => {
    const history = [...(d.history ?? [])];
    if (!app || app.status !== d.status) history.push({ s: d.status, d: todayISO() });
    write('apps', id ?? newId('app'), { ...d, company: d.company.trim(), role: d.role.trim(), history });
    onClose();
  };

  return (
    <Sheet
      open
      onClose={onClose}
      title={app ? d.company || 'Application' : 'New application'}
      footer={
        <>
          {app && (
            <button
              type="button"
              className={cx('btn', confirmDelete ? 'bg-bad text-surface' : 'btn-quiet text-bad')}
              onClick={() => {
                if (!confirmDelete) return setConfirmDelete(true);
                write('apps', id!, null);
                onClose();
              }}
            >
              {confirmDelete ? 'Tap to delete' : 'Delete'}
            </button>
          )}
          <button type="button" className="btn btn-primary flex-1" disabled={!d.company.trim()} onClick={save}>
            Save
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Company">
          <input id="app-company" className="field" value={d.company} onChange={(e) => set({ company: e.target.value })} placeholder="e.g. American Express" autoFocus={!app} />
        </Field>
        <Field label="Role">
          <input id="app-role" className="field" value={d.role} onChange={(e) => set({ role: e.target.value })} placeholder="e.g. Analyst – Data Analytics" />
        </Field>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-muted">Status</span>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set({ status: s })}
                className={cx('h-9 rounded-full px-3.5 text-sm font-semibold transition-colors', d.status === s ? STATUS_TONE[s] + ' ring-2 ring-current' : 'bg-raised text-muted')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Applied on">
            <input id="app-date" type="date" className="field" value={d.date} onChange={(e) => set({ date: e.target.value })} />
          </Field>
          <Field label="Tier">
            <select id="app-tier" className="field" value={d.tier} onChange={(e) => set({ tier: e.target.value })}>
              <option value="">—</option>
              {TIERS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Where you applied">
            <select id="app-channel" className="field" value={d.channel} onChange={(e) => set({ channel: e.target.value })}>
              {[...new Set([...CHANNELS, d.channel])].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Resume used">
            <select id="app-resume" className="field" value={d.resume} onChange={(e) => set({ resume: e.target.value })}>
              {[...new Set([...RESUME_VARIANTS, d.resume])].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Referral or contact">
          <input id="app-contact" className="field" value={d.contact} onChange={(e) => set({ contact: e.target.value })} placeholder="Who referred you, when you asked" />
        </Field>
        <Field label="Next step">
          <input id="app-next" className="field" value={d.next} onChange={(e) => set({ next: e.target.value })} placeholder="e.g. OA due Friday, follow up with referrer" />
        </Field>
        <Field label="Notes">
          <textarea id="app-notes" className="area min-h-[90px]" value={d.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="JD keywords, what they asked, how it went" />
        </Field>

        <div className="rounded-2xl bg-raised/60">
          <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left" onClick={() => setShowChecklist((v) => !v)} aria-expanded={showChecklist}>
            <span>
              <span className="block font-semibold">Before the OA or interview</span>
              <span className="num text-sm text-muted">
                {ticked} of {preInterviewChecklist.length} ready
              </span>
            </span>
            <ChevronDown className={cx('h-5 w-5 text-faint transition-transform', showChecklist && 'rotate-180')} />
          </button>
          {showChecklist && (
            <ul className="flex flex-col gap-1 px-4 pb-3">
              {preInterviewChecklist.map((c) => (
                <li key={c.id}>
                  <label className="flex cursor-pointer items-start gap-3 py-1.5">
                    <input
                      id={`chk-${c.id}`}
                      type="checkbox"
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[rgb(var(--done))]"
                      checked={!!d.checklist?.[c.id]}
                      onChange={() => set({ checklist: { ...d.checklist, [c.id]: !d.checklist?.[c.id] } })}
                    />
                    <span className={cx('text-sm', d.checklist?.[c.id] && 'text-faint line-through')}>{c.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Sheet>
  );
}
