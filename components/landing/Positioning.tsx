import { Icon } from './icons';

const SITUATIONS = [
  { icon: 'restart', title: 'Beruflich neu starten', text: 'Du bist arbeitssuchend und möchtest die Zeit für einen echten Neustart nutzen.' },
  { icon: 'compass', title: 'Mehr Perspektive', text: 'Dein Job fühlt sich nach Stillstand an und du willst dich zukunftsfähig weiterentwickeln.' },
  { icon: 'bars', title: 'Mehr aus Zahlen machen', text: 'Du arbeitest schon mit Excel, Reports oder Kennzahlen und willst darauf aufbauen.' },
  { icon: 'question', title: '„Bin ich technisch genug?“', text: 'Data Analytics reizt dich, aber du kommst nicht aus der klassischen IT.' },
];

const SWITCHES = [
  { from: 'Controlling', to: 'Data Analyst' },
  { from: 'Finance', to: 'Financial Data Analyst' },
  { from: 'Marketing', to: 'Marketing Data Analyst' },
  { from: 'Logistik', to: 'Supply Chain Data Analyst' },
  { from: 'BWL', to: 'Business Data Analyst' },
];

export function Situation() {
  return (
    <section className="section situation" id="situation">
      <div className="section-head reveal">
        <p className="section-overline">Deine Ausgangssituation</p>
        <h2>Kommt dir das bekannt vor?</h2>
        <p>
          Die meisten unserer Teilnehmenden stehen nicht am Anfang ihrer Laufbahn — sondern an einem Punkt, an dem
          sie beruflich etwas verändern wollen.
        </p>
      </div>
      <div className="situation-grid">
        {SITUATIONS.map((s) => (
          <article key={s.title} className="situation-card reveal">
            <div className="value-icon" aria-hidden="true">
              <Icon name={s.icon} />
            </div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <p className="section-signature reveal">
        Dann könnte Data Analytics <span className="accent">dein nächster Karriereschritt</span> sein.
      </p>
    </section>
  );
}

export function Quereinstieg() {
  return (
    <section className="section switch" id="quereinstieg">
      <div className="section-head reveal">
        <p className="section-overline">Quereinstieg</p>
        <h2>Du fängst nicht bei null an.</h2>
        <p>
          Deine Ausbildung und Berufserfahrung sind dein Vorteil. Gute Data Analysts verstehen nicht nur Daten —
          sondern auch die Prozesse dahinter.
        </p>
      </div>
      <div className="switch-grid">
        {SWITCHES.map((s) => (
          <div key={s.from} className="switch-card reveal">
            <div className="switch-from">{s.from}</div>
            <div className="switch-plus">+ Data Skills</div>
            <div className="switch-to">{s.to}</div>
          </div>
        ))}
      </div>
      <p className="section-signature reveal">
        Wir ersetzen deine Erfahrung nicht. <span className="accent">Wir entwickeln sie weiter.</span>
      </p>
    </section>
  );
}
