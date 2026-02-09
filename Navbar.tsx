import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface NavbarProps {
  onOpenBooking: () => void;
  onScrollTo: (id: string) => void;
  onShowAbout: () => void;
}

export function Navbar({ onOpenBooking, onScrollTo, onShowAbout }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages: Language[] = ['fr', 'en', 'ar'];

  const handleNavClick = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="https://lh3.googleusercontent.com/d/1uNPuv7wHpgRrwqR85HTkq_SUHMddoL7y=w200" 
              alt="E-Motion Voyages" 
              className="h-14 w-auto object-contain cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium">
            <button onClick={onShowAbout} className="text-gray-600 hover:text-terracotta transition">
              {t('nav_about')}
            </button>
            <button onClick={() => onScrollTo('hotels')} className="text-gray-600 hover:text-terracotta transition">
              {t('nav_hotels')}
            </button>
            <button onClick={() => onScrollTo('excursions')} className="text-gray-600 hover:text-terracotta transition">
              {t('nav_excursions')}
            </button>
            <button onClick={() => onScrollTo('testimonials')} className="text-gray-600 hover:text-terracotta transition">
              {t('nav_testimonials')}
            </button>
            <button 
              onClick={onOpenBooking} 
              className="bg-terracotta text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition font-bold shadow-md cursor-pointer"
            >
              {t('book_now')}
            </button>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <div className="flex text-sm font-bold text-gray-400 gap-2">
              {languages.map((lang, idx) => (
                <span key={lang} className="flex items-center gap-2">
                  <button 
                    onClick={() => setLanguage(lang)} 
                    className={`hover:text-terracotta transition ${language === lang ? 'text-black font-bold' : ''}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                  {idx < languages.length - 1 && <span>|</span>}
                </span>
              ))}
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition focus:outline-none"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-dark mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-dark mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-2">
            <button 
              onClick={() => handleNavClick(onShowAbout)} 
              className="text-gray-700 hover:text-terracotta hover:bg-terracotta/5 transition py-3 px-4 rounded-lg text-left font-medium flex items-center gap-3"
            >
              <i className="fa-solid fa-info-circle text-terracotta w-5"></i>
              {t('nav_about')}
            </button>
            <button 
              onClick={() => handleNavClick(() => onScrollTo('hotels'))} 
              className="text-gray-700 hover:text-terracotta hover:bg-terracotta/5 transition py-3 px-4 rounded-lg text-left font-medium flex items-center gap-3"
            >
              <i className="fa-solid fa-hotel text-terracotta w-5"></i>
              {t('nav_hotels')}
            </button>
            <button 
              onClick={() => handleNavClick(() => onScrollTo('excursions'))} 
              className="text-gray-700 hover:text-terracotta hover:bg-terracotta/5 transition py-3 px-4 rounded-lg text-left font-medium flex items-center gap-3"
            >
              <i className="fa-solid fa-mountain-sun text-terracotta w-5"></i>
              {t('nav_excursions')}
            </button>
            <button 
              onClick={() => handleNavClick(() => onScrollTo('testimonials'))} 
              className="text-gray-700 hover:text-terracotta hover:bg-terracotta/5 transition py-3 px-4 rounded-lg text-left font-medium flex items-center gap-3"
            >
              <i className="fa-solid fa-star text-terracotta w-5"></i>
              {t('nav_testimonials')}
            </button>
            
            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>
            
            {/* CTA Button */}
            <button 
              onClick={() => handleNavClick(onOpenBooking)} 
              className="bg-terracotta text-white py-3 px-4 rounded-lg hover:bg-terracotta/90 transition font-bold shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-regular fa-credit-card"></i>
              {t('book_now')}
            </button>
            
            {/* WhatsApp Quick Contact */}
            <a 
              href="https://wa.me/33609971563" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-whatsapp text-white py-3 px-4 rounded-lg hover:bg-green-600 transition font-bold shadow-md flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
