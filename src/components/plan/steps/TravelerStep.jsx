import React from 'react';
import { useTripPlanner } from '../../../context/TripPlannerContext';
import { User, Users, Heart, Baby, Minus, Plus } from 'lucide-react';

const types = [
  { id: 'solo', label: 'Solo', icon: User },
  { id: 'couple', label: 'Couple', icon: Heart },
  { id: 'family', label: 'Family', icon: Baby },
  { id: 'group', label: 'Group', icon: Users }
];

export function TravelerStep() {
  const { state, dispatch } = useTripPlanner();
  const { travelers } = state;

  const handleTypeChange = (typeId) => {
    let newTravelers = { ...travelers, type: typeId };
    
    // Auto-adjust counts based on type selection for convenience
    if (typeId === 'solo') newTravelers = { ...newTravelers, adults: 1, children: 0, infants: 0 };
    if (typeId === 'couple') newTravelers = { ...newTravelers, adults: 2, children: 0, infants: 0 };
    if (typeId === 'family' && travelers.adults < 2) newTravelers = { ...newTravelers, adults: 2, children: 2 };
    if (typeId === 'group' && travelers.adults < 4) newTravelers = { ...newTravelers, adults: 4 };

    dispatch({ type: 'SET_TRAVELERS', payload: newTravelers });
  };

  const updateCount = (field, delta) => {
    const newValue = Math.max(0, travelers[field] + delta);
    dispatch({ type: 'SET_TRAVELERS', payload: { [field]: newValue } });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {types.map(type => {
          const Icon = type.icon;
          const isSelected = travelers.type === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                isSelected 
                  ? 'border-bronze bg-sand/20' 
                  : 'border-stone/20 hover:border-bronze/50 hover:bg-sand/10'
              }`}
            >
              <Icon size={24} className={isSelected ? 'text-bronze' : 'text-stone'} />
              <span className={`font-medium text-sm ${isSelected ? 'text-charcoal' : 'text-stone'}`}>
                {type.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-sand/10 border border-stone/10 rounded-2xl p-6 md:p-8 space-y-8">
        <Stepper 
          title="Adults" 
          subtitle="Age 12+" 
          value={travelers.adults} 
          onChange={(delta) => updateCount('adults', delta)} 
          min={0}
        />
        <div className="border-t border-stone/20" />
        <Stepper 
          title="Children" 
          subtitle="Age 2-11" 
          value={travelers.children} 
          onChange={(delta) => updateCount('children', delta)} 
        />
        <div className="border-t border-stone/20" />
        <Stepper 
          title="Infants" 
          subtitle="Under 2" 
          value={travelers.infants} 
          onChange={(delta) => updateCount('infants', delta)} 
        />
      </div>
    </div>
  );
}

function Stepper({ title, subtitle, value, onChange, min = 0 }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-bold text-lg text-charcoal">{title}</h4>
        <p className="text-sm text-stone">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4 bg-white border border-stone/20 rounded-full p-1 shadow-sm">
        <button 
          onClick={() => onChange(-1)}
          disabled={value <= min}
          className="w-10 h-10 rounded-full flex items-center justify-center text-charcoal hover:bg-sand/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Minus size={18} />
        </button>
        <span className="w-6 text-center font-bold text-lg">{value}</span>
        <button 
          onClick={() => onChange(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-charcoal hover:bg-sand/30 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
