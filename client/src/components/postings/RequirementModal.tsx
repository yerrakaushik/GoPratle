'use client';

import React from 'react';
import { RequirementDocument } from '../../types/requirement';
import { X } from 'lucide-react';

interface Props {
  requirement: RequirementDocument | null;
  onClose: () => void;
}

export const RequirementModal: React.FC<Props> = ({ requirement, onClose }) => {
  if (!requirement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                {requirement.category}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                ID: {requirement._id}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              {requirement.eventName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white active:scale-[0.96] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Schedule & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs">
          <div>
            <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Event Schedule</span>
            <span className="text-white font-mono tabular-nums">
              {requirement.isDateRange
                ? `${new Date(requirement.startDate).toLocaleDateString()} → ${new Date(
                    requirement.endDate
                  ).toLocaleDateString()}`
                : new Date(requirement.startDate).toLocaleDateString()}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Location</span>
            <span className="text-white">{requirement.location}</span>
          </div>

          <div>
            <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Venue</span>
            <span className="text-white">{requirement.venue || 'TBD'}</span>
          </div>
        </div>

        {/* Category Specific Breakdown */}
        {requirement.category === 'planner' && requirement.plannerDetails && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Planner Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Scope</span>
                <span className="text-white capitalize">
                  {requirement.plannerDetails.planningScope.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Guest Volume</span>
                <span className="text-white tabular-nums">
                  {requirement.plannerDetails.estimatedGuestCount} Guests
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Overall Budget</span>
                <span className="text-white font-medium">
                  {requirement.plannerDetails.overallBudget}
                </span>
              </div>
            </div>

            {requirement.plannerDetails.themeOrVibe && (
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800 text-xs">
                <span className="text-zinc-500 block mb-0.5 font-mono text-[11px]">Theme & Atmosphere</span>
                <span className="text-white">{requirement.plannerDetails.themeOrVibe}</span>
              </div>
            )}

            <div>
              <span className="text-xs font-mono text-zinc-500 block mb-1.5 uppercase">
                Services Required
              </span>
              <div className="flex flex-wrap gap-1.5">
                {requirement.plannerDetails.servicesNeeded?.map((svc) => (
                  <span
                    key={svc}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {requirement.plannerDetails.decorPreferences && (
              <div className="text-xs">
                <span className="text-zinc-500 block font-mono text-[11px] mb-1">Decor Preferences</span>
                <p className="text-zinc-300 bg-zinc-900/30 p-3 rounded-xl border border-zinc-800">
                  {requirement.plannerDetails.decorPreferences}
                </p>
              </div>
            )}
          </div>
        )}

        {requirement.category === 'performer' && requirement.performerDetails && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Performer Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Act Type</span>
                <span className="text-white capitalize">
                  {requirement.performerDetails.performerType.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Genre / Style</span>
                <span className="text-white">{requirement.performerDetails.genreOrStyle}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Artist Fee</span>
                <span className="text-white font-medium">
                  {requirement.performerDetails.performanceFeeBudget}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Duration</span>
                <span className="text-white">{requirement.performerDetails.performanceDuration}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">PA Provision</span>
                <span className="text-white capitalize">
                  {requirement.performerDetails.soundEquipmentProvided.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {requirement.performerDetails.repertoireNotes && (
              <div className="text-xs">
                <span className="text-zinc-500 block font-mono text-[11px] mb-1">Repertoire Notes</span>
                <p className="text-zinc-300 bg-zinc-900/30 p-3 rounded-xl border border-zinc-800">
                  {requirement.performerDetails.repertoireNotes}
                </p>
              </div>
            )}
          </div>
        )}

        {requirement.category === 'crew' && requirement.crewDetails && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Technical Crew Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Headcount</span>
                <span className="text-white tabular-nums">
                  {requirement.crewDetails.headcount} Members ({requirement.crewDetails.eventDaysCount} Days)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Call Time</span>
                <span className="text-white font-mono">{requirement.crewDetails.shiftCallTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Pay Rate</span>
                <span className="text-white font-medium">{requirement.crewDetails.compensationRate}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-zinc-500 block mb-1.5 uppercase">
                Roles Assigned
              </span>
              <div className="flex flex-wrap gap-1.5">
                {requirement.crewDetails.rolesNeeded?.map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Dress Code</span>
                <span className="text-white capitalize">
                  {requirement.crewDetails.dressCode.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <span className="text-zinc-500 block font-mono text-[11px]">Provisions</span>
                <span className="text-white">
                  {[
                    requirement.crewDetails.mealsProvided ? 'Meals' : null,
                    requirement.crewDetails.transportProvided ? 'Transport' : null,
                  ]
                    .filter(Boolean)
                    .join(' • ') || 'None'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Raw MongoDB Record */}
        <details className="text-xs font-mono text-zinc-400 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800">
          <summary className="cursor-pointer font-mono text-[11px] text-zinc-400 hover:text-white">
            Inspect Raw MongoDB Record (JSON)
          </summary>
          <pre className="mt-2.5 overflow-x-auto text-[11px] text-zinc-300">
            {JSON.stringify(requirement, null, 2)}
          </pre>
        </details>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-medium text-xs active:scale-[0.96] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
