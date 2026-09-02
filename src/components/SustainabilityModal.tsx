import React, { useState } from 'react';
import { X, Leaf, Sparkles, Droplets, TrendingDown, DollarSign } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SustainabilityModal: React.FC = () => {
  const { isSustainabilityOpen, setIsSustainabilityOpen } = useShop();
  const [dailyCups, setDailyCups] = useState(2);

  if (!isSustainabilityOpen) return null;

  const cupsPerYear = dailyCups * 365;
  const moneySaved = cupsPerYear * 5; // ฿5 discount per cup at cafes in Thailand
  const plasticKgSaved = (cupsPerYear * 0.025).toFixed(1); // 25g per single-use plastic cup + lid
  const co2Saved = (cupsPerYear * 0.11).toFixed(1); // kg CO2 equivalent

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#1A2530] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#7A8B7B]" />
            <h3 className="text-base font-bold font-serif">Sipora Eco & Waste Impact Calculator</h3>
          </div>
          <button
            onClick={() => setIsSustainabilityOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="p-6 space-y-6">
          <div className="text-xs text-gray-600 leading-relaxed font-light">
            Every time you refill your Sipora tumbler instead of taking a single-use plastic or wax paper cup, you prevent microplastics from entering landfills and ocean waterways.
          </div>

          {/* Interactive Slider */}
          <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-900">
              <span>Your Daily Coffee / Drink Refills:</span>
              <span className="font-mono text-base text-[#7A8B7B]">{dailyCups} {dailyCups === 1 ? 'cup' : 'cups'}/day</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={dailyCups}
              onChange={(e) => setDailyCups(Number(e.target.value))}
              className="w-full accent-[#7A8B7B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>1 cup</span>
              <span>3 cups</span>
              <span>6+ cups</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-center">
              <TrendingDown className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
              <span className="text-lg font-black text-emerald-900 font-mono block">{cupsPerYear}</span>
              <span className="text-[10px] font-semibold text-emerald-700">Disposable Cups Eliminated / Year</span>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200/60 text-center">
              <Droplets className="w-5 h-5 text-blue-700 mx-auto mb-1" />
              <span className="text-lg font-black text-blue-900 font-mono block">{plasticKgSaved} kg</span>
              <span className="text-[10px] font-semibold text-blue-700">Plastic Waste Prevented</span>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60 text-center">
              <DollarSign className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <span className="text-lg font-black text-amber-900 font-mono block">฿{moneySaved.toLocaleString()}</span>
              <span className="text-[10px] font-semibold text-amber-700">Cafe BYOC Discount Saved</span>
            </div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 text-center">
            🌿 Built to last 10+ years. 100% recyclable stainless steel chassis.
          </div>
        </div>

      </div>
    </div>
  );
};
