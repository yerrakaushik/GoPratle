'use client';

import React from 'react';
import { useRequirementForm } from '../context/FormContext';
import { Check, Calendar, Settings, Sliders, Send } from 'lucide-react';

export const StepIndicator: React.FC = () => {
  const { currentStep, formData, goToStep } = useRequirementForm();

  // Dynamic titles depending on category
  const getStep2Title = () => {
    switch (formData.category) {
      case 'planner':
        return 'Scope & Guests';
      case 'performer':
        return 'Act & Duration';
      case 'crew':
        return 'Roles & Headcount';
      default:
        return 'Category Details';
    }
  };

  const getStep3Title = () => {
    switch (formData.category) {
      case 'planner':
        return 'Services & Scope';
      case 'performer':
        return 'Tech Rider & Budget';
      case 'crew':
        return 'Logistics & Pay';
      default:
        return 'Requirements & Fee';
    }
  };

  const steps = [
    { number: 1, title: 'Event Basics', subtitle: 'Type, dates & category', icon: Calendar },
    { number: 2, title: getStep2Title(), subtitle: 'Core specifications', icon: Settings },
    { number: 3, title: getStep3Title(), subtitle: 'Deliverables & budgets', icon: Sliders },
    { number: 4, title: 'Review & Submit', subtitle: 'Confirm & store data', icon: Send },
  ];

  const getCategoryColor = () => {
    switch (formData.category) {
      case 'planner':
        return {
          activeBg: 'bg-violet-600',
          activeBorder: 'border-violet-500',
          activeText: 'text-violet-400',
          ring: 'ring-violet-500/30',
        };
      case 'performer':
        return {
          activeBg: 'bg-rose-600',
          activeBorder: 'border-rose-500',
          activeText: 'text-rose-400',
          ring: 'ring-rose-500/30',
        };
      case 'crew':
        return {
          activeBg: 'bg-cyan-600',
          activeBorder: 'border-cyan-500',
          activeText: 'text-cyan-400',
          ring: 'ring-cyan-500/30',
        };
    }
  };

  const colors = getCategoryColor();

  return (
    <div className="w-full mb-8">
      {/* Step Progress Line on Desktop */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-neutral-800 -z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 transition-all duration-500 ease-out -z-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        <div className="flex items-center justify-between relative z-10">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            const StepIcon = step.icon;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => goToStep(step.number)}
                disabled={step.number > currentStep}
                className={`flex flex-col items-center group transition-all duration-200 focus:outline-none ${
                  step.number > currentStep ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-md ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : isCurrent
                      ? `${colors.activeBg} text-white shadow-lg ring-4 ${colors.ring}`
                      : 'bg-neutral-900 border border-neutral-700 text-neutral-400 group-hover:border-neutral-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>

                <div className="mt-2 text-center">
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isCurrent
                        ? colors.activeText
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-neutral-500'
                    }`}
                  >
                    Step {step.number}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      isCurrent ? 'text-white' : 'text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 hidden sm:block">
                    {step.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
