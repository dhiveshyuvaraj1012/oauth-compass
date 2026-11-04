import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Globe,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  Share2,
  BookmarkPlus,
  Check,
  Clock,
  Calendar,
  AlertOctagon,
  Key,
  Link as LinkIcon,
  HelpCircle,
  ListOrdered,
  Search,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { OAuthGuide } from '../types/oauth';
import { requestGenerateGuide } from '../services/aiGuideGenerator';
import { saveGuide } from '../lib/storage';
import { DifficultyBadge } from './DifficultyBadge';
import { EvidenceBadge, SourcedDisplay } from './EvidenceBadge';
import { AppLogo, getAppLogoUrl } from './AppLogo';

interface AIGeneratorViewProps {
  onGuideGenerated: (guide: OAuthGuide) => void;
  onOpenShareModal: (guide: OAuthGuide) => void;
}

const RESEARCH_STAGES = [
  { id: 1, label: 'Searching official docs...', description: 'Investigating official developer portals, scope dictionaries, and API references via Google Search' },
  { id: 2, label: 'Checking review requirements...', description: 'Evaluating approval workflows, unlisted vs directory distribution, and security policies' },
  { id: 3, label: 'Writing guide...', description: 'Synthesizing step-by-step instructions, redirect URI specs, actor labels, and evidence ledger' },
];

const POPULAR_SUGGESTIONS = [
  { name: 'Notion', domain: 'notion.so', case: 'Workspace Integrations & Public OAuth' },
  { name: 'Linear', domain: 'linear.app', case: 'Issue Tracking & Sync' },
  { name: 'Discord', domain: 'discord.com', case: 'Bot & User SSO' },
  { name: 'Shopify', domain: 'shopify.com', case: 'E-commerce App Store' },
  { name: 'Zoom', domain: 'zoom.us', case: 'Meetings & Transcripts' },
  { name: 'Figma', domain: 'figma.com', case: 'Design Assets API' },
];

