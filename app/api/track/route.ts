import { NextResponse, type NextRequest } from 'next/server';
import { trackPayloadSchema } from '@/lib/analytics/schema';
import { clientIp, isSameOrigin, rateLimited, sessionRow } from '@/lib/analytics/server';
import { isBot } from '@/lib/analytics/ua';
import { serviceClient } from '@/lib/supabase/service';

const noContent = () => new NextResponse(null, { status: 204 });

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return new NextResponse(null, { status: 403 });
  if (isBot(req.headers.get('user-agent') ?? '')) return noContent();

  let json: unknown;
  try {
    json = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const parsed = trackPayloadSchema.safeParse(json);
  if (!parsed.success) return new NextResponse(null, { status: 400 });
  const { sid, ctx, events } = parsed.data;

  if (rateLimited(`track:${clientIp(req)}`, 120)) return new NextResponse(null, { status: 429 });

  const db = serviceClient();
  if (!db) return noContent(); // Supabase not configured (e.g. local dev without env) — drop silently.

  const { error: sErr } = await db
    .from('sessions')
    // With context: merge it in (the row may already exist bare, e.g. created by /api/lead).
    // Without context: only create the row if it's missing.
    .upsert(sessionRow(req, sid, ctx), { onConflict: 'id', ignoreDuplicates: !ctx });
  if (sErr) {
    console.error('[track] session upsert failed', sErr.message);
    return new NextResponse(null, { status: 500 });
  }

  const now = Date.now();
  const { error: eErr } = await db.from('events').insert(
    events.map((e) => ({
      session_id: sid,
      ts: new Date(now - e.age).toISOString(),
      type: e.type,
      section: e.section ?? null,
      target: e.target ?? null,
      value: e.value ?? null,
    })),
  );
  if (eErr) {
    console.error('[track] events insert failed', eErr.message);
    return new NextResponse(null, { status: 500 });
  }
  return noContent();
}
