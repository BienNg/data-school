'use client';

import { useEffect } from 'react';
import { initTracker } from '@/lib/analytics/tracker';

/** Elements that fade up on their own. */
const SINGLES = ['.section-head', '.band h2', '.life-wrap', '.mentor-card', '.cta-card', '.footer-banner'];

/** Containers whose children arrive one after another. */
const GROUPS = [
  '.qual-grid',
  '.audience-grid',
  '.market-grid',
  '.paths-track',
  '.program > .wrap',
  '.logo-row',
  '.fund-grid',
  '.timeline',
  '.faq-layout',
];

/** Shrinking gaps (50, 40, 30, 20ms) so a group reads as one motion and ends sooner; later items share the last slot. */
const STAGGER_MS = [0, 50, 90, 120, 140];

/** Longest reveal: 600ms transition + 140ms stagger, plus headroom. After this the reveal attributes are removed. */
const CLEANUP_MS = 900;

/** Cookieless page analytics + one-time scroll reveals. */
export function LandingEffects() {
  useEffect(() => initTracker(), []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const timers = new Set<number>();

    // Once revealed, drop every trace so the reveal transition and delay never leak into later state changes.
    const cleanup = (el: Element) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        for (const child of Array.from(el.children)) (child as HTMLElement).style.removeProperty('--d');
        el.removeAttribute('data-reveal');
        el.removeAttribute('data-reveal-group');
        el.removeAttribute('data-shown');
      }, CLEANUP_MS);
      timers.add(id);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-shown', '');
          io.unobserve(entry.target);
          cleanup(entry.target);
        }
      },
      { rootMargin: '0px 0px -5% 0px' },
    );

    // Only tag what starts below the fold — anything already visible stays untouched, so it never flickers.
    const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;

    document.querySelectorAll(SINGLES.join(',')).forEach((el) => {
      if (!belowFold(el)) return;
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });

    document.querySelectorAll<HTMLElement>(GROUPS.join(',')).forEach((el) => {
      if (!belowFold(el)) return;
      Array.from(el.children).forEach((child, i) => {
        const ms = STAGGER_MS[Math.min(i, STAGGER_MS.length - 1)];
        (child as HTMLElement).style.setProperty('--d', `${ms}ms`);
      });
      el.setAttribute('data-reveal-group', '');
      io.observe(el);
    });

    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return null;
}
