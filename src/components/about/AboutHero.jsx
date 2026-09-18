import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionReveal } from '../ui/SectionReveal';

export function AboutHero() {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: custom * 0.15 
      }
    })
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      <motion.div 
        className="absolute inset-0 z-0"
      >
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop')` 
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
        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/90" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 max-w-[1000px] mx-auto text-ivory pt-20">
        <motion.div
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 tracking-[0.2em] text-xs font-bold uppercase text-sand"
        >
          The TripCanvas Story
        </motion.div>
        
        <motion.h1 
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-h1 font-serif font-bold leading-[1.1] mb-8"
        >
          We Don't Just Take You Places.<br className="hidden md:block" /> We Help You Experience Them.
        </motion.h1>
        
        <motion.p 
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-ivory/80 max-w-[700px] mb-12 font-light"
        >
          Travel shouldn't be a checklist. It should be an immersion. We curate journeys that connect you with the soul of a destination.
        </motion.p>
        
        <motion.div 
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link 
            to="/destinations"
            className="px-8 py-4 bg-ivory text-ink rounded-full font-medium hover:bg-sand transition-colors duration-300"
          >
            Explore Our World
          </Link>
          <Link 
            to="/plan"
            className="px-8 py-4 bg-transparent border border-ivory/30 text-ivory rounded-full font-medium hover:bg-ivory/10 transition-colors duration-300"
          >
            Plan Your Journey
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-ivory/30 origin-top"
          animate={{ scaleY: [0, 1, 0], y: [0, 0, 10] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
