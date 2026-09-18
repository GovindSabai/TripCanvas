import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../../data/homeData';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Graphic & Text */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-1">Frequently Asked</h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#06b6d4] mb-4">Questions</h2>
          <p className="text-gray-500 text-sm mb-10 leading-relaxed">
            Your questions matter — and we're here to make your India trip smooth, comfortable, and memorable.
          </p>
          
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            {/* FAQ Graphic */}
            <img 
              src="/Home/FAQ.png" 
              alt="FAQ Graphic" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full lg:w-2/3">
          <div className="divide-y divide-gray-200 border-b border-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="text-gray-800 font-bold text-sm md:text-base pr-4 flex gap-3">
                    <span className="text-xl font-normal leading-none">{openIndex === index ? '−' : '+'}</span>
                    {faq.question}
                  </span>
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
                      <p className="pt-4 pb-2 text-gray-500 text-sm leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
