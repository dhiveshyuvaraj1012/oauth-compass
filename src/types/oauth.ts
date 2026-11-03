export type DifficultyLevel =
  | '1 Easy'
  | '2 Moderate'
  | '3 Hard'
  | '4 Very hard'
  | '5 Partner-gated / uncertain';

export type EvidenceStatus =
  | 'primary-docs'
  | 'secondary'
  | 'inferred'
  | 'unverified';

export type StepActor = 'Agent' | 'You' | 'Either';

export type ApprovalType =
  | 'Self-serve'
  | 'Self-serve (unlisted) / Community review'
  | 'App Marketplace Review'
  | 'Security Audit (CASA/SOC2)'
  | 'Partner-gated / Request access'
  | (string & {});

export type GuideSourceType = 'verified' | 'ai_generated' | 'sample_mock';

export type ScopeRisk = 'Standard' | 'Sensitive' | 'Restricted' | 'Admin';

export interface SourcedMetric {
  value: string;
  status: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface EvidenceItem {
  claim: string;
  status: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface OAuthEndpoints {
  authorizationUrl: string;
  tokenUrl: string;
  revocationUrl?: string;
  userInfoUrl?: string;
}

export interface Prerequisite {
  title: string;
  description: string;
  required: boolean;
  link?: string;
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
  requiresDeveloperAction?: boolean;
}

export interface SetupStep {
  stepNumber: number;
  title: string;
  summary: string;
  details: string;
  actor: StepActor;
  codeSnippet?: string;
  codeLanguage?: string;
  tips?: string[];
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
  requiresDeveloperAction?: boolean;
  developerActionNote?: string;
}

export interface RedirectUriConfig {
  localhostAllowed: boolean;
  wildcardsAllowed: boolean;
  httpAllowedInDev: boolean;
  multipleUrisSupported: boolean;
  pathMatching: 'Exact' | 'Prefix' | 'Strict String Match';
  examples: {
    development: string[];
    production: string[];
  };
  rulesAndTraps: string[];
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface OAuthScope {
  name: string;
  category: string;
  riskLevel: ScopeRisk;
  description: string;
  userConsentPrompt?: string;
  reviewRequired?: boolean;
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface VerificationRequirement {
  title: string;
  type: string;
  timeline: string;
  timelineType: 'official_policy' | 'estimate';
  description: string;
  checklist: string[];
  links?: Array<{ title: string; url: string }>;
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface CommonErrorItem {
  errorCode: string;
  title: string;
  description: string;
  likelyCause: string;
  resolution: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status?: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface SourceCitation {
  title: string;
  url: string;
  notes?: string;
  officialDoc: boolean;
  supportedRequirements?: string[];
  isOfficialProviderDoc?: boolean;
}

export interface UncertaintyIndicator {
  aspect: string;
  status: string;
  detail: string;
}

export interface ApprovalPathStage {
  stage: number;
  title: string;
  description: string;
  gateType: string;
  status: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface SetupNuance {
  title: string;
  category: 'scopes_trigger_review' | 'admin_restrictions' | 'paid_accounts' | 'source_disagreements' | 'general';
  detail: string;
  status: EvidenceStatus;
  url?: string;
  explanation?: string;
}

export interface AgentVsYou {
  agentCanDo: string[];
  youMustDo: string[];
  eitherCanDo?: string[];
}

export interface OAuthGuide {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;

  // 2. Setup effort vs approval wait vs overall time (strictly separate)
  setupEffort: SourcedMetric;
  approvalWait: SourcedMetric;
  overallTime: SourcedMetric;
  approvalGate: SourcedMetric;

  // Backwards-compatible strings
  estimatedDevTime: string;
  estimatedDevTimeNote?: string;
  estimatedReviewTime: string;
  estimatedReviewTimeNote?: string;
  approvalType: ApprovalType;
  authType: string;

  // 3. Approval path: sequence of gates
  approvalPath: ApprovalPathStage[];

  // 4. Requirements: accounts, legal docs, technical prerequisites
  prerequisites: Prerequisite[];

  // 5. Nuances that affect setup
  nuances: SetupNuance[];

  // 6. Steps: labeled [Agent], [You], [Either]
  steps: SetupStep[];

  // 7. If you get stuck: common blockers & resolutions
  potentialBlockers: CommonErrorItem[];

  // 8. What an agent can do vs what you must do
  agentCapabilities: AgentVsYou;

  // 9. Evidence list: claim, status badge, source link
  evidenceList: EvidenceItem[];

  // 10. "What was tested" statement:
  testedStatement: string;

  // 11. Last checked date & metadata
  lastCheckedDate: string;
  isAgentGenerated?: boolean;
  sourceType: GuideSourceType;
  verifiedDate?: string;
  generatedAt?: string;
  confidenceScore?: number;

  endpoints: OAuthEndpoints;
  redirectUriConfig: RedirectUriConfig;
  scopes: OAuthScope[];
  verificationRequirements: VerificationRequirement[];
  sources: SourceCitation[];
  uncertaintyIndicators?: UncertaintyIndicator[];
  recommendedNextActions?: string[];
  unconfirmedDetails?: string[];

  featured?: boolean;
  viewCount?: number;
  tags?: string[];
  brandColor?: string;
  iconName?: string;
}
