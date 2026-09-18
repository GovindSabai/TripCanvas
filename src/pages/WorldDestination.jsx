import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NewsletterBanner } from '../components/sections/NewsletterBanner';
import { ReviewsSlider } from '../components/sections/ReviewsSlider';
import { SectionReveal } from '../components/ui/SectionReveal';
import { useAdminData } from '../context/AdminDataContext';

const heroImages = [
  { url: '/World/USA.jpg', alt: 'New York, USA' },
  { url: '/World/Malaysia.jpg', alt: 'Marina Bay, Singapore' },
  { url: '/World/France.jpg', alt: 'Paris, France' }
];

// Helper to render tour cards cleanly
const TourCardInner = ({ dest, price, imageHeightClass = "h-[260px]" }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone/10 hover:shadow-md transition-shadow cursor-pointer h-full mx-3 flex flex-col min-h-[450px]">
    <div className={`${imageHeightClass} overflow-hidden relative shrink-0`}>
      <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white p-1 shadow-md">
         <img src="/Logo.png" alt="Icon" className="w-full h-full object-contain" />
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex-grow">
        <h4 className="font-bold text-lg text-charcoal mb-2">{dest.name}</h4>
        <p className="text-stone text-sm flex items-center gap-1 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {dest.duration || '6 Days 5 Nights'}
        </p>
      </div>
      <div className="shrink-0 mt-auto">
        <div className="border-t border-stone/10 pt-4 flex items-center justify-between">
          <span className="text-xs text-stone">From</span>
          <span className="font-bold text-charcoal">{price || '€50,000.00'}</span>
        </div>
        <p className="text-[10px] mt-2" style={{ color: '#C9A86A' }}>Prices may vary depending on your destination and travel preferences.</p>
      </div>
    </div>
  </div>
);

