'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { initTracker } from '@/lib/analytics/tracker';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Page-level side effects: entrance/scroll animations and the cookieless tracker. */
export function LandingEffects() {
  useGSAP(() => {
    gsap.from('[data-hero]', { y: 36, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.13, delay: 0.15 });
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        },
      );
    });
  });

  useEffect(() => initTracker(), []);

  return null;
}
