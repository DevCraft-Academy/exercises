Übungen "Von URL zu Pixel: Wie ein Browser funktioniert" - Tag 3
HTML parsen und DOM erstellen

Übung 2 - Ladereihenfolge einer Webseite

Fragen und Antworten:
1. Welche Ressource wurde als Erstes geladen? Warum?
    - Weil in der Regel zuerst das HTML gerenderd und das DOM aufgebaut wird
    - Das einzige was diesen Vorgang blockieren könnte wäre eine eingebundene JS Datei am Anfang des Dokuments (ohne type async).
    In diesem Fall stehen die script type Tags aber am Ende des Dokumentes, also werden die js Dateien erst ausgeführt, wenn das HTML Dokument fertig gerendert ist.
2. In welcher Reihenfolge werden die verschiedenen Ressourcentypen (z.B. Dokument, Stylesheet, Skript, Bild) geladen?
    1. HTML
    2. Stylesheet
    3. Bilddatei (Logo) 
    4. JS
    5. PHP GET Request (ping)
    6. favicon (Bild)
3. Wie beeinflusst die Position eines Elements im HTML die Ladereihenfolge?
   - Zuerst wird immer HTML geladen
   - Dann die stylesheets, damit die Darstellung richtig ist
   - bei JS-Dateien spielt die Reihenfolge eine Rolle. Werden sie am Anfang hinzufügt, unterbrechten sie das parsen des DOM und werden zuerst ausgeführt, weil es sein kann, dass das DOM durch JS verändert werden soll. Fügt man sie am Schluss hinzu, die js Dateien erst ausgeführt, wenn das HTML Dokument fertig gerendert ist.   
    
