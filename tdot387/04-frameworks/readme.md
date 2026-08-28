Übung 1: Auswahl eines Frameworks für eine E-Commerce-App

Framework 1: React

Vorteile
+ Sehr große Community, viele Bibliotheken.
+ Flexible Integration mit Backends (REST, GraphQL, SSR mit Next.js).
+ Hohe Performance dank Virtual DOM und Optimierungen.

Nachteile
- Kein vollständiges Framework, vieles muss zusammengestellt werden.
- Gefahr von Chaos bei großen Projekten ohne klare Architektur.


Framework 2: Vue

Vorteile
+ Einfache Lernkurve, schnelle Entwicklung.
+ Schlank, gute Performance.
+ Offizielles, integriertes Ökosystem (Router, State-Management).

Nachteile
- Weniger verbreitet in Enterprise-Umgebungen.
- Skalierung bei sehr großen Projekten erfordert Disziplin.


Framework 3. Angular

Vorteile
+ Vollständiges Framework mit vielen Features out-of-the-box.
+ Sehr gut skalierbar für große Enterprise-Projekte.
+ Starke Typisierung (TypeScript) und klare Architektur.

Nachteile
- Steile Lernkurve, hoher Einstieg.
- Relativ großes Bundle, höhere Ladezeiten.

Empfehlung:

Für eine E-Commerce-Plattform würde ich React wegen der Entwicklung und Performance sowie dem starken Ökosystem und der flexiblen Integration mit Backends verwenden. Viele bestehende Shops setzen auf React-basierte Lösungen.

Vue ist weniger etabliert im Enterprise-Umfeld und es wäre langfristig wohl schwieriger, große Entwicklerteams oder komplexe Skalierung abzubilden.

Angular ist für eine E-Commerce-App zu schwergewichtig. Die Entwicklungszeit bis zur Produktivität ist im Gegensatz zu den anderen Frameworks länger.

Übung 2 Bewertung eines Übergangs zu TailwindCSS:

Vorschlag: Umstieg von traditionellem CSS auf Tailwind CSS

Aktuell wird klassisches CSS mit einem globalen Stylesheet verwendet.

Probleme:
- Die Benennung der Klassen ist inkonsistent, es kann zu Verwechslungen und Namenskonflikte kommen
- Wenn die Codebasis wächst, könnte es unübersichtlich werden
- Anpassungen dauern länger, weil für jedes Problem eine neue Klasse erstellt werden muss
- potenziell steigende CSS-Größe

Vorteile von Tailwind CSS
- Styles können direkt in die JSX geschrieben werden (weniger Hin- und Hergespringe zwischen den Dateien)
- Klassen werden einheitlich benannt (Namen, Abstände, Farben etc.)
- Responsivität ist einfacher umzusetzen (etwa einheitliche Breakpoints)
- Bundles werden kleiner, weil ungenutzte Utilities beim Build entfernt werden
- UI-Änderungen einfach und schnell durch Klassen zu lösen

Herausforderungen
- Das Team muss sich erst mit Tailwind auseinandersetzen (Klassen haben andere Benennungskonventionen wie zB Bootstrap)
- Migration muss strategisch und Schritt für Schritt geplant und umgesetzt werden
- Theming muss früh abgestimmt werden.
 

Technische Implementierung
- Tailwind ergänzt den Build-Prozess (PostCSS + tailwind.config.js).
- Tailwind muss installiert und implementiert werden (etwa Direktiven setzen).
- Die Build-Time könnte sich erhöhen


Beteiligung des Entwicklerteams
- Kurzvorstellung von Tailwind als Kick-Off-Veranstaltung
- Erfahrungen vom Team mit CSS-Frameworks abfragen und ggf. Alternativen vorschlagen lassen


Return on Investment (ROI) und langfristige Auswirkungen
- Nach der Einarbeitung lässt es sich mit Tailwind viel schneller entwickeln
- Wartungsaufwand wird verringert, etwa durch Namensgebungskonventionen aus Tailwind
- CSS-Datei wird durch gestrichene Klassen beim Build kleiner

Entscheidung und Übergangsplan
Die Empfehlung wäre eine Migration zu Tailwind CSS, da die Vorteile überwiegen und die Umstellungskosten gering sind.

Übergangsplan
- Tailwind installieren + konfigurieren.
- Komponenten nach und nach umstellen, erst mal mit einer bis zwei beginnen
- Wiederverwendbare Klassen (Buttons etc.) einführen
- Über Wochen und Monate weitere Komponenten migrieren und ungenutzte CSS-Regeln entfernen
- Kontinuierliches Testen