import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { timelineStages } from '../../data/aboutData';

export function JourneyTimeline() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active index based on scroll position
  useTransform(scrollYProgress, (pos) => {
    if (isReducedMotion) return;
    
    // Divide the scroll space by number of stages
    const step = 1 / timelineStages.length;
    let newIndex = Math.floor(pos / step);
    if (newIndex >= timelineStages.length) newIndex = timelineStages.length - 1;
    if (newIndex < 0) newIndex = 0;
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal" ref={containerRef}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        <SectionReveal>
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <span className="text-sm font-bold tracking-widest uppercase text-bronze">04 — OUR APPROACH</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4">
              Thoughtfully Curated.<br className="hidden md:block"/> Personally Experienced.
            </h2>
          </div>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Timeline Text */}
          <div className="w-full lg:w-1/2 relative">
            {/* The vertical drawing line */}
            <div className="absolute left-[27px] md:left-[35px] top-4 bottom-12 w-[2px] bg-stone/20 overflow-hidden">
              {!isReducedMotion ? (
                <motion.div 
                  className="w-full bg-bronze origin-top"
                  style={{ scaleY, height: "100%" }}
                />
              ) : (
                <div className="w-full h-full bg-bronze" />
              )}
            </div>

            <div className="flex flex-col gap-12 md:gap-20">
              {timelineStages.map((stage, index) => {
                // For reduced motion, everything is active
                const isActive = isReducedMotion || index <= activeIndex;
                const isCurrent = isReducedMotion || index === activeIndex;
                
                return (
                  <div key={stage.id} className="relative flex gap-8 md:gap-12 pl-4">
                    
                    {/* Node */}
                    <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 shrink-0 mt-1">
                      <div className={`w-full h-full rounded-full border-2 flex items-center justify-center transition-colors duration-500 bg-ivory ${isActive ? 'border-bronze' : 'border-stone/30'}`}>
                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-500 ${isActive ? 'bg-bronze' : 'bg-transparent'}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`transition-opacity duration-500 ${isCurrent ? 'opacity-100' : (isActive ? 'opacity-50' : 'opacity-30')}`}>
                      <div className="text-xs font-bold uppercase tracking-widest text-bronze mb-2">Stage 0{index + 1}</div>
                      <h3 className="text-2xl md:text-4xl font-serif font-bold mb-4">{stage.title}</h3>
                      <p className="text-stone text-lg max-w-md">{stage.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Sticky Image */}
          <div className="hidden lg:block w-1/2 relative">
            <div className="sticky top-[20vh] aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
              {timelineStages.map((stage, index) => (
                <motion.img
                  key={stage.id}
                  src={stage.image}
                  alt={stage.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isReducedMotion ? (index === timelineStages.length - 1 ? 1 : 0) : (index === activeIndex ? 1 : 0) }}
                  transition={{ duration: 0.8 }}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
