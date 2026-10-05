// Single source of truth for the landing page sections, in page order.
// The tracker reports `section` by these ids; the dashboard uses the labels and order.
export const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'trust', label: 'Förderbar über' },
  { id: 'arbeitgeber', label: 'Arbeitgeber' },
  { id: 'situation', label: 'Kommt dir das bekannt vor?' },
  { id: 'quereinstieg', label: 'Du fängst nicht bei null an' },
  { id: 'kurse', label: 'Kurse / Karrierepfad' },
  { id: 'ablauf', label: 'Dein Weg in 4 Schritten' },
  { id: 'programm', label: 'Karriereprogramm' },
  { id: 'karriere-stats', label: 'Datenanalyse lohnt sich' },
  { id: 'ueber-uns', label: 'Warum Data School?' },
  { id: 'methode', label: 'Methode' },
  { id: 'foerderung', label: 'Förderung' },
  { id: 'erfolge', label: 'Erfolgsgeschichten' },
  { id: 'kompaktkurse', label: 'Kompakte KI-Kurse' },
  { id: 'faq', label: 'FAQ' },
  { id: 'beratung', label: 'Karriere-Check (Formular)' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const FORM_FIELDS = [
  { name: 'vorname', label: 'Vorname' },
  { name: 'email', label: 'E-Mail' },
  { name: 'telefon', label: 'Telefon (optional)' },
  { name: 'status', label: 'Status' },
  { name: 'bereich', label: 'Bereich' },
] as const;

export const STATUS_OPTIONS = [
  { value: 'arbeitssuchend', label: 'Arbeitssuchend' },
  { value: 'arbeitslos_bedroht', label: 'Von Arbeitslosigkeit bedroht' },
  { value: 'berufstaetig', label: 'Berufstätig' },
  { value: 'selbststaendig', label: 'Selbstständig' },
  { value: 'unternehmen', label: 'Unternehmen' },
] as const;

export const BEREICH_OPTIONS = [
  { value: 'kaufmaennisch', label: 'Kaufmännisch / BWL' },
  { value: 'finance', label: 'Finance / Controlling' },
  { value: 'marketing', label: 'Marketing / Vertrieb' },
  { value: 'logistik', label: 'Logistik / Einkauf' },
  { value: 'it', label: 'IT / Technik' },
  { value: 'sonstiges', label: 'Sonstiges' },
] as const;

export function labelFor(list: readonly { value: string; label: string }[], value: string | null | undefined) {
  return list.find((o) => o.value === value)?.label ?? value ?? '—';
}
