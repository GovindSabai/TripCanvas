import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

export function ImageGallery({ images, title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative group">
        {images.slice(0, 5).map((img, idx) => {
          let classes = "col-span-1 row-span-1";
          if (idx === 0) classes = "col-span-2 row-span-2";
          return (
            <div 
              key={idx} 
              className={`${classes} relative cursor-pointer overflow-hidden`}
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={img} 
                alt={`${title} - image ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
              {idx === 4 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+{images.length - 5}</span>
                </div>
              )}
            </div>
          );
        })}
        <button 
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-charcoal px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors shadow-sm"
        >
          <Expand size={16} /> Show all photos
        </button>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-6 text-white/70 hover:text-white p-4"
            onClick={prevImage}
          >
            <ChevronLeft size={48} />
          </button>

          <img 
            src={images[currentIndex]} 
            alt={`${title} - image ${currentIndex + 1}`} 
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button 
            className="absolute right-6 text-white/70 hover:text-white p-4"
            onClick={nextImage}
          >
            <ChevronRight size={48} />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
