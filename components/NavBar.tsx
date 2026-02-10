import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

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
            ? 'bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md py-3 shadow-md border-b border-gray-100' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <img 
              src="/logo.png" 
              alt="ALTEA Logo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
            <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
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
          
           {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-4">
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
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#1A1A1A] border-t dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6 md:hidden">
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
