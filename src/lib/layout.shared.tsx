import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/naish-mark.png" alt="" aria-hidden className="h-7 w-auto" />
          <span className="font-semibold">{appName}</span>
          <span className="text-fd-muted-foreground font-normal max-sm:hidden">
            Nigeria AI Scaling Hub
          </span>
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
