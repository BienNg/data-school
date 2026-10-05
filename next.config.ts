import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep old GitHub-Pages URLs working after the move to Vercel.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/impressum.html', destination: '/impressum', permanent: true },
      { source: '/datenschutz.html', destination: '/datenschutz', permanent: true },
      { source: '/agb.html', destination: '/agb', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

export default nextConfig;
