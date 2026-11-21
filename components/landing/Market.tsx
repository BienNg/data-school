const CARDS = [
  {
    kicker: 'Einstiegs- & Spitzengehalt',
    num: 'Ø bis zu 5.924 €',
    orange: true,
    sub: 'monatl. Bruttoentgelt für Data Analysten.',
    body: 'Solide finanzielle Perspektiven und stetiges Gehaltspotenzial in gefragten Daten- und Tech-Rollen über alle Branchen hinweg.',
    source: 'Quelle: Bundesagentur für Arbeit (Entgeltatlas)',
  },
  {
    kicker: 'Hohe Nachfrage',
    num: '10.700+',
    orange: false,
    sub: 'offene Stellen für Data Analysten allein auf den 3 größten Jobportalen.',
    body: 'Fachkräftemangel im DACH-Raum: Tausende Unternehmen suchen händeringend nach daten- und KI-affinen Talenten.',
    source: 'Quelle: Eigene Erhebung StepStone, Indeed, XING',
  },
  {
    kicker: 'KI-Wirtschaftswachstum',
    num: '42 % der Firmen',
    orange: false,
    sub: 'in Deutschland nutzen bereits KI. 36 % planen den Einsatz.',
    body: 'Fast vier von fünf deutschen Unternehmen integrieren künstliche Intelligenz bereits aktiv in operative Prozesse oder bereiten die Einführung vor.',
    source: 'Quelle: Bitkom-Studie 2026',
  },
];

export function Market() {
  return (
    <section className="section" id="markt">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 12V4M2 12h12M5.5 12V8M9 12V5.5M12.5 12V7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Marktperspektive &amp; Zukunftschancen
          </p>
          <h2>Wieso du jetzt eine Weiterbildung in Data + KI machen solltest</h2>
          <p className="lead">
            Die Nachfrage nach qualifizierten Fachkräften, die Daten analysieren und generative KI sicher in Geschäftsprozesse einbinden können, ist auf einem Allzeithoch.
          </p>
        </div>
        <div className="market-grid">
          {CARDS.map((c) => (
            <article key={c.kicker} className="stat-card">
              <p className="stat-kicker">{c.kicker}</p>
              <p className={`stat-num${c.orange ? ' orange' : ''}`}>{c.num}</p>
              <p className="stat-sub">{c.sub}</p>
              <p className="stat-body">{c.body}</p>
              <p className="stat-source">{c.source}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
