import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminDestinationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { destinations, updateDestination } = useAdminData();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    name: '',
    country: '',
    region: '',
    budget: '$$',
    basePrice: 150,
    image: '',
    popularityRank: 99,
    status: 'published',
    shortDescription: '',
    description: '',
    gallery: '',
    travelStyles: '',
    travelTips: '',
    highlights: '[]',
    thingsToDo: '[]',
    travelInfo: '{}',
    whereToStay: '[]',
    foodAndCulture: '{}',
    relatedDestinationSlugs: '[]'
  });

  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    if (!isNew) {
      const dest = destinations.find(d => (d.id || d.slug) === id);
      if (dest) {
        setFormData({
          id: dest.id || dest.slug,
          slug: dest.slug || '',
          name: dest.name || '',
          country: dest.country || '',
          region: dest.region || '',
          budget: dest.budget || '$$',
          basePrice: dest.basePrice || 150,
          image: dest.image || '',
          popularityRank: dest.popularityRank || 99,
          status: dest.status || 'published',
          shortDescription: dest.shortDescription || '',
          description: dest.description || '',
          gallery: (dest.gallery || []).join('\n'),
          travelStyles: (dest.travelStyles || []).join(', '),
          travelTips: (dest.travelTips || []).join('\n'),
          highlights: JSON.stringify(dest.highlights || [], null, 2),
          thingsToDo: JSON.stringify(dest.thingsToDo || [], null, 2),
          travelInfo: JSON.stringify(dest.travelInfo || {}, null, 2),
          whereToStay: JSON.stringify(dest.whereToStay || [], null, 2),
          foodAndCulture: JSON.stringify(dest.foodAndCulture || {}, null, 2),
          relatedDestinationSlugs: JSON.stringify(dest.relatedDestinationSlugs || [], null, 2)
        });
      } else {
        navigate('/admin/destinations'); // Not found
      }
    }
  }, [id, isNew, destinations, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setJsonError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJsonError(null);

    try {
      const parsedDestination = {
        id: formData.id || formData.slug, // ensure we have an ID
        slug: formData.slug || formData.id,
        name: formData.name,
        country: formData.country,
        region: formData.region,
        budget: formData.budget,
        basePrice: Number(formData.basePrice),
        image: formData.image,
        popularityRank: Number(formData.popularityRank),
        status: formData.status,
        shortDescription: formData.shortDescription,
        description: formData.description,
        gallery: formData.gallery.split('\n').map(s => s.trim()).filter(Boolean),
        travelStyles: formData.travelStyles.split(',').map(s => s.trim()).filter(Boolean),
        travelTips: formData.travelTips.split('\n').map(s => s.trim()).filter(Boolean),
        highlights: JSON.parse(formData.highlights),
        thingsToDo: JSON.parse(formData.thingsToDo),
        travelInfo: JSON.parse(formData.travelInfo),
        whereToStay: JSON.parse(formData.whereToStay),
        foodAndCulture: JSON.parse(formData.foodAndCulture),
        relatedDestinationSlugs: JSON.parse(formData.relatedDestinationSlugs)
      };

      updateDestination(parsedDestination);
      navigate('/admin/destinations');
    } catch (err) {
      setJsonError(err.message);
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate('/admin/destinations')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isNew ? 'Add Destination' : `Edit: ${formData.name}`}
        </h1>
      </div>

      {jsonError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">JSON Parse Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please check your JSON formatting in the advanced fields: {jsonError}</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL ID) *</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
              <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
              <input required type="text" name="region" value={formData.region} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($$)*</label>
              <input required type="text" name="budget" value={formData.budget} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border bg-white">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Details</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
              <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
          </div>
        </div>

        {/* Arrays (Simple) */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Lists (Simple)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Styles (Comma separated)</label>
              <input type="text" name="travelStyles" value={formData.travelStyles} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" placeholder="Adventure, Luxury, Relaxation" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image URLs (One per line)</label>
              <textarea rows={4} name="gallery" value={formData.gallery} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border whitespace-pre-wrap font-mono text-xs" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Tips (One per line)</label>
              <textarea rows={4} name="travelTips" value={formData.travelTips} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border whitespace-pre-wrap" />
            </div>
          </div>
        </div>

        {/* Complex JSON Editors */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Advanced Data (JSON Format)</h3>
          <p className="text-sm text-gray-500 mb-4">Edit complex nested structures directly via JSON. Ensure the format is strictly valid JSON (double quotes for keys).</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (Array of Objects)</label>
              <textarea rows={6} name="highlights" value={formData.highlights} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Things To Do (Array of Objects with experienceSlug)</label>
              <textarea rows={4} name="thingsToDo" value={formData.thingsToDo} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Where To Stay (Array of Objects)</label>
              <textarea rows={6} name="whereToStay" value={formData.whereToStay} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Info (Object)</label>
                <textarea rows={6} name="travelInfo" value={formData.travelInfo} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food & Culture (Object)</label>
                <textarea rows={6} name="foodAndCulture" value={formData.foodAndCulture} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Destination Slugs (Array of Strings)</label>
              <textarea rows={2} name="relatedDestinationSlugs" value={formData.relatedDestinationSlugs} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => navigate('/admin/destinations')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-charcoal hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 items-center">
            <Save size={16} /> Save Destination
          </button>
        </div>
      </form>
    </div>
  );
}
