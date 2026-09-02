import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { BestSellers } from './components/BestSellers';
import { PromotionalBanner } from './components/PromotionalBanner';
import { WhySipora } from './components/WhySipora';
import { NewArrivals } from './components/NewArrivals';
import { ProductFeatureExplorer } from './components/ProductFeatureExplorer';
import { LifestyleEditorial } from './components/LifestyleEditorial';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGrid } from './components/InstagramGrid';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetailPage } from './components/ProductDetailPage';
import { JournalPage } from './components/JournalPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AboutModal } from './components/AboutModal';
import { SustainabilityModal } from './components/SustainabilityModal';
import { AuthModal } from './components/AuthModal';
import { AccountProfileModal } from './components/AccountProfileModal';
import { X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    viewMode, 
    selectedProduct, 
    quickViewProduct, 
    setQuickViewProduct,
    toastMessage, 
    hideToast 
  } = useShop();

  // Scroll to top when viewMode switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A2530] flex flex-col font-sans selection:bg-[#7A8B7B] selection:text-white antialiased">
      
      {/* Sticky Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {viewMode === 'home' && (
          <>
            <HeroSection />
            <FeaturedCategories />
            <BestSellers />
            <PromotionalBanner />
            <WhySipora />
            <NewArrivals />
            <ProductFeatureExplorer />
            <LifestyleEditorial />
            <CustomerReviews />
            <InstagramGrid />
            <Newsletter />
          </>
        )}

        {viewMode === 'shop' && (
          <ShopCatalog />
        )}

        {viewMode === 'product-detail' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} />
        )}

        {viewMode === 'journal' && (
          <JournalPage />
        )}
      </main>

      {/* Persistent Multi-column Luxury Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SearchModal />
      <OrderTrackingModal />
      <AboutModal />
      <SustainabilityModal />
      <AuthModal />
      <AccountProfileModal />

      {/* Quick View Dialog */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:scale-105 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <ProductDetailPage 
              product={quickViewProduct} 
              isModal={true} 
              onClose={() => setQuickViewProduct(null)} 
            />
          </div>
        </div>
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2530] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/15 text-xs font-semibold flex items-center gap-3 animate-slide-up max-w-md">
          <span className="flex-1">{toastMessage}</span>
          <button 
            onClick={hideToast}
            className="text-gray-400 hover:text-white p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </AuthProvider>
  );
}
