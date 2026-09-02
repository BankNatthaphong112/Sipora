import React, { useState } from 'react';
import { X, User as UserIcon, Mail, Phone, MapPin, Award, Calendar, Package, Heart, Check, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

export const AccountProfileModal: React.FC = () => {
  const { user, isAccountModalOpen, setIsAccountModalOpen, updateProfile, logout } = useAuth();
  const { t, orders, wishlist, setIsWishlistOpen, setIsTrackingOpen, showToast } = useShop();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.savedAddress?.address || '');
  const [subDistrict, setSubDistrict] = useState(user?.savedAddress?.subDistrict || '');
  const [district, setDistrict] = useState(user?.savedAddress?.district || '');
  const [province, setProvince] = useState(user?.savedAddress?.province || '');
  const [postalCode, setPostalCode] = useState(user?.savedAddress?.postalCode || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!isAccountModalOpen || !user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await updateProfile({
        name,
        phone,
        savedAddress: {
          fullName: name,
          phone,
          address,
          subDistrict,
          district,
          province,
          postalCode
        }
      });
      if (res.success) {
        showToast(t('profileUpdated'));
        setIsEditing(false);
      }
    } catch {
      showToast('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div 
      id="account-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={() => setIsAccountModalOpen(false)}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EEECE6] max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-account-modal-btn"
          onClick={() => setIsAccountModalOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xl uppercase tracking-wider shadow-sm">
            {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2) || 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] truncate">
                {user.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7B8C7D]/15 text-[#5C6E5E] border border-[#7B8C7D]/30">
                {user.memberTier} Member
              </span>
            </div>
            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{t('memberSince')} {formattedDate}</span>
            </p>
          </div>
        </div>

        {/* Quick Stat Highlights */}
        <div className="grid grid-cols-2 gap-3 py-5">
          <div 
            onClick={() => {
              setIsAccountModalOpen(false);
              setIsTrackingOpen(true);
            }}
            className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#EEECE6] hover:border-gray-400 transition-all cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#1A1A1A]">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{t('myOrders')}</p>
              <p className="text-[11px] text-gray-500">{orders.length} orders placed</p>
            </div>
          </div>

          <div 
            onClick={() => {
              setIsAccountModalOpen(false);
              setIsWishlistOpen(true);
            }}
            className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#EEECE6] hover:border-gray-400 transition-all cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#E58E8E]">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{t('wishlist')}</p>
              <p className="text-[11px] text-gray-500">{wishlist.length} saved tumblers</p>
            </div>
          </div>
        </div>

        {/* Edit or View Profile Form */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              {t('savedAddresses')} & Contact
            </h3>
            {!isEditing ? (
              <button
                type="button"
                id="edit-profile-btn"
                onClick={() => setIsEditing(true)}
                className="text-xs font-semibold text-[#7B8C7D] hover:text-black flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t('editProfile')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-gray-500 hover:text-black transition-colors cursor-pointer"
              >
                {t('cancel')}
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                    {t('fullNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-black/10"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="089-xxx-xxxx"
                    className="w-full px-3.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                  {t('deliveryAddress')}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Street / Bldg"
                  className="w-full px-3.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-xl text-xs text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t('subDistrict')}
                  </label>
                  <input
                    type="text"
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t('district')}
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t('province')}
                  </label>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t('postalCode')}
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-2.5 py-2 bg-[#FAF9F6] border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="py-2.5 px-5 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('saveChanges')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-all cursor-pointer"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EEECE6] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{user.phone || 'No phone number saved'}</span>
              </div>
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  {user.savedAddress?.address ? (
                    <p>
                      {user.savedAddress.address}, {user.savedAddress.subDistrict}, {user.savedAddress.district}, {user.savedAddress.province} {user.savedAddress.postalCode}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">No address saved yet. Click "Edit Profile" to add your shipping address.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Member Benefits */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#F5F4F0] to-[#EAE8E2] border border-[#DDD] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#7B8C7D] shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-[#1A1A1A]">Sipora Club Perks Active</p>
            <p className="text-[11px] text-gray-600">Free lifetime laser engraving warranty & 10% member coupon drops.</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            id="account-logout-btn"
            onClick={async () => {
              await logout();
              showToast(t('loggedOutSuccess'));
            }}
            className="text-xs font-bold text-red-600 hover:text-red-800 transition-colors uppercase tracking-wider cursor-pointer"
          >
            {t('logout')}
          </button>
          <button
            type="button"
            onClick={() => setIsAccountModalOpen(false)}
            className="py-2 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
