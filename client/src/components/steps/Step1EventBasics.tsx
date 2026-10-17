'use client';

import React from 'react';
import { useRequirementForm } from '../../context/FormContext';
import {
  Calendar,
  MapPin,
  Sparkles,
  Music,
  Users,
  Building,
  Check,
  Zap,
} from 'lucide-react';
import { CategoryType } from '../../types/requirement';

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
    accentColor: string;
    tag: string;
  }> = [
    {
      id: 'planner',
      title: 'Event Planner',
      description:
        'Professional planners, coordinators, decorators, and agency leads to organize your event.',
      icon: Sparkles,
      accentColor: 'border-violet-500 bg-violet-950/20 text-violet-400 ring-violet-500/30',
      tag: 'Coordination & Decor',
    },
    {
      id: 'performer',
      title: 'Performer / Artist',
      description:
        'Bands, solo singers, DJs, standup comedians, dancers, magicians, and hosts to entertain.',
      icon: Music,
      accentColor: 'border-rose-500 bg-rose-950/20 text-rose-400 ring-rose-500/30',
      tag: 'Live Entertainment',
    },
    {
      id: 'crew',
      title: 'Technical Crew',
      description:
        'Sound engineers, lighting technicians, stagehands, camera operators, and production staff.',
      icon: Users,
      accentColor: 'border-cyan-500 bg-cyan-950/20 text-cyan-400 ring-cyan-500/30',
      tag: 'Operations & AV',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header bar with Autofill test helper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Step 1: Event Basics
          </h2>
          <p className="text-sm text-neutral-400 mt-0.5">
            Set up the foundation for your event and choose the requirement category.
          </p>
        </div>

        {/* Demo Fast-Track autofill */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fillSampleData()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-700/50 text-indigo-300 text-xs font-semibold transition-all shadow-sm group"
            title="Auto-fill realistic demo data for the selected category"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            Auto-fill Sample Data
          </button>
        </div>
      </div>

      {/* Category Selection Cards (Core Requirement) */}
      <div>
        <label className="block text-sm font-semibold text-neutral-200 mb-2">
          Select Category Needed <span className="text-rose-400">*</span>
        </label>
        <p className="text-xs text-neutral-400 mb-4">
          Steps 2 & 3 will automatically configure to capture requirements specific to this role.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const isSelected = formData.category === cat.id;
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? `${cat.accentColor} border-2 shadow-lg shadow-indigo-500/10 ring-2`
                    : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900 text-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-neutral-900 shadow-inner'
                          : 'bg-neutral-800 text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-neutral-900 border border-current'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-medium">
                  <span className={isSelected ? 'text-white' : 'text-neutral-500'}>
                    {isSelected ? 'Active Selection' : 'Click to select'}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-600 text-white'
                        : 'border-neutral-700 group-hover:border-neutral-500'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
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

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Event Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-200 mb-1.5">
            Event Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.eventName}
            onChange={(e) => updateEventBasics('eventName', e.target.value)}
            placeholder="e.g., Grand Annual Tech Gala 2026, Kabir's Sangeet Night"
            className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
              errors.eventName ? 'border-rose-500 bg-rose-950/10' : 'border-neutral-800'
            }`}
          />
          {errors.eventName ? (
            <p className="text-xs text-rose-400 mt-1">{errors.eventName}</p>
          ) : (
            <p className="text-[11px] text-neutral-500 mt-1">
              Give your event a clear, descriptive title.
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1.5">
            Event Type <span className="text-rose-400">*</span>
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => updateEventBasics('eventType', e.target.value)}
            className={`w-full px-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
              errors.eventType ? 'border-rose-500' : 'border-neutral-800'
            }`}
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-neutral-900 text-white">
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-xs text-rose-400 mt-1">{errors.eventType}</p>
          )}
        </div>

        {/* Location (City / Region) */}
        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-1.5">
            Location (City, State) <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.location}
              onChange={(e) => updateEventBasics('location', e.target.value)}
              placeholder="e.g., Mumbai, Maharashtra / Bengaluru, KA"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                errors.location ? 'border-rose-500' : 'border-neutral-800'
              }`}
            />
            <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          </div>
          {errors.location && (
            <p className="text-xs text-rose-400 mt-1">{errors.location}</p>
          )}
        </div>

        {/* Venue (Optional) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-200 mb-1.5 flex items-center justify-between">
            <span>Specific Venue / Landmark</span>
            <span className="text-xs text-neutral-500 font-normal">Optional</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.venue}
              onChange={(e) => updateEventBasics('venue', e.target.value)}
              placeholder="e.g., The Grand Hyatt Ballroom / Jio World Convention Centre"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            <Building className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Date / Date Range Section */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-neutral-200">
                Event Schedule & Dates
              </span>
              <p className="text-xs text-neutral-400 mt-0.5">
                Specify whether this event is a single-day occasion or spans across multiple dates.
              </p>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={formData.isDateRange}
                onChange={(e) => updateEventBasics('isDateRange', e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-neutral-800 border-neutral-700 focus:ring-indigo-500 focus:ring-offset-neutral-900"
              />
              Multi-day / Date Range
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Start Date */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                {formData.isDateRange ? 'Start Date' : 'Event Date'}{' '}
                <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => updateEventBasics('startDate', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                  errors.startDate ? 'border-rose-500' : 'border-neutral-800'
                }`}
              />
              {errors.startDate && (
                <p className="text-xs text-rose-400 mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* End Date (if date range) */}
            {formData.isDateRange && (
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  End Date <span className="text-rose-400">*</span>
                </label>
                <input
                  type="date"
                  min={formData.startDate || undefined}
                  value={formData.endDate}
                  onChange={(e) => updateEventBasics('endDate', e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                    errors.endDate ? 'border-rose-500' : 'border-neutral-800'
                  }`}
                />
                {errors.endDate && (
                  <p className="text-xs text-rose-400 mt-1">{errors.endDate}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact Info (Organizer Details) */}
        <div className="md:col-span-2 pt-2">
          <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Contact & Organizer Details (Optional)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => updateEventBasics('contactName', e.target.value)}
              placeholder="Contact Person Name"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => updateEventBasics('contactEmail', e.target.value)}
              placeholder="Email Address"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => updateEventBasics('contactPhone', e.target.value)}
              placeholder="Phone / WhatsApp Number"
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
        <p className="text-xs text-neutral-500">
          Required fields are marked with <span className="text-rose-400">*</span>
        </p>

        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Continue to Step 2</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 uppercase font-semibold">
            {formData.category}
          </span>
        </button>
      </div>
    </div>
  );
};
