import React from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { Map, CreditCard, Headphones, Briefcase } from 'lucide-react';

const categories = [
  {
    id: 'planning',
    value: 'tailor-made',
    title: 'Trip Planning',
    description: 'Speak to a specialist about creating a tailor-made itinerary for your next journey.',
    icon: <Map className="w-6 h-6" />
  },
  {
    id: 'bookings',
    value: 'existing-booking',
    title: 'Existing Bookings',
    description: 'Need to modify dates, add experiences, or check the status of your upcoming trip?',
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    id: 'support',
    value: 'support',
    title: '24/7 Support',
    description: 'Currently traveling and need immediate assistance from our global concierge team?',
    icon: <Headphones className="w-6 h-6" />
  },
  {
    id: 'payments',
    value: 'payments',
    title: 'Payments & Billing',
    description: 'Inquiries regarding deposits, final balances, invoices, and cancellation policies.',
    icon: <CreditCard className="w-6 h-6" />
  }
];

export function HelpCategories({ onSelect }) {
  const handleClick = (value) => {
    if (onSelect) onSelect(value);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-bronze">How Can We Help?</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4 mb-6">Direct Your Inquiry</h2>
            <p className="text-stone">Select a category below to ensure your message reaches the right department for the fastest possible response.</p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <SectionReveal key={category.id} delay={index * 0.1}>
              <button 
                onClick={() => handleClick(category.value)}
                className="w-full text-left group h-full bg-sand rounded-2xl p-8 hover:bg-bronze transition-colors duration-500 cursor-pointer flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2"
              >
                <div className="w-16 h-16 rounded-full bg-ivory text-bronze flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-ivory transition-colors duration-500">{category.title}</h3>
                <p className="text-stone text-sm group-hover:text-ivory/80 transition-colors duration-500">{category.description}</p>
              </button>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
