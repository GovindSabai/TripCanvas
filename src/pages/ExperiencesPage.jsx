import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Compass, ChevronDown } from 'lucide-react';
import { experiences, EXPERIENCE_CATEGORIES, TRAVEL_STYLES } from '../data/experiences';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/ui/FilterPanel';
import { ExperienceCard } from '../components/ui/ExperienceCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

const ITEMS_PER_PAGE = 9;

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    travelStyle: '',
    region: ''
  });
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filter Logic (AND logic)
  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exp.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeFilters.category ? exp.category === activeFilters.category : true;
      const matchStyle = activeFilters.travelStyle ? exp.travelStyle === activeFilters.travelStyle : true;
      const matchRegion = activeFilters.region ? exp.region === activeFilters.region : true;
      return matchSearch && matchCategory && matchStyle && matchRegion;
    });
  }, [searchQuery, activeFilters]);

  const displayedExperiences = filteredExperiences.slice(0, visibleCount);

  const handleFilterChange = (groupId, option) => {
    setActiveFilters(prev => ({ ...prev, [groupId]: option }));
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const clearFilters = () => {
    setActiveFilters({ category: '', travelStyle: '', region: '' });
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filterGroups = [
    { id: 'category', label: 'Category', options: EXPERIENCE_CATEGORIES.slice(0, 6) },
    { id: 'travelStyle', label: 'Travel Style', options: TRAVEL_STYLES.slice(0, 5) },
    { id: 'region', label: 'Region', options: ['Asia', 'Europe', 'Americas', 'Africa', 'Oceania'] }
  ];

  const featuredExp = experiences.find(e => e.id === 'exp-1') || experiences[0];

  return (
    <div className="bg-ivory flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/Experience/Front.jpg" 
              alt="Unforgettable Experiences" 
              className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-ivory/90" />
          </div>
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-lg mb-4"
            >
              Unforgettable Experiences
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 font-medium"
            >
              Discover curated journeys that go beyond the ordinary.
            </motion.p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
            <ChevronDown size={32} />
          </div>
        </section>

        {/* Category Navigation Pills */}
        <section className="py-8 border-b border-gray-200 bg-white sticky top-[80px] z-30 shadow-sm">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              <button 
                onClick={() => handleFilterChange('category', '')}
                className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${!activeFilters.category ? 'bg-charcoal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                All Experiences
              </button>
              {EXPERIENCE_CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleFilterChange('category', cat)}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${activeFilters.category === cat ? 'bg-charcoal text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-12 flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Top Filter Mobile */}
          <aside className="w-full lg:w-1/4 flex flex-col gap-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search experiences..." />
            <FilterPanel 
              filters={filterGroups}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Grid Area */}
          <div className="w-full lg:w-3/4 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 font-serif">
                {filteredExperiences.length} {filteredExperiences.length === 1 ? 'Experience' : 'Experiences'}
              </h2>
            </div>

            {filteredExperiences.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {displayedExperiences.map(exp => (
                    <ExperienceCard key={exp.id} experience={exp} />
                  ))}
                </div>
                
                {visibleCount < filteredExperiences.length && (
                  <div className="flex justify-center">
                    <Button onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)} variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white px-8">
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </div>
        </div>

        {/* Featured Block */}
        {featuredExp && (
          <section className="py-20 bg-charcoal text-white my-12">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden aspect-video md:aspect-square lg:aspect-video relative">
                <img src={featuredExp.image} alt={featuredExp.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 bg-bronze text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Featured Experience
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <span className="text-bronzeLight font-semibold tracking-widest uppercase text-sm mb-4">{featuredExp.destination}</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">{featuredExp.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{featuredExp.description}</p>
                <div className="mb-8">
                  <div className="text-white/70 text-sm mb-1">From</div>
                  <div className="text-3xl font-bold text-white mb-2">${featuredExp.price}</div>
                  <p className="text-[#C9A86A] text-xs italic">
                    Prices may vary depending on your destination and travel preferences.
                  </p>
                </div>
                <Link to={`/experiences/${featuredExp.slug}`}>
                  <Button className="bg-bronze hover:bg-bronzeLight text-white px-8 py-4 text-lg">
                    Discover Details
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Explore by Travel Style (Pills/Grid crossover) */}
        <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Explore by Travel Style</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRAVEL_STYLES.slice(0, 8).map((style, idx) => {
              const bgImages = [
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1546942111-4808a38a7989?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=600&auto=format&fit=crop'
              ];
              return (
                <button 
                  key={style}
                  onClick={() => {
                    handleFilterChange('travelStyle', style);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="group relative h-40 rounded-2xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-bronze"
                >
                  <img src={bgImages[idx]} alt={style} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <span className="text-white font-bold text-lg md:text-xl drop-shadow-md group-hover:text-bronzeLight transition-colors">{style}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
