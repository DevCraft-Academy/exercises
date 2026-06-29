# Aufgabe:

Gehe zu https://www.wikipedia.de/.
Öffne die Dev-Tools und navigiere zum Network-Tab.
Aktualisiere die Seite und beobachte, wie die Ressourcen geladen werden.
Analysiere und beantworte folgende Fragen:

Welche Ressource wurde als Erstes geladen? Warum?
In welcher Reihenfolge werden die verschiedenen Ressourcentypen (z.B. Dokument, Stylesheet, Skript, Bild) geladen?
Wie beeinflusst die Position eines Elements im HTML die Ladereihenfolge?

# Lösung

1. Zuerst geladen wurde das HTML Dokument
2. styles.css
3. wikipedia logo
4. Javascript files

Die Position hat großen Einfluss auf den Parser, besonders wenn CSS zu spät geladen wird, kann ein shifting entstehen oder wenn Javascript zu früh geladen wird, stopt der parser was nicht wirklich effizient wäre.
