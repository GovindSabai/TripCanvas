import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, className = '' }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus trap could be fully implemented, but keeping it simple as a placeholder since it was missing
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full max-h-[100dvh] sm:max-h-[90vh] bg-ivory shadow-2xl overflow-y-auto sm:rounded-2xl flex flex-col ${className}`}
            style={{ 
              maxWidth: '1100px',
              height: '100dvh', // Full screen on mobile
            }}
          >
            {title && (
              <div className="sticky top-0 z-10 bg-ivory/95 backdrop-blur border-b border-stone/10 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-charcoal">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-stone/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-charcoal" />
                </button>
              </div>
            )}
            {!title && (
               <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
                aria-label="Close modal"
              >
                <X size={24} className="text-charcoal" />
              </button>
            )}
            
            <div className="flex-grow flex flex-col relative outline-none p-6 sm:p-8 md:p-10">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
