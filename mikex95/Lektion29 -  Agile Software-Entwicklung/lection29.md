# Aufgabe

Du bist Product Owner einer beliebten E-Commerce-Plattform namens „ShopSmart”. ShopSmart hat in letzter Zeit einen erheblichen Zuwachs an Nutzer:innen verzeichnet, und die Datenbank der Plattform kämpft mit der steigenden Last. Nutzer:innen berichten von langsamen Ladezeiten und das System fällt gelegentlich in Stoßzeiten aus. Daher wächst sowohl von Userseite als auch vom Geschäft der Druck, die Systemleistung und Zuverlässigkeit zu verbessern.

# Herausforderung

Das Entwicklungsteam hat zwei mögliche Lösungen identifiziert, um das Skalierungsproblem der Datenbank anzugehen:

Vertikale Skalierung (Hardware-Upgrades): Das bedeutet, in Hochleistungsserver zu investieren, CPU, RAM und Speicherkapazität zu erhöhen, um die wachsenden Daten und den Traffic zu bewältigen. Dies ist zwar eine relativ schnelle Lösung, kann aber teuer sein und es gibt eine Grenze, wie weit man vertikal skalieren kann.

Horizontale Skalierung (Datenbank-Sharding): Bei diesem Ansatz wird die Datenbank in kleinere, handhabbare Teile (Shards) aufgeteilt und über mehrere Server verteilt. Langfristig könnte dies eine kosteneffizientere und skalierbarere Lösung bieten, erfordert aber einen erheblichen Entwicklungsaufwand und könnte mehrere Monate in Anspruch nehmen.

# Lösung:

Als Product Owner von ShopSmart muss ich eine Entscheidung treffen, die sowohl die kurzfristigen Bedürfnisse der Nutzer als auch die langfristige Nachhaltigkeit des Geschäfts berücksichtigt. Basierend auf den Prinzipien der agilen Software-Entwicklung

## Kurzfristige Maßnahme: Vertikale Skalierung

- **Begründung**: Die vertikale Skalierung bietet eine schnelle Lösung, um die aktuellen Leistungsprobleme zu beheben. Langsame Ladezeiten und Ausfälle in Stoßzeiten gefährden die Kundenzufriedenheit und den Umsatz. Eine sofortige Hardware-Aufrüstung kann die Systemstabilität wiederherstellen, ohne dass monatelange Entwicklungsarbeit erforderlich ist.
- **Vorteile**: Schnelle Implementierung (Wochen statt Monate), direkte Verbesserung der User Experience.
- **Risiken**: Höhere Kosten, begrenzte Skalierbarkeit. Dies ist jedoch akzeptabel als Übergangslösung.

## Langfristige Strategie: Horizontale Skalierung (Datenbank-Sharding)

- **Begründung**: Für nachhaltiges Wachstum ist horizontale Skalierung unerlässlich. Mit dem erwarteten weiteren Nutzerzuwachs wird vertikale Skalierung allein nicht ausreichen. Sharding ermöglicht unbegrenzte Skalierbarkeit und Kosteneffizienz.
- **Implementierung**: Parallel zur vertikalen Skalierung beginnt das Team mit der Planung und Entwicklung des Shardings. Dies wird in iterativen Sprints durchgeführt, um Risiken zu minimieren und Feedback frühzeitig einzubeziehen.
- **Vorteile**: Langfristige Kosteneinsparungen, bessere Zuverlässigkeit bei hoher Last.

## Agile Umsetzung

- **User Stories definieren**:
  - Als Nutzer möchte ich schnelle Ladezeiten, damit ich effizient einkaufen kann.
  - Als Geschäft möchte ich skalierbare Infrastruktur, um Umsatzverluste durch Ausfälle zu vermeiden.
- **Priorisierung**: Zuerst die vertikale Skalierung als MVP für sofortige Erleichterung, dann Sharding als nächstes Feature.
- **Team-Zusammenarbeit**: Regelmäßige Retrospektiven, um den Fortschritt zu überwachen und Anpassungen vorzunehmen.
- **Metriken**: Monitoring von Ladezeiten, Ausfallraten und Kosten, um den Erfolg zu messen.
