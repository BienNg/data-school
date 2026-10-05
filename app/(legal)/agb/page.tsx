import type { Metadata } from 'next';
import { LegalNav } from '../LegalNav';

export const metadata: Metadata = {
  title: 'AGB — Data School',
  description: 'Allgemeine Geschäftsbedingungen der Data School für Weiterbildung und Beratung.',
  alternates: { canonical: '/agb' },
};

export default function AgbPage() {
  return (
    <>
      <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
      <p className="legal-updated">Stand: Juni 2026</p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        (1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der SCHWABEO GmbH („Anbieter“)
        und Teilnehmenden bzw. Auftraggebern über Weiterbildungs-, Schulungs- und Beratungsleistungen der Data School.
      </p>
      <p>
        (2) Abweichende Bedingungen des Kunden werden nur Vertragsbestandteil, wenn der Anbieter diesen ausdrücklich
        schriftlich zustimmt.
      </p>

      <h2>§ 2 Leistungsbeschreibung</h2>
      <p>
        (1) Der Umfang der Leistungen ergibt sich aus der jeweiligen Kursbeschreibung, dem individuellen
        Weiterbildungsvertrag bzw. der schriftlichen Vereinbarung mit dem Teilnehmenden.
      </p>
      <p>
        (2) Der Anbieter behält sich vor, Inhalte, Dozenten oder Termine aus wichtigem Grund anzupassen,
        sofern der Bildungszweck nicht wesentlich beeinträchtigt wird.
      </p>

      <h2>§ 3 Beratungsgespräch und Vertragsschluss</h2>
      <p>
        (1) Die Anfrage eines kostenlosen Beratungsgesprächs über die Website ist unverbindlich und begründet
        keinen Schulungsvertrag. Ein Vertragsschluss über diese Website findet nicht statt.
      </p>
      <p>
        (2) Ein Vertrag kommt erst nach persönlicher oder telefonischer Beratung durch schriftliche Bestätigung
        (z.&nbsp;B. per E-Mail) oder Unterzeichnung eines Weiterbildungsvertrags zustande.
      </p>

      <h2>§ 4 Teilnahmevoraussetzungen</h2>
      <p>
        (1) Die Teilnahme setzt die in der Kursbeschreibung genannten Voraussetzungen voraus (z.&nbsp;B. Sprachkenntnisse,
        technische Ausstattung, ggf. Förderzusage).
      </p>
      <p>
        (2) Der Teilnehmende verpflichtet sich, wahrheitsgemäße Angaben zu machen, insbesondere im Rahmen
        von Förderanträgen.
      </p>

      <h2>§ 5 Förderung und Zahlungsbedingungen</h2>
      <p>
        (1) Sofern die Weiterbildung über einen Bildungsgutschein, das Jobcenter, den Arbeitgeber oder
        das Qualifizierungschancengesetz gefördert wird, gelten ergänzend die jeweiligen Förderrichtlinien
        und Vertragsbedingungen der Kostenträger.
      </p>
      <p>
        (2) Bei Selbstzahler-Leistungen gelten die im Angebot genannten Preise. Zahlungsmodalitäten werden
        individuell vereinbart.
      </p>

      <h2>§ 6 Widerrufsrecht</h2>
      <p>
        (1) Über diese Website werden keine Weiterbildungsverträge abgeschlossen. Gesetzliche Widerrufsrechte
        richten sich daher nach Art und Ort des tatsächlichen Vertragsschlusses (z.&nbsp;B. nach persönlicher
        Beratung oder bei Unterzeichnung des Weiterbildungsvertrags).
      </p>
      <p>
        (2) Sofern ein gesetzliches Widerrufsrecht besteht, kann der Verbraucher uns (SCHWABEO GmbH,
        Theodor-Veiel-Str. 1, 70374 Stuttgart, E-Mail: <a href="mailto:team@schwabeo.de">team@schwabeo.de</a>)
        mittels einer eindeutigen Erklärung informieren.
      </p>

      <h2>§ 7 Stornierung und Rücktritt</h2>
      <p>
        (1) Sofern die Weiterbildung über einen Bildungsgutschein, das Jobcenter, den Arbeitgeber oder
        das Qualifizierungschancengesetz gefördert wird, gelten die Stornierungs- und Rücktrittsregeln
        des jeweiligen Kostenträgers.
      </p>
      <p>
        (2) Bei Selbstzahler-Leistungen gelten — sofern im individuellen Vertrag nicht abweichend vereinbart —
        folgende Stornofristen bezogen auf den vereinbarten Beginn der Weiterbildung:
      </p>
      <ul>
        <li>Stornierung bis 4 Wochen (28 Tage) vor Beginn: kostenfrei</li>
        <li>Stornierung zwischen 4 und 2 Wochen (28 bis 14 Tage) vor Beginn: 50&nbsp;% der vereinbarten Gebühr</li>
        <li>Stornierung weniger als 2 Wochen (14 Tage) vor Beginn oder Nichterscheinen: 100&nbsp;% der vereinbarten Gebühr</li>
      </ul>
      <p>
        (3) Stornierungen bedürfen der Textform (z.&nbsp;B. E-Mail an
        <a href="mailto:team@schwabeo.de">team@schwabeo.de</a>). Maßgeblich ist der Zugang der Stornierung
        beim Anbieter.
      </p>
      <p>
        (4) Der Teilnehmende kann den Platz durch einen Ersatzteilnehmer stellen lassen, sofern dieser die
        Teilnahmevoraussetzungen erfüllt und der Anbieter vor Beginn der Weiterbildung informiert wird.
        In diesem Fall entfällt eine Stornogebühr.
      </p>
      <p>
        (5) Bei höherer Gewalt oder schwerer Erkrankung des Teilnehmenden kann der Anbieter nach billigem
        Ermessen von den Stornogebühren absehen; ein Nachweis ist vorzulegen.
      </p>

      <h2>§ 8 Mitwirkungspflichten des Teilnehmenden</h2>
      <p>
        Der Teilnehmende ist verpflichtet, aktiv an der Weiterbildung teilzunehmen, gestellte Aufgaben
        eigenständig zu bearbeiten und dem Anbieter Änderungen mitzuteilen, die die Durchführung beeinträchtigen
        könnten (z.&nbsp;B. Förderstatus, Erreichbarkeit).
      </p>

      <h2>§ 9 Urheberrecht und Nutzungsrechte</h2>
      <p>
        Alle Kursmaterialien, Videos, Texte und sonstigen Inhalte sind urheberrechtlich geschützt. Eine
        Weitergabe, Vervielfältigung oder öffentliche Zugänglichmachung ohne vorherige schriftliche Zustimmung
        des Anbieters ist untersagt.
      </p>

      <h2>§ 10 Haftung</h2>
      <p>
        (1) Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei Schäden aus
        der Verletzung des Lebens, des Körpers oder der Gesundheit.
      </p>
      <p>
        (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten
        (Kardinalpflichten), begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
      </p>
      <p>
        (3) Eine Haftung für den Erfolg einer Weiterbildung (z.&nbsp;B. Jobvermittlung oder bestimmte Prüfungsergebnisse)
        wird nicht übernommen, sofern nicht ausdrücklich schriftlich vereinbart.
      </p>

      <h2>§ 11 Datenschutz</h2>
      <p>
        Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>§ 12 Schlussbestimmungen</h2>
      <p>
        (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
      </p>
      <p>
        (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
        Sondervermögen, ist Gerichtsstand Stuttgart — sofern gesetzlich zulässig.
      </p>
      <p>
        (3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>

      <LegalNav current="agb" />
    </>
  );
}
