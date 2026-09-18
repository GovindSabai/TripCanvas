import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User } from 'lucide-react';
import { regionsData } from '../../data/regionsData';
import { internationalDestinations } from '../../data/homeData';
import { useAuth } from '../../context/AuthContext';
import { useAdminData } from '../../context/AdminDataContext';
import { UserAvatar } from '../ui/UserAvatar';
import { useToast } from '../../context/ToastContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdownTab, setActiveDropdownTab] = useState('India');
  const [forceCloseMegaMenu, setForceCloseMegaMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ experiences: [], journal: [], destinations: [] });
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const { getPublicExperiences, getPublicJournal } = useAdminData();
  const experiences = getPublicExperiences();
  const journalArticles = getPublicJournal();
  const { addToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logged out successfully!');
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };
  
  const isSolid = true; // Always solid since the hero is now pushed down

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Solid background past 10px
    if (currentScrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on scroll down past threshold, show on scroll up
    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      setIsHidden(true);
    } else if (currentScrollY < lastScrollY) {
      setIsHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile full-screen menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Clear search on route change
  useEffect(() => {
    setSearchQuery('');
    setIsSearchFocused(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, searchRef]);

  // Search Logic
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      
      const expResults = experiences.filter(exp => 
        exp.title.toLowerCase().includes(query) || 
        exp.destination.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query)
      ).slice(0, 3);
      
      const journalResults = journalArticles.filter(art => 
        art.title.toLowerCase().includes(query) ||
        (art.destination && art.destination.toLowerCase().includes(query)) ||
        art.category.toLowerCase().includes(query)
      ).slice(0, 3);
      
      const destResults = [];
      const allDestinations = [
        ...internationalDestinations.map(d => ({ name: d.name, type: 'World' })),
        ...Object.values(regionsData).map(r => ({ name: r.name, type: 'India' }))
      ];
      
      allDestinations.forEach(dest => {
        if (dest.name.toLowerCase().includes(query) && destResults.length < 3) {
          destResults.push(dest);
        }
      });
      
      setSearchResults({ experiences: expResults, journal: journalResults, destinations: destResults });
    } else {
      setSearchResults({ experiences: [], journal: [], destinations: [] });
    }
  }, [searchQuery]);

  const handleMegaMenuClick = () => {
    setForceCloseMegaMenu(true);
    setTimeout(() => setForceCloseMegaMenu(false), 300);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Destinations', 
      path: '#'
    },
    { name: 'Plan Your Trip', path: '/plan' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isSolid || isMobileMenuOpen ? 'bg-ivory text-charcoal shadow-sm' : 'bg-transparent text-ivory'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 flex items-center h-full w-[150px] md:w-[180px] shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute inset-0 flex items-center justify-start">
              <img 
                src="/Logo.png" 
                alt="TripCanvas Logo" 
                className={`w-[50%] md:w-[60%] h-auto object-contain transition-opacity duration-300 ${isSolid || isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'}`} 
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-start">
              <img 
                src="/Logo (Cream Navbar Background).png" 
                alt="TripCanvas Logo" 
                className={`w-[90%] md:w-[100%] h-auto object-contain transition-opacity duration-300 ${isSolid || isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
              />
            </div>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.dropdown && link.dropdown.some(d => location.pathname === d.path));
                
                if (link.dropdown) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative group"
                      onMouseLeave={() => setActiveDropdownTab('India')}
                    >
                      <div className="relative text-sm font-medium transition-colors hover:text-bronze group py-1 flex items-center gap-1 cursor-default">
                        {link.name}
                        <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        {!isActive && (
                          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-bronze transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-bronze"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </div>
                      
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 z-50 ${forceCloseMegaMenu ? 'opacity-0 pointer-events-none' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}>
                        {link.isMegaMenu ? (
                          <div className="bg-[#fcfaf5] text-charcoal shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-xl border border-stone/10 overflow-hidden flex flex-col transform-gpu origin-top scale-95 group-hover:scale-100 transition-transform duration-300 w-[550px] p-8">
                            <div className="mb-6">
                              <h3 className="text-sm font-bold text-[#b89565] uppercase tracking-widest mb-2">DISCOVER THE DESTINATIONS</h3>
                              <p className="text-base text-stone/70">Explore destinations curated by TripCanvas</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                              <Link onClick={handleMegaMenuClick} to="/destinations/india" className="block group/card relative overflow-hidden rounded-xl border border-stone/10 bg-stone/5 hover:bg-white hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between h-[180px]">
                                <div>
                                  <div className="w-10 h-10 mb-4 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white">
                                    <img src="https://flagcdn.com/w160/in.png" alt="India Flag" className="w-full h-full object-cover" />
                                  </div>
                                  <h4 className="text-lg font-bold text-charcoal mb-1">INDIA</h4>
                                  <p className="text-sm text-stone/70">States & regions</p>
                                </div>
                                <div className="text-sm font-bold text-[#b89565] flex items-center gap-2 group-hover/card:gap-3 transition-all">
                                  Explore India <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                              </Link>
                              
                              <Link onClick={handleMegaMenuClick} to="/destinations/world" className="block group/card relative overflow-hidden rounded-xl border border-stone/10 bg-stone/5 hover:bg-white hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between h-[180px]">
                                <div>
                                  <div className="w-10 h-10 mb-4 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-[#0057e7]">
                                    <span className="text-2xl leading-none -ml-0.5">🌍</span>
                                  </div>
                                  <h4 className="text-lg font-bold text-charcoal mb-1">WORLD</h4>
                                  <p className="text-sm text-stone/70">Global journeys</p>
                                </div>
                                <div className="text-sm font-bold text-[#b89565] flex items-center gap-2 group-hover/card:gap-3 transition-all">
                                  Explore World <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-ivory text-charcoal shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-lg py-2 min-w-[160px] border border-stone/10 overflow-hidden">
                            {link.dropdown.map(drop => (
                              <Link 
                                key={drop.name} 
                                to={drop.path} 
                                className="block px-5 py-2.5 text-sm hover:bg-stone/10 hover:text-bronze transition-colors"
                              >
                                {drop.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative text-sm font-medium transition-colors hover:text-bronze group py-1"
                  >
                    {link.name}
                    {!isActive && (
                      <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-bronze transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-bronze"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Content */}
          <div className="hidden lg:flex items-center gap-3 relative">
            
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center gap-2 border border-stone/30 rounded-full pl-4 pr-1.5 py-1.5 hover:shadow-md transition-shadow bg-white text-charcoal focus-within:shadow-md focus-within:border-bronze/50 w-[240px]">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm w-full font-medium placeholder-stone/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                <div className="p-1.5 flex-shrink-0">
                  <Search size={18} className="text-stone/70 stroke-[2.5]" />
                </div>
              </div>
              
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-[120%] w-[320px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-stone/10 py-3 flex flex-col z-50 overflow-hidden text-charcoal"
                  >
                    {searchResults.destinations.length > 0 && (
                      <div className="px-5 py-2">
                        <h4 className="text-xs font-bold text-stone/50 uppercase tracking-wider mb-2">Destinations</h4>
                        {searchResults.destinations.map((dest, i) => (
                          <Link key={i} to={`/destinations/${dest.type.toLowerCase()}`} onClick={() => setIsSearchFocused(false)} className="block py-1.5 text-sm font-medium hover:text-bronze">
                            {dest.name} <span className="text-stone/50 text-xs font-normal">in {dest.type}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.experiences.length > 0 && (
                      <div className="px-5 py-2 border-t border-stone/10 mt-1">
                        <h4 className="text-xs font-bold text-stone/50 uppercase tracking-wider mb-2">Experiences</h4>
                        {searchResults.experiences.map((exp, i) => (
                          <Link key={i} to={`/experiences/${exp.slug}`} onClick={() => setIsSearchFocused(false)} className="block py-1.5 text-sm font-medium hover:text-bronze truncate">
                            {exp.title}
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchResults.journal.length > 0 && (
                      <div className="px-5 py-2 border-t border-stone/10 mt-1">
                        <h4 className="text-xs font-bold text-stone/50 uppercase tracking-wider mb-2">Journal Stories</h4>
                        {searchResults.journal.map((art, i) => (
                          <Link key={i} to={`/journal/${art.slug}`} onClick={() => setIsSearchFocused(false)} className="block py-1.5 text-sm font-medium hover:text-bronze truncate">
                            {art.title}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.destinations.length === 0 && searchResults.experiences.length === 0 && searchResults.journal.length === 0 && (
                      <div className="px-5 py-4 text-center text-sm text-stone/50">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 border border-stone/30 rounded-full pl-3 pr-2 py-1.5 hover:shadow-md transition-shadow bg-white text-charcoal focus:outline-none"
            >
              <Menu size={18} />
              <UserAvatar user={currentUser} className="w-7 h-7 text-xs" />
            </button>

            {/* Desktop Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-[120%] w-[250px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-stone/10 py-3 flex flex-col z-50 overflow-hidden text-charcoal"
                >
                  {currentUser ? (
                    <>
                      <Link to="/profile" onClick={() => setIsDropdownOpen(false)} className="px-5 py-2.5 hover:bg-stone/5 font-bold text-sm border-b border-stone/10 pb-2 mb-1 block">Profile</Link>
                      <button onClick={() => { handleLogout(); setIsDropdownOpen(false); }} className="px-5 py-2.5 hover:bg-stone/5 font-bold text-sm text-left border-b border-stone/10 pb-3 mb-1 w-full">Log Out</button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsDropdownOpen(false)} className="px-5 py-2.5 hover:bg-stone/5 font-bold text-sm border-b border-stone/10 pb-3 mb-1 block">Log In</Link>
                  )}
                  
                  <Link to="/experiences" onClick={() => setIsDropdownOpen(false)} className="px-5 py-2.5 hover:bg-stone/5 text-sm">Experiences</Link>
                  <Link to="/journal" onClick={() => setIsDropdownOpen(false)} className="px-5 py-2.5 hover:bg-stone/5 text-sm mb-2">Journal</Link>
                  
                  <div className="px-4 mt-2 pt-3 border-t border-stone/10">
                    <Link to="/plan" onClick={() => setIsDropdownOpen(false)} className="block w-full bg-charcoal text-ivory text-center py-2.5 rounded-lg font-bold text-sm hover:bg-bronze transition-colors">Book Now</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </div>

          {/* Mobile Menu Toggle (Replaces desktop right content on small screens) */}
          <div className="lg:hidden flex items-center">
            <button
              className="relative z-50 p-2 text-charcoal bg-white rounded-full shadow-sm border border-stone/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-ivory text-charcoal pt-24 px-6 flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Mobile Search */}
            <div className="mb-8">
              <div className="flex items-center gap-2 border border-stone/30 rounded-full pl-4 pr-1.5 py-2 focus-within:border-bronze/50 w-full bg-white relative">
                <input 
                  type="text" 
                  placeholder="Search destinations, experiences..." 
                  className="bg-transparent border-none outline-none text-base w-full font-medium placeholder-stone/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                />
                <div className="p-1.5 flex-shrink-0">
                  <Search size={20} className="text-stone/70 stroke-[2.5]" />
                </div>
              </div>
              
              {/* Mobile Search Results inline */}
              <AnimatePresence>
                {searchQuery.trim().length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 bg-white rounded-xl shadow-sm border border-stone/10 overflow-hidden"
                  >
                    {searchResults.destinations.length > 0 && (
                      <div className="px-5 py-2">
                        <h4 className="text-xs font-bold text-stone/50 uppercase tracking-wider mb-2">Destinations</h4>
                        {searchResults.destinations.map((dest, i) => (
                          <Link key={i} to={`/destinations/${dest.type.toLowerCase()}`} onClick={() => { setIsSearchFocused(false); setIsMobileMenuOpen(false); }} className="block py-2 text-sm font-medium hover:text-bronze border-b border-stone/5 last:border-0">
                            {dest.name} <span className="text-stone/50 text-xs font-normal">in {dest.type}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.experiences.length > 0 && (
                      <div className="px-5 py-2 border-t border-stone/10">
                        <h4 className="text-xs font-bold text-stone/50 uppercase tracking-wider mb-2">Experiences</h4>
                        {searchResults.experiences.map((exp, i) => (
                          <Link key={i} to={`/experiences/${exp.slug}`} onClick={() => { setIsSearchFocused(false); setIsMobileMenuOpen(false); }} className="block py-2 text-sm font-medium hover:text-bronze truncate border-b border-stone/5 last:border-0">
                            {exp.title}
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchResults.journal.length > 0 && (
                      <div className="px-5 py-2 border-t border-stone/10">
                        <h4 className="text-xs font-bold text-stone/50 uppercase tracking-wider mb-2">Journal</h4>
                        {searchResults.journal.map((art, i) => (
                          <Link key={i} to={`/journal/${art.slug}`} onClick={() => { setIsSearchFocused(false); setIsMobileMenuOpen(false); }} className="block py-2 text-sm font-medium hover:text-bronze truncate border-b border-stone/5 last:border-0">
                            {art.title}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.destinations.length === 0 && searchResults.experiences.length === 0 && searchResults.journal.length === 0 && (
                      <div className="px-5 py-4 text-center text-sm text-stone/50">
                        No results found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <nav className="flex flex-col gap-6 text-2xl font-serif flex-shrink-0">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.dropdown ? (
                    <div>
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block ${location.pathname === link.path ? 'text-bronze' : ''}`}
                      >
                        {link.name}
                      </Link>
                      <div className="flex flex-col gap-3 mt-3 ml-4 text-xl">
                        {link.dropdown.map(drop => (
                          <Link 
                            key={drop.name} 
                            to={drop.path} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block ${(location.pathname === drop.path) ? 'text-bronze' : 'text-charcoal/70'}`}
                          >
                            {drop.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block ${location.pathname === link.path ? 'text-bronze' : ''}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                 <Link to="/experiences" onClick={() => setIsMobileMenuOpen(false)} className="block">Experiences</Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                 <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)} className="block">Journal</Link>
              </motion.div>
            </nav>
            <div className="mt-auto pb-12 flex flex-col gap-4">
              <div className="flex justify-around py-6 border-t border-stone/20">
                {currentUser ? (
                  <>
                    <Link to="/profile" className="flex flex-col items-center gap-2 text-sm font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserAvatar user={currentUser} className="w-6 h-6 text-[10px]" />
                      <span>Profile</span>
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex flex-col items-center gap-2 text-sm font-bold">
                      <User size={24} />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="flex flex-col items-center gap-2 text-sm font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                    <User size={24} />
                    <span>Log In</span>
                  </Link>
                )}
              </div>
              <Link to="/plan" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-charcoal text-ivory py-4 rounded-xl font-bold flex items-center justify-center text-center">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
