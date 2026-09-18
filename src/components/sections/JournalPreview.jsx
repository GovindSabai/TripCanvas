import React from 'react';
import { Link } from 'react-router-dom';
import { SectionReveal } from '../ui/SectionReveal';
import { Card } from '../ui/Card';
import { LazyImage } from '../ui/LazyImage';
import { stories } from '../../data/stories';

export function JournalPreview() {
  return (
    <section className="py-desktop-rhythm max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 bg-sand">
      <SectionReveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-h2 font-serif text-charcoal mb-4">Stories From the Road.</h2>
            <p className="text-stone">Inspiration, guides, and tales from travelers exploring the far corners of the globe.</p>
          </div>
          <Link to="/journal" className="text-sm font-medium text-charcoal hover:text-bronze transition-colors flex items-center gap-2 whitespace-nowrap">
            Read the Journal
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <SectionReveal key={story.id} delay={i * 0.1}>
            <Card className="h-full flex flex-col bg-ivory border border-transparent hover:border-bronze/20 shadow-none hover:shadow-xl transition-all duration-300">
              <Link to="/journal" className="flex flex-col h-full">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <LazyImage
                    src={story.image}
                    alt={story.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-bronze uppercase tracking-wider mb-3 block">
                    {story.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-4 leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed mb-6 flex-grow">
                    {story.excerpt}
                  </p>
                  <span className="text-sm font-medium text-charcoal hover:text-bronze transition-colors inline-flex items-center gap-2 mt-auto group">
                    Read Story
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </Card>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
