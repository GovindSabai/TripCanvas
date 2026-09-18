import React from 'react';
import { DestinationCard } from '../ui/DestinationCard';
import { exploreIndia } from '../../data/homeData';
import { motion } from 'framer-motion';

export function ExploreIndia() {
  return (
    <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center bg-white">
      <h2 className="text-3xl md:text-4xl font-serif text-[#1e293b] mb-3 italic">Explore India</h2>
      <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-10">
        Discover breathtaking hill stations, cool mountain escapes, and unforgettable summer vacation destinations across India.
      </p>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {exploreIndia.map((dest) => (
          <motion.div
            key={dest.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <DestinationCard item={dest} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
