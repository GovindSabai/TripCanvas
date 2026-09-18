import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { AboutHero } from '../components/about/AboutHero';
import { AboutIntro } from '../components/about/AboutIntro';
import { PhilosophySection } from '../components/about/PhilosophySection';
import { HorizontalStorytelling } from '../components/about/HorizontalStorytelling';
import { StatsSection } from '../components/about/StatsSection';
import { JourneyTimeline } from '../components/about/JourneyTimeline';
import { TravelPerspectives } from '../components/about/TravelPerspectives';
import { WorldExplorer } from '../components/about/WorldExplorer';
import { TeamSection } from '../components/about/TeamSection';
import { ValuesSection } from '../components/about/ValuesSection';
import { JournalPreview } from '../components/about/JournalPreview';
import { CinematicCTA } from '../components/about/CinematicCTA';
import { ReviewsSlider } from '../components/sections/ReviewsSlider';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="bg-ivory text-charcoal">
        <AboutHero />
        <AboutIntro />
        <PhilosophySection />
        <HorizontalStorytelling />
        <StatsSection />
        <JourneyTimeline />
        <TravelPerspectives />
        <WorldExplorer />
        <TeamSection />
        <ValuesSection />
        <JournalPreview />
        <CinematicCTA />
        <ReviewsSlider />
      </div>
    </PageTransition>
  );
}
