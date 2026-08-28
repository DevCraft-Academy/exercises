Übung:

HTML: lädt schnell, jedoch könnte man einen Caching-Header mitgeben, um die Dateien für wenige Tage oder Wochen zu cachen (aktuell: Cache-Control: no-cache)

CSS: Die Server-Response ist mit 2s relativ hoch. Vielleicht könnte man hier über ein CDN nachdenken oder die Website allgemein "näher" hosten lassen (ich weiß nicht, wo der AWS-EU-Central-Server steht). Zudem würde sich auch eine Cache-Control anbieten.

image1: Hat die längste Ladezeit und ist mit 487kB deutlich zu groß, inbesondere für mobile Ansichten. Lösung: verkleinern und src-set für Responsiveness verwenden.

image2: Ebenfalls eine große Datei (433kB), gleiche Lösung wie bei image1. Da das Bild erst nach Scrollen sichtbar ist, wäre hier Lazy-Loading nicht schlecht. 

image3: Etwas kleiner als die anderen beiden Bilder (292kB), aber immer noch zu groß. Lösung wie image1 und image2. Da das Bild erst nach Scrollen sichtbar ist, wäre hier Lazy-Loading nicht schlecht.

script: Ladezeit wird auch hier vom Server verlängert, evtl. wie beim CSS auf näheren Server umziehen. 

fact-API: Wird in Zeile 6 im Script ausgeführt und somit evtl. zu früh (könnte Laden des restlichen Skripts verhindern). Evtl eine async-Funktion draus machen.

CSS- und Script-Dateien könnten zudem noch komprimiert werden.