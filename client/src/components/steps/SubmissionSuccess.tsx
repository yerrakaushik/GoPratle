'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRequirementForm } from '../../context/FormContext';
import {
  CheckCircle,
  Copy,
  Check,
  PlusCircle,
  ArrowRight,
  Database,
  Sparkles,
  Music,
  Users,
  Code2,
} from 'lucide-react';

export const SubmissionSuccess: React.FC = () => {
  const { submittedData, resetForm } = useRequirementForm();
  const [copied, setCopied] = useState<boolean>(false);
  const [showJson, setShowJson] = useState<boolean>(false);

  if (!submittedData) return null;

  const handleCopyId = () => {
    if (submittedData._id) {
      navigator.clipboard.writeText(submittedData._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryDetails = () => {
    switch (submittedData.category) {
      case 'planner':
        return {
          title: 'Event Planner Requirement',
          icon: Sparkles,
          color: 'bg-violet-950 text-violet-300 border-violet-800',
        };
      case 'performer':
        return {
          title: 'Performer / Artist Requirement',
          icon: Music,
          color: 'bg-rose-950 text-rose-300 border-rose-800',
        };
      case 'crew':
        return {
          title: 'Technical Crew Requirement',
          icon: Users,
          color: 'bg-cyan-950 text-cyan-300 border-cyan-800',
        };
    }
  };

  const category = getCategoryDetails();
  const CategoryIcon = category.icon;

  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-8 animate-fadeIn max-w-2xl mx-auto shadow-2xl shadow-indigo-500/5">
      {/* Celebration Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
      </div>

      {/* Title & confirmation message */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Requirement Successfully Posted!
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Your event requirement has been verified, processed, and stored in the MongoDB backend database under the{' '}
          <span className="text-white font-semibold">{submittedData.category}</span> category.
        </p>
      </div>

      {/* Record info pill & Category Badge */}
      <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-left space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-neutral-400">MongoDB Document ID:</span>
            <code className="text-xs font-mono text-emerald-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
              {submittedData._id}
            </code>
          </div>

          <button
            type="button"
            onClick={handleCopyId}
            className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-xs text-neutral-500">Event Title</div>
            <div className="text-sm font-semibold text-white">
              {submittedData.eventName}
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${category.color}`}>
            <CategoryIcon className="w-3.5 h-3.5" />
            <span>{category.title}</span>
          </div>
        </div>
      </div>

      {/* JSON Viewer toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showJson ? 'Hide MongoDB Document' : 'View Saved MongoDB Record'}</span>
        </button>

        {showJson && (
          <div className="mt-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-left font-mono text-xs text-neutral-300 max-h-60 overflow-y-auto">
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-neutral-800">
        <Link
          href="/postings"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
        >
          <span>View All Postings in Feed</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          type="button"
          onClick={resetForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-medium text-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Another Requirement</span>
        </button>
      </div>
    </div>
  );
};
