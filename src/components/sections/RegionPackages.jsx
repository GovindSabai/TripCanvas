import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RegionPackages({ region }) {
  return (
    <section className="py-16 bg-white max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      {/* Packages Grid */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-charcoal mb-10 font-serif">
          {region.name} Tour Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {region.packages.map((pkg) => (
            <Link to={`/tour/${pkg.id}`} key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col group cursor-pointer block">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-charcoal mb-2 group-hover:text-blue-600 transition-colors">{pkg.name}</h3>
                <div className="flex items-center text-sm text-stone-500 mb-2">
                  <Clock size={14} className="mr-1.5" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-lg text-charcoal">{pkg.price || '€850'}</span>
                  <p className="text-[#C9A86A] text-[10px] mt-1">Prices may vary depending on your destination and travel preferences.</p>
                </div>
                <div className="mt-auto border-t border-slate-100 pt-4 flex justify-end items-center">
                  <span className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors">View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Region Detailed Description */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 font-serif">
          {region.packagesTitle}
        </h2>
        <p className="text-stone-600 mb-10 leading-relaxed text-sm md:text-base max-w-5xl">
          {region.packagesDescription}
        </p>

        <h3 className="text-xl md:text-2xl font-bold text-charcoal mb-4 font-serif">
          {region.name}
        </h3>
        <div className="space-y-4 text-stone-600 leading-relaxed text-sm md:text-base max-w-5xl">
          {region.aboutText?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          )) || <p>Discover the amazing experiences waiting for you in {region.name}.</p>}
        </div>
      </div>

      {/* Why Visit Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center bg-slate-50 p-8 rounded-2xl">
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-6 font-serif">
            Why Visit {region.name}?
          </h3>
          <ul className="space-y-4">
            {(region.whyVisit?.points || ["Amazing natural beauty", "Rich cultural heritage", "Unforgettable experiences"]).map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-3 text-lg leading-none">✨</span>
                <span className="text-stone-700 text-sm md:text-base font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <img 
            src={region.whyVisit?.image || region.heroImage} 
            alt={`Why visit ${region.name}`} 
            className="w-full h-auto rounded-xl shadow-lg object-cover max-h-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
