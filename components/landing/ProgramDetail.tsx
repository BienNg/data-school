'use client';

import { useState } from 'react';
import { Icon, type IconName } from './ProgramIcons';

type Point = { lead: string; text: string };
type Row = { icon: IconName; label: string; title: string[]; text?: string; tone?: 'orange' | 'muted' };

type Module = {
  id: string;
  tab: string;
  num: string;
  when: string;
  ue: string;
  title: string;
  stackLabel?: string;
  stack: string[];
  /** Default layout: a bullet list. */
  points?: Point[];
  /** Career layout: the points as three cards. */
  cards?: (Point & { icon: IconName })[];
  rows: Row[];
  /** Rows sit side by side instead of stacked. */
  rowsInline?: boolean;
};

const MODULES: Module[] = [
  {
    id: 'sql',
    tab: 'Modul 1: SQL',
    num: '01',
    when: 'Monate 1–2 (2 Monate)',
    ue: '280 UE',
    title: 'Grundlagen der Datenanalyse & SQL',
    stack: ['Excel', 'PostgreSQL', 'pgAdmin 4'],
    points: [
      {
        lead: 'Zahlenchaos bändigen & verstehen:',
        text: 'Unübersichtliche Tabellen bereinigen, um schnell zu sehen, wo ein Unternehmen Geld verliert oder gewinnt.',
      },
      {
        lead: 'Gezielt Antworten aus großen Datensätzen holen:',
        text: 'Selbstständig Millionen von Datensätzen durchsuchen und verknüpfen, ohne auf die IT warten zu müssen.',
      },
      {
        lead: 'Konkrete Optimierungsvorschläge liefern:',
        text: 'Daten so analysieren, dass Vorgesetzte und Teams sofort fundierte Entscheidungen treffen können.',
      },
    ],
    rows: [
      { icon: 'folder', label: 'Praxisprojekt (40 UE)', title: ['E-Commerce Retourenanalyse – Fokus Mode-Onlinehandel'] },
      { icon: 'premium', label: 'Prüfung & Zertifikat', title: ['PostgreSQL Certified Associate'], tone: 'muted' },
    ],
  },
  {
    id: 'python',
    tab: 'Modul 2: Python',
    num: '02',
    when: 'Monate 3–5 (3 Monate)',
    ue: '460 UE',
    title: 'Python für Data Analytics',
    stack: ['Python', 'Pandas', 'NumPy', 'VS Code', 'Git/GitHub'],
    points: [
      {
        lead: 'Lästige Routineaufgaben automatisieren:',
        text: 'Wiederkehrende Datenübertragungen und Berichte mit wenigen Klicks fehlerfrei auf Knopfdruck erstellen.',
      },
      {
        lead: 'Daten verlässlich und sauber machen:',
        text: 'Doppelte, fehlerhafte oder unvollständige Einträge automatisch reparieren und vereinheitlichen.',
      },
      {
        lead: 'Versteckte Muster und Trends aufdecken:',
        text: 'Große Datenmengen durchleuchten, um Kundenverhalten zu verstehen und Entwicklungen vorherzusehen.',
      },
    ],
    rows: [
      {
        icon: 'folder',
        label: 'Praxisprojekte (2 x 30 UE)',
        title: ['1. Urban Short-Term Rental Price Analysis', '2. Music Streaming Behavior Analysis (API-basiert)'],
      },
      { icon: 'premium', label: 'Prüfung & Zertifikat', title: ['PCEP – Certified Entry-Level Python Programmer'], tone: 'muted' },
    ],
  },
  {
    id: 'bi',
    tab: 'Modul 3: BI',
    num: '03',
    when: 'Monate 6–7 (2 Monate)',
    ue: '300 UE',
    title: 'Business Intelligence & Power BI',
    stack: ['Microsoft Power BI', 'Power Query (M)', 'DAX'],
    points: [
      {
        lead: 'Datenquellen an einem Ort zusammenführen:',
        text: 'Alle wichtigen Firmenzahlen aus Verkauf, Marketing und Finanzen übersichtlich miteinander verbinden.',
      },
      {
        lead: 'Verständliche Dashboards bauen:',
        text: 'Farbige, interaktive Übersichten erstellen, die auch Kollegen ohne Technik-Wissen sofort verstehen und bedienen können.',
      },
      {
        lead: 'Wichtige Unternehmenskennzahlen überwachen:',
        text: 'Frühwarnsysteme und Zielübersichten einrichten, damit Teams ihre Erfolge live mitverfolgen können.',
      },
    ],
    rows: [
      { icon: 'folder', label: 'Praxisprojekt (40 UE)', title: ['Aviation & Airline Operations Dashboard'] },
      { icon: 'premium', label: 'Prüfung & Zertifikat', title: ['Microsoft Certified: Power BI Data Analyst (PL-300)'], tone: 'muted' },
    ],
  },
  {
    id: 'ki',
    tab: 'Modul 4: KI',
    num: '04',
    when: 'Monat 8 (1 Monat)',
    ue: '160 UE',
    title: 'Machine Learning & KI-Manager',
    stack: ['Scikit-Learn', 'OpenAI API', 'Prompt Eng.', 'GitHub Copilot'],
    points: [
      {
        lead: 'Zukunftstrends und Risiken vorhersagen:',
        text: 'Aus Erfahrungen der Vergangenheit lernen, z. B. welche Kunden abwandern könnten oder was sich bald am besten verkauft.',
      },
      {
        lead: 'Smarte KI-Assistenten in den Arbeitsalltag einbinden:',
        text: 'Moderne Sprachmodelle und KI-Tools nutzen, um Arbeitsabläufe spürbar zu beschleunigen.',
      },
      {
        lead: 'Sicherer und verantwortungsvoller KI-Umgang:',
        text: 'Verstehen, wie Unternehmen KI rechtssicher, datenschutzkonform und sinnvoll einsetzen.',
      },
    ],
    rows: [
      { icon: 'folder', label: 'Praxisprojekt (30 UE)', title: ['Automotive Leasing Churn Prediction & KI-Assistent'] },
      { icon: 'premium', label: 'Prüfung & Zertifikat', title: ['AI Certs – AI Manager Certification'], tone: 'muted' },
    ],
  },
  {
    id: 'labor',
    tab: 'Modul 5: Reallabor',
    num: '05',
    when: 'Monate 9–11 (3 Monate)',
    ue: '560 UE Intensivphase',
    title: 'Agiles Reallabor & Streamlit Web-App',
    stack: ['Streamlit', 'Jira', 'Confluence', 'GitHub Actions', 'Docker'],
    rows: [],
  },
  {
    id: 'karriere',
    tab: 'Modul 6: Karriere',
    num: '06',
    when: 'Monat 12 (1 Monat)',
    ue: '160 UE',
    title: 'Karriere-Coaching & Job-Entry',
    stackLabel: 'Fokus:',
    stack: ['LinkedIn Algorithmus', 'GitHub Portfolio', 'Applicant Tracking Systems (ATS)', '1-on-1 Interview Sparring'],
    cards: [
      {
        icon: 'profile',
        lead: 'Profil auf den Punkt:',
        text: 'Lebenslauf & LinkedIn-Auftritt so gestalten, dass Personaler und Firmen auf dich zukommen.',
      },
      { icon: 'document', lead: 'Ergebnisse vorweisen:', text: 'Echte, fertige Beispielprojekte überzeugend präsentieren.' },
      {
        icon: 'interview',
        lead: 'Interviews meistern:',
        text: 'Fachliche Aufgaben und typische Fragen in realistischen Situationen trainieren.',
      },
    ],
    rowsInline: true,
    rows: [
      { icon: 'done', label: 'Praxisprojekt (30 UE)', title: ['Portfolio Readiness Review & Hiring Simulation'] },
      { icon: 'school', label: 'Abschluss', title: ['Abschlusszertifikat zum Data Analyst & KI-Manager'], tone: 'muted' },
    ],
  },
];

