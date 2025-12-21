import { Code, Brain, Database, Shield, GitBranch, Terminal, Briefcase, Users, MessageSquare, TrendingUp, Lightbulb, Target } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const technicalSkills = [
    { icon: Code, name: 'Python', percentage: 35 },
    { icon: Brain, name: 'Intelligence Artificielle', percentage: 25 },
    { icon: Database, name: 'Data & Analyse', percentage: 40 },
    { icon: Database, name: 'Bases de données', percentage: 45 },
    { icon: Shield, name: 'Cybersécurité', percentage: 30 },
    { icon: Terminal, name: 'Réseaux informatiques', percentage: 35 },
    { icon: GitBranch, name: 'Git & GitHub', percentage: 60 },
    { icon: Terminal, name: 'Linux / Windows', percentage: 50 },
  ];

  const businessSkills = [
    { icon: Briefcase, name: 'Stratégie des affaires', percentage: 35 },
    { icon: Lightbulb, name: 'Résolution de problèmes', percentage: 70 },
    { icon: Users, name: 'Travail en équipe', percentage: 75 },
    { icon: MessageSquare, name: 'Communication', percentage: 65 },
    { icon: TrendingUp, name: 'Apprentissage rapide', percentage: 80 },
    { icon: Target, name: 'Esprit analytique', percentage: 75 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Compétences
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className={`text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <Code className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
              Compétences techniques
            </h3>
            <div className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: isVisible ? `${150 + index * 50}ms` : '0ms' }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3 flex-shrink-0">
                      <skill.icon className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{skill.name}</h4>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: isVisible ? `${skill.percentage}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
              Compétences transversales
            </h3>
            <div className="space-y-4">
              {businessSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{ transitionDelay: isVisible ? `${150 + index * 50}ms` : '0ms' }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-100 dark:bg-gray-600 p-2 rounded-lg mr-3 flex-shrink-0">
                      <skill.icon className="text-gray-700 dark:text-gray-300" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{skill.name}</h4>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{
                        width: isVisible ? `${skill.percentage}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
