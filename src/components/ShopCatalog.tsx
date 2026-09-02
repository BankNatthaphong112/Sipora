import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Check, 
  Flame, 
  Snowflake,
  Search,
  Grid,
  ChevronDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

export const ShopCatalog: React.FC = () => {
  const { products, filters, setFilters, resetFilters, searchQuery, setSearchQuery, language, t } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique color swatches across all products
  const availableColors = useMemo(() => {
    const map = new Map<string, { name: string; nameTh?: string; hex: string }>();
    products.forEach(p => {
      p.colors.forEach(c => {
        if (!map.has(c.name)) {
          map.set(c.name, { name: c.name, nameTh: c.nameTh, hex: c.hex });
        }
      });
    });
    return Array.from(map.values());
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      // Price range
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      // Color filter
      if (filters.colors.length > 0) {
        const hasMatchingColor = product.colors.some(c => filters.colors.includes(c.name));
        if (!hasMatchingColor) return false;
      }
      // Temperature filter
      if (filters.temperaturePriority === 'hot' && product.hotHours === 0) return false;
      if (filters.temperaturePriority === 'cold' && product.coldHours === 0) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q) || product.nameTh.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q) || product.descriptionTh.toLowerCase().includes(q);
        const matchesCategory = product.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [products, filters, searchQuery]);

  const toggleColorFilter = (colorName: string) => {
    setFilters(prev => {
      const exists = prev.colors.includes(colorName);
      return {
        ...prev,
        colors: exists ? prev.colors.filter(c => c !== colorName) : [...prev.colors, colorName]
      };
    });
  };

  const currentCategory = CATEGORIES.find(c => c.id === filters.category);
  const currentCategoryTitle = filters.category === 'all'
    ? (language === 'th' ? 'แก้วน้ำเก็บอุณหภูมิ SIPORA ทั้งหมด' : 'All Sipora Drinkware')
    : (language === 'th' ? (currentCategory?.nameTh || currentCategory?.name) : currentCategory?.name) || 'Catalog';

  return (
    <div className="bg-[#FAF9F6] py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Banner & Title */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#7A8B7B] uppercase block mb-1">
                {language === 'th' ? 'ร้านค้าอย่างเป็นทางการ SIPORA' : 'Official Sipora Store'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A2530] font-serif tracking-tight">
                {currentCategoryTitle}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {language === 'th' 
                  ? `แสดงสินค้าคุณภาพ ${filteredProducts.length} รายการ ที่ผลิตด้วยความประณีต`
                  : `Showing ${filteredProducts.length} premium products engineered for perfection.`}
              </p>
            </div>

            {/* Quick Search & Sort Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Category Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filters.category === 'all'
                      ? 'bg-[#1A2530] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {language === 'th' ? `ทั้งหมด (${products.length})` : `All (${products.length})`}
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      filters.category === cat.id
                        ? 'bg-[#1A2530] text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {language === 'th' ? (cat.nameTh || cat.name) : cat.name}
                  </button>
                ))}
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  aria-label="Sort products"
                  className="appearance-none bg-white border border-gray-200 text-gray-800 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A2530] cursor-pointer shadow-2xs"
                >
                  <option value="featured">{t('sortFeatured')}</option>
                  <option value="price-asc">{t('sortPriceLow')}</option>
                  <option value="price-desc">{t('sortPriceHigh')}</option>
                  <option value="rating">{t('sortRating')}</option>
                  <option value="newest">{t('sortNewest')}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{t('filterBy')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid with Sidebar Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A2530] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#7A8B7B]" />
                  <span>{t('filterBy')}</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-gray-400 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('resetFilters')}</span>
                </button>
              </div>

              {/* Keyword Search in Catalog */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  {t('searchPlaceholder')}
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF9F6] border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                  />
                </div>
              </div>

              {/* Price Filter Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    {language === 'th' ? 'ราคาสูงสุด:' : 'Max Price:'}
                  </label>
                  <span className="text-xs font-mono font-bold text-[#1A2530]">
                    ฿{filters.maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={350}
                  max={2500}
                  step={50}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[#1A2530] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>฿350</span>
                  <span>฿2,500</span>
                </div>
              </div>

              {/* Color Filter Swatches */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2.5">
                  {t('color')} ({filters.colors.length > 0 ? filters.colors.length : (language === 'th' ? 'ทั้งหมด' : 'All')})
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const isSelected = filters.colors.includes(color.name);
                    const colorLabel = language === 'th' ? (color.nameTh || color.name) : color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => toggleColorFilter(color.name)}
                        className={`w-7 h-7 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'ring-2 ring-offset-1 ring-[#1A2530] scale-110'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={colorLabel}
                      >
                        {isSelected && (
                          <Check className={`w-3.5 h-3.5 ${['#E8E4DC', '#D1D5DB'].includes(color.hex) ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Temperature Preference */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  {language === 'th' ? 'เน้นเก็บอุณหภูมิ' : 'Thermal Priority'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, temperaturePriority: 'all' }))}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                      filters.temperaturePriority === 'all'
                        ? 'bg-[#1A2530] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {language === 'th' ? 'ทั้งหมด' : 'All'}
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, temperaturePriority: 'cold' }))}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      filters.temperaturePriority === 'cold'
                        ? 'bg-[#4A6B82] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Snowflake className="w-3 h-3" />
                    <span>{language === 'th' ? 'เย็น' : 'Cold'}</span>
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, temperaturePriority: 'hot' }))}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      filters.temperaturePriority === 'hot'
                        ? 'bg-[#A85A48] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>{language === 'th' ? 'ร้อน' : 'Hot'}</span>
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* Product Cards Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t('noProductsFound')}</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                  {language === 'th' 
                    ? 'ลองปรับเปลี่ยนช่วงราคา ตัวกรองสี หรือคำค้นหาใหม่อีกครั้ง'
                    : 'Try adjusting your price range, color preferences or clear your search terms.'}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#1A2530] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#2B3B4C] cursor-pointer"
                >
                  {t('clearFilters')}
                </button>
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
