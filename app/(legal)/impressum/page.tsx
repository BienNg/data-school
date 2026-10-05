import type { Metadata } from 'next';
import { LegalNav } from '../LegalNav';

export const metadata: Metadata = {
  title: 'Impressum — Data School',
  description: 'Impressum und Anbieterkennzeichnung der Data School.',
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return (
    <>
      <h1>Impressum</h1>
      <p className="legal-updated">Stand: Juni 2026</p>

      <p>Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV.</p>

      <h2>Anbieter</h2>
      <p>
        SCHWABEO GmbH<br />
        Theodor-Veiel-Str. 1<br />
        70374 Stuttgart<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href="tel:+4971140262480">+49 711 40262480</a><br />
        E-Mail: <a href="mailto:team@schwabeo.de">team@schwabeo.de</a><br />
        Web: <a href="https://schwabeo.de" target="_blank" rel="noopener noreferrer">https://schwabeo.de</a>
      </p>

      <h2>Vertretungsberechtigte Person</h2>
      <p>Geschäftsführer: Steven Do</p>

      <h2>Registereintrag</h2>
      <p>
        Registergericht: Amtsgericht Stuttgart<br />
        Registernummer: HRB 781284
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
        DE346595799
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Steven Do<br />
        Theodor-Veiel-Str. 1<br />
        70374 Stuttgart
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
      </p>
      <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
        zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
        bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
        einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden
        wir diese Inhalte umgehend entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
        Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
        wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
        zum Zeitpunkt der Verlinkung nicht erkennbar.
      </p>
      <p>
        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
        Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
        umgehend entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>
      <p>
        Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
        beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden
        von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Trotz sorgfältiger Prüfung kann eine Haftung für die Richtigkeit der Angaben in keiner Form übernommen
        werden. Eventuelle Schäden können ebenfalls nicht übernommen werden.
      </p>

      <LegalNav current="impressum" />
    </>
  );
}
