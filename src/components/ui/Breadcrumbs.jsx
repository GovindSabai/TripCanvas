import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={14} className="mx-2 shrink-0" />}
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:text-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze rounded px-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium px-1">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
