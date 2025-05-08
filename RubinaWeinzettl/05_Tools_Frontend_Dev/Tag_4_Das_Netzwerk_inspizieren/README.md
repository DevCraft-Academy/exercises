Übungen "Tools für Frontend Development" - Tag 4
Das Netzwerk inspizieren

Übung
Optimiere unsere Beispielseite

Verbesserungsvorschläge:
- Das JS simuliert nur wie ein übergroßes JS File Ladezeiten verlängern kann. Eigentlich braucht man für eine Bildergallerie gar kein JS mehr - das geht auch nur mit CSS. Daher habe ich das JS auskommentiert (oder würde es im Normalfall entfernen)
- Image1 (478kb) und Image2(433kb) könnten noch um die Hälfte kleiner sein. Außerdem verwendet man normalerweise kleine Thumbnails für eine Gallerie, damit man eine schnell geladene Übersicht hat und dann kann man in eine größere Ansicht reinklicken.
- Das favicon wird von einer externen Ressource geladen und bekommt 403 - Access forbidden zurück. Damit das Abrufen eines Bildes über eine externe Ressource funktioniert, bräuchte man einen CORS Header
- Es werden im HTML CSS Klassen angeben, die im Stylesheet nicht exisitieren. Die habe ich teilweise entfernt, für die Gallerie habe ich im CSS eine hinzugefügt