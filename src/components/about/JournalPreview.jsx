import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SectionReveal } from '../ui/SectionReveal';
import { useAdminData } from '../../context/AdminDataContext';
import { JournalCard } from '../ui/JournalCard';

export function JournalPreview() {
  const { getPublicJournal } = useAdminData();
  const journalArticles = getPublicJournal();
  // Take first 3 articles for preview
  const previewArticles = journalArticles.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-ivory text-charcoal">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        <SectionReveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-bronze">09 — STORIES</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4">
                Every Place Has a Story.
              </h2>
            </div>
            <Link 
              to="/journal" 
              className="text-bronze font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:text-charcoal transition-colors group"
            >
              Explore Journal 
              <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Note: JournalCard already has Link wrapper inside it usually, if not we wrap it */}
              <JournalCard article={article} />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
