'use client';

import React from 'react';
import { RequirementDocument } from '../../types/requirement';
import {
  X,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Music,
  Users,
  Clock,
  DollarSign,
  Database,
  Mail,
  Phone,
  User,
} from 'lucide-react';

interface Props {
  requirement: RequirementDocument | null;
  onClose: () => void;
}

export const RequirementModal: React.FC<Props> = ({ requirement, onClose }) => {
  if (!requirement) return null;

  const getCategoryDetails = () => {
    switch (requirement.category) {
      case 'planner':
        return {
          title: 'Event Planner',
          icon: Sparkles,
          color: 'bg-violet-950 text-violet-300 border-violet-800',
        };
      case 'performer':
        return {
          title: 'Performer / Artist',
          icon: Music,
          color: 'bg-rose-950 text-rose-300 border-rose-800',
        };
      case 'crew':
        return {
          title: 'Technical Crew',
          icon: Users,
          color: 'bg-cyan-950 text-cyan-300 border-cyan-800',
        };
    }
  };

  const category = getCategoryDetails();
  const CategoryIcon = category.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${category.color}`}
              >
                <CategoryIcon className="w-3.5 h-3.5" />
                <span>{category.title}</span>
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                ID: {requirement._id}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {requirement.eventName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Schedule & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 text-xs">
          <div>
            <span className="text-neutral-500 block mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Event Schedule
            </span>
            <span className="text-white font-medium">
              {requirement.isDateRange
                ? `${new Date(requirement.startDate).toLocaleDateString()} to ${new Date(
                    requirement.endDate
                  ).toLocaleDateString()}`
                : new Date(requirement.startDate).toLocaleDateString()}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              Location
            </span>
            <span className="text-white font-medium">{requirement.location}</span>
          </div>

          <div>
            <span className="text-neutral-500 block mb-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              Venue
            </span>
            <span className="text-white font-medium">{requirement.venue || 'TBD / Not specified'}</span>
          </div>
        </div>

        {/* Category Specific Breakdown */}
        {requirement.category === 'planner' && requirement.plannerDetails && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-violet-400">
              Planner Specifications (Step 2 & 3)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Scope</span>
                <span className="text-white font-medium capitalize">
                  {requirement.plannerDetails.planningScope.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Guest Volume</span>
                <span className="text-white font-medium">
                  {requirement.plannerDetails.estimatedGuestCount} Guests
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Overall Budget</span>
                <span className="text-emerald-400 font-medium">
                  {requirement.plannerDetails.overallBudget}
                </span>
              </div>
            </div>

            {requirement.plannerDetails.themeOrVibe && (
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                <span className="text-neutral-500 block mb-0.5">Theme & Atmosphere</span>
                <span className="text-white font-medium">
                  {requirement.plannerDetails.themeOrVibe}
                </span>
              </div>
            )}

            <div>
              <span className="text-xs text-neutral-400 block mb-2 font-medium">
                Services Required
              </span>
              <div className="flex flex-wrap gap-1.5">
                {requirement.plannerDetails.servicesNeeded?.map((svc) => (
                  <span
                    key={svc}
                    className="px-2.5 py-1 rounded-lg bg-violet-950/60 border border-violet-800 text-violet-300 text-xs"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {requirement.plannerDetails.decorPreferences && (
              <div className="text-xs">
                <span className="text-neutral-500 block mb-1">Decor Preferences</span>
                <p className="text-neutral-300 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  {requirement.plannerDetails.decorPreferences}
                </p>
              </div>
            )}
          </div>
        )}

        {requirement.category === 'performer' && requirement.performerDetails && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-rose-400">
              Performer Specifications (Step 2 & 3)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Act Type</span>
                <span className="text-white font-medium capitalize">
                  {requirement.performerDetails.performerType.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Genre / Style</span>
                <span className="text-white font-medium">
                  {requirement.performerDetails.genreOrStyle}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Remuneration</span>
                <span className="text-emerald-400 font-medium">
                  {requirement.performerDetails.performanceFeeBudget}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Set Duration</span>
                <span className="text-white font-medium">
                  {requirement.performerDetails.performanceDuration}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Sound & PA Provision</span>
                <span className="text-white font-medium capitalize">
                  {requirement.performerDetails.soundEquipmentProvided.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {requirement.performerDetails.repertoireNotes && (
              <div className="text-xs">
                <span className="text-neutral-500 block mb-1">Repertoire & Playlist Notes</span>
                <p className="text-neutral-300 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  {requirement.performerDetails.repertoireNotes}
                </p>
              </div>
            )}
          </div>
        )}

        {requirement.category === 'crew' && requirement.crewDetails && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">
              Technical Crew Specifications (Step 2 & 3)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Total Headcount</span>
                <span className="text-white font-medium">
                  {requirement.crewDetails.headcount} Members ({requirement.crewDetails.eventDaysCount} Days)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Shift Call Time</span>
                <span className="text-white font-medium">
                  {requirement.crewDetails.shiftCallTime}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Pay Rate</span>
                <span className="text-emerald-400 font-medium">
                  {requirement.crewDetails.compensationRate}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-400 block mb-2 font-medium">
                Roles Required
              </span>
              <div className="flex flex-wrap gap-1.5">
                {requirement.crewDetails.rolesNeeded?.map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Dress Code</span>
                <span className="text-white font-medium capitalize">
                  {requirement.crewDetails.dressCode.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-neutral-500 block">Provisions</span>
                <span className="text-white font-medium">
                  {[
                    requirement.crewDetails.mealsProvided ? 'Meals' : null,
                    requirement.crewDetails.transportProvided ? 'Transport' : null,
                  ]
                    .filter(Boolean)
                    .join(' & ') || 'None'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Raw MongoDB Document Accordion */}
        <details className="text-xs font-mono text-neutral-400 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <summary className="cursor-pointer font-sans text-neutral-300 font-medium hover:text-white">
            View Complete MongoDB BSON/JSON Record
          </summary>
          <pre className="mt-3 overflow-x-auto text-[11px] text-emerald-400">
            {JSON.stringify(requirement, null, 2)}
          </pre>
        </details>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
