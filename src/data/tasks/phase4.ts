// PHASE 4 — REVISION (from Week 8 until the offer)
import { defineModule } from './define';

export const phase4 = [
  // ───────────────────────── 4.1 Spaced Repetition ─────────────────────────
  ...defineModule('srs', 4, {
    Calibration: [
      { id: 'sr-001', title: 'Rate every question in Interview 1–5 once, so Practice knows your weak spots', priority: 'high' },
    ],
    'Second revision pass': [
      { id: 'sr-002', title: 'Pass 2 · SQL — the 10 patterns from blank + 10 mixed problems', priority: 'high'},
      { id: 'sr-003', title: 'Pass 2 · Aptitude — 2 full mocks back to back', priority: 'high'},
      { id: 'sr-004', title: 'Pass 2 · PySpark — re-explain architecture + rebuild one transform from memory', priority: 'medium'},
      { id: 'sr-005', title: 'Pass 2 · DBMS — normalisation, isolation levels, indexing out loud', priority: 'high'},
      { id: 'sr-006', title: 'Pass 2 · OS — scheduling + page replacement numericals, deadlock', priority: 'high'},
      { id: 'sr-007', title: 'Pass 2 · CN — URL walkthrough, TCP, subnetting', priority: 'high'},
      { id: 'sr-008', title: 'Pass 2 · OOP / Java — pillars, equals/hashCode, collections, patterns', priority: 'high'},
      { id: 'sr-009', title: 'Pass 2 · DSA — 12 problems across every pattern, timed', priority: 'high'},
      { id: 'sr-010', title: 'Pass 2 · Stats — A/B testing end-to-end + 5 probability puzzles', priority: 'high'},
      { id: 'sr-011', title: 'Pass 2 · ML — metrics, bias-variance, trees/ensembles, regularisation', priority: 'high'},
      { id: 'sr-012', title: 'Pass 2 · DL / GenAI — transformers, RAG, agents, KYRO pitch', priority: 'medium'},
      { id: 'sr-013', title: 'Pass 2 · Case — 3 guesstimates + 2 metric-drop diagnostics', priority: 'high'},
      { id: 'sr-014', title: 'Pass 2 · Behavioural — every STAR story + TMAY, recorded', priority: 'high'},
    ],
  }),

  // ───────────────────────── 4.2 Weekly Review Ritual ─────────────────────────
  ...defineModule('weekly', 4, {
    Setup: [
      { id: 'wk-001', title: 'Set funnel targets: response rate ≥ 20%, interview rate ≥ 8% of applications', priority: 'medium' },
      { id: 'wk-002', title: 'After 20 applications with the new resumes, compare response and interview rates with the old ones', priority: 'high' },
    ],
  }),

  // ───────────────────────── 4.3 Pre-Interview Checklist ─────────────────────────
  // The per-interview checklist itself is attached to every application in the tracker.
  ...defineModule('preinterview', 4, {
    Kit: [
      { id: 'pi-001', title: 'Company research template: products, recent news, tech stack, interviewers on LinkedIn', priority: 'high' },
      { id: 'pi-002', title: 'JD → story mapping template: each requirement → a project / STAR story / proof', priority: 'high' },
      { id: 'pi-003', title: 'Interview kit: webcam, mic, IDE, backup internet, formals; documents folder (marksheets, ID, resume PDFs)', priority: 'high' },
    ],
  }),
];
