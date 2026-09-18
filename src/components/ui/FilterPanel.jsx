import React from 'react';
import { Filter, X } from 'lucide-react';

export function FilterPanel({ filters, activeFilters, onFilterChange, onClearFilters }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Filter size={18} /> Filters
        </h3>
        {Object.values(activeFilters).some(v => v !== '') && (
          <button 
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-bronze transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-bronze rounded px-2"
          >
            <X size={14} /> Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filters.map((filterGroup) => (
          <div key={filterGroup.id}>
            <label className="block text-sm font-semibold text-gray-900 mb-3">{filterGroup.label}</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name={filterGroup.id}
                  className="w-4 h-4 text-bronze focus:ring-bronze border-gray-300"
                  checked={!activeFilters[filterGroup.id]}
                  onChange={() => onFilterChange(filterGroup.id, '')}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">All</span>
              </label>
              {filterGroup.options.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name={filterGroup.id}
                    className="w-4 h-4 text-bronze focus:ring-bronze border-gray-300"
                    checked={activeFilters[filterGroup.id] === option}
                    onChange={() => onFilterChange(filterGroup.id, option)}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
