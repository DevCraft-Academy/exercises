1.
    - hoher Traffic
    - viele User
    - schnell wachsend

2.
    - Micro Services in horizontaler Ausrichtung
        -> da schnelles skalieren erforderlich ist
        -> schnelle Updates / Patches und Wartung
        -> teilweise sehr hohes Serveraufkommen durch viele Anfragen gleichzeitig
        -> ggf. Zugriffe aus aller Welt, was hohe Geschwindigkeit erfordert


//*** Darstellung durch meine Vorgabe per KI als Mermaid darstellen lassen ***//

```mermaid
flowchart LR
    U[Benutzer / Client] --> G[API Gateway / Load Balancer]

    G --> P[User Profile Service<br/>horizontal skaliert]
    G --> F[Newsfeed Service<br/>horizontal skaliert]
    G --> M[Messaging Service<br/>horizontal skaliert]
    G --> N[Notification Service<br/>horizontal skaliert]

    P --> D1[(Profil-Datenbank)]
    F --> D2[(Feed-Datenbank)]
    M --> D3[(Messaging-Datenbank)]
    N --> D4[(Notification-Datenbank)]

    N --> R[Echtzeit-Events / WebSocket]
    R --> U

3.    Nachteile: Wartung, Koordination und Aufwand sind teils höher
      Vorteile: Skalierbar, bessere Hardwareausnutzung, schnellerer Traffic

4.  Je nach Auslastung können jeweils Server erweitert oder zugeschaltet werden, 
    durch den Load-Balancer wäre weiterhin eine saubere Auslastung gewährleistet

5.  Monotlithische Architektur wäre zwar Anfangs reizvoll, gerade bei Social Media und deren 
    Größe, würde dies langfristig zu kompliziertem Code führen. Dazu wäre der Serverausbau kompliziert.

6.  Fazit: MircoServices wäre der modernere Ansatz und heutzutage beste Wahl. Die Software Entwicklung
    könnte Personel wachsen je nach Bedarf und gleichzeitig Problemlos arbeiten. Das einarbeiten 
    neuer Mitarbeiter im Team sollte auch unkomplizierter werden, erforderlich wäre nur die gute 
    Koordination.