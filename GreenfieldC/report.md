# Anwendung

(kurz und nicht detailliert wegen Sicherheit)
## Schritt 1: Identifizierung der Sicherheitsaspekte
- Es gibt Frontend, Backend, Datenbanken, ElasticSearch
- Api (Java)

## Schritt 2: Überprüfung der Authentifizierung und Autorisierung
- habe keinen Zugriff auf das Backend
- Im Frontend benötigt man Email und Passwort
- Zugriff hängt von jeweiligen Kundeneinstellungen ab, die nach Anmeldung geladen werden
- Jeder Nutzer hat eine Rolle, von der abhängig gemacht wird, was man außerdem sehen kann
- Ohne Rolle und ohne valide Anmeldung ist Nutzung nicht möglich und es werden auch keine Daten geladen.

## Schritt 3: Prüfung der Datenübertragung und -speicherung
- Entwicklung geht über einen VPN-Tunnel
- https ist Standard

## Schritt 4: Analyse der Eingabeverarbeitung
- Eingabe werden bereinigt
- SQL-Injection ist nicht möglich

## Schritt 5: Beurteilung von Error Handling und Logging
- Sowohl in Entwicklung als auch in Produktion werden die wichtigen Sachen erfasst
und sind zentral einsehbar

## Schritt 6: Betrachtung der externen Dependencies
- manche Abhängigkeiten könnten noch aktualisiert werden