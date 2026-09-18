import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { useAdminData } from '../../context/AdminDataContext';
import { calculateEstimatedTripCost } from '../../utils/plannerUtils';
import { MapPin, Calendar, Users, Briefcase, Heart, DollarSign, Navigation, Lock, Check } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

export function TripReview() {
  const { state, dispatch } = useTripPlanner();
  const { currentUser } = useAuth();
  const { deleteBooking } = useAdminData();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (stepIndex) => {
    dispatch({ type: 'EDIT_BLUEPRINT' });
    window.dispatchEvent(new CustomEvent('change-planner-step', { detail: stepIndex }));
    const el = document.getElementById('planner-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayState = state.finalizedTrip || state;
  const est = calculateEstimatedTripCost(displayState);

  const handleConfirm = () => {
    dispatch({ type: 'SAVE_BOOKING' });
    setIsConfirmed(true);
    setIsModalOpen(true);
  };

  if (!currentUser) {
    return (
      <div id="review-section" className="py-20 bg-ivory border-t border-stone/10">
        <div className="max-w-[800px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
              Review
            </span>
            <h2 className="text-4xl font-serif font-bold text-charcoal mb-4">
              Your Journey Blueprint
            </h2>
          </div>
          
          <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-stone/10 text-center relative overflow-hidden">
            {/* Blurred placeholder content in background */}
            <div className="absolute inset-0 opacity-20 filter blur-sm pointer-events-none flex flex-col gap-6 p-10">
              <div className="h-12 bg-stone/20 rounded w-3/4 mx-auto"></div>
              <div className="h-12 bg-stone/20 rounded w-1/2 mx-auto"></div>
              <div className="h-12 bg-stone/20 rounded w-5/6 mx-auto"></div>
              <div className="h-12 bg-stone/20 rounded w-2/3 mx-auto"></div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center max-w-sm mx-auto">
              <div className="w-16 h-16 bg-stone/10 rounded-full flex items-center justify-center mb-6">
                <Lock className="text-charcoal w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">Login Required</h3>
              <p className="text-stone mb-8">
                Sign in to view your complete journey blueprint, see estimated pricing, and confirm your trip.
              </p>
              <button 
                onClick={() => navigate('/login', { state: { from: '/plan' } })}
                className="w-full bg-charcoal text-ivory py-4 rounded-xl font-bold hover:bg-bronze transition-colors shadow-lg shadow-stone/10"
              >
                Log In to View Blueprint
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div id="review-section" className="py-20 bg-ivory border-t border-stone/10 relative">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 text-center min-h-[400px]">
          {/* We keep the section mounted so the ConfirmationModal can display */}
        </div>
        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          referenceNumber={state.activeBookingId || ''} 
        />
      </div>
    );
  }

  return (
    <div id="review-section" className="py-20 bg-ivory border-t border-stone/10">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
            Review
          </span>
          <h2 className="text-4xl font-serif font-bold text-charcoal mb-4">
            Your Journey Blueprint
          </h2>
          <p className="text-stone">
            Make sure everything looks right before sending it to our travel designers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone/10 space-y-8">
          <ReviewItem 
            icon={Navigation} 
            title="Starting From" 
            value={displayState.startingLocation ? `${displayState.startingLocation.name}, ${displayState.startingLocation.country}` : 'Not selected'} 
            onEdit={() => handleEdit(0)}
          />
          <ReviewItem 
            icon={MapPin} 
            title="Destinations" 
            value={displayState.destinations.length > 0 ? displayState.destinations.map(d => d.name).join(', ') : 'Not selected'} 
            onEdit={() => handleEdit(1)}
          />
          <ReviewItem 
            icon={Calendar} 
            title="Dates" 
            value={displayState.dates.flexible ? 'Flexible' : (displayState.dates.start ? `${displayState.dates.start} to ${displayState.dates.end || '?'}` : 'Not selected')} 
            onEdit={() => handleEdit(2)}
          />
          <ReviewItem 
            icon={Users} 
            title="Travelers" 
            value={`${displayState.travelers.adults} Adults${displayState.travelers.children ? `, ${displayState.travelers.children} Children` : ''}`} 
            onEdit={() => handleEdit(3)}
          />
          <ReviewItem 
            icon={Briefcase} 
            title="Travel Style" 
            value={displayState.travelStyles.join(', ') || 'Not selected'} 
            onEdit={() => handleEdit(4)}
          />
          <ReviewItem 
            icon={Heart} 
            title="Experience Interests" 
            value={displayState.experienceInterests.join(', ') || 'Not selected'} 
            onEdit={() => handleEdit(5)}
          />
          <ReviewItem 
            icon={DollarSign} 
            title="Budget, Transport & Vehicle" 
            value={displayState.budgetRange ? `${displayState.budgetRange} | ${displayState.accommodationTier} Accommodation | ${displayState.transportMode} Transport${displayState.vehicleType ? ` | ${displayState.vehicleType.charAt(0).toUpperCase() + displayState.vehicleType.slice(1)}` : ''}` : 'Not selected'} 
            onEdit={() => handleEdit(6)}
          />
          
          <div className="pt-6 border-t border-stone/10 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Estimated Total</p>
              <p className="text-3xl font-serif font-bold text-charcoal">{est ? `$${est.estimatedTotal.toLocaleString()}` : 'Please complete all steps'}</p>
            </div>
            
            <div className="flex gap-4">
              {displayState.destinations.length > 0 || displayState.dates.start || displayState.travelers.adults > 0 || displayState.travelStyles.length > 0 ? (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this blueprint?')) {
                      if (state.activeBookingId) {
                        deleteBooking(state.activeBookingId);
                      }
                      dispatch({ type: 'RESET_PLANNER' });
                      dispatch({ type: 'DELETE_BLUEPRINT' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-red-500 hover:text-red-700 font-bold uppercase tracking-wider text-sm transition-colors py-2 px-4 rounded-full border border-red-200 hover:bg-red-50"
                  disabled={isConfirmed}
                >
                  Delete Blueprint
                </button>
              ) : null}

              <button
                onClick={handleConfirm}
                disabled={isConfirmed}
                className={`transition-colors font-bold uppercase tracking-wider text-sm py-2 px-6 rounded-full shadow-md flex items-center gap-2 ${
                  isConfirmed 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-charcoal text-ivory hover:bg-bronze'
                }`}
              >
                {isConfirmed ? (
                  <>
                    <Check size={16} />
                    Confirmed
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    {state.activeBookingId ? 'Update & Confirm' : 'Confirm'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ icon: Icon, title, value, onEdit }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center shrink-0 mt-1">
        <Icon size={18} className="text-bronze" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-sm text-stone uppercase tracking-wider">{title}</h4>
          <button 
            onClick={onEdit}
            className="text-sm text-bronze hover:text-bronzeLight font-bold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Edit
          </button>
        </div>
        <p className="font-medium text-lg text-charcoal">{value}</p>
      </div>
    </div>
  );
}
