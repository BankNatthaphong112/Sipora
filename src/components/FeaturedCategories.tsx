import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FeaturedCategories: React.FC = () => {
  const { setFilters, setViewMode, language, t } = useShop();

  const handleCategoryClick = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    setViewMode('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FDFCF9] border-t border-[#EEECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Geometric Balance */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
              {t('navCollections')}
            </h2>
            <p className="text-[13px] text-gray-500 uppercase tracking-widest mt-1 font-medium">
              {language === 'th' ? 'ผสานความมินิมอลกับฟังก์ชันการใช้งาน' : 'Form meets function'}
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('all')}
            className="text-[12px] font-bold border-b-2 border-[#1A1A1A] pb-1 uppercase tracking-wider text-[#1A1A1A] hover:text-[#7B8C7D] hover:border-[#7B8C7D] transition-colors cursor-pointer"
          >
            {t('viewAllCategories')}
          </button>
        </div>

        {/* 3 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F3F1ED] mb-3">
                <img
                  src={cat.image}
                  alt={language === 'th' ? (cat.nameTh || cat.name) : cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Floating Corner Arrow */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text Meta */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[13px] sm:text-[14px] text-[#1A1A1A] group-hover:text-[#7B8C7D] transition-colors leading-tight">
                    {language === 'th' ? (cat.nameTh || cat.name) : cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {language === 'th' ? (cat.id === 'handle-tumblers' ? '1 รุ่นสินค้า' : (cat.id === 'classic-tumblers' ? '2 รุ่นสินค้า' : '3 รุ่นสินค้า')) : cat.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

