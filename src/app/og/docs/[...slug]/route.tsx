import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const revalidate = false;

const NAVY = '#162968';
const GREEN = '#25C47D';

// Satori reads OTF/TTF, not woff2, so the OG route uses the OTF sources.
const fonts = Promise.all([
  readFile(join(process.cwd(), 'src/app/fonts/gilroy-light.otf')),
  readFile(join(process.cwd(), 'src/app/fonts/gilroy-extrabold.otf')),
]);

// White-wordmark logo for the navy background, inlined so the static export
// does not depend on a runtime URL.
const logoSrc = readFile(join(process.cwd(), 'public/brand/naish-logo-dark.png')).then(
  (buf) => `data:image/png;base64,${buf.toString('base64')}`,
);

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const [logo, [gilroyLight, gilroyExtraBold]] = await Promise.all([logoSrc, fonts]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 0% 100%, rgba(37,196,125,0.35), transparent 55%), radial-gradient(circle at 100% 0%, rgba(37,196,125,0.18), transparent 50%)`,
          color: '#ffffff',
          fontFamily: 'Gilroy',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={240} height={80} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>{page.data.title}</div>
          {page.data.description ? (
            <div
              style={{
                marginTop: 20,
                fontSize: 30,
                fontWeight: 300,
                lineHeight: 1.35,
                color: 'rgba(255,255,255,0.78)',
              }}
            >
              {page.data.description}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', width: 120, height: 8, borderRadius: 4, backgroundColor: GREEN }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Gilroy', data: gilroyLight, weight: 300, style: 'normal' },
        { name: 'Gilroy', data: gilroyExtraBold, weight: 800, style: 'normal' },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
