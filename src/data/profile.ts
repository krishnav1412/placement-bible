// Profile asset checklists — the "definition of done" for each public asset.
// Each item is tickable with notes in the app; state is keyed by item id.
import type { ProfileGroup } from './types';

const variantChecks = (key: string, role: string): ProfileGroup => ({
  id: `resume-${key}`,
  title: `Resume — ${role} variant`,
  items: [
    { id: `rv-${key}-1`, title: 'Exactly one full page', detail: 'No half-empty page, no spill-over.' },
    { id: `rv-${key}-2`, title: 'Typography spec applied', detail: 'Name Liberation Serif Bold 16pt · headings Liberation Serif Bold 11pt with rule to right margin · entry titles Liberation Sans Bold 8.5pt · body Liberation Sans 8.5pt · dates/stacks Liberation Sans Italic 8pt.' },
    { id: `rv-${key}-3`, title: 'Every bullet has a number or concrete outcome' },
    { id: `rv-${key}-4`, title: `Top third matches ${role} JD keywords` },
    { id: `rv-${key}-5`, title: 'ATS plain-text parse is clean (order, no merged columns, no lost text)' },
    { id: `rv-${key}-6`, title: 'All hyperlinks live and clickable (GitHub, LinkedIn, portfolio, demos)' },
    { id: `rv-${key}-7`, title: `Exported as Krishnav_Agarwal_${role.replace(/\s+/g, '_')}.pdf` },
  ],
});

export const profileGroups: ProfileGroup[] = [
  {
    id: 'resume-master',
    title: 'Resume — master',
    items: [
      { id: 'rm-1', title: 'Master resume contains every role, project, cert and award' },
      { id: 'rm-2', title: 'Keyword-gap table from 5 rejected JDs is complete' },
      { id: 'rm-3', title: 'Three bullet angles per project (analyst / DS / engineering)' },
      { id: 'rm-4', title: 'Reviewed by one senior and one peer' },
    ],
  },
  variantChecks('analyst', 'Analyst'),
  variantChecks('ds', 'Data Scientist'),
  variantChecks('sde', 'SDE'),
  variantChecks('mle', 'ML Engineer'),
  {
    id: 'linkedin',
    title: 'LinkedIn',
    items: [
      { id: 'pl-1', title: 'Headline: role + stack + proof, keyword-dense' },
      { id: 'pl-2', title: 'About: concrete facts, no filler, ends with what you’re looking for' },
      { id: 'pl-3', title: 'Experience: achievement bullets for Outright + Career Vision Hub' },
      { id: 'pl-4', title: 'Featured: all 4 projects (+ portfolio)' },
      { id: 'pl-5', title: 'Skills: top 3 pinned for target role; ≥ 5 endorsements each' },
      { id: 'pl-6', title: '2–3 recommendations received' },
      { id: 'pl-7', title: 'Professional photo + banner' },
      { id: 'pl-8', title: 'Open to Work (recruiters only) with correct titles + mid-2027 start' },
      { id: 'pl-9', title: 'Certifications with credential links' },
      { id: 'pl-10', title: 'Custom URL' },
      { id: 'pl-11', title: 'Connected with 20+ VIT alumni at target companies' },
      { id: 'pl-12', title: 'Posting cadence running (1 post / week)' },
    ],
  },
  {
    id: 'github',
    title: 'GitHub',
    items: [
      { id: 'pg-1', title: 'Profile README: intro, stack, featured projects, contact' },
      { id: 'pg-2', title: '4 strongest repos pinned' },
      { id: 'pg-3', title: 'KYRO README: problem, diagram, screenshots/GIF, setup, stack, tests' },
      { id: 'pg-4', title: 'Confer README: live link, screenshots, architecture' },
      { id: 'pg-5', title: 'Faculty Review README: pipeline diagram, cascade, sample output' },
      { id: 'pg-6', title: 'NeuroLens repo public with results + Grad-CAM' },
      { id: 'pg-7', title: 'LICENSE + .gitignore on every pinned repo; no secrets committed' },
      { id: 'pg-8', title: 'Clutter repos archived / private' },
      { id: 'pg-9', title: 'Contribution graph active ≥ 4 days a week' },
      { id: 'pg-10', title: 'PySpark + RAG repos added once built' },
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio site',
    items: [
      { id: 'pp-1', title: 'Deployed on Vercel (custom domain optional)' },
      { id: 'pp-2', title: 'Hero with one-line positioning + CTA' },
      { id: 'pp-3', title: 'About, experience, skills, certifications' },
      { id: 'pp-4', title: 'Projects with stack tags + repo/live links' },
      { id: 'pp-5', title: 'Case studies: problem → approach → architecture → result → what I’d do differently' },
      { id: 'pp-6', title: 'Resume downloads for all 4 variants' },
      { id: 'pp-7', title: 'Contact: email, LinkedIn, GitHub' },
      { id: 'pp-8', title: 'Mobile responsive; Lighthouse performance + accessibility ≥ 90' },
      { id: 'pp-9', title: 'Meta + OpenGraph tags (link previews look right)' },
      { id: 'pp-10', title: 'Linked from LinkedIn, GitHub and every resume' },
    ],
  },
  {
    id: 'job-profiles',
    title: 'Job platform profiles',
    items: [
      { id: 'pj-1', title: 'VIT CDC / NEO profile complete + latest resume uploaded' },
      { id: 'pj-2', title: 'Naukri profile complete (headline, key skills, resume)' },
      { id: 'pj-3', title: 'Instahyre, Cutshort, Hirect profiles complete' },
      { id: 'pj-4', title: 'Wellfound + YC Work at a Startup profiles complete' },
      { id: 'pj-5', title: 'Unstop, Devfolio, Kaggle profiles complete' },
    ],
  },
];
