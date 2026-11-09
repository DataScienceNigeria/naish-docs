import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

// Horizontal logo per the Brand Style Guide: colour version on light,
// white-wordmark version on dark. 40px tall keeps it at the 120px minimum width.
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/naish-logo.png"
            alt="Nigeria AI Scaling Hub"
            width={120}
            height={40}
            className="h-10 w-auto dark:hidden"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/naish-logo-dark.png"
            alt="Nigeria AI Scaling Hub"
            width={120}
            height={40}
            className="hidden h-10 w-auto dark:block"
          />
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
