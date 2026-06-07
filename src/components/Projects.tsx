import { ExternalLink, Github, Code2, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    emoji: '📅',
    title: 'Planification de Révision',
    description: 'Application Python qui génère des plannings de révision personnalisés. Gestion intelligente des matières, délais et sessions d\'étude optimisées selon les priorités.',
    tech: ['Python', 'Algorithmes', 'CLI'],
    gradient: 'from-amber-500 to-orange-600',
    border: 'hover:border-amber-500/40',
    glow: 'hover:shadow-amber-500/10',
    link: 'https://github.com/BiraneThiam2/Planning-de-revision',
    githubLink: 'https://github.com/BiraneThiam2/Planning-de-revision',
  },
  {
    emoji: '🛍️',
    title: 'E-commerce Parfums',
    description: 'Site web de vente en ligne dédié aux parfums. Interface élégante avec catalogue produits, système de panier et gestion des commandes.',
    tech: ['HTML/CSS', 'JavaScript', 'E-commerce'],
    gradient: 'from-pink-500 to-rose-600',
    border: 'hover:border-pink-500/40',
    glow: 'hover:shadow-pink-500/10',
    link: 'https://github.com/BiraneThiam2/luxury',
    githubLink: 'https://github.com/BiraneThiam2/luxury',
  },
  {
    emoji: '🤖',
    title: 'Chatbot IA',
    description: 'Assistant intelligent développé en Python, capable de comprendre et répondre aux questions grâce à des algorithmes de traitement du langage naturel.',
    tech: ['Python', 'NLP', 'IA'],
    gradient: 'from-violet-500 to-purple-700',
    border: 'hover:border-violet-500/40',
    glow: 'hover:shadow-violet-500/10',
    link: 'https://github.com/BiraneThiam2/Chatboot-IA',
    githubLink: 'https://github.com/BiraneThiam2/Chatboot-IA',
  },
  {
    emoji: '💬',
    title: 'Chat Client-Serveur',
    description: 'Application de messagerie en temps réel basée sur une architecture client-serveur Python avec sockets réseau, permettant des communications multi-utilisateurs.',
    tech: ['Python', 'Sockets', 'Réseau'],
    gradient: 'from-emerald-500 to-teal-600',
    border: 'hover:border-emerald-500/40',
    glow: 'hover:shadow-emerald-500/10',
    link: 'https://github.com/BiraneThiam2/Chat-Python',
    githubLink: 'https://github.com/BiraneThiam2/Chat-Python',
  },
  {
    emoji: '🎮',
    title: 'Tic-Tac-Toe',
    description: 'Jeu de morpion interactif développé en JavaScript avec une interface moderne et épurée, incluant une logique de jeu fluide et un mode deux joueurs.',
    tech: ['JavaScript', 'HTML/CSS', 'Logique de jeu'],
    gradient: 'from-sky-500 to-blue-600',
    border: 'hover:border-sky-500/40',
    glow: 'hover:shadow-sky-500/10',
    link: 'https://github.com/BiraneThiam2/projet-tic-tac-toe',
    githubLink: 'https://github.com/BiraneThiam2/projet-tic-tac-toe',
  },
  {
    emoji: '📁',
    title: 'Organisateur de Fichiers',
    description: 'Script Python qui automatise l\'organisation de fichiers en les classant par type, extension ou date. Nettoie et structure un dossier encombré en quelques secondes.',
    tech: ['Python', 'OS', 'Automatisation'],
    gradient: 'from-blue-500 to-indigo-600',
    border: 'hover:border-blue-500/40',
    glow: 'hover:shadow-blue-500/10',
    link: 'https://github.com/BiraneThiam2/Organisateur-de-fichier',
    githubLink: 'https://github.com/BiraneThiam2/Organisateur-de-fichier',
    buttonLabel: 'Voir le projet',
  },
  {
    emoji: '📊',
    title: 'Dashboard Performances Commerciales',
    description: 'Analyse complète des performances commerciales réalisée avec Power BI. Visualisations interactives des KPIs clés, tendances de ventes et indicateurs de performance.',
    tech: ['Power BI', 'Data Viz', 'Business Intelligence'],
    gradient: 'from-yellow-500 to-amber-600',
    border: 'hover:border-yellow-500/40',
    glow: 'hover:shadow-yellow-500/10',
    link: '/dashboard-performances.pdf',
    buttonLabel: 'Voir le rapport',
  },
  {
    emoji: '🌅',
    title: 'Assistant Matinal',
    description: 'Script Python d\'automatisation qui envoie chaque matin un email personnalisé avec la météo du jour et les tâches planifiées. Intègre l\'API OpenWeatherMap et une planification automatique via schedule.',
    tech: ['Python', 'Automatisation', 'API REST'],
    gradient: 'from-orange-500 to-rose-500',
    border: 'hover:border-orange-500/40',
    glow: 'hover:shadow-orange-500/10',
    link: 'https://github.com/BiraneThiam2/assistant-matinal',
    githubLink: 'https://github.com/BiraneThiam2/assistant-matinal',
  },
  {
    emoji: '🌐',
    title: 'Portfolio Personnel',
    description: 'Ce portfolio moderne développé avec React et TypeScript. Interface animée avec dark mode, design glassmorphism, animations fluides et composants réactifs construits avec TailwindCSS.',
    tech: ['React', 'TypeScript', 'TailwindCSS'],
    gradient: 'from-cyan-500 to-violet-600',
    border: 'hover:border-cyan-500/40',
    glow: 'hover:shadow-cyan-500/10',
    link: 'https://github.com/BiraneThiam2/Portofolio',
    githubLink: 'https://github.com/BiraneThiam2/Portofolio',
  },
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/5 to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-tag mx-auto w-fit mb-4">Projets</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Ce que j'ai <span className="gradient-text">construit</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Projets personnels et académiques qui reflètent mon évolution et ma passion pour la technologie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} visible={visible} delay={100 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, visible, delay }: { project: typeof projects[0]; visible: boolean; delay: number }) {
  return (
    <div
      className={`group relative glass-card rounded-2xl overflow-hidden border border-white/5 ${p.border} ${p.glow} hover:shadow-2xl transition-all duration-300`}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.6s ease ${delay}ms` }}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${p.gradient}`} />

      <div className="p-6">
        {/* Icon + tag row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{p.emoji}</span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/5">
            <Code2 size={12} className="text-gray-500" />
            <span className="text-xs text-gray-500">{p.tech[0]}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {p.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5">
          {p.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {p.tech.map((t) => (
            <span key={t} className={`px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${p.gradient} bg-opacity-10 text-white/80 border border-white/10`}>
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2 border-t border-white/5">
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${p.gradient} hover:opacity-90 hover:scale-105 transition-all duration-200`}
          >
            <ExternalLink size={14} />
            {p.buttonLabel ?? 'Voir le projet'}
          </a>
          {p.githubLink ? (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 glass hover:text-white transition-all"
            >
              <Github size={14} />
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 glass">
              <FileText size={14} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
