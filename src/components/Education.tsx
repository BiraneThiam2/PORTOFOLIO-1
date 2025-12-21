import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Parcours académique
        </h2>

        <div className="space-y-8">
          {/* Carte 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start">
              <div className="bg-blue-600 p-4 rounded-lg mr-6">
                <GraduationCap className="text-white" size={32} />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Intelligence Artificielle & Stratégie des Affaires
                </h3>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin size={18} className="mr-2" />
                    <span>Swiss UMEF Campus Dakar</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar size={18} className="mr-2" />
                    <span>Première année (en cours)</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3">
                  Formation spécialisée combinant les compétences techniques en intelligence
                  artificielle avec une compréhension stratégique du monde des affaires.
                  Cette filière me permet de développer une vision holistique de la transformation
                  numérique des entreprises.
                </p>

                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <strong>Domaines d'études :</strong> Machine Learning, Data Science,
                    Stratégie d'entreprise, Transformation digitale, Réseaux et systèmes,
                    Cybersécurité
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-gray-300 dark:border-gray-600">
            <div className="flex items-start">
              <div className="bg-gray-600 p-4 rounded-lg mr-6">
                <GraduationCap className="text-white" size={32} />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Génie Logiciel & Bases de données
                </h3>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin size={18} className="mr-2" />
                    <span>Formation initiale</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar size={18} className="mr-2" />
                    <span>Première année (complétée)</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3">
                  Première année d'études en génie logiciel et bases de données, qui m'a permis
                  d'acquérir des bases solides en développement logiciel et gestion de données.
                  Cette expérience a consolidé mes compétences techniques avant ma réorientation
                  vers l'intelligence artificielle.
                </p>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    <strong>Compétences acquises :</strong> Programmation, Conception de bases
                    de données, SQL, Modélisation, Architecture logicielle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
