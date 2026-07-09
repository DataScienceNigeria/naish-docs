import type { ReactNode } from 'react';

/** Responsive grid of headline figures – the "At a glance" block. */
export function Stats({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {children}
    </div>
  );
}

export function Stat({
  value,
  label,
}: {
  value: ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-fd-border bg-fd-card p-4">
      <div className="text-2xl font-bold text-fd-primary">{value}</div>
      <div className="mt-1 text-sm text-fd-muted-foreground">{label}</div>
    </div>
  );
}

type Tone = 'primary' | 'info' | 'warning' | 'success' | 'error' | 'muted';

const toneClasses: Record<Tone, string> = {
  primary: 'bg-fd-primary/12 text-fd-primary',
  info: 'bg-fd-info/12 text-fd-info',
  warning: 'bg-fd-warning/15 text-fd-warning',
  success: 'bg-fd-success/12 text-fd-success',
  error: 'bg-fd-error/12 text-fd-error',
  muted: 'bg-fd-muted text-fd-muted-foreground',
};

/** Small coloured pill – GPU intensity, criticality, confirmed/assumed flags. */
export function Badge({
  children,
  tone = 'muted',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`not-prose mr-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
