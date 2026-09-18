import React, { useState } from 'react';
import { DestinationCard } from '../ui/DestinationCard';
import { monsoonDestinations } from '../../data/homeData';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function MonsoonDestinations() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDestinations = monsoonDestinations.filter(dest => 
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dest.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 text-center bg-white">
      
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-3xl mx-auto mb-16 border border-[#a8c7fa] rounded-full p-2 bg-[#f8fbff] shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
        <Search className="text-gray-400 ml-3 mr-2 flex-shrink-0" size={24} />
        <input 
          type="text" 
          placeholder="Search here..." 
          className="flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-lg px-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[#0055ff] hover:bg-blue-700 text-white font-bold rounded-full px-8 py-3 transition-colors flex-shrink-0">
          Search
        </button>
      </div>

      <h2 className="text-3xl md:text-4xl font-serif text-[#1e293b] mb-3 italic">Indian Destination For Monsoon</h2>
      <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-10">
        Discover lush green landscapes, misty hills, cascading waterfalls, and unforgettable monsoon getaways across India.
      </p>

      {filteredDestinations.length > 0 ? (
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDestinations.map((dest) => (
            <motion.div
              key={dest.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
            >
              <DestinationCard item={dest} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl border border-gray-100 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Your next journey is still waiting.</h3>
          <p className="text-gray-500 max-w-lg mb-8 text-center leading-relaxed">
            We couldn’t find an exact match for your search. Explore our curated destinations and discover somewhere new.
          </p>
          <Link 
            to="/destinations"
            className="group flex items-center gap-2 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            Explore Destinations <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
