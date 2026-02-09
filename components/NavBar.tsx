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
      const offset = 80; // Ajuster selon la hauteur de la barre
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
          <div className="bg-altea-green rounded-lg p-1 transition-transform group-hover:rotate-12">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            ALTEA
          </span>
        </div>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Tarifs', id: 'pricing' },
            { label: 'Promos', id: 'promos' },
            { label: 'Contact', id: 'footer' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-bold tracking-wide hover:text-altea-green transition-colors ${
                isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-gray-200'
              }`}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
          
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-altea-green hover:bg-altea-greenDark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-altea-green/30 active:scale-95"
          >
            RÉSERVER
          </button>

          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${
              isScrolled 
                ? 'bg-gray-100 dark:bg-gray-800 hover:bg-altea-green/10 text-gray-800 dark:text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label="Changer le thème"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
          >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white dark:bg-[#111] z-40 p-8 flex flex-col gap-8 md:hidden animate-fade-in">
          {[
            { label: 'Tarifs', id: 'pricing' },
            { label: 'Promos', id: 'promos' },
            { label: 'Contact', id: 'footer' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-3xl font-black text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-altea-green text-white py-5 rounded-2xl font-black text-xl shadow-xl mt-auto"
          >
            RÉSERVER MAINTENANT
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
