Bericht über die Analyse des OAuth-Flows

Web-Anwendung 1: Google Drive

Identifizierter OAuth-Flow: Authorization Code Flow
Begründung: Während des Anmeldevorgangs wurde ich zu einer Google-Anmeldeseite umgeleitet, wo ich meine Anmeldedaten eingegeben habe. 
Nach erfolgreicher Authentifizierung erhielt die Anwendung einen Autorisierungscode, der dann gegen ein Access-Token eingetauscht wurde.
Diskussion: Der Authorization Code Flow ist für Google Drive angemessen, da er eine hohe Sicherheit bietet, 
indem er die Anmeldedaten des Benutzers nicht direkt an die Anwendung weitergibt. Dies verbessert die Benutzererfahrung, da Benutzer sich sicher fühlen können.
Web-Anwendung 2: Spotify

Identifizierter OAuth-Flow: Implicit Flow
Begründung: Bei der Anmeldung über Facebook wurde das Access-Token direkt in der URL zurückgegeben, ohne dass ein Autorisierungscode verwendet wurde.
Diskussion: Der Implicit Flow ist für Spotify geeignet, da die Anwendung eine schnelle Anmeldung ermöglicht. 
Allerdings könnte dies ein Sicherheitsrisiko darstellen, da das Access-Token in der URL sichtbar ist.
