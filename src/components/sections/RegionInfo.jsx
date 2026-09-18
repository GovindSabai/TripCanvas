import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RegionInfo({ region }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = region.stories || [];

  const nextSlide = () => {
    if (stories.length === 0) return;
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (stories.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const getVisibleStories = () => {
    const visible = [];
    if (stories.length === 0) return visible;
    for (let i = 0; i < Math.min(3, stories.length); i++) {
      visible.push(stories[(currentIndex + i) % stories.length]);
    }
    return visible;
  };

  const visibleStories = getVisibleStories();

  return (
    <section className="py-16 bg-white max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <div className="max-w-4xl mb-16">
        {/* About Section */}
        <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4 font-serif">
          About {region.name} Tour Packages
        </h3>
        <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base mb-10">
          {region.aboutText.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Best Time to Visit */}
        <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4 font-serif">
          Best Time to Visit {region.name}
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm md:text-base mb-10 marker:text-blue-600">
          {region.bestTime.map((item, idx) => (
            <li key={idx} className="pl-2">{item}</li>
          ))}
        </ul>

        {/* What's Included */}
        <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4 font-serif">
          What's Included in Our Packages
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm md:text-base mb-10 marker:text-blue-600">
          {region.included.map((item, idx) => (
            <li key={idx} className="pl-2">{item}</li>
          ))}
        </ul>
      </div>

      {/* Stories, tips, and guides */}
      <div className="bg-slate-50 rounded-2xl p-8 md:p-10 relative">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-charcoal font-serif">Stories, tips, and guides</h2>
        </div>
        
        <div className="relative">
          {/* Navigation Arrows on the sides */}
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
    </section>
  );
}
