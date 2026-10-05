'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DEVICES, RANGE_PRESETS } from '@/lib/admin/range';

/** One filter row above everything; every chart and table on the page re-renders against it. */
export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [pending, start] = useTransition();
  const range = sp.get('range') ?? '30d';
  const device = sp.get('device') ?? '';

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    start(() => router.replace(`${pathname}?${next}`, { scroll: false }));
  };

  return (
    <div className={`adm-filters${pending ? ' adm-loading' : ''}`}>
      <div className="adm-seg" role="group" aria-label="Zeitraum">
        {RANGE_PRESETS.map((p) => (
          <button key={p.key} aria-pressed={range === p.key} onClick={() => set('range', p.key)}>
            {p.label}
          </button>
        ))}
      </div>
      <select className="adm-select" value={device} onChange={(e) => set('device', e.target.value)} aria-label="Gerät">
        {DEVICES.map((d) => (
          <option key={d.key} value={d.key}>
            {d.label}
          </option>
        ))}
      </select>
      <span className="adm-note">{pending ? 'Lädt…' : 'Zeiten in Europe/Berlin · Vergleich mit dem Vorzeitraum'}</span>
    </div>
  );
}
