import React from 'react';
import { ExternalLink, Info, CheckCircle2, HelpCircle, FileText } from 'lucide-react';
import { EvidenceStatus } from '../types/oauth';

interface EvidenceBadgeProps {
  status: EvidenceStatus;
  url?: string;
  explanation?: string;
  className?: string;
  compact?: boolean;
}

export function EvidenceBadge({
  status,
  url,
  explanation,
  className = '',
  compact = false,
}: EvidenceBadgeProps) {
  let badgeStyle = '';
  let label = '';
  let Icon = FileText;

  switch (status) {
    case 'primary-docs':
      badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/70';
      label = compact ? 'primary-docs' : 'primary-docs';
      Icon = CheckCircle2;
      break;
    case 'secondary':
      badgeStyle = 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100/70';
      label = compact ? 'secondary' : 'secondary';
      Icon = FileText;
      break;
    case 'inferred':
      badgeStyle = 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/70';
      label = compact ? 'inferred' : 'inferred';
      Icon = Info;
      break;
    case 'unverified':
    default:
      badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200/60';
      label = compact ? 'unverified' : 'unverified';
      Icon = HelpCircle;
      break;
  }

  const tooltipTitle =
    status === 'primary-docs'
      ? `Stated in provider official docs${url ? `: ${url}` : ''}`
      : status === 'secondary'
      ? `Third-party verified source${url ? `: ${url}` : ''}`
      : status === 'inferred'
      ? `Inferred: ${explanation || 'Concluded from absence in official documentation'}`
      : 'Unverified: Could not confirm in published documentation. Displayed as Not published.';

  const content = (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border transition-colors select-none ${badgeStyle} ${className}`}
      title={tooltipTitle}
    >
      <Icon className="w-2.5 h-2.5 shrink-0 opacity-80" />
      <span className="font-mono tracking-tight">{label}</span>
      {url && (
        <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70 ml-0.5" />
      )}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className="inline-flex items-center hover:opacity-90"
        title={tooltipTitle}
      >
        {content}
      </a>
    );
  }

  return content;
}

interface SourcedDisplayProps {
  value: string;
  status: EvidenceStatus;
  url?: string;
  explanation?: string;
  className?: string;
  valueClassName?: string;
  isTableLayout?: boolean;
}

export function SourcedDisplay({
  value,
  status,
  url,
  explanation,
  className = '',
  valueClassName = '',
  isTableLayout = false,
}: SourcedDisplayProps) {
  const displayVal = (!value || status === 'unverified' || value.toLowerCase().includes('not published'))
    ? 'Not published'
    : value;

  const isNotPublished = displayVal === 'Not published';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className={`font-medium ${isNotPublished ? 'text-slate-400 italic font-normal' : 'text-slate-800'} ${valueClassName}`}>
        {displayVal}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <EvidenceBadge status={status} url={url} explanation={explanation} />
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-[10px] text-blue-600 hover:text-blue-800 underline truncate max-w-[120px]"
            title={`Source: ${url}`}
          >
            source
          </a>
        )}
        {status === 'inferred' && explanation && (
          <span
            className="text-[10px] text-slate-500 truncate max-w-[150px] cursor-help"
            title={`Inferred: ${explanation}`}
          >
            ({explanation.slice(0, 30)}...)
          </span>
        )}
      </div>
    </div>
  );
}
