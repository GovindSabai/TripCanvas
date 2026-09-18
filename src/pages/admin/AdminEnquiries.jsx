import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { Link } from 'react-router-dom';

export default function AdminEnquiries() {
  const { enquiries, deleteEnquiry } = useAdminData();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteEnquiry(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-gray-900">Enquiries</h1>
        <Link to="/admin/enquiries/new" className="bg-charcoal text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-ink transition-colors">
          Add Enquiry
        </Link>
      </div>

      <div className="bg-white shadow overflow-x-auto sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {enquiry.firstName} {enquiry.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enquiry.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enquiry.subject || 'General Enquiry'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enquiry.date ? new Date(enquiry.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    enquiry.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    enquiry.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {enquiry.status || 'New'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link to={`/admin/enquiries/${enquiry.id}`} className="text-primary hover:text-primary/80">View / Edit</Link>
                  {deleteConfirm === enquiry.id ? (
                    <span className="flex items-center justify-end gap-2 inline-flex">
                      <span className="text-xs text-red-600">Sure?</span>
                      <button onClick={() => handleDelete(enquiry.id)} className="text-red-600 hover:text-red-900 font-bold">Yes</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-gray-500 hover:text-gray-700">No</button>
                    </span>
                  ) : (
                    <button onClick={() => setDeleteConfirm(enquiry.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  )}
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