const FLAGSHIP_FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'devices',
    title: 'Echte Mini-Programme erstellen',
    text: 'Aus Analysen benutzerfreundliche Web-Tools bauen, die Kollegen direkt im Browser nutzen können.',
  },
  {
    icon: 'team',
    title: 'Im agilen Team zusammenarbeiten',
    text: 'Wie in modernen Tech-Unternehmen in kurzen Etappen arbeiten und Projekte zuverlässig ins Ziel bringen.',
  },
  {
    icon: 'present',
    title: 'Professionell vorstellen',
    text: 'Deine erarbeiteten Ergebnisse verständlich vor Führungskräften und Entscheidern präsentieren.',
  },
];

/** Two fixed rows: facts about the offer, then the scope. */
const CHIP_ROWS: { icon: IconName; label: string }[][] = [
  [
    { icon: 'check', label: 'Ohne Vorwissen' },
    { icon: 'verified', label: '100% Kostenübernahme durch Bundesagentur für Arbeit / Jobcenter möglich' },
    { icon: 'schedule', label: 'Vollzeit oder Teilzeit' },
  ],
  [
    { icon: 'calendar', label: 'Dauer: 12 Monate' },
    { icon: 'timer', label: 'Gesamtumfang: 1.920 UE' },
  ],
];

