type Bubble = { from: 'me' | 'them'; text: string; time: string };
type Story = { initials: string; name: string; status: string; thread: Bubble[]; role: string; before: string };

// WhatsApp-style mockups — to be replaced with real screenshots (with consent) of graduates' messages.
const STORIES: Story[] = [
  {
    initials: 'MB',
    name: 'Maria B.',
    status: 'zuletzt online vor 2 Min.',
    thread: [
      { from: 'them', text: 'Hi Steve! Ich muss dir was erzählen 🥹', time: '10:42' },
      { from: 'them', text: 'Ich habe heute den Job als Data Analyst bekommen! Die Weiterbildung war goldwert.', time: '10:43' },
      { from: 'me', text: 'Glückwunsch Maria! Wusste ich doch 🚀', time: '10:45' },
    ],
    role: 'Maria B. · Data Analyst, Logistikbranche',
    before: 'vorher: kaufmännische Angestellte',
  },
  {
    initials: 'TK',
    name: 'Thomas K.',
    status: 'online',
    thread: [
      { from: 'them', text: 'Steve, ich konnte das Power-BI-Dashboard heute direkt im Vorstellungsgespräch zeigen.', time: '14:12' },
      { from: 'them', text: 'Sie waren so beeindruckt, dass ich noch im Gespräch die Zusage hatte 🙌', time: '14:12' },
      { from: 'me', text: 'Mega! Genau dafür haben wir das Portfolio gebaut.', time: '14:18' },
    ],
    role: 'Thomas K. · Business Analyst, Finanzwesen',
    before: 'vorher: arbeitssuchend',
  },
  {
    initials: 'AL',
    name: 'Aylin L.',
    status: 'zuletzt online heute',
    thread: [
      { from: 'them', text: 'Ohne die feste Lernstruktur hätte ich nie durchgehalten 💪', time: '19:04' },
      { from: 'them', text: 'Habe gerade meinen ersten ML-Use-Case live gestellt — Kunden lieben es!', time: '19:05' },
      { from: 'me', text: 'Das wird der erste von vielen 👏', time: '19:11' },
    ],
    role: 'Aylin L. · Data Scientist, E-Commerce',
    before: 'vorher: Quereinsteigerin',
  },
];

export function Stories() {
  return (
    <section className="section stories wa" id="erfolge">
      <div className="section-head reveal">
        <p className="section-overline">Erfolgsgeschichten</p>
        <h2>Reingekommen — und drangeblieben.</h2>
        <p>Echte Nachrichten aus dem Postfach unserer Absolvent:innen — Jobzusagen, erste Erfolge, Dankesnachrichten.</p>
      </div>
      <div className="stories-grid">
        {STORIES.map((s) => (
          <article key={s.name} className="wa-card reveal">
            <div className="wa-header">
              <div className="wa-avatar">{s.initials}</div>
              <div>
                <div className="wa-name">{s.name}</div>
                <div className="wa-status">{s.status}</div>
              </div>
            </div>
            <div className="wa-thread">
              {s.thread.map((b, i) => (
                <div key={i} className={`wa-bubble ${b.from}`}>
                  {b.text}
                  <span className="wa-time">{b.time}</span>
                </div>
              ))}
            </div>
            <div className="wa-meta">
              <strong>{s.role}</strong>
              {s.before}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
