import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Zap,
  Lock,
  FileCheck
} from 'lucide-react';
import { OAuthGuide } from '../types/oauth';
import { RecentlyViewedItem } from '../lib/storage';
import { ActivePage } from './Sidebar';
import { DifficultyBadge } from './DifficultyBadge';
import { EvidenceBadge } from './EvidenceBadge';
import { AppLogo } from './AppLogo';

interface DashboardViewProps {
  allGuides: OAuthGuide[];
  recentlyViewed: RecentlyViewedItem[];
  onSelectGuide: (guide: OAuthGuide) => void;
  onNavigate: (page: ActivePage) => void;
  onOpenSearch: () => void;
}

export function DashboardView({
  allGuides,
  recentlyViewed,
  onSelectGuide,
  onNavigate,
  onOpenSearch,
}: DashboardViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Quick stats
  const totalGuides = allGuides.length;
  const verifiedCount = allGuides.filter(g => g.sourceType === 'verified').length;
  const aiGeneratedCount = allGuides.filter(g => g.sourceType === 'ai_generated').length;

  // Filtered for inline dashboard search if user types directly
  const inlineFiltered = searchTerm.trim()
    ? allGuides.filter(
        g =>
          g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          g.scopes?.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const featuredGuides = allGuides.filter(g => g.featured);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-50/60 via-white to-white border border-blue-100/80 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Developer OAuth 2.0 & Verification Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Stop guessing OAuth review requirements.
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            Evidence-backed setup roadmaps, verified verification guidelines, scope risk classification, and CASA/SOC2 audit timelines for every identity provider.
          </p>

          {/* Large Hero Search Bar */}
          <div className="pt-2">
            <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 bg-white transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search any provider (Notion, Figma, Slack, Google Drive, HubSpot)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full py-3.5 pl-3 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mr-3 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => {
                  if (inlineFiltered.length > 0) {
                    onSelectGuide(inlineFiltered[0]);
                  } else {
                    onOpenSearch();
                  }
                }}
                className="mr-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Find Guide
              </button>
            </div>

            {/* Inline search dropdown results if user typed */}
            {searchTerm.trim() && (
              <div className="mt-2 bg-white rounded-xl border border-slate-200 shadow-lg p-2 max-h-60 overflow-y-auto space-y-1">
                {inlineFiltered.length === 0 ? (
                  <div className="p-3 text-xs text-slate-500 text-center">
                    No matching guides found for &quot;{searchTerm}&quot;.
                    <button
                      onClick={() => onNavigate('generator')}
                      className="text-blue-600 hover:underline ml-1 font-medium"
                    >
                      Generate with AI →
                    </button>
                  </div>
                ) : (
                  inlineFiltered.map(g => (
                    <div
                      key={g.id}
                      onClick={() => onSelectGuide(g)}
                      className="p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2.5">
                        <AppLogo
                          name={g.name}
                          slug={g.slug}
                          brandColor={g.brandColor}
                          logoUrl={g.logoUrl}
                          website={g.sources?.[0]?.url}
                          size="sm"
                        />
                        <div>
                          <span className="font-semibold text-xs text-slate-900">{g.name}</span>
                          <span className="text-[10px] text-slate-400 ml-2">{g.category}</span>
                        </div>
                      </div>
                      <DifficultyBadge difficulty={g.difficulty} size="sm" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Guides</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalGuides}</div>
          <span className="text-[11px] text-slate-500">Documented providers</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Verified Audits</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">{verifiedCount}</div>
          <span className="text-[11px] text-slate-500">Official documentation</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Instant Self-Serve</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {allGuides.filter(g => (g.approvalGate?.value || g.approvalType || '').toLowerCase().includes('self-serve')).length}
          </div>
          <span className="text-[11px] text-slate-500">Zero approval waiting</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Audited CASA/SOC2</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">
            {allGuides.filter(g => (g.difficulty || '').includes('Very hard') || (g.approvalGate?.value || '').toLowerCase().includes('casa')).length}
          </div>
          <span className="text-[11px] text-slate-500">Strict third-party labs</span>
        </div>
      </div>

      {/* Featured Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-slate-600" />
            <h2 className="text-base font-bold text-slate-900">Featured OAuth Applications</h2>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
          >
            <span>View all in directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredGuides.map(guide => {
            const effortVal = guide.setupEffort?.value || guide.estimatedDevTime || 'Not published';
            const waitVal = guide.approvalWait?.value || guide.estimatedReviewTime || 'Not published';
            const gateVal = guide.approvalGate?.value || guide.approvalType || 'Self-serve';

            return (
              <div
                key={guide.id}
                onClick={() => onSelectGuide(guide)}
                className="group bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer relative"
              >
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
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                          {guide.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{guide.category}</p>
                    </div>
                  </div>

                  <DifficultyBadge difficulty={guide.difficulty} size="sm" />
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {guide.tagline}
                </p>

                {/* Specs Grid */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Effort</span>
                    <span className="font-semibold text-slate-800">{effortVal}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Wait Time</span>
                    <span className="font-semibold text-slate-800 truncate block" title={waitVal}>
                      {waitVal.split('|')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Approval Gate</span>
                    <span className="font-semibold text-blue-700 truncate block" title={gateVal}>
                      {gateVal.split('/')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Viewed & AI Generator CTA Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Viewed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 text-sm">Recently Viewed Guides</h3>
            </div>
            <span className="text-xs text-slate-400">{recentlyViewed.length} viewed</span>
          </div>

          {recentlyViewed.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
              No recently viewed guides yet. Click any application in the directory to explore!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentlyViewed.map(item => {
                const fullGuide = allGuides.find(g => g.slug === item.slug);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (fullGuide) onSelectGuide(fullGuide);
                    }}
                    className="py-3 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-slate-800">{item.name}</span>
                        <span className="text-[10px] text-slate-400">• {item.category}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {item.difficulty} • Viewed {new Date(item.viewedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-blue-600 font-medium">
                      <span>Resume</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Guide Generator Promo Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[11px] font-medium border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>AI Research Agent</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              Need a guide for Zoom, Asana, or Shopify?
            </h3>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Research official OAuth 2.0 endpoints, approval wait policies, and evidence citations in real-time.
            </p>
          </div>

          <div className="pt-5">
            <button
              onClick={() => onNavigate('generator')}
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-900 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Launch AI Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
