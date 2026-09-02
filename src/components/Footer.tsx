import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  CreditCard,
  ArrowUp
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { 
    setViewMode, 
    setFilters, 
    setIsTrackingOpen, 
    setIsAboutOpen, 
    setIsSustainabilityOpen,
    language,
    t
  } = useShop();

  const handleCategoryClick = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
    setViewMode('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-14 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Trust Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-gray-800 text-xs text-gray-300">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#7B8C7D] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px] tracking-wider">{t('freeShippingTitle')}</p>
              <p className="text-[11px] text-gray-400">{t('freeShippingSub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#7B8C7D] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px] tracking-wider">{t('warrantyTitle')}</p>
              <p className="text-[11px] text-gray-400">{t('warrantySub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-[#7B8C7D] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px] tracking-wider">{t('returnsTitle')}</p>
              <p className="text-[11px] text-gray-400">{t('returnsSub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#7B8C7D] shrink-0" />
            <div>
              <p className="font-bold text-white uppercase text-[11px] tracking-wider">{t('securePayTitle')}</p>
              <p className="text-[11px] text-gray-400">{t('securePaySub')}</p>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-3xl font-black uppercase tracking-tighter text-white">
                SIPORA
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7B8C7D] font-semibold mt-0.5">
                {language === 'th' ? 'เก็บความร้อนและเย็นยาวนาน เพื่อทุกไลฟ์สไตล์' : 'Keep It Hot. Keep It Cold.'}
              </span>
            </div>

            <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
              {t('brandMission')}
            </p>

            <div className="pt-2 text-xs text-gray-400">
              <p className="font-semibold text-gray-300">{language === 'th' ? 'ฝ่ายบริการลูกค้า (กรุงเทพฯ):' : 'Customer Concierge (Bangkok):'}</p>
              <p className="text-[11px] mt-0.5">Line: @SiporaOfficial | Email: hello@sipora.co</p>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              {t('categoryTumblers')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => handleCategoryClick('all')} className="hover:text-white transition-colors cursor-pointer">
                  {t('allDrinkware')}
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('classic-tumblers')} className="hover:text-white transition-colors cursor-pointer">
                  {t('catClassicTumblers')} (500-600ml)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('handle-tumblers')} className="hover:text-white transition-colors cursor-pointer">
                  {t('catHandleTumblers')} (900ml)
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('thermal-bottles')} className="hover:text-white transition-colors cursor-pointer">
                  {t('catThermalBottles')} (750-1200ml)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              {t('helpSection')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => setIsTrackingOpen(true)} className="hover:text-white transition-colors cursor-pointer text-[#7B8C7D] font-medium">
                  {t('orderTracking')}
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  {t('shippingInfo')}
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  {t('warrantyReturns')}
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  {t('careGuide')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
              {t('aboutSection')}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  {t('ourStory')}
                </button>
              </li>
              <li>
                <button onClick={() => { setViewMode('journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  {t('journal')}
                </button>
              </li>
              <li>
                <button onClick={() => setIsSustainabilityOpen(true)} className="hover:text-white transition-colors cursor-pointer text-[#7B8C7D]">
                  {t('sustainability')} 🌿
                </button>
              </li>
            </ul>

            {/* Social Circular Icons */}
            <div className="mt-5 flex gap-2.5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#1A1A1A] transition-colors" title="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#1A1A1A] transition-colors" title="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#1A1A1A] transition-colors text-[10px] font-bold" title="TikTok">
                TK
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-medium tracking-wider text-gray-400 uppercase">
          <p>© 2026 Sipora Inc. {t('rightsReserved')}</p>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-white cursor-pointer">{t('privacyPolicy')}</button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-white cursor-pointer">{t('termsOfService')}</button>
            <button onClick={() => setIsAboutOpen(true)} className="hover:text-white cursor-pointer">{t('shippingReturnsPolicy')}</button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>{t('backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

