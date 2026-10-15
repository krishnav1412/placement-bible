import { useMemo, useState } from 'react';
import { ExternalLink, Search, X } from 'lucide-react';
import { moduleById, modules, phases, tasks } from '../data/roadmap';
import { resources } from '../data/resources';
import type { Task } from '../data/types';
import { useColl } from '../lib/store';
import { Bar, cx, PageTitle, pct, RowButton } from '../components/ui';
import { TaskRow } from '../components/TaskRow';

type Count = { done: number; total: number };

function bump<K>(map: Map<K, Count>, key: K, done: number) {
  const e = map.get(key) ?? { done: 0, total: 0 };
  e.done += done;
  e.total += 1;
  map.set(key, e);
}

function useCounts() {
  const checks = useColl('checks');
  return useMemo(() => {
    const byModule = new Map<string, Count>();
    const byPhase = new Map<number, Count>();
    let done = 0;
    for (const t of tasks) {
      const d = checks[t.id]?.done ? 1 : 0;
      done += d;
      bump(byModule, t.module, d);
      bump(byPhase, t.phase, d);
    }
    return { done, byModule, byPhase };
  }, [checks]);
}

export function Roadmap({ openModule, ready }: { openModule: (id: string) => void; ready: boolean }) {
  const { done, byModule, byPhase } = useCounts();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return null;
    return tasks.filter((t) => {
      const hay = `${t.title} ${t.topic ?? ''} ${moduleById.get(t.module)?.title ?? ''}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [q]);

  return (
    <div>
      <PageTitle title="Roadmap">Everything to do before placements, in order. Tap a section to see its checklist.</PageTitle>

      <section className="mb-6 rounded-2xl bg-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="num font-display text-4xl font-bold leading-none tracking-tight">
            {done}
            <span className="text-xl font-semibold text-faint"> / {tasks.length}</span>
          </div>
          <div className="num font-mono text-sm text-muted">{pct(done, tasks.length)}% done</div>
        </div>
        <Bar value={done / tasks.length} className="mt-4 h-2" />
      </section>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3.5 top-3 h-5 w-5 text-faint" />
        <input id="task-search" className="field pl-11 pr-11" placeholder={`Search all ${tasks.length} tasks`} value={q} onChange={(e) => setQ(e.target.value)} />
        {q && (
          <button type="button" className="absolute right-1 top-0 grid h-11 w-11 place-items-center text-faint" onClick={() => setQ('')} aria-label="Clear search">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {results ? (
        <section>
          <div className="label mb-2 px-1">{results.length === 0 ? 'No matching tasks' : `${results.length} matching task${results.length === 1 ? '' : 's'}`}</div>
          {results.length > 0 && (
            <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
              {results.slice(0, 60).map((t) => (
                <TaskRow key={t.id} id={t.id} showModule ready={ready} />
              ))}
            </ul>
          )}
        </section>
      ) : (
        <div className="flex flex-col gap-8">
          {phases.map((ph) => {
            const p = byPhase.get(ph.id) ?? { done: 0, total: 0 };
            return (
              <section key={ph.id}>
                <div className="mb-3 px-1">
                  <div className="label">
                    Phase {ph.id} · {ph.when}
                  </div>
                  <div className="mt-1 flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-xl font-semibold">{ph.title}</h2>
                    <span className="num shrink-0 font-mono text-sm text-muted">
                      {p.done}/{p.total}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{ph.why}</p>
                </div>
                <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
                  {modules
                    .filter((m) => m.phase === ph.id)
                    .map((m) => {
                      const c = byModule.get(m.id) ?? { done: 0, total: 0 };
                      const complete = c.total > 0 && c.done === c.total;
                      return (
                        <li key={m.id}>
                          <RowButton onClick={() => openModule(m.id)}>
                            <div className="flex items-baseline justify-between gap-3">
                              <span className={cx('font-semibold', complete && 'text-done')}>{m.title}</span>
                              <span className="num shrink-0 font-mono text-xs text-muted">
                                {c.done}/{c.total}
                              </span>
                            </div>
                            <Bar value={c.total ? c.done / c.total : 0} className="mt-2" />
                          </RowButton>
                        </li>
                      );
                    })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ModuleScreen({ id, ready }: { id: string; ready: boolean }) {
  const m = moduleById.get(id)!;
  const checks = useColl('checks');
  const [hideDone, setHideDone] = useState(false);
  const list = useMemo(() => tasks.filter((t) => t.module === id), [id]);
  const done = list.filter((t) => checks[t.id]?.done).length;
  const topics = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const t of list) map.set(t.topic ?? 'Tasks', [...(map.get(t.topic ?? 'Tasks') ?? []), t]);
    return [...map.entries()];
  }, [list]);
  const res = resources.filter((r) => r.modules.includes(id));
  const phase = phases.find((p) => p.id === m.phase)!;

  return (
    <div>
      <PageTitle eyebrow={`Phase ${m.phase} · ${phase.title}`} title={m.title}>
        {m.summary}
      </PageTitle>

      <section className="mb-6 rounded-2xl bg-surface p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="num font-semibold">
            {done} of {list.length} done
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
            <input id="hide-done" type="checkbox" className="h-4 w-4 accent-[rgb(var(--accent))]" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} />
            Hide done
          </label>
        </div>
        <Bar value={list.length ? done / list.length : 0} className="mt-3 h-2" />
      </section>

      <div className="flex flex-col gap-6">
        {topics.map(([topic, items]) => {
          const shown = hideDone ? items.filter((t) => !checks[t.id]?.done) : items;
          const tDone = items.filter((t) => checks[t.id]?.done).length;
          if (!shown.length) return null;
          return (
            <section key={topic}>
              <div className="mb-2 flex items-baseline justify-between px-1">
                <h2 className="font-semibold">{topic}</h2>
                <span className="num font-mono text-xs text-muted">
                  {tDone}/{items.length}
                </span>
              </div>
              <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
                {shown.map((t) => (
                  <TaskRow key={t.id} id={t.id} ready={ready} />
                ))}
              </ul>
            </section>
          );
        })}
        {hideDone && done === list.length && <p className="rounded-2xl bg-done-soft px-4 py-6 text-center font-semibold text-done">All done here.</p>}

        {res.length > 0 && (
          <section>
            <h2 className="mb-2 px-1 font-semibold">Resources</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
              {res.map((r) => (
                <li key={r.id}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 px-4 py-3 hover:bg-raised/60">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="min-w-0">
                      <span className="block font-medium">{r.title}</span>
                      {r.note && <span className="block text-sm text-muted">{r.note}</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
