import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

interface RegisterModalProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  onSwitchToLogin,
  onSuccess
}) => {
  const { register } = useAuth();
  const { t, showToast } = useShop();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeTerms?: string;
    general?: string;
  }>({});

  const validate = (): boolean => {
    const nextErrors: typeof errors = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Name must be at least 2 characters';
    }

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

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      nextErrors.agreeTerms = 'You must agree to the Terms & Privacy Policy to register';
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
      const res = await register(fullName, email, password);
      if (res.success && res.user) {
        showToast(t('accountCreatedSuccess'));
        onSuccess();
      } else {
        setErrors({ general: res.error || t('duplicateEmailError') });
      }
    } catch {
      setErrors({ general: 'Failed to create account. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Title & Subtitle */}
      <div className="text-center mb-5">
        <h2 id="register-modal-title" className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A1A1A] uppercase">
          {t('registerTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
          {t('registerSubtitle')}
        </p>
      </div>

      {/* General Error Banner */}
      {errors.general && (
        <div 
          id="register-error-banner"
          className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-shake"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errors.general}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* Full Name */}
        <div>
          <label 
            htmlFor="register-fullname" 
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
          >
            {t('fullNameLabel')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <UserIcon className="w-4 h-4" />
            </div>
            <input
              id="register-fullname"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
              }}
              placeholder="e.g. John Doe"
              autoComplete="name"
              autoFocus
              className={`w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                errors.fullName 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-black/10'
              }`}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'register-fullname-error' : undefined}
            />
          </div>
          {errors.fullName && (
            <p id="register-fullname-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label 
            htmlFor="register-email" 
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
          >
            {t('emailLabel')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="name@example.com"
              autoComplete="email"
              className={`w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-black/10'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'register-email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="register-email-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label 
            htmlFor="register-password" 
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
          >
            {t('passwordLabel')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
              className={`w-full pl-10 pr-11 py-2.5 bg-[#FAF9F6] border rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                errors.password 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-black/10'
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'register-password-error' : undefined}
            />
            <button
              type="button"
              id="toggle-reg-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="register-password-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label 
            htmlFor="register-confirm-password" 
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
          >
            {t('confirmPasswordLabel')} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="register-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              placeholder="Re-enter password"
              autoComplete="new-password"
              className={`w-full pl-10 pr-11 py-2.5 bg-[#FAF9F6] border rounded-xl text-xs sm:text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                errors.confirmPassword 
                  ? 'border-red-400 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-black/10'
              }`}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'register-confirmpassword-error' : undefined}
            />
            <button
              type="button"
              id="toggle-reg-confirm-password-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="register-confirmpassword-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              id="agree-terms-checkbox"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
              }}
              className="mt-0.5 w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black cursor-pointer accent-[#1A1A1A]"
            />
            <span className="text-[11px] sm:text-xs text-gray-600 leading-tight">
              {t('termsAgreement')} <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.agreeTerms && (
            <p id="agree-terms-error" className="mt-1 text-[11px] text-red-600 font-medium">
              {errors.agreeTerms}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          id="register-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-3 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>{t('createAccountBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <button
            type="button"
            id="switch-to-login-btn"
            onClick={onSwitchToLogin}
            className="font-bold text-[#1A1A1A] hover:text-[#7B8C7D] transition-colors underline underline-offset-2 ml-1 cursor-pointer"
          >
            {t('signInLink')}
          </button>
        </p>
      </div>
    </div>
  );
};
