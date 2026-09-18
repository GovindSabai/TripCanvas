import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ title = "No results found", message = "We couldn't find anything matching your criteria.", onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <SearchX size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{title}</h3>
      <p className="text-gray-500 max-w-md mb-8">{message}</p>
      {onClear && (
        <Button onClick={onClear} variant="outline" className="border-bronze text-bronze hover:bg-bronze hover:text-white">
          Explore all experiences
        </Button>
      )}
    </div>
  );
}
