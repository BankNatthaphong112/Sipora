import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  RotateCw, 
  Coffee, 
  Layers, 
  Award,
  Zap
} from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  titleTh: string;
  desc: string;
  descTh: string;
  x: number; // percentage
  y: number; // percentage
}

export const ProductFeatureExplorer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>('lid');

  const hotspots: Hotspot[] = [
    {
      id: 'lid',
      title: 'Leak-Resistant 3-Way Lid',
      titleTh: 'ฝาระบบปิดล็อค 3 ฟังก์ชัน ป้องกันน้ำหก',
      desc: 'Engineered with food-grade silicone gaskets and magnetic smooth-glide slider. Sip directly or insert the reusable straw.',
      descTh: 'ซีลซิลิโคนแน่นหนา ป้องกันน้ำกระฉอกเมื่อเคลื่อนไหว หรือใส่ในกระเป๋า',
      x: 50,
      y: 16
    },
    {
      id: 'interior',
      title: '18/8 Pro-Grade Stainless Steel Interior',
      titleTh: 'สแตนเลสสตีล 18/8 เกรดพรีเมียมไร้รอยต่อ',
      desc: 'Electropolished food-grade steel guarantees pure taste with zero metallic flavor lingering or coffee stain absorption.',
      descTh: 'ขัดผิวระดับไมครอน ไม่ดูดซับกลิ่นและสีของชา กาแฟ หรือน้ำผลไม้',
      x: 52,
      y: 42
    },
    {
      id: 'vacuum',
      title: 'Double-Wall Vacuum Chamber',
      titleTh: 'ช่องสุญญากาศ TempShield™ 2 ชั้น',
      desc: 'Thermal barrier eliminates convection heat transfer entirely. Exterior never sweats from iced drinks or burns hands with boiling liquids.',
      descTh: 'ไร้หยดน้ำเกาะรอบแก้ว 100% รักษาอุณหภูมิน้ำแข็งได้นาน 24+ ชั่วโมง',
      x: 75,
      y: 56
    },
    {
      id: 'coating',
      title: 'Sweat-Free Powder Grip Finish',
      titleTh: 'ผิวพาวเดอร์โค้ทสัมผัสแมตต์ จับกระชับมือ',
      desc: 'Baked architectural powder coating provides a velvety tactile texture that resists chips, scratches, and everyday scuffs.',
      descTh: 'สีไม่ลอก ไม่เป็นรอยนิ้วมือง่าย และไม่ลื่นมือแม้ในสภาพอากาศชื้น',
      x: 25,
      y: 65
    },
    {
      id: 'base',
      title: 'Vehicle-Friendly Slim Base & Silent Boot',
      titleTh: 'ฐานสลิมพอดีกับช่องวางแก้วในรถยนต์',
      desc: 'Engineered base diameter slips smoothly into 99% of automotive cup holders and includes anti-clatter silicone cushioning.',
      descTh: 'วางในรถได้ไม่ล้ม พร้อมฐานรองกันกระแทก วางบนโต๊ะทำงานได้เงียบสนิท',
      x: 50,
      y: 88
    }
  ];

  const currentSpot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with big typography and whitespace */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#7A8B7B] uppercase block mb-2">
            Anatomy of Perfection
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1A2530] font-serif tracking-tight leading-tight">
            Built Around Your Everyday
          </h2>
          <p className="text-base sm:text-lg text-gray-500 mt-4 font-light leading-relaxed">
            Discover the six core innovations behind Sipora’s uncompromising thermal performance, spill-proof engineering, and ergonomic comfort.
          </p>
        </div>

        {/* Interactive Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Interactive Interactive Product Stage with Hotspots */}
          <div className="lg:col-span-7 relative bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/80 shadow-xl flex items-center justify-center min-h-[480px]">
            
            {/* Center Product Image */}
            <div className="relative w-72 sm:w-84 h-[400px] flex items-center justify-center rounded-2xl overflow-hidden shadow-inner bg-[#F4F3EE]">
              <img
                src="/src/assets/images/sipora_sage_tumbler_1787742175217.jpg"
                alt="Sipora Tumbler Anatomy"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Hotspot Pins */}
              {hotspots.map((spot) => {
                const isActive = activeHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      isActive
                        ? 'bg-[#1A2530] text-white ring-4 ring-[#7A8B7B]/50 scale-125 shadow-lg'
                        : 'bg-white text-[#1A2530] border-2 border-[#1A2530] hover:scale-110 shadow-md'
                    }`}
                    title={spot.title}
                    aria-label={spot.title}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current" />
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border border-[#7A8B7B] animate-ping opacity-75 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint Chip */}
            <div className="absolute bottom-4 left-4 sm:left-6 flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              <Sparkles className="w-3.5 h-3.5 text-[#7A8B7B]" />
              <span>Tap pins to inspect engineering details</span>
            </div>
          </div>

          {/* Right: Feature Detail Card & Hotspot Switcher */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Active Hotspot Inspector Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-lg relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-gray-200 flex items-center justify-center text-[#1A2530] mb-4">
                <Zap className="w-5 h-5 text-[#7A8B7B]" />
              </div>

              <span className="text-xs font-bold text-[#7A8B7B] uppercase tracking-wider block mb-1">
                FEATURE SPECIFICATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A2530] font-serif">
                {currentSpot.title}
              </h3>
              <p className="text-xs font-medium text-gray-400 mt-0.5 mb-3">
                {currentSpot.titleTh}
              </p>
              
              <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                {currentSpot.desc}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed bg-[#FAF9F6] p-3 rounded-xl border border-gray-100">
                💡 <span className="font-semibold text-gray-700">ประโยชน์การใช้งาน:</span> {currentSpot.descTh}
              </p>
            </div>

            {/* Quick Feature Checklist (6 Features from prompt) */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Double-wall insulation', sub: 'TempShield™ Vacuum' },
                { name: 'Stainless steel interior', sub: '18/8 Pro Food-Grade' },
                { name: 'Leak-resistant lid', sub: 'Silicone 360° Seal' },
                { name: 'Comfortable grip', sub: 'Velvet Powder Coat' },
                { name: 'Easy to clean', sub: 'Dishwasher Safe' },
                { name: 'BPA-free components', sub: 'Tritan™ Certified' },
              ].map((f, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-gray-100 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#7A8B7B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">{f.name}</p>
                    <p className="text-[10px] text-gray-500">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
