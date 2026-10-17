'use client';

import React from 'react';
import { FormProvider, useRequirementForm } from '../context/FormContext';
import { Navbar } from '../components/Navbar';
import { StepIndicator } from '../components/StepIndicator';
import { Step1EventBasics } from '../components/steps/Step1EventBasics';
import { Step2CategorySpecific } from '../components/steps/Step2CategorySpecific';
import { Step3CategorySpecific } from '../components/steps/Step3CategorySpecific';
import { Step4ReviewSubmit } from '../components/steps/Step4ReviewSubmit';
import { SubmissionSuccess } from '../components/steps/SubmissionSuccess';
import { Sparkles, Layers, ShieldCheck, Database } from 'lucide-react';

const FlowWizard: React.FC = () => {
  const { currentStep, submittedData } = useRequirementForm();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center mb-8 sm:mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Event Requirements Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Post Your Event Requirement
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
          Specify your event basics and let our dynamic 4-step wizard configure customized technical fields for Planners, Artists, or Crew.
        </p>
      </div>

      {/* Main Wizard Card */}
      <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {submittedData ? (
          <SubmissionSuccess />
        ) : (
          <div className="relative z-10">
            <StepIndicator />

            {currentStep === 1 && <Step1EventBasics />}
            {currentStep === 2 && <Step2CategorySpecific />}
            {currentStep === 3 && <Step3CategorySpecific />}
            {currentStep === 4 && <Step4ReviewSubmit />}
          </div>
        )}
      </div>

      {/* Key Architectural Highlights Banner */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-400">
        <div className="p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 flex items-start gap-3">
          <Layers className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white mb-0.5">Adaptive 4-Step Flow</div>
            <p className="text-neutral-400 leading-relaxed">
              Steps 2 & 3 dynamically rewire inputs based on chosen role (Planner, Performer, Crew).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 flex items-start gap-3">
          <Database className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white mb-0.5">Categorized MongoDB Data</div>
            <p className="text-neutral-400 leading-relaxed">
              Subdocuments cleanly isolate category-specific data with zero leakage or schema bloat.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/60 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white mb-0.5">Dual-Tier Validation</div>
            <p className="text-neutral-400 leading-relaxed">
              Client-side responsive feedback plus server-side Zod and Mongoose schema constraints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <FlowWizard />
        </main>
      </div>
    </FormProvider>
  );
}
