import React, { useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { ArrowRight, Mountain, Umbrella, Sparkles, Compass, Gem, Wallet } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "What's your ideal scenery?",
    options: [
      { label: "Mountains & Valleys", icon: Mountain, tag: "mountain" },
      { label: "Beaches & Oceans", icon: Umbrella, tag: "beach" }
    ]
  },
  {
    id: 2,
    title: "How do you want to spend your days?",
    options: [
      { label: "Relaxing & Recharging", icon: Sparkles, tag: "relax" },
      { label: "Exploring & Adventuring", icon: Compass, tag: "explore" }
    ]
  },
  {
    id: 3,
    title: "What's your travel vibe?",
    options: [
      { label: "Luxury & Comfort", icon: Gem, tag: "luxury" },
      { label: "Authentic & Budget-friendly", icon: Wallet, tag: "budget" }
    ]
  }
];

export function TravelQuiz() {
  const { state, dispatch } = useTripPlanner();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  if (state.destinationMode !== 'undecided') return null;

  const handleAnswer = (tag) => {
    const newAnswers = [...answers, tag];
    
    if (currentQ < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(prev => prev + 1);
    } else {
      // Calculate result
      const tags = newAnswers.join('-');
      let suggestedDest = { name: 'Bali', slug: 'bali-indonesia', price: 120 };
      
      if (tags.includes('mountain') && tags.includes('explore')) suggestedDest = { name: 'Swiss Alps', slug: 'swiss-alps', price: 200 };
      if (tags.includes('mountain') && tags.includes('relax')) suggestedDest = { name: 'Kyoto', slug: 'kyoto-japan', price: 180 };
      if (tags.includes('beach') && tags.includes('luxury')) suggestedDest = { name: 'Maldives', slug: 'maldives', price: 300 };
      
      setResult(suggestedDest);
    }
  };

  const applyResult = () => {
    dispatch({ type: 'SET_DESTINATION_MODE', payload: 'world' }); // Just set it out of undecided
    dispatch({ 
      type: 'ADD_DESTINATION', 
      payload: { slug: result.slug, name: result.name, isCatalogEntry: true, basePrice: result.price } 
    });
  };

  if (result) {
    return (
      <div className="py-12 bg-ivory">
        <div className="max-w-[600px] mx-auto px-5 text-center bg-sand/20 p-10 rounded-3xl border border-bronze/20">
          <Sparkles className="mx-auto text-bronze mb-4" size={40} />
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">We found your match!</h3>
          <p className="text-stone mb-6">Based on your answers, you should definitely visit:</p>
          <div className="text-4xl font-serif font-bold text-bronze mb-8">{result.name}</div>
          <button 
            onClick={applyResult}
            className="bg-charcoal text-ivory font-bold py-3 px-8 rounded-full hover:bg-charcoal/90 transition-colors"
          >
            Add to My Planner
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="py-12 bg-ivory">
      <div className="max-w-[800px] mx-auto px-5">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone/10 text-center">
          <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
            Mini Quiz • Question {currentQ + 1} of 3
          </span>
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8">{q.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {q.options.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.tag)}
                  className="p-6 rounded-2xl border-2 border-stone/10 hover:border-bronze hover:bg-sand/10 transition-all flex flex-col items-center gap-4 group"
                >
                  <Icon size={32} className="text-stone group-hover:text-bronze transition-colors" />
                  <span className="font-bold text-lg text-charcoal">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
