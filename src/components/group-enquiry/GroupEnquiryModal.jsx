import React, { useState } from 'react';
import { useGroupEnquiry } from '../../context/GroupEnquiryContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Chip } from '../ui/Chip';
import { Button } from '../ui/Button';
import { TRAVEL_STYLES } from '../../data/experiences';
import { CheckCircle, AlertCircle, Minus, Plus, Calendar, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';

const DESTINATIONS = [
  'Bali', 'Kyoto', 'Swiss Alps', 'Amalfi Coast', 'Iceland', 
  'Rajasthan', 'Santorini', 'New Zealand', 'Cappadocia', 
  'Maldives', 'Patagonia', 'Morocco'
];

const BUDGET_RANGES = [
  { id: '<500', label: 'Under $500' },
  { id: '500-1000', label: '$500 - $1,000' },
  { id: '1000-2500', label: '$1,000 - $2,500' },
  { id: '2500-5000', label: '$2,500 - $5,000' },
  { id: '5000+', label: '$5,000+' },
  { id: 'suggest', label: 'Let TripCanvas Suggest' }
];

function GroupEnquiryHeader() {
  return (
    <div className="text-center mb-8">
      <span className="text-sm font-bold tracking-widest uppercase text-bronze mb-2 block">Group Travel</span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-charcoal">Plan Your Journey Together</h2>
      <p className="text-stone">Share your group's vision and let our experts craft the perfect bespoke itinerary.</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="bg-sand/20 rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between gap-6">
      <div className="flex-1 text-center">
        <div className="w-8 h-8 rounded-full bg-bronze text-white font-bold flex items-center justify-center mx-auto mb-3">1</div>
        <h4 className="font-bold text-charcoal mb-1">Tell Us</h4>
        <p className="text-xs text-stone">Share your group size, style, and dreams.</p>
      </div>
      <div className="hidden md:block w-px bg-stone/20 my-2"></div>
      <div className="flex-1 text-center">
        <div className="w-8 h-8 rounded-full bg-bronze text-white font-bold flex items-center justify-center mx-auto mb-3">2</div>
        <h4 className="font-bold text-charcoal mb-1">We Plan</h4>
        <p className="text-xs text-stone">Our experts design a tailored itinerary.</p>
      </div>
      <div className="hidden md:block w-px bg-stone/20 my-2"></div>
      <div className="flex-1 text-center">
        <div className="w-8 h-8 rounded-full bg-bronze text-white font-bold flex items-center justify-center mx-auto mb-3">3</div>
        <h4 className="font-bold text-charcoal mb-1">You Travel</h4>
        <p className="text-xs text-stone">Enjoy a seamless group experience.</p>
      </div>
    </div>
  );
}

function PersonalDetails({ formData, setFormData, errors }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold font-serif mb-4 pb-2 border-b border-stone/20">01 — Your Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Full Name *</label>
          <Input 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="Jane Doe"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.name}</span>}
        </div>
        <div>
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Email *</label>
          <Input 
            type="email"
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            placeholder="jane@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.email}</span>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Phone Number *</label>
          <Input 
            type="tel"
            value={formData.phone} 
            onChange={e => setFormData({...formData, phone: e.target.value})} 
            placeholder="+1 (555) 000-0000"
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.phone}</span>}
        </div>
      </div>
    </div>
  );
}

function GroupDetails({ formData, setFormData, errors }) {
  const updateCount = (type, delta) => {
    const val = formData[type] + delta;
    if (type === 'adults' && val < 0) return;
    if (type === 'children' && val < 0) return;
    setFormData({...formData, [type]: val});
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold font-serif mb-4 pb-2 border-b border-stone/20">02 — Group Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Group Type *</label>
          <Select 
            value={formData.groupType} 
            onChange={e => setFormData({...formData, groupType: e.target.value})}
            className={errors.groupType ? "border-red-500" : ""}
          >
            <option value="">Select Group Type</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
            <option value="Corporate">Corporate</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
          </Select>
          {errors.groupType && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.groupType}</span>}
        </div>
        
        <div>
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Travelers *</label>
          <div className="flex gap-4">
            <div className="flex-1 flex items-center justify-between bg-white border border-stone/30 rounded-lg p-2">
              <span className="text-sm font-medium">Adults</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => updateCount('adults', -1)} className="p-1 rounded-full hover:bg-stone/10 disabled:opacity-30" disabled={formData.adults <= 0}><Minus size={14}/></button>
                <span className="w-4 text-center font-bold">{formData.adults}</span>
                <button type="button" onClick={() => updateCount('adults', 1)} className="p-1 rounded-full hover:bg-stone/10"><Plus size={14}/></button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between bg-white border border-stone/30 rounded-lg p-2">
              <span className="text-sm font-medium">Children</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => updateCount('children', -1)} className="p-1 rounded-full hover:bg-stone/10 disabled:opacity-30" disabled={formData.children <= 0}><Minus size={14}/></button>
                <span className="w-4 text-center font-bold">{formData.children}</span>
                <button type="button" onClick={() => updateCount('children', 1)} className="p-1 rounded-full hover:bg-stone/10"><Plus size={14}/></button>
              </div>
            </div>
          </div>
          {errors.travelers && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.travelers}</span>}
          <div className="text-xs text-stone mt-2 text-right">Total: {formData.adults + formData.children}</div>
        </div>
      </div>
    </div>
  );
}

