import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Star } from 'lucide-react';

interface NavBarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* 1. Bannière d'offre */}
      <div className="bg-emerald-900 text-white text-center py-2 px-4 text-xs md:text-sm font-semibold border-b border-white/10 relative z-50">
        OFFRE EXCLUSIVE : PROMO LÈVE-TÔT — <span className="text-altea-green font-bold">10% DE RABAIS</span> AVANT LE 15 AVRIL.
      </div>

      {/* 2. Navigation : Transparente en haut, blanche au scroll */}
      <nav 
        className={`w-full transition-all duration-300 relative z-50 ${
          mobileMenuOpen || isScrolled 
            ? 'bg-white dark:bg-[#111111] py-2 shadow-lg border-b border-white/10' 
            : 'bg-transparent py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Row 1: Logo and Toggles */}
          <div className="flex items-center justify-between w-full h-12">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
              <img 
                src="/logo.png" 
                alt="ALTEA Logo" 
                className="h-7 sm:h-8 md:h-10 w-auto object-contain"
              />
              <span className={`text-xl sm:text-2xl font-black tracking-tighter transition-colors ${isScrolled || mobileMenuOpen ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                ALTEA
              </span>
            </div>

            {/* Liens Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {['pricing', 'promos', 'footer'].map((id) => (
                <button 
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-altea-green' : 'text-white hover:text-altea-green'
                  }`}
                >
                  {id === 'pricing' ? 'TARIFS' : id === 'promos' ? 'PROMOS' : 'CONTACT'}
                </button>
              ))}
              
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-altea-green hover:bg-altea-greenDark text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg"
              >
                RÉSERVER
              </button>

              <button onClick={toggleTheme} className={`p-2 rounded-full ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            
             {/* Mobile Toggles */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isScrolled || mobileMenuOpen ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
                 {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 transition-colors ${isScrolled || mobileMenuOpen ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Row 2: 5-Star Badge (Mobile Only) */}
          <div className="flex md:hidden justify-center items-center gap-2 h-10 mt-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={12} className="text-altea-green fill-altea-green drop-shadow-sm" />
              ))}
            </div>
            <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5' 
                : 'text-white border-white/20 bg-black/20'
            }`}>
              Service 5 Étoiles au Québec
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-[#111111] p-8 flex flex-col md:hidden z-40 animate-fade-in overflow-y-auto pt-[180px] h-screen">
          <div className="flex flex-col gap-6">
            {['pricing', 'promos', 'footer'].map((id) => (
              <button 
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left text-2xl font-black tracking-tight text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/5 pb-6"
              >
                {id === 'pricing' ? 'Tarifs' : id === 'promos' ? 'Promos' : 'Contact'}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-altea-green text-white py-5 rounded-2xl font-black text-xl text-center shadow-xl shadow-altea-green/20 mt-4"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
