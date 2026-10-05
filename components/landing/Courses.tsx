const COURSES = [
  { id: 'ki_grundlagen', badge: 'Förderbar', dark: true, title: 'KI-Grundlagen für Berufstätige', meta: ['6 Wochen', 'Online'] },
  { id: 'prompt', badge: 'Bestseller', dark: false, title: 'Prompt Engineering & ChatGPT Mastery', meta: ['4 Wochen', 'Online'] },
  { id: 'teams', badge: 'Für Teams', dark: true, title: 'KI im Unternehmen einsetzen', meta: ['8 Wochen', 'Blended'], anchor: 'unternehmen' },
];

export function CompactCourses() {
  return (
    <section className="section courses" id="kompaktkurse">
      <div className="section-head reveal">
        <h2>Kompakte KI-Kurse</h2>
        <p>Der schnelle Einstieg in Künstliche Intelligenz — für Berufstätige, Teams und alle, die sofort loslegen wollen.</p>
      </div>
      <div className="courses-grid">
        {COURSES.map((c) => (
          <article key={c.id} className="course-card reveal" id={c.anchor}>
            <span className={`course-badge${c.dark ? ' dark' : ''}`}>{c.badge}</span>
            <h3>{c.title}</h3>
            <div className="course-meta">
              {c.meta.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <a href="#beratung" className="btn-ghost" data-track={`course_more_${c.id}`}>
              Mehr erfahren
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
