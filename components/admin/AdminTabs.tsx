'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const TABS = [
  { href: '/admin', label: 'Übersicht' },
  { href: '/admin/sektionen', label: 'Sektionen' },
  { href: '/admin/conversion', label: 'Conversion' },
  { href: '/admin/quellen', label: 'Quellen' },
  { href: '/admin/leads', label: 'Leads' },
];

export function AdminTabs() {
  const pathname = usePathname();
  const sp = useSearchParams();
  // Keep the date range + device filter when switching tabs.
  const keep = new URLSearchParams();
  for (const k of ['range', 'device']) {
    const v = sp.get(k);
    if (v) keep.set(k, v);
  }
  const qs = keep.toString() ? `?${keep}` : '';
  return (
    <nav className="adm-tabs" aria-label="Dashboard">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href + qs} aria-current={pathname === t.href ? 'page' : undefined}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
