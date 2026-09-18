import React from 'react';
import { useTripPlanner } from '../../../context/TripPlannerContext';
import { EXPERIENCE_CATEGORIES } from '../../../data/experiences';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ExperienceStep() {
  const { state, dispatch } = useTripPlanner();

  const toggleExperience = (exp) => {
    dispatch({ type: 'TOGGLE_EXPERIENCE_INTEREST', payload: exp });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-stone">What activities make your perfect trip?</p>
        <Link 
          to="/experiences" 
          target="_blank"
          className="flex items-center gap-1.5 text-sm font-bold text-bronze hover:text-bronzeLight transition-colors"
        >
          Browse Catalog <ExternalLink size={14} />
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {EXPERIENCE_CATEGORIES.map(category => {
          const isSelected = state.experienceInterests.includes(category);
          return (
            <button
              key={category}
              onClick={() => toggleExperience(category)}
              className={`px-5 py-3 rounded-full font-medium transition-all ${
                isSelected 
                  ? 'bg-charcoal text-ivory shadow-md transform scale-105' 
                  : 'bg-white border border-stone/20 text-stone hover:border-bronze/50 hover:text-charcoal'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {state.experienceInterests.length > 0 && (
        <div className="mt-8 p-4 bg-sand/10 rounded-xl border border-stone/10">
          <p className="text-sm text-stone/80">
            <strong>Pro Tip:</strong> We'll use these interests to automatically suggest specific bookable experiences in your final itinerary.
          </p>
        </div>
      )}
    </div>
  );
}