// Marquee for "Trending Now" (shows 2 at a time, continuous loop)
const MarqueeSlider = ({ items, prices }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full overflow-hidden relative group py-4">
      {[0, 1].map((set) => (
        <motion.div
          key={set}
          className="flex shrink-0"
          style={{ width: `${Math.max(100, (items.length / 2) * 100)}%` }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {items.map((dest, i) => (
            <div 
              key={i} 
              style={{ width: `${100 / Math.max(1, items.length)}%` }} 
              onClick={() => navigate(dest.id ? `/tour/${dest.id}` : `/tour/${dest.name.toLowerCase()}`)}
            >
              <TourCardInner dest={dest} price={prices[i % prices.length]} imageHeightClass="h-[350px]" />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// PingPong Slider for "Southeast Asian" and "European" (shows 3 at a time, bounces randomly)
const PingPongSlider = ({ items, prices, title, subtitle, bgClass="" }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({ index: 0, direction: 1 });
  const visibleCount = 3;

  useEffect(() => {
    if (!items || items.length <= visibleCount) return;
    const timer = setInterval(() => {
      setState((prev) => {
        let next = prev.index + prev.direction;
        let newDir = prev.direction;
        
        // Randomly change direction occasionally (25% chance) if not at edges
        if (Math.random() < 0.25 && next > 0 && next < items.length - visibleCount) {
          newDir = -prev.direction;
          next = prev.index + newDir;
        }

        // Bounce off edges
        if (next >= items.length - visibleCount) {
          next = items.length - visibleCount;
          newDir = -1;
        } else if (next <= 0) {
          next = 0;
          newDir = 1;
        }
        
        return { index: next, direction: newDir };
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handlePrev = () => {
    setState(prev => ({ ...prev, index: Math.max(0, prev.index - 1) }));
  };

  const handleNext = () => {
    setState(prev => ({ ...prev, index: Math.min(items.length - visibleCount, prev.index + 1) }));
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-[1440px] mx-auto px-2 md:px-5">
        <div className="relative mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-blue-900 font-bold italic mb-4">
              {title}
            </h2>
            <p className="text-stone">
              {subtitle}
            </p>
          </div>
          {items.length > visibleCount && (
            <div className="md:absolute right-0 bottom-0 flex justify-center md:justify-end gap-4 mt-6 md:mt-0">
              <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center hover:bg-stone/10 transition bg-white text-stone shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNext} className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center hover:bg-stone/10 transition bg-white text-stone shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden w-full relative py-4">
          <motion.div 
            className="flex"
            style={{ width: `${Math.max(100, (items.length / visibleCount) * 100)}%` }}
            animate={{ x: `-${state.index * (100 / items.length)}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {items.map((dest, i) => (
              <div 
                key={i} 
                style={{ width: `${100 / items.length}%` }} 
                onClick={() => navigate(dest.id ? `/tour/${dest.id}` : `/tour/${dest.name.toLowerCase()}`)}
              >
                <TourCardInner dest={dest} price={prices[i % prices.length]} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
};

export default function WorldDestination() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const { getPublicDestinations } = useAdminData();

  const internationalDestinations = getPublicDestinations().filter(d => d.country !== 'India');

  // Auto-slide hero images every 5 seconds (right to left effect)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchInput(searchQuery);
      setActiveSearch(searchQuery);
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveSearch(searchInput.trim());
      navigate(`/destinations/world?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      setActiveSearch('');
      navigate('/destinations/world');
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setActiveSearch('');
    navigate('/destinations/world');
  };

  // Filter based on search
  const filteredDestinations = internationalDestinations.filter(dest =>
    dest.name.toLowerCase().includes(activeSearch.toLowerCase())
  );

  // Data for the 3 dynamic sections
  const trendingItems = internationalDestinations.slice(0, 5); // 5 tours
  const seaItems = internationalDestinations.filter(d => ['Asia', 'Oceania'].includes(d.region));
  const euItems = internationalDestinations.filter(d => ['Europe'].includes(d.region));

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        
        {/* Hero Section (Auto Slider) */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentHeroIdx}
              src={heroImages[currentHeroIdx].url}
              alt={heroImages[currentHeroIdx].alt}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#b45309]/30" />
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold drop-shadow-lg flex flex-col items-center">
              <span className="text-2xl md:text-3xl uppercase tracking-widest font-sans mb-2">Explore</span>
              <span className="italic">{heroImages[currentHeroIdx].alt.split(',')[0]}</span>
            </h1>
          </div>
        </section>

        {/* INTERNATIONAL EXPLORE WORLD Section */}
        <section className="py-16 px-5 max-w-[1440px] mx-auto text-center">
          <div className="mb-10">
            <h3 className="text-bronze font-semibold tracking-widest uppercase text-sm mb-2 flex items-center justify-center gap-4">
              <span className="w-12 h-[2px] bg-bronze"></span>
              INTERNATIONAL
              <span className="w-12 h-[2px] bg-bronze"></span>
            </h3>
            <h2 className="text-4xl md:text-5xl font-serif text-blue-900 font-bold italic mb-6">
              EXPLORE WORLD
            </h2>
          </div>

          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleSearch} className="relative flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full bg-white overflow-hidden border border-stone/20 transition-all focus-within:shadow-[0_4px_25px_rgba(196,164,132,0.3)] focus-within:border-bronze/50">
              <div className="pl-6 pr-3 py-4 text-stone/50">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search international destinations..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-grow py-4 px-2 outline-none text-charcoal bg-transparent placeholder:text-stone/50 font-medium"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="pr-4 py-4 text-stone/40 hover:text-charcoal transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold transition-colors mx-2 rounded-full h-[calc(100%-16px)] flex items-center"
              >
                Search
              </button>
            </form>
          </div>
          <p className="text-stone max-w-2xl mx-auto text-sm">
            Discover International enchanting destinations, from the tranquil seas to majestic mountains. <br/>
            With TripCanvas Tourism Pvt.Ltd
          </p>

          {/* Grid of International Destinations */}
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative h-[250px] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/tour/${dest.id}`)}
                  >
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                      <p className="text-sm font-medium text-white/80">1 Tour</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-stone">
                  No destinations found matching "{activeSearch}". Try another keyword.
                </div>
              )}
            </div>
          </SectionReveal>
        </section>

        {/* Trending Now */}
        <section className="py-16 bg-ivory">
          <div className="max-w-[1440px] mx-auto text-center px-2 md:px-5">
            <h2 className="text-3xl md:text-4xl font-serif text-blue-900 font-bold italic mb-4">
              Trending Now
            </h2>
            <p className="text-stone mb-12 max-w-2xl mx-auto">
              Check out the most popular travel destinations loved by travelers for unforgettable holidays and unique experiences.
            </p>
            <MarqueeSlider 
              items={trendingItems} 
              prices={['€54,999.00', '€62,500.00', '€48,000.00', '€75,000.00', '€50,000.00']} 
            />
          </div>
        </section>

        {/* Southeast Asian Countries */}
        <PingPongSlider 
          title="Southeast Asian Countries"
          subtitle="Explore tropical beaches, vibrant cities, rich traditions, and budget-friendly adventures in Southeast Asia."
          items={seaItems} 
          prices={['€35,500.00', '€42,000.00', '€50,999.00', '€38,000.00', '€44,500.00']} 
        />

        {/* European Countries */}
        <PingPongSlider 
          title="European Countries"
          subtitle="Discover timeless beauty, iconic landmarks, scenic landscapes, and unforgettable cultural experiences across Europe."
          items={euItems} 
          prices={['€160,000.00', '€150,000.00', '€200,000.00', '€259,999.99', '€180,000.00']} 
          bgClass="bg-ivory"
        />

        {/* Newsletter & Reviews (From Home Page) */}
        <NewsletterBanner />
        <div className="py-10">
          <ReviewsSlider />
        </div>

      </main>
    </div>
  );
}
