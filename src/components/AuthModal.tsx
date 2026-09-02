import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode 
  } = useAuth();

  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };

    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  return (
    <div 
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeAuthModal();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={
        authModalMode === 'login'
          ? 'login-modal-title'
          : authModalMode === 'register'
          ? 'register-modal-title'
          : 'forgot-password-modal-title'
      }
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-[460px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EEECE6] animate-scale-up"
      >
        {/* Close Button */}
        <button
          id="close-auth-modal-btn"
          onClick={closeAuthModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Router */}
        {authModalMode === 'login' && (
          <LoginModal
            onSwitchToRegister={() => setAuthModalMode('register')}
            onSwitchToForgotPassword={() => setAuthModalMode('forgot-password')}
            onSuccess={closeAuthModal}
          />
        )}

        {authModalMode === 'register' && (
          <RegisterModal
            onSwitchToLogin={() => setAuthModalMode('login')}
            onSuccess={closeAuthModal}
          />
        )}

        {authModalMode === 'forgot-password' && (
          <ForgotPasswordModal
            onSwitchToLogin={() => setAuthModalMode('login')}
          />
        )}
      </div>
    </div>
  );
};
