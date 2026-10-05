import type { Insight } from '@/lib/admin/insights';

const META: Record<Insight['severity'], { icon: string; tag: string }> = {
  critical: { icon: '!', tag: 'Kritisch' },
  warning: { icon: '!', tag: 'Verbessern' },
  info: { icon: 'i', tag: 'Hinweis' },
  good: { icon: '✓', tag: 'Läuft gut' },
};

export function Insights({ items }: { items: Insight[] }) {
  if (!items.length) return <p className="adm-empty">Keine Auffälligkeiten im Zeitraum.</p>;
  return (
    <div className="adm-insights">
      {items.map((i, n) => (
        <div key={n} className={`adm-insight ${i.severity}`}>
          <span className="ico" aria-hidden="true">{META[i.severity].icon}</span>
          <div>
            <h3>
              <span className="tag">{META[i.severity].tag}</span>
              {i.title}
            </h3>
            {i.detail && <p>{i.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
