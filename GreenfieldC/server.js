const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", { title: "Form", name: "Christian" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const colour = req.body.colour;

  res.render("logged", { username: username, colour: colour });
});

app.listen(port, () => {
  console.log(`Läuft auf http://localhost:${port}`);
});
