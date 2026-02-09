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
      const offset = 100; // Adjusted for sticky header
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
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* 1. Integrated Banner: Stays pinned at the very top */}
      <div className="bg-emerald-900 text-white text-center py-2.5 px-4 text-xs md:text-sm font-semibold tracking-wide border-b border-white/10">
        <span className="hidden sm:inline">OFFRE EXCLUSIVE : </span>
        PROMO LÈVE-TÔT — <span className="text-altea-green font-bold">10% DE RABAIS</span> AVANT LE 15 AVRIL.
      </div>

      {/* 2. Navigation Bar: Pushes content down, solid background for visibility */}
      <nav 
        className={`w-full transition-all duration-300 border-b border-gray-100 dark:border-gray-800 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md py-3 shadow-md' 
            : 'bg-white dark:bg-[#111111] py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo & Brand: Fixed visibility with dark text in light mode */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <img 
              src="/logo.png" 
              alt="ALTEA Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
              ALTEA
            </span>
          </div>

          {/* Desktop Links: Always visible against solid background */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Tarifs', id: 'pricing' },
              { label: 'Promos', id: 'promos' },
              { label: 'Contact', id: 'footer' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200 hover:text-altea-green dark:hover:text-altea-green transition-colors"
              >
                {item.label.toUpperCase()}
              </button>
            ))}
            
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-altea-green hover:bg-altea-greenDark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-altea-green/20 active:scale-95"
            >
              RÉSERVER
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-altea-green/10 text-gray-800 dark:text-white transition-all"
              aria-label="Changer le thème"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-800 dark:text-white"
            >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-800 dark:text-white"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[100px] bg-white dark:bg-[#111] z-40 p-8 flex flex-col gap-8 md:hidden animate-fade-in shadow-2xl overflow-y-auto">
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
    </header>
  );
};

export default NavBar;
