'use client';

import { useState } from 'react';

/** GitBook-style "Was this helpful?" feedback row. Local-only (no backend). */
export function WasThisHelpful() {
  const [choice, setChoice] = useState<'yes' | 'meh' | 'no' | null>(null);

  const options: { key: 'yes' | 'meh' | 'no'; label: string; emoji: string }[] = [
    { key: 'yes', label: 'Yes', emoji: '😊' },
    { key: 'meh', label: 'Somewhat', emoji: '😐' },
    { key: 'no', label: 'No', emoji: '🙁' },
  ];

  return (
    <div className="not-prose mt-10 flex flex-col gap-2 border-t border-fd-border pt-6">
      <span className="text-sm font-medium text-fd-foreground">
        Was this helpful?
      </span>
      {choice ? (
        <span className="text-sm text-fd-muted-foreground">
          Thanks for the feedback.
        </span>
      ) : (
        <div className="flex gap-2">
          {options.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => setChoice(o.key)}
              aria-label={o.label}
              className="inline-flex size-9 items-center justify-center rounded-md border border-fd-border text-base transition-colors hover:border-fd-primary hover:bg-fd-primary/10"
            >
              <span aria-hidden>{o.emoji}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
