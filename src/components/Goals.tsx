import { Target, TrendingUp, Users, Award, Rocket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const goals = [
  {
    icon: TrendingUp,
    title: 'Développement continu',
    description: 'Approfondir mes compétences en IA, Machine Learning et data science à travers des projets concrets et des formations spécialisées.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    glow: 'hover:border-violet-500/40',
  },
  {
    icon: Users,
    title: 'Vision Tech-Business',
    description: 'Maîtriser le lien entre technologie et stratégie business pour créer de la valeur et transformer les organisations.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    glow: 'hover:border-cyan-500/40',
  },
  {
    icon: Target,
    title: 'Expérience pratique',
    description: 'Acquérir de l\'expérience terrain via des stages, projets collaboratifs et contributions à des initiatives innovantes.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
    glow: 'hover:border-pink-500/40',
  },
  {
    icon: Award,
    title: 'Évolution professionnelle',
    description: 'Évoluer vers des métiers stratégiques liés à l\'IA, la data science ou la cybersécurité dans des environnements technologiques avancés.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    glow: 'hover:border-amber-500/40',
  },
];

export default function Goals() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="goals" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/5 to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-tag mx-auto w-fit mb-4">Objectifs</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ma <span className="gradient-text">vision</span> professionnelle
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Construire une carrière à l'intersection de la technologie et du business.
          </p>
        </div>

        {/* Goal cards */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {goals.map(({ icon: Icon, title, description, color, bg, glow }, i) => (
            <div
              key={title}
              className={`glass-card rounded-2xl border p-6 ${bg} ${glow} transition-all duration-300`}
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease ${200 + i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${bg} flex-shrink-0`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment block */}
        <div
          className={`glass-card rounded-2xl border border-violet-500/15 p-8 relative overflow-hidden transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="flex items-center gap-3 mb-4 justify-center">
            <Rocket size={22} className="text-violet-400" />
            <h3 className="text-xl font-bold text-white">Mon engagement</h3>
          </div>
          <p className="text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
            Je m'engage à développer une expertise solide en combinant rigueur technique,
            curiosité intellectuelle et vision stratégique — pour devenir un professionnel
            capable de comprendre les enjeux technologiques et business et contribuer à{' '}
            <span className="text-violet-400 font-medium">l'innovation et à la transformation numérique</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
