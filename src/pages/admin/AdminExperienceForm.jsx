import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { experiences, updateExperience } = useAdminData();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title: '',
    destination: '',
    country: '',
    region: '',
    category: 'Adventure',
    travelStyle: 'Adventure Travel',
    image: '',
    duration: '',
    bestSeason: '',
    activityLevel: 'Moderate',
    groupSize: '',
    price: 150,
    status: 'published',
    shortDescription: '',
    description: '',
    gallery: '',
    included: '',
    whatToBring: '',
    localTips: '',
    itinerary: '[]',
    importantInformation: '{}',
    coordinates: '{}',
    relatedExperienceSlugs: '[]'
  });

  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    if (!isNew) {
      const exp = experiences.find(e => (e.id || e.slug) === id);
      if (exp) {
        setFormData({
          id: exp.id || exp.slug,
          slug: exp.slug || '',
          title: exp.title || '',
          destination: exp.destination || '',
          country: exp.country || '',
          region: exp.region || '',
          category: exp.category || 'Adventure',
          travelStyle: exp.travelStyle || 'Adventure Travel',
          image: exp.image || '',
          duration: exp.duration || '',
          bestSeason: exp.bestSeason || '',
          activityLevel: exp.activityLevel || 'Moderate',
          groupSize: exp.groupSize || '',
          price: exp.price || 150,
          status: exp.status || 'published',
          shortDescription: exp.shortDescription || '',
          description: exp.description || '',
          gallery: (exp.gallery || []).join('\n'),
          included: (exp.included || []).join('\n'),
          whatToBring: (exp.whatToBring || []).join('\n'),
          localTips: (exp.localTips || []).join('\n'),
          itinerary: JSON.stringify(exp.itinerary || [], null, 2),
          importantInformation: JSON.stringify(exp.importantInformation || {}, null, 2),
          coordinates: JSON.stringify(exp.coordinates || {}, null, 2),
          relatedExperienceSlugs: JSON.stringify(exp.relatedExperienceSlugs || [], null, 2)
        });
      } else {
        navigate('/admin/experiences');
      }
    }
  }, [id, isNew, experiences, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setJsonError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJsonError(null);

    try {
      const parsedExperience = {
        id: formData.id || formData.slug,
        slug: formData.slug || formData.id,
        title: formData.title,
        destination: formData.destination,
        country: formData.country,
        region: formData.region,
        category: formData.category,
        travelStyle: formData.travelStyle,
        image: formData.image,
        duration: formData.duration,
        bestSeason: formData.bestSeason,
        activityLevel: formData.activityLevel,
        groupSize: formData.groupSize,
        price: Number(formData.price),
        status: formData.status,
        shortDescription: formData.shortDescription,
        description: formData.description,
        gallery: formData.gallery.split('\n').map(s => s.trim()).filter(Boolean),
        included: formData.included.split('\n').map(s => s.trim()).filter(Boolean),
        whatToBring: formData.whatToBring.split('\n').map(s => s.trim()).filter(Boolean),
        localTips: formData.localTips.split('\n').map(s => s.trim()).filter(Boolean),
        itinerary: JSON.parse(formData.itinerary),
        importantInformation: JSON.parse(formData.importantInformation),
        coordinates: JSON.parse(formData.coordinates),
        relatedExperienceSlugs: JSON.parse(formData.relatedExperienceSlugs)
      };

      updateExperience(parsedExperience);
      navigate('/admin/experiences');
    } catch (err) {
      setJsonError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate('/admin/experiences')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isNew ? 'Add Experience' : `Edit: ${formData.title}`}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL ID) *</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
              <input required type="text" name="destination" value={formData.destination} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style</label>
              <input required type="text" name="travelStyle" value={formData.travelStyle} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
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

        {/* Practical Info */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Practical Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" placeholder="e.g. 3 hrs, Half day" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Best Season</label>
              <input type="text" name="bestSeason" value={formData.bestSeason} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
              <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border bg-white">
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
              <input type="text" name="groupSize" value={formData.groupSize} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" placeholder="e.g. 2-8" />
            </div>
          </div>
        </div>

        {/* Description & Media */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Description & Media</h3>
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
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Lists (One item per line)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Included</label>
              <textarea rows={4} name="included" value={formData.included} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border whitespace-pre-wrap" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What to Bring</label>
              <textarea rows={4} name="whatToBring" value={formData.whatToBring} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border whitespace-pre-wrap" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local Tips</label>
              <textarea rows={4} name="localTips" value={formData.localTips} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border whitespace-pre-wrap" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image URLs</label>
              <textarea rows={4} name="gallery" value={formData.gallery} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border whitespace-pre-wrap font-mono text-xs" />
            </div>
          </div>
        </div>

        {/* Complex JSON Editors */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-1">Advanced Data (JSON Format)</h3>
          <p className="text-sm text-gray-500 mb-4">Edit complex nested structures directly via JSON. Ensure the format is strictly valid JSON.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Itinerary (Array of Objects: step, title, description)</label>
              <textarea rows={6} name="itinerary" value={formData.itinerary} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Important Information (Object: safety, accessibility, etiquette)</label>
                <textarea rows={6} name="importantInformation" value={formData.importantInformation} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coordinates (Object: lat, lng)</label>
                <textarea rows={6} name="coordinates" value={formData.coordinates} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Related Experience Slugs (Array of Strings)</label>
              <textarea rows={2} name="relatedExperienceSlugs" value={formData.relatedExperienceSlugs} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => navigate('/admin/experiences')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-charcoal hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 items-center">
            <Save size={16} /> Save Experience
          </button>
        </div>
      </form>
    </div>
  );
}
