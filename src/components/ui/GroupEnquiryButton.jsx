import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { cn } from './Button';

export const GroupEnquiryButton = ({ onClick, className, children }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: '#1a2254', 
        boxShadow: '0 0 20px rgba(10, 17, 66, 0.5)' 
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ backgroundColor: '#0a1142' }}
      className={cn(
        "flex items-center gap-2 text-white px-4 py-2 rounded text-sm font-medium transition-all duration-300 shadow-sm",
        className
      )}
    >
      <Users size={16} className="text-white" />
      <span>{children || "Group Enquiry?"}</span>
    </motion.button>
  );
};
