// Cookieless landing-page tracker.
// Nothing is written to cookies/localStorage/sessionStorage: the session id lives in memory for
// the lifetime of the page load, and the server derives a daily-rotating visitor hash itself.
import type { EventType, TrackContext, TrackEvent } from './schema';

type Pending = Omit<TrackEvent, 'age'> & { at: number };

const ENDPOINT = '/api/track';
const FLUSH_INTERVAL_MS = 5000;
const MAX_QUEUE = 40;
const MAX_CHUNK_MS = 30 * 60 * 1000;
const SCROLL_MARKS = [25, 50, 75, 100];

let sid: string | null = null;
let ctx: TrackContext | null = null;
let ctxAcked = false;
let queue: Pending[] = [];

export function getSessionId(): string | null {
  return sid;
}

export function track(type: EventType, data: Omit<TrackEvent, 'type' | 'age'> = {}) {
  if (!sid) return;
  queue.push({ type, ...data, at: Date.now() });
  if (queue.length >= MAX_QUEUE) flush(false);
}

function flush(useBeacon: boolean): Promise<void> {
  if (!sid || queue.length === 0) return Promise.resolve();
  const now = Date.now();
  const events = queue.map(({ at, ...e }) => ({ ...e, age: Math.max(0, now - at) }));
  queue = [];
  const body = JSON.stringify({ sid, ctx: ctxAcked ? undefined : ctx, events });

  if (useBeacon && navigator.sendBeacon) {
    if (navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }))) {
      ctxAcked = true;
      return Promise.resolve();
    }
  }
  return fetch(ENDPOINT, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } })
    .then((r) => {
      if (r.ok) ctxAcked = true;
    })
    .catch(() => {});
}

/** Sends everything queued so far and resolves when the server has it (used before a lead submit). */
export function flushNow(timeoutMs = 1500): Promise<void> {
  return Promise.race([flush(false), new Promise<void>((r) => setTimeout(r, timeoutMs))]);
}

function sectionOf(el: Element | null): string | undefined {
  return el?.closest('section[id]')?.id || undefined;
}

function readContext(): TrackContext {
  const params = new URLSearchParams(location.search);
  const utm = (k: string) => params.get(k)?.slice(0, 120) || undefined;
  let referrer: string | undefined;
  try {
    if (document.referrer) {
      const r = new URL(document.referrer);
      // Host + path only: query strings can carry personal data.
      if (r.host !== location.host) referrer = (r.host + r.pathname).slice(0, 500);
    }
  } catch {}
  return {
    path: location.pathname,
    referrer,
    utm_source: utm('utm_source'),
    utm_medium: utm('utm_medium'),
    utm_campaign: utm('utm_campaign'),
    utm_content: utm('utm_content'),
    utm_term: utm('utm_term'),
    vw: window.innerWidth,
    vh: window.innerHeight,
    lang: navigator.language?.slice(0, 35),
  };
}

