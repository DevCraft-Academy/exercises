Schritt 1: Identifizierung der Sicherheitsaspekte

Hauptkomponenten der Applikation:
Frontend: HTML, CSS, JavaScript (z.B. React, Angular)
Backend: Server-Logik (z.B. Node.js, Python, Java)
Datenbanken: SQL (z.B. MySQL, PostgreSQL) oder NoSQL (z.B. MongoDB)

Schnittstellen:
API-Schnittstellen: RESTful APIs, GraphQL
Drittanbieter-Integrationen: Zahlungsanbieter, Authentifizierungsdienste (z.B. OAuth)


Schritt 2: Überprüfung der Authentifizierung und Autorisierung

Authentifizierung:
Login-Mechanismen: Überprüfe, ob die Applikation eine sichere Authentifizierungsmethode verwendet (z.B. Multi-Faktor-Authentifizierung).
Passwortrichtlinien: Stelle sicher, dass starke Passwortrichtlinien implementiert sind (z.B. Mindestlänge, Komplexität).

Autorisierung:
Zugriffsrechte: Analysiere, ob die Benutzerrollen klar definiert sind und ob die Zugriffsrechte korrekt implementiert sind.
Rollenmanagement: Überprüfe, ob Benutzerrollen dynamisch verwaltet werden können und ob es eine Möglichkeit gibt, Berechtigungen zu überprüfen.


Schritt 3: Prüfung der Datenübertragung und -speicherung
Datenübertragung:
Verschlüsselung: Stelle sicher, dass alle Datenübertragungen über HTTPS erfolgen und dass SSL/TLS korrekt konfiguriert sind.

Datenlagerung:
Verschlüsselung: Überprüfe, ob sensible Daten (z.B. Passwörter, Kreditkarteninformationen) verschlüsselt gespeichert werden.
Passwortspeicherung: Stelle sicher, dass Passwörter mit sicheren Hash-Algorithmen (z.B. bcrypt, Argon2) gespeichert werden.


Schritt 4: Analyse der Eingabeverarbeitung

Eingabeverarbeitung:
Validierung und Bereinigung: Überprüfe, ob alle Benutzereingaben validiert und bereinigt werden, um SQL-Injection und Cross-Site Scripting (XSS) zu verhindern.
Umgang mit ungültigen Eingaben: Analysiere, wie die Applikation auf ungültige oder bösartige Eingaben reagiert (z.B. Fehlermeldungen, Blockierung).


Schritt 5: Beurteilung von Error Handling und Logging

Error Handling:
Fehlermeldungen: Stelle sicher, dass Fehlermeldungen keine sensiblen Informationen oder technischen Details preisgeben.
Informationsleckage: Überprüfe, ob die Applikation potenzielle Informationsleckagen durch Fehlermeldungen oder Debugging-Informationen hat.

Logging:
Zugriffslogs: Überprüfe, ob Zugriffslogs erstellt werden und ob sie sensible Daten (z.B. Passwörter, Kreditkarteninformationen) enthalten.
Fehlerlogs: Stelle sicher, dass Fehlerlogs keine sensiblen Informationen enthalten.


Schritt 6: Betrachtung der externen Dependencies

Externe Bibliotheken und Dienste:
Identifizierung: Liste alle externen Bibliotheken und Dienste auf, die in der Applikation verwendet werden.
Sicherheitsrisiken: Überprüfe, ob diese Bibliotheken aktuell sind und ob bekannte Sicherheitsanfälligkeiten bestehen (z.B. durch CVE-Datenbanken).
