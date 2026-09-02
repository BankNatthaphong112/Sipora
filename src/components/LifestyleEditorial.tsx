import React, { useState } from 'react';
import { ArrowRight, Clock, BookOpen, X, Share2, Sparkles } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types';
import { useShop } from '../context/ShopContext';

export const LifestyleEditorial: React.FC = () => {
  const { setViewMode } = useShop();
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const handleExploreJournal = () => {
    setViewMode('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#7A8B7B] uppercase block mb-1">
              Editorial & Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2530] font-serif tracking-tight">
              Sip Better. Live Better.
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-light">
              Rituals, temperature sciences, and modern hydration inspiration.
            </p>
          </div>

          <button
            id="explore-journal-btn"
            onClick={handleExploreJournal}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#1A2530] uppercase hover:text-[#7A8B7B] transition-colors cursor-pointer group"
          >
            <span>EXPLORE JOURNAL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group flex flex-col bg-[#FAF9F6] rounded-3xl overflow-hidden border border-gray-200/70 hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#1A2530]/80 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider rounded-full uppercase">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A2530] group-hover:text-[#7A8B7B] transition-colors leading-snug font-serif mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-[#1A2530] group-hover:text-[#A85A48] transition-colors">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Article</span>
                  </span>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="relative h-64 w-full shrink-0">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-white hover:scale-105 transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 bg-[#7A8B7B] text-white text-[10px] font-bold rounded-md uppercase tracking-wider mb-2 inline-block">
                  {activeArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                  {activeArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Scroll */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-gray-700 leading-relaxed font-light">
              <div className="flex items-center justify-between text-xs text-gray-400 pb-3 border-b border-gray-100">
                <span>By {activeArticle.author}</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-100 text-xs text-gray-800 font-medium">
                🇹🇭 {activeArticle.titleTh}
              </div>

              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-sm leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}

              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">Share this story with fellow coffee & tea lovers</p>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Copied article link to clipboard!');
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Story</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
