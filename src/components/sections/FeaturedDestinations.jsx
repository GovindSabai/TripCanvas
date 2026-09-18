import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { Card } from '../ui/Card';
import { LazyImage } from '../ui/LazyImage';
import { useAdminData } from '../../context/AdminDataContext';

export function FeaturedDestinations() {
  const shouldReduceMotion = useReducedMotion();
  const { getPublicDestinations } = useAdminData();
  const destinations = getPublicDestinations().slice(0, 3); // Showing a few featured

  return (
    <section id="featured-destinations" className="py-desktop-rhythm max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <SectionReveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-h2 font-serif text-charcoal mb-4">Places Worth Going Further For.</h2>
            <p className="text-stone">Discover our handpicked selection of extraordinary destinations, curated for the modern traveler seeking depth and authenticity.</p>
          </div>
          <Link to="/destinations" className="text-sm font-medium text-charcoal hover:text-bronze transition-colors flex items-center gap-2 whitespace-nowrap">
            View All Destinations
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, i) => (
          <SectionReveal key={dest.id} delay={i * 0.1}>
            <Link to="/destinations">
              <Card className="group h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <LazyImage
                      src={dest.image}
                      alt={dest.alt}
                      className="w-full h-full"
                    />
                  </motion.div>
                </div>
                <div className="p-6 flex-grow flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-xl text-charcoal">{dest.name}</h3>
                    <p className="text-sm text-stone">{dest.country}</p>
                  </div>
                  <span className="text-bronze opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Explore
                  </span>
                </div>
              </Card>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
