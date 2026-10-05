import { FAQ } from '@/components/landing/Faq';

// Human-readable names for the data-track ids used on the landing page.
const CTA_LABELS: Record<string, string> = {
  hero_cta: 'Hero: „Kostenlosen Karriere-Check starten“',
  hero_secondary: 'Hero: „Bin ich förderberechtigt?“',
  nav_cta: 'Navigation: „Karriere-Check“',
  mobile_nav_cta: 'Mobiles Menü: „Karriere-Check starten“',
  kurse_cta: 'Kurse: „Termin sichern“',
  program_cta: 'Programm: „Karriere-Check starten“',
  funding_cta: 'Förderung: „Anspruch prüfen lassen“',
  faq_cta: 'FAQ: „Stell sie uns im Karriere-Check“',
  form_submit_button: 'Formular: Absenden-Button',
  course_more_ki_grundlagen: 'KI-Kurs: KI-Grundlagen „Mehr erfahren“',
  course_more_prompt: 'KI-Kurs: Prompt Engineering „Mehr erfahren“',
  course_more_teams: 'KI-Kurs: KI im Unternehmen „Mehr erfahren“',
};

export function ctaLabel(target: string) {
  if (CTA_LABELS[target]) return CTA_LABELS[target];
  const nav = target.match(/^(mobile_)?nav_link_(.+)$/);
  if (nav) return `${nav[1] ? 'Mobiles Menü' : 'Navigation'}: #${nav[2]}`;
  return target;
}

export const isNavLink = (target: string) => /^(mobile_)?nav_link_/.test(target);

export function faqLabel(id: string) {
  return FAQ.find((f) => f.id === id)?.q ?? id;
}
