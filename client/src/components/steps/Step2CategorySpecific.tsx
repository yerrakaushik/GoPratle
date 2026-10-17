'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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
        desc: 'End-to-end management from concept, vendor contracts, setup to execution.',
      },
      {
        id: 'partial_planning',
        title: 'Partial Planning',
        desc: 'Assistance with selected vendors, decor styling, and gap management.',
      },
      {
        id: 'day_of_coordination',
        title: 'Day-of Coordination',
        desc: 'On-site execution, run-of-show schedule, and vendor timeline oversight.',
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Planning Scope <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scopes.map((scope) => {
              const isSelected = formData.plannerDetails.planningScope === scope.id;
              return (
                <div
                  key={scope.id}
                  onClick={() => updatePlannerDetails('planningScope', scope.id)}
                  className={`p-4 rounded-xl border cursor-pointer active:scale-[0.98] transition-all duration-150 ${
                    isSelected
                      ? 'border-white bg-zinc-900 text-white shadow-sm ring-1 ring-white/20'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{scope.title}</span>
                    {isSelected && (
                      <span className="w-3.5 h-3.5 rounded-full bg-white text-zinc-950 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{scope.desc}</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Guest Count */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Estimated Guest Count <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.plannerDetails.estimatedGuestCount || ''}
              onChange={(e) =>
                updatePlannerDetails('estimatedGuestCount', parseInt(e.target.value, 10) || '')
              }
              placeholder="e.g., 250"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm tabular-nums focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['plannerDetails.estimatedGuestCount']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
              }`}
            />
            {errors['plannerDetails.estimatedGuestCount'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['plannerDetails.estimatedGuestCount']}
              </p>
            )}
            <div className="flex gap-1.5 mt-2">
              {[50, 150, 300, 500, 1000].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => updatePlannerDetails('estimatedGuestCount', count)}
                  className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono tabular-nums text-zinc-400 hover:text-zinc-200 active:scale-[0.96] transition-all"
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Overall Budget */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Overall Event Budget <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.plannerDetails.overallBudget}
              onChange={(e) => updatePlannerDetails('overallBudget', e.target.value)}
              placeholder="e.g. ₹10,00,000 - ₹15,00,000"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['plannerDetails.overallBudget']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
              }`}
            />
            {errors['plannerDetails.overallBudget'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['plannerDetails.overallBudget']}
              </p>
            )}
            <p className="text-[11px] text-zinc-500 mt-1">
              Estimated range or ceiling.
            </p>
          </div>

          {/* Theme or Vibe */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Event Theme, Atmosphere or Vibe
            </label>
            <input
              type="text"
              value={formData.plannerDetails.themeOrVibe}
              onChange={(e) => updatePlannerDetails('themeOrVibe', e.target.value)}
              placeholder="e.g. Minimalist Architectural Luxury, Royal Heritage, Modern Cyberpunk"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
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
      { id: 'solo_vocalist', label: 'Solo Vocalist' },
      { id: 'dj', label: 'DJ / Producer' },
      { id: 'comedian', label: 'Standup Comedian' },
      { id: 'dancer', label: 'Dancer / Troupe' },
      { id: 'magician', label: 'Magician / Illusionist' },
      { id: 'mc_host', label: 'Emcee / Host' },
      { id: 'instrumentalist', label: 'Instrumentalist' },
      { id: 'other', label: 'Other Special Act' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Performer Act Classification <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {actTypes.map((act) => {
              const isSelected = formData.performerDetails.performerType === act.id;
              return (
                <div
                  key={act.id}
                  onClick={() => updatePerformerDetails('performerType', act.id)}
                  className={`p-3 rounded-xl border cursor-pointer text-center text-xs font-medium active:scale-[0.98] transition-all duration-150 ${
                    isSelected
                      ? 'border-white bg-zinc-900 text-white shadow-sm ring-1 ring-white/20'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Genre / Style */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Genre / Performance Style <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.performerDetails.genreOrStyle}
              onChange={(e) => updatePerformerDetails('genreOrStyle', e.target.value)}
              placeholder="e.g. Progressive Rock, Deep House, Clean Comedy"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['performerDetails.genreOrStyle']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Performance Duration <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.performerDetails.performanceDuration}
              onChange={(e) => updatePerformerDetails('performanceDuration', e.target.value)}
              placeholder="e.g. 90 minutes / 2 x 45 min sets"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['performerDetails.performanceDuration']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
              }`}
            />
            {errors['performerDetails.performanceDuration'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['performerDetails.performanceDuration']}
              </p>
            )}
          </div>

          {/* Expected Slot */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Expected Performance Time Slot
            </label>
            <input
              type="text"
              value={formData.performerDetails.expectedPerformanceTime}
              onChange={(e) =>
                updatePerformerDetails('expectedPerformanceTime', e.target.value)
              }
              placeholder="e.g. 8:30 PM - 10:00 PM (Headline slot)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Roles Needed <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {rolesList.map((role) => {
              const isChecked = formData.crewDetails.rolesNeeded?.includes(role);
              return (
                <label
                  key={role}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer active:scale-[0.98] transition-all duration-150 ${
                    isChecked
                      ? 'border-white bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleRole(role)}
                    className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Headcount */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Crew Headcount <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.crewDetails.headcount || ''}
              onChange={(e) =>
                updateCrewDetails('headcount', parseInt(e.target.value, 10) || '')
              }
              placeholder="e.g. 6"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm tabular-nums focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['crewDetails.headcount'] ? 'border-rose-500' : 'border-zinc-800'
              }`}
            />
            {errors['crewDetails.headcount'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['crewDetails.headcount']}
              </p>
            )}
          </div>

          {/* Shift Call Time */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Shift Call Time <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.crewDetails.shiftCallTime}
              onChange={(e) => updateCrewDetails('shiftCallTime', e.target.value)}
              placeholder="e.g. 08:00 AM - 10:00 PM"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['crewDetails.shiftCallTime']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
              }`}
            />
            {errors['crewDetails.shiftCallTime'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['crewDetails.shiftCallTime']}
              </p>
            )}
          </div>

          {/* Shift Days */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Number of Shift Days
            </label>
            <input
              type="number"
              min="1"
              value={formData.crewDetails.eventDaysCount || 1}
              onChange={(e) =>
                updateCrewDetails('eventDaysCount', parseInt(e.target.value, 10) || 1)
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm tabular-nums focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
            />
          </div>
        </div>
      </div>
    );
  };

  const getHeader = () => {
    switch (formData.category) {
      case 'planner':
        return {
          title: 'Planning Scope & Guest Volume',
          subtitle: 'Define the involvement level, guest volume, and production budget.',
          tag: 'Planner Specifications',
        };
      case 'performer':
        return {
          title: 'Act Classification & Timing',
          subtitle: 'Define performance genre, act classification, duration, and time slot.',
          tag: 'Performer Specifications',
        };
      case 'crew':
        return {
          title: 'Crew Roles & Operational Call Times',
          subtitle: 'Select technical crew positions, required headcount, and shift call times.',
          tag: 'Crew Specifications',
        };
    }
  };

  const header = getHeader();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
            {header.tag}
          </div>
          <h2 className="text-lg font-semibold text-white tracking-tight">
            {header.title}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">{header.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800/80">
        {formData.category === 'planner' && renderPlannerStep2()}
        {formData.category === 'performer' && renderPerformerStep2()}
        {formData.category === 'crew' && renderCrewStep2()}
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium text-xs active:scale-[0.96] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs shadow-sm active:scale-[0.96] transition-all"
        >
          <span>Continue to Step 3</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
