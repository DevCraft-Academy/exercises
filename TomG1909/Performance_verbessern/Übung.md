Original version
https://codepen.io/DevCraft/pen/NWVbNMb

Verbesserte Version
https://codepen.io/TomG1909/pen/oggdgKB

Schritte zur Verbesserung:

1. Lazy Loading mit IntersectionObserver:
   Nur sichtbare Elemente werden geladen.
   Reduziert initiale DOM-Belastung und Ladezeit.

2. Chunkweise Listengenerierung (50 Einträge pro Ladung):
   Verhindert lange Blockierung des Haupt-Threads.
   Verwendung eines dynamischen Scroll-Ankers (<li id="scrollAnchor">):
   Steuert das Nachladen präzise durch Sichtbarkeit im Viewport.

3. Beobachtung des Viewports statt eines Scrollcontainers:
   Kein zusätzliches CSS oder Container nötig.

4. Optimierte Event-Steuerung:
   observer.unobserve() verhindert mehrfaches Auslösen.
