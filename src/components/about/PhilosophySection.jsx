import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { philosophyItems } from '../../data/aboutData';

export function PhilosophySection() {
  const [hoveredIndex, setHoveredIndex] = useState(0); // Default to first item active

  return (
    <section className="relative py-24 md:py-32 bg-ink text-ivory overflow-hidden">
      
      {/* Background Images that crossfade based on active item */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence initial={false}>
          <motion.div
            key={hoveredIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${philosophyItems[hoveredIndex].image})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 relative z-10">
        <SectionReveal>
          <div className="mb-16 md:mb-24">
            <span className="text-sm font-bold tracking-widest uppercase text-bronzeLight">02 — OUR PHILOSOPHY</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4 max-w-2xl text-ivory">
              How We See Travel
            </h2>
          </div>
        </SectionReveal>

        <div className="flex flex-col border-t border-ivory/20">
          {philosophyItems.map((item, index) => {
            const isActive = hoveredIndex === index;
            
            return (
              <div 
                key={item.id}
                className="group relative border-b border-ivory/20 py-8 md:py-12"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-12 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}>
                  
                  {/* Number */}
                  <div className="w-12 text-sm font-serif italic text-bronzeLight overflow-hidden">
                    <motion.div
                      animate={{ y: isActive ? 0 : 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      0{index + 1}
                    </motion.div>
                  </div>

                  {/* Title */}
                  <div className="flex-grow">
                    <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description (Slides in on Desktop, always there on mobile) */}
                  <div className="w-full md:w-[400px] lg:w-[500px] overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isActive ? 'auto' : 0,
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 20
                      }}
                      className="md:block"
                      transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                    >
                      <p className="text-ivory/80 text-lg py-2">
                        {item.description}
                      </p>
                    </motion.div>
                    
                    {/* Mobile always-visible fallback if framer motion height breaks on mobile, but Animate works well */}
                    <p className="text-ivory/80 text-lg py-2 md:hidden block mt-2 opacity-100 h-auto">
                      {isActive ? item.description : ''}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
