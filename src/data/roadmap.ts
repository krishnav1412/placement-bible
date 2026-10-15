// THE ROADMAP — phases → modules → topics → tasks.
//
// • Phases and modules are defined here.
// • Tasks live in ./tasks/phase0.ts … phase4.ts, grouped by module and topic.
//
// Your ticks and notes are saved by task id, so you can add, edit, reorder or remove
// tasks freely without losing progress. Never rename or reuse an id.
import type { Module, Phase, Task } from './types';
import { phase0 } from './tasks/phase0';
import { phase1 } from './tasks/phase1';
import { phase2 } from './tasks/phase2';
import { phase3 } from './tasks/phase3';
import { phase4 } from './tasks/phase4';

export const phases: Phase[] = [
  { id: 0, title: 'Profile & Funnel Fix', when: 'Start here · Week 1', why: '50+ applications produced 2 interviews. The resume and OA stage is filtering you out, so fix the assets before sending more.' },
  { id: 1, title: 'Core Technical Rebuild', when: 'Weeks 2–7', why: 'SQL is the highest-return skill for analyst roles, aptitude is the likely silent OA filter, and PySpark is the biggest gap in your JDs.' },
  { id: 2, title: 'Interview Machinery', when: 'Weeks 8–16', why: 'Convert the interviews you get. Breadth over depth: enough to discuss confidently and solve standard problems.' },
  { id: 3, title: 'Application Engine', when: 'Alongside everything, from Week 2', why: 'Tailored volume through the channels that convert. Referrals and company career pages first.' },
  { id: 4, title: 'Revision', when: 'From Week 8 until the offer', why: 'Keep everything warm. Rate yourself in Interview and practise the weakest questions first.' },
];

export const modules: Module[] = [
  // Phase 0
  { id: 'resume', phase: 0, code: '0.1', title: 'Resume System', summary: 'Master resume + 4 tailored, ATS-clean one-page variants.' },
  { id: 'linkedin', phase: 0, code: '0.2', title: 'LinkedIn', summary: 'Keyword-dense headline, concrete About, Featured projects, alumni network.' },
  { id: 'github', phase: 0, code: '0.3', title: 'GitHub Polish', summary: 'Profile README, pinned repos with diagrams and screenshots, clean hygiene.' },
  { id: 'portfolio', phase: 0, code: '0.4', title: 'Portfolio Website', summary: 'One weekend: case-study depth, fast, linked from everything.' },
  { id: 'funnel', phase: 0, code: '0.5', title: 'Application Funnel Audit', summary: 'Post-mortem, tiered targets, channel audit, referral list, quota.' },
  // Phase 1
  { id: 'sql', phase: 1, code: '1.1', title: 'SQL', summary: 'Fundamentals → window functions → the 10 classic interview patterns. 150 practice problems.' },
  { id: 'aptitude', phase: 1, code: '1.2', title: 'Aptitude & Online Tests', summary: 'Quant, logical, verbal, DI, platform patterns and 20 full mocks.' },
  { id: 'pyspark', phase: 1, code: '1.3', title: 'PySpark & Big Data', summary: 'Spark architecture, DataFrame API, tuning, Delta, plus a real project on GitHub.' },
  { id: 'dbms', phase: 1, code: '1.4', title: 'DBMS', summary: 'Keys, normalisation, transactions, concurrency, indexing, NoSQL / MongoDB.' },
  { id: 'os', phase: 1, code: '1.5', title: 'Operating Systems', summary: 'Processes, scheduling numericals, sync, deadlock, memory, paging.' },
  { id: 'cn', phase: 1, code: '1.6', title: 'Computer Networks', summary: 'OSI / TCP-IP, subnetting, TCP vs UDP, HTTP, DNS, TLS.' },
  { id: 'oop', phase: 1, code: '1.7', title: 'OOP in Java', summary: 'Pillars, Java mechanics, collections, SOLID, design patterns.' },
  // Phase 2
  { id: 'dsa', phase: 2, code: '2.1', title: 'DSA in Java', summary: '~140 easy/medium problems. Pattern recognition over mastery.' },
  { id: 'stats', phase: 2, code: '2.2', title: 'Statistics & Probability', summary: 'Inference, hypothesis tests, A/B testing end to end, puzzles.' },
  { id: 'ml', phase: 2, code: '2.3', title: 'Machine Learning', summary: 'Every classic algorithm at interview depth; metrics; imbalance; deployment.' },
  { id: 'dl', phase: 2, code: '2.4', title: 'Deep Learning & GenAI', summary: 'NN → CNN → transformers → LLMs, agents, eval, and one RAG project.' },
  { id: 'case', phase: 2, code: '2.5', title: 'Business & Case', summary: 'Guesstimates, frameworks, product metrics, Excel, 3 BI dashboards.' },
  { id: 'sysdesign', phase: 2, code: '2.6', title: 'System Design (light)', summary: 'Building blocks + 4 classic designs. Backup for SDE roles.' },
  { id: 'behavioural', phase: 2, code: '2.7', title: 'Behavioural & Stories', summary: 'STAR stories, tell-me-about-yourself, Amazon principles, salary basics.' },
  { id: 'mocks', phase: 2, code: '2.8', title: 'Mock Interviews', summary: '0 for 2 so far, so this is non-negotiable. Setup, partners and project deep-dive drills.' },
  // Phase 3
  { id: 'cadence', phase: 3, code: '3.1', title: 'Application Playbook', summary: '8–10 tailored applications a week, more effort for Tier 1.' },
  { id: 'channels', phase: 3, code: '3.2', title: 'Channels', summary: 'VIT CDC / NEO, job boards, career pages, startup platforms.' },
  { id: 'referrals', phase: 3, code: '3.3', title: 'Referrals', summary: '50 alumni, family network, templated asks, one follow-up.' },
  { id: 'hackathons', phase: 3, code: '3.4', title: 'Hackathons & Kaggle', summary: 'Company hackathons that convert to interviews; a Kaggle bronze.' },
  { id: 'visibility', phase: 3, code: '3.5', title: 'Visibility', summary: 'LinkedIn posts, 3 technical blogs, 2–3 open-source PRs.' },
  // Phase 4
  { id: 'srs', phase: 4, code: '4.1', title: 'Second Revision Pass', summary: 'Rate every interview question once, then a full second pass in February.' },
  { id: 'weekly', phase: 4, code: '4.2', title: 'Funnel Check-ins', summary: 'Set funnel targets and check whether the profile work is paying off.' },
  { id: 'preinterview', phase: 4, code: '4.3', title: 'Interview Kit', summary: 'Research and story-mapping templates, and a ready setup for every interview.' },
];

/** Every roadmap task, in curriculum order. */
export const tasks: Task[] = [
  ...phase0,
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  // One-off additions can go here too — any object with a new id works:
  // { id: 'x-001', title: '…', module: 'sql', phase: 1, topic: 'Extra', priority: 'high' },
];

// ───────── lookups (derived — don't edit) ─────────
export const taskById = new Map(tasks.map((t) => [t.id, t]));
export const moduleById = new Map(modules.map((m) => [m.id, m]));
