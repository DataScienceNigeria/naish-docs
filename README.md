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
