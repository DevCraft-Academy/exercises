# Konzept einer Blog-Plattform mit dem MVC-Pattern

## Model

- **Artikel**
  - Attribute: `id`, `titel`, `inhalt`, `autorId`, `erstelltAm`, `bearbeitetAm`
- **Kommentar**
  - Attribute: `id`, `artikelId`, `autorId`, `inhalt`, `erstelltAm`
- **User**
  - Attribute: `id`, `benutzername`, `email`, `passwortHash`, `rolle` (z.B. admin, autor, leser)
- **Beziehungen**
  - Ein User kann mehrere Artikel und Kommentare verfassen.
  - Ein Artikel gehört zu genau einem User (Autor) und kann mehrere Kommentare haben.
  - Ein Kommentar gehört zu genau einem Artikel und einem User.

## View

- **Artikel lesen**
  - Übersichtsliste mit Artikeltiteln, Teaser, Autor, Datum.
  - Detailansicht mit vollständigem Artikel, Autor, Datum, Kommentarliste.
- **Artikel schreiben/bearbeiten**
  - Formular für Titel und Inhalt.
  - Buttons für Speichern, Abbrechen.
- **Kommentare**
  - Anzeige unter dem Artikel: Kommentartext, Autor, Datum.
  - Formular für neue Kommentare (nur für eingeloggte User).

## Controller

- **Artikel-Controller**
  - Logik zum Erstellen, Bearbeiten, Löschen und Anzeigen von Artikeln.
  - Validierung der Eingaben.
  - Zugriffsbeschränkung: Nur eingeloggte User dürfen Artikel erstellen/bearbeiten.
- **Kommentar-Controller**
  - Logik zum Hinzufügen und Anzeigen von Kommentaren.
  - Validierung der Eingaben.
  - Nur eingeloggte User dürfen kommentieren.
- **User-Controller**
  - Registrierung, Login, Logout.
  - Authentifizierung und Autorisierung.
- **Routing**
  - Verarbeitet Anfragen (z.B. Artikel anzeigen, Kommentar hinzufügen) und ruft die passenden Methoden auf.

## Zusammenspiel

- User interagiert mit der View (z.B. Artikel schreiben).
- Die View sendet Daten an den Controller.
- Der Controller verarbeitet die Daten, prüft Berechtigungen und speichert sie im Model.
- Das Model gibt die Daten zurück, die View zeigt sie an.
- Kommentare und Artikel werden dynamisch geladen und aktualisiert.
