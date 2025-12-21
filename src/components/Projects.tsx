import { Code, Database, Shield, Network } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Projects() {
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

  const projects = [
    {
      icon: Code,
      title: 'Projets Python',
      description: 'Mini-projets et exercices de programmation en Python pour développer mes compétences en algorithmique et manipulation de données',
      technologies: ['Python', 'Algorithmes'],
      category: 'Programmation',
    },
    {
      icon: Network,
      title: 'Études de cas - Réseaux',
      description: 'Analyse et conception de réseaux informatiques, étude des protocoles et des architectures réseau',
      technologies: ['Réseaux', 'Protocoles', 'Architecture'],
      category: 'Réseaux',
    },
    {
      icon: Shield,
      title: 'Projets en Cybersécurité',
      description: 'Exploration des concepts fondamentaux de la sécurité informatique et des bonnes pratiques de protection des systèmes',
      technologies: ['Sécurité', 'Cryptographie', 'Protection'],
      category: 'Sécurité',
    },
    {
      icon: Database,
      title: 'Projets Bases de données',
      description: 'Conception et manipulation de bases de données, requêtes SQL et modélisation de données',
      technologies: ['SQL', 'Modélisation', 'Bases de données'],
      category: 'Data',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Projets
        </h2>
        <p className={`text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Découvrez mes projets académiques et personnels qui reflètent mon apprentissage
          et mon évolution dans le domaine de la technologie
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? `${200 + index * 100}ms` : '0ms' }}
            >
              <div className="bg-blue-600 dark:bg-blue-700 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <project.icon className="text-white" size={28} />
              </div>

              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full mb-3">
                {project.category}
              </span>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {project.title}
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
