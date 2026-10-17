'use client';

import React, { useState } from 'react';
import { useRequirementForm } from '../../context/FormContext';
import {
  ArrowLeft,
  Loader2,
  Code2,
  Edit3,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const Step4ReviewSubmit: React.FC = () => {
  const {
    formData,
    goToStep,
    goToPreviousStep,
    submitForm,
    isSubmitting,
    submitError,
  } = useRequirementForm();

  const [showJsonPreview, setShowJsonPreview] = useState<boolean>(false);

  const getCategoryTitle = () => {
    switch (formData.category) {
      case 'planner':
        return 'Event Planner';
      case 'performer':
        return 'Performer / Artist';
      case 'crew':
        return 'Technical Crew';
    }
  };

  const cleanPayload = {
    eventName: formData.eventName,
    eventType: formData.eventType,
    isDateRange: formData.isDateRange,
    startDate: formData.startDate,
    endDate: formData.isDateRange ? formData.endDate : undefined,
    location: formData.location,
    venue: formData.venue || undefined,
    category: formData.category,
    contactName: formData.contactName || undefined,
    contactEmail: formData.contactEmail || undefined,
    contactPhone: formData.contactPhone || undefined,
    ...(formData.category === 'planner'
      ? { plannerDetails: formData.plannerDetails }
      : {}),
    ...(formData.category === 'performer'
      ? { performerDetails: formData.performerDetails }
      : {}),
    ...(formData.category === 'crew'
      ? { crewDetails: formData.crewDetails }
      : {}),
  };

  const handleSubmit = async () => {
    await submitForm();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Review & Final Submission
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Confirm your requirement details before publishing to the backend database.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowJsonPreview(!showJsonPreview)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono active:scale-[0.96] transition-all"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showJsonPreview ? 'Hide JSON' : 'Inspect JSON'}</span>
        </button>
      </div>

      {/* JSON Inspector */}
      {showJsonPreview && (
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto max-h-72">
          <div className="text-zinc-500 mb-2 font-mono text-[11px]">
            POST /api/requirements payload:
          </div>
          <pre>{JSON.stringify(cleanPayload, null, 2)}</pre>
        </div>
      )}

      {/* Error Banner */}
      {submitError && (
        <div className="p-4 rounded-xl bg-zinc-900 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Submission Error</span>
            <p className="text-zinc-400 mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {/* Summary Review Cards */}
      <div className="space-y-4">
        {/* Event Basics Card */}
        <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/60">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              01. Event Basics
            </span>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Event Name</span>
              <span className="text-white font-medium">{formData.eventName || '—'}</span>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Type</span>
              <span className="text-white">{formData.eventType}</span>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Schedule</span>
              <span className="text-white font-mono tabular-nums">
                {formData.isDateRange
                  ? `${formData.startDate} → ${formData.endDate}`
                  : formData.startDate || '—'}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Location</span>
              <span className="text-white">
                {formData.location}
                {formData.venue ? ` (${formData.venue})` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Category Details Card */}
        <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-800">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                02. {getCategoryTitle()} Specifications
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 uppercase">
                {formData.category}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Edit Specs
              </button>
              <span className="text-zinc-700">/</span>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Edit Terms
              </button>
            </div>
          </div>

          {/* Planner Details */}
          {formData.category === 'planner' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Scope</span>
                  <span className="text-white capitalize">
                    {formData.plannerDetails.planningScope.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Guests</span>
                  <span className="text-white tabular-nums">
                    {formData.plannerDetails.estimatedGuestCount} Attendees
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Budget</span>
                  <span className="text-white font-medium">
                    {formData.plannerDetails.overallBudget}
                  </span>
                </div>
              </div>

              {formData.plannerDetails.themeOrVibe && (
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Theme</span>
                  <span className="text-white">{formData.plannerDetails.themeOrVibe}</span>
                </div>
              )}

              <div>
                <span className="text-zinc-500 block font-mono text-[11px] mb-1">
                  Services Required
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.plannerDetails.servicesNeeded.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Performer Details */}
          {formData.category === 'performer' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Act Type</span>
                  <span className="text-white capitalize">
                    {formData.performerDetails.performerType.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Genre</span>
                  <span className="text-white">{formData.performerDetails.genreOrStyle}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Duration</span>
                  <span className="text-white font-medium">
                    {formData.performerDetails.performanceDuration}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Sound / PA</span>
                  <span className="text-white capitalize">
                    {formData.performerDetails.soundEquipmentProvided.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Soundcheck</span>
                  <span className="text-white">
                    {formData.performerDetails.soundcheckRequired
                      ? `Required (${formData.performerDetails.soundcheckTime || 'Pending'})`
                      : 'None'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Artist Fee</span>
                  <span className="text-white font-medium">
                    {formData.performerDetails.performanceFeeBudget}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Crew Details */}
          {formData.category === 'crew' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Headcount</span>
                  <span className="text-white tabular-nums">
                    {formData.crewDetails.headcount} Members ({formData.crewDetails.eventDaysCount} Days)
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Call Time</span>
                  <span className="text-white font-mono">
                    {formData.crewDetails.shiftCallTime}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono text-[11px]">Compensation</span>
                  <span className="text-white font-medium">
                    {formData.crewDetails.compensationRate}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block font-mono text-[11px] mb-1">
                  Roles Assigned
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.crewDetails.rolesNeeded?.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs active:scale-[0.96] transition-all disabled:opacity-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs shadow-sm active:scale-[0.96] transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving to MongoDB...</span>
            </>
          ) : (
            <span>Save & Post Requirement</span>
          )}
        </button>
      </div>
    </div>
  );
};
