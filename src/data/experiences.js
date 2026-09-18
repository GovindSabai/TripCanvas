export const REGIONS = ['Asia', 'Europe', 'Americas', 'Africa', 'Oceania', 'Middle East'];
export const TRAVEL_STYLES = ['Beach Escapes', 'Mountain Retreats', 'Cultural Journeys', 'Adventure Travel', 'Luxury Getaways', 'Nature & Wildlife', 'City Breaks', 'Hidden Gems', 'Wellness', 'Food & Cuisine', 'Photography', 'Slow Travel'];
export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter', 'Year-round'];
export const DIFFICULTY = ['Easy', 'Moderate', 'Challenging'];

export const EXPERIENCE_CATEGORIES = [
  'Adventure', 'Culture', 'Food & Cuisine', 'Nature',
  'Wildlife', 'Wellness', 'Luxury', 'Photography', 'Local Life', 'Hidden Gems'
];

export const experiences = [
  {
    id: "exp-1",
    slug: "sunrise-trek-in-the-himalayas",
    title: "Sunrise Trek in the Himalayas",
    destination: "Uttarakhand",
    country: "India",
    region: "Asia",
    category: "Adventure",
    travelStyle: "Adventure Travel",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518182170546-076616fd46ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop",
      "/World/switzerland.jpg",
      "/World/Italy.jpg",
      "/World/Bali.jpg"
    ],
    shortDescription: "A breathtaking morning hike to witness the golden hour over snow-capped peaks.",
    description: "Experience the sheer majesty of the Himalayas as you trek through alpine meadows and pine forests before dawn. Reaching the summit just in time for sunrise, you'll be rewarded with panoramic views of some of the world's highest peaks bathed in golden light.",
    duration: "3 hrs",
    bestSeason: "Autumn",
    activityLevel: "Moderate",
    groupSize: "2–8",
    price: 899,
    included: ["Local guide", "Trekking poles", "Hot tea & breakfast", "Permits"],
    itinerary: [
      { step: 1, title: "Early Morning Briefing", description: "Meet your guide at the base camp at 4:00 AM." },
      { step: 2, title: "The Ascent", description: "A steady 2-hour hike under the starlit sky." },
      { step: 3, title: "Sunrise Spectacle", description: "Watch the sun illuminate the Himalayan range." },
      { step: 4, title: "Descent & Breakfast", description: "Return to base camp for a hearty local breakfast." }
    ],
    whatToBring: ["Headlamp", "Warm layers", "Hiking boots", "Water bottle"],
    importantInformation: {
      safety: "Guides are wilderness first-aid certified.",
      accessibility: "Not wheelchair accessible. Requires moderate physical fitness.",
      etiquette: "Respect local flora and fauna. Pack out all trash."
    },
    localTips: ["Acclimatize for at least 24 hours before the trek.", "Keep your camera batteries warm close to your body."],
    coordinates: { lat: 30.7352, lng: 79.0669 },
    relatedExperienceSlugs: ["himalayan-photography-journey", "wildlife-safari"]
  },
  {
    id: "exp-2",
    slug: "royal-heritage-walk",
    title: "Royal Heritage Walk",
    destination: "Jaipur",
    country: "India",
    region: "Asia",
    category: "Culture",
    travelStyle: "Cultural Journeys",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599661501632-55365d8f1208?q=80&w=800&auto=format&fit=crop",
      "/World/Japan.jpg",
      "/World/France.jpg",
      "/World/Egypt.jpg"
    ],
    shortDescription: "Explore the hidden alleys and majestic palaces of the Pink City.",
    description: "Step back in time on a curated walk through Jaipur's old city. Discover the stories behind the stunning Rajput architecture, interact with local artisans, and learn about the fascinating history of Rajasthan's royal families.",
    duration: "2 hrs",
    bestSeason: "Winter",
    activityLevel: "Easy",
    groupSize: "2–12",
    price: 120,
    included: ["Expert historian guide", "Monument entry fees", "Local street food tasting"],
    itinerary: [
      { step: 1, title: "Meeting at Hawa Mahal", description: "Begin the tour at the iconic Palace of Winds." },
      { step: 2, title: "City Palace Tour", description: "Explore the royal residence and its museums." },
      { step: 3, title: "Artisan Interactions", description: "Visit traditional jewelry and textile workshops." }
    ],
    whatToBring: ["Comfortable walking shoes", "Sun protection", "Camera"],
    importantInformation: {
      safety: "Stay with the group in crowded markets.",
      accessibility: "Mostly flat, but some historical sites have stairs.",
      etiquette: "Dress modestly when visiting temples and monuments."
    },
    localTips: ["Don't miss the chance to try the famous pyaaz kachori.", "Bargaining is expected in the local markets."],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    relatedExperienceSlugs: ["desert-nights-under-the-stars"]
  },
  {
    id: "exp-3",
    slug: "traditional-cooking-in-kyoto",
    title: "Traditional Cooking in Kyoto",
    destination: "Kyoto",
    country: "Japan",
    region: "Asia",
    category: "Food & Cuisine",
    travelStyle: "Cultural Journeys",
    image: "/World/Japan.jpg",
    gallery: [
      "/World/Japan.jpg",
      "/India/alleppey.jpg",
      "/India/pangong tso.jpg",
      "/World/switzerland.jpg"
    ],
    shortDescription: "Learn the art of Washoku in a traditional machiya townhouse.",
    description: "Immerse yourself in Japanese culinary traditions. In this hands-on class, you'll learn how to prepare authentic Kyoto-style dishes using fresh, seasonal ingredients, guided by a local chef in a beautifully preserved wooden townhouse.",
    duration: "3 hrs",
    bestSeason: "Year-round",
    activityLevel: "Easy",
    groupSize: "2–6",
    price: 145,
    included: ["Cooking ingredients", "Apron rental", "Recipes to take home", "Matcha tea ceremony"],
    itinerary: [
      { step: 1, title: "Welcome & Tea", description: "Settle in with a traditional matcha tea." },
      { step: 2, title: "Ingredient Prep", description: "Learn about the seasonal vegetables and dashi." },
      { step: 3, title: "Cooking Session", description: "Prepare 4-5 traditional dishes." },
      { step: 4, title: "Tasting", description: "Enjoy the meal you've prepared." }
    ],
    whatToBring: ["Just your appetite!"],
    importantInformation: {
      safety: "Inform us of any allergies beforehand.",
      accessibility: "Ground floor access, but involves standing.",
      etiquette: "Remove shoes upon entering the machiya."
    },
    localTips: ["Take notes! The dashi recipe is a closely guarded secret you'll want to remember."],
    coordinates: { lat: 35.0116, lng: 135.7681 },
    relatedExperienceSlugs: []
  },
  {
    id: "exp-4",
    slug: "desert-nights-under-the-stars",
    title: "Desert Nights Under the Stars",
    destination: "Rajasthan",
    country: "India",
    region: "Asia",
    category: "Nature",
    travelStyle: "Adventure Travel",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=800&auto=format&fit=crop",
      "/World/Italy.jpg",
      "/World/Bali.jpg",
      "/World/Japan.jpg"
    ],
    shortDescription: "A magical overnight camp in the Thar Desert.",
    description: "Experience the tranquility of the desert. Ride a camel into the dunes, watch a breathtaking sunset, and enjoy a traditional Rajasthani dinner by a campfire before sleeping under a blanket of stars in a luxury tent.",
    duration: "1 night",
    bestSeason: "Winter",
    activityLevel: "Easy",
    groupSize: "2–10",
    price: 210,
    included: ["Camel ride", "Luxury tent accommodation", "Dinner & breakfast", "Cultural performance"],
    itinerary: [
      { step: 1, title: "Arrival", description: "Reach the desert camp in the late afternoon." },
      { step: 2, title: "Camel Safari", description: "Ride into the dunes for sunset." },
      { step: 3, title: "Dinner & Entertainment", description: "Enjoy local folk music and dance." }
    ],
    whatToBring: ["Warm clothes for the night", "Camera", "Sunscreen for the next day"],
    importantInformation: {
      safety: "Follow the guide's instructions during the camel ride.",
      accessibility: "Not wheelchair accessible. Sand navigation required.",
      etiquette: "Respect the performers and local staff."
    },
    localTips: ["The temperature drops significantly at night; dress in layers."],
    coordinates: { lat: 26.9157, lng: 70.9083 },
    relatedExperienceSlugs: ["royal-heritage-walk", "wildlife-safari"]
  },
  {
    id: "exp-5",
    slug: "island-sailing-at-sunset",
    title: "Island Sailing at Sunset",
    destination: "Santorini",
    country: "Greece",
    region: "Europe",
    category: "Luxury",
    travelStyle: "Luxury Getaways",
    image: "/World/switzerland.jpg",
    gallery: [
      "/World/switzerland.jpg",
      "/World/France.jpg",
      "/World/Egypt.jpg",
      "/India/alleppey.jpg"
    ],
    shortDescription: "A private catamaran cruise around the caldera.",
    description: "Sail the pristine waters of the Aegean Sea on a luxury catamaran. Swim in hot springs, explore secluded beaches, and witness Santorini's world-famous sunset from the best vantage point—the water—while enjoying local wines and a BBQ dinner.",
    duration: "4 hrs",
    bestSeason: "Summer",
    activityLevel: "Easy",
    groupSize: "2–8",
    price: 260,
    included: ["Private catamaran", "BBQ dinner", "Open bar (wine, beer, soft drinks)", "Snorkeling gear"],
    itinerary: [
      { step: 1, title: "Embarkation", description: "Board the catamaran at Ammoudi Bay." },
      { step: 2, title: "Hot Springs", description: "Stop for a swim in the volcanic hot springs." },
      { step: 3, title: "Sunset Dinner", description: "Enjoy a freshly prepared meal as the sun goes down." }
    ],
    whatToBring: ["Swimwear", "Towel", "Light jacket for the evening", "Sunscreen"],
    importantInformation: {
      safety: "Life jackets provided. Briefing upon boarding.",
      accessibility: "Requires stepping onto the boat; staff can assist.",
      etiquette: "No shoes allowed on deck."
    },
    localTips: ["The hot spring waters have sulfur, which can stain light-colored swimwear."],
    coordinates: { lat: 36.3932, lng: 25.4615 },
    relatedExperienceSlugs: ["private-mediterranean-escape"]
  },
  {
    id: "exp-6",
    slug: "northern-lights-expedition",
    title: "Northern Lights Expedition",
    destination: "Iceland",
    country: "Iceland",
    region: "Europe",
    category: "Nature",
    travelStyle: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=800&auto=format&fit=crop",
      "/India/pangong tso.jpg",
      "/World/switzerland.jpg",
      "/World/Italy.jpg"
    ],
    shortDescription: "Chase the Aurora Borealis in the Icelandic wilderness.",
    description: "Embark on an unforgettable journey into the dark winter nights of Iceland. Guided by experts who track solar activity and weather patterns, you'll head far from city lights to witness the mesmerizing dance of the Northern Lights.",
    duration: "5 hrs",
    bestSeason: "Winter",
    activityLevel: "Moderate",
    groupSize: "2–10",
    price: 180,
    included: ["Expert guide", "Transport in a modified super jeep", "Hot cocoa and treats", "Photography assistance"],
    itinerary: [
      { step: 1, title: "Departure", description: "Pick up from Reykjavik and head out of the city." },
      { step: 2, title: "The Chase", description: "Drive to prime viewing locations based on forecasts." },
      { step: 3, title: "Aurora Viewing", description: "Enjoy the lights with hot cocoa in hand." }
    ],
    whatToBring: ["Thermal layers", "Sturdy winter boots", "Tripod for camera"],
    importantInformation: {
      safety: "Dress exceptionally warmly; wind chill can be severe.",
      accessibility: "Uneven, snowy terrain at viewing stops.",
      etiquette: "Keep flashlights off during viewing."
    },
    localTips: ["Patience is key. The lights can appear and disappear quickly.", "Sightings are dependent on weather and solar activity."],
    coordinates: { lat: 64.1283, lng: -21.8277 },
    relatedExperienceSlugs: []
  },
  {
    id: "exp-7",
    slug: "wildlife-safari",
    title: "Wildlife Safari",
    destination: "Rajasthan",
    country: "India",
    region: "Asia",
    category: "Wildlife",
    travelStyle: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800&auto=format&fit=crop",
      "/World/Bali.jpg",
      "/World/Japan.jpg",
      "/World/France.jpg"
    ],
    shortDescription: "Track tigers and leopards in Ranthambore National Park.",
    description: "An exhilarating open-jeep safari through one of India's most renowned national parks. Accompanied by a naturalist guide, you'll track the majestic Bengal tiger, leopards, and diverse bird species in their natural habitat.",
    duration: "Half day",
    bestSeason: "Winter",
    activityLevel: "Easy",
    groupSize: "2–6",
    price: 150,
    included: ["Jeep safari", "Naturalist guide", "Park entry fees"],
    itinerary: [
      { step: 1, title: "Early Morning Start", description: "Enter the park as the gates open." },
      { step: 2, title: "Tracking", description: "Follow alarm calls and pugmarks to find predators." },
      { step: 3, title: "Wildlife Viewing", description: "Observe the diverse flora and fauna of the park." }
    ],
    whatToBring: ["Binoculars", "Neutral colored clothing", "Sun hat", "Dust mask"],
    importantInformation: {
      safety: "Remain in the vehicle at all times.",
      accessibility: "Bumpy ride; not recommended for those with severe back issues.",
      etiquette: "Maintain silence; do not shout or use flash photography."
    },
    localTips: ["Mornings can be chilly, so wear layers you can shed later."],
    coordinates: { lat: 26.0173, lng: 76.5026 },
    relatedExperienceSlugs: ["desert-nights-under-the-stars"]
  },
  {
    id: "exp-8",
    slug: "hidden-villages-of-tuscany",
    title: "Hidden Villages of Tuscany",
    destination: "Tuscany",
    country: "Italy",
    region: "Europe",
    category: "Local Life",
    travelStyle: "Hidden Gems",
    image: "/World/Italy.jpg",
    gallery: [
      "/World/Italy.jpg",
      "/World/Egypt.jpg",
      "/India/alleppey.jpg",
      "/India/pangong tso.jpg"
    ],
    shortDescription: "Discover medieval towns off the beaten path.",
    description: "Escape the crowds and explore the authentic heart of Tuscany. Visit lesser-known medieval hill towns, meet local artisans, and enjoy a slow-paced day of culture, architecture, and wine tasting in the picturesque countryside.",
    duration: "Full day",
    bestSeason: "Spring",
    activityLevel: "Easy",
    groupSize: "2–8",
    price: 175,
    included: ["Local guide", "Transport", "Wine tasting", "Light lunch"],
    itinerary: [
      { step: 1, title: "Scenic Drive", description: "Depart through the rolling hills of Val d'Orcia." },
      { step: 2, title: "Village Walk", description: "Explore the cobblestone streets of a hidden hamlet." },
      { step: 3, title: "Winery Visit", description: "Taste local wines and enjoy a farmhouse lunch." }
    ],
    whatToBring: ["Walking shoes", "Camera", "Light jacket"],
    importantInformation: {
      safety: "Standard precautions.",
      accessibility: "Cobblestone streets can be uneven.",
      etiquette: "Respect the privacy of local residents."
    },
    localTips: ["The best views are often found behind the churches at the edge of town."],
    coordinates: { lat: 43.7711, lng: 11.2486 },
    relatedExperienceSlugs: ["private-mediterranean-escape"]
  },
  {
    id: "exp-9",
    slug: "himalayan-photography-journey",
    title: "Himalayan Photography Journey",
    destination: "Ladakh",
    country: "India",
    region: "Asia",
    category: "Photography",
    travelStyle: "Adventure Travel",
    image: "/India/pangong tso.jpg",
    gallery: [
      "/India/pangong tso.jpg",
      "/World/switzerland.jpg",
      "/World/Italy.jpg",
      "/World/Bali.jpg"
    ],
    shortDescription: "A curated expedition to capture the stark beauty of the high desert.",
    description: "Join an award-winning landscape photographer on a multi-day journey through Ladakh. Learn advanced techniques for capturing dramatic landscapes, starry night skies, and portraits of the resilient local nomadic communities.",
    duration: "6 days",
    bestSeason: "Summer",
    activityLevel: "Challenging",
    groupSize: "2–6",
    price: 1450,
    included: ["Photography instruction", "Accommodation", "All meals", "Transport"],
    itinerary: [
      { step: 1, title: "Acclimatization & Theory", description: "Rest in Leh and discuss photography concepts." },
      { step: 2, title: "Pangong Tso", description: "Travel to the famous blue lake for sunset shots." },
      { step: 3, title: "Astrophotography", description: "Night shooting in the high desert." },
      { step: 4, title: "Nomadic Portraits", description: "Visit a Changpa nomad camp." }
    ],
    whatToBring: ["DSLR/Mirrorless camera", "Tripod", "Wide-angle lens", "Warm extreme-weather gear"],
    importantInformation: {
      safety: "High altitude. Oxygen cylinders provided in vehicles.",
      accessibility: "Requires good physical health for high altitude.",
      etiquette: "Always ask permission before photographing locals."
    },
    localTips: ["Drink plenty of water and avoid alcohol to prevent altitude sickness."],
    coordinates: { lat: 34.1526, lng: 77.5771 },
    relatedExperienceSlugs: ["sunrise-trek-in-the-himalayas"]
  },
  {
    id: "exp-10",
    slug: "private-mediterranean-escape",
    title: "Private Mediterranean Escape",
    destination: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    category: "Luxury",
    travelStyle: "Luxury Getaways",
    image: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=800&auto=format&fit=crop",
      "/World/Japan.jpg",
      "/World/France.jpg",
      "/World/Egypt.jpg"
    ],
    shortDescription: "A bespoke yacht tour along Italy's most glamorous coastline.",
    description: "Experience the Amalfi Coast in ultimate luxury. Charter a private yacht to cruise past colorful cliffside villages, explore hidden grottos, and dine at exclusive seaside restaurants accessible only by boat.",
    duration: "Full day",
    bestSeason: "Summer",
    activityLevel: "Easy",
    groupSize: "2–4",
    price: 620,
    included: ["Private yacht charter", "Skipper", "Champagne and snacks", "Snorkeling equipment"],
    itinerary: [
      { step: 1, title: "Boarding in Positano", description: "Meet your skipper and set sail." },
      { step: 2, title: "Coastal Cruising", description: "Admire the views of Amalfi and Ravello from the sea." },
      { step: 3, title: "Lunch Stop", description: "Anchor near a renowned beach club for lunch (cost not included)." }
    ],
    whatToBring: ["Swimwear", "Sunscreen", "Sunglasses", "Chic cover-up"],
    importantInformation: {
      safety: "Follow skipper's instructions.",
      accessibility: "Requires agility to board the yacht.",
      etiquette: "Relax and enjoy."
    },
    localTips: ["Ask the skipper to take you to the less crowded Emerald Grotto instead of the Blue Grotto."],
    coordinates: { lat: 40.6333, lng: 14.6027 },
    relatedExperienceSlugs: ["hidden-villages-of-tuscany", "island-sailing-at-sunset"]
  },
  {
    id: "exp-11",
    slug: "rainforest-discovery",
    title: "Rainforest Discovery",
    destination: "Costa Rica",
    country: "Costa Rica",
    region: "Americas",
    category: "Nature",
    travelStyle: "Nature & Wildlife",
    image: "/World/Bali.jpg",
    gallery: [
      "/World/Bali.jpg",
      "/India/alleppey.jpg",
      "/India/pangong tso.jpg",
      "/World/switzerland.jpg"
    ],
    shortDescription: "Hike through lush jungles and spot exotic wildlife.",
    description: "Immerse yourself in the incredible biodiversity of Costa Rica. Accompanied by a naturalist, you'll hike through dense rainforests, cross hanging bridges, and look out for sloths, monkeys, and vibrant toucans.",
    duration: "Half day",
    bestSeason: "Year-round",
    activityLevel: "Moderate",
    groupSize: "2–8",
    price: 135,
    included: ["Naturalist guide", "Park entrance fees", "Binoculars rental"],
    itinerary: [
      { step: 1, title: "Trailhead", description: "Begin the hike early to catch active wildlife." },
      { step: 2, title: "Canopy Walk", description: "Cross the famous hanging suspension bridges." },
      { step: 3, title: "Waterfall Stop", description: "Cool off by a hidden jungle waterfall." }
    ],
    whatToBring: ["Insect repellent", "Rain jacket", "Sturdy hiking shoes", "Water"],
    importantInformation: {
      safety: "Stay on the marked trails.",
      accessibility: "Trails can be muddy and steep.",
      etiquette: "Do not feed or touch the wildlife."
    },
    localTips: ["Rain is common even in the dry season; always pack a poncho."],
    coordinates: { lat: 10.2993, lng: -84.7969 },
    relatedExperienceSlugs: []
  },
  {
    id: "exp-12",
    slug: "ocean-wellness-retreat",
    title: "Ocean Wellness Retreat",
    destination: "Maldives",
    country: "Maldives",
    region: "Asia",
    category: "Wellness",
    travelStyle: "Wellness",
    image: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=800&auto=format&fit=crop",
      "/World/Italy.jpg",
      "/World/Bali.jpg",
      "/World/Japan.jpg"
    ],
    shortDescription: "Rejuvenate your body and mind over crystal clear waters.",
    description: "A day dedicated to holistic healing. Begin with sunrise yoga on a private deck, followed by a personalized Ayurvedic spa treatment in an overwater pavilion, and conclude with a healthy, organic lunch.",
    duration: "Full day",
    bestSeason: "Year-round",
    activityLevel: "Easy",
    groupSize: "1–4",
    price: 340,
    included: ["Yoga session", "90-minute spa treatment", "Organic lunch", "Wellness consultation"],
    itinerary: [
      { step: 1, title: "Sunrise Yoga", description: "Start the day with mindful stretching and breathwork." },
      { step: 2, title: "Spa Treatment", description: "Enjoy a deep tissue massage listening to the ocean." },
      { step: 3, title: "Nourishment", description: "A chef-prepared healthy lunch overlooking the lagoon." }
    ],
    whatToBring: ["Comfortable activewear", "Swimwear"],
    importantInformation: {
      safety: "Inform the therapist of any medical conditions.",
      accessibility: "Fully accessible facilities.",
      etiquette: "Maintain a quiet, serene atmosphere in the spa area."
    },
    localTips: ["Disconnect entirely; leave your phone in your room to fully embrace the retreat."],
    coordinates: { lat: 3.2028, lng: 73.2207 },
    relatedExperienceSlugs: ["sacred-water-temple-ritual"]
  },
  {
    id: "exp-13",
    slug: "sacred-water-temple-ritual",
    title: "Sacred Water Temple Ritual",
    destination: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Culture",
    travelStyle: "Cultural Journeys",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
      "/World/France.jpg",
      "/World/Egypt.jpg",
      "/India/alleppey.jpg"
    ],
    shortDescription: "Participate in a traditional Balinese purification ceremony.",
    description: "Experience spiritual cleansing at Tirta Empul. Accompanied by a local priest, you will learn the meaning behind the Canang Sari offerings and participate in the Melukat (water purification) ritual in the sacred holy springs.",
    duration: "3 hrs",
    bestSeason: "Year-round",
    activityLevel: "Easy",
    groupSize: "2–10",
    price: 95,
    included: ["Local priest guide", "Sarong rental", "Offerings", "Donation to the temple"],
    itinerary: [
      { step: 1, title: "Preparation", description: "Dress in the traditional sarong and sash." },
      { step: 2, title: "Offering Ceremony", description: "Present your Canang Sari with a prayer." },
      { step: 3, title: "Purification", description: "Step into the holy springs for the cleansing ritual." }
    ],
    whatToBring: ["Change of clothes", "Towel"],
    importantInformation: {
      safety: "The springs have steps; tread carefully when wet.",
      accessibility: "Requires stepping down into the water.",
      etiquette: "Women who are menstruating are traditionally not allowed in the water."
    },
    localTips: ["Embrace the spirituality of the moment; it's a deeply personal experience."],
    coordinates: { lat: -8.4149, lng: 115.3164 },
    relatedExperienceSlugs: ["ocean-wellness-retreat"]
  },
  {
    id: "exp-14",
    slug: "alpine-peak-hike",
    title: "Alpine Peak Hike",
    destination: "Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    category: "Adventure",
    travelStyle: "Adventure Travel",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
      "/India/pangong tso.jpg",
      "/World/switzerland.jpg",
      "/World/Italy.jpg"
    ],
    shortDescription: "Conquer the scenic trails of the magnificent Swiss Alps.",
    description: "Challenge yourself with a rewarding hike up one of the iconic Swiss peaks. Guided by a certified mountaineer, you'll traverse alpine meadows, rocky outcrops, and glacier edges, enjoying unparalleled views of the Matterhorn and surrounding valleys.",
    duration: "Full day",
    bestSeason: "Summer",
    activityLevel: "Challenging",
    groupSize: "2–6",
    price: 210,
    included: ["Certified mountain guide", "Cable car tickets", "Packed alpine lunch"],
    itinerary: [
      { step: 1, title: "Ascent", description: "Take the early cable car to the trailhead." },
      { step: 2, title: "The Climb", description: "A strenuous hike up steep, rocky terrain." },
      { step: 3, title: "Summit Picnic", description: "Enjoy lunch with 360-degree alpine views." },
      { step: 4, title: "Descent", description: "Careful hike down back to the village." }
    ],
    whatToBring: ["Sturdy hiking boots", "Layers (weather changes quickly)", "Sun protection", "Water"],
    importantInformation: {
      safety: "Guide carries safety ropes and first aid. Weather is monitored constantly.",
      accessibility: "Not accessible. Requires high fitness level.",
      etiquette: "Yield to descending hikers on narrow paths."
    },
    localTips: ["Start at a steady, slow pace to conserve energy for the steeper sections."],
    coordinates: { lat: 46.0207, lng: 7.7491 },
    relatedExperienceSlugs: ["sunrise-trek-in-the-himalayas"]
  },
  {
    id: "exp-15",
    slug: "fjord-kayak-expedition",
    title: "Fjord Kayak Expedition",
    destination: "New Zealand",
    country: "New Zealand",
    region: "Oceania",
    category: "Nature",
    travelStyle: "Nature & Wildlife",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
      "/World/Bali.jpg",
      "/World/Japan.jpg",
      "/World/France.jpg"
    ],
    shortDescription: "Paddle through the majestic waters of Milford Sound.",
    description: "Get up close and personal with the dramatic landscapes of Fiordland National Park. Kayak beneath towering cliffs, feel the spray of thundering waterfalls, and keep an eye out for dolphins, seals, and penguins in these pristine glacial waters.",
    duration: "4 hrs",
    bestSeason: "Spring",
    activityLevel: "Moderate",
    groupSize: "2–8",
    price: 165,
    included: ["Sea kayak and paddle", "Wetsuit and safety gear", "Experienced guide"],
    itinerary: [
      { step: 1, title: "Safety Briefing", description: "Learn paddling techniques and safety protocols." },
      { step: 2, title: "Into the Fjord", description: "Paddle out towards Stirling Falls." },
      { step: 3, title: "Wildlife Spotting", description: "Rest and watch for the resident seal colony." }
    ],
    whatToBring: ["Swimwear to wear under wetsuit", "Towel", "Waterproof camera"],
    importantInformation: {
      safety: "Life jackets mandatory. Must know how to swim.",
      accessibility: "Requires upper body strength.",
      etiquette: "Do not paddle too close to the wildlife."
    },
    localTips: ["Sandflies are notorious at the launch site; apply strong repellent before suiting up."],
    coordinates: { lat: -44.6716, lng: 167.9256 },
    relatedExperienceSlugs: ["rainforest-discovery"]
  }
