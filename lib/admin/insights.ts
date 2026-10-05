// Rule-based "what to improve" hints. Every rule needs a minimum sample before it speaks,
// so the dashboard doesn't send anyone chasing noise.
import { FORM_FIELDS, SECTIONS } from '@/lib/sections';
import { ctaLabel, faqLabel, isNavLink } from './labels';
import type { CtaRow, FaqRow, FormStats, FunnelRow, Overview, SectionRow, SourceRow } from './data';

export type Insight = { severity: 'critical' | 'warning' | 'good' | 'info'; title: string; detail: string };

const MIN = 30;
const pct = (n: number) => `${Math.round(n * 100)} %`;
const dec = (n: number, digits = 1) => n.toFixed(digits).replace('.', ',');
const sectionLabel = (id: string) => SECTIONS.find((s) => s.id === id)?.label ?? id;

export function buildInsights(input: {
  overview: Overview;
  prev: Overview;
  funnel: FunnelRow[];
  sections: SectionRow[];
  ctas: CtaRow[];
  form: FormStats;
  faq: FaqRow[];
  devices: SourceRow[];
  sources: SourceRow[];
}): Insight[] {
  const { overview: o, prev, funnel, sections, ctas, form, faq, devices, sources } = input;
  const out: Insight[] = [];

  if (o.sessions < MIN) {
    return [
      {
        severity: 'info',
        title: 'Noch zu wenig Daten',
        detail: `${o.sessions} Besuche im Zeitraum. Ab ca. ${MIN} Besuchen werden hier konkrete Verbesserungsvorschläge angezeigt.`,
      },
    ];
  }

  const conv = o.converted_sessions / o.sessions;

  // 1. Biggest funnel leak.
  let worst: { from: FunnelRow; to: FunnelRow; drop: number } | null = null;
  for (let i = 1; i < funnel.length; i++) {
    const a = funnel[i - 1];
    const b = funnel[i];
    if (a.sessions < 10) continue;
    const drop = 1 - b.sessions / a.sessions;
    if (!worst || drop > worst.drop) worst = { from: a, to: b, drop };
  }
  if (worst && worst.drop > 0.4) {
    const tips: Record<string, string> = {
      past_hero: 'Der Hero hält nicht: Headline, Unterzeile oder Ladezeit prüfen — oder passt die Anzeige nicht zur Seite?',
      form_view: 'Viele erreichen das Formular gar nicht. Mehr CTAs weiter oben, die Seite straffen oder das Formular früher platzieren.',
      form_start: 'Das Formular wird gesehen, aber nicht begonnen. Vertrauen direkt am Formular stärken (Datenschutz, „15 Min., kostenlos“), Überschrift testen.',
      form_submit: 'Begonnen, aber nicht abgeschickt: Felder reduzieren (Telefon?), Fehlermeldungen prüfen — siehe Formular-Abbrüche.',
      lead: 'Abgeschickt, aber nicht erfolgreich: technische Fehler prüfen (Formular-Fehler auf der Conversion-Seite).',
    };
    out.push({
      severity: worst.drop > 0.7 ? 'critical' : 'warning',
      title: `Größter Verlust: „${worst.from.label}“ → „${worst.to.label}“ (−${pct(worst.drop)})`,
      detail: tips[worst.to.key] ?? '',
    });
  }

  // 2. Trend vs previous period.
  if (prev.sessions >= MIN) {
    const prevConv = prev.converted_sessions / prev.sessions;
    const delta = conv - prevConv;
    if (Math.abs(delta) >= 0.005) {
      out.push({
        severity: delta > 0 ? 'good' : 'warning',
        title: `Conversion-Rate ${delta > 0 ? 'gestiegen' : 'gesunken'}: ${dec(prevConv * 100)} % → ${dec(conv * 100)} %`,
        detail:
          delta > 0
            ? 'Gegenüber dem Vorzeitraum. Was wurde geändert? Festhalten, damit es nicht wieder verloren geht.'
            : 'Gegenüber dem Vorzeitraum. Neue Kampagnen oder Seitenänderungen im Zeitraum prüfen (siehe Quellen).',
      });
    }
  }

  // 3. Device gap.
  const dev = Object.fromEntries(devices.map((d) => [d.label, d]));
  const m = dev.mobile;
  const d = dev.desktop;
  if (m && d && m.sessions >= MIN && d.sessions >= MIN) {
    const mc = m.converted / m.sessions;
    const dc = d.converted / d.sessions;
    if (dc > 0 && mc < dc * 0.6) {
      out.push({
        severity: 'warning',
        title: `Mobil konvertiert deutlich schlechter (${dec(mc * 100)} % vs. ${dec(dc * 100)} % Desktop)`,
        detail: `${pct(m.sessions / o.sessions)} der Besuche sind mobil. Seite auf dem Handy durchklicken: Formularlänge, Tap-Ziele, Ladezeit, Textlänge.`,
      });
    } else if (mc > 0 && dc < mc * 0.6) {
      out.push({
        severity: 'info',
        title: `Desktop konvertiert schlechter als Mobil (${dec(dc * 100)} % vs. ${dec(mc * 100)} %)`,
        detail: 'Ungewöhnlich — Desktop-Layout prüfen (z. B. ob CTAs im sichtbaren Bereich sind).',
      });
    }
  }

  // 4. Where non-converters leave.
  const exits = sections.filter((s) => s.section !== 'beratung').sort((a, b) => b.last_seen - a.last_seen);
  const totalExits = exits.reduce((n, s) => n + s.last_seen, 0);
  if (exits[0] && totalExits >= MIN && exits[0].last_seen / totalExits > 0.25) {
    out.push({
      severity: 'warning',
      title: `${pct(exits[0].last_seen / totalExits)} der Abspringer verlassen die Seite bei „${sectionLabel(exits[0].section)}“`,
      detail: 'Diese Sektion ist für viele der letzte Eindruck. Inhalt schärfen, kürzen oder einen CTA direkt dort platzieren.',
    });
  }

  // 5. Low-attention sections (weak dwell time and few viewers convert).
  const viewed = sections.filter((s) => s.sessions_viewed >= MIN && !['hero', 'beratung', 'trust'].includes(s.section));
  if (viewed.length >= 4) {
    const sorted = [...viewed].sort((a, b) => a.avg_dwell_ms - b.avg_dwell_ms);
    const median = sorted[Math.floor(sorted.length / 2)].avg_dwell_ms;
    const weak = sorted.filter((s) => s.avg_dwell_ms < median * 0.4).slice(0, 2);
    for (const s of weak) {
      out.push({
        severity: 'info',
        title: `„${sectionLabel(s.section)}“ wird kaum gelesen (Ø ${dec(s.avg_dwell_ms / 1000)} s)`,
        detail: 'Kandidat zum Kürzen, Zusammenlegen oder Entfernen — die Seite wird dadurch kürzer und das Formular schneller erreicht.',
      });
    }
  }

  // 6. CTA performance.
  const realCtas = ctas.filter((c) => c.sessions >= 15 && !isNavLink(c.target) && c.target !== 'form_submit_button');
  if (realCtas.length >= 2) {
    const rate = (c: CtaRow) => c.converted_sessions / c.sessions;
    const best = [...realCtas].sort((a, b) => rate(b) - rate(a))[0];
    out.push({
      severity: 'good',
      title: `Stärkster CTA: ${ctaLabel(best.target)} — ${pct(rate(best))} der Klickenden fragen an`,
      detail: 'Text und Platzierung dieses Buttons als Vorlage für die anderen CTAs nutzen.',
    });
  }

  // 7. Form field abandonment.
  if (form.starts >= 15) {
    const required = FORM_FIELDS.filter((f) => f.name !== 'telefon');
    let prevCount = form.starts;
    for (const f of required) {
      const n = form.fields[f.name] ?? 0;
      if (prevCount >= 10 && n / prevCount < 0.7) {
        out.push({
          severity: 'warning',
          title: `Formular: ${pct(1 - n / prevCount)} brechen beim Feld „${f.label}“ ab`,
          detail: 'Feld vereinfachen, Hilfetext ergänzen oder prüfen, ob es wirklich Pflicht sein muss.',
        });
        break;
      }
      prevCount = n;
    }
    if (form.errors.length && form.errors[0].count >= 5) {
      out.push({
        severity: 'critical',
        title: `Formularfehler: „${form.errors[0].message}“ (${form.errors[0].count}×)`,
        detail: 'Anfragen gehen hier eventuell verloren — technische Ursache prüfen.',
      });
    }
  }

  // 8. FAQ = objections.
  const topFaq = faq[0];
  if (topFaq && topFaq.sessions >= 10) {
    out.push({
      severity: 'info',
      title: `Häufigste Frage: „${faqLabel(topFaq.target)}“ (${topFaq.sessions} Besucher)`,
      detail: 'Das ist ein Einwand. Die Antwort gehört weiter nach oben — in den Hero oder direkt neben das Formular.',
    });
  }

  // 9. Traffic sources with volume but no conversions.
  for (const s of sources.slice(0, 5)) {
    if (s.sessions >= 50 && s.converted === 0) {
      out.push({
        severity: 'warning',
        title: `„${s.label}“ bringt ${s.sessions} Besuche, aber keine Anfrage`,
        detail: `Engagement: ${pct(s.engaged / s.sessions)}. Passt die Anzeige/Zielgruppe zur Seite? Ggf. Budget umschichten.`,
      });
    }
  }

  // 10. Engagement baseline.
  const engaged = o.engaged_sessions / o.sessions;
  if (engaged < 0.4) {
    out.push({
      severity: 'warning',
      title: `Nur ${pct(engaged)} der Besuche sind engagiert`,
      detail: 'Engagiert = ≥ 10 s aktiv, ein Klick oder ≥ 50 % gescrollt. Viele springen sofort ab — Traffic-Qualität und Ladezeit prüfen.',
    });
  }

  const order = { critical: 0, warning: 1, info: 2, good: 3 };
  return out.sort((a, b) => order[a.severity] - order[b.severity]);
}
