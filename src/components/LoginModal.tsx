import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

interface LoginModalProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  onSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onSwitchToRegister,
  onSwitchToForgotPassword,
  onSuccess
}) => {
  const { login } = useAuth();
  const { t, showToast } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = (): boolean => {
    const nextErrors: { email?: string; password?: string; general?: string } = {};

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password, rememberMe);
      if (res.success && res.user) {
        const firstName = res.user.name.split(' ')[0] || res.user.name;
        showToast(`Welcome back, ${firstName}.`);
        onSuccess();
      } else {
        setErrors({ general: res.error || t('invalidCredentials') });
      }
    } catch {
      setErrors({ general: t('invalidCredentials') });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo Account Auto-Fill
  const handleFillDemo = () => {
    setEmail('banknatthaphong076@gmail.com');
    setPassword('password123');
    setErrors({});
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h2 id="login-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A] uppercase">
          {t('loginTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
          {t('loginSubtitle')}
        </p>
      </div>

      {/* General Error Banner */}
      {errors.general && (
        <div 
          id="login-error-banner"
          className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-shake"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Field */}
        <div>
          <label 
            htmlFor="login-email" 
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            {t('emailLabel')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="name@example.com"
              autoComplete="email"
              autoFocus
              className={`w-full pl-10 pr-4 py-3 bg-[#FAF9F6] border rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-black/10'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="login-email-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label 
              htmlFor="login-password" 
              className="block text-xs font-bold uppercase tracking-wider text-gray-700"
            >
              {t('passwordLabel')} <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              id="forgot-password-link"
              onClick={onSwitchToForgotPassword}
              className="text-[11px] font-semibold text-gray-500 hover:text-black transition-colors underline underline-offset-2 cursor-pointer"
            >
              {t('forgotPasswordLink')}
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              className={`w-full pl-10 pr-11 py-3 bg-[#FAF9F6] border rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                errors.password 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-black/10'
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            <button
              type="button"
              id="toggle-password-visibility-btn"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="login-password-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="remember-me-checkbox"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black cursor-pointer accent-[#1A1A1A]"
            />
            <span className="text-xs text-gray-600">{t('rememberMe')}</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          id="login-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>{t('signInBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Quick Demo Helper Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full py-2 px-3 rounded-lg bg-[#F5F4F0] hover:bg-[#EAE8E2] text-[#555] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7B8C7D]" />
            <span>Fill Demo User (banknatthaphong076@gmail.com)</span>
          </button>
        </div>
      </form>

      {/* Switch to Register */}
      <div className="mt-6 pt-5 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-600">
          {t('dontHaveAccount')}{' '}
          <button
            type="button"
            id="switch-to-register-btn"
            onClick={onSwitchToRegister}
            className="font-bold text-[#1A1A1A] hover:text-[#7B8C7D] transition-colors underline underline-offset-2 ml-1 cursor-pointer"
          >
            {t('createAccountLink')}
          </button>
        </p>
      </div>
    </div>
  );
};
