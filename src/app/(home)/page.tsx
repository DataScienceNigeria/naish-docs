import { redirect } from 'next/navigation';

// The documentation index (content/docs/index.mdx) is the real landing page,
// rendered inside the docs layout with the sidebar. Send root traffic there.
export default function HomePage() {
  redirect('/docs');
}
