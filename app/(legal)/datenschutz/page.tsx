import type { Metadata } from 'next';
import { LegalNav } from '../LegalNav';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Data School',
  description: 'Datenschutzerklärung der Data School — Informationen zur Verarbeitung personenbezogener Daten.',
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <>
      <h1>Datenschutzerklärung</h1>
      <p className="legal-updated">Stand: Oktober 2026</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        SCHWABEO GmbH<br />
        Theodor-Veiel-Str. 1<br />
        70374 Stuttgart<br />
        Telefon: <a href="tel:+4971140262480">+49 711 40262480</a><br />
        E-Mail: <a href="mailto:team@schwabeo.de">team@schwabeo.de</a>
      </p>

      <h2>2. Übersicht der Verarbeitungen</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website,
        zur Beantwortung von Anfragen oder zur Durchführung unserer Weiterbildungs- und Beratungsleistungen erforderlich ist.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei <strong>Vercel</strong> (Vercel Inc., USA) gehostet. Serverseitige Funktionen werden in der Region Frankfurt (EU) ausgeführt. Beim Aufruf der Seite werden
        technisch notwendige Daten (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp) verarbeitet, um die
        Website auszuliefern und vor Missbrauch zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
        Interesse an einem sicheren und stabilen Betrieb der Website). Mit Vercel besteht ein Vertrag zur
        Auftragsverarbeitung; Vercel ist unter dem EU-US Data Privacy Framework zertifiziert.
      </p>
      <p>
        Informationen zum Datenschutz bei Vercel:{' '}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>.
      </p>

      <h2>4. Schriftarten</h2>
      <p>
        Die auf dieser Website verwendete Schriftart (Inter) wird lokal von unserem eigenen Server ausgeliefert. Es
        findet keine Verbindung zu Servern von Google oder anderen Drittanbietern statt.
      </p>

      <h2>5. Karriere-Check- und Beratungsanfragen</h2>
      <p>
        Wenn Sie über das Formular auf unserer Website einen Karriere-Check bzw. eine Beratung anfragen, erheben wir folgende Daten:
      </p>
      <ul>
        <li>Vorname (Pflichtfeld)</li>
        <li>E-Mail-Adresse (Pflichtfeld)</li>
        <li>Telefonnummer (optional)</li>
        <li>Angabe zu Ihrer aktuellen Situation (z.&nbsp;B. Arbeitssuchend, Berufstätig — Pflichtfeld)</li>
        <li>Angabe zu Ihrem beruflichen Bereich (z.&nbsp;B. Finance / Controlling, Marketing — Pflichtfeld)</li>
      </ul>
      <p>
        Zweck der Verarbeitung ist die Bearbeitung Ihrer Anfrage und die Kontaktaufnahme zur Beratung bezüglich unserer
        Weiterbildungsangebote. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw.
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
      </p>
      <p>
        Die Anfrage wird in unserer Datenbank bei <strong>Supabase</strong> (Supabase Inc.) gespeichert. Die Datenbank wird in einem Rechenzentrum in Frankfurt am Main (EU) betrieben; mit
        Supabase besteht ein Vertrag zur Auftragsverarbeitung. Die Anfrage wird dabei mit der anonymen Besuchssitzung
        (siehe Abschnitt 7) verknüpft, damit wir auswerten können, welche Inhalte unserer Website zu Anfragen führen.
        Weitere Informationen:{' '}
        <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase Datenschutz</a>.
      </p>
      <p>
        Zur Benachrichtigung unseres Teams per E-Mail nutzen wir zusätzlich den Dienst <strong>Web3Forms</strong>.
        Die Formulardaten werden über dessen Server an unsere hinterlegte E-Mail-Adresse weitergeleitet.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen Formularübermittlung).
        Weitere Informationen:{' '}
        <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">Web3Forms Datenschutz</a>.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Personenbezogene Daten aus Anfragen speichern wir nur so lange, wie es für die Bearbeitung Ihrer Anfrage
        erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Anschließend werden die Daten gelöscht,
        sofern keine weitergehende Speicherung erforderlich ist. Anonyme Nutzungsdaten (Abschnitt 7) werden nach
        spätestens 14 Monaten automatisch gelöscht.
      </p>

      <h2>7. Reichweitenmessung ohne Cookies</h2>
      <p>
        Um unsere Website zu verbessern, messen wir, wie sie genutzt wird — z.&nbsp;B. welche Abschnitte angesehen,
        welche Schaltflächen geklickt und wie weit gescrollt wird. Dafür setzen wir ein eigenes, datensparsames Verfahren ein:
      </p>
      <ul>
        <li>
          Es werden <strong>keine Cookies</strong> gesetzt und keine Informationen auf Ihrem Endgerät gespeichert oder
          ausgelesen (kein Local Storage, keine Geräte-Fingerprints).
        </li>
        <li>
          Ihre IP-Adresse wird nicht gespeichert. Sie wird zusammen mit der Browserkennung und einem täglich wechselnden
          Zufallswert zu einer anonymen Prüfsumme verrechnet. So können wir Besuche desselben Tages zusammenzählen, eine
          Wiedererkennung über Tage hinweg oder ein Rückschluss auf Ihre Person ist nicht möglich.
        </li>
        <li>
          Gespeichert werden: aufgerufene Seite, Herkunftsseite (ohne Parameter), Kampagnenparameter (utm_*), Gerätetyp,
          Browser, Betriebssystem, Land, Stadt, Bildschirmgröße sowie Interaktionen auf der Seite.
        </li>
      </ul>
      <p>
        Die Daten werden in unserer Datenbank bei Supabase in Frankfurt (EU) gespeichert und ausschließlich von uns
        ausgewertet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Analyse und
        Optimierung unseres Webangebots). Sie können der Verarbeitung jederzeit widersprechen (Art. 21 DSGVO), z.&nbsp;B.
        per E-Mail an die oben genannte Adresse oder indem Sie in Ihrem Browser JavaScript deaktivieren.
      </p>
      <p>
        Wir setzen keine Marketing-Cookies und keine Analyse-Tools von Drittanbietern (z.&nbsp;B. Google Analytics) ein.
      </p>

      <h2>8. Externe Inhalte</h2>
      <p>
        Alle Skripte, Schriftarten und Bilder dieser Website werden von unserem eigenen Server ausgeliefert. Ausnahme
        ist die Übermittlung des Formulars an Web3Forms (siehe Abschnitt 5).
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
        <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
      </p>

      <h2>10. Datenschutzbeauftragter</h2>
      <p>
        Unser Datenschutzbeauftragter ist Steven Do. Sie können unseren Datenschutzbeauftragten wie folgt kontaktieren:
      </p>
      <p>
        SCHWABEO GmbH<br />
        Theodor-Veiel-Str. 1<br />
        70374 Stuttgart<br />
        E-Mail: <a href="mailto:team@schwabeo.de">team@schwabeo.de</a><br />
        Telefon: <a href="tel:+4971140262480">+49 711 40262480</a>
      </p>
      <p>
        Bitte zögern Sie nicht, sich mit unserem Datenschutzbeauftragten in Verbindung zu setzen, wenn Sie Fragen
        oder Bedenken zum Datenschutz haben oder Ihre Rechte in Bezug auf Ihre persönlichen Daten ausüben möchten.
      </p>

      <LegalNav current="datenschutz" />
    </>
  );
}
