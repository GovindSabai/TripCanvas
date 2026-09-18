import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Users, Globe, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { regionsData } from '../data/regionsData';
import { sliderData } from '../data/categoryData';
import { internationalDestinations } from '../data/homeData';
import { RegionFAQ } from '../components/sections/RegionFAQ';
import { Toast } from '../components/ui/Toast';

export default function TourPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDay, setOpenDay] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
  const [toastVisible, setToastVisible] = useState(false);

  // Parse regionId from package id (e.g. "rajasthan-1")
  const idParts = id ? id.split('-') : [];
  idParts.pop(); // remove the number part
  const regionId = idParts.join('-');

  const region = regionId ? regionsData[regionId] : null;
  let tour = region ? region.packages.find(p => p.id === id) : null;

  const internationalMatch = internationalDestinations.find(d => d.id === id || d.name.toLowerCase() === id);
  const euMatch = [
    { id: 'switzerland', image: '/World/switzerland.jpg' },
    { id: 'italy', image: '/World/Italy.jpg' },
    { id: 'london', image: '/World/London.jpg' },
    { id: 'spain', image: '/World/Spain.jpg' },
    { id: 'france', image: '/World/France.jpg' }
  ].find(d => d.id === id);

  if (!tour) {
    const placesMap = {
      'meghalaya': ['Shillong', 'Cherrapunji', 'Dawki'],
      'goa': ['North Goa', 'South Goa', 'Panaji', 'Calangute', 'Baga', 'Anjuna', 'Palolem', 'Dudhsagar'],
      'bhutan': ['Thimphu', 'Paro', 'Punakha', 'Phobjikha'],
      'thailand': ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi']
    };
    
    // Attempt to extract place name from ID (e.g. 'meghalaya-1' -> 'Shillong')
    let formattedName = 'Destination';
    if (id) {
      const parts = id.split('-');
      if (parts.length > 1 && !isNaN(parts[parts.length - 1])) {
        const idx = parseInt(parts.pop(), 10) - 1;
        const baseRegion = parts.join('-');
        if (placesMap[baseRegion] && placesMap[baseRegion][idx]) {
          formattedName = placesMap[baseRegion][idx];
        } else {
          // fallback if it's region-10 but not in map
          formattedName = baseRegion.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      } else {
        formattedName = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }

    const isIndiaTour = !internationalMatch && !euMatch;
    const categoryMatch = Object.values(sliderData).flat().find(item => item.id === id);
    
    let matchedImage = "/India/Udiapur Rajsthan.jpg";
    if (internationalMatch) {
      matchedImage = internationalMatch.image;
    } else if (euMatch) {
      matchedImage = euMatch.image;
    } else if (categoryMatch) {
      matchedImage = categoryMatch.image;
    } else if (isIndiaTour) {
      // Look up image map for India dynamic tours
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
      if (imageMap[formattedName]) {
        matchedImage = imageMap[formattedName];
      }
    }

    if (internationalMatch && formattedName === 'Destination') formattedName = internationalMatch.name;
    if (euMatch && formattedName === 'Destination') formattedName = euMatch.id.charAt(0).toUpperCase() + euMatch.id.slice(1);

    tour = {
      id: id,
      name: `${formattedName} Explorer`,
      duration: "4 days 3 nights",
      tourType: "Daily Tour",
      groupSize: "Unlimited",
      languages: "English, Hindi",
      image: matchedImage,
      gallery: [
        matchedImage,
        isIndiaTour ? "/India/Gallery/Image1.jpg" : "/World/switzerland.jpg",
        isIndiaTour ? "/India/Gallery/images3.jpg" : "/World/France.jpg",
        isIndiaTour ? "/India/Gallery/images4.jpg" : "/World/London.jpg",
      ],
      about: `The ${formattedName} Explorer tour offers a captivating blend of rich heritage and stunning landscapes. Starting in the heart of the region, you will be immersed in local culture and breathtaking architecture. With expert guides, you will gain deep insights into the region's history, promising an unforgettable experience.`,
      highlights: [
        `Immerse in the grandeur of ${formattedName}'s architectural marvels.`,
        "Discover hidden gems and local markets.",
        `Experience ${formattedName}'s vibrant culture through guided walks.`,
        "Enjoy comfortable transportation between destinations."
      ],
      included: [
        "Accommodation in well-appointed hotels.",
        `Guided tours of ${formattedName}.`,
        "Entrance fees to monuments and attractions.",
        "Comfortable transportation between destinations.",
        "Daily breakfast and select meals.",
        "Knowledgeable local guides."
      ],
      excluded: [
        "Airfare or Train tickets.",
        "Personal expenses and gratuities.",
        "Additional meals and beverages.",
        "Optional activities and experiences.",
        "Travel Insurance."
      ],
      itinerary: [
        {
          day: "Day 1",
          title: `Arrive in ${formattedName}`,
          description: `Welcome to ${formattedName}! On arrival, check in at your hotel. Spend the evening relaxing or exploring local markets.`
        },
        {
          day: "Day 2",
          title: `${formattedName} Sightseeing & Exploration`,
          description: "Start your day with a delicious breakfast. Proceed for a full day guided tour covering the major cultural and historical attractions."
        },
        {
          day: "Day 3",
          title: `${formattedName} Scenic Wonders`,
          description: "Enjoy the beautiful natural landscapes and hidden gems that this region has to offer."
        },
        {
          day: "Day 4",
          title: `Departure from ${formattedName}`,
          description: "After breakfast, check out from your hotel and head to the airport/station for your onward journey."
        }
      ],
      faqs: [
        {
          question: `What is the best time to visit ${formattedName}?`,
          answer: "The ideal time to visit is during the pleasant seasons, usually from October to March."
        },
        {
          question: "What should I pack for the tour?",
          answer: "Comfortable walking shoes, light cotton clothes for summer, and warm layers for winter."
        },
        {
          question: "Can this tour be customized?",
          answer: "Yes, we can tailor the itinerary to match your specific preferences."
        }
      ]
    };
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const randomizedGallery = React.useMemo(() => {
    const isIndiaTour = !internationalMatch && !euMatch;
    
    const worldPool = [
      '/World/Gallery/images 1.jpg', '/World/Gallery/images 3.jpg', '/World/Gallery/images10.jpg',
      '/World/Gallery/images2.jpg', '/World/Gallery/images4.jpg', '/World/Gallery/images5.jpg',
      '/World/Gallery/images6.jpg', '/World/Gallery/images7.jpg', '/World/Gallery/images8.jpg',
      '/World/Gallery/images9.jpg'
    ];
    
    const indiaPool = [
      '/India/Gallery/Image1.jpg', '/India/Gallery/Image2.jpg', '/India/Gallery/images 8.jpg',
      '/India/Gallery/images.jpg', '/India/Gallery/images10.jpg', '/India/Gallery/images3.jpg',
      '/India/Gallery/images4.jpg', '/India/Gallery/images5.jpg', '/India/Gallery/images6.jpg',
      '/India/Gallery/images7.jpg', '/India/Gallery/images9.jpg', '/India/Gallery/images Guide.jpg',
      '/India/Gallery/images Guide 2.jpg', '/India/Gallery/Image Guide 3.jpg', '/India/Gallery/images Guide 4.jpg'
    ];
    
    const pool = isIndiaTour ? indiaPool : worldPool;
    return pool.sort(() => 0.5 - Math.random());
  }, [id, internationalMatch, euMatch]);

  // Get other tours for "Explore other options"
  let otherTours = [];
  
  // 1. Check if the tour is from a specific category (Leisure, Beaches, etc.)
  let foundCategory = null;
  for (const category of Object.keys(sliderData)) {
    if (sliderData[category].some(item => item.id === id)) {
      foundCategory = category;
      break;
    }
  }

  if (foundCategory) {
    otherTours = sliderData[foundCategory]
      .filter(item => item.id !== id)
      .slice(0, 4)
      .map(item => ({
        id: item.id,
        name: item.name,
        duration: item.duration,
        image: item.image
      }));
  } else if (euMatch) {
    otherTours = [
      { id: 'switzerland', name: 'Switzerland', duration: '7 Days 6 Nights', image: '/World/switzerland.jpg' },
      { id: 'italy', name: 'Italy', duration: '6 Days 5 Nights', image: '/World/Italy.jpg' },
      { id: 'london', name: 'London', duration: '9 Days 8 Nights', image: '/World/London.jpg' },
      { id: 'spain', name: 'Spain', duration: '9 Days 8 Nights', image: '/World/Spain.jpg' },
      { id: 'france', name: 'France', duration: '5 Days 4 Nights', image: '/World/France.jpg' }
    ].filter(d => d.id !== id).slice(0, 4);
  } else if (internationalMatch) {
    const seaIds = ['bali-int', 'malaysia', 'singapore', 'philippines-int', 'vietnam', 'cambodia-int', 'laos-int', 'myanmar-int'];
    if (seaIds.includes(internationalMatch.id)) {
      otherTours = internationalDestinations.filter(d => seaIds.includes(d.id) && d.id !== id).slice(0, 4).map(item => ({
        id: item.id,
        name: item.name,
        duration: item.duration || '6 Days 5 Nights',
        image: item.image
      }));
    } else {
      otherTours = internationalDestinations.filter(d => d.id !== id).slice(0, 4).map(item => ({
        id: item.id,
        name: item.name,
        duration: item.duration || '6 Days 5 Nights',
        image: item.image
      }));
    }
  } else {
    // 2. Fallback to region packages
    otherTours = region ? region.packages.filter(p => p.id !== id).slice(0, 4) : [];

    // 3. Fallback to dynamic generation if empty
    if (otherTours.length === 0) {
      const placesMap = {
        'meghalaya': ['Shillong', 'Cherrapunji', 'Dawki'],
        'goa': ['North Goa', 'South Goa', 'Panaji', 'Calangute', 'Baga', 'Anjuna', 'Palolem', 'Dudhsagar'],
        'bhutan': ['Thimphu', 'Paro', 'Punakha', 'Phobjikha'],
        'thailand': ['Bangkok', 'Phuket', 'Pattaya', 'Chiang Mai', 'Krabi']
      };
      
      let baseRegionId = id;
      if (id && id.includes('-')) {
        const parts = id.split('-');
        parts.pop();
        baseRegionId = parts.join('-');
      }
      
      const placesToGenerate = placesMap[baseRegionId] || ['Scenic', 'Cultural', 'Adventure'];
      
      const isIndiaTour = !internationalMatch && !euMatch;
      otherTours = placesToGenerate
        .filter(p => !tour.name.includes(p))
        .slice(0, 4)
        .map((p, idx) => ({
          id: `${baseRegionId}-${idx + 10}`,
          name: `${p} Explorer`,
          duration: "4 days 3 nights",
          image: tour.image || (isIndiaTour ? "/India/Udiapur Rajsthan.jpg" : "/World/Bali.jpg")
        }));
    }
  }

  return (
    <div className="bg-white font-sans w-full">
      <main className="flex-grow pt-[10px]">
        {/* Gallery Section */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative">
            <div className="col-span-2 row-span-2">
              <img src={randomizedGallery[0]} alt={tour.name} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1">
              <img src={randomizedGallery[1]} alt={tour.name} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1">
              <img src={randomizedGallery[2]} alt={tour.name} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1">
              <img src={randomizedGallery[3]} alt={tour.name} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1">
              <img src={randomizedGallery[4]} alt={tour.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-8 flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left Column (Main Content) */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">{tour.name}</h1>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-10 py-6 border-y border-gray-100">
              <div className="flex flex-col">
                <span className="flex items-center text-gray-500 text-sm font-medium mb-1"><Clock size={16} className="mr-1.5" /> Duration</span>
                <span className="text-gray-900 font-semibold">{tour.duration}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-gray-500 text-sm font-medium mb-1"><Globe size={16} className="mr-1.5" /> Tour Type</span>
                <span className="text-gray-900 font-semibold">{tour.tourType}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-gray-500 text-sm font-medium mb-1"><Users size={16} className="mr-1.5" /> Group Size</span>
                <span className="text-gray-900 font-semibold">{tour.groupSize}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-gray-500 text-sm font-medium mb-1"><Globe size={16} className="mr-1.5" /> Languages</span>
                <span className="text-gray-900 font-semibold">{tour.languages}</span>
              </div>
            </div>

            {/* About */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">About this tour</h2>
              <p className="text-gray-600 leading-relaxed">{tour.about}</p>
            </div>

            {/* Highlights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Highlights</h2>
              <ul className="space-y-3">
                {tour.highlights.map((h, i) => (
                  <li key={i} className="flex items-start text-gray-600">
                    <span className="text-blue-600 mr-3 mt-1">●</span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Excluded */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Included/Excluded</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl">
                <ul className="space-y-3">
                  {tour.included.map((inc, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle2 size={18} className="text-green-500 mr-3 mt-0.5 shrink-0" />
                      <span className="text-sm">{inc}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {tour.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <XCircle size={18} className="text-red-400 mr-3 mt-0.5 shrink-0" />
                      <span className="text-sm">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button 
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                      onClick={() => setOpenDay(openDay === idx ? -1 : idx)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-md shrink-0 w-fit">{day.day}</span>
                        <span className="font-bold text-gray-900">{day.title}</span>
                      </div>
                      {openDay === idx ? <ChevronUp size={20} className="text-gray-500 shrink-0" /> : <ChevronDown size={20} className="text-gray-500 shrink-0" />}
                    </button>
                    {openDay === idx && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <RegionFAQ faqs={tour.faqs && tour.faqs.length > 0 ? tour.faqs : [
                { question: 'What is the best time to visit?', answer: 'The best time to visit is during the winter months from October to March when the weather is pleasant.' },
                { question: 'Are meals included in the package?', answer: 'Yes, daily breakfast is included. Some packages also include dinner.' },
                { question: 'Is this tour suitable for children?', answer: 'Absolutely! The itinerary is designed to be family-friendly.' },
                { question: 'What should I pack?', answer: 'Comfortable walking shoes, light cotton clothes, and sunscreen are highly recommended.' }
              ]} />
            </div>

            {/* Stories, tips, and guides */}
            <div className="mb-16 bg-slate-50 rounded-2xl p-8 relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Stories, trips, and guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: `${id}-story-1`,
                    title: `The Ultimate Guide to ${tour.name}`,
                    category: "Travel Guide",
                    shortDescription: `Discover the hidden secrets and local tips for exploring ${tour.name}. A complete itinerary and what to expect on your trip.`,
                    heroImage: randomizedGallery[5],
                  },
                  {
                    id: `${id}-story-2`,
                    title: `Top 10 Trips & Itineraries around ${tour.name}`,
                    category: "Trips & Itineraries",
                    shortDescription: `Explore the best scenic routes, day trips, and extended itineraries curated by local experts for ${tour.name}.`,
                    heroImage: randomizedGallery[6],
                  },
                  {
                    id: `${id}-story-3`,
                    title: `Meet Your Guide for ${tour.name}`,
                    category: "Local Guide",
                    shortDescription: `Learn about our expert local guides who will make your journey to ${tour.name} unforgettable.`,
                    heroImage: randomizedGallery[7],
                  }
                ].map((story, idx) => (
                  <Link to={`/story/${story.id}`} key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={story.heroImage} 
                        alt={story.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                        {story.category}
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {story.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore Other Options */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Explore other options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherTours.map((other) => (
                  <Link to={`/tour/${other.id}`} key={other.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-48 overflow-hidden">
                      <img src={other.image} alt={other.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{other.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5"><Clock size={14} /> {other.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar Booking) */}
          <div className="w-full lg:w-1/3 relative">
            <div className="sticky top-[100px] flex flex-col gap-6">
              
              {/* Booking Form */}
              <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 text-xl">Send Message For Enquiry</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setToastVisible(true); e.target.reset(); }}>
                  <input type="text" placeholder="Name *" pattern="[A-Za-z\s]+" title="Please enter a valid name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors" required />
                  <input type="email" placeholder="Email *" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors" required />
                  <input type="tel" placeholder="Phone *" pattern="[\+]?[0-9\s\-\(\)]{10,15}" title="Please enter a valid phone number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors" required />
                  <textarea placeholder="Note *" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors resize-none" required></textarea>
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </form>
              </div>

              {/* Guide Profile */}
              <div className="border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Guide" className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-blue-50" />
                <h3 className="font-bold text-gray-900">James Anderson</h3>
                <p className="text-sm text-gray-500 font-semibold mt-1">Travel Consultant</p>
                <div className="mt-4 mb-4 text-sm">
                  <p className="text-gray-500 font-medium mb-1">Specializes in</p>
                  <p className="text-gray-900 font-medium">Cultural Journeys · World · Luxury Escapes</p>
                  <p className="text-gray-500 font-medium mt-3 mb-1">Experience</p>
                  <p className="text-gray-900 font-medium">8+ Years</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors w-full">
                  Ask a Travel Expert
                </button>
              </div>

              {/* Information Contact */}
              <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Information Contact</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Email</p>
                    <a href="mailto:info@tripcanvas.com" className="text-blue-600 hover:underline">info@tripcanvas.com</a>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Website</p>
                    <a href="https://tripcanvas.com" className="text-blue-600 hover:underline">www.tripcanvas.com</a>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Phone</p>
                    <a href="tel:+1800TRIPCANVAS" className="text-gray-800 hover:underline">+1 800 TRIPCANVAS</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Toast 
        isVisible={toastVisible}
        message={
          <div className="flex flex-col gap-1">
            <span className="font-semibold block">Message Received</span>
            <span className="text-sm opacity-90 block">Thank you for connecting with TerraVista. Our team will get back to you shortly.</span>
          </div>
        }
        type="success"
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
