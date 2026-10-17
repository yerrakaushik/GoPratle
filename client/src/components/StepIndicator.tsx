'use client';

import React from 'react';
import { useRequirementForm } from '../context/FormContext';
import { Check } from 'lucide-react';

export const StepIndicator: React.FC = () => {
  const { currentStep, formData, goToStep } = useRequirementForm();

  const getStep2Title = () => {
    switch (formData.category) {
      case 'planner':
        return 'Scope & Guests';
      case 'performer':
        return 'Act & Duration';
      case 'crew':
        return 'Roles & Headcount';
      default:
        return 'Scope';
    }
  };

  const getStep3Title = () => {
    switch (formData.category) {
      case 'planner':
        return 'Services & Budget';
      case 'performer':
        return 'Rider & Fee';
      case 'crew':
        return 'Logistics & Pay';
      default:
        return 'Details';
    }
  };

  const steps = [
    { number: 1, title: 'Event Basics' },
    { number: 2, title: getStep2Title() },
    { number: 3, title: getStep3Title() },
    { number: 4, title: 'Review & Submit' },
  ];

  return (
    <div className="w-full mb-8">
      {/* Precision Step Bar */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {steps.map((step) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => goToStep(step.number)}
              disabled={step.number > currentStep}
              className={`text-left p-3 rounded-xl border transition-all duration-150 relative group ${
                isCurrent
                  ? 'border-zinc-400 bg-zinc-900/90 text-white shadow-sm ring-1 ring-zinc-500/20'
                  : isCompleted
                  ? 'border-zinc-800 bg-zinc-950/60 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/60 active:scale-[0.98]'
                  : 'border-zinc-800/60 bg-zinc-950/20 text-zinc-600 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    isCurrent
                      ? 'text-white'
                      : isCompleted
                      ? 'text-zinc-400'
                      : 'text-zinc-600'
                  }`}
                >
                  Step {step.number}
                </span>

                {isCompleted && (
                  <span className="w-4 h-4 rounded-full bg-zinc-100 text-zinc-950 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                  </span>
                )}
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>

              <div
                className={`text-xs font-medium truncate ${
                  isCurrent
                    ? 'text-white'
                    : isCompleted
                    ? 'text-zinc-300'
                    : 'text-zinc-500'
                }`}
              >
                {step.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
