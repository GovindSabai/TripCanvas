import React, { useState } from 'react';


export function RegionFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-blue-600 py-16 w-full">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Side: Accordion */}
        <div className="w-full md:w-3/5 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-center md:text-left">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3">
            {(faqs || [
              { question: "What is the best time to visit?", answer: "The best time to visit depends on your preferences, but typically the peak season offers the best weather." },
              { question: "Are customized tour packages available?", answer: "Yes, we specialize in tailoring itineraries to match your specific preferences and budget." }
            ]).map((faq, index) => (
              <div key={index} className="bg-white rounded overflow-hidden shadow-sm">
                <button
                  className="w-full flex items-center justify-between text-left p-4 focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="text-charcoal font-bold text-sm md:text-base pr-4 flex items-center gap-3">
                    <span className="text-lg font-normal leading-none text-blue-600 w-4 text-center">
                      {openIndex === index ? '−' : '+'}
                    </span>
                    {faq.question}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden bg-slate-50 border-t border-slate-100 transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-4 pl-11 text-gray-700 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600&auto=format&fit=crop" 
            alt="FAQ Explorer" 
            className="w-full max-w-sm h-auto object-cover rounded-xl shadow-lg transform md:-rotate-2"
          />
        </div>

      </div>
    </section>
  );
}
