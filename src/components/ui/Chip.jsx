import React from 'react';
import { Check } from 'lucide-react';

export function Chip({ label, selected, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
        selected
          ? 'bg-bronze border-bronze text-white shadow-sm'
          : 'bg-white border-stone/30 text-stone hover:border-bronze hover:text-bronze'
      } ${className}`}
    >
      {selected && <Check size={14} className="text-white" />}
      {label}
    </button>
  );
}
