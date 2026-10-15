import { useMemo, useState } from 'react';
import { ChevronDown, Eye, Play, Plus, Trash2 } from 'lucide-react';
import type { Question, QuestionCategory } from '../data/types';
import { AMAZON_LPS, categories, COMPANY_RESEARCH_TEMPLATE, questions as bank, storySeeds } from '../data/interviewBank';
import { newId, patch, type Story, useColl, write } from '../lib/store';
import { todayISO, useAutosave } from '../lib/hooks';
import { Bar, Chips, Confidence, cx, Field, PageTitle, RowButton, Segmented, Sheet } from '../components/ui';

type Screen = { kind: 'home' } | { kind: 'category'; cat: QuestionCategory } | { kind: 'practice'; ids: string[] };

function useAllQuestions(): Question[] {
  const mine = useColl('myQuestions');
  return useMemo(() => [...bank, ...Object.entries(mine).map(([id, q]) => ({ ...q, id }))], [mine]);
}

export function Interview({ screen, setScreen, ready }: { screen: Screen; setScreen: (s: Screen) => void; ready: boolean }) {
  const [tab, setTab] = useState<'questions' | 'stories'>('questions');
  if (screen.kind === 'category') return <CategoryScreen cat={screen.cat} ready={ready} />;
  if (screen.kind === 'practice') return <Practice ids={screen.ids} onDone={() => setScreen({ kind: 'home' })} />;
  return (
    <div>
      <PageTitle title="Interview prep">Rate how well you can answer each question. Practice serves your weakest ones first.</PageTitle>
      <div className="mb-5">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'questions', label: 'Questions' },
            { value: 'stories', label: 'STAR stories' },
          ]}
        />
      </div>
      {tab === 'questions' ? <QuestionsHome setScreen={setScreen} ready={ready} /> : <Stories ready={ready} />}
    </div>
  );
}
export type { Screen as InterviewScreen };

