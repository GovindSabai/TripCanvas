import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';

export function ContactHero() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: custom * 0.1 }
    })
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
          style={{ 
            backgroundImage: `url('/contact-bg-3.png')` 
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
        {/* Grain Overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')` }}
        />
        {/* Lighter Overlays for better image visibility */}
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-5 max-w-[1000px] mx-auto text-ivory pb-8 md:pb-12">
        <motion.div
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-bronze mb-4 block">
            GET IN TOUCH
          </span>
        </motion.div>

        <motion.h1 
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 leading-[1.1]"
        >
          Let's Plan Your <br className="hidden md:block" /> Next Escape.
        </motion.h1>

        <motion.p 
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-ivory/80 max-w-[600px] leading-relaxed mb-0"
        >
          Whether you have a fully formed vision or just a vague notion of adventure, our specialists are here to craft your perfect journey.
        </motion.p>
      </div>
    </section>
  );
}
