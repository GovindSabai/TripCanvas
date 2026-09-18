import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTripPlanner } from '../../context/TripPlannerContext';

export function ConfirmationModal({ isOpen, onClose, referenceNumber }) {
  const navigate = useNavigate();
  const { dispatch } = useTripPlanner();

  const handleClose = () => {
    dispatch({ type: 'RESET_PLANNER' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[500px] overflow-hidden flex flex-col p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-green-600">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">Your Trip Is Confirmed ✓</h3>
            
            <p className="text-stone/70 mb-6 leading-relaxed">
              Your booking has been successfully confirmed. Our team will contact you shortly to finalize your travel details and assist you throughout the next steps.
            </p>
            
            <div className="bg-stone/5 p-4 rounded-xl border border-stone/10 mb-8 inline-block mx-auto min-w-[200px]">
              <span className="text-stone/60 text-sm font-bold uppercase tracking-wider block mb-1">Booking Reference</span>
              <span className="text-xl font-bold text-charcoal">{referenceNumber}</span>
            </div>
            
            <button 
              onClick={() => {
                handleClose();
                navigate('/profile');
              }}
              className="w-full bg-charcoal text-ivory py-4 rounded-xl font-bold hover:bg-bronze transition-colors shadow-lg shadow-stone/10"
            >
              Go to Profile
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