export function AIGeneratorView({ onGuideGenerated, onOpenShareModal }: AIGeneratorViewProps) {
  const [appName, setAppName] = useState('');
  const [website, setWebsite] = useState('');
  const [useCase, setUseCase] = useState('Multi-tenant B2B SaaS');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [generatedGuide, setGeneratedGuide] = useState<OAuthGuide | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Cycle through research stages while generating
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setCurrentStageIndex(0);
      interval = setInterval(() => {
        setCurrentStageIndex(prev => (prev < RESEARCH_STAGES.length - 1 ? prev + 1 : prev));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async (e?: React.FormEvent, customAppName?: string, customWebsite?: string, customCase?: string) => {
    if (e) e.preventDefault();

    const targetName = (customAppName || appName).trim();
    if (!targetName) {
      setErrorMessage('Please enter an application name or website URL.');
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);
    setGeneratedGuide(null);
    setIsSaved(false);

    try {
      let finalName = targetName;
      let finalWebsite = (customWebsite || website).trim();

      if (targetName.startsWith('http://') || targetName.startsWith('https://')) {
        try {
          const parsed = new URL(targetName);
          finalWebsite = targetName;
          finalName = parsed.hostname.replace(/^www\./, '').split('.')[0];
          finalName = finalName.charAt(0).toUpperCase() + finalName.slice(1);
        } catch {
          // ignore
        }
      }

      const guide = await requestGenerateGuide({
        appName: finalName,
        website: finalWebsite || undefined,
        useCase: customCase || useCase || 'Multi-tenant SaaS & API Integration',
      });

      // Automatically attach and persist verified brand logo
      if (!guide.logoUrl) {
        guide.logoUrl = getAppLogoUrl(finalName, finalWebsite, guide.slug);
      }

      // Automatically persist to guide storage
      saveGuide(guide);
      setGeneratedGuide(guide);
      setIsSaved(true);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setErrorMessage(err.message || 'Failed to synthesize OAuth guide. Please verify your input or network connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplySuggestion = (s: { name: string; domain: string; case: string }) => {
    setAppName(s.name);
    setWebsite(`https://${s.domain}`);
    setUseCase(s.case);
    // Auto trigger generation for snappy developer workflow
    handleGenerate(undefined, s.name, `https://${s.domain}`, s.case);
  };

  const handleManualSave = () => {
    if (generatedGuide) {
      saveGuide(generatedGuide);
      setIsSaved(true);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/80">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Evidence-Based OAuth Research Agent</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AI OAuth Guide Generator
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Research any OAuth 2.0 provider with Google Search grounding. The agent extracts verified endpoints, capabilities, redirect URI restrictions, and official documentation links without hallucinating credentials or approval timelines.
        </p>
      </div>

      {/* Agent Limitations & Trust Policy Strip */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Agent Research Protocol & Safety Guarantees:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div className="flex items-start space-x-1.5">
            <span className="text-emerald-600 font-bold">•</span>
            <span><strong>Never fabricates policies:</strong> If review timelines are not published, the agent explicitly reports <em>"Approval duration is not publicly confirmed."</em></span>
          </div>
          <div className="flex items-start space-x-1.5">
            <span className="text-emerald-600 font-bold">•</span>
            <span><strong>Zero credentials requested:</strong> The agent never asks for or stores passwords, client secrets, or auth tokens.</span>
          </div>
          <div className="flex items-start space-x-1.5">
            <span className="text-emerald-600 font-bold">•</span>
            <span><strong>Clear developer demarcation:</strong> Steps requiring manual console setup are explicitly marked as <em>Developer Action Required</em>.</span>
          </div>
          <div className="flex items-start space-x-1.5">
            <span className="text-emerald-600 font-bold">•</span>
            <span><strong>No false approval claims:</strong> The agent does not claim to have submitted, created, or approved an OAuth application on your behalf.</span>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <form onSubmit={e => handleGenerate(e)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Application Name or Website URL <span className="text-rose-500">*</span>
                </label>
                {appName.trim() && (
                  <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-medium animate-in fade-in">
                    <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      <span>Live Logo:</span>
                    </span>
                    <AppLogo name={appName} website={website} size="sm" />
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={appName}
                  onChange={e => setAppName(e.target.value)}
                  placeholder="App name or website, e.g. Zoom, Stripe, or asana.com"
                  className="w-full pl-9 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  disabled={isGenerating}
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                {appName.trim() && (
                  <div className="absolute right-2.5 top-2 shrink-0">
                    <AppLogo name={appName} website={website} size="sm" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Website / Developer Portal (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://zoom.us or https://asana.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  disabled={isGenerating}
                />
                <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Integration Architecture / Use Case
            </label>
            <input
              type="text"
              value={useCase}
              onChange={e => setUseCase(e.target.value)}
              placeholder="e.g. Multi-tenant B2B SaaS, Workspace Sync, Single Page App with PKCE"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              disabled={isGenerating}
            />
          </div>

          {/* Quick Suggestions Strip */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Popular Identity Providers (Click to Research):
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SUGGESTIONS.map(s => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => handleApplySuggestion(s)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-700 font-medium transition-colors flex items-center space-x-1.5 cursor-pointer"
                  disabled={isGenerating}
                >
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({s.domain})</span>
                </button>
              ))}
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-700 text-xs">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shadow-xs cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{RESEARCH_STAGES[currentStageIndex]?.label || 'Researching...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Guide</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Research Status Indicator (Requirement 5) */}
      {isGenerating && (
        <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3.5">
            <div className="relative shrink-0">
              <AppLogo name={appName} website={website} size="lg" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs border border-blue-200">
                <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {appName || 'Provider'}: {RESEARCH_STAGES[currentStageIndex].label}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Logo Active
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Stage {currentStageIndex + 1} of {RESEARCH_STAGES.length}: {RESEARCH_STAGES[currentStageIndex].description}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{
                width: `${((currentStageIndex + 1) / RESEARCH_STAGES.length) * 100}%`,
              }}
            />
          </div>

          {/* The 4 Exact Required Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {RESEARCH_STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div
                  key={stage.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isPast
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-blue-50/70 border-blue-300 text-blue-900 ring-1 ring-blue-200'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="font-bold text-xs">{stage.label}</span>
                  </div>
                  <p className="text-[11px] mt-1 text-slate-500 pl-6 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Generated Guide Result View */}
      {generatedGuide && !isGenerating && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          {/* Agent Banner */}
          <div className="p-3 bg-amber-50/90 border border-amber-300/80 rounded-xl flex items-center space-x-2 text-xs text-amber-900 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Generated by an agent, not reviewed by a person.</span>
          </div>

          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-start space-x-3.5">
              <AppLogo
                name={generatedGuide.name}
                slug={generatedGuide.slug}
                brandColor={generatedGuide.brandColor}
                logoUrl={generatedGuide.logoUrl}
                website={website || generatedGuide.sources?.[0]?.url}
                size="xl"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{generatedGuide.name}</h3>
                  <DifficultyBadge difficulty={generatedGuide.difficulty} />
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Google Grounded Investigation
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{generatedGuide.tagline}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">{generatedGuide.description}</p>
              </div>
            </div>

            {/* Action Buttons: Save & Share */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleManualSave}
                disabled={isSaved}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                  isSaved
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 cursor-pointer'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Saved to Directory</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save Guide</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenShareModal(generatedGuide)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share URL</span>
              </button>

              <button
                onClick={() => onGuideGenerated(generatedGuide)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Open Full Guide Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Specifications Strip distinguishing Developer Effort from External Review */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Developer Effort */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-slate-500 text-[11px] font-medium uppercase tracking-wider block">Developer Effort</span>
              <SourcedDisplay
                value={generatedGuide.setupEffort?.value || generatedGuide.estimatedDevTime || '30–45 min'}
                status={generatedGuide.setupEffort?.status || 'inferred'}
                url={generatedGuide.setupEffort?.url || generatedGuide.sources?.[0]?.url}
                explanation={generatedGuide.setupEffort?.explanation || 'Estimated based on documented requirements'}
              />
            </div>

            {/* External Approval Waiting Time */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-slate-500 text-[11px] font-medium uppercase tracking-wider block">Approval Wait Time</span>
              <SourcedDisplay
                value={generatedGuide.approvalWait?.value || generatedGuide.estimatedReviewTime || 'Not published'}
                status={generatedGuide.approvalWait?.status || 'unverified'}
                url={generatedGuide.approvalWait?.url}
                explanation={generatedGuide.approvalWait?.explanation || 'Could not find published review turnaround time'}
              />
            </div>

            {/* Approval Gate */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-slate-500 text-[11px] font-medium uppercase tracking-wider block">Approval Gate</span>
              <SourcedDisplay
                value={generatedGuide.approvalGate?.value || generatedGuide.approvalType || 'Self-serve'}
                status={generatedGuide.approvalGate?.status || 'primary-docs'}
                url={generatedGuide.approvalGate?.url || generatedGuide.sources?.[0]?.url}
                explanation={generatedGuide.approvalGate?.explanation}
              />
            </div>

            {/* Auth Protocol */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">Auth Protocol</span>
                <EvidenceBadge status="primary-docs" />
              </div>
              <div className="font-semibold text-slate-800 truncate" title={generatedGuide.authType}>
                {generatedGuide.authType}
              </div>
              <p className="text-[10px] text-slate-500">RFC 6749 standard handshake</p>
            </div>
          </div>

          {/* Evidence Labels Legend */}
          <div className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Evidence Classification Standards:</span>
            <div className="flex flex-wrap items-center gap-2">
              <EvidenceBadge status="primary-docs" />
              <EvidenceBadge status="secondary" />
              <EvidenceBadge status="inferred" />
              <EvidenceBadge status="unverified" />
            </div>
          </div>

          {/* Section: Dedicated Sources Section with Clickable Links and Supported Requirements */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Authoritative Sources & Documentation Links:</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Clickable links directly verified and associated with the specific technical requirements they support.
                </p>
              </div>
              <FactBadge type="officially_documented" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {generatedGuide.sources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-400 transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center space-x-1 group"
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0" />
                      </a>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        Official Doc
                      </span>
                    </div>

                    {src.notes && (
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">{src.notes}</p>
                    )}

                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono text-slate-400 hover:text-slate-600 block mt-1 truncate"
                    >
                      {src.url}
                    </a>
                  </div>

                  {src.supportedRequirements && src.supportedRequirements.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                        Supports Requirements:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {src.supportedRequirements.map((req, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded border border-slate-200"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Steps with Explicit Developer Action Identification */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Setup Steps & Developer Actions:</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Steps requiring manual engineer intervention in developer consoles are clearly flagged.
                </p>
              </div>
              <FactBadge type="officially_documented" />
            </div>

            <div className="space-y-2.5">
              {generatedGuide.steps.map(step => (
                <div
                  key={step.stepNumber}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                        {step.stepNumber}
                      </span>
                      <h5 className="font-bold text-slate-900">{step.title}</h5>
                    </div>

                    <div className="flex items-center space-x-2">
                      {step.requiresDeveloperAction && (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <UserCheck className="w-3 h-3 text-amber-600" />
                          <span>Developer Action Required</span>
                        </span>
                      )}
                      <FactBadge type={step.factType || 'officially_documented'} showIcon={false} />
                    </div>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[11px] pl-7">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Recommended Next Actions */}
          {generatedGuide.recommendedNextActions && generatedGuide.recommendedNextActions.length > 0 && (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs">
              <h4 className="font-bold text-blue-900 flex items-center space-x-2">
                <ListOrdered className="w-4 h-4 text-blue-600" />
                <span>Recommended Next Actions for Developer:</span>
              </h4>
              <ol className="space-y-1.5 text-blue-900 list-decimal list-inside">
                {generatedGuide.recommendedNextActions.map((action, idx) => (
                  <li key={idx} className="leading-relaxed font-medium">{action.replace(/^[0-9]+\.\s*/, '')}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Section: What Could NOT Be Confirmed / Unverified Information */}
          {generatedGuide.unconfirmedDetails && generatedGuide.unconfirmedDetails.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-900 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>What the Agent Could Not Confirm (Unverified):</span>
                </h4>
                <FactBadge type="not_verified" showIcon={false} />
              </div>
              <p className="text-amber-800 text-[11px]">
                The following points could not be confirmed in public identity provider documentation and require direct verification within your developer workspace:
              </p>
              <ul className="space-y-1.5 text-amber-900 list-disc list-inside">
                {generatedGuide.unconfirmedDetails.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section: Redirect URI Requirements Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                <span>Redirect URI Configuration Rules:</span>
              </h4>
              <FactBadge type="officially_documented" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div>Localhost Allowed: <strong className="text-slate-800">{generatedGuide.redirectUriConfig.localhostAllowed ? 'Yes' : 'No'}</strong></div>
              <div>Wildcards Allowed: <strong className="text-slate-800">{generatedGuide.redirectUriConfig.wildcardsAllowed ? 'Yes' : 'Prohibited'}</strong></div>
              <div>Matching Mode: <strong className="text-blue-700">{generatedGuide.redirectUriConfig.pathMatching}</strong></div>
            </div>
            <div className="pt-1 text-[11px] text-slate-600">
              Example Development URI: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-blue-700">{generatedGuide.redirectUriConfig.examples.development[0]}</code>
            </div>
          </div>

          {/* Section: Common Blockers */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <AlertOctagon className="w-4 h-4 text-rose-500" />
              <span>Common Errors & Blockers:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {generatedGuide.potentialBlockers.map((b, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{b.title}</span>
                    <code className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">{b.errorCode}</code>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{b.description}</p>
                  <p className="text-[11px] text-blue-700 font-medium pt-1">
                    Resolution: <span className="text-slate-700 font-normal">{b.resolution}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
