import { useEffect, useRef, useState } from 'react';

/** Text field state that saves itself a moment after you stop typing (and on blur / close). */
export function useAutosave(value: string, save: (v: string) => void, delay = 600) {
  const [draft, setDraft] = useState(value);
  const focused = useRef(false);
  const timer = useRef<number>();
  const pending = useRef<string | null>(null);
  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    if (!focused.current) setDraft(value);
  }, [value]);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      if (pending.current !== null) saveRef.current(pending.current);
    },
    [],
  );

  const commit = () => {
    window.clearTimeout(timer.current);
    if (pending.current !== null) {
      const v = pending.current;
      pending.current = null;
      saveRef.current(v);
    }
  };

  return {
    value: draft,
    onChange: (e: { target: { value: string } }) => {
      setDraft(e.target.value);
      pending.current = e.target.value;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(commit, delay);
    },
    onFocus: () => {
      focused.current = true;
    },
    onBlur: () => {
      focused.current = false;
      commit();
    },
  };
}

/** A per-device preference (e.g. the last open tab). Never required for the app to work. */
export function useLocalPref<T extends string>(key: string, initial: T) {
  const [v, setV] = useState<T>(() => {
    try {
      return (localStorage.getItem(key) as T) || initial;
    } catch {
      return initial;
    }
  });
  const set = (next: T) => {
    setV(next);
    try {
      localStorage.setItem(key, next);
    } catch {
      /* ignore */
    }
  };
  return [v, set] as const;
}

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const fmtDate = (iso: string) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
