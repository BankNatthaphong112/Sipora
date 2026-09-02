import React from 'react';
import { X, ShieldCheck, Sparkles, Award, HeartHandshake, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutModal: React.FC = () => {
  const { isAboutOpen, setIsAboutOpen } = useShop();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header with Lifestyle Photo */}
        <div className="relative h-48 bg-[#1A2530] text-white p-6 flex flex-col justify-end">
          <button
            onClick={() => setIsAboutOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-xs flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#7A8B7B] uppercase block mb-1">
            Our Heritage & Philosophy
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
            The Sipora Standard
          </h3>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2 font-serif">Keep It Hot. Keep It Cold.</h4>
            <p>
              Sipora was founded with a singular conviction: everyday hydration should not be an afterthought. We observed millions of coffee lovers and commuters settling for lukewarm morning brews, sweaty single-use cups, and fragile drinkware that loses temperature in hours.
            </p>
            <p className="mt-2">
              We engineered a modern line of drinkware combining architectural minimalism, pharmaceutical-grade 18/8 Pro stainless steel, and aerospace triple-wall vacuum insulation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 text-center">
              <ShieldCheck className="w-6 h-6 text-[#7A8B7B] mx-auto mb-2" />
              <h5 className="font-bold text-gray-900 text-xs mb-1">Lifetime Warranty</h5>
              <p className="text-[11px] text-gray-500">Guaranteed vacuum insulation performance for life.</p>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 text-center">
              <Award className="w-6 h-6 text-[#7A8B7B] mx-auto mb-2" />
              <h5 className="font-bold text-gray-900 text-xs mb-1">PureTaste Ceramic</h5>
              <p className="text-[11px] text-gray-500">Zero metallic aftertaste, 100% true coffee aroma.</p>
            </div>

            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 text-center">
              <HeartHandshake className="w-6 h-6 text-[#7A8B7B] mx-auto mb-2" />
              <h5 className="font-bold text-gray-900 text-xs mb-1">Bangkok Concierge</h5>
              <p className="text-[11px] text-gray-500">Fast 1-2 day courier delivery and dedicated support.</p>
            </div>
          </div>

          <div className="p-4 bg-[#EBF1EC] rounded-2xl border border-[#7A8B7B]/30 text-xs text-gray-700">
            <h5 className="font-bold text-[#1A2530] mb-1">Visit our Bangkok Experience Showroom:</h5>
            <p>Sipora Design Studio, 88 Sukhumvit 55 (Thonglor), Bangkok 10110</p>
            <p className="text-[11px] text-gray-500 mt-1">Open Daily: 10:00 - 20:00 (Call: 02-123-4567 / Line: @SiporaOfficial)</p>
          </div>

        </div>

      </div>
    </div>
  );
};
