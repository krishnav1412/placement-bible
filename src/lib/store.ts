// PROGRESS STORE
//
// Content (tasks, questions, checklists) lives in src/data. Everything you DO — ticks,
// notes, applications, ratings, stories — is saved here, keyed by the content's id.
//
// Where it's saved:
//  • Website (GitHub Pages / npm run dev): in this browser's localStorage, instantly. If you
//    connect a GitHub key (Profile → Sync), it also syncs with a secret gist so your phone
//    and laptop match. Every item carries an "updated at" stamp; when two devices disagree,
//    the newer change to that item wins, so nothing overwrites anything else.
//  • claude.ai artifact build: in the artifact's database (`db` capability).
import { useSyncExternalStore } from 'react';
import type { AppStatus, ProjectStatus, Question } from '../data/types';
import { createGist, findGist, GistError, readGist, writeGist } from './gist';

export interface Check {
  done?: boolean;
  notes?: string;
}
export interface Application {
  company: string;
  role: string;
  tier: string;
  channel: string;
  date: string;
  resume: string;
  contact: string;
  status: AppStatus;
  next: string;
  notes: string;
  history?: { s: AppStatus; d: string }[];
  checklist?: Record<string, boolean>;
}
export interface QuestionProgress {
  c?: number; // confidence 1–5
  notes?: string;
  r?: string; // last rated, YYYY-MM-DD
}
export type MyQuestion = Omit<Question, 'id'>;
export interface Story {
  title?: string;
  s?: string;
  t?: string;
  a?: string;
  r?: string;
  lps?: string[];
  custom?: boolean;
}
export interface ProjectProgress {
  status?: ProjectStatus;
  talk?: string;
}

export interface Collections {
  checks: Record<string, Check>;
  apps: Record<string, Application>;
  questions: Record<string, QuestionProgress>;
  myQuestions: Record<string, MyQuestion>;
  stories: Record<string, Story>;
  projects: Record<string, ProjectProgress>;
}
export type CollectionName = keyof Collections;
const NAMES: CollectionName[] = ['checks', 'apps', 'questions', 'myQuestions', 'stories', 'projects'];

/** `${collection}/${id}` → when it last changed (ms). An id with a stamp but no value was deleted. */
type Stamps = Record<string, number>;
interface Snapshot {
  v: 2;
  data: Collections;
  stamps: Stamps;
}

export type SyncMode = 'connecting' | 'cloud' | 'local';
export type GistStatus = 'off' | 'syncing' | 'ok' | 'error';
interface State {
  mode: SyncMode;
  loaded: number;
  saving: number;
  error: string | null;
  data: Collections;
  stamps: Stamps;
  gist: GistStatus;
  gistError: string | null;
  lastSync: number | null;
}

const LOCAL_KEY = 'placement-bible.v2';
const TOKEN_KEY = 'pb.gh.token';
const GIST_KEY = 'pb.gh.gist';
const empty = (): Collections => ({ checks: {}, apps: {}, questions: {}, myQuestions: {}, stories: {}, projects: {} });

let state: State = { mode: 'connecting', loaded: 0, saving: 0, error: null, data: empty(), stamps: {}, gist: 'off', gistError: null, lastSync: null };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const setState = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  emit();
};

const ls = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* storage blocked: keep working in memory */
    }
  },
  del(k: string) {
    try {
      localStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

// ───────── local + gist backend ─────────
function parseSnapshot(raw: string | null): Snapshot | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (p && p.v === 2 && p.data) return { v: 2, data: { ...empty(), ...p.data }, stamps: p.stamps ?? {} };
    if (p && p.checks) return { v: 2, data: { ...empty(), ...p }, stamps: {} }; // older local format
  } catch {
    /* ignore */
  }
  return null;
}

const snapshot = (): Snapshot => ({ v: 2, data: state.data, stamps: state.stamps });
const saveLocal = () => ls.set(LOCAL_KEY, JSON.stringify(snapshot()));

/** Per-item merge: for each item, the side that changed it most recently wins. */
function merge(a: Snapshot, b: Snapshot): Snapshot {
  const data = empty();
  const stamps: Stamps = {};
  for (const name of NAMES) {
    const A = a.data[name] as Record<string, unknown>;
    const B = b.data[name] as Record<string, unknown>;
    const ids = new Set([...Object.keys(A), ...Object.keys(B)]);
    for (const k of [...Object.keys(a.stamps), ...Object.keys(b.stamps)]) if (k.startsWith(`${name}/`)) ids.add(k.slice(name.length + 1));
    const out = data[name] as Record<string, unknown>;
    for (const id of ids) {
      const key = `${name}/${id}`;
      const sa = a.stamps[key] ?? 0;
      const sb = b.stamps[key] ?? 0;
      const val = sb > sa ? B[id] : A[id] ?? (sa === 0 ? B[id] : undefined);
      if (val !== undefined) out[id] = val;
      const s = Math.max(sa, sb);
      if (s) stamps[key] = s;
    }
  }
  return { v: 2, data, stamps };
}

