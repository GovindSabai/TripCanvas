import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser } = useAdminData();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Customer',
    status: 'Active'
  });

  useEffect(() => {
    if (!isNew) {
      const user = users?.find(u => u.id === id);
      if (user) {
        setFormData({
          id: user.id || '',
          name: user.name || '',
          email: user.email || '',
          role: user.role || 'Customer',
          status: user.status || 'Active'
        });
      } else {
        navigate('/admin/users');
      }
    } else {
      setFormData(prev => ({ ...prev, id: `usr_${Date.now()}` }));
    }
  }, [id, isNew, users, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedUser = {
      ...formData,
    };

    updateUser(parsedUser);
    navigate('/admin/users');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate('/admin/users')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isNew ? 'Add User' : `Edit User: ${formData.name}`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow sm:rounded-lg border border-gray-200 p-6 md:p-8">
        
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <input type="text" name="id" value={formData.id} disabled className="w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border bg-gray-100 text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Role & Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border bg-white">
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border bg-white">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => navigate('/admin/users')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-charcoal hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 items-center">
            <Save size={16} /> Save User
          </button>
        </div>
      </form>
    </div>
  );
}
