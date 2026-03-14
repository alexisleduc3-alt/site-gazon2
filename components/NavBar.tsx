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
      <div className="bg-emerald-900 text-white text-center py-2 px-4 text-xs md:text-sm font-semibold border-b border-white/10">
        OFFRE EXCLUSIVE : PROMO LÈVE-TÔT — <span className="text-altea-green font-bold">10% DE RABAIS</span> AVANT LE 15 AVRIL.
      </div>

      {/* 2. Navigation : Transparente en haut, blanche au scroll */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/70 dark:bg-[#111111]/70 backdrop-blur-2xl saturate-150 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] border-b border-white/50 dark:border-white/10' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-y-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group order-1" onClick={() => scrollToSection('hero')}>
            <img 
              src="/logo.png" 
              alt="ALTEA Logo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
            <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              ALTEA
            </span>
          </div>

          {/* 5-Star Badge - Responsive Wrap */}
          <div className="order-3 w-full min-[380px]:w-auto min-[380px]:order-2 flex justify-center items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} className="text-altea-green fill-altea-green drop-shadow-sm" />
              ))}
            </div>
            <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5' 
                : 'text-white border-white/20 bg-black/20'
            }`}>
              Service 5 Étoiles au Québec
            </span>
          </div>

          {/* Liens Desktop */}
          <div className="hidden md:flex items-center gap-8 order-3">
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
          
           {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4 order-2 min-[380px]:order-3">
            <button onClick={toggleTheme} className={`p-2 rounded-full ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 liquid-glass-card border-t-0 rounded-b-2xl p-6 flex flex-col gap-6 md:hidden mx-4 mt-2">
            {['pricing', 'promos', 'footer'].map((id) => (
              <button 
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-left text-lg font-medium text-gray-900 dark:text-white"
              >
                {id === 'pricing' ? 'Tarifs' : id === 'promos' ? 'Promos' : 'Contact'}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-altea-green text-white py-3 rounded-lg font-bold text-center"
            >
              Réserver maintenant
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
