import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const excursions = [
  {
    id: 1,
    titleKey: 'exc_1_title',
    descKey: 'exc_1_desc',
    priceKey: 'exc_1_price',
    image: 'https://lh3.googleusercontent.com/d/19vsK75Pz5lnkpVTjwIbOoa1IAnwt2qJM=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    titleKey: 'exc_2_title',
    descKey: 'exc_2_desc',
    priceKey: 'exc_2_price',
    image: 'https://lh3.googleusercontent.com/d/1x12UOw6SaBoxtQ6MPr6Q1wg4M6d7gHOm=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1589828973693-47a69cb6e2a5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    titleKey: 'exc_3_title',
    descKey: 'exc_3_desc',
    priceKey: 'exc_3_price',
    image: 'https://lh3.googleusercontent.com/d/1SEHQsatntN2m6NzP8u2JXK2VQ-v-x8Fe=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    titleKey: 'exc_4_title',
    descKey: 'exc_4_desc',
    priceKey: 'exc_4_price',
    image: 'https://lh3.googleusercontent.com/d/1Lux07cnWJr20Be38cvSHu7LaP1zMZPbC=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    titleKey: 'exc_5_title',
    descKey: 'exc_5_desc',
    priceKey: 'exc_5_price',
    image: 'https://lh3.googleusercontent.com/d/1pFDvavzNYhGJ0HCtYPTxrHr4lkMjgIFw=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    titleKey: 'exc_6_title',
    descKey: 'exc_6_desc',
    priceKey: 'exc_6_price',
    image: 'https://lh3.googleusercontent.com/d/1fmdtcfctWcnzoqwCrmpuaOe5om-jKbDR=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 7,
    titleKey: 'exc_7_title',
    descKey: 'exc_7_desc',
    priceKey: 'exc_7_price',
    image: 'https://lh3.googleusercontent.com/d/1ATfIP07W9zDPo3GX1GRYC3JsM4DbImiv=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 8,
    titleKey: 'exc_8_title',
    descKey: 'exc_8_desc',
    priceKey: 'exc_8_price',
    image: 'https://lh3.googleusercontent.com/d/1HwEFdVEMfSuVtz3VOCrkTcWI5xRfaNLg=w800',
    fallbackImage: 'https://images.unsplash.com/photo-1596627116790-af6f46dddbf5?q=80&w=800&auto=format&fit=crop'
  }
];

export default function ExcursionsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const itemsPerView = 3;
  const maxIndex = Math.max(0, excursions.length - itemsPerView);

  // Reset carousel position when language changes
  useEffect(() => {
    setCurrentIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [language]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * (carouselRef.current.offsetWidth / itemsPerView);
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const goToPrev = () => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, fallback: string) => {
    e.currentTarget.src = fallback;
  };

  return (
    <section id="excursions" className="py-20 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">{t('excursions_title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('excursions_desc')}</p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          dir="ltr"
        >
          {/* Navigation Buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-terracotta/90 hover:bg-terracotta text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition -translate-x-1/2 hidden md:flex"
            aria-label="Previous"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-terracotta/90 hover:bg-terracotta text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition translate-x-1/2 hidden md:flex"
            aria-label="Next"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {excursions.map((excursion) => (
              <div 
                key={excursion.id}
                className="snap-center flex-shrink-0 w-80 group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-terracotta/50 transition"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={excursion.image}
                    onError={(e) => handleImageError(e, excursion.fallbackImage)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={t(excursion.titleKey)}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 right-0 bg-terracotta text-white text-sm font-bold px-3 py-1 m-2 rounded">
                    {t(excursion.priceKey)}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-2 text-white">{t(excursion.titleKey)}</h4>
                  <p className="text-sm text-gray-400">{t(excursion.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-terracotta w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Hint for mobile */}
        <p className="text-center text-gray-500 text-sm mt-4 md:hidden">
          ← Glissez pour voir plus →
        </p>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <a 
            href="https://wa.me/33609971563" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition shadow-lg"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i>
            <span>{t('exc_cta')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
