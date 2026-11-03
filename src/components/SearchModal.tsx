import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import { OAuthGuide } from '../types/oauth';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  guides: OAuthGuide[];
  onSelectGuide: (guide: OAuthGuide) => void;
}

export function SearchModal({ isOpen, onClose, guides, onSelectGuide }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredGuides = guides.filter(g => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      g.name.toLowerCase().includes(q) ||
      g.tagline.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.difficulty.toLowerCase().includes(q) ||
      g.scopes.some(s => s.name.toLowerCase().includes(q)) ||
      g.potentialBlockers.some(b => b.errorCode.toLowerCase().includes(q) || b.title.toLowerCase().includes(q)) ||
      (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1 < filteredGuides.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : filteredGuides.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredGuides[selectedIndex]) {
        onSelectGuide(filteredGuides[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search OAuth providers, scopes (e.g. drive.file, repo), or categories..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredGuides.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching OAuth applications found for &quot;{query}&quot;.
              <p className="mt-1 text-slate-500">Try using the AI Guide Generator to research this provider!</p>
            </div>
          ) : (
            filteredGuides.map((guide, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={guide.id}
                  onClick={() => {
                    onSelectGuide(guide);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/80 text-blue-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: guide.brandColor || '#2563EB' }}
                    >
                      {guide.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-slate-900 truncate">
                          {guide.name}
                        </span>
                        {guide.sourceType === 'verified' ? (
                          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/50">
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            <span>AI Research</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{guide.tagline}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="hidden sm:inline-flex items-center text-[11px] text-slate-500">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      {guide.estimatedDevTime}
                    </span>
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-300'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>{filteredGuides.length} guides found</span>
        </div>
      </div>
    </div>
  );
}
