import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Command, Menu, Moon, Sun, X } from 'lucide-react';
import { nav, profile } from '../data';
import { useScrollProgress } from '../lib/hooks';
import { toggleTheme, useTheme } from '../lib/theme';
import { openPalette, scrollToId } from '../lib/nav';
import { useLang } from '../lib/i18n';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const progress = useScrollProgress();
  const theme = useTheme();
  const { t, lang, toggleLang } = useLang();
  const links = useRef<Record<string, HTMLButtonElement | null>>({});

  // Section active (pour l'indicateur de navigation)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ['top', ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Le header se cache en descendant et réapparaît en remontant
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 400 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    const el = links.current[active];
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 });
  }, [active, lang]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-[60] h-[2px] bg-accent" style={{ width: `${progress * 100}%` }} aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !open ? '-translate-y-full' : ''}`}
      >
        <div className="container-x">
          <div
            className={`mt-3 flex items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
              scrolled ? 'border border-line/10 bg-bg/70 shadow-lg shadow-black/5 backdrop-blur-xl' : 'border border-transparent'
            }`}
          >
            <button onClick={() => go('top')} className="group flex items-center gap-2 font-semibold tracking-tight" aria-label={t('nav.top')}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-[#111] transition-transform duration-500 group-hover:rotate-[360deg]">
                BT
              </span>
              <span className="hidden sm:inline">
                Birane<span className="text-signal">.</span>
              </span>
            </button>

            <nav className="relative hidden items-center md:flex" aria-label="Navigation">
              <span
                className="absolute inset-y-0 rounded-full bg-ink transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{ left: pill.left, width: pill.width, opacity: pill.width ? 1 : 0 }}
                aria-hidden="true"
              />
              {nav.map(({ id, key }) => (
                <button
                  key={id}
                  ref={(el) => (links.current[id] = el)}
                  onClick={() => go(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active === id ? 'text-bg' : 'text-muted hover:text-ink'
                  }`}
                >
                  {t(key)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={openPalette}
                className="hidden items-center gap-1.5 rounded-full border border-line/15 px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-ink hover:text-ink lg:flex"
                aria-label={t('nav.palette')}
              >
                <Command size={12} /> K
              </button>
              <button
                onClick={toggleLang}
                aria-label={t('nav.lang')}
                className="h-10 rounded-full px-3 font-mono text-xs font-medium text-muted transition-colors hover:bg-line/10 hover:text-ink"
              >
                <span className={lang === 'fr' ? 'text-ink' : ''}>FR</span>
                <span className="mx-1 opacity-40">/</span>
                <span className={lang === 'en' ? 'text-ink' : ''}>EN</span>
              </button>
              <button
                onClick={(e) => toggleTheme(e.clientX, e.clientY)}
                aria-label={theme === 'dark' ? t('nav.toLight') : t('nav.toDark')}
                className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-line/10 hover:text-ink"
              >
                <span key={theme} className="animate-fade-up">
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </span>
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg md:hidden"
                aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.3,1)] md:hidden ${
          open ? '[clip-path:circle(150%_at_100%_0)]' : 'pointer-events-none [clip-path:circle(0%_at_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2">
          {nav.map(({ id, key }, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              tabIndex={open ? 0 : -1}
              className={`flex items-baseline gap-4 text-left text-5xl font-semibold tracking-tight transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } ${active === id ? 'text-signal' : ''}`}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' }}
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              {t(key)}
            </button>
          ))}
        </nav>
        <div className="flex gap-6 text-sm text-muted">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>LinkedIn ↗</a>
          <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>Email ↗</a>
        </div>
      </div>
    </>
  );
}
