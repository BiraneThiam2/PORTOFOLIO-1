import { User, Zap, Target } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cards = [
    { icon: User,   color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20', title: 'Qui je suis',    text: 'Étudiant passionné par l\'intersection entre technologie et stratégie des affaires.' },
    { icon: Zap,    color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20',     title: 'Mes intérêts',  text: 'Intelligence Artificielle, Data Science, Cybersécurité et systèmes informatiques.' },
    { icon: Target, color: 'text-pink-400',   bg: 'bg-pink-500/10 border-pink-500/20',     title: 'Ma motivation', text: 'Apprendre continuellement et évoluer vers un professionnel de la tech orienté IA.' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-tag mx-auto w-fit mb-4">À propos</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Qui suis-<span className="gradient-text">je ?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Photo */}
          <div className={`transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative mx-auto max-w-sm">
              {/* Glow ring */}
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl blur-sm opacity-50" />
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img src="b.jpeg" alt="El Hadji Birane Cisse Thiam" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-xl">
                IA &amp; Business 🎓
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="space-y-4">
              {cards.map(({ icon: Icon, color, bg, title, text }) => (
                <div key={title} className={`glass-card rounded-xl p-5 border ${bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg ${bg} border flex-shrink-0`}>
                      <Icon size={20} className={color} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio block */}
        <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="glass-card rounded-2xl p-8 border border-violet-500/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <p className="text-gray-300 leading-relaxed mb-4 text-lg">
              Je suis étudiant en première année à <span className="text-violet-400 font-semibold">Swiss UMEF Campus Dakar</span>, spécialisé en{' '}
              <span className="text-white font-semibold">Intelligence Artificielle et Stratégie des Affaires</span>.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Je m'intéresse particulièrement à l'intelligence artificielle, l'analyse de données, la cybersécurité et les systèmes informatiques.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Mon ambition est de combiner expertise technique et vision stratégique pour résoudre des problèmes complexes et innovants.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
