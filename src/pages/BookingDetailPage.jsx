import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, Briefcase, Heart, DollarSign, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { useTripPlanner } from '../context/TripPlannerContext';

export default function BookingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { bookings } = useAdminData();
  const { state } = useTripPlanner();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Try to find booking in AuthContext (hardcoded/synced ones)
    let found = bookings?.find(b => b.id === id);
    
    // If not found, try to find in TripPlannerContext (recently created ones)
    if (!found) {
      found = state.savedBookings?.find(b => b.id === id);
    }

    setBooking(found);
  }, [id, currentUser, bookings, state.savedBookings, navigate]);

  if (!currentUser || !booking) {
    return (
      <div className="min-h-screen pt-32 px-5 bg-stone/5 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-serif text-charcoal mb-4">Booking not found</h2>
        <button 
          onClick={() => navigate('/profile')}
          className="text-bronze font-bold hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Return to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-5 bg-stone/5">
      <div className="max-w-[800px] mx-auto">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-stone/50 hover:text-charcoal transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Profile
        </button>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-stone/10">
            <div>
              <span className="inline-block px-3 py-1 bg-bronze/10 text-bronze text-xs font-bold tracking-wider uppercase rounded-full mb-3">
                {booking.status}
              </span>
              <h1 className="text-4xl font-serif font-bold text-charcoal">Trip Details</h1>
            </div>
            <div className="bg-stone/5 px-6 py-4 rounded-xl border border-stone/10 text-center md:text-right">
              <p className="text-xs font-bold text-stone uppercase tracking-wider mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-charcoal">{booking.id}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-stone/5 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-stone" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Destination</p>
                <p className="text-xl font-medium text-charcoal">{booking.destination || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-stone/5 flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-stone" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Dates</p>
                <p className="text-xl font-medium text-charcoal">{booking.dates || 'Flexible'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-stone/5 flex items-center justify-center shrink-0">
                <Users size={20} className="text-stone" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Travelers</p>
                <p className="text-xl font-medium text-charcoal">{booking.travelers || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-stone/5 flex items-center justify-center shrink-0">
                <Briefcase size={20} className="text-stone" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Travel Style</p>
                <p className="text-xl font-medium text-charcoal">{booking.travelStyle || 'Not specified'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-stone/5 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-stone" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Next Steps</p>
                <p className="text-lg text-charcoal">Our travel designers are reviewing your preferences. We will reach out to you shortly to finalize your itinerary.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-stone/10">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">Price Breakdown</h3>
            
            {booking.blueprint ? (
              (() => {
                const breakdownCost = calculateEstimatedTripCost(booking.blueprint);
                if (!breakdownCost) return <p className="text-stone">Detailed breakdown not available.</p>;
                return (
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-stone p-3 bg-stone/5 rounded-lg">
                      <span>Base Accommodation & Style</span>
                      <span className="font-medium text-charcoal">${Math.round(breakdownCost.breakdown.baseCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone p-3 bg-stone/5 rounded-lg">
                      <span>Transport & Routes</span>
                      <span className="font-medium text-charcoal">${Math.round(breakdownCost.breakdown.transportCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone p-3 bg-stone/5 rounded-lg">
                      <span>Experiences & Interests</span>
                      <span className="font-medium text-charcoal">${Math.round(breakdownCost.breakdown.experienceCost).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()
            ) : (
              <p className="text-stone italic mb-8">Detailed breakdown is not available for this legacy booking.</p>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-bronze/5 rounded-2xl border border-bronze/20">
              <div>
                <p className="text-sm font-bold text-bronze uppercase tracking-wider mb-1">Total Estimated Price</p>
                <p className="text-stone/70 text-sm">Includes all selected preferences and estimated taxes.</p>
              </div>
              <div className="text-4xl font-serif font-bold text-charcoal">
                ${(booking.price || (booking.blueprint ? calculateEstimatedTripCost(booking.blueprint)?.estimatedTotal : 0) || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
