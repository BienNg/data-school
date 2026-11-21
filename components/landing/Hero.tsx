const PILLS = [
  { icon: 'check', text: '100% Kostenübernahme möglich (Bildungsgutschein)' },
  { icon: 'check', text: 'Für Quereinsteiger ohne Vorerfahrung' },
  { icon: 'git', text: 'Mit Portfolioaufbau auf GitHub' },
  { icon: 'cert', text: 'Offizielle Zertifikate (u. a. Microsoft PL-300)' },
  { icon: 'user', text: 'Persönlich begleitet von Dozenten aus der IT' },
  { icon: 'cap', text: '374+ Absolventen' },
  { icon: 'globe', text: 'Deutsch & Englisch' },
];

const CHIPS = ['Git', 'Scrum', 'Python', 'SQL', 'Power BI', 'Machine Learning', 'Streamlit'] as const;

function ChipIcon({ name }: { name: (typeof CHIPS)[number] }) {
  if (name === 'Git') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#F05032" d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    );
  }
  if (name === 'Scrum') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#1F8A70" d="M12 3.4a8.6 8.6 0 0 1 7.4 4.2l1.7-1.3.2 4.1-4-.7 1.6-1.2A6.9 6.9 0 0 0 12 5.1a6.9 6.9 0 0 0-6.1 3.7l-1.6-.7A8.6 8.6 0 0 1 12 3.4Zm0 17.2a8.6 8.6 0 0 1-7.4-4.2l-1.7 1.3-.2-4.1 4 .7-1.6 1.2A6.9 6.9 0 0 0 12 18.9a6.9 6.9 0 0 0 6.1-3.7l1.6.7a8.6 8.6 0 0 1-7.7 4.7Z" />
      </svg>
    );
  }
  if (name === 'Python') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
      </svg>
    );
  }
  if (name === 'SQL') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7.2" ry="2.6" fill="#3B6FE0" />
        <path fill="#2A56C4" d="M4.8 6v5.4c0 1.44 3.22 2.6 7.2 2.6s7.2-1.16 7.2-2.6V6c0 1.44-3.22 2.6-7.2 2.6S4.8 7.44 4.8 6Z" />
        <path fill="#3B6FE0" d="M4.8 11.4V17c0 1.44 3.22 2.6 7.2 2.6s7.2-1.16 7.2-2.6v-5.6c0 1.44-3.22 2.6-7.2 2.6s-7.2-1.16-7.2-2.6Z" />
      </svg>
    );
  }
  if (name === 'Power BI') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#F2C811" d="M3.6 13.2h3.6c.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9H3.6c-.5 0-.9-.4-.9-.9v-5.9c0-.5.4-.9.9-.9Zm6.6-5.6h3.6c.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9h-3.6c-.5 0-.9-.4-.9-.9V8.5c0-.5.4-.9.9-.9Zm6.6-4h3.6c.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9h-3.6c-.5 0-.9-.4-.9-.9V4.5c0-.5.4-.9.9-.9Z" />
      </svg>
    );
  }
  if (name === 'Machine Learning') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="#F97316" strokeWidth="1.4" d="M6.2 6.4 12 9.2M6.2 12H12M6.2 17.6 12 14.8M12 9.2 17.8 12M12 14.8 17.8 12" />
        <circle cx="6.2" cy="6.4" r="1.9" fill="#F97316" />
        <circle cx="6.2" cy="12" r="1.9" fill="#F97316" />
        <circle cx="6.2" cy="17.6" r="1.9" fill="#F97316" />
        <circle cx="12" cy="9.2" r="1.9" fill="#FB923C" />
        <circle cx="12" cy="14.8" r="1.9" fill="#FB923C" />
        <circle cx="17.8" cy="12" r="2.05" fill="#F97316" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#FF4B4B" d="M16.673 11.32 23.535 7.702c.233-.136.554.12.442.387L20.463 17.1l-3.79-5.78Zm-8.556-.229 3.473-5.187c.203-.328.578-.316.793-.028l7.886 11.75-12.152-6.535ZM4.742 18.341c-.28 0-.835-.284-.993-.716l-3.72-9.46c-.118-.331.139-.614.48-.464l19.474 10.306c-.149.147-.453.337-.72.334H4.742Z" />
    </svg>
  );
}

