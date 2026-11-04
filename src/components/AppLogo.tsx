import React, { useState } from 'react';

export interface AppLogoProps {
  name: string;
  slug?: string;
  brandColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  logoUrl?: string;
  domain?: string;
  website?: string;
}

// Helper to deduce a clean domain from an app name or website URL
export function deduceAppDomain(name: string, website?: string, slug?: string): string {
  if (website) {
    try {
      const cleanWeb = website.startsWith('http') ? website : `https://${website}`;
      const parsed = new URL(cleanWeb);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      // ignore
    }
  }

  const clean = (slug || name).toLowerCase().trim();

  // Known domain dictionary
  const KNOWN_DOMAINS: Record<string, string> = {
    notion: 'notion.so',
    figma: 'figma.com',
    github: 'github.com',
    slack: 'slack.com',
    'google-drive': 'google.com',
    google: 'google.com',
    gmail: 'gmail.com',
    hubspot: 'hubspot.com',
    zoom: 'zoom.us',
    asana: 'asana.com',
    linear: 'linear.app',
    discord: 'discord.com',
    shopify: 'shopify.com',
    stripe: 'stripe.com',
    dropbox: 'dropbox.com',
    salesforce: 'salesforce.com',
    airtable: 'airtable.com',
    gitlab: 'gitlab.com',
    spotify: 'spotify.com',
    twitch: 'twitch.tv',
    box: 'box.com',
    atlassian: 'atlassian.com',
    jira: 'atlassian.com',
    microsoft: 'microsoft.com',
    okta: 'okta.com',
    auth0: 'auth0.com',
    clickup: 'clickup.com',
    mailchimp: 'mailchimp.com',
    quickbooks: 'intuit.com',
    pinterest: 'pinterest.com',
    reddit: 'reddit.com',
    linkedin: 'linkedin.com',
    intercom: 'intercom.com',
    zendesk: 'zendesk.com',
    typeform: 'typeform.com',
    canva: 'canva.com',
  };

  for (const [key, dom] of Object.entries(KNOWN_DOMAINS)) {
    if (clean.includes(key)) return dom;
  }

  if (clean.includes('.')) {
    return clean.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
  }

  const sanitized = clean.replace(/[^a-z0-9]/g, '');
  return `${sanitized}.com`;
}

