import React from 'react';
import { motion } from 'framer-motion';

export function NewsletterBanner() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row items-stretch shadow-xl shadow-blue-900/5 group"
      >
        
        {/* Left Side: Image */}
        <div className="w-full md:w-1/3 h-48 md:min-h-full relative overflow-hidden bg-[#ff8a65]">
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src="/Home/Couple..jpg" 
            alt="Travel Couple"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transform group-hover:scale-110 transition-transform duration-1000"
          />
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-2/3 p-8 md:p-12 text-center flex flex-col items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
          >
            Get special offers, and more from TripCanvas
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 text-sm md:text-base max-w-2xl leading-relaxed mb-2"
          >
            Join our exclusive travel community and be the first to discover hidden gems, curated luxury experiences, and limited-time offers tailored just for you. 
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-400 text-xs md:text-sm font-medium"
          >
            Subscribe to see secret deals drop the moment you sign up!
          </motion.p>
        </div>

      </motion.div>
    </section>
  );
}
