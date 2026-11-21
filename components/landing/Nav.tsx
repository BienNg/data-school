'use client';

import { useState } from 'react';
import { DataMark, Wordmark } from '@/components/DataMark';

const LINKS = [
  { href: '#programm', label: 'Programm' },
  { href: '#vorteile', label: 'Vorteile' },
  { href: '#dozenten', label: 'Dozenten' },
  { href: '#lehrplan', label: 'Lehrplan' },
  { href: '#foerderung', label: 'Förderung' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="Data School — Startseite" onClick={() => setOpen(false)}>
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
          Karriere-Check
        </a>
      </div>
    </>
  );
}
