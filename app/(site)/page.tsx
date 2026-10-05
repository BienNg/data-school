import type { Metadata } from 'next';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Employers, Trust } from '@/components/landing/Proof';
import { Quereinstieg, Situation } from '@/components/landing/Positioning';
import { CareerPath, CareerStats, Program, Steps } from '@/components/landing/Offer';
import { Funding, Method, ValueProps } from '@/components/landing/Why';
import { Stories } from '@/components/landing/Stories';
import { CompactCourses } from '@/components/landing/Courses';
import { Faq } from '@/components/landing/Faq';
import { CheckForm } from '@/components/landing/CheckForm';
import { Footer } from '@/components/landing/Footer';
import { LandingEffects } from '@/components/landing/LandingEffects';
import './landing.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://data-school.de/',
    siteName: 'Data School',
    title: 'Data School — Deine Erfahrung. Neue Data-Skills. Deine nächste Karriere.',
    description:
      'Quereinstieg in Data Analytics: 100 % online, praxisnah, persönlich begleitet — mit Bildungsgutschein kostenlos.',
  },
};

// Section order mirrors lib/sections.ts (used by the analytics dashboard).
export default function LandingPage() {
  return (
    <>
      <noscript>
        <style>{'.reveal{opacity:1!important}'}</style>
      </noscript>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Employers />
        <Situation />
        <Quereinstieg />
        <CareerPath />
        <Steps />
        <Program />
        <CareerStats />
        <ValueProps />
        <Method />
        <Funding />
        <Stories />
        <CompactCourses />
        <Faq />
        <CheckForm />
      </main>
      <Footer />
      <LandingEffects />
    </>
  );
}
