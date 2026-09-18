import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionReveal } from '../ui/SectionReveal';
import { MapPreview } from '../ui/MapPreview';
import { useAdminData } from '../../context/AdminDataContext';

export function WorldExplorer() {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const navigate = useNavigate();
  const { getPublicDestinations, getPublicExperiences } = useAdminData();
  const destinations = getPublicDestinations();
  const experiences = getPublicExperiences();

  // Helper to get stats for a region
  const getRegionStats = (region) => {
    if (!region) return null;
    
    const regionDests = destinations.filter(d => d.region === region);
    
    // We map experiences to their destination, then check destination's region
    const destMap = {};
    destinations.forEach(d => { destMap[d.slug] = d.region; });
    
    const regionExps = experiences.filter(e => destMap[e.destinationSlug] === region);
    
    const featured = regionDests.length > 0 ? regionDests[0] : null;

    return {
      destCount: regionDests.length,
      expCount: regionExps.length,
      featured
    };
  };

  const handleRegionClick = (region) => {
    // If we wanted to link to a region page, we could. For now, navigate to destinations.
    navigate('/destinations');
  };

  const stats = hoveredRegion ? getRegionStats(hoveredRegion) : null;

  return (
    <section className="py-24 md:py-32 bg-ink text-ivory relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex flex-col items-center">
        
        <SectionReveal>
          <div className="text-center mb-16 md:mb-24">
            <span className="text-sm font-bold tracking-widest uppercase text-bronzeLight">06 — ONE WORLD</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4">
              From One Horizon to Another.
            </h2>
            <p className="text-ivory/70 max-w-xl mx-auto mt-6">
              Our curated collection spans the globe. Hover over a region to explore what's waiting for you.
            </p>
          </div>
        </SectionReveal>

        <div className="w-full relative max-w-5xl mx-auto aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1]">
          {/* Interactive Map */}
          <div className="absolute inset-0 z-0">
            <MapPreview 
              interactiveWorld={true} 
              hoveredRegion={hoveredRegion}
              onRegionHover={setHoveredRegion}
              onRegionClick={handleRegionClick}
            />
          </div>

          {/* Hover Card */}
          {stats && (
            <div className="absolute bottom-5 left-5 md:bottom-10 md:left-10 z-10 bg-ivory text-charcoal p-5 rounded-xl shadow-xl max-w-xs pointer-events-none animate-in fade-in zoom-in duration-300">
              <h3 className="text-xl font-serif font-bold text-bronze mb-1">{hoveredRegion}</h3>
              
              <div className="flex gap-4 mb-4 text-sm font-medium">
                <div>
                  <span className="text-lg font-bold">{stats.destCount}</span> Destinations
                </div>
                <div>
                  <span className="text-lg font-bold">{stats.expCount}</span> Experiences
                </div>
              </div>

              {stats.featured ? (
                <div className="pt-4 border-t border-stone/20">
                  <div className="text-xs uppercase tracking-widest text-stone mb-2">Featured</div>
                  <div className="flex items-center gap-3">
                    <img 
                      src={stats.featured.image} 
                      alt={stats.featured.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="font-serif font-bold">{stats.featured.name}</div>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-stone/20 text-stone text-sm">
                  More destinations coming soon
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
