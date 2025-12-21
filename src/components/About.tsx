import { User, Target, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// import photo from '../assets/mon-image.jpg';

export default function About() {
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900 transition-colors"
    >
      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2
          className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          À propos de moi
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 mb-12 items-center">
          {/* PHOTO */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-800">
              <img
                src="b.jpeg"
                alt="Photo de moi"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CARTES */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="space-y-4">
              {/* Qui je suis */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start">
                  <User className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Qui je suis
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Étudiant passionné par l'intersection entre technologie et stratégie des affaires
                    </p>
                  </div>
                </div>
              </div>

              {/* Intérêts */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start">
                  <Zap className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Mes intérêts
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Intelligence Artificielle, Data Science, Cybersécurité et systèmes informatiques
                    </p>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-start">
                  <Target className="text-blue-600 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Ma motivation
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Apprendre continuellement et évoluer vers un professionnel de la tech orienté IA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TEXTE BAS */}
        <div
          className={`bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
            Je suis actuellement étudiant en première année à <strong>Swiss UMEF Campus Dakar</strong>,
            spécialisé en <strong>Intelligence Artificielle et Stratégie des Affaires</strong>.
          </p>

          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
            Je m'intéresse particulièrement à l'intelligence artificielle, à l'analyse de données,
            à la cybersécurité et aux systèmes informatiques.
          </p>

          <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
            Mon ambition est de combiner expertise technique et vision stratégique pour résoudre
            des problèmes complexes et innovants.
          </p>
        </div>
      </div>
    </section>
  );
}
