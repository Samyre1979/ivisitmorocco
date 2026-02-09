import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect, useRef, useCallback } from 'react';

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Témoignages fixes - textes originaux qui ne changent PAS selon la langue du site
  const testimonials = [
    {
      id: 1,
      name: 'Sophie & Thomas',
      age: '32 & 34 ans',
      location: 'Paris, France',
      text: "Un séjour absolument magique à Marrakech ! Le riad était sublime, le petit-déjeuner sur la terrasse avec vue sur l'Atlas restera gravé dans nos mémoires. L'équipe E-Motion a tout organisé parfaitement. On recommande à 100% !",
      image: 'https://lh3.googleusercontent.com/d/1YjmQxUujCJaeBPM9bVCNwMdmdewTGbTw=w400',
      flag: '🇫🇷',
      lang: 'FR'
    },
    {
      id: 2,
      name: 'Marie & Jean-Pierre',
      age: '48 & 52 ans',
      location: 'Lyon, France',
      text: "Nous cherchions une escapade romantique et authentique, nous avons trouvé bien plus. Le hammam, les souks, les couchers de soleil sur Jemaa el-Fna... Chaque moment était parfait. Merci pour cette parenthèse enchantée !",
      image: 'https://lh3.googleusercontent.com/d/1MJN9gTfM56YgEX9EaZE54TXBg5B_qoH1=w400',
      flag: '🇫🇷',
      lang: 'FR'
    },
    {
      id: 3,
      name: 'Isabelle & François',
      age: '65 & 68 ans',
      location: 'Bordeaux, France',
      text: "À notre âge, on apprécie le confort et l'authenticité. Ce séjour nous a offert les deux ! L'équipe était aux petits soins, le riad d'un calme absolu. Une expérience que nous conseillons à tous les couples.",
      image: 'https://lh3.googleusercontent.com/d/1F_Jg11cqVMvHYTewjvpQWEP1nSSfNiux=w400',
      flag: '🇫🇷',
      lang: 'FR'
    },
    {
      id: 4,
      name: 'Emma & James',
      age: '35 & 37 years',
      location: 'London, UK',
      text: "What a fantastic experience! The 90-day booking flexibility was perfect for our busy schedules. The riad was stunning, the food incredible, and the excursion to the Atlas Mountains was breathtaking. Highly recommend!",
      image: 'https://lh3.googleusercontent.com/d/14Nqp-Huuv0QdGDrWSSRYGb_26FtihTCu=w400',
      flag: '🇬🇧',
      lang: 'EN'
    },
    {
      id: 5,
      name: 'Sarah & Michael',
      age: '50 & 53 years',
      location: 'New York, USA',
      text: "We celebrated our 25th wedding anniversary in Marrakech and it exceeded all expectations. The romantic atmosphere, the attention to detail, and the authentic Moroccan hospitality made this trip unforgettable. Thank you E-Motion!",
      image: 'https://lh3.googleusercontent.com/d/1e7g2P1jFSblFwxW-0jfSUOE_Bvza6vCD=w400',
      flag: '🇬🇧',
      lang: 'EN'
    },
    {
      id: 6,
      name: 'فاطمة و أحمد',
      age: '38 و 40 سنة',
      location: 'الرياض، السعودية',
      text: "رحلة استثنائية إلى مراكش! الرياض المغربي كان تحفة معمارية بفنائه المزهر ونافورته الهادئة. استمتعنا بالإفطار المغربي الشهي على السطح مع إطلالة خلابة على جبال الأطلس. فريق E-Motion رتب كل شيء باحترافية عالية!",
      image: 'https://lh3.googleusercontent.com/d/1z7AkmnnazBit9qdKkBKRtieEhA48Fj7U=w400',
      flag: '🇸🇦',
      lang: 'AR'
    }
  ];

  const cardWidth = 280; // Taille réduite
  const gap = 16; // gap-4
  const totalCardWidth = cardWidth + gap;

  // Scroll to current index - direction aware
  const scrollToIndex = useCallback((index: number) => {
    if (carouselRef.current) {
      const scrollAmount = index * totalCardWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [totalCardWidth]);

  // Auto-scroll
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Scroll when index changes
  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex, scrollToIndex]);

  // Reset scroll position when language changes
  useEffect(() => {
    setCurrentIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [language]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-sand">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-3">
            {t('testimonials_title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            {t('testimonials_subtitle')}
          </p>
          <div className="w-16 h-1 bg-terracotta mx-auto mt-3"></div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          dir="ltr" // Force LTR pour le carousel
        >
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-terracotta hover:bg-terracotta hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          
          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center text-terracotta hover:bg-terracotta hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth px-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="snap-center flex-shrink-0 w-[280px]"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col p-4">
                  
                  {/* Header: Avatar macaron + Étoiles + Badge langue */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* Photo macaron */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-terracotta shadow-md">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop';
                          }}
                        />
                      </div>
                      {/* Badge langue sur le macaron */}
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow border border-gray-100">
                        {testimonial.flag}
                      </div>
                    </div>

                    {/* Infos + Étoiles */}
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-dark text-sm truncate">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 truncate">{testimonial.age}</p>
                      {/* 5 étoiles */}
                      <div className="text-yellow-400 text-sm mt-1">
                        ★★★★★
                      </div>
                    </div>
                  </div>

                  {/* Quote icon + Testimonial text */}
                  <div className="flex-grow">
                    <div className="text-terracotta/30 text-2xl font-serif leading-none mb-1">"</div>
                    <p className={`text-gray-600 text-xs leading-relaxed line-clamp-4 ${testimonial.lang === 'AR' ? 'text-right font-arabic-sans' : ''}`}>
                      {testimonial.text}
                    </p>
                  </div>

                  {/* Location */}
                  <div className={`mt-3 pt-2 border-t border-gray-100 ${testimonial.lang === 'AR' ? 'text-right' : ''}`}>
                    <p className="text-xs text-terracotta">
                      <i className="fa-solid fa-location-dot mr-1"></i>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex 
                  ? 'bg-terracotta w-6' 
                  : 'bg-gray-300 hover:bg-terracotta/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-10 grid grid-cols-3 gap-3 max-w-xl mx-auto">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-terracotta">+500</div>
            <div className="text-xs text-gray-500">{t('trust_couples')}</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-terracotta">4.9/5</div>
            <div className="text-xs text-gray-500">{t('trust_rating')}</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xl md:text-2xl font-bold text-terracotta">98%</div>
            <div className="text-xs text-gray-500">{t('trust_satisfaction')}</div>
          </div>
        </div>

        {/* Mobile hint */}
        <p className="text-center text-gray-400 text-xs mt-4 md:hidden">
          ← {t('swipe_hint') || 'Glissez pour voir plus'} →
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
