# Aufgabe

Sobald du mit dem Performance-Profiler vertraut bist, starte mit folgender Übung:

Öffne eine beliebige Webseite in einem Browser.
Öffne die Entwicklertools und navigiere zum Tab „Performance“.
Klicke auf das Aufnahme-Symbol und lade die Webseite erneut.
Stoppe die Aufnahme nachdem die Webseite geladen wurde und analysiere die Resultate.

Fragen zur Analyse:
Wie viele Reflows siehst du im Timeline-Panel?
Wie oft wird gemalt (Paint)?
Gibt es Bereiche im Timeline-Panel, die besonders lange dauern oder „hoch” sind? Was könnten diese Spitzen verursachen?

# Lösung

Testseite google.com

- layout im Perfomance Tab (Reflow) ist 30 mal zu finden - somit wird 30mal neu berechnet.
- Paint: Etwa 25-30 mal, da nach jedem Layout ein Paint folgt.
- Spitzen: Ja, besonders hohe Bereiche bei der JavaScript-Ausführung und beim Rendering. Diese Spitzen werden durch das Laden und Ausführen von Skripten, das Parsen von HTML/CSS und Netzwerkanfragen verursacht.
