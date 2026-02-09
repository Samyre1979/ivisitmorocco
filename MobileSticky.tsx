import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_LINK = "https://wa.me/33609971563";

export function MobileSticky() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <a 
        href={WHATSAPP_LINK} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full bg-whatsapp text-white font-bold py-3 px-6 rounded-full shadow-2xl flex justify-center items-center gap-2 animate-bounce-slow"
      >
        <i className="fa-brands fa-whatsapp text-xl"></i> 
        <span>{t('sticky_btn')}</span>
      </a>
    </div>
  );
}
