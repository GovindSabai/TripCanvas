import React from 'react';
import { Link } from 'react-router-dom';
import { SectionReveal } from '../ui/SectionReveal';
import { LazyImage } from '../ui/LazyImage';
import { useAdminData } from '../../context/AdminDataContext';

export function ExploreByExperience() {
  const { getPublicExperiences } = useAdminData();
  const experiences = getPublicExperiences();
  return (
    <section className="py-desktop-rhythm bg-sand max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <SectionReveal>
        <div className="text-center mb-12">
          <h2 className="text-h2 font-serif text-charcoal mb-4">Travel Your Way.</h2>
          <p className="text-stone max-w-2xl mx-auto">Whether you're seeking high-octane adventure or tranquil retreats, find the perfect experience curated for your travel style.</p>
        </div>
      </SectionReveal>

      {/* Responsive Grid with Mobile Snap Scrolling */}
      <div className="flex overflow-x-auto pb-8 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-x-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory">
        {experiences.map((exp, i) => (
          <SectionReveal key={exp.id} delay={i * 0.05} className="min-w-[280px] md:min-w-0 snap-center">
            <Link to="/experiences" className="group block relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden">
              <LazyImage
                src={exp.image}
                alt={exp.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-center md:text-left">
                <h3 className="text-ivory font-serif text-xl tracking-wide">{exp.name}</h3>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
