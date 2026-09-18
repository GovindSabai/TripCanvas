import React, { useState } from 'react';
import { Toast } from '../ui/Toast';

export function RegionHero({ region }) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastVisible(true);
    e.target.reset();
  };

  return (
    <section className="relative w-full min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={region.heroImage} 
          alt={region.name} 
          className="w-full h-full object-cover object-center"
        />
        {/* Adjusted gradient to match the brighter look in screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side Content */}
        <div className="text-white max-w-2xl w-full">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold font-sans mb-6 leading-[1.1] shadow-sm tracking-tight">
            {region.name} Tour <br className="hidden md:block" /> Package
          </h1>
          <p className="text-2xl md:text-3xl text-[#ffc107] font-bold mb-6 drop-shadow-md">
            Up To 20% Off Best Tour Deal For 2026
          </p>
          <p className="text-base md:text-xl font-medium text-white">
            {region.name} | Tour | Hotel | Sightseeing
          </p>
        </div>

        {/* Right Side Form Panel - Floating rounded box */}
        <div className="w-full max-w-[420px] bg-[#0070c0] rounded-xl p-6 md:p-8 flex flex-col shrink-0 shadow-2xl relative">
          <h3 className="text-white text-2xl font-bold mb-6">Get Best Quotes</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="text-white text-sm mb-1 block">*Travel Date</label>
              <div className="relative">
                <input type="date" className="w-full px-3 py-2.5 rounded text-sm text-gray-800 outline-none" required />
              </div>
            </div>
            
            <input type="text" placeholder="* Name" pattern="[A-Za-z\s]+" title="Please enter a valid name" className="w-full px-3 py-2.5 rounded text-sm text-gray-800 outline-none" required />
            <input type="email" placeholder="* Email id" className="w-full px-3 py-2.5 rounded text-sm text-gray-800 outline-none" required />
            <input type="tel" placeholder="* Phone or whatsapp No" pattern="[\+]?[0-9\s\-\(\)]{10,15}" title="Please enter a valid phone number" className="w-full px-3 py-2.5 rounded text-sm text-gray-800 outline-none" required />
            <input type="text" placeholder="* Your City (Ex.. Bhopal)" className="w-full px-3 py-2.5 rounded text-sm text-gray-800 outline-none" required />
            <input type="number" placeholder="* No of Person Travel" className="w-full px-3 py-2.5 rounded text-sm text-gray-800 outline-none" min="1" required />
            
            <div className="bg-[#f8f9fa] rounded p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm text-gray-800 font-bold whitespace-nowrap">What is</span>
                {/* Fake captcha image */}
                <div className="bg-gray-100 border border-gray-300 px-4 py-1.5 flex items-center justify-center flex-grow relative overflow-hidden">
                   {/* Diagonal lines to make it look like a captcha */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                     <svg width="100%" height="100%" className="absolute"><line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1"/><line x1="0" y1="100%" x2="100%" y2="0" stroke="black" strokeWidth="1"/></svg>
                   </div>
                  <span className="font-mono text-xl font-bold tracking-widest text-gray-800 z-10 mix-blend-multiply">5 x 9 ?</span>
                </div>
                <button type="button" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <input type="text" placeholder="Type your answer" className="w-full px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500 bg-white" required />
            </div>
            
            <button type="submit" className="w-28 bg-[#0d6efd] border border-blue-400 text-white hover:bg-blue-700 transition-colors font-medium py-2 px-4 rounded shadow-sm text-sm">
              Submit
            </button>
          </form>

          {/* WhatsApp Icon */}
          <a href="#" className="absolute -bottom-6 -right-6 bg-[#25D366] text-white rounded-full p-3.5 shadow-lg hover:bg-[#128C7E] transition-colors z-20">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>

      </div>

      {/* Customize Your Trip Circle */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-[90px] h-[90px] bg-[#0f172a] rounded-full flex items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform z-20 shadow-2xl border-2 border-white/5">
        <span className="text-white text-[11px] font-bold leading-tight">Customize<br/>Your<br/>Trip</span>
      </div>

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
    </section>
  );
}
