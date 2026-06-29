# Aufgabe

## Optimiere unsere Beispielseite

In dieser Übung wirst du dein neu erworbenes Wissen über den Network-Tab in den Chrome DevTools nutzen, um die Netzwerkleistung unserer Beispielseite zu verbessern. Die Seite, mit der wir arbeiten, enthält absichtlich Performance-Bottlenecks, damit du praktische Erfahrung in der Optimierung sammeln kannst.

# Lösung:

Wir könnten Caching-Headers zur Serverkonfiguration für CSS- und JavaScript-Dateien hinzufügen um nicht ständig images/styles neu laden zu müssen.
Wir könnten die CSS- und JavaScript-Dateien minimieren mit einem building tool/framework wie z.B. Vite oder evtl andere packages.
Wir könnten Bild-Tags mit dem Attribut loading="lazy" für das Lazy Loading versehen.
Wir könnten Bilder mit diversen npm Tools komprimieren.
