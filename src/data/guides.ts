import { OAuthGuide } from '../types/oauth';

export const INITIAL_GUIDES: OAuthGuide[] = [
  // 1. NOTION
  {
    id: 'notion',
    slug: 'notion',
    name: 'Notion',
    tagline: 'Workspace databases, page content, comments, users, and block-level integrations',
    description: 'OAuth 2.0 authorization code flow for public Notion integrations. Notion authorization documentation confirms zero human review or domain verification is required for public distribution. Users can install your integration into their workspaces instantly via standard OAuth consent.',
    category: 'Productivity & Workspaces',
    difficulty: '1 Easy',
    brandColor: '#000000',
    iconName: 'FileText',
    featured: true,
    viewCount: 1640,
    tags: ['Workspace', 'Docs', 'Databases', 'Productivity', 'Self-serve'],
    authType: 'OAuth 2.0 Authorization Code Grant (RFC 6749)',

    setupEffort: {
      value: '15–30 min',
      status: 'inferred',
      explanation: 'Inferred from standard OAuth 2.0 token endpoint exchange and absence of complex verification steps',
    },
    approvalWait: {
      value: 'None documented',
      status: 'primary-docs',
      url: 'https://developers.notion.com/docs/authorization',
    },
    overallTime: {
      value: '15–30 min',
      status: 'inferred',
      explanation: 'Instant self-serve enablement without external provider review queue',
    },
    approvalGate: {
      value: 'Self-serve',
      status: 'primary-docs',
      url: 'https://developers.notion.com/docs/authorization',
    },

    // Backwards compatibility strings
    estimatedDevTime: '15–30 min',
    estimatedDevTimeNote: 'Inferred from standard OAuth 2.0 protocol implementation with no SDK dependencies.',
    estimatedReviewTime: 'None documented',
    estimatedReviewTimeNote: 'Stated in official Notion authorization docs: no review or approval required for public OAuth mode.',
    approvalType: 'Self-serve',

    approvalPath: [
      {
        stage: 1,
        title: 'Create Integration in Notion My Integrations Portal',
        description: 'Register integration name, associated workspace, and upload logo.',
        gateType: 'Developer Account Configuration',
        status: 'primary-docs',
        url: 'https://www.notion.so/profile/integrations',
      },
      {
        stage: 2,
        title: 'Switch Distribution from Internal to Public',
        description: 'Provide organization name, website URL, terms of service URL, and privacy policy URL.',
        gateType: 'Self-serve Form Submission',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        stage: 3,
        title: 'Configure Redirect URIs',
        description: 'Add HTTPS redirect URI (or http://localhost for local development testing).',
        gateType: 'Self-serve Configuration',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        stage: 4,
        title: 'Immediate Public Distribution Enabled',
        description: 'Zero human review or external approval queue required. Notion immediately issues live OAuth credentials.',
        gateType: 'Instant Self-serve',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
    ],

    prerequisites: [
      {
        title: 'Notion Account & Workspace',
        description: 'Free, Plus, or Business Notion workspace where you have admin permissions.',
        required: true,
        link: 'https://www.notion.so/signup',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
        requiresDeveloperAction: true,
      },
      {
        title: 'Privacy Policy & Terms of Service URLs',
        description: 'Publicly reachable URLs hosted on your domain (required when switching integration to Public mode).',
        required: true,
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
        requiresDeveloperAction: true,
      },
      {
        title: 'Backend Redirect URI Handler',
        description: 'Route on your server (or localhost) capable of receiving ?code= query param and exchanging via Basic Auth.',
        required: true,
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
        requiresDeveloperAction: false,
      },
    ],

    nuances: [
      {
        title: 'No Review Required for Public Mode',
        category: 'scopes_trigger_review',
        detail: 'Notion documentation explicitly specifies that any developer can toggle an integration to Public mode immediately without waiting for human inspection or security review.',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        title: 'Workspace Admin Install Permissions',
        category: 'admin_restrictions',
        detail: 'Members of a Notion workspace can only install public integrations if workspace settings allow members to install or if an Workspace Owner authorizes it.',
        status: 'primary-docs',
        url: 'https://www.notion.so/help/add-and-manage-connections-with-the-api',
      },
      {
        title: 'No Paid Developer Account Needed',
        category: 'paid_accounts',
        detail: 'Creating and distributing public Notion OAuth integrations is 100% free; no Notion Enterprise or paid partner tier required.',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        title: 'HTTP Basic Auth Token Exchange Requirement',
        category: 'general',
        detail: 'Notion requires sending client_id:client_secret encoded in the Authorization header as HTTP Basic auth during the POST /v1/oauth/token call, not inside the JSON body.',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Create Integration at notion.so/profile/integrations',
        summary: 'Click "+ New integration", select associated workspace, and specify an application name.',
        details: 'Go to notion.so/profile/integrations. Enter your integration name, select the workspace you want to associate with it for development, and click Submit.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://www.notion.so/profile/integrations',
        requiresDeveloperAction: true,
        developerActionNote: 'Requires logging in with your Notion account credentials in browser.',
      },
      {
        stepNumber: 2,
        title: 'Switch Distribution to Public Integration',
        summary: 'Navigate to Distribution tab, toggle "Make an integration public", fill out company metadata.',
        details: 'Under the "Distribution" tab in your Notion integration settings, toggle "Make an integration public". Notion requires your Company Name, Website, Privacy Policy URL, and Terms of Service URL. Fill these in and save.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 3,
        title: 'Register OAuth Redirect URIs',
        summary: 'Add your application callback URL (supports http://localhost for dev and https:// in prod).',
        details: 'Under OAuth Domain & URIs, enter your Redirect URIs (e.g., http://localhost:3000/api/auth/callback/notion or https://yourapp.com/api/auth/callback/notion).',
        actor: 'Either',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        stepNumber: 4,
        title: 'Implement Authorization Redirect URL',
        summary: 'Send users to https://api.notion.com/v1/oauth/authorize with client_id, response_type=code, and state.',
        details: 'Generate a random CSRF state string and redirect the user to Notion authorization page.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
        codeSnippet: `// 1. Initiate Notion OAuth authorization redirect
export function redirectToNotionAuth(res: Response, clientId: string, redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    owner: 'user',
    state: state,
  });

  res.redirect(\`https://api.notion.com/v1/oauth/authorize?\${params.toString()}\`);
}`,
        codeLanguage: 'typescript',
      },
      {
        stepNumber: 5,
        title: 'Exchange Authorization Code for Access Token',
        summary: 'POST authorization code to https://api.notion.com/v1/oauth/token using HTTP Basic Auth.',
        details: 'Pass client_id and client_secret formatted as Base64 in the Authorization header (Basic base64(id:secret)). Notion returns access_token, workspace_id, bot_id, and owner user info.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
        codeSnippet: `// 2. Exchange code for Notion access token
export async function exchangeNotionCode(code: string, clientId: string, clientSecret: string, redirectUri: string) {
  const credentials = Buffer.from(\`\${clientId}:\${clientSecret}\`).toString('base64');

  const response = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Authorization': \`Basic \${credentials}\`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(\`Notion OAuth error: \${data.error || data.message}\`);
  }

  // Returns: access_token, workspace_id, workspace_name, bot_id, owner
  return data;
}`,
        codeLanguage: 'typescript',
      },
    ],

    potentialBlockers: [
      {
        errorCode: 'invalid_grant',
        title: 'Authorization Code Expired or Already Used',
        description: 'Notion returns 400 invalid_grant when exchanging an authorization code.',
        likelyCause: 'Authorization codes are single-use only and expire within several minutes.',
        resolution: 'Always exchange the authorization code immediately upon receiving the callback and avoid duplicate requests.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        errorCode: 'unauthorized_client',
        title: 'HTTP Basic Auth Credentials Mismatch',
        description: 'Notion rejects the token exchange with 401 unauthorized_client.',
        likelyCause: 'Client ID or Client Secret was passed in the request body instead of the HTTP Basic Authorization header, or Base64 encoding had trailing whitespace.',
        resolution: 'Ensure credentials are sent via "Authorization: Basic base64(client_id:client_secret)".',
        severity: 'Critical',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        errorCode: 'restricted_workspace_install',
        title: 'Workspace Member Cannot Authorize Connection',
        description: 'End user receives an error stating they do not have permission to connect integrations.',
        likelyCause: 'Target Notion workspace has enabled Admin-only connection settings.',
        resolution: 'Advise user to have an Workspace Owner/Admin approve the integration or install it on the workspace.',
        severity: 'Medium',
        status: 'primary-docs',
        url: 'https://www.notion.so/help/add-and-manage-connections-with-the-api',
      },
    ],

    agentCapabilities: {
      agentCanDo: [
        'Generate complete OAuth 2.0 PKCE / state token exchange backend logic',
        'Write redirect URI callback handlers and database token storage schema',
        'Implement automatic Bearer token injection and Notion-Version API header wrappers',
        'Create Notion database and page querying functions',
      ],
      youMustDo: [
        'Log into notion.so/profile/integrations and create the integration record',
        'Switch distribution mode to Public in the Notion developer dashboard',
        'Provide your real company privacy policy and terms of service URLs',
        'Copy client_id and client_secret securely to your production secret store',
      ],
      eitherCanDo: [
        'Define allowed redirect URIs in configuration files',
        'Test OAuth redirect URL generation and state cookie validation locally',
      ],
    },

    evidenceList: [
      {
        claim: 'No human review or domain verification required to use public integration',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        claim: 'Approval wait time is None documented',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        claim: 'Approval gate is Self-serve',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        claim: 'Estimated setup effort of 15–30 min',
        status: 'inferred',
        explanation: 'Concluded from standard RFC 6749 flow without proprietary SDK requirements',
      },
      {
        claim: 'Token exchange requires HTTP Basic auth header',
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
    ],

    testedStatement:
      'OAuth Compass researched this guide directly from official Notion authorization documentation (https://developers.notion.com/docs/authorization). No live OAuth application was provisioned or submitted during this automated audit.',

    lastCheckedDate: 'November 2026',
    sourceType: 'verified',

    endpoints: {
      authorizationUrl: 'https://api.notion.com/v1/oauth/authorize',
      tokenUrl: 'https://api.notion.com/v1/oauth/token',
      userInfoUrl: 'https://api.notion.com/v1/users/me',
    },
    redirectUriConfig: {
      localhostAllowed: true,
      wildcardsAllowed: false,
      httpAllowedInDev: true,
      multipleUrisSupported: true,
      pathMatching: 'Exact',
      examples: {
        development: ['http://localhost:3000/api/auth/callback/notion'],
        production: ['https://yourapp.com/api/auth/callback/notion'],
      },
      rulesAndTraps: [
        'Redirect URIs must match registered URLs exactly.',
        'Wildcard domains are not permitted.',
        'HTTPS is mandatory for all non-localhost endpoints.',
      ],
      status: 'primary-docs',
      url: 'https://developers.notion.com/docs/authorization',
    },
    scopes: [
      {
        name: 'read_content',
        category: 'Content',
        riskLevel: 'Standard',
        description: 'Read pages, databases, and blocks shared with the integration.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        name: 'update_content',
        category: 'Content',
        riskLevel: 'Standard',
        description: 'Create and edit pages, databases, and block content.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
      {
        name: 'insert_content',
        category: 'Content',
        riskLevel: 'Standard',
        description: 'Append new child blocks or pages to accessible content.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
    ],
    verificationRequirements: [
      {
        title: 'Zero Review Requirement for Public OAuth Mode',
        type: 'Self-Serve Instant Activation',
        timeline: 'Instant (0 seconds)',
        timelineType: 'official_policy',
        description: 'Official policy: Notion imposes zero manual review or verification gate for public integrations.',
        checklist: [
          'Create integration in notion.so/profile/integrations',
          'Toggle distribution to Public',
          'Supply privacy policy & terms URL',
          'Add valid HTTPS callback URL',
        ],
        status: 'primary-docs',
        url: 'https://developers.notion.com/docs/authorization',
      },
    ],
    sources: [
      {
        title: 'Notion Developer Docs: Authorization',
        url: 'https://developers.notion.com/docs/authorization',
        notes: 'Official specification for Notion public integrations and OAuth 2.0 flow.',
        officialDoc: true,
      },
      {
        title: 'Notion Integrations Settings',
        url: 'https://www.notion.so/profile/integrations',
        notes: 'Developer portal for creating and managing Notion integrations.',
        officialDoc: true,
      },
    ],
  },

  // 2. FIGMA
  {
    id: 'figma',
    slug: 'figma',
    name: 'Figma',
    tagline: 'Collaborative interface design, file inspection, components, styles, and webhooks',
    description: 'OAuth 2.0 authorization for Figma REST API access. Creating a custom/unlisted OAuth app is instant and self-serve. If submitting a public Community plugin or widget to the Figma Community gallery, approval timeline is not published in official documentation.',
    category: 'Design & Creative',
    difficulty: '2 Moderate',
    brandColor: '#F24E1E',
    iconName: 'Figma',
    featured: true,
    viewCount: 1210,
    tags: ['Design', 'UI/UX', 'REST API', 'Figma Files', 'Webhooks'],
    authType: 'OAuth 2.0 Authorization Code Grant (RFC 6749)',

    setupEffort: {
      value: '20–35 min',
      status: 'inferred',
      explanation: 'Inferred from standard OAuth 2.0 code exchange without custom SDK overhead',
    },
    approvalWait: {
      value: 'Not published',
      status: 'unverified',
      explanation: 'Figma documentation does not publish external Community review turnaround time',
    },
    overallTime: {
      value: 'Not published',
      status: 'unverified',
      explanation: 'Community review duration queue is unconfirmed in published docs',
    },
    approvalGate: {
      value: 'Self-serve (unlisted) / Community review',
      status: 'primary-docs',
      url: 'https://www.figma.com/developers/api#oauth2',
    },

    // Backwards compatibility strings
    estimatedDevTime: '20–35 min',
    estimatedDevTimeNote: 'Inferred from standard OAuth 2.0 implementation with redirect handling.',
    estimatedReviewTime: 'Not published',
    estimatedReviewTimeNote: 'Figma official documentation does not commit to a published review duration SLA for Community listings.',
    approvalType: 'Self-serve (unlisted) / Community review',

    approvalPath: [
      {
        stage: 1,
        title: 'Figma Account Settings > Connected Apps',
        description: 'Navigate to account settings and click "Create a new app" in the Connected Apps section.',
        gateType: 'Developer Portal Configuration',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        stage: 2,
        title: 'Provide App Name & Redirect Callback URI',
        description: 'Enter your redirect URI and save to generate Client ID and Client Secret.',
        gateType: 'Self-serve Registration',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        stage: 3,
        title: 'Instant Unlisted Use vs Optional Community Listing',
        description: 'Unlisted integration works immediately for any authorized user. If publishing to the public Figma Community gallery, manual review queue applies with no published turnaround SLA.',
        gateType: 'Dual-Lane Approval (Self-serve or Community Review)',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
    ],

    prerequisites: [
      {
        title: 'Figma User Account',
        description: 'Standard free or paid Figma account to access Developer App settings.',
        required: true,
        link: 'https://www.figma.com/signup',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
        requiresDeveloperAction: true,
      },
      {
        title: 'Secure HTTPS Callback URL in Production',
        description: 'Plain HTTP localhost is supported for development; production callbacks require HTTPS.',
        required: true,
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
        requiresDeveloperAction: false,
      },
    ],

    nuances: [
      {
        title: 'No Review Required for Custom OAuth API Integrations',
        category: 'scopes_trigger_review',
        detail: 'Direct REST API OAuth applications do not undergo Figma review; users authorize permissions via standard Figma OAuth consent screen.',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        title: 'Community Review Timeline is Not Published',
        category: 'source_disagreements',
        detail: 'Official documentation does not commit to an exact review timeline for Community-published plugins or widgets; display as Not published.',
        status: 'unverified',
        explanation: 'Figma docs state submissions are reviewed in order received with no guaranteed timeline',
      },
      {
        title: 'Granular File Read Scopes',
        category: 'scopes_trigger_review',
        detail: 'Scopes include file_read, file_write, file_variables:read, file_variables:write, and webhooks:write.',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Create App in Figma Account Settings',
        summary: 'Log in to Figma > Account Settings > Connected Apps > click "Create a new app".',
        details: 'Specify App name and Callback URLs. Copy Client ID and Client Secret.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 2,
        title: 'Direct User to Figma Authorization URL',
        summary: 'Send user to https://www.figma.com/oauth with client_id, redirect_uri, scope, state, and response_type=code.',
        details: 'Figma prompts the user to grant read or write access to their Figma files and account.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
        codeSnippet: `// Initiate Figma OAuth flow
const params = new URLSearchParams({
  client_id: process.env.FIGMA_CLIENT_ID!,
  redirect_uri: 'https://yourapp.com/api/auth/callback/figma',
  scope: 'file_read',
  state: secureRandomState,
  response_type: 'code',
});
window.location.href = \`https://www.figma.com/oauth?\${params.toString()}\`;`,
        codeLanguage: 'typescript',
      },
      {
        stepNumber: 3,
        title: 'Exchange Authorization Code for Access Token',
        summary: 'POST code to https://www.figma.com/api/v2/oauth/token with client credentials.',
        details: 'Figma returns access_token, expires_in, and refresh_token for refreshing tokens.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
        codeSnippet: `// Exchange code for Figma access token
const res = await fetch('https://www.figma.com/api/v2/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: process.env.FIGMA_CLIENT_ID!,
    client_secret: process.env.FIGMA_CLIENT_SECRET!,
    redirect_uri: 'https://yourapp.com/api/auth/callback/figma',
    code: authCode,
    grant_type: 'authorization_code',
  }),
});
const tokenData = await res.json();`,
        codeLanguage: 'typescript',
      },
    ],

    potentialBlockers: [
      {
        errorCode: 'invalid_redirect_uri',
        title: 'Callback URL Mismatch',
        description: 'Figma reports redirect_uri did not match configured value.',
        likelyCause: 'Trailing slash or port difference between registration and request.',
        resolution: 'Ensure exact character-for-character string match in developer dashboard.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        errorCode: 'expired_refresh_token',
        title: 'Refresh Token Expiration or Invalidation',
        description: 'Failed to refresh token using saved refresh_token.',
        likelyCause: 'User revoked access in Figma Account Settings or token expired.',
        resolution: 'Re-prompt user through OAuth flow to obtain a fresh grant.',
        severity: 'Medium',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
    ],

    agentCapabilities: {
      agentCanDo: [
        'Write token exchange and refresh logic',
        'Handle state validation and cookie storage',
        'Construct Figma REST API calls for files, nodes, and components',
      ],
      youMustDo: [
        'Open Figma Account Settings and register the app',
        'Secure client secret in backend environment variables',
      ],
    },

    evidenceList: [
      {
        claim: 'OAuth 2.0 authorization code flow specification',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        claim: 'Approval wait time is Not published in official documentation',
        status: 'unverified',
        explanation: 'Could not find published review turnaround time in official Figma developer docs',
      },
      {
        claim: 'Approval gate is Self-serve for unlisted / Community review for directory',
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        claim: 'Setup effort of 20–35 min',
        status: 'inferred',
        explanation: 'Concluded from absence of required SDK or complex identity setup',
      },
    ],

    testedStatement:
      'OAuth Compass researched this guide from official Figma REST API & OAuth 2.0 documentation (https://www.figma.com/developers/api#oauth2). No live OAuth application was provisioned or submitted during this audit.',

    lastCheckedDate: 'November 2026',
    sourceType: 'verified',

    endpoints: {
      authorizationUrl: 'https://www.figma.com/oauth',
      tokenUrl: 'https://www.figma.com/api/v2/oauth/token',
      userInfoUrl: 'https://api.figma.com/v1/me',
    },
    redirectUriConfig: {
      localhostAllowed: true,
      wildcardsAllowed: false,
      httpAllowedInDev: true,
      multipleUrisSupported: true,
      pathMatching: 'Exact',
      examples: {
        development: ['http://localhost:3000/api/auth/callback/figma'],
        production: ['https://yourapp.com/api/auth/callback/figma'],
      },
      rulesAndTraps: ['Exact string matching required', 'HTTPS mandatory in production'],
      status: 'primary-docs',
      url: 'https://www.figma.com/developers/api#oauth2',
    },
    scopes: [
      {
        name: 'file_read',
        category: 'Files',
        riskLevel: 'Standard',
        description: 'Read-only access to files, nodes, and comments.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
      {
        name: 'file_write',
        category: 'Files',
        riskLevel: 'Sensitive',
        description: 'Create and edit files and comments.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
    ],
    verificationRequirements: [
      {
        title: 'Unlisted Self-Serve Mode',
        type: 'Zero Review Required',
        timeline: 'Instant (0 seconds)',
        timelineType: 'official_policy',
        description: 'Direct REST API OAuth integrations do not require external verification.',
        checklist: ['Register app in Connected Apps', 'Configure redirect URI'],
        status: 'primary-docs',
        url: 'https://www.figma.com/developers/api#oauth2',
      },
    ],
    sources: [
      {
        title: 'Figma Developers: REST API OAuth 2.0',
        url: 'https://www.figma.com/developers/api#oauth2',
        notes: 'Official OAuth specification and endpoints.',
        officialDoc: true,
      },
    ],
  },

  // 3. SLACK
  {
    id: 'slack',
    slug: 'slack',
    name: 'Slack',
    tagline: 'Team communication, bot messaging, shortcuts, modals, and workflow automations',
    description: 'OAuth 2.0 V2 implementation for Slack Apps. Distinct dual-lane model: Unlisted distribution allows any workspace to install without review; Slack App Directory listing requires preliminary review (up to 10 business days) and functional review (up to 10 weeks; 6 weeks for resubmissions).',
    category: 'Communication & Collaboration',
    difficulty: '2 Moderate',
    brandColor: '#4A154B',
    iconName: 'MessageSquare',
    featured: true,
    viewCount: 1480,
    tags: ['Messaging', 'Bots', 'Webhooks', 'Collaboration', 'Productivity'],
    authType: 'OAuth 2.0 V2 (Bot & User Token Architecture)',

    setupEffort: {
      value: '45–60 min',
      status: 'inferred',
      explanation: 'Inferred from Slack OAuth V2 multi-workspace installation flow and HMAC request verification',
    },
    approvalWait: {
      value: 'Unlisted: None | Marketplace: Up to 10 business days (preliminary) + up to 10 weeks (functional)',
      status: 'primary-docs',
      url: 'https://api.slack.com/start/distributing/guidelines',
    },
    overallTime: {
      value: 'Unlisted: 45–60 min | Marketplace: 2–10 weeks',
      status: 'primary-docs',
      url: 'https://api.slack.com/start/distributing/guidelines',
    },
    approvalGate: {
      value: 'Unlisted: Self-serve | Marketplace: App Directory review',
      status: 'primary-docs',
      url: 'https://api.slack.com/start/distributing/guidelines',
    },

    // Backwards compatibility strings
    estimatedDevTime: '45–60 min',
    estimatedDevTimeNote: 'Inferred from setup of Slack OAuth V2 flow, bot token storage, and request signing verification.',
    estimatedReviewTime: 'Unlisted: None | Marketplace: Up to 10 business days (preliminary) + up to 10 weeks (functional)',
    estimatedReviewTimeNote: 'Official policy: Unlisted distribution requires no review. App Directory preliminary review is up to 10 business days; functional review up to 10 weeks (6 weeks for resubmissions).',
    approvalType: 'App Marketplace Review',

    approvalPath: [
      {
        stage: 1,
        title: 'Create Slack App at api.slack.com/apps',
        description: 'Choose workspace and create app record.',
        gateType: 'Developer Account Configuration',
        status: 'primary-docs',
        url: 'https://api.slack.com/apps',
      },
      {
        stage: 2,
        title: 'Select Granular Bot and User Scopes',
        description: 'Configure chat:write, commands, or incoming-webhook.',
        gateType: 'Permission Configuration',
        status: 'primary-docs',
        url: 'https://api.slack.com/authentication/oauth-v2',
      },
      {
        stage: 3,
        title: 'Lane A: Unlisted Multi-Workspace Distribution (Self-Serve)',
        description: 'Enable "Manage Distribution" and activate Public Distribution. Any Slack workspace can now install via OAuth link without Slack review.',
        gateType: 'Self-serve Instant Activation',
        status: 'primary-docs',
        url: 'https://api.slack.com/authentication/oauth-v2',
      },
      {
        stage: 4,
        title: 'Lane B: Slack App Directory Listing (Optional)',
        description: 'Submit for App Directory listing: Preliminary review takes up to 10 business days; Functional review takes up to 10 weeks (6 weeks for resubmissions).',
        gateType: 'App Directory Security & UX Review',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
    ],

    prerequisites: [
      {
        title: 'Slack Workspace with App Creation Permissions',
        description: 'Free, Pro, or Enterprise Slack workspace where you have admin or permission to install custom apps.',
        required: true,
        link: 'https://api.slack.com/apps',
        status: 'primary-docs',
        url: 'https://api.slack.com/apps',
        requiresDeveloperAction: true,
      },
      {
        title: 'Two-Factor Authentication (2FA)',
        description: 'Mandatory on your Slack user account before Slack allows public distribution or App Directory submission.',
        required: true,
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
        requiresDeveloperAction: true,
      },
      {
        title: 'Public HTTPS Callback URL (TLS 1.2+)',
        description: 'Slack rejects plain HTTP in production. For local dev, ngrok or standard localhost is accepted.',
        required: true,
        status: 'primary-docs',
        url: 'https://api.slack.com/authentication/oauth-v2',
        requiresDeveloperAction: false,
      },
    ],

    nuances: [
      {
        title: 'Unlisted Distribution vs App Directory',
        category: 'scopes_trigger_review',
        detail: 'Unlisted distribution requires no Slack review. Anyone with your install link can install your app. App Directory listing is purely optional for discovery.',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
      {
        title: 'Published App Directory Review Timelines',
        category: 'scopes_trigger_review',
        detail: 'Official guidelines state: Preliminary review takes up to 10 business days; Functional review takes up to 10 weeks (resubmissions take up to 6 weeks).',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
      {
        title: 'Workspace Admin Approval Settings',
        category: 'admin_restrictions',
        detail: 'In Enterprise workspaces, administrators can restrict app installations, requiring an internal request to workspace admins before installation completes.',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Create Slack App at api.slack.com/apps',
        summary: 'Click "Create New App", choose "From scratch", and select your development workspace.',
        details: 'Go to api.slack.com/apps, give your app a name, and select your development workspace.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://api.slack.com/apps',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 2,
        title: 'Configure Scopes and Redirect URL',
        summary: 'Under OAuth & Permissions, add redirect URL and granular bot scopes (e.g. chat:write).',
        details: 'Add your callback URL under Redirect URLs. Add desired Bot Token Scopes.',
        actor: 'Either',
        status: 'primary-docs',
        url: 'https://api.slack.com/authentication/oauth-v2',
      },
      {
        stepNumber: 3,
        title: 'Implement OAuth V2 Exchange Route',
        summary: 'POST code to https://slack.com/api/oauth.v2.access with client_id and client_secret.',
        details: 'Slack returns bot access_token (xoxb-...), authed_user token (xoxp-...), team ID, and enterprise ID.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://api.slack.com/authentication/oauth-v2',
        codeSnippet: `// Slack OAuth V2 code exchange
const res = await fetch('https://slack.com/api/oauth.v2.access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    client_id: process.env.SLACK_CLIENT_ID!,
    client_secret: process.env.SLACK_CLIENT_SECRET!,
    code: authCode,
    redirect_uri: 'https://yourapp.com/api/auth/slack/callback',
  }),
});
const data = await res.json();
if (!data.ok) throw new Error(data.error);`,
        codeLanguage: 'typescript',
      },
    ],

    potentialBlockers: [
      {
        errorCode: 'team_added_to_org',
        title: 'Enterprise Grid Migration Token Invalidation',
        description: 'Workspace moved to Enterprise Grid, invalidating legacy tokens.',
        likelyCause: 'Single workspace was migrated under an Enterprise Grid organization.',
        resolution: 'Prompt workspace admin to re-install using organization-wide install URL.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://api.slack.com/authentication/oauth-v2',
      },
      {
        errorCode: 'admin_approval_required',
        title: 'End User Blocked by Workspace Admin Policy',
        description: 'User cannot install app directly without admin approval.',
        likelyCause: 'Target workspace has app approval policies enabled.',
        resolution: 'Guide user to trigger the in-Slack admin approval request dialog.',
        severity: 'Medium',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
    ],

    agentCapabilities: {
      agentCanDo: [
        'Implement OAuth V2 code exchange and multi-tenant token persistence by team_id',
        'Verify Slack HMAC SHA256 request signatures on event endpoints',
        'Build Block Kit UI components and interactive modal handlers',
      ],
      youMustDo: [
        'Register the Slack App record at api.slack.com/apps',
        'Configure 2FA on developer account',
        'Submit for App Directory listing if marketplace discovery is desired',
      ],
    },

    evidenceList: [
      {
        claim: 'Unlisted distribution requires no review',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
      {
        claim: 'Marketplace preliminary review takes up to 10 business days',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
      {
        claim: 'Marketplace functional review takes up to 10 weeks (6 weeks for resubmissions)',
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
      {
        claim: 'Developer effort estimated at 45–60 min',
        status: 'inferred',
        explanation: 'Concluded from standard OAuth V2 endpoints and HMAC signature verification',
      },
    ],

    testedStatement:
      'OAuth Compass researched this guide from official Slack API documentation (https://api.slack.com/authentication/oauth-v2 and guidelines). No live OAuth application was provisioned or submitted during this audit.',

    lastCheckedDate: 'November 2026',
    sourceType: 'verified',

    endpoints: {
      authorizationUrl: 'https://slack.com/oauth/v2/authorize',
      tokenUrl: 'https://slack.com/api/oauth.v2.access',
      userInfoUrl: 'https://slack.com/api/users.identity',
      revocationUrl: 'https://slack.com/api/auth.revoke',
    },
    redirectUriConfig: {
      localhostAllowed: true,
      wildcardsAllowed: false,
      httpAllowedInDev: true,
      multipleUrisSupported: true,
      pathMatching: 'Exact',
      examples: {
        development: ['http://localhost:3000/api/auth/slack/callback'],
        production: ['https://yourapp.com/api/auth/slack/callback'],
      },
      rulesAndTraps: ['Slack supports up to 10 redirect URLs', 'HTTPS mandatory in production'],
      status: 'primary-docs',
      url: 'https://api.slack.com/authentication/oauth-v2',
    },
    scopes: [
      {
        name: 'chat:write',
        category: 'Messages',
        riskLevel: 'Standard',
        description: 'Post messages to channels where the bot is invited.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://api.slack.com/scopes/chat:write',
      },
      {
        name: 'commands',
        category: 'Interactions',
        riskLevel: 'Standard',
        description: 'Add slash commands to Slack.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://api.slack.com/scopes/commands',
      },
      {
        name: 'channels:read',
        category: 'Channels',
        riskLevel: 'Standard',
        description: 'View basic channel information and public channel lists.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://api.slack.com/scopes/channels:read',
      },
    ],
    verificationRequirements: [
      {
        title: 'Slack App Directory Review (Optional for Marketplace)',
        type: 'Dual Stage Manual Review',
        timeline: 'Up to 10 business days (preliminary) + up to 10 weeks (functional)',
        timelineType: 'official_policy',
        description: 'Preliminary review validates security and metadata; functional review inspects end-to-end user experience.',
        checklist: [
          'Enable 2FA on developer account',
          'Provide clear demo video and installation instructions',
          'Implement Slack request signature verification',
          'Ensure prominent privacy policy and terms',
        ],
        status: 'primary-docs',
        url: 'https://api.slack.com/start/distributing/guidelines',
      },
    ],
    sources: [
      {
        title: 'Slack API: Installing with OAuth 2.0',
        url: 'https://api.slack.com/authentication/oauth-v2',
        notes: 'Authoritative guide on OAuth V2, bot scopes, and token exchange.',
        officialDoc: true,
      },
      {
        title: 'Slack App Directory Guidelines',
        url: 'https://api.slack.com/start/distributing/guidelines',
        notes: 'Official review turnaround timeline and submission criteria.',
        officialDoc: true,
      },
    ],
  },

  // 4. GOOGLE DRIVE & GMAIL
  {
    id: 'google-drive',
    slug: 'google-drive',
    name: 'Google Drive & Gmail',
    tagline: 'Cloud documents, files, Google Sheets, Gmail messaging, and email sync',
    description: 'OAuth 2.0 integration with Google Cloud Identity. Scope classification strictly determines review: Sensitive scopes (gmail.send, drive.file) require verification only (2–4 weeks); Restricted scopes (gmail.readonly, gmail.modify, gmail.compose, gmail.metadata, mail.google.com, drive) require verification AND an annual CASA Tier 2 third-party security assessment ($15,000–$75,000 lab fee).',
    category: 'Productivity & Workspaces',
    difficulty: '4 Very hard',
    brandColor: '#4285F4',
    iconName: 'HardDrive',
    featured: true,
    viewCount: 2310,
    tags: ['Google Cloud', 'Cloud Storage', 'Gmail', 'Workspace', 'CASA Audit'],
    authType: 'OAuth 2.0 (Google Identity Services & Authorization Code)',

    setupEffort: {
      value: '2–4 hours',
      status: 'inferred',
      explanation: 'Inferred from Google Cloud project setup, DNS TXT domain verification, OAuth consent screen, and demo video requirements',
    },
    approvalWait: {
      value: 'Sensitive: 2–4 weeks | Restricted: 4–8 weeks (verification + CASA audit)',
      status: 'primary-docs',
      url: 'https://support.google.com/cloud/answer/9110914',
    },
    overallTime: {
      value: 'Sensitive: 2–4 weeks | Restricted: 4–8 weeks + annual CASA audit',
      status: 'primary-docs',
      url: 'https://support.google.com/cloud/answer/9110914',
    },
    approvalGate: {
      value: 'Sensitive: Google verification | Restricted: Verification + CASA Tier 2 assessment ($15k–$75k)',
      status: 'primary-docs',
      url: 'https://appdefensealliance.dev/casa',
    },

    // Backwards compatibility strings
    estimatedDevTime: '2–4 hours',
    estimatedDevTimeNote: 'Inferred from GCP project configuration, OAuth consent screen, domain verification DNS TXT, and demo video preparation.',
    estimatedReviewTime: 'Sensitive: 2–4 weeks | Restricted: 4–8 weeks (verification + CASA audit)',
    estimatedReviewTimeNote: 'Official policy: Sensitive scopes take 2–4 weeks. Restricted scopes require independent security lab CASA assessment taking 4–8 weeks and costing $15k–$75k annually.',
    approvalType: 'Security Audit (CASA/SOC2)',

    approvalPath: [
      {
        stage: 1,
        title: 'Create Google Cloud Project & Configure OAuth Consent Screen',
        description: 'Provide App Name, User Support Email, Developer Contact, and Authorized Domains.',
        gateType: 'GCP Project Setup',
        status: 'primary-docs',
        url: 'https://console.cloud.google.com/apis/credentials/consent',
      },
      {
        stage: 2,
        title: 'Verify Domain Ownership in Google Search Console',
        description: 'Add DNS TXT verification record for your top-level domain under the same Google account.',
        gateType: 'Google Search Console DNS Verification',
        status: 'primary-docs',
        url: 'https://search.google.com/search-console',
      },
      {
        stage: 3,
        title: 'Prepare Unlisted YouTube Demo Video',
        description: 'Record video showing full OAuth flow, client ID in URL bar, and exact UI feature requesting scopes.',
        gateType: 'Google Trust & Safety Compliance',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        stage: 4,
        title: 'Submit for Google Cloud Trust & Safety Review',
        description: 'Review turnaround takes 2–4 weeks for sensitive scopes.',
        gateType: 'Google Brand & Scope Verification',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        stage: 5,
        title: 'Restricted Scopes: Annual CASA Tier 2 Independent Security Assessment',
        description: 'Mandatory third-party laboratory security audit through an App Defense Alliance accredited lab. Cost ranges $15k–$75k.',
        gateType: 'CASA Tier 2 Security Assessment ($15k–$75k fee)',
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
      },
    ],

    prerequisites: [
      {
        title: 'Google Cloud Platform (GCP) Project',
        description: 'Active GCP project with Google Drive API and/or Gmail API enabled from the API Library.',
        required: true,
        link: 'https://console.cloud.google.com/apis/dashboard',
        status: 'primary-docs',
        url: 'https://console.cloud.google.com/apis/dashboard',
        requiresDeveloperAction: true,
      },
      {
        title: 'Domain Ownership Verification via Google Search Console',
        description: 'Mandatory verification of your top-level domain via DNS TXT record under the same Google account.',
        required: true,
        link: 'https://search.google.com/search-console',
        status: 'primary-docs',
        url: 'https://search.google.com/search-console',
        requiresDeveloperAction: true,
      },
      {
        title: 'Unlisted YouTube Demo Video',
        description: 'Mandatory video demonstration showing the OAuth grant screen with URL bar visible and showing how data is processed.',
        required: true,
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
        requiresDeveloperAction: true,
      },
      {
        title: 'CASA Tier 2 Assessment Budget ($15k–$75k)',
        description: 'Required if requesting restricted Gmail or Drive scopes for external users.',
        required: false,
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
        requiresDeveloperAction: true,
      },
    ],

    nuances: [
      {
        title: 'Scope Classification Rules (Sensitive vs Restricted)',
        category: 'scopes_trigger_review',
        detail: 'gmail.send is classified as Sensitive (requires verification only). In contrast, gmail.readonly, gmail.modify, gmail.compose, gmail.metadata, mail.google.com, and https://www.googleapis.com/auth/drive are classified as Restricted (requires verification + annual CASA Tier 2 assessment).',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        title: 'Annual CASA Assessment Costs ($15,000–$75,000)',
        category: 'paid_accounts',
        detail: 'Restricted scopes require an annual Cloud Application Security Assessment (CASA) conducted by an accredited third-party security lab (e.g., Bishop Fox, Praetorian, Leviathan), costing between $15k and $75k depending on codebase complexity.',
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
      },
      {
        title: 'Internal-Only Workspace Exemption',
        category: 'admin_restrictions',
        detail: 'If your application is restricted exclusively to users within your own Google Workspace enterprise domain (Internal mode), no verification or CASA audit is required.',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Configure OAuth Consent Screen in GCP Console',
        summary: 'Navigate to APIs & Services > OAuth consent screen. Select External (or Internal for Workspace).',
        details: 'Fill in application name, user support email, authorized domains, and developer contact email.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://console.cloud.google.com/apis/credentials/consent',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 2,
        title: 'Verify Domain in Google Search Console',
        summary: 'Add DNS TXT record to prove ownership of your authorized domains.',
        details: 'Google verifies that the account submitting for verification owns the domain listed in your privacy policy and callback URLs.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://search.google.com/search-console',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 3,
        title: 'Generate Web Application Credentials',
        summary: 'Create OAuth client ID, specify Authorized redirect URIs, and copy client secrets.',
        details: 'Add http://localhost:3000/api/auth/callback/google for dev and https://yourapp.com/api/auth/callback/google for prod.',
        actor: 'Either',
        status: 'primary-docs',
        url: 'https://console.cloud.google.com/apis/credentials',
      },
      {
        stepNumber: 4,
        title: 'Implement Authorization URL with Offline Access',
        summary: 'Direct user to https://accounts.google.com/o/oauth2/v2/auth with access_type=offline and prompt=consent.',
        details: 'Pass prompt=consent to ensure Google returns a refresh token on subsequent logins.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://developers.google.com/identity/protocols/oauth2/web-server',
        codeSnippet: `// Initiate Google OAuth with refresh token request
const params = new URLSearchParams({
  client_id: process.env.GOOGLE_CLIENT_ID!,
  redirect_uri: 'https://yourapp.com/api/auth/callback/google',
  response_type: 'code',
  scope: 'openid email profile https://www.googleapis.com/auth/drive.file',
  access_type: 'offline',
  prompt: 'consent',
  state: secureCsrfState,
});
res.redirect(\`https://accounts.google.com/o/oauth2/v2/auth?\${params.toString()}\`);`,
        codeLanguage: 'typescript',
      },
      {
        stepNumber: 5,
        title: 'Submit Verification Package & Schedule CASA Audit',
        summary: 'Submit YouTube demo video to Google Cloud Trust & Safety; engage accredited security lab if using restricted scopes.',
        details: 'Wait 2–4 weeks for Google review feedback. For restricted scopes, complete laboratory pen-test and architecture review.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
        requiresDeveloperAction: true,
      },
    ],

    potentialBlockers: [
      {
        errorCode: 'unverified_app_warning',
        title: '"Google hasn\'t verified this app" Warning Screen',
        description: 'Users see a scary red warning screen blocking them from proceeding.',
        likelyCause: 'App is in Testing mode or pending Trust & Safety verification.',
        resolution: 'Add testing emails manually in GCP console (up to 100 test users) or complete production verification.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        errorCode: 'casa_audit_cost_blocker',
        title: 'Annual CASA Assessment Budget Requirement',
        description: 'App cannot launch with restricted scopes without completing an annual third-party lab audit ($15k–$75k).',
        likelyCause: 'Using broad scopes like drive or gmail.readonly instead of drive.file.',
        resolution: 'Refactor application to use per-file scope https://www.googleapis.com/auth/drive.file and Google Drive Picker to qualify for Sensitive scope instead of Restricted.',
        severity: 'Critical',
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
      },
    ],

    agentCapabilities: {
      agentCanDo: [
        'Implement OAuth 2.0 authorization code exchange and refresh token rotation',
        'Integrate Google Drive API v3 and Gmail API v1 client SDK calls',
        'Configure Google Drive Picker component to utilize sensitive rather than restricted scopes',
      ],
      youMustDo: [
        'Create Google Cloud Project and configure DNS TXT domain verification',
        'Record unlisted YouTube walkthrough video following exact Google specifications',
        'Contract and fund accredited CASA security lab for restricted scopes audit',
      ],
    },

    evidenceList: [
      {
        claim: 'gmail.send is classified as Sensitive (verification only)',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        claim: 'gmail.readonly, gmail.modify, gmail.compose, gmail.metadata, mail.google.com are Restricted (verification + CASA Tier 2)',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        claim: 'Restricted scopes require annual CASA Tier 2 assessment ($15k–$75k lab fee)',
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
      },
      {
        claim: 'Google Trust & Safety review turnaround is 2–4 weeks',
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        claim: 'Developer effort estimated at 2–4 hours',
        status: 'inferred',
        explanation: 'Concluded from GCP project, DNS TXT verification, and demo video requirements',
      },
    ],

    testedStatement:
      'OAuth Compass researched this guide from official Google Cloud Trust & Safety verification policies and App Defense Alliance CASA specifications. No live OAuth application was provisioned or submitted during this audit.',

    lastCheckedDate: 'November 2026',
    sourceType: 'verified',

    endpoints: {
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
      revocationUrl: 'https://oauth2.googleapis.com/revoke',
    },
    redirectUriConfig: {
      localhostAllowed: true,
      wildcardsAllowed: false,
      httpAllowedInDev: true,
      multipleUrisSupported: true,
      pathMatching: 'Exact',
      examples: {
        development: ['http://localhost:3000/api/auth/callback/google'],
        production: ['https://yourapp.com/api/auth/callback/google'],
      },
      rulesAndTraps: [
        'Wildcard domains are strictly prohibited.',
        'Redirect URIs cannot contain URL fragments or query strings.',
        'Authorized domains must be verified in Google Search Console.',
      ],
      status: 'primary-docs',
      url: 'https://support.google.com/cloud/answer/9110914',
    },
    scopes: [
      {
        name: 'https://www.googleapis.com/auth/drive.file',
        category: 'Drive (Sensitive)',
        riskLevel: 'Sensitive',
        description: 'View and manage Google Drive files that you have opened or created with this app.',
        reviewRequired: true,
        status: 'primary-docs',
        url: 'https://developers.google.com/drive/api/guides/api-specific-auth',
      },
      {
        name: 'https://www.googleapis.com/auth/gmail.send',
        category: 'Gmail (Sensitive)',
        riskLevel: 'Sensitive',
        description: 'Send email messages on user\'s behalf (sensitive scope, verification only).',
        reviewRequired: true,
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        name: 'https://www.googleapis.com/auth/gmail.readonly',
        category: 'Gmail (Restricted)',
        riskLevel: 'Restricted',
        description: 'View user email messages and settings (Restricted: requires CASA Tier 2 audit).',
        reviewRequired: true,
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        name: 'https://www.googleapis.com/auth/drive',
        category: 'Drive (Restricted)',
        riskLevel: 'Restricted',
        description: 'Full access to all Google Drive files and folders (Restricted: requires CASA Tier 2 audit).',
        reviewRequired: true,
        status: 'primary-docs',
        url: 'https://developers.google.com/drive/api/guides/api-specific-auth',
      },
    ],
    verificationRequirements: [
      {
        title: 'Google OAuth API Verification',
        type: 'Trust & Safety Review',
        timeline: '2–4 weeks',
        timelineType: 'official_policy',
        description: 'Mandatory for all production apps using sensitive or restricted scopes.',
        checklist: [
          'Verify authorized domain in Google Search Console',
          'Publish compliant privacy policy addressing user data handling',
          'Submit YouTube demo video showing complete OAuth flow and URL bar',
        ],
        status: 'primary-docs',
        url: 'https://support.google.com/cloud/answer/9110914',
      },
      {
        title: 'Annual CASA Tier 2 Independent Security Assessment',
        type: 'Accredited Lab Audit ($15k–$75k fee)',
        timeline: '4–8 weeks',
        timelineType: 'official_policy',
        description: 'Mandatory annual external security assessment for restricted Gmail and Drive scopes.',
        checklist: [
          'Engage App Defense Alliance accredited lab',
          'Pass OWASP ASVS Level 2 security checks',
          'Provide architectural and data storage security evidence',
        ],
        status: 'primary-docs',
        url: 'https://appdefensealliance.dev/casa',
      },
    ],
    sources: [
      {
        title: 'Google OAuth API Verification FAQs',
        url: 'https://support.google.com/cloud/answer/9110914',
        notes: 'Detailed verification submission guidelines, scope classifications, and demo video requirements.',
        officialDoc: true,
      },
      {
        title: 'Google Drive API: Authentication & Scopes',
        url: 'https://developers.google.com/drive/api/guides/api-specific-auth',
        notes: 'Official Google Drive scopes classification.',
        officialDoc: true,
      },
      {
        title: 'App Defense Alliance: CASA Security Assessment',
        url: 'https://appdefensealliance.dev/casa',
        notes: 'Security framework requirements and lab certifications for restricted scopes.',
        officialDoc: true,
      },
    ],
  },

  // 5. GITHUB
  {
    id: 'github',
    slug: 'github',
    name: 'GitHub',
    tagline: 'Developer identity, repository access, commits, pull requests, and webhooks',
    description: 'OAuth 2.0 Web Application Flow for authenticating GitHub users and accessing Git repositories. Known for zero-friction setup with instant self-serve activation. No external review is required for custom integrations or public OAuth apps.',
    category: 'Developer Tools',
    difficulty: '1 Easy',
    brandColor: '#24292F',
    iconName: 'Github',
    featured: true,
    viewCount: 1980,
    tags: ['Git', 'Developer Tools', 'SSO', 'Repositories', 'Webhooks'],
    authType: 'OAuth 2.0 Web Application Flow (RFC 6749, PKCE supported)',

    setupEffort: {
      value: '20–30 min',
      status: 'inferred',
      explanation: 'Inferred from standard OAuth 2.0 token exchange and single-page developer registration',
    },
    approvalWait: {
      value: 'None documented',
      status: 'primary-docs',
      url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
    },
    overallTime: {
      value: '20–30 min',
      status: 'inferred',
      explanation: 'Instant self-serve enablement without approval waiting period',
    },
    approvalGate: {
      value: 'Self-serve',
      status: 'primary-docs',
      url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
    },

    // Backwards compatibility strings
    estimatedDevTime: '20–30 min',
    estimatedDevTimeNote: 'Inferred from standard OAuth 2.0 implementation with redirect handling and token storage.',
    estimatedReviewTime: 'None documented',
    estimatedReviewTimeNote: 'Official policy: GitHub enforces no external review for OAuth apps or internal GitHub Apps. Review is only required for public GitHub Marketplace listings.',
    approvalType: 'Self-serve',

    approvalPath: [
      {
        stage: 1,
        title: 'Open GitHub Developer Settings > OAuth Apps',
        description: 'Navigate to github.com/settings/developers and click "New OAuth App".',
        gateType: 'Developer Settings Configuration',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
      {
        stage: 2,
        title: 'Provide Application Name & Callback URL',
        description: 'Register Application name, Homepage URL, and Authorization callback URL.',
        gateType: 'Self-serve Form',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
      {
        stage: 3,
        title: 'Generate Client Secret & Deploy',
        description: 'GitHub immediately activates your OAuth client ID and client secret with no review queue.',
        gateType: 'Instant Self-serve',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
    ],

    prerequisites: [
      {
        title: 'GitHub User or Organization Account',
        description: 'Standard free, Pro, or Enterprise GitHub account with permissions to create developer apps.',
        required: true,
        link: 'https://github.com/settings/developers',
        status: 'primary-docs',
        url: 'https://github.com/settings/developers',
        requiresDeveloperAction: true,
      },
      {
        title: 'Designated Callback Route on Your Server',
        description: 'A functioning route (e.g., /api/auth/callback/github) ready to receive the code and state params.',
        required: true,
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
        requiresDeveloperAction: false,
      },
    ],

    nuances: [
      {
        title: 'No Review Required for Custom OAuth Apps',
        category: 'scopes_trigger_review',
        detail: 'GitHub OAuth Apps are activated immediately upon creation. Review is only required if submitting to GitHub Marketplace.',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
      {
        title: 'Accept Header Requirement for JSON Responses',
        category: 'general',
        detail: 'By default, GitHub returns token exchange responses in URL-encoded format unless the client explicitly sends "Accept: application/json".',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps',
      },
      {
        title: 'Single Callback URL per OAuth App',
        category: 'general',
        detail: 'Legacy GitHub OAuth apps only permit a single callback URL per client ID. Staging and production require separate registered OAuth apps.',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Register New OAuth App in Developer Settings',
        summary: 'Visit github.com/settings/developers > OAuth Apps > "New OAuth App".',
        details: 'Fill in Application name, Homepage URL, and Authorization callback URL. Click Register application.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://github.com/settings/developers',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 2,
        title: 'Generate and Store Client Secret',
        summary: 'Click "Generate a new client secret" and copy the secret key immediately.',
        details: 'Store GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in backend environment variables.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 3,
        title: 'Send User to GitHub Authorization URL',
        summary: 'Redirect to https://github.com/login/oauth/authorize with client_id, scope, and state.',
        details: 'Always supply a cryptographically random state parameter to protect against CSRF attacks.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps',
        codeSnippet: `// 1. GitHub authorization redirect
const params = new URLSearchParams({
  client_id: process.env.GITHUB_CLIENT_ID!,
  redirect_uri: 'https://yourapp.com/api/auth/callback/github',
  scope: 'read:user user:email repo',
  state: secureStateToken,
});
res.redirect(\`https://github.com/login/oauth/authorize?\${params.toString()}\`);`,
        codeLanguage: 'typescript',
      },
      {
        stepNumber: 4,
        title: 'Exchange Code for Access Token with JSON Header',
        summary: 'POST code to https://github.com/login/oauth/access_token with Accept: application/json.',
        details: 'Mandatory Accept: application/json header ensures JSON response.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps',
        codeSnippet: `// 2. Token exchange with JSON header
const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: authCode,
    redirect_uri: 'https://yourapp.com/api/auth/callback/github',
  }),
});
const tokenData = await tokenRes.json();`,
        codeLanguage: 'typescript',
      },
    ],

    potentialBlockers: [
      {
        errorCode: 'bad_verification_code',
        title: 'Expired or Previously Redeemed Code',
        description: 'GitHub token exchange returns { error: "bad_verification_code" }.',
        likelyCause: 'Authorization codes expire in 10 minutes and can only be used once.',
        resolution: 'Redeem code immediately on callback and avoid double-requesting.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps',
      },
      {
        errorCode: 'redirect_uri_mismatch',
        title: 'Redirect URI Does Not Match Registered App',
        description: 'User gets error before reaching authorization consent screen.',
        likelyCause: 'Port, protocol, or path in redirect_uri does not match developer settings.',
        resolution: 'Verify callback URL in GitHub Developer Settings.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
    ],

    agentCapabilities: {
      agentCanDo: [
        'Generate state tokens and validation cookie logic',
        'Handle code exchange with Accept: application/json',
        'Query GitHub REST API with Authorization Bearer and mandatory User-Agent headers',
      ],
      youMustDo: [
        'Open github.com/settings/developers and create the app registration',
        'Copy client_secret into private backend environment secrets',
      ],
    },

    evidenceList: [
      {
        claim: 'Zero human review required for custom GitHub OAuth Apps',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
      {
        claim: 'Approval wait time is None documented',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
      {
        claim: 'Approval gate is Self-serve',
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
      {
        claim: 'Setup effort estimated at 20–30 min',
        status: 'inferred',
        explanation: 'Concluded from standard OAuth 2.0 flow and instant developer portal generation',
      },
    ],

    testedStatement:
      'OAuth Compass researched this guide from official GitHub Developer documentation (https://docs.github.com/en/apps). No live OAuth application was provisioned or submitted during this audit.',

    lastCheckedDate: 'November 2026',
    sourceType: 'verified',

    endpoints: {
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      userInfoUrl: 'https://api.github.com/user',
      revocationUrl: 'https://api.github.com/applications/{client_id}/grant',
    },
    redirectUriConfig: {
      localhostAllowed: true,
      wildcardsAllowed: false,
      httpAllowedInDev: true,
      multipleUrisSupported: false,
      pathMatching: 'Strict String Match',
      examples: {
        development: ['http://localhost:3000/api/auth/callback/github'],
        production: ['https://yourapp.com/api/auth/callback/github'],
      },
      rulesAndTraps: [
        'Standard OAuth Apps only support a single Authorization callback URL.',
        'Wildcard domains are not permitted.',
        'Production callbacks must use HTTPS.',
      ],
      status: 'primary-docs',
      url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
    },
    scopes: [
      {
        name: 'read:user',
        category: 'Identity',
        riskLevel: 'Standard',
        description: 'Read-only access to user profile information.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps',
      },
      {
        name: 'user:email',
        category: 'Identity',
        riskLevel: 'Standard',
        description: 'Read user email addresses (including private commit emails).',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps',
      },
      {
        name: 'repo',
        category: 'Repositories',
        riskLevel: 'Sensitive',
        description: 'Full control of private repositories, pull requests, and commits.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps',
      },
    ],
    verificationRequirements: [
      {
        title: 'Self-Serve Instant Activation',
        type: 'Zero External Verification',
        timeline: 'Instant (0 seconds)',
        timelineType: 'official_policy',
        description: 'Official policy: GitHub imposes zero manual review or verification gate for standard OAuth Apps.',
        checklist: ['Register app in developer settings', 'Add User-Agent header in API requests'],
        status: 'primary-docs',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
      },
    ],
    sources: [
      {
        title: 'GitHub Docs: Building OAuth Apps',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps',
        notes: 'Official specification and developer configuration instructions.',
        officialDoc: true,
      },
    ],
  },

  // 6. HUBSPOT
  {
    id: 'hubspot',
    slug: 'hubspot',
    name: 'HubSpot',
    tagline: 'CRM platform, contacts, deals, sales pipelines, and marketing automation',
    description: 'OAuth 2.0 flow for HubSpot Public Apps. Multi-portal installation is instant self-serve for developer test portals and direct customer installs. If submitting for public listing in the HubSpot App Marketplace, review takes 3–7 business days.',
    category: 'CRM & Sales',
    difficulty: '2 Moderate',
    brandColor: '#FF7A59',
    iconName: 'Building2',
    featured: true,
    viewCount: 1120,
    tags: ['CRM', 'Marketing', 'Sales', 'Contacts', 'B2B SaaS'],
    authType: 'OAuth 2.0 (Authorization Code with Refresh Tokens)',

    setupEffort: {
      value: '45–60 min',
      status: 'inferred',
      explanation: 'Inferred from HubSpot developer portal setup, test account creation, and 30-minute token refresh timer',
    },
    approvalWait: {
      value: 'Test portals: None | Marketplace: 3–7 business days',
      status: 'primary-docs',
      url: 'https://developers.hubspot.com/docs/api/marketplace-guidelines',
    },
    overallTime: {
      value: 'Custom/Direct: 45–60 min | Marketplace: 3–7 business days',
      status: 'primary-docs',
      url: 'https://developers.hubspot.com/docs/api/marketplace-guidelines',
    },
    approvalGate: {
      value: 'Self-serve (developer portal) / Marketplace review',
      status: 'primary-docs',
      url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
    },

    // Backwards compatibility strings
    estimatedDevTime: '45–60 min',
    estimatedDevTimeNote: 'Inferred from developer portal configuration, sandbox test portal, and token refresh scheduling.',
    estimatedReviewTime: 'Test portals: None | Marketplace: 3–7 business days',
    estimatedReviewTimeNote: 'Official policy: Installing into private portals is instant self-serve. Public Marketplace directory listing requires 3–7 business days.',
    approvalType: 'App Marketplace Review',

    approvalPath: [
      {
        stage: 1,
        title: 'Create HubSpot App Developer Account',
        description: 'Sign up at developers.hubspot.com and create developer test portal.',
        gateType: 'Developer Portal Account',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com',
      },
      {
        stage: 2,
        title: 'Create App & Configure Scopes in Auth Tab',
        description: 'Add redirect URIs and select required CRM scopes (e.g. crm.objects.contacts.read).',
        gateType: 'Self-serve App Configuration',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        stage: 3,
        title: 'Direct Multi-Portal Installation (Instant Self-Serve)',
        description: 'Share install link with any HubSpot customer. Users select their HubSpot account and authorize without marketplace review.',
        gateType: 'Instant Self-serve',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        stage: 4,
        title: 'Optional HubSpot App Marketplace Listing',
        description: 'Submit app for public marketplace listing. Developer relations team inspects app within 3–7 business days.',
        gateType: 'Marketplace Listing Review (3–7 business days)',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/marketplace-guidelines',
      },
    ],

    prerequisites: [
      {
        title: 'HubSpot App Developer Account',
        description: 'Dedicated developer account created at developers.hubspot.com (distinct from regular CRM portal).',
        required: true,
        link: 'https://developers.hubspot.com/',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/',
        requiresDeveloperAction: true,
      },
      {
        title: 'Developer Test Portal',
        description: 'Sandbox CRM portal created within your developer account to test app installations.',
        required: true,
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/',
        requiresDeveloperAction: true,
      },
      {
        title: 'Public HTTPS Callback URL',
        description: 'HubSpot requires HTTPS in production; permits http://localhost for local testing.',
        required: true,
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
        requiresDeveloperAction: false,
      },
    ],

    nuances: [
      {
        title: 'Short 30-Minute Access Token Lifespan',
        category: 'general',
        detail: 'HubSpot access tokens expire in exactly 1800 seconds (30 minutes). Backend must implement automatic refresh token rotation before token expiration.',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        title: 'Multi-Portal Direct Installs Need No Review',
        category: 'scopes_trigger_review',
        detail: 'Direct OAuth installs by HubSpot customers require zero review. Only public listing on the App Marketplace directory requires the 3–7 business day review.',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        title: 'Tier-Restricted API Scopes',
        category: 'admin_restrictions',
        detail: 'Certain advanced CRM features (such as custom objects or marketing events) require the end-customer portal to be on HubSpot Professional or Enterprise tier.',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
    ],

    steps: [
      {
        stepNumber: 1,
        title: 'Create App in Developer Account',
        summary: 'Log into developers.hubspot.com > Apps > click "Create App".',
        details: 'Go to Auth tab, copy Client ID and Client Secret, and set redirect URIs.',
        actor: 'You',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
        requiresDeveloperAction: true,
      },
      {
        stepNumber: 2,
        title: 'Construct Multi-Portal Install URL',
        summary: 'Direct user to https://app.hubspot.com/oauth/authorize with client_id, scope, and redirect_uri.',
        details: 'HubSpot prompts user to select target HubSpot portal (Hub ID).',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
        codeSnippet: `// 1. HubSpot Authorization URL
const params = new URLSearchParams({
  client_id: process.env.HUBSPOT_CLIENT_ID!,
  redirect_uri: 'https://yourapp.com/api/auth/callback/hubspot',
  scope: 'crm.objects.contacts.read crm.objects.contacts.write',
});
window.location.href = \`https://app.hubspot.com/oauth/authorize?\${params.toString()}\`;`,
        codeLanguage: 'typescript',
      },
      {
        stepNumber: 3,
        title: 'Exchange Authorization Code & Schedule Refresh',
        summary: 'POST code to https://api.hubapi.com/oauth/v1/token and save refresh_token.',
        details: 'Remember: HubSpot access tokens expire in 30 minutes. Schedule a proactive refresh at 25 minutes.',
        actor: 'Agent',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
        codeSnippet: `// 2. HubSpot token exchange
const res = await fetch('https://api.hubapi.com/oauth/v1/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.HUBSPOT_CLIENT_ID!,
    client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
    redirect_uri: 'https://yourapp.com/api/auth/callback/hubspot',
    code: authCode,
  }),
});
const data = await res.json();`,
        codeLanguage: 'typescript',
      },
    ],

    potentialBlockers: [
      {
        errorCode: 'EXPIRED_CODE',
        title: 'Authorization Code Single-Use Expiration',
        description: 'Token exchange fails with error "EXPIRED_CODE" or "INVALID_CODE".',
        likelyCause: 'HubSpot authorization codes can only be used once and expire in 10 minutes.',
        resolution: 'Exchange authorization codes immediately upon callback receipt.',
        severity: 'High',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        errorCode: 'tier_restricted_scope',
        title: 'Portal Tier Incompatibility',
        description: 'Customer receives HTTP 403 Forbidden for feature not available in their portal tier.',
        likelyCause: 'Requesting custom objects or enterprise scopes for a Free/Starter CRM customer.',
        resolution: 'Check portal tier capabilities during initial handshake and provide fallback.',
        severity: 'Medium',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
    ],

    agentCapabilities: {
      agentCanDo: [
        'Implement OAuth token exchange and automatic 25-minute refresh rotation',
        'Handle multi-portal hub_id routing and token persistence',
        'Build CRM contacts and deals synchronization endpoints',
      ],
      youMustDo: [
        'Create developer account at developers.hubspot.com',
        'Configure app scopes and redirect URLs in HubSpot developer portal',
      ],
    },

    evidenceList: [
      {
        claim: 'Marketplace public listing review duration is 3–7 business days',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/marketplace-guidelines',
      },
      {
        claim: 'Multi-portal direct installation requires no marketplace review',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        claim: 'Access token expires in 1800 seconds (30 minutes)',
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        claim: 'Developer effort estimated at 45–60 min',
        status: 'inferred',
        explanation: 'Concluded from developer portal test sandbox setup and token refresh timer requirement',
      },
    ],

    testedStatement:
      'OAuth Compass researched this guide from official HubSpot Developer documentation (https://developers.hubspot.com/docs/api/working-with-oauth). No live OAuth application was provisioned or submitted during this audit.',

    lastCheckedDate: 'November 2026',
    sourceType: 'verified',

    endpoints: {
      authorizationUrl: 'https://app.hubspot.com/oauth/authorize',
      tokenUrl: 'https://api.hubapi.com/oauth/v1/token',
      userInfoUrl: 'https://api.hubapi.com/oauth/v1/access-tokens/{token}',
      revocationUrl: 'https://api.hubapi.com/oauth/v1/refresh-tokens/{token}',
    },
    redirectUriConfig: {
      localhostAllowed: true,
      wildcardsAllowed: false,
      httpAllowedInDev: true,
      multipleUrisSupported: true,
      pathMatching: 'Strict String Match',
      examples: {
        development: ['http://localhost:3000/api/auth/callback/hubspot'],
        production: ['https://yourapp.com/api/auth/callback/hubspot'],
      },
      rulesAndTraps: [
        'Redirect URIs cannot contain query strings.',
        'Wildcard domains are not permitted.',
        'HTTPS is mandatory in production.',
      ],
      status: 'primary-docs',
      url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
    },
    scopes: [
      {
        name: 'crm.objects.contacts.read',
        category: 'Contacts',
        riskLevel: 'Standard',
        description: 'Read CRM contacts and associated contact records.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
      {
        name: 'crm.objects.contacts.write',
        category: 'Contacts',
        riskLevel: 'Standard',
        description: 'Create and edit CRM contacts.',
        reviewRequired: false,
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
      },
    ],
    verificationRequirements: [
      {
        title: 'HubSpot App Marketplace Listing Review (Optional)',
        type: 'Marketplace Directory Inspection',
        timeline: '3–7 business days',
        timelineType: 'official_policy',
        description: 'Required only for public listing in the marketplace directory.',
        checklist: [
          'Verify user installation test in demo portal',
          'Document scopes usage in marketplace listing form',
          'Provide customer support contact',
        ],
        status: 'primary-docs',
        url: 'https://developers.hubspot.com/docs/api/marketplace-guidelines',
      },
    ],
    sources: [
      {
        title: 'HubSpot Developer Docs: Working with OAuth',
        url: 'https://developers.hubspot.com/docs/api/working-with-oauth',
        notes: 'Official specification on tokens, refreshing, and scopes.',
        officialDoc: true,
      },
      {
        title: 'HubSpot App Marketplace Guidelines',
        url: 'https://developers.hubspot.com/docs/api/marketplace-guidelines',
        notes: 'Requirements for public directory listing and security review.',
        officialDoc: true,
      },
    ],
  },
];
