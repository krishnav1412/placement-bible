import { useEffect, type ReactNode } from 'react';
import { Check as CheckIcon, ChevronRight, X } from 'lucide-react';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

export const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0);

/** Big, thumb-friendly checkbox. */
export function Check({ checked, onToggle, disabled, label }: { checked: boolean; onToggle: () => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="-m-2.5 grid shrink-0 place-items-center p-2.5 disabled:opacity-40"
    >
      <span
        className={cx(
          'grid h-6 w-6 place-items-center rounded-lg border-2 transition-colors',
          checked ? 'border-done bg-done text-surface' : 'border-faint/60 bg-surface',
        )}
      >
        {checked && <CheckIcon className="h-4 w-4" strokeWidth={3} />}
      </span>
    </button>
  );
}

export function Bar({ value, className, tone = 'bg-done' }: { value: number; className?: string; tone?: string }) {
  return (
    <div className={cx('h-1.5 w-full overflow-hidden rounded-full bg-raised', className)}>
      <div className={cx('h-full rounded-full transition-[width] duration-500', tone)} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

/** Bottom sheet on phones, centred dialog on wider screens. */
export function Sheet({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="fade-in absolute inset-0 bg-ink/40" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={title} className="sheet-in relative flex max-h-[92%] w-full flex-col overflow-hidden rounded-t-3xl bg-surface shadow-2xl sm:max-w-lg sm:rounded-3xl">
        <header className="flex items-center justify-between gap-3 px-5 pb-2 pt-4">
          <h2 className="min-w-0 truncate font-display text-lg font-semibold">{title}</h2>
          <button type="button" className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-raised" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{children}</div>
        {footer && (
          <footer className="flex gap-2 border-t border-line px-5 pt-3" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="grid rounded-xl bg-raised p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cx('h-9 rounded-lg text-sm font-semibold transition-colors', value === o.value ? 'bg-surface text-ink shadow-sm' : 'text-muted')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Chips<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; count?: number }[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cx(
            'h-9 shrink-0 rounded-full border px-3.5 text-sm font-medium transition-colors',
            value === o.value ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-muted',
          )}
        >
          {o.label}
          {o.count !== undefined && <span className="num ml-1.5 opacity-60">{o.count}</span>}
        </button>
      ))}
    </div>
  );
}

/** A tappable list row with a chevron. */
export function RowButton({ onClick, children, className }: { onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={cx('flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-raised/60 active:bg-raised', className)}>
      <div className="min-w-0 flex-1">{children}</div>
      <ChevronRight className="h-5 w-5 shrink-0 text-faint" />
    </button>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

export function PageTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-5">
      {eyebrow && <div className="label mb-1">{eyebrow}</div>}
      <h1 className="font-display text-[28px] font-bold leading-tight tracking-tight">{title}</h1>
      {children && <div className="mt-1.5 text-muted">{children}</div>}
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-5 py-10 text-center">
      <div className="font-semibold">{title}</div>
      {children && <div className="mt-1 text-sm text-muted">{children}</div>}
    </div>
  );
}

export function Confidence({ value, onRate }: { value?: number; onRate?: (n: number) => void }) {
  const tone = (n: number) => (n <= 2 ? 'bg-bad text-surface border-bad' : n === 3 ? 'bg-warn text-surface border-warn' : 'bg-done text-surface border-done');
  if (!onRate) {
    return (
      <span className="inline-flex gap-1" aria-label={value ? `Confidence ${value} of 5` : 'Not rated'}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={cx('h-1.5 w-3 rounded-full', value && n <= value ? tone(value).split(' ')[0] : 'bg-line')} />
        ))}
      </span>
    );
  }
  return (
    <div className="grid grid-cols-5 gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onRate(n)}
          className={cx('num h-11 rounded-xl border text-base font-semibold transition-colors', value === n ? tone(n) : 'border-line bg-surface text-muted')}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
