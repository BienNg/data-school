'use client';

import { useState } from 'react';

type Module = {
  id: string;
  tab: string;
  num: string;
  when?: string;
  ue?: string;
  title: string;
  stack: string[];
  points: { lead: string; text: string }[];
  project?: { label: string; title: string };
  exam?: string;
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
    project: { label: 'Praxisprojekt (40 UE)', title: 'E-Commerce Retourenanalyse – Fokus Mode-Onlinehandel' },
    exam: 'PostgreSQL Certified Associate',
  },
  {
    id: 'python',
    tab: 'Modul 2: Python',
    num: '02',
    title: 'Python & Machine Learning',
    stack: ['Python', 'Pandas', 'Scikit-Learn'],
    points: [
      {
        lead: 'Daten mit Pandas vorbereiten:',
        text: 'Tabellen filtern, bereinigen und so strukturieren, dass eine Analyse nachvollziehbar wird.',
      },
      {
        lead: 'Modelle mit Scikit-Learn aufbauen:',
        text: 'Predictive Modeling Schritt für Schritt verstehen und Ergebnisse einordnen.',
      },
      {
        lead: 'OpenAI API anbinden:',
        text: 'Generative KI an eine konkrete Datenfrage aus dem Berufsalltag koppeln.',
      },
    ],
    project: { label: 'Praxisprojekt', title: 'Eine Datenfrage mit Pandas, Scikit-Learn und der OpenAI API beantworten' },
  },
  {
    id: 'bi',
    tab: 'Modul 3: BI',
    num: '03',
    title: 'Power BI & Streamlit',
    stack: ['Power BI', 'Streamlit'],
    points: [
      {
        lead: 'Dashboards aufbauen:',
        text: 'Kennzahlen so darstellen, dass Teams sie ohne Umweg lesen können.',
      },
      {
        lead: 'Ergebnisse mit Streamlit teilen:',
        text: 'Aus der Analyse eine kleine Anwendung machen, die andere öffnen können.',
      },
      {
        lead: 'PL-300 vorbereiten:',
        text: 'Das Power BI Data Analyst Zertifikat entlang der Dashboard-Arbeit ansteuern.',
      },
    ],
    project: { label: 'Praxisprojekt', title: 'Dashboard mit Power BI und Streamlit' },
    exam: 'Microsoft PL-300',
  },
  {
    id: 'ki',
    tab: 'Modul 4: KI',
    num: '04',
    title: 'KI-Modelle & generative Systeme',
    stack: ['Python', 'OpenAI API'],
    points: [
      {
        lead: 'KI-Modelle einordnen:',
        text: 'Deep Learning und APIs so verstehen, dass du sie an eine fachliche Frage hängen kannst.',
      },
      {
        lead: 'Generative KI einbinden:',
        text: 'Ein Modell in einen Geschäftsprozess bringen und das Ergebnis für Fachbereiche nutzbar machen.',
      },
      {
        lead: 'Vom Zahlenschubser zum KI-Manager:',
        text: 'Komplexe Modelle orchestrieren, statt nur Tabellen weiterzureichen.',
      },
    ],
    project: { label: 'Praxisprojekt', title: 'Generative KI an eine konkrete Geschäftsfrage anbinden' },
    exam: 'AI Certs',
  },
  {
    id: 'labor',
    tab: 'Modul 5: Reallabor',
    num: '05',
    title: 'Reale Praxisprojekte',
    stack: ['GitHub', 'Scrum'],
    points: [
      {
        lead: 'Portfolio auf GitHub:',
        text: 'Praxisprojekte so ablegen, dass Personaler sie öffnen und nachvollziehen können.',
      },
      {
        lead: 'Scrum an Datenprojekten:',
        text: 'Agile Zusammenarbeit, wie sie im Qualifizierungspfad bei den Daten-Projekten steht.',
      },
      {
        lead: 'Audit-geprüfte Arbeiten:',
        text: 'Die Realprojekte des Programms landen als Portfolio-Arbeiten auf deinem GitHub.',
      },
    ],
    project: { label: 'Praxisprojekt', title: 'GitHub-Portfolio aus den Realprojekten des Programms' },
  },
  {
    id: 'karriere',
    tab: 'Modul 6: Karriere',
    num: '06',
    title: 'Karrierecoaching & Bewerbung',
    stack: ['Bewerbung'],
    points: [
      {
        lead: 'CV-Optimierung:',
        text: 'Profil so schärfen, dass Projekte und Zertifikate im Lebenslauf sofort lesbar sind.',
      },
      {
        lead: 'Interview-Training:',
        text: 'Dich auf Vorstellungsgespräche vorbereiten, bevor die Bewerbungsphase startet.',
      },
      {
        lead: '1-zu-1 Karriere-Coaching:',
        text: 'Persönliche Betreuung vom Profil bis zum Gespräch.',
      },
    ],
    project: { label: 'Praxisprojekt', title: 'Bewerbungsmappe mit Portfolio, Lebenslauf und Gesprächsvorbereitung' },
    exam: 'PSM I',
  },
];

