import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onShowLegal: (page: string) => void;
  onScrollTo: (id: string) => void;
}

const WHATSAPP_LINK_FR = "https://wa.me/33609971563";
const WHATSAPP_LINK_MA = "https://wa.me/212632898804";

export function Footer({ onShowLegal, onScrollTo }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 text-sm">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <img src="https://lh3.googleusercontent.com/d/1uNPuv7wHpgRrwqR85HTkq_SUHMddoL7y=w150" alt="E-Motion Voyages" className="h-12 w-auto object-contain" />
                        <span className="font-serif text-2xl font-bold text-white tracking-wider">E-Motion Voyages</span>
                    </div>
          <p className="mb-4">{t('footer_desc')}</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase">{t('footer_contact')}</h4>
          <p className="mb-2">
            <a href={WHATSAPP_LINK_FR} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fa-brands fa-whatsapp mr-2"></i> +33 6 09 97 15 63
            </a>
          </p>
          <p className="mb-2">
            <a href={WHATSAPP_LINK_MA} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fa-brands fa-whatsapp mr-2"></i> +212 6 32 89 88 04
            </a>
          </p>
          <p className="mb-2">
            <a href="mailto:resa@ivisitmorocco.com" className="hover:text-white transition">
              <i className="fa-solid fa-envelope mr-2"></i> resa@ivisitmorocco.com
            </a>
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase">{t('footer_legal')}</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onShowLegal('about')} className="hover:text-white transition">
                {t('nav_about')}
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('hotels')} className="hover:text-white transition">
                {t('nav_hotels')}
              </button>
            </li>
            <li>
              <button onClick={() => onScrollTo('excursions')} className="hover:text-white transition">
                {t('nav_excursions')}
              </button>
            </li>
            <li>
              <button onClick={() => onShowLegal('legal')} className="hover:text-white transition">
                Informations Légales
              </button>
            </li>
            <li>
              <button onClick={() => onShowLegal('cgv')} className="hover:text-white transition">
                CGV - Satisfait ou Remboursé
              </button>
            </li>
            <li>
              <button onClick={() => onShowLegal('terms')} className="hover:text-white transition">
                Termes et politiques
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
        &copy; 2026 E-Motion Voyages. Tous droits réservés.
      </div>
    </footer>
  );
}
