import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { useAdminData } from '../../context/AdminDataContext';

export function StatsSection() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const { getPublicDestinations, getPublicExperiences, getPublicJournal } = useAdminData();
  const destinations = getPublicDestinations();
  const experiences = getPublicExperiences();
  const journalArticles = getPublicJournal();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  const uniqueCountries = new Set(destinations.map(d => d.country)).size;
  
  const stats = [
    { label: 'Curated Destinations', value: destinations.length },
    { label: 'Handpicked Experiences', value: experiences.length },
    { label: 'Countries Explored', value: uniqueCountries },
    { label: 'Travel Stories', value: journalArticles.length }
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal border-y border-stone/20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <SectionReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-bold max-w-2xl mx-auto">
              A World Worth Exploring.
            </h2>
            <p className="text-stone mt-6 max-w-xl mx-auto">
              We focus on depth over breadth, carefully selecting only the most remarkable places and experiences for our travelers.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <StatCounter 
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index * 0.15}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ value, label, delay, isReducedMotion }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!nodeRef.current) return;
    
    if (isInView && !isReducedMotion) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: delay,
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v);
          }
        }
      });
      return () => controls.stop();
    } else if (isInView && isReducedMotion) {
      nodeRef.current.textContent = value;
    }
  }, [isInView, value, delay, isReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: isReducedMotion ? 0 : delay }}
      className="flex flex-col items-center"
    >
      <div 
        ref={nodeRef} 
        className="text-5xl md:text-7xl font-serif font-bold text-bronze mb-4"
      >
        {isReducedMotion ? value : "0"}
      </div>
      <div className="text-sm md:text-base font-bold uppercase tracking-widest text-charcoal">
        {label}
      </div>
    </motion.div>
  );
}
