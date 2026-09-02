import React from 'react';
import { Instagram, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/reviews';

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] text-gray-700 text-xs font-bold uppercase tracking-wider mb-2 border border-gray-200">
            <Instagram className="w-3.5 h-3.5 text-[#A85A48]" />
            <span>Community Feed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A2530] font-serif tracking-tight">
            Sipora in Real Life
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-light">
            Tag <span className="font-semibold text-gray-800">#SiporaEveryday</span> and mention <span className="font-semibold text-gray-800">@SiporaOfficial</span> for a chance to be featured.
          </p>
          
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-[#1A2530] hover:text-[#7A8B7B] tracking-wider uppercase underline underline-offset-4"
          >
            <span>@SIPORA</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 6 Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-2xs cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.tag}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">{post.tag}</span>
                  <span className="flex items-center gap-0.5">
                    <Heart className="w-3 h-3 text-red-400 fill-current" />
                    {post.likes}
                  </span>
                </div>

                <div>
                  <p className="text-[11px] font-bold leading-tight">{post.productName}</p>
                  <p className="text-[10px] text-gray-300">{post.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
