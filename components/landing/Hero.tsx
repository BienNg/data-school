import { HeroCanvas } from './HeroCanvas';

const TICKS = ['Für Quereinsteiger', '100 % online', 'Praxisorientiert', 'Persönlich begleitet', 'Bildungsgutschein'];

export function Hero() {
  return (
    <section className="hero" id="hero">
      <HeroCanvas />
      <div className="hero-content wide">
        <p className="hero-overline" data-hero>
          Data &amp; KI Weiterbildung · Quereinstieg · 100&nbsp;% förderbar
        </p>
        <h1 className="hero-h1" data-hero>
          <span className="h1-line">Deine Erfahrung.</span>
          <span className="h1-line">Neue Data&#8209;Skills.</span>
          <span className="h1-line accent">Deine nächste Karriere.</span>
        </h1>
        <p className="hero-sub" data-hero>
          Werde Data Analyst, Data Scientist oder Data Engineer — aufbauend auf dem, was du schon kannst. Auch ohne
          IT-Hintergrund, mit Bildungsgutschein komplett kostenlos.
        </p>
        <div className="hero-ticks" data-hero>
          {TICKS.map((t) => (
            <span key={t} className="hero-tick">
              {t}
            </span>
          ))}
        </div>
        <div data-hero>
          <a href="#beratung" className="btn-primary" data-track="hero_cta">
            Kostenlosen Karriere-Check starten&nbsp;→
          </a>
        </div>
        <div data-hero>
          <a href="#foerderung" className="hero-secondary" data-track="hero_secondary">
            Bin ich förderberechtigt? Jetzt prüfen
          </a>
        </div>

        <div className="hero-stats" data-hero>
          <div className="hero-stat">
            <div className="num">
              370<span className="plus">+</span>
            </div>
            <div className="lbl">Absolventen</div>
          </div>
          <div className="hero-stat">
            <div className="num">
              13<span className="plus">+</span>
            </div>
            <div className="lbl">Module</div>
          </div>
          <div className="hero-stat">
            <div className="num">
              100<span className="plus">%</span>
            </div>
            <div className="lbl">Förderbar</div>
          </div>
        </div>
      </div>
      <a href="#trust" className="scroll-indicator" aria-label="Nach unten scrollen">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 9l7 7 7-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
