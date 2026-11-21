'use client';

import { useEffect } from 'react';
import { initTracker } from '@/lib/analytics/tracker';

/** Elements that fade up on their own. */
const SINGLES = ['.section-head', '.band h2', '.life-wrap','.mentor-card', '.cta-card', '.footer-banner'];

/** Containers whose children arrive one after another (stagger capped so long lists don't drag). */
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

const MAX_STAGGER = 5;

/** Cookieless page analytics + one-time scroll reveals. */
export function LandingEffects() {
  useEffect(() => initTracker(), []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-shown', '');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
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
        (child as HTMLElement).style.setProperty('--i', String(Math.min(i, MAX_STAGGER)));
      });
      el.setAttribute('data-reveal-group', '');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
