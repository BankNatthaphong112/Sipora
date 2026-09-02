import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, Order, JournalArticle, ViewMode } from '../types';
import { PRODUCTS } from '../data/products';
import { JOURNAL_ARTICLES } from '../data/journal';
import { TRANSLATIONS, Language, getTranslation } from '../data/translations';

interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  temperaturePriority: 'all' | 'hot' | 'cold';
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: Product[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedArticle: JournalArticle | null;
  setSelectedArticle: (article: JournalArticle | null) => void;
  
  // Cart actions
  addToCart: (product: Product, color: ProductColor, size?: string, quantity?: number, engraving?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartDiscount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Drawer/Modal Toggles
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isSustainabilityOpen: boolean;
  setIsSustainabilityOpen: (open: boolean) => void;
  
  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  
  // Coupon
  couponCode: string;
  appliedDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'carrier' | 'status'>) => Order;
  lookupOrder: (orderId: string) => Order | undefined;
  
  // Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Language & Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['th'], params?: Record<string, string | number>) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const initialFilters: FilterOptions = {
  category: 'all',
  minPrice: 0,
  maxPrice: 2500,
  colors: [],
  sortBy: 'featured',
  temperaturePriority: 'all'
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'SIP-2026-8942',
    date: '2026-08-24 14:32',
    items: [
      {
        id: 'cart-init-1',
        productId: 'sipora-classic-500',
        product: PRODUCTS[0],
        selectedColor: PRODUCTS[0].colors[0],
        selectedSize: '500ml',
        quantity: 1,
        engravingText: 'NATTHAPHONG'
      }
    ],
    subtotal: 890,
    discount: 0,
    shippingFee: 50,
    total: 940,
    shippingDetails: {
      fullName: 'Natthaphong B.',
      phone: '089-123-4567',
      email: 'banknatthaphong076@gmail.com',
      address: '99/123 Sukhumvit Road',
      subDistrict: 'Khlong Toei',
      district: 'Khlong Toei',
      province: 'Bangkok',
      postalCode: '10110',
      notes: 'Please leave at front desk'
    },
    paymentMethod: 'promptpay',
    status: 'shipping',
    trackingNumber: 'FLX948291034TH',
    carrier: 'Flash Express'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  
  // Storage states
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sipora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sipora_wishlist');
      return saved ? JSON.parse(saved) : ['sipora-classic-500', 'sipora-premium-900'];
    } catch {
      return ['sipora-classic-500'];
    }
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sipora_recent');
      return saved ? JSON.parse(saved) : ['sipora-classic-500', 'sipora-everyday-750', 'sipora-premium-900'];
    } catch {
      return ['sipora-classic-500', 'sipora-everyday-750'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('sipora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSustainabilityOpen, setIsSustainabilityOpen] = useState(false);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  
  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);

  // Language & Toasts
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sipora_language');
      return (saved === 'en' || saved === 'th') ? saved : 'th';
    } catch {
      return 'th';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sipora_language', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: keyof typeof TRANSLATIONS['th'], params?: Record<string, string | number>) => {
    return getTranslation(language, key, params);
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sipora_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sipora_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('sipora_recent', JSON.stringify(recentlyViewedIds));
    } catch {
      // ignore
    }
  }, [recentlyViewedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sipora_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Track recently viewed
  useEffect(() => {
    if (selectedProduct) {
      setRecentlyViewedIds(prev => {
        const filtered = prev.filter(id => id !== selectedProduct.id);
        return [selectedProduct.id, ...filtered].slice(0, 6);
      });
    }
  }, [selectedProduct]);

  const recentlyViewed = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  const addToCart = (
    product: Product,
    color: ProductColor,
    size?: string,
    quantity = 1,
    engraving?: string
  ) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const itemId = `${product.id}-${color.name}-${chosenSize}${engraving ? `-${engraving}` : ''}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: chosenSize,
          quantity,
          engravingText: engraving
        }
      ];
    });

    showToast(`เพิ่ม "${product.name}" ลงในถุงช้อปปิ้งแล้ว`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('ลบสินค้าออกจากถุงแล้ว');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('ลบออกจากรายการโปรดแล้ว');
        return prev.filter(id => id !== productId);
      } else {
        showToast('บันทึกในรายการโปรดแล้ว ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Totals & Discounts
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = Math.round(cartSubtotal * (appliedDiscountPercent / 100));
  const cartTotal = cartSubtotal - cartDiscount;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SIPORA10' || clean === 'WELCOME10') {
      setCouponCode(clean);
      setAppliedDiscountPercent(10);
      return { success: true, message: 'ใช้โค้ดลด 10% สำเร็จ!' };
    }
    if (clean === 'VIP20') {
      setCouponCode(clean);
      setAppliedDiscountPercent(20);
      return { success: true, message: 'ใช้โค้ดลด VIP 20% สำเร็จ!' };
    }
    if (clean === 'FREESHIP') {
      setCouponCode(clean);
      setAppliedDiscountPercent(5);
      return { success: true, message: 'ใช้โค้ดส่วนลดค่าจัดส่งสำเร็จ!' };
    }
    return { success: false, message: 'โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุ' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscountPercent(0);
    showToast('ยกเลิกโค้ดส่วนลดแล้ว');
  };

  const createOrder = (
    orderData: Omit<Order, 'id' | 'date' | 'trackingNumber' | 'carrier' | 'status'>
  ): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const trackingNum = `SIP${Math.floor(100000000 + Math.random() * 900000000)}TH`;
    const newOrder: Order = {
      ...orderData,
      id: `SIP-2026-${randomNum}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'processing',
      trackingNumber: trackingNum,
      carrier: 'Flash Express VIP'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const lookupOrder = (orderId: string) => {
    const cleaned = orderId.trim().toUpperCase();
    return orders.find(o => o.id.toUpperCase() === cleaned || o.trackingNumber.toUpperCase() === cleaned);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        recentlyViewed,
        viewMode,
        setViewMode,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        selectedArticle,
        setSelectedArticle,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        cartDiscount,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isAboutOpen,
        setIsAboutOpen,
        isSustainabilityOpen,
        setIsSustainabilityOpen,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        couponCode,
        appliedDiscountPercent,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        lookupOrder,
        toastMessage,
        showToast,
        language,
        setLanguage,
        t
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
