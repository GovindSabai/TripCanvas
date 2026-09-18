import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How far in advance should I start planning my trip?",
    answer: "For complex, tailor-made journeys or during peak travel seasons, we recommend initiating the planning process 6 to 9 months in advance. This ensures access to premier accommodations and exclusive experiences that often book up quickly. However, for last-minute escapes, our concierge team can still perform miracles depending on availability."
  },
  {
    question: "What is included in the concierge service fee?",
    answer: "Our initial consultation is complimentary. If you choose to proceed with our tailor-made planning, a design fee is applied. This covers our specialists' time in crafting your bespoke itinerary, securing reservations, organizing logistics, and providing 24/7 on-the-ground support during your travels. The fee varies based on the complexity and duration of your trip."
  },
  {
    question: "Do you arrange flights and visas?",
    answer: "While we do not directly book commercial international flights, our team will advise on the best routes and coordinate your itinerary seamlessly with your flight schedule. We do, however, handle all domestic flights, private charters, and ground transportation within your destination. We also provide comprehensive guidance on visa requirements and can connect you with trusted expeditors."
  },
  {
    question: "What if I need to cancel or change my itinerary?",
    answer: "We understand that plans can change. Our cancellation and modification policies vary depending on the specific properties and operators included in your itinerary. We highly recommend purchasing comprehensive travel insurance, which we can assist in arranging, to protect your investment against unforeseen circumstances."
  },
  {
    question: "Can you accommodate dietary restrictions and accessibility needs?",
    answer: "Absolutely. We pride ourselves on attention to detail. During the planning phase, we will gather all necessary information regarding dietary requirements, mobility needs, and any other preferences to ensure every aspect of your journey is comfortable, safe, and fully tailored to you."
  }
];

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-ivory text-charcoal">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-bronze mb-4 block">Common Inquiries</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Frequently Asked Questions</h2>
          </div>
        </SectionReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <SectionReveal key={index} delay={index * 0.1}>
              <div 
                className="border border-charcoal/10 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-bronze/30 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-serif font-bold text-lg pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openIndex === index ? 'bg-bronze text-ivory' : 'bg-sand text-bronze'}`}>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-stone border-t border-charcoal/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
