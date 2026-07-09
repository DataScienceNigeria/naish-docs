# NAISH Documentation

Live documentation site for the **Nigeria AI Scaling Hub (NAISH)** – a national
AI infrastructure initiative operating a shared 8× NVIDIA H200 GPU compute node
hosted at Galaxy Backbone, Abuja. Publicly launched June 2026 by FMCIDE with the
Gates Foundation; Lagos Business School is the grant recipient and Hub manager,
Data Science Nigeria the technical implementation partner.

Built with [Fumadocs](https://fumadocs.dev) (Next.js), using the **Notebook**
layout (top header with search + theme toggle, sidebar below). Content is MDX
under `content/docs`. Static export, so it can be transferred to the Hub's GitHub
organisation and hosted on GitHub Pages, Vercel, or any static host.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /docs
```

## Build (static export)

```bash
npm run build    # outputs static site to ./out
```

## Structure

```
content/docs/
  index.mdx              Landing (hero, at-a-glance, explore cards)
  overview/              What is NAISH, Stakeholders
  capabilities/          Hub capabilities: feasibility, data readiness,
                         GPU/compute, voice & language datasets, model
                         lifecycle, AI governance, responsible AI,
                         governance & risk
  infrastructure/        Compute node, capacity, software/platform, workloads
  projects-archive/      Identified Use Cases + Projects Archive dropdown
    archive/             Archive overview, AI-DPI Sandbox, GovLLMiner, GenAIGov,
                         AfricanVoices, Dimagi, Masakhane, Gooey,
                         Securing AI-Powered Solutions
  reference/             Glossary
```

Sidebar sections (sidebar group titles) come from each folder's `meta.json`
`title`; top-level sections render as uppercase, always-open headers. Nested
folders (e.g. Projects Archive) are collapsible dropdowns.

## Editing

- Add a page: create `content/docs/<section>/<page>.mdx` with `title` +
  `description` frontmatter, and add its slug to that section's `meta.json`.
- Custom components available in MDX: `<Stats>`, `<Stat>`, `<Badge>`, plus
  Fumadocs `<Cards>`, `<Card>`, `<Callout>`.
- Images: put them in `public/` and reference by root path (e.g.
  `![alt](/govllminer.png)`). `next.config.mjs` sets `images.unoptimized`
  (required for static export).
- Theme tokens (Nigeria-green primary) live in `src/app/global.css`; sidebar
  section styling is there too.
- Logo lives at `public/naish-mark.png` (nav) and `src/app/icon.png` (favicon).
- Site name and GitHub target live in `src/lib/shared.ts` – update `gitConfig`
  when transferring to the Hub's repository.

## House style

- **Source fidelity.** Every figure is traceable to a NAISH source document or a
  public announcement. Indicative / pending values are labelled as such. Project
  costing and contract values are intentionally excluded.
- **Punctuation.** Use spaced en-dash ` – `, not em-dashes.
