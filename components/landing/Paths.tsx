'use client';

import { useRef, useState } from 'react';

const CARDS = [
  {
    tone: 'dark' as const,
    kicker: 'Kernprogramm',
    title: 'Data Analyst & KI-Manager (2027)',
    popular: true,
    points: [
      ['SQL & Excel:', 'Grundlagen, Datenbanken, Datenbereinigung'],
      ['Python & ML:', 'Pandas, Scikit-Learn, OpenAI API'],
      ['Power BI & Streamlit:', 'Dashboards, PL-300 Zertifikat'],
      ['Reale Praxisprojekte:', '5 Jahre IT-Erfahrung im Portfolio'],
    ],
    tags: ['Data Analytics', 'KI', '12 Monate'],
  },
  {
    tone: 'light' as const,
    kicker: 'Einstieg',
    title: 'Grundlagen (2027)',
    popular: false,
    points: [
      ['Datenanalyse-Basics:', 'Logisches Denken, Strukturierung'],
      ['Excel:', 'Tabellen, Power Query, Pivot'],
      ['Kommunikation:', 'Ergebnisse verständlich aufbereiten'],
      ['Praxisnaher Einstieg:', 'Erste kleine Use Cases'],
    ],
    tags: ['Datenanalyse', 'Excel', '3 Monate'],
  },
  {
    tone: 'light' as const,
    kicker: 'Aufbau',
    title: 'Data Scientist (2027)',
    popular: false,
    points: [
      ['Machine Learning:', 'Predictive Modeling, Scikit-Learn'],
      ['Python Advanced:', 'Vertiefte Algorithmen & Strukturen'],
      ['KI-Modelle:', 'Deep Learning & APIs'],
      ['Agiles Projektmgmt.:', 'Scrum & agile Daten-Projekte'],
    ],
    tags: ['Machine Learning', 'AI', '9 Monate'],
  },
  {
    tone: 'light' as const,
    kicker: 'Spezialist',
    title: 'Data Engineer (2027)',
    popular: false,
    points: [
      ['Datenpipelines:', 'ETL-Prozesse, Apache Airflow'],
      ['Cloud (Azure/GCP):', 'Skalierbare Infrastrukturen'],
      ['Datenarchitektur:', 'Data Warehouses & Lakes'],
      ['Automatisierung:', 'CI/CD für Datenprozesse'],
    ],
    tags: ['Data Engineering', 'Cloud', '9 Monate'],
  },
];

export function Paths() {
  const [index, setIndex] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);

  function go(next: number) {
    const n = (next + CARDS.length) % CARDS.length;
    setIndex(n);
    const vp = viewport.current;
    const card = vp?.querySelectorAll<HTMLElement>('.path-card')[n];
    if (!vp || !card || vp.scrollWidth <= vp.clientWidth + 8) return;
    const left = card.getBoundingClientRect().left - vp.getBoundingClientRect().left + vp.scrollLeft;
    vp.scrollTo({ left, behavior: 'smooth' });
  }

  function onScroll() {
    const vp = viewport.current;
    if (!vp || vp.scrollWidth <= vp.clientWidth + 8) return;
    const cards = [...vp.querySelectorAll<HTMLElement>('.path-card')];
    const origin = vp.getBoundingClientRect().left;
    let best = 0;
    let dist = Infinity;
    cards.forEach((card, n) => {
      const d = Math.abs(card.getBoundingClientRect().left - origin);
      if (d < dist) {
        dist = d;
        best = n;
      }
    });
    setIndex(best);
  }

  return (
    <section className="section paths" id="programm">
      <div className="wrap">
        <div className="section-head">
          <p className="badge">Individuelle Karrierepfade</p>
          <h2>Dein passender Einstieg: 4 gezielte Qualifizierungspfade</h2>
          <p className="lead">
            Wähle das Weiterbildungsprogramm, das exakt zu deinem Vorwissen, deinen beruflichen Zielen und deinen Stärken passt.
          </p>
        </div>
        <div className="paths-viewport" ref={viewport} onScroll={onScroll}>
          <div className="paths-track">
            {CARDS.map((card, n) => (
              <article key={card.title} className={`path-card ${card.tone}${index === n ? ' current' : ''}`}>
                {card.popular && <span className="beliebt">Beliebt</span>}
                <p className="path-kicker">{card.kicker}</p>
                <h3>{card.title}</h3>
                <ul>
                  {card.points.map(([lead, rest]) => (
                    <li key={lead}>
                      <span className="path-mark" aria-hidden="true" />
                      <span>
                        <strong>{lead}</strong> {rest}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="path-foot">
                  <ul className="path-tags">
                    {card.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a href="#beratung" className="btn path-btn" data-track="path_cta">
                    Zum Karriere-Check
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="paths-nav">
          <div className="dots" role="tablist" aria-label="Qualifizierungspfade">
            {CARDS.map((card, n) => (
              <button
                key={card.title}
                type="button"
                className={n === index ? 'dot on' : 'dot'}
                aria-label={card.title}
                aria-current={n === index ? 'true' : undefined}
                onClick={() => go(n)}
              />
            ))}
          </div>
          <div className="arrows">
            <button type="button" className="arrow" aria-label="Vorheriger Qualifizierungspfad" onClick={() => go(index - 1)}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="arrow" aria-label="Nächster Qualifizierungspfad" onClick={() => go(index + 1)}>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
