import { Github, Linkedin, Mail, ChevronDown, ArrowRight, Sparkles, Download } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.15),transparent)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="animate-fade-in-1 flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponible pour stage &amp; collaborations
          </span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-in-2 font-bold leading-tight mb-6">
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
            El Hadji Birane
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-text mt-1">
            Cisse Thiam
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-2 text-lg sm:text-xl md:text-2xl text-gray-400 mb-3">
          Étudiant en{' '}
          <span className="text-violet-400 font-semibold">Intelligence Artificielle</span>
          {' '}&amp;{' '}
          <span className="text-cyan-400 font-semibold">Stratégie des Affaires</span>
        </p>
        <p className="animate-fade-in-2 text-gray-500 text-sm sm:text-base mb-12 flex items-center justify-center gap-2">
          <Sparkles size={14} className="text-violet-500" />
          Swiss UMEF Campus Dakar
          <Sparkles size={14} className="text-cyan-500" />
        </p>

        {/* Stats */}
        <div className="animate-fade-in-3 flex justify-center gap-8 sm:gap-16 mb-12">
          {[
            { value: '5', label: 'Projets' },
            { value: '2+', label: "Ans d'études" },
            { value: 'Dakar', label: 'Sénégal' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="animate-fade-in-3 flex justify-center gap-3 mb-10">
          {[
            { href: 'mailto:biranethiam916@gmail.com', icon: <Mail size={18} />, label: 'Email' },
            { href: 'https://github.com/BiraneThiam2', icon: <Github size={18} />, label: 'GitHub', external: true },
            { href: 'https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/', icon: <Linkedin size={18} />, label: 'LinkedIn', external: true },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl glass text-gray-300 hover:text-white hover:border-violet-500/40 transition-all duration-200 text-sm"
            >
              {link.icon}
              <span className="hidden sm:block">{link.label}</span>
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="animate-fade-in-4 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => scrollTo('projects')}
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-200"
          >
            Voir mes projets
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="/cv.pdf"
            download="CV_ElHadjiBiraneCisseThiam.pdf"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-gray-300 hover:text-white hover:border-violet-500/40 font-semibold transition-all duration-200"
          >
            <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            Mon CV
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-gray-300 hover:text-white hover:border-violet-500/40 font-semibold transition-all duration-200"
          >
            Me contacter
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
        onClick={() => scrollTo('about')}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
