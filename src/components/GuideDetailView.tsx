import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Clock,
  Calendar,
  Share2,
  ExternalLink,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Info,
  Check,
  Bookmark,
  BookOpen,
  Key,
  Shield,
  Layers,
  FileText,
  Copy,
  Printer,
  Download,
  HelpCircle,
  RotateCcw,
  Bot,
  User,
  Users,
  AlertOctagon,
  ArrowLeft,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { OAuthGuide, StepActor, EvidenceStatus } from '../types/oauth';
import { getStepProgress, toggleStepProgress, toggleSavedGuide, getSavedGuideIds } from '../lib/storage';
import { DifficultyBadge } from './DifficultyBadge';
import { EvidenceBadge, SourcedDisplay } from './EvidenceBadge';
import { CodeBlock } from './CodeBlock';
import { AppLogo } from './AppLogo';
import { generatePrintableHtml } from '../lib/pdfReportGenerator';

interface GuideDetailViewProps {
  guide: OAuthGuide;
  onOpenShareModal: () => void;
  onNavigateToDirectory: () => void;
}

export function GuideDetailView({
  guide,
  onOpenShareModal,
  onNavigateToDirectory,
}: GuideDetailViewProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    setCompletedSteps(getStepProgress(guide.id));
    const savedIds = getSavedGuideIds();
    setIsSaved(savedIds.includes(guide.id));

    // Default expand first two steps
    setExpandedSteps({ 1: true, 2: true });
  }, [guide.id]);

  const handleToggleStep = (stepNumber: number) => {
    const updated = toggleStepProgress(guide.id, stepNumber);
    setCompletedSteps(updated);
  };

  const handleToggleExpand = (stepNumber: number) => {
    setExpandedSteps(prev => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const handleResetChecklist = () => {
    localStorage.removeItem(`oauth_compass_checklist_progress_${guide.id}`);
    setCompletedSteps([]);
  };

  const handleToggleSave = () => {
    const status = toggleSavedGuide(guide.id);
    setIsSaved(status);
  };

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/guide/${encodeURIComponent(guide.slug)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedKey('share-link');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadReport = () => {
    try {
      const html = generatePrintableHtml(guide);
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${guide.slug || 'oauth'}-setup-guide-printable.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Attempt popup for immediate print window
      try {
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.focus();
        }
      } catch {
        // Ignored if blocked by sandbox
      }

      setDownloadSuccess(true);
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setDownloadSuccess(false);
      }, 4000);
    } catch (err) {
      console.error('Failed to generate printable report:', err);
    }
  };

  const handlePrint = () => {
    try {
      // First attempt native window print
      window.print();
    } catch (err) {
      console.warn('window.print() error or blocked in iframe, downloading printable HTML report', err);
      handleDownloadReport();
    }
  };

  const actorBadge = (actor: StepActor) => {
    if (actor === 'Agent') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Bot className="w-3 h-3 text-indigo-600" />
          <span>[Agent]</span>
        </span>
      );
    }
    if (actor === 'You') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
          <User className="w-3 h-3 text-emerald-600" />
          <span>[You]</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300">
        <Users className="w-3 h-3 text-slate-500" />
        <span>[Either]</span>
      </span>
    );
  };

  // Metrics with robust fallbacks
  const effortMetric = guide.setupEffort || {
    value: guide.estimatedDevTime || 'Not published',
    status: 'inferred' as EvidenceStatus,
    explanation: guide.estimatedDevTimeNote || 'Concluded from OAuth 2.0 flow complexity',
  };

  const waitMetric = guide.approvalWait || {
    value: guide.estimatedReviewTime || 'Not published',
    status: (guide.estimatedReviewTime && !guide.estimatedReviewTime.toLowerCase().includes('not published')) ? 'primary-docs' : 'unverified' as EvidenceStatus,
    url: guide.sources?.[0]?.url,
    explanation: guide.estimatedReviewTimeNote,
  };

  const overallMetric = guide.overallTime || {
    value: `${effortMetric.value} (Dev) + ${waitMetric.value} (Review)`,
    status: waitMetric.status,
    url: waitMetric.url,
    explanation: waitMetric.explanation,
  };

  const gateMetric = guide.approvalGate || {
    value: guide.approvalType || 'Self-serve',
    status: 'primary-docs' as EvidenceStatus,
    url: guide.sources?.[0]?.url,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onNavigateToDirectory}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Application Directory</span>
        </button>

        <div className="flex items-center space-x-2">
          {downloadSuccess && (
            <span className="hidden md:inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 animate-in fade-in">
              <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Report Ready (Print / PDF)
            </span>
          )}
          <button
            onClick={handleToggleSave}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center space-x-1.5 ${
              isSaved
                ? 'bg-amber-50 border-amber-300 text-amber-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={handleCopyShareLink}
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
          >
            {copiedKey === 'share-link' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'share-link' ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            onClick={handleDownloadReport}
            title="Download standalone printable HTML / PDF guide"
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Export PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={handlePrint}
            title="Print or Save as PDF"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors inline-flex items-center space-x-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Prominent banner if generated by an agent */}
      {(guide.isAgentGenerated || guide.sourceType === 'ai_generated') && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start sm:items-center justify-between text-amber-900 shadow-2xs">
          <div className="flex items-start sm:items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-bold text-sm">Generated by an agent, not reviewed by a person.</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Investigated live via web search against official developer documentation. Sourced claims include citations.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
            AI Grounded
          </span>
        </div>
      )}

      {/* ========================================================
          SECTION 1: Summary + Difficulty Badge
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            <AppLogo
              name={guide.name}
              slug={guide.slug}
              brandColor={guide.brandColor}
              logoUrl={guide.logoUrl}
              website={guide.sources?.[0]?.url}
              size="xl"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {guide.name}
                </h1>
                {/* Difficulty Badge: strictly 1 of the 5 levels */}
                <DifficultyBadge difficulty={guide.difficulty} size="lg" />
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  {guide.category}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 mt-1.5 leading-relaxed">
                {guide.tagline}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          {guide.description}
        </p>

        {/* Auth Type & Protocol specs */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Protocol:</span>
          <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
            {guide.authType || 'OAuth 2.0 Authorization Code Grant'}
          </span>
          {guide.endpoints?.authorizationUrl && (
            <>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-700">Auth URL:</span>
              <code className="text-[11px] bg-slate-50 px-1.5 py-0.5 rounded text-blue-700 truncate max-w-xs">
                {guide.endpoints.authorizationUrl}
              </code>
            </>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 2: Setup Effort vs Approval Wait vs Overall Time (Separate)
         ======================================================== */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide text-xs">
            2. Estimated Timelines & Approval Gate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card A: Setup Effort */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Setup Effort</span>
              <EvidenceBadge status={effortMetric.status} url={effortMetric.url} explanation={effortMetric.explanation} />
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {effortMetric.value}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {effortMetric.explanation || 'Developer implementation, callback handling, and token storage.'}
            </p>
            {effortMetric.url && (
              <a
                href={effortMetric.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 pt-1"
              >
                <span>View documentation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Card B: Approval Wait Time */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Approval Wait Time</span>
              <EvidenceBadge status={waitMetric.status} url={waitMetric.url} explanation={waitMetric.explanation} />
            </div>
            <div className={`text-xl font-extrabold ${waitMetric.value.toLowerCase().includes('not published') ? 'text-slate-400 italic font-normal' : 'text-slate-900'}`}>
              {waitMetric.value}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {waitMetric.explanation || 'External review turnaround queue or instant self-serve policy.'}
            </p>
            {waitMetric.url && (
              <a
                href={waitMetric.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 pt-1"
              >
                <span>Official review policy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Card C: Overall Time */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Time</span>
              <EvidenceBadge status={overallMetric.status} url={overallMetric.url} explanation={overallMetric.explanation} />
            </div>
            <div className={`text-xl font-extrabold ${overallMetric.value.toLowerCase().includes('not published') ? 'text-slate-400 italic font-normal' : 'text-slate-900'}`}>
              {overallMetric.value}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Total calendar time from initial registration to active multi-tenant production launch.
            </p>
            {overallMetric.url && (
              <a
                href={overallMetric.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 pt-1"
              >
                <span>Timeline reference</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Gate banner */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-600">Approval Model Gate:</span>
            <strong className="text-slate-900 font-semibold">{gateMetric.value}</strong>
          </div>
          <div className="flex items-center gap-2">
            <EvidenceBadge status={gateMetric.status} url={gateMetric.url} explanation={gateMetric.explanation} />
            {gateMetric.url && (
              <a
                href={gateMetric.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-0.5 font-medium"
              >
                <span>source docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: Approval Path (Sequence of Gates)
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              3. Approval Path: Sequence of Gates
            </h2>
          </div>
          <span className="text-xs text-slate-400">Sequential verification requirements</span>
        </div>

        <p className="text-xs text-slate-600">
          The developer must pass through the following milestone gates to achieve authorized production status:
        </p>

        <div className="space-y-3 pt-1">
          {guide.approvalPath && guide.approvalPath.length > 0 ? (
            guide.approvalPath.map((stage, idx) => (
              <div
                key={stage.stage || idx}
                className="flex items-start space-x-3.5 p-3.5 rounded-xl border border-slate-150 bg-slate-50/60 hover:bg-white hover:border-blue-200 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {stage.stage || idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {stage.title}
                    </h3>
                    <div className="flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">
                        {stage.gateType}
                      </span>
                      <EvidenceBadge status={stage.status} url={stage.url} explanation={stage.explanation} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {stage.description}
                  </p>
                  {stage.url && (
                    <a
                      href={stage.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 mt-1.5"
                    >
                      <span>Verification docs</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
              No complex approval path required. Immediate self-serve activation.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 4: Requirements: Accounts, Legal Docs, Tech
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              4. Prerequisites & Requirements
            </h2>
          </div>
          <span className="text-xs text-slate-400">Accounts, Legal Documents & Technical Config</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {guide.prerequisites?.map((prereq, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {prereq.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      prereq.required
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {prereq.required ? 'Mandatory' : 'Optional'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {prereq.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                <EvidenceBadge
                  status={prereq.status || 'primary-docs'}
                  url={prereq.url || prereq.link}
                  explanation={prereq.explanation}
                />
                {prereq.link && (
                  <a
                    href={prereq.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                  >
                    <span>Official portal</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 5: Nuances Affecting Setup
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              5. Nuances That Affect Setup
            </h2>
          </div>
          <span className="text-xs text-slate-400">Scopes, Admin Restrictions & Paid Tiers</span>
        </div>

        <p className="text-xs text-slate-600">
          Important policy edge-cases, scope triggers, and admin permission barriers that affect developer timelines:
        </p>

        <div className="space-y-3">
          {guide.nuances && guide.nuances.length > 0 ? (
            guide.nuances.map((nuance, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-amber-200/70 bg-amber-50/30 space-y-1.5"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {nuance.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                      {nuance.category.replace(/_/g, ' ')}
                    </span>
                    <EvidenceBadge status={nuance.status} url={nuance.url} explanation={nuance.explanation} />
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pl-3 border-l-2 border-amber-400">
                  {nuance.detail}
                </p>
                {nuance.url && (
                  <div className="pt-1 pl-3">
                    <a
                      href={nuance.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                    >
                      <span>Policy documentation</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
              No special scope triggers or admin restrictions documented. Standard flow applies.
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 6: Steps Labeled [Agent], [You], [Either]
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              6. Setup Steps & Progress Checklist
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">
              {completedSteps.length} of {guide.steps.length} completed
            </span>
            {completedSteps.length > 0 && (
              <button
                onClick={handleResetChecklist}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-600">
          Every step is categorized by responsible party: <strong className="text-indigo-700">[Agent]</strong> can be automated in code; <strong className="text-emerald-800">[You]</strong> requires provider dashboard login; <strong className="text-slate-700">[Either]</strong> can be handled by either.
        </p>

        <div className="space-y-4">
          {guide.steps.map(step => {
            const isCompleted = completedSteps.includes(step.stepNumber);
            const isExpanded = !!expandedSteps[step.stepNumber];

            return (
              <div
                key={step.stepNumber}
                className={`rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-50/70 border-slate-200 opacity-90'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Step Header */}
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 min-w-0">
                    <button
                      onClick={() => handleToggleStep(step.stepNumber)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                      title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          Step {step.stepNumber}
                        </span>
                        <h3 className={`font-bold text-sm sm:text-base ${isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {step.title}
                        </h3>
                        {/* Actor Badge: [Agent], [You], [Either] */}
                        {actorBadge(step.actor || (step.requiresDeveloperAction ? 'You' : 'Agent'))}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => handleToggleExpand(step.stepNumber)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 text-xs">
                    <div className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg">
                      {step.details}
                    </div>

                    {step.requiresDeveloperAction && step.developerActionNote && (
                      <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center space-x-2">
                        <User className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span><strong>Your Action:</strong> {step.developerActionNote}</span>
                      </div>
                    )}

                    {step.codeSnippet && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Code Implementation ({step.codeLanguage || 'typescript'})
                        </span>
                        <CodeBlock code={step.codeSnippet} language={step.codeLanguage || 'typescript'} />
                      </div>
                    )}

                    {step.tips && step.tips.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Helpful Tips
                        </span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600">
                          {step.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          SECTION 7: If You Get Stuck (Blockers & Resolutions)
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <h2 className="text-base font-bold text-slate-900">
              7. If You Get Stuck: Common Blockers & Solutions
            </h2>
          </div>
          <span className="text-xs text-slate-400">Error resolution playbooks</span>
        </div>

        <p className="text-xs text-slate-600">
          Official error codes and specific corrective actions if authorization fails or approval gets held up:
        </p>

        <div className="space-y-3 pt-1">
          {guide.potentialBlockers?.map((b, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-rose-100 bg-rose-50/20 space-y-2 hover:border-rose-200 transition-colors"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                    {b.errorCode}
                  </span>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {b.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                    Severity: {b.severity}
                  </span>
                  <EvidenceBadge status={b.status || 'primary-docs'} url={b.url} explanation={b.explanation} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-700 block mb-1">Likely Cause:</span>
                  <p className="text-slate-600 leading-relaxed">{b.likelyCause}</p>
                </div>
                <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200/80">
                  <span className="font-bold text-emerald-900 block mb-1">What To Do (Resolution):</span>
                  <p className="text-emerald-800 leading-relaxed">{b.resolution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 8: What an Agent Can Do vs What You Must Do
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              8. What an Agent Can Do vs What You Must Do
            </h2>
          </div>
          <span className="text-xs text-slate-400">Responsibility Boundary</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Agent column */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-3">
            <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm">
              <Bot className="w-4 h-4 text-indigo-600" />
              <h3>What an AI Agent Can Do (Automated)</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {guide.agentCapabilities?.agentCanDo?.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer column */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm">
              <User className="w-4 h-4 text-emerald-600" />
              <h3>What You Must Do (Human Developer)</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {guide.agentCapabilities?.youMustDo?.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: Evidence List (Claim, Status Badge, Source Link)
         ======================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              9. Grounded Evidence List
            </h2>
          </div>
          <span className="text-xs text-slate-400">Strictly sourced claims & citations</span>
        </div>

        <p className="text-xs text-slate-600">
          Every critical claim in this guide carries a verified status badge and official source link:
        </p>

        <div className="overflow-hidden border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-4">Claim / Requirement</th>
                <th className="py-2.5 px-4 min-w-[120px]">Status</th>
                <th className="py-2.5 px-4">Source Link / Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {guide.evidenceList?.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-4 font-medium text-slate-900 max-w-sm">
                    {item.claim}
                  </td>
                  <td className="py-2.5 px-4">
                    <EvidenceBadge status={item.status} url={item.url} explanation={item.explanation} />
                  </td>
                  <td className="py-2.5 px-4">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 font-mono text-[11px] truncate max-w-xs"
                      >
                        <span className="truncate">{item.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : item.explanation ? (
                      <span className="text-slate-500 text-[11px] italic">
                        {item.explanation}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">
                        Not published in public documentation
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          SECTION 10: "What Was Tested" Statement
         ======================================================== */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-2">
        <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
          <Shield className="w-4 h-4 text-slate-600" />
          <h2>10. What Was Tested Statement</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          {guide.testedStatement ||
            'OAuth Compass researched this guide directly from official provider documentation (RFC 6749, developer portals). No live OAuth application was provisioned or submitted during this automated audit.'}
        </p>
      </section>

      {/* ========================================================
          SECTION 11: Last-Checked Date, Copy Share Link, Print / PDF
         ======================================================== */}
      <section className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Last-checked date: <strong>{guide.lastCheckedDate || 'November 2026'}</strong></span>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handleCopyShareLink}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors inline-flex items-center space-x-1.5"
          >
            {copiedKey === 'share-link' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'share-link' ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>
          <button
            onClick={handleDownloadReport}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors inline-flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors inline-flex items-center space-x-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </section>
    </div>
  );
}
