import { Search, Sparkles, Share2, Compass, ShieldCheck } from 'lucide-react';
import { ActivePage } from './Sidebar';
import { OAuthGuide } from '../types/oauth';

interface HeaderProps {
  activePage: ActivePage;
  currentGuide?: OAuthGuide;
  onOpenSearch: () => void;
  onNavigate: (page: ActivePage) => void;
  onOpenShareModal: () => void;
}

export function Header({
  activePage,
  currentGuide,
  onOpenSearch,
  onNavigate,
  onOpenShareModal,
}: HeaderProps) {
  const getBreadcrumbs = () => {
    switch (activePage) {
      case 'dashboard':
        return <span>Dashboard</span>;
      case 'directory':
        return <span>Application Directory</span>;
      case 'generator':
        return (
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Research</span>
            <span className="text-slate-300">/</span>
            <span>AI Guide Generator</span>
          </div>
        );
      case 'guide':
        return (
          <div className="flex items-center space-x-1.5">
            <span
              onClick={() => onNavigate('directory')}
              className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
            >
              Directory
            </span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">{currentGuide?.name || 'Guide'}</span>
          </div>
        );
      default:
        return <span>OAuth Compass</span>;
    }
  };

  return (
    <header className="h-14 border-b border-slate-200/90 bg-white/95 backdrop-blur-xs sticky top-0 z-30 flex items-center justify-between px-6 print:hidden">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center space-x-3 text-xs font-medium text-slate-700">
        {getBreadcrumbs()}
      </div>

      {/* Center: Quick Search Trigger */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg transition-colors cursor-pointer text-left shadow-2xs"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search apps, scopes, verification rules...</span>
            <span className="sm:hidden">Search...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center space-x-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
            <span>/</span>
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-2.5">
        {activePage === 'guide' && currentGuide && (
          <button
            onClick={onOpenShareModal}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Share</span>
          </button>
        )}

        <button
          onClick={() => onNavigate('generator')}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Generate Guide</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </header>
  );
}
