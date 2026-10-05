'use client';

import { useState } from 'react';
import { DataMark } from '@/components/DataMark';
import { browserClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setError('');
    const { error } = await browserClient().auth.signInWithPassword({
      email: String(fd.get('email')),
      password: String(fd.get('password')),
    });
    if (error) {
      setError('Anmeldung fehlgeschlagen. E-Mail oder Passwort prüfen.');
      setBusy(false);
      return;
    }
    window.location.assign('/admin');
  }

  return (
    <div className="adm-login">
      <form onSubmit={onSubmit}>
        <div className="adm-brand">
          <DataMark />
          <span>
            <span className="o">DATA</span> SCHOOL <small>Analytics</small>
          </span>
        </div>
        <input type="email" name="email" placeholder="E-Mail" autoComplete="email" required />
        <input type="password" name="password" placeholder="Passwort" autoComplete="current-password" required />
        <button className="adm-btn" disabled={busy}>
          {busy ? 'Anmelden…' : 'Anmelden'}
        </button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  );
}
