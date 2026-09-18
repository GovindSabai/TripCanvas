import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { decodeTripState, calculateEstimatedTripCost } from '../utils/plannerUtils';

const TripPlannerContext = createContext(null);

const getInitialBookings = () => {
  const saved = localStorage.getItem('tripcanvas_bookings');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { return []; }
  }
  return [];
};

const initialState = {
  activeBookingId: null,
  savedBookings: getInitialBookings(),
  startingLocation: null,
  transportMode: 'standard',
  destinationMode: 'undecided', // 'india' | 'world' | 'multiple' | 'undecided'
  destinations: [], // { slug, name, isCatalogEntry }
  dates: { start: null, end: null, flexible: false },
  travelers: { type: 'solo', adults: 0, children: 0, infants: 0 },
  travelStyles: [],
  experienceInterests: [],
  budgetRange: '', // '<500' | '500-1000' | '1000-2500' | '2500-5000' | '5000+' | 'suggest'
  accommodationTier: null, // '$' | '$$' | '$$$'
  vehicleType: '', // 'sedan' | 'suv' | 'minivan' | 'minibus' | 'coach'
  itinerary: [], // { day, title, activities: [{ id, title, notes }] }
  specialRequests: '',
  contact: { name: '', email: '', phone: '', country: '' },
  finalizedTrip: null
};

function plannerReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_STATE':
      return { 
        ...state, 
        ...action.payload,
        savedBookings: state.savedBookings
      };
    case 'SET_STARTING_LOCATION':
      return { ...state, startingLocation: action.payload };
    case 'SET_TRANSPORT_MODE':
      return { ...state, transportMode: action.payload };
    case 'SET_VEHICLE_TYPE':
      return { ...state, vehicleType: action.payload };
    case 'SET_DESTINATION_MODE':
      return { ...state, destinationMode: action.payload };
    case 'ADD_DESTINATION':
      return { ...state, destinations: [...state.destinations, action.payload] };
    case 'REMOVE_DESTINATION':
      return { ...state, destinations: state.destinations.filter(d => d.name !== action.payload.name && d.slug !== action.payload.slug) };
    case 'SET_DESTINATIONS':
      return { ...state, destinations: action.payload };
    case 'SET_DATES':
      return { ...state, dates: { ...state.dates, ...action.payload } };
    case 'SET_TRAVELERS':
      return { ...state, travelers: { ...state.travelers, ...action.payload } };
    case 'TOGGLE_TRAVEL_STYLE': {
      const exists = state.travelStyles.includes(action.payload);
      return { 
        ...state, 
        travelStyles: exists 
          ? state.travelStyles.filter(s => s !== action.payload) 
          : [...state.travelStyles, action.payload] 
      };
    }
    case 'TOGGLE_EXPERIENCE_INTEREST': {
      const exists = state.experienceInterests.includes(action.payload);
      return { 
        ...state, 
        experienceInterests: exists 
          ? state.experienceInterests.filter(e => e !== action.payload) 
          : [...state.experienceInterests, action.payload] 
      };
    }
    case 'ADD_EXPERIENCE_INTEREST':
      if (state.experienceInterests.includes(action.payload)) return state;
      return { ...state, experienceInterests: [...state.experienceInterests, action.payload] };
    case 'SET_BUDGET':
      return { ...state, budgetRange: action.payload.range, accommodationTier: action.payload.tier };
    case 'SET_ITINERARY':
      return { ...state, itinerary: action.payload };
    case 'SET_CONTACT':
      return { ...state, contact: { ...state.contact, ...action.payload } };
    case 'FINISH_PLANNING': {
      const { finalizedTrip, ...snapshot } = state;
      return {
        ...initialState,
        activeBookingId: state.activeBookingId,
        savedBookings: state.savedBookings,
        finalizedTrip: snapshot
      };
    }
    case 'EDIT_BLUEPRINT': {
      if (!state.finalizedTrip) return state;
      return {
        ...state.finalizedTrip,
        finalizedTrip: null
      };
    }
    case 'SAVE_BOOKING': {
      const blueprint = state.finalizedTrip || state;
      const currentBookings = state.savedBookings || [];
      const newBooking = {
        id: state.activeBookingId || blueprint.activeBookingId || `TV-${Math.floor(10000 + Math.random() * 90000)}`,
        destination: blueprint.destinations?.length > 0 ? blueprint.destinations.map(d => d.name).join(', ') : 'Unknown Destination',
        dates: blueprint.dates?.start ? `${blueprint.dates.start} - ${blueprint.dates.end || '?'}` : 'Flexible',
        travelers: `${blueprint.travelers?.adults || 0} Adult${(blueprint.travelers?.adults || 0) > 1 ? 's' : ''}`,
        travelStyle: blueprint.travelStyles?.length > 0 ? blueprint.travelStyles[0] : 'Standard',
        status: 'Upcoming',
        price: calculateEstimatedTripCost(blueprint)?.estimatedTotal || 0
      };

      const existingIndex = currentBookings.findIndex(b => b.id === newBooking.id);
      let newBookings;
      if (existingIndex >= 0) {
        newBookings = [...currentBookings];
        newBookings[existingIndex] = newBooking;
      } else {
        newBookings = [...currentBookings, newBooking];
      }

      return { ...state, savedBookings: newBookings, activeBookingId: newBooking.id };
    }
    case 'SET_ACTIVE_BOOKING_ID':
      return { ...state, activeBookingId: action.payload };
    case 'CANCEL_BOOKING': {
      const newBookings = state.savedBookings.filter(b => b.id !== action.payload);
      localStorage.setItem('tripcanvas_bookings', JSON.stringify(newBookings));
      if (state.activeBookingId === action.payload) {
        localStorage.removeItem('tripcanvas_trip_draft');
        return { ...initialState, savedBookings: newBookings };
      }
      return { ...state, savedBookings: newBookings };
    }
    case 'DELETE_BLUEPRINT': {
      const newBookings = state.activeBookingId 
        ? state.savedBookings.filter(b => b.id !== state.activeBookingId)
        : state.savedBookings;
      localStorage.setItem('tripcanvas_bookings', JSON.stringify(newBookings));
      localStorage.removeItem('tripcanvas_trip_draft');
      return { ...initialState, savedBookings: newBookings };
    }
    case 'RESET_PLANNER':
      localStorage.removeItem('tripcanvas_trip_draft');
      return { ...initialState, savedBookings: state.savedBookings };
    default:
      return state;
  }
}

