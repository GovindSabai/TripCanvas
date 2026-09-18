import React, { useEffect, useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { calculateEstimatedTripCost } from '../../utils/plannerUtils';
import { Reorder } from 'framer-motion';
import { GripVertical } from 'lucide-react';

export function ItineraryBuilder() {
  const { state, dispatch } = useTripPlanner();
  const displayState = state.finalizedTrip || state;
  const [localItinerary, setLocalItinerary] = useState([]);
  
  const est = calculateEstimatedTripCost(displayState);
  const nights = est ? est.nights : 1;
  const totalDays = nights + 1; // e.g. 5 nights = 6 days

  const getDayActivity = (dayIndex, total) => {
    if (dayIndex === 0) return "Arrive and check into your accommodation. Spend the evening exploring the local neighborhood and enjoying a welcome dinner.";
    if (dayIndex === total - 1) return "Enjoy a final breakfast and some last-minute souvenir shopping before heading to the airport for your departure.";
    
    const activities = [
      "Guided city tour and visiting major landmarks.",
      "A day dedicated to nature exploration and scenic hikes.",
      "Culinary tour and tasting local delicacies.",
      "Relaxation day with spa or beach time.",
      "Cultural immersion visiting museums and historical sites.",
      "Adventure activities and outdoor excursions."
    ];
    return activities[(dayIndex - 1) % activities.length];
  };

  useEffect(() => {
    // Generate empty days if itinerary is not set or length changed, or if it's the old empty format
    const isOldFormat = displayState.itinerary.length > 0 && displayState.itinerary[0].title === 'Arrival';
    if (displayState.itinerary.length !== totalDays || isOldFormat) {
      const generated = Array.from({ length: totalDays }).map((_, i) => ({
        id: `day-${i + 1}`,
        day: i + 1,
        title: i === 0 ? 'Arrival & Welcome' : i === totalDays - 1 ? 'Departure' : `Day ${i + 1}: Exploration`,
        notes: getDayActivity(i, totalDays)
      }));
      setLocalItinerary(generated);
      dispatch({ type: 'SET_ITINERARY', payload: generated });
    } else {
      setLocalItinerary(displayState.itinerary);
    }
  }, [totalDays]);

  const handleReorder = (newOrder) => {
    setLocalItinerary(newOrder);
    dispatch({ type: 'SET_ITINERARY', payload: newOrder });
  };

  const updateDayTitle = (id, newTitle) => {
    const updated = localItinerary.map(day => 
      day.id === id ? { ...day, title: newTitle } : day
    );
    setLocalItinerary(updated);
    dispatch({ type: 'SET_ITINERARY', payload: updated });
  };

  const updateDayNotes = (id, newNotes) => {
    const updated = localItinerary.map(day => 
      day.id === id ? { ...day, notes: newNotes } : day
    );
    setLocalItinerary(updated);
    dispatch({ type: 'SET_ITINERARY', payload: updated });
  };

  if (totalDays <= 1) return null;

  return (
    <div className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
            Make it yours
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
            Draft Your Itinerary
          </h2>
          <p className="text-stone">
            Drag and drop to rearrange your days, or click to edit the titles and activities. This is just a starting point!
          </p>
        </div>

        <Reorder.Group axis="y" values={localItinerary} onReorder={handleReorder} className="space-y-4">
          {localItinerary.map((item) => (
            <ItineraryDay 
              key={item.id} 
              item={item} 
              onTitleChange={(title) => updateDayTitle(item.id, title)} 
              onNotesChange={(notes) => updateDayNotes(item.id, notes)}
            />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}

function ItineraryDay({ item, onTitleChange, onNotesChange }) {
  return (
    <Reorder.Item 
      value={item}
      id={item.id}
      className="bg-ivory border border-stone/10 rounded-xl p-4 md:p-6 flex gap-4 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mt-2 hidden sm:block">
        <GripVertical className="text-stone/40 shrink-0" />
      </div>
      
      <div className="flex-grow flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="bg-bronze/10 text-bronze font-bold px-3 py-1 rounded-lg text-sm shrink-0 w-fit">
            Day {item.day}
          </div>
          <input 
            type="text" 
            value={item.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-transparent border-b border-transparent hover:border-stone/20 focus:border-bronze focus:outline-none font-serif text-xl font-bold text-charcoal flex-grow transition-colors"
            placeholder="What's the plan?"
          />
        </div>
        <textarea
          value={item.notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add your notes, activities, or flight details here..."
          className="w-full bg-white/60 border border-stone/10 rounded-lg p-3 text-stone focus:outline-none focus:border-bronze/50 focus:bg-white transition-all resize-y min-h-[80px] text-sm"
        />
      </div>
    </Reorder.Item>
  );
}
