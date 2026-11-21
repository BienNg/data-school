// Answers only state what the rest of the page already commits to — no job or funding guarantees.
export const FAQ = [
  {
    id: 'programmieren',
    q: 'Brauche ich Programmiererfahrung?',
    a: 'Nein. Unsere Kurse sind so aufgebaut, dass du ohne Vorwissen einsteigen kannst: Du startest mit Excel und Datenverständnis, SQL und Python lernst du Schritt für Schritt. Wo genau du am besten einsteigst, klären wir im Karriere-Check.',
  },
  {
    id: 'quereinsteiger',
    q: 'Ist Data Analytics für Quereinsteiger geeignet?',
    a: 'Ja. Gerade Fachwissen aus Bereichen wie Finance, Controlling, Marketing oder Logistik ist wertvoll — denn gute Data Analysts verstehen nicht nur die Daten, sondern auch die Prozesse dahinter.',
  },
  {
    id: 'bildungsgutschein',
    q: 'Wie funktioniert der Bildungsgutschein?',
    a: 'Wenn du arbeitssuchend oder von Arbeitslosigkeit bedroht bist, kann die Agentur für Arbeit oder das Jobcenter die Kosten deiner Weiterbildung übernehmen. Die Entscheidung trifft der zuständige Kostenträger individuell. Wir prüfen vorab mit dir, ob eine Förderung infrage kommt, und geben dir alle Unterlagen für deinen Termin an die Hand.',
  },
  {
    id: 'kosten',
    q: 'Was kostet mich die Weiterbildung?',
    a: 'Bei vollständiger Bewilligung des Bildungsgutscheins: 0 €. Software-Lizenzen, Zertifikate, Praxisprojekte und Betreuung sind dann inklusive.',
  },
  {
    id: 'online',
    q: 'Findet die Weiterbildung online statt?',
    a: 'Ja, 100 % online. Du lernst von zu Hause aus und hast feste Ansprechpartner, die dich während der gesamten Weiterbildung begleiten.',
  },
  {
    id: 'dauer',
    q: 'Wie lange dauert die Weiterbildung?',
    a: 'Das hängt vom Baustein ab: Grundlagen 3 Monate, Data Analyst 12 Monate, Data Scientist und Data Engineer jeweils 9 Monate. Jeder Baustein ist auch einzeln über den Bildungsgutschein buchbar.',
  },
  {
    id: 'berufseinstieg',
    q: 'Unterstützt mich Data School beim Berufseinstieg?',
    a: 'Ja. Du baust während der Weiterbildung ein Portfolio mit echten Praxisprojekten auf, schließt mit Microsoft-Zertifikaten ab und bereitest dein neues Profil für Bewerbungen vor. Eine Jobgarantie kann seriöserweise niemand geben — aber wir sorgen dafür, dass du mit nachweisbaren Skills in Bewerbungsgespräche gehst.',
  },
];

const PERKS = [
  '100% Kostenübernahme durch Bundesagentur für Arbeit & Jobcenter möglich',
  '7 vorzeigbare Praxisprojekte für dein persönliches Github-Portfolio',
  '6 international gültige Zertifikate von Microsoft bis Scrum.org',
  '1-on-1 Karriere-Coaching & Vorbereitung auf Vorstellungsgespräche',
  'Flexibler Start – Vollzeit oder Teilzeit',
];

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-layout">
        <div>
          <p className="badge">
            <span className="badge-dot" />
            Häufige Fragen
          </p>
          <h2>Alles, was du vor dem Start wissen musst</h2>
          <div className="faq-list">
            {FAQ.map((item) => (
              <details key={item.id} className="faq-item" data-faq={item.id}>
                <summary>
                  {item.q}
                  <svg className="chev" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="summary-card">
          <p className="summary-kicker">Zusammenfassung</p>
          <h3>Deine Vorteile auf einen Blick</h3>
          <ul>
            {PERKS.map((perk) => (
              <li key={perk}>
                <span aria-hidden="true">✓</span>
                {perk}
              </li>
            ))}
          </ul>
          <a href="#beratung" className="btn btn-primary btn-block" data-track="faq_cta">
            Jetzt Platz sichern &amp; durchstarten
          </a>
        </aside>
      </div>
    </section>
  );
}
