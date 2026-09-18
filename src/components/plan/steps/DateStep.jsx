import React from 'react';
import { useTripPlanner } from '../../../context/TripPlannerContext';
import { Calendar, CalendarCheck, HelpCircle } from 'lucide-react';

export function DateStep() {
  const { state, dispatch } = useTripPlanner();
  const { dates } = state;

  // Get today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (field, value) => {
    let newDates = { ...dates, flexible: false, [field]: value };
    
    // Auto-adjust end date if it's before start date
    if (field === 'start' && newDates.end && value > newDates.end) {
      newDates.end = value;
    }
    
    dispatch({ type: 'SET_DATES', payload: newDates });
  };

  const setFlexible = () => {
    dispatch({ type: 'SET_DATES', payload: { start: null, end: null, flexible: true } });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-sand/10 border border-stone/10 p-6 rounded-2xl flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-bold text-stone uppercase tracking-wider mb-2 flex items-center gap-2">
            <Calendar size={16} /> Departure Date
          </label>
          <input 
            type="date"
            min={today}
            value={dates.start || ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full bg-white border border-stone/20 rounded-xl p-4 text-charcoal focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-bold text-stone uppercase tracking-wider mb-2 flex items-center gap-2">
            <CalendarCheck size={16} /> Return Date
          </label>
          <input 
            type="date"
            min={dates.start || today}
            value={dates.end || ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full bg-white border border-stone/20 rounded-xl p-4 text-charcoal focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze"
          />
        </div>
      </div>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-stone/20"></div>
        <span className="flex-shrink-0 mx-4 text-stone font-medium text-sm">OR</span>
        <div className="flex-grow border-t border-stone/20"></div>
      </div>

      <button
        onClick={setFlexible}
        className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
          dates.flexible 
            ? 'border-bronze bg-sand/20' 
            : 'border-stone/20 hover:border-bronze/50 hover:bg-sand/10'
        }`}
      >
        <HelpCircle size={32} className={dates.flexible ? 'text-bronze' : 'text-stone'} />
        <div>
          <h4 className={`font-bold text-lg ${dates.flexible ? 'text-charcoal' : 'text-stone'}`}>I'm flexible</h4>
          <p className="text-stone/80 text-sm mt-1">We'll suggest the best time to go based on your destination and experiences.</p>
        </div>
      </button>
    </div>
  );
}
