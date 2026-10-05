import { BarList, type BarItem } from '@/components/admin/BarList';
import { Card } from '@/components/admin/Card';
import { getCtas, getFaq, getForm } from '@/lib/admin/data';
import { fmt, fmtPct } from '@/lib/admin/format';
import { ctaLabel, faqLabel, isNavLink } from '@/lib/admin/labels';
import { parseFilters } from '@/lib/admin/range';
import { BEREICH_OPTIONS, FORM_FIELDS, SECTIONS, STATUS_OPTIONS, labelFor } from '@/lib/sections';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ConversionPage({ searchParams }: Props) {
  const f = parseFilters(await searchParams);
  const [ctas, form, faq] = await Promise.all([getCtas(f), getForm(f), getFaq(f)]);
  const sectionLabel = (id: string | null) => SECTIONS.find((s) => s.id === id)?.label ?? id ?? '–';

  const ctaRows = ctas.filter((c) => !isNavLink(c.target));
  const navRows = ctas.filter((c) => isNavLink(c.target));

  const fieldItems: BarItem[] = [
    { key: '_start', label: 'Formular begonnen', value: form.starts, display: fmt(form.starts), secondary: '100 %' },
    ...FORM_FIELDS.map((fl) => {
      const n = form.fields[fl.name] ?? 0;
      return {
        key: fl.name,
        label: `${fl.label} ausgefüllt`,
        value: n,
        display: fmt(n),
        secondary: fmtPct(n, form.starts, 0),
        muted: fl.name === 'telefon',
        details: [{ label: 'der Formular-Starter', value: fmtPct(n, form.starts, 0) }],
      };
    }),
    { key: '_submit', label: 'Abgesendet', value: form.submits, display: fmt(form.submits), secondary: fmtPct(form.submits, form.starts, 0) },
    { key: '_success', label: 'Erfolgreich', value: form.success, display: fmt(form.success), secondary: fmtPct(form.success, form.starts, 0) },
  ];

  const faqItems: BarItem[] = faq.map((q) => ({
    key: q.target,
    label: faqLabel(q.target),
    value: q.sessions,
    display: fmt(q.sessions),
    secondary: `${fmtPct(q.converted_sessions, q.sessions, 0)} fragen an`,
    details: [
      { label: 'Besucher haben die Frage geöffnet', value: fmt(q.sessions) },
      { label: 'davon mit Anfrage', value: fmt(q.converted_sessions) },
    ],
  }));

  const segItems = (rows: { value: string; leads: number }[], opts: readonly { value: string; label: string }[]) => {
    const total = rows.reduce((n, r) => n + r.leads, 0);
    return rows.map((r) => ({
      key: r.value,
      label: labelFor(opts, r.value),
      value: r.leads,
      display: fmt(r.leads),
      secondary: fmtPct(r.leads, total, 0),
    }));
  };

  return (
    <>
      <h1 className="adm-h1">Conversion · {f.rangeLabel}</h1>
      <p className="adm-lede">
        Welche Buttons zu Anfragen führen, wo das Formular Leute verliert und welche Fragen Besucher vor der Anfrage haben.
      </p>

      <Card title="Call-to-Actions" note="Conversion = Anteil der Klickenden, die später eine Anfrage senden">
        {ctaRows.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Button</th>
                  <th>Sektion</th>
                  <th className="num">Klicks</th>
                  <th className="num">Besuche</th>
                  <th className="num">mit Anfrage</th>
                  <th className="num">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {ctaRows.map((c) => (
                  <tr key={c.target}>
                    <td>{ctaLabel(c.target)}</td>
                    <td className="dim">{sectionLabel(c.section)}</td>
                    <td className="num">{fmt(c.clicks)}</td>
                    <td className="num">{fmt(c.sessions)}</td>
                    <td className="num">{fmt(c.converted_sessions)}</td>
                    <td className="num">{fmtPct(c.converted_sessions, c.sessions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="adm-empty">Noch keine CTA-Klicks im Zeitraum.</p>
        )}
      </Card>

      <div className="adm-grid cols-2">
        <Card title="Formular: Feld für Feld" note="Grau = optionales Feld">
          <BarList items={fieldItems} max={form.starts || 1} empty="Formular noch nicht begonnen." />
          {form.errors.length > 0 && (
            <>
              <div className="adm-card-head" style={{ marginTop: 20, marginBottom: 8 }}>
                <h2>Formularfehler</h2>
              </div>
              <table className="adm-table">
                <tbody>
                  {form.errors.map((e) => (
                    <tr key={e.message}>
                      <td>{e.message}</td>
                      <td className="num">{fmt(e.count)}×</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Card>
        <Card title="Geöffnete FAQ-Fragen" note="= Einwände vor der Anfrage">
          <BarList items={faqItems} empty="Noch keine FAQ geöffnet." />
        </Card>
      </div>

      <div className="adm-grid cols-2">
        <Card title="Anfragen nach Situation">
          <BarList items={segItems(form.status, STATUS_OPTIONS)} series={2} empty="Noch keine Anfragen." />
        </Card>
        <Card title="Anfragen nach beruflichem Bereich">
          <BarList items={segItems(form.bereich, BEREICH_OPTIONS)} series={2} empty="Noch keine Anfragen." />
        </Card>
      </div>

      {navRows.length > 0 && (
        <Card title="Navigation" note="Klicks auf Menüpunkte">
          <BarList
            items={navRows.map((c) => ({
              key: c.target,
              label: ctaLabel(c.target),
              value: c.clicks,
              display: fmt(c.clicks),
              secondary: `${fmtPct(c.converted_sessions, c.sessions, 0)} Conversion`,
            }))}
          />
        </Card>
      )}
    </>
  );
}
