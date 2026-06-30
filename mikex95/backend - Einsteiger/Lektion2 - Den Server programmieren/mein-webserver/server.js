const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("test", { name: "Welt" });
});

app.post("/willkommen", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Hallo ${req.body.name}!</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.get("/karottensuppe", (req, res) => {
  res.send("<h1>Endlich Karottensuppe!</h1>");
});
