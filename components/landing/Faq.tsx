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

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="section-head reveal">
        <p className="section-overline">Häufige Fragen</p>
        <h2>Was du vor deinem Quereinstieg wissen solltest.</h2>
      </div>
      <div className="faq-list reveal">
        {FAQ.map((f) => (
          <details key={f.id} className="faq-item" data-faq={f.id}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <p className="faq-foot reveal">
        Deine Frage ist nicht dabei?{' '}
        <a href="#beratung" data-track="faq_cta">
          Stell sie uns im kostenlosen Karriere-Check&nbsp;→
        </a>
      </p>
    </section>
  );
}
