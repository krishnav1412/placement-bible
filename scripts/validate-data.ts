// npm run validate — sanity-checks src/data after you (or Claude Code) edit it.
// Fails on duplicate ids, unknown modules or resources; prints a short summary.
import { modules, phases, tasks } from '../src/data/roadmap';
import { resources } from '../src/data/resources';
import { questions, storySeeds } from '../src/data/interviewBank';
import { projects } from '../src/data/projects';
import { profileGroups } from '../src/data/profile';

const errors: string[] = [];

function dupes(label: string, ids: string[]) {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`Duplicate ${label} id: ${id}`);
    seen.add(id);
  }
}

const moduleIds = new Set(modules.map((m) => m.id));
const taskIds = new Set(tasks.map((t) => t.id));
const resourceIds = new Set(resources.map((r) => r.id));
const idOk = /^[A-Za-z0-9_.~:@+-]+$/; // must be a valid database document id

dupes('module', modules.map((m) => m.id));
dupes('resource', resources.map((r) => r.id));
dupes('question', questions.map((q) => q.id));
dupes('story', storySeeds.map((s) => s.id));
dupes('project', projects.map((p) => p.id));
// Tasks, profile items and project upgrades share one "checks" store, so their ids must not collide.
dupes('checklist item', [
  ...tasks.map((t) => t.id),
  ...profileGroups.flatMap((g) => g.items.map((i) => i.id)),
  ...projects.flatMap((p) => p.upgrades.map((u) => u.id)),
]);

for (const m of modules) if (!phases.some((p) => p.id === m.phase)) errors.push(`Module ${m.id} has unknown phase ${m.phase}`);
for (const t of tasks) {
  if (!idOk.test(t.id)) errors.push(`Task id "${t.id}" may only use letters, digits and - _ . ~ : @ +`);
  if (!moduleIds.has(t.module)) errors.push(`Task ${t.id} → unknown module "${t.module}"`);
  const mod = modules.find((m) => m.id === t.module);
  if (mod && mod.phase !== t.phase) errors.push(`Task ${t.id} phase ${t.phase} ≠ module ${mod.id} phase ${mod.phase}`);
  for (const r of t.resourceIds ?? []) if (!resourceIds.has(r)) errors.push(`Task ${t.id} → unknown resource "${r}"`);
  if (!t.title.trim()) errors.push(`Task ${t.id} has an empty title`);
}
for (const r of resources) for (const m of r.modules) if (!moduleIds.has(m)) errors.push(`Resource ${r.id} → unknown module "${m}"`);
for (const p of projects) for (const id of p.roadmapTaskIds) if (!taskIds.has(id)) errors.push(`Project ${p.id} → unknown task "${id}"`);

console.log('\nPlacement Bible — data summary\n');
for (const p of phases) {
  const pt = tasks.filter((t) => t.phase === p.id);
  console.log(`Phase ${p.id} · ${p.title.padEnd(26)} ${String(pt.length).padStart(4)} tasks`);
  for (const m of modules.filter((x) => x.phase === p.id)) {
    const n = pt.filter((t) => t.module === m.id).length;
    if (!n) errors.push(`Module ${m.id} has no tasks`);
    console.log(`   ${m.code.padEnd(4)} ${m.title.padEnd(30)} ${String(n).padStart(4)}`);
  }
}
console.log(`\n${tasks.length} tasks · ${questions.length} questions · ${storySeeds.length} stories · ${resources.length} resources · ${projects.length} projects · ${profileGroups.reduce((a, g) => a + g.items.length, 0)} profile checks\n`);

if (errors.length) {
  errors.forEach((e) => console.error(`✗  ${e}`));
  process.exit(1);
}
console.log('✓ Data is valid.');
