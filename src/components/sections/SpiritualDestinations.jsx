import React from 'react';
import { DestinationCard } from '../ui/DestinationCard';
import { spiritualDestinations } from '../../data/homeData';

export function SpiritualDestinations() {
  return (
    <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center bg-white">
      <h2 className="text-3xl md:text-4xl font-serif text-[#1e293b] mb-3 italic">Spiritual Destinations</h2>
      <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-10">
        Discover India's most sacred temples, peaceful pilgrimage sites, and spiritual journeys that bring peace to your soul.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spiritualDestinations.map((dest) => (
          <DestinationCard key={dest.id} item={dest} variant="spiritual" />
        ))}
      </div>
    </section>
  );
}
