'use client';

import React, { useState } from 'react';
import { useRequirementForm } from '../../context/FormContext';
import {
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Music,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Send,
  Loader2,
  Code2,
  Edit3,
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

  const getCategoryInfo = () => {
    switch (formData.category) {
      case 'planner':
        return {
          title: 'Event Planner',
          icon: Sparkles,
          color: 'text-violet-400 bg-violet-950/40 border-violet-800',
        };
      case 'performer':
        return {
          title: 'Performer / Artist',
          icon: Music,
          color: 'text-rose-400 bg-rose-950/40 border-rose-800',
        };
      case 'crew':
        return {
          title: 'Technical Crew',
          icon: Users,
          color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800',
        };
    }
  };

  const categoryInfo = getCategoryInfo();
  const CategoryIcon = categoryInfo.icon;

  // Build the sanitized preview object that matches MongoDB insertion
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
    <div className="space-y-8 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            Step 4: Final Review & Submission
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            Verify your requirement details before posting to the backend database.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowJsonPreview(!showJsonPreview)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium transition-all"
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{showJsonPreview ? 'Hide Raw JSON' : 'Inspect MongoDB Payload'}</span>
        </button>
      </div>

      {/* JSON Inspector Collapsible */}
      {showJsonPreview && (
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto max-h-72">
          <div className="text-neutral-500 mb-2 font-sans font-semibold">
            Payload transmitted to POST /api/requirements:
          </div>
          <pre>{JSON.stringify(cleanPayload, null, 2)}</pre>
        </div>
      )}

      {/* Submission Error Alert */}
      {submitError && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-rose-300">Submission Failed</div>
            <p className="text-xs text-rose-200/90 mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {/* Review Cards Grid */}
      <div className="space-y-4">
        {/* Card 1: Event Basics */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 relative group">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">Event Basics</h3>
              <span className="text-xs text-neutral-500">• Step 1</span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-neutral-500 block mb-0.5">Event Name</span>
              <span className="text-white font-medium text-sm">
                {formData.eventName || '—'}
              </span>
            </div>

            <div>
              <span className="text-neutral-500 block mb-0.5">Event Type</span>
              <span className="text-white font-medium">{formData.eventType}</span>
            </div>

            <div>
              <span className="text-neutral-500 block mb-0.5">Date Schedule</span>
              <span className="text-white font-medium">
                {formData.isDateRange
                  ? `${formData.startDate} to ${formData.endDate}`
                  : formData.startDate || '—'}
              </span>
            </div>

            <div>
              <span className="text-neutral-500 block mb-0.5">Location & Venue</span>
              <span className="text-white font-medium">
                {formData.location}
                {formData.venue ? ` (${formData.venue})` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Selected Category Badge & Focus */}
        <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800 relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/80">
            <div className="flex items-center gap-2">
              <CategoryIcon className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">
                Categorized Requirement Details
              </h3>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryInfo.color}`}
              >
                {categoryInfo.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                <Edit3 className="w-3 h-3" />
                Edit Specs (Step 2)
              </button>
              <span className="text-neutral-600">|</span>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
              >
                <Edit3 className="w-3 h-3" />
                Edit Terms (Step 3)
              </button>
            </div>
          </div>

          {/* Render category-specific summary */}
          {formData.category === 'planner' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-neutral-500 block mb-0.5">Planning Scope</span>
                  <span className="text-white font-medium capitalize">
                    {formData.plannerDetails.planningScope.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Estimated Guests</span>
                  <span className="text-white font-medium">
                    {formData.plannerDetails.estimatedGuestCount} Attendees
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Estimated Budget</span>
                  <span className="text-emerald-400 font-medium">
                    {formData.plannerDetails.overallBudget}
                  </span>
                </div>
              </div>

              {formData.plannerDetails.themeOrVibe && (
                <div>
                  <span className="text-neutral-500 block mb-0.5">Theme & Atmosphere</span>
                  <span className="text-white font-medium">
                    {formData.plannerDetails.themeOrVibe}
                  </span>
                </div>
              )}

              <div>
                <span className="text-neutral-500 block mb-1">Required Services</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.plannerDetails.servicesNeeded.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-violet-950/60 border border-violet-800 text-violet-300 text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {formData.plannerDetails.decorPreferences && (
                <div>
                  <span className="text-neutral-500 block mb-0.5">Decor Preferences</span>
                  <p className="text-neutral-300 leading-relaxed">
                    {formData.plannerDetails.decorPreferences}
                  </p>
                </div>
              )}
            </div>
          )}

          {formData.category === 'performer' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-neutral-500 block mb-0.5">Act / Talent Type</span>
                  <span className="text-white font-medium capitalize">
                    {formData.performerDetails.performerType.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Genre / Style</span>
                  <span className="text-white font-medium">
                    {formData.performerDetails.genreOrStyle}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Set Duration</span>
                  <span className="text-white font-medium">
                    {formData.performerDetails.performanceDuration}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-neutral-500 block mb-0.5">PA & Sound Equipment</span>
                  <span className="text-white font-medium capitalize">
                    {formData.performerDetails.soundEquipmentProvided.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Soundcheck</span>
                  <span className="text-white font-medium">
                    {formData.performerDetails.soundcheckRequired
                      ? `Yes (${formData.performerDetails.soundcheckTime || 'Schedule pending'})`
                      : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Artist Remuneration</span>
                  <span className="text-emerald-400 font-medium">
                    {formData.performerDetails.performanceFeeBudget}
                  </span>
                </div>
              </div>

              {formData.performerDetails.repertoireNotes && (
                <div>
                  <span className="text-neutral-500 block mb-0.5">Repertoire Notes</span>
                  <p className="text-neutral-300 leading-relaxed">
                    {formData.performerDetails.repertoireNotes}
                  </p>
                </div>
              )}
            </div>
          )}

          {formData.category === 'crew' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-neutral-500 block mb-0.5">Crew Headcount</span>
                  <span className="text-white font-medium">
                    {formData.crewDetails.headcount} Members ({formData.crewDetails.eventDaysCount} Day
                    {formData.crewDetails.eventDaysCount > 1 ? 's' : ''})
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Shift Timing</span>
                  <span className="text-white font-medium">
                    {formData.crewDetails.shiftCallTime}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Pay / Compensation</span>
                  <span className="text-emerald-400 font-medium">
                    {formData.crewDetails.compensationRate}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block mb-1">Assigned Technical Roles</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.crewDetails.rolesNeeded?.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-[11px]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-neutral-500 block mb-0.5">Experience Level</span>
                  <span className="text-white font-medium capitalize">
                    {formData.crewDetails.experienceLevel.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Dress Code</span>
                  <span className="text-white font-medium capitalize">
                    {formData.crewDetails.dressCode.replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-0.5">Provisions</span>
                  <span className="text-white font-medium">
                    {[
                      formData.crewDetails.mealsProvided ? 'Meals Provided' : null,
                      formData.crewDetails.transportProvided ? 'Transport Reimbursed' : null,
                    ]
                      .filter(Boolean)
                      .join(' • ') || 'None specified'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Organizer Contact */}
        {(formData.contactName || formData.contactEmail || formData.contactPhone) && (
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/60 text-xs flex flex-wrap gap-6 text-neutral-400">
            {formData.contactName && (
              <div>
                <span className="text-neutral-500 block">Organizer</span>
                <span className="text-neutral-200 font-medium">{formData.contactName}</span>
              </div>
            )}
            {formData.contactEmail && (
              <div>
                <span className="text-neutral-500 block">Email</span>
                <span className="text-neutral-200 font-medium">{formData.contactEmail}</span>
              </div>
            )}
            {formData.contactPhone && (
              <div>
                <span className="text-neutral-500 block">Phone</span>
                <span className="text-neutral-200 font-medium">{formData.contactPhone}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation & Submit Action */}
      <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 3</span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving to MongoDB...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Save & Post Requirement</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
