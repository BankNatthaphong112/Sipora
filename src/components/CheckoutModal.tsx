import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Wallet, 
  Banknote, 
  ArrowRight, 
  ChevronLeft,
  Sparkles,
  Printer,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    cartDiscount, 
    amountNeededForFreeShipping,
    createOrder,
    couponCode,
    showToast,
    setIsTrackingOpen,
    language,
    t
  } = useShop();

  const { user, isAuthenticated } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');

  // Auto-populate when checkout opens or user changes
  useEffect(() => {
    if (isCheckoutOpen) {
      if (isAuthenticated && user) {
        setFullName(user.name || '');
        setEmail(user.email || '');
        setPhone(user.phone || '089-123-4567');
        if (user.savedAddress) {
          setAddress(user.savedAddress.address || '99/123 ถนนสุขุมวิท 71 พระโขนง');
          setSubDistrict(user.savedAddress.subDistrict || 'พระโขนงเหนือ');
          setDistrict(user.savedAddress.district || 'วัฒนา');
          setProvince(user.savedAddress.province || 'กรุงเทพมหานคร');
          setPostalCode(user.savedAddress.postalCode || '10110');
        }
      } else if (!fullName) {
        setFullName('ณัฐพงษ์ บุญเรือง');
        setPhone('089-123-4567');
        setEmail('banknatthaphong076@gmail.com');
        setAddress('99/123 ถนนสุขุมวิท 71 พระโขนง');
        setSubDistrict('พระโขนงเหนือ');
        setDistrict('วัฒนา');
        setProvince('กรุงเทพมหานคร');
        setPostalCode('10110');
      }
    }
  }, [isCheckoutOpen, isAuthenticated, user]);

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit_card' | 'truemoney' | 'cod'>('promptpay');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // PromptPay QR countdown simulation
  const [qrCountdown, setQrCountdown] = useState(300);

  useEffect(() => {
    if (step === 3 && paymentMethod === 'promptpay') {
      const timer = setInterval(() => {
        setQrCountdown(prev => (prev > 0 ? prev - 1 : 300));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, paymentMethod]);

  if (!isCheckoutOpen) return null;

  const shippingFee = shippingMethod === 'express' ? 90 : (amountNeededForFreeShipping === 0 ? 0 : 50);
  const finalTotal = cartTotal + shippingFee;

  const handleNextToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !postalCode) {
      alert(language === 'th' ? 'กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน' : 'Please fill in required shipping fields');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const order = createOrder({
        items: cart,
        subtotal: cartTotal + cartDiscount,
        discount: cartDiscount,
        shippingFee,
        total: finalTotal,
        shippingDetails: {
          fullName,
          phone,
          email,
          address,
          subDistrict,
          district,
          province,
          postalCode,
          notes
        },
        paymentMethod
      });

      setCreatedOrder(order);
      setStep(4);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleCopyOrderNumber = () => {
    if (createdOrder) {
      navigator.clipboard?.writeText(createdOrder.id);
      showToast(language === 'th' ? `คัดลอกหมายเลขคำสั่งซื้อ ${createdOrder.id} แล้ว` : `Copied order ID: ${createdOrder.id}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#1A2530] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-lg">SIPORA</span>
            <span className="text-gray-400 text-xs">|</span>
            <span className="text-xs font-semibold text-gray-200">
              {step === 4 
                ? (language === 'th' ? 'ยืนยันคำสั่งซื้อสำเร็จ' : 'Order Confirmed') 
                : (language === 'th' ? 'ระบบชำระเงินปลอดภัย' : 'Secure Express Checkout')}
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step indicator */}
        {step !== 4 && (
          <div className="bg-[#FAF9F6] px-6 py-3 border-b border-gray-200 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#1A2530]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#1A2530] text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
              <span>{t('shippingAddress')}</span>
            </div>
            <span className="text-gray-300">→</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#1A2530]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#1A2530] text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
              <span>{t('shippingMethod')}</span>
            </div>
            <span className="text-gray-300">→</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#1A2530]' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#1A2530] text-white' : 'bg-gray-200 text-gray-600'}`}>3</span>
              <span>{t('paymentMethod')}</span>
            </div>
          </div>
        )}

        {/* Step Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Address */}
          {step === 1 && (
            <form onSubmit={handleNextToShipping} className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 font-serif">
                {language === 'th' ? '1. ข้อมูลผู้รับและที่อยู่จัดส่ง' : '1. Customer & Delivery Information'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t('fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1A2530]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t('phoneNumber')} *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1A2530]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {language === 'th' ? 'อีเมล (สำหรับรับใบเสร็จและแจ้งสถานะพัสดุ)' : 'Email Address (for order updates & receipts)'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1A2530]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t('addressLine')} *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#1A2530]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t('subDistrict')}</label>
                  <input
                    type="text"
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t('district')}</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t('province')}</label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t('postalCode')} *</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t('orderNotes')}
                </label>
                <input
                  type="text"
                  placeholder={language === 'th' ? 'เช่น ฝากไว้ที่ป้อมยาม หรือโทรแจ้งก่อนส่ง' : 'e.g. Leave at front desk or call before delivery'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#1A2530] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2B3B4C] flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{t('continueToDelivery')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Options */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 font-serif">
                {language === 'th' ? '2. เลือกรูปแบบการจัดส่ง' : '2. Select Shipping Method'}
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#1A2530] bg-[#FAF9F6] ring-1 ring-[#1A2530]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#1A2530]"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">
                        {language === 'th' ? 'Flash Express พัสดุด่วนมาตรฐาน (1-2 วันทำการ)' : 'Flash Express Standard Delivery (1-2 Days)'}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {language === 'th' ? 'พร้อมระบบ SMS แจ้งเตือนและเลขติดตามพัสดุ' : 'Tracking code provided with SMS update'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono">
                    {amountNeededForFreeShipping === 0 ? (
                      <span className="text-[#7A8B7B]">{t('freeShipping')}</span>
                    ) : (
                      '฿50'
                    )}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#1A2530] bg-[#FAF9F6] ring-1 ring-[#1A2530]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#1A2530]"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">
                        {language === 'th' ? 'VIP Priority Express (ส่งด่วนพิเศษ แพ็คกันกระแทก 3 ชั้น)' : 'VIP Same-Day / 1-Day Morning Priority Express'}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {language === 'th' ? 'จัดส่งลำดับแรก พร้อมกล่องหุ้มกันกระแทกเกรดพรีเมียม' : 'Fast-tracked packing with shockproof foam'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono">฿90</span>
                </label>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-200/80 text-xs text-gray-600">
                <p className="font-bold text-gray-900 mb-1">{language === 'th' ? 'จัดส่งไปที่:' : 'Delivering to:'}</p>
                <p>{fullName} ({phone})</p>
                <p className="text-gray-500">{address}, {subDistrict}, {district}, {province} {postalCode}</p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'th' ? 'กลับไปแก้ไขที่อยู่' : 'Back to Address'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 rounded-xl bg-[#1A2530] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2B3B4C] flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{t('continueToPayment')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Options */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 font-serif">
                {language === 'th' ? '3. เลือกช่องทางการชำระเงิน' : '3. Choose Payment Method'}
              </h3>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('promptpay')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'promptpay'
                      ? 'border-[#1A2530] bg-[#FAF9F6] ring-2 ring-[#1A2530]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#1A2530]" />
                  <span className="text-xs font-bold text-gray-900">{t('promptpay')}</span>
                  <span className="text-[9px] text-[#7A8B7B] font-semibold">{language === 'th' ? 'สแกนจ่ายทันที' : 'Instant Scan'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'credit_card'
                      ? 'border-[#1A2530] bg-[#FAF9F6] ring-2 ring-[#1A2530]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#1A2530]" />
                  <span className="text-xs font-bold text-gray-900">{t('creditCard')}</span>
                  <span className="text-[9px] text-gray-500">Visa, Master</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('truemoney')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'truemoney'
                      ? 'border-[#1A2530] bg-[#FAF9F6] ring-2 ring-[#1A2530]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-[#E65100]" />
                  <span className="text-xs font-bold text-gray-900">{t('trueMoney')}</span>
                  <span className="text-[9px] text-gray-500">Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'border-[#1A2530] bg-[#FAF9F6] ring-2 ring-[#1A2530]'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold text-gray-900">{t('cod')}</span>
                  <span className="text-[9px] text-gray-500">{language === 'th' ? 'ชำระเมื่อรับของ' : 'Pay at door'}</span>
                </button>
              </div>

              {/* Payment Details Sub-pane */}
              {paymentMethod === 'promptpay' && (
                <div className="p-5 bg-white rounded-2xl border border-gray-200 text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A2530] text-white text-[11px] font-bold rounded-md uppercase">
                    <span>{language === 'th' ? 'พร้อมเพย์ QR ทางการ' : 'PromptPay Official'}</span>
                  </div>

                  {/* Simulated QR Code */}
                  <div className="w-44 h-44 mx-auto bg-white p-3 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center shadow-inner relative">
                    <QrCode className="w-32 h-32 text-[#1A2530]" />
                    <span className="text-[10px] font-mono font-bold text-gray-500 mt-1">SIPORA PAY ฿{finalTotal.toLocaleString()}</span>
                  </div>

                  <p className="text-xs text-gray-600">
                    {language === 'th' 
                      ? 'สแกนจ่ายได้ด้วยทุกแอปธนาคาร (K PLUS, SCB EASY, Krungthai NEXT, Bangkok Bank)'
                      : 'Scan with any Thai Banking App (K PLUS, SCB EASY, Krungthai NEXT, Bangkok Bank)'}
                  </p>
                  <p className="text-[11px] text-amber-700 font-mono">
                    {language === 'th' ? 'QR Code จะหมดอายุใน:' : 'QR expires in:'} {Math.floor(qrCountdown / 60)}:{(qrCountdown % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-white rounded-2xl border border-gray-200 space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">{language === 'th' ? 'หมายเลขบัตร' : 'Card Number'}</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      defaultValue="4111 •••• •••• 8892"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">{language === 'th' ? 'วันหมดอายุ' : 'Expiry'}</label>
                      <input type="text" placeholder="MM/YY" defaultValue="08/29" className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono" />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">CVV / CVC</label>
                      <input type="password" placeholder="•••" defaultValue="123" className="w-full px-3 py-2 rounded-xl border border-gray-200 font-mono" />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-gray-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>{t('subtotal')} ({cart.length} {language === 'th' ? 'รายการ' : 'items'})</span>
                  <span className="font-mono">฿{(cartTotal + cartDiscount).toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#7A8B7B] font-semibold">
                    <span>{t('discount')} ({couponCode})</span>
                    <span className="font-mono">-฿{cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>{t('shippingFee')} ({shippingMethod})</span>
                  <span className="font-mono">{shippingFee === 0 ? t('freeShipping') : `฿${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-900">
                  <span>{t('total')}</span>
                  <span className="text-base font-serif font-black text-[#1A2530]">฿{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
                </button>
                <button
                  id="confirm-pay-btn"
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-xl bg-[#1A2530] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2B3B4C] flex items-center gap-2 cursor-pointer shadow-lg active:scale-98 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <span>{language === 'th' ? 'กำลังดำเนินการชำระเงิน...' : 'Processing Payment...'}</span>
                  ) : (
                    <>
                      <span>{t('confirmAndPay')} • ฿{finalTotal.toLocaleString()}</span>
                      <CheckCircle className="w-4 h-4 text-[#7A8B7B]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS */}
          {step === 4 && createdOrder && (
            <div className="text-center py-4 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#EBF1EC] text-[#7A8B7B] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 bg-[#EBF1EC] text-[#7A8B7B] text-[11px] font-bold rounded-full uppercase tracking-wider">
                  {language === 'th' ? 'ชำระเงินเรียบร้อยแล้ว' : 'Payment Successful'}
                </span>
                <h3 className="text-2xl font-extrabold text-[#1A2530] font-serif mt-2">
                  {language === 'th' ? 'ขอบคุณสำหรับคำสั่งซื้อของคุณ!' : 'Thank You for Your Order!'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'th'
                    ? 'เราได้รับคำสั่งซื้อของคุณแล้ว ทีมช่างกำลังเตรียมบรรจุแก้วเก็บอุณหภูมิพรีเมียมของคุณ'
                    : "We've received your order and our artisan packaging team is preparing your insulated drinkware."}
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-gray-200 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      {language === 'th' ? 'หมายเลขคำสั่งซื้อ' : 'Order Number'}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono font-black text-sm text-[#1A2530]">{createdOrder.id}</span>
                      <button onClick={handleCopyOrderNumber} className="text-gray-400 hover:text-black p-0.5" title="Copy">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      {language === 'th' ? 'ระยะเวลาจัดส่งโดยประมาณ' : 'Estimated Delivery'}
                    </span>
                    <p className="text-xs font-bold text-[#7A8B7B]">
                      {language === 'th' ? 'พรุ่งนี้ / 1-2 วันทำการ' : 'Tomorrow / 1-2 Days'}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong className="text-gray-900">{language === 'th' ? 'ผู้รับ:' : 'Recipient:'}</strong> {createdOrder.shippingDetails.fullName} ({createdOrder.shippingDetails.phone})</p>
                  <p><strong className="text-gray-900">{language === 'th' ? 'ที่อยู่:' : 'Delivery to:'}</strong> {createdOrder.shippingDetails.address}, {createdOrder.shippingDetails.province} {createdOrder.shippingDetails.postalCode}</p>
                  <p><strong className="text-gray-900">{language === 'th' ? 'เลขพัสดุ:' : 'Tracking Code:'}</strong> <span className="font-mono font-bold text-[#1A2530]">{createdOrder.trackingNumber}</span> ({createdOrder.carrier})</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsTrackingOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A2530] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2B3B4C] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Truck className="w-4 h-4" />
                  <span>{t('trackOrder')}</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    window.print();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'th' ? 'พิมพ์ใบเสร็จ' : 'Print Receipt'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
