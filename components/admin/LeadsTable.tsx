'use client';

import { useMemo, useState } from 'react';
import type { LeadRow } from '@/lib/admin/data';
import { fmtDateTime } from '@/lib/admin/format';
import { ctaLabel } from '@/lib/admin/labels';
import { BEREICH_OPTIONS, STATUS_OPTIONS, labelFor } from '@/lib/sections';

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [bereich, setBereich] = useState('');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return leads.filter(
      (l) =>
        (!status || l.status === status) &&
        (!bereich || l.bereich === bereich) &&
        (!needle || `${l.vorname} ${l.email} ${l.telefon ?? ''}`.toLowerCase().includes(needle)),
    );
  }, [leads, q, status, bereich]);

  return (
    <>
      <div className="adm-filters" style={{ marginBottom: 12 }}>
        <input className="adm-search" placeholder="Name, E-Mail oder Telefon suchen" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="adm-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Situation">
          <option value="">Alle Situationen</option>
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <select className="adm-select" value={bereich} onChange={(e) => setBereich(e.target.value)} aria-label="Bereich">
          <option value="">Alle Bereiche</option>
          {BEREICH_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {rows.length !== leads.length && <span className="adm-note">{rows.length} von {leads.length}</span>}
      </div>
      {rows.length ? (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Eingang</th>
                <th>Name</th>
                <th>Kontakt</th>
                <th>Situation</th>
                <th>Bereich</th>
                <th>Quelle</th>
                <th>Gerät</th>
                <th>Letzter Klick</th>
                <th className="num">Aktive Zeit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id}>
                  <td className="dim" style={{ whiteSpace: 'nowrap' }}>{fmtDateTime(l.created_at)}</td>
                  <td>{l.vorname}</td>
                  <td>
                    <a href={`mailto:${l.email}`}>{l.email}</a>
                    {l.telefon && (
                      <div className="dim">
                        <a href={`tel:${l.telefon}`}>{l.telefon}</a>
                      </div>
                    )}
                  </td>
                  <td><span className="adm-pill">{labelFor(STATUS_OPTIONS, l.status)}</span></td>
                  <td><span className="adm-pill">{labelFor(BEREICH_OPTIONS, l.bereich)}</span></td>
                  <td>
                    {l.source ?? <span className="dim">unbekannt</span>}
                    {l.campaign && <div className="dim">{l.campaign}</div>}
                  </td>
                  <td className="dim">{l.device ?? '–'}</td>
                  <td className="dim">{l.last_cta ? ctaLabel(l.last_cta) : '–'}</td>
                  <td className="num">{l.active_s ? `${Math.round(l.active_s)} s` : '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="adm-empty">Keine Anfragen gefunden.</p>
      )}
    </>
  );
}