/** Starts tracking for this page load. Returns a cleanup function. */
export function initTracker(): () => void {
  if (sid) return () => {};
  sid = crypto.randomUUID();
  ctx = readContext();
  ctxAcked = false;
  track('page_view');

  const cleanups: (() => void)[] = [];
  const on = <K extends keyof DocumentEventMap>(
    target: Document | Window,
    type: K | string,
    fn: (e: Event) => void,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn, opts);
    cleanups.push(() => target.removeEventListener(type, fn, opts));
  };

  // ---- Clicks: anything with data-track, plus outbound/tel/mailto links ----
  on(
    document,
    'click',
    (e) => {
      const el = e.target instanceof Element ? e.target : null;
      const tracked = el?.closest<HTMLElement>('[data-track]');
      if (tracked) {
        const href = tracked.getAttribute('href') ?? undefined;
        track('click', {
          target: tracked.dataset.track,
          section: sectionOf(tracked),
          value: { text: (tracked.textContent ?? '').trim().slice(0, 80), ...(href ? { href: href.slice(0, 200) } : {}) },
        });
        return;
      }
      const link = el?.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') ?? '';
      if (href.startsWith('tel:') || href.startsWith('mailto:')) {
        track('outbound_click', { target: href.split(':')[0], section: sectionOf(link) });
      } else if (link.host && link.host !== location.host) {
        track('outbound_click', { target: link.host, section: sectionOf(link) });
      }
    },
    { capture: true },
  );

  // ---- FAQ: <details data-faq="id"> toggles (toggle doesn't bubble, so listen in capture phase) ----
  on(
    document,
    'toggle',
    (e) => {
      const d = e.target as HTMLDetailsElement;
      if (d?.tagName === 'DETAILS' && d.open && d.dataset.faq) {
        track('faq_open', { target: d.dataset.faq, section: sectionOf(d) });
      }
    },
    { capture: true },
  );

  // ---- Scroll depth ----
  const reached = new Set<number>();
  let scrollTicking = false;
  const checkScroll = () => {
    scrollTicking = false;
    const doc = document.documentElement;
    const pct = ((window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1)) * 100;
    for (const mark of SCROLL_MARKS) {
      if (pct >= mark - 0.5 && !reached.has(mark)) {
        reached.add(mark);
        track('scroll_depth', { target: String(mark), value: { pct: mark } });
      }
    }
  };
  on(
    window,
    'scroll',
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(checkScroll);
      }
    },
    { passive: true },
  );

  // ---- Section views + dwell time ----
  // A section counts as "in view" when it fills ≥ 50% of the viewport, or ≥ 50% of a
  // short section is visible. Tall sections would otherwise never reach a fixed ratio.
  const seen = new Set<string>();
  const activeSince = new Map<string, number>();
  const dwell = new Map<string, number>();
  const pageVisible = () => document.visibilityState === 'visible';

  const stopDwell = (id: string, now: number) => {
    const start = activeSince.get(id);
    if (start === undefined) return;
    dwell.set(id, (dwell.get(id) ?? 0) + Math.min(now - start, MAX_CHUNK_MS));
    activeSince.delete(id);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const now = Date.now();
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        const viewportH = entry.rootBounds?.height ?? window.innerHeight;
        const denom = Math.min(entry.boundingClientRect.height, viewportH) || 1;
        const inView = entry.isIntersecting && entry.intersectionRect.height / denom >= 0.5;
        if (inView) {
          if (!seen.has(id)) {
            seen.add(id);
            track('section_view', { section: id });
          }
          if (!activeSince.has(id) && pageVisible()) activeSince.set(id, now);
        } else {
          stopDwell(id, now);
        }
      }
    },
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
  sections.forEach((s) => observer.observe(s));
  cleanups.push(() => observer.disconnect());

  // ---- Engagement time (only while the tab is visible) ----
  let visibleSince: number | null = pageVisible() ? Date.now() : null;

  const closeChunk = () => {
    const now = Date.now();
    if (visibleSince !== null) {
      const ms = Math.min(now - visibleSince, MAX_CHUNK_MS);
      if (ms > 0) track('engagement', { value: { ms } });
      visibleSince = null;
    }
    for (const id of Array.from(activeSince.keys())) stopDwell(id, now);
    for (const [id, ms] of dwell) {
      if (ms >= 250) track('section_dwell', { section: id, value: { ms } });
    }
    dwell.clear();
  };

  const resumeChunk = () => {
    const now = Date.now();
    visibleSince = now;
    // Re-arm dwell timers for sections that are still on screen.
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      const visible = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
      if (visible / (Math.min(r.height, window.innerHeight) || 1) >= 0.5) activeSince.set(s.id, now);
    }
  };

  on(document, 'visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      closeChunk();
      flush(true);
    } else {
      resumeChunk();
    }
  });
  on(window, 'pagehide', () => {
    closeChunk();
    flush(true);
  });

  const interval = window.setInterval(() => flush(false), FLUSH_INTERVAL_MS);
  cleanups.push(() => window.clearInterval(interval));
  checkScroll();

  return () => {
    closeChunk();
    flush(true);
    cleanups.forEach((fn) => fn());
    sid = null;
  };
}
