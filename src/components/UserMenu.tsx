import React, { useRef, useEffect } from 'react';
import { User, Package, Heart, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout, setIsAccountModalOpen } = useAuth();
  const { 
    t, 
    setIsWishlistOpen, 
    setIsTrackingOpen, 
    showToast 
  } = useShop();

  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const firstName = user.name.split(' ')[0] || user.name;

  const handleOpenAccount = () => {
    onClose();
    setIsAccountModalOpen(true);
  };

  const handleOpenOrders = () => {
    onClose();
    setIsTrackingOpen(true);
  };

  const handleOpenWishlist = () => {
    onClose();
    setIsWishlistOpen(true);
  };

  const handleLogout = async () => {
    onClose();
    await logout();
    showToast(t('loggedOutSuccess'));
  };

  return (
    <div 
      ref={menuRef}
      id="user-account-dropdown"
      className="absolute right-0 top-full mt-2.5 w-64 bg-[#FDFCF9] rounded-2xl shadow-xl border border-[#EEECE6] py-2 z-50 animate-fade-in divide-y divide-gray-100"
      role="menu"
      aria-orientation="vertical"
    >
      {/* User Header Info */}
      <div className="px-4 py-3 bg-[#FAF9F6] rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-2xs">
            {firstName[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#1A1A1A] truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-[#5C6E5E] font-semibold bg-[#7B8C7D]/10 px-2 py-0.5 rounded-md">
          <span>SIPORA CLUB</span>
          <span className="uppercase">{user.memberTier} TIER</span>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="py-1">
        <button
          id="menu-my-account-btn"
          onClick={handleOpenAccount}
          className="w-full text-left px-4 py-2.5 text-xs text-gray-800 hover:bg-gray-100 flex items-center justify-between transition-colors cursor-pointer"
          role="menuitem"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{t('myAccount')}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>

        <button
          id="menu-my-orders-btn"
          onClick={handleOpenOrders}
          className="w-full text-left px-4 py-2.5 text-xs text-gray-800 hover:bg-gray-100 flex items-center justify-between transition-colors cursor-pointer"
          role="menuitem"
        >
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{t('myOrders')}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>

        <button
          id="menu-wishlist-btn"
          onClick={handleOpenWishlist}
          className="w-full text-left px-4 py-2.5 text-xs text-gray-800 hover:bg-gray-100 flex items-center justify-between transition-colors cursor-pointer"
          role="menuitem"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{t('wishlist')}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>

      {/* Logout Action */}
      <div className="py-1">
        <button
          id="menu-logout-btn"
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
          role="menuitem"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};
