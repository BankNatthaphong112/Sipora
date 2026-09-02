import React, { useState } from 'react';
import { Heart, Star, Eye, ShoppingBag, Flame, Snowflake } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const STAGE_COLORS = ['#F3F1ED', '#E8EDF2', '#F1F3ED', '#EDEEF3'];

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct, 
    setQuickViewProduct,
    setViewMode,
    language,
    t
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : null;

  const inWishlist = isInWishlist(product.id);
  const stageBg = STAGE_COLORS[index % STAGE_COLORS.length];

  const productName = language === 'th' ? (product.nameTh || product.name) : product.name;
  const colorName = language === 'th' ? (selectedColor.nameTh || selectedColor.name) : selectedColor.name;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setSelectedProduct(product);
    setViewMode('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, product.sizes[0], 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col justify-between"
    >
      {/* Product Image Stage */}
      <div 
        className="aspect-4/5 mb-3 flex items-center justify-center relative overflow-hidden transition-colors rounded-2xl"
        style={{ backgroundColor: stageBg }}
      >
        {/* Badges (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="bg-[#1A1A1A] text-white text-[10px] px-2 py-1 font-bold tracking-wider uppercase rounded-xs">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#E58E8E] text-white text-[10px] px-2 py-1 font-bold tracking-wider uppercase rounded-xs">
              {discountPercent}% {t('off')}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            inWishlist 
              ? 'bg-[#E58E8E] text-white scale-110 shadow-xs' 
              : 'bg-white/90 text-gray-600 hover:text-black hover:bg-white shadow-2xs'
          }`}
          title={inWishlist ? t('removeFromWishlist') : t('addToWishlist')}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Photorealistic Product Image Stage */}
        <div className="w-full h-full p-3 flex items-center justify-center">
          <img
            src={isHovered && selectedColor.secondaryImage ? selectedColor.secondaryImage : selectedColor.image}
            alt={`${productName} - ${colorName}`}
            className="max-h-full w-auto object-contain mix-blend-multiply drop-shadow-sm transform group-hover:scale-108 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#1A1A1A] text-white hover:bg-black text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors rounded-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('quickAdd')}</span>
          </button>
          <button
            id={`quick-view-${product.id}`}
            onClick={handleQuickView}
            className="p-2.5 bg-white text-[#1A1A1A] hover:bg-gray-100 text-xs shadow-md cursor-pointer transition-colors rounded-lg"
            title={t('quickView')}
            aria-label={t('quickView')}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Meta */}
      <div className="flex justify-between items-start pt-1">
        <div className="flex-1 pr-2">
          <h3 className="text-[14px] font-bold text-[#1A1A1A] group-hover:text-[#7B8C7D] transition-colors leading-tight">
            {productName}
          </h3>
          <p className="text-[12px] text-gray-400 mt-0.5 font-normal">
            {colorName} • {product.capacity}
          </p>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer border ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-offset-1 ring-[#1A1A1A] scale-110'
                    : 'border-black/15 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={`${color.name} (${color.nameTh})`}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>

        {/* Price Tag */}
        <div className="text-right shrink-0">
          <span className="block font-bold text-[14px] sm:text-[15px] text-[#1A1A1A]">
            ฿{product.price.toLocaleString()}
          </span>
          {product.compareAtPrice && (
            <span className="block text-[11px] text-gray-400 line-through">
              ฿{product.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Mobile Quick Add Button */}
      <div className="mt-2.5 sm:hidden">
        <button
          onClick={handleQuickAdd}
          className="w-full py-2 bg-[#1A1A1A] text-white text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t('quickAdd')}</span>
        </button>
      </div>
    </div>
  );
};

