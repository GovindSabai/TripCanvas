import React from 'react';
import { useTripPlanner } from '../../../context/TripPlannerContext';

const budgetRanges = [
  { id: '<500', label: 'Under $500', desc: 'Per person' },
  { id: '500-1000', label: '$500 - $1,000', desc: 'Per person' },
  { id: '1000-2500', label: '$1,000 - $2,500', desc: 'Per person' },
  { id: '2500-5000', label: '$2,500 - $5,000', desc: 'Per person' },
  { id: '5000+', label: '$5,000+', desc: 'Per person' },
  { id: 'suggest', label: 'Suggest a Budget', desc: 'Based on choices' }
];

const accTiers = [
  { id: '$', label: 'Comfortable', desc: '3-star hotels & boutique guesthouses' },
  { id: '$$', label: 'Premium', desc: '4-star hotels & upscale resorts' },
  { id: '$$$', label: 'Luxury', desc: '5-star hotels & exclusive properties' }
];

const transportModes = [
  { id: 'standard', label: 'Standard', desc: 'Economy flights, public transit, standard cars' },
  { id: 'comfort', label: 'Comfort', desc: 'Premium economy, first-class trains, comfortable SUVs' },
  { id: 'premium', label: 'Premium', desc: 'Business/First class flights, private transfers, luxury vehicles' }
];

const vehicleTypes = [
  { id: 'sedan', label: 'Sedan (1-3 Pax)', desc: 'Comfortable for small groups or couples.' },
  { id: 'suv', label: 'SUV (4-6 Pax)', desc: 'Spacious for families or extra luggage.' },
  { id: 'minivan', label: 'Minivan / Innova (6-7 Pax)', desc: 'Ideal for larger families or groups.' },
  { id: 'minibus', label: 'Minibus / Tempo (9-15 Pax)', desc: 'Perfect for small tours or large groups.' },
  { id: 'coach', label: 'Coach / Bus (15+ Pax)', desc: 'Large groups, school trips, or corporate travel.' }
];


export function BudgetStep() {
  const { state, dispatch } = useTripPlanner();

  const handleBudgetSelect = (rangeId) => {
    // Keep current tier, or default to $$ if not set
    const tier = state.accommodationTier || '$$';
    dispatch({ type: 'SET_BUDGET', payload: { range: rangeId, tier } });
  };

  const handleTierSelect = (tierId) => {
    // Keep current range, or suggest if not set
    const range = state.budgetRange || 'suggest';
    dispatch({ type: 'SET_BUDGET', payload: { range, tier: tierId } });
  };

  const handleTransportModeSelect = (modeId) => {
    dispatch({ type: 'SET_TRANSPORT_MODE', payload: modeId });
  };

  const handleVehicleTypeSelect = (vehicleId) => {
    dispatch({ type: 'SET_VEHICLE_TYPE', payload: vehicleId });
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h4 className="font-bold text-lg text-charcoal mb-4">Total Budget (Excluding Flights)</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {budgetRanges.map(range => {
            const isSelected = state.budgetRange === range.id;
            return (
              <button
                key={range.id}
                onClick={() => handleBudgetSelect(range.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'border-bronze bg-bronze/5 text-charcoal' 
                    : 'border-stone/20 bg-white hover:border-bronze/40 text-stone hover:text-charcoal'
                }`}
              >
                <div className="font-bold">{range.label}</div>
                <div className="text-xs opacity-80 mt-1">{range.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-stone/10" />

      <div>
        <h4 className="font-bold text-lg text-charcoal mb-4">Accommodation Preference</h4>
        <div className="flex flex-col gap-3">
          {accTiers.map(tier => {
            const isSelected = state.accommodationTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => handleTierSelect(tier.id)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  isSelected 
                    ? 'border-bronze bg-bronze/5 text-charcoal' 
                    : 'border-stone/20 bg-white hover:border-bronze/40 text-stone hover:text-charcoal'
                }`}
              >
                <div>
                  <div className="font-bold text-left">{tier.label}</div>
                  <div className="text-sm opacity-80">{tier.desc}</div>
                </div>
                <div className={`font-serif font-bold text-xl ${isSelected ? 'text-bronze' : 'text-stone/50'}`}>
                  {tier.id}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-stone/10" />

      <div>
        <h4 className="font-bold text-lg text-charcoal mb-4">Transport Mode</h4>
        <div className="flex flex-col gap-3">
          {transportModes.map(mode => {
            const isSelected = state.transportMode === mode.id || (!state.transportMode && mode.id === 'standard');
            return (
              <button
                key={mode.id}
                onClick={() => handleTransportModeSelect(mode.id)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  isSelected 
                    ? 'border-bronze bg-bronze/5 text-charcoal' 
                    : 'border-stone/20 bg-white hover:border-bronze/40 text-stone hover:text-charcoal'
                }`}
              >
                <div>
                  <div className="font-bold text-left">{mode.label}</div>
                  <div className="text-sm opacity-80">{mode.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-bronze' : 'border-stone/30'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-bronze" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-stone/10" />

      <div>
        <h4 className="font-bold text-lg text-charcoal mb-4">Vehicle Preference</h4>
        <div className="flex flex-col gap-3">
          {vehicleTypes.map(vehicle => {
            const isSelected = state.vehicleType === vehicle.id;
            return (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleTypeSelect(vehicle.id)}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  isSelected 
                    ? 'border-bronze bg-bronze/5 text-charcoal' 
                    : 'border-stone/20 bg-white hover:border-bronze/40 text-stone hover:text-charcoal'
                }`}
              >
                <div>
                  <div className="font-bold text-left">{vehicle.label}</div>
                  <div className="text-sm opacity-80">{vehicle.desc}</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-bronze' : 'border-stone/30'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-bronze" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
