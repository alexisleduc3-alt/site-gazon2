import React, { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import NavBar from './components/NavBar.tsx';
import Pricing from './components/Pricing.tsx';
import Promos from './components/Promos.tsx';
import BookingForm from './components/BookingForm.tsx';
import Footer from './components/Footer.tsx';
import { LawnType, ServiceType } from './types.ts';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [selectedLawnType, setSelectedLawnType] = useState<LawnType>('detache');
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('tonte');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handlePlanSelection = (type: LawnType, service: ServiceType) => {
    setSelectedLawnType(type);
    setSelectedServiceType(service);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300 font-sans selection:bg-altea-green selection:text-white">
      
      {/* NavBar is sticky and pushes the Hero down */}
      <NavBar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section: Correct background image used with high readability overlay */}
      <section id="hero" className="relative h-[80vh] min-h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/fond-herbe.jpg" 
            alt="Pelouse résidentielle parfaite" 
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=2000&auto=format&fit=crop";
            }}
          />
          {/* Enhanced readability overlay: Darkening the image to make white text pop */}
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 animate-fade-in-up">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={18} className="text-altea-green fill-altea-green drop-shadow" />)}
            <span className="text-white text-[10px] md:text-xs font-black ml-3 tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              Service 5 Étoiles au Québec
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
            Tonte de gazon.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-altea-green to-emerald-300">Simplifiée.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            Un terrain impeccable sans lever le petit doigt. Nos équipes professionnelles s'occupent de tout pour que vous profitiez de votre été.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-altea-green hover:bg-altea-greenDark text-white px-12 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(46,204,113,0.3)] flex items-center justify-center gap-2"
            >
              VOIR LES TARIFS
              <ChevronRight size={22} />
            </button>
            <button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20 px-12 py-5 rounded-full font-black text-lg transition-all"
            >
              RÉSERVER MA PLACE
            </button>
          </div>
        </div>
      </section>

      <Pricing onSelectPlan={handlePlanSelection} />
      <Promos />
      <BookingForm 
        initialLawnType={selectedLawnType} 
        initialServiceType={selectedServiceType} 
      />
      <Footer />
    </div>
  );
};

export default App;
