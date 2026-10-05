const nf = new Intl.NumberFormat('de-DE');
export const fmt = (n: number) => nf.format(Math.round(n));
export const fmtPct = (part: number, whole: number, digits = 1) =>
  whole > 0 ? `${((part / whole) * 100).toFixed(digits).replace('.', ',')} %` : '–';
export const ratio = (part: number, whole: number) => (whole > 0 ? part / whole : 0);
export function fmtDuration(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  return `${m} min ${String(s % 60).padStart(2, '0')} s`;
}
export function fmtCompact(n: number) {
  if (n >= 10_000) return `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace('.', ',')} Tsd.`;
  return fmt(n);
}
export const fmtDateTime = (iso: string) =>
  new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso));
