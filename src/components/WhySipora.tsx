import React, { useState } from 'react';
import { 
  Flame, 
  Snowflake, 
  Layers, 
  DropletOff, 
  ShieldCheck, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';

export const WhySipora: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hot' | 'cold'>('cold');

  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[#7B8C7D]" />,
      title: 'Double-Wall Vacuum',
      titleTh: 'ฉนวนสุญญากาศ 2 ชั้น',
      desc: 'TempShield™ advanced thermal barrier prevents external heat transfer completely.'
    },
    {
      icon: <Flame className="w-5 h-5 text-[#E58E8E]" />,
      title: 'Thermal Retention',
      titleTh: 'รักษาอุณหภูมิยาวนาน',
      desc: 'Keeps piping hot for 12-14 hours and iced drinks crisp for over 24-32 hours.'
    },
    {
      icon: <DropletOff className="w-5 h-5 text-[#7B8C7D]" />,
      title: 'Leak-Resistant Seal',
      titleTh: 'ฝากันรั่วซึม 100%',
      desc: 'Food-grade silicone gasket prevents leaks in work bags and vehicle cup holders.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#7B8C7D]" />,
      title: '18/8 Pro-Grade Steel',
      titleTh: 'สแตนเลสสตีลเกรด 18/8',
      desc: 'Zero flavor transfer, BPA-free, finished with a textured sweat-free powder coat.'
    },
    {
      icon: <Compass className="w-5 h-5 text-[#1A1A1A]" />,
      title: 'Everyday Geometry',
      titleTh: 'ดีไซน์เพื่อการใช้งานจริง',
      desc: 'Engineered slim profile fits standard vehicle cup holders and backpack side pockets.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FDFCF9] border-t border-[#EEECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Geometric Balance */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
              Why Sipora
            </h2>
            <p className="text-[13px] text-gray-500 uppercase tracking-widest mt-1 font-medium">
              Precision engineering & pure taste
            </p>
          </div>
          <p className="text-xs text-gray-500 max-w-md mt-2 sm:mt-0 font-normal leading-relaxed">
            Every curve and wall thickness is calibrated to ensure your beverages stay at peak temperature from first sip to last.
          </p>
        </div>

        {/* 5 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-14">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F3F1ED] p-5 border border-[#EEECE6] hover:border-black/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white flex items-center justify-center mb-4 border border-black/5 shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] font-semibold text-[#7B8C7D] mb-2 uppercase tracking-wide">
                  {item.titleTh}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-black/10 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#1A1A1A] uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#7B8C7D]" />
                <span>Sipora Certified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Temperature Simulation Bar */}
        <div className="bg-[#1A1A1A] text-white p-6 sm:p-8 border border-black max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#7B8C7D] uppercase block mb-1">
                LIVE THERMAL BENCHMARK
              </span>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                Simulated Temperature over 24 Hours
              </h4>
            </div>

            {/* Toggle Hot vs Cold */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('cold')}
                className={`px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'cold'
                    ? 'bg-[#7B8C7D] text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>Cold (0°C)</span>
              </button>
              <button
                onClick={() => setActiveTab('hot')}
                className={`px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'hot'
                    ? 'bg-[#E58E8E] text-white'
                    : 'bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Hot (90°C)</span>
              </button>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            {activeTab === 'cold' ? (
              <>
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hour 0 (Start)</p>
                  <p className="text-lg font-mono font-bold text-white my-1">0.5°C</p>
                  <p className="text-[10px] text-[#7B8C7D] font-medium">Ice Packed</p>
                </div>
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hour 6 (Noon)</p>
                  <p className="text-lg font-mono font-bold text-white my-1">1.8°C</p>
                  <p className="text-[10px] text-[#7B8C7D] font-medium">Zero Sweat</p>
                </div>
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hour 16 (Evening)</p>
                  <p className="text-lg font-mono font-bold text-white my-1">3.4°C</p>
                  <p className="text-[10px] text-[#7B8C7D] font-medium">Ice Intact</p>
                </div>
                <div className="bg-white/10 p-3.5 border border-[#7B8C7D]">
                  <p className="text-[10px] text-gray-300 uppercase tracking-wider">Hour 24+ (Next Day)</p>
                  <p className="text-lg font-mono font-bold text-[#7B8C7D] my-1">5.2°C</p>
                  <p className="text-[10px] text-white font-bold">Cold Refresh</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hour 0 (Poured)</p>
                  <p className="text-lg font-mono font-bold text-white my-1">92.0°C</p>
                  <p className="text-[10px] text-[#E58E8E] font-medium">Fresh Brew</p>
                </div>
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hour 4 (Office)</p>
                  <p className="text-lg font-mono font-bold text-white my-1">78.5°C</p>
                  <p className="text-[10px] text-[#E58E8E] font-medium">Steamy Hot</p>
                </div>
                <div className="bg-white/5 p-3.5 border border-white/10">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Hour 8 (Afternoon)</p>
                  <p className="text-lg font-mono font-bold text-white my-1">67.0°C</p>
                  <p className="text-[10px] text-[#E58E8E] font-medium">Comfort Sip</p>
                </div>
                <div className="bg-white/10 p-3.5 border border-[#E58E8E]">
                  <p className="text-[10px] text-gray-300 uppercase tracking-wider">Hour 12+ (Commute)</p>
                  <p className="text-lg font-mono font-bold text-[#E58E8E] my-1">58.5°C</p>
                  <p className="text-[10px] text-white font-bold">Warm & Cozy</p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

