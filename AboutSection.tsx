import { useLanguage } from '../context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-dark mb-4">{t('about_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('about_desc')}</p>
          <div className="w-20 h-1 bg-terracotta mx-auto mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Photo 1 */}
          <div className="order-2 lg:order-1">
            <img 
              src="https://lh3.googleusercontent.com/d/14mroBsIPDVBDgaHBrwBV_Wx6uzuOBKWd=w800" 
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover hover:scale-105 transition duration-500" 
              alt="Ambiance Maroc 1"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h3 className="font-serif text-2xl font-bold mb-6 text-dark text-center lg:text-left">
              {t('why_title')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-olive mt-1 rtl:ml-3 rtl:mr-0"></i>
                <span className="text-gray-700">{t('why_1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-olive mt-1 rtl:ml-3 rtl:mr-0"></i>
                <span className="text-gray-700">{t('why_2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-shield-halved text-olive mt-1 rtl:ml-3 rtl:mr-0"></i>
                <span className="text-gray-700 font-bold">{t('why_3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-calendar-check text-olive mt-1 rtl:ml-3 rtl:mr-0"></i>
                <span className="text-gray-700">{t('why_4')}</span>
              </li>
            </ul>
          </div>

          {/* Photo 2 */}
          <div className="order-3 lg:order-3">
            <img 
              src="https://lh3.googleusercontent.com/d/1iOuAJXAfoBIEcRj9ZcamHko1LnrjAQfo=w800" 
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover hover:scale-105 transition duration-500" 
              alt="Ambiance Maroc 2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
