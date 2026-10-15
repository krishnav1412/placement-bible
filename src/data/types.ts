// Shared content types for everything in src/data/.
// Content (what to do) lives in these files. Your progress (what you've ticked, notes,
// applications) is saved separately, keyed by these ids — so never rename or reuse an id.

export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface Phase {
  id: number;
  title: string;
  when: string;
  why: string;
}

export interface Module {
  id: string; // stable slug, e.g. 'sql'
  phase: number;
  code: string; // display code, e.g. '1.1'
  title: string;
  summary: string;
}

export interface Task {
  id: string; // stable, never reuse
  title: string;
  module: string; // Module.id
  phase: number;
  topic?: string; // groups tasks inside a module
  priority: Priority;
  resourceIds?: string[];
  notes?: string;
}

export type ResourceKind = 'course' | 'book' | 'video' | 'practice' | 'docs' | 'article' | 'tool' | 'platform';

export interface Resource {
  id: string;
  title: string;
  url: string;
  kind: ResourceKind;
  modules: string[]; // Module ids
  free?: boolean;
  note?: string;
}

export type QuestionCategory =
  | 'SQL'
  | 'DSA'
  | 'Stats/ML'
  | 'Core CS'
  | 'Case/Guesstimate'
  | 'Behavioural'
  | 'Project deep-dives';

export interface Question {
  id: string;
  category: QuestionCategory;
  sub?: string;
  prompt: string;
  answer?: string; // reference answer / key points
}

export interface StorySeed {
  id: string;
  title: string;
  hint: string;
  principles: string[]; // Amazon LPs this story can cover
}

export type AppStatus = 'Applied' | 'OA' | 'Interview' | 'Offer' | 'Rejected' | 'No Response';

export type ProjectStatus = 'live' | 'shipped' | 'in-progress' | 'planned';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  repo?: string;
  live?: string;
  stack: string[];
  summary: string;
  metrics: string[];
  talkingPoints: string;
  /** Roadmap tasks that belong to this project (ticking them here or in the Roadmap is the same). */
  roadmapTaskIds: string[];
  /** Extra upgrade items that aren't roadmap tasks. */
  upgrades: { id: string; title: string }[];
}

export interface ProfileItem {
  id: string;
  title: string;
  detail?: string;
}

export interface ProfileGroup {
  id: string;
  title: string;
  items: ProfileItem[];
}
