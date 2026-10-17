'use client';

import React from 'react';
import { useRequirementForm } from '../context/FormContext';
import { Sparkles, Music2, Wrench, CheckCircle, Clock } from 'lucide-react';
import { CategoryType } from '../types/requirement';

export const LiveDraftCompanion: React.FC = () => {
  const {
    formData,
    readinessPercentage,
    lastSavedAt,
    fillSampleData,
    currentStep,
  } = useRequirementForm();

  const getCategoryIcon = () => {
    switch (formData.category) {
      case 'planner':
        return Sparkles;
      case 'performer':
        return Music2;
      case 'crew':
        return Wrench;
    }
  };

  const CategoryIcon = getCategoryIcon();

  const presets: Array<{ id: CategoryType; label: string; sub: string }> = [
    {
      id: 'planner',
      label: 'Royal Wedding Planner',
      sub: 'Udaipur • 350 Guests',
    },
    {
      id: 'performer',
      label: 'Headline Rock Band',
      sub: 'Mumbai • 90m Set',
    },
    {
      id: 'crew',
      label: 'AV Technical Crew',
      sub: 'Bengaluru • 12 Technicians',
    },
  ];

  return (
    <aside className="hidden lg:block w-80 shrink-0 space-y-4 sticky top-24 self-start">
      {/* Live Document Health Card */}
      <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 shadow-sm space-y-4">
        {/* Readiness Meter */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-mono text-zinc-400 text-[11px] uppercase tracking-wider">
              Document Readiness
            </span>
            <span className="font-mono font-bold text-white tabular-nums">
              {readinessPercentage}%
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
        </div>

        {/* Live Assembled Preview Snippet */}
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 uppercase">
              <CategoryIcon className="w-3 h-3 text-zinc-300" />
              <span>{formData.category} Draft</span>
            </div>

            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
              Step {currentStep}/4
            </span>
          </div>

          <div className="font-semibold text-white line-clamp-1">
            {formData.eventName || 'Untitled Event Requirement'}
          </div>

          <div className="text-[11px] text-zinc-400 space-y-0.5 font-mono">
            <div>Type: {formData.eventType}</div>
            <div>
              Loc:{' '}
              {formData.location ? formData.location : 'Not specified yet'}
            </div>
            {formData.category === 'planner' && (
              <div>Budget: {formData.plannerDetails.overallBudget || '—'}</div>
            )}
            {formData.category === 'performer' && (
              <div>Genre: {formData.performerDetails.genreOrStyle || '—'}</div>
            )}
            {formData.category === 'crew' && (
              <div>
                Headcount: {formData.crewDetails.headcount} Pax (
                {formData.crewDetails.rolesNeeded?.length || 0} roles)
              </div>
            )}
          </div>
        </div>

        {/* Auto-save Status */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Auto-synced</span>
          </div>
          <span className="tabular-nums">{lastSavedAt || 'Draft ready'}</span>
        </div>
      </div>

      {/* 1-Click Interactive Sample Scenarios */}
      <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 shadow-sm space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
          One-Click Demo Presets
        </span>

        <div className="space-y-1.5">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => fillSampleData(preset.id)}
              className="w-full text-left p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 active:scale-[0.98] transition-all group flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-medium text-white group-hover:text-zinc-200">
                  {preset.label}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {preset.sub}
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Load
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="p-3 rounded-xl bg-zinc-950/40 border border-zinc-800/60 text-[11px] text-zinc-400 flex items-center justify-between">
        <span>Advance / Save:</span>
        <div className="flex items-center gap-1">
          <kbd>⌘</kbd>
          <kbd>↵</kbd>
        </div>
      </div>
    </aside>
  );
};