export function getAppLogoUrl(name: string, website?: string, slug?: string): string {
  const domain = deduceAppDomain(name, website, slug);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export function AppLogo({
  name,
  slug,
  brandColor,
  size = 'md',
  className = '',
  logoUrl,
  domain,
  website,
}: AppLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const normalized = (slug || name).toLowerCase().replace(/[^a-z0-9]/g, '');

  const dimensions = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
    xl: 'w-12 h-12 text-base',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  }[size];

  const imgSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }[size];

  // 1. Built-in high-fidelity vector SVGs for core & popular OAuth providers
  if (normalized.includes('notion')) {
    return (
      <div className={`${dimensions} rounded-lg bg-black text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.047-.327L17.8.847C17.38.52 16.634.24 15.654.333L2.73 1.22c-.42.046-.513.28-.373.466l2.102 2.522zm1.073 3.684v12.778c0 .793.42 1.12 1.213 1.073l13.542-.793c.793-.047.98-.606.98-1.26V6.914c0-.653-.28-.98-.84-.933l-14.055.84c-.56.046-.84.42-.84 1.07zm11.334.84l.047 11.24c0 .42-.233.56-.606.56-.374 0-.56-.14-.794-.467L10.3 12.38v6.996c.327.094.654.187.654.467 0 .373-.327.42-.7.42l-2.753.14c-.373 0-.56-.14-.56-.467 0-.28.28-.42.607-.467V8.59c-.42-.047-.793-.093-.793-.42 0-.327.28-.42.653-.42l3.127-.187c.467 0 .7.187.98.56l5.225 7.743V9.243c-.327-.093-.654-.186-.654-.466 0-.374.327-.42.7-.42l2.427-.14c.374 0 .56.14.56.467 0 .28-.28.42-.653.467z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#1E1E1E] flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('github')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#24292e] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('slack')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#4A154B] flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="none">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523 2.52 2.52 0 0 1 2.52-2.52h2.52v2.52c0 1.394-1.126 2.523-2.52 2.523z" fill="#E01E5A" />
          <path d="M6.303 15.165a2.528 2.528 0 0 1 2.52-2.523c1.394 0 2.52 1.129 2.52 2.523v6.315a2.52 2.52 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.52-2.52v-6.315z" fill="#E01E5A" />
          <path d="M8.823 5.042a2.528 2.528 0 0 1-2.52-2.52 2.52 2.52 0 0 1 2.52-2.522h2.52v2.522c0 1.394-1.126 2.52-2.52 2.52z" fill="#36C5F0" />
          <path d="M8.823 6.303a2.528 2.528 0 0 1 2.52 2.52v6.316a2.52 2.52 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.52-2.52V8.823c0-1.394 1.126-2.52 2.52-2.52z" fill="#36C5F0" />
          <path d="M18.958 8.823a2.528 2.528 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.522h-2.52V11.34c0-1.394 1.126-2.52 2.52-2.52z" fill="#2EB67D" />
          <path d="M17.697 8.823a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.52-2.52V2.522A2.52 2.52 0 0 1 15.177 0a2.528 2.528 0 0 1 2.52 2.522v6.3z" fill="#2EB67D" />
          <path d="M15.177 18.958a2.528 2.528 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.522h-2.52v-2.522c0-1.394 1.126-2.52 2.52-2.52z" fill="#ECB22E" />
          <path d="M15.177 17.697a2.528 2.528 0 0 1-2.52-2.52V8.861a2.52 2.52 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.52 2.52v6.316a2.528 2.528 0 0 1-2.52 2.52z" fill="#ECB22E" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('google') || normalized.includes('drive') || normalized.includes('gmail')) {
    return (
      <div className={`${dimensions} rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 87.3 78" fill="none">
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
          <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47" />
          <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
          <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
          <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
          <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('hubspot')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#FF7A59] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.8 6.55V4.3a1.8 1.8 0 0 0 1.05-1.63A1.82 1.82 0 0 0 18.02.85a1.82 1.82 0 0 0-1.82 1.82c0 .7.4 1.3.98 1.63v2.25a6.45 6.45 0 0 0-3.4 1.7L6.87 3.52a2.12 2.12 0 0 0 .09-.6A2.08 2.08 0 1 0 4.88 5a2.08 2.08 0 0 0 1.15-.35l6.78 4.66a6.52 6.52 0 0 0-.85 3.23c0 1.2.33 2.33.9 3.3l-2.02 2.02a1.72 1.72 0 0 0-.64-.13 1.76 1.76 0 1 0 1.76 1.76c0-.23-.05-.44-.13-.64l1.98-1.98a6.52 6.52 0 1 0 5-10.32zm-2.28 9.38a3.86 3.86 0 1 1 0-5.46 3.86 3.86 0 0 1 0 5.46z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('zoom')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#2D8CFF] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 6A2.5 2.5 0 0 0 2 8.5v7A2.5 2.5 0 0 0 4.5 18h9a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 13.5 6h-9zm13 4.167L22 7.5v9l-4.5-2.667v-3.666z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('asana')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#F06A6A] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="7.5" r="4.5" />
          <circle cx="6.5" cy="16.5" r="4.5" />
          <circle cx="17.5" cy="16.5" r="4.5" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('discord')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#5865F2] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('linear')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#5E6AD2] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zm15.86-3.86a7.48 7.48 0 0 0-2.6-2.6L5.54 15.76a7.48 7.48 0 0 0 2.6 2.6L18.36 8.14z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('shopify')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#96BF48] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.4 6.7 15.3 5.4c-.2-.1-.5 0-.6.2l-2.4 5.9-1.9-4.2c-.1-.2-.3-.3-.5-.3l-4.5.3c-.3 0-.5.3-.4.5l3.2 13.9c.1.3.3.4.5.4h6.8c.2 0 .5-.1.5-.4l3.5-14.5c.2-.2 0-.4-.1-.5z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('stripe')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#635BFF] text-white flex items-center justify-center shrink-0 shadow-2xs font-extrabold ${className}`}>
        <span className="font-serif italic text-base">S</span>
      </div>
    );
  }

  if (normalized.includes('dropbox')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#0061FE] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2l6 4-6 4-6-4 6-4zm12 0l6 4-6 4-6-4 6-4zM0 14l6 4 6-4-6-4-6 4zm24 0l-6-4-6 4 6 4 6-4zm-12 5l-6-4-6 4 12 7 12-7-6-4-6 4z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('salesforce')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#00A1E0] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.38 9.53a5.53 5.53 0 0 0-4.83-2.85 5.5 5.5 0 0 0-2.87.8 7.02 7.02 0 0 0-6.68 2.2A5.68 5.68 0 0 0 2 14.5c0 3.03 2.47 5.5 5.5 5.5h11c2.48 0 4.5-2.02 4.5-4.5a4.49 4.49 0 0 0-3.62-4.47z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('airtable')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#FCB400] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.6 2.4a1 1 0 0 1 .8 0l9 4.5a1 1 0 0 1 0 1.8l-9 4.5a1 1 0 0 1-.8 0l-9-4.5a1 1 0 0 1 0-1.8l9-4.5zM3 10.8l8 4v6.8l-8-4v-6.8zm18 0v6.8l-8 4v-6.8l8-4z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('gitlab')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#FC6D26] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.6 9.6l-2-6.1c-.2-.5-.8-.7-1.3-.4l-8.3 6.1H12L3.7 3.1c-.5-.3-1.1-.1-1.3.4l-2 6.1c-.2.6 0 1.2.5 1.6l11.1 8.1 11.1-8.1c.5-.4.7-1 .5-1.6z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes('spotify')) {
    return (
      <div className={`${dimensions} rounded-lg bg-[#1DB954] text-white flex items-center justify-center shrink-0 shadow-2xs ${className}`}>
        <svg className={iconSizes} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.625.625 0 0 1-.86.208c-2.355-1.439-5.32-1.764-8.812-.966a.625.625 0 1 1-.278-1.22c3.821-.873 7.106-.5 9.742 1.118a.625.625 0 0 1 .208.86zm1.224-2.723a.782.782 0 0 1-1.077.257c-2.695-1.656-6.804-2.136-9.99-1.168a.781.781 0 0 1-.468-1.492c3.642-1.106 8.188-.567 11.278 1.326a.781.781 0 0 1 .257 1.077zm.106-2.835C14.692 8.94 9.38 8.764 6.29 9.702a.938.938 0 1 1-.55-1.794c3.553-1.078 9.43-.872 13.153 1.338a.938.938 0 0 1-.977 1.62z" />
        </svg>
      </div>
    );
  }

  // 2. Dynamic live favicon from Google Favicon Service for ANY app or website
  const targetDomain = domain || deduceAppDomain(name, website);
  const targetLogoUrl = logoUrl || `https://www.google.com/s2/favicons?domain=${targetDomain}&sz=128`;

  if (!imgFailed && targetLogoUrl) {
    return (
      <div
        className={`${dimensions} rounded-lg bg-white border border-slate-200/90 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden p-1 ${className}`}
      >
        <img
          src={targetLogoUrl}
          alt={name}
          className={`${imgSizes} object-contain rounded-xs transition-opacity duration-200`}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  // 3. Clean fallback: styled monogram with brand color
  return (
    <div
      className={`${dimensions} rounded-lg flex items-center justify-center font-bold text-white shrink-0 shadow-2xs uppercase tracking-wider ${className}`}
      style={{ backgroundColor: brandColor || '#3B82F6' }}
    >
      {name.slice(0, 2)}
    </div>
  );
}
