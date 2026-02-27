import React, { useState } from 'react';
import { Check, Info, Leaf, Wind, ToggleRight } from 'lucide-react';
import { PRICING_TIERS } from '../constants';
import { LawnType, ServiceType } from '../types';

interface PricingProps {
  onSelectPlan: (type: LawnType, service: ServiceType) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [selectedLeaves, setSelectedLeaves] = useState<Record<string, boolean>>({
    jumele: false,
    detache: false
  });
  
  const [isEarlyBird, setIsEarlyBird] = useState(false);

  const toggleLeaves = (id: string) => {
    setSelectedLeaves(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to calculate cost per visit (approx 24 visits in 6 months)
  const calculatePerVisit = (monthlyPrice: number) => {
    const totalSeason = monthlyPrice * 6;
    const visits = 24;
    return Math.round(totalSeason / visits);
  };

  const applyDiscount = (price: number, isEarlyBird: boolean) => {
    return isEarlyBird ? price * 0.9 : price;
  };

  const formatPrice = (price: number) => {
    return price % 1 === 0 ? price : price.toFixed(2);
  };

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-[#111111] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Des tarifs simples. <br className="hidden md:block" />
            <span className="text-altea-green">Une tranquillité totale.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Aucun contrat caché. Abonnement saisonnier de 6 mois (Mai - Octobre).
            Payable mensuellement.
          </p>
        </div>

        {/* Early Bird Toggle */}
        <div className="flex justify-center mb-12">
          <div 
            onClick={() => setIsEarlyBird(!isEarlyBird)}
            className="liquid-glass-card p-1.5 rounded-full cursor-pointer flex items-center relative transition-all duration-300 hover:border-altea-green/50"
          >
            <div className={`
              px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10
              ${!isEarlyBird ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}
            `}>
              Prix régulier
            </div>
            <div className={`
              px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 flex items-center gap-2
              ${isEarlyBird ? 'bg-altea-green text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}
            `}>
              Prix Lève-Tôt (-10%)
            </div>
          </div>
        </div>
        
        {isEarlyBird && (
          <div className="text-center mb-8 animate-fade-in-up">
            <span className="inline-block bg-altea-green/10 text-altea-green text-sm font-bold px-4 py-1.5 rounded-full border border-altea-green/20">
              Rabais appliqué – Offre Lève-Tôt (Paiement avant le 15 avril)
            </span>
          </div>
        )}

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-16">
          {PRICING_TIERS.map((tier) => {
            const hasLeaves = selectedLeaves[tier.id];
            
            // Calculate base monthly price with discount if active
            const baseMonthly = applyDiscount(tier.monthlyPrice, isEarlyBird);
            const leafPrice = applyDiscount(tier.leafOptionPrice, isEarlyBird);
            
            const totalPrice = baseMonthly + (hasLeaves ? leafPrice : 0);
            
            // Formatting
            const displayPrice = formatPrice(totalPrice);
            const perVisitPrice = calculatePerVisit(baseMonthly);

            return (
              <div 
                key={tier.id} 
                className={`relative group rounded-3xl p-8 transition-all duration-300 flex flex-col
                  liquid-glass-card
                  hover:border-altea-green/30 dark:hover:border-altea-green/30
                  hover:shadow-2xl hover:-translate-y-1
                `}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{tier.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{tier.subtitle}</p>
                </div>

                <div className="mb-8 p-6 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                      {displayPrice}$
                    </span>
                    <span className="text-gray-500 font-medium">/ mois</span>
                  </div>
                  <div className="text-altea-green text-sm font-semibold mb-1">
                    Revient à seulement ~{perVisitPrice}$ / visite
                  </div>
                  <div className="text-xs text-gray-400">
                    Facturé sur {tier.months} mois
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-altea-green/10 p-1 rounded-full">
                        <Check size={14} className="text-altea-green" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {/* Leaf Option Toggle (Add-on) */}
                  <div 
                    onClick={() => toggleLeaves(tier.id)}
                    className={`mt-6 p-4 rounded-xl cursor-pointer border transition-all duration-200 flex flex-col gap-2 select-none
                      ${hasLeaves 
                        ? 'bg-altea-green/10 border-altea-green dark:bg-altea-green/20' 
                        : 'bg-white/40 dark:bg-black/20 border-white/40 dark:border-white/5 hover:border-gray-400 dark:hover:border-gray-600'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0
                        ${hasLeaves ? 'bg-altea-green border-altea-green' : 'border-gray-400'}
                      `}>
                        {hasLeaves && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${hasLeaves ? 'text-altea-green' : 'text-gray-700 dark:text-gray-300'}`}>
                            Ajouter nettoyage des feuilles
                          </span>
                          <Leaf size={16} className={hasLeaves ? 'text-altea-green' : 'text-gray-400'} />
                        </div>
                      </div>
                    </div>
                    <div className="pl-8">
                       <p className="text-xs text-gray-500 mb-1">
                        Deux passages inclus entre mi-octobre et mi-novembre, selon la météo.
                       </p>
                       <p className="text-xs font-semibold text-altea-green">
                        +{formatPrice(leafPrice)}$/mois
                       </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onSelectPlan(tier.id, hasLeaves ? 'tonte_feuilles' : 'tonte')}
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-altea-green hover:text-white dark:hover:bg-altea-green dark:hover:text-white transition-all duration-300 shadow-lg"
                >
                  CHOISIR CE FORFAIT
                </button>
              </div>
            );
          })}
        </div>

        {/* Standalone Leaf Removal Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="liquid-glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-orange-500/10 p-2 rounded-lg">
                    <Wind className="text-orange-500 w-6 h-6" />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ramassage de feuilles seulement</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                Deux passages inclus entre mi-octobre et mi-novembre, selon la météo. Paiement à l’avance requis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wider">Jumelé / Ville</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(applyDiscount(275, isEarlyBird))}$</span>
                  <span className="text-xs text-gray-500"> / saison</span>
                </div>
                <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase tracking-wider">Détaché / Banlieue</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(applyDiscount(350, isEarlyBird))}$</span>
                  <span className="text-xs text-gray-500"> / saison</span>
                </div>
              </div>
            </div>
            <div>
              <button 
                onClick={() => onSelectPlan('detache', 'feuilles_only')}
                className="whitespace-nowrap px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                RÉSERVER FEUILLES SEULEMENT
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="max-w-3xl mx-auto text-center flex items-start justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 liquid-glass-input p-4 rounded-xl">
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            Les prix affichés s’appliquent aux terrains standards.<br className="hidden sm:block"/>
            Les grands terrains et terrains boisés sont desservis sur soumission seulement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
