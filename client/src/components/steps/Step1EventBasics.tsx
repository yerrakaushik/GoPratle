'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import { CategoryType } from '../../types/requirement';
import { Sparkles, Music2, Wrench, ArrowRight, Check } from 'lucide-react';

const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Music Festival',
  'Concert',
  'Private Party',
  'Exhibition / Trade Fair',
  'College Fest',
  'Product Launch',
  'Fashion Show',
  'Other',
];

export const Step1EventBasics: React.FC = () => {
  const {
    formData,
    errors,
    updateEventBasics,
    setCategory,
    goToNextStep,
    fillSampleData,
  } = useRequirementForm();

  const categories: Array<{
    id: CategoryType;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    tag: string;
  }> = [
    {
      id: 'planner',
      title: 'Event Planner',
      description: 'Full planning, day-of coordination, vendor sourcing, and decor management.',
      icon: Sparkles,
      tag: 'Coordination',
    },
    {
      id: 'performer',
      title: 'Performer / Artist',
      description: 'Bands, vocalists, DJs, standup comedians, dancers, and stage talent.',
      icon: Music2,
      tag: 'Live Act',
    },
    {
      id: 'crew',
      title: 'Technical Crew',
      description: 'FOH sound engineers, lighting operators, stagehands, and video crew.',
      icon: Wrench,
      tag: 'AV & Operations',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header & Autofill utility */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight">
            Event Basics & Category
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Define basic event parameters. Steps 2 and 3 adapt based on the role selected below.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fillSampleData()}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono active:scale-[0.96] transition-all"
        >
          Autofill Sample Data
        </button>
      </div>

      {/* Category Selection Cards (No gradients, tactile super-design) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Select Requirement Category <span className="text-rose-400">*</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const isSelected = formData.category === cat.id;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-150 flex flex-col justify-between active:scale-[0.98] ${
                  isSelected
                    ? 'border-white bg-zinc-900 text-white shadow-sm ring-1 ring-white/20'
                    : 'border-zinc-800/80 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-white text-zinc-950' : 'bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-zinc-800 text-zinc-200'
                          : 'bg-zinc-900 text-zinc-500'
                      }`}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1">{cat.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-zinc-200 font-medium' : 'text-zinc-500'}>
                    {isSelected ? 'Active Selection' : 'Click to select'}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'border-white bg-white text-zinc-950'
                        : 'border-zinc-700'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {errors.category && (
          <p className="text-xs text-rose-400 mt-2">{errors.category}</p>
        )}
      </div>

      {/* Event Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        {/* Event Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Event Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.eventName}
            onChange={(e) => updateEventBasics('eventName', e.target.value)}
            placeholder="e.g., Grand Annual Tech Gala 2026"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all ${
              errors.eventName ? 'border-rose-500' : 'border-zinc-800'
            }`}
          />
          {errors.eventName ? (
            <p className="text-xs text-rose-400 mt-1">{errors.eventName}</p>
          ) : (
            <p className="text-[11px] text-zinc-500 mt-1">
              Clear title describing the occasion.
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Event Type <span className="text-rose-400">*</span>
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => updateEventBasics('eventType', e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all ${
              errors.eventType ? 'border-rose-500' : 'border-zinc-800'
            }`}
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-zinc-950 text-white">
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-xs text-rose-400 mt-1">{errors.eventType}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Location (City, State) <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateEventBasics('location', e.target.value)}
            placeholder="e.g., Mumbai, Maharashtra"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all ${
              errors.location ? 'border-rose-500' : 'border-zinc-800'
            }`}
          />
          {errors.location && (
            <p className="text-xs text-rose-400 mt-1">{errors.location}</p>
          )}
        </div>

        {/* Venue (Optional) */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center justify-between">
            <span>Specific Venue / Landmark</span>
            <span className="text-[11px] text-zinc-500 font-mono font-normal">Optional</span>
          </label>
          <input
            type="text"
            value={formData.venue}
            onChange={(e) => updateEventBasics('venue', e.target.value)}
            placeholder="e.g., The Grand Ballroom / Jio World Convention Centre"
            className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
          />
        </div>

        {/* Date Schedule Container */}
        <div className="md:col-span-2 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Schedule & Dates
            </span>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400 hover:text-zinc-200">
              <input
                type="checkbox"
                checked={formData.isDateRange}
                onChange={(e) => updateEventBasics('isDateRange', e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
              />
              Multi-day Date Range
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1 font-mono">
                {formData.isDateRange ? 'Start Date' : 'Event Date'} <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => updateEventBasics('startDate', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg bg-zinc-900 border text-white text-xs focus:outline-none focus:border-zinc-400 ${
                  errors.startDate ? 'border-rose-500' : 'border-zinc-800'
                }`}
              />
              {errors.startDate && (
                <p className="text-xs text-rose-400 mt-1">{errors.startDate}</p>
              )}
            </div>

            {formData.isDateRange && (
              <div>
                <label className="block text-xs text-zinc-400 mb-1 font-mono">
                  End Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  min={formData.startDate || undefined}
                  value={formData.endDate}
                  onChange={(e) => updateEventBasics('endDate', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg bg-zinc-900 border text-white text-xs focus:outline-none focus:border-zinc-400 ${
                    errors.endDate ? 'border-rose-500' : 'border-zinc-800'
                  }`}
                />
                {errors.endDate && (
                  <p className="text-xs text-rose-400 mt-1">{errors.endDate}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact info */}
        <div className="md:col-span-2 pt-1">
          <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Organizer Contact (Optional)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => updateEventBasics('contactName', e.target.value)}
              placeholder="Contact Name"
              className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => updateEventBasics('contactEmail', e.target.value)}
              placeholder="Email Address"
              className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => updateEventBasics('contactPhone', e.target.value)}
              placeholder="Phone Number"
              className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500">
          * Required fields
        </p>

        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs shadow-sm active:scale-[0.96] transition-all"
        >
          <span>Continue to Step 2</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
