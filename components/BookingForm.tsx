import React, { useState, useEffect } from 'react';
import { LawnType, ServiceType, LandCategory, BookingFormData } from '../types';
import { CalendarCheck, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface BookingFormProps {
  initialLawnType: LawnType;
  initialServiceType: ServiceType;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialLawnType, initialServiceType }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    address: '',
    email: '',
    phone: '',
    lawnType: initialLawnType,
    landCategory: 'standard',
    serviceType: initialServiceType,
    isDuoVoisin: false,
    neighborInfo: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      lawnType: initialLawnType,
      serviceType: initialServiceType
    }));
  }, [initialLawnType, initialServiceType]);

  const handleNeighborChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      neighborInfo: {
        ...prev.neighborInfo!,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    // --- CONFIGURATION EMAILJS ---
    const SERVICE_ID = 'service_1sjow9s';
    const PUBLIC_KEY = 'u6N8LATJ1y9hnE259';
    
    // 1. Template pour toi (Excel)
    const TEMPLATE_ID_ADMIN = 'template_59eay7o'; 
    
    // 2. Template pour le client (Confirmation automatique)
    // N'oublie pas de remplacer cet ID par celui créé dans ton dashboard
    const TEMPLATE_ID_CLIENT = 'METTRE_ID_TEMPLATE_CLIENT_ICI'; 

    // Préparation des données pour EmailJS
    const templateParams = {
      to_name: "Admin Altea",
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      client_address: formData.address,
      service_type: formData.serviceType,
      lawn_type: formData.lawnType === 'detache' ? 'Maison Détachée' : 'Jumelé / Ville',
      land_category: formData.landCategory === 'standard' ? 'Standard' : 'Grand/Boisé',
      is_duo: formData.isDuoVoisin ? 'OUI' : 'NON',
      // Variables du voisin (v_...) - On laisse vide si pas de duo pour Excel
      v_nom: formData.isDuoVoisin ? formData.neighborInfo?.name : '',
      v_adr: formData.isDuoVoisin ? formData.neighborInfo?.address : '',
      v_tel: formData.isDuoVoisin ? formData.neighborInfo?.phone : '',
      v_mail: formData.isDuoVoisin ? formData.neighborInfo?.email : '',
      commentaire: formData.comment || 'Aucun'
    };

    try {
      // Envoi 1 : À toi (Format Excel avec 2 lignes possibles)
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, templateParams, PUBLIC_KEY);
      
      // Envoi 2 : Au client (Confirmation)
      if (TEMPLATE_ID_CLIENT && TEMPLATE_ID_CLIENT !== 'METTRE_ID_TEMPLATE_CLIENT_ICI') {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID_CLIENT, templateParams, PUBLIC_KEY);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setErrorMsg("Une erreur est survenue lors de l'envoi. Veuillez nous appeler directement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="booking" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-altea-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarCheck className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Demande Reçue !</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Merci {formData.name}. Un courriel de confirmation vous a été envoyé. On se reparle sous 24h !
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-8 text-altea-green font-medium hover:underline"
          >
            Faire une autre demande
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vérifier la disponibilité
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Les places sont limitées par secteur. Bloquez la vôtre maintenant pour la saison.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1A1A1A] p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nom complet</label>
              <input 
                type="text" required value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none"
                placeholder="Ex: Jean Tremblay"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Téléphone</label>
              <input 
                type="tel" required value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none"
                placeholder="(418) 555-0123"
              />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adresse de service</label>
            <input 
              type="text" required value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="123 Rue des Érables, Québec"
            />
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Courriel</label>
            <input 
              type="email" required value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none"
              placeholder="votre@courriel.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8 bg-gray-50 dark:bg-[#111] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Catégorie de terrain</label>
              <select 
                value={formData.landCategory}
                onChange={e => setFormData({...formData, landCategory: e.target.value as LandCategory})}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none"
              >
                <option value="standard">Terrain Standard</option>
                <option value="grand_boise">Grand terrain / Boisé</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type de terrain</label>
              <select 
                value={formData.lawnType}
                onChange={e => setFormData({...formData, lawnType: e.target.value as LawnType})}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none"
              >
                <option value="jumele">Maison de Ville / Jumelé</option>
                <option value="detache">Maison Détachée</option>
              </select>
            </div>
          </div>

          <div className="mb-8 border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <input 
                type="checkbox" id="duoVoisin" checked={formData.isDuoVoisin}
                onChange={e => setFormData({...formData, isDuoVoisin: e.target.checked})}
                className="w-5 h-5 rounded text-altea-green mt-1 cursor-pointer"
              />
              <div>
                <label htmlFor="duoVoisin" className="font-bold text-gray-900 dark:text-white cursor-pointer">
                  Duo Voisin – Crédit de 50 $ chacun
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Signez avec un voisin immédiat et recevez un crédit sur votre dernière mensualité.
                </p>
              </div>
            </div>

            {formData.isDuoVoisin && (
              <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                <input 
                  placeholder="Nom du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.name}
                  onChange={e => handleNeighborChange('name', e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none"
                />
                <input 
                  placeholder="Adresse du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.address}
                  onChange={e => handleNeighborChange('address', e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none"
                />
                <input 
                  type="tel"
                  placeholder="Téléphone du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.phone}
                  onChange={e => handleNeighborChange('phone', e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none"
                />
                <input 
                  type="email"
                  placeholder="Courriel du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.email}
                  onChange={e => handleNeighborChange('email', e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none"
                />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Commentaire (optionnel)</label>
            <textarea 
              value={formData.comment}
              onChange={e => setFormData({...formData, comment: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none min-h-[100px] resize-none"
              placeholder="Informations supplémentaires (chien, piscine, code de barrière...)"
            />
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-altea-green hover:bg-altea-greenDark text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 text-lg transition-transform active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "BLOQUER MA PLACE"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
