Szenario: Stelle dir vor, du bist Teil eines Softwareentwicklungsteams, das damit beauftragt ist, eine neue Social-Media-Plattform zu erstellen. Die Projektspezifikationen umfassen die Erstellung von Benutzerprofilen, Newsfeeds, Messaging-Funktionen und Echtzeitbenachrichtigungen. Die Plattform soll skalierbar sein, da sie mehr Nutzer gewinnt, und sie sollte hochreaktiv und zuverlässig sein.

# Bewertung

Hinter einer Social-Media-Plattform steckt in der Regel eine Software, die skalierbar sein muss.
Die Wahrscheinlichkeit, dass tausende Nutzer, wenn nicht sogar Millionen Nutzer gleichzeitg auf der Plattform angemeldet sind
und Anfragen gegen die Api schicken, ist groß. In Kombination dann mit der Projektspezifikation wie der Erstellung von Benutzerprofilen, Newsfeeds, Messaging-Funktionen und Echtzeitbenachrichtigungen
merkt man schnell, dass es sich nicht um eine kleine bis mittelgroße Anwendung handelt, sondern um eine große,
die wahrscheinlich in Zukunft auch neue Funktionen dazu bekommt.

# Entscheidung

Vor dem Hintergrund der Größe bzw. der angenommenen Größe der Anwendung
und deren Anforderungen entscheide ich mich für die Microservice-Architektur.

# Vor- und Nachteile

## Vorteile
Die Microservice-Architektur bietet folgende Vorteil:

1. Die Microservices sind unabhängig voneinander einsetzbar
2. An den Services können jeweils eigenständig Teams/Programmierer arbeiten (Spezialistenteams können die Qualität der jeweiligen Services fördern)
3. Diese Architektur bietet eine größere Flexibilität und Skalierbarkeit und man kann schnell herausfinden, wo z.B. ein sogenannter Bottelneck entsteht.

## Nachteil

1. Komplexität im Betrieb: Durche viel Mikorservices erhöht sich die Anzahl der Deployments
2. Erhöhte Kommunikationskosten: Microservices kommunizieren häufig über das Netzwerk, sodass Latenz und Netzwerkfehler wahrscheinlicher werden.
3. Höherer Entwicklungs- und Wartungsaufwand: Ein verteilter Systemansatz bedeutet oft, dass jedes Team nicht nur an der Anwendungslogik, sondern auch an Infrastrukturthemen wie Containerisierung, Orchestrierung und Monitoring arbeiten muss. Dies erfordert zusätzliche Expertise und Koordination.

# Skalierbarkeitsplan

Ein Mikroservice pro Funktion
Erstellung von Benutzerprofilen, Newsfeeds, Messaging-Funktionen und Echtzeitbenachrichtigungen
Vor jedem Service gibt es eine Lastverteilung, um die jeweiligen Server und Datenbanken nicht zu überlasten.
Sollte Last steigen können wir horizontal und vertikal skalieren je nach Bedarf.

# Alternative Architekturbetrachtung

- Bei einem Monolithen liegen alle Funktionen in einer einzigen Codebasis. Dies kann anfangs zwar einfacher sein (weniger Infrastruktur und DevOps-Aufwand), skaliert aber bei sehr hohen Anforderungen an Echtzeit-Kommunikation und schnelles Feature-Wachstum schlechter.
- Die Komplexität steigt mit der Zeit stark an: Bei neuen Features muss häufig tiefer in den Code eingegriffen werden, wodurch die Abhängigkeiten schwer zu verwalten sind.
- Ein Ausfall in einem Teil (z. B. bei Benachrichtigungen) kann potenziell den gesamten Monolithen in Mitleidenschaft ziehen.

Es gibt Projekte, die mit einer monolithischen Architektur bestens klarkommen – insbesondere, 
wenn die Anforderungen überschaubar bleiben oder sich selten ändern. 
Bei einer schnell wachsenden Social-Media-Plattform sehe ich jedoch das Risiko, 
dass ein Monolith auf lange Sicht zu unflexibel wird und hohe Reaktionszeiten aufweist.