import { calculateEstimatedTripCost, calculateLegDistances } from './src/utils/plannerUtils.js';

const draft = {
  startingLocation: { id: 'mumbai', name: 'Mumbai', city: 'Mumbai', state: 'Maharashtra', country: 'India', continent: 'Asia', lat: 19.0760, lng: 72.8777 },
  destinations: [
    { slug: 'uttarakhand', name: 'Uttarakhand', isCatalogEntry: false, basePrice: 150 }
  ],
  dates: { start: '2026-09-15', end: '2026-09-29', flexible: false },
  travelers: { type: 'solo', adults: 3, children: 2, infants: 1 },
  travelStyles: [],
  experienceInterests: [],
  budgetRange: '$$',
  accommodationTier: '$$',
  transportMode: 'standard'
};

console.log('--- TEST 1: Full correct data ---');
console.log(calculateEstimatedTripCost(draft));

console.log('--- TEST 2: No slug in destination ---');
const draftNoSlug = { ...draft, destinations: [{ name: 'Uttarakhand', isCatalogEntry: false, basePrice: 150 }] };
console.log(calculateEstimatedTripCost(draftNoSlug));

console.log('--- TEST 3: Invalid start location lat/lng ---');
const draftBadStart = { ...draft, startingLocation: { name: 'Mumbai' } };
console.log(calculateEstimatedTripCost(draftBadStart));
