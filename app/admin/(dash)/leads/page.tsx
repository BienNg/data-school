import { Card } from '@/components/admin/Card';
import { LeadsTable } from '@/components/admin/LeadsTable';
import { getLeads } from '@/lib/admin/data';
import { parseFilters } from '@/lib/admin/range';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function LeadsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const f = parseFilters(sp);
  const leads = await getLeads(f);
  const exportHref = `/admin/leads/export?range=${f.rangeKey}`;

  return (
    <>
      <h1 className="adm-h1">Leads · {f.rangeLabel}</h1>
      <p className="adm-lede">
        Alle Karriere-Check-Anfragen mit Herkunft und dem letzten geklickten Button vor der Anfrage. Der Gerätefilter
        gilt hier nicht — Leads werden immer vollständig angezeigt.
      </p>
      <Card title={`${leads.length} Anfragen`} note={<a className="adm-btn ghost" href={exportHref}>CSV exportieren</a>}>
        <LeadsTable leads={leads} />
      </Card>
    </>
  );
}
