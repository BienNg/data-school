import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

// Self-hosted by next/font: no request to Google from the visitor's browser.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
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
  themeColor: '#1d1d1f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
