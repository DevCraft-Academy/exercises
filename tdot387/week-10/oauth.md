Übung: OAuth

Ich habe mir die Seite reddit.com ausgewählt und mich über Google eingeloggt.

Zum Prozess:

1. Ich klicke auf "Anmelden" und dann auf "Weiter mit Google"
2. Es öffnet sich ein neues Fenster, in dem ich mich mit meinem Google-Account einloggen muss
3. Die Seite fragt mich, ob ich mich einloggen will und zeigt mir an, welche meiner Daten an Reddit übermittelt werden
4. Ich werde auf die Reddit-Seite zurückgeleitet mit einem Auth-Code
5. Reddit sendet den Code an den Server von Google, um den Access Token zu erhalten
6. Reddit verwendet den Token, um mich einzuloggen

Alles in allem ein Standard-Flow, der auf vielen Websites verwendet wird. 
Aus den Requests und Responses ist nicht direkt ersichtlich, welche Technologie verwendet wird.
Nach Recherchen im Internet wird hier der Google Identity Service verwendet, was im Grunde OAuth 2.0 + OpenID Connect ist.

Ich als User kann mich bei Reddit so einloggen, ohne dass Reddit mein Passwort speichert. Zudem sind die Zugriffe auf meine
Daten beschränkt, was von Google so bewerkstelligt wird. Als User wird mir angezeigt, welche Daten verwendet werden.
Ich kann Reddit jederzeit anweisen, meinen Google-Account nicht mehr zu benutzen. 