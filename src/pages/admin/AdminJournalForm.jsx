import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AdminJournalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { journal, updateJournal } = useAdminData();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    title: '',
    destination: '',
    country: '',
    region: '',
    category: 'Travel Stories',
    author: '',
    publishedDate: '',
    readTime: '5 min',
    bestSeason: '',
    budgetTier: '$$',
    image: '',
    status: 'published',
    shortDescription: '',
    gallery: '',
    tags: '',
    content: '[]',
    guide: '{}',
    relatedExperienceSlugs: '[]',
    relatedArticleSlugs: '[]'
  });

  const [jsonError, setJsonError] = useState(null);

  useEffect(() => {
    if (!isNew) {
      const article = journal.find(a => (a.id || a.slug) === id);
      if (article) {
        setFormData({
          id: article.id || article.slug,
          slug: article.slug || '',
          title: article.title || '',
          destination: article.destination || '',
          country: article.country || '',
          region: article.region || '',
          category: article.category || 'Travel Stories',
          author: article.author || '',
          publishedDate: article.publishedDate || '',
          readTime: article.readTime || '5 min',
          bestSeason: article.bestSeason || '',
          budgetTier: article.budgetTier || '$$',
          image: article.image || '',
          status: article.status || 'published',
          shortDescription: article.shortDescription || '',
          gallery: (article.gallery || []).join('\n'),
          tags: (article.tags || []).join(', '),
          content: JSON.stringify(article.content || [], null, 2),
          guide: JSON.stringify(article.guide || {}, null, 2),
          relatedExperienceSlugs: JSON.stringify(article.relatedExperienceSlugs || [], null, 2),
          relatedArticleSlugs: JSON.stringify(article.relatedArticleSlugs || [], null, 2)
        });
      } else {
        navigate('/admin/journal');
      }
    }
  }, [id, isNew, journal, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setJsonError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJsonError(null);

    try {
      const parsedArticle = {
        id: formData.id || formData.slug,
        slug: formData.slug || formData.id,
        title: formData.title,
        destination: formData.destination || null,
        country: formData.country || null,
        region: formData.region || null,
        category: formData.category,
        author: formData.author,
        publishedDate: formData.publishedDate,
        date: new Date().toISOString(), // keep a fallback date
        readTime: formData.readTime,
        bestSeason: formData.bestSeason || null,
        budgetTier: formData.budgetTier || null,
        image: formData.image,
        status: formData.status,
        shortDescription: formData.shortDescription,
        gallery: formData.gallery.split('\n').map(s => s.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
        content: JSON.parse(formData.content),
        guide: JSON.parse(formData.guide),
        relatedExperienceSlugs: JSON.parse(formData.relatedExperienceSlugs),
        relatedArticleSlugs: JSON.parse(formData.relatedArticleSlugs)
      };

      updateJournal(parsedArticle);
      navigate('/admin/journal');
    } catch (err) {
      setJsonError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => navigate('/admin/journal')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isNew ? 'Add Article' : `Edit: ${formData.title}`}
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL ID) *</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
              <input required type="text" name="author" value={formData.author} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Published Date *</label>
              <input required type="text" name="publishedDate" value={formData.publishedDate} onChange={handleChange} placeholder="e.g. October 12, 2023" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
              <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} placeholder="e.g. 5 min" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
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

        {/* Linked Destination Info (Optional) */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Linked Location (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input type="text" name="destination" value={formData.destination} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <input type="text" name="region" value={formData.region} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Best Season</label>
              <input type="text" name="bestSeason" value={formData.bestSeason} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Tier ($$)</label>
              <input type="text" name="budgetTier" value={formData.budgetTier} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
          </div>
        </div>

        {/* Details */}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image URLs (One per line)</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Content Blocks (Array of Objects: type, text)</label>
              <textarea rows={10} name="content" value={formData.content} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guide Info (Object: name, role, image, bio)</label>
              <textarea rows={6} name="guide" value={formData.guide} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Experience Slugs (Array of Strings)</label>
                <textarea rows={2} name="relatedExperienceSlugs" value={formData.relatedExperienceSlugs} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Article Slugs (Array of Strings)</label>
                <textarea rows={2} name="relatedArticleSlugs" value={formData.relatedArticleSlugs} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-3 border font-mono text-xs bg-gray-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5 flex justify-end gap-3 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => navigate('/admin/journal')} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Cancel
          </button>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-charcoal hover:bg-ink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary gap-2 items-center">
            <Save size={16} /> Save Article
          </button>
        </div>
      </form>
    </div>
  );
}