const STATS = [
  { value: '6 Module', label: 'Schrittweiser Aufbau', text: 'Von SQL bis Enterprise-Deployments.', orange: true },
  { value: '7 Realprojekte', label: 'Portfolio-Arbeiten', text: 'Audit-geprüft auf deinem GitHub.' },
  { value: '6 Zertifikate', label: 'Industriestandards', text: 'PostgreSQL, PL-300, PSM I & AI Certs.' },
  { value: '0,- EUR', label: 'Mit Bildungsgutschein', text: '100% Förderung inkl. Prüfungen möglich.', orange: true },
];

function Stack({ label = 'Stack:', items }: { label?: string; items: string[] }) {
  return (
    <ul className="pd-stack">
      <li className="pd-stack-label">{label}</li>
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

function InfoRow({ row }: { row: Row }) {
  return (
    <div className="pd-row">
      <Icon name={row.icon} className="pd-row-icon" />
      <div>
        <small className={row.tone === 'muted' ? 'muted' : undefined}>{row.label}</small>
        {row.title.map((t) => (
          <p key={t} className="pd-row-title">
            {t}
          </p>
        ))}
        {row.text && <p className="pd-row-text">{row.text}</p>}
      </div>
    </div>
  );
}

function ModuleBody({ mod }: { mod: Module }) {
  return (
    <>
      <div className="pd-top">
        <span className="pd-num">{mod.num}</span>
        <span className="pd-when">{mod.when}</span>
        <span className="pd-ue">{mod.ue}</span>
      </div>
      <h3>{mod.title}</h3>
      <Stack label={mod.stackLabel} items={mod.stack} />
      {mod.points && (
        <ul className="pd-points">
          {mod.points.map((p) => (
            <li key={p.lead}>
              <Icon name="terminal" />
              <p>
                <strong>{p.lead}</strong> {p.text}
              </p>
            </li>
          ))}
        </ul>
      )}
      {mod.cards && (
        <ul className="pd-cards">
          {mod.cards.map((c) => (
            <li key={c.lead}>
              <Icon name={c.icon} />
              <p>
                <strong>{c.lead}</strong> {c.text}
              </p>
            </li>
          ))}
        </ul>
      )}
      <hr />
      <div className={mod.rowsInline ? 'pd-rows inline' : 'pd-rows'}>
        {mod.rows.map((r) => (
          <InfoRow key={r.label} row={r} />
        ))}
      </div>
    </>
  );
}

function FlagshipBody({ mod }: { mod: Module }) {
  return (
    <>
      <div className="pd-top">
        <span className="pd-num">{mod.num}</span>
        <span className="pd-flag">Kernmodul &amp; Flaggschiff</span>
        <span className="pd-when">{mod.when}</span>
        <span className="pd-ue">{mod.ue}</span>
      </div>
      <h3>{mod.title}</h3>
      <p className="pd-desc">
        Kollaborative Softwareentwicklung nach realen Agentur-Standards inklusive Sprint-Demos, Backlog Refinements und Continuous Deployment.
      </p>
      <Stack items={mod.stack} />
      <ul className="pd-features">
        {FLAGSHIP_FEATURES.map((f) => (
          <li key={f.title}>
            <Icon name={f.icon} />
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </li>
        ))}
      </ul>
      <hr />
      <div className="pd-rows inline">
        <div className="pd-row project">
          <Icon name="code" className="pd-row-icon" />
          <div>
            <small>Flaggschiff-Gruppenprojekt (200 UE)</small>
            <p className="pd-row-title">Intelligente Koch- &amp; Rezept-App mit Bedarfsprognose</p>
            <p className="pd-row-text">
              Einsatzbereite Web-Anwendung mit sicherem Login, KI-Rezeptvorschlägen und Live-Bedarfsvorhersagen direkt im Browser wie in echten Unternehmen.
            </p>
          </div>
        </div>
        <div className="pd-row">
          <Icon name="verified" className="pd-row-icon" />
          <div>
            <small className="muted">Offizielles Branchenzertifikat</small>
            <p className="pd-row-title">PSM I – Professional Scrum Master I</p>
            <p className="pd-row-text">Weltweit anerkannte Zertifizierung durch Scrum.org – Vollständige Prüfungsgebühr enthalten.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProgramDetail() {
  const [active, setActive] = useState(MODULES[0].id);
  const mod = MODULES.find((m) => m.id === active) ?? MODULES[0];
  const flagship = mod.id === 'labor';

  return (
    <section className="program" id="lehrplan">
      <div className="wrap">
        <p className="badge badge-dark">
          <span className="badge-dot" />
          Kernprogramm
        </p>
        <h2>Data Analyst &amp; KI-Manager:</h2>
        <p className="program-lead">
          Bloße Theorie und Zertifikate reichen heute nicht mehr. Statt Absagen wegen fehlender Erfahrung erarbeitest du dir bei uns dein stärkstes Argument für das Vorstellungsgespräch: Praxiserfahrung auf dem Niveau von 5 Jahren IT-Berufspraxis.
        </p>
        <div>
          {CHIP_ROWS.map((row) => (
            <ul key={row[0].label} className="program-chips">
              {row.map((chip) => (
                <li key={chip.label}>
                  <Icon name={chip.icon} />
                  {chip.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="program-stats">
          {STATS.map((s) => (
            <article key={s.value}>
              <strong className={s.orange ? 'orange' : undefined}>{s.value}</strong>
              <span>{s.label}</span>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <div className="mod-head">
          <p>Wähle ein Modul für Details:</p>
          <p className="mod-head-note">
            <Icon name="shield" />
            Monatlicher Start • Voll- &amp; Teilzeit
          </p>
        </div>
        <div className="mod-tabs" role="tablist" aria-label="Module">
          {MODULES.map((m) => {
            const classes = [m.id === mod.id ? 'on' : '', m.id === 'labor' ? 'flag' : ''].filter(Boolean).join(' ');
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={m.id === mod.id}
                className={classes || undefined}
                onClick={() => setActive(m.id)}
              >
                {m.id === 'labor' && (
                  <span className="mod-tab-star">
                    <Icon name="star" />
                  </span>
                )}
                {m.tab}
              </button>
            );
          })}
        </div>
        <div className={flagship ? 'mod-panel flagship' : 'mod-panel'} role="tabpanel">
          <div className="mod-body" key={mod.id}>
            {flagship ? <FlagshipBody mod={mod} /> : <ModuleBody mod={mod} />}
          </div>
        </div>
      </div>
    </section>
  );
}
