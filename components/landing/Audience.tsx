const CARDS = [
  {
    icon: 'cap',
    label: 'Du hast fertig studiert, bekommst aber nur Absagen',
    title: 'Studienabschluss, aber nur Absagen wegen fehlender Praxiserfahrung?',
    out: '7 echte Praxisprojekte auf GitHub, die deine analytischen Fähigkeiten für Personaler sofort greifbar und messbar machen.',
  },
  {
    icon: 'case',
    label: 'Du bist arbeitssuchender mit Berufserfahrung',
    title: 'Jahrelange Berufserfahrung, aber du bist arbeitslos oder davon bedroht?',
    out: 'Kombiniere deine wertvolle Berufserfahrung mit gefragter Datenkompetenz und starte als Branchenexperte mit höherem Gehalt neu durch.',
  },
  {
    icon: 'alert',
    label: 'Du bist berufstätig mit einem Job in der IT + arbeitsplatzgefährdet',
    title: 'In veralteten IT-Rollen gefangen und von KI bedroht?',
    out: 'Steige vom "Zahlenschubser" zum geschätzten KI-Manager auf, der komplexe Modelle orchestriert und echten Wert fürs Unternehmen schafft.',
  },
  {
    icon: 'target',
    label: 'Du hast keinen IT-Hintergrund, möchtest aber mit Daten arbeiten',
    title: 'Keine Programmierkenntnisse und Angst vor dem Einstieg?',
    out: 'Unser didaktisch von Grund auf aufgebauter Lehrplan mit persönlicher 1:1 Betreuung fördert dich Schritt für Schritt ohne Überforderung.',
  },
];

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {name === 'cap' && (
        <>
          <path d="M2 8 10 4.5 18 8 10 11.5 2 8Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M5.5 9.4V13c0 1 2 2.2 4.5 2.2s4.5-1.2 4.5-2.2V9.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
      {name === 'case' && (
        <>
          <rect x="2.5" y="6" width="15" height="10.5" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 6V4.8A1.8 1.8 0 0 1 8.8 3h2.4A1.8 1.8 0 0 1 13 4.8V6M2.5 10.5h15" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
      {name === 'alert' && (
        <>
          <path d="M10 3.2 17.2 16H2.8L10 3.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 8.2v3.4M10 13.6h.01" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {name === 'target' && (
        <>
          <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="0.8" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

export function Audience() {
  return (
    <section className="section" id="zielgruppe">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">Für wen ist das Programm?</p>
          <h2>Das hier ist für dich, wenn…</h2>
          <p className="lead">
            Egal aus welchem Hintergrund du kommst: Mit unserem strukturierten Lehrplan und persönlicher Förderung gelingt der Wechsel.
          </p>
        </div>
        <div className="audience-grid">
          {CARDS.map((c) => (
            <article key={c.title} className="persona">
              <p className="persona-label">
                <Icon name={c.icon} />
                {c.label}
              </p>
              <h3>{c.title}</h3>
              <div className="ausweg">
                <strong>DEIN AUSWEG:</strong>
                <p>{c.out}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
