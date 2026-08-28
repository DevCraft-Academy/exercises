Übung 1:
Meine Version des Headers:
HTTP/1.1 200 OK
Date: Wed, 16 Aug 2023 12:45:20 GMT
Server: Apache/2.4.41 (Unix)
Content-Length: 250 (auf jeden Fall deutlich niedriger)
Content-Encoding: gzip
Content-Type: text/html; charset=UTF-8
Connection: close
Cache-Control: no-cache, no-store

<!DOCTYPE html>
<html>
  <head>
    <title>Testseite</title>
    <script src="blockScript.js"></script>
    <link rel=“stylesheet“ href="styles.css">
  </head>
  <body>
    <h1 Willkommen!</h1>
    <p>Hier ist ein einfacher Text</p>
  </body>
</html>

 
 Übung 2:

 
Als erstes wird die HTML-Datei geladen. Im Response-Tab für die HTML-Datei kann man sehr schön sehen, dass hier ungestyltes HTML ankommt. Die HTML-Datei als „Knochengerüst“ wird als erstes geladen, weil diese – im Gegensatz zu den anderen geladenen Ressourcen – unbedingt gebraucht wird. Eine Website wäre auch ohne CSS und Javascript lauffähig, allerdings wäre sie nicht besonders hübsch oder funktional.

Im Anschluss folgt die CSS-Datei, die der Website ein vernünftiges Aussehen verpasst.

Anschließend werden die Javascript-Dateien geladen. In diesem Fall zuerst die jQuery-Datei, dann der Cookies und weitere funktionale js-Skripte.

Zuletzt werden die Bilder geladen.

HTML liest ein Dokument von oben nach unten.

Wenn ein Script vor dem Laden des DOMs geladen wird, kann es dazu kommen, dass der Website einige Funktionen nicht zur Verfügung stehen (JS kann zB nicht auf eine ID zugreifen, wenn diese erst nach dem Laden der JS gesetzt wird). Die Position des Scripts ist also entscheidend, wenn keine Attribute wie „defer“ oder „async“ verwendet werden.

Styles werden in der Regel im Header geladen, wenn kritische Styles fehlen, blockiert die Website den Render-Prozess (First Paint).

Bilder werden geladen, sobald der Parser auf ein <img> stößt, brauchen dann aber aufgrund ihrer Größe länger als HTML- und CSS-Dateien.

Wenn kein lazy-loading dazwischenfunkt, dann werden die Body-Elemente Zeile für Zeile geladen.

 