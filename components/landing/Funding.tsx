const INCLUDED = [
  '12 Monate intensive Weiterbildung & Realprojekte',
  'Alle Software-Lizenzen & Cloud-Infrastruktur inklusive',
  'Alle 6 Industrie-Zertifikate (u. a. Microsoft PL-300, PSM I)',
  'Persönliches 1-zu-1 Karriere-Coaching',
];

const WAY = [
  {
    n: '1',
    title: 'Karriere-Check bei uns',
    text: 'Gemeinsam klären wir in einem 15-minütigen Gespräch deine Ziele, Vorkenntnisse und stellen die passenden Unterlagen für die Agentur für Arbeit zusammen.',
  },
  {
    n: '2',
    title: 'Termin bei deiner Arbeitsagentur',
    text: 'Mit unserer Vorlage gehst du bestens vorbereitet in dein Beratungsgespräch bei der Agentur für Arbeit oder dem Jobcenter.',
  },
  {
    n: '3',
    title: 'Bildungsgutschein einlösen & starten',
    text: 'Du reichst den ausgestellten Gutschein bei uns ein. Du zahlst keinen Cent und startest pünktlich zum Monatsanfang mit deiner Weiterbildung.',
  },
];

export function Funding() {
  return (
    <section className="section" id="foerderung">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">
            <span className="badge-dot" />
            100% Kostenübernahme
          </p>
          <h2>Für dich kostenlos. Wirklich.</h2>
          <p className="lead">
            Mit einem Bildungsgutschein nach § 81 SGB III übernimmt die Bundesagentur für Arbeit bei Bewilligung 100% deiner Weiterbildungskosten – inklusive aller Prüfungs- und Software-Gebühren.
          </p>
        </div>
        <div className="fund-grid">
          <article className="fund-card">
            <p className="badge">Bildungsgutschein § 81 SGB III</p>
            <div className="price-row">
              <p className="euro">
                0 €<sup>*</sup>
              </p>
              <p className="eigen">Eigenanteil</p>
            </div>
            <p className="price-note">*Regulärer Gesamtwert: Mehrere tausend Euro – volle staatliche Förderung möglich</p>
            <ul className="fund-list">
              {INCLUDED.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#beratung" className="btn btn-primary btn-block" data-track="funding_cta">
              Jetzt Anspruch prüfen lassen
            </a>
            <p className="fine">Unverbindlich &amp; kostenfrei</p>
          </article>
          <div>
            <h3 className="way-title">Dein Weg zum Bildungsgutschein</h3>
            <ol className="way-list">
              {WAY.map((step) => (
                <li key={step.n}>
                  <span>{step.n}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
