import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTripPlanner } from '../../../context/TripPlannerContext';
import { MapPin, Navigation } from 'lucide-react';
import { locations } from '../../../data/locations';
import { SearchableSelect } from '../ui/SearchableSelect';

export function StartingLocationStep() {
  const { state, dispatch } = useTripPlanner();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSelectLocation = (location) => {
    dispatch({ type: 'SET_STARTING_LOCATION', payload: location });
  };

  const filterLocations = (item, term) => {
    const t = term.toLowerCase();
    return item.name.toLowerCase().includes(t) ||
           item.state.toLowerCase().includes(t) ||
           item.country.toLowerCase().includes(t);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <p className="text-stone text-lg">
          Select your starting location so we can calculate your estimated travel distance and transport costs.
        </p>
        
        <SearchableSelect
          placeholder="Search by city, state, or country (e.g. New York, London, Delhi)..."
          items={locations}
          filterFn={filterLocations}
          onSelect={handleSelectLocation}
          onFocus={(e) => {
            if (!currentUser) {
              e.target.blur();
              navigate('/login', { state: { from: '/plan' } });
            }
          }}
          onClick={(e) => {
            if (!currentUser) {
              e.target.blur();
              navigate('/login', { state: { from: '/plan' } });
            }
          }}
          icon={Navigation}
          renderItem={(item) => (
            <>
              <div>
                <p className="font-bold text-charcoal">{item.name}</p>
                <p className="text-sm text-stone">{item.state}, {item.country}</p>
              </div>
            </>
          )}
        />

        {state.startingLocation && (
          <div className="mt-4 p-4 bg-sand/20 border border-bronze/30 rounded-xl flex items-center gap-3">
            <MapPin className="text-bronze" size={20} />
            <div>
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Starting From</p>
              <p className="font-bold text-charcoal text-lg">{state.startingLocation.name}</p>
              <p className="text-sm text-stone">{state.startingLocation.state}, {state.startingLocation.country}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
