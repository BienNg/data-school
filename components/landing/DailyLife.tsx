const ITEMS = [
  'Mit dem Laptop als Digital Nomad ortsunabhängig vom Strand oder aus dem Homeoffice arbeiten.',
  'Morgens entspannt ohne Pendel-Stress und Stau in den Tag starten.',
  'Mehr wertvolle Zeit für die Familie und wichtige Momente im Alltag gewinnen.',
  'In Ruhe und ohne ständige Unterbrechungen tief in Daten und spannende Analysen eintauchen.',
  'Endlich wieder eine gefragte Perspektive auf dem Arbeitsmarkt und ein faires Gehalt sichern.',
];

export function DailyLife() {
  return (
    <section className="section" id="vorteile">
      <div className="wrap">
        <div className="life-wrap">
          <div className="life-head">
            <div>
              <p className="badge">Dein neuer Berufsalltag</p>
              <h2>Was sich für dich konkret zum Positiven verändert</h2>
            </div>
            <p className="life-badge">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 13.2s-4.6-2.8-4.6-6A2.6 2.6 0 0 1 8 5.2a2.6 2.6 0 0 1 4.6 2c0 3.2-4.6 6-4.6 6Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              Lebensqualität im Fokus
            </p>
          </div>
          <ul className="life-grid">
            {ITEMS.map((text) => (
              <li key={text} className="life-item">
                <span className="tick" aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3.5 8.2 6.4 11 12.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
