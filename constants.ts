import { PricingTier } from './types';

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'jumele',
    title: 'Maison de Ville / Jumelé',
    subtitle: 'Terrain standard urbain',
    monthlyPrice: 175,
    months: 6,
    visitPriceAnchor: '', // Calculated dynamically in component
    leafOptionPrice: 40,
    features: [
      'Tonte hebdomadaire (Mai - Oct)',
      'Coupe bordures (Trim) soignée',
      'Soufflage des résidus (Driveway/Walkway)'
    ]
  },
  {
    id: 'detache',
    title: 'Maison Détachée',
    subtitle: 'Terrain standard banlieue',
    monthlyPrice: 195,
    months: 6,
    visitPriceAnchor: '', // Calculated dynamically in component
    leafOptionPrice: 50,
    features: [
      'Tonte hebdomadaire (Mai - Oct)',
      'Coupe bordures (Trim) soignée',
      'Soufflage des résidus (Driveway/Walkway)'
    ]
  }
];

export const CONTACT_INFO = {
  email: 'bonjour@altea.ca',
  phone: '(514) 555-0199',
  address: 'Québec, QC'
};
