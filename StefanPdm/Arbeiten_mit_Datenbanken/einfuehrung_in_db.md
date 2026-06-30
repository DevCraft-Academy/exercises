# Lösung

## Entitäten

### User

- Attribute: UserID (Primärschlüssel), Benutzername, Email, Geburtsdatum, Land
- Beziehungen: One-To-Many mit Beitrag (ein User kann mehrere Beiträge haben), Many-To-Many mit User
  (für Freundschaftsanfragen).

### Beitrag

- Attribute: BeitragID (Primärschlüssel), Inhalt, BeitragDatum, Likes
- Beziehungen: Many-To-One mit User (jeder Beitrag gehört einem User), One-to-Many mit Kommentar
  (ein Beitrag kann mehrere Kommentare haben), One-to-Many mit Likes

### Kommentar

- Attribute: KommentarID (Primärschlüssel), Inhalt, KommentarDatum.
- Beziehungen: Many-To-One mit User (jeder Kommentar stammt von einem User), Many-To-One mit Beitrag
  (jeder Kommentar gehört einem Beitrag).

### Freundschaftsanfrage

- Attribute: AnfrageID (Primärschlüssel), AnfrageDatum, Status (Ausstehend, Akzeptiert, Abgelehnt).
- Beziehungen: Many-To-One mit User (Absender), Many-To-One mit User (Empfänger).

## Hauptfunktionen

### Userprofile

- Nutzt die Attribute der User-Entität, um Userprofile mit Namen, Email, Geburtsdatum usw.
  anzuzeigen.

### Freundschaftsanfragen

- Nutzt die Freundschaftsanfrage-Entität, um Freundschaftsanfragen zwischen Usern zu verwalten.

### Beiträge und Kommentare

- Nutzt die Beitrag- und Kommentarentitäten, um Usern das Erstellen von Beiträgen und das Hinzufügen
  von Kommentaren zu ermöglichen