function startLocal() {
  const snap = parseSnapshot(ls.get(LOCAL_KEY));
  setState({ mode: 'local', loaded: NAMES.length, data: snap?.data ?? empty(), stamps: snap?.stamps ?? {} });
  syncNow(); // no-op until a GitHub key is connected
  window.setInterval(() => document.visibilityState === 'visible' && syncNow(), 120_000);
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && syncNow());
  // Another tab of this site changed the data.
  window.addEventListener('storage', (e) => {
    if (e.key !== LOCAL_KEY) return;
    const snap = parseSnapshot(e.newValue);
    if (snap) setState({ data: snap.data, stamps: snap.stamps });
  });
}

let syncing = false;
let again = false;
let syncTimer: number | undefined;

function scheduleSync() {
  if (!ls.get(TOKEN_KEY)) return;
  window.clearTimeout(syncTimer);
  syncTimer = window.setTimeout(syncNow, 1500);
}

/** Pull the gist, merge with this device, push the result. Safe to call any time. */
export async function syncNow(): Promise<void> {
  const token = ls.get(TOKEN_KEY);
  if (!token || state.mode !== 'local') return;
  if (syncing) {
    again = true;
    return;
  }
  syncing = true;
  setState({ gist: 'syncing' });
  try {
    let id = ls.get(GIST_KEY);
    if (!id) {
      id = await findGist(token);
      if (id) ls.set(GIST_KEY, id);
    }
    const remoteRaw = id ? await readGist(token, id) : null;
    const remote = parseSnapshot(remoteRaw);
    const merged = remote ? merge(snapshot(), remote) : snapshot();
    setState({ data: merged.data, stamps: merged.stamps });
    saveLocal();
    const content = JSON.stringify(merged);
    if (!id) ls.set(GIST_KEY, await createGist(token, content));
    else if (content !== remoteRaw) await writeGist(token, id, content);
    setState({ gist: 'ok', gistError: null, lastSync: Date.now() });
  } catch (e) {
    if (e instanceof GistError && e.status === 404) ls.del(GIST_KEY); // gist deleted: find or recreate next time
    setState({ gist: 'error', gistError: e instanceof Error ? e.message : 'Sync failed.' });
  } finally {
    syncing = false;
    if (again) {
      again = false;
      syncNow();
    }
  }
}

/** Save a GitHub key on this device and sync. Resolves with an error message, or null on success. */
export async function connectGist(token: string): Promise<string | null> {
  ls.set(TOKEN_KEY, token.trim());
  ls.del(GIST_KEY);
  await syncNow();
  if (state.gist === 'error') {
    const msg = state.gistError;
    ls.del(TOKEN_KEY);
    setState({ gist: 'off' });
    return msg;
  }
  return null;
}

export function disconnectGist() {
  ls.del(TOKEN_KEY);
  ls.del(GIST_KEY);
  setState({ gist: 'off', gistError: null, lastSync: null });
}

export const gistConnected = () => !!ls.get(TOKEN_KEY);

// ───────── claude.ai database backend (artifact build only) ─────────
type Doc = Record<string, unknown>;
interface DbRef {
  set(d: Doc): Promise<void>;
  delete(): Promise<void>;
}
interface DbLike {
  collection(path: string): {
    doc(id: string): DbRef;
    onSnapshot(next: (s: { docs: { id: string; data(): Doc | undefined }[] }) => void, err?: (e: { code: string; message: string }) => void): () => void;
  };
}
let db: DbLike | null = null;
const queue = new Map<string, { running: boolean; next?: Doc | null }>();

