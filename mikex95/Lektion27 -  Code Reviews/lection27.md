# Aufgabe

Führe eine Codereview für den folgenden Code durch https://codepen.io/DevCraft/pen/WNLXxyO

# Lösung:

- Es wäre gut wenn wir auf die Semantik achten - nutze ein form tag für die input-felder und die relevanten header, main & footer elemente, sowie submit button.
- Auto focus auf Input feld nach absenden
- Event-Delegation: Anstatt jedem Delete-Button einen separaten Event-Listener hinzuzufügen, verwende Event-Delegation auf der UL. Dies ist effizienter und vermeidet Speicherlecks.
- Man könnte noch einen Test dazu schreiben.
- Performance: Bei vielen Tasks könnte das erneute Rendern der Liste ineffizient werden – erwäge Virtual Scrolling für große Listen.
