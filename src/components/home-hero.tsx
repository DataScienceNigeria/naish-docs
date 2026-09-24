import Link from 'next/link';
import type { ReactNode } from 'react';

const stats: { value: string; label: string }[] = [
  { value: '8×', label: 'NVIDIA H200 GPU' },
  { value: '1,128 GB', label: 'HBM3e GPU memory' },
  { value: '2,048 GB', label: 'DDR5 system memory' },
  { value: '0 %', label: 'Current Utilization' },
];

const features: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: 'Capabilities',
    href: '/docs/capabilities',
    description:
      'What the Hub does: feasibility, data readiness, GPU/compute, model lifecycle, governance, and responsible AI.',
  },
  {
    title: 'Infrastructure',
    href: '/docs/infrastructure/compute-node',
    description:
      'The compute node – 8× H200 SXM5, capacity, software/platform stack, and how workloads are allocated.',
  },
  {
    title: 'Integration & Governance',
    href: '/docs/integration',
    description:
      'Reusing existing ecosystem assets, dataset readiness and training standards, and the DPI integration toolkit.',
  },
  {
    title: 'Templates',
    href: '/docs/templates',
    description:
      'Reference solution architectures showing where the Hub fits and what AI it powers, across sectors.',
  },
  {
    title: 'Projects',
    href: '/docs/projects-archive/identified-use-cases',
    description:
      'Identified use cases and the archive of prior work the Hub builds on.',
  },
];

function Stat({ value, label }: { value: ReactNode; label: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-4 py-5 text-center">
      <div className="text-2xl font-bold text-fd-primary sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-fd-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-fd-border bg-fd-card p-5 no-underline transition-colors hover:border-fd-primary/60 hover:bg-fd-accent/40"
    >
      <span className="font-semibold text-fd-foreground group-hover:text-fd-primary">
        {title}
      </span>
      <span className="mt-2 text-sm text-fd-muted-foreground">
        {description}
      </span>
    </Link>
  );
}

export function HomeHero() {
  return (
    <div className="not-prose mx-auto flex w-full flex-col">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 py-12 text-center sm:py-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground">
          Nigeria AI Scaling Hub · Technical Documentation
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
          Sovereign GPU compute for national-scale AI
        </h1>
        <p className="max-w-2xl text-lg text-fd-muted-foreground">
          A shared, governed{' '}
          <span className="text-fd-primary">8× NVIDIA H200</span> node hosted in
          Nigeria — <span className="text-fd-primary">high-performance</span>,{' '}
          <span className="text-fd-primary">multi-tenant</span>, and built to
          power AI for health, agriculture, education, and public services.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
          >
            Explore the Hub →
          </Link>
          <Link
            href="/docs/infrastructure/compute-node"
            className="inline-flex items-center rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-foreground no-underline transition-colors hover:bg-fd-accent/50"
          >
            Infrastructure specs
          </Link>
        </div>
        <code className="rounded-lg border border-fd-border bg-fd-muted px-4 py-2 font-mono text-sm text-fd-muted-foreground">
          8× NVIDIA H200 · Abuja, Nigeria.
        </code>
      </section>

      {/* Highlighted GPU / compute specs */}
      <section className="mx-auto grid w-full max-w-5xl grid-cols-2 divide-fd-border rounded-xl border border-fd-border sm:grid-cols-4 sm:divide-x">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} />
        ))}
      </section>

      {/* Feature cards */}
      <section className="mx-auto w-full max-w-7xl py-14">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-fd-foreground">
            Everything a national AI programme needs
          </h2>
          <p className="mt-2 text-fd-muted-foreground">
            The compute, the capabilities that govern it, and the patterns that
            put it to work.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {features.map((f) => (
            <FeatureCard key={f.href} {...f} />
          ))}
        </div>
      </section>
    </div>
  );
}
