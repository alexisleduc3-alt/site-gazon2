import React from 'react';
import { Tag, Users, ArrowDownCircle } from 'lucide-react';

const Promos: React.FC = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="promos" className="py-20 bg-white dark:bg-[#111111] border-t border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-[#1A1A1A] dark:to-[#222] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-altea-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Économisez encore plus</h2>
              <p className="text-gray-300 text-lg mb-8">
                Nous récompensons l'organisation et le voisinage. Profitez de nos offres saisonnières exclusives.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-altea-green/20 p-3 rounded-xl h-fit">
                    <Tag className="text-altea-green w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Promo Lève-Tôt</h3>
                    <p className="text-gray-400 text-sm mb-2">Jusqu'au 15 Avril</p>
                    <p className="text-gray-200">
                      Réservez votre saison avant le 15 avril et obtenez <span className="text-altea-green font-bold">10% de rabais</span> immédiat sur la totalité du contrat.
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10"></div>

                <div className="flex gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl h-fit">
                    <Users className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Duo Voisin</h3>
                    <p className="text-gray-400 text-sm mb-2">Offre illimitée</p>
                    <p className="text-gray-200">
                      Signez avec un voisin immédiat et obtenez chacun <span className="text-blue-400 font-bold">50$ de crédit</span> sur votre dernière mensualité.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
              {/* Visual representation */}
              <div className="hidden md:flex relative w-64 h-64 border border-white/10 rounded-full items-center justify-center">
                 <div className="absolute inset-0 border border-altea-green/30 rounded-full animate-pulse"></div>
                 <div className="text-center">
                   <span className="block text-5xl font-bold text-white mb-2">-10%</span>
                   <span className="text-sm uppercase tracking-widest text-altea-green">Early Bird</span>
                 </div>
              </div>

              {/* Action Button to continue flow */}
              <button 
                onClick={scrollToBooking}
                className="w-full md:w-auto bg-white text-gray-900 hover:bg-altea-green hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Vérifier la disponibilité
                <ArrowDownCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promos;
