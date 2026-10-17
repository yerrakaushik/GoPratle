'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { RequirementModal } from '../../components/postings/RequirementModal';
import { api } from '../../services/api';
import { RequirementDocument } from '../../types/requirement';
import {
  Search,
  PlusCircle,
  Loader2,
  RefreshCw,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function PostingsPage() {
  const [requirements, setRequirements] = useState<RequirementDocument[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    categories: { planner: number; performer: number; crew: number };
  }>({
    total: 0,
    categories: { planner: 0, performer: 0, crew: 0 },
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDoc, setSelectedDoc] = useState<RequirementDocument | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [listRes, statsRes] = await Promise.all([
        api.getRequirements({
          category: activeCategory !== 'all' ? activeCategory : undefined,
          search: searchTerm.trim() || undefined,
        }),
        api.getStats().catch(() => null),
      ]);

      if (listRes.success) {
        setRequirements(listRes.data);
      }

      if (statsRes && statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (err) {
      console.error('Failed to load postings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Live Database Feed
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Event Requirements Directory
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Browse submitted requirements categorized by Planners, Performers, and Crew.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchData}
              disabled={isLoading}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white active:scale-[0.96] transition-all"
              title="Refresh Postings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-xs shadow-sm active:scale-[0.96] transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Requirement</span>
            </Link>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <span className="text-[11px] font-mono uppercase text-zinc-500 block">Total Requirements</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">
              {stats.total}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <span className="text-[11px] font-mono uppercase text-zinc-500 block">Planners</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">
              {stats.categories.planner}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <span className="text-[11px] font-mono uppercase text-zinc-500 block">Performers</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">
              {stats.categories.performer}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <span className="text-[11px] font-mono uppercase text-zinc-500 block">Crew</span>
            <span className="text-xl font-bold font-mono text-white mt-1 block tabular-nums">
              {stats.categories.crew}
            </span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'planner', label: 'Planners' },
              { id: 'performer', label: 'Performers' },
              { id: 'crew', label: 'Crew' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium active:scale-[0.96] transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search event, location..."
              className="w-full pl-8 pr-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
            />
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Requirements Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-zinc-500 font-mono text-xs">
            <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
            <span>Loading MongoDB feed...</span>
          </div>
        ) : requirements.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-3 max-w-sm mx-auto">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center mx-auto text-zinc-500">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">No postings found</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {searchTerm || activeCategory !== 'all'
                  ? 'Try adjusting your search query or filters.'
                  : 'No event requirements posted yet.'}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-zinc-950 text-xs font-medium active:scale-[0.96] transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post a Requirement</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requirements.map((req) => {
              return (
                <div
                  key={req._id}
                  onClick={() => setSelectedDoc(req)}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60 cursor-pointer active:scale-[0.99] transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    {/* Category pill & date */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {req.category}
                      </span>

                      <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-semibold text-sm text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
                        {req.eventName}
                      </h3>
                      <span className="text-xs text-zinc-400">
                        {req.eventType}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1 text-xs text-zinc-400 pt-2 border-t border-zinc-800/60 font-mono text-[11px]">
                      <div>{req.location}{req.venue ? ` • ${req.venue}` : ''}</div>
                      <div className="tabular-nums text-zinc-500">
                        {req.isDateRange
                          ? `${new Date(req.startDate).toLocaleDateString()} → ${new Date(
                              req.endDate
                            ).toLocaleDateString()}`
                          : new Date(req.startDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Highlight spec */}
                    <div className="pt-1 text-xs">
                      {req.category === 'planner' && req.plannerDetails && (
                        <div className="text-zinc-400 font-mono text-[11px]">
                          Budget: <span className="text-white">{req.plannerDetails.overallBudget}</span>
                        </div>
                      )}

                      {req.category === 'performer' && req.performerDetails && (
                        <div className="text-zinc-400 font-mono text-[11px]">
                          Act: <span className="text-white capitalize">{req.performerDetails.performerType.replace(/_/g, ' ')}</span>
                        </div>
                      )}

                      {req.category === 'crew' && req.crewDetails && (
                        <div className="text-zinc-400 font-mono text-[11px]">
                          Headcount: <span className="text-white tabular-nums">{req.crewDetails.headcount} Members</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white font-medium">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for detailed viewing */}
        <RequirementModal
          requirement={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      </main>
    </div>
  );
}
