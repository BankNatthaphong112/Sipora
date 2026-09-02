import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthModalMode } from '../types';
import { authService, AuthResponse } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: AuthModalMode;
  setAuthModalMode: (mode: AuthModalMode) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  
  // Navigation helper modals
  openLoginModal: () => void;
  openRegisterModal: () => void;
  openForgotPasswordModal: () => void;
  closeAuthModal: () => void;

  // Actions
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResponse>;
  register: (fullName: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  updateProfile: (updates: Partial<User>) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState<boolean>(false);

  // Initialize session on mount
  useEffect(() => {
    try {
      const activeUser = authService.getCurrentUser();
      if (activeUser) {
        setUser(activeUser);
      }
    } catch (err) {
      console.error('Failed to restore auth session', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  const openForgotPasswordModal = () => {
    setAuthModalMode('forgot-password');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string, rememberMe = true): Promise<AuthResponse> => {
    const res = await authService.login(email, password, rememberMe);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const register = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
    const res = await authService.register(fullName, email, password);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAccountModalOpen(false);
  };

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    return authService.forgotPassword(email);
  };

  const updateProfile = async (updates: Partial<User>): Promise<AuthResponse> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }
    const res = await authService.updateProfile(user.id, updates);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isAccountModalOpen,
        setIsAccountModalOpen,
        openLoginModal,
        openRegisterModal,
        openForgotPasswordModal,
        closeAuthModal,
        login,
        register,
        logout,
        forgotPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
