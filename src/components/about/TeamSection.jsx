import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { teamMembers } from '../../data/aboutData';

export function TeamSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        <SectionReveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-bronze">07 — THE PEOPLE</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4">
                The People Behind TripCanvas.
              </h2>
            </div>
            <p className="text-stone max-w-sm">
              A collective of explorers, designers, and curators united by a singular belief: travel should change you.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

function TeamCard({ member, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-sand">
        <motion.img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-ivory text-sm leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            {member.bio}
          </p>
          <div className="flex gap-4 mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
            <span className="w-8 h-8 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-ink transition-colors cursor-pointer">
              in
            </span>
            <span className="w-8 h-8 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-ink transition-colors cursor-pointer">
              tw
            </span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
        <p className="text-bronze text-sm font-bold uppercase tracking-widest">{member.role}</p>
      </div>
    </motion.div>
  );
}
