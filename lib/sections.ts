// Single source of truth for the landing page sections, in page order.
// The tracker reports `section` by these ids; the dashboard uses the labels and order.
export const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'qualifikationen', label: 'Förderung & Qualifikationen' },
  { id: 'zielgruppe', label: 'Für wen ist das Programm?' },
  { id: 'markt', label: 'Marktperspektive' },
  { id: 'vorteile', label: 'Dein neuer Berufsalltag' },
  { id: 'programm', label: 'Qualifizierungspfade' },
  { id: 'lehrplan', label: 'Lehrplan' },
  { id: 'arbeitgeber', label: 'Arbeitgeber' },
  { id: 'beratung', label: 'Karriere-Check (Formular)' },
  { id: 'dozenten', label: 'Dozenten' },
  { id: 'foerderung', label: 'Förderung' },
  { id: 'ablauf', label: 'In 4 Schritten' },
  { id: 'faq', label: 'FAQ' },
  { id: 'beratung-unten', label: 'Karriere-Check (zweiter Block)' },
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
  { value: 'gutschein_ja', label: 'Bildungsgutschein: Ja' },
  { value: 'gutschein_nein', label: 'Bildungsgutschein: Nein' },
  { value: 'gutschein_beantragung', label: 'Bildungsgutschein: in Beantragung' },
] as const;

/** Options shown on the redesigned Karriere-Check form. Values stay inside BEREICH_OPTIONS so the existing lead API accepts them. */
export const GUTSCHEIN_OPTIONS = [
  { value: 'gutschein_ja', label: 'Ja' },
  { value: 'gutschein_nein', label: 'Nein' },
  { value: 'gutschein_beantragung', label: 'In Beantragung' },
] as const;

export function labelFor(list: readonly { value: string; label: string }[], value: string | null | undefined) {
  return list.find((o) => o.value === value)?.label ?? value ?? '—';
}
