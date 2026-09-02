import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Flame, 
  Snowflake, 
  Sparkles, 
  ChevronLeft,
  Share2,
  Info,
  Type,
  Maximize2
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  isModal?: boolean;
  onClose?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  isModal = false,
  onClose 
}) => {
  const { isAuthenticated, openLoginModal } = useAuth();
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen, 
    setViewMode, 
    products, 
    setSelectedProduct,
    language,
    showToast,
    t
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '500ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'temp' | 'care' | 'reviews'>('details');
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [isEngravingOpen, setIsEngravingOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : null;

  const productName = language === 'th' ? (product.nameTh || product.name) : product.name;
  const colorName = language === 'th' ? (selectedColor.nameTh || selectedColor.name) : selectedColor.name;
  const productDesc = language === 'th' ? (product.descriptionTh || product.description) : product.description;

  const galleryImages = [
    {
      src: selectedColor.image,
      labelTh: 'สตูดิโอหน้าตรง (Studio View)',
      labelEn: 'Studio Shot',
      tag: 'STUDIO'
    },
    {
      src: selectedColor.secondaryImage || '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg',
      labelTh: 'มุมมองรายละเอียด (Detail View)',
      labelEn: 'Detail View',
      tag: 'DETAIL'
    },
    {
      src: '/src/assets/images/sipora_hero_banner_1787742229226.jpg',
      labelTh: 'ไลฟ์สไตล์ (Lifestyle)',
      labelEn: 'Lifestyle',
      tag: 'SCENE'
    },
    {
      src: '/src/assets/images/sipora_tumbler_lineup_1787742156892.jpg',
      labelTh: 'คอลเลกชัน (Collection)',
      labelEn: 'Lineup',
      tag: 'ALL'
    }
  ];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast(t('loginRequiredForCart'));
      openLoginModal();
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity, customEngraving.trim() || undefined);
    if (isModal && onClose) onClose();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      showToast(t('loginRequiredForCart'));
      openLoginModal();
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity, customEngraving.trim() || undefined);
    if (isModal && onClose) onClose();
    setIsCheckoutOpen(true);
  };

  const relatedProducts = products.filter(p => p.id !== product.id && (p.category === product.category || p.isBestSeller)).slice(0, 4);

  return (
    <div className={`bg-[#FAF9F6] text-[#1A2530] ${isModal ? 'p-6 sm:p-8' : 'py-8 sm:py-12'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        {!isModal && (
          <button
            onClick={() => { setViewMode('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-6 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === 'th' ? '← กลับสู่หน้ารวมสินค้า' : '← Back to All Products'}</span>
          </button>
        )}

        {/* Main PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery & Zoom */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 shrink-0">
              {galleryImages.map((imgItem, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white border-2 transition-all cursor-pointer p-1.5 shrink-0 flex flex-col items-center justify-center relative ${
                    activeImageIndex === idx
                      ? 'border-[#1A2530] shadow-sm scale-105 ring-2 ring-[#1A2530]/20'
                      : 'border-gray-200/80 hover:border-gray-400 opacity-75 hover:opacity-100'
                  }`}
                  title={language === 'th' ? imgItem.labelTh : imgItem.labelEn}
                >
                  <img
                    src={imgItem.src}
                    alt={`${productName} view ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 text-[9px] font-semibold tracking-tighter text-gray-500 bg-white/90 px-1 rounded-sm shadow-2xs">
                    {imgItem.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Stage Display with Zoom */}
            <div className="relative flex-1 aspect-square rounded-3xl bg-white border border-gray-200/80 p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-xs">
              
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="px-3 py-1 bg-[#1A2530] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {product.badge}
                  </span>
                )}
                {discountPercent && (
                  <span className="px-2.5 py-0.5 bg-[#A85A48] text-white text-[10px] font-bold rounded-md">
                    -{discountPercent}% {t('off')}
                  </span>
                )}
                <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md">
                  {selectedColor.name}
                </span>
              </div>

              {/* Wishlist & Zoom Buttons */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center cursor-pointer shadow-xs"
                  title="Zoom toggle"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    inWishlist
                      ? 'bg-[#A85A48] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={inWishlist ? t('removeFromWishlist') : t('addToWishlist')}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Main Realistic Tumbler Photo Display */}
              <div 
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-full h-full flex items-center justify-center cursor-zoom-in relative"
              >
                <img
                  src={galleryImages[activeImageIndex]?.src || selectedColor.image}
                  alt={`${productName} - ${colorName}`}
                  className={`max-h-full w-auto object-contain mix-blend-multiply transition-all duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100 hover:scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Laser Engraving Preview Overlay On Tumbler - Clean & Proportionate */}
                {customEngraving.trim() && activeImageIndex === 0 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center">
                    <div className="bg-black/60 backdrop-blur-xs px-3.5 py-1.5 rounded-md border border-white/30 shadow-lg text-white font-mono tracking-widest text-xs uppercase max-w-[200px] truncate">
                      {customEngraving}
                    </div>
                    <span className="block text-[9px] text-gray-300 tracking-wider mt-0.5">
                      LASER ENGRAVED
                    </span>
                  </div>
                )}
              </div>

              {/* Real-Time Color Feedback Chip */}
              <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 flex items-center gap-2 shadow-xs">
                <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: selectedColor.hex }} />
                <span>{colorName}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Purchasing Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold tracking-widest text-[#7A8B7B] uppercase">
                  {language === 'th' 
                    ? (product.category === 'classic-tumblers' ? 'แก้วทรงคลาสสิก' : (product.category === 'handle-tumblers' ? 'แก้วมีหูจับ' : 'กระบอกน้ำเก็บอุณหภูมิ'))
                    : product.categoryName}
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({product.reviewCount} {t('reviews')})</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2530] font-serif leading-tight">
                {productName}
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-light">
                {product.capacity} • {product.tagline}
              </p>

              {/* Thermal Performance Indicators */}
              <div className="flex items-center gap-3 mt-3">
                {product.hotHours > 0 && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#A85A48] bg-[#FAF1EE] px-2.5 py-1 rounded-lg">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{language === 'th' ? `เก็บร้อน ${product.hotHours} ชม.` : `Hot for ${product.hotHours} Hours`}</span>
                  </span>
                )}
                {product.coldHours > 0 && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6B82] bg-[#EEF4F8] px-2.5 py-1 rounded-lg">
                    <Snowflake className="w-3.5 h-3.5" />
                    <span>{language === 'th' ? `เก็บเย็น ${product.coldHours} ชม.` : `Cold for ${product.coldHours} Hours`}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Price Row */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200/80 flex items-baseline justify-between shadow-2xs">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#1A2530] font-serif">
                  ฿{product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ฿{product.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-[#7A8B7B] bg-[#EBF1EC] px-2.5 py-1 rounded-full">
                {t('inStock')}
              </span>
            </div>

            {/* Color Swatches Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {t('color')}: <span className="text-[#1A2530] font-semibold">{colorName}</span>
                </label>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full transition-all cursor-pointer border-2 flex items-center justify-center ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-offset-2 ring-[#1A2530] scale-110 border-white'
                        : 'border-gray-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name} (${color.nameTh})`}
                  >
                    {selectedColor.name === color.name && (
                      <Check className={`w-4 h-4 ${['#E8E4DC', '#D1D5DB'].includes(color.hex) ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                  {t('capacity')}:
                </label>
                <div className="flex items-center gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer border ${
                        selectedSize === size
                          ? 'bg-[#1A2530] text-white border-[#1A2530] shadow-xs'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Custom Laser Engraving Accordion */}
            <div className="p-4 rounded-2xl bg-white border border-gray-200/80">
              <button
                type="button"
                onClick={() => setIsEngravingOpen(!isEngravingOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-[#1A2530] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#7A8B7B]" />
                  <span>{t('engraving')}</span>
                </span>
                <span className="text-[#7A8B7B] font-mono">{isEngravingOpen ? '—' : '+'}</span>
              </button>

              {isEngravingOpen && (
                <div className="mt-3 pt-3 border-t border-gray-100 animate-fade-in space-y-2">
                  <input
                    type="text"
                    maxLength={15}
                    placeholder={t('engravingPlaceholder')}
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                  />
                  <p className="text-[11px] text-gray-400">
                    {language === 'th' 
                      ? 'สลักด้วยไฟเบอร์เลเซอร์ความแม่นยำสูง ลงบนเนื้อสแตนเลสโดยตรง คมชัด ทนทาน ไม่หลุดลอกตลอดอายุการใช้งาน'
                      : 'High-precision fiber laser etching into stainless steel substrate. Permanent and waterproof.'}
                  </p>
                </div>
              )}
            </div>

            {/* Quantity & Action Buttons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Pill */}
                <div className="flex items-center border border-gray-200 bg-white rounded-2xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#1A2530] text-white hover:bg-[#2B3B4C] text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('addToCart')} • ฿{(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl bg-[#7A8B7B] text-white hover:bg-[#687869] text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>{t('buyNow')}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-200/60 text-center">
              <div className="p-2.5 bg-white/70 rounded-xl border border-gray-100">
                <Truck className="w-4 h-4 text-[#7A8B7B] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-900">{language === 'th' ? 'ส่งด่วน 1-2 วัน' : 'Fast Delivery'}</p>
                <p className="text-[9px] text-gray-400">{language === 'th' ? 'จัดส่งทั่วประเทศ' : '1-2 Business Days'}</p>
              </div>
              <div className="p-2.5 bg-white/70 rounded-xl border border-gray-100">
                <ShieldCheck className="w-4 h-4 text-[#7A8B7B] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-900">{language === 'th' ? 'ประกันตลอดชีพ' : 'Lifetime Warranty'}</p>
                <p className="text-[9px] text-gray-400">{language === 'th' ? 'ฉนวนสุญญากาศ' : 'On Vacuum Shield'}</p>
              </div>
              <div className="p-2.5 bg-white/70 rounded-xl border border-gray-100">
                <RotateCcw className="w-4 h-4 text-[#7A8B7B] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-900">{language === 'th' ? 'รับประกันความพอใจ' : 'Easy Returns'}</p>
                <p className="text-[9px] text-gray-400">{language === 'th' ? 'เปลี่ยนได้ใน 14 วัน' : '14-Day Guarantee'}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Detailed Tabs (Description, Specifications, Temperature, Care, Reviews) */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-gray-200">
          
          {/* Tab Headers */}
          <div className="flex items-center gap-2 sm:gap-6 border-b border-gray-200 overflow-x-auto pb-px">
            {[
              { id: 'details', label: language === 'th' ? 'รายละเอียดสินค้า' : 'Product Details' },
              { id: 'specs', label: language === 'th' ? 'ข้อมูลจำเพาะ' : 'Specifications' },
              { id: 'temp', label: language === 'th' ? 'ประสิทธิภาพอุณหภูมิ' : 'Thermal Tech' },
              { id: 'care', label: language === 'th' ? 'การดูแลรักษา' : 'Care & Cleaning' },
              { id: 'reviews', label: `${t('reviews')} (${product.reviewCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'border-[#1A2530] text-[#1A2530]'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="py-8">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#1A2530] text-base mb-3 font-serif">
                    {language === 'th' ? 'มาตรฐานแก้วน้ำ Sipora' : 'The Sipora Standard'}
                  </h4>
                  <p className="mb-4">{productDesc}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2530] text-base mb-3 font-serif">
                    {language === 'th' ? 'คุณสมบัติเด่นของรุ่นนี้' : 'Key Innovations'}
                  </h4>
                  <ul className="space-y-2.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="w-4 h-4 text-[#7A8B7B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs">
                <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-400 font-medium">{t('material')}</span>
                    <span className="font-semibold text-gray-900">{product.specifications.material}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-400 font-medium">{t('weight')}</span>
                    <span className="font-semibold text-gray-900">{product.specifications.weight}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-400 font-medium">{t('dimensions')}</span>
                    <span className="font-semibold text-gray-900">{product.specifications.height} (Diam. {product.specifications.diameter})</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-400 font-medium">{t('cupHolderFriendly')}</span>
                    <span className="font-semibold text-emerald-700">{product.specifications.cupHolderFriendly ? (language === 'th' ? 'รองรับ (วางช่องวางแก้วได้ 99%)' : 'Yes (Fits 99% standard holders)') : (language === 'th' ? 'ขนาดใหญ่พิเศษ' : 'Wide Expedition Profile')}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-400 font-medium">{t('dishwasherSafe')}</span>
                    <span className="font-semibold text-gray-900">{product.specifications.dishwasherSafe ? (language === 'th' ? 'รองรับ (ชั้นบนของเครื่อง)' : 'Yes (Top rack recommended)') : (language === 'th' ? 'ล้างด้วยมือ' : 'Hand wash only')}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-400 font-medium">{t('bpaFree')}</span>
                    <span className="font-semibold text-emerald-700">{language === 'th' ? 'ผ่านการรับรองความปลอดภัย 100%' : '100% Certified Safe'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'temp' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3 text-[#A85A48] mb-3">
                    <Flame className="w-6 h-6" />
                    <h4 className="font-bold text-base text-gray-900">
                      {language === 'th' ? `เก็บร้อน (${product.hotHours} ชั่วโมง)` : `Hot Retention (${product.hotHours}h)`}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    {language === 'th' 
                      ? 'รักษาอุณหภูมิกาแฟ ชา หรือเครื่องดื่มร้อนให้เกิน 60°C ได้ตลอดทั้งช่วงเช้าและระหว่างการทำงาน'
                      : 'Keeps steaming coffee, latte, or hot herbal tea above 60°C drinking temperature throughout morning commutes and long meetings.'}
                  </p>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#A85A48] w-4/5 rounded-full" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-3 text-[#4A6B82] mb-3">
                    <Snowflake className="w-6 h-6" />
                    <h4 className="font-bold text-base text-gray-900">
                      {language === 'th' ? `เก็บเย็น (${product.coldHours} ชั่วโมง)` : `Cold Retention (${product.coldHours}h)`}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    {language === 'th'
                      ? 'รักษาความเย็นของน้ำดื่ม มัทฉะเย็น และเครื่องดื่มโปรดพร้อมน้ำแข็งก้อนไม่ละลายยาวนาน 24 ถึง 32+ ชั่วโมง'
                      : 'Keeps water, iced matcha, and cold brews near 0°C with solid ice cubes intact for 24 to 32+ hours under intense summer heat.'}
                  </p>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#4A6B82] w-11/12 rounded-full" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 max-w-3xl space-y-3 text-xs sm:text-sm text-gray-600">
                <h4 className="font-bold text-gray-900 text-base mb-2">
                  {language === 'th' ? 'คำแนะนำการดูแลและทำความสะอาดแก้วน้ำ Sipora' : 'How to Care for Your Sipora Drinkware'}
                </h4>
                {language === 'th' ? (
                  <>
                    <p>• ล้างด้วยน้ำอุ่นผสมน้ำยาล้างจานสูตรอ่อนโยนก่อนใช้งานครั้งแรก ตัวแก้วสแตนเลสและฝาสามารถล้างด้วยเครื่องล้างจานได้</p>
                    <p>• หากมีคราบชาหรือกาแฟติดแน่น ให้ผสมเบกกิ้งโซดา 1 ช้อนโต๊ะกับน้ำอุ่น แช่ทิ้งไว้ 15 นาทีแล้วล้างออก</p>
                    <p>• ห้ามนำเข้าไมโครเวฟหรือช่องแช่แข็ง (เนื่องจากระบบสุญญากาศจะกันความร้อน/ความเย็นจากภายนอก)</p>
                    <p>• ห้ามใช้สารฟอกขาวหรือน้ำยาที่มีฤทธิ์กัดกร่อนสูง เพื่อถนอมผิวสแตนเลสเกรดอาหาร</p>
                  </>
                ) : (
                  <>
                    <p>• Wash with warm soapy water before first use. All stainless steel bodies and Tritan lids are top-rack dishwasher safe.</p>
                    <p>• For deep cleaning after heavy coffee or tea usage, mix 1 tbsp of baking soda with warm water and let sit for 15 minutes.</p>
                    <p>• Avoid microwaving or placing in freezer (vacuum insulation stops external cooling and heating).</p>
                    <p>• Do not use bleach or chlorine-based cleansers to protect the electropolished interior finish.</p>
                  </>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 font-serif">{product.rating.toFixed(1)} / 5.0</span>
                    <p className="text-xs text-gray-400">{t('customerRatings')} {productName}</p>
                  </div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 text-xs text-gray-600">
                  <p className="font-bold text-gray-900">{language === 'th' ? '“ดีไซน์มินิมอลและเก็บความเย็นได้ดีมาก”' : '“Minimalist design and superb cold retention”'}</p>
                  <p className="mt-1">{language === 'th' ? 'ได้รับสินค้าใน 2 วัน แพ็คมาอย่างดี ตัวแก้วงานเนียนมาก สลักชื่อคมชัด แนะนำเลยครับ' : 'Fast 2-day delivery, beautifully packed. Laser engraving is crisp and premium. Highly recommended.'}</p>
                  <p className="text-[10px] text-gray-400 mt-2">โดย Khun P. • {t('verifiedBuyer')}</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Related Products Carousel */}
        {!isModal && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A2530] font-serif mb-6">
              {t('relatedProducts')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
