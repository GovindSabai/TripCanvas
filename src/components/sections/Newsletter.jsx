import React, { useState } from 'react';
import { SectionReveal } from '../ui/SectionReveal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Toast } from '../ui/Toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isSubmitDisabled = !email || !isValidEmail(email) || status === 'loading';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setToastMessage(
        <div className="flex flex-col gap-1">
          <span className="font-semibold block">Message Received</span>
          <span className="text-sm opacity-90 block">Thank you for connecting with TerraVista. Our team will get back to you shortly.</span>
        </div>
      );
      setToastVisible(true);
      
      // Reset status after a while
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (status !== 'idle') setStatus('idle');
  };

  return (
    <section className="py-desktop-rhythm bg-ink text-ivory max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
      <SectionReveal>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-h2 font-serif mb-6">Go Somewhere New.</h2>
          <p className="text-ivory/80 text-lg mb-10">
            Join our inner circle to receive exclusive itineraries, insider travel tips, and early access to our most sought-after journeys.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-grow">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                className="w-full h-12 bg-ivory/10 border-ivory/20 text-ivory placeholder:text-ivory/50 focus:ring-bronze"
                aria-label="Email address"
                required
              />
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              className="h-12 px-8 bg-bronze text-white hover:bg-bronzeLight sm:w-auto w-full"
              disabled={isSubmitDisabled}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          {!isValidEmail(email) && email.length > 0 && (
            <p className="text-red-400 text-sm mt-3 text-left max-w-xl mx-auto">Please enter a valid email address.</p>
          )}
        </div>
      </SectionReveal>

      <Toast 
        isVisible={toastVisible}
        message={toastMessage}
        type={status === 'error' ? 'error' : 'success'}
        onClose={() => setToastVisible(false)}
      />
    </section>
  );
}
