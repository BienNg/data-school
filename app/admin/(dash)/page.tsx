import { BarList, type BarItem } from '@/components/admin/BarList';
import { Card } from '@/components/admin/Card';
import { DailyChart } from '@/components/admin/DailyChart';
import { Insights } from '@/components/admin/Insights';
import { StatTile } from '@/components/admin/StatTile';
import {
  getCtas, getFaq, getForm, getFunnel, getOverview, getSections, getSources, getTimeseries,
} from '@/lib/admin/data';
import { fmt, fmtDuration, fmtPct, ratio } from '@/lib/admin/format';
import { buildInsights } from '@/lib/admin/insights';
import { parseFilters } from '@/lib/admin/range';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function OverviewPage({ searchParams }: Props) {
  const f = parseFilters(await searchParams);
  const [o, prev, days, funnel, sections, ctas, form, faq, devices, sources] = await Promise.all([
    getOverview(f),
    getOverview(f, true),
    getTimeseries(f),
    getFunnel(f),
    getSections(f),
    getCtas(f),
    getForm(f),
    getFaq(f),
    getSources(f, 'device'),
    getSources(f, 'source'),
  ]);
  const insights = buildInsights({ overview: o, prev, funnel, sections, ctas, form, faq, devices, sources });

  const conv = ratio(o.converted_sessions, o.sessions);
  const prevConv = ratio(prev.converted_sessions, prev.sessions);
  const visits = funnel[0]?.sessions ?? 0;
  // Deltas against a near-empty previous period are noise — hide them below 30 visits.
  const cmp = prev.sessions >= 30;
  const pv = <T,>(v: T) => (cmp ? v : undefined);

  const funnelItems: BarItem[] = funnel.map((s, i) => {
    const before = funnel[i - 1];
    const drop = before && before.sessions > 0 ? 1 - s.sessions / before.sessions : 0;
    return {
      key: s.key,
      label: s.label,
      value: s.sessions,
      display: fmt(s.sessions),
      secondary: fmtPct(s.sessions, visits),
      stepNote: before
        ? drop >= 0
          ? { text: `↓ ${fmtPct(s.sessions, before.sessions)} weiter · −${Math.round(drop * 100)} %`, bad: drop > 0.6 }
          : { text: '↓ inkl. Anfragen ohne vollständige Tracking-Daten' }
        : undefined,
      details: [
        { label: 'Besuche', value: fmt(s.sessions) },
        { label: 'aller Besuche', value: fmtPct(s.sessions, visits) },
        ...(before ? [{ label: 'vom vorherigen Schritt', value: fmtPct(s.sessions, before.sessions) }] : []),
      ],
    };
  });

  const scrollItems: BarItem[] = o.scroll.map((s) => ({
    key: String(s.mark),
    label: `${s.mark} % der Seite`,
    value: s.sessions,
    display: fmtPct(s.sessions, o.sessions, 0),
    secondary: `${fmt(s.sessions)} Besuche`,
    details: [{ label: 'Besuche erreichten diese Tiefe', value: fmt(s.sessions) }],
  }));

  return (
    <>
      <h1 className="adm-h1">Übersicht · {f.rangeLabel}</h1>
      <p className="adm-lede">
        Wie gut die Landingpage Besucher in Karriere-Check-Anfragen verwandelt — und wo sie verliert.
      </p>

      <div className="adm-kpis">
        <StatTile hero label="Conversion-Rate" value={fmtPct(o.converted_sessions, o.sessions)} current={conv} previous={pv(prevConv)} points hint="Besuche mit Anfrage" />
        <StatTile label="Anfragen" value={fmt(o.leads)} current={o.leads} previous={pv(prev.leads)} />
        <StatTile label="Besucher" value={fmt(o.visitors)} current={o.visitors} previous={pv(prev.visitors)} hint="pro Tag eindeutig" />
        <StatTile label="Besuche" value={fmt(o.sessions)} current={o.sessions} previous={pv(prev.sessions)} />
        <StatTile
          label="Engagierte Besuche"
          value={fmtPct(o.engaged_sessions, o.sessions, 0)}
          current={ratio(o.engaged_sessions, o.sessions)}
          previous={pv(ratio(prev.engaged_sessions, prev.sessions))}
          points
          hint="≥ 10 s, Klick oder ≥ 50 % Scroll"
        />
        <StatTile
          label="Aktive Zeit (Median)"
          value={fmtDuration(o.median_active_ms)}
          current={o.median_active_ms}
          previous={pv(prev.median_active_ms)}
        />
      </div>

      <div className="adm-grid cols-2">
        <Card title="Besuche pro Tag" note={`${fmt(o.sessions)} gesamt`}>
          <DailyChart kind="line" unit="Besuche" data={days.map((d) => ({ day: d.day, value: d.sessions }))} />
        </Card>
        <Card title="Anfragen pro Tag" note={`${fmt(o.leads)} gesamt`}>
          <DailyChart kind="columns" unit="Anfragen" data={days.map((d) => ({ day: d.day, value: d.leads }))} />
        </Card>
      </div>

      <div className="adm-grid cols-2">
        <Card title="Conversion-Funnel" note="Besuche, die den Schritt erreicht haben">
          <BarList items={funnelItems} max={visits || 1} />
        </Card>
        <Card title="Was verbessern?" note="automatisch aus den Daten abgeleitet">
          <Insights items={insights} />
        </Card>
      </div>

      <Card title="Scrolltiefe" note="Anteil der Besuche, die mindestens so weit gescrollt haben">
        <BarList items={scrollItems} max={o.sessions || 1} />
      </Card>
    </>
  );
}
