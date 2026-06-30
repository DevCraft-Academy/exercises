1. Schlüsselentitäten

Nutzer
Beitrag
Kommentar
Freundschaftsanfrage
Gruppe
Nachricht


2. Attribute und Beziehungen

1. Nutzer
Attribute:
NutzerID (primary key)
Nutzername
E-Mail
Passwort (verschlüsselt)
Profilbild
Erstellungsdatum
Beziehungen:
One-To-Many zu Beitrag (ein Nutzer kann viele Beiträge erstellen)
One-To-Many zu Kommentar (ein Nutzer kann viele Kommentare schreiben)
Many-To-Many zu Nutzer (Freundschaften)
One-To-Many zu Freundschaftsanfrage (ein Nutzer kann viele Freundschaftsanfragen senden/empfangen)

2. Beitrag
Attribute:
BeitragID (primary key)
Inhalt
Erstellungsdatum
NutzerID (foreign key)
Beziehungen:
One-To-Many zu Kommentar (ein Beitrag kann viele Kommentare haben)
Many-To-One zu Nutzer (ein Beitrag gehört zu einem Nutzer)

3. Kommentar
Attribute:
KommentarID (primary key)
Inhalt
Erstellungsdatum
BeitragID (foreign key)
NutzerID (foreign key)
Beziehungen:
Many-To-One zu Beitrag (ein Kommentar gehört zu einem Beitrag)
Many-To-One zu Nutzer (ein Kommentar wird von einem Nutzer verfasst)

4. Freundschaftsanfrage
Attribute:
AnfrageID (primary key)
AbsenderID (foreign key)
EmpfängerID (foreign key)
Status (z.B. "ausstehend", "angenommen", "abgelehnt")
Erstellungsdatum
Beziehungen:
Many-To-One zu Nutzer (eine Anfrage wird von einem Nutzer gesendet und an einen anderen Nutzer gesendet)

5. Gruppe
Attribute:
GruppenID (primary key)
Gruppenname
Beschreibung
Erstellungsdatum
NutzerID (foreign key, der den Gruppenadministrator angibt)
Beziehungen:
Many-To-Many zu Nutzer (Nutzer können Mitglieder von Gruppen sein)

6. Nachricht
Attribute:
NachrichtID (primary key)
Inhalt
Erstellungsdatum
AbsenderID (foreign key)
EmpfängerID (foreign key)
Beziehungen:
Many-To-One zu Nutzer (eine Nachricht wird von einem Nutzer gesendet und an einen anderen Nutzer gesendet)


3. Struktur veranschaulichen
Hier ist eine textliche Repräsentation der Datenbankstruktur:

Nutzer
- NutzerID (PK)
- Nutzername
- E-Mail
- Passwort
- Profilbild
- Erstellungsdatum

Beitrag
- BeitragID (PK)
- Inhalt
- Erstellungsdatum
- NutzerID (FK)

Kommentar
- KommentarID (PK)
- Inhalt
- Erstellungsdatum
- BeitragID (FK)
- NutzerID (FK)

Freundschaftsanfrage
- AnfrageID (PK)
- AbsenderID (FK)
- EmpfängerID (FK)
- Status
- Erstellungsdatum

Gruppe
- GruppenID (PK)
- Gruppenname
- Beschreibung
- Erstellungsdatum
- NutzerID (FK)

Nachricht
- NachrichtID (PK)
- Inhalt
- Erstellungsdatum
- AbsenderID (FK)
- EmpfängerID (FK)


4. Hauptfunktionen beschreiben

1. Nutzerprofile
Entitäten: Nutzer
Beziehungen: Nutzer kann Beiträge und Kommentare erstellen, Freundschaftsanfragen senden/empfangen.

2. Freundschaftsanfragen
Entitäten: Nutzer, Freundschaftsanfrage
Beziehungen: Nutzer sendet und empfängt Freundschaftsanfragen.

3. Beiträge
Entitäten: Nutzer, Beitrag, Kommentar
Beziehungen: Nutzer erstellt Beiträge, andere Nutzer können Kommentare zu diesen Beiträgen schreiben.

4. Gruppen
Entitäten: Nutzer, Gruppe
Beziehungen: Nutzer können Gruppen erstellen und Mitglied werden.

5. Nachrichten
Entitäten: Nutzer, Nachricht
Beziehungen: Nutzer können private Nachrichten an andere Nutzer senden.
