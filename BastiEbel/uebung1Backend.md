server.js file:

const express = require("express");
const app = express();
app.set("view engine", "ejs");
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/willkommen", (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const gender = req.body.gender;
  const color = req.body.color;
  res.render("willkommen", { username, gender, color });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

views index.ejs:

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formular</title>
  </head>
  <body>
    <h1>Willkommen!</h1>
    <form action="/willkommen" method="POST">
      <label for="username">Name:</label>
      <input type="text" id="username" name="username" required />

      <label>Geschlecht:</label>
      <input type="radio" id="male" name="gender" value="male" />
      <label for="male">Männlich</label>
      <input type="radio" id="female" name="gender" value="female" />
      <label for="female">Weiblich</label>

      <label for="color">Lieblingsfarbe:</label>
      <select id="color" name="color">
        <option value="red">Rot</option>
        <option value="green">Grün</option>
        <option value="blue">Blau</option>
      </select>

      <button type="submit">Absenden</button>
    </form>
  </body>
</html>

willkommen.ejs:

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Willkommen</title>
  </head>
  <body>
    <h1>Willkommen, <%= username %>!</h1>
    <p>Geschlecht: <%= gender %></p>
    <p>Lieblingsfarbe: <%= color %></p>
    <a href="/">Zurück</a>
  </body>
</html>
