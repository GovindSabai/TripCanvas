import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SliderCard } from './SliderCard';

export function CategorySlider({ title, subtitle, items, titleColor = "text-charcoal" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timeoutRef = useRef(null);

  // We show 3 items at a time on desktop, 1 on mobile
  // But we have 6 items total.
  const maxIndex = Math.max(0, items.length - 1); // If we scroll one by one
  
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      // Auto play logic
      let nextIndex = currentIndex + direction;
      let newDirection = direction;
      
      // If we hit the end (items.length - 3 roughly for desktop), we bounce back
      // To keep it simple, let's just bounce between 0 and items.length - 1
      if (nextIndex > items.length - 3) { // Assuming 3 items visible
        nextIndex = items.length - 4; // go back one
        newDirection = -1;
      } else if (nextIndex < 0) {
        nextIndex = 1;
        newDirection = 1;
      }
      
      // If mobile, it can go up to items.length - 1
      if (window.innerWidth < 768) {
          if (nextIndex > items.length - 1) {
              nextIndex = items.length - 2;
              newDirection = -1;
          }
      }

      setDirection(newDirection);
      setCurrentIndex(Math.max(0, nextIndex));
    }, 4000); // 4 seconds interval

    return () => {
      resetTimeout();
    };
  }, [currentIndex, direction, items.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(prev + 1, items.length - (window.innerWidth < 768 ? 1 : 3)));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="py-12 px-5 md:px-8 xl:px-12 max-w-[1440px] mx-auto overflow-hidden">
      <div className="text-center mb-10">
        <h2 className={`text-4xl font-serif mb-3 italic font-semibold ${titleColor}`}>{title}</h2>
        {subtitle && <p className="text-stone text-sm max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      <div className="relative">
        <div className="flex gap-6 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / items.length)}%)`, width: 'max-content' }}>
          {items.map((item, idx) => (
            <SliderCard key={idx} item={item} />
          ))}
        </div>

        {/* Controls */}
        <div className="absolute -top-16 right-0 flex gap-2">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-stone/20 flex items-center justify-center text-charcoal hover:bg-bronze hover:text-white transition-colors bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-stone/20 flex items-center justify-center text-charcoal hover:bg-bronze hover:text-white transition-colors bg-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= items.length - (window.innerWidth < 768 ? 1 : 3)}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
