 # 1. SQL-Injection (kritisch)

 const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;


# 2. Klartext-Passwörter in der Datenbank (kritisch)

Das Passwort wird offensichtlich im Klartext gespeichert und abgefragt. Dies ist ein massives Sicherheitsrisiko bei Datenlecks.

# 3. Keine Input-Validierung

Benutzereingaben werden nicht auf Format, Länge oder Typ geprüft. Das öffnet die Tür für:

- XSS (z. B. bei späterer Anzeige im Frontend)

- Injection-Angriffe

- Logik-Fehler

# 4. Fehlende Authentifizierung & Autorisierung

app.get("/userdata", ...)

Diese Route gibt alle Benutzerdaten ohne Authentifizierung frei. Jeder, der die Route kennt, kann die Daten abfragen.

# 5. Fehlende CSRF-Absicherung

Für Endpunkte wie POST /login und PUT /username ist keine Absicherung gegen Cross-Site Request Forgery implementiert.

#  6. Fehlende Rate-Limiting / Brute-Force-Schutz

Die Login-Route ist ungeschützt gegen Brute-Force-Angriffe.

# 7. Fehlendes Logging von sicherheitsrelevanten Aktionen

Keine Protokollierung von Logins, Username-Änderungen, Zugriffen auf /userdata, etc.

#  8. Hardcodierte Datenbank-Zugangsdaten (kritisch)

const pool = new Pool({
  user: "dbuser",
  host: "mydb.com",
  database: "mydb",
  password: "dbpassword",
  port: 5432,
});
