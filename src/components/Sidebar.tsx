import { useState } from 'react';
import {
  Compass,
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Database,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Clock,
  Menu,
  X,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { OAuthGuide } from '../types/oauth';
import { RecentlyViewedItem } from '../lib/storage';

export type ActivePage = 'dashboard' | 'directory' | 'generator' | 'guide';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  selectedGuideSlug?: string;
  onSelectGuide: (guide: OAuthGuide) => void;
  allGuides: OAuthGuide[];
  recentlyViewed: RecentlyViewedItem[];
  onOpenSupabaseModal: () => void;
}

export function Sidebar({
  activePage,
  onNavigate,
  selectedGuideSlug,
  onSelectGuide,
  allGuides,
  recentlyViewed,
  onOpenSupabaseModal,
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const initialAppSlugs = ['notion', 'figma', 'github', 'slack', 'google-drive', 'hubspot'];
  const quickList = allGuides.filter(g => initialAppSlugs.includes(g.slug));

  const navContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-64 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div
          onClick={() => {
            onNavigate('dashboard');
            setMobileOpen(false);
          }}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <Compass className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-sm text-slate-900 tracking-tight">OAuth Compass</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-blue-50 text-blue-700">v1.2</span>
            </div>
            <p className="text-[11px] text-slate-500">Provider Intelligence</p>
          </div>
        </div>

        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="p-3 space-y-1">
        <button
          onClick={() => {
            onNavigate('dashboard');
            setMobileOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'dashboard'
              ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <LayoutDashboard className={`w-4 h-4 ${activePage === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Dashboard</span>
          </div>
        </button>

        <button
          onClick={() => {
            onNavigate('directory');
            setMobileOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'directory'
              ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <FolderKanban className={`w-4 h-4 ${activePage === 'directory' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Application Directory</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-mono">
            {allGuides.length}
          </span>
        </button>

        <button
          onClick={() => {
            onNavigate('generator');
            setMobileOpen(false);
          }}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'generator'
              ? 'bg-blue-50 text-blue-700 font-semibold shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Sparkles className={`w-4 h-4 ${activePage === 'generator' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>AI Guide Generator</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 font-medium">
            AI Engine
          </span>
        </button>
      </div>

      <div className="px-4 py-2">
        <div className="h-px bg-slate-100" />
      </div>

      {/* Directory Quick Access (Initial required apps) */}
      <div className="px-3 flex-1 overflow-y-auto space-y-4">
        <div>
          <div className="px-2 pb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Core Directory
            </span>
            <button
              onClick={() => {
                onNavigate('generator');
                setMobileOpen(false);
              }}
              title="Add Application"
              className="text-slate-400 hover:text-blue-600"
            >
              <PlusCircle className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {quickList.map(g => {
              const isSelected = activePage === 'guide' && selectedGuideSlug === g.slug;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    onSelectGuide(g);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                    isSelected
                      ? 'bg-blue-50/80 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: g.brandColor || '#2563EB' }}
                    />
                    <span className="truncate">{g.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {g.difficulty}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div>
            <div className="px-2 pb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <Clock className="w-3 h-3 mr-1" />
                <span>Recently Viewed</span>
              </span>
            </div>
            <div className="space-y-0.5">
              {recentlyViewed.slice(0, 4).map(item => {
                const isSelected = activePage === 'guide' && selectedGuideSlug === item.slug;
                const fullGuide = allGuides.find(g => g.slug === item.slug);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (fullGuide) {
                        onSelectGuide(fullGuide);
                      }
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-700 font-medium'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="text-[10px] text-slate-400">{item.difficulty}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Supabase & System Info Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
        <button
          onClick={onOpenSupabaseModal}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs"
        >
          <div className="flex items-center space-x-2">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Ready</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="px-2 py-1.5 rounded bg-emerald-50/60 border border-emerald-200/60 flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-[11px] text-emerald-800 font-medium">
            Strict Fact Checking Mode
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10">{navContent}</div>
        </div>
      )}

      {/* Mobile trigger floating button if closed */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
        title="Open Navigation"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
