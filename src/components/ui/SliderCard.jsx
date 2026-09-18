import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SliderCard({ item }) {
  return (
    <Link to={item.link ? item.link : (item.id ? `/tour/${item.id}` : "/destinations")} className="block w-[300px] md:w-[380px] shrink-0 border border-stone/20 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Destination seal icon */}
        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center p-1">
           <img src="/Logo.png" alt="TripCanvas" className="w-full h-full object-contain opacity-70" />
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-charcoal mb-2">{item.name}</h3>
        
        <div className="flex items-center text-stone text-sm mb-4">
          <Clock size={14} className="mr-1.5" />
          <span>{item.duration || 'Flexible duration'}</span>
        </div>
        
        <div className="border-t border-stone/10 pt-4">
          <p className="text-sm text-charcoal/80 leading-relaxed line-clamp-2 mb-2">
            {item.description || 'Experience the best of this destination with our curated experiences tailored just for you.'}
          </p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-charcoal">{item.price || '€850'}</span>
          </div>
          <p className="text-[#C9A86A] text-[10px] mt-1">Prices may vary depending on your destination and travel preferences.</p>
        </div>
      </div>
    </Link>
  );
}
