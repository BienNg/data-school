'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { flushNow, getSessionId, track } from '@/lib/analytics/tracker';
import { WEB3FORMS_ACCESS_KEY } from '@/lib/env';
import { BEREICH_OPTIONS, STATUS_OPTIONS, labelFor } from '@/lib/sections';

type State = 'idle' | 'sending' | 'success';

export function CheckForm() {
  const [state, setState] = useState<State>('idle');
  const [error, setError] = useState('');
  const [filled, setFilled] = useState<Record<string, boolean>>({});
  const started = useRef(false);
  const completed = useRef(new Set<string>());
  const successRef = useRef<HTMLDivElement>(null);

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track('form_start', { section: 'beratung' });
  };

  const onBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const el = e.target as unknown as HTMLInputElement | HTMLSelectElement;
    if (!el.name || el.type === 'hidden' || el.type === 'checkbox') return;
    if (el.value.trim() && !completed.current.has(el.name)) {
      completed.current.add(el.name);
      track('form_field_complete', { section: 'beratung', target: el.name });
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      const firstInvalid = form.querySelector<HTMLInputElement>(':invalid');
      track('form_error', { section: 'beratung', target: firstInvalid?.name, value: { message: 'Validierung' } });
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    track('form_submit', { section: 'beratung' });
    setError('');
    setState('sending');
    // Make sure the session (UTM source, clicks) is stored before the lead, so the lead is attributable.
    await flushNow();

    const lead = fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, botcheck: data.botcheck === 'on', sid: getSessionId() ?? undefined }),
    }).then(async (r) => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok || !body.ok) throw new Error(body.message || 'Lead konnte nicht gespeichert werden.');
    });

    // E-mail notification to the team (Web3Forms only accepts browser-side submissions on the free plan).
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
      }),
    }).then(async (r) => {
      const body = await r.json().catch(() => ({}));
      if (!r.ok || !body.success) throw new Error(body.message || 'E-Mail konnte nicht gesendet werden.');
    });

    const [db, email] = await Promise.allSettled([lead, mail]);
    const dbOk = db.status === 'fulfilled';
    const emailOk = email.status === 'fulfilled';

    // Either channel reaching us is enough — the team gets the lead one way or the other.
    if (dbOk || emailOk) {
      track('form_success', { section: 'beratung', value: { db: dbOk, email: emailOk } });
      setState('success');
      requestAnimationFrame(() => {
        if (successRef.current) gsap.from(successRef.current, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' });
      });
    } else {
      const message = db.status === 'rejected' ? (db.reason as Error).message : 'Unbekannter Fehler';
      track('form_error', { section: 'beratung', value: { message: message.slice(0, 120) } });
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt an team@schwabeo.de.');
      setState('idle');
    }
  }

  const markFilled = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilled((f) => ({ ...f, [e.target.name]: !!e.target.value }));

  return (
    <section className="cta" id="beratung">
      <div className="cta-inner">
        <p className="section-overline cta-overline reveal">Kostenloser Karriere-Check</p>
        <h2 className="reveal">Lass uns über deinen Weg sprechen.</h2>
        <p className="cta-sub reveal">
          15 Minuten, kostenlos, unverbindlich. Wir schauen, ob Data Analytics zu deiner Erfahrung passt, und prüfen
          deinen Anspruch auf den Bildungsgutschein.
        </p>

        {state !== 'success' ? (
          <form className="cta-form reveal" noValidate onSubmit={onSubmit} onFocus={onFocus} onBlur={onBlur}>
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
            <input type="text" name="vorname" placeholder="Vorname" autoComplete="given-name" required maxLength={80} />
            <input type="email" name="email" placeholder="E-Mail-Adresse" autoComplete="email" required maxLength={200} />
            <input type="tel" name="telefon" placeholder="Telefonnummer (optional)" autoComplete="tel" maxLength={40} />
            <div className="select-wrap">
              <select name="status" required aria-label="Wie ist deine aktuelle Situation?" defaultValue="" onChange={markFilled} className={filled.status ? 'filled' : ''}>
                <option value="" disabled>
                  Ich bin…
                </option>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-wrap">
              <select name="bereich" required aria-label="Aus welchem Bereich kommst du?" defaultValue="" onChange={markFilled} className={filled.bereich ? 'filled' : ''}>
                <option value="" disabled>
                  Aus welchem Bereich kommst du?
                </option>
                {BEREICH_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary" disabled={state === 'sending'} data-track="form_submit_button">
              {state === 'sending' ? 'Wird gesendet…' : 'Kostenlosen Karriere-Check anfragen'}
            </button>
            {error && (
              <p className="cta-form-error" role="alert" style={{ display: 'block' }}>
                {error}
              </p>
            )}
            <p className="cta-fineprint">
              Kostenlos &amp; unverbindlich. Kein Spam. Keine Job- oder Fördergarantie.{' '}
              <a href="/datenschutz">Datenschutz</a>
            </p>
          </form>
        ) : (
          <div className="cta-success" ref={successRef} style={{ display: 'block' }}>
            <h3>Vielen Dank!</h3>
            <p>Wir haben deine Anfrage erhalten und melden uns innerhalb von 24 Stunden bei dir — kostenlos und unverbindlich.</p>
          </div>
        )}
      </div>
    </section>
  );
}
