import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  images: {
    // next/image optimization is unavailable with `output: 'export'`
    unoptimized: true,
  },
};

export default withMDX(config);
