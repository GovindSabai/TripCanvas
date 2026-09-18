import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-bronze border-t-transparent rounded-full animate-spin"></div>
        <p className="text-charcoal font-serif text-lg tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
