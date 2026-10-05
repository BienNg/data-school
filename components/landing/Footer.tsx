import { DataMark, Wordmark } from '@/components/DataMark';

const COLS = [
  {
    title: 'Kurse',
    links: [
      ['#kurse', 'Grundlagen'],
      ['#kurse', 'Data Analyst'],
      ['#kurse', 'Data Scientist'],
      ['#kurse', 'Data Engineer'],
      ['#kompaktkurse', 'Kompakte KI-Kurse'],
    ],
  },
  {
    title: 'Akademie',
    links: [
      ['#ueber-uns', 'Über uns'],
      ['#methode', 'Unsere Methode'],
      ['#foerderung', 'Förderung'],
      ['#unternehmen', 'Für Unternehmen'],
      ['#faq', 'FAQ'],
      ['#beratung', 'Kontakt'],
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      ['/impressum', 'Impressum'],
      ['/datenschutz', 'Datenschutz'],
      ['/agb', 'AGB'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="nav-logo" aria-label="Data School">
            <DataMark />
            <Wordmark />
          </a>
          <p>Weiterbildung für Daten- und KI-Berufe. Praxisnah, verständlich, für die Jobs von morgen.</p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
            <h4>{c.title}</h4>
            {c.links.map(([href, label]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Data School</span>
      </div>
    </footer>
  );
}
