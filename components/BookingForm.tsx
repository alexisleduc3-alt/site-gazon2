import React, { useState, useEffect } from 'react';
import { LawnType, ServiceType, BookingFormData } from '../types';
import RadioCard from './RadioCard';
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
    lawnType: initialLawnType || 'jumele',
    serviceType: initialServiceType || 'tonte',
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
  const [errors, setErrors] = useState<{phone?: string, address?: string}>({});

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    let phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length === 11 && phoneNumber.startsWith('1')) {
      phoneNumber = phoneNumber.slice(1);
    }
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const formatAddress = (value: string) => {
    return value.replace(/\s+/g, ' ').trim();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handlePhoneBlur = () => {
    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length > 0 && digits.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Le numéro doit contenir 10 chiffres.' }));
    }
  };

  const handleAddressBlur = () => {
    const cleaned = formatAddress(formData.address);
    setFormData(prev => ({ ...prev, address: cleaned }));
    if (cleaned.length > 0 && cleaned.length < 5) {
      setErrors(prev => ({ ...prev, address: 'Veuillez entrer une adresse plus précise.' }));
    } else {
      setErrors(prev => ({ ...prev, address: undefined }));
    }
  };

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
    
    const digits = formData.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setErrors(prev => ({ ...prev, phone: 'Le numéro doit contenir 10 chiffres.' }));
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg(null);

    // --- CONFIGURATION EMAILJS ---
    const SERVICE_ID = 'service_1sjow9s';
    const PUBLIC_KEY = 'u6N8LATJ1y9hnE259';
    const TEMPLATE_ID_ADMIN = 'template_59eay7o'; 

    // Traduction propre pour l'affichage dans le mail et Excel
    const lawnTypeDisplay = formData.lawnType === 'detache' ? 'Maison Détachée' : 'Maison de Ville / Jumelé';
    let serviceTypeDisplay = '';
    if (formData.serviceType === 'tonte') serviceTypeDisplay = 'Entretien régulier';
    else if (formData.serviceType === 'tonte_feuilles') serviceTypeDisplay = 'Entretien régulier + Nettoyage des feuilles';
    else serviceTypeDisplay = 'Ramassage de feuilles seulement';

    // Sécuriser les commentaires pour Excel (remplace les sauts de ligne par " | ")
    const safeComment = (formData.comment || 'Aucun').replace(/\n/g, ' | ');

    // --- GÉNÉRATION DES LIGNES EXCEL ---
    let excelLines = `${formData.name};${formData.phone};${formData.email};${formData.address};${lawnTypeDisplay};${serviceTypeDisplay};${formData.isDuoVoisin ? 'OUI (Client 1)' : 'NON'};${safeComment}`;

    if (formData.isDuoVoisin) {
      const nInfo = formData.neighborInfo;
      const neighborLine = `${nInfo?.name || 'N/A'};${nInfo?.phone || 'N/A'};${nInfo?.email || 'N/A'};${nInfo?.address || 'N/A'};${lawnTypeDisplay};${serviceTypeDisplay};OUI (Client 2);${safeComment}`;
      excelLines += `\n${neighborLine}`;
    }

    const templateParams = {
      to_name: "Admin Altea",
      client_name: formData.name,
      client_email: formData.email,
      email: formData.email,
      client_phone: formData.phone,
      client_address: formData.address,
      
      lawn_type_display: lawnTypeDisplay,
      service_type_display: serviceTypeDisplay,
      excel_lines: excelLines, 
      
      is_duo: formData.isDuoVoisin ? 'OUI' : 'NON', 
      is_duo_bool: formData.isDuoVoisin,
      v_nom: formData.isDuoVoisin ? formData.neighborInfo?.name : 'N/A',
      v_adr: formData.isDuoVoisin ? formData.neighborInfo?.address : 'N/A',
      v_tel: formData.isDuoVoisin ? formData.neighborInfo?.phone : 'N/A',
      v_mail: formData.isDuoVoisin ? formData.neighborInfo?.email : 'N/A',
      
      commentaire: formData.comment || 'Aucun commentaire'
    };

    try {
      // Envoi du courriel à l'administrateur
      await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, templateParams, PUBLIC_KEY);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setErrorMsg("Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion ou nous appeler.");
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
            Merci {formData.name} ! Votre demande a été reçue.<br/>
            Nous vous contacterons sous 24 à 48 heures pour confirmer et vous envoyer votre soumission officielle.
          </p>
          <button 
            onClick={() => {
                setIsSuccess(false);
                setFormData({
                    ...formData,
                    name: '', phone: '', email: '', address: '', comment: '', 
                    isDuoVoisin: false, neighborInfo: { name: '', address: '', phone: '', email: '' }
                });
            }}
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
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green transition-all"
                placeholder="Ex: Jean Tremblay"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Téléphone</label>
              <input 
                type="tel" required value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border ${errors.phone ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-altea-green focus:ring-altea-green'} text-gray-900 dark:text-white outline-none focus:ring-1 transition-all`}
                placeholder="(418) 555-0123"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adresse de service</label>
            <input 
              type="text" required value={formData.address}
              onChange={e => {
                setFormData({...formData, address: e.target.value});
                if (errors.address) setErrors({ ...errors, address: undefined });
              }}
              onBlur={handleAddressBlur}
              className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border ${errors.address ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-altea-green focus:ring-altea-green'} text-gray-900 dark:text-white outline-none focus:ring-1 transition-all`}
              placeholder="123 Rue des Érables, Québec, QC, G1A 1A1"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Courriel</label>
            <input 
              type="email" required value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green transition-all"
              placeholder="votre@courriel.com"
            />
          </div>

          <div className="space-y-8 mb-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">Type de propriété</label>
              <div className="grid md:grid-cols-2 gap-4">
                <RadioCard 
                  id="jumele"
                  name="lawnType"
                  value="jumele"
                  checked={formData.lawnType === 'jumele'}
                  onChange={(value) => setFormData({ ...formData, lawnType: value as LawnType })}
                  label="Maison de Ville / Jumelé"
                />
                <RadioCard 
                  id="detache"
                  name="lawnType"
                  value="detache"
                  checked={formData.lawnType === 'detache'}
                  onChange={(value) => setFormData({ ...formData, lawnType: value as LawnType })}
                  label="Maison Détachée"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">Choix du forfait</label>
              <div className="space-y-4">
                <RadioCard 
                  id="tonte"
                  name="serviceType"
                  value="tonte"
                  checked={formData.serviceType === 'tonte'}
                  onChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
                  label="Entretien régulier"
                  description="Inclut : Tonte, Bordures, Soufflage"
                />
                <RadioCard 
                  id="tonte_feuilles"
                  name="serviceType"
                  value="tonte_feuilles"
                  checked={formData.serviceType === 'tonte_feuilles'}
                  onChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
                  label="Entretien régulier + Nettoyage des feuilles"
                />
                <RadioCard 
                  id="feuilles_only"
                  name="serviceType"
                  value="feuilles_only"
                  checked={formData.serviceType === 'feuilles_only'}
                  onChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
                  label="Ramassage de feuilles seulement"
                  description="Forfait saisonnier"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-xs text-gray-500 italic mb-8 mt-3">
              Pour les terrains boisés ou besoins hors-normes, veuillez préciser dans les commentaires ci-dessous.
            </p>
          </div>

          <div className="mb-8 border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <input 
                type="checkbox" id="duoVoisin" checked={formData.isDuoVoisin}
                onChange={e => setFormData({...formData, isDuoVoisin: e.target.checked})}
                className="w-5 h-5 rounded text-altea-green mt-1 accent-altea-green cursor-pointer"
              />
              <div>
                <label htmlFor="duoVoisin" className="font-bold text-gray-900 dark:text-white cursor-pointer block">
                  Duo Voisin – Crédit de 50 $ chacun
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Signez avec un voisin immédiat et recevez un crédit sur votre dernière mensualité.
                </p>
              </div>
            </div>

            {formData.isDuoVoisin && (
              <div className="grid md:grid-cols-2 gap-4 animate-fade-in mt-4">
                <input 
                  placeholder="Nom du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.name}
                  onChange={e => handleNeighborChange('name', e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green"
                />
                <input 
                  placeholder="Adresse du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.address}
                  onChange={e => handleNeighborChange('address', e.target.value)}
                  onBlur={() => handleNeighborChange('address', formatAddress(formData.neighborInfo?.address || ''))}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green"
                />
                <input 
                  type="tel"
                  placeholder="Téléphone du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.phone}
                  onChange={e => handleNeighborChange('phone', formatPhoneNumber(e.target.value))}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green"
                />
                <input 
                  type="email"
                  placeholder="Courriel du voisin" required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.email}
                  onChange={e => handleNeighborChange('email', e.target.value)}
                  className="px-4 py-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-sm outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green"
                />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Commentaire (optionnel)</label>
            <textarea 
              value={formData.comment}
              onChange={e => setFormData({...formData, comment: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white outline-none focus:border-altea-green focus:ring-1 focus:ring-altea-green min-h-[100px] resize-none"
              placeholder="Informations supplémentaires sur votre terrain (boisé, chien, piscine...)"
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
