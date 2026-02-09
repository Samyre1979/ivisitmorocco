import { useLanguage } from '../context/LanguageContext';

interface LegalPagesProps {
  currentPage: string | null;
  onBack: () => void;
}

export function LegalPages({ currentPage, onBack }: LegalPagesProps) {
  const { t, language } = useLanguage();

  if (!currentPage) return null;

  const isRTL = language === 'ar';

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <button 
          onClick={onBack} 
          className="text-terracotta hover:underline mb-8 flex items-center gap-2"
        >
          <i className={`fa-solid fa-arrow-${isRTL ? 'right' : 'left'}`}></i> {t('back_home')}
        </button>

        {/* PAGE À PROPOS DE NOUS */}
        {currentPage === 'about' && (
          <>
            <h1 className="font-serif text-4xl text-dark mb-8 border-b pb-4">{t('about_page_title')}</h1>
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-terracotta to-terracotta/80 text-white p-8 rounded-2xl shadow-lg mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://lh3.googleusercontent.com/d/1uNPuv7wHpgRrwqR85HTkq_SUHMddoL7y=w200" 
                  alt="E-Motion Voyages" 
                  className="h-16 w-auto bg-white rounded-lg p-2"
                />
                <div>
                  <h2 className="font-serif text-2xl font-bold">E-Motion Voyages</h2>
                  <p className="text-white/80">{t('about_tagline')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <i className="fa-solid fa-award text-yellow-300"></i>
                  <span className="font-bold">{t('about_experience')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none text-gray-700 space-y-6 bg-white p-8 rounded-2xl shadow-sm mb-8">
              <h3 className="font-bold text-xl text-terracotta flex items-center gap-2">
                <i className="fa-solid fa-building"></i> {t('about_who_title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about_who_text')}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('about_unique_text')}
              </p>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-terracotta pl-4 bg-sand/50 py-3 rounded-r-lg">
                {t('about_dream_text')}
              </p>
            </div>

            {/* Nos Services */}
            <div className="bg-white p-8 rounded-2xl shadow-sm mb-8">
              <h3 className="font-bold text-2xl text-dark mb-6 flex items-center gap-2">
                <i className="fa-solid fa-concierge-bell text-terracotta"></i> {t('about_services_title')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Service 1 */}
                <div className="bg-sand/50 p-6 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta mb-4">
                    <i className="fa-solid fa-plane text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('service_1_title')}</h4>
                  <p className="text-gray-600 text-sm">{t('service_1_desc')}</p>
                </div>

                {/* Service 2 */}
                <div className="bg-sand/50 p-6 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta mb-4">
                    <i className="fa-solid fa-suitcase-rolling text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('service_2_title')}</h4>
                  <p className="text-gray-600 text-sm">{t('service_2_desc')}</p>
                </div>

                {/* Service 3 */}
                <div className="bg-sand/50 p-6 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta mb-4">
                    <i className="fa-solid fa-clock text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('service_3_title')}</h4>
                  <p className="text-gray-600 text-sm">{t('service_3_desc')}</p>
                </div>

                {/* Service 4 */}
                <div className="bg-sand/50 p-6 rounded-xl hover:shadow-md transition">
                  <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta mb-4">
                    <i className="fa-solid fa-users text-xl"></i>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{t('service_4_title')}</h4>
                  <p className="text-gray-600 text-sm">{t('service_4_desc')}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-dark text-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-bold text-2xl mb-6 flex items-center gap-2">
                <i className="fa-solid fa-address-book text-terracotta"></i> {t('about_contact_title')}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Localisation */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-location-dot text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white/80 text-sm uppercase mb-1">{t('about_location')}</h4>
                    <p className="text-white">Marrakech, Maroc</p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-brands fa-whatsapp text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white/80 text-sm uppercase mb-1">{t('about_phone')}</h4>
                    <a href="https://wa.me/33609971563" target="_blank" rel="noopener noreferrer" className="text-white hover:text-terracotta transition block">
                      +33 6 09 97 15 63
                    </a>
                    <a href="https://wa.me/212632898804" target="_blank" rel="noopener noreferrer" className="text-white hover:text-terracotta transition block mt-1">
                      +212 6 32 89 88 04
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white/80 text-sm uppercase mb-1">{t('about_email')}</h4>
                    <a href="mailto:resa@ivisitmorocco.com" className="text-white hover:text-terracotta transition">
                      resa@ivisitmorocco.com
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA WhatsApp */}
              <div className="mt-8 text-center">
                <a 
                  href="https://wa.me/33609971563" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition shadow-lg"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  <span>{t('about_cta_whatsapp')}</span>
                </a>
              </div>
            </div>
          </>
        )}

        {/* PAGE MENTIONS LÉGALES */}
        {currentPage === 'legal' && (
          <>
            <h1 className="font-serif text-4xl text-dark mb-8 border-b pb-4">{t('legal_page_title')}</h1>
            <div className="prose max-w-none text-gray-700 space-y-6 bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-xl">1. {t('legal_editor_title')}</h3>
              <p>{t('legal_editor_text')}</p>
              <p>{t('legal_address')}</p>
              <p>Email : <a href="mailto:resa@ivisitmorocco.com" className="text-terracotta hover:underline">resa@ivisitmorocco.com</a></p>
              <p>{t('legal_phone')} | +212 6 32 89 88 04</p>
              <h3 className="font-bold text-xl">2. {t('legal_data_title')}</h3>
              <p>{t('legal_data_text')}</p>
            </div>
          </>
        )}

        {/* PAGE CGV */}
        {currentPage === 'cgv' && (
          <>
            <h1 className="font-serif text-4xl text-dark mb-8 border-b pb-4">CGV - {t('cgv_page_title')}</h1>
            <div className="prose max-w-none text-gray-700 space-y-6 bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-xl">{t('cgv_article_1_title')}</h3>
              <p>{t('cgv_article_1_text')}</p>
              <h3 className="font-bold text-xl">{t('cgv_article_2_title')}</h3>
              <p>{t('cgv_article_2_text')}</p>
              <h3 className="font-bold text-xl">{t('cgv_article_3_title')}</h3>
              <p>{t('cgv_article_3_text')}</p>
              <h3 className="font-bold text-xl">{t('cgv_article_4_title')}</h3>
              <p>{t('cgv_article_4_text')}</p>
            </div>
          </>
        )}

        {/* PAGE TERMES */}
        {currentPage === 'terms' && (
          <>
            <h1 className="font-serif text-4xl text-dark mb-8 border-b pb-4">{t('terms_page_title')}</h1>
            <div className="prose max-w-none text-gray-700 space-y-6 bg-white p-8 rounded-2xl shadow-sm">
              <ul className="list-disc pl-5 space-y-4">
                <li><strong>{t('terms_validity_title')}</strong> {t('terms_validity_text')}</li>
                <li><strong>{t('terms_90days_title')}</strong> {t('terms_90days_text')}</li>
                <li><strong>{t('terms_availability_title')}</strong> {t('terms_availability_text')}</li>
                <li><strong>{t('terms_excluded_title')}</strong> {t('terms_excluded_text')}</li>
                <li><strong>{t('terms_responsibility_title')}</strong> {t('terms_responsibility_text')}</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
