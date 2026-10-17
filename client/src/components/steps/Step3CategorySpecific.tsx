'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import {
  Sparkles,
  Music,
  Users,
  Volume2,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Coffee,
  Truck,
} from 'lucide-react';
import {
  CrewExperienceLevel,
  DressCodeType,
  SoundEquipmentType,
} from '../../types/requirement';

export const Step3CategorySpecific: React.FC = () => {
  const {
    formData,
    errors,
    updatePlannerDetails,
    updatePerformerDetails,
    updateCrewDetails,
    goToNextStep,
    goToPreviousStep,
  } = useRequirementForm();

  // 1. PLANNER STEP 3
  const renderPlannerStep3 = () => {
    const servicesList = [
      'Venue Sourcing & Contract Negotiation',
      'Catering & Beverage Curation',
      'Decor & Floral Design',
      'Audio/Visual & Stage Production',
      'Invitations & RSVP Management',
      'Guest Hospitality & Logistics',
      'Photography & Videography',
      'Government Permits & Security',
      'On-site Run-of-Show Coordination',
    ];

    const toggleService = (service: string) => {
      const current = formData.plannerDetails.servicesNeeded || [];
      const updated = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      updatePlannerDetails('servicesNeeded', updated);
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Specific Services & Deliverables Needed <span className="text-rose-400">*</span>
          </label>
          <p className="text-xs text-neutral-400 mb-3">
            Check all the specific services you require the event planner or agency to handle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {servicesList.map((service) => {
              const isChecked = formData.plannerDetails.servicesNeeded?.includes(service);
              return (
                <label
                  key={service}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-violet-500 bg-violet-950/20 text-white ring-1 ring-violet-500/30'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleService(service)}
                    className="w-4 h-4 rounded text-violet-600 bg-neutral-800 border-neutral-700 focus:ring-violet-500 focus:ring-offset-neutral-900"
                  />
                  <span className="text-xs font-medium leading-tight">{service}</span>
                </label>
              );
            })}
          </div>
          {errors['plannerDetails.servicesNeeded'] && (
            <p className="text-xs text-rose-400 mt-2">
              {errors['plannerDetails.servicesNeeded']}
            </p>
          )}
        </div>

        {/* Decor Preferences */}
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1.5">
            Decor & Aesthetic Preferences
          </label>
          <textarea
            rows={2}
            value={formData.plannerDetails.decorPreferences}
            onChange={(e) => updatePlannerDetails('decorPreferences', e.target.value)}
            placeholder="e.g. Color palette: Pastel blushes, ivory florals, gold accents, LED wall backdrop."
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1.5">
            Special Client Requests & Additional Notes
          </label>
          <textarea
            rows={3}
            value={formData.plannerDetails.additionalNotes}
            onChange={(e) => updatePlannerDetails('additionalNotes', e.target.value)}
            placeholder="Provide any additional context, VIP guidelines, cultural traditions, or milestone schedule."
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
        </div>
      </div>
    );
  };

  // 2. PERFORMER STEP 3
  const renderPerformerStep3 = () => {
    const soundOptions: Array<{ id: SoundEquipmentType; title: string; desc: string }> = [
      {
        id: 'organizer_provides_full_pa',
        title: 'Full PA & Backline Provided',
        desc: 'Organizer arranges all stage monitors, mics, drum kit & amplifiers.',
      },
      {
        id: 'performer_must_bring_gear',
        title: 'Performer Brings Own Gear',
        desc: 'Performer must bring all instruments, mixer, and stage gear.',
      },
      {
        id: 'venue_inhouse_basic',
        title: 'In-House Venue Basic PA',
        desc: 'Venue has a standard PA; performer brings personal instruments.',
      },
      {
        id: 'needs_discussion',
        title: 'Subject to Discussion',
        desc: 'Technical rider will be aligned upon contracting.',
      },
    ];

    return (
      <div className="space-y-6">
        {/* Sound & PA Provision */}
        <div>
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Sound & PA Equipment Provision <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {soundOptions.map((opt) => {
              const isSelected =
                formData.performerDetails.soundEquipmentProvided === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() =>
                    updatePerformerDetails('soundEquipmentProvided', opt.id)
                  }
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-950/20 text-white ring-2 ring-rose-500/20'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  <div className="font-semibold text-sm text-white mb-1">{opt.title}</div>
                  <p className="text-xs text-neutral-400">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Soundcheck Required & Time */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-200">
                Pre-show Soundcheck
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={formData.performerDetails.soundcheckRequired}
                  onChange={(e) =>
                    updatePerformerDetails('soundcheckRequired', e.target.checked)
                  }
                  className="w-4 h-4 rounded text-rose-600 bg-neutral-800 border-neutral-700"
                />
                Required
              </label>
            </div>
            {formData.performerDetails.soundcheckRequired && (
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Soundcheck Call Time
                </label>
                <input
                  type="text"
                  value={formData.performerDetails.soundcheckTime}
                  onChange={(e) =>
                    updatePerformerDetails('soundcheckTime', e.target.value)
                  }
                  placeholder="e.g. 04:00 PM (2 hrs prior to show)"
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs"
                />
              </div>
            )}
          </div>

          {/* Performance Budget */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Artist Fee / Budget Allocation <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.performerDetails.performanceFeeBudget}
                onChange={(e) =>
                  updatePerformerDetails('performanceFeeBudget', e.target.value)
                }
                placeholder="e.g. ₹1,50,000 / $2,000 + hospitality"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
                  errors['performerDetails.performanceFeeBudget']
                    ? 'border-rose-500'
                    : 'border-neutral-800'
                }`}
              />
              <DollarSign className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['performerDetails.performanceFeeBudget'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['performerDetails.performanceFeeBudget']}
              </p>
            )}
          </div>

          {/* Repertoire / Setlist Constraints */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Repertoire Notes, Song Requests & Restrictions
            </label>
            <textarea
              rows={3}
              value={formData.performerDetails.repertoireNotes}
              onChange={(e) =>
                updatePerformerDetails('repertoireNotes', e.target.value)
              }
              placeholder="e.g. Must include couple entry song; strict family-friendly clean lyrics; high crowd participation requested."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
          </div>
        </div>
      </div>
    );
  };

  // 3. CREW STEP 3
  const renderCrewStep3 = () => {
    const expLevels: Array<{ id: CrewExperienceLevel; label: string; desc: string }> = [
      {
        id: 'entry_level',
        label: 'Entry Level',
        desc: 'Assisted crew, stagehands, runners under senior supervision.',
      },
      {
        id: 'intermediate',
        label: 'Mid-Level / Experienced',
        desc: 'Independent operators on standard audio/lighting/video rigs.',
      },
      {
        id: 'expert_certified',
        label: 'Certified Lead Engineer',
        desc: 'Specialized systems engineers with brand/industry certifications.',
      },
    ];

    const dressCodes: Array<{ id: DressCodeType; label: string }> = [
      { id: 'all_black_stage_crew', label: 'All-Black Crew Attire' },
      { id: 'smart_casual', label: 'Smart Casual / Polo' },
      { id: 'formal_suit', label: 'Formal Dark Suit' },
      { id: 'hi_vis_safety', label: 'Hi-Vis Safety Vest' },
      { id: 'no_preference', label: 'No Specific Dress Code' },
    ];

    return (
      <div className="space-y-6">
        {/* Experience Level */}
        <div>
          <label className="block text-sm font-semibold text-neutral-200 mb-2">
            Experience Level Desired <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {expLevels.map((lvl) => {
              const isSelected = formData.crewDetails.experienceLevel === lvl.id;
              return (
                <div
                  key={lvl.id}
                  onClick={() => updateCrewDetails('experienceLevel', lvl.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-950/20 text-white ring-2 ring-cyan-500/20'
                      : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-neutral-400'
                  }`}
                >
                  <div className="font-semibold text-xs text-white mb-0.5">{lvl.label}</div>
                  <p className="text-[11px] text-neutral-400 leading-snug">{lvl.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications / Gear Knowledge */}
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1.5">
            Technical Certifications or Console Expertise Needed
          </label>
          <input
            type="text"
            value={formData.crewDetails.certificationsRequired}
            onChange={(e) =>
              updateCrewDetails('certificationsRequired', e.target.value)
            }
            placeholder="e.g. Dante audio, grandMA3 lighting, Sony FX6 / Blackmagic operation"
            className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        {/* Provisions & Compensation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Provisions (Meals & Transport) */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <span className="text-sm font-semibold text-neutral-200 block">
              Provisions Provided by Organizer
            </span>
            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={formData.crewDetails.mealsProvided}
                  onChange={(e) => updateCrewDetails('mealsProvided', e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-600 bg-neutral-800 border-neutral-700"
                />
                <Coffee className="w-3.5 h-3.5 text-cyan-400" />
                <span>On-site Meals & Refreshments Provided</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300">
                <input
                  type="checkbox"
                  checked={formData.crewDetails.transportProvided}
                  onChange={(e) =>
                    updateCrewDetails('transportProvided', e.target.checked)
                  }
                  className="w-4 h-4 rounded text-cyan-600 bg-neutral-800 border-neutral-700"
                />
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Local Transport / Cab Reimbursement Provided</span>
              </label>
            </div>
          </div>

          {/* Pay Rate */}
          <div>
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Crew Pay Rate / Budget <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.crewDetails.compensationRate}
                onChange={(e) => updateCrewDetails('compensationRate', e.target.value)}
                placeholder="e.g. ₹3,500 / person per day or ₹500/hr"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                  errors['crewDetails.compensationRate']
                    ? 'border-rose-500'
                    : 'border-neutral-800'
                }`}
              />
              <DollarSign className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
            </div>
            {errors['crewDetails.compensationRate'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['crewDetails.compensationRate']}
              </p>
            )}
            <p className="text-[11px] text-neutral-500 mt-1">
              Specify hourly, daily, or flat shift compensation.
            </p>
          </div>

          {/* Dress Code */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Production Dress Code
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {dressCodes.map((code) => {
                const isSelected = formData.crewDetails.dressCode === code.id;
                return (
                  <div
                    key={code.id}
                    onClick={() => updateCrewDetails('dressCode', code.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer text-center text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/20 text-white ring-1 ring-cyan-500/30'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {code.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Instructions */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-200 mb-1.5">
              Special Gate Instructions / Check-in Protocol
            </label>
            <textarea
              rows={2}
              value={formData.crewDetails.additionalInstructions}
              onChange={(e) =>
                updateCrewDetails('additionalInstructions', e.target.value)
              }
              placeholder="e.g. Enter through Gate 4 Service Entry; bring national ID card for security badge issuance."
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
          title: 'Step 3: Services & Decor Expectations',
          desc: 'Select necessary planning services, decor requirements, and operational notes.',
          badge: 'Services & Deliverables',
          badgeColor: 'bg-violet-950 text-violet-300 border-violet-800',
        };
      case 'performer':
        return {
          title: 'Step 3: Tech Rider, Sound & Fee Budget',
          desc: 'Detail stage backline equipment, soundcheck requirements, and artist remuneration.',
          badge: 'Equipment & Compensation',
          badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
        };
      case 'crew':
        return {
          title: 'Step 3: Certifications, Logistics & Pay',
          desc: 'Define qualification levels, on-site provisions, dress code, and compensation rates.',
          badge: 'Logistics & Remuneration',
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
        {formData.category === 'planner' && renderPlannerStep3()}
        {formData.category === 'performer' && renderPerformerStep3()}
        {formData.category === 'crew' && renderCrewStep3()}
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Step 2</span>
        </button>

        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Review & Submit (Step 4)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
