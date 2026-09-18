import React from 'react';
import { useTripPlanner } from '../../../context/TripPlannerContext';
import { TRAVEL_STYLES } from '../../../data/experiences';
import { Check } from 'lucide-react';

export function TravelStyleStep() {
  const { state, dispatch } = useTripPlanner();

  const toggleStyle = (style) => {
    dispatch({ type: 'TOGGLE_TRAVEL_STYLE', payload: style });
  };

  return (
    <div>
      <p className="text-stone mb-6">Select one or more styles that match your ideal getaway.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TRAVEL_STYLES.map(style => {
          const isSelected = state.travelStyles.includes(style);
          return (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`relative p-4 rounded-xl border-2 text-left transition-all overflow-hidden group ${
                isSelected 
                  ? 'border-bronze bg-bronze/5' 
                  : 'border-stone/20 bg-white hover:border-bronze/40 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-bronze rounded-bl-xl flex items-center justify-center">
                  <Check size={16} className="text-ivory" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center transition-colors ${
                isSelected ? 'bg-bronze text-ivory' : 'bg-sand/30 text-charcoal group-hover:bg-sand/50'
              }`}>
                <span className="font-serif text-xl font-bold">{style.charAt(0)}</span>
              </div>
              
              <h4 className={`font-bold ${isSelected ? 'text-charcoal' : 'text-stone group-hover:text-charcoal'}`}>
                {style}
              </h4>
            </button>
          );
        })}
      </div>
    </div>
  );
}
