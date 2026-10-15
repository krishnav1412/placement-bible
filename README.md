# Placement Bible

Placement prep as simple checklists: **https://krishnav1412.github.io/placement-bible/**

Open it in Chrome (or any browser) on your phone or laptop. On a phone, use **Add to Home screen** so it opens like an app.

## What's in it

| Tab | What it's for |
|---|---|
| **Roadmap** | 511 tasks in 5 phases and 28 sections. Tap a section to tick off its checklist. Tap any task for tips, links and your own notes. |
| **Applications** | Every application with its status. Shows how many came back to you and how many reached an interview. Each application has a "before the OA or interview" checklist. |
| **Interview** | 225 questions with key points. Rate yourself 1–5. **Practice** serves your weakest questions first. **STAR stories** has 14 story templates and tracks Amazon leadership-principle coverage. |
| **Profile** | Definition-of-done checklists for each resume variant, LinkedIn, GitHub, portfolio and job sites, your 8 projects, and the sync settings. |

## Syncing phone and laptop

Your progress always saves in the browser you're using. To keep the phone and laptop in sync, connect a GitHub key once on each device:

1. Profile tab → **Sync your phone and laptop** → **Create a GitHub key**. Leave only "gist" ticked, then generate and copy it.
2. Paste it into the box and tap **Connect**. Use the same key on your other device.

Your data lives in a **secret gist** on your GitHub account (`placement-bible.json`). Secret gists aren't listed or searchable, but anyone with the gist's exact link could open it, so don't share that link. Every item records when it last changed, and when two devices disagree the newer change wins, so nothing gets overwritten. The website itself is public. Your ticks, notes and applications aren't: they're only in your browser and your secret gist.

## Changing the content

All content is in `src/data/`:

```
roadmap.ts         phases and sections (modules)
tasks/phase0–4.ts  the tasks, grouped by section and topic
interviewBank.ts   questions, STAR story templates, Amazon principles
profile.ts         profile checklists
projects.ts        projects, upgrades, talking points
resources.ts       links shown inside sections
applications.ts    status / channel / resume options, pre-interview checklist
```

**Add a task:** append one object with a **new id** to the right topic in `tasks/phaseN.ts`:

```ts
{ id: 'sql-059', title: 'Practise year-over-year growth with LAG(…, 12)', priority: 'high' },
```

You can freely edit titles, reorder tasks or delete them. Your ticks are saved by id, so never rename or reuse an id.

**Publish a change:** commit and push to `main`. GitHub Actions validates the data, builds, and updates the site in about a minute.

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run validate   # checks ids and links
npm run build      # production build into dist/
```

`npm run build:artifact` builds a claude.ai version (`artifact/placement-bible.html`) that saves to the artifact's own database instead.

## How saving works (for future edits)

`src/lib/store.ts` keeps every item under a collection and id: `checks/<task or checklist id>`, `apps/<id>`, `questions/<id>`, `myQuestions/<id>`, `stories/<id>` and `projects/<id>`, each with an "updated at" stamp. It saves to `localStorage` immediately. With a key connected, `src/lib/gist.ts` pulls the gist, merges item by item, and pushes. That happens a moment after each change, when the app comes back into view, and every 2 minutes.
