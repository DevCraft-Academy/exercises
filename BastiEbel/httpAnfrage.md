HTTP GET-Anfrage
Beobachtung:

Bei der GET-Anfrage an http://localhost:8080 hat der Server den Inhalt des Verzeichnisses zurückgegeben, in dem der Server gestartet wurde. Dies ist typisch für GET-Anfragen, die dazu verwendet werden, Daten vom Server abzurufen.
Anwendungsfall:

GET-Anfragen sind sinnvoll, wenn du Daten vom Server abrufen möchtest, ohne den Zustand des Servers zu verändern. Beispiele sind das Abrufen von Webseiten, das Laden von Bildern oder das Abfragen von Daten aus einer API.
HTTP POST-Anfrage
Beobachtung:

Bei der POST-Anfrage an http://localhost:8080 und dem Senden von JSON-Daten wie {"name": "Max", "age": 25} hat der http-server keine spezifische Antwort zurückgegeben, da er nicht darauf ausgelegt ist, POST-Anfragen zu verarbeiten. POST-Anfragen werden normalerweise verwendet, um Daten an den Server zu senden und dort zu speichern oder zu verarbeiten.
Anwendungsfall:

POST-Anfragen sind sinnvoll, wenn du Daten an den Server senden möchtest, um sie zu speichern oder zu verarbeiten. Beispiele sind das Absenden von Formularen, das Hochladen von Dateien oder das Erstellen neuer Ressourcen in einer API.
HTTP PUT-Anfrage
Beobachtung:

Bei der PUT-Anfrage an http://localhost:8080 hat der http-server ebenfalls keine spezifische Antwort zurückgegeben. PUT-Anfragen werden normalerweise verwendet, um eine Ressource auf dem Server zu aktualisieren oder zu erstellen.
Anwendungsfall:

PUT-Anfragen sind sinnvoll, wenn du eine bestehende Ressource auf dem Server aktualisieren oder eine neue Ressource an einem bestimmten Ort erstellen möchtest. Beispiele sind das Aktualisieren von Benutzerdaten oder das Hochladen einer neuen Version einer Datei.
HTTP DELETE-Anfrage
Beobachtung:

Bei der DELETE-Anfrage an http://localhost:8080 hat der http-server keine spezifische Antwort zurückgegeben. DELETE-Anfragen werden normalerweise verwendet, um eine Ressource auf dem Server zu löschen.
Anwendungsfall:

DELETE-Anfragen sind sinnvoll, wenn du eine Ressource auf dem Server löschen möchtest. Beispiele sind das Löschen eines Benutzers, das Entfernen eines Artikels aus einem Warenkorb oder das Löschen einer Datei.
HTTP OPTIONS-Anfrage
Beobachtung:

Bei der OPTIONS-Anfrage an http://localhost:8080 hat der http-server möglicherweise Informationen über die unterstützten HTTP-Methoden zurückgegeben. OPTIONS-Anfragen werden verwendet, um die Kommunikationsoptionen für eine bestimmte Ressource zu ermitteln.
Anwendungsfall:

OPTIONS-Anfragen sind sinnvoll, wenn du herausfinden möchtest, welche HTTP-Methoden und anderen Kommunikationsoptionen für eine bestimmte Ressource auf dem Server verfügbar sind. Dies ist besonders nützlich bei der Arbeit mit APIs, um die verfügbaren Operationen zu ermitteln.
Zusammenfassung
GET: Abrufen von Daten ohne den Zustand des Servers zu verändern. (z.B. Laden einer Webseite)
POST: Senden von Daten an den Server, um sie zu speichern oder zu verarbeiten. (z.B. Absenden eines Formulars)
PUT: Aktualisieren oder Erstellen einer Ressource auf dem Server. (z.B. Aktualisieren von Benutzerdaten)
DELETE: Löschen einer Ressource auf dem Server. (z.B. Löschen eines Benutzers)
OPTIONS: Ermitteln der Kommunikationsoptionen für eine Ressource. (z.B. Verfügbare HTTP-Methoden für eine API)
