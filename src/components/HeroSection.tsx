import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { setViewMode, setFilters, setSelectedProduct, products, language, t } = useShop();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      series: language === 'th' ? 'Sipora Signature ซีรีส์' : 'Sipora Signature Series',
      title: language === 'th' ? 'เก็บเย็น 24 ชม.' : 'Keep It Hot.',
      title2: language === 'th' ? 'เก็บร้อน 12 ชม.' : 'Keep It Cold.',
      desc: language === 'th' 
        ? 'นวัตกรรมแก้วเก็บอุณหภูมิผนังสองชั้นสุญญากาศ สแตนเลส 316 ทนทาน สวยงาม ไร้หยดน้ำเกาะ พร้อมหูจับถนัดมือ' 
        : 'Precision double-wall vacuum insulated drinkware engineered for modern hydration with an ergonomic carry handle and pure taste.',
      tag: language === 'th' ? '5 เฉดสีมินิมอล • 500ml - 900ml' : '5-Color Palette • 500ml - 900ml',
      archBg: '#7B8C7D',
      archTop: '#6A7A6C',
      surfaceBg: '#D1D8D2',
      productId: 'sipora-handle-tumbler-900',
      image: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg'
    },
    {
      series: language === 'th' ? 'Sipora Pro ซีรีส์' : 'Sipora Pro Series',
      title: language === 'th' ? 'Nordic Sage' : 'Nordic Sage.',
      title2: language === 'th' ? 'เย็นสดชื่นตลอดวัน' : '32H Thermal Chill.',
      desc: language === 'th'
        ? 'เทคโนโลยีฉนวนกันความร้อน TempShield™ ผิวสัมผัสแบบ Matte กันลื่น วางในช่องวางแก้วในรถได้พอดี'
        : 'TempShield™ vacuum insulation with sweat-free matte finish, comfort loop handle, and vehicle cup-holder friendly tapered base.',
      tag: language === 'th' ? 'Nordic Sage & Charcoal • 900ml' : 'Nordic Sage & Charcoal • 900ml',
      archBg: '#3B4D3C',
      archTop: '#2B3B2C',
      surfaceBg: '#CBD9CC',
      productId: 'sipora-classic-500',
      image: '/src/assets/images/sipora_hero_banner_1787742229226.jpg'
    }
  ];

  const currentSlide = heroSlides[activeSlide];

  const handleShopNow = () => {
    setFilters(prev => ({ ...prev, category: 'all' }));
    setViewMode('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCollection = () => {
    const featured = products.find(p => p.id === currentSlide.productId) || products[0];
    if (featured) {
      setSelectedProduct(featured);
      setViewMode('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFCF9] pb-10">
      {/* Geometric Split Hero Block */}
      <div className="relative min-h-[480px] lg:min-h-[500px] bg-[#EAE8E2] flex flex-col lg:flex-row items-center px-6 sm:px-12 lg:px-16 overflow-hidden">
        
        {/* Left 50%: Geometric Text Content */}
        <div className="w-full lg:w-1/2 z-10 py-12 lg:py-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-px w-8 bg-[#1A1A1A]"></span>
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A]">
              {currentSlide.series}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold leading-[0.92] mb-4 tracking-tighter text-[#1A1A1A]">
            {currentSlide.title}<br />
            {currentSlide.title2}
          </h1>

          <p className="text-[#4A4A4A] text-base sm:text-lg mb-8 max-w-md leading-relaxed font-normal">
            {currentSlide.desc}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              id="hero-shop-now-btn"
              onClick={handleShopNow}
              className="bg-[#1A1A1A] text-white px-8 sm:px-10 py-4 text-[13px] font-bold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer"
            >
              {t('heroCtaShop')}
            </button>
            <button
              id="hero-explore-btn"
              onClick={handleExploreCollection}
              className="border border-[#1A1A1A] bg-transparent text-[#1A1A1A] px-8 sm:px-10 py-4 text-[13px] font-bold tracking-widest uppercase hover:bg-white transition-colors cursor-pointer"
            >
              {t('heroCtaExplore')}
            </button>
          </div>
        </div>

        {/* Right 50%: Architectural Geometric Backdrop & Tumbler Showcase */}
        <div className="w-full lg:w-[52%] lg:absolute lg:right-0 lg:top-0 h-80 sm:h-96 lg:h-full">
          <div 
            className="w-full h-full relative transition-colors duration-700 flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: currentSlide.surfaceBg }}
          >
            {/* Geometric Stage Container */}
            <div className="relative w-full max-w-lg h-full max-h-[380px] lg:max-h-[440px] flex items-center justify-center">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-black/10 relative group">
                <img
                  src={currentSlide.image}
                  alt="Sipora Insulated Tumblers"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#A3B8A5] uppercase block">
                    {language === 'th' ? 'แก้วเก็บอุณหภูมิของแท้จาก SIPORA' : 'GENUINE SIPORA INSULATION'}
                  </span>
                  <p className="text-sm font-semibold tracking-wide text-white">
                    {currentSlide.tag}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex gap-2.5 z-20">
              <button
                onClick={handlePrevSlide}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 flex items-center justify-center bg-white text-[#1A1A1A] cursor-pointer hover:bg-[#1A1A1A] hover:text-white transition-all shadow-md active:scale-95"
                title="Previous Slide"
                aria-label="Previous Slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSlide}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 flex items-center justify-center bg-white text-[#1A1A1A] cursor-pointer hover:bg-[#1A1A1A] hover:text-white transition-all shadow-md active:scale-95"
                title="Next Slide"
                aria-label="Next Slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Value Prop Geometric Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#EEECE6] p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#F3F1ED] flex items-center justify-center text-[#1A1A1A] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#7B8C7D]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">
                {language === 'th' ? 'สแตนเลส 316 Food-Grade' : '316 Pro-Grade Steel'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'th' ? 'ไม่ดูดกลิ่น รสชาติบริสุทธิ์' : 'Zero flavor transfer'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EEECE6] p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#F3F1ED] flex items-center justify-center text-[#1A1A1A] shrink-0">
              <Sparkles className="w-5 h-5 text-[#7B8C7D]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">
                {language === 'th' ? 'ผิวสัมผัส Matte Powder' : 'Sweat-Free Powder Finish'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'th' ? 'จับถนัดมือ ไร้หยดน้ำเกาะ' : 'Dry, comfortable grip'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EEECE6] p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#F3F1ED] flex items-center justify-center text-[#1A1A1A] shrink-0">
              <Award className="w-5 h-5 text-[#7B8C7D]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">
                {language === 'th' ? 'ปลอดสาร BPA 100%' : '100% BPA & Toxin Free'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'th' ? 'ปลอดภัยต่อสุขภาพทุกวัย' : 'Food-grade certified Tritan'}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#EEECE6] p-4 flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#F3F1ED] flex items-center justify-center text-[#1A1A1A] shrink-0">
              <span className="font-mono font-bold text-xs text-[#1A1A1A]">฿999</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wide">
                {language === 'th' ? 'จัดส่งฟรีทั่วประเทศ' : 'Free Express Delivery'}
              </p>
              <p className="text-[11px] text-gray-500">
                {language === 'th' ? 'เมื่อสั่งซื้อครบ ฿999' : 'On all orders over ฿999'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

