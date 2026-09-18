import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { regionsData } from '../data/regionsData';

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const regionIdMatch = id ? id.match(/^([a-z-]+)-story-\d+$/) : null;
  const baseRegionId = regionIdMatch ? regionIdMatch[1] : (id ? id.split('-')[0] : 'rajasthan');
  
  const region = baseRegionId ? regionsData[baseRegionId] : null;
  let story = region ? region.stories?.find(s => s.id === id) : null;

  if (!story) {
    const regionIdMatch = id ? id.match(/^([a-z-]+)-story-(\d+)$/) : null;
    let baseRegionName = id ? id.split('-')[0] : 'Destination';
    baseRegionName = baseRegionName.charAt(0).toUpperCase() + baseRegionName.slice(1);
    
    const storyIndex = regionIdMatch ? parseInt(regionIdMatch[2], 10) : 1;

    const templates = [
      {
        title: `The Ultimate Guide to ${baseRegionName}`,
        category: "Guide",
        shortDescription: `Everything you need to know before visiting ${baseRegionName}, from local customs to must-see hidden gems.`,
        heroImage: "/Home/Meghalaya.jpg",
        author: { name: "Kiran Patel", role: "Local Historian", image: "/India/StoriesPage/Guide 1.jpg" },
        sections: [
          { heading: `Welcome to ${baseRegionName}`, content: `If you want to truly experience ${baseRegionName}, you must look beyond the tourist traps. Our guide dives deep into the historical roots that shape the everyday life here.`, guideImage: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=600&auto=format&fit=crop" },
          { heading: "Historical Context", content: `Before arriving, take time to appreciate the ancient architecture and the stories etched in stone.` }
        ]
      },
      {
        title: `A Local's Perspective on ${baseRegionName}`,
        category: "Trip Idea",
        shortDescription: `Discover the true heart of ${baseRegionName} through the eyes of someone who calls it home.`,
        heroImage: "/Home/Himachal Pradesh.jpg",
        author: { name: "Amrit Singh", role: "Nature Photographer", image: "/India/StoriesPage/Guide 2.jpg" },
        sections: [
          { heading: `Through the Lens in ${baseRegionName}`, content: `The light in ${baseRegionName} is unlike anywhere else. Early mornings bring a mist that transforms the landscape into a painting.`, guideImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
          { heading: "Best Photography Spots", content: `Grab your camera and head to the viewpoints right before sunrise. The serene environment offers the perfect backdrop.` }
        ]
      },
      {
        title: `Top 5 Hidden Spots in ${baseRegionName}`,
        category: "Story",
        shortDescription: `Escape the crowds and find peace in these secret locations across ${baseRegionName}.`,
        heroImage: "/India/Udiapur Rajsthan.jpg",
        author: { name: "Robin Sharma", role: "Travel Blogger", image: "/India/StoriesPage/Guide 3.jpg" },
        sections: [
          { heading: `Off the Beaten Path in ${baseRegionName}`, content: `I've spent months traveling through ${baseRegionName}, and I'm sharing my absolute favorite hidden corners where you won't find crowds.`, guideImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
          { heading: "Secret Cafes", content: `Nestled in the narrow alleys are small eateries serving the most authentic local food you'll ever taste.` }
        ]
      }
    ];

    const template = templates[(storyIndex - 1) % templates.length];

    const randomDates = [
      "August 14, 2026", "September 3, 2026", "October 21, 2026",
      "November 12, 2026", "July 8, 2026", "December 5, 2026",
      "January 19, 2026", "March 22, 2026", "June 15, 2026", "May 30, 2026"
    ];
    // Use storyIndex or hash of ID to pick a consistent pseudo-random date
    const dateIndex = (storyIndex * 7 + baseRegionName.length) % randomDates.length;

    story = {
      id: id,
      title: template.title,
      category: template.category,
      shortDescription: template.shortDescription,
      heroImage: template.heroImage,
      date: randomDates[dateIndex],
      author: template.author,
      sections: template.sections
    };
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="bg-slate-50 flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <img 
            src={story.heroImage} 
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-10">
            <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6 shadow-lg">
              {story.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight shadow-sm font-serif">
              {story.title}
            </h1>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-[800px] mx-auto px-5 md:px-8 py-16 bg-white -mt-20 relative z-10 rounded-t-3xl shadow-xl">
          
          {/* Author Details */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-8 mb-10">
            <img 
              src={story.author.image} 
              alt={story.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900">{story.author.name}</h3>
              <p className="text-sm text-gray-500">{story.author.role} • {story.date}</p>
            </div>
          </div>

          {/* Article Sections */}
          <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-600 prose-img:rounded-xl">
            <p className="text-xl md:text-2xl text-gray-700 italic font-medium leading-relaxed mb-12 border-l-4 border-blue-600 pl-6">
              {story.shortDescription}
            </p>

            {story.sections.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                  {section.heading}
                </h2>
                <p className="leading-loose text-gray-600 text-lg">
                  {section.content}
                </p>
              </div>
            ))}
          </article>
        </div>
      </main>
    </div>
  );
}
