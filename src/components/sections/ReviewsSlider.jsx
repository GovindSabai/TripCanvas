import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../../data/homeData';

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  
  // Truncate logic
  const maxLength = 100;
  const isLong = review.text.length > maxLength;
  const displayText = expanded ? review.text : (isLong ? `${review.text.slice(0, maxLength)}...` : review.text);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img src={`https://ui-avatars.com/api/?name=${review.name.split(' ').join('+')}&background=random`} alt={review.name} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 leading-tight">{review.name}</h4>
            <span className="text-xs text-gray-400">{review.time}</span>
          </div>
        </div>
        <div className="w-5 h-5 bg-white shadow-sm rounded-full flex items-center justify-center p-1">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
             <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
             <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
             <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
             <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
             <path fill="none" d="M0 0h48v48H0z"/>
           </svg>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-grow transition-all duration-300">
        {displayText}
      </p>

      {isLong && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-xs text-blue-500 text-left mt-auto hover:underline block w-max"
        >
          {expanded ? 'Hide' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export function ReviewsSlider() {
  return (
    <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 bg-white overflow-hidden border-t-8 border-red-900 mt-10">
      
      <div className="flex flex-col md:flex-row items-start gap-10">
        
        {/* Left Side: Excellent Rating Summary */}
        <div className="flex-shrink-0 text-center flex flex-col items-center sticky top-24">
          <p className="font-bold text-gray-800 text-lg mb-1">EXCELLENT</p>
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xs text-gray-500 mb-2">Based on 150+ reviews</p>
          <span className="font-bold text-2xl tracking-tighter">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>
        </div>

        {/* Right Side: Auto-scrolling Reviews */}
        <div className="relative w-full overflow-hidden mask-image-linear">
          {/* Use items-start so cards don't all stretch to the height of the tallest expanded card automatically, 
              or let them stretch but content pushes down. Actually, items-stretch is fine. */}
          <div className="flex w-max animate-slider hover:animation-play-state-paused items-stretch">
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="w-[300px] flex-shrink-0 px-2 transition-all duration-300">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        Showing our latest reviews
      </div>
    </section>
  );
}
