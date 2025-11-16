# Architekturentscheidung für eine Social-Media-Plattform

## 1. Projektbewertung

Die Plattform soll Benutzerprofile, Newsfeeds, Nachrichten und Echtzeitbenachrichtigungen bieten.  
Wichtige Anforderungen sind hohe **Skalierbarkeit**, **Zuverlässigkeit**, **Reaktionsgeschwindigkeit** und **Erweiterbarkeit**.  
Da viele Nutzer und Echtzeitinteraktionen erwartet werden, muss das System flexibel mit wachsender Last umgehen können.

---

## 2. Architekturentscheidung

**Gewählte Architektur:** Microservice-Architektur  

**Begründung:**  
Die Funktionen lassen sich klar in getrennte Bereiche aufteilen (z. B. Benutzer, Feed, Nachrichten, Benachrichtigungen).  
Eine Microservice-Struktur ermöglicht es, diese unabhängig voneinander zu entwickeln, bereitzustellen und zu skalieren.  
So kann das System effizient wachsen und auf unterschiedliche Nutzungsintensitäten reagieren.

---

## 3. Vor- und Nachteile

### Vorteile

1. **Unabhängige Skalierbarkeit** – Jeder Dienst kann je nach Auslastung separat erweitert werden.  
2. **Bessere Wartbarkeit** – Änderungen in einem Bereich beeinträchtigen andere nicht.  
3. **Fehlerisolation** – Störungen in einem Dienst führen nicht zum Gesamtausfall.

### Nachteile

1. **Höhere Komplexität** – Mehr Dienste erfordern aufwändigere Koordination.  
2. **Datenkonsistenz** – Verteilte Daten müssen sorgfältig synchronisiert werden.  
3. **Aufwändige Überwachung** – Betrieb und Fehlersuche sind anspruchsvoller.

---

## 4. Skalierbarkeitsplan

Jede Hauptfunktion wird als eigenständiger Dienst umgesetzt:

- **Benutzerverwaltung:** Profile, Anmeldung, Berechtigungen
- **Feed:** Beiträge und personalisierte Inhalte  
- **Nachrichten:** Chats und Echtzeitkommunikation  
- **Benachrichtigungen:** Push- und In-App-Mitteilungen  

Dienste werden unabhängig voneinander bereitgestellt, gewartet und nach Bedarf skaliert.  
Steigt die Nutzung, kann gezielt der betroffene Dienst erweitert werden.

---

## 5. Alternative Architektur: Monolith

Ein monolithischer Aufbau wäre einfacher zu starten, aber langfristig weniger flexibel.  
Skalierung und Wartung werden mit wachsender Komplexität schwieriger, da alle Funktionen eng gekoppelt sind.  
Ein modularer Monolith könnte als Übergangslösung dienen, sollte jedoch später in einzelne Dienste aufgeteilt werden.

---

## 6. Fazit

Die **Microservice-Architektur** ist für dieses Projekt am besten geeignet.  
Sie unterstützt Wachstum, ermöglicht schnelle Weiterentwicklung und sorgt für Stabilität bei steigender Nutzerzahl.  

**Reflexion:**  
Architekturentscheidungen sind immer ein Kompromiss zwischen Einfachheit und Zukunftsfähigkeit.  
Microservices erfordern mehr Aufwand im Betrieb, bieten aber langfristig klare Vorteile für Skalierbarkeit und Flexibilität.
Monolith wäre einfacher und schneller zu erstellen.

**Alternative:**
Monolith erstellen , Microservice später um Nutzlast(en) zu reduzieren
=> Monolith first, Services later
