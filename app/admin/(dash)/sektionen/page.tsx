import { BarList, type BarItem } from '@/components/admin/BarList';
import { Card } from '@/components/admin/Card';
import { getOverview, getSections } from '@/lib/admin/data';
import { fmt, fmtPct } from '@/lib/admin/format';
import { parseFilters } from '@/lib/admin/range';
import { SECTIONS } from '@/lib/sections';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function SectionsPage({ searchParams }: Props) {
  const f = parseFilters(await searchParams);
  const [o, rows] = await Promise.all([getOverview(f), getSections(f)]);
  const byId = new Map(rows.map((r) => [r.section, r]));
  const ordered = SECTIONS.map((s) => ({ ...s, row: byId.get(s.id) }));
  const totalExits = rows.filter((r) => r.section !== 'beratung').reduce((n, r) => n + r.last_seen, 0);
  const maxDwell = Math.max(...rows.map((r) => r.avg_dwell_ms), 1);

  const reach: BarItem[] = ordered.map(({ id, label, row }) => ({
    key: id,
    label,
    value: row?.sessions_viewed ?? 0,
    display: fmtPct(row?.sessions_viewed ?? 0, o.sessions, 0),
    secondary: fmt(row?.sessions_viewed ?? 0),
    details: [
      { label: 'Besuche haben die Sektion gesehen', value: fmt(row?.sessions_viewed ?? 0) },
      { label: 'Ø Verweildauer', value: `${((row?.avg_dwell_ms ?? 0) / 1000).toFixed(1).replace('.', ',')} s` },
    ],
  }));

  const exits: BarItem[] = ordered
    .filter(({ id, row }) => id !== 'beratung' && (row?.last_seen ?? 0) > 0)
    .map(({ id, label, row }) => ({
      key: id,
      label,
      value: row!.last_seen,
      display: fmtPct(row!.last_seen, totalExits, 0),
      secondary: `${fmt(row!.last_seen)} Abspringer`,
      details: [{ label: 'Besuche ohne Anfrage endeten hier', value: fmt(row!.last_seen) }],
    }));

  return (
    <>
      <h1 className="adm-h1">Sektionen · {f.rangeLabel}</h1>
      <p className="adm-lede">
        Welche Teile der Seite gesehen, gelesen und angeklickt werden — und wo Besucher ohne Anfrage aufhören.
        Sektionen mit wenig Verweildauer und vielen Abspringern sind die ersten Kandidaten zum Überarbeiten.
      </p>

      <div className="adm-grid cols-2">
        <Card title="Reichweite je Sektion" note="in Seitenreihenfolge · Anteil aller Besuche">
          <BarList items={reach} max={o.sessions || 1} />
        </Card>
        <Card title="Wo Besucher ohne Anfrage aufhören" note="zuletzt gesehene Sektion">
          <BarList items={exits} series={2} empty="Noch keine Abspringer im Zeitraum." />
        </Card>
      </div>

      <Card title="Alle Kennzahlen je Sektion">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Sektion</th>
                <th className="num">Gesehen</th>
                <th className="num">Reichweite</th>
                <th>Ø Verweildauer</th>
                <th className="num">Klicks</th>
                <th className="num">Letzte Sektion</th>
                <th className="num">Conversion der Betrachter</th>
              </tr>
            </thead>
            <tbody>
              {ordered.map(({ id, label, row }) => (
                <tr key={id}>
                  <td>{label}</td>
                  <td className="num">{fmt(row?.sessions_viewed ?? 0)}</td>
                  <td className="num">{fmtPct(row?.sessions_viewed ?? 0, o.sessions, 0)}</td>
                  <td>
                    <span className="adm-inline-bar" style={{ width: `${((row?.avg_dwell_ms ?? 0) / maxDwell) * 90}px` }} />
                    {((row?.avg_dwell_ms ?? 0) / 1000).toFixed(1).replace('.', ',')} s
                  </td>
                  <td className="num">{fmt(row?.clicks ?? 0)}</td>
                  <td className="num">{id === 'beratung' ? <span className="dim">–</span> : fmt(row?.last_seen ?? 0)}</td>
                  <td className="num">{fmtPct(row?.converted_viewers ?? 0, row?.sessions_viewed ?? 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