const CHIPS = [
  'Ohne Vorwissen',
  '100% Kostenübernahme durch Bundesagentur für Arbeit / Jobcenter möglich',
  'Vollzeit oder Teilzeit',
  'Dauer: 12 Monate',
  'Gesamtumfang: 1.920 UE',
];

export function ProgramDetail() {
  const [active, setActive] = useState(MODULES[0].id);
  const mod = MODULES.find((m) => m.id === active) ?? MODULES[0];

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
        <ul className="program-chips">
          {CHIPS.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <div className="program-stats">
          <article>
            <strong>6 Module</strong>
            <span>Schrittweiser Aufbau</span>
            <p>Von SQL bis Enterprise-Deployments.</p>
          </article>
          <article>
            <strong>7 Realprojekte</strong>
            <span>Portfolio-Arbeiten</span>
            <p>Audit-geprüft auf deinem GitHub.</p>
          </article>
          <article>
            <strong>6 Zertifikate</strong>
            <span>Industriestandards</span>
            <p>PostgreSQL, PL-300, PSM I &amp; AI Certs.</p>
          </article>
          <article>
            <strong className="orange">0,- EUR</strong>
            <span>Mit Bildungsgutschein</span>
            <p>100% Förderung inkl. Prüfungen möglich.</p>
          </article>
        </div>
        <div className="mod-head">
          <p>Wähle ein Modul für Details:</p>
          <p>Monatlicher Start • Voll- &amp; Teilzeit</p>
        </div>
        <div className="mod-tabs" role="tablist" aria-label="Module">
          {MODULES.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={m.id === mod.id} className={m.id === mod.id ? 'on' : ''} onClick={() => setActive(m.id)}>
              {m.tab}
            </button>
          ))}
        </div>
        <div className="mod-panel" role="tabpanel">
          <div className="mod-top">
            <span className="mod-num">{mod.num}</span>
            {mod.when && <span className="mod-when">{mod.when}</span>}
            {mod.ue && <span className="mod-ue">{mod.ue}</span>}
          </div>
          <h3>{mod.title}</h3>
          <ul className="stack">
            <li className="stack-label">Stack:</li>
            {mod.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <ul className="mod-points">
            {mod.points.map((p) => (
              <li key={p.lead}>
                <span aria-hidden="true">▸</span>
                <p>
                  <strong>{p.lead}</strong> {p.text}
                </p>
              </li>
            ))}
          </ul>
          {mod.project && (
            <div className="mod-row">
              <span aria-hidden="true">📁</span>
              <p>
                <small>{mod.project.label}</small>
                {mod.project.title}
              </p>
            </div>
          )}
          {mod.exam && (
            <div className="mod-row">
              <span aria-hidden="true">🎓</span>
              <p>
                <small>Prüfung &amp; Zertifikat</small>
                {mod.exam}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
