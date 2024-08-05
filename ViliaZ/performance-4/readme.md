
## Verlangsame und optimiere deine Website

Willkommen zur Übung „Absichtlich verlangsamen und optimieren“! Dein Ziel ist es, absichtlich Leistungsengpässe in eine schnelle Website einzubauen und dann Google Lighthouse zu verwenden, um diese Probleme zu identifizieren und zu optimieren.


**1. Starte mit einer schnellen Website:**  Wenn du möchtest, kannst du dieses minimale Beispiel verwenden:


**3. Führe Performance-Probleme ein:**  Verlangsame deine schnelle Website absichtlich, indem du Performance-Probleme einführst. Modifiziere die Vorlage, um absichtliche Verzögerungen in der JavaScript-Ausführung einzubauen, verwende große und unkomprimierte Bilder oder füge andere Elemente hinzu, die zu langsamerer Performance beitragen.


**4. Analysiere mit Lighthouse:**  Führe Google Lighthouse auf deiner absichtlich verlangsamten Website aus. Öffne Chrome DevTools, gehe zum Tab „Audits“ und starte eine neue Überprüfung. Alternativ kannst du die  [Kommandozeilenschnittstelle](https://github.com/GoogleChrome/lighthouse)  von Lighthouse verwenden.


## Meine Erkenntnisse
Out of the box erreicht die Website bei Lighthouse in allen Kategorien 96-100% (bis auf SEO). 

Ich habe folgende Performance-Probleme eingeführt: 
- großes image als Hintergrund für den body, größe des bildes 1 mb
- JS Script im Body hinzugefügt, so dass es das rendern verzögert weil es blockierend ist

Hier ein Vergleich der Lighthous Metriken von before (schnell) / after (verlangsamt)

First Contentful Paint
0.2 s / 0.2 s

Largest Contentful Paint
0.3 s / 0.3 s

Total Blocking Time
0 ms / 1,950 ms

Speed Index
0.2 s / 2.4 s