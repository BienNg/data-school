const LINKS = [
  { slug: 'impressum', label: 'Impressum' },
  { slug: 'datenschutz', label: 'Datenschutz' },
  { slug: 'agb', label: 'AGB' },
];

export function LegalNav({ current }: { current: string }) {
  return (
    <nav className="legal-nav" aria-label="Rechtliches">
      {LINKS.map((l) => (
        <a key={l.slug} href={`/${l.slug}`} aria-current={l.slug === current ? 'page' : undefined}>
          {l.label}
        </a>
      ))}
    </nav>
  );
}
