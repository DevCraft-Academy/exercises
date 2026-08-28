1. Schlüsselentitäten
   Für eine Basisversion einer Social-Media-Plattform könnten wir folgende Entitäten anlegen:

Nutzer
Beitrag
Kommentar
Freundschaftsanfrage
Gefällt mir / Reaktion
Nachricht
Benachrichtigung

2. Attribute & Beziehungen (mit ausgeschriebenen Bezeichnungen)

Nutzer

Attribute:

NutzerID
Nutzername
E-Mail
Passwort (verschlüsselt)
ProfilbildURL
Geburtsdatum
Registrierungsdatum

Beziehungen:

one-to-many zu Beitrag (ein Nutzer kann viele Beiträge erstellen)
one-to-many zu Kommentar (ein Nutzer kann viele Kommentare schreiben)
many-to-many zu Nutzer (Freundschaften) über eine Verknüpfungstabelle
one-to-many zu Nachricht (als Sender oder Empfänger)

Beitrag

Attribute:

BeitragID
NutzerID
Inhalt (Text/Bild/Video)
Erstellungsdatum
Sichtbarkeit (öffentlich, Freunde, privat)

Beziehungen:

many-to-one zu Nutzer (Autor)
one-to-many zu Kommentar
one-to-many zu Gefällt mir / Reaktion

Kommentar

Attribute:

KommentarID
BeitragID
NutzerID
Text
Erstellungsdatum

Beziehungen:

many-to-one zu Beitrag
many-to-one zu Nutzer (Autor)

Freundschaftsanfrage

Attribute:

AnfrageID
AbsenderID
EmpfängerID
Status (offen, akzeptiert, abgelehnt)
Datum

Beziehungen:

many-to-one zu Nutzer (Absender)
many-to-one zu Nutzer (Empfänger)

Gefällt mir / Reaktion

Attribute:

ReaktionID
BeitragID
NutzerID
Typ (Like, Love, Haha, etc.)
Datum

Beziehungen:

many-to-one zu Beitrag
many-to-one zu Nutzer

Nachricht

Attribute:

NachrichtID
SenderID
EmpfängerID
Text
Datum

Beziehungen:

many-to-one zu Nutzer (Sender)
many-to-one zu Nutzer (Empfänger)
