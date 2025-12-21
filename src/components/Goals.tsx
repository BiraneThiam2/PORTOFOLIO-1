import { Target, TrendingUp, Users, Award } from 'lucide-react';

export default function Goals() {
  const goals = [
    {
      icon: TrendingUp,
      title: 'Développement continu',
      description:
        "Approfondir mes compétences en Intelligence Artificielle, Machine Learning et analyse de données à travers des projets concrets et des formations spécialisées",
    },
    {
      icon: Users,
      title: 'Vision Tech-Business',
      description:
        "Comprendre et maîtriser le lien entre technologie et stratégie business pour créer de la valeur et transformer les organisations",
    },
    {
      icon: Target,
      title: 'Expérience pratique',
      description:
        "Acquérir de l'expérience terrain à travers des stages, projets collaboratifs et contributions à des initiatives innovantes",
    },
    {
      icon: Award,
      title: 'Évolution professionnelle',
      description:
        "Évoluer vers des métiers stratégiques liés à l'IA, la data science ou la cybersécurité dans des environnements technologiques avancés",
    },
  ];

  return (
    <section
      id="goals"
      className="py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Objectifs professionnels
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Ma vision et mes ambitions pour construire une carrière à l'intersection
          de la technologie et du business
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {goals.map((goal) => (
            <div
              key={goal.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-start">
                <div className="bg-blue-600 p-3 rounded-lg mr-4 flex-shrink-0">
                  <goal.icon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {goal.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engagement */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Mon engagement
          </h3>
          <p className="text-gray-700 dark:text-gray-200 text-center leading-relaxed max-w-3xl mx-auto">
            Je m'engage à développer une expertise solide en combinant rigueur technique,
            curiosité intellectuelle et vision stratégique. Mon objectif est de devenir un
            professionnel capable de comprendre les enjeux technologiques et business pour
            contribuer à l'innovation et à la transformation numérique des organisations.
          </p>
        </div>
      </div>
    </section>
  );
}
