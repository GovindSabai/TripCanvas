import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function Timeline({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
          <button 
            className={`w-full flex items-center justify-between p-5 text-left transition-colors ${openIndex === idx ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            aria-expanded={openIndex === idx}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <span className="bg-bronze text-white text-sm font-bold px-3 py-1 rounded-md shrink-0 w-fit">
                Step {item.step || idx + 1}
              </span>
              <span className="font-bold text-gray-900 text-lg">{item.title}</span>
            </div>
            {openIndex === idx ? (
              <ChevronUp size={20} className="text-bronze shrink-0" />
            ) : (
              <ChevronDown size={20} className="text-gray-400 shrink-0" />
            )}
          </button>
          {openIndex === idx && (
            <div className="p-5 pt-2 bg-white sm:pl-[5.5rem]">
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
