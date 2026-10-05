import Link from 'next/link';
import { Card } from '@/components/admin/Card';
import { getSources } from '@/lib/admin/data';
import { fmt, fmtPct } from '@/lib/admin/format';
import { parseFilters } from '@/lib/admin/range';

const DIMS = [
  { key: 'source', label: 'Quelle' },
  { key: 'medium', label: 'Medium' },
  { key: 'campaign', label: 'Kampagne' },
  { key: 'referrer', label: 'Verweisende Seite' },
  { key: 'device', label: 'Gerät' },
  { key: 'browser', label: 'Browser' },
  { key: 'os', label: 'Betriebssystem' },
  { key: 'country', label: 'Land' },
  { key: 'city', label: 'Stadt' },
  { key: 'landing', label: 'Einstiegsseite' },
];

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function SourcesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const f = parseFilters(sp);
  const dim = DIMS.find((d) => d.key === sp.dim) ?? DIMS[0];
  const rows = await getSources(f, dim.key);
  const total = rows.reduce((n, r) => n + r.sessions, 0);
  const maxSessions = Math.max(...rows.map((r) => r.sessions), 1);
  const totalConv = rows.reduce((n, r) => n + r.converted, 0);

  const link = (key: string) => {
    const q = new URLSearchParams();
    if (typeof sp.range === 'string') q.set('range', sp.range);
    if (typeof sp.device === 'string') q.set('device', sp.device);
    q.set('dim', key);
    return `/admin/quellen?${q}`;
  };

  return (
    <>
      <h1 className="adm-h1">Quellen &amp; Segmente · {f.rangeLabel}</h1>
      <p className="adm-lede">
        Woher Besucher kommen und welche Segmente anfragen. Für Kampagnen-Tracking Links mit <code>utm_source</code>,{' '}
        <code>utm_medium</code> und <code>utm_campaign</code> versehen.
      </p>

      <div className="adm-filters" style={{ marginBottom: 16 }}>
        <div className="adm-seg" role="group" aria-label="Dimension">
          {DIMS.map((d) => (
            <Link key={d.key} href={link(d.key)} scroll={false} aria-current={d.key === dim.key ? 'true' : undefined}>
              {d.label}
            </Link>
          ))}
        </div>
      </div>

      <Card title={`Nach ${dim.label}`} note={`Gesamt: ${fmt(total)} Besuche · ${fmtPct(totalConv, total)} Conversion`}>
        {rows.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>{dim.label}</th>
                  <th>Besuche</th>
                  <th className="num">Anteil</th>
                  <th className="num">Besucher</th>
                  <th className="num">Engagiert</th>
                  <th className="num">Anfragen</th>
                  <th className="num">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td>
                      <span className="adm-inline-bar" style={{ width: `${(r.sessions / maxSessions) * 120}px` }} />
                      {fmt(r.sessions)}
                    </td>
                    <td className="num">{fmtPct(r.sessions, total, 0)}</td>
                    <td className="num">{fmt(r.visitors)}</td>
                    <td className="num">{fmtPct(r.engaged, r.sessions, 0)}</td>
                    <td className="num">{fmt(r.converted)}</td>
                    <td className="num">{fmtPct(r.converted, r.sessions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">Keine Daten im Zeitraum.</p>
        )}
      </Card>
    </>
  );
}
