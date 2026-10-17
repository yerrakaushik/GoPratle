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
import { LiveDraftCompanion } from '../components/LiveDraftCompanion';
import { Layers, Database, ShieldCheck } from 'lucide-react';

const FlowWizard: React.FC = () => {
  const { currentStep, submittedData } = useRequirementForm();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Editorial Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>Interactive Requirement Posting Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
          Post an Event Requirement
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
          Specify core event parameters. The workflow adapts Steps 2 and 3 dynamically to collect role-specific technical requirements.
        </p>
      </div>

      {/* Main Layout: Wizard on Left + Live Companion on Right */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Wizard Card */}
        <div className="flex-1 w-full bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          {submittedData ? (
            <SubmissionSuccess />
          ) : (
            <div className="animate-step">
              <StepIndicator />

              {currentStep === 1 && <Step1EventBasics />}
              {currentStep === 2 && <Step2CategorySpecific />}
              {currentStep === 3 && <Step3CategorySpecific />}
              {currentStep === 4 && <Step4ReviewSubmit />}
            </div>
          )}
        </div>

        {/* Live Companion Card (Desktop) */}
        {!submittedData && <LiveDraftCompanion />}
      </div>

      {/* Architectural Guarantees */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-400">
        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
          <div className="flex items-center gap-2 mb-1 text-white font-medium">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Dynamic Role Routing</span>
          </div>
          <p className="text-zinc-500 leading-relaxed text-[11px]">
            Steps 2 & 3 surface role-specific deliverables based on chosen category.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
          <div className="flex items-center gap-2 mb-1 text-white font-medium">
            <Database className="w-3.5 h-3.5 text-zinc-400" />
            <span>Isolated MongoDB Schemas</span>
          </div>
          <p className="text-zinc-500 leading-relaxed text-[11px]">
            Subdocuments prevent schema contamination and enforce clean domain boundaries.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
          <div className="flex items-center gap-2 mb-1 text-white font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Dual-Tier Validation</span>
          </div>
          <p className="text-zinc-500 leading-relaxed text-[11px]">
            Client-side feedback paired with strict server Zod validation and Mongoose schemas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <FlowWizard />
        </main>
      </div>
    </FormProvider>
  );
}
