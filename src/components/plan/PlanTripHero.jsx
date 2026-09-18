import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';

export function PlanTripHero() {
  const handleStartPlanning = () => {
    const el = document.getElementById('planner-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop" 
          alt="Plan Your Trip" 
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#141312]/80" />
      </div>

      <SectionReveal className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center flex flex-col items-center">
        <span className="text-bronze font-bold tracking-widest uppercase text-sm md:text-base mb-4 drop-shadow-sm">
          Plan Your Trip
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-ivory font-bold mb-6 drop-shadow-lg leading-tight">
          Your Journey, <br className="hidden sm:block" /> Thoughtfully Planned.
        </h1>
        <p className="text-lg md:text-xl text-ivory/90 max-w-2xl mx-auto mb-10 drop-shadow-md">
          Design your perfect escape. Tell us your travel style, pace, and interests, and we'll craft an itinerary just for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleStartPlanning}
            className="w-full sm:w-auto bg-bronze hover:bg-bronzeLight text-ivory font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2 focus:ring-offset-charcoal"
          >
            Start Planning
          </button>
          <a 
            href="/destinations"
            className="w-full sm:w-auto bg-transparent border-2 border-ivory text-ivory hover:bg-ivory hover:text-charcoal font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-ivory focus:ring-offset-2 focus:ring-offset-charcoal"
          >
            Explore Destinations
          </a>
        </div>
      </SectionReveal>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-ivory/60 text-xs font-bold uppercase tracking-widest mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-gradient-to-b from-bronze to-transparent"
        />
      </motion.div>
    </section>
  );
}
