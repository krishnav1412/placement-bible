import type { Task } from '../types';

/** A task as written inside a module block — `module`, `phase` and `topic` are filled in for you. */
export type TaskDef = Omit<Task, 'module' | 'phase' | 'topic'> & { topic?: string };

/**
 * Groups tasks by topic inside one module.
 *
 *   defineModule('sql', 1, {
 *     'Joins': [
 *       { id: 'sql-008', title: '…', estMinutes: 40, priority: 'critical', tags: ['learn'] },
 *     ],
 *   })
 *
 * To add a task: append one object to the right topic array with a NEW id.
 * To add a topic: add a new key. Order in this file = order in the app and in the planner.
 */
export function defineModule(module: string, phase: number, topics: Record<string, TaskDef[]>): Task[] {
  return Object.entries(topics).flatMap(([topic, list]) =>
    list.map((t) => ({ ...t, module, phase, topic: t.topic ?? topic })),
  );
}
