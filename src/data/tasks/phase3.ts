// PHASE 3 — APPLICATION ENGINE (continuous from Week 2)
import { defineModule } from './define';

export const phase3 = [
  // ───────────────────────── 3.1 Application Cadence ─────────────────────────
  ...defineModule('cadence', 3, {
    Playbooks: [
      { id: 'ap-001', title: 'Write the tailoring checklist: pick variant → swap 5 JD keywords → rewrite summary line → check links', priority: 'high' },
      { id: 'ap-002', title: 'Cover-letter template for Tier 1 (3 paragraphs: why them, proof, ask)', priority: 'medium' },
      { id: 'ap-003', title: 'Run the Tier 1 playbook for your first 3 Tier 1 companies: tailored resume + cover letter + referral attempt', priority: 'high' },
      { id: 'ap-004', title: 'Make logging automatic: add this app to your phone home screen; log every application the same day', priority: 'medium' },
    ],
  }),

  // ───────────────────────── 3.2 Channels ─────────────────────────
  ...defineModule('channels', 3, {
    Setup: [
      { id: 'ch-001', title: 'VIT CDC / NEO: verify profile, upload latest resume, turn on every notification', priority: 'critical' },
      { id: 'ch-002', title: 'Job alerts: LinkedIn (5 titles × India), Naukri, Instahyre, Cutshort, Hirect', priority: 'high', resourceIds: ['r-linkedin-jobs', 'r-naukri', 'r-instahyre', 'r-cutshort', 'r-hirect'] },
      { id: 'ch-003', title: 'Complete Wellfound + YC Work at a Startup profiles', priority: 'medium', resourceIds: ['r-wellfound', 'r-yc-waas'] },
      { id: 'ch-004', title: 'Bookmark career pages of 30 target companies (highest-conversion channel); check them weekly', priority: 'high' },
      { id: 'ch-005', title: 'Naukri profile: headline, key skills, resume; update weekly (recency boosts ranking)', priority: 'medium', resourceIds: ['r-naukri'] },
    ],
  }),

  // ───────────────────────── 3.3 Referral Campaign ─────────────────────────
  ...defineModule('referrals', 3, {
    Campaign: [
      { id: 'rf-001', title: 'Build the list of 50 VIT alumni at target companies (LinkedIn: school filter + company)', priority: 'critical' },
      { id: 'rf-002', title: 'Personalise the outreach templates per channel (InMail, email, WhatsApp)', priority: 'high' },
      { id: 'rf-003', title: 'Family & relatives network: list 10 people and who each could introduce you to', priority: 'high' },
      { id: 'rf-004', title: 'Tracking rule: every ask goes in the tracker’s Referral/Contact field; one follow-up after 7 days, then stop', priority: 'medium' },
    ],
  }),

  // ───────────────────────── 3.4 Hackathons & Competitions ─────────────────────────
  ...defineModule('hackathons', 3, {
    Competitions: [
      { id: 'hk-001', title: 'Accounts on Unstop, Devfolio, HackerEarth, MLH; shortlist the next 3 events', priority: 'medium', resourceIds: ['r-unstop', 'r-devfolio', 'r-hackerearth', 'r-mlh'] },
      { id: 'hk-002', title: 'Register for one company hackathon that converts to interviews (e.g. Flipkart GRiD, Amex, Myntra)', priority: 'high' },
      { id: 'hk-003', title: 'Kaggle competition #1: pick one (tabular / NLP), submit a baseline', priority: 'medium', resourceIds: ['r-kaggle'] },
      { id: 'hk-004', title: 'Kaggle #1: iterate — feature engineering + proper CV; aim for bronze', priority: 'medium' },
      { id: 'hk-005', title: 'Kaggle competition #2: baseline + iterate', priority: 'low'},
      { id: 'hk-006', title: 'Put one meaningful competition per 6 weeks on the calendar (Calendar → add deadline)', priority: 'low' },
    ],
  }),

  // ───────────────────────── 3.5 Visibility ─────────────────────────
  ...defineModule('visibility', 3, {
    Writing: [
      { id: 'vs-001', title: 'LinkedIn post #1: KYRO architecture — diagram + 3 lessons', priority: 'high' },
      { id: 'vs-002', title: 'Blog: KYRO’s architecture and the rule-dominant policy (Hashnode / Medium)', priority: 'high', resourceIds: ['r-hashnode', 'r-medium'] },
      { id: 'vs-003', title: 'Blog: the class-imbalance lesson — "the 97% accuracy that meant nothing"', priority: 'high' },
      { id: 'vs-004', title: 'Blog: the two-stage LLM cascade (VADER → Gemini) — cost vs accuracy', priority: 'medium' },
    ],
    'Open source': [
      { id: 'vs-005', title: 'Find 3 good-first-issues in data tooling (pandas, Great Expectations, LangChain docs, Polars)', priority: 'low', resourceIds: ['r-goodfirstissue'] },
      { id: 'vs-006', title: 'Open-source PR #1', priority: 'low' },
      { id: 'vs-007', title: 'Open-source PR #2', priority: 'low' },
      { id: 'vs-008', title: 'Open-source PR #3', priority: 'low' },
    ],
  }),
];
