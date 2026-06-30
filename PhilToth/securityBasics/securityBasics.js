// ❗ Security Issue: Kein Helmet → Keine Security-Header
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

// ❗ Security Issue: Hardcodierte DB-Credentials → sollten in Environment-Variablen ausgelagert werden
const pool = new Pool({
  user: "dbuser",
  host: "mydb.com",
  database: "mydb",
  password: "dbpassword",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: false }));

// ❗ Security Issue: SQL Injection – username/password werden direkt in das SQL-Statement eingefügt
// ❗ Security Issue: Passwörter werden im Klartext verglichen (kein Hashing)
// ❗ Security Issue: Kein Rate Limiting → Brute-Force möglich
// ❗ Security Issue: Keine Session/Auth – Login ist nicht geschützt
// ❗ Security Issue: Fehlender Rate-Limiter → Brute-Force möglich
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const { rows } = await pool.query(query);

  if (rows.length > 0) {
    res.send("Erfolgreich eingeloggt!");
  } else {
    res.send("Login fehlgeschlagen!");
  }
});

// ❗ Security Issue: Endpoint gibt ALLE Benutzerdaten frei → kein Auth-Check, vollständiger Datenleck
// ❗ Security Issue: Keine Fehlerbehandlung
app.get("/userdata", async (req, res) => {
  const query = "SELECT * FROM users";
  const { rows } = await pool.query(query);
  res.json(rows);
});

// ❗ Security Issue: SQL Injection again – newUsername/oldUsername werden direkt in Query eingefügt
// ❗ Security Issue: XSS + Keine Authentifizierung → jeder = öffentlich kann Usernamen beliebig ändern
// ❗ Security Issue: Keine Fehlerbehandlung
app.put('/username', async (req, res) => {
  const { oldUsername, newUsername } = req.body;
  const query = `UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'`;
  await pool.query(query);
  res.send('Benutzername erfolgreich geändert.');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