function TripDetails({ formData, setFormData, errors }) {
  const [destInput, setDestInput] = useState(formData.destination);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredDests = DESTINATIONS.filter(d => d.toLowerCase().includes(destInput.toLowerCase()));
  const today = new Date().toISOString().split('T')[0];

  const handleDestSelect = (val) => {
    setDestInput(val);
    setFormData({...formData, destination: val});
    setShowSuggestions(false);
  };

  const handleDateChange = (field, value) => {
    let newDates = { ...formData.dates, flexible: false, [field]: value };
    if (field === 'start' && newDates.end && value > newDates.end) {
      newDates.end = value;
    }
    setFormData({...formData, dates: newDates});
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold font-serif mb-4 pb-2 border-b border-stone/20">03 — Trip Details</h3>
      
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Destination *</label>
          <Input 
            value={destInput} 
            onChange={e => {
              setDestInput(e.target.value);
              setFormData({...formData, destination: e.target.value});
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="E.g., Bali, Kyoto, Kerala..."
            className={errors.destination ? "border-red-500" : ""}
          />
          {showSuggestions && destInput && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-stone/20 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredDests.length > 0 ? filteredDests.map(d => (
                <div key={d} onClick={() => handleDestSelect(d)} className="px-4 py-2 hover:bg-stone/10 cursor-pointer text-sm">{d}</div>
              )) : (
                <div className="px-4 py-2 text-sm text-stone italic">Press enter to use "{destInput}"</div>
              )}
            </div>
          )}
          {errors.destination && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.destination}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Travel Dates *</label>
          <div className="flex gap-4 mb-4">
            <button 
              type="button"
              onClick={() => setFormData({...formData, dates: {...formData.dates, flexible: true}})}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${formData.dates.flexible ? 'border-bronze bg-bronze/10 text-charcoal' : 'border-stone/30 text-stone'}`}
            >
              Flexible
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, dates: {...formData.dates, flexible: false}})}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${!formData.dates.flexible ? 'border-bronze bg-bronze/10 text-charcoal' : 'border-stone/30 text-stone'}`}
            >
              Specific Dates
            </button>
          </div>
          
          {!formData.dates.flexible && (
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 text-xs text-stone"><Calendar size={12}/> Departure</div>
                <Input type="date" min={today} value={formData.dates.start} onChange={e => handleDateChange('start', e.target.value)} className={errors.dates ? "border-red-500" : ""} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 text-xs text-stone"><CalendarCheck size={12}/> Return</div>
                <Input type="date" min={formData.dates.start || today} value={formData.dates.end} onChange={e => handleDateChange('end', e.target.value)} className={errors.dates ? "border-red-500" : ""} />
              </div>
            </div>
          )}
          {errors.dates && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.dates}</span>}
        </div>

        <div>
          <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Estimated Budget *</label>
          <Select 
            value={formData.budget} 
            onChange={e => setFormData({...formData, budget: e.target.value})}
            className={errors.budget ? "border-red-500" : ""}
          >
            <option value="">Select Budget Range</option>
            {BUDGET_RANGES.map(b => (
              <option key={b.id} value={b.label}>{b.label}</option>
            ))}
          </Select>
          {errors.budget && <span className="text-xs text-red-500 mt-1 block" aria-live="polite">{errors.budget}</span>}
        </div>
      </div>
    </div>
  );
}

function TravelPreferences({ formData, setFormData }) {
  const toggleStyle = (style) => {
    const current = formData.styles;
    if (current.includes(style)) {
      setFormData({...formData, styles: current.filter(s => s !== style)});
    } else {
      setFormData({...formData, styles: [...current, style]});
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold font-serif mb-4 pb-2 border-b border-stone/20">04 — Travel Preferences</h3>
      <p className="text-xs text-stone mb-4">Select the styles that match your group's ideal getaway.</p>
      <div className="flex flex-wrap gap-2">
        {TRAVEL_STYLES.map(style => (
          <Chip 
            key={style}
            label={style}
            selected={formData.styles.includes(style)}
            onClick={() => toggleStyle(style)}
          />
        ))}
      </div>
    </div>
  );
}

function MessageField({ formData, setFormData }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold font-serif mb-4 pb-2 border-b border-stone/20">05 — Your Message</h3>
      <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Additional Notes</label>
      <textarea
        rows={4}
        value={formData.message}
        onChange={e => setFormData({...formData, message: e.target.value})}
        className="w-full rounded-md border border-stone/50 bg-transparent p-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-bronze"
        placeholder="Tell us about any special occasions, dietary requirements, or specific dreams for this trip..."
      />
    </div>
  );
}

