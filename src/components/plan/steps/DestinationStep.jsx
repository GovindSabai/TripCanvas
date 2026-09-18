import React, { useState } from 'react';
import { useTripPlanner } from '../../../context/TripPlannerContext';
import { MapPin, Globe2, Sparkles, X } from 'lucide-react';
import { SearchableSelect } from '../ui/SearchableSelect';
import { useAdminData } from '../../../context/AdminDataContext';

const modes = [
  { id: 'india', label: 'India', icon: MapPin },
  { id: 'world', label: 'World', icon: Globe2 },
  { id: 'multiple', label: 'Multi-Country', icon: Globe2 },
  { id: 'undecided', label: 'Decide for me', icon: Sparkles }
];

export function DestinationStep() {
  const { state, dispatch } = useTripPlanner();
  const { getPublicDestinations } = useAdminData();
  const destinations = getPublicDestinations();

  const handleModeChange = (modeId) => {
    dispatch({ type: 'SET_DESTINATION_MODE', payload: modeId });
    if (modeId === 'undecided') {
      dispatch({ type: 'SET_DESTINATIONS', payload: [] });
    }
  };

  const handleAddDestination = (dest) => {
    if (!state.destinations.find(d => d.slug === dest.slug)) {
      dispatch({ 
        type: 'ADD_DESTINATION', 
        payload: { slug: dest.slug, name: dest.name, isCatalogEntry: true, basePrice: dest.basePrice } 
      });
    }
  };

  const handleAddCustom = (term) => {
    if (term.trim() && !state.destinations.find(d => d.name.toLowerCase() === term.toLowerCase())) {
      dispatch({ 
        type: 'ADD_DESTINATION', 
        payload: { slug: term.toLowerCase().replace(/\s+/g, '-'), name: term.trim(), isCatalogEntry: false, basePrice: 150 } 
      });
    }
  };

  const removeDestination = (dest) => {
    dispatch({ type: 'REMOVE_DESTINATION', payload: dest });
  };

  const filterDestinations = (dest, term) => {
    return dest.name.toLowerCase().includes(term.toLowerCase()) || 
           dest.country.toLowerCase().includes(term.toLowerCase());
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {modes.map(mode => {
          const Icon = mode.icon;
          const isSelected = state.destinationMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                isSelected 
                  ? 'border-bronze bg-sand/20' 
                  : 'border-stone/20 hover:border-bronze/50 hover:bg-sand/10'
              }`}
            >
              <Icon size={24} className={isSelected ? 'text-bronze' : 'text-stone'} />
              <span className={`font-medium text-sm ${isSelected ? 'text-charcoal' : 'text-stone'}`}>
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>

      {state.destinationMode !== 'undecided' && (
        <div className="space-y-6">
          <div className="relative">
            <SearchableSelect
              placeholder="Search destinations (e.g. Kyoto, Bali) or type a custom one..."
              items={destinations}
              filterFn={filterDestinations}
              onSelect={handleAddDestination}
              onAddCustom={handleAddCustom}
              icon={MapPin}
              renderItem={(dest) => (
                <>
                  <div>
                    <p className="font-bold text-charcoal">{dest.name}</p>
                    <p className="text-sm text-stone">{dest.country}</p>
                  </div>
                </>
              )}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {state.destinations.map(dest => (
              <div 
                key={dest.slug} 
                className="flex items-center gap-2 bg-charcoal text-ivory px-4 py-2 rounded-full shadow-sm"
              >
                <span className="font-medium">{dest.name}</span>
                {!dest.isCatalogEntry && <span className="text-xs bg-stone/50 px-2 py-0.5 rounded-full ml-1">Custom</span>}
                <button 
                  onClick={() => removeDestination(dest)}
                  className="hover:text-bronze transition-colors ml-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {state.destinations.length === 0 && (
              <p className="text-stone italic text-sm">No destinations selected yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
