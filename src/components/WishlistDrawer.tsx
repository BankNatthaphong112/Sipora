import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    products, 
    addToCart,
    setSelectedProduct,
    setViewMode 
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setViewMode('product-detail');
    setIsWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] text-[#1A2530] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#A85A48] fill-current" />
              <h2 className="text-lg font-bold font-serif">
                Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex gap-3.5 items-center relative"
                >
                  <div 
                    onClick={() => handleProductClick(product)}
                    className="w-18 h-18 rounded-xl bg-[#F5F4F0] p-1.5 shrink-0 flex items-center justify-center cursor-pointer overflow-hidden"
                  >
                    <img
                      src={product.colors[0].image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 
                        onClick={() => handleProductClick(product)}
                        className="text-xs font-bold text-[#1A2530] truncate hover:text-[#7A8B7B] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">{product.capacity}</p>

                    <div className="flex items-center justify-between mt-2.5">
                      <span className="text-xs font-bold font-serif text-[#1A2530]">
                        ฿{product.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, product.colors[0], product.sizes[0], 1);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#1A2530] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#2B3B4C] cursor-pointer shadow-2xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                  Save your favorite tumbler models to easily find and purchase them later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 bg-[#1A2530] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#2B3B4C] cursor-pointer"
                >
                  Explore Tumblers
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-200">
              <button
                onClick={() => {
                  wishlistProducts.forEach(p => addToCart(p, p.colors[0], p.sizes[0], 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-[#7A8B7B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#687869] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Add All to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
