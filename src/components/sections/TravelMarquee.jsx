import React from 'react';

export function TravelMarquee() {
  const text = "ADVENTURE — CULTURE — NATURE — ESCAPE — DISCOVERY — JOURNEYS — ";
  
  return (
    <section className="py-8 md:py-12 bg-charcoal border-y border-stone/20 overflow-hidden" aria-hidden="true">
      <div className="w-full flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee text-ivory/90 font-serif text-3xl md:text-5xl lg:text-7xl tracking-widest uppercase">
          <span className="px-4">{text}</span>
          <span className="px-4">{text}</span>
          <span className="px-4">{text}</span>
          <span className="px-4">{text}</span>
        </div>
      </div>
    </section>
  );
}
