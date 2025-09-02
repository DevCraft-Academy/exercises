const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Formular anzeigen
app.get("/", (req, res) => {
  res.send(`
    <h1>Unsichere CSRF-Demo</h1>
    <form method="POST" action="/submit">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <button type="submit">Absenden</button>
    </form>
  `);
});

// POST-Route, die anfällig für CSRF ist
app.post("/submit", (req, res) => {
  const { name } = req.body;
  console.log("Name erhalten:", name); // erscheint im Server-Log
  res.send(`Hallo ${name}!`);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
