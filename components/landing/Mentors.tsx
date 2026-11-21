const STEPS = [
  { n: '1', title: 'Daten filtern:', text: 'Relevante Transaktionen & Zeiträume isolieren' },
  { n: '2', title: 'Gruppieren & sortieren:', text: 'SQL & Python-Aggregate aufbauen' },
  { n: '3', title: 'Ergebnis visualisieren:', text: 'Intuitive Charts für Entscheider aufbereiten' },
];

export function Mentors() {
  return (
    <section className="section" id="dozenten">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="6" cy="5" r="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <circle cx="11" cy="5.5" r="1.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2.4 12.2c.5-2 2-3 3.6-3s3.1 1 3.6 3M9.2 9.4c1.2-.2 2.4.3 3.2 1.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Erfahrene Dozenten &amp; Mentoren
          </p>
          <h2>Komplizierte Themen einfach erklärt, bis es wirklich Klick macht</h2>
          <p className="lead">
            Statt trockener <strong>Theorie</strong> startest du bei uns immer mit einer <strong>konkreten Frage aus dem Berufsleben</strong> und lernst die Technik dahinter <strong>Schritt für Schritt ohne Sprünge</strong>. Begleitet wirst du dabei von <strong>Dozent:innen, die selbst täglich mit Daten arbeiten</strong> und dir zeigen, worauf es im Job ankommt.
          </p>
        </div>
        <div className="mentor-card">
          <div className="mentor-left">
            <p className="badge">
              <span className="badge-dot" />
              Beispiel: So führen wir ein Thema ein
            </p>
            <div className="prompt-box">
              <small>Praxisnahe Ausgangsfrage:</small>
              <p>„Welche Produkte dieses Unternehmens verkaufen sich im Winter am besten?“</p>
            </div>
            <p className="step-kicker">↓ Daraus lernst du Schritt für Schritt:</p>
            <ol className="teach-steps">
              {STEPS.map((s) => (
                <li key={s.n}>
                  <span>{s.n}</span>
                  <p>
                    <strong>{s.title}</strong> {s.text}
                  </p>
                </li>
              ))}
            </ol>
            <blockquote>„Erst die didaktische Fragestellung, dann das Software-Tool. So bleibt Wissen sofort greifbar und anwendbar.“</blockquote>
          </div>
          <div className="mentor-right">
            <div className="player">
              <div className="player-top">
                <span>
                  <i className="live-dot" /> Live Coaching &amp; Dozenten-Session
                </span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="2" y="3" width="12" height="8" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M6 13h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <img src="/landing/mentor-lukas.jpg" alt="Live-Coaching mit Lukas B., Dozent und Mentor" />
              <div className="player-foot">
                <p>
                  <span aria-hidden="true">🎧</span> Persönliche Betreuung ohne Fachchinesisch
                </p>
                <p className="player-time">
                  Mo–Fr 9–17
                  <br />
                  Uhr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
