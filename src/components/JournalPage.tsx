import React, { useState } from 'react';
import { Clock, BookOpen, ChevronLeft, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types';
import { useShop } from '../context/ShopContext';

export const JournalPage: React.FC = () => {
  const { setViewMode } = useShop();
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Coffee & Tea', 'Hydration Science', 'Everyday Carry'];

  const filteredArticles = selectedCategory === 'all'
    ? JOURNAL_ARTICLES
    : JOURNAL_ARTICLES.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-[#FAF9F6] py-10 sm:py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button
          onClick={() => { setViewMode('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-6 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Journal Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-[0.25em] text-[#7A8B7B] uppercase block mb-2">
            The Sipora Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2530] font-serif tracking-tight">
            Stories, Science & Rituals
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-light leading-relaxed">
            Exploring the intersection of coffee culture, thermal thermodynamics, and intentional daily routines.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A2530] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat === 'all' ? 'All Stories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xs hover:shadow-xl transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase">
                  {article.category}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-[#1A2530] group-hover:text-[#7A8B7B] transition-colors leading-snug font-serif mb-2">
                    {article.title}
                  </h2>

                  <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1A2530]">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Full Story</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="relative h-64 w-full shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-white hover:scale-105 transition-all cursor-pointer"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 bg-[#7A8B7B] text-white text-[10px] font-bold rounded-md uppercase tracking-wider mb-2 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed font-light">
              <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100">
                <span>Written by {selectedArticle.author}</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-100 text-xs text-gray-800 font-medium">
                🇹🇭 {selectedArticle.titleTh}
              </div>

              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">Share this story with friends</p>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Copied link to clipboard!');
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