export const TripPlannerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);
  const location = useLocation();

  // Initialize from LocalStorage or URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sharedParam = params.get('shared');
    
    if (sharedParam) {
      const decoded = decodeTripState(sharedParam);
      if (decoded) {
        dispatch({ type: 'RESTORE_STATE', payload: decoded });
        return; // Don't overwrite with local storage if viewing a shared link
      }
    }

    const savedState = localStorage.getItem('tripcanvas_trip_draft');
    if (savedState) {
      try {
        dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(savedState) });
      } catch (e) {
        console.error('Failed to parse trip draft');
      }
    }

    // Process deep links
    const destParam = params.get('destination');
    if (destParam) {
      dispatch({ 
        type: 'ADD_DESTINATION', 
        payload: { slug: destParam, name: destParam, isCatalogEntry: true } 
      });
    }

    const expParam = params.get('experience');
    if (expParam) {
      // In a real app we'd map this slug to a category, but we'll add it as an interest
      dispatch({ type: 'ADD_EXPERIENCE_INTEREST', payload: expParam });
    }
  }, [location.search]);

  // Auto-save drafts to LocalStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('tripcanvas_trip_draft', JSON.stringify(state));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [state]);

  // Safely sync bookings to LocalStorage (pure reducer fix)
  useEffect(() => {
    if (state.savedBookings) {
      localStorage.setItem('tripcanvas_bookings', JSON.stringify(state.savedBookings));
    }
  }, [state.savedBookings]);

  return (
    <TripPlannerContext.Provider value={{ state, dispatch }}>
      {children}
    </TripPlannerContext.Provider>
  );
};

export const useTripPlanner = () => {
  const context = useContext(TripPlannerContext);
  if (!context) {
    throw new Error('useTripPlanner must be used within a TripPlannerProvider');
  }
  return context;
};
