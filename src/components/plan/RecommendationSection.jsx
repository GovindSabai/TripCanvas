import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { DestinationCard } from '../ui/DestinationCard';
import { ExperienceCard } from '../ui/ExperienceCard';
import { useAdminData } from '../../context/AdminDataContext';

export function RecommendationSection() {
  const { state } = useTripPlanner();
  const { getPublicDestinations, getPublicExperiences } = useAdminData();
  const destinations = getPublicDestinations();
  const experiences = getPublicExperiences();
  const displayState = state.finalizedTrip || state;

  // Simple recommendation algorithm
  const getRecommendedDestinations = () => {
    // If they picked India, show India dests. If world, show world.
    let possible = destinations;
    if (displayState.destinationMode === 'india') {
      possible = possible.filter(d => d.country === 'India');
    } else if (displayState.destinationMode === 'world') {
      possible = possible.filter(d => d.country !== 'India');
    }

    // Filter by style if they selected any
    if (displayState.travelStyles.length > 0) {
      // Find destinations that match any of the selected styles
      possible = possible.filter(d => 
        d.travelStyles && d.travelStyles.some(s => displayState.travelStyles.includes(s))
      );
    }

    return possible.slice(0, 3);
  };

  const getRecommendedExperiences = () => {
    let possible = experiences;
    
    // Filter by destination if they selected any
    if (displayState.destinations.length > 0) {
      const destNames = displayState.destinations.map(d => d.name.toLowerCase());
      possible = possible.filter(e => 
        destNames.includes(e.destination.toLowerCase()) || 
        destNames.includes(e.country.toLowerCase())
      );
    }

    // Filter by category
    if (displayState.experienceInterests.length > 0) {
      possible = possible.filter(e => displayState.experienceInterests.includes(e.category));
    }

    return possible.slice(0, 3);
  };

  const recDests = getRecommendedDestinations();
  const recExps = getRecommendedExperiences();

  if (recDests.length === 0 && recExps.length === 0) {
    return null; // Not enough data to recommend yet
  }

  return (
    <div className="py-20 bg-sand/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <div className="text-center mb-12">
          <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
            Curated For You
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            Our Recommendations
          </h2>
          <p className="text-stone max-w-2xl mx-auto">
            Based on your preferences, we think you'll love these hand-picked options.
          </p>
        </div>

        {recDests.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 border-b border-stone/10 pb-2">
              Suggested Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recDests.map((dest, i) => (
                <DestinationCard key={dest.slug || i} item={dest} />
              ))}
            </div>
          </div>
        )}

        {recExps.length > 0 && (
          <div>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6 border-b border-stone/10 pb-2">
              Experiences You'll Love
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recExps.map(exp => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
