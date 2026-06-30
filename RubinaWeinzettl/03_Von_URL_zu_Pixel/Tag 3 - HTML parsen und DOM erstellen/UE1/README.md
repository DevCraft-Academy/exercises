Übungen "Von URL zu Pixel: Wie ein Browser funktioniert" - Tag 3
HTML parsen und DOM erstellen

Übung 1 - HTML-Dokument vom Server

Korrigierte Version des Headers:

HTTP/1.1 200 OK
Date: Wed, 16 Aug 2023 12:45:20 GMT
Server: Apache/2.4.41 (Unix)
Content-Length: 1                     // Content Length 99999 scheint es nicht zu geben; ich habe 1 für Chrome oder WebView gewählt
Content-Encoding: gzip
Content-Type: text/plain; charset=UTF-8
Connection: keep-alive
Cache-Control: no-cache, no-store
Expires: Wed, 16 Aug 2023 15:00:00 GMT   // Das Ablaufdatum der Response kann nicht vor dem Zeitpunkt des Aufrufes stehen

<!DOCTYPE html>
<html>
  <head>
    <title>Testseite</title> <!-- Klammer zu fehlte beim title schließen Tag -->
    <script src="blockScript.js" sync></script>
    <link rel="stylesheet" type="text/css" href="styles.css"> <!-- "" fehlte bei rel und type -->
  </head>
  <body>
    <h1> Willkommen!</h1> <!-- Klammer zu fehlte beim h1 Tag -->
    <p>Hier ist ein einfacher Text</p>
  </body>
</html>
    
