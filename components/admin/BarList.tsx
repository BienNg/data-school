'use client';

import { useState } from 'react';

export type BarItem = {
  key: string;
  label: string;
  sublabel?: string;
  value: number;
  /** Text shown at the bar tip (defaults to the value). */
  display?: string;
  secondary?: string;
  /** Extra rows for the hover tooltip. */
  details?: { label: string; value: string }[];
  /** Text shown between this bar and the previous one (funnel step loss). */
  stepNote?: { text: string; bad?: boolean };
  muted?: boolean;
};

/** Horizontal single-series bars with value labels at the tip and a per-row hover/focus tooltip. */
export function BarList({ items, max, series = 1, empty = 'Keine Daten im Zeitraum.' }: {
  items: BarItem[];
  max?: number;
  series?: 1 | 2;
  empty?: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  if (!items.length) return <p className="adm-empty">{empty}</p>;
  const top = max ?? Math.max(...items.map((i) => i.value), 1);
  // Bars scale within (track − label room), so the value at the tip never overflows the card.
  const reserve = items.some((i) => i.secondary) ? 150 : 64;

  return (
    <div className="adm-bars" onMouseLeave={() => setHover(null)}>
      {items.map((it) => (
        <div key={it.key}>
          {it.stepNote && <div className={`adm-step-drop${it.stepNote.bad ? ' bad' : ''}`}>{it.stepNote.text}</div>}
          <div
            className="adm-bar-row"
            tabIndex={0}
            onMouseEnter={() => setHover(it.key)}
            onFocus={() => setHover(it.key)}
            onBlur={() => setHover(null)}
          >
            <div className="adm-bar-label" title={it.label}>
              {it.label}
              {it.sublabel && <small>{it.sublabel}</small>}
            </div>
            <div className="adm-bar-track">
              <div
                className={`adm-bar-fill${it.muted ? ' muted' : series === 2 ? ' s2' : ''}`}
                style={{ width: `calc((100% - ${reserve}px) * ${Math.min(Math.max(it.value, 0) / top, 1)})` }}
              />
              <span className="adm-bar-value">
                {it.display ?? it.value.toLocaleString('de-DE')}
                {it.secondary && <small>{it.secondary}</small>}
              </span>
            </div>
            {hover === it.key && it.details && (
              <div className="adm-tip" role="tooltip">
                <div className="t-title">{it.label}</div>
                {it.details.map((d) => (
                  <div key={d.label} className="t-row">
                    <span className="t-key" />
                    <strong>{d.value}</strong> {d.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
