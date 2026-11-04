import { useState } from 'react';
import { Check, Copy, X, Share2, Download, ExternalLink, Globe, Printer } from 'lucide-react';
import { OAuthGuide } from '../types/oauth';
import { DifficultyBadge } from './DifficultyBadge';
import { generatePrintableHtml } from '../lib/pdfReportGenerator';

interface ShareModalProps {
  guide: OAuthGuide;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ guide, isOpen, onClose }: ShareModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [downloadedPdf, setDownloadedPdf] = useState(false);

  if (!isOpen) return null;

  // Build the clean, unique URL for this guide
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const shareableUrl = `${currentOrigin}/guide/${encodeURIComponent(guide.slug)}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const generateMarkdown = () => {
    return `# ${guide.name} — OAuth 2.0 Integration & Verification Guide
> ${guide.tagline}

- **Difficulty**: ${guide.difficulty}
- **Estimated Dev Time**: ${guide.estimatedDevTime}
- **Provider Approval Review Time**: ${guide.estimatedReviewTime}
- **Approval Type**: ${guide.approvalType}
- **Auth Flow**: ${guide.authType}
- **Data Source**: ${guide.sourceType === 'verified' ? 'Verified Documentation Research' : 'AI Synthesized Documentation Audit'}

## Authorization Endpoints
- **Authorize URL**: \`${guide.endpoints.authorizationUrl}\`
- **Token URL**: \`${guide.endpoints.tokenUrl}\`
${guide.endpoints.userInfoUrl ? `- **UserInfo URL**: \`${guide.endpoints.userInfoUrl}\`` : ''}

## Prerequisites
${guide.prerequisites.map(p => `- [${p.required ? 'x' : ' '}] **${p.title}**: ${p.description}`).join('\n')}

## Scopes
| Scope | Risk Level | Description |
|---|---|---|
${guide.scopes.map(s => `| \`${s.name}\` | ${s.riskLevel} | ${s.description} |`).join('\n')}

## Potential Blockers
${guide.potentialBlockers.map(b => `### [${b.severity}] ${b.title}\n${b.description}\n**Resolution:** ${b.resolution}\n`).join('\n')}

Generated via OAuth Compass — ${shareableUrl}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${guide.slug}-oauth-guide.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    try {
      const html = generatePrintableHtml(guide);
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${guide.slug}-oauth-guide-report.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      try {
        const printWin = window.open(url, '_blank');
        if (printWin) printWin.focus();
      } catch {}

      setDownloadedPdf(true);
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setDownloadedPdf(false);
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Share Guide</h3>
              <p className="text-xs text-slate-500">Share or export the {guide.name} OAuth setup roadmap</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Unique Share URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Shareable Direct Link
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value={shareableUrl}
                  className="w-full pl-8 pr-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
                />
                <Globe className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              </div>
              <button
                onClick={handleCopyUrl}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500">
              Anyone with this link will open directly to this guide.
            </p>
          </div>

          {/* Quick Specs summary pill */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-slate-800">{guide.name}</span>
              <span className="text-slate-300">•</span>
              <DifficultyBadge difficulty={guide.difficulty} size="sm" />
              <span className="text-slate-300">•</span>
              <span>{guide.setupEffort?.value || guide.estimatedDevTime}</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700">
              {guide.approvalType}
            </span>
          </div>

          {/* Export Options */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Developer Export & PDF
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={handleDownloadPdf}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold text-blue-700 transition-colors"
              >
                {downloadedPdf ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PDF Ready</span>
                  </>
                ) : (
                  <>
                    <Printer className="w-3.5 h-3.5 text-blue-600" />
                    <span>Print / PDF</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                {copiedMarkdown ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy MD</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadMarkdown}
                className="flex items-center justify-center space-x-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Data type: {guide.sourceType === 'verified' ? 'Verified Research' : 'AI Synthesized'}
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
