import React from 'react';
import { DifficultyLevel } from '../types/oauth';

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function normalizeDifficulty(diff?: string): DifficultyLevel {
  if (!diff) return '2 Moderate';
  const clean = diff.trim();
  if (clean === '1 Easy' || clean.toLowerCase() === 'easy') return '1 Easy';
  if (clean === '2 Moderate' || clean.toLowerCase() === 'moderate' || clean.toLowerCase() === 'medium') return '2 Moderate';
  if (clean === '3 Hard' || clean.toLowerCase() === 'hard') return '3 Hard';
  if (clean === '4 Very hard' || clean.toLowerCase().includes('very hard')) return '4 Very hard';
  if (clean === '5 Partner-gated / uncertain' || clean.toLowerCase().includes('partner') || clean.toLowerCase().includes('uncertain')) return '5 Partner-gated / uncertain';
  return '2 Moderate';
}

export function DifficultyBadge({
  difficulty,
  className = '',
  size = 'md',
}: DifficultyBadgeProps) {
  const normalized = normalizeDifficulty(difficulty);

  let colorClasses = '';
  switch (normalized) {
    case '1 Easy':
      colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-500/20';
      break;
    case '2 Moderate':
      colorClasses = 'bg-yellow-50 text-yellow-800 border-yellow-300 ring-yellow-500/20';
      break;
    case '3 Hard':
      colorClasses = 'bg-orange-50 text-orange-800 border-orange-300 ring-orange-500/20';
      break;
    case '4 Very hard':
      colorClasses = 'bg-red-50 text-red-800 border-red-300 ring-red-500/20';
      break;
    case '5 Partner-gated / uncertain':
      colorClasses = 'bg-rose-100 text-rose-950 border-rose-400 ring-rose-500/20 font-extrabold';
      break;
  }

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[10px]'
      : size === 'lg'
      ? 'px-3 py-1 text-xs font-bold'
      : 'px-2.5 py-0.5 text-[11px] font-semibold';

  return (
    <span
      className={`inline-flex items-center rounded-md border font-sans tracking-wide uppercase shadow-2xs ${colorClasses} ${sizeClasses} ${className}`}
      title={`OAuth approval model difficulty: ${normalized}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 opacity-75"
        style={{
          backgroundColor:
            normalized === '1 Easy'
              ? '#059669'
              : normalized === '2 Moderate'
              ? '#ca8a04'
              : normalized === '3 Hard'
              ? '#ea580c'
              : normalized === '4 Very hard'
              ? '#dc2626'
              : '#881337',
        }}
      />
      {normalized}
    </span>
  );
}
