import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sun, Activity, ArrowRight } from 'lucide-react';


export function ExperienceCard({ experience }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(experience.price);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[520px] relative">
      <div className="relative h-56 shrink-0 overflow-hidden">
        <Link to={`/experiences/${experience.slug}`} className="block w-full h-full">
          <img 
            src={experience.image} 
            alt={experience.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none lg:block hidden"></div>
        </Link>
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-charcoal tracking-wide uppercase shadow-sm">
            {experience.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-bronze font-semibold uppercase tracking-wider mb-2">
          <span>{experience.destination}, {experience.country}</span>
        </div>
        
        <Link to={`/experiences/${experience.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif line-clamp-2 leading-tight hover:text-bronze transition-colors">
            {experience.title}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {experience.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600 mb-6 font-medium mt-auto">
          <div className="flex items-center gap-1.5"><Clock size={14} className="text-bronze" /> {experience.duration}</div>
          <div className="flex items-center gap-1.5"><Sun size={14} className="text-bronze" /> {experience.bestSeason}</div>
          <div className="flex items-center gap-1.5"><Activity size={14} className="text-bronze" /> {experience.activityLevel}</div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col mt-auto gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">From</span>
              <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
            </div>
            <Link 
              to={`/experiences/${experience.slug}`}
              className="flex items-center gap-2 text-bronze font-semibold text-sm hover:text-bronzeLight transition-colors"
            >
              View <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="text-[10px] text-[#C9A86A] italic leading-tight">
            Prices may vary depending on your destination and travel preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
