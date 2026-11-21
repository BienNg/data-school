'use client';

import { useEffect } from 'react';
import { initTracker } from '@/lib/analytics/tracker';

/** Cookieless page analytics. Entrance motion is intentionally off so the page matches the static layout. */
export function LandingEffects() {
  useEffect(() => initTracker(), []);
  return null;
}
