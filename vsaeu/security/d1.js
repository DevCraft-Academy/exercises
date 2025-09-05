const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const PORT = 3000;

const pool = new Pool({
  user: "dbuser",
  host: "mydb.com",
  database: "mydb",
  password: "dbpassword", // credentials lieber in env-Dateien speichern, da diese bei Code-Veröffentlichung bzw. teilung sichtbar werden
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`; // keine Trennung zwischen Code und EIngabe; Passwort unverschlüsselt auf Datenbank
  const { rows } = await pool.query(query);

  if (rows.length > 0) {
    res.send("Erfolgreich eingeloggt!");
  } else {
    res.send("Login fehlgeschlagen!");
  }
});

app.get("/userdata", async (req, res) => {
  const query = "SELECT * FROM users"; // rückgabe aller user daten, das geht nicht; keine Rollen-basierte Beschränkung
  const { rows } = await pool.query(query);
  res.json(rows);
});

app.put('/username', async (req, res) => { // Jeder kann den Benutzer ändern
  const { oldUsername, newUsername } = req.body;
    const query = `UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'`; 
    await pool.query(query);
    res.send('Benutzername erfolgreich geändert.');
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});