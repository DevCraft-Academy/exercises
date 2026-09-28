Übung mit APIs

1. Log-Outputs
    - **Combined** ist zwar detailliert, aber unübersichtlich in der Console.
    - **Common** ist kompakter, aber für die Ursachenanalyse zu knapp.
    - **dev** ist gut lesbar aber ggf. gibt es auch dort zu wenige Infos.

2. Wie hat die Hinzufügung von Middleware deine API beeinflusst? 
    - Logging hilft beim Debuggen
    - Unautorisierte Requests werden geblockt

3. Wie könntest du die Header-Prüfungs-Middleware verbessern oder erweitern?
    - Secret-Handling: Key aus der env-Variable laden und nicht hardcoden
    - Manche Pfade von der Prüfung ausnehmen
    - Requests nur über HTTPS zulassen

4. Was könntest du noch mit Middleware in deiner API machen?
    - Sicherheit verbessern (etwa mit CORS)
    - Kompression und Performance verbessern
    - I18n

