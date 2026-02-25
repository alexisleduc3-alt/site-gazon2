export type LawnType = 'jumele' | 'detache';
export type ServiceType = 'tonte' | 'tonte_feuilles' | 'feuilles_only';

export interface PricingTier {
  id: LawnType;
  title: string;
  subtitle: string;
  monthlyPrice: number;
  months: number;
  visitPriceAnchor: string;
  leafOptionPrice: number;
  features: string[];
}

export interface NeighborInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface BookingFormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  lawnType: LawnType;
  serviceType: ServiceType;
  isDuoVoisin: boolean;
  neighborInfo?: NeighborInfo;
  comment?: string;
}
