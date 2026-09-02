import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const NewArrivals: React.FC = () => {
  const { products, setViewMode, setFilters, language, t } = useShop();

  const newProducts = products.filter(p => p.isNew || p.id === 'sipora-summit-flask-1000' || p.id === 'sipora-horizon-flask-1200' || p.id === 'sipora-slim-straw-600').slice(0, 4);

  const handleExploreNew = () => {
    setFilters(prev => ({ ...prev, sortBy: 'newest' }));
    setViewMode('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1EC] text-[#7A8B7B] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'th' ? 'รุ่นใหม่ล่าสุด' : 'Latest Drops'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2530] font-serif tracking-tight">
              {t('newArrivalsTitle')}
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-light">
              {t('newArrivalsSubtitle')}
            </p>
          </div>

          <button
            id="new-arrivals-view-all-btn"
            onClick={handleExploreNew}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#1A2530] uppercase hover:text-[#7A8B7B] transition-colors cursor-pointer group"
          >
            <span>{t('discoverAllNew')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
