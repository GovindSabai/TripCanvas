import React from 'react';
import { DestinationCard } from '../ui/DestinationCard';
import { internationalDestinations } from '../../data/homeData';

export function InternationalDestinations() {
  return (
    <section className="py-16 bg-[#040f28]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 italic">International Destinations</h2>
        <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto mb-12">
          Explore premium international destinations with unforgettable luxury, adventure, and breathtaking experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internationalDestinations.map((dest) => (
            <DestinationCard key={dest.id} item={dest} variant="international" />
          ))}
        </div>
      </div>
    </section>
  );
}
