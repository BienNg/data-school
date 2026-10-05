import { CheckMark, Icon } from './icons';

const VALUES = [
  { icon: 'cap', title: '100% kostenlos für dich', text: 'Unsere Kurse sind vollständig über staatliche Förderprogramme finanzierbar. Du lernst — wir kümmern uns um die Förderung.' },
  { icon: 'brain', title: 'Aus der Praxis, nicht aus dem Lehrbuch', text: 'Keine Theorie-Wüste. Unsere Dozent:innen arbeiten selbst täglich mit Daten und KI — du arbeitest von Tag 1 mit echten Tools, echten Aufgaben und branchenspezifischen Anwendungsfällen.' },
  { icon: 'certificate', title: 'Anerkannte Zertifikate', text: 'Du schließt mit Microsoft-Zertifikaten ab — relevant für den Arbeitsmarkt, anerkannt von Arbeitgebern und der Agentur für Arbeit.' },
  { icon: 'chart', title: 'Die Jobs von morgen', text: 'Daten und KI bestimmen, wo in den nächsten Jahren gearbeitet wird. Wir bilden dich genau für die Rollen aus, die der Arbeitsmarkt jetzt und in Zukunft sucht — nicht für Auslaufmodelle.' },
  { icon: 'bulb', title: 'Verständlich von Anfang an', text: 'Wir haben jeden Kurs so entwickelt, dass komplexe Themen Schritt für Schritt greifbar werden. Kein Fachchinesisch, kein Überforderungsgefühl — ein roter Faden, dem du folgen kannst.' },
  { icon: 'laptop', title: '100 % online, mit fester Betreuung', text: 'Du lernst flexibel von zu Hause, in deinem Tempo — begleitet von persönlichen Ansprechpartnern, die dranbleiben, wenn es mal hakt.' },
];

const METHOD = [
  { icon: 'plus', title: 'Vom Alltag zur Theorie — nie umgekehrt', text: 'Jedes Thema beginnt mit einer echten Frage aus dem Berufsleben. Die Technik dahinter lernst du, weil du sie brauchst — nicht, weil sie im Lehrplan steht.' },
  { icon: 'signal', title: 'Schritt für Schritt, ohne Sprünge', text: 'Der Aufbau folgt einem roten Faden. Du baust auf, was du schon kannst — statt überfordert hinterherzuhängen.' },
  { icon: 'check', title: 'Dozent:innen, die selbst mit Daten arbeiten', text: 'Du lernst von Menschen, die den Beruf leben — und dir sagen können, worauf es wirklich ankommt.' },
];

const FUNDING_STEPS = [
  { title: 'Karriere-Check bei uns', text: 'Wir klären in 15 Minuten, welcher Kurs zu dir passt.' },
  { title: 'Termin bei der Agentur für Arbeit', text: 'Wir geben dir alle Unterlagen an die Hand, die du dafür brauchst.' },
  { title: 'Bildungsgutschein einlösen', text: 'Du startest — ohne einen Cent selbst zu zahlen.' },
];

export function ValueProps() {
  return (
    <section className="section value" id="ueber-uns">
      <div className="section-head reveal">
        <h2>Warum Data School?</h2>
        <p>
          Daten und KI verändern fast jeden Beruf. Wir machen diese Zukunft zugänglich — mit Inhalten aus der echten
          Praxis, die so aufgebaut sind, dass du auch ohne Vorwissen sicher reinkommst.
        </p>
      </div>
      <div className="value-grid">
        {VALUES.map((v) => (
          <article key={v.title} className="value-card reveal">
            <div className="value-icon" aria-hidden="true">
              <Icon name={v.icon} />
            </div>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Method() {
  return (
    <section className="section method" id="methode">
      <div className="method-grid">
        <div className="reveal">
          <div className="section-head left">
            <p className="section-overline">Unser Ansatz</p>
            <h2>So fühlt sich Lernen an, wenn es Klick macht.</h2>
            <p>
              Viele scheitern nicht an mangelndem Talent, sondern an Kursen, die zu schnell zu kompliziert werden. Wir
              haben unsere Inhalte bewusst anders gebaut.
            </p>
          </div>
          <div className="method-list">
            {METHOD.map((m) => (
              <div key={m.title} className="method-row">
                <div className="method-icon" aria-hidden="true">
                  <Icon name={m.icon} />
                </div>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <div className="m-card">
            <div className="m-card-label">Beispiel: So führen wir ein Thema ein</div>
            <div className="m-bubble-q">„Welche unserer Produkte verkaufen sich im Winter am besten?“</div>
            <div className="m-arrow">↓ daraus lernst du</div>
            <div>
              <span className="m-chip">Daten filtern</span>
              <span className="m-chip">Gruppieren &amp; sortieren</span>
              <span className="m-chip">Ergebnis visualisieren</span>
            </div>
            <div className="m-card-foot">Erst die Frage, dann das Werkzeug. So bleibt es greifbar.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Funding() {
  return (
    <section className="section funding" id="foerderung">
      <div className="funding-grid">
        <div className="reveal">
          <div className="section-head left">
            <p className="section-overline">Finanzierung</p>
            <h2>Für dich kostenlos. Wirklich.</h2>
            <p>
              Wenn du arbeitssuchend oder von Arbeitslosigkeit bedroht bist, kann die Agentur für Arbeit oder das
              Jobcenter die kompletten Kosten über einen Bildungsgutschein übernehmen.
            </p>
          </div>
          <div className="funding-steps">
            {FUNDING_STEPS.map((s, i) => (
              <div key={s.title} className="frow">
                <div className="n">{i + 1}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="funding-card reveal">
          <div className="fc-strike">Regulärer Wert: mehrere tausend&nbsp;€</div>
          <div className="fc-price">
            0&nbsp;€* <small>für dich mit Bildungsgutschein</small>
          </div>
          <ul className="fc-list">
            {['Weiterbildung & Praxisprojekte', 'Alle Software-Lizenzen inklusive', 'Microsoft-Zertifikate', 'Persönliche Betreuung'].map((t) => (
              <li key={t}>
                <CheckMark />
                {t}
              </li>
            ))}
          </ul>
          <a href="#beratung" className="btn-primary" data-track="funding_cta">
            Jetzt Anspruch prüfen lassen
          </a>
          <p className="fc-note">*bei vollständiger Bewilligung durch den zuständigen Kostenträger.</p>
        </div>
      </div>
    </section>
  );
}
