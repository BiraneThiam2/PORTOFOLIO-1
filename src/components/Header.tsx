import { Menu, X, Linkedin, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { id: 'about',     label: 'À propos' },
  { id: 'skills',    label: 'Compétences' },
  { id: 'projects',  label: 'Projets' },
  { id: 'education', label: 'Formation' },
  { id: 'contact',   label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState('');
  const [theme, setTheme]           = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const found = navLinks.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      if (found) setActive(found.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-black/10 dark:border-white/8 shadow-xl shadow-black/10 dark:shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-75 transition-opacity"
          >
            <LogoSVG />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === id
                    ? 'text-violet-400 bg-violet-500/10 border border-violet-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social icons + theme toggle + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/BiraneThiam2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2 text-gray-400 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2 text-gray-400 hover:text-white dark:hover:text-white hover:text-slate-900 transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Linkedin size={20} />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Changer le thème"
              className="p-2 rounded-lg text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-black/10 dark:border-white/10 pt-3 flex flex-col gap-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left px-4 py-3 rounded-lg transition-all text-sm ${
                  active === id
                    ? 'text-violet-400 bg-violet-500/10'
                    : 'text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.01-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LogoSVG() {
  return (
    <svg width="68" height="68" viewBox="0 0 72 68" fill="none" aria-label="EBCT">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="72" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* Hexagon with subtle fill */}
      <path
        d="M36 3 L62 18 L62 48 L36 63 L10 48 L10 18 Z"
        stroke="url(#logo-grad)"
        strokeWidth="1.8"
        fill="url(#logo-grad)"
        fillOpacity="0.08"
        strokeLinejoin="round"
      />

      {/* Inner cross lines (geometric depth) */}
      <line x1="10" y1="18" x2="62" y2="48" stroke="url(#logo-grad)" strokeWidth="0.5" opacity="0.18" />
      <line x1="62" y1="18" x2="10" y2="48" stroke="url(#logo-grad)" strokeWidth="0.5" opacity="0.18" />

      {/* Horizontal divider */}
      <line x1="12" y1="33" x2="60" y2="33" stroke="url(#logo-grad)" strokeWidth="0.9" opacity="0.45" />

      {/* Accent dots on top and bottom vertex */}
      <circle cx="36" cy="3"  r="2.5" fill="url(#logo-grad)" />
      <circle cx="36" cy="63" r="2.5" fill="url(#logo-grad)" />

      {/* EB — upper half */}
      <text
        x="36" y="29"
        textAnchor="middle"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontWeight="800"
        fontSize="17"
        fill="url(#logo-grad)"
        letterSpacing="2"
      >EB</text>

      {/* CT — lower half */}
      <text
        x="36" y="53"
        textAnchor="middle"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontWeight="600"
        fontSize="13"
        fill="url(#logo-grad)"
        letterSpacing="4"
      >CT</text>
    </svg>
  );
}
