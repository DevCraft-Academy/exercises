Als erstes wird das html Dokument geladen anschließend das Stylesheet und schließlich die js-Dateien.
Zuletzt werden die Bilder geladen.

Die Elemente im HTML werden in der Reihefolge von oben nach unten geladen. Bedeutet auch das beispielsweise Javascript Datei die bereits im head eingebunden sind und nicht explizit mitgeteilt wird im script-tag, dass diese asynchron ausgeführt werden sollen, den Ladevorgang einer Webseite erheblich verzögern können. Da der Parsing-Vorgang beim Laden und ausführen von Javascript-Dateien angehalten wird.
