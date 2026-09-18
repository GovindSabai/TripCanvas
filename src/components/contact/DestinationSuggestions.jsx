import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { ArrowRight } from 'lucide-react';

const regions = [
  {
    id: 'asia',
    name: 'Asia',
    image: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=1000&auto=format&fit=crop',
    experts: 12
  },
  {
    id: 'europe',
    name: 'Europe',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000&auto=format&fit=crop',
    experts: 18
  },
  {
    id: 'africa',
    name: 'Africa',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop',
    experts: 8
  },
  {
    id: 'americas',
    name: 'The Americas',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop',
    experts: 15
  }
];

export function DestinationSuggestions() {
  return (
    <section className="py-24 bg-ink text-ivory overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-widest uppercase text-bronze block mb-4">Regional Experts</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold">Not Sure Where to Begin?</h2>
            </div>
            <Link 
              to="/destinations" 
              className="inline-flex items-center gap-2 text-bronze hover:text-ivory transition-colors uppercase tracking-widest text-sm font-bold group"
            >
              Explore All Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => (
            <SectionReveal key={region.id} delay={index * 0.1}>
              <Link 
                to="/destinations"
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-10" />
                <img 
                  src={region.image} 
                  alt={region.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <h3 className="text-2xl font-serif font-bold mb-1 group-hover:text-bronze transition-colors duration-300">{region.name}</h3>
                  <p className="text-ivory/70 text-sm">{region.experts} Specialists Available</p>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
