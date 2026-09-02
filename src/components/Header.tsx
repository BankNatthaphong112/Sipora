import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  Globe,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { UserMenu } from './UserMenu';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsSearchOpen,
    setIsTrackingOpen,
    setIsAboutOpen,
    setViewMode,
    setFilters,
    language,
    setLanguage,
    t,
    showToast
  } = useShop();

  const {
    user,
    isAuthenticated,
    openLoginModal,
    openRegisterModal,
    setIsAccountModalOpen,
    logout
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (category?: string) => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
    setViewMode('shop');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setViewMode('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Navigation Bar */}
      <nav 
        id="main-nav"
        className={`w-full bg-[#FDFCF9]/95 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled ? 'border-[#EEECE6] shadow-xs py-3' : 'border-[#EEECE6] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          
          {/* Mobile Hamburger & Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              id="mobile-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1A1A1A] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left Nav (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-[12px] font-semibold tracking-wider uppercase text-[#1A1A1A]">
            <button
              id="nav-shop-all"
              onClick={() => handleNavClick('all')}
              className="hover:text-[#7B8C7D] transition-colors cursor-pointer relative py-1 group"
            >
              {t('navShop')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1A1A1A] transition-all duration-200 group-hover:w-full" />
            </button>

            <div className="relative group py-1">
              <button
                id="nav-collections"
                onClick={() => handleNavClick('classic-tumblers')}
                className="hover:text-[#7B8C7D] transition-colors cursor-pointer flex items-center gap-1 group"
              >
                {t('navCollections')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1A1A1A] transition-all duration-200 group-hover:w-full" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-72 bg-[#FDFCF9] rounded-xl shadow-xl border border-[#EEECE6] py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="px-4 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {t('exploreDrinkware')}
                </div>
                <button 
                  onClick={() => handleNavClick('classic-tumblers')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                >
                  <span>{t('classicTumblers')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button 
                  onClick={() => handleNavClick('handle-tumblers')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                >
                  <span>{t('handleTumblers')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
                <button 
                  onClick={() => handleNavClick('thermal-bottles')}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1A1A1A] hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                >
                  <span>{t('thermalBottles')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>

            <button
              id="nav-about-sipora"
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-[#7B8C7D] transition-colors cursor-pointer relative py-1 group"
            >
              {t('navAbout')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1A1A1A] transition-all duration-200 group-hover:w-full" />
            </button>

            <button
              id="nav-journal"
              onClick={() => {
                setViewMode('journal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#7B8C7D] transition-colors cursor-pointer relative py-1 group"
            >
              {t('navJournal')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1A1A1A] transition-all duration-200 group-hover:w-full" />
            </button>
          </div>

          {/* Center Brand Logo */}
          <div className="flex items-center justify-center">
            <button 
              id="brand-logo-btn"
              onClick={handleHomeClick}
              className="group text-center cursor-pointer flex flex-col items-center"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#1A1A1A] uppercase leading-none">
                SIPORA
              </span>
            </button>
          </div>

          {/* Right Desktop Search & Action Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Language Toggle Button */}
            <button 
              id="lang-toggle-btn"
              onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
              className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-gray-700 hover:text-black transition-colors uppercase px-2.5 py-1.5 rounded-full border border-gray-200 hover:border-gray-400 bg-white cursor-pointer shadow-2xs"
              title={t('switchLanguage')}
            >
              <Globe className="w-3.5 h-3.5 text-[#7A8B7B]" />
              <span>{language === 'th' ? 'TH | ไทย' : 'EN | Eng'}</span>
            </button>

            {/* Geometric Pill Search Bar */}
            <div 
              id="desktop-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center border border-[#E5E5E5] rounded-full px-4 py-1.5 bg-white cursor-pointer hover:border-gray-400 transition-colors w-36 lg:w-48"
            >
              <Search className="w-3.5 h-3.5 text-gray-400 opacity-60" />
              <span className="ml-2 text-[12px] text-gray-400 truncate">{t('searchTumblers')}</span>
            </div>

            {/* Account Icon */}
            <div className="relative">
              <button
                id="account-btn"
                onClick={() => {
                  if (isAuthenticated) {
                    setUserMenuOpen(!userMenuOpen);
                  } else {
                    openLoginModal();
                  }
                }}
                className={`p-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  isAuthenticated 
                    ? 'bg-[#1A1A1A] text-white px-2.5 py-1 text-xs shadow-2xs hover:bg-black' 
                    : 'text-[#1A1A1A] hover:text-[#7B8C7D] hover:bg-gray-100'
                }`}
                title={isAuthenticated ? user?.name : t('signInBtn')}
                aria-label={isAuthenticated ? user?.name : t('signInBtn')}
              >
                {isAuthenticated ? (
                  <>
                    <div className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                      {user?.name?.[0] || 'U'}
                    </div>
                    <span className="hidden xl:inline text-[11px] font-bold tracking-wider max-w-[90px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </>
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </button>

              {/* User Dropdown Menu for Logged-in Users */}
              {isAuthenticated && (
                <UserMenu 
                  isOpen={userMenuOpen} 
                  onClose={() => setUserMenuOpen(false)} 
                />
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              id="wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="p-1 text-[#1A1A1A] hover:text-[#7B8C7D] transition-colors relative cursor-pointer"
              title={t('wishlist')}
              aria-label={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#E58E8E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-[#1A1A1A] hover:text-[#7B8C7D] transition-colors cursor-pointer"
              title={t('cart')}
              aria-label={t('cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#7B8C7D] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-gray-200 shadow-2xl p-6 z-50 animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('navShop')}</div>
              <button
                onClick={() => {
                  setViewMode('home');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 text-base font-semibold text-gray-900 border-b border-gray-100 cursor-pointer"
              >
                {language === 'th' ? 'หน้าหลัก (Home)' : 'Home'}
              </button>
              <button
                onClick={() => handleNavClick('all')}
                className="block w-full text-left py-2.5 text-base font-semibold text-gray-900 border-b border-gray-100 cursor-pointer"
              >
                {t('navShop')}
              </button>
              <button
                onClick={() => handleNavClick('classic-tumblers')}
                className="block w-full text-left py-2.5 text-sm text-gray-700 border-b border-gray-100 pl-3 cursor-pointer"
              >
                • {t('classicTumblers')}
              </button>
              <button
                onClick={() => handleNavClick('handle-tumblers')}
                className="block w-full text-left py-2.5 text-sm text-gray-700 border-b border-gray-100 pl-3 cursor-pointer"
              >
                • {t('handleTumblers')}
              </button>
              <button
                onClick={() => handleNavClick('thermal-bottles')}
                className="block w-full text-left py-2.5 text-sm text-gray-700 border-b border-gray-100 pl-3 cursor-pointer"
              >
                • {t('thermalBottles')}
              </button>
              <button
                onClick={() => {
                  setViewMode('journal');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 text-base font-semibold text-gray-900 border-b border-gray-100 cursor-pointer"
              >
                {t('navJournal')}
              </button>
              <button
                onClick={() => {
                  setIsAboutOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 text-base font-semibold text-gray-900 border-b border-gray-100 cursor-pointer"
              >
                {t('navAbout')}
              </button>
              <button
                onClick={() => {
                  setIsTrackingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 text-base font-semibold text-gray-900 border-b border-gray-100 cursor-pointer flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#7A8B7B]" />
                  <span>{t('navTrackOrder')}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              {/* Mobile Account Actions */}
              <div className="pt-2 pb-1 border-b border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {t('account')}
                </div>
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-[#FAF9F6] rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#1A1A1A]">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#7B8C7D]/20 text-[#5C6E5E]">
                        {user.memberTier}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsAccountModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 text-sm font-semibold text-gray-800 flex items-center justify-between"
                    >
                      <span>{t('myAccount')}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await logout();
                        showToast(t('loggedOutSuccess'));
                      }}
                      className="w-full text-left py-2 text-sm font-semibold text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openLoginModal();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>{t('signInBtn')} / {t('createAccountBtn')}</span>
                  </button>
                )}
              </div>
              
              <div className="pt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">{t('switchLanguage')}</span>
                <button 
                  onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
                  className="font-bold text-[#1A1A1A] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span>{language === 'th' ? 'ภาษาไทย (TH)' : 'English (EN)'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
