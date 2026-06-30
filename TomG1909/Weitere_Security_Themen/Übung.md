Projekt Join (Kanbanboard)

Schritt 1: Hauptkomponenten & Schnittstellen
Hauptkomponenten:

Frontend: HTML, CSS, JavaScript (index.html, addTask.html, backlog.htnl, board.html, data_ptotection.html, design.html, help.html, impressum.html)
Backend: PHP-Skripte (smallest_backend_ever/save_json.php, smallest_backend_ever/nocors.php)
Datenbank: JSON-Datei (smallest_backend_ever/database.json)

Schnittstellen:
Kommunikation mit Backend über HTTP (AJAX/fetch in js/mini_backend.js)
Externe Dienste: Proxy für CORS (https://cors-anywhere.herokuapp.com/), Google Fonts

Schritt 2: Authentifizierung & Autorisierung

Authentifizierung:
Login erfolgt clientseitig in login.js durch Vergleich mit fest hinterlegten Usern.
Keine serverseitige Authentifizierung, keine Passwortrichtlinien, keine Hashes.

Autorisierung:
Keine Rollen oder Zugriffsrechte implementiert.
Nach Login wird einfach auf addTask.html weitergeleitet.

Schritt 3: Datenübertragung & -speicherung

Datenübertragung:
Kommunikation mit Backend erfolgt über HTTP, nicht HTTPS (z.B. http://gruppe-116.developerakademie.net/...).
Keine SSL/TLS-Verschlüsselung vorhanden.

Datenspeicherung:
Sensible Daten (Tasks, User) werden als Klartext in JSON gespeichert (smallest_backend_ever/database.json).
Keine Verschlüsselung, keine sichere Passwortspeicherung.

Schritt 4: Eingabeverarbeitung

Validierung/Bereinigung:
Eingaben werden im Frontend minimal validiert (z.B. minlength in HTML-Formularen).
Keine serverseitige Validierung oder Bereinigung.
Backend nimmt JSON ungeprüft entgegen (save_json.php), potenziell anfällig für Injection und XSS.
Umgang mit ungültigen/bösartigen Eingaben:

Keine explizite Behandlung oder Fehlerausgabe bei ungültigen Daten.

Schritt 5: Error Handling & Logging

Fehlerbehandlung:
Fehlermeldungen im Frontend (z.B. "Page not found" in js/navbar.js), keine technischen Details.
Backend gibt bei Fehlern (z.B. zu große Payload) einfache Fehlermeldung aus.

Logging:
Keine Logging-Funktionalität implementiert.
Keine Speicherung von Zugriffen oder Fehlern, keine sensiblen Daten im Log.

Schritt 6: Externe Dependencies

Bibliotheken/Dienste:
Google Fonts (aktuell, keine bekannten Risiken)
Proxy-Dienst für CORS (potenziell unsicher, da Daten über Drittanbieter laufen)
Keine weiteren externen JS-Bibliotheken

Abschluss & Verbesserungen

Erkenntnisse:

Größte Risiken: Keine serverseitige Authentifizierung/Autorisierung, keine Verschlüsselung, keine Eingabevalidierung im Backend.

Weitere Risiken: Klartext-Speicherung, unsicherer Proxy-Dienst, keine Logging/Monitoring.

Verbesserungen:

- Serverseitige Authentifizierung einführen (Sessions,  Passwort-Hashes).
- HTTPS für alle Datenübertragungen nutzen.
- Eingaben serverseitig validieren und bereinigen.
- Sensible Daten verschlüsselt speichern.
- Logging und Monitoring einführen, ohne sensible Daten zu speichern.
- Proxy-Dienst vermeiden oder absichern.
- Dependencies regelmäßig prüfen und aktualisieren.