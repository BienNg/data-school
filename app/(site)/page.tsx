import type { Metadata } from 'next';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { Qualifications } from '@/components/landing/Qualifications';
import { Audience } from '@/components/landing/Audience';
import { Market } from '@/components/landing/Market';
import { DailyLife } from '@/components/landing/DailyLife';
import { Paths } from '@/components/landing/Paths';
import { ProgramDetail } from '@/components/landing/ProgramDetail';
import { Employers } from '@/components/landing/Employers';
import { CheckForm } from '@/components/landing/CheckForm';
import { Mentors } from '@/components/landing/Mentors';
import { Funding } from '@/components/landing/Funding';
import { Steps } from '@/components/landing/Steps';
import { Faq } from '@/components/landing/Faq';
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
    title: 'Data School — Die Weiterbildung in Data & KI',
    description:
      'Weiterbildung in Data & KI mit Praxisprojekten auf GitHub, Zertifikaten und möglicher Kostenübernahme über den Bildungsgutschein.',
  },
};

export default function LandingPage() {
  return (
    <div className="landing">
      <Nav />
      <main>
        <Hero />
        <Qualifications />
        <Audience />
        <Market />
        <DailyLife />
        <Paths />
        <ProgramDetail />
        <Employers />
        <CheckForm id="beratung" />
        <Mentors />
        <Funding />
        <Steps />
        <Faq />
        <CheckForm id="beratung-unten" />
      </main>
      <Footer />
      <LandingEffects />
    </div>
  );
}
