# Instaffo

## Authorization Code Flow
1. Seite aufrufen (https://app.instaffo.com/signin)
2. Weiter mit LinkedInd-Button
3. Umleitung auf: Bitte darum Emailadresse, Profilbild etc verwenden zu dürfen
4. Nach Genehmigung Weiterleitung in die Anwendung.

Die Wahl des Authorization Code Flows für die beschriebene Anwendung (Login über LinkedIn bei instaffo.com) erscheint grundsätzlich angemessen, sowohl aus sicherheitstechnischer Sicht als auch im Hinblick auf die Benutzererfahrung. Im Folgenden eine strukturierte Bewertung

# Vorteile aus Sicherheitssicht:

- Tokens werden nicht im Frontend offengelegt – Der Access Token wird vom Backend über einen Server-zu-Server-Request ausgetauscht.

- Vertraulichkeit durch Client Secret – Nur das Backend kennt das Client Secret, wodurch Missbrauch durch Dritte schwerer wird.

- PKCE-Unterstützung erhöht PKCE (Proof Key for Code Exchange) die Sicherheit zusätzlich.