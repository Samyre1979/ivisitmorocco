import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface StickyBookingButtonProps {
  onBookingClick: () => void;
}

export function StickyBookingButton({ onBookingClick }: StickyBookingButtonProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton après avoir scrollé de 500px
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Afficher si on a scrollé plus de 500px et qu'on n'est pas tout en bas (footer)
      const isNearBottom = scrollY + windowHeight >= documentHeight - 200;
      
      if (scrollY > 500 && !isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent">
      <div className="max-w-xl mx-auto">
        <button
          onClick={onBookingClick}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-bold py-4 px-8 rounded-full transition flex items-center justify-center gap-3 text-lg shadow-2xl transform hover:-translate-y-1 cursor-pointer"
        >
          <span>{t('hero_cta')}</span>
          <i className="fa-solid fa-arrow-right"></i>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">589 €</span>
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          <i className="fa-solid fa-shield-halved mr-1"></i>
          {t('sticky_guarantee')}
        </p>
      </div>
    </div>
  );
}
