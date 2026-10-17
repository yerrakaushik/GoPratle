'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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
      'Venue Sourcing & Negotiation',
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Specific Services & Deliverables <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {servicesList.map((service) => {
              const isChecked = formData.plannerDetails.servicesNeeded?.includes(service);
              return (
                <label
                  key={service}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer active:scale-[0.98] transition-all duration-150 ${
                    isChecked
                      ? 'border-white bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleService(service)}
                    className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Decor & Aesthetic Preferences
          </label>
          <textarea
            rows={2}
            value={formData.plannerDetails.decorPreferences}
            onChange={(e) => updatePlannerDetails('decorPreferences', e.target.value)}
            placeholder="e.g. Color palette: Pastel blushes, ivory florals, gold accents, LED wall backdrop."
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Special Client Requests & Additional Notes
          </label>
          <textarea
            rows={3}
            value={formData.plannerDetails.additionalNotes}
            onChange={(e) => updatePlannerDetails('additionalNotes', e.target.value)}
            placeholder="Provide any additional context, VIP guidelines, cultural traditions, or milestone schedule."
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
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
        desc: 'Organizer arranges all monitors, microphones, backline kit, and amplifiers.',
      },
      {
        id: 'performer_must_bring_gear',
        title: 'Performer Brings Own Gear',
        desc: 'Performer must bring all personal instruments, sub-mixer, and stage gear.',
      },
      {
        id: 'venue_inhouse_basic',
        title: 'In-House Venue Basic PA',
        desc: 'Venue has standard speakers; performer brings personal performance gear.',
      },
      {
        id: 'needs_discussion',
        title: 'Subject to Technical Discussion',
        desc: 'Technical stage rider will be finalized directly upon engagement.',
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Sound & PA Provision <span className="text-rose-400">*</span>
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
                  className={`p-4 rounded-xl border cursor-pointer active:scale-[0.98] transition-all duration-150 ${
                    isSelected
                      ? 'border-white bg-zinc-900 text-white shadow-sm ring-1 ring-white/20'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{opt.title}</span>
                    {isSelected && (
                      <span className="w-3.5 h-3.5 rounded-full bg-white text-zinc-950 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{opt.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Soundcheck Required & Time */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Pre-show Soundcheck
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.performerDetails.soundcheckRequired}
                  onChange={(e) =>
                    updatePerformerDetails('soundcheckRequired', e.target.checked)
                  }
                  className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                Required
              </label>
            </div>
            {formData.performerDetails.soundcheckRequired && (
              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-mono">
                  Soundcheck Call Time
                </label>
                <input
                  type="text"
                  value={formData.performerDetails.soundcheckTime}
                  onChange={(e) =>
                    updatePerformerDetails('soundcheckTime', e.target.value)
                  }
                  placeholder="e.g. 04:00 PM (2 hrs prior to set)"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-zinc-400"
                />
              </div>
            )}
          </div>

          {/* Performance Budget */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Artist Fee / Budget Allocation <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.performerDetails.performanceFeeBudget}
              onChange={(e) =>
                updatePerformerDetails('performanceFeeBudget', e.target.value)
              }
              placeholder="e.g. ₹1,50,000 / $2,000"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['performerDetails.performanceFeeBudget']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
              }`}
            />
            {errors['performerDetails.performanceFeeBudget'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['performerDetails.performanceFeeBudget']}
              </p>
            )}
            <p className="text-[11px] text-zinc-500 mt-1">
              Specify artist compensation.
            </p>
          </div>

          {/* Repertoire / Setlist Constraints */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Repertoire Notes, Song Requests & Set Restrictions
            </label>
            <textarea
              rows={3}
              value={formData.performerDetails.repertoireNotes}
              onChange={(e) =>
                updatePerformerDetails('repertoireNotes', e.target.value)
              }
              placeholder="e.g. Clean family-friendly lyrics only; include popular covers in finale."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
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
        desc: 'Assisted stagehands and runners under supervision.',
      },
      {
        id: 'intermediate',
        label: 'Experienced Operator',
        desc: 'Independent operators on standard audio/video consoles.',
      },
      {
        id: 'expert_certified',
        label: 'Certified Lead Engineer',
        desc: 'Systems engineers with official brand/rigging certifications.',
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Experience Level <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {expLevels.map((lvl) => {
              const isSelected = formData.crewDetails.experienceLevel === lvl.id;
              return (
                <div
                  key={lvl.id}
                  onClick={() => updateCrewDetails('experienceLevel', lvl.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer active:scale-[0.98] transition-all duration-150 ${
                    isSelected
                      ? 'border-white bg-zinc-900 text-white shadow-sm ring-1 ring-white/20'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                  }`}
                >
                  <div className="font-semibold text-xs text-white mb-0.5">{lvl.label}</div>
                  <p className="text-[11px] text-zinc-400 leading-snug">{lvl.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications / Equipment Expertise */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Console Experience or Safety Certifications
          </label>
          <input
            type="text"
            value={formData.crewDetails.certificationsRequired}
            onChange={(e) =>
              updateCrewDetails('certificationsRequired', e.target.value)
            }
            placeholder="e.g. Yamaha CL/QL console, grandMA3, working-at-height certification"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        {/* Provisions & Pay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Provisions */}
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block">
              On-Site Provisions
            </span>
            <div className="flex flex-col gap-2 pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.crewDetails.mealsProvided}
                  onChange={(e) => updateCrewDetails('mealsProvided', e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <span>On-site Meals & Refreshments Provided</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                <input
                  type="checkbox"
                  checked={formData.crewDetails.transportProvided}
                  onChange={(e) =>
                    updateCrewDetails('transportProvided', e.target.checked)
                  }
                  className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                />
                <span>Local Transport / Cab Reimbursement Provided</span>
              </label>
            </div>
          </div>

          {/* Compensation */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Crew Pay Rate / Budget <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.crewDetails.compensationRate}
              onChange={(e) => updateCrewDetails('compensationRate', e.target.value)}
              placeholder="e.g. ₹3,500 / person per day or ₹500/hr"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 ${
                errors['crewDetails.compensationRate']
                  ? 'border-rose-500'
                  : 'border-zinc-800'
              }`}
            />
            {errors['crewDetails.compensationRate'] && (
              <p className="text-xs text-rose-400 mt-1">
                {errors['crewDetails.compensationRate']}
              </p>
            )}
            <p className="text-[11px] text-zinc-500 mt-1">
              Specify hourly, daily, or flat shift compensation.
            </p>
          </div>

          {/* Dress Code */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Production Dress Code
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {dressCodes.map((code) => {
                const isSelected = formData.crewDetails.dressCode === code.id;
                return (
                  <div
                    key={code.id}
                    onClick={() => updateCrewDetails('dressCode', code.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer text-center text-xs font-medium active:scale-[0.98] transition-all duration-150 ${
                      isSelected
                        ? 'border-white bg-zinc-900 text-white'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {code.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Special Gate Instructions / Check-in Protocol
            </label>
            <textarea
              rows={2}
              value={formData.crewDetails.additionalInstructions}
              onChange={(e) =>
                updateCrewDetails('additionalInstructions', e.target.value)
              }
              placeholder="e.g. Enter through Gate 4 Service Entry; bring national ID card for security pass."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
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
          title: 'Deliverables & Decor Scope',
          subtitle: 'Select specific planning services and aesthetic preferences.',
          tag: 'Planner Terms',
        };
      case 'performer':
        return {
          title: 'Technical Rider & Artist Remuneration',
          subtitle: 'Detail stage backline equipment, soundcheck requirements, and artist fee.',
          tag: 'Performer Terms',
        };
      case 'crew':
        return {
          title: 'Certifications, Logistics & Pay',
          subtitle: 'Define crew qualifications, provisions, dress code, and compensation rates.',
          tag: 'Crew Terms',
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
        {formData.category === 'planner' && renderPlannerStep3()}
        {formData.category === 'performer' && renderPerformerStep3()}
        {formData.category === 'crew' && renderCrewStep3()}
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
          <span>Review & Submit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
