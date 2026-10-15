import { memo, useState } from 'react';
import { ExternalLink, StickyNote } from 'lucide-react';
import { taskById, moduleById } from '../data/roadmap';
import { resourceById } from '../data/resources';
import { setCheckNotes, toggleCheck, useColl } from '../lib/store';
import { useAutosave } from '../lib/hooks';
import { Check, cx } from './ui';

/** One roadmap task: tick it, or tap the text for details and your own notes. */
export const TaskRow = memo(function TaskRow({ id, showModule, ready }: { id: string; showModule?: boolean; ready: boolean }) {
  const t = taskById.get(id);
  const c = useColl('checks')[id];
  const [open, setOpen] = useState(false);
  if (!t) return null;
  const done = !!c?.done;
  const mod = moduleById.get(t.module);

  return (
    <li className={cx('px-4 transition-colors', open && 'bg-raised/50')}>
      <div className="flex items-start gap-3 py-3">
        <div className="pt-px">
          <Check checked={done} onToggle={() => toggleCheck(id)} disabled={!ready} label={t.title} />
        </div>
        <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {showModule && mod && <div className="label mb-0.5">{mod.code} · {mod.title}</div>}
          <span className={cx('leading-snug', done && 'text-faint line-through decoration-faint/70')}>{t.title}</span>
          {c?.notes && !open && <StickyNote className="ml-1.5 inline h-3.5 w-3.5 align-[-2px] text-accent" aria-label="Has notes" />}
        </button>
      </div>
      {open && <Details id={id} />}
    </li>
  );
});

function Details({ id }: { id: string }) {
  const t = taskById.get(id)!;
  const c = useColl('checks')[id];
  const notes = useAutosave(c?.notes ?? '', (v) => setCheckNotes(id, v));
  const resources = (t.resourceIds ?? []).map((r) => resourceById.get(r)).filter((r) => !!r);
  return (
    <div className="flex flex-col gap-3 pb-4 pl-9">
      {t.notes && <p className="rounded-xl bg-surface px-3 py-2.5 text-sm leading-relaxed text-muted">{t.notes}</p>}
      {resources.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {resources.map((r) => (
            <li key={r!.id}>
              <a href={r!.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                {r!.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <textarea id={`notes-${id}`} className="area min-h-[84px] text-sm" placeholder="Your notes — what you learned, links, what to revisit" {...notes} />
    </div>
  );
}
