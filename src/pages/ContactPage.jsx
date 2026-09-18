import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { ContactHero } from '../components/contact/ContactHero';
import { HelpCategories } from '../components/contact/HelpCategories';
import { TravelConcierge } from '../components/contact/TravelConcierge';
import { ContactFAQ } from '../components/contact/ContactFAQ';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get('topic') || 'general');

  return (
    <PageTransition>
      <div className="bg-ivory text-charcoal">
        <ContactHero />
        <HelpCategories onSelect={setSelectedTopic} />
        <TravelConcierge selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />
        <ContactFAQ />
      </div>
    </PageTransition>
  );
}
