import { useState } from 'react';
import { X, Database, Check, Copy, Terminal, ExternalLink } from 'lucide-react';
import { getSupabaseMigrationSQL } from '../lib/storage';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupabaseModal({ isOpen, onClose }: SupabaseModalProps) {
  const [copied, setCopied] = useState(false);
  const sql = getSupabaseMigrationSQL();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Supabase-Ready Architecture</h3>
              <p className="text-xs text-slate-500">PostgreSQL schema, RLS policies, and data synchronization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs text-emerald-900">
            <p className="font-semibold mb-1">Production Database Blueprint Included</p>
            <p className="text-emerald-800 leading-relaxed">
              OAuth Compass is designed with clean Supabase abstraction. Currently running with a responsive client-side persistence engine. You can copy the SQL below and run it directly in your Supabase SQL Editor to enable cloud synchronization!
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>Supabase PostgreSQL Migration SQL</span>
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied SQL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Schema</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-lg bg-slate-950 p-3 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-64 leading-relaxed border border-slate-800">
              <pre>{sql}</pre>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-800 block mb-1">Tables Included:</span>
              <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                <li><code>public.oauth_guides</code> (JSONB endpoints & scopes)</li>
                <li><code>public.user_guide_progress</code> (Checklist status)</li>
              </ul>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-800 block mb-1">Security:</span>
              <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                <li>Row Level Security (RLS) enabled</li>
                <li>Public read access policy</li>
                <li>Authenticated user progress isolation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <a
            href="https://supabase.com/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>Supabase Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
