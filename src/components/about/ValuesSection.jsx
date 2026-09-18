import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { values } from '../../data/aboutData';

export function ValuesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-24 md:py-32 bg-ink text-ivory">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex flex-col lg:flex-row gap-16">
        
        <div className="w-full lg:w-1/3">
          <SectionReveal>
            <div className="sticky top-32">
              <span className="text-sm font-bold tracking-widest uppercase text-bronzeLight">08 — OUR VALUES</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4">
                What We Believe.
              </h2>
              <p className="text-ivory/70 mt-6 max-w-sm">
                These are the principles that guide every itinerary we design and every partnership we build.
              </p>
            </div>
          </SectionReveal>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="flex flex-col">
            {values.map((value, index) => {
              const isHovered = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
              
              return (
                <div 
                  key={value.id}
                  className={`group py-8 md:py-12 border-b border-ivory/20 transition-opacity duration-500 relative ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <SectionReveal delay={index * 0.1}>
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 inline-block relative">
                      {value.title}
                      {/* Animated Underline */}
                      <span className={`absolute -bottom-2 left-0 h-[2px] bg-bronze transition-all duration-500 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
                    </h3>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isHovered ? 'auto' : 0,
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? 16 : 0
                      }}
                      className="overflow-hidden md:block"
                    >
                      <p className="text-ivory/70 text-lg md:text-xl max-w-2xl">
                        {value.description}
                      </p>
                    </motion.div>
                    
                    {/* Mobile fallback (always visible description or visible on tap) */}
                    <p className="text-ivory/70 text-lg mt-4 max-w-2xl block md:hidden opacity-100 h-auto">
                      {value.description}
                    </p>
                  </SectionReveal>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
