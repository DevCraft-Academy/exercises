# Aufgabe

Reflektion:
Schreibe in eigenen Worten auf, was du bei den verschiedenen Anfragen beobachtet hast.

Welche HTTP-Methode wäre in welchem Anwendungsfall sinnvoll?

# Lösung

Bei den verschiedenen Anfragen habe ich beobachtet, dass die HTTP-Methoden je nach Zweck der Anfrage variieren.

- **GET**: Diese Methode wird verwendet, um Daten von einem Server abzurufen. Sie ist sinnvoll für das Laden von Webseiten, Bildern oder anderen Ressourcen, bei denen keine Änderungen auf dem Server vorgenommen werden sollen. Zum Beispiel beim Aufrufen einer Nachrichtenseite oder eines Blogs. Das hat bei http-server auch einen response zurückgegeben.

- **POST**: Mit POST werden Daten an den Server gesendet, um neue Ressourcen zu erstellen. Diese Methode ist sinnvoll für Formulare, z.B. beim Absenden eines Kontaktformulars, beim Erstellen eines neuen Benutzerkontos oder beim Hochladen von Dateien. Der Server verarbeitet die Daten und gibt eine Antwort zurück.

- **PUT**: PUT wird verwendet, um eine bestehende Ressource auf dem Server zu aktualisieren oder komplett zu ersetzen. Das ist nützlich, wenn man z.B. ein Benutzerprofil aktualisieren oder eine Datei ersetzen möchte.

- **DELETE**: Diese Methode löscht eine Ressource auf dem Server. Sie kommt zum Einsatz, wenn man z.B. einen Beitrag, ein Konto oder eine Datei entfernen möchte.

- **PATCH**: Mit PATCH werden nur Teile einer Ressource aktualisiert, nicht die gesamte Ressource. Das ist effizienter als PUT, wenn man nur einzelne Felder ändern möchte, z.B. nur die E-Mail-Adresse eines Benutzers.

- **OPTIONS**: Mit OPTIONS fragt man den Server, welche HTTP-Methoden für eine bestimmte Ressource erlaubt sind. Das ist nützlich für CORS (Cross-Origin Resource Sharing) oder um herauszufinden, welche Operationen auf einer API verfügbar sind.

Zusammengefasst: GET zum Abrufen, POST zum Erstellen, PUT/PATCH zum Aktualisieren und DELETE zum Löschen von Ressourcen.
