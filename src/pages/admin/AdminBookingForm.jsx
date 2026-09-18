import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminBookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBooking, addBooking } = useAdminData();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    id: '',
    destination: '',
    dates: '',
    travelers: '',
    travelStyle: '',
    status: 'Upcoming',
    price: 0,
    blueprint: '{}'
  });

  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    if (!isNew) {
      const booking = bookings?.find(b => b.id === id);
      if (booking) {
        setFormData({
          id: booking.id || '',
          destination: booking.destination || '',
          dates: booking.dates || '',
          travelers: booking.travelers || '',
          travelStyle: booking.travelStyle || '',
          status: booking.status || 'Upcoming',
          price: booking.price || 0,
          blueprint: JSON.stringify(booking.blueprint || {}, null, 2)
        });
      } else {
        navigate('/admin/bookings');
      }
    } else {
      setFormData(prev => ({ ...prev, id: `TV-${Math.floor(Math.random() * 90000) + 10000}` }));
    }
  }, [id, isNew, bookings, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setJsonError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJsonError(null);

    try {
      const parsedBooking = {
        id: formData.id,
        destination: formData.destination,
        dates: formData.dates,
        travelers: formData.travelers,
        travelStyle: formData.travelStyle,
        status: formData.status,
        price: Number(formData.price),
        blueprint: JSON.parse(formData.blueprint)
      };

      updateBooking(parsedBooking);
      navigate('/admin/bookings');
    } catch (err) {
      setJsonError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate('/admin/bookings')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isNew ? 'Add Booking' : `Edit Booking: ${formData.id}`}
        </h1>
      </div>

      {jsonError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">JSON Parse Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please check your JSON formatting in the blueprint field: {jsonError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow sm:rounded-lg border border-gray-200 p-6 md:p-8">
        
        {/* Core Info */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Core Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking ID *</label>
              <input required type="text" name="id" value={formData.id} onChange={handleChange} disabled={!isNew} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border disabled:bg-gray-100 disabled:text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
              <input required type="text" name="destination" value={formData.destination} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dates *</label>
              <input required type="text" name="dates" value={formData.dates} onChange={handleChange} placeholder="e.g. Nov 12 - Nov 20, 2026" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travelers *</label>
              <input required type="text" name="travelers" value={formData.travelers} onChange={handleChange} placeholder="e.g. 2 Adults" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style *</label>
              <input required type="text" name="travelStyle" value={formData.travelStyle} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border bg-white">
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blueprint JSON Editor */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Trip Blueprint (JSON Format)</h3>
          <p className="text-sm text-gray-500 mb-4">Edit the complex nested structure generated by the Trip Planner directly via JSON.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blueprint Object</label>
              <textarea rows={16} name="blueprint" value={formData.blueprint} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => navigate('/admin/bookings')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-charcoal hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 items-center">
            <Save size={16} /> Save Booking
          </button>
        </div>
      </form>
    </div>
  );
}
