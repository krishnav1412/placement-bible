import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import type { Project, ProjectStatus } from '../data/types';
import { profileGroups } from '../data/profile';
import { projects } from '../data/projects';
import { taskById } from '../data/roadmap';
import { connectGist, disconnectGist, exportAll, gistConnected, patch, syncNow, toggleCheck, useColl, useSync } from '../lib/store';
import { useAutosave } from '../lib/hooks';
import { Bar, Check, cx, PageTitle, Segmented } from '../components/ui';

export function Profile({ ready }: { ready: boolean }) {
  const [tab, setTab] = useState<'checklists' | 'projects'>('checklists');
  return (
    <div>
      <PageTitle title="Profile">What “done” looks like for your resume, LinkedIn, GitHub and portfolio, plus your projects.</PageTitle>
      <div className="mb-5">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'checklists', label: 'Checklists' },
            { value: 'projects', label: 'Projects' },
          ]}
        />
      </div>
      {tab === 'checklists' ? <Checklists ready={ready} /> : <Projects ready={ready} />}
      <DataPanel />
    </div>
  );
}

function Checklists({ ready }: { ready: boolean }) {
  const checks = useColl('checks');
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="flex flex-col gap-3">
      {profileGroups.map((g) => {
        const done = g.items.filter((i) => checks[i.id]?.done).length;
        const isOpen = open === g.id;
        return (
          <li key={g.id} className="overflow-hidden rounded-2xl bg-surface">
            <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left" onClick={() => setOpen(isOpen ? null : g.id)} aria-expanded={isOpen}>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={cx('font-semibold', done === g.items.length && 'text-done')}>{g.title}</span>
                  <span className="num shrink-0 font-mono text-xs text-muted">
                    {done}/{g.items.length}
                  </span>
                </div>
                <Bar value={done / g.items.length} className="mt-2" />
              </div>
              <ChevronDown className={cx('h-5 w-5 shrink-0 text-faint transition-transform', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <ul className="divide-y divide-line border-t border-line">
                {g.items.map((item) => {
                  const d = !!checks[item.id]?.done;
                  return (
                    <li key={item.id} className="flex items-start gap-3 px-4 py-3">
                      <div className="pt-px">
                        <Check checked={d} onToggle={() => toggleCheck(item.id)} disabled={!ready} label={item.title} />
                      </div>
                      <div className="min-w-0">
                        <div className={cx('leading-snug', d && 'text-faint line-through decoration-faint/70')}>{item.title}</div>
                        {item.detail && <div className="mt-0.5 text-sm text-muted">{item.detail}</div>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const STATUS: Record<ProjectStatus, { label: string; tone: string }> = {
  live: { label: 'Live', tone: 'bg-done-soft text-done' },
  shipped: { label: 'Shipped', tone: 'bg-accent-soft text-accent' },
  'in-progress': { label: 'In progress', tone: 'bg-warn-soft text-warn' },
  planned: { label: 'Planned', tone: 'bg-raised text-muted' },
};

function Projects({ ready }: { ready: boolean }) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p) => (
        <ProjectCard key={p.id} p={p} ready={ready} />
      ))}
    </div>
  );
}

function ProjectCard({ p, ready }: { p: Project; ready: boolean }) {
  const prog = useColl('projects')[p.id];
  const checks = useColl('checks');
  const [open, setOpen] = useState(false);
  const status = prog?.status ?? p.status;
  const talk = useAutosave(prog?.talk ?? p.talkingPoints, (v) => patch('projects', p.id, { talk: v }));
  const todo = [...p.upgrades.map((u) => ({ id: u.id, title: u.title })), ...p.roadmapTaskIds.map((id) => ({ id, title: taskById.get(id)?.title ?? id }))];
  const done = todo.filter((t) => checks[t.id]?.done).length;

  return (
    <article className="overflow-hidden rounded-2xl bg-surface">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold">{p.name}</h2>
            <p className="text-sm text-muted">{p.tagline}</p>
          </div>
          <select
            id={`status-${p.id}`}
            aria-label={`${p.name} status`}
            value={status}
            disabled={!ready}
            onChange={(e) => patch('projects', p.id, { status: e.target.value as ProjectStatus })}
            className={cx('h-8 shrink-0 cursor-pointer appearance-none rounded-full border-0 px-3 text-xs font-semibold', STATUS[status].tone)}
          >
            {(Object.keys(STATUS) as ProjectStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS[s].label}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-sm leading-relaxed">{p.summary}</p>
        <p className="mt-2 text-sm text-muted">{p.stack.join(' · ')}</p>
        {(p.repo || p.live) && (
          <div className="mt-3 flex flex-wrap gap-4">
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                <ExternalLink className="h-4 w-4" /> Repo
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                <ExternalLink className="h-4 w-4" /> Live site
              </a>
            )}
          </div>
        )}
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted">To do</span>
            <span className="num font-mono text-xs text-muted">
              {done}/{todo.length}
            </span>
          </div>
          <Bar value={todo.length ? done / todo.length : 0} />
        </div>
      </div>
      <button type="button" className="flex w-full items-center justify-between border-t border-line px-5 py-3 text-sm font-semibold text-accent" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Hide to-do and talking points' : 'Show to-do and talking points'}
        <ChevronDown className={cx('h-5 w-5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="flex flex-col gap-4 border-t border-line px-5 pb-5 pt-4">
          <ul className="flex flex-col">
            {todo.map((t) => {
              const d = !!checks[t.id]?.done;
              return (
                <li key={t.id} className="flex items-start gap-3 py-2.5">
                  <div className="pt-px">
                    <Check checked={d} onToggle={() => toggleCheck(t.id)} disabled={!ready} label={t.title} />
                  </div>
                  <span className={cx('leading-snug', d && 'text-faint line-through decoration-faint/70')}>{t.title}</span>
                </li>
              );
            })}
          </ul>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-muted">Interview talking points</span>
            <textarea id={`talk-${p.id}`} className="area min-h-[160px] text-sm" placeholder="What you'd say in a 2-minute walkthrough" {...talk} />
          </label>
        </div>
      )}
    </article>
  );
}

const TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=gist&description=Placement%20Bible%20sync';

function ago(ms: number | null) {
  if (!ms) return '';
  const s = Math.round((Date.now() - ms) / 1000);
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  return m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
}

function DataPanel() {
  const { mode, gist, gistError, lastSync } = useSync();
  const [token, setToken] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [confirmOff, setConfirmOff] = useState(false);
  const connected = gist !== 'off' || gistConnected();

  return (
    <section id="sync" className="mt-8 rounded-2xl bg-surface p-5">
      <h2 className="font-display text-lg font-semibold">Sync your phone and laptop</h2>

      {mode === 'cloud' ? (
        <p className="mt-1 text-sm text-muted">Saved to your Claude account, so it’s the same on every device.</p>
      ) : connected ? (
        <div className="mt-2 flex flex-col gap-3 text-sm">
          <p className={cx(gist === 'error' ? 'text-bad' : 'text-muted')}>
            {gist === 'error'
              ? gistError
              : gist === 'syncing'
                ? 'Syncing with your GitHub gist…'
                : `Connected. Your progress is kept in a secret gist on your GitHub account. Last synced ${ago(lastSync) || 'just now'}.`}
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-quiet flex-1" disabled={gist === 'syncing'} onClick={() => syncNow()}>
              Sync now
            </button>
            <button
              type="button"
              className={cx('btn flex-1', confirmOff ? 'bg-bad text-surface' : 'btn-quiet')}
              onClick={() => {
                if (!confirmOff) return setConfirmOff(true);
                disconnectGist();
                setConfirmOff(false);
              }}
            >
              {confirmOff ? 'Tap to disconnect' : 'Disconnect'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-4 text-sm">
          <p className="text-muted">Right now your progress is saved on this device only. Do this once on each device (phone and laptop) to keep them in sync:</p>
          <ol className="flex flex-col gap-3">
            <li className="flex gap-3">
              <span className="num grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised font-mono text-xs">1</span>
              <div>
                <a href={TOKEN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-accent">
                  Create a GitHub key <ExternalLink className="h-4 w-4" />
                </a>
                <p className="mt-0.5 text-muted">Leave only the “gist” box ticked, pick an expiry after placements (or none), then tap Generate token and copy it.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="num grid h-6 w-6 shrink-0 place-items-center rounded-full bg-raised font-mono text-xs">2</span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="font-semibold">Paste it here</span>
                <input
                  id="gh-token"
                  type="password"
                  autoComplete="off"
                  className="field"
                  placeholder="ghp_…"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    setErr('');
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!token.trim() || busy}
                  onClick={async () => {
                    setBusy(true);
                    const e = await connectGist(token);
                    setBusy(false);
                    if (e) setErr(e);
                    else setToken('');
                  }}
                >
                  {busy ? 'Connecting…' : 'Connect'}
                </button>
                {err && <p className="text-bad">{err}</p>}
              </div>
            </li>
          </ol>
          <p className="text-xs text-faint">The key stays on this device and can only read and write your gists. Your data goes in a secret gist: it isn’t listed anywhere, but anyone with its exact link could open it. Use the same key on your other device.</p>
        </div>
      )}

      <div className="mt-5 border-t border-line pt-4 text-sm">
        <button
          type="button"
          className="font-semibold text-accent"
          onClick={() => {
            navigator.clipboard
              ?.writeText(exportAll())
              .then(() => setMsg('Copied. Paste it into a note to keep a backup.'))
              .catch(() => setMsg('Your browser blocked copying here.'));
          }}
        >
          Copy a backup of everything
        </button>
        {msg && <p className="mt-1 text-muted">{msg}</p>}
      </div>
    </section>
  );
}
