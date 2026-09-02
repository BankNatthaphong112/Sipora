export type ProductCategory = 
  | 'classic-tumblers'
  | 'handle-tumblers'
  | 'thermal-bottles';

export interface ProductColor {
  name: string;
  nameTh: string;
  hex: string;
  image: string;
  secondaryImage?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productColor?: string;
  likes: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameTh: string;
  tagline: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  compareAtPrice?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes: string[];
  capacity: string;
  hotHours: number;
  coldHours: number;
  description: string;
  descriptionTh: string;
  features: string[];
  specifications: {
    material: string;
    weight: string;
    height: string;
    diameter: string;
    dishwasherSafe: boolean;
    cupHolderFriendly: boolean;
    bpaFree: boolean;
  };
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  engravingText?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingDetails: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    subDistrict: string;
    district: string;
    province: string;
    postalCode: string;
    notes?: string;
  };
  paymentMethod: 'promptpay' | 'credit_card' | 'truemoney' | 'cod';
  status: 'processing' | 'packed' | 'shipping' | 'delivered';
  trackingNumber: string;
  carrier: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  titleTh: string;
  excerpt: string;
  excerptTh: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
  author: string;
}

export type ViewMode = 'home' | 'shop' | 'product-detail' | 'journal' | 'about' | 'track-order' | 'sustainability';