,
{
  "id": "exp-16",
  "slug": "hidden-gem-waterfalls",
  "title": "Hidden Gem Waterfalls of Bali",
  "destination": "Bali",
  "country": "Indonesia",
  "region": "Asia",
  "category": "Hidden Gems",
  "travelStyle": "Hidden Gems",
  "image": "/World/Bali.jpg",
  "gallery": [
    "/World/Bali.jpg"
  ],
  "shortDescription": "Discover secret waterfalls away from the tourist crowds.",
  "description": "A magical journey to the undiscovered waterfalls of northern Bali. Trek through lush jungle paths, swim in crystal clear natural pools, and experience the serene beauty of the island.",
  "duration": "Full day",
  "bestSeason": "Summer",
  "activityLevel": "Moderate",
  "groupSize": "2–6",
  "price": 95,
  "included": [
    "Local guide",
    "Transport",
    "Lunch"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Pickup",
      "description": "Early morning pickup from your hotel."
    },
    {
      "step": 2,
      "title": "Trek",
      "description": "Hike through the jungle to the first waterfall."
    }
  ],
  "whatToBring": [
    "Swimwear",
    "Towel",
    "Water"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Not accessible",
    "etiquette": "Respect nature"
  },
  "localTips": [
    "Wear comfortable shoes."
  ],
  "coordinates": {
    "lat": -8.4095,
    "lng": 115.1889
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-17",
  "slug": "family-fun-in-the-alps",
  "title": "Family Fun in the Alps",
  "destination": "Swiss Alps",
  "country": "Switzerland",
  "region": "Europe",
  "category": "Adventure",
  "travelStyle": "Family",
  "image": "/World/switzerland.jpg",
  "gallery": [
    "/World/switzerland.jpg"
  ],
  "shortDescription": "A family-friendly adventure in the stunning Swiss Alps.",
  "description": "Create unforgettable memories with your family. Enjoy easy hikes, cable car rides, and a visit to a local cheese farm where kids can learn how Swiss cheese is made.",
  "duration": "3 days",
  "bestSeason": "Summer",
  "activityLevel": "Easy",
  "groupSize": "4-12",
  "price": 450,
  "included": [
    "Accommodation",
    "Guide",
    "Cable car passes"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Arrival",
      "description": "Settle into your family chalet."
    }
  ],
  "whatToBring": [
    "Warm clothes",
    "Camera"
  ],
  "importantInformation": {
    "safety": "Safe for all ages",
    "accessibility": "Partially accessible",
    "etiquette": "Standard"
  },
  "localTips": [
    "Try the fondue!"
  ],
  "coordinates": {
    "lat": 46.8182,
    "lng": 8.2275
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-18",
  "slug": "romantic-paris-getaway",
  "title": "Romantic Paris Getaway",
  "destination": "Paris",
  "country": "France",
  "region": "Europe",
  "category": "Romantic",
  "travelStyle": "Romantic",
  "image": "/World/France.jpg",
  "gallery": [
    "/World/France.jpg"
  ],
  "shortDescription": "Experience the city of love like never before.",
  "description": "A curated romantic experience including a private Seine river cruise at sunset, a gourmet dinner near the Eiffel Tower, and a photoshoot in Montmartre.",
  "duration": "2 days",
  "bestSeason": "Spring",
  "activityLevel": "Easy",
  "groupSize": "2",
  "price": 850,
  "included": [
    "Cruise",
    "Dinner",
    "Photographer"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Cruise",
      "description": "Sunset cruise on the Seine."
    }
  ],
  "whatToBring": [
    "Evening wear"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Accessible",
    "etiquette": "Standard"
  },
  "localTips": [
    "Book dinners well in advance."
  ],
  "coordinates": {
    "lat": 48.8566,
    "lng": 2.3522
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-19",
  "slug": "african-safari-family",
  "title": "African Safari Family Adventure",
  "destination": "Serengeti",
  "country": "Tanzania",
  "region": "Africa",
  "category": "Wildlife",
  "travelStyle": "Family",
  "image": "/World/Egypt.jpg",
  "gallery": [
    "/World/Egypt.jpg"
  ],
  "shortDescription": "An awe-inspiring wildlife safari for the whole family.",
  "description": "Witness the great migration and see the Big Five. Specially designed for families with child-friendly guides and safe, comfortable lodges.",
  "duration": "5 days",
  "bestSeason": "Summer",
  "activityLevel": "Easy",
  "groupSize": "4-8",
  "price": 2100,
  "included": [
    "Lodging",
    "Safari drives",
    "Meals"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Game Drive",
      "description": "Morning game drive to spot lions."
    }
  ],
  "whatToBring": [
    "Binoculars",
    "Sunscreen"
  ],
  "importantInformation": {
    "safety": "Stay in vehicle",
    "accessibility": "Limited",
    "etiquette": "Quiet around animals"
  },
  "localTips": [
    "Mornings are cold, bring a jacket."
  ],
  "coordinates": {
    "lat": -2.3333,
    "lng": 34.8333
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-20",
  "slug": "romantic-maldives-escape",
  "title": "Romantic Maldives Escape",
  "destination": "Maldives",
  "country": "Maldives",
  "region": "Asia",
  "category": "Romantic",
  "travelStyle": "Romantic",
  "image": "/World/Bali.jpg",
  "gallery": [
    "/World/Bali.jpg"
  ],
  "shortDescription": "Ultimate luxury and romance in an overwater bungalow.",
  "description": "Crystal clear waters, private dining on the beach, and a couples spa treatment. The perfect honeymoon or anniversary getaway.",
  "duration": "4 days",
  "bestSeason": "Winter",
  "activityLevel": "Easy",
  "groupSize": "2",
  "price": 3200,
  "included": [
    "Bungalow",
    "Spa",
    "Meals"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Arrival",
      "description": "Seaplane transfer to your resort."
    }
  ],
  "whatToBring": [
    "Swimwear"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Standard"
  },
  "localTips": [
    "Try snorkeling right off your deck."
  ],
  "coordinates": {
    "lat": 3.2028,
    "lng": 73.2207
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-21",
  "slug": "vietnam-food-tour",
  "title": "Vietnam Street Food Tour",
  "destination": "Hanoi",
  "country": "Vietnam",
  "region": "Asia",
  "category": "Food & Cuisine",
  "travelStyle": "Cultural Journeys",
  "image": "/World/Cambodia.jpg",
  "gallery": [
    "/World/Cambodia.jpg"
  ],
  "shortDescription": "Taste your way through the bustling streets of Hanoi.",
  "description": "Join a local foodie to explore the hidden alleys of the Old Quarter, tasting authentic pho, banh mi, and egg coffee.",
  "duration": "Half day",
  "bestSeason": "Autumn",
  "activityLevel": "Easy",
  "groupSize": "2-8",
  "price": 45,
  "included": [
    "Food tastings",
    "Guide"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Tasting",
      "description": "Start with local pho."
    }
  ],
  "whatToBring": [
    "Empty stomach"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Standard"
  },
  "localTips": [
    "Pace yourself!"
  ],
  "coordinates": {
    "lat": 21.0285,
    "lng": 105.8542
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-22",
  "slug": "kenya-photography-safari",
  "title": "Kenya Photography Safari",
  "destination": "Maasai Mara",
  "country": "Kenya",
  "region": "Africa",
  "category": "Photography",
  "travelStyle": "Adventure Travel",
  "image": "/World/Egypt.jpg",
  "gallery": [
    "/World/Egypt.jpg"
  ],
  "shortDescription": "Capture stunning wildlife moments with a pro photographer.",
  "description": "Specially designed vehicles for photographers. Learn techniques for capturing action shots of cheetahs and lions.",
  "duration": "6 days",
  "bestSeason": "Summer",
  "activityLevel": "Moderate",
  "groupSize": "2-4",
  "price": 3500,
  "included": [
    "Photo guide",
    "Lodging",
    "Drives"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Drive",
      "description": "Sunrise shoot."
    }
  ],
  "whatToBring": [
    "Camera gear"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Standard"
  },
  "localTips": [
    "Bring extra batteries."
  ],
  "coordinates": {
    "lat": -1.4061,
    "lng": 34.9557
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-23",
  "slug": "wellness-retreat-costa-rica",
  "title": "Wellness Retreat in Costa Rica",
  "destination": "Nosara",
  "country": "Costa Rica",
  "region": "Americas",
  "category": "Wellness",
  "travelStyle": "Wellness",
  "image": "/World/Bali.jpg",
  "gallery": [
    "/World/Bali.jpg"
  ],
  "shortDescription": "Yoga, surfing, and healthy living.",
  "description": "Reconnect with yourself in the jungle. Daily yoga, surf lessons, and organic plant-based meals.",
  "duration": "7 days",
  "bestSeason": "Winter",
  "activityLevel": "Easy",
  "groupSize": "2-12",
  "price": 1800,
  "included": [
    "Yoga",
    "Meals",
    "Lodging"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Yoga",
      "description": "Morning Vinyasa."
    }
  ],
  "whatToBring": [
    "Yoga clothes"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Standard"
  },
  "localTips": [
    "Embrace the Pura Vida lifestyle."
  ],
  "coordinates": {
    "lat": 9.9806,
    "lng": -85.6534
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-24",
  "slug": "hidden-gems-patagonia",
  "title": "Hidden Gems of Patagonia",
  "destination": "Patagonia",
  "country": "Argentina",
  "region": "Americas",
  "category": "Hidden Gems",
  "travelStyle": "Adventure Travel",
  "image": "/World/switzerland.jpg",
  "gallery": [
    "/World/switzerland.jpg"
  ],
  "shortDescription": "Trek the undiscovered trails of the Andes.",
  "description": "Go beyond the usual tourist spots and explore remote glaciers and pristine alpine lakes.",
  "duration": "8 days",
  "bestSeason": "Summer",
  "activityLevel": "Challenging",
  "groupSize": "2-6",
  "price": 2400,
  "included": [
    "Guide",
    "Tents",
    "Meals"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Trek",
      "description": "Start the remote hike."
    }
  ],
  "whatToBring": [
    "Trekking gear"
  ],
  "importantInformation": {
    "safety": "Wilderness",
    "accessibility": "None",
    "etiquette": "Leave no trace"
  },
  "localTips": [
    "Weather changes fast."
  ],
  "coordinates": {
    "lat": -49.3315,
    "lng": -72.8856
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-25",
  "slug": "local-life-morocco",
  "title": "Local Life in Morocco",
  "destination": "Marrakech",
  "country": "Morocco",
  "region": "Africa",
  "category": "Local Life",
  "travelStyle": "Cultural Journeys",
  "image": "/World/Egypt.jpg",
  "gallery": [
    "/World/Egypt.jpg"
  ],
  "shortDescription": "Immerse yourself in the bustling souks and riads.",
  "description": "Stay in a traditional riad, learn to cook tagine, and navigate the medina with a local.",
  "duration": "4 days",
  "bestSeason": "Spring",
  "activityLevel": "Easy",
  "groupSize": "2-8",
  "price": 600,
  "included": [
    "Riad",
    "Cooking class",
    "Guide"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Tour",
      "description": "Medina walking tour."
    }
  ],
  "whatToBring": [
    "Comfortable clothes"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Dress modestly"
  },
  "localTips": [
    "Bargain with a smile."
  ],
  "coordinates": {
    "lat": 31.6295,
    "lng": -7.9811
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-26",
  "slug": "local-life-hanoi",
  "title": "Local Life in Hanoi",
  "destination": "Hanoi",
  "country": "Vietnam",
  "region": "Asia",
  "category": "Local Life",
  "travelStyle": "Cultural Journeys",
  "image": "/World/Cambodia.jpg",
  "gallery": [
    "/World/Cambodia.jpg"
  ],
  "shortDescription": "Experience authentic daily life in Vietnam's capital.",
  "description": "Join locals for early morning Tai Chi by Hoan Kiem Lake, shop at a wet market, and enjoy a traditional family meal in a local home.",
  "duration": "Full day",
  "bestSeason": "Autumn",
  "activityLevel": "Easy",
  "groupSize": "2-6",
  "price": 85,
  "included": [
    "Market tour",
    "Family meal",
    "Local guide"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Morning",
      "description": "Tai Chi and market visit."
    }
  ],
  "whatToBring": [
    "Walking shoes"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Remove shoes in homes"
  },
  "localTips": [
    "Try the iced coffee with condensed milk."
  ],
  "coordinates": {
    "lat": 21.0285,
    "lng": 105.8542
  },
  "relatedExperienceSlugs": []
},
{
  "id": "exp-27",
  "slug": "new-zealand-wine-tour",
  "title": "New Zealand Wine & Nature",
  "destination": "Marlborough",
  "country": "New Zealand",
  "region": "Oceania",
  "category": "Food & Cuisine",
  "travelStyle": "Romantic",
  "image": "/World/Australia.jpg",
  "gallery": [
    "/World/Australia.jpg"
  ],
  "shortDescription": "Taste world-class Sauvignon Blanc among stunning scenery.",
  "description": "Cycle through vineyards, taste award-winning wines, and enjoy a gourmet picnic overlooking the sounds.",
  "duration": "Full day",
  "bestSeason": "Summer",
  "activityLevel": "Moderate",
  "groupSize": "2-10",
  "price": 150,
  "included": [
    "Bicycle rental",
    "Wine tastings",
    "Picnic lunch"
  ],
  "itinerary": [
    {
      "step": 1,
      "title": "Cycling",
      "description": "Cycle between three premium wineries."
    }
  ],
  "whatToBring": [
    "Sunscreen",
    "Activewear"
  ],
  "importantInformation": {
    "safety": "Standard",
    "accessibility": "Standard",
    "etiquette": "Standard"
  },
  "localTips": [
    "Pace yourself with the tastings while cycling."
  ],
  "coordinates": {
    "lat": -41.5134,
    "lng": 173.9612
  },
  "relatedExperienceSlugs": []
}
];
