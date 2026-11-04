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

---

## 2. Key Features

### OAuth Application Directory

The initial directory focuses on four OAuth providers:

- GitHub
- Slack
- Google Drive
- HubSpot

### Application Search

Search for an application using its name or website. The directory can be extended to support additional applications.

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

## 6. Validation & Testing Results

The following applications were selected to demonstrate different OAuth setup requirements and configuration challenges.

| Application | Validation Focus | Result |
|---|---|---|
| GitHub | OAuth app registration and callback configuration | Reviewed GitHub's official OAuth documentation and identified the application registration and callback URL configuration requirements. End-to-end authentication was not tested. |
| Slack | OAuth scopes, permissions and app configuration | Reviewed Slack's OAuth documentation and identified the permission scopes and app configuration requirements. Workspace installation and authorization were not tested. |
| Google Drive | Google Cloud project and consent configuration | Reviewed Google's OAuth documentation and identified the Cloud project, consent configuration and permission requirements. App verification and end-to-end authentication were not tested. |
| HubSpot | Developer app setup and OAuth configuration | Reviewed HubSpot's developer documentation and identified the app setup and OAuth authorization requirements. Live authorization was not tested. |

These are the tested sample apps and also we can generate new apps if it is needed.

## 7. Limitations

- AI-generated guidance may require manual verification.
- Provider documentation and policies can change.
- Approval timelines are not always publicly available.
- External approval cannot be guaranteed.
- Some setup and verification steps require direct developer involvement.
- The initial directory demonstrates a focused selection of OAuth providers rather than a complete library of 100 applications.
- Live research results depend on the availability and quality of accessible documentation.
- Generated guide persistence and sharing depend on the application's actual storage implementation.

---

## 8. Running Locally

### Prerequisites

- Node.js (LTS)
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/dhiveshyuvaraj1012/oauth-compass.git

cd oauth-compass
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file if required by the implementation.

Add the environment variables used by the application.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit actual API keys or credentials to GitHub. Use server-side secret management for production deployments.

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

## 9. Key Product Decisions

1. Focused on a small selection of varied OAuth providers rather than generating a large collection of incomplete guides.
2. Prioritized actionable setup instructions over generic OAuth explanations.
3. Separated developer implementation effort from external approval waiting time.
4. Introduced difficulty classifications to help developers understand setup complexity.
5. Included source transparency to distinguish documented facts from estimates and uncertainty.
6. Added live AI guide generation to support applications beyond the predefined directory.

---

## 10. Future Scope

- Expand the directory to cover 100 OAuth-enabled applications.
- Improve automated source verification.
- Add more provider-specific setup testing.
- Improve guide freshness monitoring.
- Expand agent capabilities to investigate additional setup steps where permitted.
- Improve persistent storage and cross-user guide sharing.

---

