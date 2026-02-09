import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Format URL plus fiable pour Google Drive
const getDriveImageUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}=w800`;

const hotels = [
  {
    id: 1,
    name: 'Imperial Holiday',
    image: getDriveImageUrl('1xdtoNjGieXtRbVMiAx6fZ_1M9NE2R-va'),
    roomType: 'Standard Double',
    descKey: 'hotel_1_desc'
  },
  {
    id: 2,
    name: 'Mogador Menzah',
    image: getDriveImageUrl('1Pqu5_M7TAC5y6naUdBcnLRcejyVI4pkk'),
    roomType: 'Standard Double',
    descKey: 'hotel_2_desc'
  },
  {
    id: 3,
    name: 'Hôtel Semiramis',
    image: getDriveImageUrl('1opf85MwrFHb0HI08el4Q_mPxOL7Fs8dF'),
    roomType: 'Standard Double',
    descKey: 'hotel_3_desc'
  },
  {
    id: 4,
    name: 'Medina Gardens',
    image: getDriveImageUrl('1LCAJY1QMWjAOUwFi5pxQgb828dkeN5gu'),
    roomType: 'Standard Double',
    descKey: 'hotel_4_desc'
  },
  {
    id: 5,
    name: 'The Bird',
    image: getDriveImageUrl('130BVwVrrK9Q1fL5qIKcWDUGQLn0UqvXQ'),
    roomType: 'Suite Confort',
    descKey: 'hotel_5_desc'
  },
  {
    id: 6,
    name: 'Kenzi Club Agdal Medina',
    image: getDriveImageUrl('1W5ZKXuhUBgccyFWWzJvy21CwuBjLvuMV'),
    roomType: 'Standard Double',
    descKey: 'hotel_6_desc'
  },
  {
    id: 7,
    name: 'Hivernage Secret',
    image: getDriveImageUrl('114iBYw21UnKGa35FuwwQgnuElHGQ-qy5'),
    roomType: 'Standard Double',
    descKey: 'hotel_7_desc'
  },
  {
    id: 8,
    name: 'Palm Appart Hotel',
    image: getDriveImageUrl('1QozmvMOzY-MiZ7KFTd3CrUc6AL-xa82S'),
    roomType: 'Studio Double',
    descKey: 'hotel_8_desc'
  },
  {
    id: 9,
    name: 'Riad Al Jana',
    image: getDriveImageUrl('1rXFw1vALkcMSEveMNsfMOWuEDGQitVRv'),
    roomType: 'Standard Double',
    descKey: 'hotel_9_desc'
  },
  {
    id: 10,
    name: 'Riad Louaya',
    image: getDriveImageUrl('1lZE4LNOXpBg5hQnzgfHiPZnj-7uCtaly'),
    roomType: 'Standard Double',
    descKey: 'hotel_10_desc'
  },
  {
    id: 11,
    name: 'The Central House',
    image: getDriveImageUrl('1YsaagKQupXs8RKiGR12oLzkCTmIvm_nm'),
    roomType: 'Standard Double',
    descKey: 'hotel_11_desc'
  },
  {
    id: 12,
    name: 'Riad Morgane',
    image: getDriveImageUrl('1VnpbtaZ-APzaPiEkMdThltmk6tG7jT5E'),
    roomType: 'Standard Double',
    descKey: 'hotel_12_desc'
  }
];

const HotelsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset carousel position when language changes
  useEffect(() => {
    setCurrentIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [language]);

  // Défilement automatique
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const cardWidth = 320 + 24; // card width + gap
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        
        if (carouselRef.current.scrollLeft >= maxScroll - 10) {
          // Retour au début
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          setCurrentIndex(0);
        } else {
          // Défiler à la prochaine carte
          carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
          setCurrentIndex(prev => prev + 1);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Navigation manuelle
  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = 320 + 24;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 320 + 24;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      
      if (carouselRef.current.scrollLeft >= maxScroll - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        setCurrentIndex(0);
      } else {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        setCurrentIndex(prev => prev + 1);
      }
    }
  };

  return (
    <section id="hotels" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">
            {t('hotels_title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('hotels_desc')}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          dir="ltr"
        >
          {/* Bouton gauche */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 -ml-4 hidden md:flex items-center justify-center"
            aria-label="Précédent"
          >
            <i className="fa-solid fa-chevron-left text-terracotta text-xl"></i>
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-8 scroll-smooth no-scrollbar snap-x snap-mandatory px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="snap-center flex-shrink-0 w-80 group hotel-card rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback image si Google Drive ne charge pas
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop`;
                    }}
                  />
                  <div className="absolute bottom-0 left-0 bg-dark/80 text-white text-xs px-3 py-1 m-2 rounded">
                    {hotel.roomType}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-2 text-terracotta">
                    {hotel.name}
                  </h4>
                  <p className="text-sm text-gray-600 h-10 overflow-hidden">
                    {t(hotel.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bouton droite */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 -mr-4 hidden md:flex items-center justify-center"
            aria-label="Suivant"
          >
            <i className="fa-solid fa-chevron-right text-terracotta text-xl"></i>
          </button>
        </div>

        {/* Indicateurs et hint mobile */}
        <div className="flex flex-col items-center gap-4 mt-4">
          {/* Points indicateurs */}
          <div className="flex gap-2">
            {hotels.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (carouselRef.current) {
                    const cardWidth = 320 + 24;
                    carouselRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
                    setCurrentIndex(index);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-terracotta w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'hôtel ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Hint mobile */}
          <p className="text-center text-gray-400 text-sm md:hidden">
            ← Glissez pour voir plus →
          </p>
        </div>
      </div>
    </section>
  );
};

export default HotelsSection;
