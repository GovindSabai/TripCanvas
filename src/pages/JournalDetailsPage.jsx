import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Share2, MapPin, ArrowRight } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { StickySectionNav } from '../components/ui/StickySectionNav';
import { BlockRenderer } from '../components/ui/BlockRenderer';
import { ImageGallery } from '../components/ui/ImageGallery';
import { JournalCard } from '../components/ui/JournalCard';
import { ExperienceCard } from '../components/ui/ExperienceCard';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export default function JournalDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ isVisible: false, message: '' });
  const { getPublicJournal, getPublicExperiences } = useAdminData();
  const journalArticles = getPublicJournal();
  const experiences = getPublicExperiences();

  const article = journalArticles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Story Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't find the story you're looking for. It may have been removed or the URL is incorrect.</p>
        <Button onClick={() => navigate('/journal')} className="bg-charcoal text-white hover:bg-black">
          Browse All Stories
        </Button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share error:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setToast({ isVisible: true, message: 'Link copied to clipboard!' });
    }
  };

  // Derive Table of Contents from headings
  const tocSections = article.content
    .filter(block => block.type === 'heading')
    .map(block => ({
      id: block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label: block.text
    }));

  // Append Gallery if present
  if (article.gallery && article.gallery.length > 0) {
    tocSections.push({ id: 'gallery', label: 'Gallery' });
  }

  if (article.guide) {
    tocSections.push({ id: 'travel-guide', label: 'Travel Guide' });
  }

  // Related Experiences
  const relatedExps = article.destination 
    ? experiences.filter(e => e.destination === article.destination || e.country === article.country).slice(0, 3)
    : [];

  // Related Stories
  const relatedStories = journalArticles
    .filter(a => a.id !== article.id && (a.category === article.category || (a.destination && a.destination === article.destination)))
    .slice(0, 3);
    
  // Fallback if not enough related stories
  if (relatedStories.length < 3) {
    const filler = journalArticles.filter(a => a.id !== article.id && !relatedStories.includes(a));
    relatedStories.push(...filler.slice(0, 3 - relatedStories.length));
  }

  return (
    <div className="bg-ivory flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        
        {/* Top Header / Breadcrumbs */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-6">
          <Breadcrumbs 
            items={[
              { label: 'Home', path: '/' },
              { label: 'Journal', path: '/journal' },
              { label: article.category, path: `/journal?category=${encodeURIComponent(article.category)}` },
              { label: article.title }
            ]} 
          />
        </div>

        {/* Hero Section */}
        <div className="max-w-[1024px] mx-auto px-5 md:px-8 xl:px-12 mb-12">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-bronze font-bold tracking-widest uppercase text-sm mb-6">{article.category}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 font-bold mb-8 leading-tight max-w-4xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2"><span className="text-gray-900 font-bold">By {article.author}</span></span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-bronze" /> {article.publishedDate}</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-bronze" /> {article.readTime} read</span>
              {(article.destination || article.country) && (
                <span className="flex items-center gap-2"><MapPin size={16} className="text-bronze" /> {article.destination ? `${article.destination}, ` : ''}{article.country}</span>
              )}
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-6 right-6 flex gap-3">
              <button onClick={handleShare} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {tocSections.length > 0 && (
          <StickySectionNav sections={tocSections} />
        )}

        <div className="max-w-[1024px] mx-auto px-5 md:px-8 xl:px-12 py-12 flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            <BlockRenderer blocks={article.content} />
            
            {/* Gallery */}
            {article.gallery && article.gallery.length > 0 && (
              <section id="gallery" className="scroll-mt-32 mt-16 pt-16 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Gallery</h2>
                <ImageGallery images={article.gallery} title={article.title} />
              </section>
            )}

            {/* Travel Guide Section */}
            {article.guide && (
              <section id="travel-guide" className="scroll-mt-32 mt-16 pt-16 border-t border-gray-200">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Meet Your Travel Guide</h2>
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-bronzeLight shadow-md">
                    <img src={article.guide.image} alt={article.guide.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{article.guide.name}</h3>
                    <p className="text-bronze font-semibold uppercase tracking-widest text-xs mb-4">{article.guide.role}</p>
                    <p className="text-gray-600 leading-relaxed">{article.guide.bio}</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Quick Facts */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-[140px] flex flex-col gap-8">
              {(article.destination || article.bestSeason || article.budgetTier) && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
                  <h3 className="font-bold text-gray-900 mb-6 font-serif text-xl border-b border-gray-100 pb-4">Quick Facts</h3>
                <ul className="space-y-4">
                  {article.destination && (
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Destination</span>
                      <span className="text-gray-900 font-medium">{article.destination}, {article.country}</span>
                    </li>
                  )}
                  {article.bestSeason && (
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Best Season</span>
                      <span className="text-gray-900 font-medium">{article.bestSeason}</span>
                    </li>
                  )}
                  {article.budgetTier && (
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Budget</span>
                      <span className="text-gray-900 font-medium text-lg tracking-widest">{article.budgetTier}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
              <div className="bg-bronze/10 rounded-3xl p-8 text-center">
                <h3 className="font-bold text-gray-900 mb-2 font-serif text-xl">Love this story?</h3>
                <p className="text-gray-600 text-sm mb-6">Save it to your collection to read later or share it with a friend.</p>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={handleShare} className="p-3 bg-white border border-gray-200 shadow-sm rounded-full text-charcoal hover:bg-gray-50 transition-colors focus:outline-none">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Experiences (Only if destination matches exist) */}
        {relatedExps.length > 0 && (
          <section className="bg-stone/10 py-20 mt-12">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-serif font-bold text-gray-900">Experience It Yourself</h2>
                <Link to={`/experiences?destination=${encodeURIComponent(article.destination || article.country)}`} className="hidden md:flex items-center gap-2 text-bronze font-bold hover:text-bronzeLight transition-colors">
                  View Experiences <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedExps.map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Stories */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStories.map((related) => (
                <JournalCard key={related.id} article={related} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-charcoal text-white text-center px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-6">Make the Journey Yours.</h2>
            <p className="text-gray-300 text-lg mb-8">
              Ready to turn these stories into your reality? Explore our curated experiences or start planning your personalized itinerary today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/experiences" className="w-full sm:w-auto">
                <Button className="bg-bronze hover:bg-bronzeLight text-white px-8 py-3 rounded-full w-full">
                  Explore Experiences
                </Button>
              </Link>
              <Link to="/plan" className="w-full sm:w-auto">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-3 rounded-full w-full">
                  Plan Your Trip
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type="success"
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
    </div>
  );
}
