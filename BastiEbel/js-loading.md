Optimierte Lösung
Um die Ladeprobleme zu beheben und die beste User Experience zu bieten, können wir die Skripte wie folgt anpassen:

Verwende das defer-Attribut für Skripte, die auf das DOM zugreifen müssen.
Platziere Skripte, die keine DOM-Interaktionen benötigen, im <head>-Bereich mit dem async-Attribut.
Platziere Inline-Skripte am Ende des <body>-Tags, um sicherzustellen, dass das DOM vollständig geladen ist.

Erklärung:
script1.js und script2.js: Diese Skripte werden mit dem defer-Attribut geladen, sodass sie erst nach dem vollständigen Parsen des HTML-Dokuments ausgeführt werden. Dies stellt sicher, dass das DOM vollständig verfügbar ist, wenn die Skripte ausgeführt werden.
Inline-Skript: Das Inline-Skript wird am Ende des <body>-Tags platziert, um sicherzustellen, dass das DOM vollständig geladen ist, bevor es ausgeführt wird.
Experimentieren mit async und defer:
async: Wenn Sie das async-Attribut verwenden, wird das Skript asynchron geladen und sofort nach dem Herunterladen ausgeführt. Dies kann nützlich sein für Skripte, die keine DOM-Interaktionen benötigen.
defer: Das defer-Attribut stellt sicher, dass das Skript erst nach dem vollständigen Parsen des HTML-Dokuments ausgeführt wird, was ideal für Skripte ist, die auf das DOM zugreifen müssen.
Zusammenfassung:
Verwenden Sie defer für Skripte, die auf das DOM zugreifen müssen.
Verwenden Sie async für Skripte, die keine DOM-Interaktionen benötigen.
Platzieren Sie Inline-Skripte am Ende des <body>-Tags, um sicherzustellen, dass das DOM vollständig geladen ist.
