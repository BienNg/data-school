import { NextResponse, type NextRequest } from 'next/server';
import { getLeads } from '@/lib/admin/data';
import { parseFilters } from '@/lib/admin/range';
import { BEREICH_OPTIONS, STATUS_OPTIONS, labelFor } from '@/lib/sections';
import { serverClient } from '@/lib/supabase/server';

// Neutralises spreadsheet formula injection (=, +, -, @) and quotes every cell.
function cell(v: unknown): string {
  let s = v == null ? '' : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const db = await serverClient();
  const { data: isAdmin } = await db.rpc('is_admin');
  if (!isAdmin) return new NextResponse('Forbidden', { status: 403 });

  const f = parseFilters(Object.fromEntries(req.nextUrl.searchParams));
  const leads = await getLeads({ ...f, device: null });
  const header = ['Eingang', 'Vorname', 'E-Mail', 'Telefon', 'Situation', 'Bereich', 'Quelle', 'Medium', 'Kampagne', 'Gerät', 'Land', 'Letzter Klick', 'Aktive Zeit (s)'];
  const lines = leads.map((l) =>
    [
      new Date(l.created_at).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' }),
      l.vorname,
      l.email,
      l.telefon,
      labelFor(STATUS_OPTIONS, l.status),
      labelFor(BEREICH_OPTIONS, l.bereich),
      l.source,
      l.medium,
      l.campaign,
      l.device,
      l.country,
      l.last_cta,
      l.active_s,
    ]
      .map(cell)
      .join(';'),
  );
  // BOM + semicolons so German Excel opens it correctly.
  const csv = '﻿' + [header.map(cell).join(';'), ...lines].join('\r\n');
  const day = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="data-school-leads-${f.rangeKey}-${day}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
