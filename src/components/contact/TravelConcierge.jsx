import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '../ui/SectionReveal';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export function TravelConcierge({ selectedTopic = 'general', onTopicChange }) {
  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success'
  const { addEnquiry } = useAdminData();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    const enquiry = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value || '',
      subject: `Contact: ${selectedTopic}`,
      status: 'New',
      details: e.target.message.value
    };

    // Simulate API call
    setTimeout(() => {
      addEnquiry(enquiry);
      setFormState('success');
      setTimeout(() => setFormState('idle'), 5000); // Reset after 5s
      e.target.reset();
    }, 1500);
  };

  return (
    <section id="contact-form" className="py-24 bg-sand text-charcoal">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Contact Info Side */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center">
            <SectionReveal>
              <span className="text-sm font-bold tracking-widest uppercase text-bronze mb-4 block">Personalized Service</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Connect with a Travel Concierge</h2>
              <p className="text-stone mb-12">
                Our team of dedicated travel specialists is available to answer your questions, refine your ideas, and begin the collaborative process of designing your bespoke itinerary.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory text-bronze flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Global Headquarters</h4>
                    <p className="text-stone text-sm">124 Premium Avenue, Suite 400<br/>New York, NY 10012</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory text-bronze flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Telephone</h4>
                    <p className="text-stone text-sm"><a href="https://wa.me/18005550199" target="_blank" rel="noopener noreferrer" className="hover:text-bronze transition-colors">+1 (800) 555-0199</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ivory text-bronze flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg mb-1">Email</h4>
                    <p className="text-stone text-sm"><a href="mailto:concierge@tripcanvas.com" className="hover:text-bronze transition-colors">concierge@tripcanvas.com</a><br/>Usually replies within 24 hours</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <SectionReveal>
              <div className="bg-ivory rounded-3xl p-8 md:p-12 shadow-sm border border-charcoal/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-bold uppercase tracking-wider text-charcoal/70">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required
                        className="w-full bg-sand border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-bronze outline-none transition-shadow"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required
                        className="w-full bg-sand border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-bronze outline-none transition-shadow"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full bg-sand border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-bronze outline-none transition-shadow"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        className="w-full bg-sand border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-bronze outline-none transition-shadow"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Area of Interest</label>
                    <select 
                      id="interest" 
                      value={selectedTopic}
                      onChange={(e) => onTopicChange && onTopicChange(e.target.value)}
                      className="w-full bg-sand border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-bronze outline-none transition-shadow text-charcoal"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="tailor-made">Trip Planning & Tailor-Made Journey</option>
                      <option value="existing-booking">Existing Bookings</option>
                      <option value="support">24/7 Support & Assistance</option>
                      <option value="payments">Payments & Billing</option>
                      <option value="group">Small Group Tour</option>
                      <option value="corporate">Corporate Retreat</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-charcoal/70">Your Message</label>
                    <textarea 
                      id="message" 
                      required
                      rows={5}
                      className="w-full bg-sand border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-bronze outline-none transition-shadow resize-none"
                      placeholder="Tell us a bit about your travel plans or how we can help..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState !== 'idle'}
                    className="w-full bg-charcoal text-ivory rounded-lg py-4 font-medium flex items-center justify-center gap-2 hover:bg-bronze transition-colors disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative"
                  >
                    <AnimatePresence mode="wait">
                      {formState === 'idle' && (
                        <motion.div 
                          key="submit"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          Send Message <Send className="w-4 h-4" />
                        </motion.div>
                      )}
                      {formState === 'submitting' && (
                        <motion.div 
                          key="submitting"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                          Sending...
                        </motion.div>
                      )}
                      {formState === 'success' && (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-bronzeLight"
                        >
                          Message Sent Successfully!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </form>
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
