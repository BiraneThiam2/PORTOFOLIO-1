import { Code, Brain, Database, Shield, GitBranch, Terminal, Briefcase, Users, MessageSquare, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const technical = [
  { icon: Code,      name: 'Python',                 pct: 35, color: 'from-yellow-500 to-orange-500' },
  { icon: Brain,     name: 'Intelligence Artificielle', pct: 25, color: 'from-violet-500 to-purple-600' },
  { icon: Database,  name: 'Data & Analyse',          pct: 40, color: 'from-cyan-500 to-blue-500' },
  { icon: Database,  name: 'Bases de données',        pct: 45, color: 'from-teal-500 to-cyan-600' },
  { icon: Shield,    name: 'Cybersécurité',           pct: 30, color: 'from-red-500 to-pink-500' },
  { icon: Terminal,  name: 'Réseaux informatiques',   pct: 35, color: 'from-emerald-500 to-green-600' },
  { icon: GitBranch, name: 'Git & GitHub',            pct: 60, color: 'from-gray-400 to-gray-600' },
  { icon: Terminal,  name: 'Linux / Windows',         pct: 50, color: 'from-blue-400 to-indigo-500' },
];

const transversal = [
  { icon: Briefcase,    name: 'Stratégie des affaires',  pct: 35, color: 'from-amber-500 to-yellow-600' },
  { icon: Lightbulb,   name: 'Résolution de problèmes', pct: 70, color: 'from-yellow-400 to-amber-500' },
  { icon: Users,        name: 'Travail en équipe',       pct: 75, color: 'from-pink-500 to-rose-500' },
  { icon: MessageSquare,name: 'Communication',           pct: 65, color: 'from-sky-500 to-blue-500' },
  { icon: TrendingUp,   name: 'Apprentissage rapide',    pct: 80, color: 'from-violet-500 to-indigo-500' },
  { icon: Target,       name: 'Esprit analytique',       pct: 75, color: 'from-cyan-500 to-teal-500' },
];

function SkillBar({ icon: Icon, name, pct, color, visible, delay }: { icon: React.ElementType; name: string; pct: number; color: string; visible: boolean; delay: number }) {
  return (
    <div
      className={`glass-card rounded-xl p-4 border border-white/5 transition-all duration-700`}
      style={{ transitionDelay: `${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-20`}>
            <Icon size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-200">{name}</span>
        </div>
        <span className="text-xs font-bold text-gray-400">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} skill-bar-fill transition-all duration-1000`}
          style={{ width: visible ? `${pct}%` : '0%', transitionDelay: `${delay + 200}ms` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-tag mx-auto w-fit mb-4">Compétences</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Mon <span className="gradient-text">arsenal</span> de compétences
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Technical */}
          <div>
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                <Code size={20} className="text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Compétences techniques</h3>
            </div>
            <div className="space-y-3">
              {technical.map((s, i) => (
                <SkillBar key={s.name} {...s} visible={visible} delay={150 + i * 60} />
              ))}
            </div>
          </div>

          {/* Transversal */}
          <div>
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <Briefcase size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Compétences transversales</h3>
            </div>
            <div className="space-y-3">
              {transversal.map((s, i) => (
                <SkillBar key={s.name} {...s} visible={visible} delay={150 + i * 60} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
