Übungen "Von URL zu Pixel: Wie ein Browser funktioniert" - Tag 2
Effektive Auswahl von Techniklösungen

Übung 1 - HTTP-Methoden im Einsatz

1. GET auf http://localhost:8080
   - Headers: liefert Werte zurück für
      - access-ranges
      - Content-Type
      - etag
      - last-modifies
      - cache-control
      - Date (Zeitpunkt des http-Requests)
      - Connection
      - Keep-Alive
      - Transfer-Encoding
   - Body: liefert im Body das HTMl der Index-Seite zurück
       - im HEAD stehen wie gewohnt das Encoding, Viewport, usw.
       - CSS ist als Style Type angegeben
       - im Body Tag stehen Namen und andere Informationen zu meinen Ordnern (Name, Verlinkung, Datum der letzten )
   - Cookies: leer
   - sinnvoll bei: wenn ich Parameter in einer URL mitgeben will oder Informationen am Server abrufen will, ohne an Daten etwas zu verändern z. B. beim Aufruf einer Webseite oder um Informationen an eine API zu schicken
2. POST auf http://localhost:8080 mit JSON Objekt {"name": "Max", "age": 25}
   - Headers: liefert Werte zurück für
      - accept-ranges
      - Date
      - Connection
      - Keep-Alive
      - Content-Length (die folglich den Wert 0 hat)
   - Status: 405 Method not allowed
   - Body: leer
   - Cookies: leer
   - sinnvoll bei: wenn ich Daten an einen Server schicken will, um etwas zu verändern, z. B: Formular-Daten, Benutzerregistrierung, API-Anfragen, die neue Ressourcen anlegen
3. PUT auf http://localhost:8080 mit JSON Objekt {"name": "Max", "age": 25}
   gleich wie POST
   - sinnvoll bei: wenn ich Daten an einen Server schicken will, um etwas zu ersetzen, z. B: Änderungen an einem Benutzerprofil; eine API-Anfrage, die in im Backend eine Funktion für einen Änderung in der DB antriggern soll
4. DELETE auf http://localhost:8080 mit JSON Objekt {"name": "Max", "age": 25}
   gleich wie POST
   - sinnvoll bei: wenn ich Daten auf einem Server löschen will, z. B. die ID für einen Eintrag in der DB, der eine Funktion im Backend antriggert, um eine ROW aus einer Datenbank zu löschen, z. B. Löschung von Produkt
5. OPTIONS auf http://localhost:8080
   gleich wie POST
6. OPTIONS auf https://orf.at/
   - Status: 204 NO Content
   - Headers:
      - Date
      - Server
      - Vary
      - Access-Control-Allow-Headers
      - Access-Control-Allow-Methods: DELETE
        das ist die Antwort, nach der ich eigentlich gesucht habe
7. OPTIONS auf orf.at/
      - Status: 200 OK
      - viele verschiedene Headers (18)
      - Body liefert HTML der Startseite zurück
   
   OPTIONS ist sinnvoll bei: wenn ich herausfinden will, welche HTTP Methoden für eine bestimmte Ressource am Server verfügbar ist, z. B. wenn ich wissen will, welche Methoden auf einer bestimmten URL erlaubt sind   
    
