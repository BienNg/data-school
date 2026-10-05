const TRUST = [
  { brand: 'ba', title: 'Bundesagentur für Arbeit', name: 'Agentur f. Arbeit', sub: 'Bildungsgutschein' },
  { brand: 'jobcenter', title: 'Jobcenter', name: 'Jobcenter', sub: 'Förderung' },
  { brand: 'powerbi', title: 'Microsoft Power BI', name: 'Power BI', sub: 'Microsoft' },
  { brand: 'microsoft', title: 'Microsoft-Zertifizierung', name: 'Microsoft', sub: 'Zertifikat' },
];

const EMPLOYERS = [
  { file: 'sap', alt: 'SAP' },
  { file: 'siemens', alt: 'Siemens' },
  { file: 'deutsche-bank', alt: 'Deutsche Bank' },
  { file: 'allianz', alt: 'Allianz' },
  { file: 'bmw', alt: 'BMW Group' },
  { file: 'bosch', alt: 'Bosch' },
];

export function Trust() {
  return (
    <section className="trust" id="trust">
      <p className="trust-label reveal">Förderbar über &amp; zertifiziert durch</p>
      <div className="trust-badges">
        {TRUST.map((t) => (
          <div key={t.brand} className="logo-ph reveal" data-brand={t.brand} title={t.title}>
            <strong>{t.name}</strong>
            <small>{t.sub}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Employers() {
  // The list is rendered twice so the CSS marquee can loop seamlessly.
  const logos = [...EMPLOYERS, ...EMPLOYERS];
  return (
    <section className="employers" id="arbeitgeber">
      <h2 className="reveal">Arbeite bei führenden TECH-Unternehmen</h2>
      <p className="employers-sub reveal">
        Sichere dir ein Einstiegsgehalt von <strong>bis zu Ø 57.000&nbsp;€/Jahr!</strong>
      </p>
      <div className="employer-logos reveal" aria-label="Beispielhafte Arbeitgeber unserer Absolvent:innen">
        <div className="employer-logos-track">
          {logos.map((l, i) => (
            <div key={i} className="employer-logo" aria-hidden={i >= EMPLOYERS.length || undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/logos/${l.file}.png`}
                alt={i >= EMPLOYERS.length ? '' : l.alt}
                width={200}
                height={64}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="employer-note reveal">Beispielhafte Arbeitgeber unserer Absolvent:innen.</p>
    </section>
  );
}
