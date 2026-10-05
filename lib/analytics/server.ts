import 'server-only';
import { createHash, createHmac } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { classifyUA } from './ua';
import type { TrackContext } from './schema';

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    '0.0.0.0'
  );
}

/**
 * Cookieless visitor id: sha256(daily salt + IP + UA). The salt is derived from a secret and the
 * current UTC date, so hashes can't be linked across days and the raw IP/UA are never stored.
 */
export function visitorHash(req: NextRequest): string {
  const secret = process.env.ANALYTICS_SALT_SECRET || 'dev-only-insecure-salt';
  const day = new Date().toISOString().slice(0, 10);
  const salt = createHmac('sha256', secret).update(day).digest('hex');
  const ua = req.headers.get('user-agent') ?? '';
  return createHash('sha256').update(`${salt}|${clientIp(req)}|${ua}`).digest('hex').slice(0, 32);
}

/** Rejects cross-site posts (browsers always send Origin on POST/beacon). */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === (req.headers.get('x-forwarded-host') ?? req.headers.get('host'));
  } catch {
    return false;
  }
}

/** Vercel sends the city percent-encoded (e.g. M%C3%BCnchen). */
function geoCity(req: NextRequest): string | null {
  const raw = req.headers.get('x-vercel-ip-city');
  if (!raw) return null;
  try {
    const city = decodeURIComponent(raw).trim();
    return city.slice(0, 80) || null;
  } catch {
    return raw.trim().slice(0, 80) || null;
  }
}

/** Builds the `sessions` row from request headers plus the optional client context. */
export function sessionRow(req: NextRequest, sid: string, ctx?: TrackContext) {
  const ua = req.headers.get('user-agent') ?? '';
  const { device, browser, os } = classifyUA(ua);
  const referrer = ctx?.referrer || null;
  return {
    id: sid,
    visitor_hash: visitorHash(req),
    landing_path: ctx?.path ?? null,
    referrer,
    referrer_host: referrer ? referrer.split('/')[0].replace(/^www\./, '') : null,
    utm_source: ctx?.utm_source?.toLowerCase() || null,
    utm_medium: ctx?.utm_medium?.toLowerCase() || null,
    utm_campaign: ctx?.utm_campaign || null,
    utm_content: ctx?.utm_content || null,
    utm_term: ctx?.utm_term || null,
    device,
    browser,
    os,
    country: req.headers.get('x-vercel-ip-country') || null,
    city: geoCity(req),
    viewport_w: ctx?.vw ?? null,
    viewport_h: ctx?.vh ?? null,
    lang: ctx?.lang ?? null,
  };
}

// Best-effort, per-instance rate limit. Good enough to stop a single noisy client.
const buckets = new Map<string, { n: number; reset: number }>();
export function rateLimited(key: string, limit: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    if (buckets.size > 5000) buckets.clear();
    buckets.set(key, { n: 1, reset: now + windowMs });
    return false;
  }
  b.n += 1;
  return b.n > limit;
}
