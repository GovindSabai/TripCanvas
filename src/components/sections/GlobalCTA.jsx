import React from 'react';
import { GroupEnquiryButton } from '../ui/GroupEnquiryButton';
import { Link, useLocation } from 'react-router-dom';

export function GlobalCTA() {
  const location = useLocation();
  const hiddenRoutes = ['/contact'];
  
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <section className="py-20 bg-ivory text-charcoal border-t border-stone/20">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl mb-6">Ready to plan your unforgettable journey?</h2>
        <p className="text-lg text-charcoal/80 mb-10">
          Get in touch with our experts to customize your perfect group travel experience with TerraVista.
        </p>
        <div className="flex justify-center">
          <GroupEnquiryButton asChild>
            <Link to="/contact?topic=group" className="flex items-center gap-2">Group Enquiry?</Link>
          </GroupEnquiryButton>
        </div>
      </div>
    </section>
  );
}
