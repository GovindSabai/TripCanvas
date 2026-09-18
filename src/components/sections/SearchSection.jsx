import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Compass } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Toast } from '../ui/Toast';

export function SearchSection() {
  const [showToast, setShowToast] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <section className="relative z-20 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 -mt-16 md:-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-lg shadow-xl p-6 md:p-8"
      >
        <h2 className="text-xl md:text-2xl font-serif text-charcoal mb-6">Where Will You Go Next?</h2>
        
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone uppercase tracking-wider flex items-center gap-2">
              <MapPin size={14} /> Destination
            </label>
            <Input placeholder="Anywhere" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone uppercase tracking-wider flex items-center gap-2">
              <Calendar size={14} /> Dates
            </label>
            <Input type="date" className="text-stone" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone uppercase tracking-wider flex items-center gap-2">
              <Users size={14} /> Travelers
            </label>
            <Select defaultValue="2">
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4+ Travelers</option>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone uppercase tracking-wider flex items-center gap-2">
              <Compass size={14} /> Travel Style
            </label>
            <Select defaultValue="all">
              <option value="all">All Styles</option>
              <option value="adventure">Adventure</option>
              <option value="luxury">Luxury</option>
              <option value="culture">Culture</option>
            </Select>
          </div>
          
          <div className="pt-4 lg:pt-0">
            <Button type="submit" className="w-full h-11">Explore</Button>
          </div>
        </form>
      </motion.div>

      <Toast 
        isVisible={showToast} 
        message="Search functionality coming soon." 
        onClose={() => setShowToast(false)} 
      />
    </section>
  );
}
