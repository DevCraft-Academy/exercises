const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/willkommen", (req, res) => {
  const { username, age, handedness } = req.body;
  res.render("willkommen", { username, age, handedness });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});