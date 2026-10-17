'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRequirementForm } from '../../context/FormContext';
import { Check, Copy, ArrowRight, PlusCircle, Code2 } from 'lucide-react';

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

  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-center space-y-6 max-w-xl mx-auto animate-fadeIn">
      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center mx-auto shadow-sm">
        <Check className="w-6 h-6 stroke-[2.5]" />
      </div>

      {/* Headings */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Requirement Successfully Posted
        </h2>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
          The requirement document has been validated and committed to MongoDB under the{' '}
          <span className="text-white font-mono uppercase">{submittedData.category}</span> schema.
        </p>
      </div>

      {/* Document Key Information */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-left space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500">Document ID:</span>
            <code className="text-xs font-mono text-white bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
              {submittedData._id}
            </code>
          </div>

          <button
            type="button"
            onClick={handleCopyId}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <div>
            <span className="text-zinc-500 block text-[11px] font-mono">Event Title</span>
            <span className="text-white font-medium">{submittedData.eventName}</span>
          </div>

          <div className="text-right">
            <span className="text-zinc-500 block text-[11px] font-mono">Category</span>
            <span className="text-xs font-mono uppercase text-zinc-300">
              {submittedData.category}
            </span>
          </div>
        </div>
      </div>

      {/* JSON toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="text-xs font-mono text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <Code2 className="w-3 h-3" />
          <span>{showJson ? 'Hide MongoDB Record' : 'View Saved MongoDB Record'}</span>
        </button>

        {showJson && (
          <div className="mt-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left font-mono text-[11px] text-zinc-300 max-h-56 overflow-y-auto">
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/postings"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs shadow-sm active:scale-[0.96] transition-all"
        >
          <span>Browse All Postings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={resetForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-xs active:scale-[0.96] transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Create Another</span>
        </button>
      </div>
    </div>
  );
};
