import React, { useState, useEffect } from 'react';
import { Sidebar, ActivePage } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { DirectoryView } from './components/DirectoryView';
import { GuideDetailView } from './components/GuideDetailView';
import { AIGeneratorView } from './components/AIGeneratorView';
import { SearchModal } from './components/SearchModal';
import { ShareModal } from './components/ShareModal';
import { SupabaseModal } from './components/SupabaseModal';
import { OAuthGuide } from './types/oauth';
import {
  getAllGuides,
  getGuideBySlugOrId,
  getRecentlyViewed,
  recordGuideView,
  RecentlyViewedItem,
} from './lib/storage';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [allGuides, setAllGuides] = useState<OAuthGuide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<OAuthGuide | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [guideToShare, setGuideToShare] = useState<OAuthGuide | null>(null);

  // Initialize and check URL path/params for deep-linking
  useEffect(() => {
    const loadedGuides = getAllGuides();
    setAllGuides(loadedGuides);
    setRecentlyViewed(getRecentlyViewed());

    const syncFromUrl = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      const urlParams = new URLSearchParams(window.location.search);

      // Check pathname: /guide/<slug>
      const pathMatch = pathname.match(/^\/guide\/([^\/?#]+)/i);
      // Check hash: #/guide/<slug>
      const hashMatch = hash.match(/^#\/?(?:guide\/)?([^\/?#]+)/i);
      // Check query param: ?guide=<slug>
      const guideSlug = pathMatch?.[1] || hashMatch?.[1] || urlParams.get('guide');

      if (guideSlug) {
        const found = getGuideBySlugOrId(decodeURIComponent(guideSlug));
        if (found) {
          setSelectedGuide(found);
          setActivePage('guide');
          recordGuideView(found);
          setRecentlyViewed(getRecentlyViewed());
          return;
        }
      }

      // Check page in pathname or query
      const pageInPath = pathname.replace(/^\//, '').toLowerCase();
      const pageParam = (urlParams.get('page') || pageInPath) as ActivePage;

      if (pageParam && ['dashboard', 'directory', 'generator'].includes(pageParam)) {
        setActivePage(pageParam);
        setSelectedGuide(null);
      } else if (!guideSlug) {
        setActivePage('dashboard');
      }
    };

    syncFromUrl();

    const handlePopState = () => {
      syncFromUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut listener (/ or Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectGuide = (guide: OAuthGuide) => {
    setSelectedGuide(guide);
    setActivePage('guide');
    recordGuideView(guide);
    setRecentlyViewed(getRecentlyViewed());

    // Shareable clean URL path: /guide/<slug>
    const newUrl = `/guide/${encodeURIComponent(guide.slug)}`;
    window.history.pushState({ guideSlug: guide.slug }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    setSelectedGuide(null);
    const newUrl = page === 'dashboard' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGuideGenerated = (guide: OAuthGuide) => {
    setAllGuides(getAllGuides());
    handleSelectGuide(guide);
  };

  const handleOpenShare = (guide?: OAuthGuide) => {
    const target = guide || selectedGuide;
    if (target) {
      setGuideToShare(target);
      setIsShareOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans flex antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        selectedGuideSlug={selectedGuide?.slug}
        onSelectGuide={handleSelectGuide}
        allGuides={allGuides}
        recentlyViewed={recentlyViewed}
        onOpenSupabaseModal={() => setIsSupabaseOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activePage={activePage}
          currentGuide={selectedGuide || undefined}
          onOpenSearch={() => setIsSearchOpen(true)}
          onNavigate={handleNavigate}
          onOpenShareModal={() => handleOpenShare()}
        />

        <main className="flex-1 pb-16">
          {activePage === 'dashboard' && (
            <DashboardView
              allGuides={allGuides}
              recentlyViewed={recentlyViewed}
              onSelectGuide={handleSelectGuide}
              onNavigate={handleNavigate}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          {activePage === 'directory' && (
            <DirectoryView
              allGuides={allGuides}
              onSelectGuide={handleSelectGuide}
              onNavigateToGenerator={() => handleNavigate('generator')}
            />
          )}

          {activePage === 'generator' && (
            <AIGeneratorView
              onGuideGenerated={handleGuideGenerated}
              onOpenShareModal={handleOpenShare}
            />
          )}

          {activePage === 'guide' && selectedGuide && (
            <GuideDetailView
              guide={selectedGuide}
              onOpenShareModal={() => handleOpenShare(selectedGuide)}
              onNavigateToDirectory={() => handleNavigate('directory')}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        guides={allGuides}
        onSelectGuide={handleSelectGuide}
      />

      {guideToShare && (
        <ShareModal
          guide={guideToShare}
          isOpen={isShareOpen}
          onClose={() => {
            setIsShareOpen(false);
            setGuideToShare(null);
          }}
        />
      )}

      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
      />
    </div>
  );
}
