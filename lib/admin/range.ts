// Date-range handling for the dashboard. Days are bucketed in Europe/Berlin.
export const RANGE_PRESETS = [
  { key: 'today', label: 'Heute', days: 1 },
  { key: '7d', label: 'Letzte 7 Tage', days: 7 },
  { key: '30d', label: 'Letzte 30 Tage', days: 30 },
  { key: '90d', label: 'Letzte 90 Tage', days: 90 },
] as const;

export const DEVICES = [
  { key: '', label: 'Alle Geräte' },
  { key: 'mobile', label: 'Mobil' },
  { key: 'desktop', label: 'Desktop' },
  { key: 'tablet', label: 'Tablet' },
] as const;

const TZ = 'Europe/Berlin';

/** UTC instant of midnight in Berlin for the Berlin calendar day containing `d`. */
function berlinMidnight(d: Date): Date {
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  const utcMidnight = new Date(`${ymd}T00:00:00Z`);
  const berlinHour = Number(
    new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', hourCycle: 'h23' }).format(utcMidnight),
  );
  return new Date(utcMidnight.getTime() - berlinHour * 3600_000);
}

export type Filters = {
  rangeKey: string;
  rangeLabel: string;
  from: Date;
  to: Date;
  prevFrom: Date;
  prevTo: Date;
  device: string | null;
  days: number;
};

export function parseFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const rangeParam = typeof sp.range === 'string' ? sp.range : '30d';
  const preset = RANGE_PRESETS.find((p) => p.key === rangeParam) ?? RANGE_PRESETS[2];
  const deviceParam = typeof sp.device === 'string' ? sp.device : '';
  const device = DEVICES.some((d) => d.key === deviceParam && d.key) ? deviceParam : null;

  const now = new Date();
  const to = new Date(berlinMidnight(now).getTime() + 86_400_000); // end of today (Berlin)
  const from = berlinMidnight(new Date(now.getTime() - (preset.days - 1) * 86_400_000));
  const span = to.getTime() - from.getTime();
  return {
    rangeKey: preset.key,
    rangeLabel: preset.label,
    from,
    to,
    prevFrom: new Date(from.getTime() - span),
    prevTo: from,
    device,
    days: preset.days,
  };
}

export function rpcArgs(f: Filters, prev = false) {
  return {
    p_from: (prev ? f.prevFrom : f.from).toISOString(),
    p_to: (prev ? f.prevTo : f.to).toISOString(),
    p_device: f.device,
  };
}
