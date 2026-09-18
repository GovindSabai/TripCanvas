import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { calculateEstimatedTripCost, encodeTripState } from '../../utils/plannerUtils';
import { Calendar, Users, MapPin, Share2, Navigation, Route, ChevronDown } from 'lucide-react';
import { Toast } from '../ui/Toast';

export function TripSummary() {
  const { state } = useTripPlanner();
  const [toastMessage, setToastMessage] = useState(null);
  const [routeExpanded, setRouteExpanded] = useState(false);

  const est = calculateEstimatedTripCost(state);

  const handleShare = () => {
    const encoded = encodeTripState(state);
    const url = `${window.location.origin}/plan?shared=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastMessage("Link copied to clipboard!");
    });
  };

  const totalDistance = est ? est.legs.reduce((acc, leg) => acc + leg.km, 0) : 0;

  return (
    <div className="sticky top-[140px] bg-white rounded-2xl shadow-sm border border-stone/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif font-bold text-2xl text-charcoal">Your Trip</h3>
        <button 
          onClick={handleShare}
          className="p-2 text-stone hover:text-bronze hover:bg-sand/20 rounded-full transition-colors"
          title="Share Trip"
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {!state.startingLocation && (
          <div className="p-3 bg-sand/10 rounded-xl border border-stone/10 text-sm text-stone italic">
            Select your starting location to calculate your estimated journey distance.
          </div>
        )}

        {state.startingLocation && (
          <div className="flex gap-3 items-start">
            <Navigation size={18} className="text-bronze mt-1 shrink-0" />
            <div>
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">From</p>
              <p className="font-medium text-charcoal leading-snug">
                {state.startingLocation.name}
              </p>
            </div>
          </div>
        )}

        {state.destinations.length > 0 && (
          <div className="flex gap-3 items-start">
            <MapPin size={18} className="text-bronze mt-1 shrink-0" />
            <div>
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">To</p>
              <p className="font-medium text-charcoal leading-snug">
                {state.destinations.map(d => d.name).join(', ')}
              </p>
            </div>
          </div>
        )}

        {est && est.legs.length > 0 && (
          <div className="flex gap-3 items-start">
            <Route size={18} className="text-bronze mt-1 shrink-0" />
            <div className="w-full">
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Distance</p>
              <div className="flex items-center justify-between">
                <p className="font-medium text-charcoal leading-snug">
                  ~{totalDistance.toLocaleString()} km
                </p>
                {est.legs.length > 1 && (
                  <button 
                    onClick={() => setRouteExpanded(!routeExpanded)}
                    className="text-xs text-bronze hover:text-bronzeLight flex items-center gap-1 font-bold"
                  >
                    View route <ChevronDown size={14} className={`transform transition-transform ${routeExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              
              {routeExpanded && est.legs.length > 1 && (
                <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-sand">
                  {est.legs.map((leg, i) => (
                    <div key={i} className="text-xs text-stone flex justify-between">
                      <span>{leg.from.name} → {leg.to.name}</span>
                      <span>~{leg.km.toLocaleString()} km</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {(state.dates.start || state.dates.flexible) && (
          <div className="flex gap-3 items-start">
            <Calendar size={18} className="text-bronze mt-1 shrink-0" />
            <div>
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">When</p>
              <p className="font-medium text-charcoal leading-snug">
                {state.dates.flexible ? "Flexible Dates" : `${state.dates.start} ${state.dates.end ? `to ${state.dates.end}` : ''}`}
                {est && !state.dates.flexible && est.nights > 1 && ` (${est.nights} nights)`}
              </p>
            </div>
          </div>
        )}

        {state.travelers.adults > 0 && (
          <div className="flex gap-3 items-start">
            <Users size={18} className="text-bronze mt-1 shrink-0" />
            <div>
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Who</p>
              <p className="font-medium text-charcoal leading-snug">
                {state.travelers.adults} Adults
                {state.travelers.children > 0 && `, ${state.travelers.children} Children`}
                {state.travelers.infants > 0 && `, ${state.travelers.infants} Infants`}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-stone/10">
        <p className="text-sm font-bold text-stone uppercase tracking-wider mb-2">Estimated Cost</p>
        
        {!est ? (
          <div className="p-4 bg-sand/10 rounded-xl border border-stone/10">
            <p className="text-sm text-stone">We can't calculate an estimate for this selection yet. Please adjust your travel details.</p>
          </div>
        ) : (
          <>
            <div className="flex items-end gap-1">
              <span className="text-3xl font-serif font-bold text-charcoal">
                ${est.low.toLocaleString()}
              </span>
              <span className="text-xl text-stone mb-1">-</span>
              <span className="text-3xl font-serif font-bold text-charcoal">
                ${est.high.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-stone mt-2">
              *Estimate based on {est.nights} nights, {state.transportMode} transport{state.vehicleType ? ` (${state.vehicleType})` : ''}, {state.accommodationTier || '$$'} accommodation, and selected preferences.
            </p>
          </>
        )}
      </div>

      <Toast 
        isVisible={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
