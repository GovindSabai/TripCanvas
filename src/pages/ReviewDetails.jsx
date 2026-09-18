import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { reviews } from '../data/homeData';

export default function ReviewDetails() {
  const { id } = useParams();
  
  // Find the review by ID, or fallback to the first one if not found
  const review = reviews.find(r => r.id === id) || reviews[0];

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-5 md:px-8 xl:px-12 pt-32">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 font-medium mb-10 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to reviews
        </Link>

        {/* Review Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shadow-sm border border-gray-100">
              <img src={`https://ui-avatars.com/api/?name=${review.name.split(' ').join('+')}&background=random&size=128`} alt={review.name} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{review.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">{review.time}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-sm font-bold text-gray-500 flex items-center gap-1">
                  Posted on 
                  <span className="font-bold tracking-tighter ml-1">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        {/* Review Content (Long) */}
        <div className="prose max-w-none text-gray-700 space-y-6 text-lg leading-relaxed">
          <p className="font-medium text-xl text-gray-900 border-l-4 border-yellow-400 pl-4 italic">
            "{review.text}"
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            When we first decided to plan this trip, we were completely overwhelmed by the sheer number of options, logistics, and planning required. We wanted an experience that was seamless, authentic, and completely stress-free. From the moment we reached out to TripCanvas, we knew we were in the hands of absolute professionals.
          </p>
          
          <p>
            The booking process was incredibly smooth. The team took the time to listen to our specific needs, our budget, and what we genuinely wanted to get out of the trip. They didn't just offer us a generic package; they curated a highly personalized itinerary that felt tailored specifically to us. Every hotel they suggested was a hidden gem, combining luxury with deep local culture. 
          </p>

          <p>
            What truly set them apart was the on-ground support. From the moment we landed, we were greeted warmly. The transportation was always punctual, the vehicles were pristine, and our guides were incredibly knowledgeable. They weren't just reciting facts from a guidebook; they shared personal stories and historical context that brought every monument and landscape to life. We never had to worry about a single detail—whether it was visa assistance, changing flight schedules, or arranging special dietary requirements at local restaurants, everything was handled proactively.
          </p>

          <p>
            I specifically want to mention how adaptable they were. When we wanted to make a last-minute change to our itinerary to spend more time at a particular location, the support team handled it instantly without any fuss or hidden charges. Their 24/7 availability is not just a marketing slogan; it's a promise they kept throughout our journey.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
            I cannot recommend TripCanvas highly enough. They transformed what could have been a stressful planning process into the trip of a lifetime. If you are looking for a premium, meticulously planned, and genuinely caring travel experience, look no further. We are already looking forward to booking our next adventure with them!
          </p>
        </div>

      </div>
    </div>
  );
}