function PillIcon({ name }: { name: string }) {
  if (name === 'check') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="8" fill="#FFF1E6" />
        <path d="M4.5 8.2 6.7 10.4 11.5 5.6" fill="none" stroke="#F97316" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      {name === 'git' && <path d="M6 3.2h4M8 3.2v9.6M5.2 8.2h5.6" fill="none" stroke="#F97316" strokeWidth="1.4" strokeLinecap="round" />}
      {name === 'cert' && (
        <>
          <circle cx="8" cy="6.2" r="3" fill="none" stroke="#F97316" strokeWidth="1.4" />
          <path d="M6.2 8.8 5.4 13l2.6-1.3L10.6 13 9.8 8.8" fill="none" stroke="#F97316" strokeWidth="1.4" strokeLinejoin="round" />
        </>
      )}
      {name === 'user' && (
        <>
          <circle cx="8" cy="5.2" r="2.1" fill="none" stroke="#F97316" strokeWidth="1.4" />
          <path d="M3.8 12.4c.7-2 2.2-3 4.2-3s3.5 1 4.2 3" fill="none" stroke="#F97316" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}
      {name === 'cap' && (
        <>
          <path d="M1.8 6.4 8 3.6l6.2 2.8L8 9.2 1.8 6.4Z" fill="none" stroke="#F97316" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M4.2 7.6V10c0 .8 1.6 1.8 3.8 1.8s3.8-1 3.8-1.8V7.6" fill="none" stroke="#F97316" strokeWidth="1.3" />
        </>
      )}
      {name === 'globe' && (
        <>
          <circle cx="8" cy="8" r="5.2" fill="none" stroke="#F97316" strokeWidth="1.3" />
          <path d="M2.8 8h10.4M8 2.8c1.4 1.5 2.1 3.3 2.1 5.2S9.4 11.7 8 13.2C6.6 11.7 5.9 9.9 5.9 8S6.6 4.3 8 2.8Z" fill="none" stroke="#F97316" strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="badge">
            <span className="badge-dot" />
            Für 2027 optimiertes Curriculum
          </p>
          <h1>Die Weiterbildung in Data &amp; KI, die dir das bringt, was Personaler sehen wollen: Erfahrung.</h1>
          <ul className="pill-row">
            {PILLS.map((p) => (
              <li key={p.text} className="pill">
                <PillIcon name={p.icon} />
                {p.text}
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <a href="#beratung" className="btn btn-primary" data-track="hero_cta">
              Kostenfreier Karriere-Check (15 Min.)
            </a>
            <a href="#foerderung" className="btn btn-ghost" data-track="hero_funding">
              Förderberechtigung prüfen
            </a>
          </div>
          <div className="chip-marquee" aria-label="Technologien im Programm">
            <div className="chip-track">
              {[0, 1].map((copy) => (
                <ul key={copy} className="chip-row" aria-hidden={copy === 1}>
                  {CHIPS.map((name) => (
                    <li key={`${copy}-${name}`} className="chip">
                      <ChipIcon name={name} />
                      {name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <figure className="hero-photo">
          <img src="/landing/hero-michael.jpg" alt="Michael am Schreibtisch mit zwei Monitoren, jetzt Data Analyst im Homeoffice" />
          <figcaption className="hero-caption">
            <span>
              <strong>Michael (45), ehem. Vertriebler</strong>
              <em>Jetzt Data Analyst (100% Homeoffice)</em>
            </span>
            <span className="hero-home" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="#F97316" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
