import { DataMark, Wordmark } from '@/components/DataMark';
import './legal.css';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-header-inner">
          <a href="/" className="legal-logo" aria-label="Data School — Startseite">
            <DataMark />
            <Wordmark />
          </a>
          <a href="/" className="legal-back">
            ← Zurück zur Startseite
          </a>
        </div>
      </header>
      <main className="legal-main">{children}</main>
      <footer className="legal-footer">
        <p>© {new Date().getFullYear()} Data School</p>
      </footer>
    </div>
  );
}
