// PHASE 0 — PROFILE & FUNNEL FIX (Week 1) — CRITICAL
// 50 applications produced 2 interviews. Fix what's being filtered before adding volume.
import { defineModule } from './define';

const RESUME_TYPE_SPEC =
  'Name: Liberation Serif Bold 16pt · Section headings: Liberation Serif Bold 11pt with a divider rule on the heading’s own line running to the right margin · Entry titles: Liberation Sans Bold 8.5pt · Body: Liberation Sans 8.5pt · Dates/stacks: Liberation Sans Italic 8pt · All hyperlinks live · Exactly one full page.';

export const phase0 = [
  // ───────────────────────── 0.1 Resume System ─────────────────────────
  ...defineModule('resume', 0, {
    Audit: [
      { id: 'res-001', title: 'Collect 5 JDs you were rejected from (Amex Analyst, Barclays DE, LinkedIn DE, Optum Assoc. DA, Deloitte D&A) into one doc', priority: 'critical' },
      { id: 'res-002', title: 'Keyword-gap table: every tool / skill / phrase in the 5 JDs vs current resume — present, missing, claimable', priority: 'critical', resourceIds: ['r-jobscan'] },
      { id: 'res-003', title: 'Mark what is honestly claimable today vs only after the roadmap (e.g. PySpark after the 1.3 project)', priority: 'high' },
    ],
    'Master resume': [
      { id: 'res-004', title: 'Build the master resume (long form): every role, project, cert, award and metric in one place', priority: 'critical' },
      { id: 'res-005', title: 'Quantify pass — every bullet gets a number or concrete outcome (users, %, rows, latency, tests, ₹)', priority: 'critical', notes: 'No bullet without a number or a concrete outcome. KYRO: 19 rules, 3 tiers, 27 tests. Confer: 100+ users, 15+ experts in week one. Faculty Review: 1,200+ reviews.' },
      { id: 'res-006', title: 'Write 3 angles per project bullet set (analyst / data scientist / engineering) into the master', priority: 'high' },
    ],
    Variants: [
      { id: 'res-007', title: 'Analyst variant — SQL, Excel, BI, stats forward; Faculty Review Analytics + Outright first', priority: 'critical', notes: RESUME_TYPE_SPEC },
      { id: 'res-008', title: 'Data Scientist variant — Outright, NeuroLens, Faculty Review; modelling, evaluation, metrics', priority: 'critical', notes: RESUME_TYPE_SPEC },
      { id: 'res-009', title: 'SDE variant — Confer + KYRO backend first; Java, APIs, WebSockets, Docker, testing', priority: 'high', notes: RESUME_TYPE_SPEC },
      { id: 'res-010', title: 'ML Engineer variant — KYRO + NeuroLens + AWS SA-A; pipelines, serving, evaluation', priority: 'high', notes: RESUME_TYPE_SPEC },
      { id: 'res-011', title: 'Typography pass on all 4 variants (exact font / size / divider spec)', priority: 'high', notes: RESUME_TYPE_SPEC },
    ],
    'QA & ship': [
      { id: 'res-012', title: 'ATS plain-text parse test on each variant (copy → .txt / Jobscan); fix anything that scrambles', priority: 'critical', resourceIds: ['r-jobscan', 'r-resume-worded'] },
      { id: 'res-013', title: 'Link check (GitHub, LinkedIn, live demos, portfolio) + confirm each variant is exactly one full page', priority: 'high' },
      { id: 'res-014', title: 'Get one senior + one peer to review the Analyst variant; apply fixes', priority: 'medium' },
      { id: 'res-015', title: 'Export PDFs as Krishnav_Agarwal_<Role>.pdf and tick them off in Profile → Resume variants', priority: 'medium' },
    ],
  }),

  // ───────────────────────── 0.2 LinkedIn Optimisation ─────────────────────────
  ...defineModule('linkedin', 0, {
    'Profile copy': [
      { id: 'li-001', title: 'Rewrite headline — role + stack + proof (e.g. "Data Science @ VIT ’27 | SQL · Python · AWS SA | Built KYRO, an AI governance runtime")', priority: 'critical' },
      { id: 'li-002', title: 'Rewrite About — 4 short paragraphs of concrete facts: what you build, proof points, what you want; no filler', priority: 'high' },
      { id: 'li-003', title: 'Experience entries: Outright + Career Vision Hub, 2–3 achievement bullets each (reuse resume bullets)', priority: 'high' },
      { id: 'li-004', title: 'Certifications section: AWS SA-A, CCP, AWS Academy, IIT Roorkee DS, Google DA — with credential links', priority: 'medium' },
    ],
    'Showcase': [
      { id: 'li-005', title: 'Add all 4 projects to Featured (repo / live link / case study)', priority: 'high' },
      { id: 'li-006', title: 'Skills: list 15–20, pin top 3 for Analyst (SQL, Python, Data Analysis); ask 5 peers to endorse', priority: 'medium' },
      { id: 'li-007', title: 'Profile photo (plain background, shoulders-up) + banner with tagline and stack', priority: 'medium' },
      { id: 'li-008', title: 'Custom public URL (linkedin.com/in/krishnav-agarwal if free)', priority: 'low' },
    ],
    'Signals & network': [
      { id: 'li-009', title: 'Turn on Open to Work (recruiters only): Data Analyst, Business Analyst, Data Scientist, SDE, ML Engineer; start mid-2027', priority: 'critical' },
      { id: 'li-010', title: 'Request 2–3 recommendations (Outright manager, Confer / KYRO collaborators) — send a draft they can edit', priority: 'high' },
      { id: 'li-011', title: 'Connect with 20 VIT alumni at target companies (personalised one-line note each)', priority: 'high' },
      { id: 'li-012', title: 'Set weekly posting cadence and draft post #1 (KYRO architecture, diagram + 3 lessons)', priority: 'medium' },
    ],
  }),

  // ───────────────────────── 0.3 GitHub Polish ─────────────────────────
  ...defineModule('github', 0, {
    Profile: [
      { id: 'gh-001', title: 'Profile README: one-line intro, stack badges, featured projects, contact links', priority: 'high', resourceIds: ['r-gh-profile-readme', 'r-shields'] },
      { id: 'gh-002', title: 'Pin the 4 strongest repos (KYRO, Confer, Faculty Review Analytics, NeuroLens)', priority: 'high' },
      { id: 'gh-003', title: 'Archive or make private clutter repos (tutorial clones, empty repos, forks you never touched)', priority: 'medium' },
    ],
    'Pinned repo READMEs': [
      { id: 'gh-004', title: 'Draw architecture diagrams (Excalidraw) for KYRO, Confer, Faculty Review Analytics', priority: 'high', resourceIds: ['r-excalidraw'] },
      { id: 'gh-005', title: 'KYRO README: problem, 3-tier architecture diagram, screenshots/GIF, setup, stack, test badge (27 tests)', priority: 'critical' },
      { id: 'gh-006', title: 'Confer README: live link at top, screenshots, architecture, payment flow, week-one user numbers', priority: 'high' },
      { id: 'gh-007', title: 'Faculty Review Analytics README: pipeline diagram, VADER → Gemini cascade, sample dashboard', priority: 'high' },
      { id: 'gh-008', title: 'NeuroLens: publish repo with README — dataset, 4-class results table, confusion matrix, Grad-CAM samples', priority: 'high' },
      { id: 'gh-009', title: 'Record screenshots / short GIFs for KYRO dashboard and Confer booking flow', priority: 'medium' },
    ],
    Hygiene: [
      { id: 'gh-010', title: 'Add LICENSE (MIT) and .gitignore where missing; make sure no .env or keys are committed', priority: 'medium', resourceIds: ['r-choosealicense', 'r-gitignore'] },
      { id: 'gh-011', title: 'Contribution cadence: commit something real ≥ 4 days a week (roadmap code and notebooks count)', priority: 'low' },
    ],
  }),

  // ───────────────────────── 0.4 Portfolio Website ─────────────────────────
  ...defineModule('portfolio', 0, {
    Build: [
      { id: 'pf-001', title: 'Scaffold Vite + React + Tailwind (or Next.js) and deploy an empty shell to Vercel', priority: 'high', resourceIds: ['r-vercel'] },
      { id: 'pf-002', title: 'Write the copy first: hero one-liner, 80-word about, grouped skills list', priority: 'high' },
      { id: 'pf-003', title: 'Build hero + about + skills sections', priority: 'high' },
      { id: 'pf-004', title: 'Experience section (Outright, Career Vision Hub) + certifications', priority: 'medium' },
      { id: 'pf-005', title: 'Projects grid with stack tags, repo + live links', priority: 'high' },
    ],
    'Case studies': [
      { id: 'pf-006', title: 'KYRO case study: problem → approach → architecture → result → what I’d do differently', priority: 'high' },
      { id: 'pf-007', title: 'Confer case study (same 5-part structure, include week-one traction)', priority: 'medium' },
      { id: 'pf-008', title: 'Faculty Review Analytics + NeuroLens case studies (shorter)', priority: 'medium' },
    ],
    Ship: [
      { id: 'pf-009', title: 'Resume download (all 4 variants) + contact section', priority: 'medium' },
      { id: 'pf-010', title: 'Mobile + Lighthouse pass (perf & accessibility ≥ 90), alt text, meta + OG tags', priority: 'medium' },
      { id: 'pf-011', title: 'Link the portfolio from LinkedIn, GitHub profile README and every resume variant', priority: 'high' },
      { id: 'pf-012', title: 'Optional: custom domain on Vercel', priority: 'low' },
    ],
  }),

  // ───────────────────────── 0.5 Application Funnel Audit ─────────────────────────
  ...defineModule('funnel', 0, {
    Diagnosis: [
      { id: 'fn-001', title: 'Post-mortem of the 2 failed technical interviews: every question asked, where you stalled, which module fixes it', priority: 'critical', notes: 'Turn every weakness into a concrete fix. This is the most valuable 30 minutes of week 1.' },
      { id: 'fn-002', title: 'Back-fill the tracker with the 50+ past applications you can remember (company, role, channel, outcome)', priority: 'high' },
      { id: 'fn-003', title: 'Channel audit: which channels produced responses / the 2 interviews, which produced nothing', priority: 'critical' },
    ],
    'Targets & referrals': [
      { id: 'fn-004', title: 'Rebuild target list, tiered: ~15 Tier 1 (dream), ~25 Tier 2 (strong fit), ~40 Tier 3 (volume)', priority: 'critical' },
      { id: 'fn-005', title: 'Referral target list v1: relatives, VIT seniors, alumni at Tier 1/2 firms — 25 names to start', priority: 'critical' },
      { id: 'fn-006', title: 'Write referral outreach templates: LinkedIn note (≤300 chars), InMail, email, WhatsApp', priority: 'high' },
      { id: 'fn-007', title: 'Set the weekly quota (8–10 tailored) + channel mix; block Mon/Wed/Fri application slots', priority: 'high' },
    ],
  }),
];
