const LOGOS = [
  { file: 'siemens', alt: 'Siemens' },
  { file: 'deutsche-bank', alt: 'Deutsche Bank' },
  { file: 'sap', alt: 'SAP' },
  { file: 'allianz', alt: 'Allianz' },
  { file: 'bosch', alt: 'Bosch' },
  { file: 'bmw', alt: 'BMW' },
];

export function Employers() {
  return (
    <section className="employers" id="arbeitgeber">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">
            <span className="badge-dot" />
            Erfolgreiche Vermittlung
          </p>
          <h2>Arbeite bei führenden Tech-Unternehmen</h2>
        </div>
        <ul className="logo-row">
          {LOGOS.map((logo) => (
            <li key={logo.file} className="logo-card">
              <img src={`/assets/logos/${logo.file}.png`} alt={logo.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
