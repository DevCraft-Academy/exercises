1. Model
Datenstrukturen

User

id: Eindeutige User-ID
username: Anzeigename
email: E-Mail-Adresse
passwordHash: Passwort (verschlüsselt)
createdAt: Registrierungsdatum
role: z.B. "user", "admin"

Artikel

id: Eindeutige Artikel-ID
title: Titel des Artikels
content: Inhalt (Text/HTML)
authorId: Verweis auf User
createdAt: Erstellungsdatum
updatedAt: Letzte Änderung
tags: Liste von Schlagwörtern

Kommentar

id: Eindeutige Kommentar-ID
articleId: Verweis auf Artikel
authorId: Verweis auf User
content: Kommentartext
createdAt: Erstellungsdatum
Beziehungen
Ein User kann mehrere Artikel und Kommentare verfassen.
Ein Artikel gehört zu einem User (Autor) und hat viele Kommentare.
Ein Kommentar gehört zu einem Artikel und einem User (Autor).

2. View

Artikel lesen

Überschrift, Autor, Veröffentlichungsdatum, Inhalt, Tags
Kommentare unter dem Artikel, sortiert nach Datum
Button/Feld zum Hinzufügen eines neuen Kommentars (wenn eingeloggt)
Artikel schreiben/bearbeiten
Formular mit Feldern: Titel, Inhalt, Tags
Buttons: Speichern, Abbrechen
Intuitive Oberfläche, z.B. Markdown-Editor oder WYSIWYG

Kommentare
Kommentartext, Autor, Datum
Eingabefeld für neuen Kommentar
(Optional: Antworten auf Kommentare, Editieren/Löschen für eigene Kommentare)

Navigation
Liste aller Artikel (z.B. Startseite)
Suchfeld und Filter (z.B. nach Tags, Autoren)
Login/Logout/Register-Bereich

3. Controller

Artikel-Logik

Erstellen: Nimmt Formulardaten entgegen, prüft Authentifizierung, speichert neuen Artikel im Model.
Bearbeiten/Löschen: Prüft, ob User berechtigt ist (Autor/Admin), aktualisiert/löscht Artikel.
Anzeigen: Holt Artikel und zugehörige Kommentare aus dem Model, gibt sie an die View weiter.
Suchen/Filtern: Verarbeitet Suchanfragen, gibt gefilterte Artikellisten an die View.

Kommentar-Logik
Erstellen: Nimmt Kommentartext entgegen, prüft Authentifizierung, speichert Kommentar im Model.
Anzeigen: Holt alle Kommentare zu einem Artikel, gibt sie an die View.

User-Logik
Registrierung/Login: Nimmt Userdaten entgegen, prüft/erstellt User im Model, verwaltet Session.
Authentifizierung: Prüft, ob User eingeloggt ist (z.B. für das Schreiben von Artikeln/Kommentaren).
Autorisierung: Prüft, ob User bestimmte Aktionen ausführen darf (z.B. Artikel bearbeiten/löschen).
