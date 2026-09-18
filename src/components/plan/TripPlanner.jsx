import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { StartingLocationStep } from './steps/StartingLocationStep';
import { DestinationStep } from './steps/DestinationStep';
import { DateStep } from './steps/DateStep';
import { TravelerStep } from './steps/TravelerStep';
import { TravelStyleStep } from './steps/TravelStyleStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { BudgetStep } from './steps/BudgetStep';
import { useTripPlanner } from '../../context/TripPlannerContext';

const steps = [
  { id: 'startingLocation', component: StartingLocationStep, title: 'Where are you travelling from?' },
  { id: 'destination', component: DestinationStep, title: 'Where do you want to go?' },
  { id: 'dates', component: DateStep, title: 'When are you travelling?' },
  { id: 'travelers', component: TravelerStep, title: 'Who is coming?' },
  { id: 'styles', component: TravelStyleStep, title: 'What is your travel style?' },
  { id: 'experiences', component: ExperienceStep, title: 'What experiences excite you?' },
  { id: 'budget', component: BudgetStep, title: 'What is your budget per person?' }
];

export function TripPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const { state, dispatch } = useTripPlanner();

  React.useEffect(() => {
    const handleStepChange = (e) => {
      if (typeof e.detail === 'number' && e.detail >= 0 && e.detail < steps.length) {
        setCurrentStep(e.detail);
      }
    };
    window.addEventListener('change-planner-step', handleStepChange);
    return () => window.removeEventListener('change-planner-step', handleStepChange);
  }, []);

  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent('active-step-changed', { detail: currentStep }));
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: document.getElementById('planner-section').offsetTop - 100, behavior: 'smooth' });
    } else {
      dispatch({ type: 'FINISH_PLANNING' });
      setCurrentStep(0);
      window.dispatchEvent(new CustomEvent('active-step-changed', { detail: 7 }));
      const reviewEl = document.getElementById('review-section');
      if (reviewEl) {
        reviewEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback if no ID is found, just scroll down
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: document.getElementById('planner-section').offsetTop - 100, behavior: 'smooth' });
    }
  };

  const isNextDisabled = () => {
    // Validation per step to enable 'Next'
    switch (currentStep) {
      case 0: // startingLocation
        return !state.startingLocation;
      case 1: // destination
        return !state.destinations || state.destinations.length === 0;
      case 2: // dates
        return !(state.dates.flexible || (state.dates.start && state.dates.end));
      case 3: // travelers
        return !state.travelers || state.travelers.adults === 0;
      case 4: // styles
        return !state.travelStyles || state.travelStyles.length === 0;
      case 5: // experiences
        return !state.experienceInterests || state.experienceInterests.length === 0;
      case 6: // budget
        return !state.budgetRange || state.budgetRange === '';
      default:
        return false;
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/10 p-6 md:p-8 min-h-[600px] flex flex-col relative overflow-hidden">
      <div className="mb-8">
        <span className="text-bronze font-bold text-sm tracking-wider uppercase mb-2 block">
          Step {currentStep + 1} of {steps.length}
        </span>
        <h2 className="text-3xl font-serif font-bold text-charcoal">
          {steps[currentStep].title}
        </h2>
      </div>

      <div className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone/10">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 font-bold py-3 px-6 rounded-full transition-colors ${
            currentStep === 0 ? 'text-stone cursor-not-allowed opacity-50' : 'text-charcoal hover:bg-sand/30'
          }`}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        
        <button
          onClick={nextStep}
          disabled={isNextDisabled() && currentStep < steps.length - 1}
          className={`flex items-center gap-2 font-bold py-3 px-8 rounded-full transition-all ${
            isNextDisabled() && currentStep < steps.length - 1
              ? 'bg-stone/20 text-stone cursor-not-allowed'
              : 'bg-charcoal text-ivory hover:bg-charcoal/90 hover:shadow-lg'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Finish Planning' : 'Next Step'}
          {currentStep < steps.length - 1 && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
