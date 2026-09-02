import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  CheckCircle,
  Sparkles,
  Gift
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartTotal, 
    cartCount,
    cartDiscount,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    couponCode,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    products,
    addToCart,
    language,
    t
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [orderNote, setOrderNote] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round(((cartTotal + cartDiscount) / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const upsellProduct = products.find(p => p.id === 'sipora-barista-cup-350');
  const hasUpsellInCart = cart.some(i => i.productId === 'sipora-barista-cup-350');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] text-[#1A2530] shadow-2xl flex flex-col justify-between">
          
          {/* Top Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#1A2530]" />
                <h2 className="text-lg font-bold font-serif">
                  {t('shoppingCart')} ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="flex items-center gap-1 text-gray-600">
                  <Truck className="w-3.5 h-3.5 text-[#7A8B7B]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-[#7A8B7B] font-bold">
                      {language === 'th' ? '🎉 ได้รับสิทธิ์จัดส่งฟรีแล้ว!' : '🎉 Free Shipping Unlocked!'}
                    </span>
                  ) : (
                    <span>
                      {language === 'th' 
                        ? <>ซื้อเพิ่มอีก ฿{amountNeededForFreeShipping.toLocaleString()} เพื่อ <strong className="text-gray-900">จัดส่งฟรี</strong></>
                        : <>Add ฿{amountNeededForFreeShipping.toLocaleString()} more for <strong className="text-gray-900">FREE Shipping</strong></>}
                    </span>
                  )}
                </span>
                <span className="font-mono text-gray-500">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    amountNeededForFreeShipping === 0 ? 'bg-[#7A8B7B]' : 'bg-[#1A2530]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              <>
                {cart.map((item) => {
                  const itemName = language === 'th' ? (item.product.nameTh || item.product.name) : item.product.name;
                  const itemColor = language === 'th' ? (item.selectedColor.nameTh || item.selectedColor.name) : item.selectedColor.name;

                  return (
                    <div 
                      key={item.id}
                      className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex gap-3.5 items-center relative"
                    >
                      {/* Thumbnail */}
                      <div className="w-18 h-18 rounded-xl bg-[#F5F4F0] p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.selectedColor.image}
                          alt={itemName}
                          className="w-full h-full object-contain mix-blend-multiply"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-[#1A2530] truncate">
                            {itemName}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{itemColor}</span>
                          <span>•</span>
                          <span>{item.selectedSize}</span>
                        </div>

                        {item.engravingText && (
                          <div className="text-[10px] text-gray-700 bg-gray-50 px-2 py-0.5 rounded font-mono mt-1 border border-gray-100 inline-block">
                            {language === 'th' ? 'สลักเลเซอร์:' : 'Engraved:'} “{item.engravingText}”
                          </div>
                        )}

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-l cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-mono font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded-r cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <span className="text-xs font-bold font-mono text-[#1A2530]">
                            ฿{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Optional Upsell Card */}
                {upsellProduct && !hasUpsellInCart && (
                  <div className="p-3.5 bg-white rounded-2xl border border-dashed border-[#7A8B7B]/50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-[#F5F4F0] p-1 shrink-0">
                        <img src={upsellProduct.colors[0].image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-900 leading-tight">
                          {language === 'th' ? 'เพิ่มแก้ว Barista Ceramic 350ml' : 'Add Barista Ceramic Cup 350ml'}
                        </p>
                        <p className="text-[10px] text-[#7A8B7B] font-semibold">
                          {language === 'th' ? '+฿690 (จับคู่ราคาพิเศษ)' : '+฿690 (Special Drinkware Pair)'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(upsellProduct, upsellProduct.colors[0], '350ml', 1)}
                      className="px-3 py-1.5 rounded-lg bg-[#7A8B7B] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#687869] cursor-pointer"
                    >
                      + {language === 'th' ? 'เพิ่ม' : 'Add'}
                    </button>
                  </div>
                )}

                {/* Gift Wrap Toggle */}
                <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#A85A48]" />
                    <span className="font-semibold text-gray-700">
                      {language === 'th' ? 'เพิ่มกล่องของขวัญพรีเมียม (+฿50)' : 'Add Premium Gift Packaging (+฿50)'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-[#1A2530] rounded cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{t('cartEmpty')}</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                  {language === 'th' 
                    ? 'สัมผัสประสบการณ์แก้วน้ำเก็บอุณหภูมิสไตล์มินิมอลคุณภาพสูง'
                    : 'Explore our premium insulated drinkware crafted for everyday performance.'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#1A2530] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#2B3B4C] cursor-pointer"
                >
                  {t('startShopping')}
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-gray-200 space-y-4">
              
              {/* Coupon Code Input */}
              <div>
                {!couponCode ? (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder={t('couponPlaceholder')}
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-800 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer"
                    >
                      {t('applyCoupon')}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2 bg-[#EBF1EC] rounded-xl border border-[#7A8B7B]/30 text-xs">
                    <span className="font-mono font-bold text-[#7A8B7B] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {language === 'th' ? `ใช้โค้ดส่วนลดแล้ว: ${couponCode}` : `Code applied: ${couponCode}`}
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-gray-500 hover:text-red-500 text-[11px] underline cursor-pointer"
                    >
                      {language === 'th' ? 'ยกเลิก' : 'Remove'}
                    </button>
                  </div>
                )}
                {couponFeedback && !couponCode && (
                  <p className={`text-[11px] mt-1 ${couponFeedback.success ? 'text-green-600' : 'text-red-500'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{t('subtotal')}</span>
                  <span className="font-mono font-semibold">฿{(cartTotal + cartDiscount).toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#7A8B7B] font-semibold">
                    <span>{t('discount')} ({couponCode})</span>
                    <span className="font-mono">-฿{cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                {isGiftWrap && (
                  <div className="flex justify-between text-gray-600">
                    <span>{language === 'th' ? 'กล่องของขวัญ' : 'Gift Packaging'}</span>
                    <span className="font-mono">฿50</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>{t('shippingFee')}</span>
                  <span className="font-mono">
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-[#7A8B7B] font-bold">{t('freeShipping')}</span>
                    ) : (
                      '฿50'
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between text-sm font-extrabold text-[#1A2530]">
                  <span>{t('total')}</span>
                  <span className="font-serif text-base">
                    ฿{(cartTotal + (amountNeededForFreeShipping === 0 ? 0 : 50) + (isGiftWrap ? 50 : 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleCheckoutClick}
                className="w-full py-4 rounded-2xl bg-[#1A2530] text-white hover:bg-[#2B3B4C] text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
              >
                <span>{t('checkoutBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A8B7B]" />
                <span>{language === 'th' ? 'ชำระเงินปลอดภัย 100% • รองรับพร้อมเพย์และบัตรเครดิต' : 'SSL Encrypted Checkout • PromptPay & Credit Card'}</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
