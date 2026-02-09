import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  const { t } = useLanguage();
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  // Calculate minimum date (90 days from now)
  const minDateInfo = useMemo(() => {
    const now = new Date();
    const minDate = new Date(now.setDate(now.getDate() + 90));
    const yyyy = minDate.getFullYear();
    const mm = String(minDate.getMonth() + 1).padStart(2, '0');
    const dd = String(minDate.getDate()).padStart(2, '0');
    return {
      string: `${yyyy}-${mm}-${dd}`,
      readable: `${dd}/${mm}/${yyyy}`
    };
  }, []);

  // Update departure date when arrival changes
  useEffect(() => {
    if (arrivalDate) {
      const arr = new Date(arrivalDate);
      const dep = new Date(arr.setDate(arr.getDate() + 6));
      const yyyy = dep.getFullYear();
      const mm = String(dep.getMonth() + 1).padStart(2, '0');
      const dd = String(dep.getDate()).padStart(2, '0');
      setDepartureDate(`${yyyy}-${mm}-${dd}`);
    }
  }, [arrivalDate]);

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-fixed bg-center bg-cover" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 hero-overlay"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-6 tracking-wide border border-white/30">
          {t('hero_badge')}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-6 text-shadow">
          {t('hero_title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto font-light">
          {t('hero_subtitle')}
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl inline-block mb-8 border border-white/20">
          <p className="text-white font-semibold">{t('hero_promo')}</p>
        </div>

        {/* Calendar Picker */}
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl max-w-2xl mx-auto mb-8 shadow-lg border border-white/30">
          <div className="flex items-center justify-center gap-2 mb-3 text-dark">
            <i className="fa-regular fa-calendar-check text-terracotta"></i>
            <span className="font-bold text-sm uppercase tracking-wide">{t('cal_picker_title')}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <label className="block text-xs text-gray-500 mb-1 font-bold ml-1">{t('lbl_arrival')}</label>
              <input 
                type="date" 
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                min={minDateInfo.string}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm text-dark focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none shadow-sm cursor-pointer"
              />
            </div>
            <div className="text-left">
              <label className="block text-xs text-gray-500 mb-1 font-bold ml-1">{t('lbl_departure')}</label>
              <input 
                type="date" 
                value={departureDate}
                readOnly
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-sm text-dark outline-none shadow-sm cursor-not-allowed"
              />
            </div>
          </div>
          <p className="text-[11px] text-terracotta mt-2 italic font-bold">
            {t('availability_from')} {minDateInfo.readable}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Main CTA */}
          <button 
            type="button" 
            onClick={onOpenBooking} 
            className="bg-terracotta hover:bg-terracotta/90 text-white font-bold py-4 px-8 rounded-full transition flex items-center gap-2 text-lg cursor-pointer shadow-xl transform hover:-translate-y-1"
          >
            <span>{t('hero_cta')}</span>
            <i className="fa-regular fa-credit-card"></i>
          </button>
          
          {/* Secondary CTA */}
          <a 
            href="#le-sejour" 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white text-white font-semibold py-4 px-8 rounded-full transition flex items-center gap-2"
          >
            <span>{t('hero_details')}</span>
            <i className="fa-solid fa-arrow-down"></i>
          </a>
        </div>
        <p className="text-white/80 text-xs mt-4 italic">{t('hero_terms')}</p>
      </div>
    </section>
  );
}
