import React from 'react';
import { EvidenceStatus } from '../types/oauth';
import { EvidenceBadge } from './EvidenceBadge';

export function normalizeEvidenceStatus(raw?: string): EvidenceStatus {
  if (!raw) return 'unverified';
  const s = raw.toLowerCase().trim();
  if (s === 'primary-docs' || s === 'primary_docs' || s === 'officially_documented' || s === 'verified_fact' || s === 'official_policy') {
    return 'primary-docs';
  }
  if (s === 'secondary') {
    return 'secondary';
  }
  if (s === 'inferred' || s === 'estimate' || s === 'estimated_based_on_documented_requirements') {
    return 'inferred';
  }
  return 'unverified';
}

interface FactBadgeProps {
  type?: any;
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

export function FactBadge({
  type,
  status,
  url,
  explanation,
  className = '',
  compact = false,
}: FactBadgeProps) {
  const resolvedStatus: EvidenceStatus = status || normalizeEvidenceStatus(type);
  return (
    <EvidenceBadge
      status={resolvedStatus}
      url={url}
      explanation={explanation}
      className={className}
      compact={compact}
    />
  );
}
