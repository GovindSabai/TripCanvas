import { TRANSPORT_RATES, TRANSPORT_MODE_MULTIPLIER } from '../data/pricingConfig';
import { destinations as catalogDestinations } from '../data/destinations';

export const haversineDistanceKm = (a, b) => {
  if (!a || !b || a.lat == null || a.lng == null || b.lat == null || b.lng == null) return null;
  const R = 6371; // Earth's radius in km
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;

  const aVal = Math.sin(dLat/2) * Math.sin(dLat/2) +
               Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1-aVal));
  const d = R * c;
  
  return Math.round(d / 10) * 10;
};

export const calculateLegDistances = (startLocation, destinations) => {
  if (!startLocation || !destinations || destinations.length === 0) return [];
  
  let legs = [];
  let current = startLocation;
  
  for (const dest of destinations) {
    let targetDest = { ...dest };
    if (targetDest.lat == null || targetDest.lng == null) {
      const catalogEntry = catalogDestinations.find(d => d.slug === dest.slug);
      if (catalogEntry && catalogEntry.lat != null) {
        targetDest = { ...targetDest, lat: catalogEntry.lat, lng: catalogEntry.lng, country: catalogEntry.country };
      }
    }
    
    // If we still don't have coordinates, fallback gracefully so we don't break the whole app
    if (current.lat == null || targetDest.lat == null) {
      legs.push({ from: current, to: targetDest, km: 0 });
    } else {
      const km = haversineDistanceKm(current, targetDest);
      legs.push({ from: current, to: targetDest, km: km || 0 });
    }
    
    current = targetDest;
  }
  
  return legs;
};

export const calculateEstimatedTripCost = (draft) => {
  if (!draft.destinations || draft.destinations.length === 0) return null;
  
  const startLoc = draft.startingLocation || { lat: 0, lng: 0, country: 'Unknown' };
  const legs = calculateLegDistances(startLoc, draft.destinations);

  let nights = 1;
  if (draft.dates && draft.dates.start && draft.dates.end) {
    const start = new Date(draft.dates.start);
    const end = new Date(draft.dates.end);
    const diffTime = Math.abs(end - start);
    nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  const t = draft.travelers || {};
  const adults = t.adults !== undefined ? t.adults : 0;
  const children = t.children || 0;
  const infants = t.infants || 0;
  const totalTravelers = Math.max(1, adults + (children * 0.5) + (infants * 0.5));

  // Base Cost
  let baseCost = 0;
  if (draft.destinations.length > 0) {
    let avgBasePrice = 0;
    for (const dest of draft.destinations) {
      avgBasePrice += (dest.basePrice || 80);
    }
    avgBasePrice = avgBasePrice / draft.destinations.length;
    baseCost = avgBasePrice * nights;
  }
  
  let styleMultiplier = 1.0;
  if (draft.travelStyles) {
    if (draft.travelStyles.includes('Luxury Getaways') || draft.travelStyles.includes('City Breaks')) {
      styleMultiplier = 1.4;
    } else if (draft.travelStyles.includes('Slow Travel') || draft.travelStyles.includes('Hidden Gems')) {
      styleMultiplier = 0.9;
    }
  }

  let accMultiplier = 1.0; // default $$
  if (draft.accommodationTier === '$') accMultiplier = 0.8;
  if (draft.accommodationTier === '$$$') accMultiplier = 1.6;

  baseCost = baseCost * totalTravelers * styleMultiplier * accMultiplier;

  // Transport Cost
  let transportCost = 0;
  const transportMode = draft.transportMode || 'standard';
  const modeMult = TRANSPORT_MODE_MULTIPLIER[transportMode];

  for (const leg of legs) {
    const isDomestic = leg.from.country === leg.to.country;
    const rate = isDomestic ? TRANSPORT_RATES.domestic : TRANSPORT_RATES.international;
    transportCost += leg.km * rate * modeMult * totalTravelers;
  }

  // Experience Cost
  const experienceCost = (draft.experienceInterests ? draft.experienceInterests.length : 0) * 25 * totalTravelers;

  const estimatedTotal = baseCost + transportCost + experienceCost;
  
  return {
    breakdown: { baseCost, transportCost, experienceCost },
    estimatedTotal: Math.round(estimatedTotal),
    low: Math.round(estimatedTotal * 0.85),
    high: Math.round(estimatedTotal * 1.15),
    nights,
    totalTravelers,
    legs
  };
};

export const calculateProgress = (draft) => {
  const requirements = [
    draft.startingLocation !== null,
    draft.destinations && draft.destinations.length > 0,
    draft.dates && (draft.dates.start || draft.dates.flexible),
    draft.travelers && draft.travelers.adults > 0,
    draft.travelStyles && draft.travelStyles.length > 0,
    draft.budgetRange && draft.budgetRange !== ''
    // Experience interests were technically step 5 but the prompt said 6 required fields
  ];
  const completed = requirements.filter(Boolean).length;
  return Math.round((completed / requirements.length) * 100);
};

export const encodeTripState = (draft) => {
  try {
    const compactState = {
      sl: draft.startingLocation ? draft.startingLocation.id : null,
      d: draft.destinations.map(d => d.slug || d.name),
      ds: draft.dates.start,
      de: draft.dates.end,
      t: draft.travelers,
      s: draft.travelStyles,
      e: draft.experienceInterests,
      b: draft.budgetRange,
      tm: draft.transportMode
    };
    return btoa(JSON.stringify(compactState));
  } catch (e) {
    return '';
  }
};

export const decodeTripState = (encodedStr) => {
  try {
    const parsed = JSON.parse(atob(encodedStr));
    return {
      startingLocation: parsed.sl ? { id: parsed.sl } : null, // Not fully reconstructed, but enough for UI usually, though best if populated from locations list via context init
      destinations: parsed.d ? parsed.d.map(name => ({ name, isCatalogEntry: true })) : [],
      dates: { start: parsed.ds || null, end: parsed.de || null, flexible: !parsed.ds },
      travelers: parsed.t || { type: 'solo', adults: 0, children: 0, infants: 0 },
      travelStyles: parsed.s || [],
      experienceInterests: parsed.e || [],
      budgetRange: parsed.b || '',
      transportMode: parsed.tm || 'standard'
    };
  } catch (e) {
    return null;
  }
};
