import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { Toast } from '../ui/Toast';
import { Send, CheckCircle } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export function ContactForm() {
  const { state, dispatch } = useTripPlanner();
  const displayState = state.finalizedTrip || state;
  const { contact } = displayState;
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [toastMsg, setToastMsg] = useState(null);
  const [submittedContact, setSubmittedContact] = useState(null);
  const { addEnquiry } = useAdminData();

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_CONTACT', payload: { [field]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email) {
      setToastMsg("Name and email are required.");
      return;
    }

    setStatus('submitting');
    
    const [firstName, ...lastNameParts] = contact.name.split(' ');
    const lastName = lastNameParts.join(' ');
    
    // Create enquiry object
    const enquiry = {
      firstName,
      lastName,
      email: contact.email,
      phone: contact.phone || '',
      subject: 'Trip Plan',
      status: 'New',
      details: `Destination Mode: ${displayState.destinationMode}
Destinations: ${displayState.destinations.map(d => d.name).join(', ')}
Dates: ${displayState.dateRange?.start ? new Date(displayState.dateRange.start).toLocaleDateString() : ''} to ${displayState.dateRange?.end ? new Date(displayState.dateRange.end).toLocaleDateString() : ''}
Travelers: ${displayState.travelers?.adults || 0} Adults, ${displayState.travelers?.children || 0} Children
Notes: ${displayState.specialRequests || ''}`
    };

    // Mock API call
    setTimeout(() => {
      addEnquiry(enquiry);
      setSubmittedContact({ ...contact });
      setStatus('success');
      dispatch({ type: 'RESET_PLANNER' });
      
      // Scroll to the success message so the user definitely sees it
      setTimeout(() => {
        const el = document.getElementById('success-message');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      // Reset form after 10 seconds
      setTimeout(() => {
        setStatus('idle');
        setSubmittedContact(null);
      }, 10000);
    }, 2000);
  };

  if (status === 'success' && submittedContact) {
    return (
      <div id="success-message" className="py-20 bg-ivory">
        <div className="max-w-[600px] mx-auto px-5 text-center bg-white p-12 rounded-3xl shadow-sm border border-stone/10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Request Sent!</h2>
          <p className="text-stone text-lg">
            Thank you, {submittedContact.name}. Our travel designers have received your blueprint and will be in touch at {submittedContact.email} within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-charcoal text-ivory">
      <div className="max-w-[800px] mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Enquire?</h2>
          <p className="text-ivory/80">
            Submit your drafted trip to our experts. We'll fine-tune the details and provide a confirmed quote.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ivory/5 p-8 md:p-10 rounded-3xl border border-ivory/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Full Name *</label>
              <input 
                type="text"
                required
                value={contact.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-black/20 border border-ivory/20 rounded-xl p-4 focus:outline-none focus:border-bronze"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email Address *</label>
              <input 
                type="email"
                required
                value={contact.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-black/20 border border-ivory/20 rounded-xl p-4 focus:outline-none focus:border-bronze"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel"
                value={contact.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-black/20 border border-ivory/20 rounded-xl p-4 focus:outline-none focus:border-bronze"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Country of Residence</label>
              <input 
                type="text"
                value={contact.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-black/20 border border-ivory/20 rounded-xl p-4 focus:outline-none focus:border-bronze"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Special Requests / Notes</label>
            <textarea 
              rows="4"
              value={state.specialRequests}
              onChange={(e) => dispatch({ type: 'RESTORE_STATE', payload: { specialRequests: e.target.value } })}
              className="w-full bg-black/20 border border-ivory/20 rounded-xl p-4 focus:outline-none focus:border-bronze resize-none"
              placeholder="Any dietary requirements, accessibility needs, or special occasions?"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-bronze hover:bg-bronzeLight text-ivory font-bold py-5 rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-lg"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Enquiry'} 
            {status !== 'submitting' && <Send size={20} />}
          </button>
        </form>
      </div>

      <Toast 
        isVisible={!!toastMsg}
        message={toastMsg}
        type="error"
        onClose={() => setToastMsg(null)}
      />
    </div>
  );
}
