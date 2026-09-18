import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { regionsData } from '../data/regionsData';
import { RegionHero } from '../components/sections/RegionHero';
import { RegionPackages } from '../components/sections/RegionPackages';
import { RegionInfo } from '../components/sections/RegionInfo';
import { RegionFAQ } from '../components/sections/RegionFAQ';
import { NewsletterBanner } from '../components/sections/NewsletterBanner';

export default function RegionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const regionId = id || '';
  const formattedName = regionId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Define specific places for dynamic generation
  const placesMap = {
    'meghalaya': ['Shillong', 'Cherrapunji', 'Dawki'],
    'goa': ['North Goa', 'South Goa', 'Panaji', 'Calangute', 'Baga', 'Anjuna', 'Palolem', 'Dudhsagar'],
    'bhutan': ['Thimphu', 'Paro', 'Punakha', 'Phobjikha'],
    'thailand': ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi']
  };

  const placesToGenerate = placesMap[regionId] || [formattedName];

  const imageMap = {
    'Shillong': '/India/Meghalaya/Shillong.jpg',
    'Cherrapunji': '/India/Meghalaya/Cherranpunji.jpg',
    'Dawki': '/India/Meghalaya/Dawki.jpg',
    'North Goa': '/India/Goa/North goa.jpg',
    'South Goa': '/India/Goa/south goa.jpg',
    'Panaji': '/India/Goa/Panaji.jpg',
    'Calangute': '/India/Goa/Calangute.jpg',
    'Baga': '/India/Goa/Baga.jpg',
    'Anjuna': '/India/Goa/Anjuna.jpg',
    'Palolem': '/India/Goa/Palolem Beach, Goa.jpg',
    'Dudhsagar': '/India/Goa/Dudhsagar.jpg',
    'Bangkok': '/India/Thailand/Bangok.jpg',
    'Phuket': '/India/Thailand/Phuket.jpg',
    'Pattaya': '/India/Thailand/Pattaya.jpg',
    'Chiang Mai': '/India/Thailand/Chiang mai.jpg',
    'Krabi': '/India/Thailand/Karabi.jpg'
  };

  const dynamicPackages = placesToGenerate.map((placeName, idx) => ({
    id: `${regionId}-${idx + 1}`,
    name: `${placeName} Explorer`,
    duration: "4 days 3 nights",
    tourType: "Daily Tour",
    groupSize: "Unlimited",
    languages: "English, Hindi",
    image: imageMap[placeName] || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop",
    gallery: [imageMap[placeName] || "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop"],
    about: `The ${placeName} Explorer tour offers a captivating blend of rich heritage and stunning landscapes.`,
    highlights: [
      `Immerse in the grandeur of ${placeName}'s marvels.`,
      "Discover hidden gems and local markets."
    ],
    included: [
      "Accommodation in well-appointed hotels.",
      `Guided tours of ${placeName}.`
    ],
    excluded: [
      "Airfare or Train tickets.",
      "Personal expenses."
    ],
    itinerary: [
      {
        day: "Day 1",
        title: `Arrive in ${placeName}`,
        description: `Welcome to ${placeName}! On arrival, check in at your hotel.`
      }
    ],
    faqs: []
  }));

    const dynamicStories = [
      {
        id: `${regionId}-story-1`,
        title: `The Ultimate Guide to ${formattedName}`,
        shortDescription: `Everything you need to know before visiting ${formattedName}, from local customs to must-see hidden gems.`,
        category: "Guide",
        heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: `${regionId}-story-2`,
        title: `A Local's Perspective on ${formattedName}`,
        shortDescription: `Discover the true heart of ${formattedName} through the eyes of someone who calls it home.`,
        category: "Trip Idea",
        heroImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: `${regionId}-story-3`,
        title: `Top 5 Hidden Spots in ${formattedName}`,
        shortDescription: `Escape the crowds and find peace in these secret locations across ${formattedName}.`,
        category: "Story",
        heroImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop",
      }
    ];

  const region = regionsData[regionId] || {
    id: regionId,
    name: formattedName,
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop',
    packagesTitle: `${formattedName} Tour Packages 2026 | Best Deals`,
    packagesDescription: `Explore the beauty of ${formattedName} with our customized tour packages. Experience the culture, heritage, and landscapes like never before.`,
    whyVisit: {
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop',
      points: [
        `Beautiful landscapes of ${formattedName}`,
        "Rich culture and local traditions",
        "Amazing local cuisine",
        "Great for all types of travelers",
        "Comfortable and safe journey"
      ]
    },
    aboutText: [
      `${formattedName} is one of the most popular tourist destinations, known for its unique attractions and vibrant culture.`,
      "Visitors can enjoy sightseeing, adventure activities, and relaxation in the beautiful surroundings.",
      "These destinations together create a perfect itinerary covering culture, adventure, and relaxation."
    ],
    bestTime: [
      "October to March: Best time for sightseeing",
      "April to June: Good for summer getaways",
      "July to September: Beautiful monsoon views"
    ],
    included: [
      "Hotel accommodation",
      "Breakfast & dinner",
      "Transfers",
      "Sightseeing tours"
    ],
    packages: dynamicPackages,
    faqs: [
      {
        question: `What is the best time to visit ${formattedName}?`,
        answer: `The ideal time to visit ${formattedName} is during the pleasant months when the weather is comfortable for sightseeing and outdoor activities, typically between October and March.`
      },
      {
        question: `How many days are sufficient for a trip to ${formattedName}?`,
        answer: `A well-rounded trip usually takes 4 to 6 days. This gives you ample time to explore the major attractions without feeling rushed.`
      },
      {
        question: `Is ${formattedName} suitable for family trips?`,
        answer: `Absolutely! ${formattedName} offers a wide variety of activities and attractions that cater to all age groups, making it perfect for families.`
      },
      {
        question: `What should I pack for ${formattedName}?`,
        answer: `Pack according to the season. Comfortable walking shoes are a must, along with a light jacket for cooler evenings and sunscreen for daytime exploration.`
      }
    ],
    stories: dynamicStories
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        <RegionHero region={region} />
        <RegionPackages region={region} />
        <RegionInfo region={region} />
        <RegionFAQ faqs={region.faqs} />
        <div className="mt-16">
          <NewsletterBanner />
        </div>
      </main>
    </div>
  );
}
