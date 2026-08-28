Ich verwende hier mein Kanban-Board ("Join"), an dem ich bei meiner Umschulung bei der Developer Akademie gearbeitet habe

Schritt 1:  Identifizierung der Sicherheitsaspekte
Hauptkomponenten: 

Frontend: HTML, CSS, JavaScript (side_bar.html, login.html)
Backend: PHP-Skript, das von der DA zur Verfügung gestellt wurde
Datenbank: JSON-Datei

Schnittstellen: 
Mit dem Backend wird über AJAX kommuniziert

Schritt 2: Überprüfung der Authentifizierung und Autorisierung
Login erfolgt clientseitig. Username und Passwort wird mit JSON im Backend verglichen.
Keine serverseitige Authentifizierung, keine Passwortrichtlinien, keine Hashes.

Autorisierung:
Es wurden keine Rollen oder ähnliches zugewiesen. Nach Login wird auf side_bar.html weitergeleitet, jeder User hat gleiche Rechte.

Schritt 3: Prüfung der Datenübertragung und -speicherung
Die Daten werden unverschlüsselt über HTTP übertragen, keine SSL/TLS-Verschlüsselung
Gespeichert werden die Daten unverschlüsselt direkt im JSON.

Schritt 4: Analyse der Eingabeverarbeitung

Validierung/Bereinigung:
Keine Validierung im Frontend
Keine Validierung oder Bereinigung vom Server.
Backend nimmt JSON ungeprüft entgegen (save_json.php), anfällig für Injection und XSS.
Ungültige Daten können durchaus eingegeben werden.

Schritt 5: Beurteilung von Error Handling und Logging
Findet so gut wie nicht statt, bei Errors gibt es keine Hinweise auf mögliche Lösungen
Logging: Nicht implementiert

Schritt 6: Betrachtung der externen Dependencies
Wurden nicht implementiert

Abschluss und Dokumentation:
Risiken: Keine Authentifizierung serverseitig, keine Verschlüsselung, keine Validierung, kein Logging, Passwörter werden im Klartext gespeichert

Verbesserungen:

Serverseitige Authentifizierung einführen
HTTPS und SSL/TLS zur Datenübertragung verwenden
Eingaben validieren und bereinigen (FE + BE)
Passwörter verschlüsselt speichern
Logging und Monitoring einführen
