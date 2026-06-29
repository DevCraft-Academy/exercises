# Delegation und Aufgabenmanagement — meine Variante (einfach geschrieben)

## Überblick

Ich habe das Projekt in fünf einfache Aufgaben geteilt, so dass jede:r im Team klare Ziele hat:

1. Startseite designen
2. Produktseiten bauen
3. Warenkorb-Funktion programmieren
4. Nutzer-Anmeldung einrichten
5. Seite für Handy und PC anpassen (responsive)

## Wer macht was

- Amir: Design der Startseite
- Kim: Produktseiten (Frontend)
- Luca: Warenkorb & Server-Logik
- Robin: Login/Authentifizierung & Sicherheit
- Kai: Responsive Layouts

## Kurzbeschreibungen der Aufgaben

### Startseite (Amir)

Aufgabe: Mach eine übersichtliche und ansprechende Startseite, damit Besucher schnell finden, was sie suchen.

Ergebnis: Ein oder zwei einfache Entwürfe (Wireframes), mit Hauptbereich, Navigation und Platz für Aktionen.

Ressourcen: Logo, Farbvorlagen und Beispiele von ähnlichen Shops.

Hinweis: Denk von Anfang an ans Handy‑Layout.

### Produktseiten (Kim)

Aufgabe: Baue Seiten für einzelne Produkte mit Bildern, Beschreibung und Kauf‑Button.

Ergebnis: Funktionierende Produktseiten, die Daten aus der Produkt‑API zeigen.

Ressourcen: API‑Dokumentation, Beispiel‑Daten.

Hinweis: Achte auf gleiche Bildgrößen und klare Texte.

### Warenkorb (Luca)

Aufgabe: Programmiere den Warenkorb (hinzufügen, entfernen, menge ändern, preis berechnen).

Ergebnis: Ein dynamischer Warenkorb, der Änderungen sofort zeigt und mit dem Server sprechen kann.

Ressourcen: API‑Spezifikation für Warenkorb und Bestellungen.

Hinweis: Pass auf gleichzeitige Änderungen auf (race conditions) und zeig verständliche Fehlermeldungen.

### Anmeldung / Auth (Robin)

Aufgabe: Richte Registrierung, Login und Sitzungsverwaltung ein.

Ergebnis: Sicheres Login‑System (z. B. mit JWT oder Sessions) und Passwort‑Reset.

Ressourcen: Auth‑Library Doku, Sicherheitsguides.

Hinweis: Passwörter immer verschlüsselt speichern (bcrypt o.ä.) und Eingaben prüfen.

### Responsive / Mobil (Kai)

Aufgabe: Sorge dafür, dass alles auf Handy, Tablet und Desktop gut aussieht und funktioniert.

Ergebnis: Mobile‑first CSS, Breakpoints und Tests auf ein paar Standard‑Geräten.

Ressourcen: Styleguide und Browser DevTools.

Hinweis: Achte auch auf Ladezeiten und Bildoptimierung.

## Kommunikation und Arbeitsweise

Ich würde GitHub Issues für Tasks und PRs für Code‑Reviews nutzen. Für schnelle Fragen Slack, und bei größeren Themen ein kurzes Zoom‑Meeting.

Rhythmus: kurzes tägliches Standup (10 min), wöchentlicher Check, PR‑Reviews innerhalb von 48 Stunden.

### Warum so verteilt?

Ich habe die Aufgaben nach Stärken verteilt, damit jeder das macht, worin er gut ist. Gleichzeitig sind kleine Lernaufgaben drin, damit alle etwas von anderen lernen.

Probleme die auftreten können: meistens die Abstimmung zwischen Frontend und Server (API). Lösung: früh Schnittstellen festlegen und kleine Integrations‑Tests machen.

Kurzfazit: Klare Aufgaben, einfache Akzeptanzkriterien und schnelle Feedbackrunden helfen, das Projekt sauber und schnell umzusetzen.
