import { useEffect, useState, type ComponentType } from 'react';
import { Briefcase, ChevronLeft, IdCard, ListChecks, MessagesSquare } from 'lucide-react';
import { clearError, useSync } from './lib/store';
import { useLocalPref } from './lib/hooks';
import { cx } from './components/ui';
import { ModuleScreen, Roadmap } from './views/Roadmap';
import { Applications } from './views/Applications';
import { Interview, type InterviewScreen } from './views/Interview';
import { Profile } from './views/Profile';

type Tab = 'roadmap' | 'apps' | 'interview' | 'profile';
const TABS: { id: Tab; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: 'roadmap', label: 'Roadmap', icon: ListChecks },
  { id: 'apps', label: 'Applications', icon: Briefcase },
  { id: 'interview', label: 'Interview', icon: MessagesSquare },
  { id: 'profile', label: 'Profile', icon: IdCard },
];

export default function App() {
  const [tab, setTab] = useLocalPref<Tab>('pb.tab', 'roadmap');
  const [module, setModule] = useState<string | null>(null);
  const [iv, setIv] = useState<InterviewScreen>({ kind: 'home' });
  const { mode, ready, saving, error, gist } = useSync();

  const inDetail = (tab === 'roadmap' && module) || (tab === 'interview' && iv.kind !== 'home');
  const back = () => (tab === 'roadmap' ? setModule(null) : setIv({ kind: 'home' }));
  const go = (t: Tab) => {
    if (t === tab) back();
    setTab(t);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab, module, iv]);

  const status = !ready
    ? 'Loading…'
    : mode === 'cloud'
      ? saving
        ? 'Saving…'
        : 'Saved'
      : gist === 'syncing'
        ? 'Syncing…'
        : gist === 'ok'
          ? 'Synced'
          : gist === 'error'
            ? 'Sync failed'
            : 'This device only';
  const dot = !ready || saving || gist === 'syncing' ? 'bg-warn' : gist === 'error' ? 'bg-bad' : mode === 'cloud' || gist === 'ok' ? 'bg-done' : 'bg-faint';

  return (
    <div className="min-h-full">
      <header className="sticky z-30 border-b border-line bg-bg/90 backdrop-blur" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          {inDetail ? (
            <button type="button" onClick={back} className="-ml-2 flex h-11 items-center gap-1 rounded-xl pl-1 pr-3 font-semibold text-accent">
              <ChevronLeft className="h-6 w-6" />
              {tab === 'roadmap' ? 'Roadmap' : 'Interview'}
            </button>
          ) : (
            <div className="font-display text-lg font-bold tracking-tight">Placement Bible</div>
          )}
          <nav className="ml-auto hidden gap-1 md:flex" aria-label="Sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                className={cx('h-9 rounded-lg px-3 text-sm font-semibold transition-colors', tab === t.id ? 'bg-ink text-bg' : 'text-muted hover:bg-raised')}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => mode === 'local' && go('profile')}
            className="ml-auto flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs text-muted md:ml-3"
            aria-live="polite"
            title={mode === 'local' ? 'Sync settings' : undefined}
          >
            <span className={cx('h-2 w-2 rounded-full', dot)} />
            {status}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-32 pt-6 md:pb-16">
        {tab === 'roadmap' && (module ? <ModuleScreen id={module} ready={ready} /> : <Roadmap openModule={setModule} ready={ready} />)}
        {tab === 'apps' && <Applications ready={ready} />}
        {tab === 'interview' && <Interview screen={iv} setScreen={setIv} ready={ready} />}
        {tab === 'profile' && <Profile ready={ready} />}
      </main>

      {error && (
        <div className="fixed inset-x-4 bottom-24 z-40 mx-auto flex max-w-md items-start gap-3 rounded-2xl bg-bad px-4 py-3 text-sm font-medium text-surface shadow-lg md:bottom-6">
          <span className="flex-1">{error}</span>
          <button type="button" className="font-semibold underline" onClick={clearError}>
            OK
          </button>
        </div>
      )}

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Sections"
      >
        <div className="grid grid-cols-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(t.id)}
              className={cx('flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium', tab === t.id ? 'text-accent' : 'text-muted')}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              <t.icon className="h-6 w-6" />
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
