import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

interface ForgotPasswordModalProps {
  onSwitchToLogin: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onSwitchToLogin
}) => {
  const { forgotPassword } = useAuth();
  const { t } = useShop();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 id="forgot-password-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A] uppercase">
          {t('forgotPasswordTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
          {t('forgotPasswordSubtitle')}
        </p>
      </div>

      {isSubmitted ? (
        <div className="py-4 text-center space-y-4 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          
          <div className="space-y-1.5 px-2">
            <h3 className="text-base font-bold text-gray-900">Check Your Inbox</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
              {t('resetLinkSent')}
            </p>
            <p className="text-[11px] font-mono text-gray-400 pt-1">
              Sent to: <span className="font-bold text-gray-700">{email}</span>
            </p>
          </div>

          <div className="pt-3">
            <button
              type="button"
              id="back-to-login-after-reset-btn"
              onClick={onSwitchToLogin}
              className="w-full py-3 px-6 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              {t('backToSignIn')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div 
              id="forgot-password-error-banner"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-shake"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label 
              htmlFor="forgot-password-email" 
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5"
            >
              {t('emailLabel')} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="forgot-password-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="name@example.com"
                autoComplete="email"
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border border-gray-200 rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-black/10 focus:border-[#1A1A1A] focus:bg-white transition-all"
                aria-invalid={!!error}
              />
            </div>
          </div>

          <button
            id="forgot-password-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{t('sendResetLinkBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-3 text-center">
            <button
              type="button"
              id="back-to-login-btn"
              onClick={onSwitchToLogin}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('backToSignIn')}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
