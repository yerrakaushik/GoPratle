'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import {
  Sparkles,
  Music,
  Users,
  Clock,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import {
  PerformerActType,
  PlanningScopeType,
} from '../../types/requirement';

export const Step2CategorySpecific: React.FC = () => {
  const {
    formData,
    errors,
    updatePlannerDetails,
    updatePerformerDetails,
    updateCrewDetails,
    goToNextStep,
    goToPreviousStep,
  } = useRequirementForm();

  // 1. EVENT PLANNER STEP 2
  const renderPlannerStep2 = () => {
    const scopes: Array<{ id: PlanningScopeType; title: string; desc: string }> = [
      {
        id: 'full_planning',
        title: 'Full Planning & Production',
        desc: 'End-to-end management from concept, vendor contracts, venue setup to execution.',
      },
      {
        id: 'partial_planning',
        title: 'Partial Planning',
        desc: 'Assistance with selected vendors, decor styling, and gap management.',
      },
      {
        id: 'day_of_coordination',
        title: 'Day-of Coordination',
        desc: 'On-site execution, schedule run-of-show, and vendor timeline management on event day.',
      },
      {
        id: 'consultation_only',
        title: 'Consultation & Advisory',
        desc: 'Strategic brainstorming, budget allocation, vendor recommendations.',
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Planning Scope <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scopes.map((scope) => {
              const isSelected = formData.plannerDetails.planningScope === scope.id;
              return (
                <div
                  key={scope.id}
                  onClick={() => updatePlannerDetails('planningScope', scope.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-violet-500 bg-violet-950/20 text-white ring-2 ring-violet-500/20'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">{scope.title}</div>
                  <p className="text-xs text-neutral-400">{scope.desc}</p>
                </div>
              );
            })}
          </div>
          {errors['plannerDetails.planningScope'] && (
            <p className="text-xs text-rose-400 mt-1">
              {errors['plannerDetails.planningScope']}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Guest Count */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Estimated Guest Count <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={formData.plannerDetails.estimatedGuestCount || ''}
                onChange={(e) =>
                  updatePlannerDetails('estimatedGuestCount', parseInt(e.target.value, 10) || '')
                }
                placeholder="e.g. 250"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  errors['plannerDetails.estimatedGuestCount']
                    ? 'border-rose-500'
                    : 'border-neutral-800'
                }`}
              />
              <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['plannerDetails.estimatedGuestCount'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['plannerDetails.estimatedGuestCount']}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              {[50, 150, 300, 500, 1000].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => updatePlannerDetails('estimatedGuestCount', count)}
                  className="px-2 py-0.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-[11px] text-neutral-300 transition-colors"
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Overall Budget */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Overall Event Budget <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.plannerDetails.overallBudget}
                onChange={(e) => updatePlannerDetails('overallBudget', e.target.value)}
                placeholder="e.g. ₹10,00,000 - ₹15,00,000"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  errors['plannerDetails.overallBudget']
                    ? 'border-rose-500'
                    : 'border-neutral-800'
                }`}
              />
              <DollarSign className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['plannerDetails.overallBudget'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['plannerDetails.overallBudget']}
              </p>
            )}
            <p className="text-[11px] text-neutral-500 mt-1">
              Give a range or target ceiling for total production.
            </p>
          </div>

          {/* Theme or Vibe */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Event Theme, Atmosphere or Vibe
            </label>
            <input
              type="text"
              value={formData.plannerDetails.themeOrVibe}
              onChange={(e) => updatePlannerDetails('themeOrVibe', e.target.value)}
              placeholder="e.g. Royal Rajputana Heritage, Minimalist White & Gold, Cyberpunk Neon"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
        </div>
      </div>
    );
  };

  // 2. PERFORMER STEP 2
  const renderPerformerStep2 = () => {
    const actTypes: Array<{ id: PerformerActType; label: string }> = [
      { id: 'band', label: 'Live Band / Orchestra' },
      { id: 'solo_vocalist', label: 'Solo Singer / Vocalist' },
      { id: 'dj', label: 'DJ / Electronic Producer' },
      { id: 'comedian', label: 'Standup Comedian' },
      { id: 'dancer', label: 'Dancer / Dance Troupe' },
      { id: 'magician', label: 'Magician / Illusionist' },
      { id: 'mc_host', label: 'Emcee / Event Host' },
      { id: 'instrumentalist', label: 'Instrumentalist (Violin, Sax, Flute, etc.)' },
      { id: 'other', label: 'Other Special Performance' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Performer / Act Type <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {actTypes.map((act) => {
              const isSelected = formData.performerDetails.performerType === act.id;
              return (
                <div
                  key={act.id}
                  onClick={() => updatePerformerDetails('performerType', act.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-center text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-950/20 text-white ring-2 ring-rose-500/20'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  {act.label}
                </div>
              );
            })}
          </div>
          {errors['performerDetails.performerType'] && (
            <p className="text-xs text-rose-400 mt-1">
              {errors['performerDetails.performerType']}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Genre / Style */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Genre / Performance Style <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.performerDetails.genreOrStyle}
              onChange={(e) => updatePerformerDetails('genreOrStyle', e.target.value)}
              placeholder="e.g. Bollywood Rock, Indie Pop, Commercial EDM, Clean Observational Comedy"
              className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
                errors['performerDetails.genreOrStyle']
                  ? 'border-rose-500'
                  : 'border-neutral-800'
              }`}
            />
            {errors['performerDetails.genreOrStyle'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['performerDetails.genreOrStyle']}
              </p>
            )}
          </div>

          {/* Performance Duration */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Performance Duration <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.performerDetails.performanceDuration}
                onChange={(e) => updatePerformerDetails('performanceDuration', e.target.value)}
                placeholder="e.g. 90 minutes / 2 sets of 45 mins"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
                  errors['performerDetails.performanceDuration']
                    ? 'border-rose-500'
                    : 'border-neutral-800'
                }`}
              />
              <Clock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['performerDetails.performanceDuration'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['performerDetails.performanceDuration']}
              </p>
            )}
          </div>

          {/* Expected Performance Time */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Expected Performance Slot / Schedule Time
            </label>
            <input
              type="text"
              value={formData.performerDetails.expectedPerformanceTime}
              onChange={(e) =>
                updatePerformerDetails('expectedPerformanceTime', e.target.value)
              }
              placeholder="e.g. 8:30 PM - 10:00 PM (Headline slot)"
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>
        </div>
      </div>
    );
  };

  // 3. TECHNICAL CREW STEP 2
  const renderCrewStep2 = () => {
    const rolesList = [
      'Sound Engineer / FOH Mixer',
      'Lighting Operator / Programmer',
      'Stagehand / Rigger',
      'Videographer / Camera Operator',
      'Photographer',
      'Audio / Visual (AV) Technician',
      'Hospitality & Usher',
      'Security / Bouncer',
      'Production Runner',
    ];

    const toggleRole = (role: string) => {
      const current = formData.crewDetails.rolesNeeded || [];
      const updated = current.includes(role)
        ? current.filter((r) => r !== role)
        : [...current, role];
      updateCrewDetails('rolesNeeded', updated);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Roles Needed <span className="text-rose-400">*</span>
          </label>
          <p className="text-xs text-neutral-400 mb-3">
            Select one or more crew roles you need to hire for this event.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {rolesList.map((role) => {
              const isChecked = formData.crewDetails.rolesNeeded?.includes(role);
              return (
                <label
                  key={role}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-cyan-500 bg-cyan-950/20 text-white ring-1 ring-cyan-500/30'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleRole(role)}
                    className="w-4 h-4 rounded text-cyan-600 bg-neutral-800 border-neutral-700 focus:ring-cyan-500 focus:ring-offset-neutral-900"
                  />
                  <span className="text-xs font-medium leading-tight">{role}</span>
                </label>
              );
            })}
          </div>
          {errors['crewDetails.rolesNeeded'] && (
            <p className="text-xs text-rose-400 mt-2">
              {errors['crewDetails.rolesNeeded']}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Headcount */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Crew Headcount <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={formData.crewDetails.headcount || ''}
                onChange={(e) =>
                  updateCrewDetails('headcount', parseInt(e.target.value, 10) || '')
                }
                placeholder="e.g. 6"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  errors['crewDetails.headcount'] ? 'border-rose-500' : 'border-neutral-800'
                }`}
              />
              <Users className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['crewDetails.headcount'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['crewDetails.headcount']}
              </p>
            )}
          </div>

          {/* Shift Call Time */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Shift Call Time <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.crewDetails.shiftCallTime}
                onChange={(e) => updateCrewDetails('shiftCallTime', e.target.value)}
                placeholder="e.g. 08:00 AM - 10:00 PM"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  errors['crewDetails.shiftCallTime']
                    ? 'border-rose-500'
                    : 'border-neutral-800'
                }`}
              />
              <Clock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['crewDetails.shiftCallTime'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['crewDetails.shiftCallTime']}
              </p>
            )}
          </div>

          {/* Event Days */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Number of Shift Days
            </label>
            <input
              type="number"
              min="1"
              value={formData.crewDetails.eventDaysCount || 1}
              onChange={(e) =>
                updateCrewDetails('eventDaysCount', parseInt(e.target.value, 10) || 1)
              }
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>
        </div>
      </div>
    );
  };

  const getHeaderDetails = () => {
    switch (formData.category) {
      case 'planner':
        return {
          title: 'Step 2: Planner Scope & Guest Logistics',
          desc: 'Define the involvement level, guest volume, and production scale required from the event planner.',
          badge: 'Event Planner Focus',
          badgeColor: 'bg-violet-950 text-violet-300 border-violet-800',
        };
      case 'performer':
        return {
          title: 'Step 2: Performance Act & Set Timing',
          desc: 'Specify the performance genre, act classification, duration, and scheduled time slot.',
          badge: 'Performer / Artist Focus',
          badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
        };
      case 'crew':
        return {
          title: 'Step 2: Technical Roles & Crew Headcount',
          desc: 'Select necessary technical roles, headcount, and on-site shift timings for production crew.',
          badge: 'Crew & Operations Focus',
          badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
        };
    }
  };

  const header = getHeaderDetails();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${header.badgeColor}`}
            >
              {header.badge}
            </span>
            <span className="text-xs text-neutral-500">
              Adapting to {formData.eventName || 'your event'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {header.title}
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">{header.desc}</p>
        </div>
      </div>

      {/* Dynamic Content based on Step 1 selection */}
      <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80">
        {formData.category === 'planner' && renderPlannerStep2()}
        {formData.category === 'performer' && renderPerformerStep2()}
        {formData.category === 'crew' && renderCrewStep2()}
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 1</span>
        </button>

        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Continue to Step 3</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
