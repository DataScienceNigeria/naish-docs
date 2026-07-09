# NAISH Documentation

Live documentation site for the **Nigeria AI Scaling Hub (NAISH)** — a national
AI infrastructure initiative operating a shared 8× NVIDIA H200 GPU compute node
hosted at Galaxy Backbone, Abuja.

Built with [Fumadocs](https://fumadocs.dev) (Next.js). Content is MDX under
`content/docs`. Designed as a static export so it can be transferred to the
Hub's GitHub organisation and hosted on GitHub Pages, Vercel, or any static host.

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
  capabilities/          Hub technical capabilities (feasibility, data readiness,
                         compute, voice/language datasets, model testing,
                         AI governance, responsible AI) — scaffolded, to enrich
  infrastructure/        Compute node, software/platform, architecture, workloads
  use-cases/             Seven identified use cases + capacity
  delivery/              Deployment, governance & risk
  projects-archive/      Gates-funded work (incl. Dimagi CommCare)
  reference/             Glossary
```

## Editing

- Add a page: create `content/docs/<section>/<page>.mdx` with `title` +
  `description` frontmatter, and add its slug to that section's `meta.json`.
- Custom components available in MDX: `<Stats>`, `<Stat>`, `<Badge>`, plus
  Fumadocs `<Cards>`, `<Card>`, `<Callout>`.
- Theme tokens (Nigeria-green primary) live in `src/app/global.css`.
- Site name and GitHub target live in `src/lib/shared.ts` — update `gitConfig`
  when transferring to the Hub's repository.

## Content principle

**Source fidelity.** Every figure is traceable to a NAISH source document.
Indicative / pending values are labelled as such. Project costing and contract
values are intentionally excluded.
