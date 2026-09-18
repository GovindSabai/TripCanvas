import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronRight } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop', // Kashmir Gondola
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop', // Goa
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop', // Kerala
];

export function PersonalTourManager() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#040f28] relative overflow-hidden border-t border-white/10">
      {/* Background subtle world map could go here via a pseudo-element if we had the asset */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="max-w-[1000px] mx-auto px-5 md:px-8 xl:px-12 relative z-10">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Image Slider */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-200">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIdx}
                src={images[currentIdx]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Tour Destination"
              />
            </AnimatePresence>
          </div>

          {/* Right Side: Text content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
            <div className="w-1 h-8 bg-[#eab308] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
              Plan Your Travel With Personal Tour Manager
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Unable to figure out where to go? Contact your personal tour manager and let us plan the perfect trip for you with customized destinations, hotels, transportation, and unforgettable travel experiences.
            </p>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-[#eab308] mb-3 shadow-sm border border-gray-200">
                <User size={32} />
              </div>
              <button className="text-[#040f28] font-bold text-sm uppercase hover:text-[#eab308] transition-colors border-b-2 border-transparent hover:border-[#eab308] pb-1">
                Enquiry Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
