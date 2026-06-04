import { GraduationCap, MapPin, Calendar, BookOpen, Award, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const certifications = [
  {
    title: 'Meta Front-End Developer',
    issuer: 'Meta · Coursera',
    period: '2024 — 7 mois',
    gradient: 'from-blue-500 to-indigo-500',
    border: 'border-blue-500/20',
    pdfPath: '/meta-frontend-developer.pdf',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Git/GitHub', 'UI/UX Design', 'Jest'],
    description: 'Certification professionnelle obtenue après 7 mois de formation intensive (6h/semaine). Projet final : développement d\'une application complète de A à Z.',
  },
];

const educations = [
  {
    degree: 'Intelligence Artificielle & Stratégie des Affaires',
    school: 'Swiss UMEF Campus Dakar',
    period: '2025 — En cours',
    status: 'En cours',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    gradient: 'from-violet-500 to-cyan-500',
    border: 'border-violet-500/20',
    description: 'Formation spécialisée combinant les compétences techniques en IA avec une compréhension stratégique du monde des affaires.',
    subjects: ['Machine Learning', 'Data Science', 'Stratégie d\'entreprise', 'Transformation digitale', 'Cybersécurité'],
  },
  {
    degree: 'Génie Logiciel & Bases de données',
    school: 'Formation initiale',
    period: '2024 — 2025',
    status: 'Complétée',
    statusColor: 'text-gray-400 bg-white/5 border-white/10',
    gradient: 'from-gray-500 to-gray-700',
    border: 'border-white/10',
    description: 'Première année d\'études en génie logiciel qui m\'a permis d\'acquérir des bases solides en développement et gestion de données.',
    subjects: ['Programmation', 'Bases de données', 'SQL', 'Modélisation', 'Architecture logicielle'],
  },
];

export default function Education() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-tag mx-auto w-fit mb-4">Formation</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Parcours <span className="gradient-text">académique</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {educations.map((edu, i) => (
              <div
                key={edu.degree}
                className={`relative transition-all duration-700`}
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)', transitionDelay: `${200 + i * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-4 h-4 rounded-full bg-gradient-to-br ${edu.gradient} border-2 border-[#030712] hidden sm:block z-10`} />

                <div className={`sm:ml-16 glass-card rounded-2xl border ${edu.border} overflow-hidden`}>
                  {/* Top accent */}
                  <div className={`h-1 bg-gradient-to-r ${edu.gradient}`} />

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${edu.gradient} bg-opacity-20 flex-shrink-0`}>
                          <GraduationCap size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{edu.degree}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} className="text-gray-500" />
                              {edu.school}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} className="text-gray-500" />
                              {edu.period}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${edu.statusColor}`}>
                        {edu.status}
                      </span>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-5">{edu.description}</p>

                    <div className="flex items-start gap-3">
                      <BookOpen size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/8 text-gray-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={`mt-16 transition-all duration-700`} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <Award size={20} className="text-blue-400" />
            <h3 className="text-xl font-bold text-white">Certifications</h3>
          </div>

          <div className="space-y-4">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className={`block glass-card rounded-2xl border ${cert.border} overflow-hidden hover:border-blue-500/50 transition-all duration-300 group`}
              >
                <div className={`h-1 bg-gradient-to-r ${cert.gradient}`} />
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.gradient} bg-opacity-20 flex-shrink-0`}>
                        <Award size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{cert.title}</h4>
                          <ExternalLink size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors mb-1" />
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-500" />
                            {cert.issuer}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-500" />
                            {cert.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold border text-blue-400 bg-blue-500/10 border-blue-500/30">
                      Certifiée
                    </span>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-5">{cert.description}</p>

                  <div className="flex items-start gap-3">
                    <BookOpen size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/8 text-gray-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
