import React from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { Timeline } from '../ui/Timeline';

export function TripMap() {
  const { state } = useTripPlanner();
  const displayState = state.finalizedTrip || state;

  if (displayState.destinations.length === 0) return null;

  const startingPoint = displayState.startingLocation ? displayState.startingLocation.name : '';
  const waypoints = displayState.destinations.map(d => d.name);

  // Construct Google Maps embed URL
  let mapUrl = '';
  if (startingPoint && waypoints.length > 0) {
    const daddr = waypoints.join('+to:');
    mapUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(startingPoint)}&daddr=${encodeURIComponent(daddr)}&output=embed`;
  } else if (waypoints.length > 0) {
    if (waypoints.length > 1) {
      const saddr = waypoints[0];
      const daddr = waypoints.slice(1).join('+to:');
      mapUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(saddr)}&daddr=${encodeURIComponent(daddr)}&output=embed`;
    } else {
      mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(waypoints[0])}&output=embed`;
    }
  }

  const timelineItems = displayState.destinations.map((d, index) => ({
    id: `dest-${index}`,
    title: d.name,
    description: `Stop ${index + 1} on your journey.`
  }));

  if (startingPoint) {
    timelineItems.unshift({
      id: 'start',
      title: startingPoint,
      description: 'Your starting location.'
    });
  }

  return (
    <div className="py-20 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3">
            <h2 className="text-4xl font-serif font-bold text-charcoal mb-6">Your Route</h2>
            <p className="text-stone mb-8">
              A quick overview of the destinations you've selected for this trip.
            </p>
            <div className="block lg:hidden mb-8">
              <Timeline items={timelineItems} />
            </div>
            <div className="hidden lg:block">
              <Timeline items={timelineItems} />
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            {mapUrl ? (
              <div className="rounded-2xl overflow-hidden border border-stone/10 shadow-sm relative h-64 sm:h-[400px]">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={mapUrl}
                  allowFullScreen
                  title="Trip Map Route"
                ></iframe>
              </div>
            ) : (
              <div className="h-64 sm:h-80 bg-sand/20 rounded-2xl flex items-center justify-center border border-stone/10">
                <p className="text-stone font-medium">Map overview not available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
