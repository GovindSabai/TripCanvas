import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { Link } from 'react-router-dom';

export default function AdminDestinations() {
  const { destinations, deleteDestination } = useAdminData();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    deleteDestination(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-serif text-gray-900">Destinations</h1>
        <Link to="/admin/destinations/new" className="bg-charcoal text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-ink transition-colors">
          Add Destination
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
                Region / Country
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
            {destinations.map((destination) => {
              const id = destination.id || destination.slug;
              const isDraft = destination.status === 'draft';
              
              return (
                <tr key={id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={destination.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-500">#{destination.popularityRank || 'Unranked'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{destination.region}</div>
                    <div className="text-sm text-gray-500">{destination.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isDraft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {isDraft ? 'Draft' : 'Published'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link to={`/admin/destinations/${id}`} className="text-primary hover:text-primary/80">Edit</Link>
                    {deleteConfirm === id ? (
                      <span className="flex items-center justify-end gap-2 inline-flex">
                        <span className="text-xs text-red-600">Sure?</span>
                        <button onClick={() => handleDelete(id)} className="text-red-600 hover:text-red-900 font-bold">Yes</button>
                        <button onClick={() => setDeleteConfirm(null)} className="text-gray-500 hover:text-gray-700">No</button>
                      </span>
                    ) : (
                      <button onClick={() => setDeleteConfirm(id)} className="text-red-600 hover:text-red-900">Delete</button>
                    )}
                  </td>
                </tr>
              );
            })}
            {destinations.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  No destinations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
