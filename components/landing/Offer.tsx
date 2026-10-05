const PATHS = [
  { level: 'Einstieg', title: 'Grundlagen', dur: '3 Monate', items: ['Datenanalyse-Basics', 'Excel', 'Kommunikation & Präsentation'] },
  { level: 'Kernprogramm', title: 'Data Analyst', dur: '12 Monate', items: ['SQL & Datenbanken', 'Power BI', 'Python für Analyse', 'Statistik & ML-Basics'], featured: true },
  { level: 'Aufbau', title: 'Data Scientist', dur: '9 Monate', items: ['Machine Learning', 'Python Advanced', 'KI-Modelle', 'Agiles Projektmgmt.'] },
  { level: 'Spezialist', title: 'Data Engineer', dur: '9 Monate', items: ['Datenpipelines', 'Cloud (Azure/GCP)', 'Datenarchitektur', 'Automatisierung'] },
];

const STEPS = [
  { title: 'Karriere-Check', text: 'Kostenlos & unverbindlich: Wir schauen auf deine Erfahrung und Ziele und prüfen deine Förderberechtigung.' },
  { title: 'Bildungsgutschein', text: 'Wir helfen dir beim Antrag bei Agentur für Arbeit oder Jobcenter — mit allen Unterlagen.' },
  { title: 'Weiterbildung & Praxisprojekt', text: 'Du lernst 100 % online in deinem Tempo — und baust mit echten Daten dein Portfolio auf.' },
  { title: 'Bereit für den Job', text: 'Mit Zertifikat, Portfolio und echtem Praxiswissen startest du in deinen Daten- oder KI-Beruf.' },
];

const MODULES = [
  { title: 'Grundlagen', items: ['Excel', 'Datenverständnis'] },
  { title: 'Analyse', items: ['SQL', 'Datenbanken'] },
  { title: 'Visualisierung', items: ['Power BI', 'Dashboards'] },
  { title: 'Advanced', items: ['Python', 'Statistik'] },
  { title: 'Praxis', items: ['Business Cases', 'Portfolio'] },
  { title: 'Karriere', items: ['Profil', 'Bewerbung'] },
];

const CAREER_STATS = [
  { num: '56.782', unit: '€', label: 'Durchschnittliches Jahresgehalt' },
  { num: '5.284', unit: '+', label: 'Stellenausschreibungen in DE' },
  { num: '43,5', unit: '', label: 'Durchschnittsalter Quereinsteiger' },
  { num: '32', unit: '%', label: 'Frauenanteil im Beruf' },
];

export function CareerPath() {
  return (
    <section className="section path" id="kurse">
      <div className="section-head reveal">
        <p className="section-overline">Kurse</p>
        <h2>Steig dort ein, wo du stehst.</h2>
        <p>
          Vom ersten Kontakt mit Daten bis zum Data Engineer — eine durchgehende Treppe. Jeder Baustein ist auch
          einzeln über Bildungsgutschein buchbar.
        </p>
      </div>
      <div className="path-grid">
        {PATHS.map((p) => (
          <article key={p.title} className={`path-card reveal${p.featured ? ' featured' : ''}`}>
            {p.featured && <span className="path-badge">Beliebtester Start</span>}
            <div className="path-level">{p.level}</div>
            <h3>{p.title}</h3>
            <div className="path-dur">{p.dur}</div>
            <ul>
              {p.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="path-foot reveal">
        Nicht sicher, wo du startest? <strong>Wir finden es im Karriere-Check gemeinsam heraus.</strong>{' '}
        <a href="#beratung" style={{ color: '#C25A0E', fontWeight: 600 }} data-track="kurse_cta">
          Termin sichern&nbsp;→
        </a>
      </p>
    </section>
  );
}

export function Steps() {
  return (
    <section className="section steps" id="ablauf">
      <div className="section-head reveal">
        <p className="section-overline">Dein Weg mit Data School</p>
        <h2>Dein Weg in 4 Schritten</h2>
      </div>
      <div className="steps-grid">
        {STEPS.map((s, i) => (
          <div key={s.title} className="step reveal">
            <div className="step-number">{i + 1}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Program() {
  return (
    <section className="section program" id="programm">
      <div className="section-head reveal">
        <p className="section-overline">Karriereprogramm</p>
        <h2>Das lernst du auf deinem Weg zum Data Analyst.</h2>
        <p>Nicht Tools um der Tools willen — sondern Kompetenzen, die du für typische Aufgaben in Data Analytics brauchst.</p>
      </div>
      <div className="program-box reveal">
        <div className="program-grid">
          {MODULES.map((m, i) => (
            <div key={m.title} className="module">
              <span className="module-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{m.title}</h3>
              <ul>
                {m.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="program-foot">
          <span>Welche Module zu dir passen, klären wir im kostenlosen Karriere-Check.</span>
          <a href="#beratung" className="btn-primary" data-track="program_cta">
            Karriere-Check starten&nbsp;→
          </a>
        </div>
      </div>
    </section>
  );
}

export function CareerStats() {
  return (
    <section className="career-stats" id="karriere-stats">
      <div className="career-stats-head reveal">
        <p className="section-overline">Verdienst &amp; Karrierechancen</p>
        <h2>Datenanalyse lohnt sich.</h2>
      </div>
      <div className="career-stats-grid">
        {CAREER_STATS.map((s) => (
          <div key={s.label} className="career-stat reveal">
            <div className="num">
              {s.num}
              {s.unit && <span className="unit">{s.unit}</span>}
            </div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="career-stats-source reveal">Quellen: Glassdoor, Bundesagentur für Arbeit, eigene Erhebungen — Stand 2025.</p>
    </section>
  );
}
