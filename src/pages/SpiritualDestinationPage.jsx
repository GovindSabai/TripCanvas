import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategorySlider } from '../components/ui/CategorySlider';
import { SectionReveal } from '../components/ui/SectionReveal';
import { spiritualDestinations } from '../data/homeData';

export default function SpiritualDestinationPage() {
  const { id } = useParams();
  
  const name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-white min-h-[60vh] pt-24 pb-20">
      <SectionReveal>
        <CategorySlider 
          title={name} 
          titleColor="text-orange-800" 
          subtitle={`Discover the profound spiritual heritage and sacred significance of ${name}. Experience a journey of peace and devotion.`} 
          items={spiritualDestinations} 
        />
      </SectionReveal>
    </div>
  );
}
