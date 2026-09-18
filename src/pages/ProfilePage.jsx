import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { PageTransition } from '../components/layout/PageTransition';
import { updateProfile } from 'firebase/auth';
import { useTripPlanner } from '../context/TripPlannerContext';
import { UserAvatar } from '../components/ui/UserAvatar';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const { bookings, deleteBooking } = useAdminData();
  const navigate = useNavigate();
  const { state, dispatch } = useTripPlanner();
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // If not logged in, redirect to login
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await updateProfile(currentUser, { displayName });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      deleteBooking(id);
    }
  };

  const handleUpdateBooking = (booking) => {
    // Navigate to plan page with booking state to pre-fill
    navigate('/plan', { state: { updateBooking: booking } });
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 px-5 bg-stone/5">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-4xl font-serif text-charcoal mb-8">Your Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* User Information Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone/10">
                <div className="flex flex-col items-center mb-6">
                  <UserAvatar user={currentUser} className="w-24 h-24 text-3xl shadow-sm mb-4" />
                  {!isEditing && (
                    <>
                      <h2 className="text-xl font-bold text-charcoal text-center">{currentUser.displayName || 'Traveler'}</h2>
                      <p className="text-sm text-stone/50 text-center">{currentUser.email}</p>
                    </>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone/50 uppercase tracking-wider mb-1">Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-stone/5 border border-stone/20 rounded-lg px-4 py-2 text-sm text-charcoal focus:outline-none focus:border-bronze"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone/50 uppercase tracking-wider mb-1">Email</label>
                      <input 
                        type="text" 
                        value={currentUser.email}
                        disabled
                        className="w-full bg-stone/10 border border-stone/20 rounded-lg px-4 py-2 text-sm text-stone/50 cursor-not-allowed"
                      />
                      <p className="text-[10px] text-stone/40 mt-1">Email cannot be changed.</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button type="submit" disabled={isUpdatingProfile} className="flex-1 bg-charcoal text-ivory py-2 rounded-lg font-bold text-sm hover:bg-bronze transition-colors disabled:opacity-50">
                        {isUpdatingProfile ? 'Saving...' : 'Save'}
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)} className="flex-1 border border-stone/20 text-charcoal py-2 rounded-lg font-bold text-sm hover:bg-stone/5 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full border-2 border-stone/20 text-charcoal py-2.5 rounded-xl font-bold text-sm hover:border-bronze hover:bg-stone/5 transition-colors mt-2"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Booking Information Section */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif text-charcoal mb-6">Booking Information</h2>
              
              {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 shadow-sm border border-stone/10 text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">No upcoming trips</h3>
                  <p className="text-stone/50 mb-6 text-sm max-w-md mx-auto">You don't have any bookings yet. Start planning your next premium travel experience!</p>
                  <button onClick={() => navigate('/plan')} className="bg-charcoal text-ivory px-6 py-3 rounded-full font-bold text-sm hover:bg-bronze transition-colors inline-block">
                    Plan a Trip
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {bookings.filter(b => b.status === 'Upcoming').map(booking => (
                    <div key={booking.id} className="bg-white rounded-3xl p-6 shadow-sm border border-stone/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold bg-bronze/10 text-bronze px-2.5 py-1 rounded-full uppercase tracking-wider">{booking.status}</span>
                          <span className="text-xs text-stone/50 font-mono">{booking.id}</span>
                        </div>
                        <h3 className="text-xl font-bold text-charcoal mb-1">{booking.destination}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone/60">
                          <span className="flex items-center gap-1.5"><span className="text-lg leading-none">📅</span> {booking.dates}</span>
                          <span className="flex items-center gap-1.5"><span className="text-lg leading-none">👥</span> {booking.travelers}</span>
                          <span className="flex items-center gap-1.5"><span className="text-lg leading-none">✨</span> {booking.travelStyle}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4 md:mt-0">
                        <button 
                          onClick={() => navigate(`/booking/${booking.id}`)}
                          className="bg-charcoal text-ivory px-6 py-2 rounded-xl font-bold text-sm hover:bg-bronze transition-colors"
                        >
                          View Detail
                        </button>
                        <button 
                          onClick={() => handleUpdateBooking(booking)}
                          className="bg-charcoal text-ivory px-6 py-2 rounded-xl font-bold text-sm hover:bg-bronze transition-colors"
                        >
                          Update
                        </button>
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="border border-red-200 text-red-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
