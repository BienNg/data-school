const CARDS = [
  {
    title: 'Bundesagentur für Arbeit',
    text: '100% Kostenübernahme über den Bildungsgutschein möglich.',
    icon: 'building',
  },
  {
    title: 'Microsoft PL-300',
    text: 'Branchenweit anerkanntes Power BI Data Analyst Zertifikat.',
    icon: 'chart',
  },
  {
    title: 'KI-Manager',
    text: 'Zertifizierung im Management generativer KI-Systeme.',
    icon: 'person',
  },
  {
    title: 'Abschlusszertifikat',
    text: 'Qualifizierte Data School-Abschlusszeugnisse',
    icon: 'seal',
  },
];

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {name === 'building' && (
        <>
          <path d="M6 26V8.5L16 5l10 3.5V26" fill="none" stroke="#F97316" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 26v-6h8v6M12 12h2M18 12h2M12 16.5h2M18 16.5h2" fill="none" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {name === 'chart' && <path d="M6 24V8M6 24h20M11 24V16M17 24V11M23 24V14" fill="none" stroke="#F97316" strokeWidth="1.7" strokeLinecap="round" />}
      {name === 'person' && (
        <>
          <circle cx="16" cy="11" r="3.2" fill="none" stroke="#F97316" strokeWidth="1.6" />
          <path d="M8.5 24.5c1.2-3.4 3.8-5 7.5-5s6.3 1.6 7.5 5" fill="none" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="23.5" cy="12.5" r="3" fill="none" stroke="#F97316" strokeWidth="1.4" />
          <path d="M23.5 11.2v1.4l.8.5" fill="none" stroke="#F97316" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
      {name === 'seal' && (
        <>
          <circle cx="16" cy="14" r="7" fill="none" stroke="#F97316" strokeWidth="1.6" />
          <path d="M16 10.6 17.1 13l2.5.2-1.9 1.6.6 2.4L16 15.9l-2.3 1.3.6-2.4-1.9-1.6 2.5-.2L16 10.6Z" fill="#F97316" />
          <path d="M12.2 20.2 11 26l5-2 5 2-1.2-5.8" fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export function Qualifications() {
  return (
    <section className="band" id="qualifikationen">
      <div className="wrap">
        <h2>Förderung &amp; Qualifikationen</h2>
        <div className="qual-grid">
          {CARDS.map((c) => (
            <article key={c.title} className="qual-card">
              <Icon name={c.icon} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
