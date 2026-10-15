// Options for the Applications tracker. Your applications themselves are saved in the
// app's database (the 16 you'd sent before starting were loaded from seed/applications.json).
import type { AppStatus } from './types';

export const STATUSES: AppStatus[] = ['Applied', 'OA', 'Interview', 'Offer', 'Rejected', 'No Response'];
export const TIERS = ['Tier 1', 'Tier 2', 'Tier 3'];
export const CHANNELS = ['VIT CDC / NEO', 'Referral', 'Company site', 'LinkedIn', 'Naukri', 'Instahyre', 'Cutshort', 'Hirect', 'Wellfound', 'YC Work at a Startup', 'Unstop', 'Other', 'Unknown'];
export const RESUME_VARIANTS = ['Analyst', 'Data Scientist', 'SDE', 'ML Engineer', 'Master', 'Old (pre-roadmap)'];

/** Ticked per application — open one in the tracker before an OA or interview. */
export const preInterviewChecklist: { id: string; title: string }[] = [
  { id: 'research', title: 'Company research: products, recent news, tech stack' },
  { id: 'interviewers', title: 'Look up the interviewers on LinkedIn' },
  { id: 'jd-map', title: 'Re-read the JD; map each requirement to a story or project' },
  { id: 'revise', title: 'Revise the relevant technical topics' },
  { id: 'stories', title: 'Say "tell me about yourself" + 3 STAR stories out loud' },
  { id: 'questions', title: 'Prepare 3 questions to ask them' },
  { id: 'setup', title: 'Test camera, mic, IDE and a backup internet connection' },
  { id: 'docs', title: 'Formals ready; ID, marksheets and resume PDF ready' },
];