function GroupEnquirySuccess({ reference, onClose }) {
  return (
    <div className="text-center py-12 px-4 flex flex-col items-center">
      <div className="w-16 h-16 bg-bronze/10 text-bronze rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={32} />
      </div>
      <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Your Group Journey Has Begun.</h2>
      <p className="text-stone mb-6 max-w-md mx-auto">
        We've received your group enquiry. Our travel experts are reviewing your details and will be in touch shortly to start designing your bespoke itinerary.
      </p>
      <div className="bg-sand/20 rounded-xl p-4 mb-8 inline-block">
        <p className="text-sm font-bold text-stone uppercase tracking-wider mb-1">Reference Number</p>
        <p className="text-2xl font-bold text-bronze">{reference}</p>
      </div>
      
      <div className="flex gap-4">
        <Button onClick={onClose} variant="outline" className="min-w-[120px]">Close</Button>
        <Button asChild className="min-w-[180px]">
          <Link to="/plan" onClick={onClose}>Plan Your Own Trip →</Link>
        </Button>
      </div>
    </div>
  );
}

function GroupEnquiryError({ onRetry, onBack }) {
  return (
    <div className="text-center py-12 px-4 flex flex-col items-center">
      <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Something Interrupted Your Journey.</h2>
      <p className="text-stone mb-8 max-w-md mx-auto">
        We encountered an issue submitting your group enquiry. Don't worry, your details are saved. Please try again.
      </p>
      
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="min-w-[120px]">Back to Form</Button>
        <Button onClick={onRetry} className="min-w-[120px]">Try Again</Button>
      </div>
    </div>
  );
}

export function GroupEnquiryModal() {
  const { isOpen, closeGroupEnquiry } = useGroupEnquiry();
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState({});
  const { addEnquiry } = useAdminData();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    groupType: '',
    adults: 2,
    children: 0,
    destination: '',
    dates: { flexible: true, start: '', end: '' },
    budget: '',
    styles: [],
    message: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.groupType) newErrors.groupType = 'Group type is required';
    if (formData.adults + formData.children < 1) newErrors.travelers = 'At least 1 traveler required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    
    if (!formData.dates.flexible) {
      if (!formData.dates.start || !formData.dates.end) {
        newErrors.dates = 'Please select specific dates or choose flexible';
      } else if (formData.dates.end < formData.dates.start) {
        newErrors.dates = 'Return date cannot be before departure';
      }
    }
    
    if (!formData.budget) newErrors.budget = 'Budget is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    // Simulate async submission
    setTimeout(() => {
      const ref = `GT-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const enquiry = {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        subject: `Group Enquiry: ${formData.groupType}`,
        status: 'New',
        details: `Destination: ${formData.destination}
Dates: ${formData.dates.flexible ? 'Flexible' : `${formData.dates.start} to ${formData.dates.end}`}
Travelers: ${formData.adults} Adults, ${formData.children} Children
Budget: ${formData.budget}
Styles: ${formData.styles.join(', ')}
Message: ${formData.message}`
      };
      
      addEnquiry(enquiry);
      
      setReference(ref);
      setStatus('success');
    }, 700);
  };

  const handleClose = () => {
    if (status === 'submitting') return;
    closeGroupEnquiry();
    // Reset after animation completes
    setTimeout(() => {
      if (status === 'success') {
        setStatus('idle');
        setFormData({
          name: '', email: '', phone: '', groupType: '', adults: 2, children: 0,
          destination: '', dates: { flexible: true, start: '', end: '' },
          budget: '', styles: [], message: ''
        });
      }
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="md:w-[850px] lg:w-[1000px]">
      {status === 'idle' || status === 'submitting' ? (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <GroupEnquiryHeader />
          <HowItWorks />
          
          <div className="flex-1">
            <PersonalDetails formData={formData} setFormData={setFormData} errors={errors} />
            <GroupDetails formData={formData} setFormData={setFormData} errors={errors} />
            <TripDetails formData={formData} setFormData={setFormData} errors={errors} />
            <TravelPreferences formData={formData} setFormData={setFormData} />
            <MessageField formData={formData} setFormData={setFormData} />
          </div>

          <div className="mt-8 pt-6 border-t border-stone/20 flex items-center justify-between sticky bottom-0 bg-ivory pb-2 z-10">
            <p className="text-xs text-stone">Your information is secure and encrypted.</p>
            <Button type="submit" disabled={status === 'submitting'} className="min-w-[200px]">
              {status === 'submitting' ? 'Requesting Your Proposal...' : 'Request Group Proposal →'}
            </Button>
          </div>
        </form>
      ) : status === 'success' ? (
        <GroupEnquirySuccess reference={reference} onClose={handleClose} />
      ) : (
        <GroupEnquiryError onRetry={handleSubmit} onBack={() => setStatus('idle')} />
      )}
    </Modal>
  );
}
