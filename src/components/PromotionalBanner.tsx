import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromotionalBanner: React.FC = () => {
  const { setViewMode, setIsAboutOpen } = useShop();

  return (
    <section className="py-10 sm:py-14 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#1E2C3A] text-white shadow-xl min-h-[420px] flex items-center">
          
          {/* Background Lifestyle Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/sipora_hero_banner_1787742229226.jpg"
              alt="Sipora Lifestyle Moment"
              className="w-full h-full object-cover object-center opacity-40 filter brightness-90 scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2530] via-[#1A2530]/85 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-14 lg:p-18 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest text-[#E8E4DC] uppercase mb-4">
              <Sparkles className="w-3 h-3 text-[#7A8B7B]" />
              <span>THE SIPORA PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-tight text-white mb-4">
              Your Drink. <br />
              Your Temperature. <br />
              <span className="text-[#E8E4DC] italic font-normal">Your Day.</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-8">
              From your first coffee in the morning to ice-cold refreshment after a long day. Engineered to make every sip feel like the very first.
            </p>

            <div className="flex items-center gap-4">
              <button
                id="promo-discover-btn"
                onClick={() => setIsAboutOpen(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FAF9F6] text-[#1A2530] text-xs font-bold tracking-wider uppercase hover:bg-[#E8E4DC] active:scale-95 transition-all shadow-md cursor-pointer group"
              >
                <span>DISCOVER SIPORA</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  setViewMode('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-gray-300 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Browse Catalog →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
