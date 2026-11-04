import { OAuthGuide } from '../types/oauth';

export function generatePrintableHtml(guide: OAuthGuide): string {
  const primaryUrl = guide.sources?.[0]?.url || 'https://oauth.net/2/';
  const effort = guide.setupEffort?.value || guide.estimatedDevTime || 'Not published';
  const wait = guide.approvalWait?.value || guide.estimatedReviewTime || 'Not published';
  const gate = guide.approvalGate?.value || guide.approvalType || 'Self-serve';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${guide.name} — OAuth 2.0 Setup Guide & Verification Roadmap</title>
  <style>
    @page {
      margin: 1.5cm;
      size: A4 portrait;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      font-size: 12px;
      margin: 0;
      padding: 24px;
    }
    .header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .title-area h1 {
      font-size: 24px;
      margin: 0 0 6px 0;
      color: #0f172a;
    }
    .tagline {
      color: #475569;
      font-size: 13px;
      margin: 0 0 8px 0;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-easy { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .badge-moderate { background: #fef9c3; color: #854d0e; border: 1px solid #fef08a; }
    .badge-hard { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }
    .badge-very-hard { background: #ffe4e6; color: #9f1239; border: 1px solid #fecdd3; }
    .badge-gated { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; }
    
    .status-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      font-family: monospace;
    }
    .status-primary { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
    .status-secondary { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .status-inferred { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }
    .status-unverified { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
    }
    .metric-label {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .metric-value {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
    }
    .metric-sub {
      font-size: 10px;
      color: #64748b;
      margin-top: 4px;
    }

    .section {
      margin-bottom: 24px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-bottom: 12px;
    }

    .step-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .step-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .step-title {
      font-weight: 700;
      font-size: 12px;
      color: #0f172a;
    }
    .actor-tag {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #e2e8f0;
      color: #334155;
    }
    code, pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 11px;
    }
    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 10px;
      border-radius: 6px;
      overflow-x: auto;
      margin-top: 8px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 11px;
    }
    th, td {
      border: 1px solid #e2e8f0;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: 700;
    }

    .tested-box {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 12px;
      color: #1e40af;
      margin-top: 20px;
      page-break-inside: avoid;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      margin-top: 24px;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #64748b;
    }
    .no-print-bar {
      background: #0f172a;
      color: white;
      padding: 10px 16px;
      margin: -24px -24px 20px -24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-print {
      background: #2563eb;
      color: white;
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }
    @media print {
      .no-print-bar { display: none !important; }
      body { padding: 0 !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div><strong>OAuth Compass — Printable PDF Report</strong> (Click Print or press Ctrl+P / Cmd+P to save as PDF)</div>
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="header">
    <div class="title-area">
      <h1>${guide.name}</h1>
      <p class="tagline">${guide.tagline}</p>
      <div>
        <span class="badge ${
          guide.difficulty.startsWith('1') ? 'badge-easy' :
          guide.difficulty.startsWith('2') ? 'badge-moderate' :
          guide.difficulty.startsWith('3') ? 'badge-hard' :
          guide.difficulty.startsWith('4') ? 'badge-very-hard' : 'badge-gated'
        }">${guide.difficulty}</span>
        <span style="margin-left: 8px; color: #64748b; font-size: 11px;">Category: ${guide.category}</span>
        <span style="margin-left: 8px; color: #64748b; font-size: 11px;">Protocol: ${guide.authType}</span>
      </div>
    </div>
    <div style="text-align: right; font-size: 10px; color: #64748b;">
      <div>Last Checked: <strong>${guide.lastCheckedDate}</strong></div>
      <div>Source: <strong>OAuth Compass Audit</strong></div>
    </div>
  </div>

  <!-- SECTION 2: METRICS -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-label">Developer Effort</div>
      <div class="metric-value">${effort}</div>
      <div class="metric-sub"><span class="status-badge status-${guide.setupEffort?.status || 'inferred'}">${guide.setupEffort?.status || 'inferred'}</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Approval Wait Time</div>
      <div class="metric-value">${wait}</div>
      <div class="metric-sub"><span class="status-badge status-${guide.approvalWait?.status || 'unverified'}">${guide.approvalWait?.status || 'unverified'}</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Approval Gate</div>
      <div class="metric-value">${gate}</div>
      <div class="metric-sub"><span class="status-badge status-${guide.approvalGate?.status || 'primary-docs'}">${guide.approvalGate?.status || 'primary-docs'}</span></div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Overall Setup Time</div>
      <div class="metric-value">${guide.overallTime?.value || effort}</div>
      <div class="metric-sub"><span class="status-badge status-${guide.overallTime?.status || 'inferred'}">${guide.overallTime?.status || 'inferred'}</span></div>
    </div>
  </div>

  <!-- SECTION 3: APPROVAL PATH -->
  <div class="section">
    <div class="section-title">Approval Path & Milestone Gates</div>
    ${guide.approvalPath?.map(p => `
      <div style="margin-bottom: 8px; padding-left: 12px; border-left: 3px solid #2563eb;">
        <strong>Stage ${p.stage}: ${p.title}</strong> [${p.gateType}]
        <div style="font-size: 11px; color: #475569;">${p.description}</div>
      </div>
    `).join('') || '<p>Self-serve direct distribution without mandatory external review.</p>'}
  </div>

  <!-- SECTION 4: PREREQUISITES -->
  <div class="section">
    <div class="section-title">Developer Prerequisites & Requirements</div>
    <ul>
      ${guide.prerequisites?.map(req => `
        <li style="margin-bottom: 6px;">
          <strong>${req.title}</strong> ${req.required ? '<span style="color:#dc2626;">(Mandatory)</span>' : '(Optional)'}
          <div style="color: #475569; font-size: 11px;">${req.description}</div>
        </li>
      `).join('')}
    </ul>
  </div>

  <!-- SECTION 5: NUANCES -->
  <div class="section">
    <div class="section-title">Nuances That Affect Setup</div>
    <ul>
      ${guide.nuances?.map(n => `
        <li style="margin-bottom: 6px;">
          <strong>${n.title}</strong>: <span style="color: #475569;">${n.detail}</span>
        </li>
      `).join('') || '<li>Standard OAuth 2.0 PKCE / Authorization Code flow rules apply.</li>'}
    </ul>
  </div>

  <!-- SECTION 6: STEPS -->
  <div class="section">
    <div class="section-title">Step-by-Step Implementation Instructions</div>
    ${guide.steps?.map(s => `
      <div class="step-item">
        <div class="step-header">
          <span class="step-title">Step ${s.stepNumber}: ${s.title}</span>
          <span class="actor-tag">[${s.actor}]</span>
        </div>
        <p style="margin: 4px 0; color: #334155;">${s.details || s.summary}</p>
        ${s.codeSnippet ? `<pre><code>${escapeHtml(s.codeSnippet)}</code></pre>` : ''}
      </div>
    `).join('')}
  </div>

  <!-- SECTION 7: POTENTIAL BLOCKERS -->
  <div class="section">
    <div class="section-title">Common Errors & Blockers</div>
    ${guide.potentialBlockers?.map(b => `
      <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 6px; padding: 10px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between;">
          <strong style="color: #9f1239;">${b.title} (${b.errorCode})</strong>
          <span style="font-size: 10px; font-weight: 700; color: #be123c;">${b.severity}</span>
        </div>
        <div style="color: #4c0519; margin: 4px 0;">${b.description}</div>
        <div style="font-size: 11px; color: #1e3a8a;"><strong>Resolution:</strong> ${b.resolution}</div>
      </div>
    `).join('')}
  </div>

  <!-- SECTION 8: AGENT VS HUMAN -->
  <div class="section">
    <div class="section-title">What an Agent Can Do vs What You Must Do</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
        <strong style="color: #4338ca;">What an AI Agent Can Do:</strong>
        <ul style="margin: 6px 0 0 0; padding-left: 16px;">
          ${guide.agentCapabilities?.agentCanDo?.map(item => `<li>${item}</li>`).join('') || '<li>Write code and route handlers</li>'}
        </ul>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px;">
        <strong style="color: #065f46;">What You Must Do:</strong>
        <ul style="margin: 6px 0 0 0; padding-left: 16px;">
          ${guide.agentCapabilities?.youMustDo?.map(item => `<li>${item}</li>`).join('') || '<li>Register credentials in console</li>'}
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 9: EVIDENCE LEDGER -->
  <div class="section">
    <div class="section-title">Evidence Ledger & Fact Verification</div>
    <table>
      <thead>
        <tr>
          <th>Claim / Technical Specification</th>
          <th>Status</th>
          <th>Source / Verification Note</th>
        </tr>
      </thead>
      <tbody>
        ${guide.evidenceList?.map(ev => `
          <tr>
            <td><strong>${ev.claim}</strong></td>
            <td><span class="status-badge status-${ev.status}">${ev.status}</span></td>
            <td>${ev.url ? `<a href="${ev.url}" target="_blank">${ev.url}</a>` : (ev.explanation || 'Documentation absence analysis')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- SECTION 10: TESTED STATEMENT -->
  <div class="tested-box">
    <strong>Verification Audit Statement:</strong><br>
    ${guide.testedStatement || 'OAuth Compass researched this guide from official documentation. No live OAuth application was provisioned or submitted during this audit.'}
  </div>

  <!-- SECTION 11: FOOTER -->
  <div class="footer">
    <div>Generated via <strong>OAuth Compass</strong> (https://oauthcompass.ai.studio)</div>
    <div>Report Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <script>
    // Automatically open print dialog when opened in a separate window
    window.addEventListener('load', function() {
      setTimeout(function() {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print error:', e);
        }
      }, 500);
    });
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
