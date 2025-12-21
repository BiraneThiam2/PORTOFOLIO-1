import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 dark:text-gray-500 flex items-center justify-center mb-2">
            Créé avec <Heart className="mx-2 text-red-500" size={18} fill="currentColor" />
            par El Hadji Birane Cisse Thiam
          </p>
          <p className="text-gray-500 dark:text-gray-600 text-sm">
            {new Date().getFullYear()} - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
