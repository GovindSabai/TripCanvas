import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#5c1315] via-[#1c1220] to-[#0f101f] text-ivory/80 pt-10 pb-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-ivory/20 pb-12">
        <div className="md:col-span-1">
          <Link to="/" className="block w-[100px] md:w-[120px] ml-8 -mt-6 -mb-4">
            <img src="/Logo.png" alt="TripCanvas Logo" className="w-full h-auto object-contain object-left" />
          </Link>
          <p className="text-sm leading-relaxed mb-6 mt-4">
            Discover More. Travel Deeper. Curating premium travel experiences for the modern explorer.
          </p>
        </div>
        <div>
          <h4 className="text-ivory font-medium mb-6 uppercase text-sm tracking-wider">Explore</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/destinations" className="hover:text-bronzeLight transition-colors">Destinations</Link></li>
            <li><Link to="/experiences" className="hover:text-bronzeLight transition-colors">Experiences</Link></li>
            <li><Link to="/journal" className="hover:text-bronzeLight transition-colors">Journal</Link></li>
            <li><Link to="/plan" className="hover:text-bronzeLight transition-colors">Plan Your Trip</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-ivory font-medium mb-6 uppercase text-sm tracking-wider">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-bronzeLight transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-bronzeLight transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-bronzeLight transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-ivory font-medium mb-6 uppercase text-sm tracking-wider">Social</h4>
          <div className="flex gap-4">
            {/* Facebook */}
            <Link to="/facebook" className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </Link>
            {/* LinkedIn */}
            <Link to="/linkedin" className="w-10 h-10 rounded-full bg-[#007bb5] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </Link>
            {/* Instagram */}
            <Link to="/instagram" className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </Link>
            {/* YouTube */}
            <Link to="/youtube" className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} TripCanvas Travel. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 text-ivory/60">
          <Link to="/privacy" className="hover:text-bronzeLight transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-bronzeLight transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
