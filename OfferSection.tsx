import { useLanguage } from '../context/LanguageContext';

export function OfferSection() {
  const { t } = useLanguage();

  const offers = [
    { icon: 'fa-moon', titleKey: 'offer_1_title', descKey: 'offer_1_desc' },
    { icon: 'fa-calendar-days', titleKey: 'offer_2_title', descKey: 'offer_2_desc' },
    { icon: 'fa-car', titleKey: 'offer_4_title', descKey: 'offer_4_desc' },
    { icon: 'fa-person-hiking', titleKey: 'offer_3_title', descKey: 'offer_3_desc' },
  ];

  return (
    <section id="le-sejour" className="py-20 bg-sand">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-dark mb-4">
            {t('offer_title')}
          </h2>
          <p className="text-terracotta font-bold uppercase tracking-widest">{t('offer_subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center text-terracotta mb-4">
                <i className={`fa-solid ${offer.icon} text-2xl`}></i>
              </div>
              <h4 className="font-bold text-lg mb-2">{t(offer.titleKey)}</h4>
              <p className="text-gray-600 text-sm">{t(offer.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
