# OAuth Compass

### AI-Powered OAuth Setup Research & Guide Generator

**Live Application:** https://oauthcompass.ai.studio  
**Source Code:** https://github.com/dhiveshyuvaraj1012/oauth-compass

OAuth Compass is an AI-powered platform designed to help developers and AI agent builders understand the process of creating OAuth applications, configuring authentication, meeting provider requirements, and preparing integrations for use.

Instead of manually navigating multiple documentation pages and trying to understand unfamiliar provider requirements, developers can use OAuth Compass to discover setup instructions, estimate implementation effort, identify potential approval requirements, and understand what to do next.

---

## 1. Problem Statement

Developers integrating third-party applications often face challenges such as:

- Understanding OAuth application registration.
- Finding the correct developer documentation.
- Configuring redirect URIs and OAuth scopes.
- Identifying consent screen and verification requirements.
- Understanding provider-specific approval processes.
- Estimating implementation effort and waiting time.
- Identifying potential blockers before starting development.

OAuth Compass addresses these challenges through a centralized library of OAuth guides and an AI-powered research workflow for applications outside the existing directory.

## 2. Key Features

### OAuth Application Directory (Initial Setup of main 4 apps focused)

Browse structured OAuth setup guides for:

- GitHub
- Slack
- Google Drive
- HubSpot

### Application Search (Can be extended using search)

Search for an application using its name or website.

### Step-by-Step OAuth Guides

Each guide is designed to cover:

- Application overview.
- Developer prerequisites.
- OAuth application creation.
- Redirect URI configuration.
- Required scopes and permissions.
- Publishing and verification requirements.
- Common blockers.
- Recommended next actions.

### AI-Powered Guide Generation

Developers can submit an application name or website that is not included in the existing directory.

The research agent investigates the application and generates a structured OAuth setup guide using available documentation and research sources.

### Setup Effort and Difficulty

Guides distinguish between:

- Estimated developer implementation effort.
- External provider review and approval waiting time.
- OAuth setup complexity.

Difficulty is classified as Easy, Medium, or Hard based on the requirements and complexity of the setup.

### Evidence and Source Transparency

Generated guidance distinguishes between:

- Officially documented information.
- Reasoned estimates.
- Information that remains unverified.

### Shareable Guides

Generated guides can be shared with other developers through their corresponding links.

---

## 3. Technology Stack

| Component | Technology |
|---|---|
| AI-assisted development | Google AI Studio |
| Frontend | React |
| Programming language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| AI integration | Google Gemini API |
| Deployment platform | Google AI Studio / Google Cloud Run |
| Backend runtime | Node.js (if implemented) |
| Persistent storage | Specify actual implementation |

---

## 4. How It Works

### Existing Application Guides

1. A developer opens the application directory.
2. They search for an OAuth provider.
3. They open its setup guide.
4. They review prerequisites, configuration instructions, scopes and verification requirements.
5. They follow the recommended setup steps.

### Live AI Research Workflow

1. A developer enters an application name or website.
2. The AI agent identifies the application.
3. It investigates available OAuth and developer documentation.
4. It extracts relevant configuration requirements.
5. It evaluates approval requirements and potential blockers.
6. It estimates developer effort and classifies setup complexity.
7. It generates an actionable OAuth setup guide.
8. The developer reviews the sources, evidence and remaining uncertainties.
9. The generated guide can be shared.

---

## 5. Research and Validation Methodology

OAuth requirements can vary significantly between providers and may change over time.

OAuth Compass uses the following evidence classification:

| Classification | Meaning |
|---|---|
| Officially documented | Supported by an official provider source |
| Estimated | An estimate based on the complexity of documented requirements |
| Unverified | Could not be independently confirmed |

### Duration Estimation

Developer implementation effort and external approval waiting time are treated separately.

If a provider does not publish an approval timeline, the guide should state:

"Approval duration is not publicly confirmed."

### Difficulty Classification

- **Easy:** Basic OAuth application registration and configuration.
- **Medium:** Additional scopes, permissions or publishing requirements.
- **Hard:** Complex verification, restricted permissions, security assessments or additional approval requirements.

These are product classifications, not official provider ratings.

### Testing Transparency

The project distinguishes between:

- Requirements confirmed through documentation.
- Setup steps actually attempted.
- Requirements that could not be tested.
- Information that remains uncertain.

No successful provider approval or OAuth test is claimed without actual verification.

---

## 6. Limitations

- AI-generated guidance may require manual verification.
- Provider documentation and policies can change.
- Approval timelines are not always publicly available.
- External approval cannot be guaranteed.
- Some setup and verification steps require direct developer involvement.
- The initial directory demonstrates a focused selection of OAuth providers rather than a complete library of 100 applications.
- Live research results depend on the availability and quality of accessible documentation.

---

## 7. Running Locally

### Prerequisites

- Node.js (LTS)
- npm
- Git

### Clone the repository

```bash
git clone https://github.com/dhiveshyuvaraj1012/oauth-compass.git

cd oauth-compass
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file if required by the implementation.

Add the environment variables used by the server-side application.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit actual API keys or credentials to GitHub.

### Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

## 8. Key Product Decisions

1. Focused on a small selection of varied OAuth providers rather than generating a large collection of incomplete guides.
2. Prioritized actionable setup instructions over generic OAuth explanations.
3. Separated developer implementation effort from external approval waiting time.
4. Introduced difficulty classifications to help developers understand setup complexity.
5. Included source transparency to distinguish documented facts from estimates and uncertainty.
6. Added live AI guide generation to support applications beyond the predefined directory.

---

## 9. Future Scope

- Expand the directory to cover 100 OAuth-enabled applications.
- Improve automated source verification.
- Add more provider-specific setup testing.
- Improve guide freshness monitoring.
- Expand agent capabilities to investigate additional setup steps where permitted.

---

---

*OAuth Compass aims to make OAuth setup more understandable, predictable and actionable for developers and AI agent builders.*
