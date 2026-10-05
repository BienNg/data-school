type Props = {
  label: string;
  value: string;
  /** Current and previous raw values; the delta is computed from them. */
  current?: number;
  previous?: number;
  /** Format the delta as percentage points (for rates) instead of relative %. */
  points?: boolean;
  upIsGood?: boolean;
  hint?: string;
  hero?: boolean;
};

export function StatTile({ label, value, current, previous, points, upIsGood = true, hint, hero }: Props) {
  let delta: React.ReactNode = null;
  if (current !== undefined && previous === undefined) {
    delta = <div className="delta">zu wenig Vergleichsdaten</div>;
  } else if (current !== undefined && previous !== undefined) {
    if (previous === 0 && !points) {
      delta = <div className="delta">kein Vorzeitraum-Wert</div>;
    } else {
      const d = points ? (current - previous) * 100 : ((current - previous) / previous) * 100;
      const rounded = Math.round(d * 10) / 10;
      const dir = rounded === 0 ? '' : (rounded > 0) === upIsGood ? 'up' : 'down';
      const sign = rounded > 0 ? '+' : rounded < 0 ? '−' : '±';
      const txt = `${sign}${Math.abs(rounded).toFixed(1).replace('.', ',')}${points ? ' Pp.' : ' %'}`;
      delta = (
        <div className={`delta ${dir}`}>
          {rounded > 0 ? '▲' : rounded < 0 ? '▼' : '■'} {txt} <span className="dim">vs. Vorzeitraum</span>
        </div>
      );
    }
  }
  return (
    <div className={`adm-kpi${hero ? ' hero' : ''}`}>
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
      {delta}
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
