import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DestinationCard({ item, variant = 'default' }) {
  if (variant === 'international') {
    return (
      <Link to={item.id ? `/tour/${item.id}` : "/destinations"} className="relative bg-[#0f172a] rounded-lg p-6 flex flex-col items-center text-center justify-center border border-white/10 hover:border-bronze/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden group h-[200px] block w-full">
        {item.image && (
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-[#0f172a]/60" />
        <div className="relative z-10 flex flex-col h-full w-full transform transition-transform duration-700 group-hover:-translate-y-1">
          <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-gray-300 text-sm mb-6">{item.subtitle}</p>
          <div className="flex w-full justify-between items-end mt-auto gap-2">
            <div className="text-left">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider mb-1">{item.experienceType || 'PREMIUM EXPERIENCE'}</p>
              <p className="text-white text-sm leading-tight mb-1">{item.experienceDetails || 'Unforgettable luxury escapes'}</p>
              <p className="text-white font-bold">{item.price || '€850'}</p>
              <p className="text-[#C9A86A] text-[10px] mt-1">Prices may vary depending on your destination and travel preferences.</p>
            </div>
            <span className="bg-[#eab308] text-black text-xs md:text-sm px-3 md:px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition-colors shrink-0 self-end">
              Explore Now &rarr;
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'spiritual') {
    const isInternational = ['Bhutan', 'Thailand', 'Bali', 'Malaysia', 'Singapore', 'Vietnam'].includes(item.name);
    const targetUrl = isInternational ? (item.id ? `/tour/${item.id}` : "/destinations") : `/destinations/india?search=${item.name}`;

    return (
      <Link to={targetUrl} className="bg-gray-300 rounded-lg h-48 relative overflow-hidden group cursor-pointer block w-full hover:shadow-2xl hover:shadow-black/40 transition-shadow duration-500">
        {item.image && (
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 transition-opacity duration-700 group-hover:opacity-80" />
        <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 transform transition-transform duration-700 group-hover:-translate-y-1">
          <h3 className="text-white text-xl font-bold">{item.name}</h3>
          <div className="flex justify-between items-end">
            <div className="text-left pr-4">
              <p className="text-white/80 text-[10px] uppercase font-bold tracking-wider mb-1">{item.experienceType || 'SPIRITUAL EXPERIENCE'}</p>
              <p className="text-white text-sm font-medium leading-tight mb-1">{item.experienceDetails || 'Sacred temples • Himalayan serenity'}</p>
              <p className="text-white font-bold">{item.price || '€850'}</p>
              <p className="text-[#C9A86A] text-[10px] mt-1">Prices may vary depending on your destination and travel preferences.</p>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white shrink-0">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // default variant (Monsoon / Explore India)
  const isInternational = ['Bhutan', 'Thailand', 'Bali', 'Malaysia', 'Singapore', 'Vietnam'].includes(item.name);
  const targetUrl = isInternational ? (item.id ? `/tour/${item.id}` : "/destinations") : `/destinations/india?search=${item.name}`;

  return (
    <Link to={targetUrl} className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer block w-full hover:shadow-2xl hover:shadow-black/50 transition-shadow duration-500">
      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-700 group-hover:opacity-90" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="transform transition-all duration-700 translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100">
          <h3 className="text-white text-2xl font-bold mb-1">{item.name}</h3>
          <p className="text-gray-200 text-sm font-medium">{item.subtitle}</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="text-left pr-4">
            <p className="text-white/80 text-[10px] uppercase font-bold tracking-wider mb-1">{item.experienceType || 'CURATED EXPERIENCE'}</p>
            <p className="text-white text-sm font-medium leading-tight mb-1">{item.experienceDetails || 'Unforgettable travel moments'}</p>
            <p className="text-white font-bold">{item.price || '€850'}</p>
            <p className="text-[#C9A86A] text-[10px] mt-1">Prices may vary depending on your destination and travel preferences.</p>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white shrink-0">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
