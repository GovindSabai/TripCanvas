import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function SearchableSelect({
  placeholder,
  items,
  filterFn,
  onSelect,
  onAddCustom,
  renderItem,
  icon: Icon,
  onFocus,
  onClick
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onAddCustom) {
      onAddCustom(searchTerm);
      setSearchTerm('');
    }
  };

  const handleSelect = (item) => {
    onSelect(item);
    setSearchTerm('');
  };

  const filteredItems = searchTerm 
    ? items.filter(item => filterFn(item, searchTerm)).slice(0, 5)
    : [];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          {Icon && <Icon className="absolute left-4 text-stone" size={20} />}
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={onFocus}
            onClick={onClick}
            aria-live="polite"
            className={`w-full bg-sand/10 border border-stone/20 rounded-xl py-4 ${Icon ? 'pl-12' : 'pl-4'} pr-12 text-charcoal placeholder:text-stone/60 focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze`}
          />
          {searchTerm && onAddCustom && (
            <button 
              type="submit"
              className="absolute right-3 p-2 bg-bronze text-ivory rounded-lg hover:bg-bronzeLight transition-colors"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
      </form>

      {searchTerm && filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-stone/10 shadow-xl overflow-hidden z-20">
          {filteredItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(item)}
              className="w-full text-left px-6 py-4 hover:bg-sand/20 flex items-center justify-between border-b border-stone/5 last:border-0"
            >
              {renderItem(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
