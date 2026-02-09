import { useState, useCallback } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { OfferSection } from './components/OfferSection';
import HotelsSection from './components/HotelsSection';
import ExcursionsSection from './components/ExcursionsSection';
import TestimonialsSection from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LegalPages } from './components/LegalPages';
import { MobileSticky } from './components/MobileSticky';
import { StickyBookingButton } from './components/StickyBookingButton';

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentLegalPage, setCurrentLegalPage] = useState<string | null>(null);

  const handleOpenBooking = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  const handleScrollTo = useCallback((id: string) => {
    setCurrentLegalPage(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  const handleShowLegal = useCallback((page: string) => {
    setCurrentLegalPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackFromLegal = useCallback(() => {
    setCurrentLegalPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <LanguageProvider>
      <div className="font-sans text-dark bg-sand transition-all duration-300">
        <Navbar onOpenBooking={handleOpenBooking} onScrollTo={handleScrollTo} onShowAbout={() => handleShowLegal('about')} />

        {/* Home Page Content */}
        {!currentLegalPage && (
          <div id="home-page">
            <Hero onOpenBooking={handleOpenBooking} />
            <AboutSection />
            <OfferSection />
            <HotelsSection />
            <ExcursionsSection />
            <TestimonialsSection />
          </div>
        )}

        {/* Legal Pages */}
        <LegalPages currentPage={currentLegalPage} onBack={handleBackFromLegal} />

        <Footer onShowLegal={handleShowLegal} onScrollTo={handleScrollTo} />

        {/* Booking Modal */}
        <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />

        {/* Mobile Sticky WhatsApp Button */}
        <MobileSticky />

        {/* Sticky Booking Button - Visible on scroll (all devices) */}
        {!currentLegalPage && (
          <StickyBookingButton onBookingClick={handleOpenBooking} />
        )}
      </div>
    </LanguageProvider>
  );
}
