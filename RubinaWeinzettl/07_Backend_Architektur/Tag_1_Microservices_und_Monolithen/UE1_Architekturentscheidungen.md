Übungen "Backend-Architektur" - Tag 1
Microservices und Monolithen

Übung 1 - Architekturentscheidungen treffen

Projektanforderungen:

Social Media Plattform bestehend aus:
- Benutzerprofilen
- Newsfeeds
- Messaging-Funktionen
- Echtzeitbenachrichtigungen

Eigenschaften:
- skalierbar
- hochreaktiv
- zuverlässig

Aufgabenstellung: Monolithische oder Microservicearchitekur

Meine Entscheidung: Microservice-Architektur
Begründung:
Nicht umsonst sind die meisten großen Social Media Plattformen als Microservice-Architektur aufgebaut, denn:
- Microservices sind leichter skalierbar
  Social Media Plattformen wachsen sehr stark, sowohl von der Nutzeranzahl als auch von neuen Funktionen her, die eingebaut werden. Die eigenständigen Microservices sind leichter wart- und erweiterbar.
- verteilte Systeme sind leichter hochreaktiv zu gestalten, da: 
    - sie nicht alle auf eine Ressource zugreifen, sondern jedes Microservice seine eigenen Ressourcen (z. B. eigene Datenbank) hat
    - Monolithen können mit wachsender Größe und Datenmenge langsam werden und dem Performance-Anspruch an eine Social-Media-Plattform irgendwann nicht mehr erfüllen
- Mit Microservices lässt sich leichter eine ausfallfreie Umgebung herstellen
  Grundsätzlich könnte man auch Monolithen ausfallfrei gestalten, z. B. durch Clustern oder einen Load Balancer
  Aber wenn bei einem Monolith etwas crasht, crasht das ganze System, während es Microservice Architekturen nur die eine Instanz ist, oder andere, die in der Kommunikation direkt davon abhängen. Andere Teile der Software sind noch benutzbar.
  Außerdem gibt es bei großen Monolithen irgendwann eine Skalierungsgrenze.
- Die einzelnen Funktionalitäten der SoMe Plattform kann gut in Microservices aufgeteilt werden

Skalierbarkeitsplan:
- ich würde die einzelnen Funktionalitäten in einzelne Microservices packen - also einzelne Codeteile, die jeweils auch ihre eigene Datenbank haben bzw. einen eigenen Server oder Container
- ich würde mehrere Server zur Verfügung stellen und einen Load Balancer benutzen, um bei hohen Zugriffszahlen die Last zu verteilen

Alternative Architekturbetrachtung:
- ein Monolith ist schwerer wart- und erweiterbar
- eine Monolith kann die Performance-Ansprüche nicht gewährleisten
- ein Monolith kann die Zuverlässigkeit nicht gewährleisten

Fazit:
Die Herausforderung wird sein, die reibungslose Kommunikation zwischen den Microservices und die Datenkonsistenz zu gewährleisten, da sie ja durch APIs miteinander kommunizieren und jedes MS eine eigene DB hat
Auch ist gute Teamarbeit und regelmäßige Kommunikation zwischen den Entwickler:innen der unterschiedlichen Microservices wichtig.
Wie immer müssen auch sorgfälltige Usertests durchgeführt werden, im Idealfall mit realen Usern.