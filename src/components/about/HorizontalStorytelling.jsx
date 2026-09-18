import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { storyPanels } from '../../data/aboutData';

export function HorizontalStorytelling() {
  const containerRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress (0-1) into an X translation
  // We have 6 panels. We want to move left by (number of panels - 1) * 100% of panel width
  // A safe offset is mapping to a large negative percentage or vw.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const shouldAnimate = !isReducedMotion && !isMobile;

  return (
    <section 
      ref={shouldAnimate ? containerRef : null}
      className={`bg-sand text-charcoal ${shouldAnimate ? 'h-[400vh]' : 'py-24'}`}
    >
      <div className={shouldAnimate ? "sticky top-0 min-h-screen flex flex-col justify-start pt-16 md:pt-24 overflow-x-hidden pb-16" : ""}>
        
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 w-full mb-6 md:mb-8 shrink-0">
          <SectionReveal>
            <span className="text-sm font-bold tracking-widest uppercase text-bronze">03 — BEYOND THE DESTINATION</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2">
              A Destination Is Only The Beginning.
            </h2>
          </SectionReveal>
        </div>

        {shouldAnimate ? (
          /* Desktop Horizontal Scroll Mode */
          <motion.div 
            className="flex gap-8 px-5 md:px-8 xl:px-12 items-start"
            style={{ x }}
          >
            {storyPanels.map((panel, index) => (
              <PanelCard key={panel.id} panel={panel} index={index} />
            ))}
            {/* spacer at end */}
            <div className="w-[10vw] shrink-0" />
          </motion.div>
        ) : (
          /* Mobile or Reduced Motion Fallback Mode */
          <div className={`
            px-5 md:px-8 xl:px-12 
            ${isMobile && !isReducedMotion ? 'flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 no-scrollbar' : 'flex flex-col gap-12'}
          `}>
            {storyPanels.map((panel, index) => (
              <div 
                key={panel.id} 
                className={isMobile && !isReducedMotion ? 'snap-center shrink-0 w-[85vw] sm:w-[60vw]' : 'w-full'}
              >
                <PanelCard panel={panel} index={index} isVertical={!isMobile || isReducedMotion} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PanelCard({ panel, index, isVertical = false }) {
  return (
    <div className={`relative flex flex-col group ${isVertical ? 'w-full' : 'w-[85vw] md:w-[60vw] lg:w-[42vw] shrink-0'}`}>
      <div className="overflow-hidden rounded-xl aspect-[4/3] mb-4 md:mb-6">
        <img 
          src={panel.image} 
          alt={panel.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex gap-4">
        <div className="text-sm font-serif italic text-stone mt-1">0{index + 1}</div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-bronze mb-1">
            {panel.category}
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">{panel.title}</h3>
          <p className="text-stone text-sm md:text-base">{panel.description}</p>
        </div>
      </div>
    </div>
  );
}
