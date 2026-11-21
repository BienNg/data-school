const STEPS = [
  {
    n: '01',
    title: 'Karriere-Check',
    text: 'Kostenlos und unverbindlich: Wir schauen gemeinsam auf deine bisherige Erfahrung, klären deine Ziele und prüfen deine Fördermöglichkeiten.',
  },
  {
    n: '02',
    title: 'Bildungsgutschein',
    text: 'Wir unterstützen dich bei der Vorbereitung für deinen Termin bei der Agentur für Arbeit oder dem Jobcenter und stellen mit dir alle nötigen Unterlagen zusammen.',
  },
  {
    n: '03',
    title: 'Weiterbildung & Praxisprojekt',
    text: 'Du lernst komplett online und baust dir Schritt für Schritt dein eigenes Github-Portfolio auf, das auf realitätsnahen Unternehmens-Szenarien basiert.',
  },
  {
    n: '04',
    title: 'Karrierecoaching & Bewerbung',
    text: 'Von der CV-Optimierung bis zum gezielten Interview-Training: Wir bereiten dich intensiv auf den Arbeitsmarkt vor, damit du sicher und überzeugend in die Bewerbungsphase startest.',
  },
];

export function Steps() {
  return (
    <section className="section steps" id="ablauf">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">
            <span className="badge-dot" />
            Schritt-für-Schritt
          </p>
          <h2>In 4 Schritten in deine neue berufliche Zukunft</h2>
          <p className="lead">Vom Karriere-Check bis zur Festanstellung begleiten wir dich persönlich und verlässlich durch jede einzelne Phase.</p>
        </div>
        <ol className="timeline">
          {STEPS.map((step) => (
            <li key={step.n} className="step">
              <span className="step-num">{step.n}</span>
              <div className="step-card">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
