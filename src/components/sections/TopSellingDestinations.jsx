import React from 'react';
import { topSelling } from '../../data/homeData';

import { Link } from 'react-router-dom';

export function TopSellingDestinations() {
  return (
    <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center bg-white overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-serif text-[#1e293b] mb-3 italic">Top Selling Destinations</h2>
      <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-2">
        Discover India's enchanting destinations, from the tranquil seas to majestic mountains.
      </p>
      <p className="text-gray-500 text-xs mb-10 uppercase tracking-wider">With TripCanvas</p>

      {/* Auto-scrolling Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-slider">
          {[...topSelling, ...topSelling].map((dest, idx) => {
            const isIndian = !['Bhutan', 'Thailand'].includes(dest.name);
            const targetUrl = isIndian ? `/destinations/india?search=${dest.name}` : `/tour/${dest.id}`;
            return (
            <Link to={targetUrl} key={`${dest.id}-${idx}`} className="w-[280px] md:w-[320px] lg:w-[350px] flex-shrink-0 px-2 group cursor-pointer relative block">
              <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-left">
                  <h3 className="text-white text-2xl font-bold">{dest.name}</h3>
                  <p className="text-gray-300 text-sm">{dest.subtitle}</p>
                </div>
              </div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
