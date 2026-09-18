import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Sun, Activity, Users, CheckCircle2, XCircle, Share2, MapPin, ArrowRight } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useAuth } from '../context/AuthContext';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { StickySectionNav } from '../components/ui/StickySectionNav';
import { Timeline } from '../components/ui/Timeline';
import { ImageGallery } from '../components/ui/ImageGallery';
import { MapPreview } from '../components/ui/MapPreview';
import { ExperienceCard } from '../components/ui/ExperienceCard';
import { Button } from '../components/ui/Button';

export default function ExperienceDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPublicExperiences, addBooking } = useAdminData();
  const { currentUser } = useAuth();
  const experiences = getPublicExperiences();

  const exp = experiences.find(e => e.slug === slug);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    dates: '',
    travelers: '2 Adults',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!exp) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Experience Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't find the experience you're looking for. It may have been removed or the URL is incorrect.</p>
        <Button onClick={() => navigate('/experiences')} className="bg-charcoal text-white hover:bg-black">
          Browse All Experiences
        </Button>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'map', label: 'Location' }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: exp.title,
          text: exp.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share error:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const relatedExps = exp.relatedExperienceSlugs
    .map(relatedSlug => experiences.find(e => e.slug === relatedSlug))
    .filter(Boolean);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to book an experience.");
      navigate('/login', { state: { from: `/experiences/${slug}` } });
      return;
    }
    const newBooking = {
      id: `BK-${Math.floor(Math.random() * 90000) + 10000}`,
      destination: exp.title,
      dates: bookingFormData.dates || 'TBD',
      travelers: bookingFormData.travelers || '2 Adults',
      travelStyle: 'Experience',
      status: 'Upcoming',
      price: exp.price,
      blueprint: exp
    };
    addBooking(newBooking);
    setIsBookingOpen(false);
    alert('Experience booked successfully! Check your Profile or Admin Dashboard.');
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(exp.price);

  return (
    <div className="bg-ivory flex flex-col min-h-screen">
      <main className="flex-grow pb-20">

        {/* Top Header / Breadcrumbs */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Experiences', path: '/experiences' },
              { label: exp.category, path: `/experiences?category=${exp.category}` },
              { label: exp.title }
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 mb-10">
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden group">
            <img
              src={exp.image}
              alt={exp.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-6 right-6 flex gap-3">
              <button onClick={handleShare} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                <Share2 size={20} />
              </button>
            </div>

            <div className="absolute bottom-10 left-8 md:left-12 right-8 md:right-12">
              <div className="flex items-center gap-2 text-white/80 font-semibold tracking-wider uppercase text-sm mb-4">
                <MapPin size={16} className="text-bronze" /> {exp.destination}, {exp.country}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-white font-bold drop-shadow-lg mb-6 leading-tight max-w-4xl">
                {exp.title}
              </h1>
              <div className="flex flex-wrap gap-4 md:gap-8 text-white/90 font-medium">
                <span className="flex items-center gap-2"><Clock size={18} className="text-bronze" /> {exp.duration}</span>
                <span className="flex items-center gap-2"><Sun size={18} className="text-bronze" /> {exp.bestSeason}</span>
                <span className="flex items-center gap-2"><Activity size={18} className="text-bronze" /> {exp.activityLevel}</span>
                <span className="flex items-center gap-2"><Users size={18} className="text-bronze" /> {exp.groupSize}</span>
              </div>
            </div>
          </div>
        </div>

        <StickySectionNav sections={sections} />

        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 py-12 flex flex-col lg:flex-row gap-12">

          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 space-y-16">

            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{exp.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-500" /> What's Included
                  </h3>
                  <ul className="space-y-3">
                    {exp.included.map((item, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2 mt-1 shrink-0">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-bronze" /> What to Bring
                  </h3>
                  <ul className="space-y-3">
                    {exp.whatToBring.map((item, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="text-bronze mr-2 mt-1 shrink-0">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-bronze/5 p-6 rounded-2xl border border-bronze/20">
                <h3 className="font-bold text-gray-900 mb-4 font-serif">Important Information</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <p><strong>Safety:</strong> {exp.importantInformation.safety}</p>
                  <p><strong>Accessibility:</strong> {exp.importantInformation.accessibility}</p>
                  <p><strong>Etiquette:</strong> {exp.importantInformation.etiquette}</p>
                </div>
              </div>
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Itinerary</h2>
              <Timeline items={exp.itinerary} />
            </section>

            {/* Gallery */}
            <section id="gallery" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Gallery</h2>
              <ImageGallery images={exp.gallery} title={exp.title} />
            </section>

            {/* Map */}
            <section id="map" className="scroll-mt-32">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Location</h2>
              <MapPreview coordinates={exp.coordinates} destinationName={exp.destination} />
            </section>

          </div>

          {/* Sidebar Booking / Pricing */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-[140px] bg-white rounded-3xl border border-gray-200 shadow-xl p-8">
              <div className="text-gray-500 font-medium mb-2">Price per person</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{formattedPrice}</div>
              <div className="text-xs text-gray-400 mb-2">*Taxes and fees calculated at checkout.</div>
              <p className="text-[11px] text-[#C9A86A] italic leading-tight mb-8">
                Prices may vary depending on your destination and travel preferences.
              </p>

              <Button onClick={() => setIsBookingOpen(true)} className="w-full bg-bronze hover:bg-bronzeLight text-white py-4 text-lg font-bold mb-4 shadow-lg shadow-bronze/20">
                Book Experience
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-charcoal hover:bg-gray-50 py-4 font-bold">
                Inquire Now
              </Button>

              <hr className="my-8 border-gray-100" />

              <h4 className="font-bold text-gray-900 mb-4">Local Tips from our Experts</h4>
              <ul className="space-y-4">
                {exp.localTips.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-600">
                    <span className="text-bronze font-bold text-xl leading-none">"</span>
                    <span className="italic leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Related Experiences */}
        {relatedExps.length > 0 && (
          <section className="bg-white py-20 border-t border-gray-100 mt-12">
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-serif font-bold text-gray-900">You Might Also Like</h2>
                <Link to="/experiences" className="hidden md:flex items-center gap-2 text-bronze font-bold hover:text-bronzeLight transition-colors">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedExps.map((related) => (
                  <ExperienceCard key={related.id} experience={related} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XCircle size={24} />
            </button>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">Book Experience</h3>
            <p className="text-stone text-sm mb-6">You are booking: {exp.title}</p>
            <form onSubmit={handleBookSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Dates</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dec 12 - Dec 15" 
                  value={bookingFormData.dates}
                  onChange={e => setBookingFormData({...bookingFormData, dates: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-bronze focus:ring-bronze p-2 border" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2 Adults" 
                  value={bookingFormData.travelers}
                  onChange={e => setBookingFormData({...bookingFormData, travelers: e.target.value})}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-bronze focus:ring-bronze p-2 border" 
                  required 
                />
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-full bg-bronze hover:bg-bronzeLight text-white py-3 text-lg font-bold">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
