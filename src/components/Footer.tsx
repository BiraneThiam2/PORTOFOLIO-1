import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button onClick={scrollTop} className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            EBCT
          </button>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a href="mailto:biranethiam916@gmail.com"
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
              <Mail size={18} />
            </a>
            <a href="https://github.com/BiraneThiam2" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/" target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600 text-xs">
          © {new Date().getFullYear()} — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
