const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// CSRF-Schutz aktivieren (Token wird in Cookie gesetzt)
const csrfProtection = csrf({ cookie: true });

// Formular mit Token
app.get("/", csrfProtection, (req, res) => {
  res.send(`
    <h1>CSRF-geschützt</h1>
    <form method="POST" action="/submit">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <button type="submit">Absenden</button>
    </form>
  `);
});

// POST-Route nur mit gültigem Token
app.post("/submit", csrfProtection, (req, res) => {
  const { name } = req.body;
  console.log("Name erhalten:", name);
  res.send(`Hallo ${name}!`);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
