const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
// Port niemals hardcodiert in Code, sondern in Evironment Variablen / externes File
const PORT = 3000;

// DB Zugangsdaten niemals hardcodiert in Code, sondern in Evironment Variablen / externes File
const pool = new Pool({
  user: "dbuser",
  host: "mydb.com",
  database: "mydb",
  password: "dbpassword",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // keine Prepared Statements verwendet -> SQL Injection möglich (in diesem Fall besonders einfach dank hardcodierten Zugangsdaten)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const { rows } = await pool.query(query);

  // hier kann ein Angreifer dank XSS gut auslesen, ob er die richtigen Benutzerdaten hat
  if (rows.length > 0) {
    res.send("Erfolgreich eingeloggt!");
  } else {
    res.send("Login fehlgeschlagen!");
  }
});

// hier sieht man auch, in welchem Verzeichnis die Nutzerdaten liegen
app.get("/userdata", async (req, res) => {
  // Diese Zeilen werden jeder Angreifer glücklich machen, da er alle Benutzerdaten aus der Tabelle users auslesen kann + prepared Statements fehlen
  const query = "SELECT * FROM users";
  const { rows } = await pool.query(query);
  res.json(rows);
});

// auch hier ist wieder ein Verzeichnis öffentlich einsehbar
app.put('/username', async (req, res) => {
  const { oldUsername, newUsername } = req.body;
    // wenn er jetzt noch Lust hat die Benutzerdaten zu verändern, wird er hier fündig werden
    const query = `UPDATE users SET username = '${newUsername}' WHERE username = '${oldUsername}'`;
    await pool.query(query);
    res.send('Benutzername erfolgreich geändert.');
});

app.listen(PORT, () => {
  // dank dieser Fehlermeldung und den hardcodierten Variablen oben ist jetzt auch klar, an welchen Port er seine Attacke wenden darf
  console.log(`Server läuft auf Port ${PORT}`);
});


