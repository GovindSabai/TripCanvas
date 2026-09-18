import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminEnquiryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enquiries, updateEnquiry, addEnquiry } = useAdminData();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    status: 'New',
    notes: '',
    date: ''
  });

  useEffect(() => {
    if (!isNew) {
      const enquiry = enquiries?.find(e => String(e.id) === id);
      if (enquiry) {
        setFormData({
          id: enquiry.id || '',
          firstName: enquiry.firstName || '',
          lastName: enquiry.lastName || '',
          email: enquiry.email || '',
          phone: enquiry.phone || '',
          subject: enquiry.subject || '',
          message: enquiry.message || '',
          status: enquiry.status || 'New',
          notes: enquiry.notes || '',
          date: enquiry.date || ''
        });
      } else {
        navigate('/admin/enquiries');
      }
    }
  }, [id, isNew, enquiries, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedEnquiry = {
      ...formData,
    };

    if (isNew) {
      addEnquiry(parsedEnquiry);
    } else {
      updateEnquiry(parsedEnquiry);
    }
    
    navigate('/admin/enquiries');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate('/admin/enquiries')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isNew ? 'Log New Enquiry' : `Enquiry Details`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow sm:rounded-lg border border-gray-200 p-6 md:p-8">
        
        {/* Core Info */}
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            {!isNew && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Submission Date</label>
                <input type="text" value={formData.date ? new Date(formData.date).toLocaleString() : 'N/A'} disabled className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border bg-gray-100 text-gray-500 cursor-not-allowed" />
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Enquiry Details</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={6} name="message" value={formData.message} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border" />
            </div>
          </div>
        </div>

        {/* Admin Section */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Admin Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border bg-white">
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes (Internal)</label>
              <textarea rows={4} name="notes" value={formData.notes} onChange={handleChange} placeholder="Add any internal notes about handling this enquiry..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border bg-yellow-50" />
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => navigate('/admin/enquiries')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-charcoal hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 items-center">
            <Save size={16} /> Save Enquiry
          </button>
        </div>
      </form>
    </div>
  );
}
