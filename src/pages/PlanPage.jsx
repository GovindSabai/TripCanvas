import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTripPlanner } from '../context/TripPlannerContext';

import { PlanTripHero } from '../components/plan/PlanTripHero';
import { PlannerProgress } from '../components/plan/PlannerProgress';
import { TripPlanner } from '../components/plan/TripPlanner';
import { TripSummary } from '../components/plan/TripSummary';
import { RecommendationSection } from '../components/plan/RecommendationSection';
import { TripMap } from '../components/plan/TripMap';
import { ItineraryBuilder } from '../components/plan/ItineraryBuilder';
import { TripReview } from '../components/plan/TripReview';
import { ContactForm } from '../components/plan/ContactForm';
import { TravelQuiz } from '../components/plan/TravelQuiz';
import { TravelInspiration } from '../components/plan/TravelInspiration';
import { SectionReveal } from '../components/ui/SectionReveal';

export default function PlanPage() {
  const { state, dispatch } = useTripPlanner();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.updateBooking) {
      const booking = location.state.updateBooking;
      
      if (booking.blueprint) {
        dispatch({ type: 'RESTORE_STATE', payload: booking.blueprint });
        dispatch({ type: 'SET_ACTIVE_BOOKING_ID', payload: booking.id });
      } else {
        // Fallback for old bookings
        dispatch({ 
          type: 'SET_DESTINATIONS', 
          payload: [{ name: booking.destination, slug: booking.destination.toLowerCase(), isCatalogEntry: false }] 
        });

        if (booking.dates && booking.dates.includes(' - ')) {
          const parts = booking.dates.split(' - ');
          dispatch({
            type: 'SET_DATES',
            payload: { start: parts[0], end: parts[1] }
          });
        }

        const adultsMatch = booking.travelers && booking.travelers.match(/(\d+)\s+Adult/i);
        if (adultsMatch) {
          dispatch({ type: 'SET_TRAVELERS', payload: { type: 'group', adults: parseInt(adultsMatch[1], 10), children: 0, infants: 0 } });
        }

        if (booking.travelStyle) {
          dispatch({ type: 'TOGGLE_TRAVEL_STYLE', payload: booking.travelStyle });
        }
        
        if (booking.id) {
          dispatch({ type: 'SET_ACTIVE_BOOKING_ID', payload: booking.id });
        }
      }

      // Automatically finalize it so it goes straight to the Blueprint view
      dispatch({ type: 'FINISH_PLANNING' });

      // Scroll to review section
      setTimeout(() => {
        const el = document.getElementById('review-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);

      // Clear the state so it doesn't loop or re-trigger on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, dispatch]);

  return (
    <div className="bg-ivory min-h-screen">
      <PlanTripHero />
      
      <div id="planner-section" className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-12 relative">
        <PlannerProgress />
        
        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          <div className="w-full lg:w-2/3">
            <TripPlanner />
          </div>
          <div className="w-full lg:w-1/3">
            <TripSummary />
          </div>
        </div>
      </div>

      <SectionReveal>
        <TravelQuiz />
      </SectionReveal>

      <SectionReveal>
        <RecommendationSection />
      </SectionReveal>

      {(state.finalizedTrip || state.destinations.length > 0) ? (
        <>
          <SectionReveal>
            <TripMap />
          </SectionReveal>

          <SectionReveal>
            <ItineraryBuilder />
          </SectionReveal>

          <SectionReveal>
            <TripReview />
          </SectionReveal>
        </>
      ) : null}

      <SectionReveal>
        <ContactForm />
      </SectionReveal>

      <SectionReveal>
        <TravelInspiration />
      </SectionReveal>
    </div>
  );
}
