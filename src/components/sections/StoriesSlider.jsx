import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StoriesSlider({ stories = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!stories || stories.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const getVisibleStories = () => {
    const visible = [];
    for (let i = 0; i < Math.min(3, stories.length); i++) {
      visible.push(stories[(currentIndex + i) % stories.length]);
    }
    return visible;
  };

  const visibleStories = getVisibleStories();

  return (
    <div className="bg-slate-50 rounded-2xl p-8 md:p-10 relative">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal font-serif">Stories, tips, and guides</h2>
      </div>
      
      <div className="relative">
        <button 
          onClick={prevSlide}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden px-4 py-4">
          {visibleStories.map((story, idx) => (
            <Link 
              to={`/story/${story.id}`} 
              key={idx} 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={story.heroImage} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                  {story.category}
                </div>
                <h4 className="font-bold text-charcoal text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {story.title}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {story.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
