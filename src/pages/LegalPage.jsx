import React from 'react';

export default function LegalPage({ title }) {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20 px-5 md:px-8 xl:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-8">{title}</h1>
        
        <div className="prose prose-stone max-w-none">
          <p className="text-stone leading-relaxed mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          
          <h2 className="text-2xl font-serif text-charcoal mb-4 mt-8">1. Introduction</h2>
          <p className="text-stone leading-relaxed mb-6">
            Welcome to TripCanvas. We are committed to protecting your personal information and your right to privacy. 
            If you have any questions or concerns about this policy, or our practices with regards to your personal information, 
            please contact us.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mb-4 mt-8">2. Information We Collect</h2>
          <p className="text-stone leading-relaxed mb-6">
            We collect personal information that you voluntarily provide to us when you register on the website, 
            express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mb-4 mt-8">3. How We Use Your Information</h2>
          <p className="text-stone leading-relaxed mb-6">
            We use personal information collected via our website for a variety of business purposes described below. 
            We process your personal information for these purposes in reliance on our legitimate business interests, 
            in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>

          <h2 className="text-2xl font-serif text-charcoal mb-4 mt-8">4. Sharing Your Information</h2>
          <p className="text-stone leading-relaxed mb-6">
            We only share information with your consent, to comply with laws, to provide you with services, 
            to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis.
          </p>
          
          <div className="mt-12 p-6 bg-ivory rounded-xl">
            <h3 className="text-xl font-serif text-charcoal mb-2">Need Help?</h3>
            <p className="text-stone">
              If you have any questions regarding these terms or policies, please reach out to our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
