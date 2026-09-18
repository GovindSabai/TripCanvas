import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function TravelInspiration() {
  return (
    <div className="py-20 bg-sand/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
              Still deciding?
            </span>
            <h2 className="text-4xl font-serif font-bold text-charcoal">
              Find Your Inspiration
            </h2>
          </div>
          <Link to="/journal" className="flex items-center gap-2 font-bold text-charcoal hover:text-bronze transition-colors">
            Read the Journal <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InspirationCard 
            title="The 10 Best Honeymoon Destinations for 2026"
            image="/World/Bali.jpg"
            tag="Romantic"
          />
          <InspirationCard 
            title="Hidden Food Gems in Southeast Asia"
            image="/World/Japan.jpg"
            tag="Food & Cuisine"
          />
          <InspirationCard 
            title="How to Pack for a Two-Week Safari"
            image="/World/Egypt.jpg"
            tag="Tips & Guides"
          />
        </div>
      </div>
    </div>
  );
}

function InspirationCard({ title, image, tag }) {
  return (
    <Link to="/journal" className="group block h-[400px] relative rounded-2xl overflow-hidden cursor-pointer">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <span className="inline-block px-3 py-1 bg-bronze text-ivory text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          {tag}
        </span>
        <h3 className="text-2xl font-serif font-bold text-ivory leading-tight group-hover:text-bronzeLight transition-colors">
          {title}
        </h3>
      </div>
    </Link>
  );
}
