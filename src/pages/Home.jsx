import React from 'react';
import { Hero } from '../components/sections/Hero';
import { MonsoonDestinations } from '../components/sections/MonsoonDestinations';
import { TopSellingDestinations } from '../components/sections/TopSellingDestinations';
import { ExploreIndia } from '../components/sections/ExploreIndia';
import { SpiritualDestinations } from '../components/sections/SpiritualDestinations';
import { InternationalDestinations } from '../components/sections/InternationalDestinations';
import { PersonalTourManager } from '../components/sections/PersonalTourManager';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { FAQSection } from '../components/sections/FAQSection';
import { NewsletterBanner } from '../components/sections/NewsletterBanner';
import { ReviewsSlider } from '../components/sections/ReviewsSlider';
import { SectionReveal } from '../components/ui/SectionReveal';

export default function Home() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <SectionReveal delay={0.1}><MonsoonDestinations /></SectionReveal>
        <SectionReveal delay={0.1}><TopSellingDestinations /></SectionReveal>
        <SectionReveal delay={0.1}><ExploreIndia /></SectionReveal>
        <SectionReveal delay={0.1}><SpiritualDestinations /></SectionReveal>
        <SectionReveal delay={0.1}><InternationalDestinations /></SectionReveal>
        <SectionReveal delay={0.1}><PersonalTourManager /></SectionReveal>
        <SectionReveal delay={0.1}><WhyChooseUs /></SectionReveal>
        <SectionReveal delay={0.1}><FAQSection /></SectionReveal>
        <SectionReveal delay={0.1}><NewsletterBanner /></SectionReveal>
        <SectionReveal delay={0.1}><ReviewsSlider /></SectionReveal>
      </main>
    </div>
  );
}
