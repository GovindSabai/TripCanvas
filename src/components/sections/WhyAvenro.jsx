import React from 'react';
import { MapPin, Star, Compass, Heart } from 'lucide-react';
import { SectionReveal } from '../ui/SectionReveal';

export function WhyAvenro() {
  const features = [
    {
      icon: <MapPin size={32} className="text-bronze" />,
      title: "Curated Destinations",
      description: "We handpick every location, ensuring only the most extraordinary and authentic places make our list."
    },
    {
      icon: <Star size={32} className="text-bronze" />,
      title: "Meaningful Experiences",
      description: "Connect deeply with local cultures through exclusive activities designed to leave a lasting impact."
    },
    {
      icon: <Compass size={32} className="text-bronze" />,
      title: "Thoughtful Planning",
      description: "Every detail is meticulously crafted so you can travel seamlessly without the stress of logistics."
    },
    {
      icon: <Heart size={32} className="text-bronze" />,
      title: "Travel With Intention",
      description: "Our sustainable practices ensure your journey positively impacts the communities and environments you visit."
    }
  ];

  return (
    <section className="py-desktop-rhythm bg-ivory border-t border-stone/10 max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <SectionReveal>
        <div className="text-center mb-16">
          <h2 className="text-h2 font-serif text-charcoal mb-4">Why TripCanvas</h2>
          <p className="text-stone max-w-2xl mx-auto">We believe travel should be transformative. Here is how we make every journey exceptional.</p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {features.map((feature, i) => (
          <SectionReveal key={i} delay={i * 0.15} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-serif text-charcoal mb-3">{feature.title}</h3>
            <p className="text-stone text-sm leading-relaxed">{feature.description}</p>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
