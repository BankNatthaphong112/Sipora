import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter: React.FC = () => {
  const { applyCoupon, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    applyCoupon('SIPORA10');
    showToast('ยินดีต้อนรับสู่ Sipora Club! โค้ด SIPORA10 ลด 10% ถูกใช้กับคำสั่งซื้อแล้ว');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SIPORA10');
    showToast('คัดลอกโค้ด SIPORA10 แล้ว');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#1A1A1A] text-white border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-px w-6 bg-[#7B8C7D]"></span>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7B8C7D]">
            Sipora Club
          </span>
          <span className="h-px w-6 bg-[#7B8C7D]"></span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Stay in the Sip
        </h2>

        <p className="text-sm sm:text-base text-gray-300 font-normal max-w-lg mx-auto mb-8 leading-relaxed">
          Get first access to new collections, special seasonal editions and stories. Enjoy 10% off your first order.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button
              id="newsletter-subscribe-btn"
              type="submit"
              className="px-8 py-3.5 bg-white text-[#1A1A1A] hover:bg-gray-200 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-6 bg-white/10 border border-white/20 animate-fade-in text-center">
            <div className="w-10 h-10 bg-[#7B8C7D] text-white flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Welcome to Sipora Club</h3>
            <p className="text-xs text-gray-300 mb-4">Your 10% welcome discount is ready to use.</p>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/40 border border-white/20">
              <span className="font-mono font-bold tracking-widest text-[#E8E4DC]">SIPORA10</span>
              <button
                onClick={handleCopyCode}
                className="p-1 hover:text-[#7B8C7D] transition-colors cursor-pointer"
                title="Copy code"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-gray-400 mt-4 font-light">
          By subscribing, you agree to our Privacy Policy. No spam, ever. Unsubscribe anytime.
        </p>

      </div>
    </section>
  );
};

