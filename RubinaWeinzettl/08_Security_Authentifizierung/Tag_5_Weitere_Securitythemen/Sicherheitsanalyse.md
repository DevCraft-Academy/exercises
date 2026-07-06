Übungen "Security und Authentifizierung" - Tag 5
Weitere Securitythemen

Übung  - Sicherheitsanalyse einer Web-Applikation

1. Sicherheitsaspekte
Frontend: HTML - Bootstrap - jQuery
Backend: PHP - MySQL
Schnittstellen: LDAP
Betrieb: auf dem internen Server des Unternehmens
Sicherheitsanforderungen: niedrig

2. Authentifizierung / Autorisierung
Authentifizierung: Login, 2-Faktor-Authentifizierung, keine Passwortrichtlinien
Rollenmanagement: Roll Based Access Control

3. Datenübbertragung und Speicherung
Protokoll: HTTPS
Speicherung: Passwörter werden als Hash gespeichert

4. Analyse der Eingabeverarbeitung
- Eingabevalidierung im Frontend und Backend bei Formularen, v. a. bei E-Mailadressen durch jQueryValidator im Frontend und Regex im Frontend und Backend
- es werden nicht alle Eingaben bereinigt. Es ist davon auszugehen, dass so etwas bei einer internen Applikation nicht vorkommt

5. Error Handling
Bibliotheken: alle verwendeten Libraries wie z. B. Fullcalendar, PHP Word, JQuery, JQueryValidator, Bootstrap und diverse Composer basierte Libraries sind alle in die Applikation direkt eingebunden
Sie sind aufgrund der Größe und des Entwicklungsaufwandes bei einem Update des monolithischen Systems nicht immer aktuell, stellen aber auch keine Sicherheitsrisiken dar, da alles intern läuft und direkt eingebunden ist

Abschluss und Dokumentation:
würde man diese Anwendung ins Netz stellen wollen, wären vorab einige Sicherheitsanpassungen notwendig, z. B.: 
 - bei der Bereinigung der Eingaben
 - Aktualität der Systemkomponenten und Libraries
 - der Authentifizierung (Passwortrichtlinien, Hashing durch Salting erweitern)







