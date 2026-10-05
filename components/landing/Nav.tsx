'use client';

import { useEffect, useState } from 'react';
import { DataMark, Wordmark } from '@/components/DataMark';

const LINKS = [
  { href: '#kurse', label: 'Kurse' },
  { href: '#programm', label: 'Programm' },
  { href: '#foerderung', label: 'Förderung' },
  { href: '#erfolge', label: 'Erfolge' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="Data School — Startseite">
            <DataMark />
            <Wordmark />
          </a>
          <nav className="nav-links" aria-label="Hauptnavigation">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} data-track={`nav_link_${l.href.slice(1)}`}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#beratung" className="nav-cta" data-track="nav_cta">
            Karriere-Check
          </a>
          <button
            className={`nav-burger${open ? ' open' : ''}`}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu${open ? ' open' : ''}`} onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} data-track={`mobile_nav_link_${l.href.slice(1)}`}>
            {l.label}
          </a>
        ))}
        <a href="#beratung" className="nav-cta" data-track="mobile_nav_cta">
          Kostenlosen Karriere-Check starten
        </a>
      </div>
    </>
  );
}
