import { OAuthGuide } from '../types/oauth';
import { INITIAL_GUIDES } from '../data/guides';

const STORAGE_KEYS = {
  CUSTOM_GUIDES: 'oauth_compass_custom_guides',
  RECENTLY_VIEWED: 'oauth_compass_recently_viewed',
  CHECKLIST_PROGRESS: 'oauth_compass_checklist_progress',
  SAVED_GUIDE_IDS: 'oauth_compass_saved_guide_ids',
};

export interface RecentlyViewedItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  difficulty: string;
  viewedAt: string;
  sourceType: string;
}

export function getAllGuides(): OAuthGuide[] {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_GUIDES);
    const customGuides: OAuthGuide[] = customJson ? JSON.parse(customJson) : [];
    // Combine INITIAL_GUIDES with custom guides, avoiding duplicates by id or slug
    const seen = new Set<string>();
    const result: OAuthGuide[] = [];

    // Custom guides first if updated
    for (const guide of customGuides) {
      if (!seen.has(guide.slug) && !seen.has(guide.id)) {
        seen.add(guide.slug);
        seen.add(guide.id);
        result.push(guide);
      }
    }

    for (const guide of INITIAL_GUIDES) {
      if (!seen.has(guide.slug) && !seen.has(guide.id)) {
        seen.add(guide.slug);
        seen.add(guide.id);
        result.push(guide);
      }
    }

    return result;
  } catch (err) {
    console.error('Failed to load guides from storage:', err);
    return INITIAL_GUIDES;
  }
}

export function getGuideBySlugOrId(identifier: string): OAuthGuide | undefined {
  const all = getAllGuides();
  const lower = identifier.toLowerCase().trim();
  return all.find(g => g.slug.toLowerCase() === lower || g.id.toLowerCase() === lower);
}

export function saveGuide(guide: OAuthGuide): void {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_GUIDES);
    const customGuides: OAuthGuide[] = customJson ? JSON.parse(customJson) : [];
    const index = customGuides.findIndex(g => g.id === guide.id || g.slug === guide.slug);

    if (index >= 0) {
      customGuides[index] = guide;
    } else {
      customGuides.unshift(guide);
    }

    localStorage.setItem(STORAGE_KEYS.CUSTOM_GUIDES, JSON.stringify(customGuides));
  } catch (err) {
    console.error('Failed to save guide to storage:', err);
  }
}

export function deleteGuide(id: string): void {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_GUIDES);
    if (!customJson) return;
    const customGuides: OAuthGuide[] = JSON.parse(customJson);
    const filtered = customGuides.filter(g => g.id !== id && g.slug !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_GUIDES, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete guide:', err);
  }
}

export function getRecentlyViewed(): RecentlyViewedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordGuideView(guide: OAuthGuide): void {
  try {
    const recent = getRecentlyViewed();
    const filtered = recent.filter(r => r.id !== guide.id && r.slug !== guide.slug);
    const updated: RecentlyViewedItem = {
      id: guide.id,
      slug: guide.slug,
      name: guide.name,
      category: guide.category,
      difficulty: guide.difficulty,
      viewedAt: new Date().toISOString(),
      sourceType: guide.sourceType,
    };
    const nextList = [updated, ...filtered].slice(0, 8);
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(nextList));
  } catch (err) {
    console.error('Failed to record guide view:', err);
  }
}

export function getStepProgress(guideId: string): number[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.CHECKLIST_PROGRESS}_${guideId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleStepProgress(guideId: string, stepNumber: number): number[] {
  try {
    const current = getStepProgress(guideId);
    let next: number[];
    if (current.includes(stepNumber)) {
      next = current.filter(s => s !== stepNumber);
    } else {
      next = [...current, stepNumber];
    }
    localStorage.setItem(`${STORAGE_KEYS.CHECKLIST_PROGRESS}_${guideId}`, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

export function getSavedGuideIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_GUIDE_IDS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSavedGuide(guideId: string): boolean {
  try {
    const saved = getSavedGuideIds();
    let next: string[];
    let isSaved: boolean;
    if (saved.includes(guideId)) {
      next = saved.filter(id => id !== guideId);
      isSaved = false;
    } else {
      next = [...saved, guideId];
      isSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_GUIDE_IDS, JSON.stringify(next));
    return isSaved;
  } catch {
    return false;
  }
}

/**
 * Returns the production-ready Supabase PostgreSQL migration script
 * for developers who want to connect this application directly to Supabase.
 */
export function getSupabaseMigrationSQL(): string {
  return `-- ==========================================================
-- OAuth Compass — Supabase PostgreSQL Schema & RLS Policies
-- ==========================================================

-- 1. Guides Table
CREATE TABLE IF NOT EXISTS public.oauth_guides (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Moderate', 'Advanced', 'Rigorous')),
    estimated_dev_time TEXT NOT NULL,
    estimated_review_time TEXT NOT NULL,
    approval_type TEXT NOT NULL,
    auth_type TEXT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'verified',
    confidence_score INTEGER DEFAULT 100,
    endpoints JSONB NOT NULL DEFAULT '{}'::jsonb,
    prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb,
    steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
    verification_requirements JSONB NOT NULL DEFAULT '[]'::jsonb,
    potential_blockers JSONB NOT NULL DEFAULT '[]'::jsonb,
    sources JSONB NOT NULL DEFAULT '[]'::jsonb,
    uncertainty_indicators JSONB DEFAULT '[]'::jsonb,
    brand_color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Checklist Progress
CREATE TABLE IF NOT EXISTS public.user_guide_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    guide_id TEXT REFERENCES public.oauth_guides(id) ON DELETE CASCADE,
    completed_steps INTEGER[] DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, guide_id)
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.oauth_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_guide_progress ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all OAuth guides
CREATE POLICY "Public read access to OAuth guides"
ON public.oauth_guides FOR SELECT USING (true);

-- Allow authenticated users to insert or bookmark custom AI guides
CREATE POLICY "Authenticated users can insert AI guides"
ON public.oauth_guides FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Progress RLS
CREATE POLICY "Users can manage their own checklist progress"
ON public.user_guide_progress FOR ALL USING (auth.uid() = user_id);
`;
}
