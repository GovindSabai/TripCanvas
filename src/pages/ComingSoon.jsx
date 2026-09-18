import React from 'react';
import { Link } from 'react-router-dom';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-h1 text-charcoal mb-4">Coming Soon</h1>
      <p className="text-body text-stone max-w-md mb-8">
        We are crafting something extraordinary. This feature will be available in a future update.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center justify-center px-6 py-3 border border-charcoal text-charcoal rounded-md hover:bg-charcoal hover:text-ivory transition-colors duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
