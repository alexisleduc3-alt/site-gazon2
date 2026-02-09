import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-100 dark:bg-[#050505] pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
             <div className="flex items-center gap-2 mb-4">
              {/* Note: Assurez-vous que logo.png est dans le dossier public */}
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">ALTEA</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Service d'entretien de pelouse résidentiel haut de gamme. 
              Simplifiez votre été avec nos solutions clés en main et profitez pleinement de votre extérieur.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Nous Joindre</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-200">Adresse:</span>
                {CONTACT_INFO.address}
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-200">Téléphone:</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-altea-green transition-colors">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-200">Courriel:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-altea-green transition-colors">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#hero" className="text-gray-600 dark:text-gray-400 hover:text-altea-green transition-colors">Accueil</a></li>
              <li><a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-altea-green transition-colors">Forfaits & Tarifs</a></li>
              <li><a href="#promos" className="text-gray-600 dark:text-gray-400 hover:text-altea-green transition-colors">Promotions en cours</a></li>
              <li><a href="#booking" className="text-gray-600 dark:text-gray-400 hover:text-altea-green transition-colors font-medium">Réserver maintenant</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-600">
            © {new Date().getFullYear()} ALTEA Entretien de pelouse. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
