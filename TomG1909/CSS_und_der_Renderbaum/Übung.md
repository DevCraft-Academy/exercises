Beispielseite: de.wikipedia.org
Recording case: Reload der Webseite

1. Es sind insgesamt 8 Reflows im Time-Panel erkennbar.
2. Es wird 3-mal gemalt: 1. First Paint (FP), 2. First Contentful Paint (FCP) 3. Last Paint (LP).
3. Beim Laden bestimmter JS-Dateien sowie während des Parsens des HTML-Dokuments in dem Moment als ein js-Datei geladen wird und ebenfalls ein CSS-Datei sind Spitzen zu beobachten. Dies ist wahrscheinlich darauf zurückzuführen, dass während des Ladens und Ausführens der JS-Datei der Rendering-Prozess unterbrochen wird, ebenfalls ist an dieser Stelle zu beobachten, dass parallel zur JS-Datei eine weitere CSS-Datei geladen wird.
