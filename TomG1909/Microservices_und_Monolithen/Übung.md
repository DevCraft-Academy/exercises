1. Bewertung der Projektanforderungen
   Die Social-Media-Plattform benötigt:

- Benutzerprofile → persistent, hohe Datenintegrität.
- Newsfeeds → hohe Zugriffszahlen, dynamische Inhalte.
- Messaging-Funktion → bidirektional, geringe Latenz, Echtzeit.
- Echtzeit-Benachrichtigungen → Event-getrieben, skalierbar.

Anforderungen:

Skalierbarkeit: Wachstum von wenigen tausend auf Millionen von Nutzern.

Performance: Reaktive und niedrige Antwortzeiten.

Zuverlässigkeit: Keine Ausfälle, hohe Verfügbarkeit.

Flexibilität: Möglichkeit, später neue Features zu integrieren.

2. Architekturentscheidung
   Ich würde eine Microservice-Architektur wählen.

Begründung:
Die Anforderungen nach Skalierbarkeit, Echtzeitverarbeitung und Flexibilität für zukünftiges Wachstum passen besser zu Microservices. Unterschiedliche Funktionen (z. B. Messaging vs. Newsfeed) haben sehr verschiedene Anforderungen an Datenkonsistenz, Latenz und Skalierbarkeit. Mit Microservices lassen sich diese Anforderungen gezielt erfüllen, indem jeder Dienst unabhängig optimiert und skaliert wird.

3. Vor- und Nachteile
   Vorteile von Microservices:
   Skalierbarkeit pro Funktion

- Der Newsfeed-Service kann horizontal stark skaliert werden, während das Profilmanagement stabil bleibt.

Technologische Flexibilität

- Für Messaging kann z. B. eine NoSQL-Datenbank mit WebSockets genutzt werden, während Benutzerprofile auf relationaler DB laufen.

Fehlerisolierung

- Ein Ausfall im Benachrichtigungsservice beeinträchtigt nicht die gesamte Plattform.

Nachteile von Microservices:
Komplexität in der Entwicklung und im Betrieb

- Viele Services erfordern Orchestrierung, Monitoring und Deployment-Infrastruktur.

Höherer Kommunikationsaufwand

- Services müssen über APIs interagieren; Netzwerk-Latenz entsteht.

Datenkonsistenz

- Verteilte Datenhaltung erschwert Transaktionen über Services hinweg.

Bezug zu Projektzielen:

Vorteile passen zu Skalierbarkeit und Zuverlässigkeit.

Nachteile erfordern mehr Investitionen in DevOps und Architekturdisziplin.

4. Skalierbarkeitsplan (für Microservices)
   Service-Aufteilung:

- User-Service (Profile, Authentifizierung)
- Feed-Service (Beiträge, Likes, Kommentare)
- Messaging-Service (Chats, Echtzeit-Kommunikation)
- Notification-Service (Push- und In-App-Benachrichtigungen)

Skalierung:
Jeder Baustein wächst nach Bedarf
Wenn plötzlich sehr viele Leute Nachrichten schreiben, kann nur der Messaging-Service aufgestockt werden (mehr Server/Container).
Wenn der Newsfeed stark genutzt wird, kann nur dieser Service extra Ressourcen bekommen.
So wird nur das verstärkt, was wirklich gebraucht wird.

5. Alternative Architekturbetrachtung (Monolith)
   Ein Monolith hätte folgende Vorteile:

- Einfacherer Start, weniger komplexe Infrastruktur.
- Einfachere lokale Entwicklung (eine Codebase, ein Deployment).
- Keine Netzwerk-Latenz zwischen Komponenten.

Warum nicht gewählt?

- Schlechte Skalierbarkeit einzelner Funktionen.
- Risiko, dass Änderungen in einer Komponente unerwartet andere Teile brechen.
- Langfristig schwierig, bei schnellem Wachstum und Feature-Explosion wartbar zu bleiben.

6. Fazit
   Ich habe mich für eine Microservice-Architektur entschieden, da sie die Anforderungen an Skalierbarkeit, Echtzeitfähigkeit und Flexibilität besser erfüllt. Die Nachteile – insbesondere die höhere Komplexität – lassen sich mit soliden DevOps-Praktiken und moderner Cloud-Infrastruktur abfedern.

Reflexion:
In realen Projekten sind Architekturentscheidungen immer ein Abwägen zwischen kurzfristiger Einfachheit und langfristiger Skalierbarkeit. Während ein Monolith für kleine Projekte attraktiv sein kann, bietet Microservices den strategischen Vorteil, komplexe Systeme nachhaltig wachsen zu lassen.
