import { NextResponse, type NextRequest } from 'next/server';
import { leadSchema } from '@/lib/analytics/schema';
import { clientIp, isSameOrigin, rateLimited, sessionRow } from '@/lib/analytics/server';
import { serviceClient } from '@/lib/supabase/service';

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  if (rateLimited(`lead:${clientIp(req)}`, 5)) {
    return NextResponse.json({ ok: false, message: 'Zu viele Anfragen. Bitte versuche es gleich noch einmal.' }, { status: 429 });
  }

  const parsed = leadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Bitte überprüfe deine Angaben.' }, { status: 400 });
  }
  const { sid, botcheck, ...lead } = parsed.data;
  // Honeypot filled → pretend success, store nothing.
  if (botcheck === true || botcheck === 'on' || botcheck === 'true') return NextResponse.json({ ok: true });

  const db = serviceClient();
  if (!db) return NextResponse.json({ ok: false, message: 'Speicher nicht konfiguriert.' }, { status: 503 });

  // Make sure the session exists so the lead stays attributable even if tracking batches were lost.
  if (sid) {
    await db.from('sessions').upsert(sessionRow(req, sid), { onConflict: 'id', ignoreDuplicates: true });
  }

  const { error } = await db.from('leads').insert({
    session_id: sid ?? null,
    vorname: lead.vorname,
    email: lead.email.toLowerCase(),
    telefon: lead.telefon || null,
    status: lead.status,
    bereich: lead.bereich,
  });
  if (error) {
    console.error('[lead] insert failed', error.message);
    return NextResponse.json({ ok: false, message: 'Speichern fehlgeschlagen.' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
