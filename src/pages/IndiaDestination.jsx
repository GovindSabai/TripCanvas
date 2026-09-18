import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NewsletterBanner } from '../components/sections/NewsletterBanner';
import { ReviewsSlider } from '../components/sections/ReviewsSlider';
import { CategorySlider } from '../components/ui/CategorySlider';
import { SectionReveal } from '../components/ui/SectionReveal';
import { useAdminData } from '../context/AdminDataContext';
import { sliderData } from '../data/categoryData';
import { regionsData } from '../data/regionsData';
export default function IndiaDestination() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [cycle, setCycle] = useState(0);
  const { getPublicDestinations } = useAdminData();

  const dynamicRegions = getPublicDestinations()
    .filter(d => d.country === 'India')
    .map(d => ({
      name: d.name,
      packages: `${d.thingsToDo?.length || 5} Tour Packages`,
      image: d.image,
      type: 'region'
    }));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchInput(searchQuery);
      setActiveSearch(searchQuery);
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 500);
    }
  }, [location.search]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle(prev => prev + 1);
    }, 3500); // 3.5 seconds per cycle
    return () => clearInterval(interval);
  }, []);

  const isHindi = cycle % 2 !== 0;

  const handleSearch = () => {
    setActiveSearch(searchInput.trim());
  };

  const clearSearch = () => {
    setSearchInput("");
    setActiveSearch("");
  };

  // Combine all searchable items
  const allDestinations = [
    ...dynamicRegions,
    ...Object.values(sliderData).flat().map(item => ({ ...item, type: 'package' }))
  ];

  // Filter based on activeSearch
  const searchResults = activeSearch 
    ? allDestinations.filter(dest => 
        dest.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
        (dest.description && dest.description.toLowerCase().includes(activeSearch.toLowerCase()))
      )
    : [];

  const allRegionsGrid = [...dynamicRegions];

  const allStories = Object.values(regionsData)
    .flatMap(region => region.stories || [])
    .slice(0, 10); // Take top 10 stories

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
             {/* Using a beautiful Kerala backwaters image for India Hero */}
            <img 
              src="/India/alleppey.jpg" 
              alt="India Tour Packages" 
              className="w-full h-full object-cover object-center brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#b45309]/30" />
          </div>
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold drop-shadow-lg italic">
              India Tour Packages <span className="not-italic text-3xl md:text-4xl">—</span> Explore India with TripCanvas
            </h1>
          </div>
        </section>

        {/* Dekho Apna Desh Search Section */}
        <section className="py-16 px-5 max-w-[1440px] mx-auto text-center">
          <div className="relative inline-flex items-center justify-center mb-10 min-h-[100px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cycle}
                className="relative flex items-center justify-center space-x-3 md:space-x-4"
              >
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5, delay: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-blue-900 font-bold tracking-wide"
                >
                  Dekho
                </motion.span>
                
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-blue-900 font-bold tracking-wide"
                >
                  Apna
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide text-red-400 ${isHindi ? 'font-sans' : 'font-serif'}`}
                >
                  {isHindi ? "देश" : "Desh"}
                </motion.span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="max-w-2xl mx-auto mt-8 relative">
            <div className="flex items-center bg-white rounded-full border border-stone/20 shadow-md p-2 pl-6 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
              <Search className="text-stone/60 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search here..." 
                className="flex-grow outline-none bg-transparent text-charcoal"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {activeSearch ? (
          <section className="py-12 px-5 md:px-8 xl:px-12 max-w-[1440px] mx-auto min-h-[40vh]">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-serif text-blue-900 font-bold">
                Search Results for "{activeSearch}"
              </h2>
              <button 
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((item, idx) => (
                  <Link to={`/region/${item.name.toLowerCase().replace(/\s+/g, '-')}`} key={idx} className="relative h-72 rounded-xl overflow-hidden group cursor-pointer bg-stone/20 shadow-sm hover:shadow-xl transition-shadow duration-300 block">
                    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors z-20" />
                    <div className="absolute bottom-6 left-6 right-6 z-30">
                      <h3 className="text-white text-xl font-bold mb-1">{item.name}</h3>
                      {item.type === 'region' ? (
                        <p className="text-white/80 text-sm font-medium">{item.packages}</p>
                      ) : (
                        <p className="text-white/80 text-sm font-medium line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center max-w-3xl mx-auto my-10 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-serif text-charcoal font-bold mb-4">
                  Your next journey is still waiting.
                </h3>
                <p className="text-stone-500 mb-8 max-w-lg mx-auto">
                  We couldn't find an exact match for your search. Explore our curated destinations and discover somewhere new.
                </p>
                <button 
                  onClick={clearSearch}
                  className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Explore Destinations <span className="ml-2">→</span>
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Regions Grid */}
        <section className="py-12 px-5 md:px-8 xl:px-12 max-w-[1440px] mx-auto">
          {/* Row 1: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {allRegionsGrid.slice(0, 3).map((region, idx) => (
              <Link to={`/region/${region.name.toLowerCase().replace(/\s+/g, '-')}`} key={idx} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer bg-stone/20 shadow-sm hover:shadow-xl transition-shadow duration-300 block">
                <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors z-20" />
                <div className="absolute bottom-6 left-6 z-30">
                  <h3 className="text-white text-2xl font-bold mb-1">{region.name}</h3>
                  <p className="text-white/80 text-sm font-medium">{region.packages}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Row 2: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {allRegionsGrid.slice(3, 6).map((region, idx) => (
              <Link to={`/region/${region.name.toLowerCase().replace(/\s+/g, '-')}`} key={idx} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer bg-stone/20 shadow-sm hover:shadow-xl transition-shadow duration-300 block">
                <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors z-20" />
                <div className="absolute bottom-6 left-6 z-30">
                  <h3 className="text-white text-2xl font-bold mb-1">{region.name}</h3>
                  <p className="text-white/80 text-sm font-medium">{region.packages}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Row 3: 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {allRegionsGrid.slice(6, 10).map((region, idx) => (
              <Link to={`/region/${region.name.toLowerCase().replace(/\s+/g, '-')}`} key={idx} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer bg-stone/20 shadow-sm hover:shadow-xl transition-shadow duration-300 block">
                <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors z-20" />
                <div className="absolute bottom-6 left-6 z-30">
                  <h3 className="text-white text-xl font-bold mb-1">{region.name}</h3>
                  <p className="text-white/80 text-sm font-medium">{region.packages}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Row 4: 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {allRegionsGrid.slice(10, 14).map((region, idx) => (
              <Link to={`/region/${region.name.toLowerCase().replace(/\s+/g, '-')}`} key={idx} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer bg-stone/20 shadow-sm hover:shadow-xl transition-shadow duration-300 block">
                <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors z-20" />
                <div className="absolute bottom-6 left-6 z-30">
                  <h3 className="text-white text-xl font-bold mb-1">{region.name}</h3>
                  <p className="text-white/80 text-sm font-medium">{region.packages}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Row 5: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allRegionsGrid.slice(14).map((region, idx) => (
              <Link to={`/region/${region.name.toLowerCase().replace(/\s+/g, '-')}`} key={idx} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer bg-stone/20 shadow-sm hover:shadow-xl transition-shadow duration-300 block">
                <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors z-20" />
                <div className="absolute bottom-6 left-6 z-30">
                  <h3 className="text-white text-xl font-bold mb-1">{region.name}</h3>
                  <p className="text-white/80 text-sm font-medium">{region.packages}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories Sliders */}
        <SectionReveal><CategorySlider title="Leisure" titleColor="text-blue-900" subtitle="Relax, unwind, and enjoy unforgettable holiday experiences with handpicked leisure destinations perfect for families, couples, and friends." items={sliderData.Leisure} /></SectionReveal>
        <SectionReveal><CategorySlider title="Beaches" titleColor="text-teal-600" subtitle="Discover serene beaches, crystal-clear waters, and tropical vibes for the perfect seaside escape and relaxing coastal vacation." items={sliderData.Beaches} /></SectionReveal>
        <SectionReveal><CategorySlider title="Hill Stations" titleColor="text-emerald-700" subtitle="Experience cool weather, scenic mountain views, peaceful valleys, and refreshing nature retreats in beautiful hill destinations." items={sliderData.HillStations} /></SectionReveal>
        <SectionReveal><CategorySlider title="Wildlife" titleColor="text-amber-700" subtitle="Explore thrilling jungle safaris, rich biodiversity, and breathtaking national parks for an exciting wildlife adventure." items={sliderData.Wildlife} /></SectionReveal>
        <SectionReveal><CategorySlider title="Spiritual" titleColor="text-orange-600" subtitle="Visit sacred temples, holy rivers, and spiritual destinations that offer peace, devotion, and a deeply cultural experience." items={sliderData.Spiritual} /></SectionReveal>
        <SectionReveal><CategorySlider title="Wellness" titleColor="text-purple-700" subtitle="Rejuvenate your mind and body with wellness retreats, yoga sessions, spa therapies, and peaceful nature-based stays." items={sliderData.Wellness} /></SectionReveal>

        </>
        )}

        {/* Newsletter & Reviews */}
        <SectionReveal><NewsletterBanner /></SectionReveal>
        <SectionReveal><ReviewsSlider /></SectionReveal>

      </main>
    </div>
  );
}
