const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Token generator
function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

app.get("/", (req, res) => {
  const token = generateToken();
  res.cookie("csrf_token", token, { httpOnly: true });

  res.send(`
    <form method="POST" action="/submit">
        <input type="hidden" name="csrf_token" value="${token}">
        <label>Name:</label>
        <input name="name" />
        <button type="submit">Senden</button>
    </form>
  `);
});

app.post("/submit", (req, res) => {
  const cookieToken = req.cookies.csrf_token;
  const formToken = req.body.csrf_token;

  if (!cookieToken || cookieToken !== formToken) {
    console.log("CSRF BLOCKIERT");
    return res.status(403).send("CSRF blockiert");
  }

  const name = req.body.name;
  console.log("Empfangen:", name); // nur wenn legitimes Formular
  res.send("Hallo " + name);
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
