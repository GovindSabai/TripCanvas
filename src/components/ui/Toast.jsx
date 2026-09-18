import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from './Button';

export function Toast({ isVisible, message, type = 'success', onClose, duration = 3000 }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.9 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-md px-4 py-3 shadow-lg",
            type === 'success' ? "bg-stone text-ivory" : "bg-red-500 text-white"
          )}
        >
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
