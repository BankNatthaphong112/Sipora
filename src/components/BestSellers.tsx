import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const BestSellers: React.FC = () => {
  const { products, setViewMode, setFilters, language, t } = useShop();

  const bestSellerProducts = products.filter(p => p.isBestSeller).slice(0, 4);

  const handleViewAll = () => {
    setFilters(prev => ({ ...prev, category: 'all' }));
    setViewMode('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FDFCF9] border-t border-[#EEECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Geometric Alignment */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
              {t('bestSellersTitle')}
            </h2>
            <p className="text-[13px] text-gray-500 uppercase tracking-widest mt-1 font-medium">
              {t('bestSellersSubtitle')}
            </p>
          </div>

          <button
            id="best-sellers-view-all-btn"
            onClick={handleViewAll}
            className="text-[12px] font-bold border-b-2 border-[#1A1A1A] pb-1 uppercase tracking-wider text-[#1A1A1A] hover:text-[#7B8C7D] hover:border-[#7B8C7D] transition-colors cursor-pointer"
          >
            {t('viewAll')}
          </button>
        </div>

        {/* 4 Products Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

