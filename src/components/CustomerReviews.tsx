import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { ProductReview } from '../types';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(CUSTOMER_REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  
  // Form state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleLike = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(prev => prev.filter(item => item !== id));
      setReviewsList(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes - 1 } : r));
    } else {
      setLikedReviews(prev => [...prev, id]);
      setReviewsList(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: name,
      location: location || 'Bangkok, Thailand',
      rating,
      date: 'เมื่อสักครู่',
      title: title || 'ประทับใจคุณภาพสินค้ามาก',
      comment,
      verified: true,
      productColor: 'Matte Charcoal',
      likes: 1
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsWriteModalOpen(false);
    setName('');
    setLocation('');
    setTitle('');
    setComment('');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Rating Breakdown Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#7A8B7B] uppercase block mb-1">
              Real Customer Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2530] font-serif tracking-tight">
              Loved by Sipora Drinkers
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-light">
              Over 2,400+ five-star reviews from verified tumbler enthusiasts across Thailand.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="text-center pr-6 border-r border-gray-100">
              <span className="text-3xl sm:text-4xl font-black text-[#1A2530] font-serif block">
                4.9
              </span>
              <div className="flex items-center text-amber-500 my-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-gray-400">Based on 2,480+ reviews</span>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#1A2530] text-white hover:bg-[#2B3B4C] text-xs font-bold tracking-wider uppercase transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">{rev.date}</span>
                </div>

                <h4 className="font-bold text-sm text-[#1A2530] mb-2 leading-snug">
                  “{rev.title}”
                </h4>

                <p className="text-xs text-gray-600 font-light leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-[#1A2530]">{rev.author}</p>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#7A8B7B]" title="Verified Buyer" />
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">{rev.productColor} • {rev.location}</p>
                </div>

                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    likedReviews.includes(rev.id)
                      ? 'bg-[#EBF1EC] text-[#7A8B7B] border-[#7A8B7B]/30 font-semibold'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div>
                <h3 className="text-lg font-bold text-[#1A2530] font-serif">Share Your Sipora Experience</h3>
                <p className="text-xs text-gray-500">Your feedback helps fellow drinkware seekers.</p>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-amber-400 hover:scale-125 transition-transform cursor-pointer p-1"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-600 ml-2">{rating} out of 5</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanawat P."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Province / City</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangkok"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Keeps ice all day at my desk"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the temperature retention, finish, feel, or everyday routine..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A2530]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1A2530] text-white hover:bg-[#2B3B4C] text-xs font-bold tracking-wide uppercase shadow-md cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
