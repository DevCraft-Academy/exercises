const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
        <label>Name:</label>
        <input name="name" />
        <button type="submit">Senden</button>
    </form>
  `);
});

app.post("/submit", (req, res) => {
  const name = req.body.name;
  console.log("Empfangen:", name); // landet im Server-Log
  res.send("Hallo " + name);
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));