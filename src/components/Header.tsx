import { Menu, X, Github, Linkedin } from 'lucide-react';
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
          ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            EBCT
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

          {/* Social icons + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/BiraneThiam2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <Linkedin size={20} />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-white/10 pt-3 flex flex-col gap-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left px-4 py-3 rounded-lg transition-all text-sm ${
                  active === id
                    ? 'text-violet-400 bg-violet-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
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