async function flush(coll: CollectionName, id: string) {
  const key = `${coll}/${id}`;
  const q = queue.get(key);
  if (!q || q.running || q.next === undefined || !db) return;
  const value = q.next;
  q.next = undefined;
  q.running = true;
  setState({ saving: state.saving + 1 });
  try {
    const ref = db.collection(coll).doc(id);
    if (value === null) await ref.delete();
    else await ref.set(value);
    if (state.error) setState({ error: null });
  } catch (e) {
    const code = (e as { code?: string })?.code;
    setState({
      error:
        code === 'quota_exceeded'
          ? 'Storage is full. Delete some old applications or notes.'
          : code === 'invalid_argument'
            ? 'Couldn’t save. Only the owner of this page can make changes.'
            : 'Couldn’t save — check your connection.',
    });
  } finally {
    q.running = false;
    setState({ saving: state.saving - 1 });
    if (q.next !== undefined) flush(coll, id);
    else queue.delete(key);
  }
}

async function start() {
  const claude = (window as unknown as { claude?: { use?: (n: string) => Promise<unknown> } }).claude;
  if (!claude?.use) return startLocal();
  let found: DbLike | null = null;
  try {
    found = (await claude.use('db')) as DbLike | null;
  } catch {
    found = null;
  }
  if (!found) return startLocal();
  db = found;
  setState({ mode: 'cloud' });
  const seen = new Set<CollectionName>();
  for (const name of NAMES) {
    db.collection(name).onSnapshot(
      (snap) => {
        const rec: Record<string, unknown> = {};
        for (const d of snap.docs) rec[d.id] = d.data();
        const current = state.data[name] as Record<string, unknown>;
        for (const [key, q] of queue) {
          const [c, id] = key.split('/');
          if (c !== name) continue;
          if (q.next === null || (q.next === undefined && !(id in current))) delete rec[id];
          else if (id in current) rec[id] = current[id];
        }
        seen.add(name);
        setState({ data: { ...state.data, [name]: rec }, loaded: seen.size });
      },
      (e) => setState({ error: e.code === 'revoked' ? 'This page lost access to its storage. Reload to try again.' : 'Couldn’t load your saved progress. Reload to try again.' }),
    );
  }
}

if (typeof window !== 'undefined') start();

// ───────── reading ─────────
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useColl<K extends CollectionName>(name: K): Collections[K] {
  return useSyncExternalStore(subscribe, () => state.data[name]);
}

export function useSync() {
  const mode = useSyncExternalStore(subscribe, () => state.mode);
  const ready = useSyncExternalStore(subscribe, () => state.loaded >= NAMES.length);
  const saving = useSyncExternalStore(subscribe, () => state.saving > 0);
  const error = useSyncExternalStore(subscribe, () => state.error);
  const gist = useSyncExternalStore(subscribe, () => state.gist);
  const gistError = useSyncExternalStore(subscribe, () => state.gistError);
  const lastSync = useSyncExternalStore(subscribe, () => state.lastSync);
  return { mode, ready, saving, error, gist, gistError, lastSync };
}

export const clearError = () => setState({ error: null });

// ───────── writing ─────────
/** Replace (or, with null, delete) one item. Updates the screen immediately. */
export function write<K extends CollectionName>(name: K, id: string, value: Collections[K][string] | null) {
  const coll = { ...(state.data[name] as Record<string, unknown>) };
  if (value === null) delete coll[id];
  else coll[id] = value;
  setState({ data: { ...state.data, [name]: coll }, stamps: { ...state.stamps, [`${name}/${id}`]: Date.now() } });
  if (state.mode === 'cloud') {
    const key = `${name}/${id}`;
    const q = queue.get(key) ?? { running: false };
    q.next = value === null ? null : (JSON.parse(JSON.stringify(value)) as Doc);
    queue.set(key, q);
    flush(name, id);
  } else {
    saveLocal();
    scheduleSync();
  }
}

/** Merge fields into one item. */
export function patch<K extends CollectionName>(name: K, id: string, fields: Partial<Collections[K][string]>) {
  const prev = (state.data[name] as Record<string, object>)[id] ?? {};
  write(name, id, { ...prev, ...fields } as Collections[K][string]);
}

export const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ───────── convenience ─────────
export function toggleCheck(id: string) {
  const prev = state.data.checks[id];
  const done = !prev?.done;
  // Keep the data small: an unticked item with no notes is simply removed.
  if (!done && !prev?.notes) write('checks', id, null);
  else write('checks', id, { ...prev, done });
}

export function setCheckNotes(id: string, notes: string) {
  const prev = state.data.checks[id];
  if (!notes && !prev?.done) write('checks', id, null);
  else write('checks', id, { ...prev, notes });
}

export function exportAll(): string {
  return JSON.stringify({ app: 'placement-bible', exportedAt: new Date().toISOString(), data: state.data }, null, 1);
}
