import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Search, 
  CheckCircle, 
  Package, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, orders, language, t } = useShop();
  const [searchCode, setSearchCode] = useState('SIP-2026-8942');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => 
      o.id.toLowerCase() === searchCode.trim().toLowerCase() ||
      o.trackingNumber.toLowerCase() === searchCode.trim().toLowerCase() ||
      o.shippingDetails.phone.includes(searchCode.trim())
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Demo mock order if not found
      setSearchedOrder({
        id: searchCode.trim().toUpperCase() || 'SIP-2026-8942',
        trackingNumber: 'FLX948291034TH',
        carrier: 'Flash Express',
        date: language === 'th' ? 'วันนี้, 10:45 น.' : 'Today, 10:45 AM',
        status: 'in_transit',
        statusMessage: language === 'th' ? 'พัสดุกำลังอยู่ระหว่างการนำจ่ายโดยเจ้าหน้าที่ขนส่ง' : 'Package out for delivery by courier',
        shippingDetails: {
          fullName: 'Customer',
          phone: '089-xxx-xxxx',
          province: 'Bangkok'
        },
        estimatedDelivery: language === 'th' ? 'พรุ่งนี้ ภายใน 17:00 น.' : 'Tomorrow, by 17:00'
      });
    }
  };

  const steps = language === 'th' ? [
    { title: 'ยืนยันคำสั่งซื้อสำเร็จ', time: '10:45 น.', done: true, desc: 'ชำระเงินเรียบร้อยและบันทึกคำสั่งซื้อ' },
    { title: 'ตรวจสอบคุณภาพเลเซอร์ & งานประกอบ', time: '11:30 น.', done: true, desc: 'ตรวจสอบรอยขูดขีดและทดสอบสลักเลเซอร์ความแม่นยำสูง' },
    { title: 'บริษัทขนส่งเข้ารับพัสดุ', time: '14:15 น.', done: true, desc: 'ศูนย์กระจายสินค้า Flash Express รับเข้าระบบ' },
    { title: 'กำลังนำจ่ายพัสดุ (Out for Delivery)', time: 'วันนี้', done: true, current: true, desc: 'พนักงานขนส่งกำลังเดินทางไปส่งตามที่อยู่' },
    { title: 'จัดส่งสำเร็จ (Delivered)', time: 'คาดการณ์พรุ่งนี้', done: false, desc: 'รอรับมอบพัสดุพร้อมแก้ว SIPORA ของคุณ' }
  ] : [
    { title: 'Order Confirmed', time: '10:45 AM', done: true, desc: 'Payment received and order logged' },
    { title: 'Precision Inspected & Laser QA', time: '11:30 AM', done: true, desc: 'Passed vacuum insulation test and precision laser etching QA' },
    { title: 'Picked Up by Courier', time: '02:15 PM', done: true, desc: 'Flash Express distribution hub processed item' },
    { title: 'Out for Delivery', time: 'Today', done: true, current: true, desc: 'Courier driver is on the route to your destination' },
    { title: 'Delivered', time: 'Estimated Tomorrow', done: false, desc: 'Awaiting package drop-off' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#1A2530] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#7A8B7B]" />
            <h3 className="text-base font-bold font-serif">
              {language === 'th' ? 'ติดตามพัสดุ SIPORA' : 'Sipora Order Tracking'}
            </h3>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Form */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder={language === 'th' ? 'กรอกหมายเลขคำสั่งซื้อ (SIP-...) หรือเลขพัสดุ' : 'Enter Order ID (SIP-...) or Tracking No.'}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs font-mono uppercase focus:ring-2 focus:ring-[#1A2530]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1A2530] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2B3B4C] cursor-pointer"
            >
              {language === 'th' ? 'ค้นหา' : 'Track'}
            </button>
          </form>

          {/* Tracking Result View */}
          {searchedOrder && (
            <div className="space-y-5 animate-fade-in">
              {/* Order Info Card */}
              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">{language === 'th' ? 'หมายเลขคำสั่งซื้อ' : 'Order ID'}</span>
                  <p className="font-mono font-bold text-gray-900">{searchedOrder.id}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{language === 'th' ? 'ขนส่ง:' : 'Carrier:'} {searchedOrder.carrier} ({searchedOrder.trackingNumber})</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-[#EBF1EC] text-[#7A8B7B] font-bold text-[10px] uppercase">
                    {language === 'th' ? 'กำลังจัดส่ง' : 'In Transit'}
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">{language === 'th' ? 'คาดว่าจะได้รับ:' : 'Est:'} {searchedOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {language === 'th' ? 'ไทม์ไลน์สถานะการจัดส่ง' : 'Shipment Milestones'}
                </p>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {steps.map((st, i) => (
                    <div key={i} className="relative text-xs">
                      <div 
                        className={`absolute -left-6 top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                          st.current 
                            ? 'border-[#7A8B7B] ring-4 ring-[#7A8B7B]/20' 
                            : st.done 
                            ? 'border-[#1A2530] bg-[#1A2530]' 
                            : 'border-gray-300'
                        }`}
                      >
                        {st.done && !st.current && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        {st.current && <div className="w-1.5 h-1.5 rounded-full bg-[#7A8B7B]" />}
                      </div>

                      <div className="flex items-baseline justify-between">
                        <h4 className={`font-bold ${st.current ? 'text-[#7A8B7B]' : st.done ? 'text-gray-900' : 'text-gray-400'}`}>
                          {st.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-mono">{st.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7A8B7B] shrink-0" />
            <span>{language === 'th' ? 'ต้องการความช่วยเหลือเรื่องการจัดส่ง? ติดต่อ Line: @SiporaOfficial' : 'Need assistance with delivery? Contact Sipora Concierge Line: @SiporaOfficial'}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
