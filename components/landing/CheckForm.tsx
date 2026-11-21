'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { flushNow, getSessionId, track } from '@/lib/analytics/tracker';
import { WEB3FORMS_ACCESS_KEY } from '@/lib/env';
import { BEREICH_OPTIONS, GUTSCHEIN_OPTIONS, STATUS_OPTIONS, labelFor } from '@/lib/sections';

type State = 'idle' | 'sending' | 'success';

export function CheckForm({ id = 'beratung' }: { id?: string }) {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const [filled, setFilled] = useState<Record<string, boolean>>({});
  const started = useRef(false);
  const completed = useRef(new Set<string>());
  const successRef = useRef<HTMLDivElement>(null);

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track('form_start', { section: id });
  };

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const el = e.target as unknown as HTMLInputElement | HTMLSelectElement;
    if (!el.name || el.type === 'hidden' || el.type === 'checkbox') return;
    if (el.value.trim() && !completed.current.has(el.name)) {
      completed.current.add(el.name);
      track('form_field_complete', { section: id, target: el.name });
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      const firstInvalid = form.querySelector<HTMLInputElement>(':invalid');
      track('form_error', { section: id, target: firstInvalid?.name, value: { message: 'Validierung' } });
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    track('form_submit', { section: id });
    setError('');
    setState('sending');
    await flushNow();

    const lead = fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, botcheck: data.botcheck === 'on', sid: getSessionId() ?? undefined }),
    }).then(async (r) => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok || !body.ok) throw new Error(body.message || 'Lead konnte nicht gespeichert werden.');
    });

    const mail = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Neue Karriere-Check-Anfrage — Data School',
        from_name: 'Data School Website',
        botcheck: data.botcheck === 'on',
        vorname: data.vorname,
        email: data.email,
        telefon: data.telefon,
        status: labelFor(STATUS_OPTIONS, data.status),
        bereich: labelFor(BEREICH_OPTIONS, data.bereich),
        einwilligung: 'ja',
      }),
    }).then(async (r) => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok || !body.success) throw new Error(body.message || 'E-Mail konnte nicht gesendet werden.');
    });

    const [db, email] = await Promise.allSettled([lead, mail]);
    const dbOk = db.status === 'fulfilled';
    const emailOk = email.status === 'fulfilled';

    if (dbOk || emailOk) {
      track('form_success', { section: id, value: { db: dbOk, email: emailOk } });
      setState('success');
      requestAnimationFrame(() => {
        if (successRef.current) gsap.from(successRef.current, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' });
      });
    } else {
      const message = db.status === 'rejected' ? (db.reason as Error).message : 'Unbekannter Fehler';
      track('form_error', { section: id, value: { message: message.slice(0, 120) } });
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt an team@schwabeo.de.');
      setState('idle');
    }
  }

  const markFilled = (e: React.ChangeEvent<HTMLSelectElement>) => setFilled((f) => ({ ...f, [e.target.name]: !!e.target.value }));

  return (
    <section className="cta" id={id}>
      <div className="wrap">
        <div className="cta-card">
          <h2>Jetzt unverbindlichen Karriere-Check starten</h2>
          <p className="cta-sub">Prüfe kostenlos deine Fördermöglichkeiten und lass dir alle Fragen beantworten.</p>

          {state !== 'success' ? (
            <form className="cta-form" noValidate onSubmit={onSubmit} onFocus={onFocus} onBlur={onBlur}>
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
              <div className="form-grid">
                <label>
                  Vor- und Nachname *
                  <input type="text" name="vorname" placeholder="z.B. Alex Müller" autoComplete="name" required maxLength={80} />
                </label>
                <label>
                  E-Mail-Adresse *
                  <input type="email" name="email" placeholder="name@beispiel.de" autoComplete="email" required maxLength={200} />
                </label>
                <label>
                  Telefonnummer *
                  <input type="tel" name="telefon" placeholder="+49 170 1234567" autoComplete="tel" required maxLength={40} />
                </label>
                <label>
                  Aktueller Status *
                  <span className="select-wrap">
                    <select name="status" required aria-label="Aktueller Status" defaultValue="" onChange={markFilled} className={filled.status ? 'filled' : ''}>
                      <option value="" disabled>
                        Bitte auswählen...
                      </option>
                      {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <label className="span-2">
                  Liegt bereits ein Bildungsgutschein vor? *
                  <span className="select-wrap">
                    <select name="bereich" required aria-label="Liegt bereits ein Bildungsgutschein vor?" defaultValue="" onChange={markFilled} className={filled.bereich ? 'filled' : ''}>
                      <option value="" disabled>
                        Bitte auswählen...
                      </option>
                      {GUTSCHEIN_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              </div>
              <label className="consent">
                <input type="checkbox" name="einwilligung" required />
                <span>
                  Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz">Datenschutzerklärung</a> zu. *
                </span>
              </label>
              <button type="submit" className="btn btn-primary btn-block" disabled={state === 'sending'} data-track="form_submit_button">
                {state === 'sending' ? 'Wird gesendet…' : 'Kostenlosen Karriere-Check anfordern'}
              </button>
              {error && (
                <p className="cta-form-error" role="alert">
                  {error}
                </p>
              )}
              <p className="trust-line">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                100% DSGVO-konform. Deine Daten werden sicher verschlüsselt &amp; niemals an Dritte weitergegeben.{' '}
                <a href="/datenschutz">Datenschutz</a>
              </p>
            </form>
          ) : (
            <div className="cta-success" ref={successRef}>
              <h3>Vielen Dank!</h3>
              <p>Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden bei dir — kostenlos und unverbindlich.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
