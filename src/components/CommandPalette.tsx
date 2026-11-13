import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, Contrast, CornerDownLeft, Copy, Download, Hash, Languages, Linkedin, Search, type LucideIcon } from 'lucide-react';
import { nav, profile, projects } from '../data';
import { useLang } from '../lib/i18n';
import { toggleTheme } from '../lib/theme';
import { openProject, scrollToId } from '../lib/nav';
import { GithubIcon } from './ui';

type Action = { id: string; label: string; group: string; icon: LucideIcon | typeof GithubIcon; run: () => void; hint?: string; external?: boolean };

/** Palette de commandes (⌘K / Ctrl+K) pour naviguer et agir au clavier. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState('');
  const input = useRef<HTMLInputElement>(null);

  const { t, tr, toggleLang } = useLang();

  const actions: Action[] = useMemo(() => {
    const goto = t('cmd.goto');
    return [
      { id: 'top', label: t('nav.home'), group: goto, icon: Hash, run: () => scrollToId('top') },
      ...nav.map((n) => ({ id: n.id, label: t(n.key), group: goto, icon: Hash, run: () => scrollToId(n.id) })),
      ...projects
        .filter((p) => p.caseStudy)
        .map((p) => ({
          id: `case-${p.slug}`,
          label: `${t('projects.case')} : ${tr(p.title)}`,
          group: t('projects.label'),
          icon: BookOpen,
          run: () => openProject(p.slug),
        })),
      { id: 'theme', label: t('cmd.theme'), group: t('cmd.actions'), icon: Contrast, run: () => toggleTheme(), hint: 'T' },
      { id: 'lang', label: t('cmd.lang'), group: t('cmd.actions'), icon: Languages, run: toggleLang },
      {
        id: 'copy',
        label: t('cmd.copy'),
        group: t('cmd.actions'),
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(() => {
            setToast(t('cmd.copied'));
            setTimeout(() => setToast(''), 1800);
          });
        },
      },
      {
        id: 'cv',
        label: t('cmd.cv'),
        group: t('cmd.actions'),
        icon: Download,
        run: () => {
          const a = document.createElement('a');
          a.href = profile.cv;
          a.download = profile.cvName;
          a.click();
        },
      },
      { id: 'gh', label: 'GitHub', group: t('cmd.links'), icon: GithubIcon, external: true, run: () => window.open(profile.github, '_blank', 'noopener') },
      { id: 'li', label: 'LinkedIn', group: t('cmd.links'), icon: Linkedin, external: true, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
    ];
  }, [t, tr, toggleLang]);

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(
      query.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''),
    ),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest('input, textarea, [contenteditable]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === 't') {
        toggleTheme();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      requestAnimationFrame(() => input.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const run = (a: Action) => {
    setOpen(false);
    a.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter' && filtered[cursor]) {
      run(filtered[cursor]);
    }
  };

  let lastGroup = '';

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 animate-fade-up rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-bg shadow-xl">
          {toast}
        </div>
      )}
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/60 px-4 pt-[15vh] backdrop-blur-md"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('cmd.label')}
        >
          <div
            className="w-full max-w-lg animate-fade-up overflow-hidden rounded-2xl border border-line/15 bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line/10 px-4">
              <Search size={18} className="text-muted" />
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onInputKey}
                placeholder={t('cmd.search')}
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
                aria-label={t('cmd.search')}
              />
              <kbd className="chip">Esc</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">{t('cmd.none')}</li>}
              {filtered.map((a, i) => {
                const header = a.group !== lastGroup ? a.group : null;
                lastGroup = a.group;
                const Icon = a.icon;
                return (
                  <li key={a.id}>
                    {header && <div className="label px-3 pb-1 pt-3">{header}</div>}
                    <button
                      role="option"
                      aria-selected={i === cursor}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => run(a)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        i === cursor ? 'bg-accent text-[#111]' : 'text-ink'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="flex-1">{a.label}</span>
                      {a.external && <ArrowUpRight size={14} />}
                      {a.hint && <kbd className="font-mono text-[11px] opacity-60">{a.hint}</kbd>}
                      {i === cursor && <CornerDownLeft size={14} className="opacity-60" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