function QuestionsHome({ setScreen, ready }: { setScreen: (s: Screen) => void; ready: boolean }) {
  const qs = useAllQuestions();
  const progress = useColl('questions');
  const [cat, setCat] = useState<QuestionCategory | 'All'>('All');
  const [size, setSize] = useState('10');

  const start = () => {
    const pool = qs.filter((q) => cat === 'All' || q.category === cat);
    // Unrated and low-confidence first; among equals, the least recently rated first.
    const ranked = [...pool].sort((a, b) => {
      const pa = progress[a.id];
      const pb = progress[b.id];
      const ca = pa?.c ?? 0;
      const cb = pb?.c ?? 0;
      if (ca !== cb) return ca - cb;
      return (pa?.r ?? '').localeCompare(pb?.r ?? '') || Math.random() - 0.5;
    });
    setScreen({ kind: 'practice', ids: ranked.slice(0, Number(size)).map((q) => q.id) });
  };

  const rated = qs.filter((q) => progress[q.id]?.c).length;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl bg-surface p-5">
        <h2 className="font-display text-lg font-semibold">Practice</h2>
        <p className="mt-1 text-sm text-muted">Answer out loud, reveal the key points, then rate yourself 1–5.</p>
        <div className="mt-4 flex flex-col gap-3">
          <Chips value={cat} onChange={setCat} options={[{ value: 'All' as const, label: 'All topics' }, ...categories.map((c) => ({ value: c, label: c }))]} />
          <Segmented value={size} onChange={setSize} options={['5', '10', '20'].map((v) => ({ value: v, label: `${v} questions` }))} />
          <button type="button" className="btn btn-primary" disabled={!ready} onClick={start}>
            <Play className="h-4 w-4" /> Start practice
          </button>
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-baseline justify-between px-1">
          <h2 className="font-semibold">Question bank</h2>
          <span className="num font-mono text-xs text-muted">
            {rated}/{qs.length} rated
          </span>
        </div>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
          {categories.map((c) => {
            const inCat = qs.filter((q) => q.category === c);
            const r = inCat.filter((q) => progress[q.id]?.c);
            const strong = inCat.filter((q) => (progress[q.id]?.c ?? 0) >= 3).length;
            return (
              <li key={c}>
                <RowButton onClick={() => setScreen({ kind: 'category', cat: c })}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">{c}</span>
                    <span className="num shrink-0 font-mono text-xs text-muted">
                      {inCat.length} Qs · {r.length} rated
                    </span>
                  </div>
                  <Bar value={inCat.length ? strong / inCat.length : 0} className="mt-2" />
                </RowButton>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 px-1 text-xs text-muted">Green bar = questions you rated 3 or higher.</p>
      </section>
    </div>
  );
}

function CategoryScreen({ cat, ready }: { cat: QuestionCategory; ready: boolean }) {
  const qs = useAllQuestions().filter((q) => q.category === cat);
  const [adding, setAdding] = useState(false);
  return (
    <div>
      <PageTitle eyebrow="Question bank" title={cat}>
        Tap a question to see the key points, add your own answer notes and rate it.
      </PageTitle>
      <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
        {qs.map((q) => (
          <QuestionRow key={q.id} q={q} ready={ready} />
        ))}
      </ul>
      <button type="button" className="btn btn-quiet mt-4 w-full" disabled={!ready} onClick={() => setAdding(true)}>
        <Plus className="h-5 w-5" /> Add a question you were asked
      </button>
      {adding && <AddQuestion cat={cat} onClose={() => setAdding(false)} />}
    </div>
  );
}

function QuestionRow({ q, ready }: { q: Question; ready: boolean }) {
  const p = useColl('questions')[q.id];
  const mine = useColl('myQuestions')[q.id];
  const [open, setOpen] = useState(false);
  const notes = useAutosave(p?.notes ?? '', (v) => patch('questions', q.id, { notes: v }));
  return (
    <li className={cx(open && 'bg-raised/50')}>
      <button type="button" className="flex w-full items-start gap-3 px-4 py-3.5 text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <div className="min-w-0 flex-1">
          <div className="leading-snug">{q.prompt}</div>
          <div className="mt-1.5 flex items-center gap-2">
            <Confidence value={p?.c} />
            {q.sub && <span className="text-xs text-faint">{q.sub}</span>}
          </div>
        </div>
        <ChevronDown className={cx('mt-0.5 h-5 w-5 shrink-0 text-faint transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="flex flex-col gap-3 px-4 pb-4">
          {q.answer && <p className="rounded-xl bg-surface px-3 py-2.5 text-sm leading-relaxed">{q.answer}</p>}
          <textarea id={`qnotes-${q.id}`} className="area min-h-[80px] text-sm" placeholder="Your answer in your own words, the example you’d use…" {...notes} />
          <div>
            <div className="mb-2 text-sm font-medium text-muted">How well can you answer this?</div>
            <Confidence value={p?.c} onRate={(n) => ready && patch('questions', q.id, { c: n, r: todayISO() })} />
          </div>
          {mine && (
            <button type="button" className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-bad" onClick={() => write('myQuestions', q.id, null)}>
              <Trash2 className="h-4 w-4" /> Delete this question
            </button>
          )}
        </div>
      )}
    </li>
  );
}

function AddQuestion({ cat, onClose }: { cat: QuestionCategory; onClose: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <Sheet
      open
      onClose={onClose}
      title={`Add to ${cat}`}
      footer={
        <button
          type="button"
          className="btn btn-primary flex-1"
          disabled={!prompt.trim()}
          onClick={() => {
            write('myQuestions', newId('q'), { category: cat, prompt: prompt.trim(), answer: answer.trim() || undefined, sub: 'Added by you' });
            onClose();
          }}
        >
          Add question
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Question">
          <textarea id="new-q-prompt" className="area min-h-[80px]" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="What were you asked?" autoFocus />
        </Field>
        <Field label="Key points of a good answer (optional)">
          <textarea id="new-q-answer" className="area min-h-[100px]" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        </Field>
      </div>
    </Sheet>
  );
}

function Practice({ ids, onDone }: { ids: string[]; onDone: () => void }) {
  const all = useAllQuestions();
  const progress = useColl('questions');
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const q = all.find((x) => x.id === ids[i]);

  if (!q) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-surface px-5 py-12 text-center">
        <div className="font-display text-2xl font-bold">Round done</div>
        <p className="text-muted">You rated {ids.length} question{ids.length === 1 ? '' : 's'}. Low ratings come up first next time.</p>
        <button type="button" className="btn btn-primary" onClick={onDone}>
          Back to questions
        </button>
      </div>
    );
  }
  const p = progress[q.id];
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="label">
          {q.category} · {i + 1} of {ids.length}
        </span>
        <button type="button" className="text-sm font-semibold text-accent" onClick={onDone}>
          Stop
        </button>
      </div>
      <Bar value={i / ids.length} className="mb-5" tone="bg-accent" />
      <section className="rounded-2xl bg-surface p-5">
        <h2 className="font-display text-xl font-semibold leading-snug">{q.prompt}</h2>
        {!shown ? (
          <button type="button" className="btn btn-primary mt-6 w-full" onClick={() => setShown(true)}>
            <Eye className="h-5 w-5" /> Show key points
          </button>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {q.answer ? <p className="rounded-xl bg-raised/70 px-4 py-3 leading-relaxed">{q.answer}</p> : <p className="text-muted">No reference answer for this one.</p>}
            {p?.notes && (
              <div>
                <div className="label mb-1">Your notes</div>
                <p className="whitespace-pre-wrap text-sm">{p.notes}</p>
              </div>
            )}
            <div>
              <div className="mb-2 text-sm font-medium text-muted">How well did you know it? (1 = blank, 5 = nailed it)</div>
              <Confidence
                value={undefined}
                onRate={(n) => {
                  patch('questions', q.id, { c: n, r: todayISO() });
                  setShown(false);
                  setI((x) => x + 1);
                }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// ───────────────────────── STAR stories ─────────────────────────
function Stories({ ready }: { ready: boolean }) {
  const saved = useColl('stories');
  const [editing, setEditing] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const ids = [...storySeeds.map((s) => s.id), ...Object.keys(saved).filter((id) => saved[id]?.custom)];
  const seedById = new Map(storySeeds.map((s) => [s.id, s]));
  const lpsOf = (id: string) => saved[id]?.lps ?? seedById.get(id)?.principles ?? [];
  const covered = AMAZON_LPS.filter((lp) => ids.some((id) => lpsOf(id).includes(lp) && filledCount(saved[id]) > 0));
  const missing = AMAZON_LPS.filter((lp) => !covered.includes(lp));

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl bg-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Amazon principles covered</h2>
          <span className="num font-mono text-sm text-muted">{covered.length}/16</span>
        </div>
        <Bar value={covered.length / 16} className="mt-3" />
        <p className="mt-3 text-sm text-muted">A principle counts once a story tagged with it has some writing in it.</p>
        {missing.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {missing.map((lp) => (
              <span key={lp} className="rounded-full bg-raised px-2.5 py-1 text-xs text-muted">
                {lp}
              </span>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 px-1 font-semibold">Your stories</h2>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
          {ids.map((id) => {
            const s = saved[id];
            const seed = seedById.get(id);
            const n = filledCount(s);
            return (
              <li key={id}>
                <RowButton onClick={() => setEditing(id)}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold">{s?.title || seed?.title || 'Untitled story'}</span>
                    <span className={cx('num shrink-0 font-mono text-xs', n === 4 ? 'text-done' : 'text-muted')}>{n}/4</span>
                  </div>
                  {seed && <div className="mt-0.5 text-sm text-muted">{seed.hint}</div>}
                </RowButton>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="btn btn-quiet mt-3 w-full"
          disabled={!ready}
          onClick={() => {
            const id = newId('story');
            write('stories', id, { custom: true, title: '', lps: [] });
            setEditing(id);
          }}
        >
          <Plus className="h-5 w-5" /> Add a story
        </button>
      </section>

      <section className="rounded-2xl bg-surface p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-semibold">“Why this company?” template</h2>
          <button
            type="button"
            className="text-sm font-semibold text-accent"
            onClick={() => {
              navigator.clipboard
                ?.writeText(COMPANY_RESEARCH_TEMPLATE)
                .then(() => setCopied(true))
                .catch(() => setCopied(false));
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted">{COMPANY_RESEARCH_TEMPLATE}</pre>
      </section>

      {editing && <StoryEditor id={editing} story={saved[editing]} seedTitle={seedById.get(editing)?.title} seedHint={seedById.get(editing)?.hint} seedLps={seedById.get(editing)?.principles ?? []} onClose={() => setEditing(null)} />}
    </div>
  );
}

function filledCount(s?: Story) {
  return s ? (['s', 't', 'a', 'r'] as const).filter((k) => (s[k] ?? '').trim()).length : 0;
}

function StoryEditor({ id, story, seedTitle, seedHint, seedLps, onClose }: { id: string; story?: Story; seedTitle?: string; seedHint?: string; seedLps: string[]; onClose: () => void }) {
  const [d, setD] = useState<Story>(() => ({ lps: story?.lps ?? seedLps, ...story }));
  const [showLps, setShowLps] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (p: Partial<Story>) => setD((x) => ({ ...x, ...p }));
  const lps = d.lps ?? [];
  const fields = [
    { k: 's', label: 'Situation', hint: 'Where were you, what was going on?' },
    { k: 't', label: 'Task', hint: 'What did you need to achieve?' },
    { k: 'a', label: 'Action', hint: 'What did YOU do, step by step?' },
    { k: 'r', label: 'Result', hint: 'What changed? Use numbers.' },
  ] as const;

  return (
    <Sheet
      open
      onClose={onClose}
      title={d.title || seedTitle || 'New story'}
      footer={
        <>
          {story?.custom && (
            <button
              type="button"
              className={cx('btn', confirmDelete ? 'bg-bad text-surface' : 'btn-quiet text-bad')}
              onClick={() => {
                if (!confirmDelete) return setConfirmDelete(true);
                write('stories', id, null);
                onClose();
              }}
            >
              {confirmDelete ? 'Tap to delete' : 'Delete'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary flex-1"
            onClick={() => {
              write('stories', id, d);
              onClose();
            }}
          >
            Save
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {seedHint && <p className="text-sm text-muted">{seedHint}</p>}
        {(story?.custom || !seedTitle) && (
          <Field label="Title">
            <input id={`story-title-${id}`} className="field" value={d.title ?? ''} onChange={(e) => set({ title: e.target.value })} placeholder="e.g. Fixing the payment bug at launch" />
          </Field>
        )}
        {fields.map((f) => (
          <Field key={f.k} label={f.label}>
            <textarea id={`story-${f.k}-${id}`} className="area min-h-[88px]" value={d[f.k] ?? ''} onChange={(e) => set({ [f.k]: e.target.value })} placeholder={f.hint} />
          </Field>
        ))}
        <div className="rounded-2xl bg-raised/60">
          <button type="button" className="flex w-full items-center justify-between px-4 py-3 text-left" onClick={() => setShowLps((v) => !v)} aria-expanded={showLps}>
            <span>
              <span className="block font-semibold">Amazon principles</span>
              <span className="text-sm text-muted">{lps.length ? lps.join(', ') : 'None tagged'}</span>
            </span>
            <ChevronDown className={cx('h-5 w-5 shrink-0 text-faint transition-transform', showLps && 'rotate-180')} />
          </button>
          {showLps && (
            <div className="flex flex-wrap gap-2 px-4 pb-4">
              {AMAZON_LPS.map((lp) => {
                const on = lps.includes(lp);
                return (
                  <button
                    key={lp}
                    type="button"
                    onClick={() => set({ lps: on ? lps.filter((x) => x !== lp) : [...lps, lp] })}
                    className={cx('rounded-full px-3 py-1.5 text-sm transition-colors', on ? 'bg-ink text-bg' : 'bg-surface text-muted')}
                  >
                    {lp}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
}

export function emptyInterviewScreen(): Screen {
  return { kind: 'home' };
}
