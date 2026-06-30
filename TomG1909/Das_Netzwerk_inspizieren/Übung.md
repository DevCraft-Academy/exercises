1. Analyse der Netzwerkanfragen
   Beim Laden der Seite im Chrome DevTools Network-Tab sind folgende Anfragetypen und -details zu beobachten:​
   HTML-Dokument: Die Hauptseite (index.html) wird geladen.
   CSS-Dateien: Stylesheets, die das Aussehen der Seite definieren.
   JavaScript-Dateien: Skripte, die interaktive Funktionen ermöglichen.
   Bilder: Mehrere Bilddateien, die in der Galerie angezeigt werden.​
   Die Antwortzeiten und Dateigrößen variieren je nach Ressource. Besonders große Bilddateien beeinflussen die Ladezeit.

2. Erkennung von Bottlenecks
   Durch die Analyse der „Waterfall“-Ansicht im Network-Tab lassen sich folgende Performance-Bottlenecks identifizieren:​
   Große Bilddateien: Einige Bilder haben eine hohe Dateigröße, was zu längeren Ladezeiten führt.
   Nicht optimierte Skripte: JavaScript-Dateien könnten unkomprimiert sein, was die Ladezeit erhöht.
   Fehlendes Caching: Ressourcen ohne geeignete Caching-Strategien werden bei jedem Seitenaufruf neu geladen.

3. Verbesserungsvprschläge
   Bildoptimierung: Verwendung moderner Bildformate wie WebP und Komprimierung der Bilder, um die Dateigröße zu reduzieren.
   Minifizierung von CSS und JavaScript: Entfernung unnötiger Leerzeichen und Kommentare, um die Dateigröße zu verringern.
   Browser-Caching aktivieren: Hinzufügen geeigneter Cache-Control-Header, um das erneute Laden von Ressourcen zu vermeiden.
   Asynchrones Laden von Skripten: Verwendung von async oder defer Attributen, um das Laden von JavaScript-Dateien zu optimieren.
