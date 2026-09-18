import React from 'react';
import { SectionReveal } from '../ui/SectionReveal';
import { Button } from '../ui/Button';
import { LazyImage } from '../ui/LazyImage';
import { journeys } from '../../data/journeys';

export function FeaturedJourney() {
  const journey = journeys[0]; // Displaying the first featured journey

  return (
    <section className="py-desktop-rhythm max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <SectionReveal>
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-h2 font-serif text-charcoal mb-4">One Journey. A Thousand Memories.</h2>
          <p className="text-stone max-w-2xl mx-auto">Experience our most iconic itinerary, carefully crafted to deliver unforgettable moments.</p>
        </div>
      </SectionReveal>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {/* 60% Image Side */}
        <SectionReveal className="w-full lg:w-[60%]" delay={0.1}>
          <div className="relative rounded-lg overflow-hidden aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] w-full">
            <LazyImage
              src={journey.image}
              alt={journey.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md">
              <span className="text-xs font-medium uppercase tracking-widest text-bronze">Featured Itinerary</span>
            </div>
          </div>
        </SectionReveal>

        {/* 40% Text Side */}
        <SectionReveal className="w-full lg:w-[40%] flex flex-col justify-center" delay={0.2}>
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center gap-4 text-sm font-medium text-stone uppercase tracking-wider">
              <span>{journey.duration}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-bronzeLight"></span>
              <span>{journey.travelStyle}</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif text-charcoal leading-tight">
              {journey.title}
            </h3>
            
            <p className="text-bronze font-medium">
              {journey.location}
            </p>
            
            <p className="text-stone leading-relaxed text-lg">
              {journey.description}
            </p>
            
            <div className="pt-6">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Itinerary
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
