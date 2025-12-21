import { Github, Linkedin, Mail, ChevronDown, FileText } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            El Hadji Birane Cisse Thiam
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-4">
            Étudiant en Intelligence Artificielle & Stratégie des Affaires
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Swiss UMEF Campus Dakar
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="mailto:djeumbemalickl@gmail.com"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="text-gray-700 dark:text-gray-300" size={24} />
            </a>
            <a
              href="https://github.com/votreprofil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="text-gray-700 dark:text-gray-300" size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/el-hadji-birane-cisse-thiam-1917a9336/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="text-gray-700 dark:text-gray-300" size={24} />
            </a>
            <a
              href="#"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="CV"
            >
              <FileText className="text-gray-700 dark:text-gray-300" size={24} />
            </a>
          </div>

          <button
            onClick={scrollToAbout}
            className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
          >
            Découvrir mon profil
            <ChevronDown className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
