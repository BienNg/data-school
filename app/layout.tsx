import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

// Self-hosted by next/font: no request to Google from the visitor's browser.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://data-school.de'),
  title: 'Data School — Data und KI Weiterbildung. Kostenlos. Mit Job-Perspektive.',
  description:
    'Data und KI Weiterbildung für Quereinsteiger: Werde Data Analyst, Data Scientist oder Data Engineer — 100% förderbar über Bildungsgutschein (Bundesagentur für Arbeit, Jobcenter). 100% remote, mit klaren Job-Perspektiven. Jetzt kostenlosen Karriere-Check starten.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1D1D1F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
