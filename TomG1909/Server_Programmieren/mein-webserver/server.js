const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/willkommen", (req, res) => {
  const { name } = req.body;
  console.log("POST request /willkommen mit params", req.body);
  res.render("welcome", { name });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
