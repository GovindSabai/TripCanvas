import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Send } from 'lucide-react';
import { JOURNAL_CATEGORIES } from '../data/journal';
import { useAdminData } from '../context/AdminDataContext';
import { JournalCard } from '../components/ui/JournalCard';
import { SearchBar } from '../components/ui/SearchBar';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { SectionReveal } from '../components/ui/SectionReveal';
import { Toast } from '../components/ui/Toast';

const ITEMS_PER_PAGE = 9;

export default function JournalPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const urlCategory = searchParams.get('category') || '';
  const urlQuery = searchParams.get('q') || '';
  const urlDestination = searchParams.get('destination') || '';

  const { getPublicJournal } = useAdminData();
  const journalArticles = getPublicJournal();
  
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(urlQuery);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Sync state to URL
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearch) newParams.set('q', debouncedSearch); else newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearch, setSearchParams]);

  // Filter Logic (AND logic)
  const filteredArticles = useMemo(() => {
    let result = journalArticles.filter(a => !['art-9', 'art-10', 'art-11', 'art-12', 'art-13', 'art-14', 'art-15'].includes(a.id));

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        (a.destination && a.destination.toLowerCase().includes(q)) ||
        (a.country && a.country.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      );
    }
    if (urlCategory) {
      result = result.filter(a => a.category === urlCategory);
    }
    if (urlDestination) {
      result = result.filter(a => a.destination === urlDestination);
    }
    return result;
  }, [debouncedSearch, urlCategory, urlDestination, journalArticles]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const featuredArticle = journalArticles.find(a => a.id === 'art-15');
  const travelTips = journalArticles.filter(a => ['art-9', 'art-10', 'art-11', 'art-12', 'art-13', 'art-14'].includes(a.id));

  const handleCategoryClick = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat) newParams.set('category', cat); else newParams.delete('category');
    setSearchParams(newParams);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    setIsSubmitting(true);
    // Mocked async call without real backend integration
    await new Promise(r => setTimeout(r, 700));
    setIsSubmitting(false);
    setEmail('');
    setToast({ isVisible: true, message: 'Thank you for subscribing to TripCanvas Journal.', type: 'success' });
  };

  const corners = [
    { name: 'Rajasthan', image: '/India/Udiapur Rajsthan.jpg', hasDestPage: true, slug: 'rajasthan' },
    { name: 'Kerala', image: '/India/Karala.jpg', hasDestPage: false },
    { name: 'Himachal Pradesh', image: '/India/Simla Himachal Pradesh.jpg', hasDestPage: false },
    { name: 'Kyoto', image: '/World/Japan.jpg', hasDestPage: true, slug: 'kyoto' },
    { name: 'Bali', image: '/World/Bali.jpg', hasDestPage: true, slug: 'bali' },
    { name: 'Iceland', image: '/World/switzerland.jpg', hasDestPage: true, slug: 'iceland' } 
    // Note: Replaced Goa with Iceland to avoid zero-counts. 
  ];

  return (
    <div className="bg-ivory flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop" 
              alt="Journal Hero" 
              className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-ivory/90" />
          </div>
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
            <SectionReveal>
              <span className="text-bronze font-bold tracking-[0.2em] uppercase text-sm mb-4 block">THE TRIPCANVAS JOURNAL</span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-lg mb-6">
                Stories Beyond the Journey.
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-medium mb-8 max-w-2xl mx-auto">
                Discover curated travel stories, destination guides, and practical tips from our global community of explorers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={() => window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' })} className="bg-bronze hover:bg-bronzeLight text-white px-8 py-3 rounded-full w-full sm:w-auto">
                  Explore Stories
                </Button>
                <Link to="/plan" className="w-full sm:w-auto">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-3 rounded-full w-full">
                    Plan Your Trip
                  </Button>
                </Link>
              </div>
            </SectionReveal>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
            <ChevronDown size={32} />
          </div>
        </section>

        {/* Categories & Search */}
        <section className="py-8 border-b border-gray-200 bg-white sticky top-[80px] z-30 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2 w-full md:w-auto">
              <button 
                onClick={() => handleCategoryClick('')}
                className={`shrink-0 text-sm font-semibold transition-colors pb-1 border-b-2 ${!urlCategory ? 'border-bronze text-charcoal' : 'border-transparent text-gray-500 hover:text-charcoal'}`}
              >
                All Stories
              </button>
              {JOURNAL_CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`shrink-0 text-sm font-semibold transition-colors pb-1 border-b-2 ${urlCategory === cat ? 'border-bronze text-charcoal' : 'border-transparent text-gray-500 hover:text-charcoal'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64 shrink-0">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search journal..." />
            </div>
          </div>
        </section>

        {/* Featured Story */}
        {!urlCategory && !urlQuery && !urlDestination && featuredArticle && (
          <section className="py-16 bg-ivory">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/5 h-[400px] lg:h-auto relative group overflow-hidden">
                  <Link to={`/journal/${featuredArticle.slug}`} className="block w-full h-full">
                    <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-6 left-6 bg-charcoal text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      Editor's Pick
                    </div>
                  </Link>
                </div>
                <div className="w-full lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
                  <span className="text-bronze font-bold tracking-widest uppercase text-sm mb-4">{featuredArticle.category}</span>
                  <Link to={`/journal/${featuredArticle.slug}`}>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight hover:text-bronze transition-colors">
                      {featuredArticle.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {featuredArticle.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-8">
                    <span>{featuredArticle.author}</span>
                    <span>•</span>
                    <span>{featuredArticle.publishedDate}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime} read</span>
                  </div>
                  <Link to={`/journal/${featuredArticle.slug}`}>
                    <Button className="bg-charcoal hover:bg-black text-white px-8 py-3">
                      Read Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Grid Area */}
        <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 bg-ivory">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              {(urlQuery || urlCategory || urlDestination) ? 'Search Results' : 'Stories to Inspire Your Next Journey'}
            </h2>
          </div>

          {filteredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedArticles.map(article => (
                  <JournalCard key={article.id} article={article} />
                ))}
              </div>
              
              {visibleCount < filteredArticles.length && (
                <div className="flex justify-center">
                  <Button onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)} variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8">
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState 
              title="No stories found" 
              message="Try adjusting your search or filters to find what you're looking for."
              actionLabel="Explore all stories"
              onClear={clearFilters} 
            />
          )}
        </section>

        {/* Find Your Inspiration */}
        {!urlQuery && !urlDestination && (
          <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">Find Your Inspiration</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Adventure', cat: 'Adventure', img: '/World/switzerland.jpg' },
                  { label: 'Culture & Heritage', cat: 'Food & Culture', img: '/India/Jaipur/Jaipur 1.jpg' },
                  { label: 'Food & Cuisine', cat: 'Food & Culture', img: '/World/Japan.jpg' },
                  { label: 'Luxury Travel', cat: 'Luxury Travel', img: '/World/Bali.jpg' },
                  { label: 'Wellness', cat: 'Wellness', img: '/World/Bali.jpg' },
                  { label: 'Sustainable Travel', cat: 'Sustainable Travel', img: '/World/Cambodia.jpg' },
                  { label: 'Destination Guides', cat: 'Destination Guides', img: '/World/Italy.jpg' },
                  { label: 'Travel Stories', cat: 'Travel Stories', img: '/India/alleppey.jpg' }
                ].map((item, idx) => (
                  <Link 
                    key={idx}
                    to={`/journal?category=${encodeURIComponent(item.cat)}`}
                    onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                    className="group relative h-40 rounded-2xl overflow-hidden"
                  >
                    <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                      <span className="text-white font-bold text-lg drop-shadow-md group-hover:text-bronzeLight transition-colors">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Stories From Every Corner */}
        {!urlQuery && !urlCategory && !urlDestination && (
          <section className="py-16 bg-ivory">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10">Stories From Every Corner of the World</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {corners.map(corner => {
                  const count = journalArticles.filter(a => a.destination === corner.name || a.country === corner.name).length;
                  if (count === 0) return null;
                  return (
                    <div key={corner.name} className="relative rounded-2xl overflow-hidden h-64 group">
                      <img src={corner.image} alt={corner.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-2xl font-bold text-white font-serif mb-1">{corner.name}</h3>
                        <p className="text-bronzeLight font-medium text-sm mb-4">{count} {count === 1 ? 'Story' : 'Stories'}</p>
                        <div className="flex flex-col gap-2">
                          <Link to={`/journal?destination=${encodeURIComponent(corner.name)}`}>
                            <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur text-white text-sm">
                              View Stories
                            </Button>
                          </Link>
                          {corner.hasDestPage && (
                            <Link to={`/destinations/${corner.slug}`} className="text-white/70 hover:text-white text-xs text-center transition-colors">
                              View full destination guide →
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Travel Tips */}
        {!urlQuery && !urlCategory && !urlDestination && (
          <section className="py-20 bg-stone/10">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
              <div className="flex flex-col items-center text-center mb-12">
                <span className="text-bronze font-bold tracking-widest uppercase text-sm mb-2">Practical Advice</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Travel Better. Travel Further.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {travelTips.map(article => (
                  <JournalCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Mock */}
        <section className="py-24 bg-charcoal text-white text-center px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-4">Stay Inspired, Wherever You Go.</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join our newsletter for weekly travel stories, exclusive guides, and tips delivered straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bronze"
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                disabled={isSubmitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                className="bg-bronze hover:bg-bronzeLight text-white px-8 py-4 rounded-full disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Subscribing...' : <>Subscribe <Send size={18} /></>}
              </Button>
            </form>
            <p className="text-gray-500 text-sm mt-4 text-center">*This is a frontend demonstration. No emails are actually stored.</p>
          </div>
        </section>

      </main>
      
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />
    </div>
  );
}
