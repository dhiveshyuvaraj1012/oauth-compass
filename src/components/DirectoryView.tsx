import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  SlidersHorizontal,
  X,
  Calendar,
  Shield,
  HelpCircle
} from 'lucide-react';
import { OAuthGuide, DifficultyLevel } from '../types/oauth';
import { DifficultyBadge, normalizeDifficulty } from './DifficultyBadge';
import { EvidenceBadge, SourcedDisplay } from './EvidenceBadge';
import { AppLogo } from './AppLogo';

interface DirectoryViewProps {
  allGuides: OAuthGuide[];
  onSelectGuide: (guide: OAuthGuide) => void;
  onNavigateToGenerator: () => void;
}

const DIFFICULTY_OPTIONS: Array<{ label: string; value: string }> = [
  { label: 'All Difficulties', value: 'all' },
  { label: '1 Easy (Self-serve)', value: '1 Easy' },
  { label: '2 Moderate (Optional / Unlisted)', value: '2 Moderate' },
  { label: '3 Hard (Standard Review)', value: '3 Hard' },
  { label: '4 Very hard (CASA / Security Audit)', value: '4 Very hard' },
  { label: '5 Partner-gated / uncertain', value: '5 Partner-gated / uncertain' },
];

export function DirectoryView({
  allGuides,
  onSelectGuide,
  onNavigateToGenerator,
}: DirectoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    allGuides.forEach(g => set.add(g.category));
    return Array.from(set);
  }, [allGuides]);

  // Filtering
  const filteredGuides = useMemo(() => {
    return allGuides.filter(guide => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        guide.name.toLowerCase().includes(q) ||
        guide.tagline.toLowerCase().includes(q) ||
        guide.category.toLowerCase().includes(q) ||
        guide.scopes?.some(s => s.name.toLowerCase().includes(q)) ||
        guide.potentialBlockers?.some(b => b.errorCode.toLowerCase().includes(q) || b.title.toLowerCase().includes(q));

      const normalizedDiff = normalizeDifficulty(guide.difficulty);
      const matchesDifficulty =
        selectedDifficulty === 'all' || normalizedDiff === selectedDifficulty;

      const matchesCategory =
        selectedCategory === 'all' || guide.category === selectedCategory;

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [allGuides, searchTerm, selectedDifficulty, selectedCategory]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchTerm || selectedDifficulty !== 'all' || selectedCategory !== 'all';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Title & Top Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">OAuth Application Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {filteredGuides.length} Guides
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official developer setup roadmaps, verification requirements, and evidence-backed approval wait times.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Table / Grid view toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onNavigateToGenerator}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center space-x-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Research with AI</span>
            <span className="sm:hidden">AI Generator</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search apps by name, scopes (e.g. gmail.readonly), blockers, or keywords..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty filter dropdown */}
          <div className="w-full md:w-60">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {DIFFICULTY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category filter dropdown */}
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Evidence Status Legend Banner */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-700 mr-1">Evidence Status:</span>
            <EvidenceBadge status="primary-docs" />
            <span className="text-[10px] text-slate-400 mr-1">Official provider docs</span>
            <EvidenceBadge status="secondary" />
            <span className="text-[10px] text-slate-400 mr-1">Third-party verified</span>
            <EvidenceBadge status="inferred" />
            <span className="text-[10px] text-slate-400 mr-1">Concluded from absence</span>
            <EvidenceBadge status="unverified" />
            <span className="text-[10px] text-slate-400">Displayed as Not published</span>
          </div>
        </div>
      </div>

      {/* No results empty state */}
      {filteredGuides.length === 0 && (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">No OAuth guides found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't find any pre-built guides matching your filters. You can generate a research guide with live web search grounding.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onNavigateToGenerator}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Guide</span>
            </button>
          </div>
        </div>
      )}

      {/* TABLE VIEW (Requirement 4: overflow-x: auto, sticky Application column, collapsible Category under 1100px, min-width) */}
      {viewMode === 'table' && filteredGuides.length > 0 && (
        <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
          <table className="min-w-[920px] w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                {/* Sticky Application Column */}
                <th className="py-3.5 px-4 sticky left-0 bg-slate-50 z-20 min-w-[220px] max-w-[260px] shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                  Application
                </th>
                {/* Collapsible Category column on viewports < 1100px */}
                <th className="py-3.5 px-4 hidden xl:table-cell min-w-[140px]">
                  Category
                </th>
                <th className="py-3.5 px-4 min-w-[150px]">
                  Difficulty
                </th>
                <th className="py-3.5 px-4 min-w-[150px]">
                  Setup Effort
                </th>
                <th className="py-3.5 px-4 min-w-[220px]">
                  Approval Wait Time
                </th>
                <th className="py-3.5 px-4 min-w-[200px]">
                  Approval Gate
                </th>
                <th className="py-3.5 px-4 text-right min-w-[100px]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredGuides.map(guide => {
                // Sourced metrics with fallbacks
                const effortVal = guide.setupEffort?.value || guide.estimatedDevTime || 'Not published';
                const effortStatus = guide.setupEffort?.status || 'inferred';
                const effortUrl = guide.setupEffort?.url;
                const effortExp = guide.setupEffort?.explanation || guide.estimatedDevTimeNote || 'Standard OAuth 2.0 flow';

                const waitVal = guide.approvalWait?.value || guide.estimatedReviewTime || 'Not published';
                const waitStatus = guide.approvalWait?.status || (waitVal.toLowerCase().includes('not published') ? 'unverified' : 'primary-docs');
                const waitUrl = guide.approvalWait?.url;
                const waitExp = guide.approvalWait?.explanation || guide.estimatedReviewTimeNote;

                const gateVal = guide.approvalGate?.value || guide.approvalType || 'Self-serve';
                const gateStatus = guide.approvalGate?.status || 'primary-docs';
                const gateUrl = guide.approvalGate?.url;
                const gateExp = guide.approvalGate?.explanation;

                return (
                  <tr
                    key={guide.id}
                    onClick={() => onSelectGuide(guide)}
                    className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                  >
                    {/* Sticky Application Column */}
                    <td className="py-3.5 px-4 sticky left-0 bg-white group-hover:bg-blue-50/40 z-10 shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                      <div className="flex items-center space-x-3">
                        <AppLogo
                          name={guide.name}
                          slug={guide.slug}
                          brandColor={guide.brandColor}
                          logoUrl={guide.logoUrl}
                          website={guide.sources?.[0]?.url}
                          size="md"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                            {guide.name}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                            {guide.tagline}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Hidden on < 1100px (xl breakpoint) to guarantee Approval Gate visibility */}
                    <td className="py-3.5 px-4 hidden xl:table-cell text-slate-500 font-medium">
                      {guide.category}
                    </td>

                    {/* Difficulty Badge: 5 levels with 1 color each */}
                    <td className="py-3.5 px-4">
                      <DifficultyBadge difficulty={guide.difficulty} size="sm" />
                    </td>

                    {/* Dev Effort with status & source link */}
                    <td className="py-3.5 px-4">
                      <SourcedDisplay
                        value={effortVal}
                        status={effortStatus}
                        url={effortUrl}
                        explanation={effortExp}
                      />
                    </td>

                    {/* Approval Wait Time with status & source link */}
                    <td className="py-3.5 px-4">
                      <SourcedDisplay
                        value={waitVal}
                        status={waitStatus}
                        url={waitUrl}
                        explanation={waitExp}
                        valueClassName="leading-relaxed"
                      />
                    </td>

                    {/* Approval Gate with status & source link */}
                    <td className="py-3.5 px-4">
                      <SourcedDisplay
                        value={gateVal}
                        status={gateStatus}
                        url={gateUrl}
                        explanation={gateExp}
                        valueClassName="leading-relaxed"
                      />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectGuide(guide);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && filteredGuides.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredGuides.map(guide => {
            const effortVal = guide.setupEffort?.value || guide.estimatedDevTime || 'Not published';
            const effortStatus = guide.setupEffort?.status || 'inferred';
            const effortUrl = guide.setupEffort?.url;
            const effortExp = guide.setupEffort?.explanation || guide.estimatedDevTimeNote;

            const waitVal = guide.approvalWait?.value || guide.estimatedReviewTime || 'Not published';
            const waitStatus = guide.approvalWait?.status || (waitVal.toLowerCase().includes('not published') ? 'unverified' : 'primary-docs');
            const waitUrl = guide.approvalWait?.url;
            const waitExp = guide.approvalWait?.explanation || guide.estimatedReviewTimeNote;

            const gateVal = guide.approvalGate?.value || guide.approvalType || 'Self-serve';
            const gateStatus = guide.approvalGate?.status || 'primary-docs';
            const gateUrl = guide.approvalGate?.url;

            return (
              <div
                key={guide.id}
                onClick={() => onSelectGuide(guide)}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <AppLogo
                        name={guide.name}
                        slug={guide.slug}
                        brandColor={guide.brandColor}
                        logoUrl={guide.logoUrl}
                        website={guide.sources?.[0]?.url}
                        size="lg"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors truncate">
                            {guide.name}
                          </h3>
                        </div>
                        <span className="text-[11px] text-slate-500">{guide.category}</span>
                      </div>
                    </div>

                    <DifficultyBadge difficulty={guide.difficulty} size="sm" />
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {guide.tagline}
                  </p>

                  {/* Scopes preview chips */}
                  {guide.scopes && guide.scopes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {guide.scopes.slice(0, 3).map(s => (
                        <span
                          key={s.name}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {s.name}
                        </span>
                      ))}
                      {guide.scopes.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-50 text-slate-400">
                          +{guide.scopes.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Specs with Evidence Labels */}
                <div className="mt-5 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Effort</span>
                      <SourcedDisplay
                        value={effortVal}
                        status={effortStatus}
                        url={effortUrl}
                        explanation={effortExp}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Wait Time</span>
                      <SourcedDisplay
                        value={waitVal}
                        status={waitStatus}
                        url={waitUrl}
                        explanation={waitExp}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100/70 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Gate: </span>
                      <span className="text-slate-700 font-medium text-xs">{gateVal}</span>
                    </div>
                    <span className="text-blue-600 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform text-xs">
                      <span>Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
