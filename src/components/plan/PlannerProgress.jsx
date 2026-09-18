import React, { useEffect, useState } from 'react';
import { useTripPlanner } from '../../context/TripPlannerContext';
import { calculateProgress } from '../../utils/plannerUtils';
import { Toast } from '../ui/Toast';

export function PlannerProgress() {
  const { state } = useTripPlanner();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const handleStepChange = (e) => {
      setActiveStep(e.detail);
    };
    window.addEventListener('active-step-changed', handleStepChange);
    return () => window.removeEventListener('active-step-changed', handleStepChange);
  }, []);

  // Keep track of which milestones have been completed so we only toast once per milestone
  const [milestones, setMilestones] = useState({
    destination: false,
    dates: false,
    travelers: false,
    styles: false,
    experiences: false,
    budget: false
  });

  useEffect(() => {
    const newProgress = calculateProgress(state);
    setProgress(newProgress);

    // Check milestones and fire toasts
    const newMilestones = { ...milestones };
    let justCompleted = null;

    if (!milestones.destination && state.destinations && state.destinations.length > 0) {
      newMilestones.destination = true;
      justCompleted = "Destination selected";
    }
    if (!milestones.dates && state.dates && (state.dates.start || state.dates.flexible)) {
      newMilestones.dates = true;
      justCompleted = "Dates added";
    }
    if (!milestones.travelers && state.travelers && state.travelers.adults > 0 && newProgress > 10) { 
      if (progress > 0) {
        newMilestones.travelers = true;
      }
    }
    if (!milestones.styles && state.travelStyles && state.travelStyles.length > 0) {
      newMilestones.styles = true;
      justCompleted = "Travel style defined";
    }
    if (!milestones.experiences && state.experienceInterests && state.experienceInterests.length > 0) {
      newMilestones.experiences = true;
      justCompleted = "Experiences added";
    }
    if (!milestones.budget && state.budgetRange && state.budgetRange !== '') {
      newMilestones.budget = true;
      justCompleted = "Budget set";
    }

    if (JSON.stringify(newMilestones) !== JSON.stringify(milestones)) {
      setMilestones(newMilestones);
      if (justCompleted) {
        setToastMessage(justCompleted);
      }
    }
  }, [state]);

  return (
    <div className="sticky top-[80px] z-40 bg-ivory/95 backdrop-blur-md py-4 border-b border-stone/20 mb-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <h3 className="font-serif font-bold text-charcoal text-lg">Step {activeStep} of 7 Completed</h3>
        <span className="text-sm font-medium text-stone uppercase tracking-wider">01 Destination → 07 Review</span>
      </div>
      <div className="w-full h-2 bg-sand/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-bronze transition-all duration-700 ease-out rounded-full"
          style={{ width: `${(activeStep / 7) * 100}%` }}
        />
      </div>

      <Toast 
        isVisible={!!toastMessage}
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
