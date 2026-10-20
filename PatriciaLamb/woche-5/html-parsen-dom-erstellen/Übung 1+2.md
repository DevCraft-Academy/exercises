# Übung 1

## Fehleranalyse

- `Content-Length: 99999` passt nicht zum kurzen Response-Body. Der Wert muss der tatsächlichen Anzahl der übertragenen Bytes entsprechen und wird normalerweise vom Server berechnet.
- `Content-Encoding: gzip` behauptet, dass der Body gzip-komprimiert ist. Der dargestellte Body ist jedoch unkomprimierter Klartext. Daher muss entweder wirklich komprimiert oder der Header entfernt werden.
- `Content-Type: text/plain` ist falsch, da der Body HTML enthält. Richtig ist `text/html; charset=UTF-8`.
- `Expires` liegt vor dem Wert von `Date`. In Verbindung mit `Cache-Control: no-cache, no-store` ist der Header hier außerdem unnötig und kann entfernt werden.
- Beim schließenden `title`-Tag fehlt das `>`.
- `sync` ist kein gültiges Attribut für `script`. `defer` lädt das Script parallel und führt es erst nach dem Parsen des HTML-Dokuments aus.
- Beim öffnenden `h1`-Tag fehlt das `>`.
- Die Attribute des `link`-Elements sind ohne Anführungszeichen teilweise gültig, mit Anführungszeichen aber klarer. `type="text/css"` ist in HTML5 nicht mehr nötig.

## Korrigierte Musterlösung

```http
HTTP/1.1 200 OK
Date: Wed, 16 Aug 2023 12:45:20 GMT
Server: Apache/2.4.41 (Unix)
Content-Length: 294
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Cache-Control: no-cache, no-store

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <title>Testseite</title>
    <script src="blockScript.js" defer></script>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Willkommen!</h1>
    <p>Hier ist ein einfacher Text</p>
  </body>
</html>
```

Der Wert von `Content-Length` gilt für den exakt oben dargestellten Body mit LF-Zeilenumbrüchen. Sobald sich der Body oder seine Kodierung ändert, muss der Server diesen Wert neu berechnen.


# Übung 2

Deine Aufgabe:

Gehe zu https://www.wikipedia.de/.
Öffne die Dev-Tools und navigiere zum Network-Tab.
Aktualisiere die Seite und beobachte, wie die Ressourcen geladen werden.
Analysiere und beantworte folgende Fragen:

Welche Ressource wurde als Erstes geladen? Warum?
In welcher Reihenfolge werden die verschiedenen Ressourcentypen (z.B. Dokument, Stylesheet, Skript, Bild) geladen?
Wie beeinflusst die Position eines Elements im HTML die Ladereihenfolge?
Tipp: Benutze die Filteroptionen im Network-Tab, um bestimmte Ressourcentypen hervorzuheben und dir einen klareren Überblick zu verschaffen.

----
Der Browser lädt zuerst das HTML-Dokument, da dieses die Verweise auf alle weiteren Ressourcen enthält. Beim Parsen von oben nach unten wird anschließend das Stylesheet im <head> entdeckt. Danach werden unter anderem das Logo und die am Ende des <body> eingebundenen JavaScript-Dateien geladen. Viele Ressourcen werden parallel geladen, weshalb ihre Abschlussreihenfolge von Größe, Cache und Netzwerkgeschwindigkeit abweichen kann. Die Position eines Elements bestimmt vor allem, wann der Browser eine Ressource entdeckt und ihren Download starten kann.
