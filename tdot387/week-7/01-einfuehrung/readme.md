User:

Attribute:
Primär: User-ID
Weitere: Vorname, Nachname, E-Mailadresse, Beziehungsstatus, Geburtstag, Geschlecht

Beziehungen: One-to-Many für Beiträge und Likes, Many-to-Many für Freundschaftsanfragen


Beitrag:

Attribute:
Primär: Beitrag-ID
Weitere: Datum und Inhalt

Beziehungen: Many-to-One mit User (User kann mehrere Beiträge haben), One-to-Many (ein Beitrag, mehrere Kommentare)
 

Kommentar:

Attribute:
Primär: Kommentar-ID
Weitere: Inhalt, Datum

Beziehungen: Many-to-One mit User (User kann mehrere Kommentare haben), Many-to-One mit Beitrag (jeder Kommentar gehört zu einem Beitrag).


Freundschaftsanfrage:

Attribute:
Primär: Anfrage-ID
Weitere: Datum, Status

Beziehungen: Many-to-One mit Absender, Many-to-One mit Empfänger


Hauptfunktionen:

Userprofile: User-ID wird verwendet, um Vorname, Nachname, E-Mailadresse, Beziehungsstatus, Geburtstag, Geschlecht anzuzeigen
Freundschaftsanfragen: Anfrage-ID wird verwendet (Anfragen zwischen Usern).
Beiträge und Kommentare: Kommentar- bzw. Beitrag-ID wird verwendet, damit User Beiträge bzw. Kommentare schreiben können.