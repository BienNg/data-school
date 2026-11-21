import { DataMark, Wordmark } from '@/components/DataMark';

const NAV = [
  ['#programm', 'Programm'],
  ['#vorteile', 'Vorteile'],
  ['#dozenten', 'Dozenten'],
  ['#lehrplan', 'Lehrplan'],
  ['#foerderung', 'Förderung'],
  ['#faq', 'FAQ'],
];

const LEGAL = [
  ['/impressum', 'Impressum'],
  ['/datenschutz', 'Datenschutz'],
  ['/agb', 'AGB'],
  ['/datenschutz#cookies', 'Cookie-Einstellungen'],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-banner">
          <div>
            <p className="banner-kicker">
              <span className="badge-dot" />
              Starte deine IT-Karriere
            </p>
            <h2>Daten &amp; KI sind die Zukunft.</h2>
            <p>Mache den ersten Schritt und prüfe deinen Anspruch auf 100% Förderung.</p>
          </div>
          <a href="#beratung" className="btn btn-light" data-track="footer_cta">
            Zum Karriere-Check
          </a>
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo" aria-label="Data School">
              <DataMark />
              <Wordmark />
            </a>
            <p>Deutsche Akademie für Online-Weiterbildungen mit individuellem Coaching, echten Praxisprojekten und einem überzeugenden GitHub-Portfolio.</p>
          </div>
          <nav aria-label="Navigation">
            <h3>Navigation</h3>
            {NAV.map(([href, label]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <nav aria-label="Rechtliches">
            <h3>Rechtliches</h3>
            {LEGAL.map(([href, label]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div>
            <h3>Mögliche Förderung</h3>
            <p>
              Bei Vorliegen der individuellen Voraussetzungen kann eine Kostenübernahme über einen Bildungsgutschein nach § 81 SGB III durch die Bundesagentur für Arbeit oder das Jobcenter in Betracht kommen. Ein Rechtsanspruch besteht nicht.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DATASCHOOL Academy GmbH. Alle Rechte vorbehalten.</span>
          <span>Zertifizierte Weiterbildungsprogramme</span>
        </div>
      </div>
    </footer>
  );
}
