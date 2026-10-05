import { redirect } from 'next/navigation';
import { DataMark } from '@/components/DataMark';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { FilterBar } from '@/components/admin/FilterBar';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/lib/env';
import { serverClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    return (
      <div className="adm-notice">
        <h1>Supabase ist nicht konfiguriert</h1>
        <p>
          Setze <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> und{' '}
          <code>SUPABASE_SECRET_KEY</code> (siehe <code>.env.example</code> und README).
        </p>
      </div>
    );
  }

  const db = await serverClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: isAdmin } = await db.rpc('is_admin');
  if (!isAdmin) {
    return (
      <div className="adm-notice">
        <h1>Kein Zugriff</h1>
        <p>
          Der Account <strong>{user.email}</strong> ist angemeldet, aber nicht als Admin freigeschaltet. Ein bestehender
          Admin muss ihn in der Tabelle <code>admins</code> eintragen (siehe README).
        </p>
        <form action="/admin/logout" method="post">
          <button className="adm-btn ghost">Abmelden</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <header className="adm-top">
        <div className="adm-top-inner">
          <a href="/admin" className="adm-brand">
            <DataMark />
            <span>
              <span className="o">DATA</span> SCHOOL <small>Analytics</small>
            </span>
          </a>
          <AdminTabs />
          <div className="adm-user">
            <span>{user.email}</span>
            <form action="/admin/logout" method="post">
              <button>Abmelden</button>
            </form>
          </div>
        </div>
      </header>
      <main className="adm-main">
        <FilterBar />
        {children}
      </main>
    </>
  );
}
