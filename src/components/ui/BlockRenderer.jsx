import React from 'react';

export function BlockRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="text-lg text-gray-700 leading-relaxed">
                {block.text}
              </p>
            );
          case 'heading':
            // Generate an ID for the heading so the Table of Contents can link to it
            const id = block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <h2 key={index} id={id} className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-6 scroll-mt-32">
                {block.text}
              </h2>
            );
          case 'pullQuote':
            return (
              <blockquote key={index} className="my-10 pl-6 border-l-4 border-bronze italic text-2xl font-serif text-charcoal bg-bronze/5 py-6 pr-6 rounded-r-xl">
                "{block.text}"
              </blockquote>
            );
          case 'image':
            return (
              <figure key={index} className="my-10">
                <img 
                  src={block.src} 
                  alt={block.alt || 'Article image'} 
                  className="w-full rounded-2xl shadow-md max-h-[600px] object-cover"
                />
                {block.alt && (
                  <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
