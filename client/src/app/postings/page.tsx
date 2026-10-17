'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { RequirementModal } from '../../components/postings/RequirementModal';
import { api } from '../../services/api';
import { RequirementDocument } from '../../types/requirement';
import {
  Sparkles,
  Music,
  Users,
  Search,
  Calendar,
  MapPin,
  Building,
  PlusCircle,
  Loader2,
  RefreshCw,
  Database,
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'planner':
        return {
          title: 'Event Planner',
          icon: Sparkles,
          color: 'bg-violet-950/80 text-violet-300 border-violet-800',
        };
      case 'performer':
        return {
          title: 'Performer',
          icon: Music,
          color: 'bg-rose-950/80 text-rose-300 border-rose-800',
        };
      case 'crew':
        return {
          title: 'Crew',
          icon: Users,
          color: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
        };
      default:
        return {
          title: category,
          icon: Database,
          color: 'bg-neutral-800 text-neutral-300 border-neutral-700',
        };
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Event Requirements Feed</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
                Live MongoDB Store
              </span>
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Explore posted requirements categorized by Planner, Performer, and Technical Crew.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchData}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Refresh Postings"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Requirement</span>
            </Link>
          </div>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800">
            <span className="text-xs text-neutral-400 font-medium block">Total Postings</span>
            <span className="text-2xl font-bold text-white mt-1 block">
              {stats.total}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-900/40">
            <span className="text-xs text-violet-400 font-medium block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Planners
            </span>
            <span className="text-2xl font-bold text-white mt-1 block">
              {stats.categories.planner}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
            <span className="text-xs text-rose-400 font-medium block flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5" />
              Performers
            </span>
            <span className="text-2xl font-bold text-white mt-1 block">
              {stats.categories.performer}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-900/40">
            <span className="text-xs text-cyan-400 font-medium block flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Crew
            </span>
            <span className="text-2xl font-bold text-white mt-1 block">
              {stats.categories.crew}
            </span>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Postings' },
              { id: 'planner', label: 'Event Planners' },
              { id: 'performer', label: 'Performers & Artists' },
              { id: 'crew', label: 'Technical Crew' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search event, city, venue..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Requirements Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-sm">Fetching requirements from MongoDB...</p>
          </div>
        ) : requirements.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-neutral-900/30 border border-neutral-800/80 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No requirements found</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                {searchTerm || activeCategory !== 'all'
                  ? 'Try broadening your search or switching category filters.'
                  : 'Be the first to post an event requirement to the database!'}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Requirement</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req) => {
              const badge = getCategoryBadge(req.category);
              const BadgeIcon = badge.icon;

              return (
                <div
                  key={req._id}
                  onClick={() => setSelectedDoc(req)}
                  className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/80 cursor-pointer transition-all flex flex-col justify-between group shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="space-y-3">
                    {/* Category pill & date */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${badge.color}`}
                      >
                        <BadgeIcon className="w-3 h-3" />
                        <span>{badge.title}</span>
                      </span>

                      <span className="text-[11px] text-neutral-500">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {req.eventName}
                      </h3>
                      <span className="text-xs text-neutral-400 font-medium">
                        {req.eventType}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span className="truncate">
                          {req.isDateRange
                            ? `${new Date(req.startDate).toLocaleDateString()} - ${new Date(
                                req.endDate
                              ).toLocaleDateString()}`
                            : new Date(req.startDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span className="truncate">{req.location}</span>
                      </div>

                      {req.venue && (
                        <div className="flex items-center gap-2">
                          <Building className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span className="truncate">{req.venue}</span>
                        </div>
                      )}
                    </div>

                    {/* Category Highlights */}
                    <div className="pt-2">
                      {req.category === 'planner' && req.plannerDetails && (
                        <div className="flex items-center justify-between text-xs bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
                          <span className="text-neutral-400">Budget:</span>
                          <span className="text-emerald-400 font-medium">
                            {req.plannerDetails.overallBudget}
                          </span>
                        </div>
                      )}

                      {req.category === 'performer' && req.performerDetails && (
                        <div className="flex items-center justify-between text-xs bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
                          <span className="text-neutral-400">Act:</span>
                          <span className="text-rose-400 font-medium capitalize">
                            {req.performerDetails.performerType.replace(/_/g, ' ')}
                          </span>
                        </div>
                      )}

                      {req.category === 'crew' && req.crewDetails && (
                        <div className="flex items-center justify-between text-xs bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
                          <span className="text-neutral-400">Headcount:</span>
                          <span className="text-cyan-400 font-medium">
                            {req.crewDetails.headcount} Members
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-indigo-400 font-medium group-hover:text-indigo-300">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
