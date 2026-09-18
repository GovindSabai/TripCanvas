import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';

export function AboutIntro() {
  const statementLines = [
    "See more.",
    "Go deeper.",
    "Travel differently."
  ];

  return (
    <section className="relative py-24 md:py-32 xl:py-48 bg-ivory overflow-hidden">
      {/* Decorative Background Word */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-serif font-bold text-sand/20 leading-none select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter"
        aria-hidden="true"
      >
        JOURNEY
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 relative z-10">
        <SectionReveal>
          <div className="mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-bronze">01 — THE IDEA</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-4 text-charcoal max-w-2xl">
              Every Journey Begins With Curiosity.
            </h2>
          </div>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <div className="text-h2 font-serif font-bold text-charcoal leading-tight mb-10">
              {statementLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>

            <SectionReveal delay={0.4}>
              <div className="space-y-6 text-stone text-lg max-w-lg">
                <p>
                  We started TripCanvas because we were tired of one-size-fits-all itineraries. The world is too vast, too complex, and too beautiful to be reduced to a top-ten list.
                </p>
                <p>
                  Our goal is simple: to help you discover the world in a way that feels authentic, unhurried, and deeply personal. We want to turn travelers into storytellers.
                </p>
              </div>
            </SectionReveal>
          </div>

          <div className="w-full lg:w-7/12 order-1 lg:order-2">
            <motion.div
              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
              className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop"
                alt="Travel differently"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
