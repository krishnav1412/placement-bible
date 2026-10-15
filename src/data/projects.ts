// Projects — existing work + planned builds. `roadmapTaskIds` link to roadmap tasks
// (ticking them here or in the Roadmap is the same thing). `upgrades` are extra items
// tracked only on the project. Status / talking points you edit in the app override these.
import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'kyro',
    name: 'KYRO',
    tagline: 'AI runtime governance platform',
    status: 'shipped',
    repo: 'https://github.com/krishnav1412/KYRO-AI-Governance-Platform',
    stack: ['Python', 'FastAPI', 'LangGraph', 'Gemini API', 'MongoDB', 'Redis', 'WebSockets', 'Next.js', 'pytest'],
    summary: 'Three-tier decision engine — 19 deterministic rules + session heuristics + a Gemini LLM judge — under a rule-dominant policy, fed by an async event pipeline, with a 27-test pytest suite.',
    metrics: ['19 deterministic rules', '3-tier decision engine', '27-test pytest suite'],
    talkingPoints: `• Problem: AI agents act autonomously — who checks each action at runtime?
• Design: rules first (fast, auditable), heuristics for session patterns, LLM judge only for ambiguity.
• Rule-dominant: an LLM can never override a deterministic block — safety over flexibility.
• Pipeline: async events via Redis → decision engine → live dashboard over WebSockets.
• Testing: 27 pytest tests; mocked LLM tier for determinism.
• Next: Redis Streams/Kafka for durability, eval harness for the judge, AWS deployment.`,
    roadmapTaskIds: ['gh-005', 'pf-006', 'dl-016', 'mk-004', 'vs-001', 'vs-002', 'sd-005'],
    upgrades: [
      { id: 'kyro-u1', title: 'Add an evaluation harness: labelled decisions → judge accuracy, tier hit-rates' },
      { id: 'kyro-u2', title: 'Move pub/sub to Redis Streams (durable, consumer groups) and document why' },
      { id: 'kyro-u3', title: 'Deploy a public demo (AWS ECS / Render) with a seeded scenario' },
      { id: 'kyro-u4', title: 'CI: GitHub Actions running the 27 tests + badge in README' },
      { id: 'kyro-u5', title: 'Add latency + cost metrics per tier to the dashboard' },
    ],
  },
  {
    id: 'confer',
    name: 'Confer',
    tagline: 'Full-stack expert marketplace',
    status: 'live',
    repo: 'https://github.com/krishnav1412/confer-expert-booking',
    live: 'https://tranquil-lily-2bf20b.netlify.app',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Razorpay', 'Docker'],
    summary: 'Book-an-expert marketplace with real-time updates and Razorpay payments. 100+ users and 15+ experts in week one.',
    metrics: ['100+ users in week one', '15+ experts onboarded', 'Live in production'],
    talkingPoints: `• Two-sided marketplace: onboarded experts first, then users.
• Booking flow: slot hold → Razorpay order → server-side signature verification → confirm.
• Double-booking prevention: atomic conditional update / unique index on (expert, slot).
• Real-time: Socket.io notifications.
• Growth: how the first 100 users came in (be specific).
• Next: tests, webhooks for payment reliability, analytics funnel.`,
    roadmapTaskIds: ['gh-006', 'pf-007', 'db-015', 'sd-012', 'mk-005'],
    upgrades: [
      { id: 'confer-u1', title: 'Add Razorpay webhooks for payment reliability + idempotent confirmation' },
      { id: 'confer-u2', title: 'Add product analytics (funnel: visit → expert view → booking → paid)' },
      { id: 'confer-u3', title: 'Write API tests (Jest + Supertest) and add CI' },
      { id: 'confer-u4', title: 'Write a short metrics retrospective: week-one numbers, retention since' },
    ],
  },
  {
    id: 'faculty',
    name: 'Faculty Review Analytics',
    tagline: 'NLP pipeline + dashboards over 1,200+ reviews',
    status: 'shipped',
    repo: 'https://github.com/krishnav1412/faculty-review-analytics',
    stack: ['Python', 'Pandas', 'VADER', 'Gemini API', 'NLP', 'Dashboards'],
    summary: 'Two-stage sentiment cascade — VADER for clear cases, Gemini for ambiguous ones — over 1,200+ faculty reviews, with dashboards.',
    metrics: ['1,200+ reviews', 'VADER → Gemini two-stage cascade'],
    talkingPoints: `• Why a cascade: cost and latency — cheap model first, LLM only when uncertain.
• Routing rule: VADER compound-score threshold (state the number) → Gemini.
• Validation: hand-labelled sample, per-class precision/recall, error analysis.
• Insights: 2–3 concrete findings and what decision they support.
• Next: PySpark port, Power BI dashboard, blog post on the cascade.`,
    roadmapTaskIds: ['gh-007', 'pf-008', 'cs-020', 'vs-004'],
    upgrades: [
      { id: 'faculty-u1', title: 'Hand-label 150 reviews and report per-class precision / recall for each stage' },
      { id: 'faculty-u2', title: 'Report cost + latency saved by the cascade vs Gemini-only' },
    ],
  },
  {
    id: 'neurolens',
    name: 'NeuroLens',
    tagline: 'Brain-tumour MRI classification with Grad-CAM',
    status: 'shipped',
    stack: ['Python', 'PyTorch / TensorFlow', 'Transfer learning', 'Grad-CAM'],
    summary: '4-class brain-tumour MRI classifier using transfer learning, with Grad-CAM heatmaps for explainability.',
    metrics: ['4 classes', 'Transfer learning', 'Grad-CAM explainability'],
    talkingPoints: `• Data: 4 classes, source, size, preprocessing + augmentation.
• Model: pretrained backbone, frozen → fine-tuned top blocks.
• Evaluation: per-class recall (missing a tumour is the costly error), confusion matrix.
• Grad-CAM: verified the model attends to the tumour region, not artefacts.
• Leakage: patient-level split where possible.`,
    roadmapTaskIds: ['gh-008', 'pf-008', 'dl-007', 'ml-024'],
    upgrades: [
      { id: 'neuro-u1', title: 'Deploy a demo (Hugging Face Space / Streamlit) with Grad-CAM overlay' },
      { id: 'neuro-u2', title: 'Add per-class metrics table + confusion matrix image to README' },
    ],
  },
  {
    id: 'pyspark-pipeline',
    name: 'PySpark Pipeline',
    tagline: 'Outright / Faculty Review pipeline ported to PySpark + Delta',
    status: 'planned',
    stack: ['PySpark', 'Databricks', 'Delta Lake', 'Spark SQL'],
    summary: 'Bronze → silver → gold pipeline on Databricks Free Edition, benchmarked against the pandas original. Makes PySpark honestly claimable.',
    metrics: ['Runtime vs pandas', 'Spark UI before/after tuning'],
    talkingPoints: '',
    roadmapTaskIds: ['ps-018', 'ps-019', 'ps-020', 'ps-021', 'ps-022', 'ps-023', 'ps-024'],
    upgrades: [],
  },
  {
    id: 'rag',
    name: 'RAG Assistant',
    tagline: 'Retrieval-augmented Q&A with evaluation',
    status: 'planned',
    stack: ['Python', 'Embeddings', 'Chroma / FAISS', 'BM25', 'Reranker', 'Streamlit'],
    summary: 'Closes the one GenAI gap: chunking, hybrid retrieval, reranking, citations and a 25-question eval set.',
    metrics: ['Hit-rate@k', 'Faithfulness'],
    talkingPoints: '',
    roadmapTaskIds: ['dl-017', 'dl-018', 'dl-019', 'dl-020', 'dl-021', 'dl-022', 'dl-023'],
    upgrades: [],
  },
  {
    id: 'bi-dashboards',
    name: 'BI Dashboards ×3',
    tagline: 'Analyst portfolio: Power BI / Tableau',
    status: 'planned',
    stack: ['Power BI', 'DAX', 'Tableau', 'Excel'],
    summary: 'Faculty Review sentiment, e-commerce KPIs (cohorts + funnel), markets dashboard — each with an executive summary.',
    metrics: ['3 published dashboards'],
    talkingPoints: '',
    roadmapTaskIds: ['cs-018', 'cs-019', 'cs-020', 'cs-021', 'cs-022', 'cs-023', 'cs-025'],
    upgrades: [],
  },
  {
    id: 'portfolio-site',
    name: 'Portfolio Website',
    tagline: 'Case-study portfolio on Vercel',
    status: 'planned',
    stack: ['Vite / Next.js', 'React', 'Tailwind', 'Vercel'],
    summary: 'Hero, experience, case studies, certifications, resume downloads, contact. Linked from everything.',
    metrics: ['Lighthouse ≥ 90'],
    talkingPoints: '',
    roadmapTaskIds: ['pf-001', 'pf-002', 'pf-003', 'pf-004', 'pf-005', 'pf-006', 'pf-007', 'pf-008', 'pf-009', 'pf-010', 'pf-011', 'pf-012'],
    upgrades: [],
  },
];
