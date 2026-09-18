import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { travelPerspectives } from '../../data/aboutData';

export function TravelPerspectives() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        <SectionReveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-bronze">05 — YOUR WAY TO TRAVEL</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4">
                Travel Has Many Perspectives.
              </h2>
            </div>
            <p className="text-stone max-w-sm">
              We design journeys for every kind of traveler. How do you want to see the world?
            </p>
          </div>
        </SectionReveal>

        {/* Asymmetric Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-4">
          {travelPerspectives.map((item, index) => (
            <PerspectiveCard key={item.id} item={item} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

function PerspectiveCard({ item, index }) {
  // Mobile fallback for spans to ensure it doesn't break
  const mobileSpanClass = item.span.replace(/col-span-2/g, 'col-span-2 md:col-span-2');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-sand ${mobileSpanClass}`}
    >
      <motion.img 
        src={item.image} 
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover origin-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-ivory font-serif font-bold text-xl md:text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.title}
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <span className="text-bronzeLight text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            Explore <span className="text-lg">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
