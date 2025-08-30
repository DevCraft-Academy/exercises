require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

// Verbindung zur Datenbank über Umgebungsvariablen
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());

// Rate-Limiting für Login-Route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});
app.use("/login", loginLimiter);

// Session-Management
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // im Übungsumfeld kein HTTPS erzwungen
}));

// Login mit bcrypt und prepared statement
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (rows.length > 0 && bcrypt.compareSync(password, rows[0].password)) {
      req.session.user = rows[0].username;
      res.send("Erfolgreich eingeloggt!");
    } else {
      res.send("Login fehlgeschlagen!");
    }
  } catch (err) {
    console.error("Fehler beim Login:", err);
    res.status(500).send("Ein interner Fehler ist aufgetreten.");
  }
});

// Geschützter Endpunkt für User-Daten
app.get("/userdata", (req, res) => {
  if (!req.session.user) {
    return res.status(403).send("Nicht autorisiert.");
  }
  res.send("Hier wären die Benutzerdaten – nur für eingeloggte Nutzer sichtbar.");
});

// Geschützter Endpunkt zum Username-Ändern
app.put("/username", async (req, res) => {
  if (!req.session.user) {
    return res.status(403).send("Nicht autorisiert.");
  }

  const { newUsername } = req.body;
  try {
    await pool.query(
      "UPDATE users SET username = $1 WHERE username = $2",
      [newUsername, req.session.user]
    );
    req.session.user = newUsername;
    res.send("Benutzername erfolgreich geändert.");
  } catch (err) {
    console.error("Fehler beim Ändern des Benutzernamens:", err);
    res.status(500).send("Ein interner Fehler ist aufgetreten.");
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
